'use strict';

/* Filters */

(function(){
    var ampFilters = ampFilters||angular.module('amp-common-filters', []);

    ampFilters.filter("numberFormatDefault", ["$filter", function ($filter) {
        return function (number,placeholder,fractionSize) {


            if (number==null||number==""||new String(number).indexOf(" ")>0||isNaN(number)) {
                return placeholder;
            }

            return $filter("number")(number,fractionSize);
        };
    }]);


    ampFilters.filter("stringFormatDefault", [ function () {
        return function (str,suffix,placeholder) {

            if(str==null||str==""){
                return placeholder;
            }
            return str+suffix;
        };
    }]);
})();

