ampApp.controller("business-main-controller",["$scope","$http","$rootScope","$timeout","$filter",function($scope,$http,$rootScope,$timeout,$filter){
    $scope.records = [];

    $scope.rentData = [];// 租金
    $scope.propertyData = [];// 物管费
    $scope.fullYear = false; // 是否切换到全年


    $scope.deductRentStoreRateTable = [];

    /* ======================================== angular 注册事件 ======================================== */
    /* table 内容切换 */
    $scope.switchTable = function(isFullYear){
        $scope.fullYear = isFullYear;
    };

    /* table 内容收起/展开 */
    $scope.collapseTable = function(item){
        if(item.hasCollapseBtn){
            item.collapsed = !item.collapsed;
            var groupId = item.dataGroup;

            $scope.records.forEach(function(itemRecord){
                if(groupId==itemRecord.dataGroup&&!itemRecord.hasCollapseBtn){
                    itemRecord.hide=!itemRecord.hide;
                }
            });
        }
    };

    /* 保底租金 内容收起/展开 */
    $scope.collapseTableDeduct = function(item){
        if(item.hasCollapseBtn){
            item.collapsed = !item.collapsed;
            var groupId = item.dataGroup;

            $scope.deductRentStoreRateTable.forEach(function(itemRecord){
                if(groupId==itemRecord.dataGroup&&!itemRecord.hasCollapseBtn){
                    itemRecord.hide=!itemRecord.hide;
                }
            });
        }
    };

    /* 关闭 选项菜单 */
    $scope.closeMenuList = function(){
        hideMgtAnalysisMenuList();
    };

    function initializeData(data){
        $scope.rentData = data.rentData;
        $scope.propertyData = data.propertyData;
        $scope.records =  $scope.rentData;
        $scope.deductRentStoreRateTable = data.deductRentStoreRateTable;
    }
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    var deductRentStoreRateTableSwiper = null;
    var deductRentStoreRateChartSwiper = null;
    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#business-main");
        var windowHeight = $(window).height()-44-48-41-10-40;
        container.css("height",windowHeight+"px");


        var chartList = $filter("filter")($scope.records,{chartItem:true});


        var labels = [];
        var data = [];
        chartList.forEach(function(item){
            labels.push(item.commercialType);
            data.push(item.curOfficialReceipts);

        });


        createDeductRentStoreRateChart();
        createBusinessBarChart(labels,data);

        $timeout(function(){
            deductRentStoreRateTableSwiper = new Swiper(".deduct-rent-store-rate-table .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            deductRentStoreRateChartSwiper = new Swiper(".deduct-rent-store-rate-chart .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });
        },300);

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        deductRentStoreRateTableSwiper.destroy(true,true);
        deductRentStoreRateChartSwiper.destroy(true,true);
    }

    function createDeductRentStoreRateChart(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($(container).find(".deduct-rent-store-rate-chart .chart-content")[0]);

        var labels = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
        var data1 = [0,0,7,0,0,2,2,2,2,3,3,17];
        var data2 = [19,19,12,19,19,17,17,17,17,16,16,4];
        var data3 = [];
        var minValue = data1[0];
        for(var i=0;i<12;i++){
            data3.push(data1[i]+data2[i]);

            if(data1[i]<minValue){
                minValue = data1[i];
            }
            if(data2[i]<minValue){
                minValue = data2[i];
            }
        }

        minValue=2;

        // 指定图表的配置项和数据
        var option = {
            color:["#627d9b","#00b1f0","transparent"],
            grid: {
                top:"0",
                left: "0",
                right: "0",
                bottom: "20",
                containLabel: false
            },

            xAxis: [
                {
                    axisLabel:{textStyle:{color:"#8592a3"}},
                    type: "category",
                    data:labels,
                    axisLine:{
                        show:true,
                        lineStyle:{color:"#dae2e7"}
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show:false
                    }
                }
            ],
            yAxis: [
                {
                    axisLabel:{show:false,textStyle:{color:"#8592a3"}},
                    type: "value",
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false,
                        lineStyle:{color:"#ccc"}
                    },
                    splitLine:{
                        show:false
                    }
                }
            ],
            series: [

                {
                    stack:"租金",
                    name:"保底租金",
                    type:"bar",
                    barWidth:30,
                    label:{
                        normal:{
                            show:true,
                            textStyle:{fontSize:12},

                            position:"insideTop"
                        }
                    },
                    data:data2
                },
                {
                    stack:"租金",
                    name:"提成租金",
                    type:"bar",
                    barWidth:30,
                    label:{
                        normal:{
                            show:true,
                            position:"insideBottom"
                        }
                    },
                    data:data1
                },
                {
                    stack:"租金",
                    name:"合成",
                    type:"bar",
                    barWidth:34,
                    label:{
                        normal:{
                            show:true,
                            position:"insideBottom",
                            formatter:function(params){
                                var dataIndex = params.dataIndex;
                                return data3[dataIndex];
                            },
                            textStyle:{
                                color:"#333"
                            }
                        }
                    },
                    data:[minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    function createBusinessBarChart(labels,data){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($(".business-bar-chart .business-bar-chart-content")[0]);

        // 指定图表的配置项和数据
        var option = {
            color:["#5ab46e"],
            grid: {
                top:"20",
                left: "0",
                right: "0",
                bottom: "0",
                containLabel: true
            },

            xAxis: [
                {
                    type: "category",
                    data:labels ,
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show:false
                    },
                    axisLabel:{
                        textStyle:{color:"#8592a3",fontSize:12}
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    splitNumber:3,
                    axisLabel:{
                        textStyle:{color:"#8592a3",fontSize:12}
                    }
                }
            ],
            series: [
                {
                    name:"实际收入",
                    type:"bar",
                    barWidth:15,
                    data:data
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    // 初始化
    function init(){

        var url = "data/data_1/mgt_analysis/income_analysis/business_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });
    }
    init();
}]);




