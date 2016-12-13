function bindMgtAnalysisPageEvent(){
    var contractStatisticsPanelWrapper = $("#mgt-analysis-statistics-panel-wrapper");

    /* mgt-analysis-statistics-panel-wrapper */
    contractStatisticsPanelWrapper.on("webkitAnimationEnd animationend",".contract-statistics-panel .panel-content",function(){
        if($(this).hasClass("amp-slide-down-out")){
            $(contractStatisticsPanelWrapper).find(".contract-statistics-panel").addClass("amp-display-none");
        }
        $(this).removeClass("amp-slide-up-in");
        $(this).removeClass("amp-slide-down-out");
    });

    contractStatisticsPanelWrapper.on("click",".contract-statistics-panel .panel-content",function(e){
        e.stopPropagation();
        e.preventDefault();
    });

    contractStatisticsPanelWrapper.on("click",".contract-statistics-panel",function(e){
        e.stopPropagation();
        e.preventDefault();
        $(contractStatisticsPanelWrapper).find(".contract-statistics-panel .panel-content").addClass("amp-slide-down-out");
    });
}

/* 显示管理分析统计panel */
function showMgtAnalysisPanel(){
    var contractStatisticsPanelWrapper = $("#mgt-analysis-statistics-panel-wrapper");
    $(contractStatisticsPanelWrapper).find(".contract-statistics-panel").removeClass("amp-display-none");
    $(contractStatisticsPanelWrapper).find(".contract-statistics-panel .panel-content").addClass("amp-animated").addClass("amp-slide-up-in");
}

function toggleMgtAnalysisMenuList(){
    $("#mgt-analysis-menu-list-wrapper .menu-item-list").toggle();
}

function hideMgtAnalysisMenuList(){
    $("#mgt-analysis-menu-list-wrapper .menu-item-list").hide();
}


