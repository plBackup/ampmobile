(function(){
    var commonUtil = {};
    /**
     * 判断是否为数字
     * @param obj
     * @returns {boolean}
     */
    function isNumber(obj){
        if(obj==null||obj===""||isNaN(obj)){
            return false;
        }
        return true;
    }

    /**
     * 数组中的字符串相加，如果数组中没有一个是数字，则返回替换符
     * @param arr
     * @param placeholder
     * @returns {number}
     */
    function addNumber(arr,placeholder){
        var result = 0;
        var nonNumber = true;
        arr.forEach(function(item){
            if(isNumber(item)){
                nonNumber = false;
                result = parseFloat(item)+result;
            }
        });

        if(nonNumber){
            result=placeholder;
        }
        return result;
    }

    /**
     * 两个数字相减,如果传入的两个参数都不是数字，则返回替换符
     * @param first
     * @param second
     * @param placeholder
     * @returns {*}
     */
    function subtractNumber(first,second,placeholder){
        if(isNumber(first)&&isNumber(second)){
            return parseFloat(first) - parseFloat(second);
        }else if(isNumber(first)){
            return first;
        }else if(isNumber(second)){
            return -1*parseFloat(second);
        }
        return placeholder;
    }

    /**
     * 获取一个数字，如果传入参数不可转化为数字，则返回替换符
     * @param number
     * @param placeholder
     * @returns {*}
     */
    function getValue(number,placeholder){
        if(isNumber(number)){
            return parseFloat(number);
        }
        return placeholder;
    }

    /**
     * 返回指定的数字倍率的冥次方，否则返回默认值
     * @param number 基础数字
     * @param powerBase 倍率
     * @param powerIndex 冥次方
     * @param defaultValue 默认值
     * @returns {*}
     */
    function powerCalculate(number,powerBase,powerIndex,defaultValue){

        if(!isNumber(number)||!isNumber(powerBase)) {
            return defaultValue;
        }

        for(var i=1;i<=powerIndex;i++){
            number = number*(powerBase/100+1);
        }
        return parseInt(number);
    }

    /**
     * 获取 查询参数
     * @returns {{}}
     */
    function getQueryParameterMap(){
        var queryString = window.location.search.slice(1);
        var parameterEntryArray = queryString.split("&");
        var result = {};
        parameterEntryArray.forEach(function(item){
            var parameterEntry = item.split("=");
            result[parameterEntry[0]]=parameterEntry[1];
        });
        return result;
    }

    /**
     * 克隆数据
     * @param data
     * @returns {*}
     */
    function cloneData(data){
        var newString = JSON.stringify(data);
        return JSON.parse(newString);
    }

    commonUtil.isNumber = isNumber;
    commonUtil.addNumber = addNumber;
    commonUtil.subtractNumber = subtractNumber;
    commonUtil.getValue = getValue;
    commonUtil.powerCalculate = powerCalculate;
    commonUtil.getQueryParameterMap = getQueryParameterMap;
    commonUtil.cloneData = cloneData;

    window.CommonUtil = commonUtil;

})();

