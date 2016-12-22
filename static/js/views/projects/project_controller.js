/**
 * Created by limeiting on 16/12/7.
 */
var project_create=(function($,pc){
    var project_create=pc;

    project_create.init=function(){
        /*$("#open-date").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left",
            startView:3,
            minView:2,
            maxView:4,
            language:"zh-CN"
        });
*/


    };

    return project_create;
})(jQuery,project_create||{});

var projects = angular.module('projects', [
    'ui.router',
]);
projects.controller("pjHeadController",["$rootScope","$scope","$location","$state",function($rootScope,$scope,$location,$state){
    var self=this;
   self.back=function(){
     $state.go("projectlist");
   };

}]);
projects.controller("pjListController",["$rootScope","$scope","$location","projectsData",function($rootScope,$scope,$location,projectsData){
    var self=this;
    if(!$rootScope.projects){
        $rootScope.projects=projectsData["projects"];
    }
    self.id=12;
    console.log(projectsData["projects"]);
    $rootScope.showHeader();
    $rootScope.hideBottom();

    self.projects=$rootScope.projects;

    self.oRate="开业率";
    self.cRate="完成率";

    self.projectUpdate=function(){
        console.log("project update----------------");
        $location.path("projectupdate");
    };
    self.projectCreate=function(){
        console.log("project create----------------");
        $location.path("projectCreate");
    };

}]);

projects.controller("pjCreateController",["$rootScope","$scope","$location","$state",function($rootScope,$scope,$location,$state){
    //$scope.project=project;
    var self=this;
    $rootScope.showHeader();
    $rootScope.hideBottom();
    self.project={
        "name":"",
        "proportion":"",
        "proportionType":"",
        "openRate":0,
        "income":0,
        "irr":"%",
        "complete":0,
        "noi":{
            "monthly":0,
            "yearly":"0"
        },
        "asset":{
            "value":"",
            "rate":""
        },
        "pm":{
            "name":"",
            "title":"",
            "figure":"male.png",
            "teamNum":0,
            "contact":"email",
            "resume":"/"
        },
        "position":""
    };
    self.form_menu={
        proportionType:["套内面积","建筑面积"],
    };

    self.curState=$rootScope.curState;
    self.index=$rootScope.projects.length;

    self.setModel=function(type,menu){
        self.project[type]=menu;
        return false;
    };

    self.isActive=function(menu,model){
        return menu==model;
    };

    self.submit=function(){
        $rootScope.projects.push(self.project);
       // $location.path("/main");
        $state.go("projectlist");
    };
    self.saveCheck=function(){
        if($scope.projectForm.$invalid) {
            alert("请输入正确的数据");
        }else{
            self.submit();
        }
    };
    project_create.init();
    $scope.$on("$destroy", function() {
        //$("#open-date-wrapper input").datetimepicker("remove");
    });

    var now = new Date(),
        minDate = new Date(now.getFullYear() - 20, 0, 1);

    $('#open-date').mobiscroll().date({
        theme: 'android-holo-light',
        mode: 'scroller',
        display: 'bottom',
        lang: 'zh',
        startYear: (new Date()).getFullYear(),
        endYear: (new Date()).getFullYear() + 30,
        dateFormat: 'yyyy-mm-dd',
        dateOrder: 'yymmdd', //面板中日期排列格式
        //min:minDate,
        minDate:minDate
    });

}]);
projects.controller("pjUpdateController",["$rootScope","$scope","$location","$state","pid",function($rootScope,$scope,$location,$state,pid){
    //$scope.project=project;
    var self=this;
    $rootScope.showHeader();
    $rootScope.hideBottom();

    console.log(pid);
    console.log($rootScope.projects)
    self.pid=pid;

    self.curState=$rootScope.curState;//判断当前页是update 还是create
    self.index="update";
    self.project=$rootScope.projects[pid];

    self.form_menu={
        proportionType:["套内面积","建筑面积"],
    };


    self.setModel=function(type,menu){
       self.project[type]=menu;
    };

    self.isActive=function(menu,model){
        return menu==model;
    };

    self.submit=function(){
        //console.log("...........");
        $state.go("projectlist");
    };

    self.saveCheck=function(){
        if($scope.projectForm.$invalid) {
            alert("请输入正确的数据");
        }else{
            self.submit();
        }
    };

    project_create.init();

    $scope.$on("$destroy", function() {
       // $("#open-date-wrapper input").datetimepicker("remove");
    });

    var now = new Date(),
        minDate = new Date(now.getFullYear() - 20, 0, 1);

    $('#open-date').mobiscroll().date({
        theme: 'android-holo-light',
        mode: 'scroller',
        display: 'bottom',
        lang: 'zh',
        startYear: (new Date()).getFullYear(),
        endYear: (new Date()).getFullYear() + 30,
        dateFormat: 'yyyy-mm-dd',
        dateOrder: 'yymmdd', //面板中日期排列格式
        //min:minDate,
        minDate:minDate
    });
}]);

