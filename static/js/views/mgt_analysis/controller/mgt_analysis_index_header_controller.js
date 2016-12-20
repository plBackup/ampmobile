ampApp.controller("mgt-analysis-index-header-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){



    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("$stateChangeSuccess",function(evt,toState,toParams,fromState,formParams){
    });

    $scope.$on("$stateChangeStart",function(evt,toState,toParams,fromState,formParams){
        hideMgtAnalysisMenuList();
    });

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#mgt-analysis-index-header");
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




