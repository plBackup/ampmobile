(function($){

    var container = $(".ys-datetime-selector");
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth()+1;
    var currentDate = new Date().getDate();
    var currentDayCount = getMaxDateInMonth(currentYear,currentMonth);
    var yearSwiper =null;
    var  monthSwiper =null;
    var  dateSwiper =null;
    var callback = function(year,month,date){};

    var html =  "<div class='ys-datetime-selector display-hide'>    "+
        "  <div class='ys-datetime-selector-content'>          "+
        "     <div class='ys-datetime-operation-bar'>         "+
        "        <a class='ys-datetime-cancel-btn'>取消</a>"+
        "        <span>选择日期</span>                     "+
        "        <a class='ys-datetime-ok-btn'>确定</a>    "+
        "     </div>                                        "+
        "     <div class='ys-datetime-blocks'>              "+
        "        <div class='ys-datetime-year-block'>      "+
        "           <div class='swiper-container'>        "+
        "              <div class='swiper-wrapper'></div>"+
        "           </div>                                "+
        "        </div>                                    "+
        "        <div class='ys-datetime-month-block'>     "+
        "           <div class='swiper-container'>        "+
        "              <div class='swiper-wrapper'></div>"+
        "           </div>                                "+
        "        </div>                                    "+
        "        <div class='ys-datetime-date-block'>      "+
        "           <div class='swiper-container'>        "+
        "              <div class='swiper-wrapper'></div>"+
        "           </div>                                "+
        "        </div>                                    "+
        "        <div style='clear:both;'></div>           "+
        "     </div>                                        "+
        "  </div>                                            "+
        "</div>                                               ";

    /* ======================================== initialize the page view ======================================== */
    function render(){
        container = $(html).appendTo("body");

        yearSwiper = new Swiper(".ys-datetime-year-block .swiper-container", {
            direction : "vertical",
            freeMode:true,
            freeModeSticky:true,
            slidesPerView: "auto",
            onTransitionEnd:function(swiper){
                var activeIndex = swiper.activeIndex;
                var slidesLen = swiper.slides.length;
                if(activeIndex<20){
                    var firstYear = parseInt($(swiper.slides[0]).attr("data-year"));
                    var prevYears = [];
                    for(var i=firstYear-1;i>=firstYear-100;i--){
                        prevYears.push("<div class='swiper-slide' data-year='"+i+"'>"+i+"年</div>");
                    }
                    swiper.prependSlide(prevYears);
                }else if(slidesLen-activeIndex<20){
                    var lastYear = parseInt($(swiper.slides[slidesLen-1]).attr("data-year"));
                    var nextYears = [];
                    for(var i=lastYear+1;i<=lastYear+100;i++){
                        nextYears.push("<div class='swiper-slide' data-year='"+i+"'>"+i+"年</div>");
                    }
                    swiper.appendSlide(nextYears);
                }

                // 计算这个月有多少天
                currentYear = parseInt($(swiper.slides[activeIndex+2]).attr("data-year"));
                updateDateSwiper();

            }
        });
        var yearSlides = [];
        for(var i=currentYear-2;i<=currentYear+22;i++){
            yearSlides.push("<div class='swiper-slide' data-year='"+i+"'>"+i+"年</div>");
        }
        var prevYears = [];
        for(var i=currentYear-3;i>currentYear-20;i--){
            prevYears.push("<div class='swiper-slide' data-year='"+i+"'>"+i+"年</div>");
        }
        yearSwiper.appendSlide(yearSlides);
        yearSwiper.prependSlide(prevYears);


        monthSwiper = new Swiper(".ys-datetime-month-block .swiper-container", {
            direction :"vertical",
            freeMode:true,
            freeModeMomentumRatio:0.2,
            loop:true,
            loopAdditionalSlides:24,
            freeModeSticky:true,
            slidesPerView:"auto",
            onTransitionEnd:function(swiper){
                var activeIndex = swiper.activeIndex;
                if(isNaN(activeIndex)){
                    return;
                }
                // 计算这个月有多少天
                currentMonth = parseInt($(swiper.slides[activeIndex+2]).attr("data-month"));
                updateDateSwiper();
            }
        });
        var monthSlides=[];
        for(var i=1;i<=12;i++){
            monthSlides.push("<div class='swiper-slide' data-month='"+i+"'>"+i+"月</div>");
        }
        monthSwiper.appendSlide(monthSlides);
        monthSwiper.appendSlide(monthSlides);
        monthSwiper.appendSlide(monthSlides);

        dateSwiper = new Swiper(".ys-datetime-date-block .swiper-container", {
            direction :"vertical",
            loop : true,
            freeMode:true,
            freeModeMomentumRatio:0.2,
            freeModeSticky:true,
            slidesPerView:"auto",
            onTransitionEnd:function(swiper){
                var activeIndex = swiper.activeIndex;
                if(isNaN(activeIndex)){
                    return;
                }
                // 计算这个月有多少天
                currentDate = parseInt($(swiper.slides[activeIndex+2]).attr("data-date"));
            }
        });
        var dateSlides=[];
        for(var i=1;i<=currentDayCount;i++){
            dateSlides.push("<div class='swiper-slide' data-date='"+i+"'>"+i+"日</div>");
        }
        dateSwiper.appendSlide(dateSlides);
    }

    /* ======================================== bind events ======================================== */
    function bindEvents(){
        container.on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            container.find(".ys-datetime-selector-content").addClass("datetime-selector-slide-down-out");
        });

        container.on("click",".ys-datetime-selector-content",function(e){
            e.stopPropagation();
            e.preventDefault();
        });

        container.on("click",function(e){e.preventDefault();e.stopPropagation();});

        container.on("click",".ys-datetime-cancel-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            container.find(".ys-datetime-selector-content").addClass("datetime-selector-slide-down-out");
        });

        container.on("click",".ys-datetime-ok-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            callback(currentYear,currentMonth,currentDate);
            container.find(".ys-datetime-selector-content").addClass("datetime-selector-slide-down-out");
        });

        container.find(".ys-datetime-selector-content").on("animationend webkitAnimationEnd",function(){
            if($(this).hasClass("datetime-selector-slide-down-out")){
                container.addClass("display-hide");
            }
            $(this).removeClass("datetime-selector-slide-down-in").removeClass("datetime-selector-slide-down-out");
        });
    }

    var initialized = false;
    function init(){
        if(initialized){
            return;
        }
        initialized = true;
        render();
        bindEvents();
    }

    /* ======================================== common methods ======================================== */
    function getMaxDateInMonth(year,month){
        var date = new Date();
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(0);
        return date.getDate();
    }

    function updateDateSwiper(){
        var nextDayCount = getMaxDateInMonth(currentYear,currentMonth);
        if(currentDayCount>nextDayCount){
            for(var i=currentDayCount-1;i>=nextDayCount;i--){
                dateSwiper.removeSlide(i);
            }

        }else if(currentDayCount<nextDayCount){
            for(var i=currentDayCount+1;i<=nextDayCount;i++){
                dateSwiper.appendSlide("<div class='swiper-slide' data-date='"+i+"'>"+i+"日</div>");
            }
        }
        currentDayCount = nextDayCount;

        currentDate = parseInt($(dateSwiper.slides[dateSwiper.activeIndex+2]).attr("data-date"));

    }

    function showDateTime(options){



        options = options||{};
        var year = options.year;
        var month = options.month;
        var date = options.date;

        var type = options.type||"year-month-date";
        if(type=="year-month-date"){
            container.find(".ys-datetime-year-block").removeClass("block-hide").removeClass("width-50").removeClass("width-100");
            container.find(".ys-datetime-month-block").removeClass("block-hide").removeClass("width-50").removeClass("width-100");
            container.find(".ys-datetime-date-block").removeClass("block-hide").removeClass("width-50").removeClass("width-100");
        }else if(type=="year-month"){
            container.find(".ys-datetime-date-block").addClass("block-hide");
            container.find(".ys-datetime-year-block").addClass("width-50").removeClass("width-100").removeClass("block-hide");
            container.find(".ys-datetime-month-block").addClass("width-50").removeClass("width-100").removeClass("block-hide");
        }else if(type=="year"){
            container.find(".ys-datetime-date-block").addClass("block-hide");
            container.find(".ys-datetime-month-block").addClass("block-hide");
            container.find(".ys-datetime-year-block").addClass("width-100");
        }

        callback = options.callback||callback;
        currentYear = year||currentYear;
        currentMonth = month||currentMonth;
        currentDate = date||currentDate;
        currentDayCount = getMaxDateInMonth(currentYear,currentMonth);

        var yearSlidesLength = yearSwiper.slides.length;
        var minYear = parseInt($(yearSwiper.slides[2]).attr("data-year"));
        var maxYear = parseInt($(yearSwiper.slides[yearSlidesLength-3]).attr("data-year"));
        if(currentYear<minYear){
            var prevYears = [];
            for(var i=minYear-3;i>currentYear-20;i--){
                prevYears.push("<div class='swiper-slide' data-year='"+i+"'>"+i+"年</div>");
            }
            yearSwiper.prependSlide(prevYears);
            yearSwiper.slideTo(17);
        }else if(currentYear>maxYear){
            var nextSlides = [];
            for(var i=maxYear+2;i<=currentYear+20;i++){
                nextSlides.push("<div class='swiper-slide' data-year='"+i+"'>"+i+"年</div>");
            }
            yearSwiper.appendSlide(nextSlides);
            yearSwiper.slideTo(currentYear-minYear+1);
        }else{
            yearSwiper.slideTo(currentYear-minYear);
        }

        monthSwiper.slideTo(currentMonth+9);
        dateSwiper.slideTo(currentDayCount-3+currentDate);

        container.removeClass("display-hide");
        container.find(".ys-datetime-selector-content").addClass("datetime-selector-animated").addClass("datetime-selector-slide-down-in");

    }

    var DateTimeWidget = {
        show:function(options){
            init();
            showDateTime(options);
        }
    };

    window.DateTimeWidget = DateTimeWidget;
})(jQuery);