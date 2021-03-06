ampApp.controller("contract-detail-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){


    $rootScope.hideBottom();

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    $scope.rightSection = {
        floor:true,
        rent:true,
        payment:true,
        commercial:true
    };

    /* ======================================== angular 注册事件 ======================================== */
    $scope.switchRightSection = function(key){
        $scope.rightSection.floor=true;
        $scope.rightSection.rent=true;
        $scope.rightSection.commercial=true;
        $scope.rightSection.payment=true;
        $scope.rightSection[key]=false;
        console.log(key);
    };


    /* ======================================== 初始化页面 ======================================== */
    var container = null;

    function initPageView(){
        container = $("#contract-detail");
        var windowHeight = $(window).height()-44;
        container.css("height",windowHeight+"px");

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){

    }


    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);




