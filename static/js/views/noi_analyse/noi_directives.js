/**
 * Created by limeiting on 16/11/17.
 */
angular.module('noi').directive('noiLineChart', ["noiService",
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
                var opt=noiService.setNoiChartOption(data,labels);
                noiChart.setOption(opt);

                $scope.$watch('chartData', function(newVal, oldVal) {
                    //console.log(newVal);
                    if (newVal) {
                        var labels = $scope.chartData[0];
                        var data=$scope.chartData.slice(1);
                        var opt=noiService.setNoiChartOption(data,labels);
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

angular.module('noi').directive('incomeLineChart', ["noiService",
    function(noiService) {

        return {
            restrict: 'A',
            scope: {
                chartData: '=',

            },
            link: function($scope, $element) {
                //console.log($element);
                //var lineChart;
                var noiChart = echarts.init($element[0]);

                var labels = $scope.chartData[0];
                var data=$scope.chartData.slice(1);
                var opt=noiService.setFeeChartOption(data,labels);
                noiChart.setOption(opt);

                $scope.$watch('chartData', function(newVal, oldVal) {
                    //console.log(newVal);
                    if (newVal) {
                        var labels = $scope.chartData[0];
                        var data=$scope.chartData.slice(1);
                        var opt=noiService.setFeeChartOption(data,labels);
                        noiChart.setOption(opt);
                    }
                });
            }
        };
    }]);

angular.module('noi').directive('rentLineChart', ["noiService",
    function(noiService) {

        return {
            restrict: 'A',
            scope: {
                chartData: '=',

            },
            link: function($scope, $element) {
                //console.log($element);
                //var lineChart;
                var noiChart = echarts.init($element[0]);

                var labels = $scope.chartData[0];
                var data=$scope.chartData.slice(1);
                var opt=noiService.setRentChartOption(data,labels);
                noiChart.setOption(opt);

                $scope.$watch('chartData', function(newVal, oldVal) {
                    //console.log(newVal);
                    if (newVal) {
                        var labels = $scope.chartData[0];
                        var data=$scope.chartData.slice(1);
                        var opt=noiService.setRentChartOption(data,labels);
                        noiChart.setOption(opt);
                    }
                });
            }
        };
    }]);

angular.module('noi').directive('salesFlowChart', ["noiService",
    function(noiService) {

        return {
            restrict: 'A',
            scope: {
                chartData: '=',

            },
            link: function($scope, $element) {
                //console.log($element);
                //var lineChart;
                var noiChart = echarts.init($element[0]);

                var labels = $scope.chartData[0];
                var data=$scope.chartData.slice(1);
                var opt=noiService.setSalesChartOption(data,labels);
                noiChart.setOption(opt);

                $scope.$watch('chartData', function(newVal, oldVal) {
                    //console.log(newVal);
                    if (newVal) {
                        var labels = $scope.chartData[0];
                        var data=$scope.chartData.slice(1);
                        var opt=noiService.setSalesChartOption(data,labels);
                        noiChart.setOption(opt);
                    }
                });
            }
        };
    }]);

angular.module('noi').directive('noiPieChart', ["noiService",
    function(noiService) {
        return {
            restrict: 'A',
            scope: {
                chartData: '=',
                chartName: '='
            },
            link: function($scope, $element) {

                var dataSimChart = echarts.init($element[0]);
                console.log("pie chart------------");
                var chartData=$scope.chartData;//area,
                var chartName=$scope.chartName||"租赁面积情况";
                console.log(chartName);

                var data=[
                    {
                        name:chartName,
                        values:chartData
                    },
                ];

                var opt=noiService.setPieChartOption(data);
                dataSimChart.setOption(opt);

                $scope.$watch('chartData', function(newVal, oldVal) {
                    //console.log(newVal);
                    if (newVal) {
                        var chartData=$scope.chartData;
                        var chartName=$scope.chartName;
                        var data=[
                            {
                                name:chartName,
                                values:chartData
                            },
                        ];
                        var opt=noiService.setPieChartOption(data);
                        dataSimChart.setOption(opt);
                    }
                });
            }
        };
    }]);