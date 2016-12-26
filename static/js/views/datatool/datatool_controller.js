/**
 * Created by limeiting on 16/11/18.
 */
var amp_datePicker=(function($,amp_datePicker){
    var amp_datePicker=amp_datePicker;

    function gd(year, month, day) {
        return new Date(year, month, day).getTime();
    }

    function DateAdd(interval,number,dateStr)
    {

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
    //daterange Selector
    amp_datePicker.dp_Array=[];
    amp_datePicker.daterangeSelector=function(){
        var curDate=new Date();
        var start_date=$("#daterange input#date-range-filter-start").val() || curDate.getFullYear()+"-"+(curDate.getMonth()+1)+"-"+(curDate.getDate());
        var end_date=$("#daterange input#date-range-filter-end").val()
        var startDate,endDate;
        var dateStart=$("#daterange input#date-range-filter-start").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN"
        }).on("changeDate",function(e){
            var curDateStr= DateAdd("d",0,e.date);
            startDate=e.timeStamp;
            if(endDate){
                if(startDate>endDate){
                    endDate=null;
                    $("#daterange input#date-range-filter-end").val("");
                }
            }
            $("#daterange input#date-range-filter-end").datetimepicker('setStartDate',curDateStr);
        });
        var dateEnd=$("#daterange input#date-range-filter-end").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN",
        }).on("changeDate",function(e){
            endDate=e.timeStamp;
        });

        $("#daterange input#date-range-filter-start").val(start_date);
        $("#daterange input#date-range-filter-end").val(end_date);

        //这里把日期实例加入全局的垃圾回收站
        amp_datePicker.dp_Array.push(dateStart);
        amp_datePicker.dp_Array.push(dateEnd);
    };
    amp_datePicker.dateSelector=function(){
        var curDate=new Date();
        var start_date=$("#datepicker input").val()||curDate.getFullYear()+"-"+(curDate.getMonth()+1)+"-"+(curDate.getDate());

        var dpicker=$("#datepicker input").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN"
        });

        $("#datepicker input").val(start_date);

        //这里把日期实例加入全局的垃圾回收站
        amp_datePicker.dp_Array.push(dpicker);
    };
    amp_datePicker.destroy=function(){
        $.each(amp_datePicker.dp_Array,function(i,e){
            $(e.selector).datetimepicker("remove");
        });
        amp_datePicker.dp_Array=[];
    };
    return amp_datePicker;

    })(jQuery,amp_datePicker||{});
var rpgSet_table=(function($,rpgSet_table){
    var rpgSet_table=rpgSet_table;
    var pin;
    var rpgSet_table_head_swiper,rpgSet_table_main_swiper,swiper_rent_update_table,swiper_rent_affect_table;
    rpgSet_table.swiper_init=function(){
        rpgSet_table_head_swiper = new Swiper('#rpg-set-main-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true,
            watchSlidesProgress:true,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });
        rpgSet_table_main_swiper = new Swiper('#rpg-set-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });
        rpgSet_table_head_swiper.params.control = rpgSet_table_main_swiper;
        rpgSet_table_main_swiper.params.control = rpgSet_table_head_swiper;

        //这里把swiper实例加入全局的垃圾回收站
        /* ampApp.collector.add_swiper(rpgSet_table_head_swiper);
         ampApp.collector.add_swiper(rpgSet_table_main_swiper);*/

        swiper_rent_affect_table=new Swiper('#rent-affect-main-table', {
            scrollbar: '.swiper-scrollbar-a',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false,
            watchSlidesProgress:true,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });

        //这里把swiper实例加入全局的垃圾回收站
        //ampApp.collector.add_swiper(swiper_rent_affect_table);

        swiper_rent_update_table=new Swiper('#rent-update-main-table', {
            scrollbar: '.swiper-scrollbar-b',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });

        //这里把swiper实例加入全局的垃圾回收站
        //ampApp.collector.add_swiper(swiper_rent_update_table);

        /*pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#rpg-set-table-wrapper",
            padding: {top: 88, bottom: 50}
        });
        var defer=null;
        function _swiperUpdate(){
            pin.refresh();
        };

        $(window).resize(function(){
            if(!defer){
                defer=setTimeout(function(){
                    _swiperUpdate();
                    defer=null;
                },200);
            }else{
                clearTimeout(defer);
                defer=setTimeout(function(){
                    _swiperUpdate();
                    defer=null;
                },200);
            }

        });*/

        rpgSet_table.swipers={
            rpgSet_table_head_swiper: rpgSet_table_head_swiper,
            rpgSet_table_main_swiper:rpgSet_table_main_swiper

        };

        //这里实验tab切换输入的情况
        /* $("#rpg-set-table-wrapper input").on("blur",function(e){
         //console.log("-----------blur-------------");
         //console.log(rpgSet_table_main_swiper.getWrapperTranslate('x'))
         });*/
    };

    rpgSet_table.table_init=function(){
        $(".ys-table-main").on("mouseenter","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).addClass("hover");
            });
        });

        $(".ys-table-main").on("mouseleave","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).removeClass("hover");
            });

        });

    };

    rpgSet_table.destroy=function(){
        rpgSet_table_head_swiper.destroy();
        rpgSet_table_main_swiper.destroy();
        swiper_rent_affect_table.destroy();
        swiper_rent_update_table.destroy();
    };

    rpgSet_table.init=function(){

        /* $("#btn-create").on("click",function(e){
         e.preventDefault();
         amp_main.loading_show();
         setTimeout(function(){
         amp_main.loading_hide();
         },1000);

         });*/
        rpgSet_table.swiper_init();
        rpgSet_table.table_init();
        $('#preloader').delay(350).fadeOut(function(){
            //start
            //这里暂时先禁掉 table的 tab键
            $(".table").find("input").attr("tabIndex","-1");
            //$(".table").find("span.span-editable").attr("tabIndex","-1");
        });
    };

    return rpgSet_table;
})(jQuery,rpgSet_table||{});
var irr_plan=(function($,irr_plan){
    var irr_plan=irr_plan;
    var pin;
    var irr_plan_head_swiper,irr_plan_main_swiper;

    irr_plan.swipers={}
    irr_plan.swiper_init=function(){
        irr_plan_head_swiper = new Swiper('#irr-plan-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true
        });
        irr_plan_main_swiper = new Swiper('#irr-plan-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false,
            preventClicksPropagation:false
        });

        irr_plan_head_swiper.params.control = irr_plan_main_swiper;
        irr_plan_main_swiper.params.control = irr_plan_head_swiper;

        //这里把swiper实例加入全局的垃圾回收站
        /*ampApp.collector.add_swiper(irr_plan_head_swiper);
         ampApp.collector.add_swiper(irr_plan_main_swiper);*/


        irr_plan.swipers={
            irr_plan_head_swiper:irr_plan_head_swiper,
            irr_plan_main_swiper:irr_plan_main_swiper
        };

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#irr-plan-table-wrapper",
            padding: {top: 44, bottom: 50}
        });

        var defer=null;
        function _swiperUpdate(){
            /* irr_plan_head_swiper.update();
             irr_plan_main_swiper.update();*/
            pin.refresh();
        };
        $(window).resize(function(){
            if(!defer){

                defer=setTimeout(function(){
                    _swiperUpdate();
                    defer=null;
                },200);
            }else{
                clearTimeout(defer);
                defer=setTimeout(function(){
                    _swiperUpdate();
                    defer=null;
                },200);
            }
        });
    };

    irr_plan.irr_plan_swiper_reset=function(){
        irr_plan_head_swiper = new Swiper('#irr-plan-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true
        });
        irr_plan_main_swiper = new Swiper('#irr-plan-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });
        /*   irr_plan_head_swiper.update(true);
         irr_plan_main_swiper.update(true);*/
        irr_plan_head_swiper.params.control = irr_plan_main_swiper;
        irr_plan_main_swiper.params.control = irr_plan_head_swiper;

        irr_plan.swipers={
            irr_plan_head_swiper:irr_plan_head_swiper,
            irr_plan_main_swiper:irr_plan_main_swiper
        };

    };

    irr_plan.swiper_update=function(){
        irr_plan.destroy();
    };

    irr_plan.table_init=function(){
        $(".ys-table-main").on("mouseenter","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).addClass("hover");
            });
        });

        $(".ys-table-main").on("mouseleave","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).removeClass("hover");
            });

        });

    };

    irr_plan.destroy=function(){
        irr_plan_head_swiper.destroy(true,true);
        irr_plan_main_swiper.destroy(true,true);
    };
    irr_plan.init=function(){

        irr_plan.swiper_init();
        irr_plan.table_init();
        /*  $('#preloader').delay(350).fadeOut(function(){
         //start
         });*/
    };

    return irr_plan;
})(jQuery,irr_plan||{});

var dataTool=angular.module("dataTool",[]);
dataTool.controller("datatoolController",['$rootScope', '$scope',"$timeout","$location","$state",
    function($rootScope,$scope,$timeout,$location,$state){
        var self=this;
        $rootScope.showHeader();
        $rootScope.showBottom();

        $rootScope.dFooterShow=true;
        $rootScope.pageId="datatool";

        self.goHome=function(){
            $state.go("projectlist");
        };
        $state.go("datatool.rpgindex");
}]);
dataTool.controller("dataIndexController",['$rootScope', '$scope',"dataIndexData","paginatorService","$timeout","$location","$state","$filter","SharedState",
    function($rootScope, $scope,dataIndexData,paginatorService,$timeout,$location,$state,$filter,SharedState) {
        var self=this;
        var shopData=dataIndexData.slice(1);

        $rootScope.showHeader();
        $rootScope.showBottom();

        $rootScope.dFooterShow=true;
        $rootScope.pageId="datatool-rpgindex";

        console.log($rootScope.dFooterShow);
        $rootScope.indexData=shopData;
        console.log($rootScope.indexData);

        self.goHome=function(){
            $state.go("projectlist");
        }

        self.indexData=$rootScope.indexData;
        self.recordsNum=self.indexData.length;
        self.pageLimit=10;
        self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);

        self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);

        //pageTarget初始化与pageIndex一致
        //这里演示时简化逻辑，没有http取数据操作，通过一次性取数据， 通过页面过滤器进行页面展示
        self.loadPage=function(targetIndex){
            if(targetIndex>=self.pageNum){
                targetIndex=self.pageNum;
            }else if(targetIndex<=1){
                targetIndex=1;
            }
            self.paginator.setIndex(targetIndex);
        };

        self.shopEdit=function(index,shop){
            console.log(index);
            console.log(shop);
            //self.indexData[index].shopIndex+="###";s
            //$location.path("/datatool/shopedit/"+index);
            $state.go('datatool.shopedit',{shopId: index});
        };

        self.shopUpdate=function(index,shop){
            shopData[index]=shop;
        };

        /* old code */
        $scope.$on("shopUpdate",function(e,data){
            self.shopUpdate(data.index,data.shop);
        });
        /* old code */
        self.shopAdd=function(index,shop){
            if(index=="add"){
                shopData.unshift(shop);
                self.recordsNum=self.indexData.length;
                self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
                self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
            }else if(index=="new"){
                //shopData[0]=shop;
            }
        };

        $scope.$on("shopAdd",function(e,data){
            self.shopAdd(data.index,data.shop);
        });

        $scope.$on("shopUpdateAdd",function(e,data){
            self.shopAdd(data.index,data.shop);
        });


        self.filters={};
        $scope.$on("data_filter",function(e,data){
           var curFilter={};
           $.each(data.filters,function(k,v){
               if(k!=="project" && v!=="" ){
                   curFilter[k]=v;
               }
           });

           self.indexData=$filter("filter")(shopData,curFilter);
           //self.filters=curFilter;
           self.recordsNum=self.indexData.length;
           self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
           self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
       });


        /*filters*/
        self.filters={
            project:$rootScope.projectName,
            floor:"",
            form:"",
            property:"",
            shopIndex:""

        }
        self.form_menu={
            projects:["商业公司A","商业公司B","商业公司C","商业公司D"],
            floors:["B1","F1","F2","F3","F4","F5","F6"],
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
        }

        self.addNew=function(){
            $scope.$emit("right_open",{"right_open":true});
        };
        self.setModel=function(type,menu){
            self.filters[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.reset=function(){
            self.filters={
                project:$rootScope.projectName,
                floor:"",
                form:"",
                property:"",
                shopIndex:""

            };
            $scope.$emit("data_filter",{
                name:"data_tool",
                filters:self.filters
            });

            SharedState.turnOff("uiSidebarRight");

        };
        self.search=function(){
            console.dir(self.filters);
            $scope.$emit("data_filter",{
                name:"data_tool",
                filters:self.filters
            });
            console.log(self.filters);

            SharedState.turnOff("uiSidebarRight");

        };

    }]);

dataTool.controller("rpgResultController",['$rootScope', '$scope',"dataIndexData","paginatorService","$timeout","$location","$state","$filter","SharedState",
    function($rootScope, $scope,dataIndexData,paginatorService,$timeout,$location,$state,$filter,SharedState) {
        var self=this;
        $rootScope.showHeader();
        $rootScope.hideBottom();

        $rootScope.dFooterShow=true;
        $rootScope.pageId="datatool-rpgresult";

        self.back=function(){
          $state.go("datatool.rpgpin");
        };

        var shopData=dataIndexData.slice(1);
        $rootScope.indexData=shopData;
        //console.log($rootScope.indexData);
        self.indexData=$rootScope.indexData;
        self.recordsNum=self.indexData.length;
        self.pageLimit=10;
        self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);

        self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);

        //pageTarget初始化与pageIndex一致
        //这里演示时简化逻辑，没有http取数据操作，通过一次性取数据， 通过页面过滤器进行页面展示
        self.loadPage=function(targetIndex){
            if(targetIndex>=self.pageNum){
                targetIndex=self.pageNum;
            }else if(targetIndex<=1){
                targetIndex=1;
            }
            self.paginator.setIndex(targetIndex);
        };
        self.selectShop=null;
        self.rentDetail=function($index,shop){
            self.selectShop=shop;
            SharedState.turnOn("uiSidebarRight");

        };
        self.save=function(){
            $state.go("datatool.rpgset");
        };

        self.setSelect=function(type){

            console.log("---------------**");
            console.log(self.shopInfo);
            console.log(self.shopInfoCopy);
            switch(type){
                case 'position':
                    self.selectType="position";
                    self.selectTypeName="位置";
                    break;
                case 'type':
                    self.selectType='type';
                    self.selectTypeName="物业类型";
                    break;
                case 'form':
                    self.selectType='form';
                    self.selectTypeName="业态";
                    break;
                case 'property':
                    self.selectType="property";
                    self.selectTypeName="产权性质";
                    break;
                default:
                    return
            }
            SharedState.turnOn("uiSidebarRight");
        };


        self.filters={};
        $scope.$on("datatool_filter",function(e,data){
            var curFilter={};
            $.each(data.filters,function(k,v){
                if(k!=="project" && v!==""){
                    curFilter[k]=v;
                }
            });
            self.indexData=$filter("filter")(shopData,curFilter);
            //self.filters=curFilter;
            self.recordsNum=self.indexData.length;
            self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
            self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
        });


    }]);


dataTool.controller("dataEditController",['$rootScope', '$scope','$state','SharedState','shopData',
    function($rootScope, $scope,$state,SharedState,shopData) {
        var self=this;

        $rootScope.showHeader();
        $rootScope.hideBottom();

        $rootScope.dFooterShow=false;
        $rootScope.pageId="datatool-shopedit";


        self.form_menu={
            projects:["商业公司A","商业公司B","商业公司C","商业公司D"],
            floor:["B1","F1","F2","F3","F4","F5","F6"],
            position:["主入口","主立面外墙","次入口","主通道","侧面面街","后街"],
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
            type:["MAll","商业街"]
        };

        self.index="add"; //改成了shopData.type= edit || create;
        self.shopInfo={};

        if(typeof shopData!=="undefined" &&shopData!=null){
            self.index=shopData.type; //edit create;
            if(self.index=="edit") {
                if(typeof $rootScope.indexData=="undefined"){
                    $state.go("datatool.rpgindex");
                }
                self.shopInfo = angular.copy($rootScope.indexData[shopData.shopId]);
                console.log(self.shopInfo);
            }else if(self.index="create"){
                self.shopInfo={
                    rentStandard:[0],
                    wyStandard:[0]
                }
            }
        }else{
            $state.go("datatool.rpgindex");
        }

        $scope.$on("shopEdit",function(e,data){
            var editData=angular.copy(data);
            $("#rent-package-rpanel").find(".error").find("em.error-msg").remove().end().removeClass("error");
            $scope.shopInfoForm.$setPristine();
            $scope.shopInfoForm.$setUntouched();
            self.index=data.index;
            console.log("shop edit---------");
            console.log(editData.shopData);
            self.shopInfo=editData.shopData;

        });
        //rCtrl.setSelect('position')

        self.selectType=null;
        self.selectTypeName=null;
        self.shopInfoCopy=null;
        self.shopInfoCopy=angular.copy(self.shopInfo);
        self.setSelect=function(type){

            console.log("---------------**");
            console.log(self.shopInfo);
            console.log(self.shopInfoCopy);
            switch(type){
                case 'position':
                    self.selectType="position";
                    self.selectTypeName="位置";
                    break;
                case 'type':
                    self.selectType='type';
                    self.selectTypeName="物业类型";
                    break;
                case 'form':
                    self.selectType='form';
                    self.selectTypeName="业态";
                    break;
                case 'property':
                    self.selectType="property";
                    self.selectTypeName="产权性质";
                    break;
                default:
                    return
            }
            SharedState.turnOn("uiSidebarRight");
        };

        self.setModel=function(type,menu){
            console.log(self.shopInfoCopy);
            console.log(type);
            console.log(menu);
            self.shopInfoCopy[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.reset=function(type){
            self.shopInfoCopy[type]=angular.copy(self.shopInfo[type]);
        };

        self.saveSelect=function(disabled){
            if(disabled){
                alert("请输入有效数据");
                return;
            }
            self.shopInfo =angular.copy(self.shopInfoCopy);
            //self.shopInfoCopy=null;
            SharedState.turnOff("uiSidebarRight");
        };

        self.save=function(){
            if($scope.shopInfoForm.$invalid){
                alert("请输入正确的数据");
                return;
            }else{
                if(self.index=="edit") {
                    $rootScope.indexData[shopData.shopId]=self.shopInfo;
                    console.log($rootScope.indexData);
                    $state.go("datatool.rpgindex");
                    console.log(self.shopInfo);
                }else if(self.index="create"){
                    //$http新增数据
                    //$rootScope.indexData.push(self.shopInfo);
                    console.log($rootScope.indexData);
                    $state.go("datatool.rpgindex");
                }

            }
        };

        self.next=function(){

        };
       /* self.shopInfo={
            rentStandard:[0],
            wyStandard:[0]
        }*/
        self.addYear=function(type){
            switch(type){
                case "estate":
                    self.shopInfo.wyStandard.push(0);

                    break;
                case "rent":
                    self.shopInfo.rentStandard.push(0);
                    break;
                default:
                    return;
            }
        };
        self.removeYear=function(type){

            switch(type){
                case "estate":
                    if(self.shopInfo.wyStandard.length>1){
                        self.shopInfo.wyStandard.pop();
                    }else{
                        self.shopInfo.wyStandard[0]=0;
                    }
                    break;
                case "rent":
                    if(self.shopInfo.rentStandard.length>1){
                        self.shopInfo.rentStandard.pop();
                    }else{
                        self.shopInfo.rentStandard[0]=0;
                    }
                    break;
                default:
                    return;
            }
        }


        /*dom */
        //页面事件
        $("#rent-package-edit").on("click",function(e){
            if(!$(e.target).hasClass("number-format")){
                $(".table td").removeClass("active");
            }
        });

        $("#rent-package-edit").on("click","li",function(e){
            //e.stopPropagation();
            $("#rent-package-edit li").removeClass("active");
            $(this).addClass("active");
            $(this).find("input").focus();
        });

        function _checkErrot($e){
            var $this=$e;
            var errorInfo="请输入正确的数据格式";
            if($this.hasClass("ng-invalid")){
                if(($this).hasClass("ng-invalid-number")){
                    errorInfo="请输入有效数字";
                }
                $this.parent(".td-input-wrapper").addClass("error").append("<em class='error-msg'>"+errorInfo+"</em>");
            }else{
                $this.parent().removeClass("error").find("em.error-msg").remove();
            }
        };

        $("#rent-package-edit").on("change","input",function(e){
            _checkErrot($(e.target));
        });


    }]);

dataTool.controller("dataSetIndexController",['$rootScope', '$scope','$timeout',"SharedState","rpgSetData","rpgresultData",
    function($rootScope, $scope,$timeout,SharedState,rpgSetData,rpgresultData) {
        var self=this;
        self.setData=rpgSetData[0].values;
        self.rpgResultData=rpgresultData.rpgResultData;
        $rootScope.showHeader();
        $rootScope.showBottom();

        $rootScope.dFooterShow=false;
        $rootScope.pageId="datatool-rpgset";

        self.getAvg=function(data){
            var sum=0;
            var len=data.yearly.length;
            if(len>=1){
                $.each(data.yearly,function(i,e){
                    sum+=e;
                });
                data.gla=sum/len;
                return data.gla;
            }else{
                data.gla=0;
                return 0;
            }

        };
        self.getColAvg=function(index,name){
            var sum=0;
            var data=self.rpgResultData[name];

            if(typeof data!=="undefined"&&data.length>=1){
                if(index=="avg"){
                    $.each(data,function(k,v){
                        var picked=v.gla;
                        sum+=picked;
                    });
                }else{
                    $.each(data,function(k,v){
                        var picked=v.yearly[index];
                        sum+=picked;
                    });
                }

            }
            return sum;
        };


        self.modalTitle="";

        self.viewDetail=function(dataType){

            switch(dataType){
                case "floorSumRent":
                    self.modalTitle="各楼层总租金";
                    self.rpgDataModal="floorSumRent";
                    break;

                case "floorAvgRent":
                    self.modalTitle="各楼层平均租金";
                    self.rpgDataModal="floorAvgRent";
                    break;

                case "formSumRent":
                    self.modalTitle="各业态总租金";
                    self.rpgDataModal="formSumRent";
                    break;

                case "formAvgRent":
                    self.modalTitle="各业态平均租金";
                    self.rpgDataModal="formAvgRent";
                    break;

                default:
                    self.modalTitle="各楼层总租金";
                    self.rpgDataModal="floorSumRent";
                    return;
            }

            SharedState.turnOn("subpageModal");
            $timeout(function(){

                console.log("rpgDataModal swiper--------");
                console.log(rpgset_modal_swiper);
                console.log(typeof rpgset_modal_swiper);

                if(typeof rpgset_modal_swiper !=="undefined"){
                    rpgset_modal_swiper.destroy(true,true);
                }
                rpgset_modal_swiper = new Swiper('#amp-tab-modal-swiper', {
                    scrollbar: '.swiper-scrollbar',
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    //mousewheelControl: true,
                    freeMode: true,
                    scrollbarHide:true,
                    watchSlidesProgress:true,
                    observer:true,
                    observeParents:true,
                });

                rpgset_modal_swiper.update();
            },300);
        };

        self.hideDetail=function(){
            SharedState.turnOff("subpageModal");
            if(typeof rpgset_modal_swiper!=="undefined"){
                rpgset_modal_swiper.destroy(true,true);
                rpgset_modal_swiper=undefined;
            }
        };
    }]);

dataTool.controller("dataSetController",['$rootScope', '$scope',"$location","$timeout","$state","rpgSetData",
    function($rootScope, $scope,$location,$timeout,$state,rpgSetData) {
        var self=this;

        $rootScope.showHeader();
        $rootScope.hideBottom();

        $rootScope.dFooterShow=true;
        $rootScope.pageId="datatool-rpgpin";

        self.rpgSetData=rpgSetData[0];
        //self.setData=rpgSetData[0].values;

        console.log(rpgSetData);

        self.setSave=function(){

            console.log("set save-----------");
            //console.log(self.rpgSetData)
            if($scope.rpgSetForm.$invalid){
                alert("请输入正确的数据");
                return false;
            }else{
                $rootScope.loading_show();
                $timeout(function(){
                    $rootScope.loading_hide();
                },1000);
                $state.go("datatool.rpgresult");
                /*ui-sref="rpgresult"  ui-sref-active="active" href="#/rpgresult"*/
            }
        };

        document.onkeydown = function(){
            console.log(event.keyCode);
            if(event.keyCode == 13||event.keyCode == 9) {
                return false;
            }
        };
        //页面事件
        $(".page-main").on("click",function(e){
            // e.stopPropagation();
            if($(e.target).closest("div").hasClass("td-input-wrapper")||$(e.target).closest("div").hasClass("td-range-input")){
                return
            }else{
                $(".table td").removeClass("active");
            }
        });

        /*$(".table").on("click","td",function(e){
         e.stopPropagation();
         $(".table td").removeClass("active");
         $(this).addClass("active");
         $(this).find("input").focus();
         });*/

        $(".table").on("click",".td-input-wrapper",function(e){

            $(".table td").removeClass("active");

            $(this).closest("td").addClass("active");
            $(this).find("input").focus();

        });
        //回车向下输入
        $(".table").on("keydown",function(e){
            console.log("e-------------");
            console.log(e.target);
            if(e.keyCode==13 && e.target.nodeName.toLowerCase()==="input"){
                var $curInput=$(e.target);
                var rowSpan=parseInt($curInput.closest("tr").find("td").eq(0).attr("rowspan"));
                var trIndex= $curInput.closest("tr").index();
                var tdIndex= $curInput.closest("td").index();

                var th_len=parseInt($curInput.closest("tr").find("th").length);

                if(rowSpan>1){
                    console.log(rowSpan);
                    console.log(trIndex+"--"+tdIndex);
                    /*if()*/
                    $curInput.closest(".table").find("tr").eq(trIndex+1).find("td").eq(tdIndex-1-th_len).find(".td-input-wrapper").trigger("click");

                }else{
                    console.log(rowSpan);
                    console.log(trIndex+"--"+tdIndex);
                    /*if()*/
                    if(parseInt($curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(0).attr("rowspan"))>1){
                        $curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-th_len+1).find(".td-input-wrapper").trigger("click");

                    }else{
                        console.log("......")
                        console.log($curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-th_len));
                        $curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-th_len).find(".td-input-wrapper").trigger("click");
                    }

                }
            };
            if(e.keyCode==9&& e.target.nodeName.toLowerCase()==="input"){
                console.log("999")
                var $curInput=$(e.target);
                var trIndex= $curInput.closest("tr").index();
                var tdIndex= $curInput.closest("td").index();
                var th_len=parseInt($curInput.closest("tr").find("th").length);
                console.log($(e.target).closest("td").next("td").find(".td-input-wrapper"))
                $(e.target).closest("td").next("td").find(".td-input-wrapper").trigger("click");

            }

        });

        //这里禁止掉跨页面td的点击事件
        $("#rpg-set-main-table tbody").on("click","td",function(e){
            //e.stopPropagation();
            var td_width=parseInt($(this).css("width"));
            var td_offset=parseInt($(this).position().left);
            var translate=rpgSet_table.swipers.rpgSet_table_main_swiper.translate;
            var cont_width=rpgSet_table.swipers.rpgSet_table_main_swiper.width;
            if(td_offset+td_width+translate>cont_width){
                rpgSet_table.swipers.rpgSet_table_main_swiper.setWrapperTranslate(translate-160);

                return false;
            }else{
                /* $(this).find("span.span-editable").addClass("focus");
                 $(this).find("span.span-editable").focus();*/

            }
            /* if(td_offset+td_width+translate>cont_width){
             return false;
             }else{
             /!* $(this).find("span.span-editable").addClass("focus");
             $(this).find("span.span-editable").focus();*!/

             }*/
        });


        self.affectData =self.rpgSetData.rentCount;
        self.affect_count=[
            {
                "name":"因素权重打分小计",
                "value":"1",
                "projects":[
                    {
                        "name":"项目A",
                        "value":82,
                        "description":""
                    },
                    {
                        "name":"项目B",
                        "value":83.3,
                        "description":""
                    },

                    {
                        "name":"本项目",
                        "value":80.50,
                        "description":""
                    }
                ]
            },
            {
                "name":"参考租金（元/平米/月）GLA",
                "value":"",
                "projects":[
                    {
                        "name":"项目A",
                        "value":253,
                        "description":""
                    },
                    {
                        "name":"项目B",
                        "value":335,
                        "description":""
                    },
                    {
                        "name":"本项目",
                        "value":"",
                        "description":""
                    }
                ]
            },
            {
                "name":"加权租金（元/平米/月，GLA）",
                "value":"",
                "projects":[
                    {
                        "name":"项目A",
                        "value":248.37,
                        "description":""
                    },
                    {
                        "name":"项目B",
                        "value":323.74,
                        "description":""
                    },
                    {
                        "name":"本项目",
                        "value":"",
                        "description":""
                    }
                ]
            },
            {
                "name":"参考权重（近似的比重高）",
                "weight":"",
                "projects":[
                    {
                        "name":"项目A",
                        "value":0.78,
                        "description":""
                    },
                    {
                        "name":"项目B",
                        "value":0.22,
                        "description":""
                    },
                    {
                        "name":"本项目",
                        "value":265,
                        "description":""
                    }
                ]
            }
        ];

        self.shopInfo={
            "mallProportionType":"",
            "streetProportionType":""
        };
        self.proportionType={
            "indoor":"套内面积",
            "floor":"建筑面积"
        };

        self.affect_sum=function(index){
            var ratioArray_0=[];
            $.each(self.affectData,function(k,v){
                $.each(v,function(i,e){
                    var curRatio=parseFloat(e.weight);
                    var value=e.projects[index].value;
                    ratioArray_0.push(curRatio*value);
                });

            });
            var curWeight=0;
            $.each(ratioArray_0,function(i,e){
                curWeight+=e;
            });
            return curWeight;
        };

        self.updateWeight=function(){
            self.affect_count[0].projects[0]["value"]=self.affect_sum(0);
            self.affect_count[0].projects[1]["value"]=self.affect_sum(1);
            self.affect_count[0].projects[2]["value"]=self.affect_sum(2);
            //加权租金
            self.affect_count[2].projects[0]["value"]=self.affect_count[0].projects[2]["value"]*self.affect_count[1].projects[0]["value"]/self.affect_count[0].projects[0]["value"];
            self.affect_count[2].projects[1]["value"]=self.affect_count[0].projects[2]["value"]*self.affect_count[1].projects[1]["value"]/self.affect_count[0].projects[1]["value"];

            //参考租金
            self.affect_count[3].projects[2]["value"]=self.affect_count[2].projects[0]["value"]*self.affect_count[3].projects[0]["value"]+self.affect_count[2].projects[1]["value"]*self.affect_count[3].projects[1]["value"];
        };

        self.updateWeight();

        self.setModel=function(type,menu){
            self.shopInfo[type]=menu;

            console.log(self.shopInfo);
        };

        self.isActive=function(menu,model){
            return menu==model;
        };


        function _checkErrot($e){
            var $this=$e;
            var errorInfo="请输入正确的数据格式";
            if($this.hasClass("ng-invalid")){
                if(($this).hasClass("ng-invalid-number")){
                    errorInfo="请输入有效数字";
                }
                console.log("input")
                $this.parent(".td-input-wrapper").append("<em class='error-msg'>"+errorInfo+"</em>");
            }else{
                $this.parent().find("em.error-msg").remove();
            }
        };

        $("#rgp-set").on("change","input",function(e){
            console.log("-----change");
            _checkErrot($(e.target));
        });

        //dataSetView.init();
        $timeout(function(){
            rpgSet_table.init();
        },390);

        $scope.$on("$destroy", function() {
            rpgSet_table.destroy();
        })
    }]);

dataTool.controller("irrPlanController",['$rootScope', '$scope',"irrPlanData","$timeout","$location",
    function($rootScope, $scope,irrPlanData,$timeout,$location) {
        var self=this;
        $rootScope.showHeader();
        $rootScope.hideBottom();

        $rootScope.dFooterShow=true;
        $rootScope.pageId="datatool-irrplan";

        self.irrData=irrPlanData;

        self.save=function(){
         /*   amp_main.loading_show();
            $timeout(function(){
                amp_main.loading_hide();
                $location.path("noi");
            },1000);*/
        };
        var skip=2;
        //这里出于性能考虑 不采用$watch 直接在触发元素上绑定change事件，触发
        var curQuitYear;
        $scope.years=["第1年","第2年","第3年","第4年","第5年","第6年","第7年","第8年","第9年","第10年"];
        self.quitYear=irrPlanData[31].values[1].value;
        curQuitYear=self.quitYear;
        self.quitRRate=irrPlanData[32].values[1].value;
        self.quitFee=self.irrData[33].values[1].value;

       /* $scope.$watch('irrData', function(newValue, oldValue) {
            /!*if (newValue === oldValue) { return; }*!/
        },true);*/
        self.count=function(){
            var skip=2;
            var watchData={
                subEmptyRate:self.irrData[5].values,
                anchorManageFee:self.irrData[7].values,
                manageFeeUpdate:self.irrData[10].values,
                multiIncomeRatio:self.irrData[13].values[1],
                propertyTaxes:self.irrData[16].values[1],
                salesTaxes:self.irrData[17].values[1],
                runCostRate:self.irrData[19].values,
                quitYear:self.irrData[31].values[1],
                quitRRate:self.irrData[32].values[1],
                quitFee:self.irrData[33].values[1],

                valOfYear:self.irrData[41].values[1],
                loanYears:self.irrData[42].values[1],
                loanPP:self.irrData[42].values[1],

                loanInterest:self.irrData[49].values[1]
            };

            var countData={
                rentIncome:self.irrData[5].values.slice(2),
                manageFeeUpdate:self.irrData[10].values.slice(2),
                manageFeeIncome:self.irrData[11].values.slice(2),
                multiIncome:self.irrData[13].values.slice(2),
                totleRevenue:self.irrData[14].values.slice(2),

                propertyTaxes:self.irrData[16].values.slice(2),
                salesTaxes:self.irrData[17].values.slice(2),

                runCost:self.irrData[20].values.slice(2),//经营费用
                expenseRatio:self.irrData[21].values.slice(2),//总经营费用占比
                expense:self.irrData[22].values.slice(2), //总经营费用

                noi:self.irrData[24].values.slice(2),
                roi:self.irrData[25].values.slice(2),
                roiRes:self.irrData[26].values.slice(2),

                quitRRate:self.irrData[32].values.slice(2),
                quitFee:self.irrData[33].values.slice(2),
                quitIncome:self.irrData[34].values.slice(2), //退出收益

                unleveredCashFlow:self.irrData[35].values.slice(2),//无杠杆现金流
                unleveredNRR:self.irrData[36].values.slice(2),//净回报率
                unleveredIRR:self.irrData[37].values.slice(2),//无杠杆内部收益率
                unleveredProfits:self.irrData[38].values.slice(2),//无杠杆利润
                unleveredRMBPP:self.irrData[39].values.slice(2),//人民币利润倍数
                //杠杆现金流
                leveredValue:self.irrData[41].values.slice(2),//当年估值
                loanPP:self.irrData[43].values.slice(2),//贷款额

                loanMoney:self.irrData[45].values.slice(2),//贷款金额
                mortgageCashFlow:self.irrData[46].values.slice(2),//按揭现金流
                quitPayment:self.irrData[47].values.slice(2),//退出时还债
                endLoan:self.irrData[48].values.slice(2),//尾期余额
                loanRate:self.irrData[49].values.slice(2),//贷款利息

                leveredCashFlow:self.irrData[50].values.slice(2),//无杠杆现金流
                leveredNRR:self.irrData[51].values.slice(2),//净回报率
                leveredIRR:self.irrData[52].values.slice(2),//无杠杆内部收益率
                leveredProfits:self.irrData[53].values.slice(2),//无杠杆利润
                leveredRMBPP:self.irrData[54].values.slice(2),//人民币利润倍数

            };

           /* var countSum={
                noiSum:self.irrData[24].values[1]
            };*/
            if(typeof parseInt(self.irrData[31].values[1].value)!=="number"){
                alert("请输入正确的退出年");
                self.irrData[31].values[1].value=10;
            }else{
                if(parseInt(self.irrData[31].values[1].value)>10 || parseInt(self.irrData[31].values[1].value)<=1){
                    alert("请输入2-10年为退出年");
                    self.irrData[31].values[1].value=10;
                }
            }

            self.quitYear=Math.abs(parseInt(self.irrData[31].values[1].value));

            function _updateTableHead(quitYear){
                curQuitYear=quitYear;
                var y=parseInt(quitYear);
                var irr_width=150*y;

                var $irrYear=$("#irr-year");
                $irrYear.empty();
                for(i=0;i<y;i++){
                    $irrYear.append('<th>第'+(i+1)+'年</th>');
                }
                $(".swiper-wrapper table").css("width",irr_width+"px");

              /*  $timeout(function(){
                    irr_plan.destroy();
                   irr_plan.irr_plan_swiper_reset();
                },1000);*/
            }
            //_updateTableHead(self.quitYear);
            //更改表头
            if(curQuitYear!==self.quitYear){
                 _updateTableHead(self.quitYear);
             }


            //租金总收入
            $.each(countData.rentIncome,function(i,e){
                e.value=self.irrData[2].values[i+skip].value+self.irrData[3].values[i+skip].value*(1-self.irrData[4].values[i+skip].value);
            });

            //物业管理费
            $.each(countData.manageFeeIncome,function(i,e){
                e.value=parseFloat(self.irrData[7].values[i+skip].value)+self.irrData[8].values[i+skip].value*(1-self.irrData[4].values[i+skip].value);
            });
            //物业管理费递增率
            $.each(countData.manageFeeUpdate,function(i,e){
                if(i==0){
                    e.value=0;
                }else{
                    e.value=parseFloat(self.irrData[11].values[i+skip].value)/parseFloat(self.irrData[11].values[i+skip-1].value)-1;
                }
            });

            //多经收入
            $.each(countData.multiIncome,function(i,e){
                e.value=self.irrData[5].values[i+skip].value*self.irrData[13].values[1].value;
            });
            //经营总收入
            $.each(countData.totleRevenue,function(i,e){
                e.value=self.irrData[5].values[i+skip].value+self.irrData[11].values[i+skip].value+self.irrData[13].values[i+skip].value;
            });
            //房产税－暂无输入
            //self.propertyTaxesNum=12000;
            $.each(countData.propertyTaxes,function(i,e){
               // e.value=self.irrData[5].values[i+skip].value+self.irrData[11].values[i+skip].value+self.irrData[13].values[i+skip].value;
                e.value=self.irrData[5].values[i+skip].value*self.irrData[16].values[1].value
            });
            //营业税
            $.each(countData.salesTaxes,function(i,e){
                 e.value=self.irrData[14].values[i+skip].value*self.irrData[17].values[1].value;
            });

            //经营费用runCost
            //self.runCostInit=2868.80;
            $.each(countData.runCost,function(i,e){
                if(i==0){
                    e.value=parseFloat(self.irrData[20].values[1].value)*(parseFloat(self.irrData[2].values[1].value)+parseFloat(self.irrData[3].values[1].value))/10000;

                }else{
                    e.value=parseFloat(self.irrData[20].values[i+skip-1].value)*(1+parseFloat(self.irrData[19].values[i+skip].value));
                }

            });

            //总经营费用
            $.each(countData.expense,function(i,e){
                e.value=parseFloat(self.irrData[20].values[i+skip].value)+parseFloat(self.irrData[16].values[i+skip].value)+parseFloat(self.irrData[17].values[i+skip].value)
            });
            //总费用占比
            $.each(countData.expenseRatio,function(i,e){
                e.value=parseFloat(self.irrData[20].values[i+skip].value)/parseFloat(self.irrData[11].values[i+skip].value)
            });

            //noi 总收入－总费用
            $.each(countData.noi,function(i,e){
                e.value=parseFloat(self.irrData[14].values[i+skip].value)-parseFloat(self.irrData[22].values[i+skip].value)
            });
            //roi 每一年的noi/总投入
            $.each(countData.roi,function(i,e){
                e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))/parseFloat(Math.abs(self.irrData[24].values[1].value))
            });
            //roiRes 无杠杆现金流
            $.each(countData.roiRes,function(i,e){
                if(i==0){
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))-parseFloat(Math.abs(self.irrData[24].values[1].value))
                }else{
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))-parseFloat(Math.abs(self.irrData[26].values[i+skip-1].value))
                }
            });
            var qyy=self.quitYear;

            for(i=0;i<qyy;i++){

                if(parseFloat(self.irrData[26].values[i+skip].value)>0){
                   /* console.log(i+skip)
                    console.log(self.irrData[26].values[i+skip])*/
                    var y=i;
                    var value=parseFloat(Math.abs(self.irrData[26].values[y-1+skip].value))/(parseFloat(Math.abs(self.irrData[26].values[y-1+skip].value))+parseFloat(Math.abs(self.irrData[26].values[y+skip].value)));
                    self.irrData[26].values[1].value=y+value;
                    break;
                }else{
                    self.irrData[26].values[1].value="-"
                }
            }


            //退出收益率
            self.quitRRate=irrPlanData[32].values[1].value;
            self.quitFee=self.irrData[33].values[1].value;
            $.each(countData.quitRRate,function(i,e){
                if(i==(self.quitYear-1)){
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))/parseFloat(self.quitRRate)
                }else{

                }
            });
            //退出费用
            $.each(countData.quitFee,function(i,e){
                if(i==(self.quitYear-1)){
                    e.value=parseFloat(Math.abs(self.irrData[32].values[i+skip].value))*parseFloat(self.quitFee);
                }else{

                }
            });
            //退出收益
            $.each(countData.quitIncome,function(i,e){
                if(i==(self.quitYear-1)){
                    e.value=parseFloat(Math.abs(self.irrData[32].values[i+skip].value))-parseFloat(Math.abs(self.irrData[33].values[i+skip].value))
                }else{
                    e.value=0;
                }
            });

            //无杠杆现金流unleveredCashFlow
            $.each(countData.unleveredCashFlow,function(i,e){
                if(i==(self.quitYear-1)){
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))+parseFloat(Math.abs(self.irrData[34].values[i+skip].value))
                }else{
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value));
                }
            });

            //净回报率
            $.each(countData.unleveredNRR,function(i,e){
                e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))/parseFloat(Math.abs(self.irrData[35].values[1].value));
            });
            var av=0;
            var qy=self.quitYear;
            for(i=0;i<qy;i++){
                av+=parseFloat(self.irrData[36].values[i+skip].value);
            }
            self.irrData[36].values[1].value=av/qy;
            //无杠杆内部收益率
            //self.irrData[35].values[1] finance.IRR(initial investment, [cash flows]);
            /*finance.IRR(-500000, 200000, 300000, 200000);
            => 18.82*/
            var finance = new Finance();

            var irrArgs=[];
            irrArgs.push(Math.abs(self.irrData[35].values[1].value)*(-1));
            for(i=0;i<qy;i++){
               /* if(i==(qy-1)){
                    irrArgs.push(Math.abs(self.irrData[24].values[i].value));
                }else{
                    irrArgs.push(Math.abs(self.irrData[24].values[i].value));
                }*/
                irrArgs.push(Math.abs(self.irrData[35].values[i+skip].value));
            }
            var unleaveredIRR=finance.IRRAMP(irrArgs);
            self.irrData[37].values[1].value=unleaveredIRR/100;

            //无杠杆利润unleveredProfits

            var unleveredCF=self.irrData[35].values.slice(2);
            var unleveredProfitsSum=0;
            for(i=0;i<qy;i++){
                unleveredProfitsSum+=parseFloat(unleveredCF[i].value);
            }
            self.irrData[38].values[1].value=unleveredProfitsSum-parseFloat(Math.abs(self.irrData[35].values[1].value));

            //人民币利润倍数unleveredRMBPP
            self.irrData[39].values[1].value= parseFloat(self.irrData[38].values[1].value)/parseFloat(Math.abs(self.irrData[35].values[1].value));

            /*========== 杠杆现金流 ===========*/
            //当年估值 leveredValue
            for(i=0;i<qy;i++){
                if(i==(qy-1)){
                    self.irrData[41].values[i+skip].value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))/parseFloat(Math.abs(self.irrData[32].values[1].value));
                }else {
                    self.irrData[41].values[i+skip].value= parseFloat(Math.abs(self.irrData[24].values[i + skip + 1].value)) / parseFloat(Math.abs(self.irrData[32].values[1].value));
                }
            }


            //贷款额loanPP
            self.irrData[43].values[2].value=parseFloat(Math.abs(self.irrData[35].values[1].value))*parseFloat(Math.abs(self.irrData[43].values[1].value));

            //allen version
            //self.irrData[43].values[2].value=parseFloat(Math.abs(self.irrData[41].values[2].value))*parseFloat(Math.abs(self.irrData[43].values[1].value));
            //贷款金额loanMoney
            self.irrData[45].values[1].value=self.irrData[43].values[2].value*(-1);
            $.each(countData.loanMoney,function(i,e){
                e.value= self.irrData[45].values[1].value;
            });

            //按揭现金流mortgageCashFlow


            //退出时还债
            $.each(countData.quitPayment,function(i,e){
                if(i==(qy-1)){
                    e.value= self.irrData[45].values[1].value;
                }else{
                    e.value=0;
                }

            });

            //尾期余额
            self.irrData[48].values[1].value=self.irrData[45].values[1].value;
            $.each(countData.endLoan,function(i,e){
                if(i==(qy-1)){
                    e.value=0;
                }else{
                    e.value= self.irrData[45].values[1].value;
                }
            });

            //贷款利息
            var loanRate=self.irrData[49].values[1].value;
            var loan=self.irrData[45].values[1].value;

            $.each(countData.loanRate,function(i,e){
                e.value=loanRate*loan;
            });

            //无杠杆现金流

            self.irrData[50].values[1].value=parseFloat(Math.abs(self.irrData[24].values[1].value))-parseFloat(Math.abs(self.irrData[43].values[2].value));
            $.each(countData.leveredCashFlow,function(i,e){
                if(i==(qy-1)){
                    e.value= self.irrData[24].values[i+skip].value+self.irrData[34].values[i+skip].value-Math.abs(self.irrData[49].values[i+skip].value)-Math.abs(self.irrData[45].values[1].value);
                }else{
                    e.value=self.irrData[24].values[i+skip].value-Math.abs(self.irrData[49].values[i+skip].value);
                }
            });

            //净回报率
            var v=parseFloat(Math.abs(self.irrData[24].values[1].value))-parseFloat(Math.abs(self.irrData[43].values[2].value));

            $.each(countData.leveredNRR,function(i,e){
                e.value=(parseFloat((self.irrData[50].values[i+skip].value))+parseFloat(Math.abs(self.irrData[47].values[i+skip].value)||0)-parseFloat(Math.abs(self.irrData[34].values[i+skip].value))||0)/v;
            });

            var avr=0;
            for(i=0;i<qy;i++){
                avr+=parseFloat(self.irrData[51].values[i+skip].value)
            }

            self.irrData[51].values[1].value=avr/qy;

            //杠杆内部收益率
            //self.irrData[35].values[1] finance.IRR(initial investment, [cash flows]);
            /*finance.IRR(-500000, 200000, 300000, 200000);
             => 18.82*/

            var leveredirrArgs=[];
            leveredirrArgs.push(Math.abs(self.irrData[50].values[1].value)*(-1));
            for(i=0;i<qy;i++){
                leveredirrArgs.push(Math.abs(self.irrData[50].values[i+skip].value));
            }

            var leaveredIRR=finance.IRRAMP(leveredirrArgs);
            self.irrData[52].values[1].value=leaveredIRR/100;


            //杠杆利润
            var leveredCF=self.irrData[50].values.slice(2);
            var leveredProfitsSum=0;
            for(i=0;i<qy;i++){
                leveredProfitsSum+=parseFloat(leveredCF[i].value);
            }
            self.irrData[53].values[1].value=leveredProfitsSum-parseFloat(Math.abs(self.irrData[50].values[1].value));




            //人民币利润倍数
            self.irrData[54].values[1].value= parseFloat(self.irrData[53].values[1].value)/parseFloat(Math.abs(self.irrData[50].values[1].value));

            //更改表头
            /*if(curQuitYear!==self.quitYear){
                _updateTableHead(self.quitYear);
            }*/
        };


        /*irr_plan.swipers={
         irr_plan_head_swiper:irr_plan_head_swiper,
         irr_plan_main_swiper:irr_plan_main_swiper
         };*/
        //页面事件
        //这里暂时先禁掉 table的 tab键
        document.onkeydown = function(){
            console.log(event.keyCode);
            if(event.keyCode == 13||event.keyCode == 9) {
                return false;
            }
        };
        $(".table").find("input").attr("tabIndex","-1");

        //页面事件
        $("#irr-plan").on("click",function(e){
            // e.stopPropagation();
            if($(e.target).closest("div").hasClass("td-input-wrapper")||$(e.target).closest("div").hasClass("td-range-input")){
                return
            }else{
                $(".table td").removeClass("active");
            }
        });

        $(".table").on("click",".td-input-wrapper",function(e){
            $(".table td").removeClass("active");
            $(this).closest("td").addClass("active");
            $(this).find("input").focus();

        });

        $(".table").on("keydown",function(e){
            if(e.keyCode==9&& e.target.nodeName.toLowerCase()==="input"){
                console.log("999")
                var $curInput=$(e.target);
                var trIndex= $curInput.closest("tr").index();
                var tdIndex= $curInput.closest("td").index();
                var th_len=parseInt($curInput.closest("tr").find("th").length);
                console.log($(e.target).closest("td").next("td").find(".td-input-wrapper"))
                $(e.target).closest("td").next("td").find(".td-input-wrapper").trigger("click");

            }
        });
        $("#irr-plan-main-table tbody").on("click","td",function(e){
            //e.stopPropagation();
            var td_width=parseInt($(this).css("width"));
            var td_offset=parseInt($(this).position().left);
            var translate=irr_plan.swipers.irr_plan_main_swiper.translate;
            var cont_width=irr_plan.swipers.irr_plan_main_swiper.width;
            if(td_offset+td_width+translate>cont_width){
                irr_plan.swipers.irr_plan_main_swiper.setWrapperTranslate(translate-150);
                $(this).find(".td-input-wrapper").click();
                //return false;
            }else{
                /* $(this).find("span.span-editable").addClass("focus");
                 $(this).find("span.span-editable").focus();*/

            }
/*
            if(td_offset+td_width+translate>cont_width){
                return false;
            }else{
                /!*$(this).find("span.span-editable").addClass("focus");
                 $(this).find("span.span-editable").focus();*!/

            }*/
        });

        function _checkErrot($e){
            var $this=$e;
            var errorInfo="请输入正确的数据格式";
            if($this.hasClass("ng-invalid")){
                if(($this).hasClass("ng-invalid-number")){
                    errorInfo="请输入有效数字";
                }
                $this.parent(".td-input-wrapper").append("<em class='error-msg'>"+errorInfo+"</em>");
            }else{
                $this.parent().find("em.error-msg").remove();
            }
        };


        $(".table").on("change","input",function(e){
            _checkErrot($(e.target));
            $scope.$apply(
                function(){
                    self.count();
                }
            );
        });

        irr_plan.init();
        self.count();
        $scope.$on("$destroy", function() {
            irr_plan.destroy();
        });
    }]);


dataTool.controller("dataFeeController",['$rootScope','$scope','$timeout','manageFeeData',function($rootScope,$scope,$timeout,manageFeeData){
    var self=this;
    //这里自己写数据绑定
    console.log(manageFeeData);


    self.mall={
        mainShop:{
            feeStandard:{
                value:0,
            }
        },
        nonMainShop:{
            feeStandard:[
                {
                    areaRangeStart:0,
                    areaRangeEnd:0,
                    value:0
                },
            ]
        }
    };

    self.street={
        feeStandard:[
            {
                areaRangeStart:0,
                areaRangeEnd:0,
                value:0
            },
        ],
    };
    console.log(self.mall.nonMainShop.feeStandard.length);
    console.log("---------------****-------------")
    var curYear=(new Date()).getFullYear();
    self.fee={};
    self.fee.updateRate=[
        {
            name:"主力店",
            value: [
                { year: curYear,value:0},
            ]
        },
        {
            name:"非主力店",
            value:[
                { year: curYear,value:0},
            ]
        },
        {
            name:"商业街",
            value:[
                { year: curYear,value:0},
            ]
        }
    ];

    self.fee.addYear=function(){
        var lastYear=self.fee.updateRate[0].value[self.fee.updateRate[0].value.length-1].year;
        $.each(self.fee.updateRate,function(i,e){
            var pushData={year:lastYear+1,value:0};
            e.value.push(pushData);
        });
        console.log(manage_fee.swipers.manage_fee_main_swiper);
        $timeout(function(){
            manage_fee.swipers.manage_fee_main_swiper.update();
        },200);

    };

    self.fee.removeYear=function(){
        var dataSize=self.fee.updateRate[0].value.length;
        if(dataSize>1){
            $.each(self.fee.updateRate,function(i,e){
                e.value.pop();
            })
        }else{
            var curYear=(new Date()).getFullYear();
            $.each(self.fee.updateRate,function(i,e){
                var oriData={ year: curYear,value:0};
                e.value[0]=oriData;
            })
        }
        $timeout(function(){
            manage_fee.swipers.manage_fee_main_swiper.update();
        },200);
    };

    self.add=function(type){
        if(type=="street"){
            var data=self.street.feeStandard;
        }else if(type=="nonMainShop"){
            var data=self.mall[type].feeStandard;
        }else{
            return;
        }
        data.push( {
            areaRangeStart:0,
            areaRangeEnd:0,
            value:0
        });
    };
    self.remove=function(type){
        if(type=="street"){
            var data=self.street.feeStandard;
        }else if(type=="nonMainShop"){
            var data=self.mall[type].feeStandard;
        }else{
            return;
        }

        console.log(data);
        if(data.length>1){
           data.pop( {
                areaRangeStart:0,
                areaRangeEnd:0,
                value:0
            });
        }else{
            data[0]={
                areaRangeStart:0,
                areaRangeEnd:0,
                value:0
            }
        }

    };

    self.setSave=function(){

    };
    self.setReset=function(){

    };

    function _checkErrot($e){
        var $this=$e;
        var errorInfo="请输入正确的数据格式";
        if($this.hasClass("ng-invalid")){
            if(($this).hasClass("ng-invalid-number")){
                errorInfo="请输入有效数字";
            }
            $this.parent(".td-input-wrapper").append("<em class='error-msg'>"+errorInfo+"</em>");
        }else{
            $this.parent().find("em.error-msg").remove();
        }
    };


    $(".table").on("change","input",function(e){
        console.log("change------");
        _checkErrot($(e.target));

    });

    self.pasteEv=function($event,v){
        console.log("-------------------")
        console.log($event);
        $event.preventDefault();
        var pastedText = undefined;
        if (window.clipboardData && window.clipboardData.getData) { // IE
            pastedText = window.clipboardData.getData('Text');
        } else {
            pastedText = $event.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
        }
        console.log(pastedText);
        pastedText=pastedText.replace(/,/g, "")
        console.log(pastedText)
        var pastedNum=parseFloat(pastedText)
        $timeout(function(){
            $scope.$apply(function(){
                if(pastedNum!==NaN && typeof pastedNum ==="number"){
                    v.value=pastedNum;
                }else{
                    //v.value=pastedText+" e";
                }
            });
        });
        return false;
        //var data=$($event.target).val();
        //console.log("data---"+data);
    };

    $timeout(function(){
        manage_fee.init();

        amp_main.leftPanel_update();
    },200)


    $scope.$on("$destroy", function() {
        manage_fee.destroy();
    });

}]);


dataTool.controller("dataSimController",['$rootScope', '$scope',"simData","simChartData","$location","$timeout","$state","SharedState",
    function($rootScope, $scope,simData,simChartData,$location,$timeout,$state,SharedState) {
        var self=this;
        $rootScope.showHeader();
        $rootScope.showBottom();

        $rootScope.dFooterShow=true;
        $rootScope.pageId="datatool-sim";

        if(typeof simChartData==="undefined"){
            self.shops=[];
        }else{
            self.chartData=simChartData["chart"];
            self.shops=simData.slice(1);
            self.index=0;
        }
        self.floor=null;
        self.floors=["B2","B1","1F","2F","3F","4F","5F"];



        self.form_menu={
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
            payRange:["月付","季付"]
        };
        console.log(self.shops);
        self.shopInfo=self.shops[self.index];
        console.log(self.shopInfo);
        self.selectType=null;
        self.selectTypeName=null;
        self.shopInfoCopy=null;

        //self.shopEditorShow=false;
       /* self.shopInfoCopy=null;
        self.shopInfoCopy=angular.copy(self.shopInfo);*/


        self.setShopInfo=function(shopId){
            //data-shopid $(element).data("shopId")   shopid
            $scope.$apply(function(){
                self.index+=1;
                self.shopInfo=self.shops[self.index];
                self.shopInfoCopy=null;
                self.shopInfoCopy=angular.copy(self.shopInfo);
            });

        };
        self.clearShopInfo=function(){
          /*  $scope.$apply(function(){

            });*/
            self.shopInfo={};
            self.shopInfoCopy=null;
        };

        self.setSelect=function(type){
            if(typeof self.shopInfo.shopIndex=="undefined"){
                return;
            }
            console.log("---------------**");
            console.log(self.shopInfo);
            console.log(self.shopInfoCopy);
            switch(type){
                case 'position':
                    self.selectType="position";
                    self.selectTypeName="位置";
                    break;
                case 'form':
                    self.selectType='form';
                    self.selectTypeName="业态";
                    break;
                case 'property':
                    self.selectType='property';
                    self.selectTypeName="租金方式";
                    break;
                case 'payRange':
                    self.selectType="payRange";
                    self.selectTypeName="付款时间";
                    break;
                default:
                    return
            }
            SharedState.turnOn("uiSidebarRight");
        };

        self.setModel=function(type,menu){
            self.shopInfoCopy[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.reset=function(type){
            self.shopInfoCopy[type]=angular.copy(self.shopInfo[type]);
        };

        self.saveSelect=function(disabled){
            if(disabled){
                alert("请输入有效数据");
                return;
            }
            self.shopInfo =angular.copy(self.shopInfoCopy);
            //self.shopInfoCopy=null;
            SharedState.turnOff("uiSidebarRight");
        };

        self.dismiss=function(){
            var dismiss=window.confirm("确定解约？")

        };
         self.checkReturn=function(){
             if($scope.dataSimForm.$invalid){
                 alert("请输入有效的数据");
                 return false;
             }else{
                 $rootScope.loading_show();
                 $timeout(function(){
                     $rootScope.loading_hide();
                     $state.go("datatool.rpgresult")
                 },1000);
             }
         };

        /* self.hideBottomPanel=function($event){
             $event.preventDefault();
             $event.stopPropagation();
             if($($event.target).hasClass("bottom-panel-wrapper")){
                 $rootScope.bottomPanelShow=false;
             }
         };*/

         self.showBottomPanel=function(){
             $rootScope.bottomPanelShow=true;
         };

        //页面事件
        $("#datatool-sim").on("click",function(e){
            if(!$(e.target).hasClass("number-format")){
                $(".table td").removeClass("active");
            }
        });

        $(".table").on("click","td",function(e){
             //e.stopPropagation();
             $(".table td").removeClass("active");
             $(this).addClass("active");
             $(this).find("input").focus();
         });

        function _checkErrot($e){
            var $this=$e;
            var errorInfo="请输入正确的数据格式";
            if($this.hasClass("ng-invalid")){
                if(($this).hasClass("ng-invalid-number")){
                    errorInfo="请输入有效数字";
                }
                $this.parent(".td-input-wrapper").append("<em class='error-msg'>"+errorInfo+"</em>");
            }else{
                $this.parent().find("em.error-msg").remove();
            }
        };

        $(".table").on("change","input",function(e){
            _checkErrot($(e.target));
        });

        var iscroll_init=function(){
            var h=parseInt($(window).height());

            var datasim_floor_scroll = new IScroll('#datatool-sim-floor-table', {
                mouseWheel: true,
                scrollbars: true
            });
            var datasim_main_scroll= new IScroll('#datatool-sim-main-table', {
                mouseWheel: true,
                scrollbars: true
            });


            var defer=null;
            var scrollUpdate=function(){
                var h=parseInt($(window).height());

                $(".col-xs-6").css({
                    "overflow-y":"hidden",
                    "height":(h-88-54)+"px"
                });

                datasim_floor_scroll.refresh();
                datasim_main_scroll.refresh();
            };

            $(window).resize(function(){
                if(!defer){
                    defer=setTimeout(function(){
                        scrollUpdate();
                        defer=null;
                    },200);
                }else{
                    clearTimeout(defer);
                    defer=setTimeout(function(){
                        scrollUpdate();
                        defer=null;
                    },200);
                }

            });
            setTimeout(scrollUpdate,300);

        };

        function _svgCallback(shopData){
            if(typeof shopData !=="undefined" && shopData["shop_id"]!==""){
                $scope.$apply(function() {
                    $scope.dataSimForm.$setPristine();
                    $scope.dataSimForm.$setUntouched();
                });
                self.setShopInfo(shopData["shop_id"]);

            }else{
                $scope.$apply(function() {
                    $scope.dataSimForm.$setPristine();
                    $scope.dataSimForm.$setUntouched();
                });
                self.clearShopInfo();
            }

        };

        var add_svg=function(floor){

            self.clearShopInfo();
            switch(floor){
                case "B2":
                    var file="svg_1.svg";
                    self.floor="B2";
                    break;
                case "B1":
                    var file="svg_2.svg";
                    self.floor="B1";
                    break;
                case "1F":
                    var file="svg_3.svg";
                    self.floor="1F";
                    break;
                case "2F":
                    var file="svg_4.svg";
                    self.floor="2F";
                    break;
                case "3F":
                    var file="svg_1.svg";
                    self.floor="3F";
                    break;
                case "4F":
                    var file="svg_2.svg";
                    self.floor="4F";
                    break;
                case "5F":
                    var file="svg_3.svg";
                    self.floor="5F";
                    break;
                default:
                    var file="svg_1.svg";
                    self.floor="B2";
            }

            $.get(file,function(data,status){
                var importedSVGRootElement = document.importNode(data.documentElement,true);
                $("#ys-svg").append(importedSVGRootElement);
                svg_editor.refresh();
                svg_editor.init(_svgCallback);

            });
        };
        //移动版不用iscroll
        //iscroll_init();
        add_svg(self.floor);

        self.setFloor=function(floor){
            $("#ys-svg").find("svg").remove();

            console.log(floor);
            add_svg(floor);
            self.floor=floor;
        };

/*
        var s=Snap("#ys-svg");
        var curElement;
        var $container=$("#ys-svg");

        s.click(function(e){
            curElement=s.select("#"+e.target.id);
            /!*if($(curElement).hasAttr("data-shopId")){

            }*!/
            if(s.select(".cur-select")){
                s.select(".cur-select").removeClass("cur-select");
            }
            curElement.addClass("cur-select");
            if(curElement.data("shopid")){
                $scope.$apply(function() {
                    $scope.dataSimForm.$setPristine();
                    $scope.dataSimForm.$setUntouched();
                });
                self.setShopInfo()
            }else{
                $scope.$apply(function() {
                    $scope.dataSimForm.$setPristine();
                    $scope.dataSimForm.$setUntouched();
                });
                self.setShopInfo();
            }

        });*/

        $scope.$on("$destroy", function() {
           // amp_datePicker.destroy();
        });
    }]);


