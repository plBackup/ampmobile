ampApp.controller("arrears-merchant-detail-controller",["$scope","$http","$rootScope","$timeout","$filter",function($scope,$http,$rootScope,$timeout,$filter){

    $rootScope.hideBottom();


    var SELECTED_ARREARS_MERCHANT_NAME = "selected_arrears_merchant_name";
    var merchantName = globalStorage.getSessionData(SELECTED_ARREARS_MERCHANT_NAME);

    $scope.records = [];
    $scope.merchantName = merchantName;

    function initializeData(result){
        $scope.records = $filter("filter")(result,{merchantName:merchantName});
    }

    /* ======================================== angular 注册事件 ======================================== */
    $scope.showMgtAnalysisPanel = function(){
        hideMgtAnalysisMenuList();
        showMgtAnalysisPanel();
    };

    $scope.toggleCheckRecord = function(item){
        item.checked = !item.checked;
        console.log(item.checked);
    };

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;

    function initPageView(){
        container = $("#arrears-merchant-detail");
        var windowHeight = $(window).height()-44;
        container.css("height",windowHeight+"px");
    }

    /* ======================================== common methods ======================================== */
    function destroy(){

    }


    // 初始化
    function init(){
        var url = "data/data_1/mgt_analysis/rent_analysis/arrears_merchant_detail_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });
    }
    init();
}]);




