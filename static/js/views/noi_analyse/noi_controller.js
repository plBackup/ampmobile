/**
 * Created by limeiting on 16/11/17.
 */

'use strict';

/* Controllers */

var noi = angular.module('noi', ['mobile-angular-ui',
]);
noi.controller('noiHeadController', ['$rootScope', '$scope',"$timeout","$state","SharedState",
    function($rootScope, $scope,$timeout,$state,SharedState){
        var self=this;
        self.goHome=function(){
            $state.go("projectlist");
        }

    }]);
noi.controller('noiController', ['$rootScope', '$scope',"$timeout","noiAllData","SharedState",
    function($rootScope, $scope,$timeout,noiAllData,SharedState) {
        var self=this;

        $rootScope.showHeader();
        $rootScope.showBottom();
        $rootScope.pageId="noi";

        SharedState.initialize($scope, "activeTab");
        //SharedState.initialize($scope, "activeTab");

        SharedState.setOne("activeTab",1);

        console.log("-------------");
        console.log($scope.activeTab);
        self.activeTab=1;
        self.setActiveTab=function(n){
            self.activeTab=n;
        };

        self.activeModalTab=1;
        self.setActiveModalTab=function(n){
            self.activeModalTab=n;
        };

        self.noiModal="";

        self.allData=noiAllData;
        self.noiData=noiAllData.noi[0].values;
        self.incomeData=noiAllData.income;
        self.feeData=noiAllData.fee;
        self.arrearageData=noiAllData.arrearage;
        self.chartData=noiAllData.chart;

        self.isSplit=function(index){
            return (index+1)%4==0;
        };

        self.modalTitle="";

        self.viewDetail=function(dataType){

            SharedState.turnOn("subpageModal");
            $timeout(function(){
                if(typeof noi_modal_swiper !=="undefined"){
                    noi_modal_swiper.destroy(true,true);
                }
                noi_modal_swiper = new Swiper('#amp-tab-modal-swiper', {
                    scrollbar: '.swiper-scrollbar',
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    //mousewheelControl: true,
                    freeMode: true,
                    scrollbarHide:false,
                    //watchSlidesProgress:true,
                });
            },200);

          switch(dataType){
              case "income":
                  self.modalTitle="收入";
                  self.noiModal="income";
                  break;

              case "fee":
                  self.modalTitle="费用";
                  self.noiModal="fee";
                  break;

              case "noi":
                  self.modalTitle="NOI";
                  self.noiModal="noi";
                  break;

              case "profits":
                  self.modalTitle="利润率";
                  self.noiModal="profits";
                  break;

              case "arrearage":
                  self.modalTitle="欠费";
                  self.noiModal="arrearage";
                  break;
              default:
                  self.modalTitle="收入";
                  self.noiModal="income";
                  return;
          }
        };
       /*swiper */
        var pin;
        var noi_headerInfo_swiper,noi_modal_swiper;
        var swiper_init=function(){
            noi_headerInfo_swiper=new Swiper('#noi-headerInfo-swiper', {
                pagination: '.swiper-pagination',
            });
            /*noi_modal_swiper = new Swiper('#amp-tab-modal-swiper', {
                scrollbar: '.swiper-scrollbar',
                direction: 'horizontal',
                slidesPerView: 'auto',
                //mousewheelControl: true,
                freeMode: true,
                scrollbarHide:false,
                //watchSlidesProgress:true,
            });*/
        };

        var table_init=function(){

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

        $timeout(function(){
            swiper_init();
            table_init();

        },200);



        $scope.$on("$destroy", function() {
            //清除配置,不然swiper会重复请求
            noi_headerInfo_swiper.destroy(true,true);
            if(typeof noi_modal_swiper!=="undefined"){
                noi_modal_swiper.destroy(true,true);
            }
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
