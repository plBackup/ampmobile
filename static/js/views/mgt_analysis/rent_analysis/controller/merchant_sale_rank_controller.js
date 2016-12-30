ampApp.controller("merchant-sale-rank-controller",["$scope","$http","$rootScope","$timeout","$filter",function($scope,$http,$rootScope,$timeout,$filter){
    $rootScope.hideBottom();



    $scope.result = {}; // 销售额(元)/平效/租售比
    $scope.selectedResult= {}; // 当前数据源

    $scope.display = {
        sale:true,// 默认显示 销售额
        performance:false,
        rate:false
    };

    function initializeData(data){
        // 格式化 销售额/平效 数据
        var formatList =data.sale.top.concat(data.sale.bottom).concat(data.performance.top).concat(data.performance.bottom);
        formatList.forEach(function(item){
            item.rankValue = $filter("numberFormatDefault")(item.rankValue,"-",0);
        });


        $scope.result = data;
        $scope.selectedResult = data.sale;
        console.log(data);
    }

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== angular 注册事件 ======================================== */
    $scope.switchData = function(key){
        $scope.display.sale = false;
        $scope.display.performance = false;
        $scope.display.rate = false;
        $scope.display[key] = true;
        $scope.selectedResult = $scope.result[key];

    };



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#merchant-sale-rank");
        var windowHeight = $(window).height()-44;
        container.css("height",windowHeight+"px");



    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }



    // 初始化
    function init(){
        var url = "data/data_1/mgt_analysis/rent_analysis/merchant_sale_rank_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });
    }
    init();
}]);

