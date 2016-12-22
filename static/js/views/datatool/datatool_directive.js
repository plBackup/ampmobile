/**
 * Created by limeiting on 16/11/18.
 */

/**
 * Created by limeiting on 16/11/18.
 */
angular.module('dataTool').directive('datePicker', [
    function() {
        return {
            restrict: 'A',
            scope: {
                //dateSelect:"&",
                curDate:"@curDate"
            },
            require:"ngModel",

            template:	'<div class="td-input-wrapper padding-r-15 date-input">'+
                         '<input type="text" placeholder="" readonly>'+
                        '</div>',
            link: function($scope, $element,attrs,ngModelCtrl) {
                function gd(year, month, day) {
                    return new Date(year, month, day).getTime();
                }

                function DateAdd(interval,number,dateStr){

                    // DateAdd(interval,number,date)
                    var date = new Date(dateStr);
                    var d="";
                    switch(interval)
                    {
                        case   "y"   :   {
                            date.setFullYear(date.getFullYear()+number);
                            break;
                        }
                        case   "q"   :   {
                            date.setMonth(date.getMonth()+number*3);
                            break;
                        }
                        case   "m"   :   {
                            date.setMonth(date.getMonth()+number);
                            d=  date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1));
                            break;
                        }
                        case   "w"   :   {
                            date.setDate(date.getDate()+number*7);
                            d =date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(date.getDate()<9?("0"+date.getDate()):date.getDate());
                            break;
                        }
                        case   "d"   :   {
                            date.setDate(date.getDate()+number);
                            break;
                        }
                        case   "h"   :   {
                            date.setHours(date.getHours()+number);
                            break;

                        }
                        case   "mi"   :   {
                            date.setMinutes(date.getMinutes()+number);
                            break;
                        }
                        case   "s"   :   {
                            date.setSeconds(date.getSeconds()+number);
                            break;
                        }
                        default   :   {
                            date.setDate(date.getDate()+number);
                            break;
                        }

                    }//end switch
                    if(d!=""){
                        return d;
                    }else{
                        return date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(date.getDate()<9?("0"+date.getDate()):date.getDate());
                    }
                };

                var updateModel=function(dateText){
                    $scope.$apply(function(){
                        ngModelCtrl.$setViewValue(new Date(dateText).getTime());
                    });
                };

                ngModelCtrl.$render=function(){
                    if(typeof ngModelCtrl.$viewValue !=="undefined"){
                        var date=DateAdd("d",0,ngModelCtrl.$viewValue);
                        $element.find("input").val(date)
                    }
                };

                //date Selector
                var dpicker;
                var now = $scope.curDate||new Date(),
                    minDate = new Date(new Date().getFullYear() - 30, 0, 1);

                var dateSelector=function(){
                    dpicker=$element.find("input").mobiscroll().date({
                        theme: 'android-holo-light',
                        mode: 'scroller',
                        display: 'bottom',
                        lang: 'zh',
                        startYear: (new Date()).getFullYear(),
                        endYear: (new Date()).getFullYear() + 30,
                        dateFormat: 'yyyy-mm-dd',
                        dateOrder: 'yymmdd', //面板中日期排列格式
                        //min:minDate,
                        minDate:minDate,
                        onSelect:function(e){
                            var dateStr=$element.find("input").val();
                            updateModel(dateStr);
                            if($scope.monthSelect){
                                //如果作用域有处理函数，
                                $scope.$apply(function(){
                                    $scope.monthSelect({date:dateStr});
                                });
                            }
                        }
                    });
                };

                dateSelector();

                //destroy
                $scope.$on("$destroy", function() {
                    //清除配置
                });
            }//end link
        };
    }]);

angular.module('dataTool').directive('simChart', ["chartOptService",
    function(chartOptService) {
        return {
            restrict: 'A',
            scope: {
                chartData: '=',
                chartLabels: '='
            },
            link: function($scope, $element) {
                //console.log("-------ddd")
                //console.log($element);
                //var lineChart;
                var dataSimChart = echarts.init($element[0]);

                var labels = $scope.chartData[0];
                var data=$scope.chartData.slice(1);
                var opt=chartOptService.setChartOption(data,labels);
                dataSimChart.setOption(opt);

                $scope.$watch('chartData', function(newVal, oldVal) {
                    //console.log(newVal);
                    if (newVal) {
                        var labels = $scope.chartData[0];
                        var data=$scope.chartData.slice(1);
                        var opt=chartOptService.setChartOption(data,labels);
                        dataSimChart.setOption(opt);
                    }
                });
            }
        };
    }]);

