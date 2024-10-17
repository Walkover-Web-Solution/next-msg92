//!This code is part of the Services provided by FullStory, Inc. For license information, please refer to https://www.fullstory.com/legal/terms-and-conditions/
//!Portions of this code are licensed under the following license:
//!  For license information please see fs.js.LEGAL.txt
'use strict';
!(function () {
    var t = function (n, i) {
        return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function (t, n) {
                    t.__proto__ = n;
                }) ||
            function (t, n) {
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
            })(n, i);
    };
    function n(n, i) {
        if ('function' != typeof i && null !== i)
            throw new TypeError('Class extends value ' + String(i) + ' is not a constructor or null');
        function r() {
            this.constructor = n;
        }
        t(n, i), (n.prototype = null === i ? Object.create(i) : ((r.prototype = i.prototype), new r()));
    }
    var i = function () {
        return (
            (i =
                Object.assign ||
                function (t) {
                    for (var n, i = 1, r = arguments.length; i < r; i++)
                        for (var e in (n = arguments[i])) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
                    return t;
                }),
            i.apply(this, arguments)
        );
    };
    function r(t, n, i, r) {
        return new (i || (i = Promise))(function (e, s) {
            function u(t) {
                try {
                    a(r.next(t));
                } catch (t) {
                    s(t);
                }
            }
            function o(t) {
                try {
                    a(r['throw'](t));
                } catch (t) {
                    s(t);
                }
            }
            function a(t) {
                var n;
                t.done
                    ? e(t.value)
                    : ((n = t.value),
                      n instanceof i
                          ? n
                          : new i(function (t) {
                                t(n);
                            })).then(u, o);
            }
            a((r = r.apply(t, n || [])).next());
        });
    }
    function e(t, n) {
        var i,
            r,
            e,
            s,
            u = {
                label: 0,
                sent: function () {
                    if (1 & e[0]) throw e[1];
                    return e[1];
                },
                trys: [],
                ops: [],
            };
        return (
            (s = { next: o(0), 'throw': o(1), 'return': o(2) }),
            'function' == typeof Symbol &&
                (s[Symbol.iterator] = function () {
                    return this;
                }),
            s
        );
        function o(o) {
            return function (a) {
                return (function (o) {
                    if (i) throw new TypeError('Generator is already executing.');
                    for (; s && ((s = 0), o[0] && (u = 0)), u; )
                        try {
                            if (
                                ((i = 1),
                                r &&
                                    (e =
                                        2 & o[0]
                                            ? r['return']
                                            : o[0]
                                              ? r['throw'] || ((e = r['return']) && e.call(r), 0)
                                              : r.next) &&
                                    !(e = e.call(r, o[1])).done)
                            )
                                return e;
                            switch (((r = 0), e && (o = [2 & o[0], e.value]), o[0])) {
                                case 0:
                                case 1:
                                    e = o;
                                    break;
                                case 4:
                                    return u.label++, { value: o[1], done: !1 };
                                case 5:
                                    u.label++, (r = o[1]), (o = [0]);
                                    continue;
                                case 7:
                                    (o = u.ops.pop()), u.trys.pop();
                                    continue;
                                default:
                                    if (
                                        !(
                                            (e = (e = u.trys).length > 0 && e[e.length - 1]) ||
                                            (6 !== o[0] && 2 !== o[0])
                                        )
                                    ) {
                                        u = 0;
                                        continue;
                                    }
                                    if (3 === o[0] && (!e || (o[1] > e[0] && o[1] < e[3]))) {
                                        u.label = o[1];
                                        break;
                                    }
                                    if (6 === o[0] && u.label < e[1]) {
                                        (u.label = e[1]), (e = o);
                                        break;
                                    }
                                    if (e && u.label < e[2]) {
                                        (u.label = e[2]), u.ops.push(o);
                                        break;
                                    }
                                    e[2] && u.ops.pop(), u.trys.pop();
                                    continue;
                            }
                            o = n.call(t, u);
                        } catch (t) {
                            (o = [6, t]), (r = 0);
                        } finally {
                            i = e = 0;
                        }
                    if (5 & o[0]) throw o[1];
                    return { value: o[0] ? o[1] : void 0, done: !0 };
                })([o, a]);
            };
        }
    }
    function s(t, n, i) {
        if (i || 2 === arguments.length)
            for (var r, e = 0, s = n.length; e < s; e++)
                (!r && e in n) || (r || (r = Array.prototype.slice.call(n, 0, e)), (r[e] = n[e]));
        return t.concat(r || Array.prototype.slice.call(n));
    }
    var u = (function () {
        function t(t, n, i) {
            void 0 === n && (n = function () {}),
                void 0 === i && (i = !1),
                (this.t = t),
                (this.i = n),
                (this.o = i),
                (this._cookies = {}),
                (this._cookies = Nr(this.t));
        }
        return (
            (t.prototype.setDomain = function (t) {
                this.v = t;
            }),
            (t.prototype.getValue = function (t, n) {
                return this.S(t, n);
            }),
            (t.prototype.setValue = function (t, n, i, r) {
                var e = this;
                if (null != this.v && !this.o) {
                    var s = [];
                    this.k(
                        t,
                        r,
                        n,
                        function () {
                            return e._(t, r, n, i);
                        },
                        s
                    ),
                        s.length > 0 && this.i(s);
                }
            }),
            (t.prototype.setCookie = function (t, n, i) {
                this._setCookie(t, n, i);
            }),
            Object.defineProperty(t.prototype, 'cookies', {
                get: function () {
                    return this._cookies;
                },
                enumerable: !1,
                configurable: !0,
            }),
            (t.prototype.clearCookie = function (t, n) {
                this._cookies[t] &&
                    ((this.t.cookie = o(this.v, t, '', 'Thu, 01 Jan 1970 00:00:01 GMT')), delete this._cookies[t]);
                try {
                    delete localStorage[null != n ? n : t];
                } catch (t) {}
            }),
            (t.prototype._setCookie = function (t, n, i) {
                try {
                    if (((this.t.cookie = o(this.v, t, n, i)), this.t.cookie && this.t.cookie.indexOf(n) > -1)) return;
                    this.t.cookie = o(this.v, t, n, i, 'None');
                } finally {
                    this._cookies = Nr(this.t);
                }
            }),
            (t.prototype._ = function (t, n, i, r) {
                this._setCookie(t, i, r),
                    (function (t, n) {
                        try {
                            localStorage[t] = n;
                        } catch (t) {}
                    })(null != n ? n : t, i);
            }),
            (t.prototype.S = function (t, n) {
                var i,
                    r = this._cookies[t];
                try {
                    i = localStorage[null != n ? n : t];
                } catch (t) {}
                return { cookieValue: r, localStorageValue: i };
            }),
            (t.prototype.k = function (t, n, i, r, e, s) {
                void 0 === s && (s = 3), r();
                for (var u = !1, o = !1, a = 1; a < s; a++) {
                    var c = this.S(t, n),
                        h = c.cookieValue;
                    if (((o = c.localStorageValue === i), (u = h === i) && o)) return !0;
                    if (u) break;
                    r();
                }
                return u || e.push([t, 'cookie', i]), o || e.push([null != n ? n : t, 'localStorage', i]), !1;
            }),
            t
        );
    })();
    function o(t, n, i, r, e) {
        void 0 === e && (e = 'Strict');
        var s = ''.concat(n, '=').concat(i),
            u = (function (t) {
                if (t) return '.'.concat(encodeURIComponent(t));
            })(t);
        return (
            u && (s += '; domain='.concat(u)),
            r && (s += '; Expires='.concat(r)),
            (s += '; path=/; SameSite='.concat(e)),
            'https:' === location.protocol && (s += '; Secure'),
            s
        );
    }
    function a(t, n, i, r) {
        var e = i(t),
            s = i(n);
        return e ? (s ? r(e, s) : e) : s;
    }
    var c = navigator.userAgent,
        h = c.indexOf('MSIE ') > -1 || c.indexOf('Trident/') > -1,
        f = (h && c.indexOf('Trident/5'), h && c.indexOf('Trident/6'), h && c.indexOf('rv:11') > -1),
        v = c.indexOf('Edge/') > -1,
        l = c.indexOf('Opera/') > -1,
        d = (c.indexOf('CriOS'), c.indexOf('Snapchat') > -1),
        p = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        w = /^((?!chrome|android).)*(safari)/i.test(window.navigator.userAgent),
        g = p || w;
    function m() {
        var t = window.navigator.userAgent.match(/Version\/(\d+)/);
        return t && t[1] ? parseInt(t[1], 10) : -1;
    }
    function y(t) {
        if (!g) return !1;
        var n = m();
        return n >= 0 && n === t;
    }
    function b(t) {
        if (!g) return !1;
        var n = m();
        return n >= 0 && n < t;
    }
    var S = y(9),
        k = (y(10), b(8));
    function _(t, n) {
        for (
            var i =
                    0 === n.indexOf('on')
                        ? function (t) {
                              return 'on'.concat(t).concat(n.slice(2));
                          }
                        : function (t) {
                              return ''.concat(t).concat(n.charAt(0).toUpperCase()).concat(n.slice(1));
                          },
                r = 0,
                e = [
                    function () {
                        return n;
                    },
                    function () {
                        return i('webkit');
                    },
                    function () {
                        return i('moz');
                    },
                    function () {
                        return i('ms');
                    },
                ];
            r < e.length;
            r++
        ) {
            var s = (0, e[r])();
            if (s in t) return s;
        }
        return n;
    }
    function A(t) {}
    b(10), b(12);
    var I,
        E,
        T,
        C,
        x =
            ((E = (I = window.navigator).vendor),
            (T = void 0 !== window.opr),
            (C = I.userAgent.indexOf('Edge') > -1),
            !!I.userAgent.match('CriOS') || ('Google Inc.' === E && !T && !C)),
        K = /Firefox/.test(window.navigator.userAgent);
    function R(t) {
        if (!K) return !1;
        var n = window.navigator.userAgent.match(/Firefox\/(\d+)/);
        return !(!n || !n[1]) && parseInt(n[1], 10) < t;
    }
    function M(t) {
        if (!x) return !1;
        var n = window.navigator.userAgent.match(/Chrome\/(\d+)/);
        return !(!n || !n[1]) && parseInt(n[1], 10) < t;
    }
    var O,
        j,
        P,
        U,
        N,
        L = R(28),
        D = (R(27), M(23), M(38), M(57), M(60), '_fs_loaded'),
        F = '_fs_namespace',
        B = 'FS';
    function W(t) {
        if (O) return O;
        var n = H(t);
        return n || (n = t[F]) ? ((O = n), n) : (O = B);
    }
    function H(t) {
        return t[D];
    }
    function z(t) {
        return t[W(t)];
    }
    function q(t) {
        return 'localhost' == t || '127.0.0.1' == t;
    }
    ((P = j || (j = {})).Consent = 'consent'),
        (P.Log = 'log'),
        (P.Record = 'rec'),
        ((N = U || (U = {})).Event = 'event'),
        (N.Page = 'page'),
        (N.Vars = 'setVars'),
        (N.User = 'user');
    var $ = /^([^.]+\.)*(fullstory|onfire).[^.]+(\/|$)/;
    function V(t) {
        return Q(t, 'edge');
    }
    var G = ['rs', 'rs-2', 'edge', 'www', 'app'];
    function Q(t) {
        for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
        if (!t) return t;
        if (!$.test(t)) return t;
        if (
            n.some(function (n) {
                return 0 === t.lastIndexOf(''.concat(n, '.'), 0);
            })
        )
            return t;
        for (var r = n[0], e = 0, s = G; e < s.length; e++) {
            var u = s[e];
            if (0 === t.lastIndexOf(''.concat(u, '.'), 0))
                return ''.concat(r, '.').concat(t.slice(''.concat(u, '.').length));
        }
        return ''.concat(r, '.').concat(t);
    }
    function X(t) {
        return $.test(t);
    }
    function Y(t, n, i) {
        void 0 === i && (i = 'string');
        var r = t[n];
        if (typeof r === i) return r;
    }
    function J(t) {
        return Y(t, '_fs_script') || wt(dt(t));
    }
    function Z(t) {
        var n;
        return null !== (n = Y(t, '_fs_rec_settings_host')) && void 0 !== n ? n : V(dt(t));
    }
    function tt(t) {
        return Y(t, '_fs_rec_host') || Q(dt(t), 'rs', 'rs-2');
    }
    function nt(t) {
        return Y(t, '_fs_app_host') || pt(dt(t));
    }
    function it(t) {
        return Y(t, '_fs_ext_org') || Y(t, '_fs_org');
    }
    function rt(t) {
        var n = Y(t, '_fs_capture_on_startup', 'boolean'),
            i = Y(t, '_fs_capture_on_start', 'boolean');
        return void 0 === n ? void 0 === i || !i : n;
    }
    function et(t) {
        return !!Y(t, '_fs_is_outer_script', 'boolean');
    }
    function st(t) {
        return Y(t, '_fs_transport', 'object');
    }
    function ut(t) {
        return !!Y(t, '_fs_use_mock_protocol', 'boolean');
    }
    function ot(t) {
        return !!Y(t, '_fs_use_polyfilled_apis', 'boolean');
    }
    function at(t) {
        return Y(t, '_fs_settings', 'object');
    }
    function ct(t) {
        return Y(t, '_fs_is_wayfinder', 'boolean');
    }
    function ht(t) {
        return Y(t, '_fs_disable_resume', 'boolean');
    }
    function ft(t) {
        var n = z(t);
        if (!n) return [];
        var i = n.q;
        return i ? (delete n.q, i) : [];
    }
    function vt(t, n) {
        var i = z(t);
        if (i) {
            var r = i.q;
            r || (r = i.q = []), r.push(n);
        }
    }
    function lt(t) {
        var n = z(t);
        return (null == n ? void 0 : n._v) || 'unknown';
    }
    function dt(t) {
        var n = Y(t, '_fs_ext_host') || Y(t, '_fs_host');
        if (n) {
            var i = (function (t) {
                var n,
                    i,
                    r =
                        null !== (i = null === (n = it(t)) || void 0 === n ? void 0 : n.split('-')) && void 0 !== i
                            ? i
                            : [];
                if (!(r.length < 3)) {
                    var e = r[0],
                        s = r[r.length - 1];
                    if (!('na1' === s || e.length > 1)) return s;
                }
            })(t);
            if (!i || !X(n)) return n;
            var r = '';
            return (
                0 === n.indexOf('www.') && ((n = n.slice(4)), (r = 'www.')),
                0 === n.indexOf(''.concat(i, '.')) && (n = n.slice(''.concat(i, '.').length)),
                ''.concat(r).concat(i, '.').concat(n)
            );
        }
    }
    function pt(t) {
        return t
            ? q(
                  (function (t) {
                      var n = t,
                          i = n.indexOf(':');
                      return i >= 0 && (n = n.slice(0, i)), n;
                  })(t)
              )
                ? t
                : 0 == t.indexOf('www.')
                  ? 'app.'.concat(t.slice(4))
                  : 'app.'.concat(t)
            : t;
    }
    function wt(t) {
        var n = V(t);
        if (n) return ''.concat(n, '/s/fs.js');
    }
    function gt(t, n) {
        var i;
        if ((void 0 === n && (n = 0), !t)) return !1;
        try {
            t.call(function () {});
        } catch (t) {
            return !1;
        }
        var r = function (t) {
                try {
                    return void t.call(null);
                } catch (t) {
                    return (t.stack || '').replace(/__fs_nomangle_check_stack(.|\n)*$/, '');
                }
            },
            e = void 0;
        0 !== n &&
            'number' == typeof Error.stackTraceLimit &&
            ((e = Error.stackTraceLimit), (Error.stackTraceLimit = Number.POSITIVE_INFINITY));
        var s = [
                function () {
                    throw new Error('');
                },
                t,
            ],
            u = (function __fs_nomangle_check_stack() {
                return s.map(r);
            })(),
            o = u[0],
            a = u[1];
        if ((void 0 !== e && (Error.stackTraceLimit = e), !o || !a)) return !1;
        for (var c = '\n'.charCodeAt(0), h = o.length > a.length ? a.length : o.length, f = 1, v = f; v < h; v++) {
            var l = o.charCodeAt(o.length - v),
                d = a.charCodeAt(a.length - v);
            if (l != d) break;
            (d != c && v != h - 1) || (f = v);
        }
        return (
            (null !== (i = a.slice(0, a.length - f + 1).match(/\.js:\d+([:)]|$)/gm)) && void 0 !== i ? i : []).length <=
            n
        );
    }
    var mt = '[native code]';
    function yt(t, n) {
        try {
            return t.call(n).indexOf(mt) >= 0;
        } catch (t) {
            return !1;
        }
    }
    function bt(t) {
        return (function (t) {
            if (!Xi(t)) return !1;
            try {
                return yt(Function.prototype.toString, t);
            } catch (t) {
                return !1;
            }
        })(t.constructor);
    }
    var St = '__zone_symbol__OriginalDelegate',
        kt = [St, 'nr@original'];
    function _t(t, n) {
        return At(t, n)[0];
    }
    function At(t, n, i) {
        void 0 === i && (i = !1);
        var r = [];
        if (!n) return [void 0, r];
        for (var e = 0, s = kt; e < s.length; e++) {
            var u = n[s[e]];
            if ((Xi(u) || (i && Ji(u))) && (r.push(u), yt(t, u))) return [u, r];
        }
        return yt(t, n) ? [n, r] : [void 0, r];
    }
    function It(t, n, i) {
        if ('arrayIsArray' === i) {
            var r = _t(t, n.objectToString);
            if (!r) return;
            return (
                (n.objectToString = r),
                function (t) {
                    return '[object Array]' == r.call(t);
                }
            );
        }
    }
    var Et,
        Tt,
        Ct = (function (t) {
            var n, i;
            void 0 === t && (t = window);
            try {
                if (((n = null == (i = t.MutationObserver) ? void 0 : i.prototype.constructor), ot(t))) return i;
                var r = S,
                    e = At(Function.prototype.toString, n, r),
                    s = e[0],
                    u = e[1];
                if (s) return s;
                var o = At(Function.prototype.toString, i, r),
                    a = o[0],
                    c = o[1];
                return a || (S || L || 0 !== u.length || 0 !== c.length || Su('fallback MO'), u[0] || c[0] || n || i);
            } catch (t) {
                return n || i || void 0;
            }
        })();
    ((Tt = Et || (Et = {}))[(Tt.Unknown = 0)] = 'Unknown'),
        (Tt[(Tt.Clean = 1)] = 'Clean'),
        (Tt[(Tt.Mixed = 2)] = 'Mixed'),
        (Tt[(Tt.UnrecoverableFailure = 3)] = 'UnrecoverableFailure');
    var xt = new ((function () {
        function t(t) {
            this.rebuildFromSnapshot(t);
        }
        return (
            (t.prototype.rebuildFromSnapshot = function (t) {
                var n = this.snapshot;
                if (((this.snapshot = t), !n || n.functions !== t.functions)) {
                    var i = t.functions;
                    (this.arrayIsArray = i.arrayIsArray),
                        (this.clearWindowInterval = Rt(i.clearWindowInterval)),
                        (this.clearWindowTimeout = Rt(i.clearWindowTimeout)),
                        (this.dateGetTime = Rt(i.dateGetTime)),
                        (this.dateNow = i.dateNow),
                        (this.docFragQuerySelectorAll = Rt(i.docFragQuerySelectorAll)),
                        (this.docQuerySelectorAll = Rt(i.docQuerySelectorAll)),
                        (this.elMatches = Rt(i.elMatches)),
                        (this.elQuerySelectorAll = Rt(i.elQuerySelectorAll)),
                        (this.jsonParse = i.jsonParse),
                        (this.jsonStringify = i.jsonStringify),
                        (this.matchMedia = Mt(i.matchMedia)),
                        (this.mathAbs = i.mathAbs),
                        (this.mathFloor = i.mathFloor),
                        (this.mathMax = i.mathMax),
                        (this.mathMin = i.mathMin),
                        (this.mathPow = i.mathPow),
                        (this.mathRandom = i.mathRandom),
                        (this.mathRound = i.mathRound),
                        (this.objectHasOwnProp = Rt(i.objectHasOwnProp)),
                        (this.objectKeys = i.objectKeys),
                        (this.objectValues = i.objectValues || null),
                        (this.requestWindowAnimationFrame = Mt(i.requestWindowAnimationFrame)),
                        (this.requestWindowIdleCallback = Mt(i.requestWindowIdleCallback)),
                        (this.setWindowInterval = Rt(i.setWindowInterval)),
                        (this.setWindowTimeout = Rt(i.setWindowTimeout)),
                        (this.inputGetValue = Mt(i.inputGetValue)),
                        (this.mutationObserve = Mt(i.mutationObserve)),
                        (this.mutationDisconnect = Mt(i.mutationDisconnect)),
                        (this.snapshot.dirty = t.dirty);
                }
            }),
            t
        );
    })())(Kt(window));
    function Kt(t, n) {
        void 0 === n && (n = Et.Unknown);
        var i = n,
            r = [],
            e = function (t) {
                return (
                    (i = Et.UnrecoverableFailure),
                    r.push('Snapshot failed: '.concat(t)),
                    function () {
                        throw new Error('Invoked failed snapshot');
                    }
                );
            },
            s = function (t) {
                try {
                    return t();
                } catch (t) {
                    return e(t.message);
                }
            },
            u = function (t) {
                try {
                    return t() || e('snapshot not found');
                } catch (t) {
                    return e(t.message);
                }
            },
            o = {
                arrayIsArray: s(function () {
                    return t.Array.isArray;
                }),
                clearWindowInterval: s(function () {
                    return t.clearInterval;
                }),
                clearWindowTimeout: s(function () {
                    return t.clearTimeout;
                }),
                dateGetTime: s(function () {
                    return t.Date.prototype.getTime;
                }),
                dateNow: s(function () {
                    return t.Date.now;
                }),
                docFragQuerySelectorAll: u(function () {
                    var n;
                    return null === (n = t.DocumentFragment) || void 0 === n ? void 0 : n.prototype.querySelectorAll;
                }),
                docQuerySelectorAll: u(function () {
                    var n;
                    return null !== (n = t.Document.prototype.querySelectorAll) && void 0 !== n
                        ? n
                        : t.document.querySelectorAll;
                }),
                elMatches: u(function () {
                    return Pt(t, Ot);
                }),
                elQuerySelectorAll: u(function () {
                    return Pt(t, jt);
                }),
                jsonParse: s(function () {
                    return t.JSON.parse;
                }),
                jsonStringify: s(function () {
                    return t.JSON.stringify;
                }),
                matchMedia: s(function () {
                    return t.matchMedia;
                }),
                mathAbs: s(function () {
                    return t.Math.abs;
                }),
                mathFloor: s(function () {
                    return t.Math.floor;
                }),
                mathMax: s(function () {
                    return t.Math.max;
                }),
                mathMin: s(function () {
                    return t.Math.min;
                }),
                mathPow: s(function () {
                    return t.Math.pow;
                }),
                mathRandom: s(function () {
                    return t.Math.random;
                }),
                mathRound: s(function () {
                    return t.Math.round;
                }),
                objectHasOwnProp: s(function () {
                    return t.Object.prototype.hasOwnProperty;
                }),
                objectKeys: s(function () {
                    return t.Object.keys;
                }),
                objectValues: s(function () {
                    return t.Object.values;
                }),
                requestWindowAnimationFrame: s(function () {
                    return t.requestAnimationFrame;
                }),
                requestWindowIdleCallback: s(function () {
                    return t.requestIdleCallback;
                }),
                setWindowInterval: s(function () {
                    return t.setInterval;
                }),
                setWindowTimeout: s(function () {
                    return t.setTimeout;
                }),
                mutationObserve: s(function () {
                    var n;
                    return null === (n = t.MutationObserver) || void 0 === n ? void 0 : n.prototype.observe;
                }),
                mutationDisconnect: s(function () {
                    var n;
                    return null === (n = t.MutationObserver) || void 0 === n ? void 0 : n.prototype.disconnect;
                }),
                inputGetValue: s(function () {
                    var n;
                    return (
                        t.HTMLInputElement &&
                        (null === (n = Object.getOwnPropertyDescriptor(t.HTMLInputElement.prototype, 'value')) ||
                        void 0 === n
                            ? void 0
                            : n.get)
                    );
                }),
            },
            a = {
                functionToString: s(function () {
                    return t.Function.prototype.toString;
                }),
                objectToString: s(function () {
                    return t.Object.prototype.toString;
                }),
            };
        return { status: i, functions: o, helpers: a, errors: r };
    }
    function Rt(t) {
        return function (n) {
            for (var i = [], r = 1; r < arguments.length; r++) i[r - 1] = arguments[r];
            return t.apply(n, i);
        };
    }
    function Mt(t) {
        return t ? Rt(t) : null;
    }
    function Ot(t) {
        return t.matches || t.webkitMatchesSelector || t.msMatchesSelector || t.mozMatchesSelector;
    }
    function jt(t) {
        return t.querySelectorAll;
    }
    function Pt(t, n) {
        var i,
            r,
            e = (null === (i = t.Element) || void 0 === i ? void 0 : i.prototype)
                ? n(null === (r = t.Element) || void 0 === r ? void 0 : r.prototype)
                : void 0,
            s = t.document ? t.document.documentElement : void 0;
        if ((!s || (e && s instanceof t.Element) || (e = n(s)), !e))
            throw new Error('Unable to find Element proto function');
        return e;
    }
    function Ut(t, n) {
        return function () {
            for (var i = [], r = 0; r < arguments.length; r++) i[r] = arguments[r];
            try {
                return t.apply(this, i);
            } catch (t) {
                try {
                    n && n(t);
                } catch (t) {}
            }
        };
    }
    var Nt,
        Lt,
        Dt = function () {},
        Ft = '_fs_weak_map_key',
        Bt = (function () {
            function t(t, n) {
                void 0 === n && (n = !1), (this.A = n), (this.I = new WeakMap(t));
            }
            return (
                (t.prototype.get = function (t) {
                    return this.A || !this.I.has(t) ? this.I.get(Wt(t)) : this.I.get(t);
                }),
                (t.prototype.set = function (t, n) {
                    if (!this.A)
                        try {
                            return this.I.set(t, n), this;
                        } catch (t) {}
                    return this.T(t, n);
                }),
                (t.prototype.T = function (t, n) {
                    return (t[Ft] = Wt(t)), this.I.set(t[Ft], n), this;
                }),
                (t.prototype['delete'] = function (t) {
                    return this.I['delete'](t) || this.I['delete'](Wt(t));
                }),
                (t.prototype.has = function (t) {
                    return this.I.has(t) || this.I.has(Wt(t));
                }),
                t
            );
        })();
    function Wt(t) {
        return Object.prototype.hasOwnProperty.call(t, Ft) ? t[Ft] : {};
    }
    function Ht(t) {
        var n;
        return (null === (n = t.childNodes) || void 0 === n ? void 0 : n.length) > 0;
    }
    function zt(t, n) {
        $t(t.childNodes, n);
    }
    function qt(t, n) {
        $t(t.childNodes, n, !0);
    }
    function $t(t, n, i) {
        void 0 === i && (i = !1);
        for (var r = i ? t.length - 1 : 0, e = i ? -1 : t.length; r !== e; ) {
            var s = t[r];
            if (s && 'frag' in s && !kr(s) && Array.isArray(s.frag)) s.frag.length && $t(s.childNodes, n, i);
            else if (n(s) === Nt.Exit) break;
            i ? --r : ++r;
        }
    }
    function Vt(t) {
        var n = t.nextSibling;
        return n && t.parentNode && n === t.parentNode.firstChild ? null : n;
    }
    function Gt(t) {
        var n = t.previousSibling;
        return n && t.parentNode && n === t.parentNode.lastChild ? null : n;
    }
    function Qt(t) {
        return t.parentNode;
    }
    function Xt(t) {
        return Ht(t) ? t.childNodes[0] : null;
    }
    ((Lt = Nt || (Nt = {})).ContinueProcessing = 0), (Lt.Exit = 1);
    var Yt = 1,
        Jt = 9,
        Zt = 4;
    function tn(t) {
        try {
            var n = (function (t) {
                var n,
                    i = null !== (n = t.ownerDocument) && void 0 !== n ? n : t;
                return i.nodeType === Jt ? i : document;
            })(t);
            yu(n.nodeType === Jt, 'unable to find document');
            var i = n.createTreeWalker(n, NodeFilter.SHOW_ALL, null, !1);
            return (i.currentNode = t), i;
        } catch (t) {
            return;
        }
    }
    function nn(t, n) {
        var i = tn(t);
        if (i) for (var r = i.firstChild(); r; ) n(r), (r = i.nextSibling());
    }
    function rn(t, n) {
        var i = tn(t);
        if (i) for (var r = i.lastChild(); r; ) n(r), (r = i.previousSibling());
    }
    function en(t) {
        var n = tn(t);
        return n ? n.nextSibling() : null;
    }
    function sn(t) {
        var n = tn(t);
        return n ? n.previousSibling() : null;
    }
    function un(t) {
        var n = tn(t);
        return n ? n.parentNode() : null;
    }
    function on(t) {
        var n = tn(t);
        return n ? n.firstChild() : null;
    }
    function an(t) {
        return !!on(t);
    }
    var cn,
        hn,
        fn,
        vn,
        ln,
        dn,
        pn,
        wn,
        gn,
        mn,
        yn,
        bn,
        Sn = !1;
    function kn(t) {
        return (Sn ? on : Xt)(t);
    }
    function _n(t, n) {
        return (Sn ? nn : zt)(t, n);
    }
    function An(t, n) {
        return (Sn ? rn : qt)(t, n);
    }
    function In(t) {
        return (Sn ? an : Ht)(t);
    }
    function En(t) {
        return (Sn ? en : Vt)(t);
    }
    function Tn(t) {
        return (Sn ? un : Qt)(t);
    }
    function Cn(t) {
        return (Sn ? sn : Gt)(t);
    }
    function xn(t) {
        var n = 'Internal error: unable to determine what JSON error was';
        try {
            n = (n = ''.concat(t)).replace(/[^a-zA-Z0-9.:!, ]/g, '_');
        } catch (t) {}
        return '"'.concat(n, '"');
    }
    ((hn = cn || (cn = {})).MUT_INSERT = 2),
        (hn.MUT_REMOVE = 3),
        (hn.MUT_ATTR = 4),
        (hn.MUT_TEXT = 6),
        (hn.MOUSEMOVE = 8),
        (hn.MOUSEMOVE_CURVE = 9),
        (hn.SCROLL_LAYOUT = 10),
        (hn.SCROLL_LAYOUT_CURVE = 11),
        (hn.MOUSEDOWN = 12),
        (hn.MOUSEUP = 13),
        (hn.CLICK = 16),
        (hn.FOCUS = 17),
        (hn.VALUECHANGE = 18),
        (hn.RESIZE_LAYOUT = 19),
        (hn.DOMLOADED = 20),
        (hn.LOAD = 21),
        (hn.PLACEHOLDER_SIZE = 22),
        (hn.UNLOAD = 23),
        (hn.BLUR = 24),
        (hn.SET_FRAME_BASE = 25),
        (hn.TOUCHSTART = 32),
        (hn.TOUCHEND = 33),
        (hn.TOUCHCANCEL = 34),
        (hn.TOUCHMOVE = 35),
        (hn.TOUCHMOVE_CURVE = 36),
        (hn.NAVIGATE = 37),
        (hn.PLAY = 38),
        (hn.PAUSE = 39),
        (hn.RESIZE_VISUAL = 40),
        (hn.RESIZE_VISUAL_CURVE = 41),
        (hn.RESIZE_DOCUMENT_CONTENT = 42),
        (hn.RESIZE_SCROLLABLE_ELEMENT_CONTENT = 43),
        (hn.LOG = 48),
        (hn.ERROR = 49),
        (hn.DBL_CLICK = 50),
        (hn.FORM_SUBMIT = 51),
        (hn.WINDOW_FOCUS = 52),
        (hn.WINDOW_BLUR = 53),
        (hn.HEARTBEAT = 54),
        (hn.WATCHED_ELEM = 56),
        (hn.PERF_ENTRY = 57),
        (hn.REC_FEAT_SUPPORTED = 58),
        (hn.SELECT = 59),
        (hn.CSSRULE_INSERT = 60),
        (hn.CSSRULE_DELETE = 61),
        (hn.FAIL_THROTTLED = 62),
        (hn.AJAX_REQUEST = 63),
        (hn.SCROLL_VISUAL_OFFSET = 64),
        (hn.SCROLL_VISUAL_OFFSET_CURVE = 65),
        (hn.MEDIA_QUERY_CHANGE = 66),
        (hn.RESOURCE_TIMING_BUFFER_FULL = 67),
        (hn.MUT_SHADOW = 68),
        (hn.DISABLE_STYLESHEET = 69),
        (hn.FULLSCREEN = 70),
        (hn.FULLSCREEN_ERROR = 71),
        (hn.ADOPTED_STYLESHEETS = 72),
        (hn.CUSTOM_ELEMENT_DEFINED = 73),
        (hn.MODAL_OPEN = 74),
        (hn.MODAL_CLOSE = 75),
        (hn.LONG_FRAME = 77),
        (hn.TIMING = 78),
        (hn.STORAGE_WRITE_FAILURE = 79),
        (hn.DOCUMENT_PROPERTIES = 80),
        (hn.ENTRY_NAVIGATE = 81),
        (hn.STATS = 82),
        (hn.VIEWPORT_INTERSECTION = 83),
        (hn.COPY = 84),
        (hn.PASTE = 85),
        (hn.URL_SALT = 86),
        (hn.URL_ID = 87),
        (hn.FRAME_STATUS = 88),
        (hn.SCRIPT_COMPILED_VERSION = 89),
        (hn.RESET_CSS_SHEET = 90),
        (hn.ANIMATION_CREATED = 91),
        (hn.ANIMATION_METHOD_CALLED = 92),
        (hn.ANIMATION_PROPERTY_SET = 93),
        (hn.DOCUMENT_TIMELINE_CREATED = 94),
        (hn.KEYFRAME_EFFECT_CREATED = 95),
        (hn.KEYFRAME_EFFECT_METHOD_CALLED = 96),
        (hn.KEYFRAME_EFFECT_PROPERTY_SET = 97),
        (hn.CAPTURE_SOURCE = 98),
        (hn.PAGE_DATA = 99),
        (hn.VISIBILITY_STATE = 100),
        (hn.DIALOG = 101),
        (hn.CSSRULE_UPDATE = 102),
        (hn.CANVAS = 103),
        (hn.CANVAS_DETACHED_DIMENSION = 104),
        (hn.INIT_API = 105),
        (hn.DEFERRED_RESOLVED = 106),
        (hn.DEFERRED_MUT_INSERT = 107),
        (hn.DEFERRED_MUT_SHADOW = 108),
        (hn.ELEMENT_PROP = 109),
        (hn.BFCACHE_STATE = 110),
        (hn.SESSION_INFO = 111),
        (hn.EVENT_CANCELED = 112),
        (hn.DIAGNOSTIC_INFO = 113),
        (hn.KEEP_ELEMENT = 2e3),
        (hn.KEEP_URL = 2001),
        (hn.KEEP_BOUNCE = 2002),
        (hn.KEEP_CRASH = 2003),
        (hn.SYS_SETVAR = 8193),
        (hn.SYS_RESOURCEHASH = 8195),
        (hn.SYS_SETCONSENT = 8196),
        (hn.SYS_CUSTOM = 8197),
        (hn.SYS_REPORTCONSENT = 8198),
        (hn.SYS_LETHE_MOBILE_BUNDLE_SEQ = 8199),
        ((vn = fn || (fn = {})).Animation = 0),
        (vn.CSSAnimation = 1),
        (vn.CSSTransition = 2),
        ((dn = ln || (ln = {})).Internal = 0),
        (dn.Public = 1),
        ((wn = pn || (pn = {})).Unknown = 0),
        (wn.Serialization = 1),
        ((mn = gn || (gn = {})).Unknown = 0),
        (mn.DomSnapshot = 1),
        (mn.NodeEncoding = 2),
        (mn.LzEncoding = 3),
        (mn.ApplyRules = 4),
        (mn.ProcessMut = 5),
        ((bn = yn || (yn = {})).Unknown = 0),
        (bn.Successful = 1),
        (bn.BlocklistedFrame = 2),
        (bn.PartiallyLoaded = 3),
        (bn.MissingWindowOrDocument = 4),
        (bn.MissingDocumentHead = 5),
        (bn.MissingBodyOrChildren = 6),
        (bn.AlreadyDefined = 7),
        (bn.NoNonScriptElement = 8),
        (bn.Exception = 9);
    var Kn,
        Rn,
        Mn,
        On,
        jn,
        Pn,
        Un,
        Nn,
        Ln,
        Dn,
        Fn,
        Bn,
        Wn,
        Hn,
        zn,
        qn,
        $n,
        Vn,
        Gn,
        Qn,
        Xn,
        Yn,
        Jn,
        Zn,
        ti,
        ni,
        ii,
        ri,
        ei,
        si,
        ui,
        oi,
        ai,
        ci,
        hi,
        fi,
        vi,
        li,
        di,
        pi,
        wi,
        gi,
        mi,
        yi,
        bi,
        Si,
        ki,
        _i,
        Ai,
        Ii,
        Ei = ['print', 'alert', 'confirm'];
    ((Rn = Kn || (Kn = {}))[(Rn.Unset = 0)] = 'Unset'),
        (Rn[(Rn.Entering = 1)] = 'Entering'),
        (Rn[(Rn.Restored = 2)] = 'Restored'),
        ((On = Mn || (Mn = {}))[(On.Index = 1)] = 'Index'),
        (On[(On.Cached = 2)] = 'Cached'),
        ((Pn = jn || (jn = {})).GrantConsent = !0),
        (Pn.RevokeConsent = !1),
        ((Nn = Un || (Un = {})).Page = 0),
        (Nn.Document = 1),
        ((Dn = Ln || (Ln = {})).Unknown = 0),
        (Dn.Api = 1),
        (Dn.FsShutdownFrame = 2),
        (Dn.Hibernation = 3),
        (Dn.Reidentify = 4),
        (Dn.SettingsBlocked = 5),
        (Dn.Size = 6),
        (Dn.Unload = 7),
        (Dn.Hidden = 8),
        ((Bn = Fn || (Fn = {})).Unknown = 0),
        (Bn.NotEmpty = 1),
        (Bn.EmptyBody = 2),
        ((Hn = Wn || (Wn = {}))[(Hn.UNSET = 0)] = 'UNSET'),
        (Hn[(Hn.OK = 1)] = 'OK'),
        (Hn[(Hn.ABORTED = 2)] = 'ABORTED'),
        (Hn[(Hn.OPAQUE = 3)] = 'OPAQUE'),
        (Hn[(Hn.ERROR = 4)] = 'ERROR'),
        ((qn = zn || (zn = {})).Timing = 0),
        (qn.Navigation = 1),
        (qn.Resource = 2),
        (qn.Paint = 3),
        (qn.Mark = 4),
        (qn.Measure = 5),
        (qn.Memory = 6),
        (qn.TimeOrigin = 7),
        (qn.LayoutShift = 8),
        (qn.FirstInput = 9),
        (qn.LargestContentfulPaint = 10),
        (qn.LongTask = 11),
        (qn.EventTiming = 12),
        (qn.EventTimingCount = 13),
        (qn.LongAnimationFrame = 14),
        (qn.ScriptTiming = 15),
        ((Vn = $n || ($n = {})).Timing = [
            'navigationStart',
            'unloadEventStart',
            'unloadEventEnd',
            'redirectStart',
            'redirectEnd',
            'fetchStart',
            'domainLookupStart',
            'domainLookupEnd',
            'connectStart',
            'connectEnd',
            'secureConnectionStart',
            'requestStart',
            'responseStart',
            'responseEnd',
            'domLoading',
            'domInteractive',
            'domContentLoadedEventStart',
            'domContentLoadedEventEnd',
            'domComplete',
            'loadEventStart',
            'loadEventEnd',
        ]),
        (Vn.Navigation = [
            'name',
            'startTime',
            'duration',
            'initiatorType',
            'redirectStart',
            'redirectEnd',
            'fetchStart',
            'domainLookupStart',
            'domainLookupEnd',
            'connectStart',
            'connectEnd',
            'secureConnectionStart',
            'requestStart',
            'responseStart',
            'responseEnd',
            'unloadEventStart',
            'unloadEventEnd',
            'domInteractive',
            'domContentLoadedEventStart',
            'domContentLoadedEventEnd',
            'domComplete',
            'loadEventStart',
            'loadEventEnd',
            'type',
            'redirectCount',
            'decodedBodySize',
            'encodedBodySize',
            'transferSize',
            'activationStart',
        ]),
        (Vn.Resource = [
            'name',
            'startTime',
            'duration',
            'initiatorType',
            'redirectStart',
            'redirectEnd',
            'fetchStart',
            'domainLookupStart',
            'domainLookupEnd',
            'connectStart',
            'connectEnd',
            'secureConnectionStart',
            'requestStart',
            'responseStart',
            'responseEnd',
            'decodedBodySize',
            'encodedBodySize',
            'transferSize',
        ]),
        (Vn.Measure = ['name', 'startTime', 'duration']),
        (Vn.LongAnimationFrame = [
            'name',
            'startTime',
            'duration',
            'renderStart',
            'styleAndLayoutStart',
            'blockingDuration',
            'firstUIEventTimestamp',
        ]),
        (Vn.ScriptTiming = [
            'name',
            'startTime',
            'duration',
            'invokerType',
            'invoker',
            'executionStart',
            'sourceURL',
            'sourceFunctionName',
            'sourceCharPosition',
            'pauseDuration',
            'forcedStyleAndLayoutDuration',
            'windowAttribution',
        ]),
        (Vn.Memory = ['jsHeapSizeLimit', 'totalJSHeapSize', 'usedJSHeapSize']),
        (Vn.TimeOrigin = ['timeOrigin']),
        (Vn.LayoutShift = ['startTime', 'value', 'hadRecentInput']),
        (Vn.FirstInput = ['name', 'startTime', 'duration', 'processingStart']),
        (Vn.EventTiming = [
            'name',
            'startTime',
            'duration',
            'processingStart',
            'processingEnd',
            'interactionId',
            'target',
        ]),
        (Vn.LargestContentfulPaint = ['name', 'startTime', 'duration', 'renderTime', 'loadTime', 'size']),
        (Vn.EventTimingCount = ['interactionCount']),
        ((Qn = Gn || (Gn = {})).Performance = 0),
        (Qn.PerformanceEntries = 1),
        (Qn.PerformanceMemory = 2),
        (Qn.Console = 3),
        (Qn.Ajax = 4),
        (Qn.PerformanceObserver = 5),
        (Qn.PerformanceTimeOrigin = 7),
        (Qn.WebAnimation = 8),
        (Qn.LayoutShift = 9),
        (Qn.FirstInput = 10),
        (Qn.LargestContentfulPaint = 11),
        (Qn.LongTask = 12),
        (Qn.HTMLDialogElement = 13),
        (Qn.CaptureOnStartupEnabled = 14),
        (Qn.CanvasWatcherEnabled = 15),
        (Qn.CanvasScreenShotMode = 16),
        (Qn.ResizeObserver = 17),
        ((Yn = Xn || (Xn = {})).Node = 1),
        (Yn.Sheet = 2),
        ((Zn = Jn || (Jn = {})).StyleSheetHooks = 0),
        (Zn.SetPropertyHooks = 1),
        ((ni = ti || (ti = {})).Document = 'document'),
        (ni.Event = 'evt'),
        (ni.Page = 'page'),
        (ni.User = 'user'),
        ((ri = ii || (ii = {})).FsId = 'fsidentity'),
        (ri.NewUid = 'newuid'),
        ((si = ei || (ei = {})).Elide = 0),
        (si.Record = 1),
        (si.Allowlist = 2),
        ((oi = ui || (ui = {})).Any = 0),
        (oi.Exclude = 1),
        (oi.Mask = 2),
        ((ci = ai || (ai = {})).Erase = 0),
        (ci.MaskText = 1),
        (ci.ScrubUrl = 2),
        (ci.ScrubCss = 3),
        ((fi = hi || (hi = {})).Static = 0),
        (fi.Prefix = 1),
        ((li = vi || (vi = {})).SignalInvalid = 0),
        (li.SignalDeadClick = 1),
        (li.SignalRageClick = 2),
        ((pi = di || (di = {})).ReasonNoSuchOrg = 1),
        (pi.ReasonOrgDisabled = 2),
        (pi.ReasonOrgOverQuota = 3),
        (pi.ReasonBlockedDomain = 4),
        (pi.ReasonBlockedIp = 5),
        (pi.ReasonBlockedUserAgent = 6),
        (pi.ReasonBlockedGeo = 7),
        (pi.ReasonBlockedTrafficRamping = 8),
        (pi.ReasonInvalidURL = 9),
        (pi.ReasonUserOptOut = 10),
        (pi.ReasonInvalidRecScript = 11),
        (pi.ReasonDeletingUser = 12),
        (pi.ReasonNativeHookFailure = 13),
        ((gi = wi || (wi = {})).Unset = 0),
        (gi.Exclude = 1),
        (gi.Mask = 2),
        (gi.Unmask = 3),
        (gi.Watch = 4),
        (gi.Keep = 5),
        (gi.Defer = 6),
        ((yi = mi || (mi = {})).Unset = 0),
        (yi.Click = 1),
        ((Si = bi || (bi = {}))[(Si.Page = 1)] = 'Page'),
        (Si[(Si.Bundle = 2)] = 'Bundle'),
        (Si[(Si.Event = 6)] = 'Event'),
        (Si[(Si.Settings = 8)] = 'Settings'),
        ((_i = ki || (ki = {}))[(_i.Error = 3)] = 'Error'),
        (_i[(_i.Page = 4)] = 'Page'),
        (_i[(_i.Bundle = 5)] = 'Bundle'),
        (_i[(_i.Event = 7)] = 'Event'),
        (_i[(_i.Settings = 9)] = 'Settings'),
        ((Ii = Ai || (Ai = {})).MaxPerfMarksPerPage = 16384),
        (Ii.MaxLogsPerPage = 1024),
        (Ii.MaxUrlLength = 2048),
        (Ii.MutationProcessingInterval = 250),
        (Ii.CurveSamplingInterval = 142),
        (Ii.DefaultBundleUploadInterval = 5e3),
        (Ii.HeartbeatInterval = 256200),
        (Ii.PageInactivityTimeout = 18e5),
        (Ii.BackoffMax = 3e5),
        (Ii.ScrollSampleInterval = Ii.MutationProcessingInterval / 5),
        (Ii.SyntheticClickTimeout = Ii.ScrollSampleInterval + 5),
        (Ii.InactivityThreshold = 4e3),
        (Ii.MaxAjaxPayloadLength = 16384),
        (Ii.DefaultOrgSettings = {
            MaxPerfMarksPerPage: Ii.MaxPerfMarksPerPage,
            MaxConsoleLogPerPage: Ii.MaxLogsPerPage,
            MaxAjaxPayloadLength: Ii.MaxAjaxPayloadLength,
            MaxUrlLength: Ii.MaxUrlLength,
            RecordPerformanceResourceImg: !0,
            RecordPerformanceResourceTiming: !0,
            HttpRequestHeadersAllowlist: [],
            HttpResponseHeadersAllowlist: [],
            UrlPrivacyConfig: [{ Exclude: { Hash: [{ Expression: '#.*' }], QueryParam: [{ Expression: '(=)(.*)' }] } }],
            AttributeBlocklist: [{ Target: ui.Any, Tag: '*', Name: '', Type: hi.Prefix, Action: ai.Erase }],
        }),
        (Ii.DefaultStatsSettings = { MaxPayloadLength: 8192, MaxEventTypeLength: 1024 }),
        (Ii.BlockedFieldValue = '__fs__redacted'),
        (Ii.DefaultRecDisabledMessage = 'Capture disabled. Turn on debug mode for more information.'),
        (Ii.ShutdownMessage = 'Shutdown called.'),
        (Ii.TextPlain = 'text/plain');
    var Ti,
        Ci,
        xi,
        Ki,
        Ri,
        Mi,
        Oi,
        ji,
        Pi,
        Ui,
        Ni = '_fs_uid',
        Li = '_fs_cid',
        Di = '_fs_lua',
        Fi = '_fs_trust_event',
        Bi = '_fs',
        Wi = '__fs',
        Hi = 'gzip',
        zi = 'identity';
    ((Ci = Ti || (Ti = {}))[(Ci.Inactive = 1)] = 'Inactive'),
        (Ci[(Ci.Pending = 2)] = 'Pending'),
        (Ci[(Ci.ShouldFlush = 3)] = 'ShouldFlush'),
        ((Ki = xi || (xi = {}))[(Ki.Shutdown = 1)] = 'Shutdown'),
        (Ki[(Ki.Starting = 2)] = 'Starting'),
        (Ki[(Ki.Started = 3)] = 'Started'),
        (Ki[(Ki.Fatal = 4)] = 'Fatal'),
        ((Mi = Ri || (Ri = {})).Set = 0),
        (Mi.Function = 1),
        ((ji = Oi || (Oi = {}))[(ji.Disabled = 0)] = 'Disabled'),
        (ji[(ji.CaptureCanvasOps = 1)] = 'CaptureCanvasOps'),
        (ji[(ji.ScreenshotCanvas = 2)] = 'ScreenshotCanvas'),
        ((Ui = Pi || (Pi = {})).EndPreviewMode = 'EndPreviewMode'),
        (Ui.EvtBundle = 'EvtBundle'),
        (Ui.GreetFrame = 'GreetFrame'),
        (Ui.InitFrameMobile = 'InitFrameMobile'),
        (Ui.RequestFrameId = 'RequestFrameId'),
        (Ui.RestartFrame = 'RestartFrame'),
        (Ui.SetConsent = 'SetConsent'),
        (Ui.SetFrameId = 'SetFrameId'),
        (Ui.ShutdownFrame = 'ShutdownFrame'),
        (Ui.Unknown = 'Unknown');
    var qi = '_fs_dwell_passed',
        $i = '__wayfinder',
        Vi = '__wayfinder_style_v1';
    function Gi(t) {
        return xt.arrayIsArray(t);
    }
    function Qi(t, n) {
        for (var i = 0, r = t; i < r.length; i++) if (n(r[i])) return !0;
        return !1;
    }
    function Xi(t) {
        return 'function' == typeof t;
    }
    function Yi(t) {
        var n = parseInt(null != t ? t : '', 10);
        return isNaN(n) ? void 0 : n;
    }
    function Ji(t) {
        return null !== t && 'object' == typeof t;
    }
    function Zi(t) {
        return Ji(t) && !Gi(t) && t.constructor !== Date;
    }
    function tr(t) {
        if (null != t) {
            var n = nr(t) ? t : new Date(t);
            try {
                return n.toISOString();
            } catch (n) {
                if ('string' == typeof t) return t;
            }
        }
        return null;
    }
    function nr(t) {
        return null != t && t.constructor === Date;
    }
    function ir(t) {
        return 'string' == typeof t;
    }
    var rr =
        'function' == typeof xt.objectKeys
            ? function (t) {
                  return xt.objectKeys(t);
              }
            : function (t) {
                  var n = [];
                  for (var i in t) xt.objectHasOwnProp(t, i) && n.push(i);
                  return n;
              };
    function er(t, n) {
        return 0 == t.lastIndexOf(n, 0);
    }
    function sr(t, n) {
        for (var i in t) xt.objectHasOwnProp(t, i) && n(t[i], i, t);
    }
    function ur(t) {
        for (var n in t) if (Object.prototype.hasOwnProperty.call(t, n)) return t[n];
    }
    function or(t, n) {
        var i = 0;
        for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r) && ++i > n) return !1;
        return i == n;
    }
    function ar(t, n) {
        var i = 0;
        for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r) && ++i > n) return !0;
        return !1;
    }
    function cr(t) {
        return function () {
            for (var n, i, r = this, e = [], s = 0; s < arguments.length; s++) e[s] = arguments[s];
            return 'function' ==
                typeof (null === (i = null === (n = window.Zone) || void 0 === n ? void 0 : n.root) || void 0 === i
                    ? void 0
                    : i.run)
                ? window.Zone.root.run(function () {
                      return t.apply(r, e);
                  })
                : t.apply(this, e);
        };
    }
    function hr(t, n, i) {
        if ((void 0 === i && (i = cr), !t)) return Dt;
        var r = i(t);
        return Ut(n ? r.bind(n) : r, function (t) {
            'Unexpected error: '.concat(t);
        });
    }
    function fr(t) {
        var n = lr(t),
            i = n[0];
        return n[1] || i;
    }
    function vr(t) {
        var n = lr(t),
            i = n[0],
            r = n[1];
        if (r) {
            var e = {
                When: t.When,
                Kind: cn.DIAGNOSTIC_INFO,
                Args: [fr({ Name: 'stringifyRawEventError', Kind: t.Kind, err: r })],
            };
            return t.PIds && (e.PIds = t.PIds), (t.FId || 0 === t.FId) && (e.FId = t.FId), fr(e);
        }
        return i;
    }
    function lr(t) {
        var n,
            i = Object.getOwnPropertyDescriptor(Array.prototype, 'toJSON'),
            r = Object.getOwnPropertyDescriptor(String.prototype, 'toJSON'),
            e = void 0;
        try {
            i && i.value && i.configurable && delete Array.prototype.toJSON,
                r && r.value && r.configurable && delete String.prototype.toJSON,
                (n = xt.jsonStringify(t));
        } catch (t) {
            (n = ''), (e = xn(t));
        } finally {
            (null == i ? void 0 : i.value) &&
                Ut(function () {
                    return Object.defineProperty(Array.prototype, 'toJSON', i);
                })(),
                (null == r ? void 0 : r.value) &&
                    Ut(function () {
                        return Object.defineProperty(String.prototype, 'toJSON', r);
                    })();
        }
        return [n, e];
    }
    function dr(t) {
        var n = t.doctype;
        if (!n) return '';
        var i = '<!DOCTYPE ';
        return (
            (i += n.name),
            n.publicId && (i += ' PUBLIC "'.concat(n.publicId, '"')),
            n.systemId && (i += ' "'.concat(n.systemId, '"')),
            ''.concat(i, '>')
        );
    }
    function pr(t) {
        return xt.jsonParse(t);
    }
    var wr = (function () {
            function t(t, n, i) {
                void 0 === i && (i = !1),
                    (this.C = t),
                    (this.K = n),
                    (this.R = i),
                    (this.M = Dt),
                    (this.O = void 0),
                    (this.j = Dt),
                    (this.P = Dt),
                    (this.U = !1);
            }
            return (
                (t.prototype.before = function (t) {
                    return (this.M = hr(t)), this;
                }),
                (t.prototype.replaceSync = function (t) {
                    return (this.O = hr(t)), this;
                }),
                (t.prototype.afterSync = function (t) {
                    return (this.j = hr(t)), this;
                }),
                (t.prototype.afterAsync = function (t) {
                    return (
                        (this.P = hr(function (n) {
                            xt.setWindowTimeout(
                                window,
                                Ut(function () {
                                    t(n);
                                }),
                                0
                            );
                        })),
                        this
                    );
                }),
                (t.prototype.disable = function () {
                    if (((this.U = !1), this.N)) {
                        var t = this.N,
                            n = t.override,
                            i = t['native'];
                        this.C[this.K] === n && ((this.C[this.K] = i), (this.N = void 0));
                    }
                }),
                (t.prototype.enable = function () {
                    if (((this.U = !0), this.N)) return !0;
                    this.N = this.L();
                    try {
                        this.C[this.K] = this.N.override;
                    } catch (t) {
                        return !1;
                    }
                    return !0;
                }),
                (t.prototype.getTarget = function () {
                    return this.C;
                }),
                (t.prototype.L = function () {
                    var t = this,
                        n = this,
                        r = this.C[this.K],
                        e = function () {
                            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                            var s,
                                u = { that: this, args: t, result: null };
                            return (
                                n.U && n.M(u),
                                (s = n.O ? n.O(i(i({}, u), { origFn: r })) : r.apply(this, t)),
                                (u.result = s),
                                n.U && (n.j(u), n.P(u)),
                                u.result
                            );
                        };
                    return (
                        this.R &&
                            (e.toString = function () {
                                var n;
                                return 'function '
                                    .concat(null !== (n = t.K) && void 0 !== n ? n : '', '() { ')
                                    .concat(mt, ' }');
                            }),
                        { 'native': r, override: e }
                    );
                }),
                t
            );
        })(),
        gr = {};
    function mr(t, n, i) {
        var r;
        if ((void 0 === i && (i = !1), !t || 'function' != typeof t[n])) return null;
        gr[n] = null !== (r = gr[n]) && void 0 !== r ? r : new Bt();
        var e = gr[n].get(t);
        return e || ((e = new wr(t, n, i)), gr[n].set(t, e)), e.enable() ? e : null;
    }
    function yr(t, n, i) {
        return br(null == t ? void 0 : t.prototype, n, i);
    }
    function br(t, n, r) {
        if (!t) return function () {};
        var e = Object.getOwnPropertyDescriptor(t, n);
        if (!e || !e.set) return function () {};
        var s = e.set,
            u = hr(r),
            o = !0;
        function a(t) {
            s.call(this, t), o && u(this, t);
        }
        return (
            Object.defineProperty(t, n, i(i({}, e), { set: a })),
            function () {
                o = !1;
                var r = Object.getOwnPropertyDescriptor(t, n);
                r && a === r.set && Object.defineProperty(t, n, i(i({}, r), { set: s }));
            }
        );
    }
    function Sr(t) {
        var n = t.navigator.languages;
        return n && Gi(n) ? n.join(',') : t.navigator.userLanguage || t.navigator.language;
    }
    function kr(t) {
        if (!t) return !1;
        var n = t.isConnected;
        return 'boolean' == typeof n
            ? n
            : (function (t) {
                  for (var n = t, i = void 0; n; n = i) if (!(i = Tn(n))) return n;
                  return t;
              })(t).nodeType === Jt;
    }
    function _r(t) {
        return t instanceof Node;
    }
    function Ar(t, n) {
        void 0 === t && (t = []), void 0 === n && (n = 0);
        for (var i = '', r = 0, e = t; r < e.length; r++) {
            var s = e[r];
            i += '/'.concat(s);
        }
        return ''.concat(i, '/').concat(n);
    }
    function Ir() {
        var t = function () {
            return xt.dateNow();
        };
        return (
            'number' != typeof t() &&
                (t = function () {
                    return xt.dateGetTime(new Date());
                }),
            t
        );
    }
    var Er,
        Tr,
        Cr,
        xr =
            ((Tr = Ir()),
            (Cr =
                null !==
                    (Er = (function () {
                        var t;
                        if (
                            (function () {
                                var t = window.performance;
                                return !(!t || !t.now);
                            })()
                        ) {
                            var n = window.performance,
                                i = n.now();
                            if ('number' == typeof i && isFinite(i) && !(i <= 0)) {
                                var r = n.timeOrigin;
                                if ('number' != typeof r) {
                                    var e = Ir()() - n.now(),
                                        s = null === (t = n.timing) || void 0 === t ? void 0 : t.navigationStart;
                                    r = s ? Math.min(e, s) : e;
                                }
                                var u = Math.round(r);
                                if ('number' == typeof u && isFinite(u) && !(u <= 0)) return u;
                            }
                        }
                    })()) && void 0 !== Er
                    ? Er
                    : Tr()),
            {
                now: Tr,
                timeOrigin: Cr,
                msSinceDocumentStart: function () {
                    return Tr() - Cr;
                },
            });
    function Kr() {
        return xr.now();
    }
    function Rr() {
        return xr.msSinceDocumentStart();
    }
    var Mr = [
            '',
            '0',
            '1',
            '-1',
            'true',
            'false',
            'n/a',
            'nan',
            'undefined',
            'null',
            'nil',
            'the_id_that_you_use_in_your_app_for_this_user',
        ],
        Or = [
            '811c9dc5',
            '350ca8af',
            '340ca71c',
            '14cd0a2b',
            '4db211e5',
            '0b069958',
            '3613e041',
            '2f8f13ba',
            '9b61ad43',
            '77074ba4',
            '0da3f8ec',
            '1c750511',
        ],
        jr = function () {
            return xt.mathFloor(Kr() / 1e3);
        },
        Pr = function () {
            return jr() + 31536e3;
        };
    function Ur(t) {
        if (!t) return null;
        var n,
            i = t.split('#');
        if (i.length < 3) return null;
        for (var r = 2; r < i.length; r++) {
            var e = i[r];
            if (e.indexOf('/') >= 0) {
                var s = e.split('/'),
                    u = s[0],
                    o = s[1];
                (i[r] = u), (n = o);
                break;
            }
        }
        var a = (function (t) {
            var n = parseInt(null != t ? t : '', 10),
                i = jr(),
                r = Pr() + 86400;
            return isNaN(n) ? r : n <= i ? void 0 : n > r ? r : n;
        })(n);
        if (!a) return null;
        i[0];
        var c = i[1],
            h = i[2],
            f = i[3],
            v = '';
        f &&
            ((v = decodeURIComponent(f)),
            (Mr.indexOf(v) >= 0 || Or.indexOf(v) >= 0) &&
                ('Ignoring invalid app key "'.concat(v, '" from cookie.'), (v = '')));
        var l = (null != h ? h : '').split(':'),
            d = l[0],
            p = l[1],
            w = l[2];
        return (
            l[3],
            {
                appKeyHash: v,
                expirationAbsTimeSeconds: a,
                userId: d,
                orgId: c,
                pageCount: Yi(l[4]),
                sessionId: null != p ? p : '',
                sessionStartTime: Yi(w),
            }
        );
    }
    function Nr(t) {
        var n = {};
        try {
            for (var i = t.cookie.split(';'), r = 0; r < i.length; r++) {
                var e = i[r].replace(/^\s+|\s+$/g, '').split('=');
                n[e[0]] || (n[e[0]] = e[1]);
            }
        } catch (t) {
            'Exception trying to parse cookies: '.concat(t);
        }
        return n;
    }
    var Lr = function (t, n, i) {
        (this.name = 'ProtocolError'), (this.message = n), (this.status = t), (this.data = i);
    };
    function Dr(t) {
        return (t >= 400 && 502 !== t) || 202 == t || 206 == t;
    }
    function Fr(t) {
        return t instanceof Lr && Dr(t.status);
    }
    function Br(t) {
        return 'function' == typeof t;
    }
    var Wr,
        Hr,
        zr,
        qr,
        $r,
        Vr = Array.isArray
            ? Array.isArray
            : function (t) {
                  return '[object Array]' === Object.prototype.toString.call(t);
              },
        Gr = 0,
        Qr = function (t, n) {
            (Xr[Gr] = t), (Xr[Gr + 1] = n), 2 === (Gr += 2) && Wr();
        },
        Xr = new Array(1e3);
    function Yr() {
        for (var t = 0; t < Gr; t += 2) (0, Xr[t])(Xr[t + 1]), (Xr[t] = void 0), (Xr[t + 1] = void 0);
        Gr = 0;
    }
    function Jr(t, n) {
        var i = arguments,
            r = this,
            e = new this.constructor(ne);
        void 0 === e[te] && me(e);
        var s,
            u = r.D;
        return (
            u
                ? ((s = i[u - 1]),
                  Qr(function () {
                      return we(u, e, s, r.F);
                  }))
                : ve(r, e, t, n),
            e
        );
    }
    function Zr(t) {
        if (t && 'object' == typeof t && t.constructor === this) return t;
        var n = new this(ne);
        return ae(n, t), n;
    }
    window.MutationObserver
        ? ((zr = 0),
          (qr = new MutationObserver(Yr)),
          ($r = document.createTextNode('')),
          qr.observe($r, { characterData: !0 }),
          (Wr = function () {
              var t = (zr = ++zr % 2);
              $r.data = ''.concat(t);
          }))
        : ((Hr = setTimeout),
          (Wr = function () {
              return Hr(Yr, 1);
          }));
    var te = Math.random().toString(36).substring(16);
    function ne() {}
    var ie = void 0,
        re = 1,
        ee = 2,
        se = new de();
    function ue(t) {
        try {
            return t.then;
        } catch (t) {
            return (se.error = t), se;
        }
    }
    function oe(t, n, i) {
        n.constructor === t.constructor && i === Jr && n.constructor.resolve === Zr
            ? (function (t, n) {
                  n.D === re
                      ? he(t, n.F)
                      : n.D === ee
                        ? fe(t, n.F)
                        : ve(
                              n,
                              void 0,
                              function (n) {
                                  return ae(t, n);
                              },
                              function (n) {
                                  return fe(t, n);
                              }
                          );
              })(t, n)
            : i === se
              ? (fe(t, se.error), (se.error = null))
              : void 0 === i
                ? he(t, n)
                : Br(i)
                  ? (function (t, n, i) {
                        Qr(function (t) {
                            var r = !1,
                                e = (function (i, e, s, u, o) {
                                    try {
                                        i.call(
                                            e,
                                            function (i) {
                                                r || ((r = !0), n !== i ? ae(t, i) : he(t, i));
                                            },
                                            function (n) {
                                                r || ((r = !0), fe(t, n));
                                            }
                                        );
                                    } catch (t) {
                                        return t;
                                    }
                                })(i, n, 0, 0, 'Settle: '.concat(t.B || ' unknown promise'));
                            !r && e && ((r = !0), fe(t, e));
                        }, t);
                    })(t, n, i)
                  : he(t, n);
    }
    function ae(t, n) {
        var i;
        t === n
            ? fe(t, new TypeError('You cannot resolve a promise with itself'))
            : 'function' == typeof (i = n) || ('object' == typeof i && null !== i)
              ? oe(t, n, ue(n))
              : he(t, n);
    }
    function ce(t) {
        t.W && t.W(t.F), le(t);
    }
    function he(t, n) {
        t.D === ie && ((t.F = n), (t.D = re), 0 !== t.H.length && Qr(le, t));
    }
    function fe(t, n) {
        t.D === ie && ((t.D = ee), (t.F = n), Qr(ce, t));
    }
    function ve(t, n, i, r) {
        var e = t.H,
            s = e.length;
        (t.W = null), (e[s] = n), (e[s + re] = i), (e[s + ee] = r), 0 === s && t.D && Qr(le, t);
    }
    function le(t) {
        var n = t.H,
            i = t.D;
        if (0 !== n.length) {
            for (var r, e, s = t.F, u = 0; u < n.length; u += 3) (r = n[u]), (e = n[u + i]), r ? we(i, r, e, s) : e(s);
            t.H.length = 0;
        }
    }
    function de() {
        this.error = null;
    }
    var pe = new de();
    function we(t, n, i, r) {
        var e,
            s,
            u = Br(i),
            o = !1,
            a = !1;
        if (u) {
            if (
                ((e = (function (t, n) {
                    try {
                        return t(n);
                    } catch (t) {
                        return (pe.error = t), pe;
                    }
                })(i, r)),
                e === pe ? ((a = !0), (s = e.error), (e.error = null)) : (o = !0),
                n === e)
            )
                return void fe(n, new TypeError('A promises callback cannot return that same promise.'));
        } else (e = r), (o = !0);
        n.D !== ie || (u && o ? ae(n, e) : a ? fe(n, s) : t === re ? he(n, e) : t === ee && fe(n, e));
    }
    var ge = 0;
    function me(t) {
        (t[te] = ge++), (t.D = void 0), (t.F = void 0), (t.H = []);
    }
    function ye(t, n) {
        (this.$ = t),
            (this.promise = new t(ne)),
            this.promise[te] || me(this.promise),
            Vr(n)
                ? ((this.V = n),
                  (this.length = n.length),
                  (this.G = n.length),
                  (this.F = new Array(this.length)),
                  0 === this.length
                      ? he(this.promise, this.F)
                      : ((this.length = this.length || 0), this.X(), 0 === this.G && he(this.promise, this.F)))
                : fe(this.promise, new Error('Array Methods must be provided an Array'));
    }
    (ye.prototype.X = function () {
        for (var t = this.length, n = this.V, i = 0; this.D === ie && i < t; i++) this.Y(n[i], i);
    }),
        (ye.prototype.Y = function (t, n) {
            var i = this.$,
                r = i.resolve;
            if (r === Zr) {
                var e = ue(t);
                if (e === Jr && t.D !== ie) this.J(t.D, n, t.F);
                else if ('function' != typeof e) this.G--, (this.F[n] = t);
                else if (i === be) {
                    var s = new i(ne);
                    oe(s, t, e), this.Z(s, n);
                } else
                    this.Z(
                        new i(function (n) {
                            return n(t);
                        }),
                        n
                    );
            } else this.Z(r(t), n);
        }),
        (ye.prototype.J = function (t, n, i) {
            var r = this.promise;
            r.D === ie && (this.G--, t === ee ? fe(r, i) : (this.F[n] = i)), 0 === this.G && he(r, this.F);
        }),
        (ye.prototype.Z = function (t, n) {
            var i = this;
            ve(
                t,
                void 0,
                function (t) {
                    return i.J(re, n, t);
                },
                function (t) {
                    return i.J(ee, n, t);
                }
            );
        });
    var be = function (t) {
        (this[te] = ge++),
            (this.F = this.D = void 0),
            (this.H = []),
            ne !== t &&
                ('function' != typeof t &&
                    (function () {
                        throw new TypeError(
                            'You must pass a resolver function as the first argument to the promise constructor'
                        );
                    })(),
                this instanceof be
                    ? (function (t, n) {
                          try {
                              n(
                                  function (n) {
                                      ae(t, n);
                                  },
                                  function (n) {
                                      fe(t, n);
                                  }
                              );
                          } catch (n) {
                              fe(t, n);
                          }
                      })(this, t)
                    : (function () {
                          throw new TypeError(
                              "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                          );
                      })());
    };
    (be.all = function (t) {
        return new ye(this, t).promise;
    }),
        (be.race = function (t) {
            var n = this;
            return Vr(t)
                ? new n(function (i, r) {
                      for (var e = t.length, s = 0; s < e; s++) n.resolve(t[s]).then(i, r);
                  })
                : new n(function (t, n) {
                      return n(new TypeError('You must pass an array to race.'));
                  });
        }),
        (be.resolve = Zr),
        (be.reject = function (t) {
            var n = new this(ne);
            return fe(n, t), n;
        }),
        (be.tt = function (t) {
            Qr = t;
        }),
        (be.nt = Qr),
        (be.prototype = {
            constructor: be,
            then: Jr,
            'catch': function (t) {
                return this.then(null, t);
            },
        });
    var Se = 'boolean' == typeof window._fs_use_polyfilled_promise && window._fs_use_polyfilled_promise,
        ke = 'function' == typeof window.Promise ? window.Promise : be,
        _e = Se ? be : ke;
    function Ae() {
        var t, n;
        return {
            promise: new _e(function (i, r) {
                (t = i), (n = r);
            }),
            resolve: t,
            reject: n,
        };
    }
    function Ie(t) {
        return new _e(function (n) {
            xt.setWindowTimeout(window, Ut(n), t);
        });
    }
    function Ee(t) {
        for (
            var n = t.reduce(function (t, n) {
                    return t + n.byteLength;
                }, 0),
                i = new ArrayBuffer(n),
                r = new Uint8Array(i),
                e = 0,
                s = 0,
                u = t;
            s < u.length;
            s++
        ) {
            var o = u[s];
            r.set(o, e), (e += o.byteLength);
        }
        return i;
    }
    function Te(t) {
        if (Xi(t.arrayBuffer)) return t.arrayBuffer();
        var n = Ae(),
            i = n.resolve,
            r = n.promise,
            e = new FileReader();
        return (
            e.readAsArrayBuffer(t),
            (e.onload = function () {
                i(e.result);
            }),
            (e.onerror = function (t) {
                Su('blob to AB', { err: t }), i(null);
            }),
            r
        );
    }
    function Ce(t, n) {
        var i;
        return (
            void 0 === n && (n = -1),
            r(this, void 0, void 0, function () {
                var r, s, u, o, a;
                return e(this, function (e) {
                    switch (e.label) {
                        case 0:
                            (r = []), (s = 0), (e.label = 1);
                        case 1:
                            return [4, t.read()];
                        case 2:
                            return (
                                (u = e.sent()),
                                (o = u.value),
                                (a = u.done),
                                (s += null !== (i = null == o ? void 0 : o.length) && void 0 !== i ? i : 0),
                                n > -1 && s > n && o
                                    ? (r.push(o.slice(0, o.length - (s - n))),
                                      t.cancel()['catch'](function (t) {}),
                                      [2, r])
                                    : a
                                      ? [2, r]
                                      : (void 0 !== o && r.push(o), [3, 1])
                            );
                        case 3:
                            return [2];
                    }
                });
            })
        );
    }
    var xe = function (t) {
        return r(void 0, void 0, _e, function () {
            return e(this, function (n) {
                switch (n.label) {
                    case 0:
                        return [4, Ce(t)];
                    case 1:
                        return [2, Ee(n.sent())];
                }
            });
        });
    };
    function Ke() {
        return r(this, void 0, _e, function () {
            var t, n, i, r;
            return e(this, function (e) {
                return (
                    (t = new TextEncoderStream()),
                    (n = new CompressionStream('gzip')),
                    t.readable.pipeThrough(n),
                    (i = t.writable.getWriter()),
                    (r = n.readable.getReader()),
                    [
                        2,
                        [
                            {
                                write: function (t) {
                                    return i.ready.then(function () {
                                        return i.write(t);
                                    });
                                },
                                finalize: function () {
                                    return i.ready.then(function () {
                                        return i.close();
                                    });
                                },
                                onError: function () {
                                    i.abort()['catch'](function (t) {}), r.cancel()['catch'](function (t) {});
                                },
                            },
                            xe(r),
                        ],
                    ]
                );
            });
        });
    }
    function Re(t) {
        return r(this, void 0, _e, function () {
            var n, i, r;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        return e.trys.push([0, 5, , 6]), [4, Ke()];
                    case 1:
                        return (r = e.sent()), (n = r[0]), (i = r[1]), [4, n.write(t)];
                    case 2:
                        return e.sent(), [4, n.finalize()];
                    case 3:
                        return e.sent(), [4, i];
                    case 4:
                        return [2, e.sent()];
                    case 5:
                        return e.sent(), null == n || n.onError(), [2, null];
                    case 6:
                        return [2];
                }
            });
        });
    }
    function Me() {
        return r(this, void 0, _e, function () {
            return e(this, function (t) {
                switch (t.label) {
                    case 0:
                        return t.trys.push([0, 2, , 3]), [4, Re('fullstory')];
                    case 1:
                        return [2, null != t.sent()];
                    case 2:
                        return t.sent(), [3, 3];
                    case 3:
                        return [2, !1];
                }
            });
        });
    }
    var Oe = new _e(function (t) {
            r(void 0, void 0, _e, function () {
                var n;
                return e(this, function (i) {
                    switch (i.label) {
                        case 0:
                            return (
                                i.trys.push([0, 2, , 3]),
                                [
                                    4,
                                    _e.race([
                                        Me(),
                                        Ie(500).then(function () {
                                            return !1;
                                        }),
                                    ]),
                                ]
                            );
                        case 1:
                            return (n = i.sent()), t(n), [3, 3];
                        case 2:
                            return i.sent(), t(!1), [3, 3];
                        case 3:
                            return [2];
                    }
                });
            });
        }),
        je = function () {
            var t = (function () {
                try {
                    var t = new MessageChannel();
                    return t.port1.start(), t;
                } catch (t) {
                    return null;
                }
            })();
            return t
                ? new _e(function (n) {
                      var i = t.port1,
                          r = t.port2,
                          e = function () {
                              n(), i.removeEventListener('message', e), i.close();
                          };
                      i.addEventListener('message', e), r.postMessage(void 0), r.close();
                  })
                : Ie(0);
        },
        Pe = function () {
            return r(void 0, void 0, _e, function () {
                var t;
                return e(this, function (n) {
                    switch (n.label) {
                        case 0:
                            return (t = xt.requestWindowAnimationFrame)
                                ? [
                                      4,
                                      new _e(function (n) {
                                          return t(window, n);
                                      }),
                                  ]
                                : [3, 2];
                        case 1:
                            n.sent(), (n.label = 2);
                        case 2:
                            return [4, je()];
                        case 3:
                            return n.sent(), [2];
                    }
                });
            });
        };
    function Ue(t) {
        void 0 === t && (t = 16);
        var n = Kr() + t;
        return {
            timeRemaining: function () {
                return Math.max(0, n - Kr());
            },
            didTimeout: !1,
        };
    }
    function Ne(t, n) {
        return r(this, void 0, _e, function () {
            var i, r, s, u;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        return (i = t.ResizeObserver)
                            ? ((r = t.document),
                              (s = r.documentElement || r.body || r.head),
                              (u = null != n ? n : s),
                              [
                                  2,
                                  new _e(function (t) {
                                      var n = new i(function () {
                                          Pe().then(function () {
                                              n.unobserve(u), t();
                                          });
                                      });
                                      n.observe(u);
                                  }),
                              ])
                            : [4, Pe()];
                    case 1:
                        return e.sent(), [2];
                }
            });
        });
    }
    function Le(t, n) {
        throw (void 0 === n && (n = 'Reached unexpected case in exhaustive switch'), new Error(n));
    }
    var De = function (t) {
        for (var n = [], i = 0, r = t; i < r.length; i++) {
            var e = r[i],
                s = { Exclude: Fe(e.Exclude) };
            if (e.If) {
                s.If = [];
                for (var u = 0, o = e.If; u < o.length; u++) {
                    var a = o[u];
                    s.If.push(Fe(a, !0));
                }
            }
            n.push(s);
        }
        return n;
    };
    function Fe(t, n) {
        return (
            void 0 === n && (n = !1),
            {
                Hash: We(t.Hash, n),
                Host: We(t.Host, n),
                Path: We(t.Path, n),
                QueryParam: We(t.QueryParam, n),
                Query: We(t.Query, n),
            }
        );
    }
    var Be = 'ig';
    function We(t, n) {
        return t
            ? n
                ? [
                      new RegExp(
                          t
                              .map(function (t) {
                                  return t.Expression;
                              })
                              .join('|'),
                          Be
                      ),
                  ]
                : t.map(function (t) {
                      return new RegExp(t.Expression, Be);
                  })
            : [];
    }
    var He = '--blocked--',
        ze = function (t, n, i, r) {
            if ((void 0 === i && (i = He), !n || 0 === t.length)) return n;
            for (var e = [], s = 0, u = t; s < u.length; s++)
                for (var o = u[s], a = 0, c = qe(o, n, r); a < c.length; a++) {
                    var h = c[a];
                    e.push(h);
                }
            if (0 === e.length) return n;
            for (var f = '', v = 0, l = 0, d = (e = $e(e)); l < d.length; l++) {
                var p = d[l],
                    w = p[0],
                    g = p[1];
                (f += ''.concat(n.substring(v, w)).concat(i)), (v = g);
            }
            return f + n.slice(v);
        },
        qe = function (t, n, i) {
            var r,
                e = [];
            for (t.lastIndex = 0; null !== (r = t.exec(n)); )
                if (r) {
                    if ('' === r[0])
                        return (
                            '.*' !== t.source &&
                                i &&
                                i('detected possible infinite loop when matching zero-length characters', {
                                    re: t.source,
                                }),
                            [[0, n.length]]
                        );
                    if (1 !== r.length)
                        for (var s = r.index, u = 0, o = 1; o < r.length; o++) {
                            var a = r[o];
                            if (a && 0 !== a.length)
                                if (o % 2 != 1) {
                                    var c = s + u,
                                        h = c + a.length;
                                    e.push([c, h]), (u += a.length);
                                } else u += a.length;
                        }
                    else e.push([r.index, t.lastIndex]);
                }
            return e;
        },
        $e = function (t) {
            if (t.length <= 1) return t;
            t.sort(function (t, n) {
                return t[0] - n[0];
            });
            for (var n = [], i = t[0], r = 1; r < t.length; r++) {
                var e = t[r];
                i[1] <= e[0] ? (n.push(i), (i = e)) : i[1] < e[1] && (i[1] = e[1]);
            }
            return n.push(i), n;
        },
        Ve = {},
        Ge = '__default';
    function Qe(t) {
        void 0 === t && (t = Ge);
        var n = Ve[t];
        return (
            n ||
                ((n = (function () {
                    var t = document.implementation.createHTMLDocument('');
                    return (
                        t.head || t.documentElement.appendChild(t.createElement('head')),
                        t.body || t.documentElement.appendChild(t.createElement('body')),
                        t
                    );
                })()),
                t !== Ge && (n.open(), n.write(t), n.close()),
                (Ve[t] = n)),
            n
        );
    }
    var Xe = new ((function () {
        function t() {
            var t = Qe(),
                n = t.getElementById('urlresolver-base');
            n || (((n = t.createElement('base')).id = 'urlresolver-base'), t.head.appendChild(n));
            var i = t.getElementById('urlresolver-parser');
            i || (((i = t.createElement('a')).id = 'urlresolver-parser'), t.head.appendChild(i)),
                (this.base = n),
                (this.parser = i);
        }
        return (
            (t.prototype.parseUrl = function (t, n) {
                var i = t;
                if ('undefined' != typeof URL)
                    try {
                        i || (i = document.baseURI);
                        var r = i ? new URL(n, i) : new URL(n);
                        if (r.href) return r;
                    } catch (t) {}
                return this.parseUrlUsingBaseAndAnchor(i, n);
            }),
            (t.prototype.parseUrlUsingBaseAndAnchor = function (t, n) {
                this.base.setAttribute('href', t), this.parser.setAttribute('href', n);
                var i = document.createElement('a');
                return (i.href = this.parser.href), i;
            }),
            (t.prototype.resolveUrl = function (t, n) {
                return this.parseUrl(t, n).href;
            }),
            (t.prototype.resolveToDocument = function (t, n) {
                var i = Je(t);
                return null == i ? n : this.resolveUrl(i, n);
            }),
            t
        );
    })())();
    function Ye(t, n) {
        return Xe.parseUrl(t, n);
    }
    function Je(t) {
        var n = t.document,
            i = t.location.href;
        if ('string' == typeof n.baseURI) i = n.baseURI;
        else {
            var r = n.getElementsByTagName('base')[0];
            r && r.href && (i = r.href);
        }
        return 'about:blank' == i && t.parent != t ? Je(t.parent) : i;
    }
    var Ze = function (t, n, i, r) {
            void 0 === i && (i = He);
            for (
                var e, s, u = Ye('', n), o = { Hash: [], Host: [], Path: [], QueryParam: [], Query: [] }, a = 0, c = t;
                a < c.length;
                a++
            ) {
                var h = c[a];
                is(h.If, u) && es(o, h.Exclude);
            }
            if (u.host) {
                var f = ze(o.Host, u.host, i, r);
                (u.host = f),
                    u.port && ((e = f), (s = u.port), e.substring(e.length - s.length) !== s) && (u.port = '');
            }
            if (
                ((u.pathname = ze(o.Path, ss(u.pathname, u.host), i)),
                u.hash && (u.hash = ze(o.Hash, u.hash, i)),
                u.search)
            ) {
                var v = ns(o.QueryParam, u.search, i);
                u.search = ze(o.Query, v, i);
            }
            return u.href;
        },
        ts = function (t, n) {
            if (0 === t.length || !n) return !0;
            for (var i = 0, r = n.split('?'); i < r.length; i++)
                for (var e = 0, s = r[i].replace('?', '').split('&'); e < s.length; e++) {
                    var u = s[e];
                    if (rs(t, u)) return !0;
                }
            return !1;
        },
        ns = function (t, n, i) {
            return (
                void 0 === i && (i = He),
                n
                    .split('?')
                    .map(function (n) {
                        return n
                            .replace('?', '')
                            .split('&')
                            .map(function (n) {
                                return ze(t, n, i);
                            })
                            .join('&');
                    })
                    .join('?')
            );
        },
        is = function (t, n) {
            if (!t) return !0;
            for (var i = ss(n.pathname, n.host), r = 0, e = t; r < e.length; r++) {
                var s = e[r];
                if (
                    rs(s.Hash, n.hash) &&
                    rs(s.Host, n.host) &&
                    rs(s.Path, i) &&
                    ts(s.QueryParam, n.search) &&
                    rs(s.Query, n.search)
                )
                    return !0;
            }
            return !1;
        },
        rs = function (t, n) {
            return (
                0 === t.length ||
                !n ||
                t.every(function (t) {
                    return (t.lastIndex = 0), t.test(n);
                })
            );
        },
        es = function (t, n) {
            var i, r, e, s, u;
            (i = t.Hash).push.apply(i, n.Hash),
                (r = t.Host).push.apply(r, n.Host),
                (e = t.Path).push.apply(e, n.Path),
                (s = t.QueryParam).push.apply(s, n.QueryParam),
                (u = t.Query).push.apply(u, n.Query);
        };
    function ss(t, n) {
        return n && '/' !== t.charAt(0) ? '/'.concat(t) : t;
    }
    var us = new RegExp('[^\\s]'),
        os = new RegExp('[\\s]*$');
    function as(t) {
        var n = us.exec(t);
        if (!n) return t;
        for (
            var i = n.index,
                r = (n = os.exec(t)) ? t.length - n.index : 0,
                e = '\uFFFF',
                s = t.slice(i, t.length - r).split(/\r\n?|\n/g),
                u = 0;
            u < s.length;
            u++
        )
            (e += ''.concat(s[u].length)), u != s.length - 1 && (e += ':');
        return (i || r) && (e += ' '.concat(i, ' ').concat(r)), e;
    }
    String.prototype;
    var cs,
        hs,
        fs,
        vs,
        ls = [
            ['@import\\s+"', '"'],
            ["@import\\s+'", "'"],
        ].concat([
            ['url\\(\\s*"', '"\\s*\\)'],
            ["url\\(\\s*'", "'\\s*\\)"],
            ['url\\(\\s*', '\\s*\\)'],
        ]),
        ds = '.*?'.concat(/(?:[^\\](?:\\\\)*)/.source),
        ps = new RegExp(
            ls
                .map(function (t) {
                    var n = t[0],
                        i = t[1];
                    return '('.concat(n, ')(').concat(ds, ')(').concat(i, ')');
                })
                .join('|'),
            'g'
        ),
        ws = /url\(["']?(.+?)["']?\)/g,
        gs = /^\s*\/\//,
        ms = /[-\\^$*+?.()|[\]{}]/g,
        ys = new RegExp(ms.source);
    ((hs = cs || (cs = {}))[(hs.Exclude = 2)] = 'Exclude'),
        (hs[(hs.Mask = 4)] = 'Mask'),
        (hs[(hs.Unmask = 8)] = 'Unmask'),
        (hs[(hs.Watch = 16)] = 'Watch'),
        (hs[(hs.Keep = 32)] = 'Keep'),
        (hs[(hs.Defer = 64)] = 'Defer'),
        ((vs = fs || (fs = {}))[(vs.Immediate = 1)] = 'Immediate'),
        (vs[(vs.Deferred = 2)] = 'Deferred');
    var bs = [cs.Exclude, cs.Mask, cs.Unmask],
        Ss = [cs.Watch, cs.Keep, cs.Defer],
        ks = bs.concat(Ss),
        _s = [
            'allowReorder',
            'attributeName',
            'attributeType',
            'autoReverse',
            'baseFrequency',
            'baseProfile',
            'calcMode',
            'clipPathUnits',
            'contentScriptType',
            'contentStyleType',
            'diffuseConstant',
            'edgeMode',
            'externalResourcesRequired',
            'filterRes',
            'filterUnits',
            'glyphRef',
            'gradientTransform',
            'gradientUnits',
            'kernelMatrix',
            'kernelUnitLength',
            'keyPoints',
            'keySplines',
            'keyTimes',
            'lengthAdjust',
            'limitingConeAngle',
            'markerHeight',
            'markerUnits',
            'markerWidth',
            'maskContentUnits',
            'maskUnits',
            'numOctaves',
            'pathLength',
            'patternContentUnits',
            'patternTransform',
            'patternUnits',
            'pointsAtX',
            'pointsAtY',
            'pointsAtZ',
            'preserveAlpha',
            'preserveAspectRatio',
            'primitiveUnits',
            'refX',
            'refY',
            'referrerPolicy',
            'repeatCount',
            'repeatDur',
            'requiredExtensions',
            'requiredFeatures',
            'specularConstant',
            'specularExponent',
            'spreadMethod',
            'startOffset',
            'stdDeviation',
            'stitchTiles',
            'surfaceScale',
            'systemLanguage',
            'tableValues',
            'targetX',
            'targetY',
            'textLength',
            'viewBox',
            'viewTarget',
            'xChannelSelector',
            'yChannelSelector',
            'zoomAndPan',
        ].reduce(function (t, n) {
            return (t[n] = n), (t[n.toUpperCase()] = n), t;
        }, {});
    function As(t) {
        return t.nodeType === Yt && 'http://www.w3.org/2000/svg' === t.namespaceURI;
    }
    var Is = 16e6,
        Es = /^\s*((prefetch|preload|prerender)\s*)+$/i,
        Ts = /^\s*.*((worklet|script|worker|font|fetch)\s*)+$/i;
    function Cs(t, n, i) {
        var r,
            e,
            s = t.node,
            u = t.tag;
        if (null === u || '' === n) return null;
        if (
            'link' === u &&
            Es.test(null !== (r = s.getAttribute('rel')) && void 0 !== r ? r : '') &&
            !Ts.test(null !== (e = s.getAttribute('as')) && void 0 !== e ? e : '')
        )
            return null;
        var o,
            a = 'style' === n ? Ks(i) : i,
            c = (function (t, n, i) {
                var r,
                    e,
                    s,
                    u,
                    o,
                    a,
                    c,
                    h,
                    f,
                    v,
                    l,
                    d,
                    p,
                    w = void 0;
                (null === (r = null == n ? void 0 : n.watchKind) || void 0 === r ? void 0 : r.has(cs.Exclude))
                    ? (w = ui.Exclude)
                    : (null == n ? void 0 : n.mask) && (w = ui.Mask);
                var g = [],
                    m =
                        null ===
                            (u =
                                null === (s = null === (e = zs.blocklist[ui.Any]) || void 0 === e ? void 0 : e[t]) ||
                                void 0 === s
                                    ? void 0
                                    : s['static']) || void 0 === u
                            ? void 0
                            : u[i],
                    y =
                        null ===
                            (c =
                                null === (a = null === (o = zs.blocklist[ui.Any]) || void 0 === o ? void 0 : o['*']) ||
                                void 0 === a
                                    ? void 0
                                    : a['static']) || void 0 === c
                            ? void 0
                            : c[i];
                if ((void 0 !== m && g.push(m), void 0 !== y && g.push(y), w)) {
                    var b =
                            null ===
                                (v =
                                    null === (f = null === (h = zs.blocklist[w]) || void 0 === h ? void 0 : h[t]) ||
                                    void 0 === f
                                        ? void 0
                                        : f['static']) || void 0 === v
                                ? void 0
                                : v[i],
                        S =
                            null ===
                                (p =
                                    null === (d = null === (l = zs.blocklist[w]) || void 0 === l ? void 0 : l['*']) ||
                                    void 0 === d
                                        ? void 0
                                        : d['static']) || void 0 === p
                                ? void 0
                                : p[i];
                    void 0 !== b && g.push(b), void 0 !== S && g.push(S);
                }
                if (zs.hasPrefix) {
                    var k = Vs(ui.Any, t, i),
                        _ = Vs(ui.Any, '*', i);
                    if ((void 0 !== k && g.push(k), void 0 !== _ && g.push(_), w)) {
                        var A = Vs(w, t, i),
                            I = Vs(w, '*', i);
                        void 0 !== A && g.push(A), void 0 !== I && g.push(I);
                    }
                }
                return (function (t) {
                    if (0 !== t.length) return xt.mathMin.apply(xt, t);
                })(g);
            })(u, t, n);
        if (void 0 === c && !t) return null;
        switch (c) {
            case void 0:
                return a;
            case ai.Erase:
                return null;
            case ai.MaskText:
                return as(a);
            case ai.ScrubCss:
                return (
                    (o = function (t, n, i) {
                        return ''.concat(t).concat(qs).concat(i);
                    }),
                    a.replace(ps, function (t) {
                        for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
                        var r = n[0] || n[3] || n[6] || n[9] || n[12],
                            e = (n[1] || n[4] || n[7] || n[10] || n[13], n[2] || n[5] || n[8] || n[11] || n[14]);
                        return n[15], o(r, 0, e);
                    })
                );
            case ai.ScrubUrl:
                var h = Ms(a, { source: 'dom', type: u });
                if ('#' === a[0]) {
                    var f = h.indexOf('#');
                    if (f > -1) return h.substring(f);
                }
                return h;
            default:
                return Le();
        }
    }
    var xs = {},
        Ks = function (t, n) {
            void 0 === n && (n = window);
            try {
                var i = n.location,
                    r = i.origin,
                    e = i.pathname,
                    s = i.search,
                    u = ''.concat(r).concat(e).concat(s),
                    o = xs[u];
                return (
                    o
                        ? (o.lastIndex = 0)
                        : ((o = new RegExp(''.concat(((a = u), ys.test(a) ? a.replace(ms, '\\$&') : a), '/?(#)'), 'g')),
                          (xs[u] = o)),
                    t.replace(o, ''.concat('https://fs-currenturl.invalid', '$1'))
                );
            } catch (n) {
                return Su('cleanCSS', { err: n }), t;
            }
            var a;
        },
        Rs = /^data:/i;
    function Ms(t, n) {
        if (Rs.test(t)) return t;
        switch (n.source) {
            case 'dom':
                switch (n.type) {
                    case 'frame':
                    case 'iframe':
                        return Ds(t);
                    default:
                        return Os(t);
                }
            case 'event':
                switch (n.type) {
                    case cn.AJAX_REQUEST:
                    case cn.NAVIGATE:
                        return Os(t);
                    case cn.SET_FRAME_BASE:
                        return Ds(t);
                    default:
                        return Le();
                }
            case 'log':
                return Ds(t);
            case 'page':
                switch (n.type) {
                    case 'base':
                        return Ds(t);
                    case 'referrer':
                    case 'url':
                        return Os(t);
                    default:
                        return Le();
                }
            case 'perfEntry':
                switch (n.type) {
                    case 'frame':
                    case 'iframe':
                    case 'navigation':
                    case 'other':
                        return Ds(t);
                    default:
                        return Os(t);
                }
            default:
                return Le();
        }
    }
    function Os(t) {
        return Fs(Us, t);
    }
    var js = Ai.DefaultOrgSettings.MaxUrlLength,
        Ps = De(Ai.DefaultOrgSettings.UrlPrivacyConfig),
        Us = De(Ai.DefaultOrgSettings.UrlPrivacyConfig);
    function Ns(t, n) {
        (Ps = De(Ai.DefaultOrgSettings.UrlPrivacyConfig.concat(t))),
            (Us = De(t)),
            (js = n || Ai.DefaultOrgSettings.MaxUrlLength);
    }
    function Ls(t, n) {
        wu.send(t, 'error', n);
    }
    function Ds(t) {
        return Fs(Ps, t);
    }
    function Fs(t, n) {
        return Ze(t, n, He, Ls).substring(0, js);
    }
    var Bs = /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/gi,
        Ws =
            /(?:(http)|(ftp)|(ws)|(blob)|(file))[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/gi;
    function Hs(t) {
        return t.replace(Bs, '<email>').replace(Ws, function (t) {
            return Ms(t, { source: 'log', type: 'debug' });
        });
    }
    var zs,
        qs = 'https://fs-excluded.invalid';
    function $s(t) {
        var n, i, r, e, s, u, o, a, c, h, f, v, l, d, p, w;
        try {
            for (
                var g = (zs = { blocklist: {}, hasPrefix: !1 }).blocklist,
                    m =
                        (null !== (r = null == t ? void 0 : t.length) && void 0 !== r ? r : 0) > 0
                            ? t
                            : Ai.DefaultOrgSettings.AttributeBlocklist,
                    y = {},
                    b = 0,
                    S = m;
                b < S.length;
                b++
            ) {
                var k = S[b],
                    _ = k.Action;
                switch (_) {
                    case ai.Erase:
                    case ai.MaskText:
                    case ai.ScrubCss:
                    case ai.ScrubUrl:
                        break;
                    default:
                        wu.send('Detected unexpected attribute block action '.concat(_), 'warning'), (_ = ai.Erase);
                }
                if (
                    ((null !== (e = g[(h = k.Target)]) && void 0 !== e) || (g[h] = {}),
                    (null !== (s = (f = g[k.Target])[(v = k.Tag)]) && void 0 !== s) ||
                        (f[v] = { 'static': {}, regex: {} }),
                    k.Type === hi.Prefix)
                )
                    (null !== (u = y[(l = k.Target)]) && void 0 !== u) || (y[l] = {}),
                        (null !== (o = (d = y[k.Target])[(p = k.Tag)]) && void 0 !== o) || (d[p] = {}),
                        (null !== (a = (w = y[k.Target][k.Tag])[_]) && void 0 !== a) || (w[_] = []),
                        y[k.Target][k.Tag][_].push(null !== (c = k.Name) && void 0 !== c ? c : '');
                else {
                    if (!k.Name) {
                        wu.send('Detected an empty named static attribute '.concat(JSON.stringify(k)), 'warning');
                        continue;
                    }
                    g[k.Target][k.Tag]['static'][k.Name] = _;
                }
            }
            for (var A in y)
                for (var I in y[A])
                    for (var E in y[A][I]) {
                        var T = y[A][I][E];
                        (g[A][I].regex[E] = new RegExp('^(?:'.concat(T.join('|'), ')'), 'i')), (zs.hasPrefix = !0);
                    }
        } catch (t) {
            wu.sendErr(t, 'warning'),
                (zs = {
                    blocklist:
                        ((n = {}),
                        (n[ui.Any] = { '*': { 'static': {}, regex: ((i = {}), (i[ai.Erase] = /.*/), i) } }),
                        n),
                    hasPrefix: !0,
                });
        }
    }
    function Vs(t, n, i) {
        var r,
            e,
            s =
                null === (e = null === (r = zs.blocklist[t]) || void 0 === r ? void 0 : r[n]) || void 0 === e
                    ? void 0
                    : e.regex;
        if (s) for (var u in s) if (s[u].test(i)) return Number(u);
    }
    $s();
    var Gs = {
        target: { any: ui.Any, exclude: ui.Exclude, mask: ui.Mask },
        action: { erase: ai.Erase, maskText: ai.MaskText, scrubUrl: ai.ScrubUrl, scrubCss: ai.ScrubCss },
        type: { 'static': hi.Static, prefix: hi.Prefix },
    };
    function Qs(t) {
        var n;
        return {
            Tag: t.tag,
            Name: t.name,
            Target: Gs.target[t.target],
            Action: Gs.action[t.action],
            Type: Gs.type[null !== (n = t.type) && void 0 !== n ? n : 'static'],
        };
    }
    var Xs = (function () {
            function t(t) {
                var n = this;
                (this.it = { bundle: 0, event: 0 }),
                    (this.rt = !1),
                    (this.et = t.options.scheme),
                    (this.st = t.options.cdnHost),
                    (this.ut = t),
                    (this.ot = Oe.then(function (t) {
                        n.rt = t;
                    }));
            }
            return (
                (t.prototype.page = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (n) {
                            switch (n.label) {
                                case 0:
                                    return [
                                        4,
                                        nu(this.ut.window, this.et, hu(this.ut), '/rec/page', {
                                            type: 'string',
                                            data: fr(t),
                                        }),
                                    ];
                                case 1:
                                    return [2, pr(n.sent().text)];
                            }
                        });
                    });
                }),
                (t.prototype.settings = function (t) {
                    return r(this, void 0, _e, function () {
                        var n, i, r;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    if ((n = at(this.ut.window))) return [2, n];
                                    e.label = 1;
                                case 1:
                                    return (
                                        e.trys.push([1, 3, , 4]),
                                        (i = t.previewMode ? hu(this.ut) : this.st),
                                        [4, cu(this.ut.window, this.et, i, t)]
                                    );
                                case 2:
                                    return [2, e.sent()];
                                case 3:
                                    if (((r = e.sent()), t.previewMode)) throw r;
                                    return [3, 4];
                                case 4:
                                    return [2, cu(this.ut.window, this.et, hu(this.ut), t)];
                            }
                        });
                    });
                }),
                (t.prototype.bundle = function (t) {
                    return r(this, void 0, _e, function () {
                        var n = this;
                        return e(this, function (i) {
                            return [
                                2,
                                this.ct(t, Js, function (t) {
                                    return (n.it.bundle += t);
                                }),
                            ];
                        });
                    });
                }),
                (t.prototype.event = function (t) {
                    return r(this, void 0, _e, function () {
                        var n = this;
                        return e(this, function (i) {
                            return [
                                2,
                                this.ct(t, Zs, function (t) {
                                    return (n.it.event += t);
                                }),
                            ];
                        });
                    });
                }),
                (t.prototype.ct = function (t, n, s) {
                    var u;
                    return r(this, void 0, _e, function () {
                        var r, o, a, c, h, f, v, l, d;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, je()];
                                case 1:
                                    return e.sent(), (r = i({}, t)), (o = r), [4, this.ht(t.bundle)];
                                case 2:
                                    return (
                                        (o.bundle = e.sent()),
                                        (a = r.bundle),
                                        (c = a[1]),
                                        (h = a[2]),
                                        (f = s(h)),
                                        h > 2e6 ? [4, je()] : [3, 4]
                                    );
                                case 3:
                                    e.sent(), (e.label = 4);
                                case 4:
                                    return (
                                        window,
                                        (v = n(r)),
                                        [
                                            4,
                                            nu(
                                                this.ut.window,
                                                this.et,
                                                null !== (u = r.recHost) && void 0 !== u ? u : hu(this.ut),
                                                v,
                                                c
                                            ),
                                        ]
                                    );
                                case 5:
                                    return (l = e.sent().text), (d = pr(l)), window, [2, [f, d]];
                            }
                        });
                    });
                }),
                (t.prototype.ht = function (t) {
                    return r(this, void 0, _e, function () {
                        var n, i, r;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return (
                                        (n = t[0]), 'string' === (i = t[1]).type && this.rt ? [4, Re(i.data)] : [3, 2]
                                    );
                                case 1:
                                    if (null != (r = e.sent()))
                                        return [2, [n, { type: 'ArrayBuffer', data: r, encoding: Hi }, r.byteLength]];
                                    (this.rt = !1), Su('compression failed'), (e.label = 2);
                                case 2:
                                    return [2, t];
                            }
                        });
                    });
                }),
                (t.prototype.bundleBeacon = function (t) {
                    var n;
                    return su(this.et, null !== (n = t.recHost) && void 0 !== n ? n : hu(this.ut), t);
                }),
                (t.prototype.startBeacon = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (n) {
                            return [2, uu(this.ut.window, this.et, hu(this.ut), t)];
                        });
                    });
                }),
                t
            );
        })(),
        Ys = (function () {
            function t(t) {
                (this.et = t.options.scheme), (this.ut = t);
            }
            return (
                (t.prototype.uploadResource = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (n) {
                            switch (n.label) {
                                case 0:
                                    return [4, nu(this.ut.window, this.et, hu(this.ut), '/rec/uploadResource', t)];
                                case 1:
                                    return [2, n.sent().text];
                            }
                        });
                    });
                }),
                (t.prototype.queryResources = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (n) {
                            switch (n.label) {
                                case 0:
                                    return [
                                        4,
                                        nu(this.ut.window, this.et, hu(this.ut), '/rec/queryResources', {
                                            type: 'string',
                                            data: fr(t),
                                        }),
                                    ];
                                case 1:
                                    return [2, pr(n.sent().text)];
                            }
                        });
                    });
                }),
                t
            );
        })();
    function Js(t, n) {
        return void 0 === n && (n = Kr()), tu('/rec/bundle'.concat('v2' === t.version ? '/v2' : ''), t, n);
    }
    function Zs(t, n) {
        return void 0 === n && (n = Kr()), tu('/rec/event', t, n);
    }
    function tu(t, n, i) {
        var r = n.bundle,
            e = r[0],
            s = r[1],
            u = 'encoding' in s ? s.encoding : zi,
            o = ''
                .concat(t, '?OrgId=')
                .concat(n.orgId, '&UserId=')
                .concat(n.userId, '&SessionId=')
                .concat(n.sessionId, '&PageId=')
                .concat(n.pageId, '&Seq=')
                .concat(e, '&ClientTime=')
                .concat(i);
        return (
            null != n.serverPageStart && (o += '&PageStart='.concat(n.serverPageStart)),
            null != n.serverBundleTime && (o += '&PrevBundleTime='.concat(n.serverBundleTime)),
            null != n.lastUserActivity && (o += '&LastActivity='.concat(n.lastUserActivity)),
            n.isNewSession && (o += '&IsNewSession=true'),
            null != n.deltaT && (o += '&DeltaT='.concat(n.deltaT)),
            u === Hi && (o += '&ContentEncoding='.concat(Hi)),
            o
        );
    }
    function nu(t, n, i, s, u) {
        return r(this, void 0, _e, function () {
            return e(this, function (r) {
                return [2, ru(t, 'POST', n, i, fu(s), !0, u)];
            });
        });
    }
    function iu(t, n, i, s) {
        return r(this, void 0, _e, function () {
            return e(this, function (r) {
                return [2, ru(t, 'GET', n, i, fu(s), !1)];
            });
        });
    }
    function ru(t, n, i, s, u, o, a) {
        return r(this, void 0, _e, function () {
            var r, c, h, f, v, l, d;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        switch (
                            ((r =
                                (function (t) {
                                    return Y(t, '_fs_request', 'function');
                                })(t) || eu),
                            (c = '//'.concat(s).concat(u)),
                            (h = {}),
                            null == a ? void 0 : a.type)
                        ) {
                            case 'string':
                            case 'ArrayBuffer':
                                h['Content-Type'] = Ai.TextPlain;
                        }
                        e.label = 1;
                    case 1:
                        return e.trys.push([1, 3, , 4]), [4, r(i, n, c, o, h, a)];
                    case 2:
                        return (f = e.sent()), [3, 4];
                    case 3:
                        throw ((v = e.sent()), wu.sendErr(v), v);
                    case 4:
                        if (((l = { text: f.responseText }), 200 == f.status)) return [2, l];
                        try {
                            d = pr(l.text);
                        } catch (t) {}
                        throw new Lr(f.status, l.text, d);
                }
            });
        });
    }
    function eu(t, n, i, s, u, o) {
        return r(this, void 0, _e, function () {
            var r;
            return e(this, function (e) {
                return (
                    (r = (function (t) {
                        switch (null == t ? void 0 : t.type) {
                            case 'string':
                            case 'ArrayBuffer':
                                return t.data;
                            case 'FormData':
                                var n = new FormData();
                                for (var i in t.data) {
                                    var r = t.data[i];
                                    if (void 0 !== r)
                                        if ('string' == typeof r) n.append(i, r);
                                        else {
                                            var e = new Blob([r.data], { type: r.contentType });
                                            n.append(i, e, r.filename);
                                        }
                                }
                                return n;
                            default:
                                return;
                        }
                    })(o)),
                    [
                        2,
                        new _e(function (e) {
                            var o = !1,
                                a = new XMLHttpRequest();
                            for (var c in ((a.onreadystatechange = function () {
                                a.readyState !== Zt ||
                                    o ||
                                    ((o = !0), e({ status: a.status, responseText: a.responseText }));
                            }),
                            a.open(n, ''.concat(t).concat(i), !0),
                            (a.withCredentials = s),
                            u))
                                a.setRequestHeader(c, u[c]);
                            a.send(r);
                        }),
                    ]
                );
            });
        });
    }
    function su(t, n, i) {
        return ou(''.concat(t, '//').concat(n).concat(Js(i), '&SkipResponseBody=true'), i.bundle[1]);
    }
    function uu(t, n, i, s) {
        return r(this, void 0, _e, function () {
            var r, u, o, a, c;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        (r = t.document.referrer),
                            (u = r ? Ms(r, { source: 'page', type: 'referrer' }) : ''),
                            (o = 'orgId='
                                .concat(s.orgId, '&userId=')
                                .concat(s.userId, '&sessionId=')
                                .concat(s.sessionId)),
                            (a = { referrer: u }),
                            (e.label = 1);
                    case 1:
                        return (
                            e.trys.push([1, 3, , 4]),
                            [4, nu(t, n, i, '/rec/beacon?'.concat(o), { type: 'string', data: fr(a) })]
                        );
                    case 2:
                        return e.sent(), [3, 4];
                    case 3:
                        return (c = e.sent()), 'failed to send session start beacon '.concat(c), [3, 4];
                    case 4:
                        return [2];
                }
            });
        });
    }
    function ou(t, n) {
        return (Y(window, '_fs_beacon', 'function') || au)(t, n);
    }
    function au(t, n) {
        if ('function' == typeof navigator.sendBeacon)
            try {
                return navigator.sendBeacon.bind(navigator)(t, n.data);
            } catch (t) {}
        return !1;
    }
    function cu(t, n, i, s) {
        var u;
        return r(this, void 0, _e, function () {
            var r, o;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        return (
                            (r = null !== (u = s.version) && void 0 !== u ? u : 'v1'),
                            (o = s.previewMode ? '?previewMode=true' : ''),
                            [4, iu(t, n, i, '/s/settings/'.concat(s.orgId, '/').concat(r, '/web').concat(o))]
                        );
                    case 1:
                        return [2, pr(e.sent().text)];
                }
            });
        });
    }
    function hu(t) {
        var n,
            i = null === (n = t.recording.pageResponse()) || void 0 === n ? void 0 : n.GCLBSubdomain,
            r = t.options.recHost;
        return i && X(r) ? r.replace(/^rs\./, ''.concat(i, '.')) : r;
    }
    function fu(t) {
        if (!window.Zone) return t;
        var n = '?';
        return t.indexOf(n) > -1 && (n = '&'), ''.concat(t).concat(n, 'ngsw-bypass=true');
    }
    var vu = /function\s*([\w\-$]+)?\s*\(/i;
    function lu(t) {
        return t.stack || t.backtrace || t.stacktrace;
    }
    function du() {
        var t, n;
        try {
            throw new Error('');
        } catch (i) {
            (t = '<generated>\n'), (n = lu(i));
        }
        if (!n) {
            t = '<generated-ie>\n';
            var i = [];
            try {
                for (var r = arguments.callee.caller.caller; r && i.length < 10; ) {
                    var e = (vu.test(r.toString()) && RegExp.$1) || '[anonymous]';
                    i.push(e), (r = r.caller);
                }
            } catch (t) {
                t.toString();
            }
            n = i.join('\n');
        }
        return t + n;
    }
    function pu() {
        try {
            return window.self !== window.top;
        } catch (t) {
            return !0;
        }
    }
    var wu = (function () {
        function t() {}
        return (
            (t.wrap = function (n) {
                return Ut(n, function (n) {
                    t.sendErr(n, 'error');
                });
            }),
            (t.ft = 15),
            (t.sendErr = function (n, i) {
                void 0 === i && (i = 'error'), t.send('', i, { err: n });
            }),
            (t.send = function (n, i, r) {
                if ((void 0 === r && (r = {}), !(t.ft <= 0 || (t.ft--, ut(window))))) {
                    var e = (function (t, n, i) {
                        var r;
                        void 0 === i && (i = {});
                        var e = (function (t) {
                                return Ji(t) && 'message' in t && 'name' in t;
                            })(i.err)
                                ? i.err
                                : new Error(t),
                            s =
                                t ||
                                e.message ||
                                ''.concat(null !== (r = i.err) && void 0 !== r ? r : '') ||
                                'unknown error';
                        e.message !== s && (i.msg = e.message);
                        var u = Nr(document).fs_uid,
                            o = u ? Ur(u) : void 0;
                        o && o.orgId != it(window) && (o = void 0);
                        var a = {
                                projectRoot: window.location.origin,
                                deviceTime: Kr(),
                                inIframe: pu(),
                                CompiledVersion: '424cc15e4916da4348dadfd296f8983af6582d5f',
                                CompiledTimestamp: 1728062580,
                                orgId: it(window),
                                'userId:sessionId': o ? ''.concat(o.userId, ':').concat(o.sessionId) : 'NA',
                                context: document.location && document.location.pathname,
                                message: s,
                                severity: n,
                                language: Sr(window),
                                stacktrace: lu(e) || du(),
                            },
                            c = function (t, n, i) {
                                var r = ''.concat(encodeURIComponent(n), '=').concat(encodeURIComponent(i));
                                t.push(r);
                            },
                            h = [];
                        for (var f in a) c(h, f, a[f] || '');
                        for (var f in i) {
                            var v = gu(i[f]);
                            c(h, 'aux_'.concat(f), v);
                        }
                        return 'https://'.concat(tt(window), '/rec/except?').concat(h.join('&'));
                    })(n, i, r);
                    ou(e, { data: '', type: 'string' }) || (new Image().src = e);
                }
            }),
            t
        );
    })();
    function gu(t) {
        try {
            var n = typeof t;
            switch (n) {
                case 'string':
                case 'number':
                case 'boolean':
                case 'undefined':
                    return ''.concat(t);
                default:
                    var i = ''.concat(n, ': ').concat(fr(t));
                    return 'function' == typeof t.toString && (i += ' (toString: '.concat(t.toString(), ')')), i;
            }
        } catch (t) {
            return 'failed to serialize "'.concat(null == t ? void 0 : t.message, '"');
        }
    }
    var mu = {};
    function yu(t, n, i) {
        return (
            void 0 === i && (i = 1),
            !!t ||
                ((mu[n] = mu[n] || 0), mu[n]++, !(mu[n] > i) && (wu.send('Assertion failed: '.concat(n), 'error'), t))
        );
    }
    var bu = {};
    function Su(t, n) {
        var i;
        void 0 === n && (n = {}),
            (bu[t] = null !== (i = bu[t]) && void 0 !== i ? i : 0),
            bu[t]++,
            bu[t] > 1 || wu.send(t, 'error', n);
    }
    function ku(t) {
        var n = t.target,
            i = t.type,
            r = t.fn,
            e = t.options;
        void 0 !== r &&
            null != n &&
            ('function' == typeof n.addEventListener
                ? n.addEventListener(i, r, e)
                : 'function' == typeof n.addListener
                  ? n.addListener(r)
                  : 'Target of '.concat(i, " doesn't seem to support listeners"));
    }
    function _u(t) {
        var n = t.target,
            i = t.type,
            r = t.fn,
            e = t.options;
        void 0 !== r &&
            null != n &&
            ('function' == typeof n.removeEventListener
                ? n.removeEventListener(i, r, e)
                : 'function' == typeof n.removeListener
                  ? n.removeListener(r)
                  : 'Target of '.concat(i, " doesn't seem to support listeners"));
    }
    function Au(t) {
        t.target && (_u(t), (t.target = null), (t.fn = void 0));
    }
    var Iu = (function () {
        function t() {
            var t = this;
            (this.vt = []), (this.lt = []), (this.dt = !0), (this.wt = !1);
            try {
                var n = Object.defineProperty({}, 'passive', {
                    get: function () {
                        (t.dt = { capture: !0, passive: !0 }), (t.wt = { capture: !1, passive: !0 });
                    },
                });
                window.addEventListener('test', Dt, n);
            } catch (t) {}
        }
        return (
            (t.prototype.add = function (t, n, i, r, e) {
                return void 0 === e && (e = !1), this.addCustom(t, n, i, r, e);
            }),
            (t.prototype.addCustom = function (t, n, i, r, e) {
                void 0 === e && (e = !1);
                var s = {
                    target: t,
                    type: n,
                    fn: wu.wrap(
                        cr(function (t) {
                            (e || !1 !== t.isTrusted || 'message' == n || t[Fi]) && r(t);
                        })
                    ),
                    options: i ? this.dt : this.wt,
                    index: this.vt.length,
                };
                return this.vt.push(s), ku(s), s;
            }),
            (t.prototype.clear = function () {
                for (var t = 0; t < this.vt.length; t++) this.vt[t].target && Au(this.vt[t]);
                this.vt = [];
            }),
            (t.prototype.createChild = function () {
                var n = new t();
                return this.lt.push(n), n;
            }),
            (t.prototype.removeChild = function (t) {
                var n = this.lt.indexOf(t);
                if (n > -1) return this.lt.splice(n, 1)[0];
            }),
            (t.prototype.refresh = function () {
                for (var t = 0, n = this.vt; t < n.length; t++) {
                    var i = n[t];
                    i.target && (_u(i), ku(i));
                }
                for (var r = 0, e = this.lt; r < e.length; r++) e[r].refresh();
            }),
            t
        );
    })();
    function Eu(t, n) {
        return n && t.pageLeft == n.pageLeft && t.pageTop == n.pageTop;
    }
    function Tu(t, n) {
        return n && t.width == n.width && t.height == n.height;
    }
    function Cu(t) {
        return { pageLeft: t.pageLeft, pageTop: t.pageTop, width: t.width, height: t.height };
    }
    function xu(t) {
        return 'BackCompat' == t.compatMode;
    }
    function Ku(t) {
        return t && t.body && t.documentElement
            ? xu(t)
                ? [t.body.clientWidth, t.body.clientHeight]
                : [t.documentElement.clientWidth, t.documentElement.clientHeight]
            : [0, 0];
    }
    var Ru = (function () {
        function t(t, n) {
            var i, r, e, s;
            (this.hasKnownPosition = !1),
                (this.pageLeft = 0),
                (this.pageTop = 0),
                (this.width = 0),
                (this.height = 0),
                (this.clientWidth = 0),
                (this.clientHeight = 0);
            var u = t.document;
            if (u && u.documentElement && u.body) {
                (i = Ku(u)), (this.clientWidth = i[0]), (this.clientHeight = i[1]);
                var o = t.visualViewport;
                if (o) {
                    (this.hasKnownPosition = !0),
                        (this.pageTop = o.pageTop - o.offsetTop),
                        (this.pageLeft = o.pageLeft - o.offsetLeft),
                        0 == this.pageTop && (this.pageTop = 0),
                        0 == this.pageLeft && (this.pageLeft = 0);
                    var a = null !== (e = Pu(t, 'innerWidth')) && void 0 !== e ? e : 0,
                        c = null !== (s = Pu(t, 'innerHeight')) && void 0 !== s ? s : 0;
                    if (a > 0 && c > 0) return (this.width = a), void (this.height = c);
                }
                if (
                    void 0 !== n &&
                    this.clientWidth == n.clientWidth &&
                    this.clientHeight == n.clientHeight &&
                    n.width > 0 &&
                    n.height > 0
                )
                    return (this.width = n.width), void (this.height = n.height);
                (r = this.gt(t)), (this.width = r[0]), (this.height = r[1]);
            }
        }
        return (
            (t.prototype.gt = function (t) {
                var n = Mu(t, 'width', this.clientWidth, this.clientWidth + 128);
                void 0 === n && (n = Pu(t, 'innerWidth')), void 0 === n && (n = this.clientWidth);
                var i = Mu(t, 'height', this.clientHeight, this.clientHeight + 128);
                return void 0 === i && (i = Pu(t, 'innerHeight')), void 0 === i && (i = this.clientHeight), [n, i];
            }),
            t
        );
    })();
    function Mu(t, n, i, r) {
        if (xt.matchMedia) {
            var e = i,
                s = r,
                u = xt.matchMedia(t, '(min-'.concat(n, ': ').concat(e, 'px)'));
            if (null != u) {
                if (u.matches && xt.matchMedia(t, '(max-'.concat(n, ': ').concat(e, 'px)')).matches) return e;
                for (; e <= s; ) {
                    var o = xt.mathFloor((e + s) / 2);
                    if (xt.matchMedia(t, '(min-'.concat(n, ': ').concat(o, 'px)')).matches) {
                        if (xt.matchMedia(t, '(max-'.concat(n, ': ').concat(o, 'px)')).matches) return o;
                        e = o + 1;
                    } else s = o - 1;
                }
            }
        }
    }
    function Ou(t, n) {
        return new Ru(t, n);
    }
    var ju = function (t, n) {
        (this.offsetLeft = 0),
            (this.offsetTop = 0),
            (this.pageLeft = 0),
            (this.pageTop = 0),
            (this.width = 0),
            (this.height = 0),
            (this.scale = 0);
        var i = t.document;
        if (i.body) {
            'pageXOffset' in t
                ? ((this.pageLeft = t.pageXOffset), (this.pageTop = t.pageYOffset))
                : i.scrollingElement
                  ? ((this.pageLeft = i.scrollingElement.scrollLeft), (this.pageTop = i.scrollingElement.scrollTop))
                  : xu(i)
                    ? ((this.pageLeft = i.body.scrollLeft), (this.pageTop = i.body.scrollTop))
                    : i.documentElement && (i.documentElement.scrollLeft > 0 || i.documentElement.scrollTop > 0)
                      ? ((this.pageLeft = i.documentElement.scrollLeft), (this.pageTop = i.documentElement.scrollTop))
                      : ((this.pageLeft = i.body.scrollLeft || 0), (this.pageTop = i.body.scrollTop || 0)),
                (this.offsetLeft = this.pageLeft - n.pageLeft),
                (this.offsetTop = this.pageTop - n.pageTop);
            var r = 0,
                e = 0;
            try {
                (r = t.innerWidth), (e = t.innerHeight);
            } catch (t) {
                return;
            }
            if (0 != r && 0 != e) {
                (this.scale = n.width / r), this.scale < 1 && (this.scale = 1);
                var s = n.width - n.clientWidth,
                    u = n.height - n.clientHeight;
                (this.width = r - s / this.scale), (this.height = e - u / this.scale);
            }
        }
    };
    function Pu(t, n) {
        try {
            return t[n];
        } catch (t) {
            return;
        }
    }
    function Uu(t) {
        var n = [t.clientWidth, t.clientHeight];
        return (t.width === t.clientWidth && t.height === t.clientHeight) || n.push(t.width, t.height), n;
    }
    function Nu(t) {
        var n = t.tagName;
        return n ? ('object' == typeof n ? 'form' : n.toLowerCase()) : null;
    }
    var Lu = /(\s*(\S+)(\s+(?:\d+w|[\d.]+x)){0,1}\s*[,])/gm,
        Du = /((\s*(\S+)(\s+(?:\d+w|[\d.]+x)){0,1}\s*(\s*\d+\S){0,1}(\s*\d+(.\d*){0,1}\S){0,1}\s*)[,])/gm,
        Fu = {},
        Bu = 1;
    function Wu(t, n) {
        var i, r;
        return (
            void 0 === n && (n = qu(t)),
            null !== (r = null === (i = null == n ? void 0 : n.watchKind) || void 0 === i ? void 0 : i.hasKinds()) &&
                void 0 !== r &&
                r
        );
    }
    function Hu(t, n) {
        var i, r;
        return (
            void 0 === n && (n = qu(t)),
            null !==
                (r = null === (i = null == n ? void 0 : n.watchKind) || void 0 === i ? void 0 : i.has(cs.Exclude)) &&
                void 0 !== r &&
                r
        );
    }
    function zu(t, n) {
        return void 0 === n && (n = qu(t)), !!n && !!n.mask;
    }
    function qu(t) {
        var n = t ? t[Bi] : null;
        return n ? Fu[n] : null;
    }
    function $u(t) {
        return Fu[t];
    }
    function Vu(t) {
        try {
            return (t && t[Bi]) || 0;
        } catch (t) {
            return 0;
        }
    }
    function Gu(t) {
        return t && !Hu(t) ? Vu(t) : 0;
    }
    function Qu(t, n) {
        t.parent &&
            (n(t),
            t.parent.child == t && (t.parent.child = t.next),
            t.parent.lastChild == t && (t.parent.lastChild = t.prev),
            t.prev && (t.prev.next = t.next),
            t.next && (t.next.prev = t.prev),
            (t.parent = t.prev = t.next = null),
            delete Fu[t.id],
            t.node[Bi] == t.id && (t.node[Bi] = 0),
            (t.id = 0),
            t.child && Xu(t.child, n),
            t.shadow && Xu(t.shadow, n));
    }
    function Xu(t, n) {
        for (var i = [t]; i.length > 0 && i.length < 1e4; ) {
            var r = i.pop();
            n(r),
                delete Fu[r.id],
                r.node[Bi] == r.id && (r.node[Bi] = 0),
                (r.id = 0),
                r.next && i.push(r.next),
                r.child && i.push(r.child),
                r.shadow && i.push(r.shadow);
        }
        yu(i.length < 1e4, 'clearIds is fast');
    }
    var Yu,
        Ju,
        Zu = (function (t, n, i) {
            function r(n, i) {
                var r = 0;
                try {
                    t(n, function (t, n) {
                        if (r++ > i) throw 'break';
                        if ('object' == typeof n) return n;
                    });
                } catch (t) {
                    return 'break' != t;
                }
                return !1;
            }
            var e = function (t, n, i) {
                return (
                    void 0 === i && (i = '...'),
                    t.length <= n
                        ? t
                        : t.length <= i.length || n <= i.length
                          ? t.substring(0, n)
                          : t.substring(0, n - i.length) + i
                );
            };
            function s(r, u, o, a) {
                if (u < 1) return 0;
                var c = (function (t) {
                    switch (!0) {
                        case (function (t) {
                            return !(!t || t.constructor != Date);
                        })(t):
                            return (n = t), isNaN(n) ? 'Invalid Date' : n.toUTCString();
                        case (function (t) {
                            return 'object' == typeof Node
                                ? t instanceof Node
                                : t && 'object' == typeof t && t.nodeType > 0 && 'string' == typeof t.nodeName;
                        })(t):
                            return (function (t) {
                                return t.toString();
                            })(t);
                        case void 0 === t:
                            return 'undefined';
                        case 'object' != typeof t || null == t:
                            return t;
                        case t instanceof Error:
                            return [t.toString(), t.stack].filter(Boolean).join(',');
                    }
                    var n;
                })(r);
                if (void 0 !== c) {
                    var h = (function (n, i) {
                        var r = t(n);
                        return r && '"' == r[0] ? e(r, i, '..."') : r;
                    })(c, u);
                    return 'string' == typeof h && h.length <= u ? (a.tokens.push(h), h.length) : 0;
                }
                if (a.cyclic) {
                    a.opath.splice(o);
                    var f = a.opath.lastIndexOf(r);
                    if (f > -1) {
                        var v = '<Cycle to ancestor #'.concat(o - f - 1, '>');
                        return (v = '"'.concat(e(v, u - 2), '"')), a.tokens.push(v), v.length;
                    }
                    a.opath.push(r);
                }
                var l = u,
                    d = function (t) {
                        return l >= t.length && ((l -= t.length), a.tokens.push(t), !0);
                    },
                    p = function (t) {
                        var n = a.tokens.length - 1;
                        ',' === a.tokens[n] ? (a.tokens[n] = t) : d(t);
                    };
                if (l < 2) return 0;
                if (n(r)) {
                    d('[');
                    for (var w = 0; w < r.length && l > 0; w++) {
                        var g = s(r[w], l - 1, o + 1, a);
                        if (((l -= g), 0 == g && !d('null'))) break;
                        d(',');
                    }
                    p(']');
                } else {
                    d('{');
                    var m = i(r);
                    for (w = 0; w < m.length && l > 0; w++) {
                        var y = m[w],
                            b = r[y];
                        if (!d('"'.concat(y, '":'))) break;
                        if (0 == (g = s(b, l - 1, o + 1, a))) {
                            a.tokens.pop();
                            break;
                        }
                        (l -= g), d(',');
                    }
                    p('}');
                }
                return u == 1 / 0 ? 1 : u - l;
            }
            return function (t, n) {
                void 0 === n && (n = 1024);
                try {
                    var i = { tokens: [], opath: [], cyclic: r(t, n / 4) };
                    return s(t, n, 0, i), i.tokens.join('');
                } catch (t) {
                    return xn(t);
                }
            };
        })(xt.jsonStringify, Gi, rr),
        to = (function () {
            function t() {
                var n = this;
                (this.yt = 0),
                    (this.bt = t.St++),
                    (this.kt = wu.wrap(function () {
                        n._t(), n.At && n.At();
                    }));
            }
            return (
                (t.checkForBrokenSchedulers = function () {
                    return r(this, void 0, _e, function () {
                        var n, i;
                        return e(this, function (r) {
                            switch (r.label) {
                                case 0:
                                    return !xt.requestWindowAnimationFrame || t.It || (n = Kr()) - t.Et < 100
                                        ? [2, !1]
                                        : ((t.Et = n),
                                          (t.It = !0),
                                          [
                                              4,
                                              new _e(function (t) {
                                                  return xt.requestWindowAnimationFrame(window, t);
                                              }),
                                          ]);
                                case 1:
                                    return (
                                        r.sent(),
                                        (i = []),
                                        sr(t.Tt, function (t) {
                                            var r = t.Ct(n);
                                            r && i.push(r);
                                        }),
                                        [4, _e.all(i)]
                                    );
                                case 2:
                                    return (
                                        r.sent(),
                                        xt.requestWindowAnimationFrame(
                                            window,
                                            wu.wrap(function () {
                                                t.It = !1;
                                            })
                                        ),
                                        [2, !0]
                                    );
                            }
                        });
                    });
                }),
                (t.stopAll = function () {
                    sr(this.Tt, function (t) {
                        return t.stop();
                    });
                }),
                (t.prototype.xt = function (t) {
                    this.At = t;
                }),
                (t.prototype.stop = function () {
                    this.Kt(), delete t.Tt[this.bt];
                }),
                (t.prototype.Rt = function (n) {
                    (this.yt = Kr() + 100 + 1.5 * n), (t.Tt[this.bt] = this);
                }),
                (t.prototype.Mt = function () {
                    return null != t.Tt[this.bt];
                }),
                (t.prototype._t = function () {
                    delete t.Tt[this.bt];
                }),
                (t.prototype.Ct = function (t) {
                    if (t > this.yt)
                        return _e
                            .resolve()
                            .then(this.kt)
                            ['catch'](function () {});
                }),
                (t.Tt = {}),
                (t.St = 0),
                (t.It = !1),
                (t.Et = 0),
                t
            );
        })(),
        no = (function (t) {
            function i(n) {
                var i = t.call(this) || this;
                return (i.Ot = n), (i.jt = -1), i;
            }
            return (
                n(i, t),
                (i.prototype.start = function (t, n) {
                    var i = this;
                    void 0 === n && (n = this.Ot),
                        -1 == this.jt &&
                            ((this.Ot = n),
                            this.xt(function () {
                                t(), i.Rt(i.Ot);
                            }),
                            (this.jt = xt.setWindowInterval(window, this.kt, this.Ot)),
                            this.Rt(this.Ot));
                }),
                (i.prototype.Kt = function () {
                    -1 != this.jt && (xt.clearWindowInterval(window, this.jt), (this.jt = -1), this.xt(function () {}));
                }),
                i
            );
        })(to),
        io = (function (t) {
            function i(n, i, r) {
                void 0 === i && (i = 0);
                for (var e = [], s = 3; s < arguments.length; s++) e[s - 3] = arguments[s];
                var u = t.call(this) || this;
                return (
                    (u.Pt = i),
                    (u.Ut = -1),
                    u.xt(function () {
                        u.stop(), n.apply(void 0 === r ? window : r, e);
                    }),
                    u
                );
            }
            return (
                n(i, t),
                (i.prototype.start = function (t) {
                    return (
                        void 0 === t && (t = this.Pt),
                        (this.Pt = t),
                        xt.clearWindowTimeout(window, this.Ut),
                        (this.Ut = xt.setWindowTimeout(window, this.kt, this.Pt)),
                        this.Rt(t),
                        this
                    );
                }),
                (i.prototype.isRunning = function () {
                    return this.Mt();
                }),
                (i.prototype.Kt = function () {
                    -1 != this.Ut && (xt.clearWindowTimeout(window, this.Ut), (this.Ut = -1));
                }),
                i
            );
        })(to),
        ro = (function () {
            function t(t, n, i) {
                (this.Nt = t), (this.Lt = i), (this.G = 0), (this.Dt = new no(n)), this.open();
            }
            return (
                (t.prototype.guard = function (t) {
                    var n = this;
                    return function () {
                        for (var i = [], r = 0; r < arguments.length; r++) i[r] = arguments[r];
                        return 0 == n.G ? (n.Lt(), void n.G--) : n.G < 0 ? void 0 : (n.G--, t.apply(this, i));
                    };
                }),
                (t.prototype.close = function () {
                    return this.Dt.stop(), this;
                }),
                (t.prototype.open = function () {
                    var t = this;
                    return (
                        (this.G = this.Nt),
                        this.Dt.start(function () {
                            t.G = t.Nt;
                        }),
                        this
                    );
                }),
                t
            );
        })(),
        eo = (function () {
            function t() {
                (this.Ft = 0), (this.Bt = Kr());
            }
            return (
                (t.prototype.wallTime = function () {
                    return Kr();
                }),
                (t.prototype.now = function () {
                    var t = this.wallTime() - this.Bt;
                    return t < 0 && this.Wt('timekeeper now() is negative'), t;
                }),
                (t.prototype.startTime = function () {
                    return this.Bt;
                }),
                (t.prototype.setStartTime = function (t) {
                    var n = this.wallTime();
                    (this.Bt = t),
                        t > n && ((this.Ft = t - n), this.Ft > 1e3 && this.Wt('timekeeper set with future ts'));
                }),
                (t.prototype.Wt = function (t) {
                    Zu({ msg: t, skew: this.Ft, startTime: this.Bt, wallTime: this.wallTime() }, 1024);
                }),
                t
            );
        })();
    ((Ju = Yu || (Yu = {})).Indeterminate = 'indeterminate'), (Ju.Checked = 'checked'), (Ju.Value = 'value');
    var so = (function () {
        function t(t, n) {
            var i;
            (this.ut = t),
                (this.Ht = n),
                (this.zt = !1),
                (this.qt = {}),
                (this.$t = (((i = {})[Yu.Checked] = {}), (i[Yu.Indeterminate] = {}), (i[Yu.Value] = {}), i)),
                (this.Vt = {}),
                (this.Gt = []),
                (this.Qt = {}),
                (this.Xt = !1),
                (this.Yt = !1),
                (this.Jt = {}),
                (this.Zt = null),
                (this.t = t.window.document);
        }
        return (
            (t.prototype.start = function () {
                this.tn() || (this.zt = !0);
            }),
            (t.prototype.hookInstance = function (t, n) {
                if ('input' === Nu(n))
                    switch (n.type) {
                        case 'checkbox':
                        case 'radio':
                            this.nn(t, n, 'checked');
                            break;
                        default:
                            this.nn(t, n, 'value');
                    }
            }),
            (t.prototype.addInput = function (t) {
                if (t) {
                    var n = Gu(t);
                    if (n) {
                        if ('input' === Nu(t)) {
                            var i = t;
                            this.rn(n, i), i.indeterminate && this.en(i, !0);
                        }
                        var r = !1;
                        if (
                            ((function (t) {
                                switch (t.type) {
                                    case 'checkbox':
                                        return t.checked != t.hasAttribute('checked');
                                    case 'radio':
                                        return t.checked || t.hasAttribute('checked');
                                    default:
                                        return (
                                            (t.value || '') !=
                                            (function (t) {
                                                if ('select' != Nu(t)) return t.getAttribute('value') || '';
                                                var n = t,
                                                    i =
                                                        n.querySelector('option[selected]') ||
                                                        n.querySelector('option');
                                                return (i && i.value) || '';
                                            })(t)
                                        );
                                }
                            })(t) && (this.sn(t, !1, !0), (r = !0)),
                            this.zt && (this.qt[n] = { elem: t }),
                            !r)
                        )
                            if (co(t)) {
                                var e = uo(t);
                                t.checked && (this.Vt[e] = n);
                            } else this.un(n, Yu.Value, ao(t, this.ut.window));
                    }
                }
            }),
            (t.prototype.un = function (t, n, i) {
                this.$t[n][t] = i;
            }),
            (t.prototype.on = function (t, n) {
                return this.$t[n][t];
            }),
            (t.prototype.an = function (t) {
                for (var n in this.$t) delete this.$t[n][t];
            }),
            (t.prototype.rn = function (t, n) {
                if (this.Xt) this.Yt && this.hookInstance(t, n);
                else {
                    var i = 'checkbox' === n.type || 'radio' === n.type ? 'checked' : 'value',
                        r = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, i),
                        e = Object.getOwnPropertyDescriptor(n, i);
                    r && e && r !== e && ((this.Yt = !0), this.hookInstance(t, n)), (this.Xt = !0);
                }
            }),
            (t.prototype.cn = function (t, n) {
                void 0 === n && (n = ao(t, this.ut.window));
                var i = Gu(t);
                if (!t || !i) return !1;
                if (co(t)) {
                    var r = uo(t);
                    return (this.Vt[r] === i) != ('true' === n);
                }
                return this.on(i, Yu.Value) !== n;
            }),
            (t.prototype.onChange = function (t, n, i) {
                void 0 === i && (i = ao(t, this.ut.window));
                var r = Gu(t);
                t && r && (n || this.cn(t, i)) && this.sn(t, n);
            }),
            (t.prototype.onInputChange = function (t) {
                if (t) {
                    var n = t;
                    if (n.nodeType === Node.ELEMENT_NODE) {
                        var i = Vu(n);
                        if (i) {
                            var r = n,
                                e = ao(r, this.ut.window);
                            this.hn(i, r, e);
                        }
                    }
                }
            }),
            (t.prototype.onKeyboardChange = function (t) {
                var n,
                    i = (function (t) {
                        for (var n = t.activeElement; n && n.shadowRoot; ) {
                            var i = n.shadowRoot.activeElement;
                            if (!i) return n;
                            n = i;
                        }
                        return n;
                    })(this.t);
                i && ('value' in (n = i) || 'checked' in n) && !Hu(i) && this.cn(i) && this.sn(i, t);
            }),
            (t.prototype.tick = function () {
                for (var t in this.qt) {
                    var n = this.qt[t],
                        i = n.elem;
                    if (Gu(i))
                        try {
                            delete this.qt[t];
                            var r = ao(i, this.ut.window);
                            if (this.cn(i, r)) this.sn(i);
                            else if (n.noFsIdInOption) {
                                var e = i;
                                Array.prototype.slice.call(e.options).every(function (t) {
                                    return Gu(t);
                                }) && ((n.noFsIdInOption = !1), this.sn(i));
                            }
                        } finally {
                            this.zt && (this.qt[t] = n);
                        }
                    else delete this.qt[t], this.an(t), co(i) && delete this.Vt[uo(i)];
                }
            }),
            (t.prototype.stop = function () {
                for (var t, n = 0, i = this.Gt; n < i.length; n++) (e = i[n])();
                for (var r in this.Qt) {
                    var e;
                    (e = this.Qt[r]) && 'function' == typeof e && e();
                }
                (this.$t = (((t = {})[Yu.Checked] = {}), (t[Yu.Indeterminate] = {}), (t[Yu.Value] = {}), t)),
                    (this.Gt = []),
                    (this.Qt = {}),
                    (this.Xt = !1),
                    (this.Yt = !1);
            }),
            (t.prototype.removeInput = function (t) {
                var n = Gu(t);
                n && (this.Qt[n] && (this.Qt[n](), delete this.Qt[n]), this.an(n));
            }),
            (t.prototype.sn = function (t, n, i) {
                var r = this;
                void 0 === n && (n = !1), void 0 === i && (i = !1);
                var e = Gu(t);
                if (t && e && !this.vn(e, t)) {
                    var s = ao(t, this.ut.window);
                    if (co(t)) {
                        var u = uo(t);
                        'false' === s && this.Vt[u] === e ? delete this.Vt[u] : 'true' === s && (this.Vt[u] = e);
                    } else this.un(e, Yu.Value, s);
                    this.ut.measurer.enqueue(function () {
                        var u = t.getBoundingClientRect(),
                            o = u.width > 0 && u.height > 0,
                            a = zu(t) ? as(s) : s;
                        r.Ht.enqueue({ Kind: cn.VALUECHANGE, Args: [e, a, n, o, i] });
                    });
                }
            }),
            (t.prototype.vn = function (t, n) {
                if (this.qt[t]) return !0;
                if ('select' !== Nu(n)) return !1;
                for (var i = n.options, r = 0; r < i.length; r++)
                    if (!Gu(i[r])) return (this.qt[t] = { elem: n, noFsIdInOption: !0 }), !0;
                return !1;
            }),
            (t.prototype.en = function (t, n) {
                var i = Gu(t);
                i && this.ln(i, Yu.Indeterminate, n);
            }),
            (t.prototype.ln = function (t, n, i) {
                this.on(t, n) !== i && (this.un(t, n, i), this.Ht.enqueue({ Kind: cn.ELEMENT_PROP, Args: [t, n, i] }));
            }),
            (t.prototype.tn = function () {
                var t = this,
                    n = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
                return !(
                    !n ||
                    !n.set ||
                    (this.dn(HTMLInputElement, 'value'),
                    this.dn(HTMLInputElement, 'checked'),
                    this.dn(HTMLSelectElement, 'value'),
                    this.dn(HTMLTextAreaElement, 'value'),
                    this.dn(HTMLSelectElement, 'selectedIndex'),
                    this.dn(HTMLOptionElement, 'selected'),
                    this.Gt.push(
                        yr(HTMLInputElement, Yu.Indeterminate, function (n, i) {
                            return t.en(n, !!i);
                        })
                    ),
                    0)
                );
            }),
            (t.prototype.pn = function () {
                try {
                    for (var t in this.Jt) {
                        var n = this.Jt[t],
                            i = n[0],
                            r = n[1];
                        this.onChange(i, !1, r);
                    }
                } finally {
                    (this.Zt = null), (this.Jt = {});
                }
            }),
            (t.prototype.wn = function (t) {
                var n = this;
                return function (i, r) {
                    var e = oo(i),
                        s = Gu(e);
                    if (s) {
                        t === Yu.Checked && n.ln(s, Yu.Checked, r);
                        var u = e !== i ? ao(e, n.ut.window) : r;
                        n.cn(e, ''.concat(u)) && n.hn(s, e, ''.concat(u));
                    }
                };
            }),
            (t.prototype.hn = function (t, n, i) {
                (this.Jt[t] = [n, i]), this.Zt || ((this.Zt = new io(this.pn.bind(this))), this.Zt.start());
            }),
            (t.prototype.dn = function (t, n) {
                this.Gt.push(yr(t, n, this.wn(n)));
            }),
            (t.prototype.nn = function (t, n, i) {
                this.Qt[t] = br(n, i, this.wn(i));
            }),
            t
        );
    })();
    function uo(t) {
        if (!t) return '';
        for (var n = t; n && 'form' !== Nu(n); ) n = Tn(n);
        var i = n && 'form' == Nu(n) ? Vu(n) : 0,
            r = t.name || '_fs_'.concat(Vu(t));
        return ''.concat(i, ':').concat(r);
    }
    function oo(t, n) {
        if ((void 0 === n && (n = 2), n <= 0)) return t;
        var i = Nu(t),
            r = Tn(t);
        return ('option' !== i && 'optgroup' !== i) || (null == r ? void 0 : r.nodeType) !== Yt ? t : oo(r, n - 1);
    }
    function ao(t, n) {
        if ((void 0 === n && (n = window), !t)) return '';
        switch (t.type) {
            case 'checkbox':
            case 'radio':
                return ''.concat(t.checked);
            default:
                var i =
                    (function (t) {
                        return !!Y(t, '_fs_clean_value_getter', 'boolean');
                    })(n) && xt.inputGetValue
                        ? xt.inputGetValue(t)
                        : t.value;
                return i || (i = ''), ''.concat(i);
        }
    }
    function co(t) {
        return t && 'radio' == t.type;
    }
    var ho = (function () {
        function t(t, n, i) {
            var r = this;
            (this.gn = new Bt(void 0, g)),
                (this.mn = !1),
                (this.yn = !1),
                (this.St = 1),
                (this.bn = []),
                (this.Sn = []),
                (this.kn = wu.wrap(function (t) {
                    var n = (function (t, n) {
                            void 0 === n && (n = window);
                            var i = n.KeyframeEffect,
                                r = t.effect;
                            return r && (void 0 === i || r instanceof i) ? r : null;
                        })(t, r._n),
                        i = (function (t, n) {
                            void 0 === n && (n = window);
                            var i = n.DocumentTimeline,
                                r = t.timeline;
                            return r && (void 0 === i || r instanceof i) ? r : null;
                        })(t, r._n),
                        e = po(t);
                    if (
                        (null == n ? void 0 : n.target) &&
                        0 !== Gu(null == n ? void 0 : n.target) &&
                        i === r._n.document.timeline &&
                        e === fn.Animation
                    ) {
                        var u = Vu(n.target);
                        if (r.gn.has(n)) {
                            var o = r.gn.get(n) || [],
                                a = ((c = o[0]), o.slice(1));
                            -1 === a.indexOf(u) && (r.An(n, u), r.gn.set(n, s(s([c], a, !0), [u], !1)));
                        } else {
                            var c = r.St++;
                            r.gn.set(n, [c, u]),
                                r.In.enqueue({ Kind: cn.KEYFRAME_EFFECT_CREATED, Args: [c, u, lo(n), vo(n)] });
                        }
                        if (!r.gn.has(t)) {
                            var h = r.St++,
                                f = ((c = r.En(n)), r.En(i));
                            switch (
                                (r.gn.set(t, [h]),
                                r.In.enqueue({ Kind: cn.ANIMATION_CREATED, Args: [h, po(t), c, f] }),
                                t.playState)
                            ) {
                                case 'finished':
                                    r.In.enqueue({ Kind: cn.ANIMATION_METHOD_CALLED, Args: [h, ['finish', []]] });
                                    break;
                                case 'paused':
                                case 'running':
                                    r.In.enqueue({
                                        Kind: cn.ANIMATION_PROPERTY_SET,
                                        Args: [h, ['currentTime', t.currentTime]],
                                    });
                                    var v = 'paused' === t.playState ? 'pause' : 'play';
                                    r.In.enqueue({ Kind: cn.ANIMATION_METHOD_CALLED, Args: [h, [v, []]] });
                            }
                            r.vt.add(t, 'cancel', !0, function () {
                                r.In.enqueue({ Kind: cn.ANIMATION_METHOD_CALLED, Args: [h, ['cancel', []]] });
                            }),
                                r.vt.add(t, 'finish', !0, function () {
                                    r.In.enqueue({ Kind: cn.ANIMATION_METHOD_CALLED, Args: [h, ['finish', []]] });
                                });
                        }
                    }
                })),
                (this.In = n),
                (this._n = t.window),
                (this.vt = i.createChild()),
                (this.yn = (function (t) {
                    void 0 === t && (t = window);
                    var n = t.Animation,
                        i = t.Document,
                        r = t.Element;
                    return (
                        void 0 !== n &&
                        void 0 !== n.prototype &&
                        'effect' in n.prototype &&
                        'getAnimations' in i.prototype &&
                        'animate' in r.prototype
                    );
                })(this._n));
        }
        return (
            Object.defineProperty(t.prototype, 'nextId', {
                get: function () {
                    return this.St;
                },
                enumerable: !1,
                configurable: !0,
            }),
            (t.prototype.snapshot = function (t) {
                var n;
                if (this.Tn(t))
                    for (var i = 0, r = null !== (n = t.getAnimations()) && void 0 !== n ? n : []; i < r.length; i++) {
                        var e = r[i];
                        this.kn(e);
                    }
            }),
            (t.prototype.Tn = function (t) {
                return this.mn && this.yn && 'getAnimations' in t;
            }),
            (t.prototype.start = function (t) {
                var n,
                    i = this;
                t.CaptureAnimations &&
                    (this.In.enqueue({ Kind: cn.REC_FEAT_SUPPORTED, Args: [Gn.WebAnimation, this.yn] }),
                    this.yn &&
                        ((this.mn = !0),
                        this.Cn(
                            null === (n = mr(this._n.Element.prototype, 'animate')) || void 0 === n
                                ? void 0
                                : n.afterSync(function (t) {
                                      i.kn(t.result);
                                  })
                        ),
                        this.xn('play'),
                        this.xn('pause'),
                        this.xn('cancel'),
                        this.xn('finish'),
                        this.Kn('updateTiming'),
                        this.Kn('setKeyframes'),
                        this.bn.push(
                            yr(KeyframeEffect, 'target', function (t, n) {
                                i.An(t, Vu(n));
                            })
                        )));
            }),
            (t.prototype.stop = function () {
                this.vt.clear(),
                    (this.mn = !1),
                    this.Sn.forEach(function (t) {
                        return t && t.disable();
                    }),
                    (this.Sn = []),
                    this.bn.forEach(function (t) {
                        return t();
                    }),
                    (this.bn = []);
            }),
            (t.prototype.An = function (t, n) {
                var i = this.En(t);
                i && this.In.enqueue({ Kind: cn.KEYFRAME_EFFECT_PROPERTY_SET, Args: [i, ['target', n]] });
            }),
            (t.prototype.En = function (t) {
                return (this.gn.get(t) || [])[0];
            }),
            (t.prototype.Cn = function (t) {
                t && this.Sn.push(t);
            }),
            (t.prototype.xn = function (t) {
                var n,
                    i = this;
                this.Cn(
                    null === (n = mr(Animation.prototype, t)) || void 0 === n
                        ? void 0
                        : n.afterSync(function (n) {
                              var r = i.En(n.that);
                              r && i.In.enqueue({ Kind: cn.ANIMATION_METHOD_CALLED, Args: [r, [t, []]] });
                          })
                );
            }),
            (t.prototype.Kn = function (t) {
                var n,
                    i = this;
                this.Cn(
                    null === (n = mr(KeyframeEffect.prototype, t)) || void 0 === n
                        ? void 0
                        : n.afterSync(function (n) {
                              var r,
                                  e = i.En(n.that);
                              if (e)
                                  switch (t) {
                                      case 'updateTiming':
                                          var s = n.args[0];
                                          i.In.enqueue({
                                              Kind: cn.KEYFRAME_EFFECT_METHOD_CALLED,
                                              Args: [e, ['updateTiming', [fo(s)]]],
                                          });
                                          break;
                                      case 'setKeyframes':
                                          var u = n.args[0];
                                          i.In.enqueue({
                                              Kind: cn.KEYFRAME_EFFECT_METHOD_CALLED,
                                              Args: [
                                                  e,
                                                  [
                                                      'setKeyframes',
                                                      [
                                                          ((r = u),
                                                          (xt.arrayIsArray(r) ? r : [r]).map(function (t) {
                                                              var n = [];
                                                              return (
                                                                  sr(t, function (t, i) {
                                                                      n.push([i, t]);
                                                                  }),
                                                                  [n, null, null, null]
                                                              );
                                                          })),
                                                      ],
                                                  ],
                                              ],
                                          });
                                  }
                          })
                );
            }),
            t
        );
    })();
    function fo(t) {
        return [
            t.delay,
            t.direction,
            t.duration,
            t.easing,
            t.endDelay,
            t.fill,
            t.iterationStart,
            ''.concat(t.iterations),
        ];
    }
    function vo(t) {
        var n = t.getTiming(),
            i = t.composite,
            r = void 0 === i ? 'replace' : i,
            e = t.iterationComposite,
            u = void 0 === e ? 'replace' : e;
        return s(s([], fo(n), !0), [r, u], !1);
    }
    function lo(t) {
        return t.getKeyframes().map(function (t) {
            var n = t.composite,
                i = t.easing,
                r = t.offset,
                e = [];
            return (
                sr(t, function (t, n) {
                    'composite' !== n && 'computedOffset' !== n && 'easing' !== n && 'offset' !== n && e.push([n, t]);
                }),
                [e, n, i, r]
            );
        });
    }
    function po(t) {
        return 'animationName' in t ? fn.CSSAnimation : 'transitionProperty' in t ? fn.CSSTransition : fn.Animation;
    }
    var wo,
        go,
        mo,
        yo,
        bo = '#polyfillshadow';
    function So(t, n, i, r) {
        var e;
        try {
            var s = 'invalid: no sanitizers';
            if (!yu(t.length > 0, s)) throw s;
            for (var u = 0, o = t; u < o.length; u++) o[u].sanitize(i);
        } catch (t) {
            (i[mo.Attrs] = void 0),
                (i[mo.Text] = void 0),
                'sanitizer failed: '.concat(t),
                wu.send('sanitizer failed: '.concat(t), 'error', { err: t });
        }
        var a = i;
        if (r)
            try {
                r(a);
            } catch (t) {
                'visitorPipeline action failed: '.concat(t),
                    wu.send('visitorPipeline action failed: '.concat(t), 'error', { err: t });
            }
        if (!(null === (e = i[mo.Mirror].watchKind) || void 0 === e ? void 0 : e.has(cs.Exclude)))
            for (var c = 0, h = n; c < h.length; c++) {
                var f = h[c];
                try {
                    f.visit(a);
                } catch (t) {
                    'visitor failed: '.concat(t), wu.send('visitor failed: '.concat(t), 'error', { err: t });
                }
            }
    }
    ((go = wo || (wo = {}))[(go.New = 0)] = 'New'),
        (go[(go.Update = 1)] = 'Update'),
        ((yo = mo || (mo = {}))[(yo.Context = 0)] = 'Context'),
        (yo[(yo.Mirror = 1)] = 'Mirror'),
        (yo[(yo.Attrs = 2)] = 'Attrs'),
        (yo[(yo.Text = 3)] = 'Text');
    var ko = (function () {
        function t() {
            (this.Rn = 0), (this.Mn = {}), (this.Mn.next = this.Mn.prev = this.Mn);
        }
        return (
            (t.prototype.first = function () {
                return this.Mn.next.value;
            }),
            (t.prototype.last = function () {
                return this.Mn.prev.value;
            }),
            (t.prototype.size = function () {
                return this.Rn;
            }),
            (t.prototype.push = function (t) {
                this.Rn++, _o(this.Mn.prev, { value: t });
            }),
            (t.prototype.unshift = function (t) {
                this.Rn++, _o(this.Mn, { value: t });
            }),
            (t.prototype.pop = function () {
                return this.Rn > 0 && this.Rn--, Ao(this.Mn.prev);
            }),
            (t.prototype.shift = function () {
                return this.Rn > 0 && this.Rn--, Ao(this.Mn.next);
            }),
            t
        );
    })();
    function _o(t, n) {
        var i = t.next;
        (n.next = i), (n.prev = t), (t.next = i.prev = n);
    }
    function Ao(t) {
        var n = t.prev,
            i = t.next;
        return (n.next = i), (i.prev = n), t.value;
    }
    var Io,
        Eo,
        To = {
            timeRemaining: function () {
                return 1;
            },
            didTimeout: !1,
        };
    ((Eo = Io || (Io = {}))[(Eo.Idle = 0)] = 'Idle'),
        (Eo[(Eo.Scheduled = 1)] = 'Scheduled'),
        (Eo[(Eo.Processing = 2)] = 'Processing');
    var Co = (function () {
        function t(t) {
            void 0 === t && (t = 1),
                (this.On = t),
                (this.St = 1),
                (this.jn = Io.Idle),
                (this.Pn = new ko()),
                (this.Un = {}),
                (this.Nn = 1);
        }
        return (
            (t.prototype.enqueue = function (t, n) {
                var i = this;
                if ((void 0 === n && (n = !1), !(this.jn === Io.Processing && this.Nn > 16))) {
                    var r = { id: this.St++, isCompleted: !1, process: t, depth: this.Nn, store: n };
                    return (
                        this.Pn.push(r),
                        this.Ln(),
                        n
                            ? function () {
                                  return i.Dn(r);
                              }
                            : void 0
                    );
                }
                Su('deep recursive task found');
            }),
            (t.prototype.Dn = function (t) {
                try {
                    var n = t.id,
                        i = this.Un[n];
                    return i
                        ? (delete this.Un[n], [i.result, i.err])
                        : (xo(To, t), yu(t.isCompleted, 'failed to complete task'), [t.result, t.err]);
                } finally {
                    (t.result = void 0), (t.err = void 0);
                }
            }),
            (t.prototype.flush = function () {
                this.Fn(To);
            }),
            (t.prototype.Ln = function () {
                this.jn === Io.Idle && ((this.jn = Io.Scheduled), this.Bn());
            }),
            (t.prototype.Fn = function (t) {
                if (this.jn === Io.Scheduled) {
                    var n = 0;
                    this.jn = Io.Processing;
                    for (var i = this.Pn.first(); i && Ko(n, this.On, t); )
                        (this.Nn = i.depth + 1),
                            xo(t, i),
                            i.isCompleted &&
                                (this.Pn.shift(),
                                !i.store || (void 0 === i.result && void 0 === i.err) || (this.Un[i.id] = i)),
                            (i = this.Pn.first()),
                            n++;
                    (this.jn = Io.Idle), (this.Nn = 1), this.Pn.size() > 0 && this.Ln();
                }
            }),
            t
        );
    })();
    function xo(t, n) {
        if (!n.isCompleted)
            try {
                var i = n.process(t) || { done: !0 };
                i.done && ((n.isCompleted = !0), (n.result = i.result));
            } catch (t) {
                (n.isCompleted = !0), (n.err = t);
            }
    }
    function Ko(t, n, i) {
        return t < n || i.timeRemaining() > 0;
    }
    var Ro,
        Mo = (function (t) {
            function i() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                n(i, t),
                (i.prototype.Bn = function () {
                    var t = this;
                    je().then(function () {
                        t.Fn(Ue(36));
                    });
                }),
                i
            );
        })(Co),
        Oo = { INPUT: !0, TEXTAREA: !0, NOSCRIPT: !0 },
        jo = (function () {
            function t(t, n, i, r) {
                (this.Wn = t),
                    (this.Hn = n),
                    (this.zn = i),
                    (this.qn = r),
                    (this.$n = !1),
                    (Fu = {}),
                    (Bu = 1),
                    (Ro = new WeakMap()),
                    (this.Pn = new Mo());
            }
            return (
                (t.prototype.setUseTreeWalker = function (t) {
                    this.$n = t;
                }),
                (t.prototype.tokenizeNode = function (t, n, i, r, e, s, u) {
                    var o = this,
                        a = qu(n),
                        c = qu(i),
                        h = [];
                    return (
                        (function (n) {
                            var i = Bu;
                            try {
                                return o.Vn(t, a, c, r, h, e, s, u), !0;
                            } catch (t) {
                                return (Bu = i), !1;
                            }
                        })() || (h = []),
                        h
                    );
                }),
                (t.prototype.Vn = function (t, n, i, r, e, s, u, o) {
                    for (
                        var a,
                            c,
                            h = [{ parentMirror: n, nextMirror: i, node: r }],
                            f = function (t, n) {
                                return function (i) {
                                    i && t.push({ parentMirror: n, nextMirror: null, node: i });
                                };
                            };
                        h.length;

                    ) {
                        var v = h.pop();
                        if (v)
                            if ('string' != typeof v) {
                                var l = v.node,
                                    d = this.Gn(t, v, e, s, u);
                                if (
                                    null != d &&
                                    !(null === (a = d.watchKind) || void 0 === a ? void 0 : a.has(cs.Exclude))
                                ) {
                                    var p = d.type === Yt ? l.shadowRoot : null,
                                        w =
                                            !this.$n &&
                                            d.shadowRootType === bo &&
                                            window.HTMLSlotElement &&
                                            'slot' === d.tag &&
                                            l.assignedNodes();
                                    if (p || w || In(l))
                                        if (null === (c = d.watchKind) || void 0 === c ? void 0 : c.has(cs.Defer))
                                            o(d.node, fs.Deferred);
                                        else {
                                            if ((h.push(']'), An(l, f(h, d)), p))
                                                h.push({ parentMirror: d, nextMirror: null, node: p });
                                            else if (w && w.length > 0) {
                                                for (var g = [], m = !1, y = 0, b = w; y < b.length; y++) {
                                                    var S = b[y],
                                                        k = Vu(S);
                                                    if (!k) {
                                                        var _ = Tn(S);
                                                        if (
                                                            _ &&
                                                            !(function (t, n) {
                                                                var i = !1;
                                                                return (
                                                                    $t(t.childNodes, function (t) {
                                                                        return t === n
                                                                            ? ((i = !0), Nt.Exit)
                                                                            : Nt.ContinueProcessing;
                                                                    }),
                                                                    i
                                                                );
                                                            })(_, S)
                                                        ) {
                                                            g.push({ parentMirror: d, nextMirror: null, node: S });
                                                            continue;
                                                        }
                                                        m = !0;
                                                        break;
                                                    }
                                                    var A = '<$'.concat(k);
                                                    g.push(A);
                                                }
                                                if (m) Ro.get(l) || (Ro.set(l, !0), o(l, fs.Immediate));
                                                else {
                                                    h.push(']');
                                                    for (var I = g.length - 1; I >= 0; I--) h.push(g[I]);
                                                    h.push('[', '<'.concat('#assigned-nodes'));
                                                }
                                            }
                                            h.push('[');
                                        }
                                }
                            } else '<' === v[0] && ++Bu, e.push(v);
                    }
                }),
                (t.prototype.Gn = function (t, n, i, r, e) {
                    var s,
                        u,
                        o,
                        a,
                        c = n.node,
                        h = n.parentMirror,
                        f = n.nextMirror,
                        l = Nu(c),
                        d = c.nodeName,
                        p = c.nodeType;
                    if ('script' === l || 8 === p) return null;
                    var w = (function (t) {
                        var n;
                        if (t === (null === (n = null == t ? void 0 : t.host) || void 0 === n ? void 0 : n.shadowRoot))
                            return bt(t) ? '#shadow' : bo;
                    })(c);
                    if (this.$n && w === bo) return null;
                    var g,
                        m,
                        y,
                        b,
                        S,
                        k = (function (t, n, i, r) {
                            void 0 === n && (n = t.nodeName),
                                void 0 === i && (i = t.nodeType),
                                void 0 === r && (r = Nu(t));
                            var e = { id: Bu++, node: t, name: n, type: i, tag: r };
                            return (Fu[e.id] = e), (t[Bi] = e.id), e;
                        })(c, d, p, l);
                    (k.shadowRootType = w || (null == h ? void 0 : h.shadowRootType)),
                        h &&
                            (w
                                ? ((h.shadow = k), (k.parent = h))
                                : ((g = h),
                                  (y = f),
                                  Qu((m = k), this.qn.bind(this)),
                                  (m.parent = g),
                                  (m.next = y),
                                  y && ((m.prev = y.prev), (y.prev = m)),
                                  null == m.next ? ((m.prev = g.lastChild), (g.lastChild = m)) : (m.next.prev = m),
                                  null == m.prev ? (g.child = m) : (m.prev.next = m))),
                        (k.mask = null === (s = k.parent) || void 0 === s ? void 0 : s.mask);
                    try {
                        switch (p) {
                            case 3:
                                if ((void 0 === k.mask && (k.mask = !k.parent || k.parent.mask), k.mask)) {
                                    var _ = Tn(c);
                                    (null == _ ? void 0 : _.nodeType) === Yt && this.Hn.observe(_);
                                }
                                S = null !== (u = c.textContent) && void 0 !== u ? u : '';
                                break;
                            case Yt:
                                var A = c,
                                    I = this.getWatchState(A, d, !!k.shadowRootType, t);
                                if (null != I) {
                                    k.watchKind = I;
                                    var E = !1;
                                    I.has(cs.Watch) &&
                                        ((E = !0), null === (o = this.zn) || void 0 === o || o.observe(A)),
                                        I.has(cs.Unmask) && (k.mask = !1),
                                        I.has(cs.Mask) && (k.mask = !0),
                                        (I.has(cs.Exclude) || I.has(cs.Defer)) && (E = !0),
                                        E && this.Hn.observe(A);
                                }
                                b = (function (t, n) {
                                    var i, r, e;
                                    if (!v || 'output' !== n) {
                                        var s = {};
                                        try {
                                            if (t.hasAttributes())
                                                if (void 0 !== t.getAttributeNames)
                                                    for (
                                                        var u = 0,
                                                            o =
                                                                null !== (i = t.getAttributeNames()) && void 0 !== i
                                                                    ? i
                                                                    : [];
                                                        u < o.length;
                                                        u++
                                                    ) {
                                                        var a = o[u];
                                                        null != a &&
                                                            null != (f = t.getAttribute(a)) &&
                                                            (s[a] = ''.concat(f));
                                                    }
                                                else
                                                    for (
                                                        var c =
                                                                null !==
                                                                    (e =
                                                                        null === (r = t.attributes) || void 0 === r
                                                                            ? void 0
                                                                            : r.length) && void 0 !== e
                                                                    ? e
                                                                    : 0,
                                                            h = 0;
                                                        h < c;
                                                        h++
                                                    ) {
                                                        var f,
                                                            l = t.attributes[h];
                                                        null != l &&
                                                            null != (f = l.value) &&
                                                            (s[l.name] = ''.concat(f));
                                                    }
                                        } catch (t) {
                                            'get attrs failed: '.concat(t),
                                                wu.send('get attrs failed: '.concat(t), 'error', { err: t });
                                        }
                                        return s;
                                    }
                                })(A, l);
                        }
                    } catch (t) {
                        wu.sendErr(t);
                    }
                    if (!(null === (a = k.watchKind) || void 0 === a ? void 0 : a.has(cs.Exclude)))
                        for (var T = 0, C = e; T < C.length; T++) {
                            var x = C[T];
                            try {
                                x.preVisit && x.preVisit(k);
                            } catch (t) {
                                'pre-visitor failed: '.concat(t),
                                    wu.send('per-visitor failed: '.concat(t), 'error', { err: t });
                            }
                        }
                    var K = [wo.New, k, b, S],
                        R = this.Pn.enqueue(function (t) {
                            var n = [];
                            return (
                                So(r, e, K, function (t) {
                                    !(function (t, n) {
                                        var i = n[1],
                                            r = n[2],
                                            e = n[3],
                                            s = i.shadowRootType,
                                            u = i.node,
                                            o = i.watchKind,
                                            a = i.name;
                                        switch (i.type) {
                                            default:
                                                t.push('<'.concat(a));
                                                break;
                                            case 10:
                                                var c = u;
                                                t.push(
                                                    '<!DOCTYPE',
                                                    ':name',
                                                    c.name,
                                                    ':publicId',
                                                    c.publicId || '',
                                                    ':systemId',
                                                    c.systemId || ''
                                                );
                                                break;
                                            case 11:
                                            case Jt:
                                                var h = void 0;
                                                (h = s || a), t.push('<'.concat(h));
                                                break;
                                            case 3:
                                                t.push('<'.concat(a), null != e ? e : '');
                                                break;
                                            case Yt:
                                                if (
                                                    ((h = a),
                                                    As(u) && (h = 'svg:'.concat(h)),
                                                    t.push('<'.concat(h)),
                                                    o &&
                                                        (o.has(cs.Exclude) &&
                                                            t.push(':'.concat('_fs_excluded'), 'true'),
                                                        o.has(cs.Defer) && t.push(':'.concat('_fs_deferred'), 'true')),
                                                    i.mask && t.push(':'.concat('_fs_masked'), 'true'),
                                                    r)
                                                )
                                                    for (var f in r) t.push(':'.concat(f)), t.push(r[f]);
                                        }
                                    })(n, t);
                                }),
                                { done: !0, result: n }
                            );
                        }, !0);
                    return (
                        yu('function' == typeof R, 'failed to queue visitor'),
                        R &&
                            i.push(function () {
                                var t = R();
                                return (t && t[0]) || [];
                            }),
                        k
                    );
                }),
                (t.prototype.getWatchState = function (t, n, i, r) {
                    return i || null == r || Oo[n] ? this.Wn.isWatched(t) : r.get(t);
                }),
                t
            );
        })(),
        Po = [
            { Selector: 'input[type=password]', Consent: !1, Type: 1 },
            { Selector: 'input[type=hidden]', Consent: !1, Type: 1 },
            { Selector: '[autocomplete^=cc-]', Consent: !1, Type: 1 },
            { Selector: 'object:not([type^="image/"])', Consent: !1, Type: 1 },
            { Selector: 'embed:not([type^="image/"])', Consent: !1, Type: 1 },
            { Selector: 'noscript', Consent: !1, Type: 1 },
            { Selector: '.fs-hide', Consent: !1, Type: 1 },
            { Selector: '.fs-exclude', Consent: !1, Type: 1 },
            { Selector: '.fs-exclude-without-consent', Consent: !0, Type: 1 },
            { Selector: '.fs-mask', Consent: !1, Type: 2 },
            { Selector: '.fs-mask-without-consent', Consent: !0, Type: 2 },
            { Selector: '.fs-unmask', Consent: !1, Type: 3 },
            { Selector: '.fs-unmask-with-consent', Consent: !0, Type: 3 },
            { Selector: '.fs-block', Consent: !1, Type: 1 },
            { Selector: '.fs-record-with-consent', Consent: !0, Type: 1 },
        ],
        Uo = function (t, n) {
            return t | n;
        },
        No = Ss.reduce(Uo, 0),
        Lo = bs.reduce(Uo, 0),
        Do = (function () {
            function t(t) {
                void 0 === t && (t = 0), (this.Qn = t);
            }
            return (
                (t.prototype.has = function (t) {
                    return !!(this.Qn & t);
                }),
                (t.prototype.set = function (n) {
                    if (this.Qn & Lo && n & Lo) {
                        var i = this.Qn | n,
                            r = t.Xn(i);
                        this.Qn = t.Yn(r, this.Qn);
                    } else this.Qn |= n;
                }),
                (t.prototype.hasKinds = function () {
                    return 0 !== this.Qn;
                }),
                (t.areEqual = function (t, n) {
                    return (null == t && null == n) || (null != t && null != n && t.equals(n));
                }),
                (t.prototype.getStrictestPrivacyKind = function () {
                    return t.Xn(this.Qn);
                }),
                (t.Xn = function (t) {
                    for (var n = 0, i = bs; n < i.length; n++) {
                        var r = i[n];
                        if (t & r) return r;
                    }
                    return null;
                }),
                (t.needsToObserve = function (t, n) {
                    var i,
                        r,
                        e = null !== (i = null == t ? void 0 : t.Qn) && void 0 !== i ? i : 0;
                    return !!((null !== (r = null == n ? void 0 : n.Qn) && void 0 !== r ? r : 0) & ~e & No);
                }),
                (t.combineKindsPreservePrivacy = function (n, i) {
                    var r,
                        e,
                        s = t.Yn(
                            null !== (r = null == n ? void 0 : n.Qn) && void 0 !== r ? r : 0,
                            null !== (e = null == i ? void 0 : i.Qn) && void 0 !== e ? e : 0
                        );
                    return new t(s);
                }),
                (t.Yn = function (t, n) {
                    return (t & Lo) | (n & No);
                }),
                (t.prototype.equals = function (t) {
                    return !!t && this.Qn === t.Qn;
                }),
                t
            );
        })();
    function Fo(t) {
        var n = document.documentElement || document.createElement('div');
        try {
            return xt.elMatches(n, t), !0;
        } catch (n) {
            return wu.send('Browser rejected rule', 'warning', { selector: t, err: n }), !1;
        }
    }
    var Bo = { 1: 'exclude', 2: 'mask', 3: 'unmask', 4: 'watch', 5: 'keep', 6: 'defer' },
        Wo = (function () {
            function t() {
                (this.Jn = zo()), (this.Zn = zo());
            }
            return (
                (t.prototype.forConsentState = function (t) {
                    return t ? this.Jn : this.Zn;
                }),
                (t.prototype.addElementBlockRules = function (t) {
                    var n = this,
                        i = zo(),
                        r = zo();
                    t.map($o)
                        .filter(function (t) {
                            return qo(t.selector);
                        })
                        .forEach(function (t) {
                            if (t.consent)
                                return t.kind === cs.Unmask ? void i[t.kind].push(t) : void r[t.kind].push(t);
                            i[t.kind].push(t), r[t.kind].push(t);
                        });
                    for (
                        var e = document.documentElement || document.createElement('div'),
                            s = function (t, i) {
                                try {
                                    if (0 === t.length) return;
                                    var r = t
                                        .map(function (t) {
                                            return t.selector;
                                        })
                                        .join(', ');
                                    xt.elMatches(e, r), i.push(r);
                                } catch (i) {
                                    wu.send('Browser rejected optimistic merge rule', 'warning', { err: i }), n.zt(t);
                                }
                            },
                            u = 0,
                            o = ks;
                        u < o.length;
                        u++
                    ) {
                        var a = o[u];
                        s(i[a], this.Jn[a]), s(r[a], this.Zn[a]);
                    }
                }),
                (t.prototype.addRule = function (t, n, i) {
                    if (this.ti(t, n, i)) return !0;
                    switch (t) {
                        case cs.Watch:
                        case cs.Unmask:
                        case cs.Keep:
                        case cs.Defer:
                            break;
                        case cs.Mask:
                        case cs.Exclude:
                        default:
                            (this.Jn[t].length = 0),
                                this.Jn[t].push('*'),
                                (this.Zn[t].length = 0),
                                this.Zn[t].push('*');
                    }
                    return !1;
                }),
                (t.prototype.ti = function (t, n, i) {
                    try {
                        return !qo(i) || (n ? Vo(t, this.ni(t), i) : Vo(t, this.Zn, i) && Vo(t, this.Jn, i));
                    } catch (t) {
                        return wu.send('Error adding block rule', 'error', { selector: i, err: t }), !1;
                    }
                }),
                (t.prototype.addElementBlock = function (t) {
                    var n = $o(t),
                        i = n.kind,
                        r = n.consent,
                        e = n.selector;
                    return this.addRule(i, r, e);
                }),
                (t.prototype.zt = function (t) {
                    for (var n = 0, i = t; n < i.length; n++) {
                        var r = i[n],
                            e = r.kind,
                            s = r.consent,
                            u = r.selector;
                        this.addRule(e, s, u);
                    }
                }),
                (t.prototype.ni = function (t) {
                    var n = t === cs.Unmask;
                    return this.forConsentState(n);
                }),
                t
            );
        })(),
        Ho = function () {
            return Object.create ? Object.create(null) : {};
        };
    function zo() {
        for (var t = Ho(), n = 0, i = ks; n < i.length; n++) t[i[n]] = [];
        return t;
    }
    function qo(t) {
        return !t.match(gs) && '' != t.trim();
    }
    function $o(t) {
        var n = cs.Exclude;
        switch (t.Type) {
            case wi.Unset:
            case wi.Exclude:
                n = cs.Exclude;
                break;
            case wi.Mask:
                n = cs.Mask;
                break;
            case wi.Unmask:
                n = cs.Unmask;
                break;
            case wi.Watch:
                n = cs.Watch;
                break;
            case wi.Keep:
                n = cs.Keep;
                break;
            case wi.Defer:
                n = cs.Defer;
                break;
            default:
                Le(t.Type, 'Unexpected block type: '.concat(t.Type));
        }
        return { kind: n, consent: t.Consent, selector: t.Selector };
    }
    function Vo(t, n, i) {
        var r = document.documentElement || document.createElement('div'),
            e = t;
        switch (e) {
            case cs.Exclude:
            case cs.Mask:
            case cs.Unmask:
            case cs.Watch:
            case cs.Keep:
            case cs.Defer:
                break;
            default:
                e = cs.Exclude;
        }
        if (0 == n[e].length) return !!Fo(i) && (n[e].push(i), !0);
        var s = n[e].length - 1,
            u = n[e][s].concat(', ', i);
        try {
            xt.elMatches(r, u);
        } catch (t) {
            return (
                !!Fo(i) &&
                (n[e].push(i),
                wu.send('Browser rejected merged rule', 'warning', { kind: Bo[e], selector: i, err: t }),
                !0)
            );
        }
        return (n[e][s] = u), !0;
    }
    function Go(t) {
        if (!(null == t ? void 0 : t.hasKinds())) return 0;
        var n = t.getStrictestPrivacyKind();
        return null === n ? 0 : bs.length - bs.indexOf(n);
    }
    var Qo = (function () {
        function t() {
            (this.ii = new Wo()), (this.ri = !d);
        }
        return (
            (t.prototype.initialize = function (t) {
                var n = t.blocks,
                    i = t.deferreds,
                    r = t.keeps,
                    e = t.watches,
                    u = t.canvasWatcherMode,
                    o = t.noDefaultExclusions ? [] : s([], Po, !0);
                if (n)
                    for (var a = 0, c = n; a < c.length; a++) {
                        var h = c[a];
                        o.push(h);
                    }
                if (
                    ((null != u ? u : Oi.Disabled) === Oi.Disabled &&
                        o.push({ Consent: !1, Selector: 'canvas', Type: wi.Exclude }),
                    e)
                )
                    for (var f = 0, v = e; f < v.length; f++) {
                        var l = v[f];
                        o.push({ Type: wi.Watch, Consent: jn.RevokeConsent, Selector: l.Selector });
                    }
                if (i)
                    for (var d = 0, p = i; d < p.length; d++) {
                        var w = p[d];
                        o.push({ Type: wi.Defer, Consent: jn.RevokeConsent, Selector: w.Selector });
                    }
                if ((this.ii.addElementBlockRules(o), r))
                    for (var g = 0, m = r; g < m.length; g++) {
                        var y = m[g];
                        this.addElementKeep(y);
                    }
            }),
            (t.prototype.isWatched = function (t) {
                var n,
                    i = new Do(),
                    r = this.ii.forConsentState(null !== (n = this.ei) && void 0 !== n ? n : jn.RevokeConsent),
                    e = (function (t, n, i) {
                        return Xo(t, n, i, !0);
                    })(t, bs, r),
                    s = e | Xo(t, Ss, r);
                return i.set(s), i.hasKinds() ? i : null;
            }),
            (t.prototype.addElementBlock = function (t) {
                return this.ii.addElementBlock(t);
            }),
            (t.prototype.addElementKeep = function (t) {
                var n = cs.Keep;
                return t.Type === mi.Click && this.si(n, t.Consent, t.Selector);
            }),
            (t.prototype.si = function (t, n, i) {
                return this.ii.addRule(t, n, i);
            }),
            (t.prototype.getConsent = function () {
                return this.ei;
            }),
            (t.prototype.initializeConsent = function (t) {
                void 0 === this.ei && this.ui(t, !1);
            }),
            (t.prototype.setConsent = function (t) {
                this.ui(t, !0);
            }),
            (t.prototype.ui = function (t, n) {
                void 0 === n && (n = !0),
                    this.ei !== t && ((this.ei = t), n && this.onConsentChange && this.onConsentChange());
            }),
            (t.prototype.allWatchedElements = function (t) {
                var n;
                if (!this.ri) return null;
                for (
                    var i = new WeakMap(),
                        r = !1,
                        e = function (t, n) {
                            var e,
                                s = null !== (e = i.get(t)) && void 0 !== e ? e : new Do();
                            s.set(n), i.set(t, s), (r = !0);
                        },
                        s = this.ii.forConsentState(null !== (n = this.ei) && void 0 !== n && n),
                        u = 0,
                        o = ks;
                    u < o.length;
                    u++
                )
                    for (var a = o[u], c = 0, h = s[a]; c < h.length; c++) {
                        var f = h[c];
                        Jo(t) && xt.elMatches(t, f) && e(t, a);
                        for (var v = Yo(t, f), l = 0; l < v.length; l++) e(v[l], a);
                    }
                return r ? i : null;
            }),
            t
        );
    })();
    function Xo(t, n, i, r) {
        void 0 === r && (r = !1);
        for (var e = 0, s = 0, u = n; s < u.length; s++) {
            for (var o = u[s], a = !1, c = 0, h = i[o]; c < h.length; c++) {
                var f = h[c];
                if (xt.elMatches(t, f)) {
                    (e |= o), (a = !0);
                    break;
                }
            }
            if (a && r) break;
        }
        return e;
    }
    function Yo(t, n) {
        return Jo(t)
            ? xt.elQuerySelectorAll(t, n)
            : (function (t) {
                    return t.nodeType === Jt;
                })(t)
              ? xt.docQuerySelectorAll(t, n)
              : (function (t) {
                      return 11 === t.nodeType;
                  })(t)
                ? xt.docFragQuerySelectorAll(t, n)
                : t.querySelectorAll(n);
    }
    function Jo(t) {
        return t.nodeType === Yt;
    }
    var Zo = (function () {
            function t(t) {
                (this.ut = t), (this.oi = {}), (this.ai = {});
            }
            return (
                (t.create = function (t) {
                    var n,
                        i = ta.isSupported(t.window);
                    return (
                        null === (n = t.queue()) ||
                            void 0 === n ||
                            n.enqueue({ Kind: cn.REC_FEAT_SUPPORTED, Args: [Gn.ResizeObserver, i] }),
                        i ? new ta(t) : new na(t)
                    );
                }),
                (t.prototype.collect = function (t) {
                    var n = [];
                    for (var i in this.ai) this.ci(t, n, parseInt(i, 10));
                    return (this.ai = {}), n;
                }),
                (t.prototype.isObserved = function (t) {
                    return !!this.oi[t];
                }),
                (t.prototype.hi = function (t, n) {
                    try {
                        var i = Vu(t);
                        if (!i) return;
                        if (t.nodeType != Yt) return;
                        var r = (function (t, n) {
                            if ((null == t ? void 0 : t.nodeType) !== Yt) return { width: 0, height: 0 };
                            if (!n || (xt.arrayIsArray(n) && 0 === n.length)) return t.getBoundingClientRect();
                            var i = Array.isArray(n) ? n[0] : n;
                            switch (getComputedStyle(t).writingMode) {
                                case 'horizontal-tb':
                                    return { width: i.inlineSize, height: i.blockSize };
                                case 'vertical-lr':
                                case 'vertical-rl':
                                    return { width: i.blockSize, height: i.inlineSize };
                                default:
                                    return t.getBoundingClientRect();
                            }
                        })(t, n);
                        this.ai[i] = r;
                        var e = this.ut.queue();
                        if (!this.oi[i] && void 0 !== e)
                            for (var s = this.fi(i), u = 0, o = s; u < o.length; u++) {
                                var a = o[u];
                                e.enqueue(a);
                            }
                    } catch (t) {}
                }),
                (t.prototype.ci = function (t, n, r) {
                    for (var e = 0, s = this.fi(r); e < s.length; e++) {
                        var u = s[e];
                        n.push(i(i({}, u), { When: t }));
                    }
                }),
                (t.prototype.fi = function (t) {
                    var n = this.ai[t];
                    if (!n) return [];
                    var i = $u(t);
                    if (!i) return [];
                    var r = i.watchKind,
                        e = n.width,
                        s = n.height,
                        u = this.oi[t];
                    if (u && u.w == e && u.h == s) return [];
                    this.oi[t] = { w: e, h: s };
                    var o = [];
                    if (null == r ? void 0 : r.has(cs.Watch)) {
                        var a = 0 != e && 0 != s;
                        (!!u && 0 != u.w && 0 != u.h) != a && o.push({ Kind: cn.WATCHED_ELEM, Args: [t, a] });
                    }
                    var c = i.node,
                        h = 'scrollLeft' in c;
                    return (
                        ((null == r ? void 0 : r.has(cs.Exclude)) ||
                            (null == r ? void 0 : r.has(cs.Defer)) ||
                            i.mask ||
                            h) &&
                            (o.push({ Kind: cn.PLACEHOLDER_SIZE, Args: [t, e, s] }),
                            h &&
                                o.push({
                                    Kind: cn.RESIZE_SCROLLABLE_ELEMENT_CONTENT,
                                    Args: [t, c.scrollWidth, c.scrollHeight],
                                })),
                        o
                    );
                }),
                t
            );
        })(),
        ta = (function (t) {
            function i(n) {
                var i = t.call(this, n) || this;
                return (
                    (i.vi = new WeakMap()),
                    (i.li = new WeakMap()),
                    (i.di = new n.window.ResizeObserver(function (t) {
                        Pe().then(function () {
                            for (var n = 0, r = t; n < r.length; n++) {
                                var e = r[n],
                                    s = e.target,
                                    u = e.borderBoxSize;
                                i.hi(s, u);
                            }
                        });
                    })),
                    (i.pi = new n.window.ResizeObserver(function (t) {
                        Pe().then(function () {
                            for (var n = 0, r = t; n < r.length; n++) {
                                var e = r[n].target;
                                i.wi(e);
                            }
                        });
                    })),
                    i
                );
            }
            return (
                n(i, t),
                (i.isSupported = function (t) {
                    return 'function' == typeof t.ResizeObserver;
                }),
                (i.prototype.observe = function (t) {
                    var n = this;
                    if (t && t.nodeType == Yt)
                        try {
                            var i = t;
                            this.di.unobserve(i),
                                this.di.observe(i),
                                this.ut.measurer.enqueue(function () {
                                    n.gi(i);
                                });
                        } catch (t) {
                            'ResizeWatcher.observe: caught exception '.concat(t), Su('resize.observe', { err: t });
                        }
                }),
                (i.prototype.unobserveSubtree = function (t) {
                    try {
                        t && t.nodeType === Yt && (this.di.unobserve(t), this.pi.unobserve(t));
                    } catch (t) {}
                }),
                (i.prototype.nodeChanged = function (t) {
                    var n = this,
                        i = this.li.get(t);
                    'number' == typeof i &&
                        Vu(t) === i &&
                        this.ut.measurer.enqueue(function () {
                            n.hi(t);
                        });
                }),
                (i.prototype.wi = function (t) {
                    var n = this.vi.get(t);
                    if (n)
                        for (var i in n) {
                            var r = $u(n[i]);
                            r ? this.hi(r.node) : delete n[i];
                        }
                }),
                (i.prototype.gi = function (t) {
                    var n = this,
                        i = Vu(t);
                    if (i) {
                        var r = (function (t) {
                            for (var n = 0, i = t; ; ) {
                                if (n++ > 1e3) return null;
                                if (!i || i.nodeType != Yt) return null;
                                var r = i;
                                if (getComputedStyle(r).display.indexOf('inline') < 0) return r;
                                i = Tn(i);
                            }
                        })(t);
                        if (r && r !== t) {
                            this.li.set(t, i), this.hi(t);
                            var e = this.vi.get(r);
                            e || ((e = Object.create(null)), this.vi.set(r, e)),
                                (e[i] = i),
                                xt.setWindowTimeout(
                                    this.ut.window,
                                    Ut(function () {
                                        n.pi.unobserve(r), n.pi.observe(r);
                                    }),
                                    0
                                );
                        }
                    }
                }),
                i
            );
        })(Zo),
        na = (function (t) {
            function i() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                n(i, t),
                (i.prototype.observe = function (t) {
                    var n = this;
                    if (t && t.nodeType == Yt) {
                        var i = t;
                        !(function (t) {
                            if (t && Wu(t.node))
                                for (var n = t, i = t.parent; i; i = i.parent) {
                                    if ((ia(i) || (i.watchedChildren = {}), ia(n)))
                                        for (var r in ia(n)) delete ia(i)[r];
                                    if (((ia(i)[n.id] = n), or(ia(i), 2))) n = i;
                                    else if (ar(ia(i), 2)) break;
                                }
                        })(qu(t)),
                            this.ut.measurer.enqueue(function () {
                                n.hi(i);
                            });
                    }
                }),
                (i.prototype.unobserveSubtree = function (t) {
                    var n = qu(t);
                    n &&
                        (function (t) {
                            if (ar(ia(t), 0) || Wu(t.node))
                                for (
                                    var n =
                                            (ia(t) && ar(ia(t), 1)) || Wu(t.node)
                                                ? t.id
                                                : (function (t) {
                                                      for (var n in t)
                                                          if (Object.prototype.hasOwnProperty.call(t, n)) return n;
                                                  })(ia(t)),
                                        i = n ? t.parent : null;
                                    i && ia(i) && ia(i)[n];

                                ) {
                                    if ((delete ia(i)[n], or(ia(i), 1))) {
                                        var r = i.id,
                                            e = ur(ia(i));
                                        for (i = i.parent; i && ia(i) && ia(i)[r]; )
                                            delete ia(i)[r], (ia(i)[e.id] = e), (i = i.parent);
                                        break;
                                    }
                                    i = i.parent;
                                }
                        })(n);
                }),
                (i.prototype.nodeChanged = function (t) {
                    var n = this,
                        i = (function (t) {
                            var n = [],
                                i = qu(t);
                            if (i)
                                for (var r = [i], e = 0; r.length && ++e < 1e3; ) {
                                    var s = r.pop();
                                    Wu(s.node) && n.push(s.node),
                                        ia(s) &&
                                            sr(ia(s), function (t) {
                                                r.push(t);
                                            });
                                }
                            else {
                                for (var u = t; u && !Vu(u); ) u = Tn(u);
                                u && Wu(u) && n.push(u);
                            }
                            return n;
                        })(t);
                    this.ut.measurer.enqueue(function () {
                        for (var t = 0, r = i; t < r.length; t++) {
                            var e = r[t];
                            n.hi(e);
                        }
                    });
                }),
                i
            );
        })(Zo);
    function ia(t) {
        return t.watchedChildren;
    }
    var ra = {
        attributeName: null,
        attributeNamespace: null,
        addedNodes: [],
        removedNodes: [],
        nextSibling: null,
        previousSibling: null,
        oldValue: null,
    };
    function ea(t) {
        return i(i(i({}, ra), t), { type: 'childList' });
    }
    function sa(t, n) {
        return 0 === n.length
            ? ea({ target: t })
            : ea({ addedNodes: n, nextSibling: En(n[n.length - 1]), previousSibling: Cn(n[0]), target: t });
    }
    function ua(t) {
        var n = [];
        return (
            _n(t, function (t) {
                n.push(t);
            }),
            sa(t, n)
        );
    }
    var oa = {
            sanitize: function (t) {
                var n,
                    i = t[1],
                    r = t[2],
                    e = t[3];
                if (r) {
                    var s = {},
                        u = i.tag;
                    for (var o in r)
                        if ('dialog' !== u || 'open' !== o) {
                            var a = r[o],
                                c = _s[(n = o)] || n.toLowerCase(),
                                h = Cs(i, c, a);
                            null !== h && (s[c] = h);
                        }
                    t[mo.Attrs] = s;
                }
                if (e) {
                    var f = (function (t, n) {
                        if (!n) return '';
                        if (t.parent && 'style' === t.parent.tag && !As(t.parent.node)) return '';
                        var i = n.length;
                        return i > Is
                            ? (wu.send('Ignoring huge text node', 'warning', { length: i }), '')
                            : t.mask
                              ? as(n)
                              : n;
                    })(i, e);
                    t[mo.Text] = f;
                }
            },
        },
        aa = (function () {
            function t(t, n, i, r, e, s) {
                void 0 === i && (i = function () {}),
                    void 0 === e && (e = function () {}),
                    void 0 === s && (s = function () {});
                var u = this;
                (this.ut = t),
                    (this.Wn = n),
                    (this.zn = r),
                    (this.mi = e),
                    (this.yi = s),
                    (this.bi = !1),
                    (this.Si = []),
                    (this.ki = []),
                    (this._i = []),
                    (this.Ai = []),
                    (this.Ii = []),
                    (this.Ei = !1),
                    (this.Ti = []),
                    (this.Ci = []),
                    (this.$n = !1),
                    (this.xi = this.ut.window),
                    this.acceptSanitizer(oa),
                    this.acceptVisitor(this),
                    (this.Hn = Zo.create(this.ut)),
                    (this.qn = function (t) {
                        u.Hn.unobserveSubtree(t.node), i(t);
                    }),
                    (this.Ki = new jo(n, this.Hn, this.zn, this.qn.bind(this))),
                    yu(!this.Wn.onConsentChange, 'This is the only consent change listener.'),
                    (this.Wn.onConsentChange = function () {
                        return u.updateConsent();
                    });
            }
            return (
                (t.prototype.start = function (t) {
                    void 0 === t && (t = this.xi.document),
                        (this.Mn = t),
                        (this.bi = !1),
                        (this.$n = !!this.ut.recording.flags().UseTreeWalker),
                        this.Ki.setUseTreeWalker(this.$n);
                    var n = !0;
                    if (h)
                        try {
                            this.Ri();
                        } catch (t) {
                            'Error setting up IE workarounds for mutation watcher: '.concat(t), (n = !1);
                        }
                    if (n) {
                        var i = this.$n ? Ct : MutationObserver;
                        this.Mi = new i(this.Oi.bind(this));
                    }
                }),
                (t.prototype.Oi = function (t) {
                    for (var n = 0, i = t; n < i.length; n++) {
                        var r = i[n];
                        this.Ii.push(r);
                    }
                }),
                (t.prototype.resizer = function () {
                    return this.Hn;
                }),
                (t.prototype.stop = function () {
                    if (this.Mi) {
                        var t = xt.mutationDisconnect;
                        this.$n && t ? t(this.Mi) : this.Mi.disconnect();
                    }
                    var n = qu(this.Mn);
                    n && Xu(n, this.qn.bind(this)),
                        (this.Ii = []),
                        h && this.ji(),
                        (this.Wn.onConsentChange = null),
                        this.Pi && (this.Pi.disable(), (this.Pi = null));
                }),
                (t.prototype.processMutations = function (t) {
                    var n = this;
                    if (!this.Mn) return [];
                    var i = [],
                        r = !1,
                        e = null,
                        u = function (s) {
                            return s || r ? (r || ((e = n.Ui(t, i, n.Mn)), (r = !0)), e) : null;
                        };
                    if (
                        (this.Ni(t, i, u),
                        this.Ei &&
                            (i.push({ Kind: cn.FAIL_THROTTLED, Args: [Jn.SetPropertyHooks], When: t }), (this.Ei = !1)),
                        this.Ii.length > 0 || this.ki.length > 0)
                    ) {
                        var o = this.Li(t, i, u),
                            a = o[0],
                            c = o[1];
                        for (var h in c) i.push({ Kind: cn.MUT_ATTR, Args: c[h], When: t });
                        for (var h in a) i.push({ Kind: cn.MUT_TEXT, Args: a[h], When: t });
                    }
                    var f = this.Si;
                    this.Si = [];
                    for (var v = 0; v < f.length; v++) {
                        var l = f[v].shadowRoot;
                        l && 0 != Vu(f[v]) && 0 == Vu(l) && (this.Di(l), this.Fi(null, t, i, f[v], l));
                    }
                    if (
                        (i.push.apply(i, this.Hn.collect(t)),
                        (this.Ii = []),
                        this.Ai.length > 0 &&
                            (i.push({ Kind: cn.DEFERRED_RESOLVED, Args: s([], this.Ai, !0), When: t }), (this.Ai = [])),
                        this._i.length > 0)
                    ) {
                        for (var d = 0, p = this._i; d < p.length; d++) {
                            var w = p[d];
                            this.Ai.push(Vu(w)), In(w) && this.Ii.push(ua(w));
                        }
                        this._i = [];
                    }
                    return i;
                }),
                (t.prototype.recordingIsDetached = function () {
                    return !!this.Mn && this.Mn != this.xi.document;
                }),
                (t.prototype.Ni = function (t, n, i) {
                    if (!this.bi && this.Mn) {
                        window;
                        var r = i(!0);
                        this.Bi(r, t, n, null, this.Mn, null),
                            this.Hn.nodeChanged(this.Mn),
                            this.Mi && this.Di(this.Mn),
                            this.Wi(),
                            (this.bi = !0),
                            window;
                    }
                }),
                (t.prototype.Ui = function (t, n, i) {
                    if (!i) return null;
                    var r = Kr(),
                        e = this.Wn.allWatchedElements(i),
                        s = Kr() - r;
                    return (
                        n.push({
                            Kind: cn.TIMING,
                            Args: [[ln.Internal, pn.Serialization, gn.ApplyRules, t, s]],
                            When: t,
                        }),
                        e
                    );
                }),
                (t.prototype.Wi = function () {
                    var t = this;
                    (this.Pi = mr(Element.prototype, 'attachShadow', !0)),
                        this.Pi &&
                            this.Pi.before(function (n) {
                                n.that.shadowRoot || t.Si.push(n.that);
                            });
                }),
                (t.prototype.Di = function (t) {
                    var n;
                    try {
                        var i = {
                                childList: !0,
                                attributes: !0,
                                characterData: !0,
                                subtree: !0,
                                attributeOldValue: !0,
                                characterDataOldValue: !0,
                            },
                            r = xt.mutationObserve;
                        this.$n && r ? r(this.Mi, t, i) : null === (n = this.Mi) || void 0 === n || n.observe(t, i);
                    } catch (t) {}
                }),
                (t.prototype.Li = function (t, n, i) {
                    for (
                        var r,
                            e,
                            s,
                            u = this,
                            o = {},
                            a = {},
                            c = {},
                            h = {},
                            f = function (i) {
                                if (qu(i)) {
                                    u.Hi(t, n, qu(i));
                                    var r = qu(Tn(i));
                                    r && (h[r.id] = r.node);
                                }
                            },
                            v = function (i) {
                                var u, v, d;
                                try {
                                    var p = l.Ii[i];
                                    if (
                                        !l.$n &&
                                        'childList' === p.type &&
                                        (null === (r = p.target) || void 0 === r ? void 0 : r.nodeType) === Yt &&
                                        'SLOT' === p.target.tagName
                                    ) {
                                        var w = (function (t) {
                                            for (var n = new WeakMap(), i = t; (i = Tn(i)); ) {
                                                if (n.has(i)) return null;
                                                if ((n.set(i, !0), 11 === i.nodeType)) break;
                                            }
                                            if (!i) return null;
                                            var r = qu(i);
                                            return (null == r ? void 0 : r.shadowRootType) === bo &&
                                                (null == r ? void 0 : r.parent)
                                                ? [r.parent.id, r.parent.node]
                                                : null;
                                        })(p.target);
                                        if (w) {
                                            var g = w[0],
                                                m = w[1];
                                            h[g] = m;
                                        }
                                    }
                                    var y = Vu(p.target);
                                    if (!y) return 'continue';
                                    switch (((c[y] = p.target), p.type)) {
                                        case 'childList':
                                            if ('style' === Nu(p.target) && !As(p.target)) {
                                                f(p.target);
                                                break;
                                            }
                                            if (p.removedNodes.length > 0)
                                                for (var b = 0; b < p.removedNodes.length; ++b)
                                                    (K = qu(p.removedNodes[b])) && K.id && l.Hi(t, n, K);
                                            if (p.addedNodes.length > 0 && ((h[y] = p.target), !l.$n)) {
                                                var S =
                                                    !(null == (d = p.target) ? void 0 : d.shadowRoot) ||
                                                    bt(d.shadowRoot)
                                                        ? null
                                                        : qu(d.shadowRoot);
                                                S && (h[S.id] = S.node);
                                            }
                                            break;
                                        case 'characterData':
                                            if ((K = qu(p.target)) && !Hu(p.target, K)) {
                                                var k = p.target.textContent;
                                                if (p.oldValue === k) break;
                                                var _ = Tn(p.target);
                                                if (_ && 'style' === Nu(_) && !As(_)) f(_);
                                                else {
                                                    var A = [wo.Update, K, void 0, null != k ? k : void 0];
                                                    So(l.Ti, l.Ci, A, function (t) {
                                                        var n;
                                                        o[y] = [y, null !== (n = t[mo.Text]) && void 0 !== n ? n : ''];
                                                    });
                                                }
                                            }
                                            break;
                                        case 'attributes':
                                            var I = p.target,
                                                E = Nu(I);
                                            if (p.attributeNamespace == $i) {
                                                'style' == E && p.attributeName == Vi && l.yi(I);
                                                break;
                                            }
                                            if (
                                                'link' === E &&
                                                'rel' === p.attributeName &&
                                                Es.test(null !== (e = p.oldValue) && void 0 !== e ? e : '')
                                            ) {
                                                f(I);
                                                break;
                                            }
                                            var T = (function (t, n) {
                                                    return (
                                                        void 0 === n && (n = qu(t)), null == n ? void 0 : n.watchKind
                                                    );
                                                })(I),
                                                C = l.Wn.isWatched(I);
                                            if (Go(C) > Go(T)) {
                                                f(I);
                                                break;
                                            }
                                            if (Do.needsToObserve(T, C)) {
                                                l.Hn.observe(I),
                                                    (null == C ? void 0 : C.has(cs.Watch)) &&
                                                        (null === (s = l.zn) || void 0 === s || s.observe(I));
                                                var x = qu(I);
                                                x && (x.watchKind = Do.combineKindsPreservePrivacy(T, C));
                                            }
                                            var K,
                                                R =
                                                    (void 0 === (v = p.attributeNamespace) && (v = ''),
                                                    (null === v
                                                        ? ''
                                                        : {
                                                              'http://www.w3.org/1999/xlink': 'xlink:',
                                                              'http://www.w3.org/XML/1998/namespace': 'xml:',
                                                              'http://www.w3.org/2000/xmlns/': 'xmlns:',
                                                          }[v] || '') + (p.attributeName || '')),
                                                M = p.target.getAttribute(R);
                                            (K = qu(p.target)) &&
                                                p.oldValue != M &&
                                                ((A = [wo.Update, K, ((u = {}), (u[R] = M || ''), u), void 0]),
                                                So(l.Ti, l.Ci, A, function (t) {
                                                    var n,
                                                        i = null !== (n = t[mo.Attrs]) && void 0 !== n ? n : {};
                                                    for (var r in i) {
                                                        var e = i[r];
                                                        I.hasAttribute(r) || (e = null),
                                                            (a[''.concat(y, ' ').concat(r)] = [y, r, e]);
                                                    }
                                                }));
                                    }
                                } catch (t) {}
                            },
                            l = this,
                            d = 0;
                        d < this.Ii.length;
                        ++d
                    )
                        v(d);
                    for (var p = 0, w = this.ki; p < w.length; p++) {
                        var g = w[p];
                        try {
                            f(g);
                        } catch (t) {
                            wu.sendErr(t);
                        }
                    }
                    for (var m in ((this.ki = []), h)) {
                        var y = qu((b = h[m]));
                        y && y.id && this.zi(i, t, n, b, y);
                    }
                    for (var m in c) {
                        var b = c[m];
                        this.Hn.nodeChanged(b);
                    }
                    return [o, a];
                }),
                (t.prototype.qi = function (t) {
                    return this.bi && t && this.Mn ? (this.$i(this.Mn), []) : [];
                }),
                (t.prototype.$i = function (t) {
                    var n = this,
                        i = Tn(t);
                    Vu(t) || !i
                        ? _n(t, function (t) {
                              n.$i(t);
                          })
                        : this.Ii.push(sa(i, [t]));
                }),
                (t.prototype.zi = function (t, n, i, r, e) {
                    var s = [],
                        u = e.child;
                    for (
                        _n(r, function (t) {
                            if (u)
                                for (var n = qu(t); u; ) {
                                    if (!Vu(t)) {
                                        s.push({ insert: [r, t, u.node] });
                                        break;
                                    }
                                    if (n && u.id == n.id) {
                                        u = u.next;
                                        break;
                                    }
                                    s.push({ remove: u }), (u = u.next);
                                }
                            else s.push({ insert: [r, t, null] });
                        });
                        u;
                        u = u.next
                    )
                        s.push({ remove: u });
                    var o = !1,
                        a = t(o);
                    if (null === a && this.ut.recording.flags().UseRuleOptimization) {
                        try {
                            for (var c = 0, h = 0; h < s.length && !o; h++)
                                (v = s[h]).insert && (c += ca(v.insert[1])) >= 1e3 && (o = !0);
                        } catch (t) {
                            Su('ruleOpt', { err: t });
                        }
                        o && (a = t(o));
                    }
                    var f = !1;
                    for (h = 0; h < s.length; h++) {
                        var v;
                        (v = s[h]).insert
                            ? this.Bi(a, n, i, v.insert[0], v.insert[1], v.insert[2])
                            : v.remove && ((f = !0), this.Hi(n, i, v.remove));
                    }
                    yu(!f, 'All remove events should have been generated earlier, in MutationWatcher.processMutations');
                }),
                (t.prototype.Fi = function (t, n, i, r, e) {
                    var s = Vu(r),
                        u = Kr(),
                        o = this.Vi(t, r, e, null),
                        a = Kr() - u;
                    o.length > 0 &&
                        i.push(
                            { Kind: cn.DEFERRED_MUT_SHADOW, Args: [s, o], When: n },
                            { Kind: cn.TIMING, Args: [[ln.Internal, pn.Serialization, gn.NodeEncoding, n, a]], When: n }
                        );
                }),
                (t.prototype.Bi = function (t, n, i, r, e, s) {
                    var u = Vu(r) || -1,
                        o = Vu(s) || -1,
                        a = -1 === u && -1 === o,
                        c = Kr();
                    window;
                    var h = this.Vi(t, r, e, s);
                    window;
                    var f = Kr() - c;
                    h.length > 0 &&
                        (i.push(
                            { Kind: cn.DEFERRED_MUT_INSERT, Args: [u, o, h], When: n },
                            {
                                Kind: cn.TIMING,
                                Args: [[ln.Internal, pn.Serialization, a ? gn.DomSnapshot : gn.NodeEncoding, n, f]],
                                When: n,
                            }
                        ),
                        this.mi());
                }),
                (t.prototype.Vi = function (t, n, i, r) {
                    var e = this;
                    return n && Hu(n)
                        ? []
                        : this.Ki.tokenizeNode(t, n, r, i, this.Ti, this.Ci, function (t, n) {
                              switch (n) {
                                  case fs.Immediate:
                                      e.refreshElement(t);
                                      break;
                                  case fs.Deferred:
                                      e._i.push(t);
                              }
                          });
                }),
                (t.prototype.Hi = function (t, n, i) {
                    var r = i.id;
                    if ((Qu(i, this.qn.bind(this)), n.length > 0)) {
                        var e = n[n.length - 1];
                        if (e.Kind == cn.MUT_REMOVE) return void e.Args.push(r);
                    }
                    n.push({ Kind: cn.MUT_REMOVE, Args: [r], When: t });
                }),
                (t.prototype.Ri = function () {
                    var n = this;
                    if (f) {
                        var r = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent'),
                            e = r && r.set;
                        if (!r || !e) throw new Error('Missing textContent setter -- not safe to record mutations.');
                        Object.defineProperty(
                            Element.prototype,
                            'textContent',
                            i(i({}, r), {
                                set: function (t) {
                                    try {
                                        for (var n = void 0; (n = kn(this)); ) this.removeChild(n);
                                        if (null === t || '' == t) return;
                                        var i = (this.ownerDocument || document).createTextNode(t);
                                        this.appendChild(i);
                                    } catch (n) {
                                        e && e.call(this, t);
                                    }
                                },
                            })
                        );
                    }
                    this.Gi = new ro(t.ThrottleMax, t.ThrottleInterval, function () {
                        return new io(function () {
                            (n.Ei = !0), n.ji();
                        }).start();
                    });
                    var s = this.Gi.guard(function (t) {
                        var n = t.cssText;
                        t.cssText = n;
                    });
                    this.Gi.open(),
                        (this.Qi = mr(CSSStyleDeclaration.prototype, 'setProperty')),
                        this.Qi &&
                            this.Qi.afterSync(function (t) {
                                s(t.that);
                            }),
                        (this.Xi = mr(CSSStyleDeclaration.prototype, 'removeProperty')),
                        this.Xi &&
                            this.Xi.afterSync(function (t) {
                                s(t.that);
                            });
                }),
                (t.prototype.ji = function () {
                    this.Gi && this.Gi.close(), this.Qi && this.Qi.disable(), this.Xi && this.Xi.disable();
                }),
                (t.prototype.updateConsent = function () {
                    var t = this;
                    this.Mn &&
                        _n(this.Mn, function (n) {
                            return t.refreshElement(n);
                        });
                }),
                (t.prototype.refreshElement = function (t) {
                    Vu(t) && this.ki.push(t);
                }),
                (t.prototype.acceptSanitizer = function (t) {
                    this.Ti.push(t);
                }),
                (t.prototype.acceptVisitor = function (t) {
                    this.Ci.push(t);
                }),
                (t.prototype.visit = function (t) {}),
                (t.prototype.preVisit = function (t) {
                    var n = this,
                        i = t.node,
                        r = t.name;
                    if (t.type === Yt && !Hu(i, t)) {
                        var e = i;
                        if ((e.shadowRoot && this.Di(e.shadowRoot), 'SLOT' === r)) {
                            var s = qu(i);
                            (null == s ? void 0 : s.shadowRootType) === bo &&
                                i.addEventListener(
                                    'slotchange',
                                    wu.wrap(function (t) {
                                        var r;
                                        n.ki.push(null !== (r = t.target) && void 0 !== r ? r : i);
                                    })
                                );
                        }
                    }
                }),
                (t.ThrottleMax = 1024),
                (t.ThrottleInterval = 1e4),
                t
            );
        })();
    function ca(t, n) {
        void 0 === n && (n = !1);
        var i = 1;
        if (!t || t.nodeType !== Yt) return i;
        var r = t;
        if (((i += xt.elQuerySelectorAll(r, '*').length), n)) {
            var e = r.shadowRoot;
            e && 11 === e.nodeType && (i += xt.docFragQuerySelectorAll(e, '*').length);
        }
        return i;
    }
    var ha,
        fa = function (t, n, r) {
            try {
                if (-1 !== PerformanceObserver.supportedEntryTypes.indexOf(t)) {
                    var e = new PerformanceObserver(function (t) {
                            _e.resolve().then(function () {
                                n(t.getEntries());
                            });
                        }),
                        s = i({ type: t, buffered: !0 }, r);
                    return e.observe(s), e;
                }
            } catch (t) {}
        },
        va = 0,
        la = 1 / 0,
        da = 0;
    function pa(t) {
        for (var n = 0, i = t; n < i.length; n++) {
            var r = i[n];
            r.interactionId &&
                ((la = xt.mathMin(la, r.interactionId)),
                (da = xt.mathMax(da, r.interactionId)),
                (va = da ? (da - la) / 7 + 1 : 0));
        }
    }
    var wa = 'first-input',
        ga = 'largest-contentful-paint',
        ma = 'layout-shift',
        ya = 'longtask',
        ba = 'event',
        Sa = 'mark',
        ka = 'measure',
        _a = 'navigation',
        Aa = 'paint',
        Ia = 'resource',
        Ea = 'long-animation-frame',
        Ta = (function () {
            function t(t, n, i, r) {
                (this.ut = t),
                    (this.Ht = n),
                    (this.Yi = r),
                    (this.Ji = !1),
                    (this.Zi = !1),
                    (this.tr = Ai.DefaultOrgSettings.MaxPerfMarksPerPage),
                    (this.nr = 0),
                    (this.ir = 0),
                    (this.rr = !1),
                    (this.er = []),
                    (this.sr = !1),
                    window.performance && (this.vt = i.createChild());
            }
            return (
                (t.prototype.initialize = function (t) {
                    var n = t.resourceUploader,
                        i = t.recTimings,
                        r = t.recImgs,
                        e = t.maxPerfMarksPerPage;
                    (this.ur = n),
                        (this.Zi = i),
                        (this.Ji = r),
                        (this.tr = e || Ai.DefaultOrgSettings.MaxPerfMarksPerPage);
                }),
                (t.prototype.start = function () {
                    var t = this;
                    this.nr = 0;
                    var n = this.ar();
                    this.cr(n);
                    var i = window.performance;
                    i &&
                        ('interactionCount' in performance ||
                            ha ||
                            (ha = fa('event', pa, { type: 'event', buffered: !0, durationThreshold: 0 })),
                        this.er.length > 0 &&
                            i.addEventListener &&
                            i.removeEventListener &&
                            this.vt &&
                            this.vt.add(i, 'resourcetimingbufferfull', !0, function () {
                                t.Ht.enqueue({ Kind: cn.RESOURCE_TIMING_BUFFER_FULL, Args: [] });
                            }),
                        this.hr(),
                        this.vr());
                }),
                (t.prototype.onLoad = function () {
                    if (!this.rr) {
                        this.rr = !0;
                        var t = window.performance;
                        t && t.timing && this.lr(zn.Timing, t.timing, $n.Timing);
                    }
                }),
                (t.prototype.tick = function () {
                    this.hr();
                }),
                (t.prototype.stop = function () {
                    this.vt && this.vt.clear(), (this.ur = void 0);
                    var t = [];
                    if (this.er.length > 0) {
                        for (var n = 0, i = this.er; n < i.length; n++) {
                            var r = i[n];
                            t.push.apply(t, Ca(r));
                        }
                        this.er = [];
                    } else
                        window.performance &&
                            'function' == typeof window.performance.getEntries &&
                            (t = window.performance.getEntries());
                    t.length > 300 &&
                        ((t = t.slice(0, 300)), this.Ht.enqueue({ Kind: cn.RESOURCE_TIMING_BUFFER_FULL, Args: [] })),
                        this.hr(),
                        this.Bn(t),
                        this.ut.taskQueue.flush();
                }),
                (t.prototype.Bn = function (t) {
                    for (
                        var n = this,
                            i = function (t) {
                                r.ut.taskQueue.enqueue(function () {
                                    return n.dr(t);
                                });
                            },
                            r = this,
                            e = 0,
                            s = t;
                        e < s.length;
                        e++
                    )
                        i(s[e]);
                }),
                (t.prototype.ar = function () {
                    var t = this;
                    if (!window.PerformanceObserver || !window.performance) return [];
                    'function' == typeof window.performance.getEntries && this.Bn(performance.getEntries());
                    var n = [];
                    return (
                        [ba, wa, ga, ma, ya, Sa, ka, _a, Aa, Ia, Ea].forEach(function (i) {
                            var r = { buffered: !0 };
                            i === ba && (r.durationThreshold = 40);
                            var e = fa(i, t.Bn.bind(t), r);
                            e && t.er.push(e), n.push([i, !!e]);
                        }),
                        n
                    );
                }),
                (t.prototype.hr = function () {
                    var t = window.performance;
                    if (!this.ut.recording.inFrame && t) {
                        var n = t.memory;
                        if (n) {
                            var i = n.usedJSHeapSize - this.ir;
                            (0 == this.ir || xt.mathAbs(i / this.ir) > 0.2) &&
                                (this.lr(zn.Memory, n, $n.Memory), (this.ir = n.usedJSHeapSize));
                        }
                    }
                }),
                (t.prototype.vr = function () {
                    var t = { timeOrigin: xr.timeOrigin };
                    this.lr(zn.TimeOrigin, t, $n.TimeOrigin);
                }),
                (t.prototype.dr = function (t) {
                    switch (t.entryType) {
                        case ba:
                            this.pr(), this.lr(zn.EventTiming, t, $n.EventTiming);
                            break;
                        case wa:
                            this.lr(zn.FirstInput, t, $n.FirstInput);
                            break;
                        case ga:
                            this.lr(zn.LargestContentfulPaint, t, $n.LargestContentfulPaint);
                            break;
                        case ma:
                            this.lr(zn.LayoutShift, t, $n.LayoutShift);
                            break;
                        case ya:
                            this.lr(zn.LongTask, t, $n.Measure);
                            break;
                        case Ea:
                            this.wr(t);
                            break;
                        case Sa:
                            this.lr(zn.Mark, t, $n.Measure);
                            break;
                        case ka:
                            this.lr(zn.Measure, t, $n.Measure);
                            break;
                        case _a:
                            this.lr(zn.Navigation, t, $n.Navigation, { name: _a });
                            break;
                        case Aa:
                            this.lr(zn.Paint, t, $n.Measure);
                            break;
                        case Ia:
                            this.gr(t);
                    }
                }),
                (t.prototype.wr = function (t) {
                    if (t.scripts)
                        for (var n = 0, i = t.scripts; n < i.length; n++) {
                            var r = i[n];
                            this.lr(zn.ScriptTiming, r, $n.ScriptTiming, { sourceURL: 'script' });
                        }
                    this.lr(zn.LongAnimationFrame, t, $n.LongAnimationFrame);
                }),
                (t.prototype.gr = function (t) {
                    if (this.Zi) {
                        var n = t.initiatorType;
                        (this.Ji || ('img' !== n && 'image' !== n)) &&
                            this.lr(zn.Resource, t, $n.Resource, { name: n });
                    }
                }),
                (t.prototype.lr = function (t, n, i, r) {
                    if ((void 0 === r && (r = {}), !this.atLimit(t))) {
                        for (var e = [t], s = 0, u = i; s < u.length; s++) {
                            var o = u[s],
                                a = n[o];
                            if ((void 0 === a && (a = -1), o in r)) {
                                var c = Ms(a, { source: 'perfEntry', type: r[o] }),
                                    h = a !== c;
                                a = this.mr(t, n, c, h);
                            }
                            'target' === o && _r(a) && (a = Vu(a)), e.push(a);
                        }
                        this.Ht.enqueue({ Kind: cn.PERF_ENTRY, Args: e });
                    }
                }),
                (t.prototype.mr = function (t, n, i, r) {
                    if (t !== zn.Resource) return i;
                    switch (n.initiatorType) {
                        case '':
                        case 'xmlhttprequest':
                        case 'fetch':
                        case 'script':
                        case 'beacon':
                            return i;
                        case 'css':
                            if (this.ur && !r) {
                                var e = Ye('', i);
                                this.ur.uploadIfNeeded(this.ut.window, e, 'css');
                            }
                            return this.Yi.obfuscateUrl(i, 'css');
                        default:
                            return this.Yi.obfuscateUrl(i);
                    }
                }),
                (t.prototype.atLimit = function (t) {
                    switch (t) {
                        case zn.Mark:
                        case zn.Measure:
                            if (this.nr >= this.tr) return !0;
                            this.nr++;
                    }
                    return !1;
                }),
                (t.prototype.cr = function (t) {
                    if (!this.ut.recording.inFrame) {
                        for (
                            var n = window.performance,
                                i = [
                                    Gn.Performance,
                                    n && !!n.timing,
                                    Gn.PerformanceEntries,
                                    n && 'function' == typeof n.getEntries,
                                    Gn.PerformanceMemory,
                                    n && !!n.memory,
                                    Gn.PerformanceObserver,
                                    !!window.PerformanceObserver,
                                    Gn.PerformanceTimeOrigin,
                                    n && !!n.timeOrigin,
                                ],
                                r = 0,
                                e = t;
                            r < e.length;
                            r++
                        ) {
                            var s = e[r],
                                u = s[0],
                                o = s[1];
                            switch (u) {
                                case ma:
                                    i.push(Gn.LayoutShift, o);
                                    break;
                                case wa:
                                    i.push(Gn.FirstInput, o);
                                    break;
                                case ga:
                                    i.push(Gn.LargestContentfulPaint, o);
                                    break;
                                case ya:
                                    i.push(Gn.LongTask, o);
                            }
                        }
                        this.Ht.enqueue({ Kind: cn.REC_FEAT_SUPPORTED, Args: i });
                    }
                }),
                (t.prototype.pr = function () {
                    var t = this;
                    this.sr ||
                        ((this.sr = !0),
                        this.ut.taskQueue.enqueue(function () {
                            var n = ha ? va : performance.interactionCount || 0;
                            t.Ht.enqueue({ Kind: cn.PERF_ENTRY, Args: [zn.EventTimingCount, n] }), (t.sr = !1);
                        }));
                }),
                t
            );
        })();
    function Ca(t) {
        var n = [];
        return t.takeRecords && (n = t.takeRecords()), t.disconnect(), n;
    }
    function xa(t) {
        var n = 0,
            i = { id: n++, edges: {} };
        return (
            t.split('\n').forEach(function (t) {
                var r = t.trim();
                if ('' != r) {
                    if (0 == r.indexOf('/') || r.lastIndexOf('/') == r.length - 1)
                        throw new Error('Leading and trailing slashes are not supported');
                    var e = i,
                        s = r.split('/');
                    s.forEach(function (t, i) {
                        var r = t.trim();
                        if ('' === r) throw new Error('Empty elements are not allowed');
                        if ('**' != r && '*' != r && -1 != r.indexOf('*'))
                            throw new Error('Embedded wildcards are not supported');
                        var u = null;
                        r in e.edges && (u = e.edges[r]),
                            u || ((u = { id: n++, edges: {} }), (e.edges[r] = u)),
                            i == s.length - 1 && (u.term = !0),
                            (e = u);
                    });
                }
            }),
            i
        );
    }
    var Ka = xa('**'),
        Ra = '_fs_trimmed_values';
    function Ma(t, n, i) {
        if (!Za(i)) {
            try {
                for (var r = [], e = 0, s = i; e < s.length; e++) {
                    var u = s[e];
                    if (!u) return;
                    var o = new Oa(!0 === u ? Ka : u);
                    r.push(o);
                }
                var a = (function (t, n) {
                        for (
                            var i = {},
                                r = function (n) {
                                    i[n] = function () {
                                        for (var i = [], r = 0; r < arguments.length; r++) i[r] = arguments[r];
                                        for (var e = 0, s = t; e < s.length; e++) {
                                            var u = s[e];
                                            u[n].apply(u, i);
                                        }
                                    };
                                },
                                e = 0,
                                s = ['push', 'pop'];
                            e < s.length;
                            e++
                        )
                            r(s[e]);
                        return i;
                    })(r),
                    c = 0,
                    h = [1],
                    f = !1;
                return xt.jsonStringify(t, function (t, i) {
                    var e = i,
                        s = typeof e,
                        u = e && 'object' === s;
                    if ('' === t && 1 === h.length) return h[0]--, u && h.push(xt.objectKeys(e).length), e;
                    if (
                        (a.push(t),
                        r.some(function (t) {
                            return t.isRedacted(!u);
                        }) && ((e = Ai.BlockedFieldValue), (u = !1)),
                        (c += t.length + 2),
                        u)
                    )
                        c += 2;
                    else if (
                        (function (t, n) {
                            return null != t && 'symbol' !== n && 'function' !== n;
                        })(e, s)
                    )
                        try {
                            c += e.toString().length;
                        } catch (t) {}
                    else c += 4;
                    for (
                        c >= n && (f ? (e = void 0) : ((e = Ra), (f = !0))),
                            h[h.length - 1]--,
                            u && e && e !== Ai.BlockedFieldValue ? h.push(xt.objectKeys(e).length) : a.pop();
                        h[h.length - 1] <= 0;

                    )
                        h.pop(), a.pop();
                    for (var o = 0, v = r; o < v.length; o++) {
                        var l = v[o].depth();
                        if (void 0 !== l && h.length > 0 && l !== h.length - 1)
                            throw new Error('Property matcher depth out of sync');
                    }
                    return e;
                });
            } catch (t) {
                wu.sendErr(t);
            }
            return '[error serializing '.concat(t.constructor.name, ']');
        }
    }
    var Oa = (function () {
        function t(t) {
            this.yr = 1;
            var n = [t];
            t.edges['**'] && n.push(t.edges['**']), (this.br = [n]);
        }
        return (
            (t.prototype.Sr = function () {
                if (this.br.length <= 0) return [];
                var t = this.br.length - 1,
                    n = this.br[t];
                return 'number' == typeof n ? this.br[t - 1] : n;
            }),
            (t.prototype.depth = function () {
                return this.yr;
            }),
            (t.prototype.isRedacted = function (t) {
                var n = this.Sr();
                return (
                    0 === n.length ||
                    (t &&
                        !n.some(function (t) {
                            return t.term;
                        }))
                );
            }),
            (t.prototype.push = function (t) {
                var n;
                this.yr++;
                var i = this.Sr(),
                    r = [];
                function e(n) {
                    n.edges['**'] && (r.push(n.edges['**'], ja(n)), e(n.edges['**'])),
                        n.edges['*'] && r.push(n.edges['*']),
                        n.edges[t] && r.push(n.edges[t]);
                }
                for (var s = 0, u = i; s < u.length; s++) {
                    var o = u[s];
                    if (null === (n = o.edges['**']) || void 0 === n ? void 0 : n.term) {
                        r = [ja(o), o.edges['**']];
                        break;
                    }
                    e(o);
                }
                var a = !1;
                if (r.length !== i.length) a = !0;
                else
                    for (var c = 0; c < r.length; c++)
                        if (r[c].id !== i[c].id) {
                            a = !0;
                            break;
                        }
                a
                    ? this.br.push(r)
                    : ('number' != typeof this.br[this.br.length - 1] && this.br.push(0),
                      this.br[this.br.length - 1]++);
            }),
            (t.prototype.pop = function () {
                this.yr > 0 && this.yr--;
                var t = this.br[this.br.length - 1];
                'number' == typeof t && t > 1 ? this.br[this.br.length - 1]-- : this.br.pop();
            }),
            t
        );
    })();
    function ja(t) {
        var n = t.edges['**'];
        if (!n) throw new Error('Node must have double-wildcard edge.');
        return ar(t.edges, 1) ? { id: -n.id, edges: { '**': n } } : t;
    }
    var Pa = 'TextDecoder' in window,
        Ua = 'Request' in window,
        Na = !K && !g,
        La = 'ReadableStream' in window && 'function' == typeof ReadableStream.prototype.tee,
        Da = (function () {
            function t(t) {
                (this.kr = t),
                    (this._r = null),
                    (this.Ar = Ai.DefaultOrgSettings.MaxAjaxPayloadLength),
                    (this.Ir = new Bt());
            }
            return (
                (t.prototype.setMaxAjaxPayloadLength = function (t) {
                    this.Ar = t || Ai.DefaultOrgSettings.MaxAjaxPayloadLength;
                }),
                (t.prototype.disable = function () {
                    this._r && (this._r.disable(), (this._r = null));
                }),
                (t.prototype.enable = function (t) {
                    var n,
                        i = this,
                        s = z(t),
                        u = null === (n = null == s ? void 0 : s._w) || void 0 === n ? void 0 : n.fetch;
                    (u || t.fetch) &&
                        ((this._r = mr(u ? s._w : t, 'fetch')),
                        this._r &&
                            (this._r.before(function (t) {
                                i.Er(t);
                            }),
                            this._r.afterSync(function (t) {
                                var n = t.result;
                                t.result = r(i, void 0, void 0, function () {
                                    return e(this, function (i) {
                                        switch (i.label) {
                                            case 0:
                                                return i.trys.push([0, 2, , 3]), [4, this.Tr(n, t.args[0], t.args[1])];
                                            case 1:
                                            case 2:
                                                return i.sent(), [3, 3];
                                            case 3:
                                                return [2, n];
                                        }
                                    });
                                });
                            })));
                }),
                (t.prototype.Er = function (t) {
                    if (La && Pa && Na)
                        try {
                            var n = t.args[0],
                                i = t.args[1];
                            if (
                                Ua &&
                                !ir(n) &&
                                'url' in n &&
                                n instanceof Request &&
                                Na &&
                                n.body instanceof ReadableStream &&
                                Fa(n.headers)
                            ) {
                                var r = Wa(n.clone().body, this.Ar);
                                return void this.Ir.set(n, r);
                            }
                            if (i) {
                                var e = cc(i.headers);
                                if (i.body && i.body instanceof ReadableStream && Fa(e) && Na) {
                                    var s = i.body.tee(),
                                        u = s[0],
                                        o = s[1];
                                    (i.body = o), (r = Wa(u, this.Ar)), this.Ir.set(i, r);
                                }
                            }
                        } catch (t) {}
                }),
                (t.prototype.Tr = function (t, n, i) {
                    return r(this, void 0, _e, function () {
                        var s, u, o, a, c, h;
                        return e(this, function (f) {
                            switch (f.label) {
                                case 0:
                                    return (
                                        (s = 'GET'),
                                        (u = ''),
                                        (c = !1),
                                        'string' != typeof n ? [3, 1] : ((u = n), [3, 5])
                                    );
                                case 1:
                                    return 'url' in n
                                        ? ((u = n.url),
                                          (s = n.method),
                                          (o = n.body),
                                          (a = n.headers),
                                          (c = !!n.signal),
                                          this.Ir.has(n) ? [4, this.Cr(n)] : [3, 3])
                                        : [3, 4];
                                case 2:
                                    (o = f.sent()), (f.label = 3);
                                case 3:
                                    return [3, 5];
                                case 4:
                                    (u = ''.concat(n)), (f.label = 5);
                                case 5:
                                    return u
                                        ? i
                                            ? ((s = i.method || s),
                                              (a = cc(i.headers)),
                                              this.Ir.has(i) ? [4, this.Cr(i)] : [3, 7])
                                            : [3, 9]
                                        : [2];
                                case 6:
                                    return (o = f.sent()), [3, 8];
                                case 7:
                                    (o = i.body || o), (f.label = 8);
                                case 8:
                                    (c = !!i.signal || c), (f.label = 9);
                                case 9:
                                    return (
                                        (h = (function (t) {
                                            return r(this, void 0, _e, function () {
                                                var n, i, r, s, u;
                                                return e(this, function (e) {
                                                    switch (e.label) {
                                                        case 0:
                                                            return e.trys.push([0, 6, , 7]), [4, t];
                                                        case 1:
                                                            switch (
                                                                ((n = e.sent()), (u = n.ok ? Wn.OK : Wn.ERROR), n.type)
                                                            ) {
                                                                case 'opaque':
                                                                case 'opaqueredirect':
                                                                    u = Wn.OPAQUE;
                                                                    break;
                                                                case 'error':
                                                                    u = Wn.ERROR;
                                                            }
                                                            if (
                                                                !Ba(
                                                                    (
                                                                        (i = n.headers).get('content-type') ||
                                                                        Ai.TextPlain
                                                                    ).split(';')[0]
                                                                )
                                                            )
                                                                return [2, za(u, n.status, { headers: i, body: null })];
                                                            (r = null), (e.label = 2);
                                                        case 2:
                                                            return e.trys.push([2, 4, , 5]), [4, n.clone().text()];
                                                        case 3:
                                                            return (r = e.sent()), [3, 5];
                                                        case 4:
                                                            return e.sent(), (u = Wn.ABORTED), [3, 5];
                                                        case 5:
                                                            return [2, za(u, n.status, { headers: i, body: r })];
                                                        case 6:
                                                            return (
                                                                (s = e.sent()),
                                                                [
                                                                    2,
                                                                    za(
                                                                        (u =
                                                                            (o = s) && 'AbortError' === o.name
                                                                                ? Wn.ABORTED
                                                                                : Wn.ERROR),
                                                                        0,
                                                                        {
                                                                            headers: { forEach: function () {} },
                                                                            body: void 0,
                                                                        }
                                                                    ),
                                                                ]
                                                            );
                                                        case 7:
                                                            return [2];
                                                    }
                                                    var o;
                                                });
                                            });
                                        })(t)),
                                        c && u.search(/\/(?:graph|graphql|gql)/i) > -1
                                            ? [4, _e.race([h, Ie(5e3)])]
                                            : [3, 11]
                                    );
                                case 10:
                                    f.sent(), (f.label = 11);
                                case 11:
                                    return (
                                        this.kr.startRequest(
                                            s,
                                            u,
                                            {
                                                body: function () {
                                                    return o;
                                                },
                                                headers: a,
                                            },
                                            h
                                        ),
                                        [2]
                                    );
                            }
                        });
                    });
                }),
                (t.prototype.Cr = function (t) {
                    return r(this, void 0, _e, function () {
                        var n;
                        return e(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    return [
                                        4,
                                        _e.race([
                                            this.Ir.get(t),
                                            Ie(5e3).then(function () {
                                                return null;
                                            }),
                                        ]),
                                    ];
                                case 1:
                                    return (n = i.sent()), this.Ir['delete'](t), [2, n];
                            }
                        });
                    });
                }),
                t
            );
        })();
    function Fa(t) {
        var n = Ai.TextPlain;
        return (
            null == t ||
                t.forEach(function (t, i) {
                    'content-type' === i.toLowerCase() && (n = t);
                }),
            Ba(n)
        );
    }
    function Ba(t) {
        switch (t) {
            case 'application/json':
            case 'application/vnd.api+json':
            case Ai.TextPlain:
                return !0;
        }
        return !1;
    }
    function Wa(t, n) {
        return r(this, void 0, _e, function () {
            var i, r, s, u, o;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        if (!Pa) return [2, ''];
                        e.label = 1;
                    case 1:
                        return (
                            e.trys.push([1, 3, , 4]),
                            (i = new TextDecoder()),
                            (r = t.getReader()),
                            (s = Ce(r, n).then(function (t) {
                                return t
                                    .map(function (t) {
                                        return i.decode(t);
                                    })
                                    .join('');
                            })),
                            (u = Ie(2e3).then(function () {
                                return '_fs_timeout';
                            })),
                            [4, _e.race([s, u])]
                        );
                    case 2:
                        return '_fs_timeout' === (o = e.sent())
                            ? (r.cancel()['catch'](function (t) {}), [2, ''])
                            : [2, o];
                    case 3:
                        return e.sent(), [2, ''];
                    case 4:
                        return [2];
                }
            });
        });
    }
    var Ha = (function () {
        function t(t) {
            (this.kr = t), (this.Kr = new WeakMap());
        }
        return (
            (t.prototype.disable = function () {
                this.Rr && (this.Rr.disable(), (this.Rr = null)),
                    this.Mr && (this.Mr.disable(), (this.Mr = null)),
                    this.Or && (this.Or.disable(), (this.Or = null));
            }),
            (t.prototype.jr = function (t) {
                var n = this.Kr.get(t);
                if (n) return n;
                var i = {};
                return this.Kr.set(t, i), i;
            }),
            (t.prototype.enable = function (t) {
                var n,
                    i,
                    s,
                    u,
                    o = this,
                    a = z(t),
                    c =
                        (null === (n = null == a ? void 0 : a._w) || void 0 === n ? void 0 : n.XMLHttpRequest) ||
                        t.XMLHttpRequest;
                if (c) {
                    var h = c.prototype;
                    (this.Rr =
                        null === (i = mr(h, 'open')) || void 0 === i
                            ? void 0
                            : i.before(function (t) {
                                  var n = o.jr(t.that);
                                  (n.method = t.args[0]), (n.url = t.args[1]);
                              })),
                        (this.Or =
                            null === (s = mr(h, 'setRequestHeader')) || void 0 === s
                                ? void 0
                                : s.before(function (t) {
                                      var n = t.that,
                                          i = t.args[0],
                                          r = t.args[1],
                                          e = o.jr(n);
                                      e.headers || (e.headers = []), e.headers.push([i, r]);
                                  })),
                        (this.Mr =
                            null === (u = mr(h, 'send')) || void 0 === u
                                ? void 0
                                : u.before(function (t) {
                                      var n = t.that,
                                          i = t.args[0],
                                          s = o.jr(n),
                                          u = s.url,
                                          a = s.method,
                                          c = s.headers;
                                      void 0 !== u &&
                                          void 0 !== a &&
                                          (o.Kr['delete'](n),
                                          o.kr.startRequest(
                                              a,
                                              u,
                                              { headers: cc(c), body: i },
                                              (function (t) {
                                                  return r(this, void 0, _e, function () {
                                                      var n, i;
                                                      return e(this, function (r) {
                                                          switch (r.label) {
                                                              case 0:
                                                                  return [
                                                                      4,
                                                                      new _e(function (n) {
                                                                          t.addEventListener('load', function () {
                                                                              return n(Wn.OK);
                                                                          }),
                                                                              t.addEventListener('abort', function () {
                                                                                  return n(Wn.ABORTED);
                                                                              }),
                                                                              t.addEventListener(
                                                                                  'readystatechange',
                                                                                  function () {
                                                                                      t.readyState ===
                                                                                          XMLHttpRequest.DONE &&
                                                                                          0 !== t.status &&
                                                                                          (t.status < 400
                                                                                              ? n(Wn.OK)
                                                                                              : n(Wn.ERROR));
                                                                                  }
                                                                              ),
                                                                              t.addEventListener('error', function () {
                                                                                  t.readyState === t.UNSENT
                                                                                      ? n(Wn.ABORTED)
                                                                                      : n(Wn.ERROR);
                                                                              });
                                                                      }),
                                                                  ];
                                                              case 1:
                                                                  return (
                                                                      (n = r.sent()),
                                                                      (i = (function (t) {
                                                                          if (t)
                                                                              return {
                                                                                  forEach: function (n) {
                                                                                      for (
                                                                                          var i,
                                                                                              r =
                                                                                                  /([^:]*):\s+(.*)(?:\r\n|$)/g;
                                                                                          (i = r.exec(t));

                                                                                      )
                                                                                          n(i[2], i[1]);
                                                                                  },
                                                                              };
                                                                      })(t.getAllResponseHeaders())),
                                                                      [
                                                                          2,
                                                                          za(n, t.status, {
                                                                              headers: i,
                                                                              body: function () {
                                                                                  return 'text' === t.responseType
                                                                                      ? t.responseText
                                                                                      : t.response;
                                                                              },
                                                                          }),
                                                                      ]
                                                                  );
                                                          }
                                                      });
                                                  });
                                              })(n)
                                          ));
                                  }));
                }
            }),
            (t.prototype.setMaxAjaxPayloadLength = function (t) {}),
            t
        );
    })();
    function za(t, n, i) {
        return { state: t, status: n, data: i };
    }
    var qa,
        $a,
        Va,
        Ga,
        Qa,
        Xa = /^data:/i,
        Ya = (function () {
            function t(t, n) {
                (this.ut = t),
                    (this.Ht = n),
                    (this.mn = !1),
                    (this.Pr = new Ja(t, n)),
                    (this.Ur = new Ha(this.Pr)),
                    (this.Nr = new Da(this.Pr));
            }
            return (
                (t.prototype.isEnabled = function () {
                    return this.mn;
                }),
                (t.prototype.start = function (t) {
                    t.AjaxWatcher &&
                        (this.mn ||
                            ((this.mn = !0),
                            this.Ht.enqueue({ Kind: cn.REC_FEAT_SUPPORTED, Args: [Gn.Ajax, !0] }),
                            this.Ur.enable(this.ut.window),
                            this.Nr.enable(this.ut.window)));
                }),
                (t.prototype.stop = function () {
                    this.mn && ((this.mn = !1), this.Ur.disable(), this.Nr.disable());
                }),
                (t.prototype.tick = function () {
                    this.Pr.tick();
                }),
                (t.prototype.setWatches = function (t) {
                    this.Pr.setWatches(t);
                }),
                (t.prototype.initialize = function (t) {
                    this.Pr.initialize(t), this.Nr.setMaxAjaxPayloadLength(t.maxAjaxPayloadLength);
                }),
                t
            );
        })(),
        Ja = (function () {
            function t(t, n) {
                (this.ut = t),
                    (this.Ht = n),
                    (this.Lr = []),
                    (this.Dr = {}),
                    (this.Fr = {}),
                    (this.Br = []),
                    (this.Ar = 0);
                var i = Ai.DefaultOrgSettings;
                this.initialize({
                    requests: i.HttpRequestHeadersAllowlist,
                    responses: i.HttpResponseHeadersAllowlist,
                    maxAjaxPayloadLength: i.MaxAjaxPayloadLength,
                });
            }
            return (
                (t.prototype.Wr = function (t) {
                    for (var n = !1, i = !1, r = [], e = [], s = 0, u = this.Lr; s < u.length; s++) {
                        var o = u[s],
                            a = o.urlPattern,
                            c = o.reqFields,
                            h = o.rspFields;
                        if (n && i) break;
                        a.test(t) &&
                            (!1 === c && ((r = [!1]), (n = !0)),
                            n || r.push(c),
                            !1 === h && ((e = [!1]), (i = !0)),
                            i || e.push(h));
                    }
                    return [r, e];
                }),
                (t.prototype.Hr = function (t) {
                    this.Br.push(t);
                }),
                (t.prototype.setWatches = function (t) {
                    this.Lr = t.map(function (t) {
                        return {
                            urlPattern: new RegExp(t.URLRegex),
                            reqFields: uc(t.RecordReq, t.ReqAllowlist),
                            rspFields: uc(t.RecordRsp, t.RspAllowlist),
                        };
                    });
                }),
                (t.prototype.initialize = function (t) {
                    var n = this,
                        i = t.requests,
                        r = t.responses,
                        e = t.maxAjaxPayloadLength;
                    (this.Dr = {}),
                        (this.Fr = {}),
                        null == i ||
                            i.forEach(function (t) {
                                return (n.Dr[t] = !0);
                            }),
                        null == r ||
                            r.forEach(function (t) {
                                return (n.Fr[t] = !0);
                            }),
                        (this.Ar = e || Ai.DefaultOrgSettings.MaxAjaxPayloadLength);
                }),
                (t.prototype.addHeaderAllowlist = function (t, n) {
                    var i = this;
                    null == t ||
                        t.forEach(function (t) {
                            return (i.Dr[t] = !0);
                        }),
                        null == n ||
                            n.forEach(function (t) {
                                return (i.Fr[t] = !0);
                            });
                }),
                (t.prototype.tick = function () {
                    for (var t = 0; t < this.Br.length; t++)
                        this.Ht.enqueue({ Kind: cn.AJAX_REQUEST, Args: this.Br[t] });
                    this.Br = [];
                }),
                (t.prototype.startRequest = function (t, n, i, s) {
                    var u, o;
                    return r(this, void 0, _e, function () {
                        var r, a, c, h, f, v, l, d, p, w, g, m, y;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return Xa.test(n)
                                        ? [2]
                                        : ((r = Kr()),
                                          (a = (function (t, n) {
                                              return Xe.resolveToDocument(t, n);
                                          })(this.ut.window, n)),
                                          (c = this.Wr(a)),
                                          (h = c[0]),
                                          (f = c[1]),
                                          [4, this.zr(h, i)]);
                                case 1:
                                    return (
                                        (v = e.sent()),
                                        [
                                            4,
                                            s['catch'](function () {
                                                return za(Wn.ERROR, 0, {
                                                    headers: { forEach: function () {} },
                                                    body: void 0,
                                                });
                                            }),
                                        ]
                                    );
                                case 2:
                                    return (
                                        (l = e.sent()),
                                        (d = l.state),
                                        (p = l.status),
                                        (w = l.data),
                                        (g = Kr() - r),
                                        [4, this.qr(f, w)]
                                    );
                                case 3:
                                    return (
                                        (m = e.sent()),
                                        (y = [
                                            t,
                                            Ms(a, { source: 'event', type: cn.AJAX_REQUEST }),
                                            g,
                                            p,
                                            v.headers,
                                            m.headers,
                                            r,
                                            v.size,
                                            m.size,
                                            null !== (u = v.text) && void 0 !== u ? u : null,
                                            null !== (o = m.text) && void 0 !== o ? o : null,
                                            v.legibility,
                                            m.legibility,
                                            d,
                                        ]),
                                        this.Hr(y),
                                        [2]
                                    );
                            }
                        });
                    });
                }),
                (t.prototype.zr = function (t, n) {
                    return oc(this.Dr, t, this.Ar, n);
                }),
                (t.prototype.qr = function (t, n) {
                    return oc(this.Fr, t, this.Ar, n);
                }),
                t
            );
        })();
    function Za(t) {
        return 0 === t.length || t.indexOf(!1) > -1;
    }
    function tc(t, n, i) {
        return [t.length, sc(t, n, i)];
    }
    function nc(t, n, i) {
        var r = void 0;
        return Za(n) || (r = Ma(t, i, n)), [ec(t), r];
    }
    function ic(t, n) {
        var i = t.byteLength,
            r = void 0;
        return Za(n) || (r = '[ArrayBuffer]'), [i, r];
    }
    function rc(t, n, i) {
        return r(this, void 0, _e, function () {
            var r, s, u, o, a;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        if (((s = (r = t).size), Za(n))) return [2, [s, void 0]];
                        if (!Ba(r.type)) return [3, 4];
                        e.label = 1;
                    case 1:
                        return (
                            e.trys.push([1, 3, , 4]),
                            [
                                4,
                                r.text()['catch'](function (t) {
                                    wu.sendErr(t, 'warning');
                                }),
                            ]
                        );
                    case 2:
                        return (u = e.sent()) && (o = sc(u, n, i)) ? [2, [s, o]] : [3, 4];
                    case 3:
                        return (a = e.sent()), wu.sendErr(a, 'warning'), [3, 4];
                    case 4:
                        return [2, [s, '[Blob]']];
                }
            });
        });
    }
    function ec(t) {
        try {
            return xt.jsonStringify(t).length;
        } catch (t) {}
        return 0;
    }
    function sc(t, n, i) {
        if (!Za(n))
            try {
                return Ma(xt.jsonParse(t), i, n);
            } catch (r) {
                return n.length > 0 &&
                    n.every(function (t) {
                        return !0 === t;
                    })
                    ? t.slice(0, i)
                    : void 0;
            }
    }
    function uc(t, n) {
        switch (t) {
            default:
            case ei.Elide:
                return !1;
            case ei.Record:
                return !0;
            case ei.Allowlist:
                try {
                    return xa(n);
                } catch (t) {
                    return 'error parsing field allowlist ('.concat(n, ': ').concat(t), !1;
                }
        }
    }
    function oc(t, n, i, s) {
        var u;
        return r(this, void 0, _e, function () {
            var r, o, a, c, h, f, v;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        return (
                            (r = ''),
                            null === (u = s.headers) ||
                                void 0 === u ||
                                u.forEach(function (n, i) {
                                    var e = i.toLowerCase(),
                                        s = t[e];
                                    r += ''
                                        .concat(e)
                                        .concat(s ? ': '.concat(n) : '')
                                        .concat('\r\n');
                                }),
                            'function' != typeof (o = null == s ? void 0 : s.body) ? [3, 2] : [4, o()]
                        );
                    case 1:
                        return (a = e.sent()), [3, 3];
                    case 2:
                        (a = o), (e.label = 3);
                    case 3:
                        return [4, ac(n, a, i)];
                    case 4:
                        return (
                            (c = e.sent()),
                            (h = c[0]),
                            (f = c[1]),
                            (v = 0 !== h || f ? Fn.NotEmpty : Fn.Unknown),
                            [2, { headers: r, text: f, size: h, legibility: v }]
                        );
                }
            });
        });
    }
    function ac(t, n, i) {
        return (
            void 0 === i && (i = Ai.DefaultOrgSettings.MaxAjaxPayloadLength),
            r(this, void 0, _e, function () {
                var r;
                return e(this, function (e) {
                    if (null == n) return [2, [0, void 0]];
                    switch (typeof n) {
                        default:
                            return [2, [-1, Za(t) ? void 0 : '[unknown]']];
                        case 'string':
                            return [2, tc(n, t, i)];
                        case 'object':
                            switch ((r = n.constructor)) {
                                case Object:
                                default:
                                    return [2, nc(n, t, i)];
                                case Blob:
                                    return [2, rc(n, t, i)];
                                case ArrayBuffer:
                                    return [2, ic(n, t)];
                                case Document:
                                case FormData:
                                case URLSearchParams:
                                case ReadableStream:
                                    return [2, [-1, Za(t) ? void 0 : ''.concat(r.name)]];
                            }
                    }
                    return [2];
                });
            })
        );
    }
    function cc(t) {
        return t
            ? Gi(t)
                ? {
                      forEach: function (n) {
                          for (var i = 0, r = t; i < r.length; i++) {
                              var e = r[i],
                                  s = e[0];
                              n(e[1], s);
                          }
                      },
                  }
                : 'function' == typeof t.forEach
                  ? t
                  : {
                        forEach: function (n) {
                            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && n(t[i], i);
                        },
                    }
            : t;
    }
    (($a = qa || (qa = {}))[($a.CSS_INHERIT = 0)] = 'CSS_INHERIT'),
        ($a[($a.CSS_PRIMITIVE_VALUE = 1)] = 'CSS_PRIMITIVE_VALUE'),
        ($a[($a.CSS_VALUE_LIST = 2)] = 'CSS_VALUE_LIST'),
        ($a[($a.CSS_CUSTOM = 3)] = 'CSS_CUSTOM'),
        ((Ga = Va || (Va = {}))[(Ga.CSS_UNKNOWN = 0)] = 'CSS_UNKNOWN'),
        (Ga[(Ga.CSS_NUMBER = 1)] = 'CSS_NUMBER'),
        (Ga[(Ga.CSS_PERCENTAGE = 2)] = 'CSS_PERCENTAGE'),
        (Ga[(Ga.CSS_EMS = 3)] = 'CSS_EMS'),
        (Ga[(Ga.CSS_EXS = 4)] = 'CSS_EXS'),
        (Ga[(Ga.CSS_PX = 5)] = 'CSS_PX'),
        (Ga[(Ga.CSS_CM = 6)] = 'CSS_CM'),
        (Ga[(Ga.CSS_MM = 7)] = 'CSS_MM'),
        (Ga[(Ga.CSS_IN = 8)] = 'CSS_IN'),
        (Ga[(Ga.CSS_PT = 9)] = 'CSS_PT'),
        (Ga[(Ga.CSS_PC = 10)] = 'CSS_PC'),
        (Ga[(Ga.CSS_DEG = 11)] = 'CSS_DEG'),
        (Ga[(Ga.CSS_RAD = 12)] = 'CSS_RAD'),
        (Ga[(Ga.CSS_GRAD = 13)] = 'CSS_GRAD'),
        (Ga[(Ga.CSS_MS = 14)] = 'CSS_MS'),
        (Ga[(Ga.CSS_S = 15)] = 'CSS_S'),
        (Ga[(Ga.CSS_HZ = 16)] = 'CSS_HZ'),
        (Ga[(Ga.CSS_KHZ = 17)] = 'CSS_KHZ'),
        (Ga[(Ga.CSS_DIMENSION = 18)] = 'CSS_DIMENSION'),
        (Ga[(Ga.CSS_STRING = 19)] = 'CSS_STRING'),
        (Ga[(Ga.CSS_URI = 20)] = 'CSS_URI'),
        (Ga[(Ga.CSS_IDENT = 21)] = 'CSS_IDENT'),
        (Ga[(Ga.CSS_ATTR = 22)] = 'CSS_ATTR'),
        (Ga[(Ga.CSS_COUNTER = 23)] = 'CSS_COUNTER'),
        (Ga[(Ga.CSS_RECT = 24)] = 'CSS_RECT'),
        (Ga[(Ga.CSS_RGBCOLOR = 25)] = 'CSS_RGBCOLOR'),
        (Ga[(Ga.CSS_VW = 26)] = 'CSS_VW'),
        (Ga[(Ga.CSS_VH = 27)] = 'CSS_VH'),
        (Ga[(Ga.CSS_VMIN = 28)] = 'CSS_VMIN'),
        (Ga[(Ga.CSS_VMAX = 29)] = 'CSS_VMAX');
    var hc = "EventQueue not defined for 'withEventQueueFor', likely caused by holding ref to callback",
        fc = '_fs_stylesheet_hooked',
        vc = ['CSSMediaRule', 'CSSSupportsRule'],
        lc = (function () {
            function t(t, n, i, r) {
                void 0 === r && (r = io);
                var e = this;
                (this.ut = t),
                    (this.Ht = n),
                    (this.$r = i),
                    (this.Sn = []),
                    (this.Gt = []),
                    (this.Vr = 1),
                    (this.Gr = !1),
                    (this.Qr = new Map()),
                    (this.Xr = new Bt()),
                    (this.Yr = new Bt()),
                    (this.Jr = 0),
                    (this.Zr = new Bt(void 0, g)),
                    (this.te = new ro(1e4, 1e4, function () {
                        return setTimeout(function () {
                            e.Ht.enqueue({ Kind: cn.FAIL_THROTTLED, Args: [Jn.StyleSheetHooks] }), e.stop();
                        });
                    })),
                    (this.addInsert = this.te.guard(this.addInsert)),
                    (this.addDelete = this.te.guard(this.addDelete)),
                    (this.ne = new r(function () {
                        e.ie();
                    }, 50)),
                    (this.ee = hr(function (t, n) {
                        var i, r;
                        if (!(null === (i = t.parentRule) || void 0 === i ? void 0 : i.parentStyleSheet) || !e.Gr)
                            return !0;
                        var s = t.parentRule;
                        return (
                            e.Qr.has(s) || e.Qr.set(s, new Set()),
                            null === (r = e.Qr.get(s)) || void 0 === r || r.add(n),
                            e.ne.isRunning() || e.ne.start(),
                            !0
                        );
                    }));
            }
            return (
                (t.prototype.start = function () {
                    var t = this;
                    this.te.open();
                    var n = this.ut.window;
                    if (n.CSSStyleSheet && n.StyleSheet) {
                        var i = n.CSSStyleSheet.prototype;
                        this._r(i),
                            this.se(n),
                            this.ue(),
                            this.Gt.push(
                                yr(n.StyleSheet, 'disabled', function (n, i) {
                                    return t.onDisableSheet(n, i);
                                }),
                                yr(n.Document, 'adoptedStyleSheets', function (n) {
                                    return t.onSetAdoptedStyleSheets(n);
                                }),
                                yr(n.ShadowRoot, 'adoptedStyleSheets', function (n) {
                                    return t.onSetAdoptedStyleSheets(n);
                                })
                            ),
                            (this.Gr = !0);
                    }
                }),
                (t.prototype.se = function (t) {
                    var n,
                        i,
                        r = this,
                        e = function (t) {
                            var n = mr(t, 'insertRule');
                            n &&
                                (n.afterSync(function (t) {
                                    r.oe(t.that, t.args[0], t.args[1]);
                                }),
                                r.Sn.push(n)),
                                (n = mr(t, 'deleteRule')) &&
                                    (n.afterSync(function (t) {
                                        r.ae(t.that, t.args[0]);
                                    }),
                                    r.Sn.push(n));
                        };
                    if (
                        'function' ==
                        typeof (null === (n = t.CSSGroupingRule) || void 0 === n ? void 0 : n.prototype.insertRule)
                    )
                        e(t.CSSGroupingRule.prototype);
                    else
                        for (var s = 0, u = vc; s < u.length; s++) {
                            var o = null === (i = t[u[s]]) || void 0 === i ? void 0 : i.prototype;
                            o && e(o);
                        }
                }),
                (t.prototype.ue = function () {
                    var t = this;
                    if (!this.Gr) {
                        var n = mr(CSSStyleDeclaration.prototype, 'setProperty');
                        n &&
                            (n.afterSync(function (n) {
                                t.ee(n.that, n.args[0]);
                            }),
                            this.Sn.push(n));
                        var r = CSSStyleRule.prototype,
                            e = Object.getOwnPropertyDescriptor(r, 'style');
                        this.ce || (this.ce = null == e ? void 0 : e.get);
                        var s = this;
                        this.he = function () {
                            var t,
                                n = null === (t = null == e ? void 0 : e.get) || void 0 === t ? void 0 : t.apply(this);
                            return (
                                hr(function () {
                                    n = s.fe(n);
                                })(),
                                n
                            );
                        };
                        try {
                            Object.defineProperty(r, 'style', i(i({}, e), { get: s.he }));
                        } catch (t) {}
                    }
                }),
                (t.prototype.fe = function (t) {
                    var n = this.Xr.get(t);
                    if (n) return n;
                    var i = (function (t, n, i) {
                        if ('function' != typeof t.Proxy) return n;
                        var r = new t.Proxy(n, {
                            get: function (t, n) {
                                var i = t[n];
                                return 'function' != typeof i
                                    ? i
                                    : function () {
                                          for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
                                          var s = this;
                                          return s === r && (s = t), i.apply(s, n);
                                      };
                            },
                            set: function (t, n, r) {
                                var e = t[n];
                                return (t[n] = r), 'function' == typeof e || 'symbol' == typeof n || i(t, n), !0;
                            },
                        });
                        return r;
                    })(this.ut.window, t, Ut(this.ee));
                    return this.Xr.set(t, i), i;
                }),
                (t.prototype.ie = function () {
                    var t = this,
                        n = this.Qr;
                    (this.Qr = new Map()),
                        n.forEach(function (n, i) {
                            var r = i.parentStyleSheet;
                            if (r) {
                                var e = t.ve(r, i);
                                if (void 0 !== e) {
                                    var s = {};
                                    n.forEach(function (t) {
                                        s[t] = i.style[t];
                                    }),
                                        t.le(r, function (t) {
                                            t.enqueue({ Kind: cn.CSSRULE_UPDATE, Args: [e, s] });
                                        });
                                }
                            }
                        });
                }),
                (t.prototype.oe = function (t, n, i) {
                    var r = Sc(t);
                    this.addInsert(t.parentStyleSheet, n, i, r);
                }),
                (t.prototype.ae = function (t, n) {
                    var i = Sc(t);
                    this.addDelete(t.parentStyleSheet, n, i);
                }),
                (t.prototype._r = function (t) {
                    var n,
                        i = this;
                    (n = mr(t, 'insertRule')) &&
                        (n.afterSync(function (t) {
                            i.addInsert(t.that, t.args[0], t.args[1]);
                        }),
                        this.Sn.push(n)),
                        (n = mr(t, 'addRule')) &&
                            (n.afterSync(function (t) {
                                i.addInsert(t.that, ''.concat(t.args[0], ' {').concat(t.args[1], '}'), t.args[2]);
                            }),
                            this.Sn.push(n)),
                        (n = mr(t, 'deleteRule')) &&
                            (n.afterSync(function (t) {
                                i.addDelete(t.that, t.args[0]);
                            }),
                            this.Sn.push(n)),
                        (n = mr(t, 'removeRule')) &&
                            (n.afterSync(function (t) {
                                i.addDelete(t.that, t.args[0]);
                            }),
                            this.Sn.push(n)),
                        (n = mr(t, 'replaceSync')) &&
                            (n.afterSync(function (t) {
                                i.snapshotConstructedStylesheet(t.that, !0);
                            }),
                            this.Sn.push(n)),
                        (n = mr(t, 'replace')) &&
                            (n.afterSync(function (t) {
                                return r(i, void 0, _e, function () {
                                    return e(this, function (n) {
                                        switch (n.label) {
                                            case 0:
                                                return 'object' != typeof t.result || 'function' != typeof t.result.then
                                                    ? [2]
                                                    : [4, t.result];
                                            case 1:
                                                return n.sent(), this.snapshotConstructedStylesheet(t.that, !0), [2];
                                        }
                                    });
                                });
                            }),
                            this.Sn.push(n)),
                        Object.defineProperty(t, fc, { value: !0, configurable: !0 });
                }),
                (t.prototype.onSetAdoptedStyleSheets = function (t) {
                    if (Vu(t)) {
                        var n = t.adoptedStyleSheets;
                        if (n) {
                            for (var i = [], r = 0, e = n; r < e.length; r++) {
                                var s = e[r],
                                    u = this.snapshotConstructedStylesheet(s);
                                i.push(u), s.disabled && this.onDisableSheet(s, !0);
                            }
                            this.Ht.enqueue({ Kind: cn.ADOPTED_STYLESHEETS, Args: [Vu(t), i] });
                        }
                    }
                }),
                (t.prototype.snapshotEl = function (t) {
                    var n = Vu(t);
                    if (n && wc(t)) {
                        var i = (function (t) {
                            return t ? t.sheet : void 0;
                        })(t);
                        i && (this.de([Xn.Node, n], i), this.$r && _c(t));
                    }
                }),
                (t.prototype.processWayfinderLog = function (t) {
                    var n = this;
                    if (this.$r)
                        try {
                            var i = t.sheet;
                            if (!i) return;
                            var r = gc(this.Zr, i, Xn.Node);
                            if (!r) return;
                            var e = new Map();
                            _c(t).forEach(function (t) {
                                var s, u, o;
                                try {
                                    var a = (function (t) {
                                        var n = t.indexOf(':');
                                        return n <= 0 ? {} : JSON.parse(t.substring(n + 1));
                                    })(t);
                                    switch (a.kind) {
                                        case cn.CSSRULE_INSERT:
                                            n.addInsert(i, a.cssText, a.index, a.path);
                                            break;
                                        case cn.CSSRULE_DELETE:
                                            n.addDelete(i, a.index, a.path);
                                            break;
                                        case cn.CSSRULE_UPDATE:
                                            var c = [Mn.Index, r, a.index];
                                            (null !== (o = null === (u = a.path) || void 0 === u ? void 0 : u.length) &&
                                            void 0 !== o
                                                ? o
                                                : 0) > 0 && c.push(a.path);
                                            var h = fr(c);
                                            e.has(h)
                                                ? (e.get(h).rules[a.key] = a.value)
                                                : e.set(h, { ruleId: c, rules: ((s = {}), (s[a.key] = a.value), s) });
                                    }
                                } catch (t) {}
                            }),
                                this.le(i, function (t) {
                                    e.forEach(function (n) {
                                        t.enqueue({ Kind: cn.CSSRULE_UPDATE, Args: [n.ruleId, n.rules] });
                                    });
                                });
                        } catch (t) {}
                }),
                (t.prototype.snapshotConstructedStylesheet = function (t, n) {
                    void 0 === n && (n = !1);
                    var i = mc(this.Zr, t);
                    return n || void 0 === i
                        ? (void 0 === i &&
                              ((i = this.Vr++),
                              (function (t, n, i) {
                                  t.set(n, i);
                              })(this.Zr, t, i)),
                          this.de([Xn.Sheet, i], t),
                          i)
                        : i;
                }),
                (t.prototype.de = function (t, n) {
                    this.Ht.enqueue({ Kind: cn.RESET_CSS_SHEET, Args: [t] });
                    var i = (function (t) {
                        try {
                            return t ? t.cssRules || t.rules : void 0;
                        } catch (t) {
                            return;
                        }
                    })(n);
                    if (i) {
                        for (var r = [], e = 0; e < i.length; e++)
                            try {
                                var s = yc(pc(i[e]));
                                r.push(s);
                            } catch (t) {
                                r.push('html {}');
                            }
                        this.Ht.enqueue({ Kind: cn.CSSRULE_INSERT, Args: [t, r, 0] });
                    }
                }),
                (t.prototype.addInsert = function (t, n, i, r) {
                    var e = gc(this.Zr, t, Xn.Node);
                    if (e && 'string' == typeof n) {
                        var s = [e, [yc(n)]];
                        void 0 !== i && (s[2] = i),
                            void 0 !== r && (s[3] = r),
                            this.le(t, function (t) {
                                return t.enqueue({ Kind: cn.CSSRULE_INSERT, Args: s });
                            });
                    }
                }),
                (t.prototype.addDelete = function (t, n, i) {
                    var r = gc(this.Zr, t, Xn.Node);
                    r &&
                        this.le(t, function (t) {
                            return t.enqueue({ Kind: cn.CSSRULE_DELETE, Args: i ? [r, n, i] : [r, n] });
                        });
                }),
                (t.prototype.onDisableSheet = function (t, n) {
                    var i = gc(this.Zr, t, Xn.Node);
                    i &&
                        this.le(t, function (t) {
                            return t.enqueue({ Kind: cn.DISABLE_STYLESHEET, Args: [i, !!n] });
                        });
                }),
                (t.prototype.le = function (t, n) {
                    if (t.ownerNode)
                        return (
                            (i = this.ut),
                            (r = t.ownerNode),
                            (e = n),
                            void (
                                (s = z(
                                    (function (t) {
                                        var n = t.ownerDocument;
                                        return n && n.defaultView;
                                    })(r) || i.window
                                )) &&
                                'function' == typeof s._withEventQueue &&
                                s._withEventQueue(i.recording.pageSignature(), function (t) {
                                    var n = t;
                                    e({
                                        enqueue: function (t) {
                                            yu(null != n, hc) && n.enqueue(t);
                                        },
                                        enqueueFirst: function (t) {
                                            yu(null != n, hc) && n.enqueueFirst(t);
                                        },
                                    }),
                                        (n = null);
                                })
                            )
                        );
                    var i, r, e, s;
                    n(this.Ht);
                }),
                (t.prototype.ve = function (t, n) {
                    var i;
                    if (this.Yr.has(n)) return [Mn.Cached, this.Yr.get(n)];
                    var r,
                        e = void 0;
                    window.CSSGroupingRule && n.parentRule && n.parentRule instanceof CSSGroupingRule
                        ? ((e = Sc(n.parentRule)), (r = n.parentRule.cssRules))
                        : (r = t.cssRules);
                    var s = Array.prototype.indexOf.call(r, n);
                    if (-1 !== s) {
                        var u = gc(this.Zr, t, Xn.Node);
                        if (u) {
                            var o = this.Jr++;
                            return (
                                this.Yr.set(n, o),
                                (null !== (i = null == e ? void 0 : e.length) && void 0 !== i ? i : 0) > 0
                                    ? [Mn.Index, u, s, e]
                                    : [Mn.Index, u, s]
                            );
                        }
                    }
                }),
                (t.prototype.stop = function () {
                    (this.Gr = !1), this.te.close();
                    for (var t = 0, n = this.Sn; t < n.length; t++) {
                        var r = n[t];
                        r.disable(), Object.defineProperty(r.getTarget(), fc, { value: !1, configurable: !0 });
                    }
                    this.Sn = [];
                    for (var e = 0, s = this.Gt; e < s.length; e++) (0, s[e])();
                    if (((this.Gt = []), this.ce)) {
                        this.ne.stop();
                        try {
                            var u = CSSStyleRule.prototype,
                                o = Object.getOwnPropertyDescriptor(u, 'style');
                            if ((null == o ? void 0 : o.get) !== this.he) return;
                            Object.defineProperty(u, 'style', i(i({}, o), { get: this.ce }));
                        } catch (t) {}
                    }
                }),
                (t.prototype.ensureHook = function (t) {
                    this.pe(t) || t[fc] || this._r(t);
                }),
                (t.prototype.removeHook = function (t) {
                    if (!this.pe(t))
                        for (var n = 0; n < this.Sn.length; n++) {
                            var i = this.Sn[n],
                                r = i.getTarget();
                            if (t === r) {
                                i.disable(),
                                    this.Sn.splice(n, 1),
                                    Object.defineProperty(r, fc, { value: !1, configurable: !0 });
                                break;
                            }
                        }
                }),
                (t.prototype.pe = function (t) {
                    return Object.getPrototypeOf(t) === this.ut.window.CSSStyleSheet;
                }),
                t
            );
        })(),
        dc = document.createElement('div');
    dc.style.width = 'initial';
    var pc =
        '' != dc.style.cssText
            ? function (t) {
                  return t.cssText;
              }
            : function t(n, i) {
                  if ((void 0 === i && (i = 0), !yu(i <= 20, 'No deep recursion for CSS rules')))
                      return 'html { /* Depth limit exceeded! */ }';
                  var r = (function (t) {
                      switch (t.type) {
                          case CSSRule.PAGE_RULE:
                              var n = t.selectorText || '';
                              return n && er(n, '@page') ? n : '@page '.concat(n);
                          case CSSRule.KEYFRAME_RULE:
                              return t.keyText;
                          case CSSRule.STYLE_RULE:
                              return t.selectorText;
                          case CSSRule.MEDIA_RULE:
                              return '@media '.concat(t.media.mediaText);
                          case CSSRule.KEYFRAMES_RULE:
                              return '@keyframes '.concat(t.name);
                          case CSSRule.SUPPORTS_RULE:
                              return '@supports '.concat(t.conditionText);
                          default:
                              return null;
                      }
                  })(n);
                  if (null == r) return n.cssText;
                  var e = (function (n, i) {
                      var r,
                          e,
                          s,
                          u,
                          o = n,
                          a = o.style;
                      if (a) {
                          for (var c = '', h = 0; h < a.length; h++) {
                              var f = a[h],
                                  v =
                                      void 0 !==
                                      (u = (function (t, n) {
                                          var i = t;
                                          if ('function' == typeof i.getPropertyCSSValue) {
                                              var r = i.getPropertyCSSValue(n);
                                              if (null != r) {
                                                  var e;
                                                  switch (r.cssValueType) {
                                                      case qa.CSS_PRIMITIVE_VALUE:
                                                          e = r;
                                                          break;
                                                      case qa.CSS_VALUE_LIST:
                                                          if (1 !== r.length) return;
                                                          var s = r.item(0);
                                                          if (null == s) return;
                                                          if (s.cssValueType !== qa.CSS_PRIMITIVE_VALUE) return;
                                                          e = s;
                                                          break;
                                                      default:
                                                          return;
                                                  }
                                                  if (e.primitiveType === Va.CSS_STRING) {
                                                      var u = Qe();
                                                      Qa || (Qa = u.createElement('div'));
                                                      var o = e.cssText;
                                                      try {
                                                          Qa.style.cssText = ''.concat(n, ': "').concat(o, '";');
                                                          var a = Qa.style.getPropertyCSSValue(n);
                                                          if (null == a) return;
                                                          if (o !== a.cssText) return;
                                                      } catch (t) {
                                                          return;
                                                      } finally {
                                                          Qa.style.cssText = '';
                                                      }
                                                      return '"'.concat(o, '"');
                                                  }
                                              }
                                          }
                                      })((e = a), (s = f)))
                                          ? u
                                          : e.getPropertyValue(s);
                              ('initial' === v || (('"' === (r = v)[0] || "'" === r[0]) && r[r.length - 1] === r[0])) &&
                                  ((c += ''.concat(f, ': ').concat(v)),
                                  'important' === a.getPropertyPriority(f) && (c += ' !important'),
                                  (c += '; '));
                          }
                          return [a.cssText, c].filter(Boolean).join('\n');
                      }
                      var l = o.cssRules;
                      if (!l) return null;
                      var d = '';
                      for (h = 0; h < l.length; h++) d += t(l[h], i + 1);
                      return d;
                  })(n, i);
                  return null == e ? n.cssText : ''.concat(r, ' { ').concat(e, '} ');
              };
    function wc(t) {
        var n;
        if (t instanceof HTMLLinkElement) {
            try {
                return (function (t, n) {
                    var i, r;
                    return (
                        null !==
                            (r = null === (i = t.classList) || void 0 === i ? void 0 : i.contains('fs-css-in-js')) &&
                        void 0 !== r &&
                        r
                    );
                })(t);
            } catch (t) {
                wu.sendErr(t);
            }
            return !1;
        }
        return (null !== (n = t.textContent) && void 0 !== n ? n : '').length < Is;
    }
    function gc(t, n, i) {
        var r = (function (t, n) {
            var i = mc(t, n);
            if (i) return [Xn.Sheet, i];
            var r = Vu(n.ownerNode);
            return r ? [Xn.Node, r] : void 0;
        })(t, n);
        if (r) {
            var e = r[0],
                s = r[1];
            return e === i ? s : r;
        }
    }
    function mc(t, n) {
        return t.get(n);
    }
    function yc(t) {
        return t.length <= Is
            ? t
            : ('CSSRule too large, inserting dummy instead: '.concat(t.length), ':root { --fs-dropped-large-rule: 0 }');
    }
    function bc(t, n) {
        for (var i = 0; i < t.length; i++) if (t[i] === n) return i;
        return -1;
    }
    function Sc(t) {
        for (var n = [], i = t; i.parentRule || i.parentStyleSheet; ) {
            var r;
            if (!(null == (r = i.parentRule ? i.parentRule : i.parentStyleSheet) ? void 0 : r.cssRules))
                return wu.send('Could not find a path to target rule', 'warning'), n;
            var e = bc(r.cssRules, i);
            if (e > -1) {
                if ((n.unshift(e), r instanceof CSSStyleSheet)) break;
                i = r;
            } else wu.send('Could not find intermediate rule in parent', 'warning');
        }
        return n;
    }
    var kc = '__wayfinder_cursor';
    function _c(t) {
        var n,
            i = null !== (n = t.getAttributeNS($i, Vi)) && void 0 !== n ? n : '';
        if (!i.length) return [];
        var r = (function (t) {
                return kc in t ? t[kc] : '';
            })(t),
            e = i.split('\n').filter(function (t) {
                return t > r;
            });
        return e.length > 0 && (t[kc] = e[e.length - 1]), e;
    }
    var Ac = (function () {
            function t(t, n, i) {
                (this.ut = t), (this.we = n), (this.vt = i.createChild());
            }
            return (
                (t.prototype.start = function () {
                    var t = this,
                        n = this.ut.window.document;
                    this.vt.addCustom(n, this.ge(), !0, function (n) {
                        t.onFullscreenChange(n);
                    }),
                        this.vt.addCustom(n, this.me(), !0, function (n) {
                            t.onFullscreenError(n);
                        });
                }),
                (t.prototype.stop = function () {
                    this.vt && this.vt.clear();
                }),
                (t.prototype.onFullscreenChange = function (t) {
                    var n = this.ye();
                    if (n) {
                        var i = Vu(n);
                        this.be, this.we.enqueue({ Kind: cn.FULLSCREEN, Args: [i, !0] }), (this.be = i);
                    } else this.be, this.we.enqueue({ Kind: cn.FULLSCREEN, Args: [this.be, !1] }), (this.be = void 0);
                }),
                (t.prototype.onFullscreenError = function (t) {
                    this.we.enqueue({ Kind: cn.FULLSCREEN_ERROR, Args: [] });
                }),
                (t.prototype.ye = function () {
                    var t = this.ut.window.document;
                    return t[_(t, 'fullscreenElement')];
                }),
                (t.prototype.ge = function () {
                    return _(this.ut.window.document, 'onfullscreenchange').slice(2);
                }),
                (t.prototype.me = function () {
                    return _(this.ut.window.document, 'onfullscreenerror').slice(2);
                }),
                t
            );
        })(),
        Ic = (function () {
            function t(t, n) {
                (this.Ht = n), (this.Tt = null), (this.Se = {});
                var i = t.window;
                'customElements' in i &&
                    null != i.customElements &&
                    'get' in i.customElements &&
                    'whenDefined' in i.customElements &&
                    (this.Tt = i.customElements);
            }
            return (
                (t.prototype.start = function () {}),
                (t.prototype.stop = function () {}),
                (t.prototype.onCustomNodeVisited = function (t) {
                    return r(this, void 0, _e, function () {
                        var n;
                        return e(this, function (i) {
                            return this.Tt
                                ? ((n = t.nodeName.toLowerCase()),
                                  Object.prototype.hasOwnProperty.call(this.Se, n) || this.ke(n),
                                  [2])
                                : [2];
                        });
                    });
                }),
                (t.prototype.ke = function (t) {
                    return r(this, void 0, _e, function () {
                        var n;
                        return e(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    if (!this.Tt) return [2];
                                    i.label = 1;
                                case 1:
                                    return (
                                        i.trys.push([1, 3, , 4]),
                                        (n = !!this.Tt.get(t)),
                                        (this.Se[t] = n),
                                        [4, this.Tt.whenDefined(t)]
                                    );
                                case 2:
                                    return (
                                        i.sent(),
                                        this.Ht.enqueue({ Kind: cn.CUSTOM_ELEMENT_DEFINED, Args: [t] }),
                                        [3, 4]
                                    );
                                case 3:
                                    return i.sent(), [3, 4];
                                case 4:
                                    return [2];
                            }
                        });
                    });
                }),
                t
            );
        })(),
        Ec = (function () {
            function t(t, n) {
                (this._e = !1), (this.Sn = []), (this.In = n), (this._n = t.window), (this._e = Tc(this._n));
            }
            return (
                (t.prototype.start = function () {
                    this.In.enqueue({ Kind: cn.REC_FEAT_SUPPORTED, Args: [Gn.HTMLDialogElement, this._e] }),
                        this._e && (this.Cn('show'), this.Cn('showModal'), this.Cn('close'));
                }),
                (t.prototype.stop = function () {
                    this.Sn.forEach(function (t) {
                        return t.disable();
                    }),
                        (this.Sn = []);
                }),
                (t.prototype.Cn = function (t) {
                    var n = this,
                        i = mr(this._n.HTMLDialogElement.prototype, t);
                    null == i ||
                        i.afterSync(function (i) {
                            var r = Vu(i.that),
                                e = 'close' !== t,
                                s = 'showModal' === t;
                            n.In.enqueue({ Kind: cn.DIALOG, Args: [r, e, s] });
                        }),
                        i && this.Sn.push(i);
                }),
                t
            );
        })(),
        Tc = function (t) {
            return void 0 !== t.HTMLDialogElement;
        },
        Cc = function (t) {
            try {
                return xt.elMatches(t, 'dialog:modal');
            } catch (t) {
                return !0;
            }
        },
        xc = (function () {
            function t() {}
            return (
                (t.prototype.now = function () {
                    return Date.now();
                }),
                t
            );
        })(),
        Kc = (function () {
            function t(t, n, i, r) {
                void 0 === i && (i = n),
                    void 0 === r && (r = new xc()),
                    (this.Ae = t),
                    (this.Ie = n),
                    (this.Ee = r),
                    (this.Te = r.now()),
                    (this.Ce = i);
            }
            return (
                (t.prototype.hasCapacityFor = function (t) {
                    var n = this.Ee.now(),
                        i = (n - this.Te) * this.Ae;
                    return (
                        (this.Ce = Math.min(this.Ie, this.Ce + i)),
                        (this.Te = n),
                        this.Ce >= t ? ((this.Ce -= t), [!0, 0]) : [!1, (t - this.Ce) / this.Ae]
                    );
                }),
                t
            );
        })(),
        Rc = new Kc(2, 2e5),
        Mc = new Set([
            'measureText',
            'getImageData',
            'getError',
            'getTransform',
            'isContextLost',
            'isEnabled',
            'isFramebuffer',
            'isProgram',
            'isRenderbuffer',
            'isShader',
            'isTexture',
        ]),
        Oc = new Set(['fillText']),
        jc = (function () {
            function t(t, n, i, r) {
                (this.Ht = n),
                    (this.ur = i),
                    (this.Yi = r),
                    (this.xe = Oi.CaptureCanvasOps),
                    (this.Ke = []),
                    (this.Re = []),
                    (this.Me = new WeakMap()),
                    (this.Oe = new WeakMap()),
                    (this.je = new Set()),
                    (this.Pe = 0),
                    (this.Ue = new WeakMap()),
                    (this.Ne = !1),
                    (this.Le = new WeakMap()),
                    (this.De = new Set()),
                    (this.Fe = new WeakMap()),
                    (this.Be = new WeakMap()),
                    (this.We = 1),
                    (this.He = new WeakMap()),
                    (this.ze = 1),
                    (this.qe = new WeakMap()),
                    (this.$e = 0),
                    (this.Ve = !1);
            }
            return (
                (t.prototype.start = function (t) {
                    var n,
                        i = this;
                    if (
                        t.CanvasWatcherMode &&
                        (this.Ht.enqueue({
                            Kind: cn.REC_FEAT_SUPPORTED,
                            Args: [
                                Gn.CanvasWatcherEnabled,
                                !0,
                                Gn.CanvasScreenShotMode,
                                t.CanvasWatcherMode === Oi.ScreenshotCanvas,
                            ],
                        }),
                        (this.Ne = !0),
                        (this.xe = null !== (n = t.CanvasWatcherMode) && void 0 !== n ? n : Oi.CaptureCanvasOps),
                        this._r('2d', CanvasRenderingContext2D),
                        this._r('webgl', WebGLRenderingContext),
                        this.xe === Oi.ScreenshotCanvas)
                    ) {
                        if (!HTMLCanvasElement.prototype.toDataURL) return;
                        this.Pe = setInterval(function () {
                            return i.screenshotConnectedCanvases();
                        }, 1e3);
                    }
                }),
                (t.prototype.Ge = function (t, n) {
                    return 'object' != typeof n
                        ? [void 0, 0]
                        : (this.He.has(n) || this.He.set(n, [t, this.ze++]), this.He.get(n));
                }),
                (t.prototype._r = function (t, n) {
                    var i = this;
                    if (n)
                        for (
                            var r = n.prototype,
                                e = function (e) {
                                    if (Mc.has(e)) return 'continue';
                                    var u = Object.getOwnPropertyDescriptor(r, e);
                                    if ('function' == typeof (null == u ? void 0 : u.value)) {
                                        var o = mr(r, e);
                                        o &&
                                            (o.afterSync(function (n) {
                                                return i.Qe(t, e, n.that, n.args, n.result);
                                            }),
                                            s.Ke.push(o));
                                    } else
                                        'function' == typeof (null == u ? void 0 : u.set) &&
                                            s.Re.push(yr(n, e, s.Xe(t, e)));
                                },
                                s = this,
                                u = 0,
                                o = Object.keys(r);
                            u < o.length;
                            u++
                        )
                            e(o[u]);
                }),
                (t.prototype.Ye = function (t, n) {
                    var i;
                    this.De.add(t),
                        this.Fe.has(t) || this.Fe.set(t, Kr() + 5e3),
                        this.Le.has(t) || this.Le.set(t, []),
                        null === (i = this.Le.get(t)) || void 0 === i || i.push.apply(i, n);
                }),
                (t.prototype.Je = function (t) {
                    var n,
                        i = null !== (n = this.Le.get(t)) && void 0 !== n ? n : [];
                    return this.De['delete'](t), this.Fe['delete'](t), i;
                }),
                (t.prototype.Ze = function (t) {
                    var n = t instanceof HTMLCanvasElement ? Vu(t) : 0;
                    if (n) return n;
                    if (this.Be.has(t)) return { id: this.Be.get(t) };
                    var i = { id: this.We };
                    return this.ts(t, i), this.Be.set(t, this.We), ++this.We, i;
                }),
                (t.prototype.ts = function (t, n) {
                    this.Ht.enqueue({ Kind: cn.CANVAS_DETACHED_DIMENSION, Args: [n, t.width, t.height] });
                }),
                (t.prototype.flush = function (t, n) {
                    var i;
                    if (this.Ne) {
                        if (this.qe.has(t)) return this.qe.get(t);
                        this.xe === Oi.ScreenshotCanvas &&
                            t instanceof HTMLCanvasElement &&
                            (this.je.add(t), this.Oe.set(t, !0));
                        var r = this.Ze(t);
                        this.qe.set(t, r);
                        var e = this.Je(t);
                        if (e.length > 0) {
                            var s = n;
                            if (!s) {
                                var u = t instanceof HTMLCanvasElement ? qu(t) : void 0,
                                    o = t instanceof HTMLCanvasElement && kr(t);
                                s = null !== (i = null == u ? void 0 : u.mask) && void 0 !== i ? i : o;
                            }
                            this.ns(t, r, e, s);
                        }
                        return this.qe['delete'](t), r;
                    }
                }),
                (t.prototype.rs = function (t, n, i, r, e, s, u) {
                    var o;
                    switch (typeof r) {
                        case 'string':
                            return e ? as(r) : r;
                        case 'number':
                        case 'boolean':
                        case 'bigint':
                            return r;
                        case 'undefined':
                            return { undef: !0 };
                        case 'object':
                            if (!r) return r;
                            try {
                                u.set(r, !0);
                            } catch (t) {}
                            var a = null === (o = Object.getPrototypeOf(r)) || void 0 === o ? void 0 : o.constructor,
                                c =
                                    (null == a ? void 0 : a.name) ||
                                    (function (t) {
                                        var n;
                                        if (t) {
                                            var i = t.toString(),
                                                r = Uc.exec(i);
                                            return (
                                                r || (r = Nc.exec(i)),
                                                null === (n = null == r ? void 0 : r[1]) || void 0 === n
                                                    ? void 0
                                                    : n.trim()
                                            );
                                        }
                                    })(a),
                                h = { ctor: c };
                            if (_r(r) && (l = Vu(r))) return (h.id = l), h;
                            switch (c) {
                                case 'Array':
                                    return (this.$e += r.length), this.es(t, n, i, r, e, s, u);
                                case 'CanvasGradient':
                                    return h;
                                case 'HTMLImageElement':
                                    var f = Ms(r.src, { source: 'dom', type: 'canvas' });
                                    return this.Yi.record(f), (h.src = f), h;
                                case 'HTMLCanvasElement':
                                    var v = r,
                                        l = this.flush(v, e);
                                    return (h.srcId = l), h;
                            }
                            if (
                                (function (t) {
                                    var n;
                                    return !!(null === (n = Object.prototype.toString.call(t)) || void 0 === n
                                        ? void 0
                                        : n.match(Pc));
                                })(r)
                            )
                                return this.He.has(r)
                                    ? this.ss(r, h, e)
                                    : ((h.typedArray = '['.concat(r.toString(), ']')), (this.$e += r.length), h);
                            if ('object' == typeof r && this.He.has(r)) return this.ss(r, h, e);
                            if (r instanceof WebGLBuffer || r instanceof WebGLTexture) {
                                var d = void 0;
                                switch (s) {
                                    case 'bindTexture':
                                        d = this.us(t, 'createTexture', n, i, r);
                                        break;
                                    case 'bindBuffer':
                                        d = this.us(t, 'createBuffer', n, i, r);
                                }
                                if (void 0 !== d) return this.ss(r, h, e);
                            }
                            var p = r;
                            for (var w in ((h.obj = {}), p)) {
                                try {
                                    switch (typeof p[w]) {
                                        case 'function':
                                            continue;
                                        case 'object':
                                            if (p[w] && u.has(p[w])) continue;
                                    }
                                } catch (t) {
                                    continue;
                                }
                                ++this.$e, (h.obj[w] = this.rs(t, n, i, p[w], e, s, u));
                            }
                            return h;
                        default:
                            return null;
                    }
                }),
                (t.prototype.ss = function (t, n, i) {
                    var r = this.He.get(t),
                        e = r[0],
                        s = r[1];
                    return this.flush(e, i), (n.ref = s), delete n.ctor, n;
                }),
                (t.prototype.us = function (t, n, i, r, e) {
                    var s = this.Ge(i, e),
                        u = (s[0], s[1]);
                    return this.os(r, [[t, Ri.Function, n, [], u]]), u;
                }),
                (t.prototype.es = function (t, n, i, r, e, s, u) {
                    var o = this;
                    return (
                        void 0 === u && (u = new WeakMap()),
                        (this.$e += r.length + 1),
                        r.map(function (r) {
                            return o.rs(t, n, i, r, e, s, u);
                        })
                    );
                }),
                (t.prototype.ns = function (t, n, i, r) {
                    var e = this;
                    if ((void 0 === r && (r = !1), !this.Ve)) {
                        var s = i.map(function (i) {
                            var s = i[0],
                                u = i[1],
                                o = i[2],
                                a = i[3],
                                c = i[4];
                            return [s, u, o, e.es(s, t, n, a, r && Oc.has(o), o), c];
                        });
                        if (
                            !this.Me.has(t) &&
                            (this.Me.set(t, !0),
                            i.some(function (t) {
                                return '2d' === t[0];
                            }))
                        ) {
                            var u = (function (t) {
                                var n = t.getContext('2d');
                                if (!n) return [];
                                var i = [];
                                if (
                                    (n instanceof CanvasRenderingContext2D ||
                                        (window.OffscreenCanvasRenderingContext2D &&
                                            n instanceof OffscreenCanvasRenderingContext2D)) &&
                                    'function' == typeof n.getTransform
                                ) {
                                    var r = n.getTransform();
                                    if (!r.isIdentity) {
                                        var e = r.a,
                                            s = r.b,
                                            u = r.c,
                                            o = r.d,
                                            a = r.e,
                                            c = r.f;
                                        i.push(['2d', Ri.Function, 'transform', [e, s, u, o, a, c], -1]);
                                    }
                                }
                                return i;
                            })(t);
                            if (u.length > 0) return u.push.apply(u, s), void this.os(n, u);
                        }
                        this.os(n, s);
                    }
                }),
                (t.prototype.os = function (t, n) {
                    if (!this.Ve) {
                        var i = Rc.hasCapacityFor(this.$e),
                            r = i[0];
                        i[1], (this.$e = 0), r ? this.Ht.enqueue({ Kind: cn.CANVAS, Args: [t, n] }) : (this.Ve = !0);
                    }
                }),
                (t.prototype.cs = function (t, n) {
                    t instanceof HTMLCanvasElement &&
                        (this.xe === Oi.ScreenshotCanvas ? (this.Oe.set(t, !0), this.je.add(t)) : this.Ye(t, n));
                }),
                (t.prototype.Qe = function (t, n, i, r, e) {
                    for (var s = [], u = 0; u < r.length; u++) s.push(r[u]);
                    var o = this.Ge(i.canvas, e),
                        a = (o[0], o[1]);
                    this.cs(i.canvas, [[t, Ri.Function, n, s, a]]);
                }),
                (t.prototype.Xe = function (t, n) {
                    var i = this;
                    return function (r, e) {
                        i.cs(r.canvas, [[t, Ri.Set, n, [e], 0]]);
                    };
                }),
                (t.prototype.stop = function () {
                    (this.Ne = !1),
                        this.Ke.forEach(function (t) {
                            return t.disable();
                        }),
                        this.Re.forEach(function (t) {
                            return t();
                        }),
                        (this.Ke = []),
                        (this.Re = []),
                        this.Pe && (clearInterval(this.Pe), (this.Pe = 0));
                }),
                (t.prototype.screenshotConnectedCanvases = function () {
                    var t = this,
                        n = [],
                        i = [];
                    return (
                        this.je.forEach(function (r) {
                            var e = Vu(r);
                            kr(r) && e
                                ? t.Oe.has(r) &&
                                  i.push(
                                      je().then(function () {
                                          return t.hs(r, e);
                                      })
                                  )
                                : n.push(r);
                        }),
                        n.forEach(function (n) {
                            return t.je['delete'](n);
                        }),
                        (this.Oe = new WeakMap()),
                        _e.all(i)
                    );
                }),
                (t.prototype.hs = function (t, n) {
                    return r(this, void 0, _e, function () {
                        var i, r, s, u;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return (
                                        e.trys.push([0, 2, , 3]),
                                        (i = t.toDataURL()),
                                        (r = this.Ue.get(t)),
                                        [
                                            4,
                                            this.ur.uploadDataUrlIfNeeded(i, function (t) {
                                                var n;
                                                return (
                                                    t.url !== r &&
                                                    !!(null === (n = t.contentType) || void 0 === n
                                                        ? void 0
                                                        : n.match(/^image/i))
                                                );
                                            }),
                                        ]
                                    );
                                case 1:
                                    return (s = e.sent())
                                        ? ((u = s.url),
                                          this.Ue.set(t, u),
                                          s.url === r
                                              ? [2]
                                              : (this.os(n, [
                                                    [
                                                        '2d',
                                                        Ri.Function,
                                                        'drawImage',
                                                        [{ ctor: 'HTMLImageElement', src: u }, 0, 0],
                                                        0,
                                                    ],
                                                ]),
                                                [3, 3]))
                                        : [2];
                                case 2:
                                    return Su('Canvas screenshot', { err: e.sent() }), [3, 3];
                                case 3:
                                    return [2];
                            }
                        });
                    });
                }),
                (t.prototype.vs = function () {
                    var t = this,
                        n = [];
                    this.De.forEach(function (i) {
                        (i instanceof HTMLCanvasElement && (Vu(i) || !kr(i))) || (t.Le['delete'](i), n.push(i));
                    });
                    for (var i = 0, r = n; i < r.length; i++) {
                        var e = r[i];
                        this.Je(e);
                    }
                }),
                (t.prototype.tick = function () {
                    var t = this;
                    if (this.Ne)
                        try {
                            if ((this.vs(), this.xe === Oi.ScreenshotCanvas)) return;
                            this.De.forEach(function (n) {
                                var i;
                                n instanceof HTMLCanvasElement && t.ls(n);
                                var r = null !== (i = t.Fe.get(n)) && void 0 !== i ? i : Number.POSITIVE_INFINITY;
                                Kr() > r && t.Je(n);
                            });
                        } catch (t) {
                            wu.sendErr(t);
                        }
                }),
                (t.prototype.ls = function (t) {
                    var n = Vu(t);
                    if (n) {
                        var i = qu(t),
                            r = this.Le.get(t);
                        r && 0 !== r.length && (this.ns(t, n, r, !!(null == i ? void 0 : i.mask)), this.Je(t));
                    }
                }),
                t
            );
        })(),
        Pc = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/,
        Uc = /^\[object ([^\]]+?)(?:Constructor)?\]/,
        Nc = /^function ([^(]+)/,
        Lc = /^\s*at .*(\S+:\d+|native|(<anonymous>))/m,
        Dc = /^(eval@)?(\[native code\])?$/;
    function Fc(t, n, i, r, e) {
        return [n || '', t(i || ''), parseInt(r || '-1', 10), parseInt(e || '-1', 10)];
    }
    function Bc(t) {
        if (!t || -1 === t.indexOf(':')) return ['', '', ''];
        var n = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t.replace(/[()]/g, ''));
        return n ? [n[1] || '', n[2] || '', n[3] || ''] : ['', '', ''];
    }
    var Wc = ['_fs_debug', 'assert', 'debug', 'error', 'info', 'log', 'trace', 'warn'],
        Hc = Wc.filter(function (t) {
            return !/debug/.test(t);
        });
    function zc(t, n) {
        return Hs(ir(t) ? t.slice(0, n) : Zu(t, n));
    }
    function qc(t) {
        if (Ji(t)) {
            try {
                if (Xi(t.toString)) return t.toString();
            } catch (t) {}
            return t.message;
        }
    }
    function $c(t, n) {
        var i = n ? ''.concat(n, ' ') : '';
        return s(
            [''.concat(i).concat(zc(qc(t.error) || t.message, 1e3)), zc(t.filename, 100), Ji(t.lineno) ? -1 : t.lineno],
            (function (t, n) {
                if (!Ji(n) || !ir(n.stack)) return [];
                var i = n;
                return i.stack.match(Lc)
                    ? (function (t, n) {
                          return n
                              .split('\n')
                              .filter(function (t) {
                                  return !!t.match(Lc);
                              })
                              .map(function (n) {
                                  var i = n;
                                  i.indexOf('(eval ') > -1 &&
                                      (i = i.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(\),.*$)/g, ''));
                                  var r = i
                                          .replace(/^\s+/, '')
                                          .replace(/\(eval code/g, '(')
                                          .replace(/\(native code\)/, '')
                                          .split(/\s+/)
                                          .slice(1),
                                      e = Bc(r.pop()),
                                      s = r.join(' '),
                                      u = ['eval', '<anonymous>'].indexOf(e[0]) > -1 ? '' : e[0];
                                  return Fc(t, s, u, e[1], e[2]);
                              });
                      })(t, i.stack)
                    : (function (t, n) {
                          return n
                              .split('\n')
                              .filter(function (t) {
                                  return !t.match(Dc);
                              })
                              .map(function (n) {
                                  var i = n;
                                  if (
                                      (i.indexOf(' > eval') > -1 &&
                                          (i = i.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1')),
                                      -1 === i.indexOf('@') && -1 === i.indexOf(':'))
                                  )
                                      return [i, '', -1, -1];
                                  var r = i.split('@'),
                                      e = Bc(r.pop()),
                                      s = r.join('@');
                                  return Fc(t, s, e[0], e[1], e[2]);
                              });
                      })(t, i.stack);
            })(Hs, t.error),
            !0
        );
    }
    var Vc,
        Gc,
        Qc,
        Xc,
        Yc = (function () {
            function t(t, n, i) {
                (this.Ht = n),
                    (this.mn = !1),
                    (this.ds = !1),
                    (this.ps = 0),
                    (this.Sn = []),
                    (this.ws = Ai.DefaultOrgSettings.MaxConsoleLogPerPage),
                    (this.xi = t.window),
                    (this.vt = i.createChild());
            }
            return (
                (t.prototype.initializeMaxLogsPerPage = function (t) {
                    this.ws = t || Ai.DefaultOrgSettings.MaxConsoleLogPerPage;
                }),
                (t.prototype.gs = function () {
                    return '"[received more than '.concat(this.ws, ' messages]"');
                }),
                (t.prototype.start = function (t) {
                    var n = this;
                    if (
                        t.ConsoleWatcher &&
                        (this.vt.add(this.xi, 'error', !0, function (t) {
                            return n.ys(t);
                        }),
                        this.vt.add(
                            this.xi,
                            'unhandledrejection',
                            !0,
                            function (t) {
                                var i,
                                    r = '';
                                t.reason instanceof Error ? (i = t.reason) : (r = Zu(t.reason, 1e3)),
                                    n.ys({ error: i, message: r, filename: '', lineno: 0 }, 'Uncaught (in promise)');
                            },
                            !0
                        ),
                        !this.mn)
                    )
                        if (
                            ((this.mn = !0),
                            this.Ht.enqueue({ Kind: cn.REC_FEAT_SUPPORTED, Args: [Gn.Console, !0] }),
                            this.xi.console)
                        )
                            for (
                                var i = function (t) {
                                        var i = mr(r.xi.console, t);
                                        if (!i) return 'continue';
                                        'assert' === t
                                            ? i.before(function (i) {
                                                  var r = i.args;
                                                  r[0] || n.bs(t, Array.prototype.slice.apply(r, [1]));
                                              })
                                            : i.before(function (i) {
                                                  var r = i.args;
                                                  return n.bs(t, r);
                                              }),
                                            r.Sn.push(i);
                                    },
                                    r = this,
                                    e = 0,
                                    s = Hc;
                                e < s.length;
                                e++
                            )
                                i(s[e]);
                        else this.bs('log', ['NOTE: Log messages cannot be captured on IE9']);
                }),
                (t.prototype.isEnabled = function () {
                    return this.mn;
                }),
                (t.prototype.stop = function () {
                    var t;
                    if ((this.vt && this.vt.clear(), this.mn)) for (this.mn = !1; (t = this.Sn.pop()); ) t.disable();
                }),
                (t.prototype.logEvent = function (t, n, i) {
                    if ((void 0 === i && (i = 'console'), !this.Ss())) return null;
                    for (var r = -1 === Wc.indexOf(t) ? [i, 'log', zc(t, 1e3)] : [i, t], e = 0; e < n.length; ++e)
                        r.push(zc(n[e], 1e3));
                    return { Kind: cn.LOG, Args: r };
                }),
                (t.prototype.bs = function (t, n) {
                    if (0 !== n.length) {
                        var i = this.logEvent(t, n);
                        i && this.Ht.enqueue(i);
                    }
                }),
                (t.prototype.ys = function (t, n) {
                    void 0 === n && (n = 'Uncaught'),
                        (void 0 !== t.error || void 0 !== t.message || t.filename || t.lineno) &&
                            this.Ss() &&
                            this.Ht.enqueue({ Kind: cn.ERROR, Args: $c(t, n) });
                }),
                (t.prototype.Ss = function () {
                    return (
                        !this.ds &&
                        (this.ps == this.ws
                            ? (this.Ht.enqueue({ Kind: cn.LOG, Args: ['console', 'warn', this.gs()] }),
                              (this.ds = !0),
                              !1)
                            : (this.ps++, !0))
                    );
                }),
                t
            );
        })();
    ((Gc = Vc || (Vc = {}))[(Gc.Ajax = 0)] = 'Ajax'),
        (Gc[(Gc.Animation = 1)] = 'Animation'),
        (Gc[(Gc.Canvas = 2)] = 'Canvas'),
        (Gc[(Gc.Console = 3)] = 'Console'),
        (Gc[(Gc.CustomElement = 4)] = 'CustomElement'),
        (Gc[(Gc.Dialog = 5)] = 'Dialog'),
        (Gc[(Gc.Fullscreen = 6)] = 'Fullscreen'),
        (Gc[(Gc.Input = 7)] = 'Input'),
        (Gc[(Gc.Perf = 8)] = 'Perf'),
        (Gc[(Gc.StyleSheet = 9)] = 'StyleSheet'),
        ((Xc = Qc || (Qc = {}))[(Xc.Scroll = 1)] = 'Scroll'),
        (Xc[(Xc.Resize = 2)] = 'Resize');
    var Jc = /^\s*((stylesheet)\s*)+$/i,
        Zc = /^\s*((img|picture)\s*)+$/i,
        th = (function () {
            function t(t, n, i, r, e, s, u, o, a) {
                var c = this;
                (this.ut = t),
                    (this.Ht = n),
                    (this.ks = i),
                    (this._s = s),
                    (this.As = u),
                    (this.ur = o),
                    (this.Yi = a),
                    (this.Is = []),
                    (this.Es = {}),
                    (this.Ts = !1),
                    (this.Sn = []),
                    (this.Cs = !1),
                    (this.xs = {}),
                    (this.Ks = !1),
                    (this.Rs = new Bt()),
                    (this.xi = t.window),
                    (this.t = this.xi.document),
                    (this.Ms = this.xi.location),
                    (this.Os = this.xi.history),
                    (this.vt = e.createChild()),
                    (this.js = this.Ms.href),
                    (this.Ps = [
                        new Ya(t, n),
                        new ho(t, n, this.vt),
                        new jc(t, n, o, this.Yi),
                        new Yc(t, this.Ht, this.vt),
                        new Ic(t, n),
                        new Ec(t, n),
                        new Ac(t, n, this.vt),
                        new so(t, n),
                        new Ta(t, n, this.vt, this.Yi),
                        new lc(t, n, !!ct(this.xi)),
                    ]),
                    (this.Us = (function (t, n) {
                        void 0 === n && (n = 0.25);
                        var i = t.window.IntersectionObserver;
                        if (i)
                            return new i(
                                function (n) {
                                    for (var i, r = 0, e = n; r < e.length; r++) {
                                        var s = e[r],
                                            u = s.target,
                                            o = s.intersectionRatio,
                                            a = Vu(u);
                                        a &&
                                            (null === (i = t.queue()) ||
                                                void 0 === i ||
                                                i.enqueue({ Kind: cn.VIEWPORT_INTERSECTION, Args: [a, o] }));
                                    }
                                },
                                { threshold: [n, 1] }
                            );
                    })(t)),
                    (this.Ns = new aa(t, r, this.qn.bind(this), this.Us, this.mi.bind(this), function (t) {
                        return c.Ps[Vc.StyleSheet].processWayfinderLog(t);
                    })),
                    this.Ns.acceptVisitor(this);
            }
            return (
                (t.prototype.getResourceUploader = function () {
                    return this.ur;
                }),
                (t.prototype.start = function (t) {
                    this.Ns.start();
                    for (var n = 0, i = this.Ps; n < i.length; n++) i[n].start(t);
                    this.Ls(t);
                }),
                (t.prototype.Ls = function (t) {
                    var n,
                        i = this;
                    t.DisableCopyPasteListener ||
                        (this.vt.add(this.xi, 'copy', !1, this.Ds.bind(this)),
                        this.vt.add(this.xi, 'paste', !1, this.Fs.bind(this))),
                        this.vt.add(this.xi, 'mousemove', !0, function (t) {
                            uh(t) && i.Bs(t);
                        }),
                        this.vt.add(this.xi, 'mousedown', !0, function (t) {
                            uh(t) && i.Ws(t);
                        }),
                        this.vt.add(this.xi, 'mouseup', !0, function (t) {
                            uh(t) && i.Hs(t);
                        }),
                        this.vt.add(this.xi, 'keydown', !0, function (t) {
                            i.Ps[Vc.Input].onKeyboardChange(sh(t));
                        }),
                        this.vt.add(this.xi, 'keyup', !0, function (t) {
                            i.Ps[Vc.Input].onKeyboardChange(sh(t));
                        }),
                        this.vt.add(this.xi, 'input', !0, function (t) {
                            i.Ps[Vc.Input].onInputChange(eh(t));
                        }),
                        this.vt.add(this.xi, 'click', !0, function (t) {
                            var n;
                            uh(t) &&
                                (i.zs(t),
                                (null === (n = i.qs) || void 0 === n ? void 0 : n.target) === eh(t) && i.$s());
                        }),
                        this.vt.add(this.xi, 'dblclick', !0, function (t) {
                            i.Vs(t);
                        }),
                        this.vt.add(
                            this.xi,
                            'focus',
                            !0,
                            function (t) {
                                i.Gs(t, sh(t));
                            },
                            !0
                        ),
                        this.vt.add(
                            this.xi,
                            'blur',
                            !0,
                            function (t) {
                                i.Qs(t, sh(t));
                            },
                            !0
                        ),
                        this.vt.add(
                            this.xi,
                            'change',
                            !0,
                            function (t) {
                                i.Xs(t, sh(t));
                            },
                            !0
                        ),
                        this.vt.add(this.xi, 'touchstart', !0, function (t) {
                            uh(t) && (i.Ys(t, cn.TOUCHSTART), i.Js());
                        }),
                        this.vt.add(this.xi, 'touchend', !0, function (t) {
                            uh(t) && (i.Ys(t, cn.TOUCHEND), i.Js());
                        }),
                        this.vt.add(this.xi, 'touchmove', !0, function (t) {
                            uh(t) && (i.Ys(t, cn.TOUCHMOVE), i.Js());
                        }),
                        this.vt.add(this.xi, 'touchcancel', !0, function (t) {
                            uh(t) && i.Ys(t, cn.TOUCHCANCEL);
                        }),
                        this.vt.add(this.xi, 'play', !0, function (t) {
                            i.Zs(t);
                        }),
                        this.vt.add(this.xi, 'pause', !0, function (t) {
                            i.tu(t);
                        }),
                        this.vt.add(this.xi, 'scroll', !0, function (t) {
                            t.bubbles ? i.Js() : i.nu(eh(t));
                        }),
                        this.vt.add(this.xi, 'resize', !1, function () {
                            i.iu();
                        }),
                        this.vt.add(this.xi, 'submit', !1, function (t) {
                            i.ru(t);
                        }),
                        this.vt.add(this.xi, 'focus', !1, function () {
                            i.eu();
                        }),
                        this.vt.add(this.xi, 'blur', !1, function () {
                            i.su();
                        }),
                        this.vt.add(this.xi, 'popstate', !1, function () {
                            i.uu();
                        }),
                        this.vt.add(this.xi, 'selectstart', !0, function () {
                            i.ou();
                        }),
                        this.vt.add(this.t, 'selectionchange', !0, function () {
                            i.ou();
                        }),
                        this.vt.add(this.xi, 'visibilitychange', !1, function (t) {
                            i.addVisibilityChangeEvent();
                        });
                    var r = this.xi.visualViewport;
                    r
                        ? (this.vt.add(r, 'scroll', !0, function () {
                              return i.Js();
                          }),
                          this.vt.add(r, 'resize', !0, function () {
                              return i.iu();
                          }))
                        : this.vt.add(this.xi, 'mousewheel', !0, function () {
                              i.Js();
                          });
                    var e = mr(this.Os, 'pushState', !0);
                    e &&
                        (this.Sn.push(e),
                        e.afterSync(function () {
                            return i.uu();
                        }));
                    var s = mr(this.Os, 'replaceState', !0);
                    s &&
                        (this.Sn.push(s),
                        s.afterSync(function () {
                            return i.uu();
                        }));
                    for (
                        var u = function (t) {
                                var n = mr(o.xi, t);
                                if (!n) return 'continue';
                                o.Sn.push(n),
                                    n
                                        .before(function () {
                                            i.Ht.enqueue({ Kind: cn.MODAL_OPEN, Args: [t] });
                                        })
                                        .afterSync(function () {
                                            i.Ht.enqueue({ Kind: cn.MODAL_CLOSE, Args: [t] });
                                        });
                            },
                            o = this,
                            a = 0,
                            c = Ei;
                        a < c.length;
                        a++
                    )
                        u(c[a]);
                    var h = mr(
                        null === (n = this.xi.Event) || void 0 === n ? void 0 : n.prototype,
                        'preventDefault',
                        !0
                    );
                    if (
                        (h &&
                            (this.Sn.push(h),
                            h.afterSync(function (t) {
                                return i.au(t.that);
                            })),
                        'function' == typeof this.xi.document.hasFocus &&
                            this.Ht.enqueue({
                                Kind: this.xi.document.hasFocus() ? cn.WINDOW_FOCUS : cn.WINDOW_BLUR,
                                Args: [],
                            }),
                        xt.matchMedia)
                    )
                        for (
                            var f = function (t, n, r) {
                                    var e = xt.matchMedia(v.xi, r);
                                    if (!e) return 'continue';
                                    var s = function () {
                                        e.matches && i.Ht.enqueue({ Kind: cn.MEDIA_QUERY_CHANGE, Args: [t, n] });
                                    };
                                    v.vt.add(e, 'change', !0, s), s();
                                },
                                v = this,
                                l = 0,
                                d = [
                                    ['any-pointer', 'coarse', 'not screen and (any-pointer: fine)'],
                                    ['any-pointer', 'fine', 'only screen and (any-pointer: fine)'],
                                    ['any-hover', 'none', 'not screen and (any-hover: hover)'],
                                    ['any-hover', 'hover', 'only screen and (any-hover: hover)'],
                                    ['pointer', 'none', '(pointer: none)'],
                                    ['pointer', 'coarse', '(pointer: coarse)'],
                                    ['pointer', 'fine', '(pointer: fine)'],
                                    ['prefers-color-scheme', 'no-preference', '(prefers-color-scheme: no-preference)'],
                                    ['prefers-color-scheme', 'light', '(prefers-color-scheme: light)'],
                                    ['prefers-color-scheme', 'dark', '(prefers-color-scheme: dark)'],
                                ];
                            l < d.length;
                            l++
                        ) {
                            var p = d[l];
                            f(p[0], p[1], p[2]);
                        }
                    this.Cs = !0;
                }),
                (t.prototype.au = function (t) {
                    var n,
                        i = t.type;
                    switch (i) {
                        case 'touchend':
                            var r = t,
                                e = (null === (n = r.changedTouches) || void 0 === n ? void 0 : n.length) > 0;
                            (r.clientX = e ? r.changedTouches[0].clientX : 0),
                                (r.clientY = e ? r.changedTouches[0].clientY : 0),
                                this.cu(i, r);
                            break;
                        case 'pointerdown':
                        case 'pointerup':
                            this.cu(i, t);
                            break;
                        default:
                            'Unhandled event type: '.concat(i);
                    }
                }),
                (t.prototype.initResourceUploading = function () {
                    this.ur.init(), (this.Ts = !0);
                }),
                (t.prototype.onDomLoad = function () {
                    this.hu(), this.fu(!0), this.Ns.qi(h);
                }),
                (t.prototype.onLoad = function () {
                    var t = this,
                        n = !1,
                        i = wu.wrap(function () {
                            n || ((n = !0), t.Ps[Vc.Perf].onLoad(), t.vu(), t.fu());
                        });
                    new io(i, 0).start(), Pe().then(i);
                }),
                (t.prototype.ajaxWatcher = function () {
                    return this.Ps[Vc.Ajax];
                }),
                (t.prototype.consoleWatcher = function () {
                    return this.Ps[Vc.Console];
                }),
                (t.prototype.perfWatcher = function () {
                    return this.Ps[Vc.Perf];
                }),
                (t.prototype.bundleEvents = function () {
                    var t = this;
                    return this.Ht.enqueueSimultaneousEventsIn(function (n) {
                        var i,
                            r = Kr(),
                            e = t.Ns.processMutations(n);
                        if (e.length > 0) {
                            var s = Kr() - r;
                            e.push({
                                Kind: cn.TIMING,
                                Args: [[ln.Internal, pn.Serialization, gn.ProcessMut, n, s]],
                                When: n,
                            });
                        }
                        for (var u = 0, o = t.Ps; u < o.length; u++) {
                            var a = o[u];
                            null === (i = a.tick) || void 0 === i || i.call(a);
                        }
                        return t.fu(), e;
                    });
                }),
                (t.prototype.stop = function (t) {
                    var n;
                    if (this.Cs) {
                        (this.Cs = !1), this.vt && this.vt.clear(), (this.Rs = new Bt());
                        for (var i = 0, r = this.Sn; i < r.length; i++) r[i].disable();
                        (this.Sn = []),
                            this.Ps[Vc.Perf].onLoad(),
                            this.ut.measurer.flush(),
                            this.Ht.processEvents(),
                            this.ut.taskQueue.flush(),
                            this.Yi.flush(),
                            this.Ns.stop();
                        for (var e = 0, s = this.Ps; e < s.length; e++) s[e].stop(t);
                        null === (n = this.Us) || void 0 === n || n.disconnect(), this.Ht.shutdown(t);
                    }
                }),
                (t.prototype.recordingIsDetached = function () {
                    return this.Ns.recordingIsDetached();
                }),
                (t.prototype.preVisit = function (t) {
                    var n = this,
                        i = t.id,
                        r = t.node,
                        e = t.name;
                    switch (e) {
                        case '#document':
                        case '#document-fragment':
                            if (((this.xs[i] = i), '#document-fragment' === e)) {
                                var s = this.vt.createChild();
                                s.add(r, 'scroll', !0, function (t) {
                                    return n.nu(eh(t));
                                }),
                                    s.add(
                                        r,
                                        'change',
                                        !0,
                                        function (t) {
                                            t.composed || n.Xs(t, sh(t));
                                        },
                                        !0
                                    ),
                                    this.Rs.set(r, s);
                            }
                            var u = r;
                            try {
                                if (!u.adoptedStyleSheets || 0 === u.adoptedStyleSheets.length) break;
                            } catch (t) {
                                break;
                            }
                            this.Ps[Vc.StyleSheet].onSetAdoptedStyleSheets(r);
                            break;
                        case 'INPUT':
                        case 'TEXTAREA':
                        case 'SELECT':
                            this.Ps[Vc.Input].addInput(r);
                            break;
                        case 'LINK':
                        case 'STYLE':
                        case 'style':
                            var o = r,
                                a = o.sheet;
                            if (!a) break;
                            var c = this.Ps[Vc.StyleSheet];
                            c.ensureHook(a),
                                a.disabled && c.onDisableSheet(a, !0),
                                'STYLE' === e || 'style' === e
                                    ? c.snapshotEl(o)
                                    : wc(o) &&
                                      (c.snapshotEl(o),
                                      this.vt.add(o, 'load', !1, function () {
                                          c.snapshotEl(o);
                                      }));
                            break;
                        case 'BODY':
                            this.fu(), this.ou();
                            break;
                        case 'FRAME':
                        case 'IFRAME':
                            this._s(r);
                    }
                }),
                (t.prototype.visit = function (t) {
                    var n = t[0],
                        i = t[1],
                        r = t[2];
                    this.lu(n, i), this.du(n, i, r);
                }),
                (t.prototype.lu = function (t, n) {
                    var i = this,
                        r = n.node,
                        e = n.name,
                        s = n.type;
                    if (t === wo.New && 10 !== s) {
                        switch (e) {
                            case 'VIDEO':
                            case 'AUDIO':
                                r.paused || this.Ht.enqueue({ Kind: cn.PLAY, Args: [Vu(r)] });
                                break;
                            case 'DIALOG':
                                var u = r;
                                u.open && this.Ht.enqueue({ Kind: cn.DIALOG, Args: [Vu(u), !0, Cc(u)] });
                                break;
                            case 'CANVAS':
                                this.Ps[Vc.Canvas].flush(r);
                                break;
                            default:
                                e &&
                                    '#' !== e[0] &&
                                    e.indexOf('-') > -1 &&
                                    this.Ps[Vc.CustomElement].onCustomNodeVisited(r);
                        }
                        'scrollLeft' in r &&
                            'scrollTop' in r &&
                            this.ut.measurer.enqueue(function () {
                                var t = r;
                                (0 == t.scrollLeft && 0 == t.scrollTop) || i.nu(t);
                            });
                    }
                }),
                (t.prototype.du = function (t, n, i) {
                    var r = this,
                        e = this.ut.recording.flags().DisableImgUrlPrivacy;
                    if (!e || this.Ts) {
                        var s = n.node,
                            u = n.tag;
                        if (
                            n.type === Yt &&
                            i &&
                            !(function (t, n) {
                                return void 0 === n && (n = qu(t)), Hu(t, n) || zu(t, n);
                            })(s)
                        ) {
                            var o = 'unknown';
                            'link' === u && Jc.test(i.rel) ? (o = 'css') : Zc.test(null != u ? u : '') && (o = 'img');
                            var a = (function (t, n, i) {
                                for (var r, e, s = [], u = 0, o = rh; u < o.length; u++) {
                                    var a = o[u];
                                    i[a] && ih[a][t] && s.push(i[a]);
                                }
                                if (
                                    ('link' === t &&
                                        i.href &&
                                        (r = i.rel) &&
                                        r.indexOf('stylesheet') > -1 &&
                                        s.push(i.href),
                                    ('img' === t || 'source' === t) && (e = i.srcset) && null == e.match(/^\s*$/))
                                )
                                    for (
                                        var c = 0,
                                            h = (function (t, n) {
                                                void 0 === n && (n = !0);
                                                var i = ''.concat(t.replace(/\s+/g, ' '), ',').match(n ? Du : Lu);
                                                if (!i) return [];
                                                for (var r = [], e = 0, s = i; e < s.length; e++) {
                                                    var u = s[e];
                                                    r.push(u.replace(/^[, ]+|[, ]+$/g, ''));
                                                }
                                                return r;
                                            })(e, !0);
                                        c < h.length;
                                        c++
                                    ) {
                                        var f = h[c];
                                        s.push(Ms(f.trim().split(/\s+/)[0], { source: 'dom', type: 'srcset' }));
                                    }
                                var v = n;
                                if (i.style && v.style) {
                                    var l = v.style.backgroundImage;
                                    if (l && l.length <= 300) {
                                        var d = void 0;
                                        for (ws.lastIndex = 0; (d = ws.exec(l)); ) {
                                            var p = d[1];
                                            p && s.push(Ms(p.trim(), { source: 'dom', type: 'css' }));
                                        }
                                    }
                                }
                                return s;
                            })(u, s, i);
                            if (0 === a.length) {
                                if (e) return;
                                for (var c = 0, h = rh; c < h.length; c++) {
                                    var f = i[h[c]];
                                    f && a.push(f);
                                }
                                a.length > 0 &&
                                    this.ut.taskQueue.enqueue(function () {
                                        return r.pu(a, !1, o);
                                    });
                            } else
                                this.ut.taskQueue.enqueue(function () {
                                    return r.pu(a, !0, o);
                                });
                        }
                    }
                }),
                (t.prototype.qn = function (t) {
                    var n,
                        i = t.id,
                        r = t.node;
                    switch (t.name) {
                        case '#document':
                        case '#document-fragment':
                            delete this.xs[i];
                            var e = this.Rs.get(r);
                            e &&
                                (e.clear(),
                                !!this.vt.removeChild(e) || Su('failed to remove shadow root listener'),
                                this.Rs['delete'](r));
                            break;
                        case 'IFRAME':
                            this.As(t.node);
                            break;
                        case 'LINK':
                        case 'STYLE':
                        case 'style':
                            var s = r.sheet;
                            s && this.Ps[Vc.StyleSheet].removeHook(s);
                            break;
                        case 'INPUT':
                        case 'TEXTAREA':
                        case 'SELECT':
                            var u = r;
                            this.Ps[Vc.Input].removeInput(u);
                    }
                    if ('function' == typeof r.getElementsByTagName)
                        for (
                            var o = null !== (n = r.getElementsByTagName('iframe')) && void 0 !== n ? n : [], a = 0;
                            a < o.length;
                            a++
                        ) {
                            var c = o[a];
                            this.As(c);
                        }
                }),
                (t.prototype.mi = function () {
                    var t = this;
                    this.Ks ||
                        ((this.Ks = !0),
                        this.ut.measurer.enqueue(function () {
                            for (var n in ((t.Ks = !1), t.xs)) {
                                var i = $u(t.xs[n]);
                                i && t.Ps[Vc.Animation].snapshot(i.node);
                            }
                        }));
                }),
                (t.prototype.pu = function (t, n, i) {
                    var r;
                    void 0 === n && (n = !1), window;
                    for (var e = 0, s = t; e < s.length; e++) {
                        var u = s[e];
                        /^(([a-z\-_]+):|\/\/)/i.test(u) &&
                            (this.Ts &&
                                n &&
                                (void 0 === r && (r = Ms(Je(this.xi), { source: 'page', type: 'base' })),
                                this.ur.uploadIfNeeded(this.xi, Ye(r, u), i)),
                            this.Yi.record(u));
                    }
                    window;
                }),
                (t.prototype.Bs = function (t) {
                    var n = Vu(eh(t));
                    this.Ht.enqueue({
                        Kind: cn.MOUSEMOVE,
                        Args: n ? [t.clientX, t.clientY, n] : [t.clientX, t.clientY],
                    });
                }),
                (t.prototype.Ws = function (t) {
                    this.Ht.enqueue({ Kind: cn.MOUSEDOWN, Args: [t.clientX, t.clientY] });
                }),
                (t.prototype.Hs = function (t) {
                    this.Ht.enqueue({ Kind: cn.MOUSEUP, Args: [t.clientX, t.clientY] });
                }),
                (t.prototype.Ys = function (t, n) {
                    if (void 0 !== t.changedTouches)
                        for (var i = 0; i < t.changedTouches.length; ++i) {
                            var r = t.changedTouches[i];
                            isNaN(parseInt(r.identifier, 10)) && (r.identifier = 0);
                            var e = [r.identifier, r.clientX, r.clientY];
                            this.Ht.enqueue({ Kind: n, Args: e });
                        }
                }),
                (t.prototype.Zs = function (t) {
                    var n = Vu(eh(t));
                    n && this.Ht.enqueue({ Kind: cn.PLAY, Args: [n] });
                }),
                (t.prototype.tu = function (t) {
                    var n = Vu(eh(t));
                    n && this.Ht.enqueue({ Kind: cn.PAUSE, Args: [n] });
                }),
                (t.prototype.eu = function () {
                    this.Ht.enqueue({ Kind: cn.WINDOW_FOCUS, Args: [] });
                }),
                (t.prototype.su = function () {
                    this.Ht.enqueue({ Kind: cn.WINDOW_BLUR, Args: [] });
                }),
                (t.prototype.fu = function (t) {
                    var n = this;
                    void 0 === t && (t = !1),
                        this.ut.measurer.enqueue(function () {
                            return n.wu(t);
                        });
                }),
                (t.prototype.wu = function (t) {
                    var n = this;
                    void 0 === t && (t = !1);
                    var i,
                        r = (i = this.xi.document).scrollingElement || i.body || i.documentElement,
                        e = Vu(r);
                    if (e) {
                        var s = !1,
                            u = function (t) {
                                (s = !0), n.Ht.enqueue(t);
                            },
                            o = (function (t, n) {
                                var i,
                                    r = t.documentElement.getBoundingClientRect(),
                                    e = null !== (i = t.body) && void 0 !== i ? i : { scrollHeight: 0, scrollWidth: 0 };
                                return {
                                    width: Math.max(r.width, n.scrollWidth, e.scrollWidth),
                                    height: Math.max(r.height, n.scrollHeight, e.scrollHeight),
                                };
                            })(this.xi.document, r);
                        Tu(o, this.gu) ||
                            ((this.gu = o), u({ Kind: cn.RESIZE_DOCUMENT_CONTENT, Args: [o.width, o.height] }));
                        var a,
                            c,
                            h,
                            f,
                            v = Ou(this.xi, t ? void 0 : this.mu),
                            l = (function (t, n) {
                                var i = t.visualViewport;
                                if (i) return i;
                                var r = n;
                                return void 0 === r && (r = Ou(t)), new ju(t, r);
                            })(this.xi, v);
                        v.hasKnownPosition
                            ? (Eu(v, this.mu) || u({ Kind: cn.SCROLL_LAYOUT, Args: [e, v.pageLeft, v.pageTop] }),
                              (a = l),
                              ((c = this.yu) && a.offsetLeft == c.offsetLeft && a.offsetTop == c.offsetTop) ||
                                  u({ Kind: cn.SCROLL_VISUAL_OFFSET, Args: [e, l.offsetLeft, l.offsetTop] }))
                            : Eu(l, this.yu) || u({ Kind: cn.SCROLL_LAYOUT, Args: [e, l.pageLeft, l.pageTop] }),
                            (function (t, n) {
                                return (
                                    n &&
                                    t.width == n.width &&
                                    t.height == n.height &&
                                    t.clientWidth == n.clientWidth &&
                                    t.clientHeight == n.clientHeight
                                );
                            })(v, this.mu) || u({ Kind: cn.RESIZE_LAYOUT, Args: Uu(v) }),
                            Tu(l, this.yu) || u({ Kind: cn.RESIZE_VISUAL, Args: [l.width, l.height] }),
                            (this.mu =
                                (((f = Cu((h = v))).clientWidth = h.clientWidth),
                                (f.clientHeight = h.clientHeight),
                                f)),
                            (this.yu = (function (t) {
                                var n = Cu(t);
                                return (n.offsetLeft = t.offsetLeft), (n.offsetTop = t.offsetTop), n;
                            })(l)),
                            s && this.$s();
                    }
                }),
                (t.prototype.bu = function (t, n) {
                    var i = this;
                    t in this.Es ||
                        ((this.Es[t] = n),
                        new io(function () {
                            i.ut.measurer.enqueue(function () {
                                if (t in i.Es) {
                                    var n = i.Es[t];
                                    delete i.Es[t], n();
                                }
                            });
                        }, Ai.ScrollSampleInterval).start());
                }),
                (t.prototype.Js = function () {
                    var t = this;
                    this.bu(Qc.Scroll, function () {
                        return t.wu(!1);
                    });
                }),
                (t.prototype.iu = function () {
                    var t = this;
                    this.bu(Qc.Resize, function () {
                        return t.wu(!0);
                    });
                }),
                (t.prototype.nu = function (t) {
                    var n = this,
                        i = Vu(t);
                    i &&
                        this.bu(i, function () {
                            if (Vu(t) === i) {
                                var r = t;
                                i &&
                                    'number' == typeof r.scrollLeft &&
                                    (n.Ht.enqueue({
                                        Kind: cn.RESIZE_SCROLLABLE_ELEMENT_CONTENT,
                                        Args: [i, r.scrollWidth, r.scrollHeight],
                                    }),
                                    n.Ht.enqueue({ Kind: cn.SCROLL_LAYOUT, Args: [i, r.scrollLeft, r.scrollTop] }),
                                    je().then(function () {
                                        n.Ns.resizer().isObserved(i) || n.Ns.resizer().observe(t);
                                    }));
                            }
                        });
                }),
                (t.prototype.hu = function () {
                    this.Ht.enqueue({ Kind: cn.DOMLOADED, Args: [] });
                }),
                (t.prototype.vu = function () {
                    this.Ht.enqueue({ Kind: cn.LOAD, Args: [] });
                }),
                (t.prototype.getNavigateEvent = function (t, n) {
                    void 0 === n && (n = cn.NAVIGATE);
                    var i = { Kind: n, Args: [Ms(t, { source: 'event', type: cn.NAVIGATE })] };
                    return n === cn.ENTRY_NAVIGATE ? (i.Args.push(this.Su()), i) : i;
                }),
                (t.prototype.uu = function () {
                    var t = this.Ms.href;
                    this.js != t && ((this.js = t), this.ks.onNavigate(t), this.Ht.enqueue(this.getNavigateEvent(t)));
                }),
                (t.prototype.Su = function () {
                    try {
                        var t = this.xi.performance;
                        if (!t || !t.navigation) return 'unknown';
                        switch (t.navigation.type) {
                            case PerformanceNavigation.TYPE_NAVIGATE:
                                return 'navigate';
                            case PerformanceNavigation.TYPE_RELOAD:
                                return 'reload';
                            case PerformanceNavigation.TYPE_BACK_FORWARD:
                                return 'back_forward';
                            default:
                                return 'unknown';
                        }
                    } catch (t) {
                        return 'unknown';
                    }
                }),
                (t.prototype.zs = function (t) {
                    var n = eh(t),
                        i = Vu(n),
                        r = oh(t);
                    if (i && r) {
                        var e = qu(n);
                        this.ks.onClick(e), this.Ht.enqueue({ Kind: cn.CLICK, Args: r });
                    }
                }),
                (t.prototype.Vs = function (t) {
                    var n = Vu(eh(t));
                    n && this.Ht.enqueue({ Kind: cn.DBL_CLICK, Args: [n] });
                }),
                (t.prototype.ku = function (t, n) {
                    var i = eh(n),
                        r = Vu(i),
                        e = oh(n);
                    if (r && e) {
                        var s = qu(i);
                        this.ks.onClick(s), this.Ht.enqueue({ Kind: cn.EVENT_CANCELED, Args: [t, e] });
                    }
                }),
                (t.prototype.ru = function (t) {
                    var n = Vu(eh(t));
                    n && this.Ht.enqueue({ Kind: cn.FORM_SUBMIT, Args: [n] });
                }),
                (t.prototype.Gs = function (t, n) {
                    var i = Vu(eh(t));
                    i && this.Ht.enqueue({ Kind: cn.FOCUS, Args: [i, n] });
                }),
                (t.prototype.Qs = function (t, n) {
                    var i = Vu(eh(t));
                    i && this.Ht.enqueue({ Kind: cn.BLUR, Args: [i, n] });
                }),
                (t.prototype.Xs = function (t, n) {
                    this.Ps[Vc.Input].onChange(eh(t), n);
                }),
                (t.prototype.ou = function () {
                    var t = this;
                    this.ut.measurer.enqueue(function () {
                        var n;
                        try {
                            n = t.selectionArgs();
                        } catch (t) {
                            return;
                        }
                        for (var i = !1, r = 0; r < 4; r++)
                            if (t.Is[r] !== n[r]) {
                                i = !0;
                                break;
                            }
                        i && ((t.Is = n), t.Ht.enqueue({ Kind: cn.SELECT, Args: n }));
                    });
                }),
                (t.prototype.selectionArgs = function () {
                    if (!this.xi.getSelection) return [];
                    var t = this.xi.getSelection();
                    if (!t) return [];
                    if ('None' == t.type) return [];
                    if ('Caret' == t.type) {
                        var n = Vu(t.anchorNode);
                        return n ? [n, t.anchorOffset] : [];
                    }
                    if (!t.anchorNode || !t.focusNode) return [];
                    var i = nh(t.anchorNode, t.anchorOffset),
                        r = i[0],
                        e = i[1],
                        s = nh(t.focusNode, t.focusOffset),
                        u = s[0],
                        o = s[1],
                        a = Boolean(r.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_FOLLOWING),
                        c = a ? [r, u] : [u, r],
                        h = c[0],
                        f = c[1],
                        v = a ? [e, o] : [o, e],
                        l = v[0],
                        d = v[1];
                    for (Vu(h) || (l = 0); h && !Vu(h) && h != f; ) h = En(h) || Tn(h);
                    for (Vu(f) || (d = 0); f && !Vu(f) && f != h; ) f = Cn(f) || Tn(f);
                    if (h == f && l == d) return [];
                    var p = Vu(h),
                        w = Vu(f);
                    return h && f && p && w ? [p, l, w, d, a] : [];
                }),
                (t.prototype.Ds = function () {
                    this.Ht.enqueue({ Kind: cn.COPY, Args: [] });
                }),
                (t.prototype.Fs = function () {
                    this.Ht.enqueue({ Kind: cn.PASTE, Args: [] });
                }),
                (t.prototype.addVisibilityChangeEvent = function () {
                    this.Ht.enqueue({ Kind: cn.VISIBILITY_STATE, Args: [document.visibilityState] }),
                        'hidden' === document.visibilityState && this.Ht.singSwanSong(Ln.Hidden);
                }),
                (t.prototype.cu = function (t, n) {
                    var i = this;
                    this.qs ||
                        (this.qs = {
                            target: eh(n),
                            timer: new io(function () {
                                (i.qs = void 0), i.ku(t, n);
                            }).start(Ai.SyntheticClickTimeout),
                        });
                }),
                (t.prototype.$s = function () {
                    this.qs && (this.qs.timer.stop(), (this.qs = void 0));
                }),
                t
            );
        })();
    function nh(t, n) {
        var i = t,
            r = kn(i);
        if (!r) return [i, n];
        i = r;
        for (var e = 0; e < n - 1; e++) {
            var s = En(i);
            if (!s) return [i, 0];
            i = s;
        }
        return [i, 0];
    }
    var ih = { src: { img: !0, embed: !0, source: !0 }, href: { use: !0, image: !0 }, data: { object: !0 } },
        rh = xt.objectKeys(ih);
    function eh(t) {
        if (t.composed && t.target) {
            var n = t.target;
            if (n.nodeType == Yt && n.shadowRoot) {
                var i = t.composedPath();
                if (i.length > 0) return i[0];
            }
        }
        return t.target;
    }
    function sh(t) {
        var n;
        return !!((null !== (n = t[Fi]) && void 0 !== n && n) || t.isTrusted);
    }
    function uh(t) {
        var n = eh(t);
        return !!Vu(n) && !Hu(n);
    }
    function oh(t) {
        var n = eh(t),
            i = Vu(n);
        if (i) {
            var r = 0,
                e = 0,
                s = 0,
                u = 0;
            if (n && n.getBoundingClientRect) {
                var o = n.getBoundingClientRect();
                (r = o.left), (e = o.top), (s = o.width), (u = o.height);
            }
            return [i, t.clientX, t.clientY, r, e, s, u];
        }
    }
    var ah,
        ch,
        hh = (function () {
            function t(t, n) {
                (this.we = t), (this._u = n), (this.Au = []), (this.Iu = 0);
            }
            return (
                (t.prototype.add = function (t) {
                    this.Au.length > 0 && this.Au[this.Au.length - 1].When === t.When && this.Au.pop(),
                        0 === this.Au.length
                            ? (this.we.push(t), (this.Iu = t.When))
                            : t.When > this.Iu && (this.Iu = t.When),
                        this.Au.push(t);
                }),
                (t.prototype.finish = function (t, n) {
                    void 0 === n && (n = []);
                    var i = this.Au.length;
                    if (i <= 1) return !1;
                    for (
                        var r = [], e = this.Au[0].When, u = this.Au[i - 1].When, o = u - e != 0 ? u - e : 1, a = 0;
                        a < this._u.length;
                        ++a
                    ) {
                        var c = this._u[a],
                            h = this.Au[0].Args[c],
                            f = (this.Au[1].When - e) / o,
                            v = (this.Au[1].Args[c] - h) / f,
                            l = this.Au[i - 2].Args[c],
                            d = (u - this.Au[i - 2].When) / o,
                            p = this.Au[i - 1].Args[c],
                            w = (p - l) / d;
                        r.push(h, p, v, w);
                    }
                    return (this.Au[0].Kind = t), (this.Au[0].Args = s(s([this.Iu], n, !0), r, !0)), !0;
                }),
                (t.prototype.evts = function () {
                    return this.Au;
                }),
                t
            );
        })();
    ((ch = ah || (ah = {}))[(ch.rageWindowMillis = 2e3)] = 'rageWindowMillis'),
        (ch[(ch.defaultRageThreshold = 5)] = 'defaultRageThreshold'),
        (ch[(ch.rageThresholdIfPageChanges = 8)] = 'rageThresholdIfPageChanges'),
        (ch[(ch.thresholdChangeQuiescenceMillis = 2e3)] = 'thresholdChangeQuiescenceMillis');
    var fh = (function () {
            function t(t, n) {
                var i, r;
                void 0 === n && (n = Rr),
                    (this.ut = t),
                    (this.Eu = n),
                    (this.Tu = new ko()),
                    (this.Cu = ah.defaultRageThreshold),
                    (this.xu = -1),
                    (this.Ku = new WeakMap());
                var e = t.recording.pageResponse();
                if (!e) throw new Error('Attempt to construct EasyBake before rec/page response is set.');
                for (
                    var s = ['.fs-ignore-rage-clicks', '.fs-ignore-rage-clicks *'],
                        u = 0,
                        o =
                            null !==
                                (r =
                                    null === (i = e.BehaviorSignalSettings) || void 0 === i
                                        ? void 0
                                        : i.ElementBlocks) && void 0 !== r
                                ? r
                                : [];
                    u < o.length;
                    u++
                ) {
                    var a = o[u];
                    a.Signals.indexOf(vi.SignalRageClick) > -1 &&
                        (s.push(a.Selector), s.push(''.concat(a.Selector, ' *')));
                }
                var c = s.join(', ');
                Fo(c) ? (this.Ru = [c]) : (this.Ru = s);
            }
            return (
                (t.prototype.Mu = function (t) {
                    var n = this.Ku.get(t);
                    if (void 0 !== n) return n;
                    for (var i = 0, r = this.Ru; i < r.length; i++) {
                        var e = r[i];
                        if (xt.elMatches(t, e)) return this.Ku.set(t, !0), !0;
                    }
                    return this.Ku.set(t, !1), !1;
                }),
                (t.prototype.onEvent = function (t) {
                    var n;
                    if (
                        (function (t) {
                            switch (t) {
                                case cn.VALUECHANGE:
                                case cn.SCROLL_LAYOUT:
                                case cn.SCROLL_LAYOUT_CURVE:
                                case cn.SCROLL_VISUAL_OFFSET:
                                case cn.SCROLL_VISUAL_OFFSET_CURVE:
                                case cn.MUT_INSERT:
                                case cn.MUT_REMOVE:
                                case cn.MUT_ATTR:
                                case cn.MUT_SHADOW:
                                case cn.MUT_TEXT:
                                case cn.NAVIGATE:
                                case cn.LOAD:
                                case cn.FOCUS:
                                case cn.BLUR:
                                case cn.SELECT:
                                case cn.FORM_SUBMIT:
                                case cn.PLAY:
                                case cn.PAUSE:
                                case cn.MODAL_OPEN:
                                case cn.MODAL_CLOSE:
                                    return !0;
                            }
                            return !1;
                        })(t.Kind) &&
                        this.Cu !== ah.rageThresholdIfPageChanges
                    )
                        return (this.Cu = ah.rageThresholdIfPageChanges), void (this.xu = this.Eu());
                    if (t.Kind === cn.CLICK) {
                        var i = this.Eu(),
                            r = null === (n = $u(t.Args[0])) || void 0 === n ? void 0 : n.node;
                        if (r) {
                            var e = r.nodeType === Yt ? r : Tn(r);
                            if (e && !this.Mu(e)) {
                                var s = Nu(r);
                                if (
                                    !s ||
                                    ('textarea' !== s && 'select' !== s && ('input' !== s || 'submit' === r.type))
                                ) {
                                    this.Tu.push(i);
                                    for (var u = i - ah.rageWindowMillis; ; ) {
                                        var o = this.Tu.first();
                                        if (!(void 0 !== o && o < u)) break;
                                        this.Tu.shift();
                                    }
                                    if (
                                        (this.xu < i - ah.thresholdChangeQuiescenceMillis &&
                                            (this.Cu = ah.defaultRageThreshold),
                                        this.Tu.size() >= this.Cu)
                                    ) {
                                        var a = this.ut.recording.getCurrentSessionURL;
                                        !(function (t, n) {
                                            var i,
                                                r = 'fullstory/rageclick';
                                            try {
                                                i = new CustomEvent(r, { detail: n, bubbles: !0, cancelable: !0 });
                                            } catch (t) {
                                                (i = document.createEvent('customevent')).initCustomEvent(r, !0, !0, n);
                                            }
                                            xt.setWindowTimeout(
                                                window,
                                                wu.wrap(function () {
                                                    t.dispatchEvent(i);
                                                }),
                                                0
                                            );
                                        })(r, {
                                            eventStartTimeStamp: this.Tu.first(),
                                            eventEndTimeStamp: i,
                                            eventReplayUrlAtStart: a(),
                                            eventReplayUrlAtCurrentTime: a(!0),
                                        }),
                                            (this.Cu = ah.defaultRageThreshold),
                                            (this.Tu = new ko());
                                    }
                                }
                            }
                        }
                    }
                }),
                t
            );
        })(),
        vh = (function () {
            function t(t) {
                (this.ut = t), (this.Ou = this.ut.time.wallTime()), (this.ju = !1);
            }
            return (
                (t.prototype.getLastUserActivityTS = function () {
                    return this.Ou;
                }),
                (t.prototype.getMsSinceLastUserActivity = function () {
                    return xt.mathFloor(this.ut.time.wallTime() - this.Ou);
                }),
                (t.prototype.resetUserActivity = function () {
                    this.Ou = this.ut.time.wallTime();
                }),
                (t.prototype.isHibernating = function () {
                    return this.ju;
                }),
                (t.prototype.setHibernating = function () {
                    this.ju = !0;
                }),
                t
            );
        })(),
        lh = (function () {
            function t(t, n, i, r) {
                void 0 === r && (r = io),
                    (this.ut = t),
                    (this.Pu = n),
                    (this.Ht = i),
                    (this.Uu = !1),
                    (this.Nu = !1),
                    (this.Lu = !1),
                    (this.Du = new r(this.Fu.bind(this), Ai.HeartbeatInterval)),
                    (this.Bu = new r(this.Wu.bind(this), Ai.PageInactivityTimeout));
            }
            return (
                (t.prototype.getUserActivityModel = function () {
                    return this.Pu;
                }),
                (t.prototype.manualHibernateCheck = function () {
                    this.Pu.isHibernating() ||
                        (this.Pu.getMsSinceLastUserActivity() >= Ai.PageInactivityTimeout + 5e3 && this.Wu());
                }),
                (t.prototype.intercept = function (t) {
                    this.Uu ||
                        (this.manualHibernateCheck(),
                        (function (t) {
                            switch (t) {
                                case cn.MOUSEDOWN:
                                case cn.MOUSEMOVE:
                                case cn.MOUSEMOVE_CURVE:
                                case cn.MOUSEUP:
                                case cn.TOUCHSTART:
                                case cn.TOUCHEND:
                                case cn.TOUCHMOVE:
                                case cn.TOUCHMOVE_CURVE:
                                case cn.TOUCHCANCEL:
                                case cn.CLICK:
                                case cn.SCROLL_LAYOUT:
                                case cn.SCROLL_LAYOUT_CURVE:
                                case cn.SCROLL_VISUAL_OFFSET:
                                case cn.SCROLL_VISUAL_OFFSET_CURVE:
                                case cn.NAVIGATE:
                                    return !0;
                            }
                            return !1;
                        })(t.Kind) && (this.Pu.isHibernating() ? this.Hu() : this.zu()));
                }),
                (t.prototype.shutdown = function () {
                    this.Du.stop(), this.Bu.stop();
                }),
                (t.prototype.zu = function (t) {
                    var n = this;
                    void 0 === t && (t = !0),
                        this.Lu ||
                            (this.Pu.resetUserActivity(),
                            this.Du.start(),
                            this.Bu.start(),
                            t &&
                                ((this.Lu = !0),
                                Pe().then(function () {
                                    n.Lu = !1;
                                })));
                }),
                (t.prototype.start = function () {
                    var t = this.ut.recording.heartbeatInterval();
                    this.qu(t), this.zu(!1);
                }),
                (t.prototype.qu = function (t) {
                    var n = this.Du.isRunning();
                    this.Du.start(t), n || this.Du.stop();
                }),
                (t.prototype.Fu = function () {
                    var t = this.Pu.getMsSinceLastUserActivity();
                    t <= Ai.PageInactivityTimeout && this.Ht.enqueue({ Kind: cn.HEARTBEAT, Args: [t] }),
                        this.Du.start();
                }),
                (t.prototype.Wu = function () {
                    if (!this.Pu.isHibernating()) {
                        var t = !1;
                        this.Pu.getMsSinceLastUserActivity() <= 2 * Ai.PageInactivityTimeout
                            ? this.Ht.enqueue({ Kind: cn.UNLOAD, Args: [Ln.Hibernation] })
                            : (t = !0);
                        try {
                            (this.Uu = !0), this.Pu.setHibernating(), this.shutdown(), this.Ht.onHibernate(t);
                        } finally {
                            this.Uu = !1;
                        }
                    }
                }),
                (t.prototype.Hu = function () {
                    this.Nu || ((this.Nu = !0), this.ut.recording.splitPage(Ln.Hibernation));
                }),
                t
            );
        })(),
        dh = (function () {
            function t() {}
            return (
                (t.prototype.encode = function (t) {
                    return t;
                }),
                t
            );
        })(),
        ph = (function () {
            function t() {
                (this.dict = { idx: -1, map: {} }), (this.nodeCount = 1), (this.startIdx = 0);
            }
            return (
                (t.prototype.encode = function (n) {
                    if (0 == n.length) return [];
                    var i,
                        r,
                        e = n[0],
                        s = Object.prototype.hasOwnProperty.call(this.dict.map, e) ? this.dict.map[e] : void 0,
                        u = [],
                        o = 1;
                    function a() {
                        s ? (o > 1 ? u.push([s.idx, o]) : u.push(s.idx)) : u.push(e);
                    }
                    for (i = 1; i < n.length; i++)
                        if (((r = n[i]), s && Object.prototype.hasOwnProperty.call(s.map, r)))
                            o++, (e = r), (s = s.map[r]);
                        else {
                            a();
                            var c = this.startIdx + i - o;
                            null == s &&
                                this.nodeCount < t.MAX_NODES &&
                                ((s = { idx: c, map: {} }), (this.dict.map[e] = s), this.nodeCount++),
                                s &&
                                    this.nodeCount < t.MAX_NODES &&
                                    ((s.map[r] = { idx: c, map: {} }), this.nodeCount++),
                                (o = 1),
                                (e = r),
                                (s = Object.prototype.hasOwnProperty.call(this.dict.map, r)
                                    ? this.dict.map[r]
                                    : void 0);
                        }
                    return a(), (this.startIdx += n.length), u;
                }),
                (t.MAX_NODES = 1e4),
                t
            );
        })();
    function wh(t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            switch (i.Kind) {
                case cn.DEFERRED_MUT_SHADOW:
                    (t[n].Args[1] = gh(i.Args[1])), (t[n].Kind = cn.MUT_SHADOW);
                    break;
                case cn.DEFERRED_MUT_INSERT:
                    (t[n].Args[2] = gh(i.Args[2])), (t[n].Kind = cn.MUT_INSERT);
            }
            yu(i.Kind !== cn.DEFERRED_MUT_SHADOW && i.Kind !== cn.DEFERRED_MUT_INSERT, 'client only event escaped');
        }
        return t;
    }
    function gh(t) {
        for (var n = [], i = 0, r = t; i < r.length; i++) {
            var e = r[i];
            if ('function' == typeof e)
                for (var s = 0, u = e(); s < u.length; s++) {
                    var o = u[s];
                    n.push(o);
                }
            else n.push(e);
        }
        return n;
    }
    var mh,
        yh,
        bh,
        Sh = (function () {
            function t(t) {
                (this.$u = t), (this.Vu = 0);
            }
            return (
                (t.newBudget = function (n) {
                    return void 0 === n && (n = 256e3), new t(n);
                }),
                (t.prototype.add = function (t) {
                    this.Vu += t;
                }),
                (t.prototype.isOver = function () {
                    return this.Vu > this.$u;
                }),
                (t.prototype.reset = function () {
                    this.Vu = 0;
                }),
                t
            );
        })(),
        kh =
            (((mh = {})[cn.AJAX_REQUEST] = !0),
            (mh[cn.PERF_ENTRY] = !0),
            (mh[cn.RESOURCE_TIMING_BUFFER_FULL] = !0),
            mh),
        _h = (function () {
            function t(t, n) {
                void 0 === n && (n = Sh.newBudget(Y(t.window, '_fs_network_budget', 'number'))),
                    (this.ut = t),
                    (this.Gu = n),
                    (this.Ht = new ko()),
                    (this.Qu = 1),
                    (this.Xu = {}),
                    (this.Yu = !1),
                    (this.Ju = []),
                    (this.Zu = !0),
                    this.init();
            }
            return (
                (t.prototype.init = function () {
                    if (1 === this.Qu) {
                        var t,
                            n = 'CompressionStream' in (t = this.ut.window) && 'TextEncoderStream' in t;
                        this.Zu = !!this.ut.recording.flags().UseLZEncoding || !n;
                    }
                }),
                (t.prototype.size = function () {
                    return this.Ht.size();
                }),
                (t.prototype.add = function (t) {
                    var n = !0;
                    switch (t.Kind) {
                        case cn.SET_FRAME_BASE:
                        case cn.MUT_INSERT:
                        case cn.MUT_SHADOW:
                        case cn.DEFERRED_MUT_INSERT:
                        case cn.DEFERRED_MUT_SHADOW:
                            n = !1;
                    }
                    kh[t.Kind] || (this.Yu = !0), this.Ht.push([t, n ? vr(t) : void 0]);
                }),
                (t.prototype.nextBundle = function (n) {
                    if (0 !== this.Ht.size()) return n.flush || t.forceFlush || this.Yu ? this.no(n) : void 0;
                }),
                (t.prototype.addEndMarkerEvent = function (t) {
                    this.Ju.push(t);
                }),
                (t.prototype.persistEndMarkerEventsTo = function (t) {
                    for (var n = 0, i = this.Ju; n < i.length; n++) {
                        var r = i[n];
                        t.addEndMarkerEvent(r);
                    }
                }),
                (t.prototype.no = function (t) {
                    var n = this.io(t);
                    if (n) {
                        0 === this.Ht.size() && (this.Yu = !1);
                        var i = n[0],
                            r = n[1];
                        return (function (t, n, i) {
                            var r = '{"Seq":'.concat(t, ',"When":').concat(n, ',"Evts":[').concat(i, ']}');
                            return [t, { type: 'string', data: r }, r.length];
                        })(this.Qu++, i, r);
                    }
                }),
                (t.prototype.io = function (t) {
                    yu(this.Ht.size() > 0, 'queue should never be empty'), this.Gu.reset();
                    var n,
                        i,
                        r = this.Ht.first()[0],
                        e = r.When,
                        s = this.ro(t),
                        u = s[0],
                        o = s[1];
                    if (
                        ((this.eo = ((n = o), (i = this.eo), n ? (i ? (n.When >= i.When ? n : i) : n) : i)),
                        !this.so(t))
                    )
                        return this.uo(u, this.eo), [e, Ah(u)];
                    this.Ht.unshift([r, Ah(u)]);
                }),
                (t.prototype.ro = function (t) {
                    for (var n, r = [], e = [], u = this.Ht.shift(); u; u = this.Ht.shift()) {
                        var o = u[0],
                            a = u[1];
                        if (((n = o), void 0 === a)) {
                            var c = wh([o])[0];
                            if (this.Zu) {
                                var h = this.oo(c),
                                    f = h[0],
                                    v = h[1];
                                (a = vr(f)), e.push.apply(e, v);
                            } else {
                                var l = Kr();
                                (a = vr(c)), e.push(Kr() - l);
                            }
                        }
                        if ((r.push(a), this.Gu.add(a.length), !t.flush && this.Gu.isOver())) break;
                    }
                    return (
                        n &&
                            (function (t, n, r) {
                                n.length <= 0 ||
                                    t.push(
                                        (function (t, n) {
                                            var r = n[0],
                                                e = n.slice(1);
                                            return vr(
                                                i(i({}, t), {
                                                    Kind: cn.TIMING,
                                                    Args: [
                                                        s(
                                                            [ln.Internal, pn.Serialization, gn.LzEncoding, t.When, r],
                                                            e.map(function (t) {
                                                                return [gn.LzEncoding, t];
                                                            }),
                                                            !0
                                                        ),
                                                    ],
                                                })
                                            );
                                        })(r, n)
                                    );
                            })(r, e, n),
                        [r, n]
                    );
                }),
                (t.prototype.so = function (t) {
                    return !(
                        !this.ut.recording.flags().UseMinNetworkBudget ||
                        t.bypassMinBudget ||
                        t.flush ||
                        this.Gu.isOver()
                    );
                }),
                (t.prototype.uo = function (t, n) {
                    yu(!!n, 'builder: missing last event'),
                        n &&
                            (function (t, n, r) {
                                yu(n.length > 0, 'builder: missing marker events');
                                for (var e = 0, s = n; e < s.length; e++) {
                                    var u = s[e];
                                    t.push(vr(i(i({}, r), u)));
                                }
                            })(t, this.Ju, n);
                }),
                (t.prototype.oo = function (t) {
                    var n = [];
                    switch (t.Kind) {
                        case cn.SET_FRAME_BASE:
                            var i = Ar(t.PIds, t.FId);
                            delete this.Xu[i];
                            break;
                        case cn.MUT_INSERT:
                            var r = Kr();
                            (t.Args[2] = this.ao(t.PIds, t.FId, t.Args[2])), n.push(Kr() - r);
                            break;
                        case cn.MUT_SHADOW:
                            (r = Kr()), (t.Args[1] = this.ao(t.PIds, t.FId, t.Args[1])), n.push(Kr() - r);
                    }
                    return [t, n];
                }),
                (t.prototype.ao = function (t, n, i) {
                    void 0 === t && (t = []), void 0 === n && (n = 0);
                    var r = Ar(t, n);
                    return this.Xu[r] || (this.Xu[r] = this.Zu ? new ph() : new dh()), this.Xu[r].encode(i);
                }),
                (t.forceFlush = !1),
                t
            );
        })();
    function Ah(t) {
        return t.join(',');
    }
    function Ih(t, n, i) {
        var r = new _h(t, i);
        return n && n.persistEndMarkerEventsTo(r), r;
    }
    function Eh(t, n, i, s) {
        return (
            void 0 === n && (n = io),
            void 0 === s && (s = 5e3),
            r(this, void 0, _e, function () {
                var u;
                return e(this, function (o) {
                    return (
                        (u = 0),
                        [
                            2,
                            (function o() {
                                return r(this, void 0, _e, function () {
                                    var r, a;
                                    return e(this, function (e) {
                                        switch (e.label) {
                                            case 0:
                                                return e.trys.push([0, 2, , 3]), (r = yh.NoRetry), [4, t()];
                                            case 1:
                                                return r === e.sent() ? [2] : [3, 3];
                                            case 2:
                                                return (
                                                    (a = e.sent()), 'retryWithBackoff caught error: '.concat(a), [3, 3]
                                                );
                                            case 3:
                                                return (
                                                    'retryWithBackoff retrying '.concat(u + 1),
                                                    [4, Ch(Th(u++, s), n, i)]
                                                );
                                            case 4:
                                                return e.sent(), [2, o()];
                                        }
                                    });
                                });
                            })(),
                        ]
                    );
                });
            })
        );
    }
    function Th(t, n) {
        void 0 === n && (n = 5e3);
        var i = xt.mathMin(Ai.BackoffMax, xt.mathPow(2, t) * n);
        return i + 0.25 * xt.mathRandom() * i;
    }
    function Ch(t, n, i) {
        return new _e(function (r) {
            var e = new n(function () {
                return r();
            }, t).start();
            null == i || i(e);
        });
    }
    ((bh = yh || (yh = {}))[(bh.NoRetry = 0)] = 'NoRetry'), (bh[(bh.Retry = 1)] = 'Retry');
    var xh = (function () {
            function t(t, n, i) {
                void 0 === i && (i = io),
                    (this.ut = t),
                    (this.co = n),
                    (this.ho = i),
                    (this.fo = !1),
                    (this.vo = 0),
                    (this.lo = !1),
                    (this['do'] = 16e6),
                    (this.po = 1e4),
                    (this.wo = 100),
                    (this.mo = 1e3),
                    (this.yo = Ih(this.ut, void 0, Sh.newBudget(this.po)));
            }
            return (
                (t.prototype.addEndMarkerEvent = function (t) {
                    this.yo.addEndMarkerEvent(t);
                }),
                (t.prototype.intercept = function (t) {
                    if (this.lo)
                        switch (t.Kind) {
                            case cn.SYS_CUSTOM:
                            case cn.SYS_SETVAR:
                                this.yo.add(t), this.bo();
                        }
                }),
                (t.prototype.startPipeline = function (t) {
                    this.ut.recording.flags().EnableRecEvents &&
                        ((this.So = t.isNewSession),
                        (this.ko = t.orgId),
                        (this._o = t.pageId),
                        (this.Ao = t.serverPageStart),
                        (this.Io = t.sessionId),
                        (this.Eo = t.userId),
                        (this.lo =
                            'boolean' == typeof this.So && ir(this.ko) && ir(this.Eo) && ir(this.Io) && ir(this._o)),
                        yu(this.lo, 'Fastlane - invalid opts'),
                        this.bo());
                }),
                (t.prototype.stopPipeline = function () {
                    var t;
                    (this.lo = !1),
                        null === (t = this.Ut) || void 0 === t || t.stop(),
                        (this.yo = Ih(this.ut, this.yo, Sh.newBudget(this.po)));
                }),
                (t.prototype.bo = function () {
                    var t;
                    this.lo &&
                        !(null === (t = this.Ut) || void 0 === t ? void 0 : t.isRunning()) &&
                        (this.Ut || (this.Ut = new this.ho(this.To.bind(this), this.wo)), this.Ut.start());
                }),
                (t.prototype.To = function () {
                    return r(this, void 0, _e, function () {
                        var t,
                            n,
                            i = this;
                        return e(this, function (s) {
                            switch (s.label) {
                                case 0:
                                    if (!this.lo || this.fo) return [2];
                                    if (!(t = this.yo.nextBundle({ bypassMinBudget: !0 }))) return [2];
                                    (n = {
                                        bundle: t,
                                        deltaT: null,
                                        isNewSession: this.So,
                                        lastUserActivity: 0,
                                        orgId: this.ko,
                                        pageId: this._o,
                                        serverBundleTime: this.vo,
                                        serverPageStart: this.Ao,
                                        sessionId: this.Io,
                                        userId: this.Eo,
                                        version: this.ut.recording.bundleApiVersion(),
                                    }),
                                        (s.label = 1);
                                case 1:
                                    return (
                                        s.trys.push([1, 3, 4, 5]),
                                        (this.fo = !0),
                                        [
                                            4,
                                            Eh(
                                                function () {
                                                    return r(i, void 0, _e, function () {
                                                        var t, i, r;
                                                        return e(this, function (e) {
                                                            switch (e.label) {
                                                                case 0:
                                                                    return (
                                                                        e.trys.push([0, 2, , 3]), [4, this.co.event(n)]
                                                                    );
                                                                case 1:
                                                                    return (
                                                                        (t = e.sent()),
                                                                        (i = t[0]),
                                                                        (r = t[1]),
                                                                        i >= this['do'] && this.stopPipeline(),
                                                                        (this.vo = r.BundleTime),
                                                                        [3, 3]
                                                                    );
                                                                case 2:
                                                                    return Fr(e.sent()) ? [3, 3] : [2, yh.Retry];
                                                                case 3:
                                                                    return [2, yh.NoRetry];
                                                            }
                                                        });
                                                    });
                                                },
                                                this.ho,
                                                function (t) {
                                                    return (i.Co = t);
                                                },
                                                this.mo
                                            ),
                                        ]
                                    );
                                case 2:
                                    return s.sent(), [3, 5];
                                case 3:
                                    return s.sent(), this.stopPipeline(), [3, 5];
                                case 4:
                                    return (this.fo = !1), this.yo.size() > 0 && this.bo(), [7];
                                case 5:
                                    return [2];
                            }
                        });
                    });
                }),
                t
            );
        })(),
        Kh = (function () {
            function t(t, n, i, r, e, s, u) {
                void 0 === r &&
                    (r = function () {
                        return [];
                    }),
                    void 0 === e && (e = no),
                    void 0 === s && (s = io),
                    (this.ut = t),
                    (this.xo = n),
                    (this.Ko = r),
                    (this.Ro = e),
                    (this.Mo = u),
                    (this.Oo = 0),
                    (this.jo = []),
                    (this.Po = !1),
                    (this.Uo = !1),
                    (this.No = 0),
                    (this.Lo = -1),
                    (this.Do = !1),
                    (this.In = []),
                    (this.Fo = []),
                    (this.Bo = new Rh()),
                    (this.Wo = new this.Ro(Ai.CurveSamplingInterval)),
                    (this.Ho = new this.Ro(Ai.MutationProcessingInterval)),
                    i && ((this.zo = new lh(this.ut, i, this, s)), this.Fo.push(this.zo)),
                    this.Fo.push(this.Bo),
                    u && this.Fo.push(u);
            }
            return (
                (t.prototype.startPipeline = function (t) {
                    var n, i, s;
                    return r(this, void 0, _e, function () {
                        var r,
                            u = this;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return this.Uo || this.Po
                                        ? [2]
                                        : ((this.Po = !0),
                                          t.frameId && (this.Oo = t.frameId),
                                          t.parentIds && (this.jo = t.parentIds),
                                          t.fixWhenValues &&
                                              0 === (null !== (n = t.frameId) && void 0 !== n ? n : 0) &&
                                              this.Bo.startPipeline(),
                                          null === (i = this.Mo) || void 0 === i || i.startPipeline(t),
                                          (r = !0),
                                          [4, je()]);
                                case 1:
                                    return e.sent(), this.processEvents(), [4, je()];
                                case 2:
                                    return (
                                        e.sent(),
                                        window,
                                        this.Ho.start(function () {
                                            window, u.processEvents(), window;
                                        }),
                                        this.Wo.start(
                                            function () {
                                                window, u.processEvents(r), window;
                                            },
                                            this.ut.recording.flags().EnableRecEvents
                                                ? xt.mathMax(50, 100)
                                                : Ai.CurveSamplingInterval
                                        ),
                                        null === (s = this.zo) || void 0 === s || s.start(),
                                        this.xo.startPipeline(t),
                                        window,
                                        [2]
                                    );
                            }
                        });
                    });
                }),
                (t.prototype.enableEasyBake = function () {
                    this.qo = new fh(this.ut);
                }),
                (t.prototype.enqueueSimultaneousEventsIn = function (t) {
                    if (0 === this.No) {
                        var n = this.ut.time.now();
                        this.Lo = n > this.Lo ? n : this.Lo;
                    }
                    try {
                        return this.No++, t(this.Lo);
                    } finally {
                        this.No--, this.No < 0 && (this.No = 0);
                    }
                }),
                (t.prototype.enqueue = function (t) {
                    var n = this.No > 0 ? this.Lo : this.ut.time.now();
                    this.$o(n, t), to.checkForBrokenSchedulers();
                }),
                (t.prototype.$o = function (t, n) {
                    var i;
                    if (!this.Uo) {
                        var r = t;
                        r < this.Lo && (r = this.Lo), (this.Lo = r);
                        var e = n;
                        (e.When = r), this.In.push(e);
                        try {
                            null === (i = this.qo) || void 0 === i || i.onEvent(e);
                        } catch (t) {
                            wu.sendErr(t);
                        }
                    }
                }),
                (t.prototype.enqueueFirst = function (t) {
                    if (this.In.length > 0) {
                        var n = t;
                        (n.When = this.In[0].When), this.In.unshift(n);
                    } else this.enqueue(t);
                }),
                (t.prototype.addUnload = function (t) {
                    this.Do || ((this.Do = !0), this.enqueue({ Kind: cn.UNLOAD, Args: [t] }), this.singSwanSong(t));
                }),
                (t.prototype.shutdown = function (t) {
                    this.addUnload(t), this.Vo(), (this.Uo = !0), this.Go();
                }),
                (t.prototype.Vo = function () {
                    var t, n;
                    this.processEvents(), null === (n = (t = this.xo).send) || void 0 === n || n.call(t);
                }),
                (t.prototype.singSwanSong = function (t) {
                    var n, i;
                    this.Uo ||
                        (window,
                        this.Vo(),
                        (t === Ln.Hidden && this.Do) ||
                            null === (i = (n = this.xo).send) ||
                            void 0 === i ||
                            i.call(n, { mode: 'sing', reason: t }),
                        window);
                }),
                (t.prototype.rebaseIframe = function (t, n) {
                    for (
                        var i = Math.max(0, n),
                            r = this.ut.time.startTime(),
                            e = function (n) {
                                var e = r + n - t;
                                return e >= i ? e : i;
                            },
                            s = 0,
                            u = this.In;
                        s < u.length;
                        s++
                    ) {
                        var o = u[s];
                        o.When = e(o.When);
                    }
                    -1 === this.Lo ? (this.Lo = i) : (this.Lo = e(this.Lo));
                }),
                (t.prototype.processEvents = function (t) {
                    if (this.Po) {
                        var n = this.In;
                        this.In = [];
                        var i = (function (t) {
                            if (0 == t.length) return t;
                            for (
                                var n, i = [], r = new hh(i, [0, 1]), e = {}, s = {}, u = {}, o = 0, a = t;
                                o < a.length;
                                o++
                            ) {
                                var c = a[o];
                                switch (c.Kind) {
                                    case cn.MOUSEMOVE:
                                        r.add(c);
                                        break;
                                    case cn.TOUCHMOVE:
                                        (v = c.Args[0]) in e || (e[v] = new hh(i, [1, 2])), e[v].add(c);
                                        break;
                                    case cn.SCROLL_LAYOUT:
                                        (v = c.Args[0]) in s || (s[v] = new hh(i, [1, 2])), s[v].add(c);
                                        break;
                                    case cn.SCROLL_VISUAL_OFFSET:
                                        (v = c.Args[0]) in u || (u[v] = new hh(i, [1, 2])), u[v].add(c);
                                        break;
                                    case cn.RESIZE_VISUAL:
                                        n || (n = new hh(i, [0, 1])), n.add(c);
                                        break;
                                    default:
                                        i.push(c);
                                }
                            }
                            if (r.finish(cn.MOUSEMOVE_CURVE)) {
                                var h = r.evts();
                                if (h.length > 0) {
                                    var f = h[h.length - 1].Args[2];
                                    f && (h[0].Args[9] = f);
                                }
                            }
                            for (var v in s) s[(l = parseInt(v, 10))].finish(cn.SCROLL_LAYOUT_CURVE, [l]);
                            for (var v in u) u[(l = parseInt(v, 10))].finish(cn.SCROLL_VISUAL_OFFSET_CURVE, [l]);
                            for (var v in e) {
                                var l;
                                e[(l = parseInt(v, 10))].finish(cn.TOUCHMOVE_CURVE, [l]);
                            }
                            return n && n.finish(cn.RESIZE_VISUAL_CURVE), i;
                        })(n);
                        t || (i = i.concat(this.Ko())),
                            this.Qo(i),
                            this.sendEvents(this.ut.recording.pageSignature(), i);
                    }
                }),
                (t.prototype.sendEvents = function (t, n) {
                    if (0 != n.length) {
                        if (this.Fo.length > 0)
                            for (var i = 0, r = n; i < r.length; i++)
                                for (var e = r[i], s = 0, u = this.Fo; s < u.length; s++) u[s].intercept(e);
                        try {
                            this.xo.enqueueEvents(t, n);
                        } catch (t) {
                            'transport.enqueueEvents: caught exception '.concat(t);
                        }
                    }
                }),
                (t.prototype.onHibernate = function (t) {
                    var n, i, r;
                    t || this.Vo(),
                        null === (i = (n = this.xo).send) || void 0 === i || i.call(n, { mode: 'sing' }),
                        this.xo.stopPipeline(),
                        null === (r = this.Mo) || void 0 === r || r.stopPipeline();
                }),
                (t.prototype.Qo = function (t) {
                    if (this.Oo)
                        for (var n = this.jo, i = n && n.length > 0, r = 0; r < t.length; ++r) {
                            var e = t[r];
                            e.FId || (e.FId = this.Oo), i && !e.PIds && (e.PIds = n);
                        }
                }),
                (t.prototype.Go = function () {
                    var t, n;
                    this.Po &&
                        (this.Wo.stop(),
                        this.Ho.stop(),
                        (this.In = []),
                        null === (t = this.zo) || void 0 === t || t.shutdown(),
                        this.xo.stopPipeline(),
                        this.Bo.stopPipeline(),
                        null === (n = this.Mo) || void 0 === n || n.stopPipeline());
                }),
                (t.prototype.manualHibernateCheck = function () {
                    var t;
                    null === (t = this.zo) || void 0 === t || t.manualHibernateCheck();
                }),
                t
            );
        })(),
        Rh = (function () {
            function t() {
                (this.mn = !1), (this.Xo = {});
            }
            return (
                (t.prototype.startPipeline = function () {
                    this.mn = !0;
                }),
                (t.prototype.stopPipeline = function () {
                    (this.mn = !1), (this.Xo = {});
                }),
                (t.prototype.intercept = function (t) {
                    var n;
                    if (this.mn) {
                        var i = Ar(t.PIds, t.FId),
                            r = null !== (n = this.Xo[i]) && void 0 !== n ? n : -1;
                        t.When > r ? (this.Xo[i] = t.When) : t.When < r && (t.When = r);
                    }
                }),
                t
            );
        })(),
        Mh = (function () {
            function t(t) {
                void 0 === t && (t = 4), (this.hashCount = t), (this.idx = 0), (this.hashMask = t - 1), this.reset();
            }
            return (
                (t.prototype.reset = function () {
                    (this.idx = 0), (this.hash = []);
                    for (var t = 0; t < this.hashCount; ++t) this.hash.push(2166136261);
                }),
                (t.prototype.write = function (t) {
                    for (var n = this.hashMask, i = this.idx, r = 0; r < t.length; r++)
                        (this.hash[i] = this.hash[i] ^ t[r]),
                            (this.hash[i] +=
                                (this.hash[i] << 1) +
                                (this.hash[i] << 4) +
                                (this.hash[i] << 7) +
                                (this.hash[i] << 8) +
                                (this.hash[i] << 24)),
                            (i = (i + 1) & n);
                    this.idx = i;
                }),
                (t.prototype.writeAscii = function (t) {
                    for (var n = this.hashMask, i = this.idx, r = 0; r < t.length; r++)
                        (this.hash[i] = this.hash[i] ^ t.charCodeAt(r)),
                            (this.hash[i] +=
                                (this.hash[i] << 1) +
                                (this.hash[i] << 4) +
                                (this.hash[i] << 7) +
                                (this.hash[i] << 8) +
                                (this.hash[i] << 24)),
                            (i = (i + 1) & n);
                    this.idx = i;
                }),
                (t.prototype.sum = function () {
                    var t;
                    return (
                        (t = this.sumAsHex()
                            .replace(/\r|\n/g, '')
                            .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
                            .replace(/ +$/, '')
                            .split(' ')
                            .map(Number)),
                        Uh(String.fromCharCode.apply(window, t))
                    );
                }),
                (t.prototype.sumAsHex = function () {
                    for (var t = '', n = 0; n < this.hashCount; ++n)
                        t += '00000000'.concat((this.hash[n] >>> 0).toString(16)).slice(-8);
                    return t;
                }),
                t
            );
        })();
    function Oh(t) {
        var n = new Mh(1);
        return n.writeAscii(t), n.sumAsHex();
    }
    function jh(t) {
        var n = new Uint8Array(t);
        return Uh(String.fromCharCode.apply(null, n));
    }
    var Ph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    function Uh(t) {
        var n;
        return (null !== (n = window.btoa) && void 0 !== n ? n : Nh)(t).replace(/\+/g, '-').replace(/\//g, '_');
    }
    function Nh(t) {
        for (
            var n = String(t), i = [], r = 0, e = 0, s = 0, u = Ph;
            n.charAt(0 | s) || ((u = '='), s % 1);
            i.push(u.charAt(63 & (r >> (8 - (s % 1) * 8))))
        ) {
            if ((e = n.charCodeAt((s += 3 / 4))) > 255)
                throw new Error(
                    "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
                );
            r = (r << 8) | e;
        }
        return i.join('');
    }
    var Lh = 1e4,
        Dh = 25,
        Fh = 100;
    function Bh(t, n, i, s) {
        return (
            void 0 === s && (s = new Mh()),
            r(this, void 0, _e, function () {
                var r, u, o, a;
                return e(this, function (e) {
                    switch (e.label) {
                        case 0:
                            (r = t.now()), (u = i.byteLength), (o = 0), (e.label = 1);
                        case 1:
                            return o < u ? (t.now() - r > Dh ? [4, n(Fh)] : [3, 3]) : [3, 5];
                        case 2:
                            e.sent(), (r = t.now()), (e.label = 3);
                        case 3:
                            (a = new Uint8Array(i, o, Math.min(u - o, Lh))), s.write(a), (e.label = 4);
                        case 4:
                            return (o += Lh), [3, 1];
                        case 5:
                            return [2, { hash: s.sum(), hasher: s }];
                    }
                });
            })
        );
    }
    function Wh(t, n, i) {
        var s, u;
        return r(this, void 0, _e, function () {
            return e(this, function (r) {
                switch (r.label) {
                    case 0:
                        return (
                            null === (u = null === (s = t.crypto) || void 0 === s ? void 0 : s.subtle) || void 0 === u
                                ? void 0
                                : u.digest
                        )
                            ? [4, t.crypto.subtle.digest({ name: 'sha-1' }, i)]
                            : [3, 2];
                    case 1:
                        return [2, { hash: jh(r.sent()), algorithm: 'sha1' }];
                    case 2:
                        return [4, Bh(n, Hh, i)];
                    case 3:
                        return [2, { hash: r.sent().hash, algorithm: 'fsnv' }];
                }
            });
        });
    }
    function Hh(t) {
        return new _e(function (n) {
            return setTimeout(function () {
                try {
                    n();
                } catch (t) {}
            }, t);
        });
    }
    var zh = 6e6,
        qh = /^\/?_capacitor_file_/,
        $h = !1;
    function Vh(t, n) {
        $h || (($h = !0), Su(t, n));
    }
    var Gh = (function () {
        function t(t, n, i, r, e) {
            void 0 === r && (r = window.FormData),
                void 0 === e && (e = io),
                (this.ut = t),
                (this.Ht = n),
                (this.co = i),
                (this.Yo = r),
                (this.Jo = e),
                (this.Ne = {}),
                (this.Zo = {}),
                (this.ta = !1),
                (this.na = []),
                ($h = !1);
        }
        return (
            (t.prototype.init = function () {
                this.Yo &&
                    this.ia()['catch'](function (t) {
                        wu.sendErr(t);
                    });
            }),
            (t.prototype.ia = function () {
                return r(this, void 0, _e, function () {
                    var t, n, i, r, s, u, o, a, c, h, f, v, l, d, p, w, g, m, y, b, S, k, _, A, I;
                    return e(this, function (e) {
                        switch (e.label) {
                            case 0:
                                (t = this.ut.options.orgId), (e.label = 1);
                            case 1:
                                return [4, this.ra()];
                            case 2:
                                for (n = e.sent(), i = { fsnv: {}, sha1: {} }, r = {}, s = 0, u = n; s < u.length; s++)
                                    (y = u[s]),
                                        (i[y.hashAlgorithm][y.hash] = !0),
                                        (l = r[y.hash]) ? l.push(y) : (r[y.hash] = [y]);
                                (o = { fsnv: Object.keys(i.fsnv), sha1: Object.keys(i.sha1) }),
                                    (a = void 0),
                                    (e.label = 3);
                            case 3:
                                return (
                                    e.trys.push([3, 5, , 6]),
                                    [4, this.co.queryResources({ OrgId: t, HashesByAlgorithm: o })]
                                );
                            case 4:
                                return (a = e.sent()), [3, 6];
                            case 5:
                                return (c = e.sent()), '/rec/queryResources failed with status '.concat(c), [3, 1];
                            case 6:
                                (h = 0), (f = a), (e.label = 7);
                            case 7:
                                if (!(h < f.length)) return [3, 18];
                                if (((v = f[h]), !(null == (l = r[v.QueryHash]) ? void 0 : l.length)))
                                    return Vh('No resource found for hash'), [3, 17];
                                if (!v.Found || !v.CanonicalHash) return [3, 8];
                                for (d = 0, p = l; d < p.length; d++)
                                    ((y = p[d]).blob = y.stringData = null),
                                        'fsnv' === (w = v.CanonicalHash.Algorithm)
                                            ? this.Ht.enqueue({
                                                  Kind: cn.SYS_RESOURCEHASH,
                                                  Args: ['url', y.url, v.CanonicalHash.Hash],
                                              })
                                            : Vh('Unrecognized canonical hash type', { hashAlgorithm: w });
                                return [3, 17];
                            case 8:
                                (g = 0), (m = l), (e.label = 9);
                            case 9:
                                if (!(g < m.length)) return [3, 17];
                                if (
                                    ((y = m[g]),
                                    (b = y.url),
                                    (S = y.contentType),
                                    ((k = {}).orgId = t),
                                    (k.baseUrl = b),
                                    'fsnv' === v.QueryAlgorithm)
                                )
                                    k.fsnvHash = v.QueryHash;
                                else {
                                    if ('sha1' !== v.QueryAlgorithm)
                                        return (
                                            Vh('Unrecognized hash type from resource query', {
                                                hashAlgorithm: v.QueryAlgorithm,
                                            }),
                                            [3, 16]
                                        );
                                    k.sha1Hash = v.QueryHash;
                                }
                                return y.blob ? [4, Te(y.blob)] : [3, 11];
                            case 10:
                                return (_ = e.sent())
                                    ? ((k.contents = { data: _, contentType: S, filename: 'blob' }), [3, 12])
                                    : [3, 17];
                            case 11:
                                y.stringData && (k.contents = { data: y.stringData, contentType: S, filename: 'blob' }),
                                    (e.label = 12);
                            case 12:
                                if (!k.contents) return Vh('Missing resource contents'), [3, 16];
                                (y.blob = y.stringData = null), (e.label = 13);
                            case 13:
                                return (
                                    e.trys.push([13, 15, , 16]),
                                    [4, this.co.uploadResource({ type: 'FormData', data: k })]
                                );
                            case 14:
                                return (
                                    (A = e.sent()),
                                    'fsnv' != (I = JSON.parse(A)).Algorithm &&
                                        Vh('Unexpected hash type from resource upload', { hashAlgorithm: I.Algorithm }),
                                    this.Ht.enqueue({ Kind: cn.SYS_RESOURCEHASH, Args: ['url', b, I.Hash] }),
                                    [3, 16]
                                );
                            case 15:
                                return e.sent(), [3, 16];
                            case 16:
                                return g++, [3, 9];
                            case 17:
                                return h++, [3, 7];
                            case 18:
                                return [3, 1];
                            case 19:
                                return [2];
                        }
                    });
                });
            }),
            (t.prototype.ra = function () {
                var t = this,
                    n = Ae(),
                    i = n.resolve,
                    r = n.promise,
                    e = function () {
                        (t.ea = null), (t.ta = !1);
                        var n = t.na;
                        (t.na = []), i(n);
                    };
                return this.ta ? e() : (this.ea = e), r;
            }),
            (t.prototype.uploadIfNeeded = function (t, n, i) {
                return (
                    void 0 === i && (i = 'unknown'),
                    r(this, void 0, _e, function () {
                        var r, s, u;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return this.Yo
                                        ? ((r = n.href),
                                          this.Ne[r]
                                              ? [2]
                                              : ((s =
                                                    'css' === i &&
                                                    (function (t) {
                                                        return !!Y(t, '_fs_force_local_resources', 'boolean');
                                                    })(this.ut.window)),
                                                s ||
                                                (function (t, n) {
                                                    var i, r;
                                                    if (
                                                        'function' ==
                                                        typeof (null === (i = t.Capacitor) || void 0 === i
                                                            ? void 0
                                                            : i.getServerUrl)
                                                    ) {
                                                        var e = Ye(
                                                            Je(t),
                                                            null === (r = t.Capacitor) || void 0 === r
                                                                ? void 0
                                                                : r.getServerUrl()
                                                        );
                                                        return (
                                                            'blob:' === n.protocol ||
                                                            (e.protocol === n.protocol &&
                                                                e.hostname === n.hostname &&
                                                                qh.test(n.pathname))
                                                        );
                                                    }
                                                    switch (n.protocol) {
                                                        case 'blob:':
                                                            return !0;
                                                        case 'http:':
                                                        case 'https:':
                                                            switch (n.hostname) {
                                                                case 'localhost':
                                                                case '127.0.0.1':
                                                                case '[::1]':
                                                                    return (
                                                                        t.location.protocol === n.protocol &&
                                                                        t.location.host === n.host
                                                                    );
                                                                case '::1':
                                                                    var s = n.port ? '[::1]:'.concat(n.port) : '[::1]';
                                                                    return (
                                                                        t.location.protocol === n.protocol &&
                                                                        t.location.host === s
                                                                    );
                                                                default:
                                                                    return !1;
                                                            }
                                                        default:
                                                            return !1;
                                                    }
                                                })(t, n)
                                                    ? ((this.Ne[r] = !0), [4, this.sa(r)])
                                                    : [2]))
                                        : [2];
                                case 1:
                                    return (u = e.sent()) ? (this.ua(u), [2]) : [2];
                            }
                        });
                    })
                );
            }),
            (t.prototype.ua = function (t) {
                var n = this,
                    i = 0 == this.na.length;
                this.na.push(t),
                    i &&
                        new this.Jo(function () {
                            (n.ta = !0), n.ea && n.ea();
                        }, 50).start();
            }),
            (t.prototype.sa = function (t) {
                return r(this, void 0, _e, function () {
                    var n, i, r, s, u;
                    return e(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return this.Zo[t] ? [2, this.Zo[t]] : [4, Qh(t)];
                            case 1:
                                return (n = e.sent()) && n.buffer.byteLength
                                    ? [4, Wh(this.ut.window, this.ut.time, n.buffer)]
                                    : [2, null];
                            case 2:
                                return (
                                    (i = e.sent()),
                                    (r = i.hash),
                                    (s = i.algorithm),
                                    (u = {
                                        hash: r,
                                        hashAlgorithm: s,
                                        url: t,
                                        blob: n.blob,
                                        contentType: n.contentType,
                                    }),
                                    (this.Zo[u.url] = u),
                                    [2, u]
                                );
                        }
                    });
                });
            }),
            (t.prototype.uploadDataUrlIfNeeded = function (t, n) {
                return (
                    void 0 === n &&
                        (n = function () {
                            return !0;
                        }),
                    r(this, void 0, _e, function () {
                        var i, r, s, u, o, a;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return (
                                        (i = (function (t) {
                                            var n,
                                                i = t.indexOf(',');
                                            if (-1 !== i)
                                                try {
                                                    var r = t.substring(0, i).match(Xh),
                                                        e = void 0,
                                                        s = void 0;
                                                    r &&
                                                        ((e = r[1]),
                                                        (s =
                                                            null === (n = r[2]) || void 0 === n
                                                                ? void 0
                                                                : n.substring(1)));
                                                    for (
                                                        var u = atob(t.substring(i + 1)),
                                                            o = new ArrayBuffer(u.length),
                                                            a = new Uint8Array(o),
                                                            c = 0;
                                                        c < u.length;
                                                        ++c
                                                    )
                                                        a[c] = u.charCodeAt(c);
                                                    return {
                                                        blob: new Blob([o], { type: e }),
                                                        buffer: o,
                                                        contentType: e,
                                                        charset: s,
                                                    };
                                                } catch (n) {
                                                    return void wu.send(Yh, 'warning', {
                                                        input: t.substring(0, 100),
                                                        err: n,
                                                    });
                                                }
                                            else wu.send(Yh, 'warning', { input: t.substring(0, 100) });
                                        })(t)),
                                        i ? [4, Wh(this.ut.window, this.ut.time, i.buffer)] : [2, void 0]
                                    );
                                case 1:
                                    return (
                                        (r = e.sent()),
                                        (s = r.hash),
                                        (u = r.algorithm),
                                        (o = 'https://'.concat('data-url.fs.invalid', '/').concat(u, '/').concat(s)),
                                        (a = {
                                            hash: s,
                                            hashAlgorithm: u,
                                            url: o,
                                            blob: i.blob,
                                            contentType: i.blob.type || 'application/octet-stream',
                                        }),
                                        n(a) ? ((this.Zo[a.url] = a), this.ua(a), [2, a]) : [2, a]
                                    );
                            }
                        });
                    })
                );
            }),
            t
        );
    })();
    function Qh(t) {
        var n = Ae(),
            i = n.resolve,
            r = n.promise,
            e = new XMLHttpRequest();
        return 'string' != typeof e.responseType
            ? (i(null), r)
            : (e.open('GET', t, !0),
              (e.responseType = 'blob'),
              (e.onerror = function () {
                  i(null);
              }),
              (e.onload = function () {
                  if (200 != e.status && 0 !== e.status)
                      return (
                          'Error loading blob resource '.concat(Ms(t, { source: 'log', type: 'debug' })), void i(null)
                      );
                  var n = e.response;
                  if ((n.size || n.length) > zh)
                      return (
                          Vh('Size of blob resource exceeds limit', {
                              url: Ms(t, { source: 'log', type: 'fsbugs' }),
                              MaxResourceSizeBytes: zh,
                          }),
                          void i(null)
                      );
                  Te(n).then(function (t) {
                      i(t ? { buffer: t, blob: n, contentType: n.type } : null);
                  });
              }),
              e.send(),
              r);
    }
    var Xh = /^data:([^;,]*)(;?charset=[^;]+)?(?:;base64)?$/i,
        Yh = 'Could not parse data url',
        Jh = (function () {
            function t(t, n, i) {
                void 0 === i && (i = new Zh()), (this.ut = t), (this.we = n), (this.oa = i);
            }
            return (
                (t.prototype.initialize = function (t) {
                    var n;
                    if (t) {
                        this.aa(t);
                        var i = null === (n = this.ut.window.location) || void 0 === n ? void 0 : n.href;
                        this.onNavigate(i);
                    }
                }),
                (t.prototype.onNavigate = function (t) {
                    return (
                        !!this.oa.matches(t) &&
                        (this.we.enqueue({ Kind: cn.KEEP_URL, Args: [Ms(t, { source: 'page', type: 'base' })] }), !0)
                    );
                }),
                (t.prototype.onClick = function (t) {
                    var n;
                    return (
                        !!(null === (n = null == t ? void 0 : t.watchKind) || void 0 === n ? void 0 : n.has(cs.Keep)) &&
                        (this.we.enqueue({ Kind: cn.KEEP_ELEMENT, Args: [t.id] }), !0)
                    );
                }),
                (t.prototype.urlMatches = function (t) {
                    return this.oa.matches(t);
                }),
                (t.prototype.aa = function (t) {
                    this.oa.setRules(t);
                }),
                t
            );
        })(),
        Zh = (function () {
            function t() {
                this.ca = null;
            }
            return (
                (t.prototype.setRules = function (t) {
                    var n = t
                        .map(function (t) {
                            return t.Regex;
                        })
                        .filter(tf);
                    n.length > 0 &&
                        (this.ca = (function (t) {
                            try {
                                return new RegExp('('.concat(t.join(')|('), ')'), 'i');
                            } catch (n) {
                                return (
                                    wu.send('Browser rejected joining UrlKeep.Regexs', 'error', { exprs: t, err: n }),
                                    null
                                );
                            }
                        })(n));
                }),
                (t.prototype.matches = function (t) {
                    return !!this.ca && this.ca.test(t);
                }),
                t
            );
        })();
    function tf(t) {
        try {
            return new RegExp(t), !0;
        } catch (n) {
            return wu.send('Browser rejected UrlKeep.Regex', 'error', { expr: t, err: n }), !1;
        }
    }
    Pi.RequestFrameId, Pi.EvtBundle;
    var nf = function (t) {
        var n = (void 0 === t ? {} : t).wnd,
            i = void 0 === n ? window : n;
        !(function (t, n, i, r, e, s, u, o) {
            var a, c;
            function h(t) {
                var n,
                    i = [];
                function r() {
                    n &&
                        (i.forEach(function (t) {
                            var i;
                            try {
                                i = t[n[0]] && t[n[0]](n[1]);
                            } catch (n) {
                                return void (t[3] && t[3](n));
                            }
                            i && i.then ? i.then(t[2], t[3]) : t[2] && t[2](i);
                        }),
                        (i.length = 0));
                }
                function e(t) {
                    return function (i) {
                        n || ((n = [t, i]), r());
                    };
                }
                return (
                    t(e(0), e(1)),
                    {
                        then: function (t, n) {
                            return h(function (e, s) {
                                i.push([t, n, e, s]), r();
                            });
                        },
                    }
                );
            }
            (i in t &&
                (t.console &&
                    t.console.log &&
                    t.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'),
                1)) ||
                ((u = t[i] =
                    (function () {
                        var t = function (t, i, r, e) {
                            function s(s, u) {
                                n(t, i, r, s, u, e);
                            }
                            e = e || 2;
                            var u,
                                o = /Async$/;
                            return o.test(t)
                                ? ((t = t.replace(o, '')), 'function' == typeof Promise ? new Promise(s) : h(s))
                                : n(t, i, r, u, u, e);
                        };
                        function n(n, i, r, e, s, u) {
                            return t._api ? t._api(n, i, r, e, s, u) : (t.q && t.q.push([n, i, r, e, s, u]), null);
                        }
                        return (t.q = []), t;
                    })()),
                (function () {
                    function t() {}
                    function n(t, n, i) {
                        u(t, n, i, 1);
                    }
                    function i(t, i, r) {
                        n('setProperties', { type: t, properties: i }, r);
                    }
                    function r(t, n) {
                        i('user', t, n);
                    }
                    function e(t, n, i) {
                        r({ uid: t }, i), n && r(n, i);
                    }
                    (u.identify = e),
                        (u.setUserVars = r),
                        (u.identifyAccount = t),
                        (u.clearUserCookie = t),
                        (u.setVars = i),
                        (u.event = function (t, i, r) {
                            n('trackEvent', { name: t, properties: i }, r);
                        }),
                        (u.anonymize = function () {
                            e(!1);
                        }),
                        (u.shutdown = function () {
                            n('shutdown');
                        }),
                        (u.restart = function () {
                            n('restart');
                        }),
                        (u.log = function (t, i) {
                            n('log', { level: t, msg: i });
                        }),
                        (u.consent = function (t) {
                            n('setIdentity', { consent: !arguments.length || t });
                        });
                })(),
                (a = 'fetch'),
                (c = 'XMLHttpRequest'),
                (u._w = {}),
                (u._w[c] = t[c]),
                (u._w[a] = t[a]),
                t[a] &&
                    (t[a] = function () {
                        return u._w[a].apply(this, arguments);
                    }),
                (u._v = '2.0.0'));
        })(i, i.document, i._fs_namespace, 0, i._fs_script);
    };
    function rf(t, n) {
        if (t && t.postMessage)
            try {
                t.postMessage(
                    (function (t) {
                        var n;
                        return fr((((n = {})[Wi] = t), n));
                    })(n),
                    '*'
                );
            } catch (t) {
                Su('postMessageTo', { err: t });
            }
    }
    function ef(t) {
        try {
            var n = pr(t);
            if (Wi in n) return n[Wi];
        } catch (t) {}
        return [Pi.Unknown];
    }
    function sf(t, n, i, r) {
        var e = st(t);
        if (!e) return !1;
        try {
            e.send(n, i, r);
        } catch (t) {
            e.send(n, i);
        }
        return !0;
    }
    function uf(t, n, i) {
        var r = st(t);
        if (!r || !r.sendToChild) return !1;
        var e = i[0],
            s = fr(i.slice(1));
        return r.sendToChild(n, e, s), !0;
    }
    var of = new RegExp(/^\s+$/),
        af = /^fb\d{18}$/,
        cf = function (t) {
            var n = t.frame,
                i = t.orgId,
                r = t.scheme,
                e = t.script,
                s = t.recHost,
                u = t.cdnHost,
                o = t.appHost,
                a = t.namespace,
                c = t.desc,
                h = t.snippetVersion;
            'Injecting into Frame '.concat(c);
            try {
                if (
                    (function (t) {
                        return t.id == t.name && af.test(t.id);
                    })(n)
                )
                    return 'Blocklisted iframe: '.concat(c), yn.BlocklistedFrame;
                if (
                    (function (t) {
                        return (
                            !(t.contentDocument && t.contentWindow && t.contentWindow.location) ||
                            ((function (t) {
                                return !!t.src && 'about:blank' != t.src && t.src.indexOf('javascript:') < 0;
                            })(t) &&
                                t.src != t.contentWindow.location.href &&
                                'loading' == t.contentDocument.readyState)
                        );
                    })(n)
                )
                    return 'Frame not yet loaded: '.concat(c), yn.PartiallyLoaded;
                var f = n.contentWindow,
                    v = n.contentDocument;
                if (!f || !v) return 'Missing contentWindow or contentDocument: '.concat(c), yn.MissingWindowOrDocument;
                if (!v.head) return 'Missing contentDocument.head: '.concat(c), yn.MissingDocumentHead;
                if (!v.body || !In(v.body)) return yn.MissingBodyOrChildren;
                for (var l = !1, d = kn(v.body); d; d = En(d)) {
                    switch (d.nodeType) {
                        case Yt:
                            if ('SCRIPT' === d.tagName) continue;
                            break;
                        case 3:
                            var p = d.textContent;
                            if (null === p || of.test(p)) continue;
                            break;
                        case Node.COMMENT_NODE:
                            continue;
                    }
                    l = !0;
                    break;
                }
                if (!l) return yn.NoNonScriptElement;
                if (z(f))
                    return 'FS already defined in Frame contentWindow: '.concat(c, ' Ignoring.'), yn.AlreadyDefined;
                var w = f;
                return (
                    (w._fs_org = i),
                    (w._fs_script = e),
                    (w._fs_rec_host = s),
                    (w._fs_rec_settings_host = u),
                    (w._fs_app_host = o),
                    (w._fs_run_in_iframe = !0),
                    (w._fs_namespace = a),
                    (w._fs_transport = (function (t) {
                        return {
                            send: function (n, i, r) {
                                if (void 0 !== t.parent) {
                                    var e = z(t.parent);
                                    void 0 !== e &&
                                        'function' == typeof e._withRecorder &&
                                        e._withRecorder(r, function (e) {
                                            try {
                                                e.onMessageReceived(t, [n, xt.jsonParse(i), r]);
                                            } catch (t) {
                                                t instanceof SyntaxError &&
                                                    wu.send('Received invalid JSON', 'error', { err: t });
                                            }
                                        });
                                }
                            },
                        };
                    })(w)),
                    (function (t, n, i, r, e, s) {
                        /^2\./.test(s)
                            ? nf({ wnd: t })
                            : (function (t) {
                                  var n,
                                      i,
                                      r,
                                      e,
                                      s,
                                      u = (void 0 === t ? {} : t).wnd,
                                      o = void 0 === u ? window : u;
                                  (n = o),
                                      o.document,
                                      (i = o._fs_namespace),
                                      (r = 'user'),
                                      i in n
                                          ? n.console &&
                                            n.console.log &&
                                            n.console.log(
                                                'FullStory namespace conflict. Please set window["_fs_namespace"].'
                                            )
                                          : (((e = n[i] =
                                                function (t, n, i) {
                                                    e.q ? e.q.push([t, n, i]) : e._api(t, n, i);
                                                }).q = []),
                                            (e.identify = function (t, n, i) {
                                                e(r, { uid: t }, i), n && e(r, n, i);
                                            }),
                                            (e.setUserVars = function (t, n) {
                                                e(r, t, n);
                                            }),
                                            (e.event = function (t, n, i) {
                                                e('event', { n: t, p: n }, i);
                                            }),
                                            (e.anonymize = function () {
                                                e.identify(!1);
                                            }),
                                            (e.shutdown = function () {
                                                e('rec', !1);
                                            }),
                                            (e.restart = function () {
                                                e('rec', !0);
                                            }),
                                            (e.log = function (t, n) {
                                                e('log', [t, n]);
                                            }),
                                            (e.consent = function (t) {
                                                e('consent', !arguments.length || t);
                                            }),
                                            (e.identifyAccount = function (t, n) {
                                                ((n = n || {}).acctId = t), e('account', n);
                                            }),
                                            (e.clearUserCookie = function () {}),
                                            (e.setVars = function (t, n) {
                                                e('setVars', [t, n]);
                                            }),
                                            (e._w = {}),
                                            (s = 'XMLHttpRequest'),
                                            (e._w[s] = n[s]),
                                            (s = 'fetch'),
                                            (e._w[s] = n[s]),
                                            n[s] &&
                                                (n[s] = function () {
                                                    return e._w[s].apply(this, arguments);
                                                }),
                                            (e._v = '1.3.0'));
                              })({ wnd: t });
                        var u = n.createElement('script');
                        (u.async = !0),
                            (u.crossOrigin = 'anonymous'),
                            (u.src = ''.concat(i, '//').concat(r)),
                            'testdrive' == e && (u.src += '?allowMoo=true'),
                            n.head.appendChild(u);
                    })(w, v, r, e, i, h),
                    yn.Successful
                );
            } catch (t) {
                return yn.Exception;
            }
        };
    function hf(t) {
        var n = ''.concat(Vu(t));
        t.id && (n += '#'.concat(t.id));
        var i = Ms(t.src, { source: 'log', type: 'debug' });
        return n + '[src='.concat(i, ']');
    }
    var ff,
        vf,
        lf = (function () {
            function t(t, n) {
                var i;
                (this.xi = t),
                    (this.Ht = []),
                    (this.ha = !1),
                    (this.Ot = null !== (i = n.interval) && void 0 !== i ? i : 1e3),
                    (this.fa = n.onFlush);
            }
            return (
                (t.prototype.append = function (t) {
                    this.schedule(), this.Ht.push(t);
                }),
                (t.prototype.flush = function () {
                    (this.ha = !1), this.fa(this.Ht), (this.Ht = []);
                }),
                (t.prototype.schedule = function () {
                    this.ha || (xt.setWindowTimeout(this.xi, Ut(this.flush.bind(this)), this.Ot), (this.ha = !0));
                }),
                t
            );
        })(),
        df = 'https://fs-obfuscated.invalid',
        pf = (function () {
            function t(t, n) {
                (this.xi = t), (this.Ht = n), (this.va = 0), (this.la = {}), (this.mn = !1);
            }
            return (
                (t.prototype.enable = function () {
                    var t = this;
                    (this.mn = !0),
                        (this.da = (function (t) {
                            var n;
                            try {
                                if (
                                    'function' ==
                                    typeof (null === (n = t.crypto) || void 0 === n ? void 0 : n.getRandomValues)
                                ) {
                                    var i = '',
                                        r = new Uint32Array(2);
                                    t.crypto.getRandomValues(r);
                                    for (var e = 0; e < r.length; e++) i += r[e].toString(16);
                                    return i;
                                }
                            } catch (t) {}
                            return xt.mathFloor(1e20 * (xt.mathRandom() + 0.1)).toString(16);
                        })(this.xi)),
                        this.Ht.enqueue({ Kind: cn.URL_SALT, Args: [this.da] }),
                        (this.pa = new lf(this.xi, {
                            interval: 500,
                            onFlush: function (n) {
                                return t.fa(n);
                            },
                        }));
                }),
                (t.prototype.flush = function () {
                    var t;
                    null === (t = this.pa) || void 0 === t || t.flush();
                }),
                (t.prototype.fa = function (t) {
                    0 !== t.length && this.Ht.enqueue({ Kind: cn.URL_ID, Args: t });
                }),
                (t.prototype.record = function (t) {
                    var n;
                    if (this.mn && /^(file|http)/i.test(t)) {
                        var i = this.wa(t, !0),
                            r = i[0];
                        i[1] && (null === (n = this.pa) || void 0 === n || n.append([t, r]));
                    }
                }),
                (t.prototype.ga = function (t) {
                    return this.wa(t, !1)[0];
                }),
                (t.prototype.wa = function (t, n) {
                    var i = t.substring(0, 5e3);
                    if (void 0 === this.la[i]) {
                        var r = this.va++;
                        return (this.la[i] = { id: r, record: n }), [r, n];
                    }
                    var e = !1;
                    return n && ((e = !1 === this.la[i].record), (this.la[i].record = !0)), [this.la[i].id, e];
                }),
                (t.prototype.obfuscateUrl = function (t, n) {
                    return this.mn ? ('css' === n ? this.ma(t) : this.ya(t)) : t;
                }),
                (t.prototype.ma = function (t) {
                    yu(void 0 !== this.da, 'imgurl: salt not defined');
                    var n = Oh(t.substring(0, 5e3) + this.da);
                    return ''.concat(df, '?hash=').concat(n, '&algorithm=fnv32');
                }),
                (t.prototype.ya = function (t) {
                    var n = this.ga(t);
                    return ''.concat(df, '?url-id=').concat(n);
                }),
                t
            );
        })(),
        wf = (function () {
            function t(t) {
                void 0 === t && (t = !1), (this.ba = t);
            }
            return (
                (t.prototype.page = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return [4, je()];
                                case 1:
                                    return (
                                        t.sent(),
                                        [
                                            2,
                                            i(i({}, bf(this.ba)), {
                                                UserIntId: '0',
                                                SessionIntId: '0',
                                                PageIntId: '0',
                                                EmbedToken: '',
                                                PageStart: Kr(),
                                                IsNewSession: !0,
                                                Flags: {
                                                    AjaxWatcher: !0,
                                                    ConsoleWatcher: !0,
                                                    DisableImgUrlPrivacy: !0,
                                                    GetCurrentSession: !0,
                                                    UseClientSideId: !0,
                                                    UseTreeWalker: !0,
                                                },
                                            }),
                                        ]
                                    );
                            }
                        });
                    });
                }),
                (t.prototype.settings = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return [4, je()];
                                case 1:
                                    return t.sent(), [2, bf(this.ba)];
                            }
                        });
                    });
                }),
                (t.prototype.event = function (t) {
                    return this.bundle(t);
                }),
                (t.prototype.bundle = function (t) {
                    var n;
                    return r(this, void 0, _e, function () {
                        var i, r, s, u, o, a;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    (i = Kr()), (r = 0), (e.label = 1);
                                case 1:
                                    return e.trys.push([1, 8, , 9]), [4, je()];
                                case 2:
                                    return (
                                        e.sent(),
                                        (s = t.bundle)[0],
                                        (u = s[1]),
                                        (o = s[2]),
                                        (r = o),
                                        'string' === u.type ? [3, 3] : [3, 5]
                                    );
                                case 3:
                                    return [4, Re(u.data)];
                                case 4:
                                    return (
                                        (a = e.sent()),
                                        (r = null !== (n = null == a ? void 0 : a.byteLength) && void 0 !== n ? n : 0),
                                        [3, 5]
                                    );
                                case 5:
                                    return r > 2e6 ? [4, je()] : [3, 7];
                                case 6:
                                    e.sent(), (e.label = 7);
                                case 7:
                                    return [3, 9];
                                case 8:
                                    return e.sent(), [3, 9];
                                case 9:
                                    return [2, [r, { BundleTime: i }]];
                            }
                        });
                    });
                }),
                (t.prototype.bundleBeacon = function (t) {
                    return !0;
                }),
                (t.prototype.startBeacon = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (t) {
                            return [2, _e.resolve()];
                        });
                    });
                }),
                t
            );
        })(),
        gf = (function () {
            function t() {}
            return (
                (t.prototype.uploadResource = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return [4, je()];
                                case 1:
                                    return t.sent(), [2, fr({ Algorithm: 'fsnv', Hash: '' })];
                            }
                        });
                    });
                }),
                (t.prototype.queryResources = function (t) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return [4, je()];
                                case 1:
                                    return t.sent(), [2, []];
                            }
                        });
                    });
                }),
                t
            );
        })(),
        mf = (function () {
            function t() {
                this._cookies = {};
            }
            return (
                (t.prototype.setDomain = function (t) {}),
                (t.prototype.getValue = function (t, n) {
                    return { cookieValue: this._cookies[t], localStorageValue: void 0 };
                }),
                (t.prototype.setValue = function (t, n, i, r) {
                    this.setCookie(t, n, i);
                }),
                (t.prototype.setCookie = function (t, n, i) {
                    this._cookies[t] = n;
                }),
                (t.prototype.clearCookie = function (t, n) {
                    delete this._cookies[t];
                }),
                Object.defineProperty(t.prototype, 'cookies', {
                    get: function () {
                        return this._cookies;
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                t
            );
        })();
    function yf() {
        try {
            return document.domain;
        } catch (t) {}
        return '';
    }
    function bf(t) {
        return {
            AjaxWatches: [],
            CookieDomain: yf(),
            ElementBlocks: t
                ? []
                : s(
                      s(
                          [],
                          [
                              { Selector: 'input', Consent: !1, Type: wi.Mask },
                              { Selector: 'textarea', Consent: !1, Type: wi.Mask },
                              { Selector: 'select', Consent: !1, Type: wi.Mask },
                              { Selector: '[contenteditable]', Consent: !1, Type: wi.Mask },
                              { Selector: 'input[type=radio]', Consent: !1, Type: wi.Exclude },
                              { Selector: 'input[type=checkbox]', Consent: !1, Type: wi.Exclude },
                          ],
                          !0
                      ),
                      Po,
                      !0
                  ),
            ElementDeferreds: [],
            ElementKeeps: [],
            ElementWatches: [],
            OrgSettings: Ai.DefaultOrgSettings,
            UrlKeeps: [],
            DwellTime: 0,
        };
    }
    ((vf = ff || (ff = {}))[(vf.NoInfoYet = 1)] = 'NoInfoYet'),
        (vf[(vf.Enabled = 2)] = 'Enabled'),
        (vf[(vf.Disabled = 3)] = 'Disabled');
    var Sf,
        kf,
        _f = (function () {
            function t(t, n, i, r, e, s) {
                var u,
                    o = this;
                (this.ut = t),
                    (this.Sa = e),
                    (this.ka = Ai.DefaultOrgSettings),
                    (this._a = !1),
                    (this.Oo = null),
                    (this.jo = []),
                    (this.Aa = Ai.DefaultBundleUploadInterval),
                    (this.Ia = Ai.HeartbeatInterval),
                    (this.Ea = []),
                    (this.Ta = new WeakMap()),
                    (this.Ca = []),
                    (this.vt = new Iu()),
                    (this.xa = ff.NoInfoYet),
                    (this.Ka = !1),
                    (this.Ra = !1),
                    (this.Ma = !1),
                    (this.Oa = !1),
                    (this.ja = {}),
                    (this.Ht = new Kh(
                        t,
                        r,
                        i,
                        function () {
                            return o.Pa.bundleEvents();
                        },
                        n,
                        void 0,
                        s
                    ));
                var a,
                    c = new Gh(t, this.Ht, ut((a = t).window) ? new gf() : new Ys(a));
                (this.Yi = new pf(t.window, this.Ht)),
                    (this.Wn = new Qo()),
                    (this.ks = new Jh(t, this.Ht)),
                    (this.Pa = new th(
                        t,
                        this.Ht,
                        this.ks,
                        this.Wn,
                        this.vt,
                        function (t) {
                            return o._s(t);
                        },
                        function (t) {
                            return o.As(t);
                        },
                        c,
                        this.Yi
                    )),
                    (this.et = t.options.scheme),
                    (this.Ua = t.options.script),
                    (this.Na = t.options.recHost),
                    (this.st = t.options.cdnHost),
                    (this.La = t.options.appHost),
                    (this.ko = t.options.orgId),
                    (this.xi = t.window),
                    (this.Ra =
                        null !== (u = !!Y(t.window, '_fs_skip_iframe_injection', 'boolean')) && void 0 !== u && u),
                    (this.t = this.xi.document);
            }
            return (
                (t.prototype.getPageResponse = function () {
                    return this.Da;
                }),
                (t.prototype.bundleUploadInterval = function () {
                    return this.Aa;
                }),
                (t.prototype.heartbeatInterval = function () {
                    return this.Ia;
                }),
                (t.prototype.setInitConfig = function (t) {
                    this.Fa = t;
                }),
                (t.prototype.start = function (t, n, i) {
                    var r = this;
                    (this.Ba = n), (this.Wa = i), this.Ls();
                    var e = this.xi.Document ? this.xi.Document.prototype : this.xi.document;
                    (this.Ha = mr(e, 'close')),
                        this.Ha &&
                            this.Ha.afterAsync(function () {
                                r.vt.refresh();
                            });
                }),
                (t.prototype.Ls = function () {
                    var t = this;
                    'onpageshow' in this.xi &&
                        this.vt.add(this.xi, 'pageshow', !1, function (n) {
                            t.Ht.manualHibernateCheck(),
                                (null == n ? void 0 : n.persisted) &&
                                    t.Ht.enqueue({ Kind: cn.BFCACHE_STATE, Args: [Kn.Restored] });
                        }),
                        'onpagehide' in this.xi
                            ? this.vt.add(this.xi, 'pagehide', !1, function (n) {
                                  (null == n ? void 0 : n.persisted)
                                      ? (t.Ht.enqueue({ Kind: cn.BFCACHE_STATE, Args: [Kn.Entering] }),
                                        t.Ht.singSwanSong(Ln.Unload))
                                      : t.za();
                              })
                            : this.vt.add(this.xi, 'unload', !1, function () {
                                  t.za();
                              }),
                        this.vt.add(this.xi, 'message', !1, function (n) {
                            var i = n.data;
                            if ('string' == typeof i) {
                                var r = n.source;
                                t.onMessageReceived(r, ef(i));
                            }
                        });
                }),
                (t.prototype.tellAllFramesTo = function (t) {
                    for (var n = 0, i = this.Ea; n < i.length; n++) {
                        var r = i[n];
                        r.contentWindow && rf(r.contentWindow, t);
                    }
                }),
                (t.prototype.queue = function () {
                    return this.Ht;
                }),
                (t.prototype.eventWatcher = function () {
                    return this.Pa;
                }),
                (t.prototype.console = function () {
                    return this.Pa.consoleWatcher();
                }),
                (t.prototype.orgSettings = function () {
                    return this.ka;
                }),
                (t.prototype.onDomLoad = function () {
                    this.Pa.onDomLoad();
                }),
                (t.prototype.onLoad = function () {
                    this.Pa.onLoad();
                }),
                (t.prototype.shutdown = function (t) {
                    (this.Oa = !0),
                        this.tellAllFramesTo([Pi.ShutdownFrame]),
                        this.Pa.stop(t),
                        this.vt && this.vt.clear(),
                        this.Ha && this.Ha.disable();
                }),
                (t.prototype.getCurrentSessionURL = function (t) {
                    var n = this.xa;
                    if (n == ff.NoInfoYet) return null;
                    if (n == ff.Disabled) return ''.concat(this.et, '//').concat(this.La, '/opt/upgrade');
                    var i = this.getCurrentSession();
                    return i
                        ? (t && (i += ':'.concat(this.ut.time.wallTime())),
                          ''
                              .concat(this.et, '//')
                              .concat(this.La, '/ui/')
                              .concat(this.ut.options.orgId, '/')
                              .concat(this._a ? 'client-' : '', 'session/')
                              .concat(encodeURIComponent(i)))
                        : null;
                }),
                (t.prototype.getCurrentSession = function () {
                    return this.getIsSessionReady() ? ''.concat(this.Eo, ':').concat(this.Io) : null;
                }),
                (t.prototype.getIsSessionReady = function () {
                    var t = this.xa;
                    return !(t == ff.NoInfoYet || t == ff.Disabled || !this.Eo || !this.Io);
                }),
                (t.prototype.setConsent = function (t) {
                    var n,
                        i = this;
                    null === (n = this.ut.recording.identity) || void 0 === n || n.getConsentStore().setConsentState(t);
                    var r = function () {
                            i.Wn.setConsent(t), i.Ht.processEvents();
                        },
                        e = function () {
                            i.Ht.enqueue({ Kind: cn.SYS_SETCONSENT, Args: [t, Un.Document] });
                        };
                    switch (t) {
                        case jn.GrantConsent:
                            e(), r();
                            break;
                        case jn.RevokeConsent:
                            r(), e();
                    }
                    this.tellAllFramesTo([Pi.SetConsent, t]);
                }),
                (t.prototype.pageSignature = function () {
                    return ''.concat(this.Eo, ':').concat(this.Io, ':').concat(this._o);
                }),
                (t.prototype.getBundleApiVersion = function () {
                    return this._a ? 'v2' : 'v1';
                }),
                (t.prototype.qa = function (t) {
                    void 0 === t && (t = !1);
                    var n = Y(this.xi, '_fs_ready', 'function');
                    if (n)
                        try {
                            t ? n(!0) : n();
                        } catch (t) {
                            'exception in _fs_ready(): '.concat(t);
                        }
                }),
                (t.prototype.za = function () {
                    this.Ht.addUnload(Ln.Unload), to.stopAll();
                }),
                (t.prototype.$a = function (t, n) {
                    var i,
                        r,
                        e,
                        s,
                        u = t.Flags,
                        o = u.AjaxWatcher,
                        a = u.ClientSideRageClick,
                        c = u.DisableImgUrlPrivacy,
                        h = u.GetCurrentSession,
                        f = u.ResourceUploading,
                        v = u.UseClientSideId,
                        l = u.UseTreeWalker;
                    (this.Da = t),
                        (this.Eo = t.UserIntId),
                        (this.Io = t.SessionIntId),
                        (this._o = t.PageIntId),
                        (this.Ao = t.PageStart),
                        (this.xa = h ? ff.Enabled : ff.Disabled),
                        (this.ka = t.OrgSettings),
                        Ns(
                            null !== (i = this.ka.UrlPrivacyConfig) && void 0 !== i
                                ? i
                                : Ai.DefaultOrgSettings.UrlPrivacyConfig,
                            this.ka.MaxUrlLength
                        );
                    var d = null !== (r = this.ka.AttributeBlocklist) && void 0 !== r ? r : [];
                    (null === (s = null === (e = this.Fa) || void 0 === e ? void 0 : e.privacy) || void 0 === s
                        ? void 0
                        : s.attributeBlocklist) &&
                        ('adding '.concat(
                            this.Fa.privacy.attributeBlocklist.length,
                            ' client defined attribute block rules.'
                        ),
                        d.push.apply(d, this.Fa.privacy.attributeBlocklist.map(Qs))),
                        $s(d),
                        l && (Sn = !0),
                        c || this.Yi.enable(),
                        this.Pa.consoleWatcher().initializeMaxLogsPerPage(this.ka.MaxConsoleLogPerPage),
                        this.Pa.ajaxWatcher().initialize({
                            requests: this.ka.HttpRequestHeadersAllowlist,
                            responses: this.ka.HttpResponseHeadersAllowlist,
                            maxAjaxPayloadLength: this.ka.MaxAjaxPayloadLength,
                        }),
                        this.Pa.perfWatcher().initialize({
                            resourceUploader: this.Pa.getResourceUploader(),
                            recTimings: !!this.ka.RecordPerformanceResourceTiming,
                            recImgs: !!this.ka.RecordPerformanceResourceImg,
                            maxPerfMarksPerPage: this.ka.MaxPerfMarksPerPage,
                        }),
                        this.Wn.initialize({
                            canvasWatcherMode: t.Flags.CanvasWatcherMode,
                            blocks: t.ElementBlocks,
                            deferreds: t.ElementDeferreds,
                            keeps: t.ElementKeeps,
                            watches: t.ElementWatches,
                            noDefaultExclusions: ct(this.ut.window),
                        }),
                        this.ks.initialize(t.UrlKeeps),
                        this.Wn.initializeConsent(n),
                        'number' == typeof t.BundleUploadInterval && (this.Aa = t.BundleUploadInterval),
                        'number' == typeof t.HeartbeatInterval && (this.Ia = t.HeartbeatInterval),
                        f && this.Va(),
                        o && t.AjaxWatches && this.Pa.ajaxWatcher().setWatches(t.AjaxWatches),
                        a && this.Ht.enableEasyBake(),
                        v && (this._a = !0),
                        this.Pa.start(t.Flags);
                }),
                (t.prototype.Ga = function () {
                    var t;
                    this.Ba &&
                        this.Ba({
                            sessionUrl: null !== (t = this.getCurrentSessionURL()) && void 0 !== t ? t : '',
                            settings: this.ka,
                        });
                }),
                (t.prototype.Qa = function () {
                    this.Wa && this.Wa();
                }),
                (t.prototype.Va = function () {
                    (this.Ka = !0), this.Pa.initResourceUploading();
                }),
                (t.prototype.Xa = function () {
                    if (this.Ca.length > 0) {
                        for (var t = 0; t < this.Ca.length; t++) this.Ca[t]();
                        this.Ca = [];
                    }
                }),
                (t.prototype.Ya = function (t) {
                    var n = this;
                    this.ut.measurer.enqueue(function () {
                        var i = hf(t),
                            r = n.Sa({
                                frame: t,
                                orgId: n.ko,
                                scheme: n.et,
                                script: n.Ua,
                                recHost: n.Na,
                                cdnHost: n.st,
                                appHost: n.La,
                                namespace: W(n.xi),
                                desc: i,
                                snippetVersion: lt(n.xi),
                            });
                        (r !== yn.MissingDocumentHead &&
                            r !== yn.MissingBodyOrChildren &&
                            r !== yn.NoNonScriptElement) ||
                            !t.contentDocument ||
                            new MutationObserver(function (i, r) {
                                n.Ya(t), r.disconnect();
                            }).observe(t.contentDocument, { childList: !0, subtree: !0 }),
                            n.Ht.enqueue({ Kind: cn.FRAME_STATUS, Args: [Vu(t), i, r] });
                    });
                }),
                (t.prototype.Ja = function () {
                    var t, n;
                    (null === (t = this.Fa) || void 0 === t ? void 0 : t.privacy) &&
                        this.Ht.enqueue({
                            Kind: cn.INIT_API,
                            Args: [
                                'privacy',
                                [
                                    'attributeBlocklist',
                                    (null !== (n = this.Fa.privacy.attributeBlocklist) && void 0 !== n ? n : []).map(
                                        function (t) {
                                            return [t.target, t.tag, t.name, t.action, t.type];
                                        }
                                    ),
                                ],
                            ],
                        });
                }),
                (t.prototype._s = function (t) {
                    var n = Vu(t);
                    if (n) {
                        this.Ea.push(t);
                        var i = !1;
                        if (t.contentWindow)
                            try {
                                i = !!z(t.contentWindow);
                            } catch (t) {
                                i = !0;
                            }
                        var r = (function (t) {
                                var n = t.src,
                                    i = ''.concat(location.protocol, '//').concat(location.host);
                                return !n || 'about:blank' == n || er(n, 'javascript:') || er(n, i);
                            })(t),
                            e = t.contentWindow && t.contentWindow.postMessage;
                        (r && !i) || !e
                            ? r
                                ? this.Za(t)
                                : "Frame Doesn't need injecting. Probably cross domain ".concat(hf(t))
                            : this.tc(t, n);
                    } else 'fsid missing or invalid for iFrame '.concat(hf(t));
                }),
                (t.prototype.tc = function (t, n) {
                    var i = [Pi.GreetFrame, n];
                    t.contentWindow && t.contentWindow.postMessage
                        ? ('Cross-origin iframe '.concat(hf(t)), uf(this.xi, t, i) || rf(t.contentWindow, i))
                        : 'No content window on init of cross-origin iframe '.concat(hf(t));
                }),
                (t.prototype.Za = function (t) {
                    var n = this;
                    if (this.Ra)
                        'skipped same-origin iframe injection for '.concat(
                            hf(t),
                            ' because _fs_skip_iframe_injection is set to true'
                        );
                    else {
                        'Attempting to setup Frame '.concat(hf(t)), this.Ya(t);
                        var i = this.vt.add(
                            t,
                            'load',
                            !1,
                            wu.wrap(function () {
                                'onload for frame '.concat(hf(t)), n.Ya(t);
                            })
                        );
                        this.Ta.set(t, i);
                    }
                }),
                (t.prototype.As = function (t) {
                    if (Vu(t)) {
                        var n = this.Ta.get(t);
                        void 0 !== n && (Au(n), this.Ta['delete'](t)),
                            (this.Ea = this.Ea.filter(function (n) {
                                return n !== t;
                            }));
                    }
                }),
                (t.prototype.onMessageReceived = function (t, n) {
                    if (!t || t.parent == this.xi)
                        switch (n[0]) {
                            case Pi.EvtBundle:
                                var i = n[1],
                                    r = n[2],
                                    e = this.pageSignature();
                                if (e !== r)
                                    return (
                                        Zu(
                                            { msg: 'Page signature mismatch', pageSignature: e, messageSignature: r },
                                            1024
                                        ),
                                        void (t && rf(t, [Pi.ShutdownFrame]))
                                    );
                                i.length > 0 && this.Ht.sendEvents(e, i);
                                break;
                            case Pi.RequestFrameId:
                                if (!t) return;
                                var s = this.nc(t);
                                if (void 0 === s);
                                else {
                                    var u = Vu(s);
                                    'Responding to FID request for frame '.concat(u), (this.ja[u] = !1), this.ic(s, u);
                                }
                            case Pi.Unknown:
                        }
                }),
                (t.prototype.nc = function (t) {
                    for (var n = 0, i = this.Ea; n < i.length; n++) {
                        var r = i[n];
                        if (r.contentWindow === t) return r;
                    }
                }),
                (t.prototype.ic = function (t, n) {
                    var i = this,
                        r = function () {
                            var r,
                                e = [];
                            0 != i.Oo && null !== i.Oo && (e = i.jo ? i.jo.concat(i.Oo) : [i.Oo]);
                            var s = i.ut.time.startTime(),
                                u = [
                                    Pi.SetFrameId,
                                    n,
                                    e,
                                    s,
                                    i.et,
                                    i.Ua,
                                    i.La,
                                    i.ko,
                                    i.Fa,
                                    i.Da,
                                    null !== (r = i.Wn.getConsent()) && void 0 !== r ? r : jn.RevokeConsent,
                                    i.ut.time.now(),
                                ];
                            uf(i.xi, t, u) || rf(t.contentWindow, u);
                        };
                    null == this.Oo ? this.Ca.push(r) : r();
                }),
                (t.prototype.rc = function (t) {
                    var n, i, r;
                    if (!this.Ma)
                        if (
                            null === (i = null === (n = this.Da) || void 0 === n ? void 0 : n.Flags) || void 0 === i
                                ? void 0
                                : i.FetchIntegrations
                        ) {
                            'string' != typeof Y((r = this.ut.window), '_fs_rec_settings_host') &&
                                (r._fs_rec_settings_host = V(dt(r)));
                            var e = this.t.createElement('script');
                            t && (e.addEventListener('load', t), e.addEventListener('error', t)),
                                (e.async = !0),
                                (e.src = ''
                                    .concat(this.et, '//')
                                    .concat(this.Na, '/rec/integrations?OrgId=')
                                    .concat(this.ko, '&isInFrame=')
                                    .concat(this.ut.recording.inFrame, '&isNative=')
                                    .concat(this.ut.recording.inWebView)),
                                this.t.head.appendChild(e),
                                (this.Ma = !0);
                        } else t && t();
                }),
                (t.prototype.ec = function (t) {
                    var n = this;
                    this.ut.measurer.enqueue(function () {
                        n.Ht.enqueue({ Kind: cn.DOCUMENT_PROPERTIES, Args: [Vu(t.scrollingElement), t.compatMode] });
                    });
                }),
                t
            );
        })();
    function Af(t) {
        var n,
            i,
            r,
            e,
            s,
            u,
            o,
            a,
            c =
                (null !== (i = null === (n = t.ElementBlocks) || void 0 === n ? void 0 : n.length) && void 0 !== i
                    ? i
                    : 0) > 0 &&
                (null !==
                    (s =
                        null === (e = null === (r = t.OrgSettings) || void 0 === r ? void 0 : r.UrlPrivacyConfig) ||
                        void 0 === e
                            ? void 0
                            : e.length) && void 0 !== s
                    ? s
                    : 0) > 0 &&
                (null !==
                    (a =
                        null === (o = null === (u = t.OrgSettings) || void 0 === u ? void 0 : u.AttributeBlocklist) ||
                        void 0 === o
                            ? void 0
                            : o.length) && void 0 !== a
                    ? a
                    : 0) > 0;
        return c || wu.send('Invalid page response', 'error', { rsp: t }), c;
    }
    ((kf = Sf || (Sf = {})).START = 'start'),
        (kf.SHUTDOWN = 'shutdown'),
        (kf.INTERNAL_BUNDLE = 'internal/bundle'),
        (kf.INTERNAL_ERROR = 'internal/error'),
        (kf.INTERNAL_FS_INIT = 'internal/fs-init');
    var If = [Sf.START, Sf.SHUTDOWN, Sf.INTERNAL_BUNDLE, Sf.INTERNAL_ERROR, Sf.INTERNAL_FS_INIT];
    function Ef(t) {
        var n = t.Seq,
            i = fr(t);
        return [n, { data: i, type: 'string' }, i.length];
    }
    function Tf(t, n) {
        var i;
        return new _e(function (r) {
            var e = fa(ga, function (s) {
                for (var u = 0, o = s; u < o.length; u++)
                    o[u].entryType === ga &&
                        (i
                            ? (i.stop(), i.start())
                            : ((i = new t(function () {
                                  null == e || e.disconnect(), r();
                              }, 1e3).start()),
                              null == n || n(i)));
            });
            !(function (t, n, i, s) {
                var u = new i(function () {
                    null == e || e.disconnect(), r();
                }, 4e3).start();
                null == s || s(u);
            })(0, 0, t, n);
        });
    }
    var Cf = (function () {
        function t(t, n) {
            (this.sc = t),
                (this.uc = n),
                (this.oc = { stored: 0, inStorage: 0, currentSize: 0, totalSize: 0, key: t, nextSeq: 1 });
        }
        return (
            (t.prototype.store = function (t, n) {
                return this.ac(t, n);
            }),
            (t.prototype.retrieve = function (t) {
                var n = void 0 === t ? {} : t,
                    i = n.validate,
                    r = n.keyMeta,
                    e = (function (t, n) {
                        var i = [];
                        try {
                            for (var r = Kf(t, n), e = 0, s = r; e < s.length; e++) {
                                var u = s[e],
                                    o = localStorage.getItem(u);
                                if (o) {
                                    localStorage.removeItem(u);
                                    var a = xf(o);
                                    a && i.push(a);
                                }
                            }
                        } catch (t) {}
                        return i;
                    })(this.sc, r);
                return i ? e.filter(i) : e;
            }),
            (t.prototype.ac = function (t, n) {
                try {
                    var r = (function (t, n) {
                            var i = Kf(t, n),
                                r = i.length ? Rf(i[i.length - 1]) + 1 : 1;
                            return [r, Mf(t, r, n), i.length];
                        })(this.sc, n),
                        e = r[0],
                        s = r[1],
                        u = r[2],
                        o = fr(t),
                        a = o.length;
                    return (
                        !this.cc(a) &&
                        (this.oc.stored++,
                        (this.oc.inStorage = u + 1),
                        (this.oc.nextSeq = e),
                        (this.oc.currentSize = a),
                        (this.oc.totalSize += a),
                        localStorage.setItem(s, o),
                        !0)
                    );
                } catch (t) {
                    return (
                        (function (t) {
                            return (
                                t instanceof DOMException &&
                                (22 === t.code ||
                                    1014 === t.code ||
                                    'QuotaExceededError' === t.name ||
                                    'NS_ERROR_DOM_QUOTA_REACHED' === t.name)
                            );
                        })(t) && Su('Quota Exceeded: '.concat(this.sc), i(i({}, this.oc), { message: qc(t), err: t })),
                        !1
                    );
                }
            }),
            (t.prototype.cc = function (t) {
                return !!this.uc && t > this.uc;
            }),
            t
        );
    })();
    function xf(t) {
        try {
            return pr(t);
        } catch (t) {
            return;
        }
    }
    function Kf(t, n) {
        var i,
            r = [],
            e = '^'.concat(t, ':\\d+$');
        n && (e = '^'.concat(t, ':').concat(n, ':\\d+$'));
        var s = new RegExp(e);
        try {
            for (var u = 0; u < localStorage.length; u++) {
                var o = null !== (i = localStorage.key(u)) && void 0 !== i ? i : '';
                s.test(o) && r.push(o);
            }
        } catch (t) {}
        return r.sort(function (t, n) {
            return Rf(t) - Rf(n);
        });
    }
    function Rf(t) {
        var n;
        return null !== (n = Yi(t.slice(t.lastIndexOf(':') + 1))) && void 0 !== n ? n : 0;
    }
    function Mf(t, n, i) {
        return i ? ''.concat(t, ':').concat(i, ':').concat(n) : ''.concat(t, ':').concat(n);
    }
    function Of(t, n, i, s) {
        return (
            void 0 === i && (i = io),
            r(this, void 0, _e, function () {
                var u,
                    o,
                    a,
                    c,
                    h,
                    f,
                    v = this;
                return e(this, function (l) {
                    switch (l.label) {
                        case 0:
                            if (!Gi(n) || 0 === n.length) return [2];
                            (o = !1),
                                (a = function (n) {
                                    return r(v, void 0, _e, function () {
                                        var i, r, s, a, c;
                                        return e(this, function (e) {
                                            switch (e.label) {
                                                case 0:
                                                    return (
                                                        e.trys.push([0, 2, , 3]),
                                                        (i = n.bundle),
                                                        (r = i[0]),
                                                        (s = i[2]),
                                                        'Sending '
                                                            .concat(s, ' trailing bytes from last session as Seq ')
                                                            .concat(r),
                                                        void 0 !== u && (n.serverBundleTime = u),
                                                        [4, t.bundle(n)]
                                                    );
                                                case 1:
                                                    return (
                                                        (a = e.sent()), (c = a[1]), (u = c.BundleTime), [2, yh.NoRetry]
                                                    );
                                                case 2:
                                                    return Fr(e.sent()) ? ((o = !0), [2, yh.NoRetry]) : [3, 3];
                                                case 3:
                                                    return [2, yh.Retry];
                                            }
                                        });
                                    });
                                }),
                                (c = 0),
                                (h = n),
                                (l.label = 1);
                        case 1:
                            return c < h.length
                                ? ((f = h[c]), !o && f && f.bundle ? [4, Eh(a.bind(null, f), i, s)] : [2])
                                : [3, 4];
                        case 2:
                            l.sent(), (l.label = 3);
                        case 3:
                            return c++, [3, 1];
                        case 4:
                            return [2];
                    }
                });
            })
        );
    }
    var jf = (function () {
        function t(t, n, i) {
            void 0 === i && (i = io);
            var r = this;
            (this.ut = t),
                (this.co = n),
                (this.ho = i),
                (this.hc = new Cf('_fs_songs', 2e6)),
                (this.fc = new i(function () {
                    r.sing();
                }, 2e3)),
                this.vc();
        }
        return (
            (t.prototype.vc = function () {
                return r(this, void 0, _e, function () {
                    var t,
                        n = this;
                    return e(this, function (i) {
                        switch (i.label) {
                            case 0:
                                return (
                                    (t = function (t) {
                                        n.lc = t;
                                    }),
                                    [4, Tf(this.ho, t)]
                                );
                            case 1:
                                return i.sent(), this.sing(), [2];
                        }
                    });
                });
            }),
            (t.prototype.store = function (t, n) {
                if (!ut(this.ut.window)) {
                    'Saving '.concat(t.bundles.length, ' bundles in swan-song.');
                    for (var i = 0, r = t.bundles; i < r.length; i++)
                        if ('string' !== r[i][1].type) return void Su('song arraybuffer not supported');
                    var e = {
                        Bundles: t.bundles,
                        IsNewSession: t.isNewSession,
                        LastBundleTime: t.lastBundleTime,
                        OrgId: t.orgId,
                        PageId: t.pageId,
                        PageStartTime: this.ut.time.startTime(),
                        RecHost: hu(this.ut),
                        ServerBundleTime: t.serverBundleTime,
                        ServerPageStart: t.serverPageStart,
                        SessionId: t.sessionId,
                        UserId: t.userId,
                        Version: t.version,
                    };
                    this.hc.store(e), this.fc.isRunning() || this.fc.start();
                }
            }),
            (t.prototype.stop = function () {
                this.fc.stop();
            }),
            (t.prototype.sing = function () {
                return r(this, void 0, _e, function () {
                    return e(this, function (t) {
                        switch (t.label) {
                            case 0:
                                return ut(this.ut.window) ? [2] : [4, this.dc(this.hc.retrieve())];
                            case 1:
                                return t.sent(), [4, this.wc(Pf('_fs_song'))];
                            case 2:
                                return t.sent(), [4, this.wc(Pf('_fs_swan_song'))];
                            case 3:
                                return t.sent(), [2];
                        }
                    });
                });
            }),
            (t.prototype.dc = function (t) {
                return r(this, void 0, _e, function () {
                    var n, i;
                    return e(this, function (r) {
                        switch (r.label) {
                            case 0:
                                if (!t.length) return [2];
                                (n = t.length - 1), (r.label = 1);
                            case 1:
                                return n >= 0 ? ((i = t[n]), [4, this.wc(i)]) : [3, 4];
                            case 2:
                                r.sent(), (r.label = 3);
                            case 3:
                                return n--, [3, 1];
                            case 4:
                                return [2];
                        }
                    });
                });
            }),
            (t.prototype.wc = function (t) {
                return r(this, void 0, _e, function () {
                    var n,
                        i,
                        r = this;
                    return e(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return (
                                    e.trys.push([0, 2, , 3]),
                                    void 0 !== t && t.Bundles && t.UserId && t.SessionId && t.PageId
                                        ? ('Sending '.concat(t.Bundles.length, ' bundles as prior page swan song'),
                                          (n = t.Bundles.reduce(function (n, i, e) {
                                              var s = e === t.Bundles.length - 1;
                                              return (
                                                  n.push({
                                                      bundle: i,
                                                      isNewSession: t.IsNewSession,
                                                      orgId: t.OrgId,
                                                      pageId: t.PageId,
                                                      recHost: t.RecHost,
                                                      serverBundleTime: t.ServerBundleTime,
                                                      serverPageStart: t.ServerPageStart,
                                                      sessionId: t.SessionId,
                                                      userId: t.UserId,
                                                      version: t.Version,
                                                      deltaT: s ? r.ut.time.wallTime() - (t.LastBundleTime || 0) : null,
                                                  }),
                                                  n
                                              );
                                          }, [])),
                                          [
                                              4,
                                              Of(this.co, n, this.ho, function (t) {
                                                  r.Co = t;
                                              }),
                                          ])
                                        : [2]
                                );
                            case 1:
                                return e.sent(), [3, 3];
                            case 2:
                                return (i = e.sent()), 'Error recovering swan-song: '.concat(i), [3, 3];
                            case 3:
                                return [2];
                        }
                    });
                });
            }),
            t
        );
    })();
    function Pf(t) {
        try {
            if (t in localStorage) {
                var n = localStorage[t];
                return (
                    delete localStorage[t],
                    ((i = pr(n)).Bundles = (function (t) {
                        for (var n = [], i = 0, r = t.Bundles; i < r.length; i++) {
                            var e = r[i];
                            Gi(e) ? n.push(e) : n.push(Ef(e));
                        }
                        return n;
                    })(i)),
                    i
                );
            }
        } catch (t) {
            'Error purging swan-song: '.concat(t);
        }
        var i;
    }
    var Uf = (function () {
            function t(t, n) {
                var i;
                (this.ut = t),
                    (this.co = n),
                    (this.gc = !1),
                    (this.mc = 0),
                    (this.yc = !1),
                    (this.hc = new Cf('_fs_bundle')),
                    (this.bc = !1),
                    (this.Sc = t.time.now()),
                    yu(!!this.ut.recording.identity, 'unexpected undefined identity'),
                    (this.kc = null === (i = this.ut.recording.identity) || void 0 === i ? void 0 : i.getClientStore());
            }
            return (
                (t.prototype.init = function (t) {
                    var n, i, r, e, s;
                    this._c = t;
                    var u = null !== (n = t.minDwellTime) && void 0 !== n ? n : 0;
                    if (
                        ((this.mc = 1e3 * xt.mathMin(u, 10)),
                        (this.Sc = this.ut.time.now()),
                        this.mc &&
                            this.co.startBeacon({
                                orgId: (null === (i = this._c) || void 0 === i ? void 0 : i.orgId) || '',
                                userId: (null === (r = this._c) || void 0 === r ? void 0 : r.userId) || '',
                                sessionId: (null === (e = this._c) || void 0 === e ? void 0 : e.sessionId) || '',
                            }),
                        t.isNewSession || 0 === this.mc)
                    )
                        return [];
                    var o = this.retrieve(t, !0);
                    return null === (s = this.kc) || void 0 === s || s.setValue(qi, t.sessionId, ''), o;
                }),
                (t.prototype.store = function (t) {
                    return this.hc.store(t, t.orgId) ? ((this.gc = !0), !0) : ((this.yc = !0), !1);
                }),
                (t.prototype.retrieve = function (t, n) {
                    var i = this;
                    void 0 === n && (n = !1);
                    var r = this.hc.retrieve({
                        keyMeta: t.orgId,
                        validate: function (t) {
                            return i.Ac(t, n);
                        },
                    });
                    return (this.gc = !1), r;
                }),
                (t.prototype.Ac = function (t, n) {
                    void 0 === n && (n = !1);
                    try {
                        if (
                            t &&
                            this._c &&
                            this._c.orgId === t.orgId &&
                            this._c.userId === t.userId &&
                            this._c.sessionId === t.sessionId &&
                            (n || this._c.pageId === t.pageId)
                        )
                            return !0;
                    } catch (t) {}
                    return !1;
                }),
                (t.prototype.getState = function () {
                    return this.Ic() ? (this.gc ? Ti.ShouldFlush : Ti.Inactive) : Ti.Pending;
                }),
                (t.prototype.Ic = function () {
                    var t, n;
                    if (
                        this.bc ||
                        !(null === (t = this._c) || void 0 === t ? void 0 : t.isNewSession) ||
                        0 === this.mc ||
                        this.yc
                    )
                        return !0;
                    if (this.ut.time.now() - this.Sc > this.mc) return !0;
                    var i = null === (n = this.kc) || void 0 === n ? void 0 : n.getValue(qi);
                    return (
                        ((null == i ? void 0 : i.cookieValue) || (null == i ? void 0 : i.localStorageValue)) ===
                            this._c.sessionId && ((this.bc = !0), !0)
                    );
                }),
                t
            );
        })(),
        Nf = (function () {
            function t(t, n, i, r, e, s, u) {
                void 0 === r && (r = no),
                    void 0 === e && (e = io),
                    void 0 === s && (s = new Uf(t, n)),
                    (this.ut = t),
                    (this.co = n),
                    (this.Pu = i),
                    (this.Ro = r),
                    (this.ho = e),
                    (this.Ec = s),
                    (this.Tc = u),
                    (this.Cc = !1),
                    (this.xc = 0),
                    (this.Kc = 0),
                    (this.Rc = 0),
                    (this.So = !1),
                    (this.vo = 0),
                    (this.Mc = []),
                    (this.Oc = Kr()),
                    (this.et = t.options.scheme),
                    (this.jc = t.time.wallTime()),
                    (this.Pc = new jf(t, this.co, e)),
                    (this.yo = Ih(this.ut));
            }
            return (
                (t.prototype.addEndMarkerEvent = function (t) {
                    this.yo.addEndMarkerEvent(t);
                }),
                (t.prototype.scheme = function () {
                    return this.et;
                }),
                (t.prototype.enqueueEvents = function (t, n) {
                    for (var i = 0, r = n; i < r.length; i++) {
                        var e = r[i];
                        this.yo.add(e);
                    }
                }),
                (t.prototype.Uc = function () {
                    return this.ut.recording.bundleUploadInterval();
                }),
                (t.prototype.initUploadTicker = function () {
                    (this.Oc = Kr()), (this.Nc = new this.Ro(this.Uc()));
                }),
                (t.prototype.startPipeline = function (t) {
                    var n,
                        i = this;
                    (this.ko = t.orgId),
                        (this.Eo = t.userId),
                        (this.Io = t.sessionId),
                        (this._o = t.pageId),
                        (this.Ao = t.serverPageStart),
                        (this.So = t.isNewSession),
                        this.yo.init(),
                        this.Lc(this.Ec.init(t), this.ho),
                        Ie(this.Uc() / 2).then(function () {
                            i.ut.recording.flags().UseMinNetworkBudget && i.Dc({ bypassMinBudget: !0 }), i.Fc();
                        }),
                        this.Nc || this.initUploadTicker(),
                        null === (n = this.Nc) ||
                            void 0 === n ||
                            n.start(function () {
                                i.ut.recording.flags().UseMinNetworkBudget &&
                                    Kr() - i.Oc >= 2e4 &&
                                    ((i.Oc = Kr()), i.Dc({ bypassMinBudget: !0 })),
                                    i.Fc();
                            });
                }),
                (t.prototype.stopPipeline = function () {
                    this.Nc && this.Nc.stop(),
                        (this.yo = Ih(this.ut, this.yo)),
                        (this.Mc = []),
                        this.Pc.stop(),
                        (this.ko = void 0),
                        (this.Eo = void 0),
                        (this.Io = void 0),
                        (this._o = void 0),
                        (this.Ao = void 0),
                        (this.So = !1);
                }),
                (t.prototype.send = function (t) {
                    var n, i;
                    return r(this, void 0, _e, function () {
                        var r, s;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    switch (
                                        ((r = null !== (n = null == t ? void 0 : t.mode) && void 0 !== n ? n : 'flush'),
                                        (s =
                                            null !== (i = null == t ? void 0 : t.reason) && void 0 !== i
                                                ? i
                                                : Ln.Unknown),
                                        r)
                                    ) {
                                        case 'flush':
                                            return [3, 1];
                                        case 'sing':
                                            return [3, 3];
                                    }
                                    return [3, 4];
                                case 1:
                                    return this.Dc({ flush: !0 }), [4, this.Bc()];
                                case 2:
                                    return e.sent(), [3, 5];
                                case 3:
                                    return this.Wc(s), [3, 5];
                                case 4:
                                    Le(), (e.label = 5);
                                case 5:
                                    return [2];
                            }
                        });
                    });
                }),
                (t.prototype.Wc = function (t) {
                    if ((this.Dc({ flush: !0 }), this.Hc(this.zc))) yu(!this.zc, '_pendingBundle in dwell period');
                    else {
                        var n = [];
                        this.zc && n.push(this.zc);
                        for (var r = 0, e = this.Mc; r < e.length; r++) {
                            var s = e[r];
                            n.push(s);
                        }
                        var u = this.qc(n);
                        if (u) {
                            this.Pc.store(u, t);
                            for (
                                var o = 0, a = n;
                                o < a.length &&
                                ((s = a[o]), this.co.bundleBeacon(i(i({}, u), { bundle: s, deltaT: null })));
                                o++
                            );
                        }
                    }
                }),
                (t.prototype.qc = function (t) {
                    if (t.length) {
                        if (this.ko && this.Eo && this.Io && this._o && void 0 !== this.Ao)
                            return {
                                bundles: t,
                                isNewSession: this.So,
                                lastBundleTime: this.jc,
                                orgId: this.ko,
                                pageId: this._o,
                                serverBundleTime: this.vo,
                                serverPageStart: this.Ao,
                                sessionId: this.Io,
                                userId: this.Eo,
                                version: this.ut.recording.bundleApiVersion(),
                            };
                        'unable to build stored bundle. one or more of orgId:'
                            .concat(this.ko, ' | userId:')
                            .concat(this.Eo, ' | sessionId:')
                            .concat(this.Io, ' | pageId:')
                            .concat(this._o, ' | serverPageStart:')
                            .concat(this.Ao, ' are undefined');
                    }
                }),
                (t.prototype.$c = function () {
                    var t;
                    if (this.ko && this.Eo && this.Io) {
                        for (var n = [], i = 0, r = this.Ec.retrieve({ orgId: this.ko }); i < r.length; i++) {
                            var e = r[i];
                            n.push.apply(n, e.bundles);
                        }
                        (t = this.Mc).unshift.apply(t, n);
                    }
                }),
                (t.prototype.Hc = function (t) {
                    switch (this.Ec.getState()) {
                        case Ti.Pending:
                            var n = t ? s([t], this.Mc, !0) : this.Mc,
                                i = this.qc(n);
                            if (!i) return !1;
                            var r = this.Ec.store(i);
                            return r ? (this.Mc = []) : this.$c(), r;
                        case Ti.ShouldFlush:
                            return this.$c(), !1;
                        case Ti.Inactive:
                        default:
                            return !1;
                    }
                }),
                (t.prototype.Fc = function () {
                    return r(this, void 0, _e, function () {
                        return e(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return this.zc ? (this.Cc && this.Vc(), [2]) : (this.Dc(), [4, this.Bc()]);
                                case 1:
                                    return t.sent(), [2];
                            }
                        });
                    });
                }),
                (t.prototype.Dc = function (t) {
                    void 0 === t && (t = {});
                    var n = this.yo.nextBundle(t);
                    n && this.Mc.push(n);
                }),
                (t.prototype.Bc = function () {
                    return r(this, void 0, _e, function () {
                        return e(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return this._o && this.Ao && !this.zc && 0 != this.Mc.length
                                        ? this.Hc()
                                            ? [2]
                                            : ((this.zc = this.Mc.shift()), [4, this.Vc()])
                                        : [2];
                                case 1:
                                    return t.sent(), [2];
                            }
                        });
                    });
                }),
                (t.prototype.Vc = function () {
                    var t;
                    return r(this, void 0, _e, function () {
                        var n, i, r, s;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    if ((n = this.ut.time.wallTime()) < this.Kc) return [2];
                                    if (!(i = this.zc)) return [2];
                                    (this.Cc = !1), (this.Rc = this.jc = n), (e.label = 1);
                                case 1:
                                    return e.trys.push([1, 5, , 6]), [4, this.Gc(i)];
                                case 2:
                                    return (r = e.sent())
                                        ? ((this.vo = r.BundleTime),
                                          (this.zc = void 0),
                                          (this.Kc = 0),
                                          (this.xc = 0),
                                          this.ut.time.wallTime() - this.Rc > this.Uc() ? [4, this.Bc()] : [3, 4])
                                        : [2];
                                case 3:
                                    e.sent(), (e.label = 4);
                                case 4:
                                    return [3, 6];
                                case 5:
                                    if ((s = e.sent()) instanceof Lr) {
                                        if (Dr(s.status))
                                            return (
                                                206 === s.status ||
                                                    (s.status >= 500 &&
                                                        wu.send(
                                                            'Failed to send bundle, recording outage likely',
                                                            'error',
                                                            { err: s }
                                                        )),
                                                null === (t = this.Tc) || void 0 === t || t.call(this),
                                                [2]
                                            );
                                    } else wu.send('Failed to send bundle, unknown err', 'error', { err: s });
                                    return (this.Cc = !0), (this.Kc = this.Rc + Th(this.xc++)), [3, 6];
                                case 6:
                                    return [2];
                            }
                        });
                    });
                }),
                (t.prototype.Gc = function (t) {
                    var n;
                    return r(this, void 0, _e, function () {
                        var i, r, s, u, o;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return this.ko && this.Eo && this.Io && this._o
                                        ? (window,
                                          (i = this.Pu.getMsSinceLastUserActivity()),
                                          [
                                              4,
                                              this.co.bundle({
                                                  bundle: t,
                                                  deltaT: null,
                                                  isNewSession: this.So,
                                                  lastUserActivity: i,
                                                  orgId: this.ko,
                                                  pageId: this._o,
                                                  serverBundleTime: this.vo,
                                                  serverPageStart: this.Ao,
                                                  sessionId: this.Io,
                                                  userId: this.Eo,
                                                  version: this.ut.recording.bundleApiVersion(),
                                              }),
                                          ])
                                        : ('unable to send bundle. one or more of orgId:'
                                              .concat(this.ko, ' | userId:')
                                              .concat(this.Eo, ' | sessionId:')
                                              .concat(this.Io, ' | pageId:')
                                              .concat(this._o, ' are undefined'),
                                          [2]);
                                case 1:
                                    return (
                                        (r = e.sent()),
                                        (s = r[0]),
                                        (u = r[1]),
                                        null === (n = this.ut.recording.observer) ||
                                            void 0 === n ||
                                            n.addEvent({ type: Sf.INTERNAL_BUNDLE, data: { size: s } }),
                                        (o = t[0]),
                                        s > 16e6 &&
                                            o >= 16 &&
                                            ('splitting large page: '.concat(s), this.ut.recording.splitPage(Ln.Size)),
                                        window,
                                        [2, u]
                                    );
                            }
                        });
                    });
                }),
                (t.prototype.Lc = function (t, n) {
                    return r(this, void 0, _e, function () {
                        var i,
                            r = this;
                        return e(this, function (e) {
                            return 0 === t.length
                                ? [2]
                                : ((i = t.reduce(function (t, n, i) {
                                      return (
                                          t.push.apply(
                                              t,
                                              n.bundles.map(function (t) {
                                                  return {
                                                      bundle: t,
                                                      isNewSession: n.isNewSession,
                                                      orgId: r.ko,
                                                      userId: r.Eo,
                                                      sessionId: r.Io,
                                                      pageId: n.pageId,
                                                      version: n.version,
                                                      serverBundleTime: n.serverBundleTime,
                                                      serverPageStart: n.serverPageStart,
                                                      deltaT: null,
                                                  };
                                              })
                                          ),
                                          t
                                      );
                                  }, [])),
                                  [2, Of(this.co, i, n)]);
                        });
                    });
                }),
                t
            );
        })(),
        Lf = '_fs_preview',
        Df = new RegExp('(^\\?|&)'.concat(Lf, '=(?:true|false)(&|$)')),
        Ff = (function () {
            function t(t, n, i) {
                (this.xi = n), (this.kc = i), (this.Qc = 'fs_preview_'.concat(t));
            }
            return (
                (t.prototype.isPreviewMode = function () {
                    return this.Xc() || this.Yc();
                }),
                (t.prototype.clear = function () {
                    this.kc.setValue(this.Qc, '', new Date(1970, 1, 1).toUTCString());
                }),
                (t.prototype.write = function () {
                    var t = this.Xc(),
                        n = this.Jc();
                    (t || n) &&
                        (t ? this.kc.setValue(this.Qc, 'true', new Date(Kr() + 432e5).toUTCString()) : this.clear(),
                        this.Zc());
                }),
                (t.prototype.Zc = function () {
                    if (this.xi.history) {
                        var t = location.search.replace(Df, function (t, n, i) {
                            return i ? n : '';
                        });
                        this.xi.history.replaceState({}, '', this.xi.location.href.replace(location.search, t));
                    }
                }),
                (t.prototype.Xc = function () {
                    return this.xi.document.location.search.indexOf(''.concat(Lf, '=true')) > -1;
                }),
                (t.prototype.Jc = function () {
                    return this.xi.document.location.search.indexOf(''.concat(Lf, '=false')) > -1;
                }),
                (t.prototype.Yc = function () {
                    var t = this.kc.getValue(this.Qc),
                        n = t.cookieValue,
                        i = t.localStorageValue;
                    return !(!n && !i);
                }),
                t
            );
        })();
    function Bf(t) {
        var n, i, r;
        return {
            Kind: cn.CAPTURE_SOURCE,
            Args: [
                t.type,
                t.entrypoint,
                'dom',
                null === (i = null === (n = t.source) || void 0 === n ? void 0 : n.integration) || void 0 === i
                    ? void 0
                    : i.slice(0, 1024),
                !!(null === (r = t.source) || void 0 === r ? void 0 : r.userInitiated),
            ],
        };
    }
    function Wf(t) {
        return r(this, void 0, _e, function () {
            var n, i, r, s;
            return e(this, function (e) {
                if (
                    ((n = (function (t) {
                        return 'msCrypto' in t ? t.msCrypto : t.crypto;
                    })(t)),
                    'function' == typeof (null == n ? void 0 : n.randomUUID))
                )
                    return [2, n.randomUUID()];
                for (
                    i = new Uint8Array(16),
                        n.getRandomValues(i),
                        i[6] = (15 & i[6]) | 64,
                        i[8] = (63 & i[8]) | 128,
                        r = [],
                        s = 0;
                    s < i.length;
                    s++
                )
                    r.push(
                        (function (t, n, i) {
                            for (var r = t; r.length < 2; ) r = ''.concat('0').concat(r);
                            return r;
                        })(i[s].toString(16))
                    );
                return [
                    2,
                    [
                        ''.concat(r[0]).concat(r[1]).concat(r[2]).concat(r[3]),
                        ''.concat(r[4]).concat(r[5]),
                        ''.concat(r[6]).concat(r[7]),
                        ''.concat(r[8]).concat(r[9]),
                        ''.concat(r[10]).concat(r[11]).concat(r[12]).concat(r[13]).concat(r[14]).concat(r[15]),
                    ].join('-'),
                ];
            });
        });
    }
    var Hf = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    function zf(t) {
        return 36 === t.length && Hf.test(t);
    }
    var qf = void 0,
        $f = 18e5,
        Vf = (function () {
            function t(t, n, i, r) {
                void 0 === r && (r = io),
                    (this.ut = t),
                    (this.Pu = n),
                    (this.th = i),
                    (this.nh = 0),
                    (this.ih = new r(this.rh.bind(this)));
            }
            return (
                (t.prototype.createUserSessionPage = function () {
                    return r(this, void 0, _e, function () {
                        return e(this, function (t) {
                            return [2, Gf(this.ut, this.th)];
                        });
                    });
                }),
                (t.prototype.persist = function (t) {
                    this.th.create({
                        userId: t.userId,
                        sessionId: t.sessionId,
                        sessionStartTime: t.sessionStartTime,
                        lastUserActivityTime: t.lastActivityTime,
                        pageCount: t.pageCount,
                    });
                }),
                (t.prototype.start = function () {
                    this.ih.start(3e5);
                }),
                (t.prototype.stop = function () {
                    this.ih.stop();
                }),
                (t.prototype.rh = function () {
                    var t = this.Pu.getLastUserActivityTS();
                    t !== this.nh && ((this.nh = t), this.th.setLastUserActivityTimeMS(t)), this.start();
                }),
                t
            );
        })();
    function Gf(t, n) {
        var i, s;
        return r(this, void 0, _e, function () {
            var r, u, o, a, c, h, f, v, l, d;
            return e(this, function (e) {
                switch (e.label) {
                    case 0:
                        return (
                            (r = (function (t, n) {
                                var i,
                                    r,
                                    e,
                                    s = n.getUserId();
                                if (!s || !zf(s)) return [qf, 'uid '.concat(s)];
                                var u = n.getSessionId();
                                if (!u || !zf(u)) return [qf, 'sid '.concat(u)];
                                var o = t.time.wallTime(),
                                    a = null !== (i = n.getSessionStartTimeMS()) && void 0 !== i ? i : 0,
                                    c = xt.mathAbs(o - a);
                                if (0 === a || c >= 864e5) return [qf, 'exp sid: '.concat(a, 'ms ').concat(c, 'ms')];
                                var h = null !== (r = n.getLastUserActivityTimeMS()) && void 0 !== r ? r : a,
                                    f = xt.mathMax(h, a),
                                    v = xt.mathAbs(o - f);
                                if (v >= $f) return [qf, 'exp lua: '.concat(h, 'ms ').concat(v, 'ms')];
                                var l = null !== (e = n.getPageCount()) && void 0 !== e ? e : 0;
                                return l >= 250 ? [qf, 'pages: '.concat(l)] : [u];
                            })(t, n)),
                            (u = r[0]),
                            (o = r[1]),
                            (a = u === qf),
                            (c = t.time.wallTime()),
                            [4, Wf(t.window)]
                        );
                    case 1:
                        return (
                            (h = e.sent()),
                            (f = n.getSessionId()),
                            (v = n.getUserId()),
                            (l = (null !== (i = n.getPageCount()) && void 0 !== i ? i : 0) + 1),
                            (d = null !== (s = n.getSessionStartTimeMS()) && void 0 !== s ? s : c),
                            a ? [4, Wf(t.window)] : [3, 4]
                        );
                    case 2:
                        return (f = e.sent()), [4, Qf(t, n)];
                    case 3:
                        (v = e.sent()), (l = 1), (d = c), (e.label = 4);
                    case 4:
                        return [
                            2,
                            {
                                userId: v,
                                sessionId: f,
                                pageId: h,
                                isNewSession: a,
                                lastActivityTime: c,
                                pageCount: l,
                                reason: o,
                                sessionStartTime: d,
                            },
                        ];
                }
            });
        });
    }
    function Qf(t, n) {
        return r(this, void 0, _e, function () {
            var i;
            return e(this, function (r) {
                return (i = n.getUserId()) && zf(i) ? [2, i] : [2, Wf(t.window)];
            });
        });
    }
    var Xf = (function (t) {
            function s(n, i, r, e, s, u, o) {
                void 0 === r && (r = new vh(n)),
                    void 0 === e &&
                        (e = new Nf(n, i, r, void 0, void 0, void 0, function () {
                            return c.shutdown(Ln.SettingsBlocked);
                        })),
                    void 0 === s && (s = no),
                    void 0 === u && (u = cf),
                    void 0 === o && (o = new xh(n, i));
                var a,
                    c = t.call(this, n, s, r, e, u, o) || this;
                (c.co = i),
                    (c.xo = e),
                    (c.Mo = o),
                    (c.eh = !1),
                    (c.Uo = !1),
                    (c.sh = !1),
                    (c.t = c.xi.document),
                    (c.Oo = 0),
                    (c.uh = n.recording.identity),
                    (c.oh = new Ff(c.ko, c.xi, c.uh.getClientStore())),
                    (c.xa = ff.NoInfoYet),
                    (c.ah = new Vf(n, r, c.uh)),
                    (a = function (t) {
                        if ((c.Pa.stop(Ln.Api), t)) {
                            var n = c.t.getElementById(t);
                            n && c.hh && n.setAttribute('_fs_embed_token', c.hh);
                        }
                    }),
                    (c.xi._fs_shutdown = a);
                var h = c.oh.isPreviewMode();
                return (c.fh = c.co.settings({ orgId: c.ko, previewMode: h })['catch'](function () {})), c;
            }
            return (
                n(s, t),
                (s.prototype.onDomLoad = function () {
                    var n = this;
                    t.prototype.onDomLoad.call(this),
                        (this.eh = !0),
                        this.rc(function () {
                            n.qa(n.Uo);
                        });
                }),
                (s.prototype.lh = function () {
                    var t = Y(this.xi, '_fs_replay_flags');
                    if (
                        /[?&]_fs_force_session=true(&|#|$)/.test(location.search) &&
                        ((t = ''.concat(t, ',forceSession')), this.xi.history)
                    ) {
                        var n = location.search.replace(/(^\?|&)_fs_force_session=true(&|$)/, function (t, n, i) {
                            return i ? n : '';
                        });
                        this.xi.history.replaceState({}, '', this.xi.location.href.replace(location.search, n));
                    }
                    return t;
                }),
                (s.prototype.start = function (n, i, s) {
                    var u, o, a, c, h, f;
                    return r(this, void 0, _e, function () {
                        var r, v, l, d, p, w, g, m, y, b, S, k, _, A, I, E, T, C, x, K, R, M, O, j, P, U;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return t.prototype.start.call(this, n, i, s), [4, this.fh];
                                case 1:
                                    if (!(r = e.sent())) return this.dh(), [2];
                                    Ns(
                                        null !== (u = r.OrgSettings.UrlPrivacyConfig) && void 0 !== u
                                            ? u
                                            : Ai.DefaultOrgSettings.UrlPrivacyConfig,
                                        r.OrgSettings.MaxUrlLength
                                    ),
                                        (v = this.lh()),
                                        (e.label = 2);
                                case 2:
                                    return e.trys.push([2, 4, , 5]), [4, _e.race([Ne(this.xi), Ie(250)])];
                                case 3:
                                case 4:
                                    return e.sent(), [3, 5];
                                case 5:
                                    return (
                                        (l = Ku(this.t)),
                                        (d = l[0]),
                                        (p = l[1]),
                                        (N = this.xi),
                                        (L = 0),
                                        (D = 0),
                                        (w =
                                            null == N.screen
                                                ? [L, D]
                                                : ((L = parseInt(String(N.screen.width), 10)),
                                                  (D = parseInt(String(N.screen.height), 10)),
                                                  [(L = isNaN(L) ? 0 : L), (D = isNaN(D) ? 0 : D)])),
                                        (g = w[0]),
                                        (m = w[1]),
                                        (y = ''),
                                        n || (y = this.uh.getUserId()),
                                        [4, this.ah.createUserSessionPage()]
                                    );
                                case 6:
                                    (b = e.sent()),
                                        (S = this.uh.getAppId()),
                                        (k = this.uh.getAppKeyHash()),
                                        (_ = this.oh.isPreviewMode()),
                                        (A =
                                            null !==
                                                (c =
                                                    null ===
                                                        (a =
                                                            null === (o = this.ut) || void 0 === o
                                                                ? void 0
                                                                : o.recording) || void 0 === a
                                                        ? void 0
                                                        : a.preroll) && void 0 !== c
                                                ? c
                                                : -1),
                                        (I = Ms(Je(this.xi), { source: 'page', type: 'base' })),
                                        (E = Ms(this.xi.location.href, { source: 'page', type: 'url' })),
                                        (T =
                                            '' === this.t.referrer
                                                ? ''
                                                : Ms(this.t.referrer, { source: 'page', type: 'referrer' })),
                                        (C = dr(this.t)),
                                        (x = (function (t) {
                                            var n,
                                                i = '_fs_tab_id';
                                            try {
                                                var r = t.sessionStorage.getItem(i);
                                                if (r) return r;
                                                var e = Math.floor(1e17 * Math.random()).toString(16);
                                                return (
                                                    t.sessionStorage.setItem(i, e),
                                                    null !== (n = t.sessionStorage.getItem(i)) && void 0 !== n
                                                        ? n
                                                        : void 0
                                                );
                                            } catch (t) {
                                                return;
                                            }
                                        })(this.xi)),
                                        (K = {
                                            OrgId: this.ko,
                                            UserId: y,
                                            SessionId: b.sessionId,
                                            PageId: b.pageId,
                                            Url: E,
                                            Base: I,
                                            Width: d,
                                            Height: p,
                                            ScreenWidth: g,
                                            ScreenHeight: m,
                                            SnippetVersion: lt(this.xi),
                                            Referrer: T,
                                            Preroll: A,
                                            Doctype: C,
                                            CompiledVersion: '424cc15e4916da4348dadfd296f8983af6582d5f',
                                            CompiledTimestamp: 1728062580,
                                            AppId: S,
                                            TabId: x,
                                            PreviewMode: _ || void 0,
                                        }),
                                        v && (K.ReplayFlags = v),
                                        (e.label = 7);
                                case 7:
                                    return e.trys.push([7, 13, , 14]), [4, this.co.page(K)];
                                case 8:
                                    return (
                                        (R = e.sent()),
                                        _ || !R.PreviewMode
                                            ? [3, 10]
                                            : [
                                                  4,
                                                  this.co
                                                      .settings({ orgId: this.ko, previewMode: !0 })
                                                      ['catch'](function () {}),
                                              ]
                                    );
                                case 9:
                                    if (!(r = e.sent())) return this.dh(), [2];
                                    Ns(
                                        null !== (h = r.OrgSettings.UrlPrivacyConfig) && void 0 !== h
                                            ? h
                                            : Ai.DefaultOrgSettings.UrlPrivacyConfig,
                                        r.OrgSettings.MaxUrlLength
                                    ),
                                        (e.label = 10);
                                case 10:
                                    return [4, this.ph(b, R, r)];
                                case 11:
                                    return Af((U = e.sent()))
                                        ? this.Oa
                                            ? [2]
                                            : (window,
                                              (M = this.uh.getConsentStore().getConsentState()),
                                              this.$a(U, M),
                                              window,
                                              this.wh(
                                                  U.CookieDomain,
                                                  U.UserIntId,
                                                  U.SessionIntId,
                                                  U.PageIntId,
                                                  U.EmbedToken
                                              ),
                                              this.gh(),
                                              U.PreviewMode && this.mh(),
                                              (O = (function (t) {
                                                  return Y(t, '_fs_pagestart', 'function');
                                              })(this.xi)),
                                              O && O(),
                                              this.Ht.enqueueFirst(Bf({ type: 'default' })),
                                              this.Ht.enqueueFirst(
                                                  this.Pa.getNavigateEvent(this.xi.location.href, cn.ENTRY_NAVIGATE)
                                              ),
                                              this.Ht.enqueueFirst({
                                                  Kind: cn.SYS_REPORTCONSENT,
                                                  Args: [M, Un.Document],
                                              }),
                                              this.Ht.enqueueFirst({
                                                  Kind: cn.SET_FRAME_BASE,
                                                  Args: [
                                                      Ms(Je(this.xi), { source: 'event', type: cn.SET_FRAME_BASE }),
                                                      C,
                                                      E,
                                                      T,
                                                  ],
                                              }),
                                              (j = {
                                                  Kind: cn.PAGE_DATA,
                                                  Args: [
                                                      E,
                                                      I,
                                                      d,
                                                      p,
                                                      g,
                                                      m,
                                                      lt(this.xi),
                                                      T,
                                                      C,
                                                      A,
                                                      y,
                                                      U.PageStart,
                                                      Sr(this.xi),
                                                      this.xi.navigator.userAgent,
                                                      x,
                                                      !!U.IsNewSession,
                                                      !!U.PreviewMode,
                                                      S,
                                                      k,
                                                      1728062580,
                                                      '424cc15e4916da4348dadfd296f8983af6582d5f',
                                                  ],
                                              }),
                                              this.xo.addEndMarkerEvent(j),
                                              null === (f = this.Mo) || void 0 === f || f.addEndMarkerEvent(j),
                                              U.Flags.DisableInertBundles && (_h.forceFlush = !0),
                                              this.Ht.enqueue({
                                                  Kind: cn.SCRIPT_COMPILED_VERSION,
                                                  Args: ['424cc15e4916da4348dadfd296f8983af6582d5f'],
                                              }),
                                              this.Ht.enqueue({ Kind: cn.RESIZE_LAYOUT, Args: [d, p] }),
                                              this.Pa.addVisibilityChangeEvent(),
                                              this.Ja(),
                                              [
                                                  4,
                                                  this.Ht.startPipeline({
                                                      isNewSession: !!U.IsNewSession,
                                                      orgId: this.ko,
                                                      pageId: U.PageIntId,
                                                      serverPageStart: U.PageStart,
                                                      sessionId: U.SessionIntId,
                                                      userId: U.UserIntId,
                                                      minDwellTime: (U.Flags.UseDwellTime && U.DwellTime) || 0,
                                                      fixWhenValues: U.Flags.FixWhenValues,
                                                  }),
                                              ])
                                        : [2, this.dh()];
                                case 12:
                                    return e.sent(), this.ec(this.t), this.Ga(), [3, 14];
                                case 13:
                                    return (
                                        (P = e.sent()) instanceof Lr &&
                                            (U = P.data) &&
                                            U.user_id &&
                                            U.cookie_domain &&
                                            U.reason_code === di.ReasonBlockedTrafficRamping &&
                                            y !== U.user_id &&
                                            this.wh(U.cookie_domain, U.user_id, '', '', ''),
                                        this.dh(),
                                        [3, 14]
                                    );
                                case 14:
                                    return [2];
                            }
                            var N, L, D;
                        });
                    });
                }),
                (s.prototype.gh = function () {
                    var t = this;
                    (this.sh = !0),
                        this.rc(function () {
                            t.qa(t.Uo);
                        });
                }),
                (s.prototype.wh = function (t, n, i, r, e) {
                    var s = this.uh;
                    s.setIds(this.xi, t, n, i),
                        (this.hh = e),
                        this.oh.write(),
                        '/User,'.concat(s.getUserId(), '/Session,').concat(s.getSessionId(), '/Page,').concat(r);
                }),
                (s.prototype.rc = function (n) {
                    this.eh && this.sh && t.prototype.rc.call(this, n);
                }),
                (s.prototype.mh = function () {
                    var t = 'FullStory-preview-script';
                    if (!this.t.getElementById(t)) {
                        var n = this.t.createElement('script');
                        (n.id = t),
                            (n.async = !0),
                            (n.src = ''.concat(this.et, '//').concat(this.La, '/s/fspreview.js')),
                            this.t.head.appendChild(n);
                    }
                }),
                (s.prototype.dh = function () {
                    this.Qa(), this.shutdown(Ln.SettingsBlocked), (this.Uo = !0), this.qa(this.Uo);
                }),
                (s.prototype.ph = function (t, n, s) {
                    var u, o, a;
                    return r(this, void 0, _e, function () {
                        var r, c, h, f;
                        return e(this, function (e) {
                            return (
                                (r = i(i({}, n), s)).Flags.UseClientSideId &&
                                    (zf((c = null !== (u = r.UserUUID) && void 0 !== u ? u : '')) && (t.userId = c),
                                    zf((h = null !== (o = r.SessionUUID) && void 0 !== o ? o : '')) &&
                                        (t.sessionId = h),
                                    zf((f = null !== (a = r.PageUUID) && void 0 !== a ? a : '')) && (t.pageId = f),
                                    this.uh.setCookieDomain(this.xi, r.CookieDomain),
                                    this.ah.persist(t),
                                    (r = i(i({}, r), {
                                        UserIntId: t.userId,
                                        SessionIntId: t.sessionId,
                                        PageIntId: t.pageId,
                                        IsNewSession: t.isNewSession,
                                        PageStart: Kr(),
                                    })),
                                    t.reason && this.Ht.enqueue({ Kind: cn.SESSION_INFO, Args: [t.reason] })),
                                this.ah.start(),
                                [2, r]
                            );
                        });
                    });
                }),
                (s.prototype.onMessageReceived = function (n, i) {
                    t.prototype.onMessageReceived.call(this, n, i),
                        (null == n ? void 0 : n.parent) == this.xi && i[0] === Pi.EndPreviewMode && this.oh.clear();
                }),
                s
            );
        })(_f),
        Yf = (function () {
            function t(t, n) {
                void 0 === n && (n = new Jf(t)), (this.xi = t), (this.yh = n);
            }
            return (
                (t.prototype.enqueueEvents = function (t, n) {
                    var i = null != t ? t : void 0;
                    this.yh.postMessage(this.xi.parent, [Pi.EvtBundle, wh(n), i], i);
                }),
                (t.prototype.startPipeline = function () {}),
                (t.prototype.stopPipeline = function () {}),
                (t.prototype.addEndMarkerEvent = function (t) {}),
                t
            );
        })(),
        Jf = (function () {
            function t(t) {
                this.xi = t;
            }
            return (
                (t.prototype.postMessage = function (t, n, i) {
                    switch (n[0]) {
                        case Pi.EvtBundle:
                            sf(this.xi, n[0], fr(n[1]), i) || rf(t, n);
                            break;
                        case Pi.RequestFrameId:
                            sf(this.xi, n[0], '[]', i) || rf(t, n);
                            break;
                        default:
                            'Unknown message type: '.concat(n[0]);
                    }
                }),
                t
            );
        })(),
        Zf = (function (t) {
            function i(n, i, r, e, s) {
                void 0 === i && (i = new Jf(n.window)),
                    void 0 === r && (r = new Yf(n.window, i)),
                    void 0 === e && (e = no),
                    void 0 === s && (s = cf);
                var u = t.call(this, n, e, void 0, r, s, void 0) || this;
                return (u.yh = i), (u.t = u.xi.document), u;
            }
            return (
                n(i, t),
                (i.prototype.rc = function () {
                    var n, i;
                    this.ut.recording.inWebView &&
                        (null === (i = null === (n = this.Da) || void 0 === n ? void 0 : n.Flags) || void 0 === i
                            ? void 0
                            : i.FetchChildIntegrations) &&
                        t.prototype.rc.call(this);
                }),
                (i.prototype.start = function (n, i, r) {
                    var e = this;
                    t.prototype.start.call(this, n, i, r),
                        this.bh(),
                        this.vt.add(this.xi, 'load', !1, function () {
                            e.Pa.recordingIsDetached() && e.ut.recording.splitPage(Ln.FsShutdownFrame);
                        }),
                        this.Pa.addVisibilityChangeEvent();
                }),
                (i.prototype.onMessageReceived = function (n, i) {
                    var s;
                    return r(this, void 0, _e, function () {
                        var r, u, o, a, c, h, f;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    if (
                                        (t.prototype.onMessageReceived.call(this, n, i),
                                        n !== this.xi.parent && n !== this.xi)
                                    )
                                        return [2];
                                    switch (i[0]) {
                                        case Pi.GreetFrame:
                                            return [3, 1];
                                        case Pi.SetFrameId:
                                            return [3, 2];
                                        case Pi.SetConsent:
                                            return [3, 3];
                                        case Pi.InitFrameMobile:
                                            return [3, 4];
                                    }
                                    return [3, 7];
                                case 1:
                                    return this.bh(i[1]), [3, 7];
                                case 2:
                                    try {
                                        if (!(r = i[1]))
                                            return (
                                                (u = Ms(location.href, { source: 'log', type: 'debug' })),
                                                'Outer page gave us a bogus frame Id! Iframe: '.concat(u),
                                                [2]
                                            );
                                        this.Sh({
                                            frameId: r,
                                            parentIds: i[2],
                                            outerStartTime: i[3],
                                            scheme: i[4],
                                            script: i[5],
                                            appHost: i[6],
                                            orgId: i[7],
                                            initConfig: i[8],
                                            pageRsp: i[9],
                                            consented: i[10],
                                            minimumWhen: i[11],
                                        });
                                    } catch (t) {
                                        'Failed to parse frameId from message: '.concat(fr(i));
                                    }
                                    return [3, 7];
                                case 3:
                                    return this.setConsent(i[1]), [3, 7];
                                case 4:
                                    return (
                                        e.trys.push([4, 6, , 7]),
                                        (o = JSON.parse(i[1])),
                                        (a = o.StartTime),
                                        (c = void 0),
                                        i.length > 2 &&
                                            i[2] &&
                                            ((h = i[2]),
                                            Object.prototype.hasOwnProperty.call(h, 'ProtocolVersion') &&
                                                h.ProtocolVersion >= 20180723 &&
                                                Object.prototype.hasOwnProperty.call(h, 'OuterStartTime') &&
                                                (a = h.OuterStartTime),
                                            Object.prototype.hasOwnProperty.call(h, 'MobileScriptPath') &&
                                                (c = h.MobileScriptPath)),
                                        (f = o.Host),
                                        [
                                            4,
                                            this.Sh({
                                                frameId: 0,
                                                parentIds: [],
                                                outerStartTime: a,
                                                scheme: 'https:',
                                                script: null != c ? c : wt(f),
                                                appHost: pt(f),
                                                orgId: o.OrgId,
                                                initConfig: void 0,
                                                pageRsp: o.PageResponse,
                                                consented:
                                                    null !== (s = this.Wn.getConsent()) && void 0 !== s
                                                        ? s
                                                        : jn.RevokeConsent,
                                            }),
                                        ]
                                    );
                                case 5:
                                    return e.sent(), [3, 7];
                                case 6:
                                    return (
                                        e.sent(),
                                        'Failed to initialize mobile web recording from message: '.concat(fr(i)),
                                        [3, 7]
                                    );
                                case 7:
                                    return [2];
                            }
                        });
                    });
                }),
                (i.prototype.bh = function (t) {
                    (this.Oo && this.Oo === t) ||
                        (0 != this.Oo && this.xi.parent && this.yh.postMessage(this.xi.parent, [Pi.RequestFrameId]));
                }),
                (i.prototype.Sh = function (t) {
                    var n;
                    return r(this, void 0, _e, function () {
                        var i,
                            r,
                            s = this;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    if (this.Oo)
                                        return (
                                            this.Oo !== t.frameId
                                                ? ('Updating frame id from '.concat(this.Oo, ' to ').concat(t.frameId),
                                                  this.ut.recording.splitPage(Ln.FsShutdownFrame))
                                                : 'frame Id is already set to '.concat(this.Oo),
                                            [2]
                                        );
                                    if (
                                        ((i = Ms(location.href, { source: 'log', type: 'debug' })),
                                        'FrameId received within frame '.concat(i, ':').concat(t.frameId),
                                        (this.et = t.scheme),
                                        (this.Ua = t.script),
                                        (this.La = t.appHost),
                                        (this.ko = t.orgId),
                                        (this.Fa = t.initConfig),
                                        (this.Oo = t.frameId),
                                        (this.jo = t.parentIds),
                                        !t.pageRsp || !Af(t.pageRsp))
                                    )
                                        return this.shutdown(Ln.FsShutdownFrame), [2];
                                    if (this.Oa) return [2];
                                    (r = t.consented),
                                        this.$a(t.pageRsp, r),
                                        this.rc(),
                                        this.qa(),
                                        this.Ht.enqueueFirst(Bf({ type: 'default' })),
                                        this.Ht.enqueueFirst({ Kind: cn.SYS_REPORTCONSENT, Args: [r, Un.Document] }),
                                        this.Ht.enqueueFirst({
                                            Kind: cn.SET_FRAME_BASE,
                                            Args: [
                                                Ms(Je(this.xi), { source: 'event', type: cn.SET_FRAME_BASE }),
                                                dr(this.xi.document),
                                            ],
                                        }),
                                        this.Ht.enqueue({
                                            Kind: cn.SCRIPT_COMPILED_VERSION,
                                            Args: ['424cc15e4916da4348dadfd296f8983af6582d5f'],
                                        }),
                                        (e.label = 1);
                                case 1:
                                    return e.trys.push([1, 3, , 4]), [4, _e.race([Ne(this.xi), Ie(250)])];
                                case 2:
                                case 3:
                                    return e.sent(), [3, 4];
                                case 4:
                                    return (
                                        this.Ht.enqueue({ Kind: cn.RESIZE_LAYOUT, Args: Ku(this.xi.document) }),
                                        this.Ja(),
                                        this.Ht.rebaseIframe(
                                            t.outerStartTime,
                                            null !== (n = t.minimumWhen) && void 0 !== n ? n : 0
                                        ),
                                        this.ut.time.setStartTime(t.outerStartTime),
                                        this.Eo && this.Io && this._o
                                            ? (this.Ht.startPipeline({
                                                  frameId: t.frameId,
                                                  isNewSession: !!t.pageRsp.IsNewSession,
                                                  orgId: this.ko,
                                                  pageId: t.pageRsp.PageIntId,
                                                  parentIds: t.parentIds,
                                                  serverPageStart: t.pageRsp.PageStart,
                                                  sessionId: t.pageRsp.SessionIntId,
                                                  userId: t.pageRsp.UserIntId,
                                                  minDwellTime: 0,
                                              }).then(function () {
                                                  s.Xa(), s.ec(s.xi.document), s.Ga();
                                              }),
                                              [2])
                                            : ('one or more of userId:'
                                                  .concat(this.Eo, ' | sessionId:')
                                                  .concat(this.Io, ' | pageId:')
                                                  .concat(this._o, ' are undefined'),
                                              [2])
                                    );
                            }
                        });
                    });
                }),
                i
            );
        })(_f),
        tv = 'fs_cid',
        nv = 1,
        iv = (function () {
            function t(t) {
                this.th = t;
                var n = this.th.getValue(tv, Li),
                    i = n.cookieValue,
                    r = n.localStorageValue,
                    e = i || r;
                this.kh = (function (t) {
                    var n = { consent: jn.RevokeConsent };
                    if (!t) return n;
                    var i = t.split('.');
                    return i.length < 1 ? n : (i[0], '1' === i[1] ? { consent: jn.GrantConsent } : n);
                })(e);
            }
            return (
                (t.prototype.getConsentState = function () {
                    return this.kh.consent;
                }),
                (t.prototype.setConsentState = function (t) {
                    var n;
                    (this.kh.consent = t),
                        t !== jn.RevokeConsent
                            ? this.th.setValue(
                                  tv,
                                  ((n = this.kh.consent), [nv, n === jn.GrantConsent ? 1 : 0].join('.')),
                                  new Date(1e3 * Pr()).toUTCString(),
                                  Li
                              )
                            : this.th.clearCookie(tv, Li);
                }),
                t
            );
        })(),
        rv = 'fs_lua',
        ev = 1,
        sv = (function () {
            function t(t) {
                this.th = t;
                var n = this.th.getValue(rv, Di),
                    i = n.cookieValue,
                    r = n.localStorageValue;
                this.kh = (function (t, n) {
                    var i;
                    return null !==
                        (i = a(t, n, uv, function (t, n) {
                            return (n.lastUserActivityTime || 0) > (t.lastUserActivityTime || 0) ? n : t;
                        })) && void 0 !== i
                        ? i
                        : { lastUserActivityTime: void 0 };
                })(i, r);
            }
            return (
                (t.prototype.getLastUserActivityTimeMS = function () {
                    return this.kh.lastUserActivityTime;
                }),
                (t.prototype.setLastUserActivityTimeMS = function (t) {
                    (this.kh.lastUserActivityTime = t),
                        this.th.setValue(
                            rv,
                            (function (t) {
                                return [ev, t].join('.');
                            })(t),
                            new Date(Kr() + $f).toUTCString(),
                            Di
                        );
                }),
                t
            );
        })();
    function uv(t) {
        var n = { lastUserActivityTime: void 0 };
        if (!t) return n;
        var i = t.split('.');
        return i.length < 1 ? n : (i[0], { lastUserActivityTime: Yi(i[1]) });
    }
    var ov,
        av,
        cv = 'fs_uid',
        hv = (function () {
            function t(t, n, i, r) {
                if (
                    (void 0 === n && (n = window),
                    void 0 === i && (i = function () {}),
                    void 0 === r && (r = !1),
                    (this._h = void 0),
                    ut(n))
                )
                    this.kc = new mf();
                else {
                    var e = Y(n, '_fs_clientstore', 'object');
                    this.kc = null != e ? e : new u(n.document, i, r);
                }
                (this.Ah = new iv(this.kc)), (this.Ih = new sv(this.kc)), (this.kh = this.Eh(t));
            }
            return (
                (t.prototype.Eh = function (t) {
                    var n = this.kc.getValue(cv, Ni),
                        i = (function (t, n, i) {
                            return a(t, n, Ur, function (t, n) {
                                return t.orgId !== i && n.orgId !== i
                                    ? null
                                    : t.orgId !== i
                                      ? n
                                      : n.orgId !== i
                                        ? t
                                        : n.expirationAbsTimeSeconds > t.expirationAbsTimeSeconds
                                          ? n
                                          : t;
                            });
                        })(n.cookieValue, n.localStorageValue, t);
                    return i || { expirationAbsTimeSeconds: Pr(), orgId: t, userId: '', sessionId: '', appKeyHash: '' };
                }),
                (t.prototype.getConsentStore = function () {
                    return this.Ah;
                }),
                (t.prototype.clear = function () {
                    this.Ih.setLastUserActivityTimeMS(void 0),
                        (this.kh.sessionStartTime = this.kh.pageCount = void 0),
                        (this.kh.userId = this.kh.sessionId = this.kh.appKeyHash = this._h = ''),
                        (this.kh.expirationAbsTimeSeconds = Pr()),
                        this.Th();
                }),
                (t.prototype.create = function (t) {
                    this.Ih.setLastUserActivityTimeMS(t.lastUserActivityTime),
                        (this.kh = i(i({}, this.kh), t)),
                        this.Th();
                }),
                (t.prototype.getOrgId = function () {
                    return this.kh.orgId;
                }),
                (t.prototype.getUserId = function () {
                    return this.kh.userId;
                }),
                (t.prototype.setUserId = function (t) {
                    (this.kh.userId = t), this.Th();
                }),
                (t.prototype.getSessionId = function () {
                    return this.kh.sessionId;
                }),
                (t.prototype.getAppKeyHash = function () {
                    return this.kh.appKeyHash;
                }),
                (t.prototype.getCookies = function () {
                    return this.kc.cookies;
                }),
                (t.prototype.setAppId = function (t) {
                    (this._h = t), (this.kh.appKeyHash = Oh(t)), this.Th();
                }),
                (t.prototype.getAppId = function () {
                    return this._h;
                }),
                (t.prototype.setSessionStartTimeMS = function (t) {
                    (this.kh.sessionStartTime = t), this.Th();
                }),
                (t.prototype.getSessionStartTimeMS = function () {
                    return this.kh.sessionStartTime;
                }),
                (t.prototype.setLastUserActivityTimeMS = function (t) {
                    this.Ih.setLastUserActivityTimeMS(t);
                }),
                (t.prototype.getLastUserActivityTimeMS = function () {
                    return this.Ih.getLastUserActivityTimeMS();
                }),
                (t.prototype.setPageCount = function (t) {
                    (this.kh.pageCount = t), this.Th();
                }),
                (t.prototype.getPageCount = function () {
                    return this.kh.pageCount;
                }),
                (t.prototype.getClientStore = function () {
                    return this.kc;
                }),
                (t.prototype.setCookie = function (t, n, i) {
                    void 0 === i && (i = new Date(Kr() + 6048e5).toUTCString()), this.kc.setCookie(t, n, i);
                }),
                (t.prototype.setCookieDomain = function (t, n) {
                    var i = n;
                    (q(i) || i.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/g)) && (i = '');
                    var r = (function (t) {
                        return Y(t, '_fs_cookie_domain');
                    })(t);
                    'string' == typeof r && (i = r), this.kc.setDomain(i);
                }),
                (t.prototype.setIds = function (t, n, i, r) {
                    this.setCookieDomain(t, n), (this.kh.userId = i), (this.kh.sessionId = r), this.Th();
                }),
                (t.prototype.clearAppId = function () {
                    return !!this.kh.appKeyHash && ((this._h = ''), (this.kh.appKeyHash = ''), this.Th(), !0);
                }),
                (t.prototype.encode = function () {
                    var t,
                        n,
                        i,
                        r = [
                            this.kh.userId,
                            null !== (t = this.kh.sessionId) && void 0 !== t ? t : '',
                            ''.concat(null !== (n = this.kh.sessionStartTime) && void 0 !== n ? n : ''),
                            '',
                            ''.concat(null !== (i = this.kh.pageCount) && void 0 !== i ? i : ''),
                        ].join(':'),
                        e = ['', this.kh.orgId, r];
                    return (
                        this.kh.appKeyHash && e.push(encodeURIComponent(this.kh.appKeyHash)),
                        e.push('/'.concat(this.kh.expirationAbsTimeSeconds)),
                        e.join('#')
                    );
                }),
                (t.prototype.Th = function () {
                    this.kh.expirationAbsTimeSeconds++;
                    var t = this.encode(),
                        n = new Date(1e3 * this.kh.expirationAbsTimeSeconds).toUTCString();
                    this.kc.setValue(cv, t, n, Ni);
                }),
                t
            );
        })();
    function fv(t, n, i, r, e) {
        if (t && 'object' == typeof t) {
            var s = 0,
                u = {};
            for (var o in t)
                if (!(o in e)) {
                    var a = t[o];
                    (e[o] = { value: a, apiSource: n, apiVersion: i, schema: r }), (u[o] = a), s++;
                }
            if (0 !== s) return u;
        }
    }
    function vv(t, n) {
        var i,
            r,
            e = {},
            s = {};
        for (var u in n)
            if (xt.objectHasOwnProp(n, u)) {
                if (t() <= 0) break;
                var o = n[u];
                if (void 0 !== o) {
                    var a = lv(u),
                        c = a[0],
                        h = a[1],
                        f = o,
                        v = h;
                    if (Zi(o)) (f = (i = vv(t, o))[0]), (v = i[1]);
                    else if (Gi((r = o)) && r.length > 0 && r.every(Zi)) {
                        (f = []), (v = []);
                        for (var l = 0, d = o; l < d.length; l++) {
                            var p = vv(t, d[l]),
                                w = p[0],
                                g = p[1];
                            f.push(w), v.push(g);
                        }
                    } else
                        'date' === h || gv(o)
                            ? (f = wv(o))
                            : Gi(o) && ('dates' === h || o.every(gv)) && (f = o.map(wv));
                    (e[c] = f), v && (s[c] = v);
                }
            }
        return [e, s];
    }
    function lv(t) {
        var n = (function (t) {
                return /^[a-zA-Z_][a-zA-Z0-9_\\-]*$/.test(t) ? t : t.replace(/^[^a-zA-Z_]+|[^a-zA-Z0-9_]/g, '') || t;
            })(t),
            i = n.lastIndexOf('_');
        if (-1 === i) return [n, null];
        var r,
            e = n.substring(0, i),
            s = n.substring(i + 1);
        return (r = s), pv.test(r) ? [e, s] : [n, null];
    }
    ((av = ov || (ov = {})).TrackEvent = 'trackEvent'),
        (av.GetSession = 'getSession'),
        (av.Init = 'init'),
        (av.Log = 'log'),
        (av.Source = 'source'),
        (av.Observe = 'observe'),
        (av.Restart = 'restart'),
        (av.SetIdentity = 'setIdentity'),
        (av.SetConfig = 'setConfig'),
        (av.SetPage = 'setPage'),
        (av.SetProperties = 'setProperties'),
        (av.Shutdown = 'shutdown'),
        (av.Start = 'start'),
        (av.Stat = 'stat');
    var dv,
        pv = /^(?:bool|date|int|obj|real|str)s?$/;
    function wv(t) {
        if (null != t) {
            var n = gv(t) ? t : new Date(t);
            try {
                return n.toISOString();
            } catch (n) {
                if ('string' == typeof t) return t;
            }
        }
        return null;
    }
    function gv(t) {
        return null != t && t.constructor === Date;
    }
    function mv(t, n, i, r, e, s) {
        var u,
            o,
            a,
            c,
            h = 1500,
            f = function () {
                return --h;
            };
        return (
            i ? ((a = (u = yv(f, n, i))[0]), (c = u[1])) : ((a = (o = vv(f, n))[0]), (c = o[1])),
            h < 0 && 'Too many properties for ['.concat(t, '] API call'),
            t === ti.Document ? { properties: fv(a, r, e, c, s), schema: c } : { properties: a, schema: c }
        );
    }
    function yv(t, n, i) {
        var r = {},
            e = {};
        function s(t, n, i) {
            (r[t] = n), i && (e[t] = i);
        }
        for (var u in n)
            if (xt.objectHasOwnProp(n, u)) {
                if (t() <= 0) break;
                var o = n[u],
                    a = i[u];
                if (Zi(o)) {
                    var c = yv(t, o, a || {}),
                        h = c[0],
                        f = c[1];
                    (r[u] = h), a && (e[u] = f);
                } else nr(o) ? s(u, tr(o), a) : Gi(o) && Qi(o, nr) ? s(u, o.map(tr), a) : s(u, o, a);
            }
        return [r, e];
    }
    function bv(t, n, i, r, e, s) {
        var u = fr(n),
            o = r ? fr(r) : void 0,
            a = 'fs' !== i ? i : void 0;
        switch (t) {
            case ti.Event:
                return { Kind: cn.SYS_CUSTOM, Args: [s, u, a, e, o] };
            case ti.Document:
            case ti.Page:
            case ti.User:
                return { Kind: cn.SYS_SETVAR, Args: [t, u, a, e, o] };
            default:
                Le(0, 'Unsupported');
        }
    }
    var Sv = (function () {
        function t() {
            this.Ch = {};
        }
        return (
            (t.prototype.unloadCrossPageVars = function (t) {
                switch (t) {
                    case Ln.Hibernation:
                    case Ln.Size:
                        break;
                    default:
                        this.xh = void 0;
                }
            }),
            (t.prototype.getCrossPageVars = function () {
                return this.xh;
            }),
            (t.prototype.getDocumentVars = function () {
                var t,
                    n = {};
                for (var r in this.Ch) {
                    var e = this.Ch[r],
                        s = e.value,
                        u = e.apiSource,
                        o = e.schema,
                        a = e.apiVersion;
                    ((l =
                        null !==
                            (t =
                                n[
                                    (h = ''
                                        .concat(null != u ? u : '')
                                        .concat('$$$')
                                        .concat(null != a ? a : ''))
                                ]) && void 0 !== t
                            ? t
                            : { properties: {} }).properties[r] = s),
                        o && (l.schema = i(i({}, l.schema), o)),
                        (n[h] = l);
                }
                var c = [];
                for (var h in n) {
                    var f = h.split('$$$'),
                        v = ((u = f[0]), f[1]),
                        l = n[h];
                    kv(c, bv(ti.Document, l.properties, '' === u ? void 0 : u, l.schema, Yi(v)));
                }
                return c;
            }),
            (t.prototype.api = function (t, n) {
                var i,
                    r = { events: [], reidentify: !1 },
                    e = [];
                try {
                    var s = (function (t) {
                            switch (t.operation) {
                                case ov.TrackEvent:
                                    return ti.Event;
                                case ov.SetPage:
                                    return ti.Page;
                                case ov.SetProperties:
                                    var n = t.option.type;
                                    switch (n) {
                                        case ti.Document:
                                        case ti.Page:
                                        case ti.User:
                                            return n;
                                        default:
                                            return Le(0, 'Invalid scope: '.concat(n));
                                    }
                                default:
                                    Le(0, 'Unsupported');
                            }
                        })(t),
                        u = null === (i = t.source) || void 0 === i ? void 0 : i.integration;
                    if (
                        !(function (t, n) {
                            switch (t) {
                                case ti.Event:
                                    var i = n.option.name;
                                    return 'string' == typeof i || ('Custom event name invalid: '.concat(i), !1);
                                case ti.Document:
                                case ti.Page:
                                    return !0;
                                case ti.User:
                                    var r = n.option.properties;
                                    return (
                                        'object' == typeof r ||
                                        ("Expected argument of type 'object' instead got type: '"
                                            .concat(typeof r, "', value: ")
                                            .concat(fr(r)),
                                        !1)
                                    );
                                default:
                                    Le(0, 'Unsupported');
                            }
                        })(s, t)
                    )
                        return r;
                    var o = (function (t, n, i) {
                        var r = n.option.properties,
                            e = (function (t, n) {
                                var i = n.option.schema;
                                if (2 === n.apiVersion) {
                                    var r = Ji(i) && 'properties' in i ? i.properties : {};
                                    return Ji(r) ? r : {};
                                }
                            })(0, n);
                        if (t === ti.Event) return { rawProps: r, eventName: n.option.name, rawSchema: e };
                        if (t !== ti.User || !('uid' in r)) return { rawProps: r, rawSchema: e };
                        var s = r.uid;
                        if (!1 === s)
                            return delete r.uid, { rawProps: r, rawSchema: e, reidentify: !!i, nextAppId: '' };
                        var u = (function (t, n) {
                                var i = t;
                                if (
                                    ('number' == typeof i &&
                                        xt.mathFloor(i) == i &&
                                        ("Expected appId of type 'string' instead got value: "
                                            .concat(i, ' of type: ')
                                            .concat(typeof i),
                                        (i = ''.concat(i))),
                                    'string' != typeof i)
                                )
                                    return (
                                        'blocking FS.identify API call; uid value ('.concat(i, ') must be a string'),
                                        [void 0, ii.FsId]
                                    );
                                var r = i.trim();
                                if (Mr.indexOf(r.toLowerCase()) >= 0)
                                    return (
                                        'blocking FS.identify API call; uid value ('.concat(r, ') is illegal'),
                                        [void 0, ii.FsId]
                                    );
                                var e = Oh(r),
                                    s = void 0;
                                return (
                                    n &&
                                        n !== e &&
                                        n !== r &&
                                        ('user re-identified; existing uid hash ('
                                            .concat(n, ') does not match provided uid (')
                                            .concat(r, ')'),
                                        (s = ii.NewUid)),
                                    [r, s]
                                );
                            })(s, i),
                            o = u[0],
                            a = u[1];
                        if (o)
                            return (
                                (r.uid = o), { rawProps: r, rawSchema: e, nextAppId: o, reidentify: a === ii.NewUid }
                            );
                        switch (a) {
                            case ii.FsId:
                            case void 0:
                                break;
                            default:
                                'unexpected failReason returned from setAppId: '.concat(a);
                        }
                    })(s, t, n);
                    if (!o) return r;
                    var a = o.rawProps,
                        c = o.rawSchema,
                        h = o.reidentify,
                        f = o.nextAppId,
                        v = o.eventName,
                        l = mv(s, null != a ? a : {}, c, u, t.apiVersion, this.Ch),
                        d = l.properties,
                        p = l.schema;
                    if (!d && s === ti.Document) return r;
                    var w = bv(s, null != d ? d : {}, u, p, t.apiVersion, v);
                    return (
                        kv(
                            e,
                            (function (t, n) {
                                var i = _v[t];
                                if (i) return Bf({ source: n, type: 'api', entrypoint: i });
                            })(s, t.source)
                        ),
                        kv(e, w),
                        s === ti.Page && (this.xh = w),
                        { events: e, reidentify: !!h, appId: f }
                    );
                } catch (n) {
                    return 'unexpected exception handling '.concat(t.operation, ' API call: ').concat(n.message), r;
                }
            }),
            t
        );
    })();
    function kv(t, n) {
        n && t.push(n);
    }
    var _v = (((dv = {})[ti.User] = 'setVars'), (dv[ti.Event] = 'event'), dv),
        Av = x || K || g,
        Iv = (function () {
            function t(t, n) {
                void 0 === n &&
                    (n = function (t) {
                        return new WebSocket(t);
                    }),
                    (this.Kh = n),
                    (this.Rh = !1),
                    (this.Mh = !1),
                    (this.Ht = {}),
                    (this.Qu = 1),
                    (this.ut = t),
                    (this.et = t.options.scheme),
                    (this.st = t.options.cdnHost);
            }
            return (
                (t.isSupported = function () {
                    return 'WebSocket' in window;
                }),
                (t.prototype.page = function (t) {
                    var n = this;
                    return new _e(function (i, r) {
                        n.Oh(
                            { Cmd: bi.Page, Page: t },
                            hu(n.ut),
                            function (t) {
                                t.Cmd === ki.Page
                                    ? i(t.Page)
                                    : ('socket: unexpected page response: '.concat(t.Cmd), r(t.Cmd));
                            },
                            r
                        );
                    });
                }),
                (t.prototype.settings = function (t) {
                    var n = at(this.ut.window);
                    if (n) return _e.resolve(n);
                    var i = t.previewMode ? hu(this.ut) : this.st;
                    return cu(this.ut.window, this.et, i, t);
                }),
                (t.prototype.event = function (t) {
                    return this.Gc({ req: bi.Event, rsp: ki.Event }, t);
                }),
                (t.prototype.bundle = function (t) {
                    return this.Gc({ req: bi.Bundle, rsp: ki.Bundle }, t);
                }),
                (t.prototype.Gc = function (t, n) {
                    return r(this, void 0, _e, function () {
                        var i,
                            r,
                            s,
                            u = this;
                        return e(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, je()];
                                case 1:
                                    return (
                                        e.sent(),
                                        (i = n.deltaT),
                                        (r = n.serverPageStart),
                                        (s = n.serverBundleTime),
                                        [
                                            2,
                                            new _e(function (e, o) {
                                                var a = hu(u.ut);
                                                Ev(n.recHost, a);
                                                var c = n.bundle,
                                                    h = c[0],
                                                    f = {
                                                        Bundle: Tv(c[1]),
                                                        DeltaT: null === i ? void 0 : i,
                                                        OrgId: n.orgId,
                                                        PageId: n.pageId,
                                                        PageStart: null == r ? void 0 : r,
                                                        PrevBundleTime: null == s ? void 0 : s,
                                                        Seq: h,
                                                        SessionId: n.sessionId,
                                                        UserId: n.userId,
                                                    },
                                                    v = u.Oh(
                                                        { Cmd: t.req, Bundle: f },
                                                        a,
                                                        function (n) {
                                                            n.Cmd === t.rsp
                                                                ? e([null != v ? v : 0, n.Bundle])
                                                                : 'socket: unexpected bundle response: '.concat(n.Cmd);
                                                        },
                                                        o
                                                    );
                                            }),
                                        ]
                                    );
                            }
                        });
                    });
                }),
                (t.prototype.bundleBeacon = function (t) {
                    var n = hu(this.ut);
                    return Ev(t.recHost, n), su(this.et, n, t);
                }),
                (t.prototype.startBeacon = function (t) {
                    return uu(this.ut.window, this.et, hu(this.ut), t);
                }),
                (t.prototype.Oh = function (t, n, i, r) {
                    var e = t;
                    e.Seq = this.Qu++;
                    var s = fr(e);
                    return (this.Ht[e.Seq] = { payload: s, win: i, lose: r }), this.jh(n), s.length;
                }),
                (t.prototype.Ph = function (t) {
                    var n;
                    try {
                        n = pr(t);
                    } catch (t) {
                        return void 'socket: error parsing frame: '.concat(t);
                    }
                    var i = this.Ht[n.Seq];
                    delete this.Ht[n.Seq],
                        i
                            ? n.Cmd === ki.Error
                                ? (n.Fail.Error, i.lose(new Lr(n.Fail.Status, n.Fail.Error)))
                                : i.win(n)
                            : 'socket: mismatched request seq '.concat(n.Seq, '; ignoring');
                }),
                (t.prototype.Uh = function () {
                    if (this.Mh && this.Nh)
                        for (var t in this.Ht) {
                            var n = this.Ht[t];
                            n.sent || (this.Nh.send(n.payload), (n.sent = !0));
                        }
                }),
                (t.prototype.Lh = function () {
                    for (var t in this.Ht) {
                        var n = this.Ht[t];
                        n.sent && (delete this.Ht[t], n.lose(new Lr(0, 'Pending request')));
                    }
                }),
                (t.prototype.jh = function (t) {
                    var n = this;
                    if (this.Mh) this.Uh();
                    else if (!this.Rh) {
                        this.Rh = !0;
                        var i = ''.concat('https:' == this.et ? 'wss:' : 'ws:', '//').concat(t, '/rec/sock');
                        (this.Nh = this.Kh(i)),
                            (this.Nh.onopen = function (t) {
                                (n.Rh = !1), (n.Mh = !0), n.Uh();
                            }),
                            (this.Nh.onmessage = function (t) {
                                n.Ph(t.data), n.Uh();
                            }),
                            (this.Nh.onclose = function (t) {
                                (n.Rh = n.Mh = !1), n.Lh();
                            }),
                            (this.Nh.onerror = function (t) {
                                (n.Rh = n.Mh = !1), n.Lh();
                            });
                    }
                }),
                t
            );
        })();
    function Ev(t, n) {
        t && yu(n === t, 'sock recHost mismatch');
    }
    function Tv(t) {
        if ('string' === t.type) return JSON.parse(t.data);
        throw new Error('Unexpected bundle type: '.concat(t.type));
    }
    var Cv = (function () {
            function t(t) {
                (this.Dh = !1), (this.fa = t);
            }
            return (
                (t.prototype.flush = function () {
                    this.fa(), (this.Dh = !1);
                }),
                (t.prototype.schedule = function () {
                    var t = this;
                    this.Dh ||
                        ((this.Dh = !0),
                        _e
                            .resolve()
                            .then(function () {
                                t.flush();
                            })
                            ['catch'](function (t) {
                                return wu.sendErr(t);
                            }));
                }),
                t
            );
        })(),
        xv = (function () {
            function t() {
                this.Fh = {
                    start: [],
                    shutdown: [],
                    'internal/bundle': [],
                    'internal/error': [],
                    'internal/fs-init': [],
                };
            }
            return (
                (t.prototype.registerListener = function (t, n) {
                    var i;
                    if (-1 === If.indexOf(t) || !n) throw new Error('Invalid event type or missing callback.');
                    var r = { disconnected: !1, callback: n, count: 0 },
                        e = (null !== (i = this.Fh[t]) && void 0 !== i ? i : []).filter(function (t) {
                            return !t.disconnected;
                        });
                    return (
                        e.push(r),
                        (this.Fh[t] = e),
                        {
                            disconnect: function () {
                                r.disconnected = !0;
                            },
                        }
                    );
                }),
                (t.prototype.hasListeners = function (t) {
                    var n;
                    return (
                        (null !== (n = this.Fh[t]) && void 0 !== n ? n : []).length > 0 &&
                        this.Fh[t].some(function (t) {
                            return !t.disconnected;
                        })
                    );
                }),
                (t.prototype.takeRecords = function (t) {
                    var n,
                        i = null !== (n = this.Fh[t.type]) && void 0 !== n ? n : [];
                    if (0 !== i.length)
                        for (var r = 0, e = i; r < e.length; r++) {
                            var s = e[r];
                            if (!(s.disconnected || (s.count > 0 && t.once))) {
                                s.count += 1;
                                try {
                                    s.callback(t.data);
                                } catch (t) {
                                    'Recording observer callback error: '.concat(Zu(t));
                                }
                            }
                        }
                }),
                t
            );
        })(),
        Kv = (function () {
            function t(t) {
                var n = this;
                (this.Mi = t),
                    (this.Ht = []),
                    (this.pa = new Cv(function () {
                        n.fa();
                    }));
            }
            return (
                (t.prototype.addEvent = function (t) {
                    this.Mi.hasListeners(t.type) && (this.Ht.push(t), this.pa.schedule());
                }),
                (t.prototype.fa = function () {
                    for (var t = 0, n = this.Ht; t < n.length; t++) {
                        var i = n[t];
                        this.Mi.takeRecords(i);
                    }
                    this.Ht = [];
                }),
                t
            );
        })();
    function Rv(t) {
        if (
            t === top ||
            et(t) ||
            (function (t) {
                return !!Y(t, '_fs_run_in_iframe', 'boolean');
            })(t) ||
            st(t)
        )
            return !0;
        try {
            return t.parent.document, Rv(t.parent);
        } catch (t) {}
        return !1;
    }
    function Mv(t) {
        return !k &&
            t.postMessage &&
            t.MutationObserver &&
            Ov(Ct, function (t, n) {
                n.disconnect();
            }) &&
            Ov(t.Map) &&
            Ov(t.Set) &&
            Ov(t.WeakMap) &&
            xt.snapshot.status !== Et.UnrecoverableFailure
            ? !!Rv(t) || !1
            : ((function (t) {
                  try {
                      t.snapshot.status === Et.UnrecoverableFailure &&
                          (l || wu.sendErr(new Error(t.snapshot.errors[0])), t.snapshot.errors.forEach(A));
                  } catch (t) {}
              })(xt),
              !1);
    }
    function Ov(t, n) {
        try {
            if (t) return void 0 !== n ? new t(n) : new t(), !0;
        } catch (t) {}
        return !1;
    }
    var jv = function (t, n) {
            var i, r, e;
            switch (n) {
                case 'url.now':
                    return null !== (i = t.getCurrentSessionURL(!0)) && void 0 !== i ? i : null;
                case 'id':
                    return null !== (r = t.getCurrentSession()) && void 0 !== r ? r : null;
                default:
                    return null !== (e = t.getCurrentSessionURL()) && void 0 !== e ? e : null;
            }
        },
        Pv = Ai.DefaultStatsSettings,
        Uv = Pv.MaxEventTypeLength,
        Nv = Pv.MaxPayloadLength;
    function Lv(t, n) {
        switch (t) {
            case 'getSession':
            case 'init':
            case 'observe':
            case 'restart':
            case 'setConfig':
            case 'setIdentity':
            case 'shutdown':
            case 'source':
            case 'start':
            case 'trackEvent':
                return { operation: t, option: n };
            case 'setPage':
                return { operation: t, option: { properties: (e = (i = n).properties || i) } };
            case 'stat':
                return {
                    operation: t,
                    option: { event_type: (i = n).eventType || i.event_type, properties: i.payload || i.properties },
                };
            case 'log':
                var i = n;
                return xt.arrayIsArray(n) && (i = { level: n[0], msg: n[1] }), { operation: t, option: i };
            case 'setVars':
            case 'setProperties':
                var r = ov.SetProperties;
                return (
                    (i = n),
                    xt.arrayIsArray(n) && (i = { type: n[0], properties: (e = n[1]) }),
                    { operation: r, option: i }
                );
            case 'event':
                return (
                    (i = n),
                    n && 'object' == typeof n && 'n' in n && (i = { name: n.n, properties: n.p }),
                    { operation: (r = ov.TrackEvent), option: i }
                );
            case 'user':
                var e = n;
                return { operation: (r = ov.SetProperties), option: { type: 'user', properties: e } };
            case 'consent':
                var s = n;
                return { operation: (r = ov.SetIdentity), option: { consent: s } };
            case 'rec':
                return n ? { operation: ov.Restart } : { operation: (r = ov.Shutdown) };
            default:
                'Unrecognized api: '.concat(t);
        }
    }
    var Dv = 'must be an object';
    function Fv(t) {
        return !!t && 'object' == typeof t;
    }
    function Bv(t, n) {
        return n in t;
    }
    function Wv(t, n) {
        return 'Init Api - invalid '.concat(t, ' config, ').concat(n);
    }
    function Hv(t) {
        var n;
        if (!t || 'object' != typeof t) return !1;
        var i = t;
        return (
            zv(i.target, ['any', 'exclude', 'mask']) &&
            zv(i.tag) &&
            zv(i.action, ['erase', 'maskText', 'scrubUrl', 'scrubCss']) &&
            zv(null !== (n = i.type) && void 0 !== n ? n : 'static', ['static', 'prefix'])
        );
    }
    function zv(t, n) {
        return void 0 === n && (n = []), 'string' == typeof t && (0 === n.length || -1 !== n.indexOf(t));
    }
    function qv(t, n) {
        return t('function' == typeof n ? n() : n);
    }
    function $v(t, n, i, r) {
        return (
            void 0 === r && (r = Ai.DefaultRecDisabledMessage),
            {
                commit: function (n) {
                    if (t) return qv(Ut(t), null != n ? n : i);
                },
                discard: function (t) {
                    if (n) return Vv(Ut(n), null != t ? t : r);
                },
            }
        );
    }
    function Vv(t, n) {
        if ((void 0 === n && (n = Ai.DefaultRecDisabledMessage), t)) {
            var i = n;
            try {
                i = new Error(n);
            } catch (t) {}
            qv(Ut(t), i);
        }
    }
    function Gv(t, n, i) {
        void 0 === n && (n = !1);
        for (var r = 0, e = t.commit; r < e.length; r++) {
            var s = e[r];
            n ? s.discard(i) : s.commit();
        }
        for (var u = 0, o = t.discard; u < o.length; u++) (s = o[u]).discard(i);
        (t.commit = []), (t.discard = []);
    }
    var Qv = [ov.GetSession, ov.Observe, ov.SetProperties, ov.Source, ov.TrackEvent],
        Xv = [ov.Observe];
    function Yv(t, n) {
        try {
            var i = t[1],
                r = t[3],
                e = void 0 === r ? Dt : r,
                s = i,
                u = s.type,
                o = s.callback;
            e(n.registerListener(u, o));
        } catch (t) {}
    }
    var Jv = (function (t) {
            function i(n) {
                void 0 === n && (n = 250);
                var i = t.call(this) || this;
                return (i.Bh = xt.mathMax(0, n)), i;
            }
            return (
                n(i, t),
                (i.prototype.Bn = function () {
                    var t = this;
                    (function (t) {
                        return r(this, void 0, _e, function () {
                            var n;
                            return e(this, function (i) {
                                switch (i.label) {
                                    case 0:
                                        return (n = xt.requestWindowIdleCallback)
                                            ? [
                                                  2,
                                                  new _e(function (i) {
                                                      n(window, i, { timeout: t });
                                                  }),
                                              ]
                                            : [4, Ie(t)];
                                    case 1:
                                        return i.sent(), [2, Ue(42)];
                                }
                            });
                        });
                    })(this.Bh).then(function (n) {
                        n.didTimeout
                            ? je().then(function () {
                                  return t.Fn(Ue(36));
                              })
                            : t.Fn(n);
                    });
                }),
                i
            );
        })(Co),
        Zv = (function (t) {
            function i(n) {
                var i = t.call(this) || this;
                return (i.xi = n), i;
            }
            return (
                n(i, t),
                (i.prototype.Bn = function () {
                    var t = this;
                    Pe().then(function () {
                        Ne(t.xi).then(function () {
                            return t.Fn(Ue(36));
                        });
                    });
                }),
                i
            );
        })(Co),
        tl = (function () {
            function t() {}
            return (
                (t.prototype.createTopRecorder = function (t) {
                    var n;
                    return (
                        (n = ut(t.window)
                            ? new wf(ct(t.window))
                            : Y(t.window, '_fs_use_socket', 'boolean') && Iv.isSupported()
                              ? new Iv(t)
                              : new Xs(t)),
                        new Xf(t, n)
                    );
                }),
                (t.prototype.createInnerRecorder = function (t) {
                    return new Zf(t);
                }),
                t
            );
        })(),
        nl = (function () {
            function t(t, n) {
                void 0 === t && (t = window),
                    void 0 === n && (n = new tl()),
                    (this.xi = t),
                    (this.Wh = n),
                    (this.et = 'https:'),
                    (this.Hh = !1),
                    (this.zh = !1),
                    (this.qh = !0),
                    (this.$h = new Sv()),
                    (this.Vh = xi.Shutdown),
                    (this.Gh = { commit: [], discard: [] }),
                    (this.Qh = new xv()),
                    (this.Xh = new Kv(this.Qh));
            }
            return (
                (t.prototype.init = function () {
                    var t, n;
                    H(this.xi) ||
                        (this.xi,
                        (t = this.xi),
                        (n = W(this.xi)),
                        (t[D] = n),
                        n in t || (t[n] = {}),
                        (function (t) {
                            var n = (function (t, n) {
                                try {
                                    if (ot(t)) return i(i({}, n), { status: Et.Clean });
                                    if (!t.document || n.status !== Et.Unknown) return n;
                                    var r = (function (t, n) {
                                        var r = n.functions,
                                            e = new Set(),
                                            s = {},
                                            u = i({}, n.helpers);
                                        if (
                                            ((u.functionToString = (function (t, n) {
                                                var i,
                                                    r,
                                                    e =
                                                        null === (i = t['__core-js_shared__']) || void 0 === i
                                                            ? void 0
                                                            : i.inspectSource;
                                                if (e) {
                                                    var s = function () {
                                                        return e(this);
                                                    };
                                                    if (gt(s, 2)) return s;
                                                }
                                                var u =
                                                    null === (r = t['__core-js_shared__']) || void 0 === r
                                                        ? void 0
                                                        : r['native-function-to-string'];
                                                if (gt(u)) return u;
                                                var o = n[St];
                                                return gt(o) ? o : gt(n) ? n : void 0;
                                            })(t, u.functionToString)),
                                            !u.functionToString)
                                        )
                                            return n;
                                        var o = !1;
                                        for (var a in r)
                                            r[a]
                                                ? ((s[a] = _t(u.functionToString, r[a])),
                                                  s[a] || (s[a] = It(u.functionToString, u, a)),
                                                  s[a] ? s[a] !== r[a] && (o = !0) : ((o = !0), e.add(a)))
                                                : (s[a] = void 0);
                                        return {
                                            status: e.size > 0 ? Et.Mixed : Et.Clean,
                                            functions: o ? s : r,
                                            helpers: u,
                                            errors: [],
                                            dirty: e,
                                        };
                                    })(t, n);
                                    if (r.status === Et.Clean) return r;
                                    var e = (function (t) {
                                        var n = t.document.createElement('iframe');
                                        return (
                                            (n.id = 'FullStory-iframe'),
                                            (n.className = 'fs-hide'),
                                            (n.style.display = 'none'),
                                            n
                                        );
                                    })(t);
                                    try {
                                        (function (t) {
                                            var n = t.document,
                                                i = n.documentElement,
                                                r = n.body || n.head || i || n;
                                            return (function (t) {
                                                return !!Y(t, '_fs_windex_iframe', 'boolean');
                                            })(t)
                                                ? r
                                                : i || r;
                                        })(t).appendChild(e);
                                    } catch (t) {
                                        return i(i({}, n), { status: Et.Clean });
                                    }
                                    if (!e.contentWindow) return i(i({}, n), { status: Et.Clean });
                                    var s = Kt(e.contentWindow, Et.Clean);
                                    s.dirty = r.dirty;
                                    var u = Tn(e);
                                    return (
                                        Av && u && (e.contentWindow.close(), u.removeChild(e)),
                                        s.status === Et.UnrecoverableFailure ? i(i({}, n), { status: Et.Clean }) : s
                                    );
                                } catch (t) {
                                    return wu.sendErr(t), i(i({}, n), { status: Et.Clean });
                                }
                            })(t, xt.snapshot);
                            xt.rebuildFromSnapshot(n);
                        })(this.xi),
                        this.Yh(),
                        this.Jh(),
                        this.xi,
                        this.Xh.addEvent({ type: Sf.INTERNAL_FS_INIT, data: {} }));
                }),
                (t.prototype.Zh = function () {
                    var t = (function (t) {
                        var n,
                            i = {
                                orgId: it(t) || '',
                                script: J(t) || '',
                                recHost: tt(t) || '',
                                cdnHost: Z(t) || '',
                                appHost: nt(t) || '',
                                captureOnStartup: rt(t),
                                disableResume: null !== (n = ht(t)) && void 0 !== n && n,
                            };
                        return i.orgId &&
                            -1 === i.orgId.indexOf('FULLSTORY_KEY') &&
                            i.script &&
                            i.recHost &&
                            i.cdnHost &&
                            i.appHost
                            ? ('\n    script: '
                                  .concat(i.script, '\n    recording host: ')
                                  .concat(i.recHost, '\n    cdn host: ')
                                  .concat(i.cdnHost, '\n    orgid: ')
                                  .concat(i.orgId, '\n    captureOnStartup: ')
                                  .concat(i.captureOnStartup, '\n    disableResume: ')
                                  .concat(i.disableResume, '\n  '),
                              i)
                            : null;
                    })(this.xi);
                    if (null === t) return !1;
                    var n = t.appHost,
                        i = t.cdnHost,
                        r = t.orgId,
                        e = t.recHost,
                        s = t.script,
                        u = t.captureOnStartup,
                        o = t.disableResume;
                    return (
                        (this.La = n),
                        (this.st = i),
                        (this.ko = r),
                        (this.Na = e),
                        (this.Ua = s),
                        (this.tf = u),
                        (this.nf = o),
                        'localhost:8080' == this.Na && (this.et = 'http:'),
                        (this['if'] = (function (t, n) {
                            var i,
                                r = st(n);
                            return (
                                et(n)
                                    ? (i = !1)
                                    : n !== top
                                      ? (i = !0)
                                      : r
                                        ? t && r.init && r.init(t) && (i = !0)
                                        : (i = !1),
                                i
                            );
                        })(r, this.xi)),
                        (this.zh = (function (t) {
                            var n,
                                i = z(t);
                            return null !== (n = null == i ? void 0 : i._native) && void 0 !== n && n;
                        })(this.xi)),
                        void 0 !== this['if'] && Mv(this.xi)
                    );
                }),
                (t.prototype.getCurrentSessionURL = function (t) {
                    return this.rf(t ? 'url.now' : 'url');
                }),
                (t.prototype.getCurrentSession = function () {
                    return this.rf('id');
                }),
                (t.prototype.rf = function (t) {
                    return this.ef ? jv(this.ef, t) : null;
                }),
                (t.prototype.enableConsole = function () {
                    this._api(ov.SetConfig, { console: !0 });
                }),
                (t.prototype.disableConsole = function () {
                    this._api(ov.SetConfig, { console: !1 });
                }),
                (t.prototype.restart = function () {
                    this._api(ov.Restart);
                }),
                (t.prototype.shutdown = function () {
                    this._api(ov.Shutdown);
                }),
                (t.prototype.log = function () {
                    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                    this._api(ov.Log, t);
                }),
                (t.prototype.sf = function (t) {
                    void 0 === t && (t = Ln.Api),
                        (this.Vh = xi.Shutdown),
                        this.ef &&
                            !this.uf &&
                            (this.ef.shutdown(t),
                            (this.ef = null),
                            this['if'] || this.$h.unloadCrossPageVars(t),
                            this.Xh.addEvent({ type: Sf.SHUTDOWN, data: { reason: t } }));
                }),
                (t.prototype.af = function (t) {
                    if ((void 0 === t && (t = !1), this.qh)) {
                        if (this.uf) return this.uf(), void (this.uf = null);
                        if (this.ef) {
                            if (!t) return;
                            this.sf(Ln.FsShutdownFrame);
                        }
                        this.cf(!0);
                    }
                }),
                (t.prototype.Hu = function (t, n) {
                    return r(this, void 0, _e, function () {
                        return e(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    return n && null == this.uh
                                        ? [2]
                                        : this.Vh === xi.Starting
                                          ? ((this.hf = [t, n]), [2])
                                          : (this.sf(t), [4, Ie(0)]);
                                case 1:
                                    return i.sent(), [4, Ie(0)];
                                case 2:
                                    return (
                                        i.sent(),
                                        n && this.uh && rl(this.uh),
                                        (t === Ln.Hibernation && this.nf) || this.af(),
                                        [2]
                                    );
                            }
                        });
                    });
                }),
                (t.prototype._api = function (t, n, i, r, e, s) {
                    if (this.qh && this.Vh !== xi.Fatal) {
                        var u,
                            o = 'start' === t || 'restart' === t,
                            a = [
                                t,
                                n,
                                i,
                                r ||
                                    function (t) {
                                        u = t;
                                    },
                                e,
                                s,
                            ];
                        if (!e || this.Vh !== xi.Shutdown || o)
                            return !this.ef || this.hf ? (vt(this.xi, a), void (o && this.af())) : (this.ff(a), u);
                        Vv(e, Ai.ShutdownMessage);
                    } else Vv(e);
                }),
                (t.prototype.ff = function (t) {
                    var n;
                    if (this.ef) {
                        var i =
                                null !== (n = this.vf(this.ef, [t])) && void 0 !== n
                                    ? n
                                    : { reidentified: !1, applyApi: function () {} },
                            r = i.applyApi,
                            e = i.sideEffects,
                            s = i.initConfig,
                            u = i.observingStart,
                            o = i.recordingShouldBeEnabled,
                            a = i.reidentified,
                            c = i.nextAppId;
                        il(this.uh, a, c),
                            a
                                ? (vt(this.xi, t), this.Hu(Ln.Reidentify, !0))
                                : this.lf(this.ef, {
                                      applyApi: r,
                                      sideEffects: e,
                                      initConfig: s,
                                      observingStart: u,
                                      recordingShouldBeEnabled: o,
                                  }),
                            void 0 !== o && (o ? this.af() : this.sf(Ln.Api));
                    }
                }),
                (t.prototype.vf = function (t, n) {
                    var i;
                    return (function (t, n) {
                        for (
                            var i,
                                r,
                                e,
                                s,
                                u,
                                o,
                                a,
                                c,
                                h,
                                f = n.appHashKey,
                                v = n.inFrame,
                                l = n.initConfig,
                                d = n.inWebView,
                                p = n.recorder,
                                w = n.recordingObserver,
                                g = n.state,
                                m = n.vars,
                                y = (function (t) {
                                    for (var n = [], i = 0, r = t; i < r.length; i++) {
                                        var e = r[i],
                                            s = e[0],
                                            u = e[1],
                                            o = e[2],
                                            a = e[3],
                                            c = e[4],
                                            h = e[5],
                                            f = Lv(s, u);
                                        f &&
                                            ((f.source = 'string' == typeof o ? { integration: o } : o),
                                            (f.resolve = a),
                                            (f.reject = c),
                                            (f.apiVersion = 2 === h ? 2 : 1),
                                            n.push(f));
                                    }
                                    return n;
                                })(t),
                                b = [],
                                S = !1,
                                k = !1,
                                _ = [],
                                A = [],
                                I = function (t) {
                                    if (m) {
                                        var n = (function (t, n) {
                                                switch (n) {
                                                    case '':
                                                        return '';
                                                    case void 0:
                                                        return t;
                                                    default:
                                                        return Oh(n);
                                                }
                                            })(f, c),
                                            i = m.api(t, n),
                                            r = i.events,
                                            e = i.reidentify,
                                            s = i.appId;
                                        e && ((b = []), (S = !0), A.push.apply(A, _), (_ = [])),
                                            void 0 !== s && (c = s),
                                            b.push.apply(b, r);
                                    }
                                },
                                E = function (t, n) {
                                    !1 !== s || -1 !== Xv.indexOf(t.operation)
                                        ? _.push($v(t.resolve, t.reject, n))
                                        : A.push($v(t.resolve, t.reject, n));
                                },
                                T = function (t, n) {
                                    A.push($v(t.resolve, t.reject, void 0, n));
                                },
                                C = function (t) {
                                    try {
                                        if (
                                            ('Processing api: '.concat(t.operation),
                                            v &&
                                                !(function (t, n) {
                                                    if (-1 === Qv.indexOf(t.operation)) return !1;
                                                    if (t.operation === ov.SetProperties)
                                                        switch (t.option.type) {
                                                            case ti.Document:
                                                                return !0;
                                                            case ti.User:
                                                                return (
                                                                    n &&
                                                                    !(function (t) {
                                                                        try {
                                                                            var n = t.option.properties;
                                                                            if (Ji(n) && ('uid' in n)) return !0;
                                                                        } catch (t) {}
                                                                        return !1;
                                                                    })(t)
                                                                );
                                                            case ti.Page:
                                                                return n;
                                                            default:
                                                                return !0;
                                                        }
                                                    return !0;
                                                })(t, d))
                                        ) {
                                            var n = 'FS.'.concat(t.operation, '() is not available in an inner frame');
                                            return k || (k = !0), T(t, n), 'continue';
                                        }
                                        switch (t.operation) {
                                            case ov.Restart:
                                            case ov.Start:
                                                (s = !0), E(t);
                                                break;
                                            case ov.Shutdown:
                                                E(t), (s = !1);
                                                break;
                                            case ov.Log:
                                                var c = t.option,
                                                    f = c.level,
                                                    m =
                                                        ((n = c.msg),
                                                        p
                                                            .console()
                                                            .logEvent(null != f ? f : 'log', n ? [n] : [], 'fs'));
                                                m && b.push(m), E(t);
                                                break;
                                            case ov.SetIdentity:
                                                var y = function (n) {
                                                    I({
                                                        operation: ov.SetProperties,
                                                        option: n,
                                                        source: t.source,
                                                        resolve: t.resolve,
                                                        reject: t.reject,
                                                        apiVersion: t.apiVersion,
                                                    });
                                                };
                                                t.option && 'object' == typeof t.option
                                                    ? (Object.prototype.hasOwnProperty.call(t.option, 'consent') &&
                                                          (a = null !== (i = t.option.consent) && void 0 !== i && i),
                                                      Object.prototype.hasOwnProperty.call(t.option, 'uid') &&
                                                          y({ type: 'user', properties: { uid: t.option.uid } }),
                                                      Object.prototype.hasOwnProperty.call(t.option, 'properties') &&
                                                          y({
                                                              type: 'user',
                                                              properties:
                                                                  null !== (r = t.option.properties) && void 0 !== r
                                                                      ? r
                                                                      : {},
                                                          }),
                                                      (null === (e = t.option) || void 0 === e
                                                          ? void 0
                                                          : e.anonymous) &&
                                                          y({ type: 'user', properties: { uid: !1 } }))
                                                    : y({ type: 'user', properties: { uid: t.option } }),
                                                    E(t);
                                                break;
                                            case ov.TrackEvent:
                                            case ov.SetPage:
                                            case ov.SetProperties:
                                                I(t), E(t);
                                                break;
                                            case ov.GetSession:
                                                E(t, function () {
                                                    var n;
                                                    return jv(
                                                        p,
                                                        null === (n = t.option) || void 0 === n ? void 0 : n.format
                                                    );
                                                });
                                                break;
                                            case ov.SetConfig:
                                                var S = t.option.console;
                                                (u = S), E(t);
                                                break;
                                            case ov.Stat:
                                                var _ = t.option,
                                                    A = _.event_type,
                                                    C = _.properties;
                                                b.push(
                                                    (function (t, n) {
                                                        var i = 'string' == typeof t ? t.trim().slice(0, Uv) : '';
                                                        return { Kind: cn.STATS, Args: [i, Hs(Zu(n, Nv))] };
                                                    })(A, C)
                                                ),
                                                    E(t);
                                                break;
                                            case ov.Observe:
                                                var x = t.option,
                                                    K = x.type,
                                                    R = x.callback;
                                                K === Sf.START && (o = !0),
                                                    E(t, null == w ? void 0 : w.registerListener(K, R));
                                                break;
                                            case ov.Source:
                                                var M = Bf({
                                                    source: t.option.source,
                                                    type: 'default',
                                                    entrypoint: 'source',
                                                });
                                                b.push(M), E(t);
                                                break;
                                            case ov.Init:
                                                if (g !== xi.Shutdown) {
                                                    T(t, (n = 'Capture already started - init rejected.'));
                                                    break;
                                                }
                                                if (void 0 !== h || void 0 !== l) {
                                                    T(t, (n = 'Multiple calls to init - init rejected.'));
                                                    break;
                                                }
                                                var O = (function (t) {
                                                        var n,
                                                            i = { recoverable: [], unrecoverable: [] };
                                                        if (!Fv(t))
                                                            return i.unrecoverable.push(Wv('options', Dv)), [i, null];
                                                        var r = {};
                                                        if (Bv(t, 'privacy')) {
                                                            var e = (function (t) {
                                                                    var n = 'privacy.attributeBlocklist',
                                                                        i = [];
                                                                    if (!Fv(t))
                                                                        return i.push(Wv('privacy', Dv)), [i, void 0];
                                                                    if (!Bv(t, 'attributeBlocklist'))
                                                                        return [i, void 0];
                                                                    if (!Gi(t.attributeBlocklist))
                                                                        return (
                                                                            i.push(Wv(n, 'must be an array')),
                                                                            [i, void 0]
                                                                        );
                                                                    for (
                                                                        var r = { attributeBlocklist: [] },
                                                                            e = 0,
                                                                            s = t.attributeBlocklist;
                                                                        e < s.length;
                                                                        e++
                                                                    ) {
                                                                        var u = s[e];
                                                                        Hv(u)
                                                                            ? r.attributeBlocklist.push(u)
                                                                            : i.push(
                                                                                  Wv(n, 'invalid rule: '.concat(Zu(u)))
                                                                              );
                                                                    }
                                                                    return [i, r];
                                                                })(t.privacy),
                                                                s = e[0],
                                                                u = e[1];
                                                            (n = i.recoverable).push.apply(n, s), (r.privacy = u);
                                                        }
                                                        return [i, r];
                                                    })(t.option),
                                                    j = O[0],
                                                    P = O[1];
                                                if (j.unrecoverable.length > 0 || null === P) {
                                                    (n = 'Init config rejected: '.concat(j.unrecoverable.join(',\n'))),
                                                        T(t, n);
                                                    break;
                                                }
                                                j.recoverable.length > 0 &&
                                                    (n = 'Init config partially rejected: '.concat(
                                                        j.recoverable.join(',\n')
                                                    )),
                                                    (h = P),
                                                    E(t);
                                                break;
                                            default:
                                                Le(0, 'invalid operation');
                                        }
                                    } catch (i) {
                                        (n = 'unknown error evaluating API'),
                                            wu.send(n, 'error', { err: i }),
                                            ''.concat(n, ' ').concat(i),
                                            T(t, n);
                                    }
                                },
                                x = 0,
                                K = y;
                            x < K.length;
                            x++
                        )
                            C(K[x]);
                        return {
                            applyApi: function () {
                                for (var t = p.queue(), n = 0, i = b; n < i.length; n++) {
                                    var r = i[n];
                                    t.enqueue(r);
                                }
                                void 0 !== a && p.setConsent(a),
                                    void 0 !== h && p.setInitConfig(h),
                                    'boolean' == typeof u &&
                                        (u ? p.console().start({ ConsoleWatcher: !0 }) : p.console().stop());
                            },
                            initConfig: h,
                            recordingShouldBeEnabled: s,
                            reidentified: S,
                            nextAppId: c,
                            observingStart: o,
                            sideEffects: { commit: _, discard: A },
                        };
                    })(n, {
                        appHashKey: null === (i = this.uh) || void 0 === i ? void 0 : i.getAppKeyHash(),
                        inFrame: this['if'],
                        inWebView: this.zh,
                        initConfig: this.Fa,
                        recorder: t,
                        recordingObserver: this.Qh,
                        state: this.Vh,
                        vars: this.$h,
                    });
                }),
                (t.prototype.lf = function (t, n) {
                    var i,
                        r,
                        e = n.applyApi,
                        s = n.sideEffects,
                        u = n.initConfig,
                        o = n.observingStart,
                        a = n.recordingShouldBeEnabled;
                    e();
                    var c = !1 === a,
                        h = t.getIsSessionReady();
                    if (c) Gv(s, !1, Ai.ShutdownMessage);
                    else if (h) {
                        Gv(s);
                        var f = t.getCurrentSessionURL();
                        if (o && f) {
                            var v = t.orgSettings();
                            this.Xh.addEvent({ type: Sf.START, data: { sessionUrl: f, settings: v }, once: !0 });
                        }
                    } else (i = this.Gh.commit).push.apply(i, s.commit), (r = this.Gh.discard).push.apply(r, s.discard);
                    void 0 !== u && (this.Fa = u);
                }),
                (t.prototype._cookies = function () {
                    return this.uh ? this.uh.getCookies() : null;
                }),
                (t.prototype._setCookie = function (t, n) {
                    this.uh && this.uh.setCookie(t, n);
                }),
                (t.prototype._withEventQueue = function (t, n) {
                    if (this.ef) {
                        var i = this.ef.queue(),
                            r = this.ef.pageSignature();
                        null != i &&
                            null != r &&
                            (t === r
                                ? n(i)
                                : Zu(
                                      {
                                          msg: 'Error in _withEventQueue: Page Signature mismatch',
                                          pageSignature: r,
                                          callerSignature: t,
                                      },
                                      1024
                                  ));
                    }
                }),
                (t.prototype._withRecorder = function (t, n) {
                    if (this.ef) {
                        var i = this.ef.pageSignature();
                        null !== i &&
                            (void 0 === t || t === i
                                ? n(this.ef)
                                : Zu(
                                      {
                                          msg: 'Error in _withRecorder: Page Signature mismatch',
                                          pageSignature: i,
                                          callerSignature: t,
                                      },
                                      1024
                                  ));
                    }
                }),
                (t.prototype.Yh = function () {
                    var t = z(this.xi);
                    if (t)
                        for (
                            var n = 0,
                                i = [
                                    'disableConsole',
                                    'enableConsole',
                                    'getCurrentSession',
                                    'getCurrentSessionURL',
                                    'log',
                                    'restart',
                                    'shutdown',
                                    '_api',
                                    '_withEventQueue',
                                    '_withRecorder',
                                    '_cookies',
                                    '_setCookie',
                                ];
                            n < i.length;
                            n++
                        ) {
                            var r = i[n];
                            t[r] = hr(this[r], this, cr);
                        }
                }),
                (t.prototype.Jh = function () {
                    var t = this;
                    'script version '
                        .concat('424cc15e4916da4348dadfd296f8983af6582d5f', ' (compiled at ')
                        .concat(1728062580, ')'),
                        (this.qh = this.Zh()),
                        this.qh
                            ? (this.cf(!1),
                              this.df(),
                              this.xi.addEventListener(
                                  'message',
                                  wu.wrap(function (n) {
                                      return t.pf(n);
                                  })
                              ))
                            : (function (t, n, i) {
                                  for (var r = 0, e = ft(t); r < e.length; r++) {
                                      var s = e[r],
                                          u = s[0],
                                          o = s[4];
                                      -1 !== Xv.indexOf(u) ? u === ov.Observe && Yv(s, n) : Vv(o);
                                  }
                                  i.addEvent({ type: Sf.SHUTDOWN, data: { reason: Ln.SettingsBlocked } });
                              })(this.xi, this.Qh, this.Xh);
                }),
                (t.prototype.wf = function () {
                    var t = this;
                    this.ko &&
                        (this.uh = new hv(
                            this.ko,
                            this.xi,
                            function (n) {
                                for (var i, r = 0, e = n; r < e.length; r++) {
                                    var s = e[r];
                                    null === (i = t.ef) ||
                                        void 0 === i ||
                                        i.queue().enqueue({ Kind: cn.STORAGE_WRITE_FAILURE, Args: s });
                                }
                            },
                            this['if']
                        ));
                }),
                (t.prototype.pf = function (t) {
                    if ('string' == typeof t.data && (t.source == this.xi.parent || t.source == this.xi)) {
                        var n = ef(t.data);
                        switch (n[0]) {
                            case Pi.ShutdownFrame:
                                this.sf(Ln.FsShutdownFrame);
                                break;
                            case Pi.RestartFrame:
                                this.af(n[1]);
                        }
                    }
                }),
                (t.prototype.gf = function (t, n) {
                    var i,
                        r = this,
                        e = xt.mathRound(
                            null !==
                                (i = Ut(function () {
                                    var t;
                                    return null === (t = window.performance) || void 0 === t ? void 0 : t.now();
                                })()) && void 0 !== i
                                ? i
                                : -1
                        );
                    return {
                        window: this.xi,
                        time: new eo(),
                        measurer: new Zv(this.xi),
                        taskQueue: new Jv(2e3),
                        options: {
                            appHost: this.La,
                            orgId: this.ko,
                            recHost: this.Na,
                            cdnHost: this.st,
                            scheme: this.et,
                            script: this.Ua,
                        },
                        recording: {
                            bundleApiVersion: function () {
                                var n, i;
                                return null !==
                                    (i = null === (n = t()) || void 0 === n ? void 0 : n.getBundleApiVersion()) &&
                                    void 0 !== i
                                    ? i
                                    : 'v1';
                            },
                            bundleUploadInterval: function () {
                                var n, i;
                                return null !==
                                    (i = null === (n = t()) || void 0 === n ? void 0 : n.bundleUploadInterval()) &&
                                    void 0 !== i
                                    ? i
                                    : Ai.DefaultBundleUploadInterval;
                            },
                            heartbeatInterval: function () {
                                var n, i;
                                return null !==
                                    (i = null === (n = t()) || void 0 === n ? void 0 : n.heartbeatInterval()) &&
                                    void 0 !== i
                                    ? i
                                    : Ai.HeartbeatInterval;
                            },
                            flags: function () {
                                var n, i;
                                return (
                                    (null === (i = null === (n = t()) || void 0 === n ? void 0 : n.getPageResponse()) ||
                                    void 0 === i
                                        ? void 0
                                        : i.Flags) || {}
                                );
                            },
                            getCurrentSessionURL: function (n) {
                                var i, r;
                                return null !==
                                    (r = null === (i = t()) || void 0 === i ? void 0 : i.getCurrentSessionURL(n)) &&
                                    void 0 !== r
                                    ? r
                                    : null;
                            },
                            identity: this.uh,
                            inFrame: n,
                            inWebView: this.zh,
                            observer: this.Xh,
                            pageResponse: function () {
                                var n;
                                return null === (n = t()) || void 0 === n ? void 0 : n.getPageResponse();
                            },
                            pageSignature: function () {
                                var n, i;
                                return null !== (i = null === (n = t()) || void 0 === n ? void 0 : n.pageSignature()) &&
                                    void 0 !== i
                                    ? i
                                    : null;
                            },
                            preroll: e,
                            splitPage: function (t) {
                                return r.Hu(t, !1);
                            },
                            vars: this.$h,
                        },
                        queue: function () {
                            var n;
                            return null === (n = t()) || void 0 === n ? void 0 : n.queue();
                        },
                    };
                }),
                (t.prototype.mf = function (t, n) {
                    if (n) {
                        for (var i = 0, r = this.$h.getDocumentVars(); i < r.length; i++) {
                            var e = r[i];
                            t.enqueue(e);
                        }
                        var s = this.$h.getCrossPageVars();
                        void 0 !== s && t.enqueue(s);
                    }
                }),
                (t.prototype.Ba = function (t, n) {
                    var i = this;
                    return function (r) {
                        var e = r.sessionUrl,
                            s = r.settings;
                        (i.Vh = xi.Started),
                            n && t.tellAllFramesTo([Pi.RestartFrame]),
                            i.hf && (i.Hu(i.hf[0], i.hf[1]), (i.hf = null)),
                            i.Xh.addEvent({ type: Sf.START, data: { sessionUrl: e, settings: s } }),
                            Gv(i.Gh);
                    };
                }),
                (t.prototype.Wa = function () {
                    var t = this;
                    return function () {
                        (t.Vh = xi.Fatal),
                            t.Xh.addEvent({ type: Sf.SHUTDOWN, data: { reason: Ln.SettingsBlocked } }),
                            Gv(t.Gh, !0);
                    };
                }),
                (t.prototype.yf = function (t, n, i) {
                    void 0 === i && (i = !1), (this.Vh = xi.Starting), t.start(i, this.Ba(t, n), this.Wa());
                }),
                (t.prototype.cf = function (t) {
                    var n;
                    this.wf();
                    var i = this['if'],
                        r = this.gf(function () {
                            return n;
                        }, !!i);
                    (n = i ? this.Wh.createInnerRecorder(r) : this.Wh.createTopRecorder(r)),
                        this.bf(n, t),
                        (this.ef = n);
                }),
                (t.prototype.bf = function (t, n) {
                    var i,
                        r = this;
                    void 0 === n && (n = !1);
                    var e,
                        s = !1,
                        u = [],
                        o = Y(this.xi, '_fs_asset_map_id');
                    o && u.push([U.Vars, [ti.Document, { assetMapId: o }]]),
                        this['if'] ||
                            (this.mf(t.queue(), n),
                            t
                                .queue()
                                .enqueue({
                                    Kind: cn.REC_FEAT_SUPPORTED,
                                    Args: [Gn.CaptureOnStartupEnabled, !1 === this.tf],
                                })),
                        u.push.apply(u, ft(this.xi));
                    var a = null !== (i = this.vf(t, u)) && void 0 !== i ? i : { applyApi: function () {} },
                        c = a.applyApi,
                        h = a.sideEffects,
                        f = a.initConfig,
                        v = a.recordingShouldBeEnabled,
                        l = a.reidentified,
                        d = a.nextAppId,
                        p = a.observingStart;
                    this['if']
                        ? ((s = !1), (e = !1))
                        : (void 0 !== v ? (s = !v) : !1 === this.tf && (s = !0), (this.tf = !0), (e = !!l)),
                        il(this.uh, e, d),
                        this.lf(t, {
                            applyApi: c,
                            sideEffects: h,
                            initConfig: f,
                            observingStart: p,
                            recordingShouldBeEnabled: v,
                        }),
                        s
                            ? (this.uf = function () {
                                  return r.yf(t, n, e);
                              })
                            : this.yf(t, n, e);
                }),
                (t.prototype.df = function () {
                    var t = this,
                        n = function () {
                            t.Hh || ((t.Hh = !0), t.ef && t.ef.onDomLoad());
                        },
                        i = !1,
                        r = function () {
                            i || ((i = !0), t.ef && t.ef.onLoad());
                        };
                    switch (document.readyState) {
                        case 'interactive':
                            n();
                            break;
                        case 'complete':
                            n(), r();
                    }
                    this.Hh || document.addEventListener('DOMContentLoaded', wu.wrap(n)),
                        i ||
                            this.xi.addEventListener(
                                'load',
                                wu.wrap(function (t) {
                                    n(), r();
                                })
                            );
                }),
                t
            );
        })();
    function il(t, n, i) {
        t && (n ? rl(t, i) : '' === i ? t.clearAppId() : void 0 !== i && t.setAppId(i));
    }
    function rl(t, n) {
        t.clear(), n && t.setAppId(n);
    }
    !(function () {
        try {
            new nl().init();
        } catch (t) {
            wu.sendErr(t), 'Failed to initialize FullStory. '.concat(t);
        }
    })();
})();
