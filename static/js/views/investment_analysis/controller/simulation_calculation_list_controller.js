ampApp.controller("simulation-calculation-list-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $scope.records = [];

    function initializeData(data){
        $scope.records = data;
    }
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#simulation-calculation-list");

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

    // 初始化
    function init(){

        var url = "data/data_1/investment_analysis/simulation_calculation_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);




