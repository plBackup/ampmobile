ampApp.controller("passenger-flow-main-controller",["$scope","$http","$rootScope","$timeout","$filter",function($scope,$http,$rootScope,$timeout,$filter){


    $rootScope.showBottom();

    $scope.info = {};
    $scope.chart = {};

    var currentMonth = new Date().getMonth();
    var prevMonth = new Date();
    prevMonth.setDate(0);

    function getCurrentYearIndexTooltip(){
        var result = 0;
        for(var i=0;i<=currentMonth;i++){
            result+=$scope.chart.real[i];
        }
        return result;
    }


    function getForecastValue(){
        var result = getCurrentYearIndexTooltip();
        for(var i=11;i>currentMonth;i--){
            result+=$scope.chart.budget[i];
        }
        return result;
    }

    function getFullYearIndex(){
        var result = 0;
        for(var i=0;i<=11;i++){
            result+=$scope.chart.budget[i];
        }
        return result;
    }
    function getCurrentDate(){
        return new Date().getDate();
    }

    function getDayOfMonth(d){
        var date = new Date(d);
        var month = date.getMonth();
        date.setMonth(month+1);
        date.setDate(0);
        return date.getDate();
    }

    function getFinishedDayOfYear(d){
        var month = d.getMonth();
        var year = d.getFullYear();
        var date = d.getDate();
        var result = date;
        for(var i =0;i<month;i++){
            var date = new Date();
            date.setFullYear(year);
            date.setMonth(month);
            result+=getDayOfMonth(date);
        }

        return result;
    }

    function getDayOfYear(d){
        var result = 0;
        var date = new Date(d);
        for(var i=0;i<12;i++){
            date.setMonth(i);
            result+=getDayOfMonth(date);
        }
        return result;
    }

    function getValue(num,replacement){
        if(num==null||num==""||isNaN(num)){
            return parseFloat(replacement);
        }
        return parseFloat(num);
    }

    function initializeData(data){
        $scope.info.currentMonthDayRate = parseInt(getCurrentDate() / getDayOfMonth(new Date()) * 100);

        $scope.info.currentYearDayRate = parseInt(getFinishedDayOfYear(new Date()) / getDayOfYear(new Date()) * 100);
        $scope.info.currentMonthDayTooltip = getCurrentDate() + "/" + getDayOfMonth(new Date());
        $scope.info.currentYearDayTooltip = getFinishedDayOfYear(new Date()) + "/" + getDayOfYear(new Date());

        $scope.chart = data.chart;

        $scope.info.currentMonthIndexTooltip = $scope.chart.real[currentMonth];
        $scope.info.currentMonthIndexRate = parseInt($scope.chart.real[currentMonth]/$scope.chart.budget[currentMonth]*100);
        if(isNaN($scope.info.currentMonthIndexRate)){
            $scope.info.currentMonthIndexRate = "-";
        }

        $scope.info.currentMonthCount = $scope.chart.real[currentMonth];
        $scope.info.currentYearIndexTooltip = getCurrentYearIndexTooltip();
        $scope.info.currentYearIndexRate = parseInt(getCurrentYearIndexTooltip()/getFullYearIndex()*100);
        if(isNaN($scope.info.currentYearIndexRate)){
            $scope.info.currentYearIndexRate = "-";
        }

        $scope.info.fullYearTotalCount = getCurrentYearIndexTooltip();
        $scope.info.fullYearCount = getForecastValue();
        $scope.info.linkRelative = parseInt(($scope.chart.real[currentMonth-1] - $scope.chart.real[currentMonth-2])/$scope.chart.real[currentMonth-2]*100);
        if(isNaN($scope.info.linkRelative)){
            $scope.info.linkRelative = "-";
        }
        $scope.info.yearToYear = parseInt(($scope.chart.real[currentMonth-1] - $scope.chart.lastYear[currentMonth-1])/$scope.chart.lastYear[currentMonth-1]*100);
        if(isNaN($scope.info.yearToYear)){
            $scope.info.yearToYear = "-";
        }
        $scope.info.targetRate = parseInt(($scope.chart.real[currentMonth-1])/$scope.chart.budget[currentMonth-1]*100);
        if(isNaN($scope.info.targetRate)){
            $scope.info.targetRate="-";
        }
        $scope.info.penetranceRate = $filter("number")($scope.chart.real[currentMonth-1]/data.info.square/getDayOfMonth(prevMonth));
        if(isNaN($scope.info.penetranceRate)){
            $scope.info.penetranceRate = "-";
        }


    }

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

        chartInsArr.push(createSalePercentPie(container.find(".chart-item-1 .chart-content"),["#5cd4f4","#dae2e7"],[$scope.info.currentMonthDayRate,100-$scope.info.currentMonthDayRate],$scope.info.currentMonthDayRate+"%"));
        chartInsArr.push(createSalePercentPie(container.find(".chart-item-2 .chart-content"),["#5ab46d","#dae2e7"],[getValue($scope.info.currentMonthIndexRate,0),100-getValue($scope.info.currentMonthIndexRate,0)],$scope.info.currentMonthIndexRate+"%"));
        chartInsArr.push(createSalePercentPie(container.find(".chart-item-3 .chart-content"),["#5cd4f4","#dae2e7"],[$scope.info.currentYearDayRate,100-$scope.info.currentYearDayRate],$scope.info.currentYearDayRate+"%"));
        chartInsArr.push(createSalePercentPie(container.find(".chart-item-4 .chart-content"),["#5ab46d","#dae2e7"],[getValue($scope.info.currentYearIndexRate,0),100-getValue($scope.info.currentYearIndexRate,0)],$scope.info.currentYearIndexRate+"%"));

        var labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        var data1 = $scope.chart.real;
        var data2 = $scope.chart.budget;
        var data3 = $scope.chart.lastYear;

        chartInsArr.push(createPassengerFlowChart(labels,data1,data2,data3));
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

    function createPassengerFlowChart(labels,data1,data2,data3){
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
                data: labels

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
                    data: data1
                },
                {
                    barWidth: 10,
                    name: '预算',
                    type: 'bar',
                    data: data2
                },
                {
                    barWidth: 10,
                    name: '去年同期',
                    type: 'bar',
                    data: data3
                }
            ]
        };

        myChart.setOption(option);
        return myChart;
    }

    // 初始化
    function init(){
        var url = "data/data_1/mgt_analysis/business_analysis/passenger_flow_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);




