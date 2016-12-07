/**
 * Created by limeiting on 16/11/15.
 */
angular.module('noi').service('noiService', function($rootScope,$http) {

    var service = {
        getAllData: function() {
            /*return $http.get('./data/data_'+$rootScope.curProject+'/noi/noi_all.json', { cache: true }).then(function(res) {
                return res.data;
            });*/
            return $http.get('./data/data_'+0+'/noi/noi_all.json', { cache: true }).then(function(res) {
                return res.data;
            });

        },
        setChartOption:function(data,labels){
            var chart_data_init={
                lineData:{
                    labels: [ "2015","2016", "2017", "2018", "2019", "2020" ],
                    datasets: [
                        {
                            type:"line",
                            name:"NOI实际",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                show:true,
                                color:"#62cc7a",
                                width:2,
                                type:"solid",
                            },
                            data:[3456.0,4656.0,null,null,null,null],
                        },{
                            type:"line",
                            name:"方案1",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                show:true,
                                color:"#ffb73a",
                                width:2,
                                type:"solid",
                            },
                            data:[4568.90,5323.40,5689.70,6784.50,8657.20,9922.40],
                        },{
                            type:"line",
                            name:"方案2",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                show:true,
                                color:"#fe7171",
                                width:2,
                                type:"solid",
                            },
                            data:[6618.92,7359.42,7865.80,8993.03,9486.32,11029.11],
                        },{
                            type:"line",
                            name:"方案3",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                show:true,
                                color:"#5fbaf4",
                                width:2,
                                type:"solid",
                            },
                            data:[6987.78,7892.78,8067.68,8862.50,9242.40,10378.98],
                        },
                    ]
                },//linedata

            };
            var chart_opt={
                lineOpt:{
                    title:{
                        show:false,
                    },
                    legend:{
                        show:false,
                    },
                    toolbox:{
                        show:false,
                    },
                    grid:{
                        top:30,
                        left:80,
                        right:30,
                        bottom:50
                    },
                    xAxis:{
                        position:"bottom",
                        type:"category",
                        /* name:"年",
                         nameLocation:"middle",
                         nameTextStyle:{
                         color:"#acadb0",
                         fontStyle:"normal",
                         fontSize:14
                         },
                         nameGap:25,*/
                        boundaryGap:true,
                        axisLine:{
                            show:true,
                            lineStyle:{
                                color:"#ececec",
                                width:1,
                                type:"solid"
                            }
                        },
                        axisTick:{
                            show:false,
                            inside:true,
                            length:3,
                            lineStyle:{
                                color:"#535861",
                                width:1,
                                type:"solid"
                            }
                        },
                        axisLabel:{
                            show:true,
                            //formatter:null,
                            formatter:'{value}年',
                            margin:12,
                            textStyle:{
                                color:"#666",
                                fontStyle:"normal",
                                fontSize:12
                            }
                        },
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color:"#ececec",
                                width:1,
                                type:"solid"
                            }
                        },
                        data:["2015","2016", "2017", "2018", "2019", "2020"],
                    },
                    yAxis:{
                        /*name:"万元",
                         nameLocation:"end",
                         nameGap:15,
                         nameTextStyle:{
                         color:"#acadb0",
                         fontStyle:"normal",
                         fontSize:14
                         },*/
                        min:0,
                        max:"auto",
                        //splitNumber:7,
                        axisLine:{
                            show:false,
                            lineStyle:{
                                color:"#535861",
                                width:1,
                                type:"solid"
                            }
                        },
                        axisTick:{
                            show:false,
                            inside:false,
                            length:6,
                            linStyle:{
                                color:"#535861",
                                width:1,
                                type:"solid"
                            }
                        },
                        axisLabel:{
                            show:true,
                            formatter:'{value}',
                            margin:15,
                            textStyle:{
                                color:"#666",
                                fontStyle:"normal",
                                fontSize:12
                            }
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:"#ececec",
                                width:1,
                                type:"solid"
                            }
                        },

                    },
                    color:['#61cd78','#60bbf4', '#fc7270', '#feb739', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    backgroundColor:"transparent",
                    tooltip:{
                        show:true,
                        showContent:true,
                        formatter:"{a}:<br/>{b}年-{c}万",
                        textStyle:{
                            fontSize:12,
                            color:"#fff"
                        }
                    },
                    series:[
                        {
                            type:"line",
                            name:"NOI实际",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                show:true,
                                color:"#62cc7a",
                                width:2,
                                type:"solid",
                            },
                            data:[3456.0,4656.0,null,null,null,null],
                        }

                    ]
                }
            };


            function _updateOpt(data,labels,chartType){
                if(chartType=="line"){

                    chart_data_init[chartType+"Data"].datasets[0].data=data[3].values;//NOI实际数据
                    chart_data_init[chartType+"Data"].datasets[1].data=data[0].values;
                    chart_data_init[chartType+"Data"].datasets[2].data=data[1].values;
                    chart_data_init[chartType+"Data"].datasets[3].data=data[2].values;

                    chart_data_init[chartType+"Data"].labels=labels.values;
                    chart_opt[chartType+"Opt"].xAxis.data=chart_data_init[chartType+"Data"].labels;
                    chart_opt[chartType+"Opt"].series=chart_data_init[chartType+"Data"].datasets;
                }
                return chart_opt[chartType+"Opt"];
            };

            return _updateOpt(data,labels,"line")
        },
    };

    return service;
});