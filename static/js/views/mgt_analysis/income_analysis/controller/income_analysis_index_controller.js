ampApp.controller("income-analysis-index-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){


    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#income-analysis-index");

    }

    $scope.contract_tab_active = true;
    $scope.business_tab_active = false;
    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        container.on("click",".income-analysis-nav-bar a",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".income-analysis-nav-bar").find("a").removeClass("active");
            $(this).addClass("active");

            var that = this;
            setTimeout(function(){
                $(that).addClass("active");
            },300);

            var dataHref = $(this).attr("data-href");
            window.location = dataHref;
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);




