(function(){
    // 获取 amp-investment-analysis 模块
    var investmentAnalysisModule = null;
    try{
        investmentAnalysisModule = angular.module("amp-investment-analysis");
    }catch(e){
        investmentAnalysisModule = angular.module("amp-investment-analysis", []);
    }

    investmentAnalysisModule.service("simulationCalculationService",["loanRepaymentAnalysisCalculationService",function(loanRepaymentAnalysisCalculationService){
        /* ======================================== 期初分析 ======================================== */
        /**
         * 重新计算 期初分析
         * @param $scope
         */
        this.resetInitialAnalysis = function(data){
            var arr = [data.initialAnalysis.purchasingPrice,data.initialAnalysis.purchasingFee,data.initialAnalysis.loanFee];
            data.initialAnalysis.originBase = CommonUtil.addNumber(arr,"-");
            data.initialAnalysis.initialBenefit = CommonUtil.subtractNumber(data.initialAnalysis.originBase,data.initialAnalysis.loan,"-");
        };

        /* ======================================== 贷款还款 ======================================== */
        /**
         * 重设 贷款还款
         * @param $scope
         */
        this.resetLoanRepaymentAnalysis = function(data){
            var loanYear = data.initialAnalysis.loanYear; // 贷款年数
            var nper = loanYear*12; // 还款总周期数
            var pv = data.initialAnalysis.loan; // 贷款总额
            var yearRate = data.initialAnalysis.loanRate/100;
            if(!CommonUtil.isNumber(loanYear)||!CommonUtil.isNumber(nper)||!CommonUtil.isNumber(pv)||!CommonUtil.isNumber(yearRate)||loanYear<1){
                return;
            }
            var result = [];
            var payedPPMT =0; // 已支付的贷款本金
            for(var i=1;i<=loanYear;i++){
                var year = i;
                var yearPmt = 0;
                var yearIpmt = 0;
                var yearPpmt = 0;
                for(var index = 1;index<=12;index++){
                    var per = (year-1)*12+index;


                    yearPmt += loanRepaymentAnalysisCalculationService.pmt(yearRate/12,nper,pv)*(-1);
                    yearIpmt += loanRepaymentAnalysisCalculationService.ipmt(yearRate/12,per,nper,pv)*(-1);

                    yearPpmt += loanRepaymentAnalysisCalculationService.ppmt(yearRate/12,per,nper,pv)*(-1);
                }
                payedPPMT+=yearPpmt;

                var leavePpmt = pv-payedPPMT; // 剩余贷款本金


                result.push({year:year,pmt:yearPmt,ipmt:yearIpmt,ppmt:yearPpmt,leavePpmt:leavePpmt});
            }

            data.loanRepaymentAnalysis = result;
        };

        /* ======================================== 税前现金流 ======================================== */
        /**
         * 获取指定年的贷款还款信息
         * @param year
         */
        function getLoanRepaymentItemForSpecialYear(data,year){
            var result = {year:year,pmt:0,ipmt:0,ppmt:0,leavePpmt:0};
            data.loanRepaymentAnalysis.forEach(function(item){
                if(item.year==year){
                    result = item;
                }
            });
            return result;
        }

        /**
         * 获取 税前现金流 数组
         * @param $scope
         * @returns {Array}
         */
        function getPreTaxCashFlowInfoList(data){
            var result = [];

            data.incomeExpense.contents.forEach(function(item,index){
                var year = index+1;
                var income = CommonUtil.getValue(item.noi,"自动生成"); // 净 营业收入
                var loanRepaymentItem = getLoanRepaymentItemForSpecialYear(data,year);
                var loanAmount = loanRepaymentItem.ppmt; // 贷款本金
                var loanInterest = loanRepaymentItem.ipmt; // 贷款利息
                var charges = CommonUtil.getValue(item.capitalExport,"自动生成"); // 资本支出

                var subtractValue = CommonUtil.addNumber([loanAmount,loanInterest,charges],"-");
                var preTaxCashFlow = CommonUtil.subtractNumber(income,subtractValue,"自动生成");

                result.push({year:year,income:income,loanAmount:loanAmount,loanInterest:loanInterest,charges:charges,preTaxCashFlow:preTaxCashFlow});

            });
            return result;
        }

        /**
         * 重新计算 税前现金流
         * @param $scope
         */
        this.resetPreTaxCashFlowInfo = function(data){
            data.preTaxCashFlowRecords = getPreTaxCashFlowInfoList(data);
        };

        /* ======================================== 销售所得分析 ======================================== */
        function getSpecialRate(data,year){
            var rate = null;

            data.parameterInfo.outputCapitalizationRateList.forEach(function(item){
                if(year==item.year){
                    rate = item.rate;
                }
            });
            return rate;
        }
        /**
         * 重新设置 销售所得分析
         * @param $scope
         */
        this.resetSaleIncomeAnalysisRecords = function(data){
            var result = [];
            var maxYear = data.incomeExpense.contents.length;

            data.incomeExpense.contents.forEach(function(item,index){
                if(index==0){
                    return;
                }

                var year = index+1;
                var nextYear = year+1;
                if(nextYear>maxYear){
                    nextYear = maxYear;
                }
                var salePrice = "自动生成"; // 第n+1年noi 除以 第n年输出资本化率
                var noi = CommonUtil.getValue(data.incomeExpense.contents[nextYear-1].noi,"-");
                var rate = CommonUtil.getValue(getSpecialRate(data,year),"-");

                if(CommonUtil.isNumber(noi)&&CommonUtil.isNumber(rate)&&parseFloat(rate)!=0){
                    salePrice = parseFloat(noi)/parseFloat(rate)*100;
                }

                var costValue = data.parameterInfo.costValue;
                var costPercent = data.parameterInfo.costPercent;
                var saleCost = 0;
                if(CommonUtil.isNumber(salePrice)&&CommonUtil.isNumber(costPercent)){
                    saleCost = salePrice*costPercent/100;
                }else{
                    saleCost = CommonUtil.getValue(costValue,"自动生成");
                }


                var loanBalance = getLoanRepaymentItemForSpecialYear(data,year).leavePpmt;

                var subtract = CommonUtil.addNumber([saleCost,loanBalance],"-");

                var netSalesIncome = CommonUtil.subtractNumber(salePrice,subtract, "自动生成");

                result.push({year:year,salePrice:salePrice,saleCost:saleCost,loanBalance:loanBalance,netSalesIncome:netSalesIncome});

            });
            data.saleIncomeAnalysisRecords = result;
        };

        /* ======================================== 收支模拟 ======================================== */
        /**
         * 重新设置 收支模拟
         * @param $scope
         */
        this.recalculateIncomeExpense = function(data){
            var firstItem = null;
            var rate = data.incomeExpenseYearIncreaseRate;
            if(data.incomeExpense.contents.length>0){
                firstItem = data.incomeExpense.contents[0];
            }

            data.incomeExpense.contents.forEach(function(item,index){
                // 计算 收入
                item.rentIncome = CommonUtil.powerCalculate(firstItem.rentIncome,rate.rentIncomeRate,index,item.rentIncome);

                item.propertyFeeIncome = CommonUtil.powerCalculate(firstItem.propertyFeeIncome,rate.propertyFeeIncomeRate,index,item.propertyFeeIncome);
                item.otherIncome = CommonUtil.powerCalculate(firstItem.otherIncome,rate.otherIncomeRate,index,item.otherIncome);
                item.totalIncome = CommonUtil.addNumber([item.rentIncome,item.propertyFeeIncome,item.otherIncome],"-");

                // 计算 费用
                item.landValueTax = CommonUtil.powerCalculate(firstItem.landValueTax,rate.landValueTaxRate,index,item.landValueTax);

                item.publicConsumptionFee = CommonUtil.powerCalculate(firstItem.publicConsumptionFee,rate.publicConsumptionFeeRate,index,item.publicConsumptionFee);

                item.maintenanceFee = CommonUtil.powerCalculate(firstItem.maintenanceFee,rate.maintenanceFeeRate,index,item.maintenanceFee);
                item.generalMgtFee = CommonUtil.powerCalculate(firstItem.generalMgtFee,rate.generalMgtFeeRate,index,item.generalMgtFee);
                item.marketingExpense = CommonUtil.powerCalculate(firstItem.marketingExpense,rate.marketingExpenseRate,index,item.marketingExpense);
                item.wagesRelatedCost = CommonUtil.powerCalculate(firstItem.wagesRelatedCost,rate.wagesRelatedCostRate,index,item.wagesRelatedCost);
                item.mgtFee = CommonUtil.powerCalculate(firstItem.mgtFee,rate.mgtFeeRate,index,item.mgtFee);
                item.chargeOff = CommonUtil.powerCalculate(firstItem.chargeOff,rate.chargeOffRate,index,item.chargeOff);
                item.depreciation = CommonUtil.powerCalculate(firstItem.depreciation,rate.depreciationRate,index,item.depreciation);
                item.otherFee = CommonUtil.powerCalculate(firstItem.otherFee,rate.otherFeeRate,index,item.otherFee);
                item.totalFee = CommonUtil.addNumber([  item.landValueTax,
                    item.publicConsumptionFee,
                    item.maintenanceFee,
                    item.generalMgtFee,
                    item.marketingExpense,
                    item.wagesRelatedCost,
                    item.mgtFee,item.chargeOff,item.depreciation,item.otherFee],"-");

                // 计算税
                item.housePropertyTax = CommonUtil.powerCalculate(firstItem.housePropertyTax,rate.housePropertyTaxRate,index,item.housePropertyTax);
                item.businessTax = CommonUtil.powerCalculate(firstItem.businessTax,rate.businessTaxRate,index,item.businessTax );
                item.otherTax = CommonUtil.powerCalculate(firstItem.otherTax,rate.otherTaxRate,index,item.otherTax);
                item.totalTax = CommonUtil.addNumber([item.housePropertyTax,item.businessTax,item.otherTax],"-");

                // 计算 noi
                var totalCost = CommonUtil.addNumber([item.totalFee,item.totalTax],"-");
                item.noi = CommonUtil.subtractNumber(item.totalIncome,totalCost,"-");
            });
        };

        /* ======================================== 投资收益的测试指标 ======================================== */
        function getCashFlowRangeList(data,year){
            var result = [];
            data.preTaxCashFlowRecords.forEach(function(item,index){
                if(index+1>year){
                    return;
                }
                var preTaxCashFlow = item.preTaxCashFlow;
                if(CommonUtil.isNumber(preTaxCashFlow)){
                    result.push(preTaxCashFlow);
                }

            });
            return result;
        }
        // 获取指定年的销售价格
        function getSaleIncomeAnalysisItemForSpecialYear(data,year){
            var result = {};
            data.saleIncomeAnalysisRecords.forEach(function(item){
                if(item.year==year){
                    result = item;
                }
            });
            return result;
        }

        // 获取税前现金流
        function getPreTaxCashFlowItemForSpecialYear(data,year){
            var result = null;

            data.preTaxCashFlowRecords.forEach(function(item){
                if(year==item.year){
                    result = item;
                }
            });

            return result;
        }


        /**
         * 重新设置 投资收益的测试指标
         * @param $scope
         */
        this.resetTestIndexRecords = function(data){
            var result = [];
            var loanYear = data.initialAnalysis.loanYear;
            var loan = data.initialAnalysis.loan;
            var loanRate = data.initialAnalysis.loanRate;

            data.incomeExpense.contents.forEach(function(item,index){
                if(index==0){ // 不需要第一年
                    return;
                }
                var year = index+1;
                var saleIncomeAnalysisItem = getSaleIncomeAnalysisItemForSpecialYear(data,year);
                /* 获取增值 */
                var salePrice = saleIncomeAnalysisItem.salePrice; // 销售价格
                var saleCost = saleIncomeAnalysisItem.saleCost; // 销售价格

                var purchasingPrice = data.initialAnalysis.purchasingPrice;

                var capitalExportArr = [];
                data.incomeExpense.contents.forEach(function(subItem,ind){
                    if(ind>index){
                        return;
                    }
                    capitalExportArr.push(subItem.capitalExport);
                });
                var totalCapitalExport = CommonUtil.addNumber(capitalExportArr,"-");
                totalCapitalExport = CommonUtil.addNumber([totalCapitalExport,purchasingPrice],"-");

                var appreciation = CommonUtil.subtractNumber(salePrice,totalCapitalExport,"-");

                // if(!appreciationAvailable(salePrice,purchasingPrice,capitalExportArr)){appreciation="-";} // 判断增值是否可计算

                /* 净现值 */
                var netPresentValue = "-";

                var initialBenefit = CommonUtil.getValue(data.initialAnalysis.initialBenefit,"-");// 初始投资
                var benefitRate = CommonUtil.getValue(data.parameterInfo.benefitRate,"-"); // 折现率
                var cashFlowList = getCashFlowRangeList(data,year);
                var netSalesIncome = saleIncomeAnalysisItem.netSalesIncome; // 净销售所得

                var currentCashFlow = null; // 当年现金流
                if(cashFlowList.length>0){
                    currentCashFlow = cashFlowList[cashFlowList.length-1];

                    cashFlowList[cashFlowList.length-1] = CommonUtil.addNumber([cashFlowList[cashFlowList.length-1],netSalesIncome],null);
                }
                if(CommonUtil.isNumber(initialBenefit)&&CommonUtil.isNumber(benefitRate)){
                    var params = ","+cashFlowList.join(",");
                    try{
                        netPresentValue = eval("new Finance().NPV("+benefitRate+","+(-1*initialBenefit)+params+")");
                    }catch(e){console.log(e);}
                }

                // if(!netPresentValueAvailable(data,year)){console.log("netPresentValue:"+netPresentValue);netPresentValue="-";} // 判断净现值是否可计算

                /* irr */
                var irrPercent = "-";
                if(CommonUtil.isNumber(initialBenefit)){
                    try{
                        var params = ","+cashFlowList.join(",");
                        irrPercent = eval("new Finance().IRR("+(-1*initialBenefit)+params+")")+"%";
                    }catch(e){
                        console.log(e);
                    }
                }
                // if(!irrAvailable(data,year)){irrPercent="-";} // 判断IRR是否可计算

                /* 税前现金流/权益 */
                var rate = "-";
                if(CommonUtil.isNumber(currentCashFlow)&&CommonUtil.isNumber(netSalesIncome)&&netSalesIncome!=0){
                    try{
                        rate = (parseFloat(currentCashFlow)/parseFloat(netSalesIncome)*100).toFixed(2)+"%";
                    }catch(e){console.log(e);}
                }
                var preTaxCashFlowItem = getPreTaxCashFlowItemForSpecialYear(data,year);
                // if(!rateAvailable(preTaxCashFlowItem.income,saleCost,loanYear,loan,loanRate,salePrice,currentCashFlow,netSalesIncome)){rate="-";} // 判断Rate是否可计算

                result.push({yearIndex:year,appreciation:appreciation,netPresentValue:netPresentValue,irrPercent:irrPercent,rate:rate});
            });
            data.testIndexRecords = result;
        }

    }]);

})();


