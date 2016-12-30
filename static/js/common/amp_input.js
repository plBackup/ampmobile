(function(){
    // 获取 amp-investment-analysis 模块
    var ampCommonDirectiveCollection = null;
    try{
        ampCommonDirectiveCollection = angular.module("amp-common-directive-collection");
    }catch(e){
        ampCommonDirectiveCollection = angular.module("amp-common-directive-collection", []);
    }


    // 自动匹配
    ampCommonDirectiveCollection.directive("ampInput",["$timeout","$filter",function($timeout,$filter){
        return {
            template:"<input type='text' ng-model='inputModel'/><div class='amp-input-display-span'>{{inputModel|numberFormatDefault:'':inputFractionSize}}</div>",
            scope:{
                inputModel:"=",
                inputFractionSize:"@", // 小数点精确位数
                inputType:"@", // integer,text,float
                inputPattern:"@"
            },
            link:function(scope,ele,attrs) {

                var inputType=scope.inputType||"text";

                scope.$watch("inputModel",function(newVal,oldVal,scope){

                    if(newVal!=null&&newVal!=""&&inputType=="integer"){// 验证整数
                        var integerPattern = new RegExp("-?\\d+$","g");
                        if(!integerPattern.test(newVal)){
                            $(ele).addClass("amp-input-error");
                            return;
                        }
                    }

                    if(newVal!=null&&newVal!=""&&inputType=="float"){// 验证浮点数
                        var floatPattern = new RegExp("^(-?\\d+)(\\.\\d+)?$","g");
                        if(!floatPattern.test(newVal)){
                            $(ele).addClass("amp-input-error");
                            return;
                        }
                    }


                    var pattern = new RegExp(scope.inputPattern,"g");
                    if(pattern.test(newVal)){
                        $(ele).removeClass("amp-input-error");
                    }else{
                        $(ele).addClass("amp-input-error");
                    }
                });

                $(ele).on("click",function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    if($(this).hasClass("focused")){
                        return;
                    }
                    $(this).addClass("focused");
                    $(this).find("input").focus();
                });

                $(ele).on("blur","input",function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $(ele).removeClass("focused");
                });

                $(ele).on("keypress","input",function(e){
                    var keyCode = e.keyCode;

                    if(inputType=="integer"){ // 如果是整数
                        if((48<=keyCode&&keyCode<=57)||(96<=keyCode&&keyCode<=105)){

                        }else{
                            e.preventDefault();
                        }
                    }else if(inputType=="float"){ // 如果是浮点数
                        if(keyCode==46||(48<=keyCode&&keyCode<=57)||(96<=keyCode&&keyCode<=105)){

                        }else{
                            e.preventDefault();
                        }
                    }else{ // 其他

                    }

                });
            }
        }
    }]);

})();


