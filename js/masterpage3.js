/*** 滚动大图Start ***/
var dtthisdisp = -1, dtisanimateing = false, dtarrowisover = false, dtlength = 0;
function dtshow(i) {
    if (dtisanimateing === false) {
        dtisanimateing = true;
        var animateInterval1 = setInterval(function () {
            var dt1 = _("dt" + String(dtthisdisp)), dt2 = _("dt" + String(i)), xt1 = _("xt" + String(dtthisdisp)), xt2 = _("xt" + String(i));
            if (getOpacity(dt1) > 0.4) { setOpacity(dt1, getOpacity(dt1) - 0.1); }
            else {
                clearInterval(animateInterval1);
                xt1.style.backgroundColor = "#B1B1B1"; xt2.style.backgroundColor = "#D8271C";
                setOpacity(dt1, 0); dt1.style.display = "none";
                setOpacity(dt2, 0.4); dt2.style.display = "block";
                var thisOpacity = getOpacity(dt2), curTime = 0;
                var animateInterval2 = setInterval(function () {
                    curTime += 25;
                    setOpacity(dt2, easeInOut(thisOpacity, 1, curTime, 500));
                    if (curTime >= 500) { clearInterval(animateInterval2); dtthisdisp = i; dtisanimateing = false; };
                }, 25);
            };
        }, 35);
    };
};
function dtgonext() { if (dtisanimateing === false) { dtshow((dtthisdisp + 1) % dtlength); }; };
/*** 滚动大图End ***/

new addonload(window, false, function (obj, event) {
    /*** 启动滚动大图Start ***/
    if ("undefined" !== typeof banners && banners.length !== 0) {
        dtlength = banners.split("|").length;
        var banner_inner = _("banner_inner");
        var dts = createElement(banner_inner, "div", function (div) { div.id = "dts"; });
        var xts = createElement(banner_inner, "ul", function (ul) { ul.id = "xts"; });
        var bs = banners.split("|");
        var i = 0;
        for (; i < bs.length; i++) {
            var b = bs[i].split(",");
            createElement(dts, "a", function (a) {
                a.id = "dt" + String(i);
                if (kernelId !== 0 ? getStyle(banner_inner, "height") === "0px" : getStyle(banner_inner, "height") === "auto") {
                    createElement(a, "img", function (img) {
                        img.src = b[0].trim();
                        img.style.display = "block";
                        if (b[1].trim().length !== 0) { img.alt = b[1].trim(); };
                    });
                } else {
                    a.style.width = "100%";
                    a.style.height = getStyle(banner_inner, "height");
                    a.style.backgroundImage = "url('" + b[0].trim() + "')";
                    a.style.backgroundPosition = "center center";
                    a.style.backgroundRepeat = "no-repeat";
                    a.style.textDecoration = "none";
                };
                if (b[1].trim().length !== 0) { a.title = b[1].trim(); };
                if (b[2].trim().length !== 0) { a.href = b[2].trim(); } else { a.href = "javascript:void(null);"; };
                if (b[3].trim().length !== 0) { a.target = b[3].trim(); };
                if (b[4].trim() === "false") { a.rel = "nofollow"; };
            });
            createElement(xts, "li", function (li) { li.id = "xt" + String(i); (function (i) { new addonmousedown(li, false, function (obj, event) { dtshow(i); }); })(i); });
        };
        dtthisdisp = 0;
        _("dt" + String(dtthisdisp)).style.display = "block";
        setOpacity(_("dt" + String(dtthisdisp)), 1);
        /*** 如果要让子页面的大图滚动起来请将以下代码打开 ***/
        /*
        xts.style.marginLeft = String(-(dtlength * 18 / 2 + 6 / 2)) + "px";
        xts.style.display = "block";
        _("xt" + String(dtthisdisp)).style.backgroundColor = "#D8271C";
        new addonmouseover(dts, false, function (obj, event) { dtarrowisover = true; });
        new addonmouseout(dts, false, function (obj, event) { dtarrowisover = false; });
        new addonmouseover(xts, false, function (obj, event) { dtarrowisover = true; });
        setInterval(function () { if (dtthisdisp !== -1 && dtarrowisover === false) { dtgonext(); }; }, 6000); // 6000毫秒【6秒】滚动一次
        */
    };
    /*** 启动滚动大图End ***/
});