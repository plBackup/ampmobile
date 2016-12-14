/**
 * Created by limeiting on 16/12/7.
 */

var projects = angular.module('projects', [
    'ui.router',
]);

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

projects.controller("pjCreateController",["$rootScope","$scope","$location",function($rootScope,$scope,$location){
    //$scope.project=project;
    var self=this;
    $rootScope.hideHeader();
    $rootScope.hideBottom();
    self.project={
        "name":"",
        "proportion":"",
        "proportionType":"",
        "openRate":"%",
        "income":0,
        "irr":"%",
        "complete":"",
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
        $location.path("/main");
    };
    self.saveCheck=function(){
        if($scope.projectForm.$invalid) {
            alert("请输入正确的数据");
        }else{
            self.submit();
        }
    };

    $scope.$on("$destroy", function() {
        //$("#open-date-wrapper input").datetimepicker("remove");
    });
}]);
projects.controller("pjUpdateController",["$rootScope","$scope","$location","pid",function($rootScope,$scope,$location,pid){
    //$scope.project=project;
    var self=this;
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
        console.log("...........");
        //$rootScope.projects.push(self.project);
        $location.path("main");
    };

    self.saveCheck=function(){
        if($scope.projectForm.$invalid) {
            alert("请输入正确的数据");
        }else{
            self.submit();
        }
    };

    //project_create.init();

    $scope.$on("$destroy", function() {
       // $("#open-date-wrapper input").datetimepicker("remove");
    });
}]);

