/**
 * Created by limeiting on 16/12/7.
 */
angular.module('projects').service('projectService', function($rootScope,$http) {

    var service = {
        getAllData: function () {
            /*return $http.get('./data/data_'+$rootScope.curProject+'/noi/noi_all.json', { cache: true }).then(function(res) {
             return res.data;
             });*/
            return $http.get('./data/projectList.json', {cache: true}).then(function (res) {
                return res.data;
            });

        },
    };
    return service;
});