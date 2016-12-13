ampApp.controller("cost-main-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var costStackBarChart = null;
    function initPageView(){
        container = $("#cost-main");
        var windowHeight = $(window).height()-44-48-40;
        container.css("height",windowHeight+"px");

        costStackBarChart = createCostStackBarChart();
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        costStackBarChart.dispose();
    }

    function createCostStackBarChart(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($(container).find(".cost-bar-chart .chart-content")[0]);

        var labels = ["8月","9月","10月"];
        var data1= [10,30,60];
        var data2= [50,30,60];
        var data3= [40,30,60];
        var data4= [30,20,60];

        console.log(labels);

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
        initPageView();
        bindPageEvents();
    }
    init();
}]);




