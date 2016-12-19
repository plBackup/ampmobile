ampApp.controller("rent-main-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){
    $scope.records = [];
    $scope.saleRatePie = [];
    $scope.squareRatePie = [];
    $scope.rentList = [];
    $scope.investmentList = [];
    $scope.collapseTableList=[];

    function initializeData(data){
        $scope.records = data.records;
        $scope.saleRatePie = data.saleRatePie;
        $scope.squareRatePie = data.squareRatePie;
        $scope.rentList = data.rentList;
        $scope.investmentList = data.investmentList;
        $scope.collapseTableList=data.collapseTable;

        $scope.hasRentedSquare = parseFloat($scope.collapseTableList[$scope.collapseTableList.length-1].rentSquare);
        $scope.notRentedSquare = parseFloat($scope.collapseTableList[$scope.collapseTableList.length-1].totalRentSquare)-parseFloat($scope.collapseTableList[$scope.collapseTableList.length-1].rentSquare);
        $scope.rentContractCount = parseFloat($scope.collapseTableList[$scope.collapseTableList.length-1].rentCount);
    }

    /* ======================================== angular 注册事件 ======================================== */
    /* table 内容收起/展开 */
    $scope.collapseTable = function(item){
        if(item.hasCollapseBtn){
            item.collapsed = !item.collapsed;
            var groupId = item.dataGroup;

            $scope.collapseTableList.forEach(function(itemRecord){
                if(groupId==itemRecord.dataGroup&&!itemRecord.hasCollapseBtn){
                    itemRecord.hide=!itemRecord.hide;
                }
            });
        }
    };

    $scope.showMgtAnalysisPanel = function(){
        hideMgtAnalysisMenuList();
        showMgtAnalysisPanel();
    };
    $scope.closeMenuList = function(){
        hideMgtAnalysisMenuList();
    };


    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var chartArr = [];
    var pieSwiper = null;

    var commercialTableGroupSwiper = null;
    var rentTableGroupSwiper = null;
    var investmentTableGroupSwiper = null;
    var barChartSwiper = null;

    function initPageView(){
        container = $("#rent-main");
        var windowHeight = $(window).height()-44-48-40;
        container.css("height",windowHeight+"px");

        chartArr.push(createPieChart($(container).find(".amp-chart-1 .amp-chart-content"),$scope.saleRatePie,"销售占比","(租金收入)"));
        chartArr.push(createPieChart($(container).find(".amp-chart-2 .amp-chart-content"),$scope.squareRatePie,"销售占比","(计租面积)"));

        chartArr.push(createLeaseExpiredBarChart());
        chartArr.push(createInvestmentLineChart());

        pieSwiper = new Swiper(".pie-group .swiper-container", {
            pagination : '.pie-group .swiper-pagination'
        });

        commercialTableGroupSwiper = new Swiper(".commercial-table-group .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        rentTableGroupSwiper = new Swiper(".rent-table-group .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        investmentTableGroupSwiper = new Swiper(".investment-table-group .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        barChartSwiper = new Swiper(".amp-chart-content-wrapper .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        pieSwiper.destroy(true,true);
        barChartSwiper.destroy(true,true);
        commercialTableGroupSwiper.destroy(true,true);
        rentTableGroupSwiper.destroy(true,true);
        investmentTableGroupSwiper.destroy(true,true);

        chartArr.forEach(function(item){
           item.dispose();
        });
    }

    function createPieChart(selector,data,textLabel,textValue) {
        var myChart = echarts.init($(selector)[0]);
        var option = {
            color:["#0389db","#00b1f0","#2bdadb","#f3f3f3","#a6ed66","#dcf8a1","#47e6a7","#3d4d5f"],
            series: [
                {
                    name:"销售",
                    type:"pie",
                    radius: ["75px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data:data,
                    silent: false,
                    hoverAnimation:false
                }
            ]
        };

        myChart.setOption(option);

        var html =  "<div class='pie-text'>" +
                        "<em>"+textLabel+"</em>"+
                        "<div>"+textValue+"</div>"+
                    "</div>";

        $(selector).append(html);

        return myChart;
    }


    function createLeaseExpiredBarChart(){
        var chartContainer = $(container).find(".amp-bar-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);

        // 指定图表的配置项和数据
        var option = {
            color:["#5cd4f4","#5ab46d"],
            grid: {
                top:"20",
                left: "0",
                right: "0",
                bottom: "30",
                containLabel: false
            },
            xAxis: [
                {
                    type: "category",
                    data: ["2016","2017","2018","2019","2020","2020后"],
                    axisLine:{show:true,lineStyle:{color:"#dee6eb"}},
                    axisTick:{show:false},
                    splitLine:{show:false},
                    axisLabel:{show:true,textStyle:{color:"#8592a3"}}
                }
            ],
            yAxis: [
                {
                    type: "value",
                    axisTick:{show:false},
                    axisLine:{show:false},
                    axisLabel:{show:false},
                    splitLine:{show:false}
                }
            ],
            series: [
                {
                    barGap:"150%",
                    label:{normal:{show:true,position:"top",textStyle:{color:"#8592a3"}}},
                    name:"租金",
                    type:"bar",
                    barWidth:10,
                    data:[parseInt(1777/10000),parseInt(157771/10000),parseInt(5248804/10000),parseInt(18017489/10000),parseInt(38174069/10000),parseInt(17235143/10000)]
                },
                {
                    barGap:"150%",
                    label:{normal:{show:true,position:"top",textStyle:{color:"#8592a3"}}},
                    name:"面积",
                    type:"bar",
                    barWidth:10,
                    data:[ 2029,47,2343,9149,24203,17467 ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        return myChart;
    }

    function createInvestmentLineChart(){
        var rentRate_opt = {
            grid: {
                top:"20",
                left: "10",
                right: "15",
                bottom: "20",
                containLabel: true
            },
            xAxis: [
                {
                    boundaryGap:false,
                    type: 'category',
                    data: [" ","7月", "8月", "9月", "10月", "11月", "12月"],
                    axisTick: {show: false},
                    axisLine: {
                        show:false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {color: "#eaeaea"}
                    },
                    axisLabel:{textStyle:{fontSize:12,color:"#8592a3"}}
                }
            ],
            yAxis: [
                {
                    max:500,
                    type: 'value',
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLine: {
                        show:false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {color: "#eaeaea"}
                    },

                    axisLabel:{
                        formatter:function(value){
                            if(value==0){
                                return "";
                            }
                            return (value+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                        },
                        textStyle:{fontSize:14,color:"#8592a3"}
                    }
                }

            ],
            series: [
                {
                    type: 'line',
                    symbolSize:6,
                    lineStyle: {normal: {color: "#5ab46e"}},
                    itemStyle: {normal: {color: "#5ab46e",borderWidth:2}},
                    data: [,160, 250, 220,350,380,]
                },
                {
                    type: 'line',
                    symbolSize:6,
                    lineStyle: {normal: {color: "#5ab46e", type: "dashed"}},
                    itemStyle: {normal: {color: "#5ab46e",borderWidth:2}},
                    data: [,, ,   , , 380, 360]
                },
                {
                    type: 'line',
                    silent: true,
                    tooltip: {
                        show: false
                    },
                    data: [],
                    markLine: {
                        symbol: 'circle',
                        silent: true,
                        symbolSize: 5,
                        label: {
                            normal: {
                                show: true,
                                position: 'middle',
                                formatter: '{b}'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: "#8493a3",
                                width: 1,
                                type: "solid"
                            }
                        },
                        data: [
                            [
                                {
                                    name: "7月",
                                    coord: [1, 200]
                                },
                                {
                                    coord: [2, 200]
                                }
                            ],
                            [
                                {
                                    name: "8月",
                                    coord: [2, 300]
                                },
                                {
                                    coord: [3, 300]
                                }
                            ],
                            [
                                {
                                    name: "9月",
                                    coord: [3, 200]
                                },
                                {
                                    coord: [4, 200]
                                }
                            ],
                            [
                                {
                                    name: "10月",
                                    coord: [4, 300]
                                },
                                {
                                    coord: [5, 300]
                                }
                            ],
                            [
                                {
                                    name: "11月",
                                    coord: [5, 400]
                                },
                                {
                                    coord: [6, 400]
                                }
                            ]
                        ]
                    }//markline
                }
            ]
        };


        var chartContainer = $(container).find(".investment-line-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);
        myChart.setOption(rentRate_opt);
        return myChart;
    }




    // 初始化
    function init(){

        var url = "data/data_1/mgt_analysis/rent_analysis/rent_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });

    }
    init();
}]);




