ampApp.controller("merchant-sale-type-list-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){

    $rootScope.hideBottom();

    var SELECT_COMMERCIAL_TYPE_FOR_SALE = "select_commercial_type_for_sale";
    var commercialType = globalStorage.getSessionData(SELECT_COMMERCIAL_TYPE_FOR_SALE);

    $scope.records = [];
    $scope.commercialType = commercialType;

    function initializeData(result){
        $scope.records = result.allData[commercialType];
    }

    /* ======================================== angular 注册事件 ======================================== */
    $scope.showMgtAnalysisPanel = function(){
        hideMgtAnalysisMenuList();
        showMgtAnalysisPanel();
    };

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var tableHeaderSwiper = null;
    var tableContentSwiper = null;
    function initPageView(){
        container = $("#merchant-sale-type-list");
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
        },300);

        container.find("a.enrolment-btn").css("display","block");
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        tableHeaderSwiper.destroy(true,true);
        tableContentSwiper.destroy(true,true);
    }



    // 初始化
    function init(){
        var url = "data/data_1/mgt_analysis/rent_analysis/shop_sale_type_list_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });

    }
    init();
}]);




