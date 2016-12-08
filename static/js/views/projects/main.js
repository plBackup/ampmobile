/**
 * Created by limeiting on 16/11/15.
 */
/* App Module */
var project_create=(function($,pc){
    var project_create=pc;

    project_create.init=function(){
        $("#open-date").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left",
            startView:3,
            minView:2,
            maxView:4,
            language:"zh-CN"
        });
        $(".input-select").each(function(i,e){
            var curVal=$(this).find("input").val();
            if(curVal!=""){
                $(this).find("button.dropdown-toggle>em").text(curVal);
                $(this).find(".dropdown-menu a").each(function(i,e){
                    if($(this).text().trim()==curVal){
                        $(this).closest("li").addClass("active");
                    }
                });
            }
        });

        $(".input-select").on("click",".dropdown-menu a",function(e){
           /* alert("....");*/
            var $select=$(this).closest(".input-select");
            var $this=$(this);
            e.preventDefault();
            var curSelect=$this.text().trim();
            $this.closest("ul.dropdown-menu").find("li").removeClass("active");
            $this.parent("li").addClass("active");

            $select.find("button.dropdown-toggle>em").text(curSelect);
            $select.find("input").val(curSelect);

        });
    };

    return project_create;
})(jQuery,project_create||{});


var mainApp = angular.module('main', [
    'ui.router',
]);


mainApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [
        {
            name: 'main',
            url: '/main',
            views:{
                'content': {
                    templateUrl: '../main/main_ag.html',
                    controller:'pjListController',
                    controllerAs: 'listCtrl'
                },
            },

            resolve: {
                projects: function(ProjectService) {
                    return ProjectService.getAllProject();
                },
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'create',
            url: '/create',
            views:{
                'content': {
                    templateUrl: '../main/create_project.html',
                    controller:"pjCreateController",
                    controllerAs: 'ctrl',
                },
            },

            resolve: {
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                    }, 300);
                    return defer.promise;
                }]
            }
        },//state,
        {
            name: 'update',
            url: '/update/{projectId}',
            views:{
                'content': {
                    templateUrl: '../main/create_project.html',
                    controller:"pjUpdateController",
                    controllerAs: 'ctrl',
                },
            },

            resolve: {
              /*  project:["projects","$stateParams",function(projects,$stateParams){
                    //这里的逻辑是把数据做在 list-> ui-view( create )里的方法
                    var pId=$stateParams.projectId;
                    //console.log(projects);
                    //console.log(pId);
                    return projects[pId];
                    /!* return projects.find(function (project) {
                     return project.id==pId;
                     })*!/
                }],*/
                pid:["$stateParams",function($stateParams){
                    //这里的逻辑是把数据做在 list-> ui-view( create )里的方法
                    var pId=$stateParams.projectId;
                    return pId;
                }],
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                    }, 300);
                    return defer.promise;
                }]
            }
        }//state
    ];//end states;

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
    $urlRouterProvider.when('', '/main');

    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/main');
        });
}]);

/*mainApp.service('ProjectService', function($http) {
    var service = {
        getAllProject: function() {
            return $http.get('../data/projectList.json', { cache: true }).then(function(res) {
                return res.data['projects'];
            });
        },

        getProject: function(id) {
            function projectMatchesParam(project) {
                return project.id === id;
            }

            return service.getAllProject().then(function (project) {
                return project.find(projectMatchesParam)
            });
        },
    };

    return service;
});*/

mainApp.filter("default",function(){
    return function(data,str){
        if(typeof str==="undefined"){
            return data;
        }else{
            if(typeof data==="undefined" || data==""){
                return str;
            }
            return data;
        }
    }
}).filter("percentFormat",function(){
    //检查非负浮点数
    function checkNum(num){
        //var patt=/^\d+(\.\d+)?$/g;
        var patt=/^(-?\d+)(\.\d+)?$/g;
        return patt.test(num);
    }

    return function(input){
        if(checkNum(input)){
            return parseFloat(input*100).toFixed(2)+"%";
        }else{
            return input
        }
    }
});

mainApp.controller('MainController', function($rootScope, $scope) {
    $rootScope.homePageIsShown = true;

    $scope.state = {};
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        var prev = $rootScope.prev ? $rootScope.prev : '';
        $scope.state.back = (toState.name === prev);
        $scope.state.toHome = (toState.name === 'noi');
        $scope.state.loading=false;
        $scope.state.enter=false;
        $scope.state.exit=true;
        // $scope.$apply();
    });
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.curState=toState.name;
            $rootScope.prev=fromState.name;
            $scope.state.enter=true;
            $scope.state.exit=false;
            $scope.state.loading=false;
        });
    $rootScope.$on('$viewContentLoading',
        function(event, viewConfig){
            // Access to all the view config properties.
            // and one special property 'targetView'
            // viewConfig.targetView
            $scope.state.loading=true;
        });

    $scope.$on('$viewContentLoaded',
        function(event){
            $scope.state.loading=false;
        });

    function _isPC()
    {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var isPC= true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { isPC = false; break; }
        }
        return isPC;
    }

    $(".ys-tips").tooltip();

});

mainApp.controller("pjListController",["$rootScope","$scope","projects",function($rootScope,$scope,projects){
    var self=this;
    if(!$rootScope.projects){
        $rootScope.projects=projects;
    }
    self.projects=$rootScope.projects;
    $(".ys-tips").tooltip();
}]);
mainApp.controller("testCtrl",function($rootScope,$scope){
    $scope.name="txt";
});

mainApp.controller("pjCreateController",["$rootScope","$scope","$location",function($rootScope,$scope,$location){
    //$scope.project=project;
    var self=this;
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
        $("#open-date-wrapper input").datetimepicker("remove");
    });

}]);
mainApp.controller("pjUpdateController",["$rootScope","$scope","$location","pid",function($rootScope,$scope,$location,pid){
    //$scope.project=project;
    var self=this;
    self.pid=pid;
    self.curState=$rootScope.curState;
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
        $location.path("/main");
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
       $("#open-date-wrapper input").datetimepicker("remove");
    });

    $(".ys-tips").tooltip();
}]);

mainApp.run(function($http) {
    $http.get('./data/projectList.json', { cache: true });
});
