ampApp.controller("arrears-main-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){
    $rootScope.showBottom();
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


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

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        var mgtAnalysisMenuListWrapper = $("#mgt-analysis-menu-list-wrapper");

        $(mgtAnalysisMenuListWrapper).find(".menu-item-list a.filter-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            hideMgtAnalysisMenuList();
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        tableSwiper.destroy(true,true);
    }







    // 初始化
    function init(){
        initPageView();
        $timeout(function(){
            bindPageEvents();
        },300);

    }
    init();
}]);




