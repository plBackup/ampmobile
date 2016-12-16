ampApp.controller("arrears-detail-list-controller",["$scope","$http","$rootScope","$timeout","$location",function($scope,$http,$rootScope,$timeout,$location){
    $rootScope.hideBottom();

    $scope.records = [];
    function initializeData(result){
        $scope.records = result;
    }

    /* ======================================== angular 注册事件 ======================================== */
    $scope.goToArrearsMerchantDetail = function(item){
        $location.path("arrears_merchant_detail");

        var SELECTED_ARREARS_MERCHANT_NAME = "selected_arrears_merchant_name";
        globalStorage.setSessionData(SELECTED_ARREARS_MERCHANT_NAME,item.merchantName);
    };

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var tableHeaderSwiper = null;
    var tableContentSwiper = null;
    function initPageView(){
        container = $("#arrears-detail-list");
        var windowHeight = $(window).height()-44;
        container.css("height",windowHeight+"px");


        $timeout(function(){
            tableHeaderSwiper = new Swiper(".table-group-header .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            tableContentSwiper = new Swiper(".table-group-content .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            tableHeaderSwiper.params.control = tableContentSwiper;//需要在Swiper2初始化后，Swiper1控制Swiper2
            tableContentSwiper.params.control = tableHeaderSwiper;//需要在Swiper1初始化后，Swiper2控制Swiper1
        },500);
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        tableHeaderSwiper.destroy(true,true);
        tableContentSwiper.destroy(true,true);
    }



    // 初始化
    function init(){

        var url = "data/data_1/mgt_analysis/rent_analysis/arrears_detail_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });

    }
    init();
}]);




