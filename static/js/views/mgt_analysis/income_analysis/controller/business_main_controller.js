ampApp.controller("business-main-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){
    $scope.records = [];

    function initializeData(data){
        $scope.records = data;
    }
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#business-main");
        var windowHeight = $(window).height()-44-48-41-10-40;
        container.css("height",windowHeight+"px");

        createBusinessBarChart();
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        $("#mgt-analysis-menu-list-wrapper .menu-item-list a.filter-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            hideMgtAnalysisMenuList();
        });
    }



    /* ======================================== common methods ======================================== */
    function destroy(){}

    function createBusinessBarChart(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($(".business-bar-chart .business-bar-chart-content")[0]);

        var labels = ["影院","餐饮","儿童","服装","配套"]; // 横坐标label
        var data = [100,79,82,54,44];



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

        var url = "data/data_1/mgt_analysis/income_analysis/contract_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            $timeout(function(){
                bindPageEvents();
            },300);

        });
    }
    init();
}]);




