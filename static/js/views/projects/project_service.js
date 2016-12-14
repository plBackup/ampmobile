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
        setChartOption:function(data){
            var chart_data_init={
                pieData:{
                    datasets: [
                        {
                            name: '开业率',
                            type: 'pie',
                            radius : ['90%','96%'],
                            center: ['50%', '50%'],
                            selectedOffset:0,
                            data:[
                                {value:89.12, name:'开业率'},
                                {value:10.88, name:'未开业'},
                            ],
                            label:{
                                normal:{show:false}
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        },
                    ]
                },//linedata
            };
            var chart_opt={
                pieOpt:{
                    title : {
                        text: '项目Dount',
                        show:false,
                    },
                    tooltip : {
                        show:false,
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show:false
                    },
                    hoverAnimation:false,
                    color:['#66d47e','#41495e', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    series : [
                        {
                            name: '开业率',
                            type: 'pie',
                            radius : ['65%','70%'],
                            center: ['50%', '50%'],
                            selectedOffset:0,
                            data:[
                                {value:89.12, name:'开业率'},
                                {value:10.88, name:'未开业'},
                            ],
                            label:{
                              normal:{show:false}
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
        };

            function _updateOpt(data,chartType){
                if(chartType=="pie"){
                    /*
                     * self.chartData=[
                     *   ｛"name":"开业率"，
                     *   "values":[
                     *       value:89.12,
                     *       name:"开业率"
                     *   ]｝，
                     * ]
                     * */
                    chart_data_init[chartType+"Data"].datasets[0].name=data[0].name;
                    chart_data_init[chartType+"Data"].datasets[0].data=data[0].values;
                    chart_opt[chartType+"Opt"].series=chart_data_init[chartType+"Data"].datasets;
                }
                return chart_opt[chartType+"Opt"];
            };

            return _updateOpt(data,"pie")
        },
    };
    return service;
});
