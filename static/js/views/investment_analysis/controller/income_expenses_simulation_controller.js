ampApp.controller("income-expenses-simulation-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){
    $scope.records = [];


    $rootScope.hideBottom();

    $scope.incomeExpense={
        headers:[1,2,3],
        contents:[{},{},{}]
    };

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var tableHeaderSwiper = null;
    var tableContentSwiper = null;
    function initPageView(){
        container = $("#income-expenses-simulation");
        var windowHeight = $(window).height()-44;
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

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        tableHeaderSwiper.destroy(true,true);
        tableContentSwiper.destroy(true,true);
    }

    function updateSwiper(){
        tableHeaderSwiper.update();
        tableContentSwiper.update();
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();

        $timeout(function(){
            updateSwiper();
        },300);
    }
    init();
}]);




