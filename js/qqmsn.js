var qqcontent = ""; // 输出到页面上的代码
var qqtop = 130; // QQ弹窗距离顶部的距离
var qqDistance = 35; // QQ弹窗距离左右两边的距离
function qqClose() {
    addCookie("qqisclose", "1");
    _("qqmsn").style.display = "none";
};
function qqFixed(fixedTop) {
    var scrollTop = getScrollTop();
    var qqmsn = _("qqmsn");
    var qqTop = parseInt(qqmsn.style.top, 10);
    if (Math.abs(scrollTop + fixedTop - qqTop) > 5) {
        if (qqTop + 5 < scrollTop + fixedTop) { qqmsn.style.top = qqTop + 5 + "px"; }
        else if (qqTop - 5 > scrollTop + fixedTop) { qqmsn.style.top = qqTop - 5 + "px"; };
    };
};
/*** 如果要显示QQ弹窗请将以下代码打开 ***/
/*
if (isExistCookie("qqisclose") === false) {
    qqcontent += "<div id='qqmsn' style='width:120px; height:auto; background-color:#FFFFFF; border-style:solid; border-color:#38A5E6; border-width:2px 2px 2px 2px; position:absolute; right:" + qqDistance + "px; top:0px; z-index:20;'>";
    qqcontent += "<a href='javascript:qqClose();' style='display:block; width:100%; height:32px; background-image:url(image/qt.png); background-position:center center; background-repeat:no-repeat;'></a>";
    if (qqNums.length !== 0) {
        var qqs = qqNums.split(",");
        for (var i = 0; i < qqs.length; i++) {
            var qq = "tencent://message/?uin=" + qqs[i] + "&Site=&Menu=yes";
            qqcontent += "<a href='" + qq + "'><img src='image/qq.png' style='display:block; margin:0 auto; margin-top:5px;' alt='" + qq + "' /></a>";
        };
    };
    qqcontent += "<img src='image/ewm.png' style='display:block; width:100%; height:auto; margin-top:5px;' alt='二维码' />";
    qqcontent += "</div>";
    document.write(qqcontent);

    window.setInterval("qqFixed(" + qqtop + ")", 10);
};
*/