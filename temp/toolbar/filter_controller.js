/**
 * Created by limeiting on 16/11/18.
 */
var ampFilter=angular.module("ampFilter",[]);

ampFilter.controller('monthFilterController', ['$rootScope', '$scope',"$timeout",
    function($rootScope, $scope, $timeout) {
        var self=this;
        self.selectedMonth=function(data){
        /*    console.log("----------selected month----------------");
           console.log(self.curMonth);
            console.log(data);*/
        console.log("...............");
            console.log(data);
            $rootScope.$broadcast("noiMonthUpdate",data);
        };


       /* $timeout(function(){
            self.curMonth="2017-09";
            console.log("....");

        },3000)*/
        self.curMonth="2016-11";
        $scope.$on("$destroy", function() {
            //清除配置
            //$(".ys-datepicker input").datetimepicker("destory");

        });
        //self.selectedValue=""
    }]);

ampFilter.controller('dataSelectorController', ['$rootScope', '$scope',
    function($rootScope, $scope, $timeout) {
        var self=this;

        $scope.$on("$destroy", function() {
            //清除配置


        });

    }]);

ampFilter.controller('dataFilterController', ['$rootScope', '$scope',
    function($rootScope, $scope, $timeout) {
        var self=this;
        self.filters={
            project:$rootScope.projectName,
            floor:"",
            form:"",
            property:"",
            shopIndex:""

        }
        self.form_menu={
            projects:["商业公司A","商业公司B","商业公司C","商业公司D"],
            floors:["B1","F1","F2","F3","F4","F5","F6"],
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
        }

        self.addNew=function(){
            $scope.$emit("right_open",{"right_open":true});
        };
        self.setModel=function(type,menu){
          self.filters[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.reset=function(){
            self.filters={
                project:$rootScope.projectName,
                floor:"",
                form:"",
                property:"",
                shopIndex:""

            };
            $scope.$emit("data_filter",{
                name:"data_tool",
                filters:self.filters
            });

        };
        self.search=function(){
            console.dir(self.filters);
            $scope.$emit("data_filter",{
                name:"data_tool",
                filters:self.filters
            });
            console.log(self.filters);
        };

        //self.shopIndexFocus=false;
        self.addFocus=function(e){
            $(e.target).closest(".input-group").addClass("out-ring");
        };
        self.removeFocus=function(e){
            $(e.target).closest(".input-group").removeClass("out-ring");
        }

        $scope.$on("$destroy", function() {
            //清除配置
        });

    }]);