ampApp.controller("arrears-detail-enrolment-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){


    $rootScope.hideBottom();

    $scope.arrearsItems = [
        {id:1,name:"租金",active:false},
        {id:2,name:"物业管理费",active:false},
        {id:3,name:"其他收入",active:false}
    ];

    $scope.selectedArrearsItem = {};
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== angular 注册事件 ======================================== */
    $scope.selectArrearsItem = function(item){
        $scope.arrearsItems.forEach(function(ele){ele.active=false;});

        item.active=true;
    };

    $scope.saveArrearsItem = function(){
        var selectedItems = $scope.arrearsItems.filter(function(item){
            return item.active;
        });

        if(selectedItems.length>0){
            $scope.selectedArrearsItem = selectedItems[0];
        }
    };

    $scope.showArrearsItemPanel = function(){
        $scope.arrearsItems.forEach(function(ele){
            ele.active=false;
            if(ele==$scope.selectedArrearsItem){
                ele.active=true;
            }
        });
    };


    /* ======================================== 初始化页面 ======================================== */
    var container = null;

    function initPageView(){
        container = $("#arrears-detail-enrolment");
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




