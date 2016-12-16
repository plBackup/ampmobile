ampApp.controller("merchant-sale-type-list-header-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){

    var SELECT_COMMERCIAL_TYPE_NAME_FOR_SALE = "select_commercial_type_name_for_sale";
    var commercialTypeName = globalStorage.getSessionData(SELECT_COMMERCIAL_TYPE_NAME_FOR_SALE);

    $scope.commercialTypeName = commercialTypeName;

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("$stateChangeSuccess",function(evt,toState,toParams,fromState,formParams){
    });

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#merchant-sale-type-list-header");
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




