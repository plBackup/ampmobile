ampApp.controller("income-expenses-simulation-header-controller",["$scope","$http","$rootScope","$timeout","simulationCalculationService",function($scope,$http,$rootScope,$timeout,simulationCalculationService){

    /* ======================================== angular 注册事件 ======================================== */
    $scope.save = function(){
        $rootScope.$broadcast("income-expenses-simulation.save");
    };

    // 初始化
    function init(){
    }
    init();
}]);




