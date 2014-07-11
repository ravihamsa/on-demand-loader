(function () {
    function v() {
        if (h) {
            (new Date).getTime();
            var a = l(h, ".flipper");
            q(l(b, ".shadow.one"));
            q(l(b, ".shadow.two"));
            setTimeout(function () {
                h.style[m] = "translate3d(0, -" + k + "px," + r + "px) scale(1)";
                setTimeout(function () {
                    a.style[m] = "rotateY(-200deg)";
                    setTimeout(function () {a.style[m] = "rotateY(0deg)"}, 800)
                }, 1E3);
                f.style[w] = x
            }, 500)
        }
    }

    function n(a) {
        a += 1;
        a > y && (a = 0);
        return a
    }

    function s(a, c) {
        var b = {spid: "hw-P3YL4Q1JYRZ3eABld", src: "handwritten"};
        if (99 === a || 3 === a)for (var e in c)c.hasOwnProperty(e) && (b[e] = c[e]);
        else 8 === a && (b.cta = "exit", b.ctaid = "click", b.it = "1", b.as = "1.0.0");
        z(a, b)
    }

    var m = "-webkit-transform", w = "visibility", x = "visible", b = document, l = function (a, c) {
        c || (c = b);
        return c.querySelector(a)
    }, q = function (a) {a.style.display = "block"}, g = function (a) {return b.getElementById.call(b, a)}, h = null, k = 360, y, r = 3, A = [], d, p, B = document.body, t = g("fullview");
    g("header");
    var u = g("deck_wrapper"), f = g("bottomdeck");
    (function () {
        var a = g("datascript");
        a || (a = b.createElement.call(b, "script"), a.setAttribute("id", "datascript"), a.setAttribute("async",
            !0), document.body.appendChild(a));
        a.src = "http://heisenberg-server.wc1.inmobi.com/appdata?os=ios&usedSIds=" + A.join(",")
    })();
    (function () {
        var a = /cocaineId\=(.+)\&extraId\=extraValue/.exec(document.documentElement.innerHTML), b = "";
        a && 0 < a.length && (b = a[1]);
        return b
    })();
    window.im_3432_recordEvent = function (a, c) {
        var f = function (a, c, e) {
            if (!(0 >= e)) {
                g("im_3432_clickTarget");
                var d = b.createElement.call(b, "img");
                d.setAttribute("src", a);
                d.setAttribute("height", "0");
                d.setAttribute("width", "2");
                void 0 != d.addEventListener &&
                d.addEventListener("error", function () {
                    window.setTimeout(function () {
                        3E5 < c && (c = 3E5);
                        f(a, 2 * c, e - 1)
                    }, c + Math.random())
                }, !1)
            }
        }, e;
        e = "http://xyz.inmobi.com/1x1?m=" + a;
        if (c)for (var d in c)e += "&" + encodeURIComponent(d) + "=" + encodeURIComponent(c[d]);
        f(e, 1E3, 5)
    };
    var z = window.im_3432_recordEvent;
    s(1);
    (function () {
        t.style.display = "block";
        (new Date).getTime();
        s(18);
        p = window.innerWidth;
        d = window.innerHeight;
        320 <= p && 480 >= d ? (f.style.height = "330px", f.style.top = "330px", k = 330) : 568 === d ? (f.style.height = "400px", f.style.top = "400px",
            k = 400) : 640 === d && (bottomdeck.style.height = "480px", bottomdeck.style.top = "490px", k = 490);
        B.style.width = u.style.width = t.style.width = p + "px";
        u.style.height = d + "px";
        var a = parseInt(h.getAttribute("index"));
        v();
        (void 0)[n(a)].style.WebkitTransform = "translate3d(0, 0px," + r + "px) scale(.8)";
        (void 0)[n(n(a))].style.WebkitTransform = "translate3d(0, 0px,1px) scale(.8)"
    })()
})();