ampApp.controller("passenger-flow-main-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){


    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var passengerFlowInfoSwiper = null;
    var passengerFlowBarSwiper = null;
    var chartInsArr = [];
    function initPageView(){
        container = $("#passenger-flow-main");
        var windowHeight = $(window).height()-44-48-40;
        container.css("height",windowHeight+"px");

        passengerFlowInfoSwiper = new Swiper(".passenger-flow-info .swiper-container", {
            pagination : '.passenger-flow-info .swiper-pagination'
        });

        passengerFlowBarSwiper = new Swiper(".passenger-flow-bar-chart .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        chartInsArr.push(createSalePercentPie(container.find(".chart-item-1 .chart-content"),["#5cd4f4","#dae2e7"],[37,63],"37%"));
        chartInsArr.push(createSalePercentPie(container.find(".chart-item-2 .chart-content"),["#5ab46d","#dae2e7"],[46,54],"46%"));
        chartInsArr.push(createSalePercentPie(container.find(".chart-item-3 .chart-content"),["#5cd4f4","#dae2e7"],[86,14],"86%"));
        chartInsArr.push(createSalePercentPie(container.find(".chart-item-4 .chart-content"),["#5ab46d","#dae2e7"],[89,11],"89%"));

        chartInsArr.push(createPassengerFlowChart());
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        var mgtAnalysisMenuListWrapper = $("#mgt-analysis-menu-list-wrapper");
        $(mgtAnalysisMenuListWrapper).find(".menu-item-list a.enrolment-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();

            hideMgtAnalysisMenuList();

            window.location = "#/passenger_flow_enrolment";

        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        passengerFlowInfoSwiper.destroy(true,true);
        passengerFlowBarSwiper.destroy(true,true);
        chartInsArr.forEach(function(item){
            item.dispose();
        });
    }

    function createSalePercentPie(selector,colors,data,textLabel) {
        var myChart = echarts.init($(selector)[0]);
        var option = {
            color:colors,
            tooltip:{show:true,formatter:"{d}%"},
            series: [
                {
                    name:"销售",
                    type:"pie",
                    radius: ["50", "60px"],
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

        $(selector).append("<div class='pie-text' style='color:"+colors[0]+"'>"+textLabel+"</div>");
        return myChart;
    }

    function createPassengerFlowChart(){
        var myChart = echarts.init(container.find(".passenger-flow-bar-chart .chart-content")[0]);
        var option = {
            grid: {
                left:0,
                right:0,
                bottom:0,
                containLabel: true
            },

            color: ["#5AB46E", "#5CD3F5", "#038BD9"],

            xAxis: {
                type: 'category',
                axisLine: {show: true, lineStyle: {color: "#dae2e7"}},
                axisLabel: {show: true, textStyle: {color: "#737e8c"}},
                splitLine: {show: false},
                axisTick: {show: false},
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

            },

            yAxis: {
                type: 'value',
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                axisLine: {show: false}
            },
            series: [
                {
                    barWidth: 10,
                    name: '实际',
                    type: 'bar',
                    data: [10,21,21,30,40,50,60,79,40,20,20,12]
                },
                {
                    barWidth: 10,
                    name: '预算',
                    type: 'bar',
                    data: [10,21,21,30,40,50,60,79,40,20,20,12]
                },
                {
                    barWidth: 10,
                    name: '去年同期',
                    type: 'bar',
                    data: [10,21,21,30,40,50,60,79,40,20,20,12]
                }
            ]
        };

        myChart.setOption(option);
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




