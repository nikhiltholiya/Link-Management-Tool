/*! smooth-scroll v16.1.3 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!(function (e, t) {
    "function" == typeof define && define.amd
        ? define([], function () {
              return t(e);
          })
        : "object" == typeof exports
        ? (module.exports = t(e))
        : (e.SmoothScroll = t(e));
})(
    "undefined" != typeof global
        ? global
        : "undefined" != typeof window
        ? window
        : this,
    function (C) {
        "use strict";
        var w = {
                ignore: "[data-scroll-ignore]",
                header: null,
                topOnEmptyHash: !0,
                speed: 500,
                speedAsDuration: !1,
                durationMax: null,
                durationMin: null,
                clip: !0,
                offset: 0,
                easing: "easeInOutCubic",
                customEasing: null,
                updateURL: !0,
                popstate: !0,
                emitEvents: !0,
            },
            L = function () {
                var n = {};
                return (
                    Array.prototype.forEach.call(arguments, function (e) {
                        for (var t in e) {
                            if (!e.hasOwnProperty(t)) return;
                            n[t] = e[t];
                        }
                    }),
                    n
                );
            },
            r = function (e) {
                "#" === e.charAt(0) && (e = e.substr(1));
                for (
                    var t,
                        n = String(e),
                        o = n.length,
                        a = -1,
                        r = "",
                        i = n.charCodeAt(0);
                    ++a < o;

                ) {
                    if (0 === (t = n.charCodeAt(a)))
                        throw new InvalidCharacterError(
                            "Invalid character: the input contains U+0000."
                        );
                    (1 <= t && t <= 31) ||
                    127 == t ||
                    (0 === a && 48 <= t && t <= 57) ||
                    (1 === a && 48 <= t && t <= 57 && 45 === i)
                        ? (r += "\\" + t.toString(16) + " ")
                        : (r +=
                              128 <= t ||
                              45 === t ||
                              95 === t ||
                              (48 <= t && t <= 57) ||
                              (65 <= t && t <= 90) ||
                              (97 <= t && t <= 122)
                                  ? n.charAt(a)
                                  : "\\" + n.charAt(a));
                }
                return "#" + r;
            },
            H = function () {
                return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                );
            },
            q = function (e) {
                return e
                    ? ((t = e),
                      parseInt(C.getComputedStyle(t).height, 10) + e.offsetTop)
                    : 0;
                var t;
            },
            x = function (e, t, n) {
                0 === e && document.body.focus(),
                    n ||
                        (e.focus(),
                        document.activeElement !== e &&
                            (e.setAttribute("tabindex", "-1"),
                            e.focus(),
                            (e.style.outline = "none")),
                        C.scrollTo(0, t));
            },
            Q = function (e, t, n, o) {
                if (t.emitEvents && "function" == typeof C.CustomEvent) {
                    var a = new CustomEvent(e, {
                        bubbles: !0,
                        detail: { anchor: n, toggle: o },
                    });
                    document.dispatchEvent(a);
                }
            };
        return function (o, e) {
            var O,
                a,
                I,
                M,
                A = {};
            (A.cancelScroll = function (e) {
                cancelAnimationFrame(M), (M = null), e || Q("scrollCancel", O);
            }),
                (A.animateScroll = function (a, r, e) {
                    A.cancelScroll();
                    var i = L(O || w, e || {}),
                        s =
                            "[object Number]" ===
                            Object.prototype.toString.call(a),
                        t = s || !a.tagName ? null : a;
                    if (s || t) {
                        var c = C.pageYOffset;
                        i.header &&
                            !I &&
                            (I = document.querySelector(i.header));
                        var n,
                            o,
                            u,
                            l,
                            d,
                            f,
                            m,
                            h,
                            p = q(I),
                            g = s
                                ? a
                                : (function (e, t, n, o) {
                                      var a = 0;
                                      if (e.offsetParent)
                                          for (
                                              ;
                                              (a += e.offsetTop),
                                                  (e = e.offsetParent);

                                          );
                                      return (
                                          (a = Math.max(a - t - n, 0)),
                                          o &&
                                              (a = Math.min(
                                                  a,
                                                  H() - C.innerHeight
                                              )),
                                          a
                                      );
                                  })(
                                      t,
                                      p,
                                      parseInt(
                                          "function" == typeof i.offset
                                              ? i.offset(a, r)
                                              : i.offset,
                                          10
                                      ),
                                      i.clip
                                  ),
                            y = g - c,
                            v = H(),
                            S = 0,
                            E =
                                ((n = y),
                                (u = (o = i).speedAsDuration
                                    ? o.speed
                                    : Math.abs((n / 1e3) * o.speed)),
                                o.durationMax && u > o.durationMax
                                    ? o.durationMax
                                    : o.durationMin && u < o.durationMin
                                    ? o.durationMin
                                    : parseInt(u, 10)),
                            b = function (e) {
                                var t, n, o;
                                l || (l = e),
                                    (S += e - l),
                                    (f =
                                        c +
                                        y *
                                            ((n = d =
                                                1 < (d = 0 === E ? 0 : S / E)
                                                    ? 1
                                                    : d),
                                            "easeInQuad" === (t = i).easing &&
                                                (o = n * n),
                                            "easeOutQuad" === t.easing &&
                                                (o = n * (2 - n)),
                                            "easeInOutQuad" === t.easing &&
                                                (o =
                                                    n < 0.5
                                                        ? 2 * n * n
                                                        : (4 - 2 * n) * n - 1),
                                            "easeInCubic" === t.easing &&
                                                (o = n * n * n),
                                            "easeOutCubic" === t.easing &&
                                                (o = --n * n * n + 1),
                                            "easeInOutCubic" === t.easing &&
                                                (o =
                                                    n < 0.5
                                                        ? 4 * n * n * n
                                                        : (n - 1) *
                                                              (2 * n - 2) *
                                                              (2 * n - 2) +
                                                          1),
                                            "easeInQuart" === t.easing &&
                                                (o = n * n * n * n),
                                            "easeOutQuart" === t.easing &&
                                                (o = 1 - --n * n * n * n),
                                            "easeInOutQuart" === t.easing &&
                                                (o =
                                                    n < 0.5
                                                        ? 8 * n * n * n * n
                                                        : 1 -
                                                          8 * --n * n * n * n),
                                            "easeInQuint" === t.easing &&
                                                (o = n * n * n * n * n),
                                            "easeOutQuint" === t.easing &&
                                                (o = 1 + --n * n * n * n * n),
                                            "easeInOutQuint" === t.easing &&
                                                (o =
                                                    n < 0.5
                                                        ? 16 * n * n * n * n * n
                                                        : 1 +
                                                          16 *
                                                              --n *
                                                              n *
                                                              n *
                                                              n *
                                                              n),
                                            t.customEasing &&
                                                (o = t.customEasing(n)),
                                            o || n)),
                                    C.scrollTo(0, Math.floor(f)),
                                    (function (e, t) {
                                        var n = C.pageYOffset;
                                        if (
                                            e == t ||
                                            n == t ||
                                            (c < t && C.innerHeight + n) >= v
                                        )
                                            return (
                                                A.cancelScroll(!0),
                                                x(a, t, s),
                                                Q("scrollStop", i, a, r),
                                                !(M = l = null)
                                            );
                                    })(f, g) ||
                                        ((M = C.requestAnimationFrame(b)),
                                        (l = e));
                            };
                        0 === C.pageYOffset && C.scrollTo(0, 0),
                            (m = a),
                            (h = i),
                            s ||
                                (history.pushState &&
                                    h.updateURL &&
                                    history.pushState(
                                        {
                                            smoothScroll: JSON.stringify(h),
                                            anchor: m.id,
                                        },
                                        document.title,
                                        m === document.documentElement
                                            ? "#top"
                                            : "#" + m.id
                                    )),
                            "matchMedia" in C &&
                            C.matchMedia("(prefers-reduced-motion)").matches
                                ? x(a, Math.floor(g), !1)
                                : (Q("scrollStart", i, a, r),
                                  A.cancelScroll(!0),
                                  C.requestAnimationFrame(b));
                    }
                });
            var t = function (e) {
                    if (
                        !e.defaultPrevented &&
                        !(
                            0 !== e.button ||
                            e.metaKey ||
                            e.ctrlKey ||
                            e.shiftKey
                        ) &&
                        "closest" in e.target &&
                        (a = e.target.closest(o)) &&
                        "a" === a.tagName.toLowerCase() &&
                        !e.target.closest(O.ignore) &&
                        a.hostname === C.location.hostname &&
                        a.pathname === C.location.pathname &&
                        /#/.test(a.href)
                    ) {
                        var t, n;
                        try {
                            t = r(decodeURIComponent(a.hash));
                        } catch (e) {
                            t = r(a.hash);
                        }
                        if ("#" === t) {
                            if (!O.topOnEmptyHash) return;
                            n = document.documentElement;
                        } else n = document.querySelector(t);
                        (n =
                            n || "#top" !== t ? n : document.documentElement) &&
                            (e.preventDefault(),
                            (function (e) {
                                if (
                                    history.replaceState &&
                                    e.updateURL &&
                                    !history.state
                                ) {
                                    var t = C.location.hash;
                                    (t = t || ""),
                                        history.replaceState(
                                            {
                                                smoothScroll: JSON.stringify(e),
                                                anchor: t || C.pageYOffset,
                                            },
                                            document.title,
                                            t || C.location.href
                                        );
                                }
                            })(O),
                            A.animateScroll(n, a));
                    }
                },
                n = function (e) {
                    if (
                        null !== history.state &&
                        history.state.smoothScroll &&
                        history.state.smoothScroll === JSON.stringify(O)
                    ) {
                        var t = history.state.anchor;
                        ("string" == typeof t &&
                            t &&
                            !(t = document.querySelector(
                                r(history.state.anchor)
                            ))) ||
                            A.animateScroll(t, null, { updateURL: !1 });
                    }
                };
            A.destroy = function () {
                O &&
                    (document.removeEventListener("click", t, !1),
                    C.removeEventListener("popstate", n, !1),
                    A.cancelScroll(),
                    (M = I = a = O = null));
            };
            return (
                (function () {
                    if (
                        !(
                            "querySelector" in document &&
                            "addEventListener" in C &&
                            "requestAnimationFrame" in C &&
                            "closest" in C.Element.prototype
                        )
                    )
                        throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    A.destroy(),
                        (O = L(w, e || {})),
                        (I = O.header
                            ? document.querySelector(O.header)
                            : null),
                        document.addEventListener("click", t, !1),
                        O.updateURL &&
                            O.popstate &&
                            C.addEventListener("popstate", n, !1);
                })(),
                A
            );
        };
    }
);
