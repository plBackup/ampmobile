ampApp.controller("merchant-sale-type-list-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){


    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var tableHeaderSwiper = null;
    var tableContentSwiper = null;
    function initPageView(){
        container = $("#merchant-sale-type-list");
        var windowHeight = $(window).height()-44-48;
        container.css("height",windowHeight+"px");


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
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        var mgtAnalysisMenuListWrapper = $("#mgt-analysis-menu-list-wrapper");


        $(mgtAnalysisMenuListWrapper).find(".menu-item-list a.statistic-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            hideMgtAnalysisMenuList();

            showMgtAnalysisPanel();

        });


    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        tableHeaderSwiper.destroy(true,true);
        tableContentSwiper.destroy(true,true);
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




