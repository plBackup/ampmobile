ampApp.controller("contract-list-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $scope.records = [];

    function initializeData(data){
        $scope.records = data;
    }
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#contract-list");
        var windowHeight = $(window).height()-44-48-41-10-40;
        container.css("height",windowHeight+"px");

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        var mgtAnalysisMenuListWrapper = $("#mgt-analysis-menu-list-wrapper");
        $(mgtAnalysisMenuListWrapper).find(".menu-item-list a.enrolment-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            hideMgtAnalysisMenuList();

        });

        $(mgtAnalysisMenuListWrapper).find(".menu-item-list a.statistic-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            hideMgtAnalysisMenuList();

            showMgtAnalysisPanel();

        });

        $(mgtAnalysisMenuListWrapper).find(".menu-item-list a.filter-btn").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            hideMgtAnalysisMenuList();
        });



    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

    // 初始化
    function init(){

        var url = "data/data_1/mgt_analysis/income_analysis/contract_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);




