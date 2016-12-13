ampApp.controller("mgt-analysis-index-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){


    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#mgt-analysis-index");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".mgt-analysis-nav-bar li a",function(e){
            e.stopPropagation();
            e.preventDefault();
            var dataHref = $(this).attr("data-href");
            if(dataHref==null||dataHref==""){
                return;
            }
            $(this).closest(".mgt-analysis-nav-bar ").find("a").removeClass("active");
            $(this).addClass("active");
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




