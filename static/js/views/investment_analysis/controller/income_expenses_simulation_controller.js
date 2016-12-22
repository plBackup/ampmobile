ampApp.controller("income-expenses-simulation-controller",["$scope","$http","$rootScope","$timeout","$location","simulationCalculationService",function($scope,$http,$rootScope,$timeout,$location,simulationCalculationService){

    var SELECTED_CASE_INFO = "selected_case_info";
    var caseInfo = globalStorage.getSessionData(SELECTED_CASE_INFO);


    $rootScope.hideBottom();


    $scope.result = caseInfo;

    /* ======================================== angular 注册事件 ======================================== */
    $scope.$watch("result",function(newVal, oldVal,scope){
        simulationCalculationService.recalculateIncomeExpense($scope.result); // 重新设置 收支模拟
    },true);

    $scope.addListRecord = function(){
        var len = $scope.result.incomeExpense.headers.length;
        $scope.result.incomeExpense.headers.push(len+1);
        $scope.result.incomeExpense.contents.push({});
        updateSwiper();
    };

    $scope.removeListRecord = function(){
        $scope.result.incomeExpense.headers.pop();
        $scope.result.incomeExpense.contents.pop();
        var translate = tableContentSwiper.getWrapperTranslate();
        tableContentSwiper.setWrapperTranslate(translate+125);
        updateSwiper();
    };

    $scope.$on("income-expenses-simulation.save",function(){
        var SELECTED_CASE_INFO = "selected_case_info";
        globalStorage.setSessionData(SELECTED_CASE_INFO,$scope.result);

        $location.path("/simulation_calculation");
    });

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
    var promise = null;
    function updateSwiper(){
        $timeout.cancel(promise);

        promise = $timeout(function(){
            tableHeaderSwiper.update();
            tableContentSwiper.update();
        },300);

    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
        updateSwiper();
    }
    init();
}]);




