ampApp.controller("merchant-sale-main-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){

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

        chartArr.push(createPieChart($(container).find(".amp-chart-1 .amp-chart-content"),[47,53],"销售占比","47.00%"));
        chartArr.push(createPieChart($(container).find(".amp-chart-2 .amp-chart-content"),[47,53],"销售占比","47.00%"));

        pieSwiper = new Swiper(".pie-group .swiper-container", {
            pagination : '.pie-group .swiper-pagination'
        });

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".record-group-sub td:first-child",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.location = "#/merchant_sale_type_list";
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
        initPageView();
        bindPageEvents();
    }
    init();
}]);




