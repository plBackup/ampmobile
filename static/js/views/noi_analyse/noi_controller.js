/**
 * Created by limeiting on 16/11/17.
 */

'use strict';

/* Controllers */

var noi = angular.module('noi', [
]);

noi.controller('noiController', ['$rootScope', '$scope',"noiAllData",
    function($rootScope, $scope,noiAllData) {
        var self=this;
        self.allData=noiAllData;

        self.noiData=noiAllData.noi[0].values;
        self.incomeData=noiAllData.income;
        self.feeData=noiAllData.fee;
        self.arrearageData=noiAllData.arrearage;
        self.chartData=noiAllData.chart;

        self.isSplit=function(index){
            return (index+1)%4==0;
        }

       /*swiper */
        var pin;
        var noi_head_swiper,noi_main_swiper;
        var swiper_init=function(){
            noi_head_swiper = new Swiper('#noi-main-table-head', {
                //scrollbar: '.swiper-scrollbar',
                direction: 'horizontal',
                slidesPerView: 'auto',
                //mousewheelControl: true,
                freeMode: true,
                scrollbarHide:true,
                //watchSlidesProgress:true,
            });


            noi_main_swiper = new Swiper('#noi-main-table', {
                scrollbar: '.swiper-scrollbar',
                direction: 'horizontal',
                slidesPerView: 'auto',
                //mousewheelControl: true,
                freeMode: true,
                scrollbarHide:false,
                //watchSlidesProgress:true,
            });
            noi_head_swiper.params.control = noi_main_swiper;
            noi_main_swiper.params.control = noi_head_swiper;

            //这里把swiper实例加入全局的垃圾回收站
            /*ampApp.collector.add_swiper(noi_head_swiper);
            ampApp.collector.add_swiper(noi_main_swiper);*/

            pin=$(".ys-table-fixed-top").pin({
                containerSelector: "#noi-main-table-wrapper",
                padding: {top: 44, bottom: 50}
            });
        };

        var table_init=function(){
            $(".ys-table-main").on("mouseenter","tr",function(e){
                var index=$(this).index();
                var parentTagName=$(this).parent().get(0).tagName;
                $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                    $(this).find("tr").eq(index).addClass("hover");
                });
            });

            $(".ys-table-main").on("mouseleave","tr",function(e){
                var index=$(this).index();
                var parentTagName=$(this).parent().get(0).tagName;
                $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                    $(this).find("tr").eq(index).removeClass("hover");
                });

            });

            $(".ys-table-main").on("click","tbody>tr",function(e){
                if($(this).hasClass("tr-main")){
                    var index=$(this).index();
                    $(this).closest(".ys-table-main").find(".amp-table").each(function(i,e){
                        var $trMain=$(this).find("tr").eq(index);
                        $trMain.toggleClass("tr-collapse");
                        if($trMain.hasClass("tr-collapse")){
                            $trMain.nextUntil(".tr-main","tr").addClass("tr-collapsed");

                        }else{
                            //展开时，要判断 tr-sub-main的状态，来更改tr-tri的折叠状态
                            $trMain.nextUntil(".tr-main","tr.tr-sub").removeClass("tr-collapsed");
                            var sub_main_collapse= false;
                            $trMain.nextUntil(".tr-main","tr.tr-tri").each(function(i,e){
                                if(i==0){

                                    sub_main_collapse=$(this).prev(".tr-sub-main").hasClass("tr-collapse");
                                }

                                if(!sub_main_collapse){
                                    $(this).removeClass("tr-collapsed");
                                }
                            });
                        }
                    });
                    pin.refresh();
                }

                if($(this).hasClass("tr-sub-main")){
                    var index=$(this).index();
                    $(this).closest(".ys-table-main").find(".amp-table").each(function(i,e){
                        $(this).find("tr").eq(index).toggleClass("tr-collapse").nextUntil(".tr-sub").toggleClass("tr-collapsed");
                    });
                }
            });

            $("#noi-arrearage").on("click","tr.tr-main",function(e){
                $(this).toggleClass("tr-collapse").nextAll("tr.tr-sub").toggle();
            });

            //初始化折叠项目
            $(".tr-init-collapse").trigger("click");
        };

        swiper_init();
        table_init();



        $scope.$on("$destroy", function() {
            //清除配置,不然swiper会重复请求

            noi_head_swiper.destroy(true,true);
            noi_main_swiper.destroy(true,true);
        });

        $scope.$on("noiMonthUpdate",function(e,data){
           /* console.log("-----------------------noiMonthUpdate");
            console.log(data);*/
        })

    }]);

noi.controller('noiToolController', ['$rootScope','$scope',
    function($rootScope,$scope) {

        $scope.$on("$destroy", function() {
            //清除配置,不然scroll会重复请求
        });
    }]);
