/*globals $ bootstrape snap*/
/*svg editor module */
// Dependencies:
// 1. jQuery
// 2. snap
// 3. bootstrape

/**
 * Created by cheng on 2016/3/9.
 */
//editor-interface 定义全局的命名空间
var svg_editor = (function (sv){

    sv.default={};
    sv.snap=null;
    //根据不同的模式执行不同的操作，目前主要开发的操作模式为
    //合铺，拆铺，查看,绑定信息
    sv.curMode="view";
    //页面的最后一次操作，如果不是save,提醒用户需要保存当前页面
    sv.lastOpt=null;
    sv.mouseTarget=null;
    //svg container ID
    var container=sv.container=$("#ys-svg").get(0);//checked
    var root=sv.root=$("#ys-svg").children("svg").get(0);//checked
    $(root).attr("id","svgRoot");
    var rootGroup=$(root).children("g");

    var curSelect,lastSelect,curRootGroup;//如果在ai作图时，分过图层或者自行做过群组，取mouseTarget时，以curRootGroup作为搜索终点
    var curSelectSet=[];

    /**
     *   shops:[
     *              ｛shopID：shopID, shopPOS：商铺位置, shopArea: shop面积, merchant:商户名称,
     *                shopStatus://商铺状态－－对镜响应lableClass *****,
     *                shopType:商铺类型 -- 对应labelClass（多经？）
     *                rentAvgPrice:平均租金，rentPriceCount:租金总额,
     *               shopPhoto：点位效果图，
     *               shopDoc：｛docName:文档名称,docHref: #href}
     *
     *              ｝,
     * @type {string[]}
     */
    sv.edit_form_template=[
        '<div class="ys-form-wrapper">',
        '<form class="form-horizontal" id="ys-edit-form">',
            '<div class="form-group">',
                '<label for="shopID" class="col-sm-4 control-label">店铺ID</label>',
                '<div class="col-sm-8">',
                    '<input type="text" class="form-control" id="shopID" placeholder="请输入">',
                '</div>',
            '</div>',//end div

            '<div class="form-group">',
                '<label for="shopArea" class="col-sm-4 control-label">店铺位置</label>',
                '<div class="col-sm-8">',
                '<input type="text" class="form-control" id="shopArea" placeholder="请输入">',
                '</div>',
            '</div>',//end div


            '<div class="form-group">',
                '<label for="shopName" class="col-sm-4 control-label">店铺名称</label>',
                '<div class="col-sm-8">',
                '<input type="text" class="form-control" id="shopName" placeholder="请输入">',
                '</div>',
            '</div>',//end div


            /*
            '<div class="form-group">',
                '<label for="shopType" class="col-sm-4 control-label">店铺类型</label>',
                '<div class="col-sm-8">',
                    '<select class="form-control">',
                        '<option disabled="disabled">请选择</option>',
                    '</select>',
                '</div>',
            '</div>',//end div
            */
            '<div class="form-group">',
                '<div class="col-sm-offset-2 col-sm-10" style="text-align: right;">',
                    '<button type="submit" class="btn btn-default" id="ys-edit-submit">保存</button>',
                '</div>',
            '</div>',//end submit
        '</form>',
     '</div>'//end wrapper
    ].join("");

    sv.view_template=[
        '<table class="table" id="svg-data-view">',
            '<tbody>',

            '</tbody>',
        '</table>'
    ].join("");

    //初始化时对根元素下的直接元素进行一遍解析，add rootGroup to <g>,这部分内容是ai作图时的群组或者图层元素
    //getMouseTarget解析时，可以判断遇到rootGroup即停止向上遍历
    //重要的事情说三遍，svg的遍历之后要再检查，目前只根据业务逻辑采用了最简单的遍历条件，可能会有bug.
    $(rootGroup).each(function(i,e){
        e.classList.add("rootGroup");
    });

    var currentGroup=sv.currentGroup=null;
    // common namepaces constants
    var NS=sv.NS= {
            HTML: 'http://www.w3.org/1999/xhtml',
            MATH: 'http://www.w3.org/1998/Math/MathML',
            SE: 'http://svg-edit.googlecode.com',
            SVG: 'http://www.w3.org/2000/svg',
            XLINK: 'http://www.w3.org/1999/xlink',
            XML: 'http://www.w3.org/XML/1998/namespace',
            XMLNS: 'http://www.w3.org/2000/xmlns/' // see http://www.w3.org/TR/REC-xml-names/#xmlReserved
        }

    // return the svgedit.NS with key values switched and lowercase
    sv.getReverseNS = function() {'use strict';
        var reverseNS = {};
        $.each(this.NS, function(name, URI) {
            reverseNS[URI] = name.toLowerCase();
        });
        return reverseNS;
    };

    function handle_before_modChange(){
      /*  $(".cur-select-mask").popover("destroy").remove();
        $(".cur-select").each(function(i,e){
            this.classList.remove("cur-select");
        });*/
    }
    sv.changeMode=function(opt){
      handle_before_modChange();
      switch(opt){
          case "svg-viewer":
              sv.curMode="view";
              //$(".ys-svg-editor").attr("id","view-mod");
              break;
          case "shop-edit":
              sv.curMode="edit";
              //$(".ys-svg-editor").attr("id","edit-mod");
              break;
          case "shop-graphic":
              sv.curMode="draw";
              //$(".ys-svg-editor").attr("id","draw-mod");
              break;
          case "shop-compressed":
              sv.curMode="compressed";
              //$(".ys-svg-editor").attr("id","compressed-mod");
              break;
          case "shop-split":
              sv.curMode="split";
              //$(".ys-svg-editor").attr("id","split-mod");
              break;
          case "svg-import":
              sv.curMode="import";
              //$(".ys-svg-editor").attr("id","import-mod");
              break;
          case "svg-export":
              sv.curMode="export";
              //$(".ys-svg-editor").attr("id","export-mod");
              break;
          case "check-svg-code":
              sv.curMode="code";
              sv.handler.codeHandler();
              //$(".ys-svg-editor").attr("id","code-mod");
              break;
          default :
              sv.curMode="view";
              //$(".ys-svg-editor").attr("id","view-mod");
      }

        return sv.curMode;
    };

    /**
     * 取得目标元素的逻辑处理要考虑相当多情况，目前没有经过完全测试：
     * 按照个人理解的svg结构：
     * 目标元素需要向上遍历至最外层的<g>
     * 如果目标元素的父级元素为根元素，则判断目标元素为 mouseTarget
     */
    var getMouseTarget = sv.getMouseTarget = function(evt) {
        var sv=svg_editor;
        var root=sv.root;
        var container=sv.container;
        //每次重置curRootGroup
        curRootGroup=null;
        if (evt == null) {
            return null;
        }
        var mouse_target = evt.target;

        // <use>元素--应该目前程序处理不到, Opera and WebKit return the SVGElementInstance
        if (mouse_target.correspondingUseElement) {mouse_target = mouse_target.correspondingUseElement;}
        // foreign Content, 向上遍历直到找到foreign object
        // ？ WebKit browsers set the mouse target to the svgcanvas div
        if ([NS.MATH, NS.HTML].indexOf(mouse_target.namespaceURI) >= 0 &&
            mouse_target.id != 'svgcanvas')
        {
            while (mouse_target.nodeName != 'foreignObject') {
                mouse_target = mouse_target.parentNode;
                if (!mouse_target) {return root;}
            }
        }

        // 以下原则 If it's root-like, select the root
        if ([root, container].indexOf(mouse_target) >= 0) {
            return root;
        }
        var $target = $(mouse_target);
        // 如果在ai作图时，分过图层或者自行做过群组，取mouseTarget时，以curRootGroup作为搜索终点
        if ($target.closest('.rootGroup').length) {
            curRootGroup=$target.closest(".rootGroup").get(0);
        }

        if((mouse_target.parentNode.nodeName).toLocaleLowerCase()!=="div"){
            while (mouse_target.parentNode !== (curRootGroup || root)) {
                mouse_target = mouse_target.parentNode;
            }
        }else{
            mouse_target=undefined;
        }


        return mouse_target;
    };//end getMouseTarget

    /**
     * 加入getSelect 主要是为了处理合铺的状态，合铺时要给所有的铺位加入cur-select,以显示。
     * @type {getSelect}
     */


    var getSelect=sv.getSelect=function(mouseTarget){
        var mt=mouseTarget;
        var $cur_select;
        if(mt.classList.contains("compressed")){
            var cur_compressed_cls=$(mouseTarget).attr("data-compressed");
            $cur_select=$(".compressed-"+cur_compressed_cls);
        }else{
            if($(mouseTarget).attr("data-shopid")){
                $cur_select=$(mouseTarget);
            }
        }
            return $cur_select;
    };


    /**
     * 取得当前数据时，考虑到合铺情况，目前策略是在绑定时，把每个合铺的图形均绑定data信息，
     * 所以取得data时可以根据任何点击来取得，不用遍历数据。
     * @param mouseTarget
     */
    var getTargetData=function(mouseTarget){
        var $mouseTarget=$(mouseTarget);
        var shop_data={};
        if($mouseTarget.attr("data-compressed")){
            var cur_compressed_cls=$(mouseTarget).attr("data-compressed");
            $cur_select=$(".compressed-"+cur_compressed_cls);
            var shopeId_str='';

            $cur_select.each(function (i, e) {
                if(i==0){
                    shopeId_str+=($(this).attr("data-shopid"));
                }else{
                    shopeId_str+=("-"+$(this).attr("data-shopid"));
                }

            });

            shop_data['shop_id']=shopeId_str;
        }else{
            if(typeof $mouseTarget.attr("data-shopid")==="undefined"){
                shop_data['shop_id']="";
            }else{
                shop_data['shop_id']=$mouseTarget.attr("data-shopid");
            }

        }

        shop_data['shop_pos']=$mouseTarget.attr("data-shoppos");
        shop_data['shop_name']=$mouseTarget.attr("data-shopname");
        //opt-item infos
        $(".opt-item").empty().append("<em>"+shop_data['shop_id']+"</em>");
        return shop_data;
    }
    /**
     * 设置数据时 $curSelect 为getCurSelect方法返回值，时一个jquery选择器对象，考虑了compressed和group的情况
     * @param $curSelect
     */
    var setShopData=function($curSelect){
        var shop_id=$("#shopID").val();
        var shop_POS=$("#shopArea").val();
        var shop_name=$("#shopName").val();
        $curSelect.each(function(i,e){
            $(this).attr({
                "data-shopid":shop_id,
                "data-shoppos":shop_POS,
                "data-shopname":shop_name
            });
        });
    }
    /**
     * popView根据鼠标点击位置弹出店铺的信息页面
     * @type {popView}
     */
    var popView=sv.popView=function(evt,mouseTarget) {
        var mouseTarget = mouseTarget;
        var targetId = $(mouseTarget).attr("id");
        var shopData=getTargetData(mouseTarget);

        //正式版view 需要判断这里的shopid 情况
        if(typeof shopData["shop_id"]==="undefined" || shopData["shop_id"]===""){
            sv.callback();
            return;
        }else{
            if (targetId == "svgRoot" || targetId == "svgRoot") {
                //$(".cur-select-mask").popover("destroy").remove();
                sv.callback();
                return;
            } else {
                //这里考虑compressed的情况。

                var $cur_select = sv.getSelect(mouseTarget);

                $cur_select.each(function (i, e) {
                    this.classList.add("cur-select");
                });
                //mouseTarget.classList.add("cur-select");
/*
                var offsetX=evt.pageX-$("#ys-svg").offset().left;
                var offsetY=evt.pageY-$("#ys-svg").offset().top;
                $(".cur-select-mask").popover("destroy").remove();*/

                var data=shopData;
                var data_str="";
                var shop_NS={
                    "shop_id":"商铺ID",
                    "shop_pos":"商铺位置",
                    "shop_name":"商铺名称"
                };
                if(sv.callback){
                    sv.callback(data);
                }
                /*  $.each(data,function(k,v){
                 data_str+= ['<tr>',
                 '<th>',
                 shop_NS[k],
                 '</th>',
                 '<td>',
                 v!=undefined?v:"暂无信息",
                 '</td>',
                 '</tr>'].join("");
                 });

                 console.log("offset-----------------------------"+offsetX+"----------y"+offsetY);
                 $("<div class='cur-select-mask'><em class='glyphicon glyphicon-map-marker'></em></div>").css({
                 top: parseInt(offsetY - 22) + "px",
                 left: parseInt(offsetX - 11) + "px"
                 }).appendTo(".ys-mainpanel-inner").popover({
                 container: "body",
                 title: "商铺信息",
                 content: svg_editor.view_template,
                 placement: "auto",
                 html: true,
                 trigger: "manual",
                 });
                 $(".cur-select-mask").popover("show");
                 var $view_temp=$("#svg-data-view tbody");
                 $view_temp.append(data_str);*/
            }
        }

    }
    /**
     * popEditor根据鼠标点击位置弹出店铺的编辑页面
     * @type {popEditor}
     */
    var popEditor=sv.popEditor=function(evt,mouseTarget) {
        var mouseTarget= mouseTarget;
        var targetId=$(mouseTarget).attr("id");
        if (targetId== "svgRoot" || targetId=="svgRoot") {
            if($("#ys-edit-submit")){
                $("#ys-edit-submit").off("click");
            }
            $(".cur-select-mask").popover("destroy").remove();
        } else {
            //这里考虑compressed的情况。
            var $cur_select=sv.getSelect(mouseTarget);
            $cur_select.each(function(i,e){
               this.classList.add("cur-select");
            });

            //mouseTarget.classList.add("cur-select");
            //var offsetX = evt.offsetX;
            //var offsetY = evt.offsetY;
            var offsetX=evt.clientX-$("#ys-svg").offset().left;
            var offsetY=evt.clientY-$("#ys-svg").offset().top;
            /**
             * old 用snap.svg增加样式
             */
            /*
            s.select(".cur-select").attr({
                fill: "#fc0",
                stroke: "#000",
                strokeWidth: 18, // CamelCase...
                "fill-opacity": 0.5, // or dash-separated names

            });
            */
            $("#ys-edit-submit").off("click");
            $(".cur-select-mask").popover("destroy").remove();
            // $(".cur-select-mask").remove();


            $("<div class='cur-select-mask'><em class='glyphicon glyphicon-map-marker'></em></div>").css({
                top: parseInt(offsetY - 22) + "px",
                left:parseInt(offsetX-11) + "px"
            }).appendTo(".ys-mainpanel-inner").popover({
                container: "body",
                title: "编辑信息",
                content: svg_editor.edit_form_template,
                placement: "auto",
                html: true,
                trigger: "manual",
            });
            var data=getTargetData(mouseTarget);

            $(".cur-select-mask").popover("show");
            $("#shopID").val(data['shop_id']);
            $("#shopArea").val(data['shop_pos']);
            $("#shopName").val(data["shop_name"]);
            $("#ys-edit-submit").on("click",function(e){
                e.preventDefault();
                setShopData($cur_select);
                $("#ys-edit-submit").off("click");
                $(".cur-select-mask").popover("destroy").remove();
            });
        }
    }//end popEditor

    var splitEditor=sv.splitEditor=function(evt,mouseTarget){
        var targetId = $(mouseTarget).attr("id");

        $(".cur-select").each(function (i, e) {
            this.classList.remove("cur-select");
        });

        if (targetId == "svgRoot" || targetId == "svgRoot") {
            return;
        } else {
            var $cur_select = sv.getSelect(mouseTarget);
            //var $cur_select = sv.getSelect(mouseTarget);
            $cur_select.each(function (i, e) {
                this.classList.add("cur-select");
            });
        }
    }//end splitEditor

    var compressedEditor=sv.compressedEditor=function(evt,mouseTarget){

        var mouseTarget= mouseTarget;
        var targetId=$(mouseTarget).attr("id");
        //根据鼠标按下时有没有按住Shift判断全选还是重选
        //重构时取消操作curSelectSet中元素，只根据元素状态来操作会更简单；
        if (targetId== "svgRoot" || targetId=="svgRoot") {
            if(evt.shiftKey==false) {
                $(".cur-select").each(function (i, e) {
                    this.classList.remove("cur-select");
                });
                //curSelectSet = [];
            }else{ //(e.shiftKey==true)
               // curSelectSet.push(mouseTarget);
            }
        } else {
            if(evt.shiftKey==false) {
                $(".cur-select").each(function (i, e) {
                    this.classList.remove("cur-select");
                });
                //curSelectSet = [];
                //这里考虑compressed的情况。
                var $cur_select=sv.getSelect(mouseTarget);
                $cur_select.each(function(i,e){
                    this.classList.add("cur-select");
                });
            }else{ //(e.shiftKey==true)
                if(mouseTarget.classList.contains("cur-select") && !$(mouseTarget).attr("data-compressed")){
                    mouseTarget.classList.remove("cur-select");
                }else if(mouseTarget.classList.contains("cur-select")&& $(mouseTarget).attr("data-compressed")){
                    var targetClass=".compressed-"+$(mouseTarget).attr("data-compressed");
                    $(targetClass).each(function (i, e) {
                        this.classList.remove("cur-select");
                    });
                }
                else{
                    //这里考虑compressed的情况。
                    var $cur_select=sv.getSelect(mouseTarget);

                    $cur_select.each(function(i,e){
                        this.classList.add("cur-select");
                    });
                    //mouseTarget.classList.add("cur-select");
                }
                // curSelectSet.push(mouseTarget);
                $(".opt-item").empty();
                $(".cur-select").each(function(i,e){
                   var attr=$(this).attr("data-shopid");
                    $(".opt-item").append("<em>"+attr+"</em>");
                });
            }

        }//end if else

    };


    sv.addStyle=function(style){
        var $container= $("#ys-svg");
        var $style=$container.find("style");
        if($style.length==0){
            $container.find("defs").last().prepend(style);
        }else{
            $style.last().after(style);
        }
    };


    /**
     * 以下逻辑从语意上处理更合理，
     * 但实际操作，对图层的遮挡比较难处理，目前采用了比较简单的逻辑，对页面实际元素不做更改做作，只通过增加相应的class实现
     * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
     * 合铺操作时，如果所选元素的rootGroup一致或者均为直接元素，
     * 则直接创建<g>包围，
     * 如果rootGroup不同，需要另外创建一个rootGroup,再把新元素添加进去
     */

    sv.releaseSelector=function(){

    }//end releaseSelector
        //常用色彩定义
    sv.colorSet={
    };

    /**
     * 以下几个方法为本地保存svg的实用方法
     * @returns {XML|string|*|void}
     */

    function getFileNameFromTitle () {
       // var title = svgCanvas.getDocumentTitle();
        var title="svgDownload";//改成楼层和工程；
        return $.trim(title).replace(/[\/\\:*?"<>|]/g, '_');
    }
    function xhtmlEscape(str) {
        return str.replace(/&(?!amp;)/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    }
    function clientDownloadSupport (filename, suffix, uri) {
        var a,
            support = $('<a>')[0].download === '';
        if (support) {
            a = $('<a>hidden</a>').attr({download: (filename || 'image') + suffix, href: uri}).css('display', 'none').appendTo('body');
            a[0].click();
            return true;
        }
    }
    // Converts a string to base64
    encodeUTF8=sv.encodeUTF8=function(input){
        return unescape(encodeURIComponent(input));
    }
    encode64=sv.encode64 = function(input) {
        // base64 strings are 4/3 larger than the original string
        input = encodeUTF8(input); // convert non-ASCII characters
        // input = svgedit.utilities.convertToXMLReferences(input);
        if (window.btoa) {
            return window.btoa(input); // Use native if available
        }
        var output = [];
        output.length = Math.floor( (input.length + 2) / 3 ) * 4;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0, p = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output[p++] = KEYSTR.charAt(enc1);
            output[p++] = KEYSTR.charAt(enc2);
            output[p++] = KEYSTR.charAt(enc3);
            output[p++] = KEYSTR.charAt(enc4);
        } while (i < input.length);

        return output.join('');
    };

    sv.saveSVG=function(data) {
        var svg = '<?xml version="1.0" encoding="UTF-8"?>\n' + data, // Firefox doesn't seem to know it is UTF-8 (no matter whether we use or skip the clientDownload code) despite the Content-Disposition header containing UTF-8, but adding the encoding works
            filename = getFileNameFromTitle();

        if (clientDownloadSupport(filename, '.svg', 'data:image/svg+xml;charset=UTF-8;base64,' + sv.encode64(svg))) {
            return;
        }else{
            alert("浏览器不支持本地下载");
        }
    }//end savSVG

    //商铺状态定义
    sv.shopStatusSet={

    };

    //svgMap对应图示
    //
    sv.labels={

    };
    sv.symbols=[

    ];
    //界面初始化
    sv.interface={};
    //事件，功能处理
    sv.handler={
    };
    return sv;
})(svg_editor || {});


/**
 * 根据不同的操作模式响应不同的页面事件
 */
//svg操作 open,import,save, export,
var handler=svg_editor.handler= (function(){
    var hd={};
    if(!svg_editor){
        //handler依赖svg_eidtor;
        // alert("初始化失败，请检查网络链接");
        return false;
    }
    var sv=svg_editor;

    hd.saveHandler=function(){

    };

    hd.codeHandler=function(){
        if(sv.curMode=="code"){
            var svg=Snap("#svgRoot");
            var svg_string=svg.toString();
            $("#svg-code").val(svg_string);
            $("#ys-svg-code").modal("show");
        }
    };
    hd.exportHandler=function(e){
        if(sv.curMode=="export"){
            var svg=Snap("#svgRoot");
            var svg_string=svg.toString();
           sv.saveSVG(svg_string);
        }
    };
    hd.openHandler=function(){

    };
    hd.importHandler=function(){

    };
    hd.viewHandler=function(e){
        if(sv.curMode=="view"){
            $(".cur-select").each(function(i,e){
                this.classList.remove("cur-select");
            });
            var mouseTarget= svg_editor.getMouseTarget(e);

            if($(mouseTarget).attr("data-compressed")){
                //svg_editor.splitEditor(e,mouseTarget);
                $("#split-button").show();
            }else{
                $("#split-button").hide();
            }
            svg_editor.popView(e,mouseTarget);
        }
    };
    hd.editHandler=function(e){
        if(sv.curMode=="edit"){
            $(".cur-select").each(function(i,e){
                this.classList.remove("cur-select");
            });
            var mouseTarget= svg_editor.getMouseTarget(e);
            //svg_editor.popEditor(e,mouseTarget);
        }
    };

    hd.compressedHandler=function(e){
        if(sv.curMode=="compressed"){
            sv.callback();
            var mouseTarget= svg_editor.getMouseTarget(e);
           svg_editor.compressedEditor(e,mouseTarget);
        }
    };
    hd.splitHandler=function(e){
        if(sv.curMode=="split"||sv.curMode=="view"){
            var mouseTarget= svg_editor.getMouseTarget(e);
            svg_editor.splitEditor(e,mouseTarget);
        }
    };
    return hd;
}());


/**
 *按项目 楼层 查找之前的平面图，编辑，或者替换
 * A.打开原有项目－－楼层
 *
 * B.新建项目－－楼层
 */

/**
 * Create New SVGMap
 * Mall={mallName:Mall名称,mallID:Mall标识， avgRentPrice:平均租金 , floors:楼层总数， createDate:创建日期，creator:创建人,
 *      updateHistory:[{updateDate:升级日期，responsible:责任人,updateCommits:升级说明}]
 * }
 *
 * 设计目的，页面加载后先读取相关的mall-floor数据，自行进行渲染，填充
 * 实现 svg渲染，数据， label状态标示 管理分离
 *
 * labelIndex={labelIndexName:label标示， createDate:创建日期, creator:创建人,
 *      labels:[{labelId:label标示，labelClass:对应标志的ClassName,//设计简单考虑，这里只使用一个标示？
 *               labelColor:标识颜色, labelStroke:标识描线,
 *               labelHoverColor:Hover颜色, labelHoverStroke:Hover描线，
 *               //other status
 *      },],
 *       updateHistory:[{updateDate:升级日期，responsible:责任人,updateCommits:升级说明},],
 *      }
 *
 * mapFloor={
 *          floorIndex:楼层， mall:商场名称, mapFloorIndex: 当前楼层, mapFloorSVG:svg地址，
 *          createDate:创建日期，creator:创建人,
 *          curfloorInfos：｛shopsCount:铺位总数, shopsRented:已租铺位， shopRendRate：开业率｝//curfloorInfos:地图无法体现，为后台维护数据
 *          avgRentPrice:平均租金，
 *          shops:[
 *              ｛shopID：shopID, shopPOS：商铺位置, shopArea: shop面积, merchant:商户名称,
 *                shopStatus://商铺状态－－对镜响应lableClass *****,
 *                shopType:商铺类型 -- 对应labelClass（多经？）
 *                rentAvgPrice:平均租金，rentPriceCount:租金总额,
  *               shopPhoto：点位效果图，
  *               shopDoc：｛docName:文档名称,docHref: #href}
  *
 *              ｝,
 *          ],//shop列表
 *
 *          updateHistory:[{updateDate:升级日期，responsible:责任人,updateCommits:升级说明}]，
 *    }
 */
svg_editor.init=function(_svgCallback){
    svg_editor.callback=_svgCallback;

    $(document).on("click","#ys-svg",function(e){

        if(e.shiftKey){
            svg_editor.curMode="compressed"
        }else{
            svg_editor.curMode="view"
        }
        if(svg_editor.curMode){
            var curMod=svg_editor.curMode;
            switch(curMod){
                case "view":
                    svg_editor.handler.viewHandler(e);
                    //这里界面问题，把viewHandler compressed Handler放在一起

                    break;
                case "edit":
                    svg_editor.handler.editHandler(e);
                    break;
                case "compressed":
                    svg_editor.handler.compressedHandler(e);
                    break;
                case "split":
                    svg_editor.handler.splitHandler(e);
                    break;
                case "import":
                    break;
                case "export":
                    break;
                /*
                * 这里不需要从svg取得事件
                 */
                //case "code":
                //    svg_editor.handler.codeHandler(e);
                //    break;
                default:
                    //"view" 激活view mod

            }
        }else{
            svg_editor.curMode="view";
            svg_editor.handler.viewHandler(e);
            //这里界面问题，把viewHandler compressed Handler放在一起
            if(e.shiftKey){
                svg_editor.handler.compressedHandler(e);
            }

            //$("#svg-viewer").trigger("click");
        }
    });
    //页面事件
    window.lastOpt=null;

    //拆铺操作
    $("#split-button").on("click",function(e){
        e.preventDefault();

        if($("#compressed-show").hasClass("active")){
            alert("每次只能对单一合铺进行拆铺！");
            return;
        }
        var $cur_select=$(".cur-select");

        if($cur_select.length>0 && $cur_select.get(0).classList.contains("compressed")){
            var compressed_class="compressed-"+$cur_select.attr("data-compressed");
            $cur_select.each(function(i,e){
                this.classList.remove("compressed");
                this.classList.remove(compressed_class);
                this.classList.remove("cur-select");
                $(this).removeAttr("data-compressed");
            });

            alert("拆铺完成");
            $("#split-button").hide();
            if(svg_editor.callback){
                svg_editor.callback()
            }
        }else{
            alert("没有可进行的拆铺操作");
        }
    });

    $("#compressed-show").on("click",function(e){
        e.preventDefault();
        if($(this).hasClass("active")){
            $(".compressed").each(function(i,e){
                this.classList.remove("cur-select");
            });
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
            $(".compressed").each(function(i,e){
                this.classList.add("cur-select");
            });
        }
    });

    //合铺操作
    $("#compressed-button").on("click",function(e){
        e.preventDefault();
        var set_class=$("#compressed-info input").val();
        var cur_select_set=$(".cur-select");
        if(set_class=="" ||set_class==null){
            alert("请先输入合铺ID");
            return;
        }
        if(cur_select_set.length <=1){
            alert("至少选择两个独立店铺进行合铺");
            return;
        }
        $(".cur-select").each(function(i,e){
            if($(this).attr("data-compressed")){
                var cur_compressed_class="compressed-"+$(this).attr("data-compressed");
                this.classList.remove(cur_compressed_class);
            }
            $(this).attr("data-compressed",set_class);
            var curClassList=this.classList;
            curClassList.add("compressed");
            curClassList.add("compressed-"+set_class);
            curClassList.remove("cur-select");
        });

        //合铺id input 归零
        $("#compressed-info input").val("");
    });

};

//svg加载后,刷新
svg_editor.refresh=function(){
    var sv=svg_editor;
    var root=sv.root=$("#ys-svg").children("svg").get(0);//checked
    $(root).attr("id","svgRoot");
    var rootGroup=$(root).children("g");
    //初始化时对根元素下的直接元素进行一遍解析，add rootGroup to <g>,这部分内容是ai作图时的群组或者图层元素
    //getMouseTarget解析时，可以判断遇到rootGroup即停止向上遍历
    //重要的事情说三遍，svg的遍历之后要再检查，目前只根据业务逻辑采用了最简单的遍历条件，可能会有bug.
    $(rootGroup).each(function(i,e){
        e.classList.add("rootGroup");
    });
    //svg加载后，再加入class，要么可能存在样式权限的问题
    svg_editor.addStyle(svg_editor.legendStyle);
    //切换至view mod
    $("#svg-viewer").trigger("click");
};

//菜单操作－－与svgeditor的curMode绑定，以实现不同的操作；
/*
$(document).ready(function(){



});
*/
