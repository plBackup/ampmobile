ampApp.controller("rent-main-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){

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


    $scope.saleRatePie = [63.62,2.95,4.21,3.13,23.01,30.8];
    $scope.squareRatePie = [63.62,2.95,4.21,3.13,23.01,30.8];

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

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        var mgtAnalysisMenuListWrapper = $("#mgt-analysis-menu-list-wrapper");console.log(22);
        $(mgtAnalysisMenuListWrapper).find(".menu-item-list a.statistic-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            console.log(2);
            hideMgtAnalysisMenuList();

            showMgtAnalysisPanel();

        });

        $(mgtAnalysisMenuListWrapper).find(".menu-item-list a.filter-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            hideMgtAnalysisMenuList();
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
                top:"0",
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
                    data:[650,801,1003,1248,1738,2038]
                },
                {
                    barGap:"150%",
                    label:{normal:{show:true,position:"top",textStyle:{color:"#8592a3"}}},
                    name:"面积",
                    type:"bar",
                    barWidth:10,
                    data:[ 380,401,520,514,704,945 ]
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
        initPageView();
        $timeout(function(){
            bindPageEvents();
        },300);

    }
    init();
}]);




