var YYAD = {
    guid: 0
};
YYAD.JSONP = function () {
    function f(b, c) {
        var a = document.createElement("script"),
            f = !1;
        a.src = b;
        a.async = !0;
        var l = c || h.error;
        "function" === typeof l && (a.onerror = function (a) {
            l({
                url: b,
                event: a
            })
        });
        a.onload = a.onreadystatechange = function () {
            if (!f && (!this.readyState || "loaded" === this.readyState || "complete" === this.readyState)) f = !0, a.onload = a.onreadystatechange = null, a && a.parentNode && a.parentNode.removeChild(a)
        };
        e || (e = document.getElementsByTagName("head")[0]);
        e.appendChild(a)
    }
    var b = 0,
        e, c = this,
        h = {};
    return {
        get: function (d, g, a, e) {
            var l = -1 === (d || "").indexOf("?") ? "?" : "&",
                m;
            e = e || h.callbackName || "callback";
            var n = e + "" + ++b;
            g = g || {};
            for (m in g) l += encodeURIComponent(m) + "=" + encodeURIComponent(g[m]) + "&";
            c[n] = function (b) {
                a(b);
                try {
                    delete c[n]
                } catch (d) { }
                c[n] = null
            };
            f(d + l + e + "=" + n);
            return n
        },
        init: function (b) {
            h = b
        }
    }
}();
YYAD.SCRIPT = function (f, b) {
    var e = document.createElement("script");
    e.src = f;
    e.async = !0;
    var c = document.getElementsByTagName("head")[0],
        h = !1;
    e.onload = e.onreadystatechange = function () {
        if (!h && (!this.readyState || "loaded" == this.readyState || "complete" == this.readyState)) h = !0, b(), e.onload = e.onreadystatechange = null, c.removeChild(e)
    };
    c.appendChild(e)
};
YYAD.GetGuid = function () {
    return "YY-Ad-" + (new Date).getTime() + "" + YYAD.guid++
};
YYAD.LoadAds = function (f, b, e, el) {
    if (!f) return !1;
    var c = this.GetGuid(),
        h = this;
    var $iframe = $('<iframe id="' + c + '" allowtransparency="true" frameborder="0" src="about:blank" width="' + (b ? b : 0) + '" height="' + (e ? e : 0) + '" hspace="0" marginheight="0" marginwidth="0"  scrolling="no" vspace="0"></iframe>');
    $(el).append($iframe);
    //document.write('<iframe id="' + c + '" allowtransparency="true" frameborder="0" src="about:blank" width="' + (b ? b : 0) + '" height="' + (e ? e : 0) + '" hspace="0" marginheight="0" marginwidth="0"  scrolling="no" vspace="0"></iframe>');
    this.SCRIPT("//static.5211game.com/advSysFiles/AdvSlots/ADV_" + f + ".js?r=" + (new Date).getTime(), function () {
        var b = window["YYAD_NO_" + f];
        if (!b) return !1;
        h.Render(c, b)
    })
};
YYAD.fnstr = 'var AdCount = function (pvid, itemid, type) { if(!useStat) return false; var url = "https://adstat.5211game.com/Advertisement/stat" + (type ? type : "click") + "/" + pvid + "/" + itemid + "/";setTimeout(function () { LoadRes(url + "?r=" + new Date().getTime(),null,"iframe"); }, 0);};var EnterPlat = function (url) { var iframe = window["_plat_iframe"]; url = url + (/;$/.test(url) ? "" : ";") + "r=" + new Date().getTime(); if (!iframe) { iframe = document.createElement("iframe"); iframe.src = url; iframe.style.position = "absolute"; iframe.style.top = "-999px"; iframe.style.left = "-999px"; iframe.width = 1; iframe.height = 1; document.body.appendChild(iframe); window["_plat_iframe"] = iframe; } else { iframe.src = url; } };var LoadRes = function (url, success, node) {!node && (node = "script");var n = document.createElement(node);n.src = url;n.async = true;var head = document.getElementsByTagName("head")[0],done = false;n.onload = n.onreadystatechange = function () {if (!done && (!this.readyState|| this.readyState == "loaded"|| this.readyState == "complete")) {done = true;success && success();n.onload = n.onreadystatechange = null;head.removeChild(n);}};head.appendChild(n);};\n';
YYAD.Render = function (f, b) {
    var e = "https:" == document.location.protocol ? "https" : "http",
        c = document.getElementById(f);
    if (!c || !b.data) return !1;
    var h = c.contentWindow,
        d = [],
        g = new Date,
        a = "",
        k;
    for (k in b.data) a = b.data[k], a.id && (a.begin && a.end ? 0 <= g - new Date(a.begin) && 0 >= g - new Date(a.end) && (d[d.length] = a) : a.end ? 0 >= g - new Date(a.end) && (d[d.length] = a) : a.begin ? 0 <= g - new Date(a.begin) && (d[d.length] = a) : d[d.length] = a);
    if (0 == d.length) {
        c.width = 0;
        c.height = 0;
        try {
            c.parentNode.removeChild(c)
        } catch (l) { }
        return !1
    }
    c.width = b.width;
    c.height = b.height;
    if (2 == b.type) g = Math.floor(1E7 * Math.random()) % d.length, c = [], c[c.length] = d[g], d = c;
    else if (4 == b.type) b.way = "up";
    else if (5 == b.type) {
        g = this.RequestKV("advflag");
        "" == g && (g = 0);
        c = [];
        for (k in d) d[k].advflag == g && (c[0] = d[k]);
        0 == c.length && (c[0] = d[0]);
        d = c
    }
    if (1 == d.length) a = '<!DOCTYPE html><html><head><meta charset="utf-8" /><style type="text/css">html,body, div, ul, li{margin: 0;padding: 0;}div.imgbox{overflow: hidden;position: relative;}div.imgbox,.imgbox a{width: /*width*/;height: /*height*/;}#ad_close{-moz-opacity: 0.80;khtmlopacity: 0.80;opacity: 0.80;height: 21px;right: 0px;overflow: hidden;position: absolute;top: 0px;width: 20px;z-index: 9010;}</style></head><body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background: transparent;margin: 0px; padding: 0px;"><div class="imgbox"><a target="{target}" href="{url}" class="ads" itemid="{itemid}" onclick="return Ad_Click(this)"style="position: absolute; top: /*top*/px; left: /*left*/px;"><img src="{img}" border="0" class="img_ad" /></a><img id="ad_close" onclick="Ad_Close()" style="border: 0px; cursor: pointer; /*closebtn*/"src="//static.5211game.com/advSysFiles/coles.png" width="20"></div><script type="text/javascript">var useStat = {usestat}; \n/*script*/var win = window.parent, iframeid = "{iframeid}", adid = "{adid}", itemid = "{itemid}", way = "{way}", width = "/*width*/".replace("px", ""), height = "/*height*/".replace("px", "");var YYAD = win.YYAD, iframe;function Ad_Close() {if (!YYAD) { return; }YYAD.AdClose(iframeid);};function Ad_Click(_this) {try {var href = _this.getAttribute("href"), itemid = _this.getAttribute("itemid");adid && itemid && AdCount(adid, itemid);if (href && href.indexOf("5211game") == 0) { EnterPlat(href); return false; };} catch (e) { }}setTimeout(function () {var _thisProtocol = document.location.protocol;LoadRes(_thisProtocol+"//static.5211game.com/JScripts/jquery-1.9.1.min.js", function () {(!way || way != "none") && jQuery(document).delegate(".imgbox", "mouseenter", function () {var _this = jQuery(this).find("a.ads");_this.stop();if (way == "up") {_this.css({ "top": "0px", left: "0px" }).animate({ top: (-1 * height) }, "fast");} else if (way == "down") {_this.css({ "top": (-1 * height) + "px", left: "0px" }).animate({ top: 0 }, "fast");} else if (way == "left") {_this.css({ "left": "0px", top: "0px" }).animate({ left: (-1 * width) }, "fast");} else if (way == "right") {_this.css({ "left": (-1 * width) + "px", top: "0px" }).animate({ left: 0 }, "fast");}else {_this.animate({ top: (-1 * height) }, "fast");}}).delegate(".imgbox", "mouseleave", function () {var _this = jQuery(this).find("a.ads");_this.stop();if (way == "up") {_this.animate({ top: 0 }, "fast");} else if (way == "down") {_this.animate({ top: -1 * height }, "fast");} else if (way == "left") {_this.animate({ left: 0 }, "fast");} else if (way == "right") {_this.animate({ left: -1 * width }, "fast");}else {_this.animate({ top: 0 }, "fast");}});});try { AdCount(adid, itemid, "show") } catch (e) { }}, 100);</script></body></html>'.replace(/\{target\}/ig, !/^http|https/ig.test(d[0].url) ? "" : "_blank" != d[0].target ? "_parent" : "_blank"), a = a.replace(/\{url\}/ig, d[0].url), a = a.replace(/\{img\}/ig, d[0].img.replace(/http:/i, e + ":")), a = a.replace(/\/\*closebtn\*\//ig, b.close ? "" : "display:none;"), a = a.replace(/\{iframeid\}/ig, f), a = a.replace(/\{itemid\}/ig, d[0].id), a = a.replace(/\{usestat\}/ig, void 0 == b.usestat ? !0 : b.usestat), b.way ? (a = a.replace(/\{way\}/ig, b.way), a = "down" == b.way ? a.replace(/\/\*top\*\//ig, -1 * b.height).replace(/\/\*left\*\//ig, 0) : "right" == b.way ? a.replace(/\/\*top\*\//ig, 0).replace(/\/\*left\*\//ig, -1 * b.width) : a.replace(/\/\*top\*\//ig, 0).replace(/\/\*left\*\//ig, 0)) : (a = a.replace(/\{way\}/ig, "none"), a = a.replace(/\/\*top\*\//ig, 0).replace(/\/\*left\*\//ig, 0));
    else {
        c = [];
        c[c.length] = '<!DOCTYPE html><html><head><meta charset="utf-8" /><style type="text/css">html, body, div, ul, li{margin: 0;padding: 0;}img.img_ad,.slidebox{width: /*width*/;height: /*height*/;}</style></head><body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background: transparent;margin: 0px; padding: 0px;"><div class="slidebox" style="visibility: hidden; overflow: hidden;">';
        for (k in d) {
            if (!d[k].img) continue;
            g = '<a href="{url}" target="{target}" itemid="{itemid}"><img class="img_ad" src="{img}" /></a>', g = g.replace("{target}", !/^http|https/ig.test(d[k].url) ? "" : "_blank" != d[k].target ? "_parent" : "_blank"), g = g.replace("{url}", d[k].url), g = g.replace("{img}", d[k].img.replace(/http:/i, e + ":")), g = g.replace("{itemid}", d[k].id), c[c.length] = g;
        }
        c[c.length] = '</div><script type="text/javascript">var useStat = ' + (void 0 == b.usestat ? !0 : b.usestat) + '; \n/*script*/var win = window.parent, adid = "{adid}";var YYAD = win.YYAD, iframe, Ad_Click = function (_this) {try {var href = _this.getAttribute("href"), itemid = _this.getAttribute("itemid");adid && itemid && AdCount(adid, itemid);if (href && href.indexOf("5211game") == 0) { EnterPlat(href); return false; };} catch (e) { }};var _thisProtocol = document.location.protocol;LoadRes(_thisProtocol+"//static.5211game.com/jscripts/jquery-1.9.1.min.js", function () {jQuery(document).delegate("a", "click", function () {return Ad_Click(jQuery(this).get(0));});jQuery(".slidebox:first").find("a").each(function () {var _this = jQuery(this), itemid = _this.attr("itemid");try { AdCount(adid, itemid, "show") } catch (e) { }});LoadRes(_thisProtocol+"//static.5211game.com/advSysFiles/AdScripts/slides.js", function () {jQuery(".slidebox:first").KinSlideshow({ isHasTitleFont: false, isHasTitleBar: false, mouseEvent: "mouseover", btn: { btn_bgColor: "#FFFFFF", btn_bgHoverColor: "#1072aa", btn_fontColor: "#000000", btn_fontHoverColor: "#FFFFFF", btn_borderColor: "#cccccc", btn_borderHoverColor: "#1188c0", btn_borderWidth: 0} });});});</script></body></html>';
        a = c.join("")
    }
    a = this.Replace(a, b);
    try {
        var m = h.document;
        m.open();
        m.write(a);
        m.close()
    } catch (n) { }
};
YYAD.Replace = function (f, b) {
    f = f.replace(/\/\*width\*\//ig, b.width + "px");
    f = f.replace(/\/\*height\*\//ig, b.height + "px");
    f = f.replace(/\/\*script\*\//ig, this.fnstr);
    return f = f.replace(/\{adid\}/ig, b.id)
};
YYAD.AdClose = function (f) {
    try {
        var b = document.getElementById(f);
        b.parentNode.removeChild(b)
    } catch (e) { }
};
YYAD.RequestKV = function (f) {
    var b = location.search.toLowerCase(),
        e = {};
    if (-1 != b.indexOf("?"))
        for (var b = b.substr(1).split("&"), c = 0; c < b.length; c++) {
            var h = b[c].indexOf("="),
                d = -1 != h ? b[c].substr(0, h) : b[c],
                h = -1 != h ? b[c].substr(h + 1) : "";
            e[d] = h
        }
    return void 0 == e[f] ? "" : e[f]
};



export{
    YYAD
}