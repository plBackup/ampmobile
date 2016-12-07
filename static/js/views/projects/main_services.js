/**
 * Created by limeiting on 16/11/15.
 */
angular.module('main').service('ProjectService', function($http) {
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
});