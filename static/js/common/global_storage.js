var globalStorage = (function(globalStorage){

    var _localStorage = new Object(); // 持久化存储
    var _sessionStorage = new Object(); // 非持久化存储


    if(typeof localStorage!=="undefined"){
        _localStorage=localStorage;
    }

    if(typeof sessionStorage!=="undefined"){
        _sessionStorage=sessionStorage;
    }

    globalStorage.setLocalData = function(key,value){
        _localStorage[key]=JSON.stringify(value);
    };

    globalStorage.getLocalData = function(key){
        if(_localStorage[key]==null){
            return null;
        }
        return JSON.parse(_localStorage[key]);
    };

    globalStorage.setSessionData = function(key,value){
        _sessionStorage[key]=JSON.stringify(value);
    };

    globalStorage.getSessionData = function(key){
        if(_sessionStorage[key]==null){
            return null;
        }
        return JSON.parse(_sessionStorage[key]);
    };

    return globalStorage;

})(globalStorage||{});
