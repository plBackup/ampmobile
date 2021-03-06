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
    "amp-investment-analysis",
    "amp-common-directive-collection",
    "amp-common-filters"
]);

//这里是gestures里的一个设置，待测试
ampApp.run(function($transform) {
    window.$transform = $transform;
});


ampApp.factory("myHttpInterceptor", function($q) {
    return {
        // optional method
        "responseError": function(rejection) {
            var userAgent = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(userAgent)) {
                handleAjaxError({code:-1,msg:"请求失败"});
            } else if (/android/.test(userAgent)) {
                window.android.handleAjaxError({code:-1,msg:"请求失败"});
            }
            return $q.reject(rejection);
        }

    };
});


ampApp.config(function($stateProvider,$urlRouterProvider,$httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');

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
                    templateUrl: './views/projects/project_create_header.html',
                    controller:'pjHeadController',
                    controllerAs:"hCtrl"
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
                    templateUrl: './views/projects/project_update_header.html',
                    controller:'pjHeadController',
                    controllerAs:"hCtrl"
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
                    templateUrl: './views/noi_analyse/noi_header.html',
                    controller:"noiHeadController",
                    controllerAs:"nhCtrl"
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
                noiAllData: function(noiService,$stateParams) {
                    var pid=$stateParams.pid;
                    return noiService.getAllData(pid);
                },
                pid:function($stateParams){
                    return $stateParams.pid;
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
                    templateUrl: './views/datatool/datatool_index.html',
                    controller:"datatoolController",
                    controllerAs:"dCtrl"
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
                //data: ['$q','$timeout', _timeDefer]
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
                }
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
                }
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
                }
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
                }
            },
            reloadOnSearch: false,
            resolve: {
                shopData:function($stateParams){
                    return {
                        type:"create"
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
                }
            },
            reloadOnSearch: false,
            resolve: {
                rpgresultData: function(dataSetResultService) {
                    return dataSetResultService.getSetData();
                },
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
                }
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
            name: 'datatool.datasim',
            url: '/datasim',
            views:{
                'datatool-content': {
                    templateUrl: './views/datatool/datatool_sim.html',
                    controller:"dataSimController",
                    controllerAs:"sCtrl"
                }
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
                }
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

    // 模拟测算 方案
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

    // 模拟测算 方案
    $stateProvider.state({
        name:"income_expenses_simulation",
        url: "/income_expenses_simulation",
        views:{
            "header":{
                controller:"income-expenses-simulation-header-controller",
                templateUrl:"./views/investment_analysis/income_expenses_simulation_header.html"
            },
            "content": {
                templateUrl: "./views/investment_analysis/income_expenses_simulation.html",
                controller:"income-expenses-simulation-controller"
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

    // 管理分析 - 收入分析 - 合同
    $stateProvider.state({
        name:"mgt_analysis.contract_list",
        url: "/contract_list",
        views:{
            "mgt-analysis-view": {
                controller:"contract-list-controller",
                templateUrl: "./views/mgt_analysis/income_analysis/contract_list.html"
            }
        }
    });

    // 管理分析 - 收入分析 - 合同详情
    $stateProvider.state({
        name:"contract_detail",
        url: "/contract_detail",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/income_analysis/contract_detail_header.html",
                controller:"contract-detail-header-controller"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/income_analysis/contract_detail.html",
                controller:"contract-detail-controller"
            }
        }
    });

    // 管理分析 - 收入分析 - 营收
    $stateProvider.state({
        name:"mgt_analysis.business_main",
        url: "/business_main",
        views:{
            "mgt-analysis-view": {
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

    // 管理分析 - 支出分析 - 录入
    $stateProvider.state({
        name:"cost_enrolment",
        url: "/cost_enrolment",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/cost_analysis/cost_enrolment_header.html"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/cost_analysis/cost_enrolment.html",
                controller:"cost-enrolment-controller"
            }
        }
    });

    // 管理分析 - 支出分析 - 人工
    $stateProvider.state({
        name:"cost_manual",
        url: "/cost_manual",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/cost_analysis/cost_manual_header.html"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/cost_analysis/cost_manual.html",
                controller:"cost-manual-controller"
            }
        }
    });

    // 管理分析 - 支出分析 - 人工录入
    $stateProvider.state({
        name:"cost_manual_enrolment",
        url: "/cost_manual_enrolment",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/cost_analysis/cost_manual_enrolment_header.html"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/cost_analysis/cost_manual_enrolment.html",
                controller:"cost-manual-enrolment-controller"
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

    // 管理分析 - 租赁分析 - 租赁
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

    // 管理分析 - 租赁分析 - 商户销售 - 排名
    $stateProvider.state({
        name:"merchant_sale_rank",
        url: "/merchant_sale_rank",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/rent_analysis/merchant_sale_rank_header.html"
            },
            "content": {
                templateUrl:"./views/mgt_analysis/rent_analysis/merchant_sale_rank.html",
                controller:"merchant-sale-rank-controller"
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

    // 管理分析 - 租赁分析 - 欠费明细 - 录入
    $stateProvider.state({
        name:"arrears_detail_enrolment",
        url: "/arrears_detail_enrolment",
        views:{
            "header":{
                templateUrl:"./views/mgt_analysis/rent_analysis/arrears_detail_enrolment_header.html"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/rent_analysis/arrears_detail_enrolment.html",
                controller:"arrears-detail-enrolment-controller"
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
                templateUrl:"./views/mgt_analysis/rent_analysis/merchant_sale_type_list_header.html",
                controller:"merchant-sale-type-list-header-controller"
            },
            "content": {
                templateUrl: "./views/mgt_analysis/rent_analysis/merchant_sale_type_list.html",
                controller:"merchant-sale-type-list-controller"
            }
        }
    });
    
    
    
    // 风控分析 - 投资
    $stateProvider.state({
        name:"risk_investment",
        url: "/risk_investment",
        views:{
            "header":{
                templateUrl:"./views/riskctrl/risk_analysis_index_header.html"
//              controller:"merchant-sale-type-list-header-controller"
            },
            "content": {
                templateUrl: "./views/riskctrl/risk_investment.html",
                controller:"risk_investment_controller"
            }
        }
    });
      // 风控分析 - 管理
	$stateProvider.state({
        name:"risk_administration",
        url: "/risk_administration",
        views:{
            "header":{
                templateUrl:"./views/riskctrl/risk_analysis_index_header.html"
//              controller:"merchant-sale-type-list-header-controller"
            },
            "content": {
                templateUrl: "./views/riskctrl/risk_administration.html",
                controller:"risk_administration_controller"
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

    $rootScope.bottomPanelShow=false;
    $rootScope.showBottomPanel=function(){
        $rootScope.bottomPanelShow=true;
    };
    $rootScope.hideBottomPanel=function(){
        $rootScope.bottomPanelShow=false;
    };

    self.hideBottomPanel=function($event){
        $event.preventDefault();
        $event.stopPropagation();
        if($($event.target).hasClass("amp-bottom-panel")){
            $rootScope.bottomPanelShow=false;
        }
    };

    $rootScope.loadingShow=false;

    $rootScope.loading_show=function(){
        $rootScope.loadingShow=true;
    };
    $rootScope.loading_hide=function(){
        $rootScope.loadingShow=false;
    };


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

    $rootScope.logout=function(){
        //logout
        location.href="login.html";
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
