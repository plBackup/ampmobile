/**
 * Created by limeiting on 16/12/2.
 */
var ampApp = angular.module('amp', [
    'ui.router',
    'mobile-angular-ui',
    'mobile-angular-ui.gestures',
    'noi'
]);

//这里是gestures里的一个设置，待测试
ampApp.run(function($transform) {
    window.$transform = $transform;
});


ampApp.config(function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [
        {
            name: 'noi',
            url: '/noi',
            views:{
                'header': {
                    templateUrl: './views/noi_analyse/noi_header.html',
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
            resolve: {
                noiAllData: function(noiService) {
                    return noiService.getAllData();
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
            name: 'rpgset',
            url: '/rpgset',
            views:{
                'header': {
                    templateUrl: './views/datatool/rpg_set_header.html',
                },
                'content': {
                    templateUrl: './views/datatool/datatool_rpg_set_index.html',
                },
                "sidebarLeft":{
                    templateUrl:"./views/blank.html"
                },
                "sidebarRight":{
                    templateUrl:"./views/blank.html"
                }
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
        }, //state

    ];

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });

    $urlRouterProvider.when('', '/noi');
    //$urlRouterProvider.when('/rpgindex', '/rpgindex/1');
    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/noi');
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
