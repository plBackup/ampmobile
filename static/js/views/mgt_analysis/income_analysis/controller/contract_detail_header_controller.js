ampApp.controller("contract-detail-header-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){



    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#contract-detail-header");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);




