/**
 * Created by limeiting on 16/11/17.
 */

'use strict';

/* Controllers */

var noi = angular.module('noi', ['mobile-angular-ui','ampFilter']);
noi.controller('noiHeadController', ['$rootScope', '$scope',"$timeout","$state","SharedState",
    function($rootScope, $scope,$timeout,$state,SharedState){
        var self=this;
        self.goHome=function(){
            $state.go("projectlist");
        }

    }]);
noi.controller('noiController', ['$rootScope', '$scope',"$timeout","noiAllData","pid","SharedState",
    function($rootScope, $scope,$timeout,noiAllData,pid,SharedState) {
        var self=this;

        $rootScope.showHeader();
        $rootScope.showBottom();
        $rootScope.pageId="noi";

       /* //这里逻辑是正式版
        $rootScope.curProject=pid;
        console.log("pid---="+pid);*/

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

        self.curMonth="2016-07";

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

            SharedState.turnOn("subpageModal");
            $timeout(function(){

                console.log("noi modal swiper--------");
                console.log(noi_modal_swiper);
                console.log(typeof noi_modal_swiper);

                if(typeof noi_modal_swiper !=="undefined"){
                    noi_modal_swiper.destroy(true,true);
                }
                noi_modal_swiper = new Swiper('#amp-tab-modal-swiper', {
                    scrollbar: '.swiper-scrollbar',
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    //mousewheelControl: true,
                    freeMode: true,
                    scrollbarHide:true,
                    watchSlidesProgress:true,
                    observer:true,
                    observeParents:true,
                });

                noi_modal_swiper.update();
            },300);
        };

        self.hideDetail=function(){
            SharedState.turnOff("subpageModal");
            if(typeof noi_modal_swiper!=="undefined"){
                noi_modal_swiper.destroy(true,true);
                noi_modal_swiper=undefined;
            }
        };
       /*swiper */
        var pin;
        var noi_headerInfo_swiper,noi_modal_swiper;
        var swiper_init=function(){
            noi_headerInfo_swiper=new Swiper('#noi-headerInfo-swiper', {
                pagination: '.swiper-pagination',
            });
        };

        $timeout(function(){
            swiper_init();
        },200);



        $scope.$on("$destroy", function() {
            //清除配置,不然swiper会重复请求
            noi_headerInfo_swiper.destroy(true,true);
            if(typeof noi_modal_swiper!=="undefined"){
                noi_modal_swiper.destroy(true,true);
            }
        });


        self.selectedMonth=function(data){
            /*    console.log("----------selected month----------------");
             console.log(self.curMonth);
             console.log(data);*/
            console.log("...............");
            console.log(data);
            //$rootScope.$broadcast("noiMonthUpdate",data);
        };

        /*
                $scope.$on("noiMonthUpdate",function(e,data){
                    console.log("-----------------------noiMonthUpdate");
                    console.log(data);
                })*/

        self.reset=function(){

            self.curMonth="2016-11";
            SharedState.turnOff("uiSidebarRight");
        };
        self.filterData=function(formValia){
            console.log(formValia);
            SharedState.turnOff("uiSidebarRight");
            /*if(formValia){
                alert("请输入正确数据");
            }else{
                //select month
                SharedState.turnOff("uiSidebarRight");
            }*/
        }

    }]);

noi.controller('noiToolController', ['$rootScope','$scope',
    function($rootScope,$scope) {

        $scope.$on("$destroy", function() {
            //清除配置,不然scroll会重复请求
        });
    }]);
