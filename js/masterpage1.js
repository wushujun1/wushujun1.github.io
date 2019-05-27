var selectId1 = (function () { var l1 = location.toString(); return l1.indexOf(".htm") === -1 ? "" : /^([^\.-]+).*\.htm(.*)$/.exec(l1.substr(l1.lastIndexOf("/") + 1))[1]; })(); // 当前打开页面的文件名(不带扩展名)

new addonload(window, false, function (obj, event) {
    if (selectId1 === "") { selectId1 = "index"; } // 默认首页id
    else { if (isServer === "True") { doPost("ashx/addCache.ashx", function (x) { }); }; };
    addScript("http://www.szsujun.com/js/dnwz_masterpage1.js"); // 不能删
    if (isExistCookie("scrollTop") === true) { setTimeout(function () { setScrollTop(Number(getCookie("scrollTop"))); }, 150); }; // 定位到原来位置

    var li = _(selectId1.split("_")[0]);
    var a = li.getElementsByTagName("a")[0]; // 当前导航栏上被选中的a标签
    a.style.backgroundImage = " url('image/nav_hbg.png')";
});
new addonmousedown(window, true, function (obj, event) {
    addCookie("scrollTop", String(getScrollTop()));
});
new addonkeydown(document, true, function (obj, event) {
    if (event.keyCode === 13 && getElementsByClass("next").length !== 0) { location.href = getElementsByClass("next"); };
});
new addonresize(window, false, function (obj, event) {

});