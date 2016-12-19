ampApp.controller("contract-list-controller",["$scope","$http","$rootScope","$location",function($scope,$http,$rootScope,$location){
    $rootScope.showBottom();
    $scope.records = [];

    function initializeData(data){
        $scope.records = data;
    }

    $scope.queryStartTime = "2016-08-01";
    $scope.queryEndTime = "2016-10-01";


    /* ======================================== angular 注册事件 ======================================== */
    /* 跳转到合同详情 */
    $scope.goToContractDetail = function(){
        $location.path("contract_detail");
    };

    /* 关闭列表菜单 */
    $scope.closeMenuList = function(){
        hideMgtAnalysisMenuList();
    };

    $scope.showMgtAnalysisPanel = function(){
        hideMgtAnalysisMenuList();
        showMgtAnalysisPanel();
    };

    $scope.showDateTimePicker = function(key,value){

        var arr = value.split("-");

        DateTimeWidget.show({
            year:arr[0],
            month:parseInt(arr[1]),
            date:parseInt(arr[2]),
            callback:function(year,month,date){

                $scope.$apply(function(){
                    if(month<10){
                        month = "0"+month;
                    }
                    if(date<10){
                        date = "0"+date;
                    }
                    $scope[key] = year+"-"+month+"-"+date;
                });
            }
        });
    };




    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#contract-list");
        var windowHeight = $(window).height()-44-48-41;
        container.css("height",windowHeight+"px");

    }


    /* ======================================== common methods ======================================== */
    function destroy(){}

    // 初始化
    function init(){

        var url = "data/data_1/mgt_analysis/income_analysis/contract_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });
    }
    init();
}]);




