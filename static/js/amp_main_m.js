/**
 * Created by limeiting on 16/12/2.
 */
var ampApp = angular.module('amp', [
    'ui.router',
    'mobile-angular-ui',
    'mobile-angular-ui.gestures',
    "projects",
    'noi',
    'dataTool',
    "amp-common-filters"
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
                    controllerAs: 'ctrl'
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
                    controllerAs: 'ctrl'
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
                    templateUrl: './views/noi_analyse/noi_index.html',
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
            name: 'datatool',
            url: '/datatool',
            views:{
                'header': {
                    templateUrl: './views/datatool/datatool_index_header.html'
                },
                'content': {
                    templateUrl: './views/datatool/datatool_index.html'
                },
                "sidebarLeft":{
                    templateUrl:"./views/blank_left.html"
                },
                "sidebarRight":{
                    templateUrl:"./views/blank_right.html"
                }
            },
            reloadOnSearch: false,
            resolve: {
                data: ['$q','$timeout', _timeDefer]
            }
        },
        {
            name: 'datatool.rpgindex',
            url: '/rpgindex',
            views:{
                'datatool-content': {
                    templateUrl: './views/datatool/datatool_rent_package.html',
                    controller:"dataIndexController",
                    controllerAs:"dCtrl"
                },
            },
            reloadOnSearch: false,
            resolve: {
                dataIndexData:function(dataIndexService){
                    return dataIndexService.getIndexData();
                },
                data: ['$q','$timeout', _timeDefer]
            }
        },
        {
            name: 'datatool.shopedit',
            url: '/shopedit/{shopId}',
            views:{
                'datatool-content': {
                    templateUrl: './views/datatool/datatool_rent_package_edit.html',
                    controller:"dataEditController",
                    controllerAs:"rCtrl"
                },
            },
            reloadOnSearch: false,
            resolve: {
                shopData:function($stateParams){
                    return {
                        type:"edit",
                        shopId:$stateParams.shopId
                    };
                },
                data: ['$q','$timeout', _timeDefer]
            }
        },
        {
            name: 'datatool.rpgset',
            url: '/rpgset',
            views:{
                'datatool-content': {
                    templateUrl: './views/datatool/datatool_rpg_set_index.html',
                    controller:'dataSetIndexController',
                    controllerAs:"sCtrl"
                },
            },
            reloadOnSearch: false,
            resolve: {
                rpgSetData: function(dataSetIndexService) {
                    return dataSetIndexService.getSetData();
                },
                data: ['$q','$timeout', _timeDefer]
            }
        }
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

    // 管理分析 - 首页
    $stateProvider.state({
        name:"mgt_analysis",
        url: "/mgt_analysis",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/mgt_analysis_index_header.html",
                controller:"mgt-analysis-index-header-controller"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/mgt_analysis_index.html"
            }
        },
        resolve: {
            data: ['$q','$timeout', _timeDefer]
        }
    });

    // 管理分析 - 收入分析
    $stateProvider.state({
        name:"mgt_analysis.income_analysis",
        url: "/income_analysis",
        views:{
            "mgt-analysis-view": {
                templateUrl: "./views/mgt_analysis/income_analysis/income_analysis_index.html"
            }
        },
        resolve: {
            data: ['$q','$timeout', _timeDefer]
        }
    });

    // 管理分析 - 收入分析 - 合同
    $stateProvider.state({
        name:"mgt_analysis.income_analysis.contract_list",
        url: "/contract_list",
        views:{
            "income-analysis-view": {
                controller:"contract-list-controller",
                templateUrl: "./views/mgt_analysis/income_analysis/contract_list.html"
            },
            "sidebarLeft":{
                templateUrl:"./views/blank.html"
            },
            "sidebarRight":{
                templateUrl:"./views/blank.html"
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
   /* $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/projectlist');
    });*/

});

ampApp.controller('MainController', function($rootScope, $scope,$location,$timeout) {

    var curProject=0;
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
