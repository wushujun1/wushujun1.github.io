function onselect() {
    if (_("selecttext").value.trim().length != 0) {
        window.open("default2-namex=" + _("selecttext").value.trim() + ".htm");
    } else {
        alert("请输入要查找的产品关键字！");
    }
};
new addonload(window, false, function (obj, event) {
    /*** 启动滚动大图Start ***/
    // 参数解释:bannerStartup(大图id, 多久移动一次【单位：毫秒 这个值为“-1”则为不滚动】, 移动一次的时间【单位：毫秒 注意：这个值要被25除尽】);
    bannerStartup("banner_inner", 6000, 500);
    /*** 启动滚动大图End ***/

    /*** 启动滚动公告栏Start ***/
    // 参数解释:announcementStartup(公告栏id, 多久移动一次【单位：毫秒 这个值为“-1”则为不滚动】, 移动一次的时间【单位：毫秒 注意：这个值要被25除尽】);
    //announcementStartup("announcement", 6000, 500);
    /*** 启动滚动公告栏End ***/

    /*** 启动滚动产品列表Start ***/
    // 参数解释:cpStartup(大外框id, 外框id, 内框id, 左箭头id, 右箭头id, 是否一次移动一个产品, 默认以哪种方式移动【goleft或goright】, 多久移动一次【单位：毫秒 这个值为“-1”则为不滚动】, 移动一次的距离【单位:px】, 移动一次的时间【单位：毫秒 注意：这个值要被25除尽】, 左箭头没有触发事件时的图片路径, 左箭头触发事件时的图片路径, 右箭头没有触发事件时的图片路径, 右箭头触发事件时的图片路径);
    // 【注意：只有在“是否一次移动一个产品”为false时“移动一次的距离”才有效,否则为一个产品的距离】
    //cpStartup("fpcps", "pcps", "cps", "goleft", "goright", true, "goleft", 2000, 164, 500, "image/goleft1.png", "image/goleft2.png", "image/goright1.png", "image/goright2.png");
    /*** 启动滚动产品列表End ***/

    addScript("http://www.szsujun.com/js/dnwz_index.js"); // 不能删


});

function bannerStartup(id, stepTime, useTime) {
    if (_(id) !== null && "undefined" !== typeof banners && banners.length !== 0) {
        var banner_inner = _(id), dtthisdisp = 0;
        var dts = createElement(banner_inner, "div", function (div) { div.id = "dts"; });
        var xts = createElement(banner_inner, "ul", function (ul) { ul.id = "xts"; });
        for (var i = 0; i < banners.length; i++) {
            var banner = banners[i];
            createElement(dts, "a", function (a) {
                a.id = "dt" + String(i);
                if (kernelId !== 0 ? getStyle(banner_inner, "height") === "0px" : getStyle(banner_inner, "height") === "auto") {
                    createElement(a, "img", function (img) {
                        img.src = banner.src;
                        if (banner.title.length !== 0) { img.alt = banner.title; };
                        img.style.display = "block";
                    });
                } else {
                    a.style.width = "100%";
                    a.style.height = getStyle(banner_inner, "height");
                    a.style.backgroundImage = "url('" + banner.src + "')";
                    a.style.backgroundPosition = "center center";
                    a.style.backgroundRepeat = "no-repeat";
                    a.style.textDecoration = "none";
                };
                if (banner.title.length !== 0) { a.title = banner.title; };
                if (banner.href.length !== 0) { a.href = banner.href; } else { a.href = "javascript:void(null);"; };
                if (banner.target.length !== 0) { a.target = banner.target; };
                if (banner.follow === false) { a.rel = "nofollow"; };
            });
            createElement(xts, "li", function (li) { li.id = "xt" + String(i); (function (i) { new addonmousedown(li, false, function (obj, event) { dtshow(i); }); })(i); });
        };
        _("dt" + String(dtthisdisp)).style.display = "block";
        setOpacity(_("dt" + String(dtthisdisp)), 1);
        if (stepTime !== -1) {
            var dtisanimateing = false;
            function dtshow(i) {
                if (dtisanimateing === false) {
                    dtisanimateing = true;
                    var animateInterval1 = setInterval(function () {
                        var dt1 = _("dt" + String(dtthisdisp)), dt2 = _("dt" + String(i)), xt1 = _("xt" + String(dtthisdisp)), xt2 = _("xt" + String(i));
                        if (getOpacity(dt1) > 0.4) { setOpacity(dt1, getOpacity(dt1) - 0.1); }
                        else {
                            clearInterval(animateInterval1);
                            xt1.style.backgroundColor = "#FFFFFF";
                            xt2.style.backgroundColor = "#015CB5";
                            setOpacity(dt1, 0); dt1.style.display = "none";
                            setOpacity(dt2, 0.4); dt2.style.display = "block";
                            var thisOpacity = getOpacity(dt2), curTime = 0;
                            var animateInterval2 = setInterval(function () {
                                curTime += 25;
                                setOpacity(dt2, easeInOut(thisOpacity, 1, curTime, useTime));
                                if (curTime >= useTime) { clearInterval(animateInterval2); dtthisdisp = i; dtisanimateing = false; };
                            }, 25);
                        };
                    }, 35);
                };
            };
            function dtgonext() { if (dtisanimateing === false) { dtshow((dtthisdisp + 1) % banners.length); }; };
            var xts_li = _("xts").getElementsByTagName("li")[0];
            var xtWidth = parseInt(getStyle(xts_li, "width")) + parseInt(getStyle(xts_li, "border-left-width")) + parseInt(getStyle(xts_li, "border-right-width")) + parseInt(getStyle(xts_li, "margin-left"));
            xts.style.marginLeft = String(-(banners.length * xtWidth / 2 + parseInt(getStyle(xts_li, "margin-left")) / 2)) + "px";
            xts.style.display = "block";
            _("xt" + String(dtthisdisp)).style.backgroundColor = "#015CB5";
            var dtarrowisover = false;
            new addonmouseover(dts, false, function (obj, event) { dtarrowisover = true; });
            new addonmouseout(dts, false, function (obj, event) { dtarrowisover = false; });
            new addonmouseover(xts, false, function (obj, event) { dtarrowisover = true; });
            setInterval(function () { if (dtarrowisover === false) { dtgonext(); }; }, stepTime);
        };
    };
};
function announcementStartup(id, stepTime, useTime) {
    if (_(id) !== null && stepTime !== -1) {
        var announcement = _(id);
        var firstAm = announcement.getElementsByTagName("li")[0];
        announcement.appendChild(firstAm.cloneNode(true));
        var amheight = firstAm.offsetHeight + parseInt(getStyle(firstAm, "margin-top")) + parseInt(getStyle(firstAm, "margin-bottom")), amtcount = 0;
        function amgonext() {
            var top = parseInt(getStyle(announcement, "top")), curTime = 0;
            if (top <= -announcement.offsetHeight + amheight) { announcement.style.top = "0px"; top = 0; amtcount = 0; };
            var animateInterval = setInterval(function () {
                curTime += 25;
                announcement.style.top = String(easeInOut(top, -amheight, curTime, useTime)) + "px";
                if (curTime >= useTime) { clearInterval(animateInterval); amtcount -= amheight; announcement.style.top = String(amtcount) + "px"; };
            }, 25);
        };
        var amarrowisover = false;
        new addonmouseover(announcement, false, function (obj, event) { amarrowisover = true; });
        new addonmouseout(announcement, false, function (obj, event) { amarrowisover = false; });
        setInterval(function () { if (amarrowisover === false) { amgonext(); }; }, stepTime);
    };
};
function cpStartup(fpcpsId, pcpsId, cpsId, goleftId, gorightId, cpflag, defaultgo, stepTime, step, useTime, leftImg1src, leftImg2src, rightImg1src, rightImg2src) {
    var fpcps = _(fpcpsId), pcps = _(pcpsId), cps = _(cpsId);
    if (fpcps !== null && pcps !== null && cps !== null) {
        var cpsas = new Array(), cpsChildNodes = cps.childNodes;
        for (var i = 0; i < cpsChildNodes.length; i++) { if (cpsChildNodes[i].nodeType === 1) { cpsas.push(cpsChildNodes[i]); }; };
        if (cpsas.length !== 0) {
            var isScroll = false;
            var firstCp = cpsas[0];
            var cpWidth = firstCp.offsetWidth + parseFloat(getStyle(firstCp, "margin-left")) + parseFloat(getStyle(firstCp, "margin-right"));
            var cpHeight = firstCp.offsetHeight + parseInt(getStyle(firstCp, "margin-top")) + parseInt(getStyle(firstCp, "margin-bottom"));
            var pCpWidth = pcps.clientWidth - parseInt(getStyle(pcps, "padding-left")) - parseInt(getStyle(pcps, "padding-right"));
            if (cpWidth * cpsas.length >= pCpWidth) { isScroll = true; var showNum = Math.floor(pCpWidth / cpWidth); for (var i = 0; i < showNum; i++) { cps.appendChild(cpsas[i].cloneNode(true)); }; };
            cps.style.width = String(cpWidth * cpsas.length + pCpWidth) + "px";
            if (kernelId !== 0 ? getStyle(cps, "height") === "0px" : getStyle(cps, "height") === "auto") { pcps.style.height = String(cpHeight) + "px"; };
            fpcps.style.height = String(pcps.offsetHeight + parseInt(getStyle(pcps, "top")) * 2) + "px";
            if (isScroll === true) {
                if (cpflag === true) { step = cpWidth; if (pCpWidth % cpWidth !== 0) { alert("你设置的产品滚动栏【pcps】宽度与单个产品宽度除不尽，无法实现无缝滚动，请仔细检查并修改！"); }; };
                var cpgo = undefined, go_left, go_right, thisFun, thiscpsleft = 0, cpisanimateing = false;
                var goleft = _(goleftId), goright = _(gorightId), leftImg1 = "url('" + leftImg1src + "')", leftImg2 = "url('" + leftImg2src + "')", rightImg1 = "url('" + rightImg1src + "')", rightImg2 = "url('" + rightImg2src + "')";
                go_left = function () {
                    if (cpflag === true) {
                        if (cpisanimateing === false) {
                            cpisanimateing = true;
                            thiscpsleft = parseInt(getStyle(cps, "left"));
                            if (thiscpsleft <= -parseInt(getStyle(cps, "width")) + parseInt(getStyle(pcps, "width"))) { thiscpsleft = 0; };
                            var curTime = 0, onblur, animateInterval;
                            onblur = new addonblur(window, false, function (obj, event) { clearInterval(animateInterval); thiscpsleft -= step; cps.style.left = String(thiscpsleft) + "px"; cpisanimateing = false; onblur.remove(); });
                            animateInterval = setInterval(function () {
                                curTime += 25;
                                cps.style.left = String(easeInOut(thiscpsleft, -step, curTime, useTime)) + "px";
                                if (curTime >= useTime) { clearInterval(animateInterval); thiscpsleft -= step; onblur.remove(); cpisanimateing = false; };
                            }, 25);
                        };
                    } else {
                        thiscpsleft = parseInt(getStyle(cps, "left"));
                        if (thiscpsleft <= -parseInt(getStyle(cps, "width")) + parseInt(getStyle(pcps, "width"))) { thiscpsleft = 0; };
                        thiscpsleft -= step;
                        cps.style.left = String(thiscpsleft) + "px";
                    };
                };
                go_right = function () {
                    if (cpflag === true) {
                        if (cpisanimateing === false) {
                            cpisanimateing = true;
                            thiscpsleft = parseInt(getStyle(cps, "left"));
                            if (thiscpsleft > -step) { thiscpsleft = -(parseInt(getStyle(cps, "width")) - parseInt(getStyle(_("pcps"), "width"))); };
                            var curTime = 0, onblur, animateInterval;
                            onblur = new addonblur(window, false, function (obj, event) { clearInterval(animateInterval); thiscpsleft += step; cps.style.left = String(thiscpsleft) + "px"; cpisanimateing = false; onblur.remove(); });
                            animateInterval = setInterval(function () {
                                curTime += 25;
                                cps.style.left = String(easeInOut(thiscpsleft, step, curTime, useTime)) + "px";
                                if (curTime >= useTime) { clearInterval(animateInterval); thiscpsleft += step; onblur.remove(); cpisanimateing = false; };
                            }, 25);
                        };
                    } else {
                        thiscpsleft = parseInt(getStyle(cps, "left"));
                        if (thiscpsleft > -step) { thiscpsleft = -(parseInt(getStyle(cps, "width")) - parseInt(getStyle(_("pcps"), "width"))); };
                        thiscpsleft += step;
                        cps.style.left = String(thiscpsleft) + "px";
                    };
                };
                if (stepTime !== -1) {
                    switch (defaultgo) { case "goleft": { thisFun = go_left; }; break; case "goright": { thisFun = go_right; }; break; default: { alert("默认滚动方式设置有误,请仔细检查并修改！"); }; break; };
                    cpgo = setInterval(function () { thisFun(); }, stepTime);
                    new addonblur(window, false, function (obj, event) { clearInterval(cpgo); cpgo = undefined; });
                    new addonfocus(window, false, function (obj, event) { if (cpgo === undefined) { cpgo = setInterval(function () { thisFun(); }, stepTime); }; });
                    new addonmousemove(fpcps, false, function (obj, event) { clearInterval(cpgo); cpgo = undefined; });
                    new addonmouseout(fpcps, false, function (obj, event) { if (cpgo === undefined) { cpgo = setInterval(function () { thisFun(); }, stepTime); }; });
                };
                if (goleft !== null) {
                    goleft.style.marginTop = String(parseInt(getStyle(pcps, "top"))) + "px";
                    goleft.style.backgroundImage = leftImg1;
                    new addonmousedown(goleft, false, function (obj, event) {
                        var onup, onout;
                        if (cpflag === true) {
                            obj.style.backgroundImage = leftImg2;
                            go_left();
                            onup = new addonmouseup(goleft, false, function (obj, event) { obj.style.backgroundImage = leftImg1; onout.remove(); onup.remove(); });
                            onout = new addonmouseout(goleft, false, function (obj, event) { obj.style.backgroundImage = leftImg1; if (cpgo === undefined && stepTime !== -1) { cpgo = setInterval(function () { thisFun(); }, stepTime); }; onup.remove(); onout.remove(); });
                        } else {
                            var cpgo2 = setInterval(function () { go_left(); }, stepTime);
                            onup = new addonmouseup(goleft, false, function (obj, event) { clearInterval(cpgo2); onout.remove(); onup.remove(); });
                            onout = new addonmouseout(goleft, false, function (obj, event) { clearInterval(cpgo2); if (cpgo === undefined && stepTime !== -1) { cpgo = setInterval(function () { thisFun(); }, stepTime); }; onup.remove(); onout.remove(); });
                        }
                    });
                    if (cpflag === false) {
                        new addonmouseover(goleft, false, function (obj, event) { obj.style.backgroundImage = leftImg2; });
                        new addonmouseout(goleft, false, function (obj, event) { obj.style.backgroundImage = leftImg1; });
                    };
                };
                if (goright !== null) {
                    goright.style.marginTop = String(parseInt(getStyle(pcps, "top"))) + "px";
                    goright.style.backgroundImage = rightImg1;
                    new addonmousedown(goright, false, function (obj, event) {
                        var onup, onout;
                        if (cpflag === true) {
                            obj.style.backgroundImage = rightImg2;
                            go_right();
                            onup = new addonmouseup(goright, false, function (obj, event) { obj.style.backgroundImage = rightImg1; onout.remove(); onup.remove(); });
                            onout = new addonmouseout(goright, false, function (obj, event) { obj.style.backgroundImage = rightImg1; if (cpgo === undefined && stepTime !== -1) { cpgo = setInterval(function () { thisFun(); }, stepTime); }; onup.remove(); onout.remove(); });
                        } else {
                            var cpgo2 = setInterval(function () { go_right(); }, stepTime);
                            onup = new addonmouseup(goright, false, function (obj, event) { clearInterval(cpgo2); onout.remove(); onup.remove(); });
                            onout = new addonmouseout(goright, false, function (obj, event) { clearInterval(cpgo2); if (cpgo === undefined && stepTime !== -1) { cpgo = setInterval(function () { thisFun(); }, stepTime); }; onup.remove(); onout.remove(); });
                        };
                    });
                    if (cpflag === false) {
                        new addonmouseover(goright, false, function (obj, event) { obj.style.backgroundImage = rightImg2; });
                        new addonmouseout(goright, false, function (obj, event) { obj.style.backgroundImage = rightImg1; });
                    };
                };
                new addonmouseover(document.body, false, function (obj, event) { if (cpgo === undefined && stepTime !== -1) { cpgo = setInterval(function () { thisFun(); }, stepTime); }; });
            };
        };
    } else { alert("由于fpcps/pcps/cps中存在对象缺失,滚动产品列表功能无法执行,请仔细检查并修改！"); };
};