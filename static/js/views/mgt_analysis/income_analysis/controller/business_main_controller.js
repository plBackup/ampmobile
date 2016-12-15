ampApp.controller("business-main-controller",["$scope","$http","$rootScope","$timeout","$filter",function($scope,$http,$rootScope,$timeout,$filter){
    $scope.records = [];

    $scope.rentData = [];// 租金
    $scope.propertyData = [];// 物管费
    $scope.fullYear = false; // 是否切换到全年

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

    /* 关闭 选项菜单 */
    $scope.closeMenuList = function(){
        hideMgtAnalysisMenuList();
    };

    function initializeData(data){
        $scope.rentData = data.rentData;
        $scope.propertyData = data.propertyData;
        $scope.records =  $scope.rentData;
    }
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

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

        createBusinessBarChart(labels,data);
    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

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




