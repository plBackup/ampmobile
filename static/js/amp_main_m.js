/**
 * Created by limeiting on 16/12/2.
 */
var ampApp = angular.module('amp', [
    'ui.router',
    'mobile-angular-ui',
    'mobile-angular-ui.gestures',
    "projects",
    'noi'
]);

//这里是gestures里的一个设置，待测试
ampApp.run(function($transform) {
    window.$transform = $transform;
});


ampApp.config(function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    function _timeDefer($q,$timeout){
        var defer = $q.defer();
        $timeout(function(){
            defer.resolve();
        }, 300);
        return defer.promise;
    };

    var states = [
        {
            name: 'projectlist',
            url: '/projectlist',
            views:{
                'header': {
                    templateUrl: './views/projects/project_list_header.html'
                },
                'content': {
                    templateUrl: './views/projects/project_list.html',
                    controller:"pjListController",
                    controllerAs:"listCtrl"
                },
                "sidebarLeft":{
                    templateUrl:"./views/blank.html"
                },
                "sidebarRight":{
                    templateUrl:"./views/blank.html"
                }
            },
            reloadOnSearch: false,
            resolve: {
                projectsData: function(projectService) {
                    return projectService.getAllData();
                },
                data: ['$q','$timeout', _timeDefer]
            }
        }, //state
        {
            name: 'create',
            url: '/create',
            views:{
                'header': {
                    templateUrl: './views/projects/project_create_header.html'
                },
                'content': {
                    templateUrl: './views/projects/project_create.html',
                    controller:"pjCreateController",
                    controllerAs: 'ctrl',
                },
                "sidebarLeft":{
                    templateUrl:"./views/blank.html"
                },
                "sidebarRight":{
                    templateUrl:"./views/blank.html"
                }
            },
            reloadOnSearch: false,
            resolve: {
                data: ['$q','$timeout', _timeDefer]
            }
        },//state,
        {
            name: 'projectupdate',
            url: '/projectupdate/{pid}',
            views:{
                'header': {
                    templateUrl: './views/projects/project_create_header.html'
                },
                'content': {
                    templateUrl: './views/projects/project_create.html',
                    controller:"pjUpdateController",
                    controllerAs: 'ctrl',
                },
                "sidebarLeft":{
                    templateUrl:"./views/blank.html"
                },
                "sidebarRight":{
                    templateUrl:"./views/blank.html"
                }
            },
            reloadOnSearch: false,
            resolve: {
                pid:["$stateParams",function($stateParams){
                    //这里的逻辑是把数据做在 list-> ui-view( create )里的方法
                    var pId=$stateParams.pid;
                    return pId;
                }],
                data: ['$q','$timeout', _timeDefer]
            }
        },//state,

        {
            name: 'noi',
            url: '/noi/{pid}',
            views:{
                'header': {
                    templateUrl: './views/noi_analyse/noi_header.html'
                },
                'content': {
                    templateUrl: './views/noi_analyse/noi.html',
                    controller:"noiController",
                    controllerAs:"noiCtrl"
                },
                "sidebarLeft":{
                    templateUrl:"./views/blank.html"
                },
                "sidebarRight":{
                    templateUrl:"./views/blank.html"
                }
            },
            reloadOnSearch: false,
            resolve: {
                noiAllData: function(noiService) {
                    return noiService.getAllData();
                },
                data: ['$q','$timeout', _timeDefer]
            }
        }, //state
        {
            name: 'rpgset',
            url: '/rpgset',
            views:{
                'header': {
                    templateUrl: './views/datatool/rpg_set_header.html'
                },
                'content': {
                    templateUrl: './views/datatool/datatool_rpg_set_index.html'
                },
                "sidebarLeft":{
                    templateUrl:"./views/blank.html"
                },
                "sidebarRight":{
                    templateUrl:"./views/blank.html"
                }
            },
            reloadOnSearch: false,
            resolve: {
                data: ['$q','$timeout', _timeDefer]
            }
        } //state

    ];


    /* ---------------------------------------- 模拟测算 ---------------------------------------- */
    // 模拟测算 方案列表页
    $stateProvider.state({
        name:"simulation_calculation_list",
        url: "/simulation_calculation_list",
        views:{
            "header":{
                templateUrl:"./views/investment_analysis/simulation_calculation_list_header.html"
            },
            "content": {
                templateUrl: "./views/investment_analysis/simulation_calculation_list.html",
                controller:"simulation-calculation-list-controller"
            }
        },
        resolve: {
            data: ['$q','$timeout', _timeDefer]
        }
    });




    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });

    $urlRouterProvider.when('', '/projectlist');
    //$urlRouterProvider.when('/rpgindex', '/rpgindex/1');
    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/projectlist');
        });

});

ampApp.controller('MainController', function($rootScope, $scope,$location,$timeout) {

    var curProject=window.location.search.slice(1).split("=")[1] ||0;
     console.log(curProject);
     $rootScope.curProject=curProject;
    $rootScope.projectName="商业公司A";

    var self=this;
    self.title="悦商AMP";
    self.menu=menu_list["amp_menu"];

    self.bottomShow=true;
    self.headerShow=true;

    $rootScope.showBottom=function(){
        self.bottomShow=true;
    };
    $rootScope.hideBottom=function(){
        self.bottomShow=false;
    };

    $rootScope.showHeader=function(){
        self.headerShow=true;
    };
    $rootScope.hideHeader=function(){
        self.headerShow=false;
    };

    $rootScope.homePageIsShown = true;
    $scope.state = {};
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        var prev = $rootScope.prev ? $rootScope.prev : '';
        $scope.state.back = (toState.name === prev);
        $scope.state.toHome = (toState.name === 'noi');
        $scope.state.loading=false;
        $scope.state.enter=false;
        $scope.state.exit=true;

    });
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.curState=toState.name;
            $rootScope.prev=fromState.name;
            $scope.state.enter=true;
            $scope.state.exit=false;
            $scope.state.loading=false;
            //console.log("prev:"+fromState.name);

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
});

ampApp.run(function($http) {
    $http.get('./data/projectList.json', { cache: true });
});
