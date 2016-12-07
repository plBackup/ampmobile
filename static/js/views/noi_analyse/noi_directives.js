/**
 * Created by limeiting on 16/11/17.
 */
angular.module('noi').directive('lineChart', ["noiService",
    function(noiService) {

        return {
            restrict: 'A',
            scope: {
                chartData: '=',
                chartLabels: '='
            },
            link: function($scope, $element) {
                //console.log($element);
                //var lineChart;
                var noiChart = echarts.init($element[0]);

                var labels = $scope.chartData[0];
                var data=$scope.chartData.slice(1);
                var opt=noiService.setChartOption(data,labels);
                noiChart.setOption(opt);

                $scope.$watch('chartData', function(newVal, oldVal) {
                    //console.log(newVal);
                    if (newVal) {
                        var labels = $scope.chartData[0];
                        var data=$scope.chartData.slice(1);
                        var opt=noiService.setChartOption(data,labels);
                        noiChart.setOption(opt);
                    }
                });

            /*    $scope.getDom = function() {
                    return {
                        'height': $element[0].offsetHeight,
                        'width': $element[0].offsetWidth
                    };
                };
                $scope.$watch($scope.getDom, function() {
                    // resize echarts图表
                    noiChart.resize();
                });*/

            }
        };
    }]);