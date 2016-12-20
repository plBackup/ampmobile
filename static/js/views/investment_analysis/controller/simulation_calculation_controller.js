ampApp.controller("simulation-calculation-controller",["$scope","$http","$rootScope","$timeout","simulationCalculationService",function($scope,$http,$rootScope,$timeout,simulationCalculationService){
    $scope.result = {};

    $rootScope.hideBottom();

    function initializeData(data){
        $scope.result = data;


        var invokeCount = 0;
        $scope.$watch("result",function(newVal, oldVal,scope){
            console.log(++invokeCount);
            simulationCalculationService.resetInitialAnalysis($scope.result); // 重新设置 期初分析
            simulationCalculationService.recalculateIncomeExpense($scope.result); // 重新设置 收支模拟
            simulationCalculationService.resetLoanRepaymentAnalysis($scope.result); // 重新设置 贷款分期还款
            simulationCalculationService.resetPreTaxCashFlowInfo($scope.result); // 重新设置 税前现金流
            simulationCalculationService.resetSaleIncomeAnalysisRecords($scope.result); // 重新设置 销售所得分析
            simulationCalculationService.resetTestIndexRecords($scope.result); // 重新设置 模拟测算


            console.log($scope.result.preTaxCashFlowRecords);
        },true);
    }



    // 控制折叠展开
    $scope.sectionGroup = {
        initialAnalysisCollapsed:true,
        preTaxCashFlowCollapsed:true,
        saleIncomeAnalysisCollapsed:true,
        loanRepaymentAnalysisCollapsed:true
    };

    /* ======================================== angular 注册事件 ======================================== */
    $scope.collapseSection = function(section){
        $scope.sectionGroup[section]=!$scope.sectionGroup[section];
    };


    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var testIndexSwiper = null;
    var loanRepaymentAnalysisSwiper = null;
    var saleIncomeAnalysisSwiper = null;
    var preTaxCashFlowAnalysisSwiper = null;
    var incomeExpensesSimulationSwiper = null;
    function initPageView(){
        container = $("#simulation-calculation");
        var windowHeight = $(window).height()-44;
        container.css("height",windowHeight+"px");

        $timeout(function(){
            testIndexSwiper = new Swiper(".test-index-container .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            saleIncomeAnalysisSwiper = new Swiper(".sale-income-analysis .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            loanRepaymentAnalysisSwiper = new Swiper(".loan-repayment-analysis .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            preTaxCashFlowAnalysisSwiper = new Swiper(".pre-tax-cash-flow .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            incomeExpensesSimulationSwiper = new Swiper(".income-expenses-simulation .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });
        },500);


    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){


        container.on("click",".income-expenses-simulation-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.location = "#/income_expenses_simulation";
        });

        /* ------------------------------ simulation-calculation-parameter-dialog ------------------------------ */

        var parameterDialog = $("#simulation-calculation-parameter-dialog");

        container.on("click",".parameter-btn a",function(e){
            e.stopPropagation();
            e.preventDefault();
            console.log(1);
            parameterDialog.removeClass("amp-display-none");
            $(parameterDialog).find(".simulation-calculation-parameter-dialog-content").addClass("amp-animated").addClass("amp-slide-down-in");
        });



        parameterDialog.on("webkitAnimationEnd animationend",".simulation-calculation-parameter-dialog-content",function(){
            if($(this).hasClass("amp-slide-down-out")){
                $(parameterDialog).addClass("amp-display-none");
            }
            $(this).removeClass("amp-slide-down-in");
            $(this).removeClass("amp-slide-down-out");
        });

        parameterDialog.on("click",".simulation-calculation-parameter-dialog-content",function(e){
            e.stopPropagation();
            e.preventDefault();
        });

        parameterDialog.on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(parameterDialog).find(".simulation-calculation-parameter-dialog-content").addClass("amp-animated").addClass("amp-slide-down-out");
        });

        parameterDialog.on("click","a.close-btn,a.save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(parameterDialog).find(".simulation-calculation-parameter-dialog-content").addClass("amp-animated").addClass("amp-slide-down-out");
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        testIndexSwiper.destroy(true,true);
        loanRepaymentAnalysisSwiper.destroy(true,true);
        saleIncomeAnalysisSwiper.destroy(true,true);
        preTaxCashFlowAnalysisSwiper.destroy(true,true);
        incomeExpensesSimulationSwiper.destroy(true,true);
    }

    // 初始化
    function init(){

        var url = "data/data_1/investment_analysis/simulation_calculation_data.json";
        $http.get(url).success(function(result){
            initializeData(result.case1);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);




