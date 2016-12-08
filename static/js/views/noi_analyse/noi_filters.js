/**
 * Created by limeiting on 16/11/17.
 */
/* Filters */
angular.module('noi').filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
}).filter("numberFormat",function(){
    Number.prototype.formatMoney = function(c, d, t){
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    //检查浮点数
    function checkNum(num){
        var patt=/^(-?\d+)(\.\d+)?$/g;
        return patt.test(num);
    }

    return function(input,$index,fixed){
        if(($index+1)%4==0){
            if(typeof  fixed==="undefined"){
                fixed=2
            }
            if(checkNum(input)){
                return parseFloat(input*100).toFixed(2)+"%";
            }else{
                return input
            }
        }else{
            if(typeof  fixed==="undefined"){
                fixed=2
            }
            if(checkNum(input)){
                return parseFloat(input).formatMoney(fixed, '.', ',');
            }else{
                return input
            }
        }

    }
}).filter("percentFormat",function(){
    //检查非负浮点数
    function checkNum(num){
        //var patt=/^\d+(\.\d+)?$/g;
        var patt=/^(-?\d+)(\.\d+)?$/g;
        return patt.test(num);
    }

    return function(input){
        if(checkNum(input)){
            return parseFloat(input*100).toFixed(2)+"%";
        }else{
            return input
        }
    }
}).filter("skip",function(){
    return function(data,count){
        if(angular.isArray(data)){

            if(count>data.legend || count<1){
                return data;
            }else{
                return data.slice(count);
            }
        }else{
            return data;
        }
    }
}).filter("take",function($filter){
    return  function(data, skipCount, takeCount){
        var skippedData=$filter("skip")(data,skipCount);
        return $filter("limitTo")(skippedData,takeCount);
    }
}).filter("default",function(){
    return function(data,str){
        if(typeof str==="undefined"){
            return data;
        }else{
            if(typeof data==="undefined" || data==""){
                return str;
            }
            return data;
        }
    }
});