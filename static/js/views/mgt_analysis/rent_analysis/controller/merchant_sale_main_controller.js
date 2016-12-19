ampApp.controller("merchant-sale-main-controller",["$scope","$http","$rootScope","$location",function($scope,$http,$rootScope,$location){

    $rootScope.showBottom();

    $scope.records = [];

    function initializeData(result){
        $scope.records = result;
    }

    /* ======================================== angular 注册事件 ======================================== */
    $scope.switchTable = function(isFullYear){
        $scope.fullYear = isFullYear;
    };

    /* table 内容收起/展开 */
    $scope.collapseTable = function(item){
        if(item.hasCollapseBtn){
            item.collapsed = !item.collapsed;
            var groupId = item.dataGroup;

            $scope.records.forEach(function(itemRecord){
                if(groupId==itemRecord.dataGroup&&!itemRecord.hasCollapseBtn){
                    itemRecord.hide=!itemRecord.hide;
                }
            });
        }
    };

    $scope.closeMenuList = function(){
        hideMgtAnalysisMenuList();
    };

    $scope.goToMerchantSaleTypeList = function(item){
        if(item.subRecord){
            var type = item.commercialTypeName;
            if(type=="餐饮"){
                type = "catering";
            }else if(type=="配套"){
                type = "mating";
            }else if(type=="服装"){
                type = "clothing";
            }else if(type=="儿童"){
                type = "children";
            }else if(type=="影院"){
                type = "cinema";
            }else{
                return;
            }

            var SELECT_COMMERCIAL_TYPE_FOR_SALE = "select_commercial_type_for_sale";
            var SELECT_COMMERCIAL_TYPE_NAME_FOR_SALE = "select_commercial_type_name_for_sale";
            globalStorage.setSessionData(SELECT_COMMERCIAL_TYPE_FOR_SALE,type);
            globalStorage.setSessionData(SELECT_COMMERCIAL_TYPE_NAME_FOR_SALE,item.commercialTypeName);
            $location.path("/merchant_sale_type_list");
        }
    };

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var chartArr = [];
    var pieSwiper = null;
    function initPageView(){
        container = $("#merchant-sale-main");
        var windowHeight = $(window).height()-44-48-40;
        container.css("height",windowHeight+"px");

        var saleRate = (16251462.38/(16251462.38+17696209.62)*100).toFixed(2);
        var squareRate = (93/(93+117)*100).toFixed(2);
        chartArr.push(createPieChart($(container).find(".amp-chart-1 .amp-chart-content"),[16251462.38,17696209.62],"销售占比",saleRate+"%"));
        chartArr.push(createPieChart($(container).find(".amp-chart-2 .amp-chart-content"),[93,117],"销售占比",squareRate+"%"));

        pieSwiper = new Swiper(".pie-group .swiper-container", {
            pagination : '.pie-group .swiper-pagination'
        });

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        pieSwiper.destroy(true,true);
        chartArr.forEach(function(item){
           item.dispose();
        });
    }

    function createPieChart(selector,data,textLabel,textValue) {
        var myChart = echarts.init($(selector)[0]);
        var option = {
            color:["#5ab46e","#d9dedf"],
            series: [
                {
                    name:"销售",
                    type:"pie",
                    radius: ["75px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data:data,
                    silent: false,
                    hoverAnimation:false
                }
            ]
        };

        myChart.setOption(option);

        var html =  "<div class='pie-text'>" +
                        "<em>"+textLabel+"</em>"+
                        "<div>"+textValue+"</div>"+
                    "</div>";

        $(selector).append(html);

        return myChart;
    }






    // 初始化
    function init(){
        var url = "data/data_1/mgt_analysis/rent_analysis/merchant_sale_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
        });
    }
    init();
}]);




