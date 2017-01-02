/**
 * Created by limeiting on 16/11/15.
 */
angular.module('noi').service('noiService', function($rootScope,$http) {

    var service = {
        getAllData: function() {
            return $http.get('../data/data_'+$rootScope.curProject+'/noi/noi_all.json', { cache: true }).then(function(res) {
                return res.data;
            });
        },
        setNoiChartOption:function(data,labels){
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
                                color:"#666",
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
                        //max:"auto",
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
                                color:"#878787",
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

        setFeeChartOption:function(data,labels){
            var chart_data_init={
                lineData:{
                    labels: [],
                    datasets: [
                        {
                            type:"line",
                            name:"收入",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                normal:{
                                    show:true,
                                    color:"#5cd3f5",
                                    width:2,
                                    type:"solid",
                                }
                            },
                            data:[],
                        },{
                            type:"line",
                            name:"收入预算",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                              normal:{
                                  show:true,
                                  color:"#5b709d",
                                  width:2,
                                  type:"dashed",
                              }
                            },
                            data:[],
                        },{
                            type:"line",
                            name:"开支",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                normal:{
                                    show:true,
                                    color:"#68cf7e",
                                    width:2,
                                    type:"solid",
                                }
                            },
                            data:[],
                        },{
                            type:"line",
                            name:"开支预算",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                normal:{
                                    show:true,
                                    color:"#bcc5aa",
                                    width:2,
                                    type:"dashed",
                                }
                            },
                            data:[],
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
                            formatter:'{value}',
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
                        data:[],
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
                                color:"#878787",
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
                    color:['#5dd4f6','#5b709f', '#68cf7e', '#bcc5aa', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    backgroundColor:"transparent",
                    tooltip:{
                        show:true,
                        showContent:true,
                        formatter:"{a}:<br/>{b}-{c}万",
                        textStyle:{
                            fontSize:12,
                            color:"#fff"
                        }
                    },
                    series:[

                    ]
                }
            };


            function _updateOpt(data,labels,chartType){
                if(chartType=="line"){

                    chart_data_init[chartType+"Data"].datasets[0].data=data[0].values;
                    chart_data_init[chartType+"Data"].datasets[1].data=data[1].values;
                    chart_data_init[chartType+"Data"].datasets[2].data=data[2].values;
                    chart_data_init[chartType+"Data"].datasets[3].data=data[3].values;

                    chart_data_init[chartType+"Data"].labels=labels.values;
                    chart_opt[chartType+"Opt"].xAxis.data=chart_data_init[chartType+"Data"].labels;
                    chart_opt[chartType+"Opt"].series=chart_data_init[chartType+"Data"].datasets;
                }
                return chart_opt[chartType+"Opt"];
            };

            return _updateOpt(data,labels,"line")
        },

        setSalesChartOption:function(data,labels){
            var chart_data_init={
                lineData:{
                    labels: [],
                    datasets: [
                        {
                            type:"bar",
                            name:"销售",
                            xAxisIndex:0,
                            yAxisIndex:0,

                            //barWidth:,
                            barGap:"30%",
                            barMaxWidth:'28px',
                            itemStyle:{
                                normal:{
                                    color:"#00b1ef",
                                    borderWidth:0,
                                }
                            },
                            data:[],
                        },{
                            type:"line",
                            name:"客流",
                            xAxisIndex:0,
                            yAxisIndex:1,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                normal:{
                                    show:true,
                                    color:"#69ce80",
                                    width:2,
                                    type:"dashed",
                                }
                            },
                            data:[],
                        },{
                            type:"line",
                            name:"会员",
                            xAxisIndex:0,
                            yAxisIndex:1,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                normal:{
                                    show:true,
                                    color:"#a6ed6b",
                                    width:2,
                                    type:"solid",
                                }
                            },
                            data:[],
                        }
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
                        right:80,
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
                            formatter:'{value}',
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
                        data:[],
                    },
                    yAxis:[
                        {
                            //name:"销售(万元)",
                            /*
                             name:"万元",
                             nameLocation:"end",
                             nameGap:15,
                             nameTextStyle:{
                             color:"#acadb0",
                             fontStyle:"normal",
                             fontSize:14
                             },*/
                            min:0,
                            //max:"auto",
                            //splitNumber:7,
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:"#ececec",
                                    width:1,
                                    type:"solid"
                                }
                            },
                            axisTick:{
                                show:true,
                                inside:false,
                                length:6,
                                linStyle:{
                                    color:"#ececec",
                                    width:1,
                                    type:"solid"
                                }
                            },
                            axisLabel:{
                                show:true,
                                formatter:'{value}',
                                margin:15,
                                textStyle:{
                                    color:"#878787",
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
                        {
                            //name:"客流/会员",
                            /*
                            nameLocation:"end",
                             nameGap:15,
                             nameTextStyle:{
                             color:"#acadb0",
                             fontStyle:"normal",
                             fontSize:14
                             },*/
                            min:0,
                            //max:"auto",
                            //splitNumber:7,
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:"#ececec",
                                    width:1,
                                    type:"solid"
                                }
                            },
                            axisTick:{
                                show:true,
                                inside:false,
                                length:6,
                                linStyle:{
                                    color:"#ececec",
                                    width:1,
                                    type:"solid"
                                }
                            },
                            axisLabel:{
                                show:true,
                                formatter:'{value}',
                                margin:15,
                                textStyle:{
                                    color:"#878787",
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

                        },
                    ],
                    color:['#69ce80','#69ce80', '#a6ec67', '#bcc5aa', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    backgroundColor:"transparent",
                    tooltip:{
                        show:true,
                        showContent:true,
                        formatter:"{a}:<br/>{b}-{c}万",
                        textStyle:{
                            fontSize:12,
                            color:"#fff"
                        }
                    },
                    series:[

                    ]
                }
            };


            function _updateOpt(data,labels,chartType){
                if(chartType=="line"){

                    chart_data_init[chartType+"Data"].datasets[0].data=data[0].values;//
                    chart_data_init[chartType+"Data"].datasets[1].data=data[1].values;
                    chart_data_init[chartType+"Data"].datasets[2].data=data[2].values;

                    chart_data_init[chartType+"Data"].labels=labels.values;
                    chart_opt[chartType+"Opt"].xAxis.data=chart_data_init[chartType+"Data"].labels;
                    chart_opt[chartType+"Opt"].series=chart_data_init[chartType+"Data"].datasets;
                }
                return chart_opt[chartType+"Opt"];
            };

            return _updateOpt(data,labels,"line")
        },

        setRentChartOption:function(data,labels){
            var chart_data_init={
                lineData:{
                    labels: [],
                    datasets: [
                        {
                            type:"line",
                            name:"租金",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                normal:{
                                    show:true,
                                    color:"#5cb571",
                                    width:2,
                                    type:"solid",
                                }
                            },
                            data:[],

                        },{
                            type:"line",
                            name:"租金预测",
                            xAxisIndex:0,
                            yAxisIndex:0,
                            symbol:'emptyCircle',
                            symbolSize:6,
                            showSymbol:true,
                            lineStyle:{
                                normal:{
                                    show:true,
                                    color:"#5cb571",
                                    width:2,
                                    type:"dashed",
                                }
                            },
                            data:[],
                        },
                        {
                            name: '租金包',
                            type: 'line',
                            // lineStyle:{normal:{color:"#8bd9f2",type:"dashed"}},
                            //  itemStyle:{normal:{color:"#8bd9f2"}},
                            //stack: '总量',
                            silent: true,
                            tooltip: {
                                show: false,
                            },
                            //areaStyle: {normal: {}},
                            data: [],
                            markLine: {
                                symbol: 'circle',
                                silent: true,
                                symbolSize: 3,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'middle',
                                        formatter: '{b}'
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        color: "#8592a2",
                                        width: 1,
                                        type: "solid",
                                        shadowBlur: 0
                                    },
                                    emphasis: {
                                        color: "#8592a2",
                                        width: 1,
                                        type: "solid",
                                        opacity: 1,
                                        shadowBlur: 0
                                    }
                                },
                                data: [
                                   /* [
                                        {
                                            name: "1-3月租金包",
                                            coord: [0, 11]
                                        },
                                        {
                                            coord: [2, 11]
                                        }
                                    ],*/

                                ]
                            }//markline
                        }
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

                    color:['#5cb571','#5cb571', '#5cb571', '#bcc5aa', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    backgroundColor:"transparent",
                    tooltip:{
                        show:true,
                        showContent:true,
                        /*trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        },*/
                        formatter:"{a}:<br/>{b}-{c}万",
                        textStyle:{
                            fontSize:12,
                            color:"#fff"
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    type: "solid",
                                    width: 1,
                                    color: "#c9c9c9",
                                    shadowBlur: 0
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: "#eee",
                                    width: 1,
                                    type: 'solid',
                                    shadowBlur: 0
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#333",
                                    fontSize: 13
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                           /* name: "（万元）",
                            nameTextStyle: {
                                fontSize: 14,
                                color: "#333"
                            },*/
                            //min: 8,
                            // max:450,
                            nameGap: 20,
                            type: 'value',
                            axisTick:{
                                show:true,
                                inside:false,
                                length:6,
                                linStyle:{
                                    color:"#ececec",
                                    width:1,
                                    type:"solid"
                                }
                            },

                            axisLine: {
                                lineStyle: {
                                    type: "solid",
                                    width: 0,

                                    color: "#c9c9c9",
                                    shadowBlur: 0
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: "#eee",
                                    width: 1,
                                    type: 'solid',
                                    shadowBlur: 0,
                                }
                            },
                            axisLabel: {
                                margin:15,
                                textStyle: {
                                    color: "#878787",
                                    fontSize: 12
                                }
                            }
                        }

                    ],
                    series:[

                    ]
                }
            };


            function _updateOpt(data,labels,chartType){
                if(chartType=="line"){

                    chart_data_init[chartType+"Data"].datasets[0].data=data[0].values;//
                    chart_data_init[chartType+"Data"].datasets[1].data=data[1].values;
                    chart_data_init[chartType+"Data"].datasets[2].markLine.data=data[2].values;

                    chart_data_init[chartType+"Data"].labels=labels.values;
                    chart_opt[chartType+"Opt"].xAxis.data=chart_data_init[chartType+"Data"].labels;
                    chart_opt[chartType+"Opt"].series=chart_data_init[chartType+"Data"].datasets;
                }
                return chart_opt[chartType+"Opt"];
            };

            return _updateOpt(data,labels,"line")
        },

        setPieChartOption:function(data){
            var chart_data_init={
                pieData:{
                    datasets: [
                        {
                            name: '',
                            type: 'pie',
                            radius : ['60%','86%'],
                            center: ['70%', '50%'],
                            selectedOffset:0,
                            data:[
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
                        show:true,
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}% "
                    },
                    legend: {
                        show:false
                    },
                    hoverAnimation:false,
                    color:['#01b0f1','#2bd8dc', '#a6ec67', '#45546b', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    series : [
                        {
                            name: '',
                            type: 'pie',
                            radius : ['60%','86%'],
                            center: ['70%', '50%'],
                            selectedOffset:0,
                            data:[
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