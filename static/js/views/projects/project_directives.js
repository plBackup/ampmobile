/**
 * Created by limeiting on 16/12/14.
 */
angular.module('projects').directive('pieChart', ["projectService",
    function(projectService) {
        return {
            restrict: 'A',
            scope: {
                chartData: '=',
                chartName: '='
            },
            link: function($scope, $element) {
                //console.log("-------ddd")
                //console.log($element);
                //var lineChart;
                var dataSimChart = echarts.init($element[0]);

                var chartData=parseFloat($scope.chartData)*100;//project.openRate,
                var chartData_un=100-chartData;

                var chartName=$scope.chartName||"完成率";
                var data=[
                    {
                        name:chartName,
                        values:[
                            {
                                value:chartData,
                                name:chartName
                            },
                            {
                                value:chartData_un,
                                name:"未完成"
                            }
                        ]
                    },
                ];

                var opt=projectService.setChartOption(data);
                dataSimChart.setOption(opt);

                /*
                * self.chartData=[
                *   ｛"name":"开业率"，
                *   "values":[
                *       value:89.12,
                *       name:"开业率"
                *   ]｝，
                * ]
                * */

                $scope.$watch('chartData', function(newVal, oldVal) {
                    //console.log(newVal);
                    if (newVal) {
                        var chartData=parseFloat($scope.chartData)*100;//project.openRate,
                        var chartData_un=100-chartData;
                        var chartName=$scope.chartName;
                        var data=[
                            {
                                name:chartName,
                                values:[
                                    {
                                        value:chartData,
                                        name:chartName
                                    },
                                    {
                                        value:chartData_un,
                                        name:"未完成"
                                    }
                                ]
                            },
                        ];
                        var opt=projectService.setChartOption(data);
                        dataSimChart.setOption(opt);
                    }
                });
            }
        };
    }]);
