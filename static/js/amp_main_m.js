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
            name: 'datatool.rpgresult',
            url: '/rpgresult',
            views:{
                'datatool-content': {
                    templateUrl: './views/datatool/datatool_rpg_result.html',
                    controller:"rpgResultController",
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
            name: 'datatool.shopcreate',
            url: '/shopcreate',
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
                        type:"create",
                        //shopId:$stateParams.shopId
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
        },
        {
            name: 'datatool.rpgpin',
            url: '/rpgpin',
            views:{
                'datatool-content': {
                    templateUrl: './views/datatool/rpg_set.html',
                    controller:"dataSetController",
                    controllerAs:"sCtrl"
                },
            },
            reloadOnSearch: false,
            resolve: {
                rpgSetData:function(dataSetService){
                    return dataSetService.getData();
                },
                data: ['$q','$timeout', _timeDefer]
            }
        },
        {
            name: 'datasim',
            url: '/datasim',
            views:{
                'content': {
                    templateUrl: './views/datatools/datatool_sim.html',
                    controller:"dataSimController",
                    controllerAs:"sCtrl"
                },
            },
            resolve: {
                simData:function(dataIndexService){
                    return dataIndexService.getIndexData();
                },
                simChartData:function(dataSimChart){
                    return dataSimChart.getSimChartData();
                },
                data: ['$q','$timeout', _timeDefer]
            }
        }, //state
        {
            name: 'datatool.irrplan',
            url: '/irrplan',
            views:{
                'datatool-content': {
                    templateUrl: './views/datatool/datatool_irr_plan.html',
                    controller:"irrPlanController",
                    controllerAs:"pCtrl"
                },
            },
            reloadOnSearch: false,
            resolve: {
                irrPlanData: function(irrPlanService) {
                    return irrPlanService.getIrrData();
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
        }
    });

    // 模拟测算 方案列表页
    $stateProvider.state({
        name:"simulation_calculation",
        url: "/simulation_calculation",
        views:{
            "header":{
                templateUrl:"./views/investment_analysis/simulation_calculation_header.html"
            },
            "content": {
                templateUrl: "./views/investment_analysis/simulation_calculation.html",
                controller:"simulation-calculation-controller"
            }
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
                templateUrl: "./views/mgt_analysis/mgt_analysis_index.html",
                controller:"mgt-analysis-index-controller"
            }
        }
    });

    // 管理分析 - 收入分析
    $stateProvider.state({
        name:"mgt_analysis.income_analysis",
        url: "/income_analysis",
        views:{
            "mgt-analysis-view": {
                controller:"income-analysis-index-controller",
                templateUrl: "./views/mgt_analysis/income_analysis/income_analysis_index.html"
            }
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
            }
        }
    });

    // 管理分析 - 收入分析 - 营收
    $stateProvider.state({
        name:"mgt_analysis.income_analysis.business_main",
        url: "/business_main",
        views:{
            "income-analysis-view": {
                controller:"business-main-controller",
                templateUrl: "./views/mgt_analysis/income_analysis/business_main.html"
            }
        }
    });

    // 管理分析 - 运营分析 - 客流
    $stateProvider.state({
        name:"mgt_analysis.passenger_flow_main",
        url: "/passenger_flow_main",
        views:{
            "mgt-analysis-view": {
                controller:"passenger-flow-main-controller",
                templateUrl: "./views/mgt_analysis/business_analysis/passenger_flow_main.html"
            }
        }
    });

    // 管理分析 - 运营分析 - 客流 - 录入
    $stateProvider.state({
        name:"passenger_flow_enrolment",
        url: "/passenger_flow_enrolment",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/business_analysis/passenger_flow_enrolment_header.html"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/business_analysis/passenger_flow_enrolment.html",
                controller:"passenger-flow-enrolment-controller"
            }
        }
    });

    // 管理分析 - 支出分析 - 成本
    $stateProvider.state({
        name:"mgt_analysis.cost_main",
        url: "/cost_main",
        views:{
            "mgt-analysis-view": {
                controller:"cost-main-controller",
                templateUrl: "./views/mgt_analysis/cost_analysis/cost_main.html"
            }
        }
    });

    // 管理分析 - 租赁分析 - 欠费
    $stateProvider.state({
        name:"mgt_analysis.arrears_main",
        url: "/arrears_main",
        views:{
            "mgt-analysis-view": {
                controller:"arrears-main-controller",
                templateUrl: "./views/mgt_analysis/rent_analysis/arrears_main.html"
            }
        }
    });

    // 管理分析 - 租赁分析 - 欠费
    $stateProvider.state({
        name:"mgt_analysis.rent_main",
        url: "/rent_main",
        views:{
            "mgt-analysis-view": {
                controller:"rent-main-controller",
                templateUrl: "./views/mgt_analysis/rent_analysis/rent_main.html"
            }
        }
    });

    // 管理分析 - 租赁分析 - 欠费明细
    $stateProvider.state({
        name:"arrears_detail_list",
        url: "/arrears_detail_list",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/rent_analysis/arrears_detail_list_header.html"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/rent_analysis/arrears_detail_list.html",
                controller:"arrears-detail-list-controller"
            }
        }
    });

    // 管理分析 - 租赁分析 - 欠费明细 - 商家
    $stateProvider.state({
        name:"arrears_merchant_detail",
        url: "/arrears_merchant_detail",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/rent_analysis/arrears_merchant_detail_header.html",
                controller:"arrears-merchant-detail-header-controller"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/rent_analysis/arrears_merchant_detail.html",
                controller:"arrears-merchant-detail-controller"
            }
        }
    });

    // 管理分析 - 租赁分析 - 商户销售
    $stateProvider.state({
        name:"mgt_analysis.merchant_sale_main",
        url: "/merchant_sale_main",
        views:{
            "mgt-analysis-view": {
                controller:"merchant-sale-main-controller",
                templateUrl: "./views/mgt_analysis/rent_analysis/merchant_sale_main.html"
            }
        }
    });

    // 管理分析 - 租赁分析 - 商户销售 - 业态列表
    $stateProvider.state({
        name:"merchant_sale_type_list",
        url: "/merchant_sale_type_list",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/rent_analysis/merchant_sale_type_list_header.html"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/rent_analysis/merchant_sale_type_list.html",
                controller:"merchant-sale-type-list-controller"
            }
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


    bindMgtAnalysisPageEvent(); // 绑定 mgt-analysis-menu-list-wrapper,mgt-analysis-statistics-panel-wrapper
});

ampApp.run(function($http) {
    $http.get('./data/projectList.json', { cache: true });
});
