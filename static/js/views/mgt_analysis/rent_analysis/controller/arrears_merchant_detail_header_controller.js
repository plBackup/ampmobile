ampApp.controller("arrears-merchant-detail-header-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){



    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#arrears-merchant-detail-header");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click","a.amp-add-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            toggleMgtAnalysisMenuList();
        });





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



