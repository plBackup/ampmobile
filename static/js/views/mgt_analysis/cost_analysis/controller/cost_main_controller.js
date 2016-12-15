ampApp.controller("cost-main-controller",["$scope","$http","$rootScope","$timeout","$location",function($scope,$http,$rootScope,$timeout,$location){

    $rootScope.showBottom();

    $scope.records = [];

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    function initializeData(data){
        $scope.records = data.slice(7,10);
    }

    /* ======================================== angular 注册事件 ======================================== */
    /* 跳转到人工页面 */
    $scope.goToManualPage = function(){
        $location.path("/cost_manual");
    };

    /* 关闭菜单 */
    $scope.closeMenuList = function(){
        hideMgtAnalysisMenuList();
    };

    $scope.goToEnrolmentPage = function(){
        hideMgtAnalysisMenuList();
        $location.path("/cost_enrolment");
    };


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var costStackBarChart = null;

    var tableSwiper = null;
    function initPageView(){
        container = $("#cost-main");
        var windowHeight = $(window).height()-44-48-40;
        container.css("height",windowHeight+"px");

        var labels = [];
        var data1= [];
        var data2= [];
        var data3= [];
        var data4= [];
        $scope.records.forEach(function(item){
            labels.push(item.month+"月");
            data1.push(item.businessReal);
            data2.push(item.manualWorkReal);
            data3.push(item.mgtFeeReal);
            data4.push(item.projecteal);
        });
        costStackBarChart = createCostStackBarChart(labels,data1,data2,data3,data4);

        $timeout(function(){
            tableSwiper = new Swiper(".table-group .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });
        },300);
    }



    /* ======================================== common methods ======================================== */
    function destroy(){
        costStackBarChart.dispose();
        tableSwiper.destroy(true,true);
    }

    function createCostStackBarChart(labels,data1,data2,data3,data4){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($(container).find(".cost-bar-chart .chart-content")[0]);

        // 指定图表的配置项和数据
        var option = {
            color:["#2bd9dd","#038bd8","#a5ee67","#00b2ef"],
            grid: {
                top:"20",
                left: "15",
                right: "30",
                bottom: "0",
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
                    data: labels,
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show:false
                    },
                    axisLabel: {show: true, textStyle: {color: "#737e8c"}}
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
                    minInterval:30,
                    splitLine:{show:true,lineStyle:{color:["#f2f5f7"]}},
                    axisLabel: {show: true, textStyle: {color: "#737e8c"}}
                }
            ],
            series: [
                {
                    stack:"总量",
                    name:"营销",
                    type:"bar",
                    barWidth:30,
                    data:data1
                },
                {
                    stack:"总量",
                    name:"人工",
                    type:"bar",
                    barWidth:30,
                    data:data2
                },
                {
                    stack:"总量",
                    name:"管理",
                    type:"bar",
                    barWidth:30,
                    data:data3
                },
                {
                    stack:"总量",
                    name:"工程",
                    type:"bar",
                    barWidth:30,
                    data:data4
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        return myChart;
    }





    // 初始化
    function init(){
        var url = "data/data_1/mgt_analysis/cost_analysis/cost_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });
    }
    init();
}]);




