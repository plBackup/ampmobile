ampApp.controller("mgt-analysis-index-controller",["$scope","$http","$rootScope","$location",function($scope,$http,$rootScope,$location){
    $scope.tabList = [
        {name:"收入分析",location:"/mgt_analysis/contract_list",active:false},
        {name:"支出分析",location:"/mgt_analysis/cost_main",active:false},
        {name:"租赁分析",location:"/mgt_analysis/rent_main",active:false},
        {name:"运营分析",location:"/mgt_analysis/passenger_flow_main",active:false}
    ];

    var pathConfig = [
        {index:0,paths:["/mgt_analysis/contract_list","/mgt_analysis/business_main"]},
        {index:1,paths:["/mgt_analysis/cost_main"]},
        {index:2,paths:["/mgt_analysis/rent_main","/mgt_analysis/rent_main","/mgt_analysis/merchant_sale_main","/mgt_analysis/arrears_main"]},
        {index:3,paths:["/mgt_analysis/passenger_flow_main"]}
    ];

    // 获取 包含指定 path 的索引
    function getIndexWithSpecialPath(path){
        var result = pathConfig.filter(function(item){
            var paths = item.paths;
            var contained = paths.some(function(p){
                return path.indexOf(p)>-1;
            });

            if(contained){
                return true;
            }
        });
        if(result==null||result.length==0){
            return 0;// 默认第一个
        }
        return result[0].index;
    }

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("$viewContentLoading",function(event,viewConfig){
        var path = $location.path();
        if(path=="/mgt_analysis"){

            $location.path("/mgt_analysis/contract_list");

            return;
        }

        var index = getIndexWithSpecialPath(path);
        $scope.tabList[index].active=true;
    });

    /* ======================================== angular 注册事件 ======================================== */
    $scope.changeTab = function(item){
        $scope.tabList.forEach(function(tabItem){
            tabItem.active = false;
            if(item==tabItem){
                item.active = true;
            }
        });
        $location.path(item.location);
    };


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#mgt-analysis-index");
    }

    /* ======================================== 绑定事件 ======================================== */


    /* ======================================== common methods ======================================== */
    function destroy(){}

    // 初始化
    function init(){
        initPageView();
    }
    init();
}]);




