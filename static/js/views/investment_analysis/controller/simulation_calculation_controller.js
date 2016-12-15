ampApp.controller("simulation-calculation-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $scope.records = [];

    $rootScope.hideBottom();

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
        var windowHeight = $(window).height()-44;
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


        container.on("click",".income-expenses-simulation-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.location = "#/income_expenses_simulation";
        });

        /* ------------------------------ simulation-calculation-parameter-dialog ------------------------------ */

        var parameterDialog = $("#simulation-calculation-parameter-dialog");

        console.log(container);

        container.on("click",".parameter-btn a",function(e){
            e.stopPropagation();
            e.preventDefault();
            console.log(1);
            parameterDialog.removeClass("amp-display-none");
            $(parameterDialog).find(".simulation-calculation-parameter-dialog-content").addClass("amp-animated").addClass("amp-slide-down-in");
        });



        parameterDialog.on("webkitAnimationEnd animationend",".simulation-calculation-parameter-dialog-content",function(){
            if($(this).hasClass("amp-slide-down-out")){
                $(parameterDialog).addClass("amp-display-none");
            }
            $(this).removeClass("amp-slide-down-in");
            $(this).removeClass("amp-slide-down-out");
        });

        parameterDialog.on("click",".simulation-calculation-parameter-dialog-content",function(e){
            e.stopPropagation();
            e.preventDefault();
        });

        parameterDialog.on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(parameterDialog).find(".simulation-calculation-parameter-dialog-content").addClass("amp-animated").addClass("amp-slide-down-out");
        });

        parameterDialog.on("click","a.close-btn,a.save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(parameterDialog).find(".simulation-calculation-parameter-dialog-content").addClass("amp-animated").addClass("amp-slide-down-out");
        });
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




