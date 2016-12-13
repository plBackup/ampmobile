ampApp.controller("simulation-calculation-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $scope.records = [];

    function initializeData(data){
        $scope.records = data;
    }
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var testIndexSwiper = null;
    var loanRepaymentAnalysisSwiper = null;
    var saleIncomeAnalysisSwiper = null;
    var preTaxCashFlowAnalysisSwiper = null;
    var incomeExpensesSimulationSwiper = null;
    function initPageView(){
        container = $("#simulation-calculation");
        var windowHeight = $(window).height()-44-48;
        container.css("height",windowHeight+"px");

        testIndexSwiper = new Swiper(".test-index-container .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        saleIncomeAnalysisSwiper = new Swiper(".sale-income-analysis .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        loanRepaymentAnalysisSwiper = new Swiper(".loan-repayment-analysis .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        preTaxCashFlowAnalysisSwiper = new Swiper(".pre-tax-cash-flow .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

        incomeExpensesSimulationSwiper = new Swiper(".income-expenses-simulation .swiper-container", {
            slidesPerView:"auto",
            freeMode: true,
            resistanceRatio : 0
        });

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        testIndexSwiper.destroy(true,true);
        loanRepaymentAnalysisSwiper.destroy(true,true);
        saleIncomeAnalysisSwiper.destroy(true,true);
        preTaxCashFlowAnalysisSwiper.destroy(true,true);
        incomeExpensesSimulationSwiper.destroy(true,true);
    }

    // 初始化
    function init(){

        var url = "data/data_1/investment_analysis/simulation_calculation_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);




