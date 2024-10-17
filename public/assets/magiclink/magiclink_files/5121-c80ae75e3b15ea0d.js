'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5121],
    {
        5121: function (e, t, r) {
            r.d(t, {
                Z: function () {
                    return tt;
                },
            });
            var n,
                o,
                i,
                s = {};
            function a(e, t) {
                return function () {
                    return e.apply(t, arguments);
                };
            }
            r.r(s),
                r.d(s, {
                    hasBrowserEnv: function () {
                        return eA;
                    },
                    hasStandardBrowserEnv: function () {
                        return eT;
                    },
                    hasStandardBrowserWebWorkerEnv: function () {
                        return ev;
                    },
                });
            let { toString: l } = Object.prototype,
                { getPrototypeOf: u } = Object,
                c =
                    ((n = Object.create(null)),
                    (e) => {
                        let t = l.call(e);
                        return n[t] || (n[t] = t.slice(8, -1).toLowerCase());
                    }),
                f = (e) => ((e = e.toLowerCase()), (t) => c(t) === e),
                d = (e) => (t) => typeof t === e,
                { isArray: p } = Array,
                h = d('undefined'),
                m = f('ArrayBuffer'),
                g = d('string'),
                y = d('function'),
                b = d('number'),
                E = (e) => null !== e && 'object' == typeof e,
                w = (e) => {
                    if ('object' !== c(e)) return !1;
                    let t = u(e);
                    return (
                        (null === t || t === Object.prototype || null === Object.getPrototypeOf(t)) &&
                        !(Symbol.toStringTag in e) &&
                        !(Symbol.iterator in e)
                    );
                },
                O = f('Date'),
                S = f('File'),
                R = f('Blob'),
                A = f('FileList'),
                T = (e) => E(e) && y(e.pipe),
                v = (e) => {
                    let t;
                    return (
                        e &&
                        (('function' == typeof FormData && e instanceof FormData) ||
                            (y(e.append) &&
                                ('formdata' === (t = c(e)) ||
                                    ('object' === t && y(e.toString) && '[object FormData]' === e.toString()))))
                    );
                },
                N = f('URLSearchParams'),
                j = (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
            function C(e, t, { allOwnKeys: r = !1 } = {}) {
                let n, o;
                if (null != e) {
                    if (('object' != typeof e && (e = [e]), p(e)))
                        for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
                    else {
                        let o;
                        let i = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
                            s = i.length;
                        for (n = 0; n < s; n++) (o = i[n]), t.call(null, e[o], o, e);
                    }
                }
            }
            function x(e, t) {
                let r;
                t = t.toLowerCase();
                let n = Object.keys(e),
                    o = n.length;
                for (; o-- > 0; ) if (t === (r = n[o]).toLowerCase()) return r;
                return null;
            }
            let _ =
                    'undefined' != typeof globalThis
                        ? globalThis
                        : 'undefined' != typeof self
                          ? self
                          : 'undefined' != typeof window
                            ? window
                            : global,
                P = (e) => !h(e) && e !== _,
                U = (e, t, r, { allOwnKeys: n } = {}) => (
                    C(
                        t,
                        (t, n) => {
                            r && y(t) ? (e[n] = a(t, r)) : (e[n] = t);
                        },
                        { allOwnKeys: n }
                    ),
                    e
                ),
                B = (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
                F = (e, t, r, n) => {
                    (e.prototype = Object.create(t.prototype, n)),
                        (e.prototype.constructor = e),
                        Object.defineProperty(e, 'super', { value: t.prototype }),
                        r && Object.assign(e.prototype, r);
                },
                k = (e, t, r, n) => {
                    let o, i, s;
                    let a = {};
                    if (((t = t || {}), null == e)) return t;
                    do {
                        for (i = (o = Object.getOwnPropertyNames(e)).length; i-- > 0; )
                            (s = o[i]), (!n || n(s, e, t)) && !a[s] && ((t[s] = e[s]), (a[s] = !0));
                        e = !1 !== r && u(e);
                    } while (e && (!r || r(e, t)) && e !== Object.prototype);
                    return t;
                },
                L = (e, t, r) => {
                    (e = String(e)), (void 0 === r || r > e.length) && (r = e.length), (r -= t.length);
                    let n = e.indexOf(t, r);
                    return -1 !== n && n === r;
                },
                D = (e) => {
                    if (!e) return null;
                    if (p(e)) return e;
                    let t = e.length;
                    if (!b(t)) return null;
                    let r = Array(t);
                    for (; t-- > 0; ) r[t] = e[t];
                    return r;
                },
                q = ((o = 'undefined' != typeof Uint8Array && u(Uint8Array)), (e) => o && e instanceof o),
                I = (e, t) => {
                    let r;
                    let n = e && e[Symbol.iterator],
                        o = n.call(e);
                    for (; (r = o.next()) && !r.done; ) {
                        let n = r.value;
                        t.call(e, n[0], n[1]);
                    }
                },
                z = (e, t) => {
                    let r;
                    let n = [];
                    for (; null !== (r = e.exec(t)); ) n.push(r);
                    return n;
                },
                M = f('HTMLFormElement'),
                H = (e) =>
                    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, r) {
                        return t.toUpperCase() + r;
                    }),
                J = (
                    ({ hasOwnProperty: e }) =>
                    (t, r) =>
                        e.call(t, r)
                )(Object.prototype),
                W = f('RegExp'),
                V = (e, t) => {
                    let r = Object.getOwnPropertyDescriptors(e),
                        n = {};
                    C(r, (r, o) => {
                        let i;
                        !1 !== (i = t(r, o, e)) && (n[o] = i || r);
                    }),
                        Object.defineProperties(e, n);
                },
                K = (e) => {
                    V(e, (t, r) => {
                        if (y(e) && -1 !== ['arguments', 'caller', 'callee'].indexOf(r)) return !1;
                        let n = e[r];
                        if (y(n)) {
                            if (((t.enumerable = !1), 'writable' in t)) {
                                t.writable = !1;
                                return;
                            }
                            t.set ||
                                (t.set = () => {
                                    throw Error("Can not rewrite read-only method '" + r + "'");
                                });
                        }
                    });
                },
                $ = (e, t) => {
                    let r = {};
                    return (
                        ((e) => {
                            e.forEach((e) => {
                                r[e] = !0;
                            });
                        })(p(e) ? e : String(e).split(t)),
                        r
                    );
                },
                G = () => {},
                X = (e, t) => (Number.isFinite((e = +e)) ? e : t),
                Q = 'abcdefghijklmnopqrstuvwxyz',
                Z = '0123456789',
                Y = { DIGIT: Z, ALPHA: Q, ALPHA_DIGIT: Q + Q.toUpperCase() + Z },
                ee = (e = 16, t = Y.ALPHA_DIGIT) => {
                    let r = '',
                        { length: n } = t;
                    for (; e--; ) r += t[(Math.random() * n) | 0];
                    return r;
                },
                et = (e) => {
                    let t = Array(10),
                        r = (e, n) => {
                            if (E(e)) {
                                if (t.indexOf(e) >= 0) return;
                                if (!('toJSON' in e)) {
                                    t[n] = e;
                                    let o = p(e) ? [] : {};
                                    return (
                                        C(e, (e, t) => {
                                            let i = r(e, n + 1);
                                            h(i) || (o[t] = i);
                                        }),
                                        (t[n] = void 0),
                                        o
                                    );
                                }
                            }
                            return e;
                        };
                    return r(e, 0);
                },
                er = f('AsyncFunction'),
                en = (e) => e && (E(e) || y(e)) && y(e.then) && y(e.catch);
            var eo = {
                isArray: p,
                isArrayBuffer: m,
                isBuffer: function (e) {
                    return (
                        null !== e &&
                        !h(e) &&
                        null !== e.constructor &&
                        !h(e.constructor) &&
                        y(e.constructor.isBuffer) &&
                        e.constructor.isBuffer(e)
                    );
                },
                isFormData: v,
                isArrayBufferView: function (e) {
                    return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                        ? ArrayBuffer.isView(e)
                        : e && e.buffer && m(e.buffer);
                },
                isString: g,
                isNumber: b,
                isBoolean: (e) => !0 === e || !1 === e,
                isObject: E,
                isPlainObject: w,
                isUndefined: h,
                isDate: O,
                isFile: S,
                isBlob: R,
                isRegExp: W,
                isFunction: y,
                isStream: T,
                isURLSearchParams: N,
                isTypedArray: q,
                isFileList: A,
                forEach: C,
                merge: function e() {
                    let { caseless: t } = (P(this) && this) || {},
                        r = {},
                        n = (n, o) => {
                            let i = (t && x(r, o)) || o;
                            w(r[i]) && w(n)
                                ? (r[i] = e(r[i], n))
                                : w(n)
                                  ? (r[i] = e({}, n))
                                  : p(n)
                                    ? (r[i] = n.slice())
                                    : (r[i] = n);
                        };
                    for (let e = 0, t = arguments.length; e < t; e++) arguments[e] && C(arguments[e], n);
                    return r;
                },
                extend: U,
                trim: j,
                stripBOM: B,
                inherits: F,
                toFlatObject: k,
                kindOf: c,
                kindOfTest: f,
                endsWith: L,
                toArray: D,
                forEachEntry: I,
                matchAll: z,
                isHTMLForm: M,
                hasOwnProperty: J,
                hasOwnProp: J,
                reduceDescriptors: V,
                freezeMethods: K,
                toObjectSet: $,
                toCamelCase: H,
                noop: G,
                toFiniteNumber: X,
                findKey: x,
                global: _,
                isContextDefined: P,
                ALPHABET: Y,
                generateString: ee,
                isSpecCompliantForm: function (e) {
                    return !!(e && y(e.append) && 'FormData' === e[Symbol.toStringTag] && e[Symbol.iterator]);
                },
                toJSONObject: et,
                isAsyncFn: er,
                isThenable: en,
            };
            function ei(e, t, r, n, o) {
                Error.call(this),
                    Error.captureStackTrace
                        ? Error.captureStackTrace(this, this.constructor)
                        : (this.stack = Error().stack),
                    (this.message = e),
                    (this.name = 'AxiosError'),
                    t && (this.code = t),
                    r && (this.config = r),
                    n && (this.request = n),
                    o && (this.response = o);
            }
            eo.inherits(ei, Error, {
                toJSON: function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: eo.toJSONObject(this.config),
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null,
                    };
                },
            });
            let es = ei.prototype,
                ea = {};
            [
                'ERR_BAD_OPTION_VALUE',
                'ERR_BAD_OPTION',
                'ECONNABORTED',
                'ETIMEDOUT',
                'ERR_NETWORK',
                'ERR_FR_TOO_MANY_REDIRECTS',
                'ERR_DEPRECATED',
                'ERR_BAD_RESPONSE',
                'ERR_BAD_REQUEST',
                'ERR_CANCELED',
                'ERR_NOT_SUPPORT',
                'ERR_INVALID_URL',
            ].forEach((e) => {
                ea[e] = { value: e };
            }),
                Object.defineProperties(ei, ea),
                Object.defineProperty(es, 'isAxiosError', { value: !0 }),
                (ei.from = (e, t, r, n, o, i) => {
                    let s = Object.create(es);
                    return (
                        eo.toFlatObject(
                            e,
                            s,
                            function (e) {
                                return e !== Error.prototype;
                            },
                            (e) => 'isAxiosError' !== e
                        ),
                        ei.call(s, e.message, t, r, n, o),
                        (s.cause = e),
                        (s.name = e.name),
                        i && Object.assign(s, i),
                        s
                    );
                });
            var el = r(21876).Buffer;
            function eu(e) {
                return eo.isPlainObject(e) || eo.isArray(e);
            }
            function ec(e) {
                return eo.endsWith(e, '[]') ? e.slice(0, -2) : e;
            }
            function ef(e, t, r) {
                return e
                    ? e
                          .concat(t)
                          .map(function (e, t) {
                              return (e = ec(e)), !r && t ? '[' + e + ']' : e;
                          })
                          .join(r ? '.' : '')
                    : t;
            }
            let ed = eo.toFlatObject(eo, {}, null, function (e) {
                return /^is[A-Z]/.test(e);
            });
            var ep = function (e, t, r) {
                if (!eo.isObject(e)) throw TypeError('target must be an object');
                (t = t || new FormData()),
                    (r = eo.toFlatObject(r, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (e, t) {
                        return !eo.isUndefined(t[e]);
                    }));
                let n = r.metaTokens,
                    o = r.visitor || c,
                    i = r.dots,
                    s = r.indexes,
                    a = r.Blob || ('undefined' != typeof Blob && Blob),
                    l = a && eo.isSpecCompliantForm(t);
                if (!eo.isFunction(o)) throw TypeError('visitor must be a function');
                function u(e) {
                    if (null === e) return '';
                    if (eo.isDate(e)) return e.toISOString();
                    if (!l && eo.isBlob(e)) throw new ei('Blob is not supported. Use a Buffer instead.');
                    return eo.isArrayBuffer(e) || eo.isTypedArray(e)
                        ? l && 'function' == typeof Blob
                            ? new Blob([e])
                            : el.from(e)
                        : e;
                }
                function c(e, r, o) {
                    let a = e;
                    if (e && !o && 'object' == typeof e) {
                        if (eo.endsWith(r, '{}')) (r = n ? r : r.slice(0, -2)), (e = JSON.stringify(e));
                        else {
                            var l;
                            if (
                                (eo.isArray(e) && ((l = e), eo.isArray(l) && !l.some(eu))) ||
                                ((eo.isFileList(e) || eo.endsWith(r, '[]')) && (a = eo.toArray(e)))
                            )
                                return (
                                    (r = ec(r)),
                                    a.forEach(function (e, n) {
                                        eo.isUndefined(e) ||
                                            null === e ||
                                            t.append(!0 === s ? ef([r], n, i) : null === s ? r : r + '[]', u(e));
                                    }),
                                    !1
                                );
                        }
                    }
                    return !!eu(e) || (t.append(ef(o, r, i), u(e)), !1);
                }
                let f = [],
                    d = Object.assign(ed, { defaultVisitor: c, convertValue: u, isVisitable: eu });
                if (!eo.isObject(e)) throw TypeError('data must be an object');
                return (
                    !(function e(r, n) {
                        if (!eo.isUndefined(r)) {
                            if (-1 !== f.indexOf(r)) throw Error('Circular reference detected in ' + n.join('.'));
                            f.push(r),
                                eo.forEach(r, function (r, i) {
                                    let s =
                                        !(eo.isUndefined(r) || null === r) &&
                                        o.call(t, r, eo.isString(i) ? i.trim() : i, n, d);
                                    !0 === s && e(r, n ? n.concat(i) : [i]);
                                }),
                                f.pop();
                        }
                    })(e),
                    t
                );
            };
            function eh(e) {
                let t = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+', '%00': '\x00' };
                return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
                    return t[e];
                });
            }
            function em(e, t) {
                (this._pairs = []), e && ep(e, this, t);
            }
            let eg = em.prototype;
            function ey(e) {
                return encodeURIComponent(e)
                    .replace(/%3A/gi, ':')
                    .replace(/%24/g, '$')
                    .replace(/%2C/gi, ',')
                    .replace(/%20/g, '+')
                    .replace(/%5B/gi, '[')
                    .replace(/%5D/gi, ']');
            }
            function eb(e, t, r) {
                let n;
                if (!t) return e;
                let o = (r && r.encode) || ey,
                    i = r && r.serialize;
                if ((n = i ? i(t, r) : eo.isURLSearchParams(t) ? t.toString() : new em(t, r).toString(o))) {
                    let t = e.indexOf('#');
                    -1 !== t && (e = e.slice(0, t)), (e += (-1 === e.indexOf('?') ? '?' : '&') + n);
                }
                return e;
            }
            (eg.append = function (e, t) {
                this._pairs.push([e, t]);
            }),
                (eg.toString = function (e) {
                    let t = e
                        ? function (t) {
                              return e.call(this, t, eh);
                          }
                        : eh;
                    return this._pairs
                        .map(function (e) {
                            return t(e[0]) + '=' + t(e[1]);
                        }, '')
                        .join('&');
                });
            var eE = class {
                    constructor() {
                        this.handlers = [];
                    }
                    use(e, t, r) {
                        return (
                            this.handlers.push({
                                fulfilled: e,
                                rejected: t,
                                synchronous: !!r && r.synchronous,
                                runWhen: r ? r.runWhen : null,
                            }),
                            this.handlers.length - 1
                        );
                    }
                    eject(e) {
                        this.handlers[e] && (this.handlers[e] = null);
                    }
                    clear() {
                        this.handlers && (this.handlers = []);
                    }
                    forEach(e) {
                        eo.forEach(this.handlers, function (t) {
                            null !== t && e(t);
                        });
                    }
                },
                ew = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
                eO = 'undefined' != typeof URLSearchParams ? URLSearchParams : em,
                eS = 'undefined' != typeof FormData ? FormData : null,
                eR = 'undefined' != typeof Blob ? Blob : null;
            let eA = 'undefined' != typeof window && 'undefined' != typeof document,
                eT =
                    ((i = 'undefined' != typeof navigator && navigator.product),
                    eA && 0 > ['ReactNative', 'NativeScript', 'NS'].indexOf(i)),
                ev =
                    'undefined' != typeof WorkerGlobalScope &&
                    self instanceof WorkerGlobalScope &&
                    'function' == typeof self.importScripts;
            var eN = {
                    ...s,
                    isBrowser: !0,
                    classes: { URLSearchParams: eO, FormData: eS, Blob: eR },
                    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
                },
                ej = function (e) {
                    if (eo.isFormData(e) && eo.isFunction(e.entries)) {
                        let t = {};
                        return (
                            eo.forEachEntry(e, (e, r) => {
                                !(function e(t, r, n, o) {
                                    let i = t[o++];
                                    if ('__proto__' === i) return !0;
                                    let s = Number.isFinite(+i),
                                        a = o >= t.length;
                                    if (((i = !i && eo.isArray(n) ? n.length : i), a))
                                        return eo.hasOwnProp(n, i) ? (n[i] = [n[i], r]) : (n[i] = r), !s;
                                    (n[i] && eo.isObject(n[i])) || (n[i] = []);
                                    let l = e(t, r, n[i], o);
                                    return (
                                        l &&
                                            eo.isArray(n[i]) &&
                                            (n[i] = (function (e) {
                                                let t, r;
                                                let n = {},
                                                    o = Object.keys(e),
                                                    i = o.length;
                                                for (t = 0; t < i; t++) n[(r = o[t])] = e[r];
                                                return n;
                                            })(n[i])),
                                        !s
                                    );
                                })(
                                    eo.matchAll(/\w+|\[(\w*)]/g, e).map((e) => ('[]' === e[0] ? '' : e[1] || e[0])),
                                    r,
                                    t,
                                    0
                                );
                            }),
                            t
                        );
                    }
                    return null;
                };
            let eC = {
                transitional: ew,
                adapter: ['xhr', 'http'],
                transformRequest: [
                    function (e, t) {
                        let r;
                        let n = t.getContentType() || '',
                            o = n.indexOf('application/json') > -1,
                            i = eo.isObject(e);
                        i && eo.isHTMLForm(e) && (e = new FormData(e));
                        let s = eo.isFormData(e);
                        if (s) return o ? JSON.stringify(ej(e)) : e;
                        if (eo.isArrayBuffer(e) || eo.isBuffer(e) || eo.isStream(e) || eo.isFile(e) || eo.isBlob(e))
                            return e;
                        if (eo.isArrayBufferView(e)) return e.buffer;
                        if (eo.isURLSearchParams(e))
                            return (
                                t.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1), e.toString()
                            );
                        if (i) {
                            if (n.indexOf('application/x-www-form-urlencoded') > -1) {
                                var a, l;
                                return ((a = e),
                                (l = this.formSerializer),
                                ep(
                                    a,
                                    new eN.classes.URLSearchParams(),
                                    Object.assign(
                                        {
                                            visitor: function (e, t, r, n) {
                                                return eN.isNode && eo.isBuffer(e)
                                                    ? (this.append(t, e.toString('base64')), !1)
                                                    : n.defaultVisitor.apply(this, arguments);
                                            },
                                        },
                                        l
                                    )
                                )).toString();
                            }
                            if ((r = eo.isFileList(e)) || n.indexOf('multipart/form-data') > -1) {
                                let t = this.env && this.env.FormData;
                                return ep(r ? { 'files[]': e } : e, t && new t(), this.formSerializer);
                            }
                        }
                        return i || o
                            ? (t.setContentType('application/json', !1),
                              (function (e, t, r) {
                                  if (eo.isString(e))
                                      try {
                                          return (0, JSON.parse)(e), eo.trim(e);
                                      } catch (e) {
                                          if ('SyntaxError' !== e.name) throw e;
                                      }
                                  return (0, JSON.stringify)(e);
                              })(e))
                            : e;
                    },
                ],
                transformResponse: [
                    function (e) {
                        let t = this.transitional || eC.transitional,
                            r = t && t.forcedJSONParsing,
                            n = 'json' === this.responseType;
                        if (e && eo.isString(e) && ((r && !this.responseType) || n)) {
                            let r = t && t.silentJSONParsing;
                            try {
                                return JSON.parse(e);
                            } catch (e) {
                                if (!r && n) {
                                    if ('SyntaxError' === e.name)
                                        throw ei.from(e, ei.ERR_BAD_RESPONSE, this, null, this.response);
                                    throw e;
                                }
                            }
                        }
                        return e;
                    },
                ],
                timeout: 0,
                xsrfCookieName: 'XSRF-TOKEN',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                maxContentLength: -1,
                maxBodyLength: -1,
                env: { FormData: eN.classes.FormData, Blob: eN.classes.Blob },
                validateStatus: function (e) {
                    return e >= 200 && e < 300;
                },
                headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
            };
            eo.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (e) => {
                eC.headers[e] = {};
            });
            let ex = eo.toObjectSet([
                'age',
                'authorization',
                'content-length',
                'content-type',
                'etag',
                'expires',
                'from',
                'host',
                'if-modified-since',
                'if-unmodified-since',
                'last-modified',
                'location',
                'max-forwards',
                'proxy-authorization',
                'referer',
                'retry-after',
                'user-agent',
            ]);
            var e_ = (e) => {
                let t, r, n;
                let o = {};
                return (
                    e &&
                        e.split('\n').forEach(function (e) {
                            (n = e.indexOf(':')),
                                (t = e.substring(0, n).trim().toLowerCase()),
                                (r = e.substring(n + 1).trim()),
                                !t ||
                                    (o[t] && ex[t]) ||
                                    ('set-cookie' === t
                                        ? o[t]
                                            ? o[t].push(r)
                                            : (o[t] = [r])
                                        : (o[t] = o[t] ? o[t] + ', ' + r : r));
                        }),
                    o
                );
            };
            let eP = Symbol('internals');
            function eU(e) {
                return e && String(e).trim().toLowerCase();
            }
            function eB(e) {
                return !1 === e || null == e ? e : eo.isArray(e) ? e.map(eB) : String(e);
            }
            let eF = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
            function ek(e, t, r, n, o) {
                if (eo.isFunction(n)) return n.call(this, t, r);
                if ((o && (t = r), eo.isString(t))) {
                    if (eo.isString(n)) return -1 !== t.indexOf(n);
                    if (eo.isRegExp(n)) return n.test(t);
                }
            }
            class eL {
                constructor(e) {
                    e && this.set(e);
                }
                set(e, t, r) {
                    let n = this;
                    function o(e, t, r) {
                        let o = eU(t);
                        if (!o) throw Error('header name must be a non-empty string');
                        let i = eo.findKey(n, o);
                        (i && void 0 !== n[i] && !0 !== r && (void 0 !== r || !1 === n[i])) || (n[i || t] = eB(e));
                    }
                    let i = (e, t) => eo.forEach(e, (e, r) => o(e, r, t));
                    return (
                        eo.isPlainObject(e) || e instanceof this.constructor
                            ? i(e, t)
                            : eo.isString(e) && (e = e.trim()) && !eF(e)
                              ? i(e_(e), t)
                              : null != e && o(t, e, r),
                        this
                    );
                }
                get(e, t) {
                    if ((e = eU(e))) {
                        let r = eo.findKey(this, e);
                        if (r) {
                            let e = this[r];
                            if (!t) return e;
                            if (!0 === t)
                                return (function (e) {
                                    let t;
                                    let r = Object.create(null),
                                        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                                    for (; (t = n.exec(e)); ) r[t[1]] = t[2];
                                    return r;
                                })(e);
                            if (eo.isFunction(t)) return t.call(this, e, r);
                            if (eo.isRegExp(t)) return t.exec(e);
                            throw TypeError('parser must be boolean|regexp|function');
                        }
                    }
                }
                has(e, t) {
                    if ((e = eU(e))) {
                        let r = eo.findKey(this, e);
                        return !!(r && void 0 !== this[r] && (!t || ek(this, this[r], r, t)));
                    }
                    return !1;
                }
                delete(e, t) {
                    let r = this,
                        n = !1;
                    function o(e) {
                        if ((e = eU(e))) {
                            let o = eo.findKey(r, e);
                            o && (!t || ek(r, r[o], o, t)) && (delete r[o], (n = !0));
                        }
                    }
                    return eo.isArray(e) ? e.forEach(o) : o(e), n;
                }
                clear(e) {
                    let t = Object.keys(this),
                        r = t.length,
                        n = !1;
                    for (; r--; ) {
                        let o = t[r];
                        (!e || ek(this, this[o], o, e, !0)) && (delete this[o], (n = !0));
                    }
                    return n;
                }
                normalize(e) {
                    let t = this,
                        r = {};
                    return (
                        eo.forEach(this, (n, o) => {
                            let i = eo.findKey(r, o);
                            if (i) {
                                (t[i] = eB(n)), delete t[o];
                                return;
                            }
                            let s = e
                                ? o
                                      .trim()
                                      .toLowerCase()
                                      .replace(/([a-z\d])(\w*)/g, (e, t, r) => t.toUpperCase() + r)
                                : String(o).trim();
                            s !== o && delete t[o], (t[s] = eB(n)), (r[s] = !0);
                        }),
                        this
                    );
                }
                concat(...e) {
                    return this.constructor.concat(this, ...e);
                }
                toJSON(e) {
                    let t = Object.create(null);
                    return (
                        eo.forEach(this, (r, n) => {
                            null != r && !1 !== r && (t[n] = e && eo.isArray(r) ? r.join(', ') : r);
                        }),
                        t
                    );
                }
                [Symbol.iterator]() {
                    return Object.entries(this.toJSON())[Symbol.iterator]();
                }
                toString() {
                    return Object.entries(this.toJSON())
                        .map(([e, t]) => e + ': ' + t)
                        .join('\n');
                }
                get [Symbol.toStringTag]() {
                    return 'AxiosHeaders';
                }
                static from(e) {
                    return e instanceof this ? e : new this(e);
                }
                static concat(e, ...t) {
                    let r = new this(e);
                    return t.forEach((e) => r.set(e)), r;
                }
                static accessor(e) {
                    let t = (this[eP] = this[eP] = { accessors: {} }),
                        r = t.accessors,
                        n = this.prototype;
                    function o(e) {
                        let t = eU(e);
                        r[t] ||
                            (!(function (e, t) {
                                let r = eo.toCamelCase(' ' + t);
                                ['get', 'set', 'has'].forEach((n) => {
                                    Object.defineProperty(e, n + r, {
                                        value: function (e, r, o) {
                                            return this[n].call(this, t, e, r, o);
                                        },
                                        configurable: !0,
                                    });
                                });
                            })(n, e),
                            (r[t] = !0));
                    }
                    return eo.isArray(e) ? e.forEach(o) : o(e), this;
                }
            }
            function eD(e, t) {
                let r = this || eC,
                    n = t || r,
                    o = eL.from(n.headers),
                    i = n.data;
                return (
                    eo.forEach(e, function (e) {
                        i = e.call(r, i, o.normalize(), t ? t.status : void 0);
                    }),
                    o.normalize(),
                    i
                );
            }
            function eq(e) {
                return !!(e && e.__CANCEL__);
            }
            function eI(e, t, r) {
                ei.call(this, null == e ? 'canceled' : e, ei.ERR_CANCELED, t, r), (this.name = 'CanceledError');
            }
            eL.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']),
                eo.reduceDescriptors(eL.prototype, ({ value: e }, t) => {
                    let r = t[0].toUpperCase() + t.slice(1);
                    return {
                        get: () => e,
                        set(e) {
                            this[r] = e;
                        },
                    };
                }),
                eo.freezeMethods(eL),
                eo.inherits(eI, ei, { __CANCEL__: !0 });
            var ez = eN.hasStandardBrowserEnv
                ? {
                      write(e, t, r, n, o, i) {
                          let s = [e + '=' + encodeURIComponent(t)];
                          eo.isNumber(r) && s.push('expires=' + new Date(r).toGMTString()),
                              eo.isString(n) && s.push('path=' + n),
                              eo.isString(o) && s.push('domain=' + o),
                              !0 === i && s.push('secure'),
                              (document.cookie = s.join('; '));
                      },
                      read(e) {
                          let t = document.cookie.match(RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
                          return t ? decodeURIComponent(t[3]) : null;
                      },
                      remove(e) {
                          this.write(e, '', Date.now() - 864e5);
                      },
                  }
                : { write() {}, read: () => null, remove() {} };
            function eM(e, t) {
                return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
                    ? t
                        ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '')
                        : e
                    : t;
            }
            var eH = eN.hasStandardBrowserEnv
                    ? (function () {
                          let e;
                          let t = /(msie|trident)/i.test(navigator.userAgent),
                              r = document.createElement('a');
                          function n(e) {
                              let n = e;
                              return (
                                  t && (r.setAttribute('href', n), (n = r.href)),
                                  r.setAttribute('href', n),
                                  {
                                      href: r.href,
                                      protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
                                      host: r.host,
                                      search: r.search ? r.search.replace(/^\?/, '') : '',
                                      hash: r.hash ? r.hash.replace(/^#/, '') : '',
                                      hostname: r.hostname,
                                      port: r.port,
                                      pathname: '/' === r.pathname.charAt(0) ? r.pathname : '/' + r.pathname,
                                  }
                              );
                          }
                          return (
                              (e = n(window.location.href)),
                              function (t) {
                                  let r = eo.isString(t) ? n(t) : t;
                                  return r.protocol === e.protocol && r.host === e.host;
                              }
                          );
                      })()
                    : function () {
                          return !0;
                      },
                eJ = function (e, t) {
                    let r;
                    e = e || 10;
                    let n = Array(e),
                        o = Array(e),
                        i = 0,
                        s = 0;
                    return (
                        (t = void 0 !== t ? t : 1e3),
                        function (a) {
                            let l = Date.now(),
                                u = o[s];
                            r || (r = l), (n[i] = a), (o[i] = l);
                            let c = s,
                                f = 0;
                            for (; c !== i; ) (f += n[c++]), (c %= e);
                            if (((i = (i + 1) % e) === s && (s = (s + 1) % e), l - r < t)) return;
                            let d = u && l - u;
                            return d ? Math.round((1e3 * f) / d) : void 0;
                        }
                    );
                };
            function eW(e, t) {
                let r = 0,
                    n = eJ(50, 250);
                return (o) => {
                    let i = o.loaded,
                        s = o.lengthComputable ? o.total : void 0,
                        a = i - r,
                        l = n(a);
                    r = i;
                    let u = {
                        loaded: i,
                        total: s,
                        progress: s ? i / s : void 0,
                        bytes: a,
                        rate: l || void 0,
                        estimated: l && s && i <= s ? (s - i) / l : void 0,
                        event: o,
                    };
                    (u[t ? 'download' : 'upload'] = !0), e(u);
                };
            }
            let eV = 'undefined' != typeof XMLHttpRequest;
            var eK =
                eV &&
                function (e) {
                    return new Promise(function (t, r) {
                        let n,
                            o,
                            i = e.data,
                            s = eL.from(e.headers).normalize(),
                            { responseType: a, withXSRFToken: l } = e;
                        function u() {
                            e.cancelToken && e.cancelToken.unsubscribe(n),
                                e.signal && e.signal.removeEventListener('abort', n);
                        }
                        if (eo.isFormData(i)) {
                            if (eN.hasStandardBrowserEnv || eN.hasStandardBrowserWebWorkerEnv) s.setContentType(!1);
                            else if (!1 !== (o = s.getContentType())) {
                                let [e, ...t] = o
                                    ? o
                                          .split(';')
                                          .map((e) => e.trim())
                                          .filter(Boolean)
                                    : [];
                                s.setContentType([e || 'multipart/form-data', ...t].join('; '));
                            }
                        }
                        let c = new XMLHttpRequest();
                        if (e.auth) {
                            let t = e.auth.username || '',
                                r = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : '';
                            s.set('Authorization', 'Basic ' + btoa(t + ':' + r));
                        }
                        let f = eM(e.baseURL, e.url);
                        function d() {
                            if (!c) return;
                            let n = eL.from('getAllResponseHeaders' in c && c.getAllResponseHeaders()),
                                o = a && 'text' !== a && 'json' !== a ? c.response : c.responseText,
                                i = {
                                    data: o,
                                    status: c.status,
                                    statusText: c.statusText,
                                    headers: n,
                                    config: e,
                                    request: c,
                                };
                            !(function (e, t, r) {
                                let n = r.config.validateStatus;
                                !r.status || !n || n(r.status)
                                    ? e(r)
                                    : t(
                                          new ei(
                                              'Request failed with status code ' + r.status,
                                              [ei.ERR_BAD_REQUEST, ei.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
                                              r.config,
                                              r.request,
                                              r
                                          )
                                      );
                            })(
                                function (e) {
                                    t(e), u();
                                },
                                function (e) {
                                    r(e), u();
                                },
                                i
                            ),
                                (c = null);
                        }
                        if (
                            (c.open(e.method.toUpperCase(), eb(f, e.params, e.paramsSerializer), !0),
                            (c.timeout = e.timeout),
                            'onloadend' in c
                                ? (c.onloadend = d)
                                : (c.onreadystatechange = function () {
                                      c &&
                                          4 === c.readyState &&
                                          (0 !== c.status || (c.responseURL && 0 === c.responseURL.indexOf('file:'))) &&
                                          setTimeout(d);
                                  }),
                            (c.onabort = function () {
                                c && (r(new ei('Request aborted', ei.ECONNABORTED, e, c)), (c = null));
                            }),
                            (c.onerror = function () {
                                r(new ei('Network Error', ei.ERR_NETWORK, e, c)), (c = null);
                            }),
                            (c.ontimeout = function () {
                                let t = e.timeout ? 'timeout of ' + e.timeout + 'ms exceeded' : 'timeout exceeded',
                                    n = e.transitional || ew;
                                e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                                    r(new ei(t, n.clarifyTimeoutError ? ei.ETIMEDOUT : ei.ECONNABORTED, e, c)),
                                    (c = null);
                            }),
                            eN.hasStandardBrowserEnv && (l && eo.isFunction(l) && (l = l(e)), l || (!1 !== l && eH(f))))
                        ) {
                            let t = e.xsrfHeaderName && e.xsrfCookieName && ez.read(e.xsrfCookieName);
                            t && s.set(e.xsrfHeaderName, t);
                        }
                        void 0 === i && s.setContentType(null),
                            'setRequestHeader' in c &&
                                eo.forEach(s.toJSON(), function (e, t) {
                                    c.setRequestHeader(t, e);
                                }),
                            eo.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials),
                            a && 'json' !== a && (c.responseType = e.responseType),
                            'function' == typeof e.onDownloadProgress &&
                                c.addEventListener('progress', eW(e.onDownloadProgress, !0)),
                            'function' == typeof e.onUploadProgress &&
                                c.upload &&
                                c.upload.addEventListener('progress', eW(e.onUploadProgress)),
                            (e.cancelToken || e.signal) &&
                                ((n = (t) => {
                                    c && (r(!t || t.type ? new eI(null, e, c) : t), c.abort(), (c = null));
                                }),
                                e.cancelToken && e.cancelToken.subscribe(n),
                                e.signal && (e.signal.aborted ? n() : e.signal.addEventListener('abort', n)));
                        let p = (function (e) {
                            let t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                            return (t && t[1]) || '';
                        })(f);
                        if (p && -1 === eN.protocols.indexOf(p)) {
                            r(new ei('Unsupported protocol ' + p + ':', ei.ERR_BAD_REQUEST, e));
                            return;
                        }
                        c.send(i || null);
                    });
                };
            let e$ = { http: null, xhr: eK };
            eo.forEach(e$, (e, t) => {
                if (e) {
                    try {
                        Object.defineProperty(e, 'name', { value: t });
                    } catch (e) {}
                    Object.defineProperty(e, 'adapterName', { value: t });
                }
            });
            let eG = (e) => `- ${e}`,
                eX = (e) => eo.isFunction(e) || null === e || !1 === e;
            var eQ = {
                getAdapter: (e) => {
                    let t, r;
                    e = eo.isArray(e) ? e : [e];
                    let { length: n } = e,
                        o = {};
                    for (let i = 0; i < n; i++) {
                        let n;
                        if (((r = t = e[i]), !eX(t) && void 0 === (r = e$[(n = String(t)).toLowerCase()])))
                            throw new ei(`Unknown adapter '${n}'`);
                        if (r) break;
                        o[n || '#' + i] = r;
                    }
                    if (!r) {
                        let e = Object.entries(o).map(
                                ([e, t]) =>
                                    `adapter ${e} ` +
                                    (!1 === t ? 'is not supported by the environment' : 'is not available in the build')
                            ),
                            t = n
                                ? e.length > 1
                                    ? 'since :\n' + e.map(eG).join('\n')
                                    : ' ' + eG(e[0])
                                : 'as no adapter specified';
                        throw new ei('There is no suitable adapter to dispatch the request ' + t, 'ERR_NOT_SUPPORT');
                    }
                    return r;
                },
                adapters: e$,
            };
            function eZ(e) {
                if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
                    throw new eI(null, e);
            }
            function eY(e) {
                eZ(e),
                    (e.headers = eL.from(e.headers)),
                    (e.data = eD.call(e, e.transformRequest)),
                    -1 !== ['post', 'put', 'patch'].indexOf(e.method) &&
                        e.headers.setContentType('application/x-www-form-urlencoded', !1);
                let t = eQ.getAdapter(e.adapter || eC.adapter);
                return t(e).then(
                    function (t) {
                        return (
                            eZ(e), (t.data = eD.call(e, e.transformResponse, t)), (t.headers = eL.from(t.headers)), t
                        );
                    },
                    function (t) {
                        return (
                            !eq(t) &&
                                (eZ(e),
                                t &&
                                    t.response &&
                                    ((t.response.data = eD.call(e, e.transformResponse, t.response)),
                                    (t.response.headers = eL.from(t.response.headers)))),
                            Promise.reject(t)
                        );
                    }
                );
            }
            let e0 = (e) => (e instanceof eL ? { ...e } : e);
            function e1(e, t) {
                t = t || {};
                let r = {};
                function n(e, t, r) {
                    return eo.isPlainObject(e) && eo.isPlainObject(t)
                        ? eo.merge.call({ caseless: r }, e, t)
                        : eo.isPlainObject(t)
                          ? eo.merge({}, t)
                          : eo.isArray(t)
                            ? t.slice()
                            : t;
                }
                function o(e, t, r) {
                    return eo.isUndefined(t) ? (eo.isUndefined(e) ? void 0 : n(void 0, e, r)) : n(e, t, r);
                }
                function i(e, t) {
                    if (!eo.isUndefined(t)) return n(void 0, t);
                }
                function s(e, t) {
                    return eo.isUndefined(t) ? (eo.isUndefined(e) ? void 0 : n(void 0, e)) : n(void 0, t);
                }
                function a(r, o, i) {
                    return i in t ? n(r, o) : i in e ? n(void 0, r) : void 0;
                }
                let l = {
                    url: i,
                    method: i,
                    data: i,
                    baseURL: s,
                    transformRequest: s,
                    transformResponse: s,
                    paramsSerializer: s,
                    timeout: s,
                    timeoutMessage: s,
                    withCredentials: s,
                    withXSRFToken: s,
                    adapter: s,
                    responseType: s,
                    xsrfCookieName: s,
                    xsrfHeaderName: s,
                    onUploadProgress: s,
                    onDownloadProgress: s,
                    decompress: s,
                    maxContentLength: s,
                    maxBodyLength: s,
                    beforeRedirect: s,
                    transport: s,
                    httpAgent: s,
                    httpsAgent: s,
                    cancelToken: s,
                    socketPath: s,
                    responseEncoding: s,
                    validateStatus: a,
                    headers: (e, t) => o(e0(e), e0(t), !0),
                };
                return (
                    eo.forEach(Object.keys(Object.assign({}, e, t)), function (n) {
                        let i = l[n] || o,
                            s = i(e[n], t[n], n);
                        (eo.isUndefined(s) && i !== a) || (r[n] = s);
                    }),
                    r
                );
            }
            let e2 = '1.6.8',
                e4 = {};
            ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
                e4[e] = function (r) {
                    return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
                };
            });
            let e5 = {};
            e4.transitional = function (e, t, r) {
                function n(e, t) {
                    return '[Axios v' + e2 + "] Transitional option '" + e + "'" + t + (r ? '. ' + r : '');
                }
                return (r, o, i) => {
                    if (!1 === e) throw new ei(n(o, ' has been removed' + (t ? ' in ' + t : '')), ei.ERR_DEPRECATED);
                    return (
                        t &&
                            !e5[o] &&
                            ((e5[o] = !0),
                            console.warn(
                                n(o, ' has been deprecated since v' + t + ' and will be removed in the near future')
                            )),
                        !e || e(r, o, i)
                    );
                };
            };
            var e3 = {
                assertOptions: function (e, t, r) {
                    if ('object' != typeof e) throw new ei('options must be an object', ei.ERR_BAD_OPTION_VALUE);
                    let n = Object.keys(e),
                        o = n.length;
                    for (; o-- > 0; ) {
                        let i = n[o],
                            s = t[i];
                        if (s) {
                            let t = e[i],
                                r = void 0 === t || s(t, i, e);
                            if (!0 !== r) throw new ei('option ' + i + ' must be ' + r, ei.ERR_BAD_OPTION_VALUE);
                            continue;
                        }
                        if (!0 !== r) throw new ei('Unknown option ' + i, ei.ERR_BAD_OPTION);
                    }
                },
                validators: e4,
            };
            let e8 = e3.validators;
            class e6 {
                constructor(e) {
                    (this.defaults = e), (this.interceptors = { request: new eE(), response: new eE() });
                }
                async request(e, t) {
                    try {
                        return await this._request(e, t);
                    } catch (e) {
                        if (e instanceof Error) {
                            let t;
                            Error.captureStackTrace ? Error.captureStackTrace((t = {})) : (t = Error());
                            let r = t.stack ? t.stack.replace(/^.+\n/, '') : '';
                            e.stack
                                ? r && !String(e.stack).endsWith(r.replace(/^.+\n.+\n/, '')) && (e.stack += '\n' + r)
                                : (e.stack = r);
                        }
                        throw e;
                    }
                }
                _request(e, t) {
                    let r, n;
                    'string' == typeof e ? ((t = t || {}).url = e) : (t = e || {}), (t = e1(this.defaults, t));
                    let { transitional: o, paramsSerializer: i, headers: s } = t;
                    void 0 !== o &&
                        e3.assertOptions(
                            o,
                            {
                                silentJSONParsing: e8.transitional(e8.boolean),
                                forcedJSONParsing: e8.transitional(e8.boolean),
                                clarifyTimeoutError: e8.transitional(e8.boolean),
                            },
                            !1
                        ),
                        null != i &&
                            (eo.isFunction(i)
                                ? (t.paramsSerializer = { serialize: i })
                                : e3.assertOptions(i, { encode: e8.function, serialize: e8.function }, !0)),
                        (t.method = (t.method || this.defaults.method || 'get').toLowerCase());
                    let a = s && eo.merge(s.common, s[t.method]);
                    s &&
                        eo.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (e) => {
                            delete s[e];
                        }),
                        (t.headers = eL.concat(a, s));
                    let l = [],
                        u = !0;
                    this.interceptors.request.forEach(function (e) {
                        ('function' != typeof e.runWhen || !1 !== e.runWhen(t)) &&
                            ((u = u && e.synchronous), l.unshift(e.fulfilled, e.rejected));
                    });
                    let c = [];
                    this.interceptors.response.forEach(function (e) {
                        c.push(e.fulfilled, e.rejected);
                    });
                    let f = 0;
                    if (!u) {
                        let e = [eY.bind(this), void 0];
                        for (e.unshift.apply(e, l), e.push.apply(e, c), n = e.length, r = Promise.resolve(t); f < n; )
                            r = r.then(e[f++], e[f++]);
                        return r;
                    }
                    n = l.length;
                    let d = t;
                    for (f = 0; f < n; ) {
                        let e = l[f++],
                            t = l[f++];
                        try {
                            d = e(d);
                        } catch (e) {
                            t.call(this, e);
                            break;
                        }
                    }
                    try {
                        r = eY.call(this, d);
                    } catch (e) {
                        return Promise.reject(e);
                    }
                    for (f = 0, n = c.length; f < n; ) r = r.then(c[f++], c[f++]);
                    return r;
                }
                getUri(e) {
                    e = e1(this.defaults, e);
                    let t = eM(e.baseURL, e.url);
                    return eb(t, e.params, e.paramsSerializer);
                }
            }
            eo.forEach(['delete', 'get', 'head', 'options'], function (e) {
                e6.prototype[e] = function (t, r) {
                    return this.request(e1(r || {}, { method: e, url: t, data: (r || {}).data }));
                };
            }),
                eo.forEach(['post', 'put', 'patch'], function (e) {
                    function t(t) {
                        return function (r, n, o) {
                            return this.request(
                                e1(o || {}, {
                                    method: e,
                                    headers: t ? { 'Content-Type': 'multipart/form-data' } : {},
                                    url: r,
                                    data: n,
                                })
                            );
                        };
                    }
                    (e6.prototype[e] = t()), (e6.prototype[e + 'Form'] = t(!0));
                });
            class e7 {
                constructor(e) {
                    let t;
                    if ('function' != typeof e) throw TypeError('executor must be a function.');
                    this.promise = new Promise(function (e) {
                        t = e;
                    });
                    let r = this;
                    this.promise.then((e) => {
                        if (!r._listeners) return;
                        let t = r._listeners.length;
                        for (; t-- > 0; ) r._listeners[t](e);
                        r._listeners = null;
                    }),
                        (this.promise.then = (e) => {
                            let t;
                            let n = new Promise((e) => {
                                r.subscribe(e), (t = e);
                            }).then(e);
                            return (
                                (n.cancel = function () {
                                    r.unsubscribe(t);
                                }),
                                n
                            );
                        }),
                        e(function (e, n, o) {
                            r.reason || ((r.reason = new eI(e, n, o)), t(r.reason));
                        });
                }
                throwIfRequested() {
                    if (this.reason) throw this.reason;
                }
                subscribe(e) {
                    if (this.reason) {
                        e(this.reason);
                        return;
                    }
                    this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
                }
                unsubscribe(e) {
                    if (!this._listeners) return;
                    let t = this._listeners.indexOf(e);
                    -1 !== t && this._listeners.splice(t, 1);
                }
                static source() {
                    let e;
                    let t = new e7(function (t) {
                        e = t;
                    });
                    return { token: t, cancel: e };
                }
            }
            let e9 = {
                Continue: 100,
                SwitchingProtocols: 101,
                Processing: 102,
                EarlyHints: 103,
                Ok: 200,
                Created: 201,
                Accepted: 202,
                NonAuthoritativeInformation: 203,
                NoContent: 204,
                ResetContent: 205,
                PartialContent: 206,
                MultiStatus: 207,
                AlreadyReported: 208,
                ImUsed: 226,
                MultipleChoices: 300,
                MovedPermanently: 301,
                Found: 302,
                SeeOther: 303,
                NotModified: 304,
                UseProxy: 305,
                Unused: 306,
                TemporaryRedirect: 307,
                PermanentRedirect: 308,
                BadRequest: 400,
                Unauthorized: 401,
                PaymentRequired: 402,
                Forbidden: 403,
                NotFound: 404,
                MethodNotAllowed: 405,
                NotAcceptable: 406,
                ProxyAuthenticationRequired: 407,
                RequestTimeout: 408,
                Conflict: 409,
                Gone: 410,
                LengthRequired: 411,
                PreconditionFailed: 412,
                PayloadTooLarge: 413,
                UriTooLong: 414,
                UnsupportedMediaType: 415,
                RangeNotSatisfiable: 416,
                ExpectationFailed: 417,
                ImATeapot: 418,
                MisdirectedRequest: 421,
                UnprocessableEntity: 422,
                Locked: 423,
                FailedDependency: 424,
                TooEarly: 425,
                UpgradeRequired: 426,
                PreconditionRequired: 428,
                TooManyRequests: 429,
                RequestHeaderFieldsTooLarge: 431,
                UnavailableForLegalReasons: 451,
                InternalServerError: 500,
                NotImplemented: 501,
                BadGateway: 502,
                ServiceUnavailable: 503,
                GatewayTimeout: 504,
                HttpVersionNotSupported: 505,
                VariantAlsoNegotiates: 506,
                InsufficientStorage: 507,
                LoopDetected: 508,
                NotExtended: 510,
                NetworkAuthenticationRequired: 511,
            };
            Object.entries(e9).forEach(([e, t]) => {
                e9[t] = e;
            });
            let te = (function e(t) {
                let r = new e6(t),
                    n = a(e6.prototype.request, r);
                return (
                    eo.extend(n, e6.prototype, r, { allOwnKeys: !0 }),
                    eo.extend(n, r, null, { allOwnKeys: !0 }),
                    (n.create = function (r) {
                        return e(e1(t, r));
                    }),
                    n
                );
            })(eC);
            (te.Axios = e6),
                (te.CanceledError = eI),
                (te.CancelToken = e7),
                (te.isCancel = eq),
                (te.VERSION = e2),
                (te.toFormData = ep),
                (te.AxiosError = ei),
                (te.Cancel = te.CanceledError),
                (te.all = function (e) {
                    return Promise.all(e);
                }),
                (te.spread = function (e) {
                    return function (t) {
                        return e.apply(null, t);
                    };
                }),
                (te.isAxiosError = function (e) {
                    return eo.isObject(e) && !0 === e.isAxiosError;
                }),
                (te.mergeConfig = e1),
                (te.AxiosHeaders = eL),
                (te.formToJSON = (e) => ej(eo.isHTMLForm(e) ? new FormData(e) : e)),
                (te.getAdapter = eQ.getAdapter),
                (te.HttpStatusCode = e9),
                (te.default = te);
            var tt = te;
        },
    },
]);
