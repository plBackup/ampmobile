ampApp.controller("arrears-main-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){
    $rootScope.showBottom();

    $scope.records = [];

    function initializeData(result){
        $scope.records = result;
    }

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== angular 注册事件 ======================================== */
    $scope.closeMenuList = function(){
        hideMgtAnalysisMenuList();
    };

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var tableSwiper = null;
    function initPageView(){
        container = $("#arrears-main");
        var windowHeight = $(window).height()-44-48-40;
        container.css("height",windowHeight+"px");

        tableSwiper = new Swiper(".table-group .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        container.find("a.arrears-detail-btn").show();

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        tableSwiper.destroy(true,true);
    }

    // 初始化
    function init(){
        var url = "data/data_1/mgt_analysis/rent_analysis/arrears_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });
    }
    init();
}]);




