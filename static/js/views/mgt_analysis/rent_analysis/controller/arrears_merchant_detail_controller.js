ampApp.controller("arrears-merchant-detail-controller",["$scope","$http","$rootScope","$timeout",function($scope,$http,$rootScope,$timeout){

    $rootScope.hideBottom();

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;

    function initPageView(){


        container = $("#arrears-merchant-detail");
        var windowHeight = $(window).height()-44;
        container.css("height",windowHeight+"px");

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".table-block tr",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).toggleClass("checked");
        });

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

    }


    // 初始化
    function init(){
        initPageView();

        $timeout(function(){bindPageEvents();},300);

    }
    init();
}]);




