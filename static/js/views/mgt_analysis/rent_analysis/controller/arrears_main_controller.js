ampApp.controller("arrears-main-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $rootScope.showBottom();
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#arrears-main");
        var windowHeight = $(window).height()-44-48-40;
        container.css("height",windowHeight+"px");

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }







    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);




