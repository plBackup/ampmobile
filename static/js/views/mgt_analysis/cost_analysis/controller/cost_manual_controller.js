ampApp.controller("cost-manual-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){
    $rootScope.hideBottom();

    $scope.result = [];

    function initializeData(data){
        $scope.result = data;
    }

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== angular 注册事件 ======================================== */
    $scope.toggleRecord = function(){
        var sections = ["mgtDept","adminDept","financeDept","planningDept","investmentDept","serviceDept","businessDept","engineeringDept"];
        sections.forEach(function(key){
            $scope.result[key].forEach(function(item){
                item.hide = !item.hide;
            })
        });

        /* 重新 修改高度 - fix safari 上的bug */
        var height = $(container).find(".scrollable").css("height");
        $(container).find(".scrollable-content").css({
            "height":height,
            "overflow": "auto",
            "-webkit-overflow-scrolling":"touch"
        });
        $timeout(function(){
            $(container).find(".scrollable-content").css({
                "height":height,
                "overflow": "auto",
                "-webkit-overflow-scrolling":"touch"
            });
        },300);
    };


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var tableHeaderSwiper = null;
    var tableContentSwiper = null;
    function initPageView(){
        container = $("#cost-manual");
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

        container.find("a.enrolment-btn").show();
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        tableHeaderSwiper.destroy(true,true);
        tableContentSwiper.destroy(true,true);
    }



    // 初始化
    function init(){
        var url = "data/data_1/mgt_analysis/cost_analysis/cost_manual_work_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });
    }
    init();
}]);




