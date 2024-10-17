(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2888],
    {
        78702: function (e) {
            e.exports = (function () {
                'use strict';
                let e = new Map(),
                    t = {
                        set(t, n, i) {
                            e.has(t) || e.set(t, new Map());
                            let a = e.get(t);
                            a.has(n) || 0 === a.size
                                ? a.set(n, i)
                                : console.error(
                                      `Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(a.keys())[0]}.`
                                  );
                        },
                        get: (t, n) => (e.has(t) && e.get(t).get(n)) || null,
                        remove(t, n) {
                            if (!e.has(t)) return;
                            let i = e.get(t);
                            i.delete(n), 0 === i.size && e.delete(t);
                        },
                    },
                    n = 'transitionend',
                    i = (e) => (
                        e &&
                            window.CSS &&
                            window.CSS.escape &&
                            (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
                        e
                    ),
                    a = (e) => {
                        e.dispatchEvent(new Event(n));
                    },
                    o = (e) =>
                        !(!e || 'object' != typeof e) && (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
                    s = (e) =>
                        o(e)
                            ? e.jquery
                                ? e[0]
                                : e
                            : 'string' == typeof e && e.length > 0
                              ? document.querySelector(i(e))
                              : null,
                    r = (e) => {
                        if (!o(e) || 0 === e.getClientRects().length) return !1;
                        let t = 'visible' === getComputedStyle(e).getPropertyValue('visibility'),
                            n = e.closest('details:not([open])');
                        if (!n) return t;
                        if (n !== e) {
                            let t = e.closest('summary');
                            if ((t && t.parentNode !== n) || null === t) return !1;
                        }
                        return t;
                    },
                    c = (e) =>
                        !e ||
                        e.nodeType !== Node.ELEMENT_NODE ||
                        !!e.classList.contains('disabled') ||
                        (void 0 !== e.disabled
                            ? e.disabled
                            : e.hasAttribute('disabled') && 'false' !== e.getAttribute('disabled')),
                    l = (e) => {
                        if (!document.documentElement.attachShadow) return null;
                        if ('function' == typeof e.getRootNode) {
                            let t = e.getRootNode();
                            return t instanceof ShadowRoot ? t : null;
                        }
                        return e instanceof ShadowRoot ? e : e.parentNode ? l(e.parentNode) : null;
                    },
                    u = () => {},
                    d = (e) => {
                        e.offsetHeight;
                    },
                    p = () =>
                        window.jQuery && !document.body.hasAttribute('data-bs-no-jquery') ? window.jQuery : null,
                    m = [],
                    h = () => 'rtl' === document.documentElement.dir,
                    f = (e) => {
                        var t;
                        (t = () => {
                            let t = p();
                            if (t) {
                                let n = e.NAME,
                                    i = t.fn[n];
                                (t.fn[n] = e.jQueryInterface),
                                    (t.fn[n].Constructor = e),
                                    (t.fn[n].noConflict = () => ((t.fn[n] = i), e.jQueryInterface));
                            }
                        }),
                            'loading' === document.readyState
                                ? (m.length ||
                                      document.addEventListener('DOMContentLoaded', () => {
                                          for (let e of m) e();
                                      }),
                                  m.push(t))
                                : t();
                    },
                    g = (e, t = [], n = e) => ('function' == typeof e ? e(...t) : n),
                    v = (e, t, i = !0) => {
                        if (!i) return void g(e);
                        let o =
                                ((e) => {
                                    if (!e) return 0;
                                    let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e),
                                        i = Number.parseFloat(t),
                                        a = Number.parseFloat(n);
                                    return i || a
                                        ? ((t = t.split(',')[0]),
                                          (n = n.split(',')[0]),
                                          1e3 * (Number.parseFloat(t) + Number.parseFloat(n)))
                                        : 0;
                                })(t) + 5,
                            s = !1,
                            r = ({ target: i }) => {
                                i === t && ((s = !0), t.removeEventListener(n, r), g(e));
                            };
                        t.addEventListener(n, r),
                            setTimeout(() => {
                                s || a(t);
                            }, o);
                    },
                    b = (e, t, n, i) => {
                        let a = e.length,
                            o = e.indexOf(t);
                        return -1 === o
                            ? !n && i
                                ? e[a - 1]
                                : e[0]
                            : ((o += n ? 1 : -1), i && (o = (o + a) % a), e[Math.max(0, Math.min(o, a - 1))]);
                    },
                    x = /[^.]*(?=\..*)\.|.*/,
                    y = /\..*/,
                    S = /::\d+$/,
                    w = {},
                    A = 1,
                    C = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
                    _ = new Set([
                        'click',
                        'dblclick',
                        'mouseup',
                        'mousedown',
                        'contextmenu',
                        'mousewheel',
                        'DOMMouseScroll',
                        'mouseover',
                        'mouseout',
                        'mousemove',
                        'selectstart',
                        'selectend',
                        'keydown',
                        'keypress',
                        'keyup',
                        'orientationchange',
                        'touchstart',
                        'touchmove',
                        'touchend',
                        'touchcancel',
                        'pointerdown',
                        'pointermove',
                        'pointerup',
                        'pointerleave',
                        'pointercancel',
                        'gesturestart',
                        'gesturechange',
                        'gestureend',
                        'focus',
                        'blur',
                        'change',
                        'reset',
                        'select',
                        'submit',
                        'focusin',
                        'focusout',
                        'load',
                        'unload',
                        'beforeunload',
                        'resize',
                        'move',
                        'DOMContentLoaded',
                        'readystatechange',
                        'error',
                        'abort',
                        'scroll',
                    ]);
                function P(e, t) {
                    return (t && `${t}::${A++}`) || e.uidEvent || A++;
                }
                function k(e) {
                    let t = P(e);
                    return (e.uidEvent = t), (w[t] = w[t] || {}), w[t];
                }
                function M(e, t, n = null) {
                    return Object.values(e).find((e) => e.callable === t && e.delegationSelector === n);
                }
                function E(e, t, n) {
                    let i = 'string' == typeof t,
                        a = j(e);
                    return _.has(a) || (a = e), [i, i ? n : t || n, a];
                }
                function T(e, t, n, i, a) {
                    var o, s, r;
                    if ('string' != typeof t || !e) return;
                    let [c, l, u] = E(t, n, i);
                    t in C &&
                        ((o = l),
                        (l = function (e) {
                            if (
                                !e.relatedTarget ||
                                (e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget))
                            )
                                return o.call(this, e);
                        }));
                    let d = k(e),
                        p = d[u] || (d[u] = {}),
                        m = M(p, l, c ? n : null);
                    if (m) return void (m.oneOff = m.oneOff && a);
                    let h = P(l, t.replace(x, '')),
                        f = c
                            ? ((s = l),
                              function t(i) {
                                  let a = e.querySelectorAll(n);
                                  for (let { target: o } = i; o && o !== this; o = o.parentNode)
                                      for (let r of a)
                                          if (r === o)
                                              return (
                                                  N(i, { delegateTarget: o }),
                                                  t.oneOff && G.off(e, i.type, n, s),
                                                  s.apply(o, [i])
                                              );
                              })
                            : ((r = l),
                              function t(n) {
                                  return N(n, { delegateTarget: e }), t.oneOff && G.off(e, n.type, r), r.apply(e, [n]);
                              });
                    (f.delegationSelector = c ? n : null),
                        (f.callable = l),
                        (f.oneOff = a),
                        (f.uidEvent = h),
                        (p[h] = f),
                        e.addEventListener(u, f, c);
                }
                function I(e, t, n, i, a) {
                    let o = M(t[n], i, a);
                    o && (e.removeEventListener(n, o, Boolean(a)), delete t[n][o.uidEvent]);
                }
                function j(e) {
                    return C[(e = e.replace(y, ''))] || e;
                }
                let G = {
                    on(e, t, n, i) {
                        T(e, t, n, i, !1);
                    },
                    one(e, t, n, i) {
                        T(e, t, n, i, !0);
                    },
                    off(e, t, n, i) {
                        if ('string' != typeof t || !e) return;
                        let [a, o, s] = E(t, n, i),
                            r = s !== t,
                            c = k(e),
                            l = c[s] || {},
                            u = t.startsWith('.');
                        if (void 0 === o) {
                            if (u)
                                for (let n of Object.keys(c))
                                    !(function (e, t, n, i) {
                                        let a = t[n] || {};
                                        for (let [o, s] of Object.entries(a))
                                            o.includes(i) && I(e, t, n, s.callable, s.delegationSelector);
                                    })(e, c, n, t.slice(1));
                            for (let [n, i] of Object.entries(l)) {
                                let a = n.replace(S, '');
                                (r && !t.includes(a)) || I(e, c, s, i.callable, i.delegationSelector);
                            }
                        } else {
                            if (!Object.keys(l).length) return;
                            I(e, c, s, o, a ? n : null);
                        }
                    },
                    trigger(e, t, n) {
                        if ('string' != typeof t || !e) return null;
                        let i = p(),
                            a = null,
                            o = !0,
                            s = !0,
                            r = !1;
                        t !== j(t) &&
                            i &&
                            ((a = i.Event(t, n)),
                            i(e).trigger(a),
                            (o = !a.isPropagationStopped()),
                            (s = !a.isImmediatePropagationStopped()),
                            (r = a.isDefaultPrevented()));
                        let c = N(new Event(t, { bubbles: o, cancelable: !0 }), n);
                        return (
                            r && c.preventDefault(),
                            s && e.dispatchEvent(c),
                            c.defaultPrevented && a && a.preventDefault(),
                            c
                        );
                    },
                };
                function N(e, t = {}) {
                    for (let [n, i] of Object.entries(t))
                        try {
                            e[n] = i;
                        } catch (t) {
                            Object.defineProperty(e, n, { configurable: !0, get: () => i });
                        }
                    return e;
                }
                function B(e) {
                    if ('true' === e) return !0;
                    if ('false' === e) return !1;
                    if (e === Number(e).toString()) return Number(e);
                    if ('' === e || 'null' === e) return null;
                    if ('string' != typeof e) return e;
                    try {
                        return JSON.parse(decodeURIComponent(e));
                    } catch (t) {
                        return e;
                    }
                }
                function O(e) {
                    return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
                }
                let L = {
                    setDataAttribute(e, t, n) {
                        e.setAttribute(`data-bs-${O(t)}`, n);
                    },
                    removeDataAttribute(e, t) {
                        e.removeAttribute(`data-bs-${O(t)}`);
                    },
                    getDataAttributes(e) {
                        if (!e) return {};
                        let t = {},
                            n = Object.keys(e.dataset).filter((e) => e.startsWith('bs') && !e.startsWith('bsConfig'));
                        for (let i of n) {
                            let n = i.replace(/^bs/, '');
                            t[(n = n.charAt(0).toLowerCase() + n.slice(1, n.length))] = B(e.dataset[i]);
                        }
                        return t;
                    },
                    getDataAttribute: (e, t) => B(e.getAttribute(`data-bs-${O(t)}`)),
                };
                class D {
                    static get Default() {
                        return {};
                    }
                    static get DefaultType() {
                        return {};
                    }
                    static get NAME() {
                        throw Error('You have to implement the static method "NAME", for each component!');
                    }
                    _getConfig(e) {
                        return (
                            (e = this._mergeConfigObj(e)), (e = this._configAfterMerge(e)), this._typeCheckConfig(e), e
                        );
                    }
                    _configAfterMerge(e) {
                        return e;
                    }
                    _mergeConfigObj(e, t) {
                        let n = o(t) ? L.getDataAttribute(t, 'config') : {};
                        return {
                            ...this.constructor.Default,
                            ...('object' == typeof n ? n : {}),
                            ...(o(t) ? L.getDataAttributes(t) : {}),
                            ...('object' == typeof e ? e : {}),
                        };
                    }
                    _typeCheckConfig(e, t = this.constructor.DefaultType) {
                        for (let [n, i] of Object.entries(t)) {
                            let t = e[n],
                                a = o(t)
                                    ? 'element'
                                    : null == t
                                      ? `${t}`
                                      : Object.prototype.toString
                                            .call(t)
                                            .match(/\s([a-z]+)/i)[1]
                                            .toLowerCase();
                            if (!RegExp(i).test(a))
                                throw TypeError(
                                    `${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${i}".`
                                );
                        }
                    }
                }
                class z extends D {
                    constructor(e, n) {
                        super(),
                            (e = s(e)) &&
                                ((this._element = e),
                                (this._config = this._getConfig(n)),
                                t.set(this._element, this.constructor.DATA_KEY, this));
                    }
                    dispose() {
                        for (let e of (t.remove(this._element, this.constructor.DATA_KEY),
                        G.off(this._element, this.constructor.EVENT_KEY),
                        Object.getOwnPropertyNames(this)))
                            this[e] = null;
                    }
                    _queueCallback(e, t, n = !0) {
                        v(e, t, n);
                    }
                    _getConfig(e) {
                        return (
                            (e = this._mergeConfigObj(e, this._element)),
                            (e = this._configAfterMerge(e)),
                            this._typeCheckConfig(e),
                            e
                        );
                    }
                    static getInstance(e) {
                        return t.get(s(e), this.DATA_KEY);
                    }
                    static getOrCreateInstance(e, t = {}) {
                        return this.getInstance(e) || new this(e, 'object' == typeof t ? t : null);
                    }
                    static get VERSION() {
                        return '5.3.3';
                    }
                    static get DATA_KEY() {
                        return `bs.${this.NAME}`;
                    }
                    static get EVENT_KEY() {
                        return `.${this.DATA_KEY}`;
                    }
                    static eventName(e) {
                        return `${e}${this.EVENT_KEY}`;
                    }
                }
                let R = (e) => {
                        let t = e.getAttribute('data-bs-target');
                        if (!t || '#' === t) {
                            let n = e.getAttribute('href');
                            if (!n || (!n.includes('#') && !n.startsWith('.'))) return null;
                            n.includes('#') && !n.startsWith('#') && (n = `#${n.split('#')[1]}`),
                                (t = n && '#' !== n ? n.trim() : null);
                        }
                        return t
                            ? t
                                  .split(',')
                                  .map((e) => i(e))
                                  .join(',')
                            : null;
                    },
                    U = {
                        find: (e, t = document.documentElement) =>
                            [].concat(...Element.prototype.querySelectorAll.call(t, e)),
                        findOne: (e, t = document.documentElement) => Element.prototype.querySelector.call(t, e),
                        children: (e, t) => [].concat(...e.children).filter((e) => e.matches(t)),
                        parents(e, t) {
                            let n = [],
                                i = e.parentNode.closest(t);
                            for (; i; ) n.push(i), (i = i.parentNode.closest(t));
                            return n;
                        },
                        prev(e, t) {
                            let n = e.previousElementSibling;
                            for (; n; ) {
                                if (n.matches(t)) return [n];
                                n = n.previousElementSibling;
                            }
                            return [];
                        },
                        next(e, t) {
                            let n = e.nextElementSibling;
                            for (; n; ) {
                                if (n.matches(t)) return [n];
                                n = n.nextElementSibling;
                            }
                            return [];
                        },
                        focusableChildren(e) {
                            let t = [
                                'a',
                                'button',
                                'input',
                                'textarea',
                                'select',
                                'details',
                                '[tabindex]',
                                '[contenteditable="true"]',
                            ]
                                .map((e) => `${e}:not([tabindex^="-"])`)
                                .join(',');
                            return this.find(t, e).filter((e) => !c(e) && r(e));
                        },
                        getSelectorFromElement(e) {
                            let t = R(e);
                            return t && U.findOne(t) ? t : null;
                        },
                        getElementFromSelector(e) {
                            let t = R(e);
                            return t ? U.findOne(t) : null;
                        },
                        getMultipleElementsFromSelector(e) {
                            let t = R(e);
                            return t ? U.find(t) : [];
                        },
                    },
                    q = (e, t = 'hide') => {
                        let n = `click.dismiss${e.EVENT_KEY}`,
                            i = e.NAME;
                        G.on(document, n, `[data-bs-dismiss="${i}"]`, function (n) {
                            if ((['A', 'AREA'].includes(this.tagName) && n.preventDefault(), c(this))) return;
                            let a = U.getElementFromSelector(this) || this.closest(`.${i}`);
                            e.getOrCreateInstance(a)[t]();
                        });
                    },
                    H = '.bs.alert',
                    W = `close${H}`,
                    F = `closed${H}`;
                class $ extends z {
                    static get NAME() {
                        return 'alert';
                    }
                    close() {
                        if (G.trigger(this._element, W).defaultPrevented) return;
                        this._element.classList.remove('show');
                        let e = this._element.classList.contains('fade');
                        this._queueCallback(() => this._destroyElement(), this._element, e);
                    }
                    _destroyElement() {
                        this._element.remove(), G.trigger(this._element, F), this.dispose();
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = $.getOrCreateInstance(this);
                            if ('string' == typeof e) {
                                if (void 0 === t[e] || e.startsWith('_') || 'constructor' === e)
                                    throw TypeError(`No method named "${e}"`);
                                t[e](this);
                            }
                        });
                    }
                }
                q($, 'close'), f($);
                let V = '[data-bs-toggle="button"]';
                class K extends z {
                    static get NAME() {
                        return 'button';
                    }
                    toggle() {
                        this._element.setAttribute('aria-pressed', this._element.classList.toggle('active'));
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = K.getOrCreateInstance(this);
                            'toggle' === e && t[e]();
                        });
                    }
                }
                G.on(document, 'click.bs.button.data-api', V, (e) => {
                    e.preventDefault();
                    let t = e.target.closest(V);
                    K.getOrCreateInstance(t).toggle();
                }),
                    f(K);
                let Q = '.bs.swipe',
                    X = `touchstart${Q}`,
                    Y = `touchmove${Q}`,
                    Z = `touchend${Q}`,
                    J = `pointerdown${Q}`,
                    ee = `pointerup${Q}`,
                    et = { endCallback: null, leftCallback: null, rightCallback: null },
                    en = {
                        endCallback: '(function|null)',
                        leftCallback: '(function|null)',
                        rightCallback: '(function|null)',
                    };
                class ei extends D {
                    constructor(e, t) {
                        super(),
                            (this._element = e),
                            e &&
                                ei.isSupported() &&
                                ((this._config = this._getConfig(t)),
                                (this._deltaX = 0),
                                (this._supportPointerEvents = Boolean(window.PointerEvent)),
                                this._initEvents());
                    }
                    static get Default() {
                        return et;
                    }
                    static get DefaultType() {
                        return en;
                    }
                    static get NAME() {
                        return 'swipe';
                    }
                    dispose() {
                        G.off(this._element, Q);
                    }
                    _start(e) {
                        this._supportPointerEvents
                            ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
                            : (this._deltaX = e.touches[0].clientX);
                    }
                    _end(e) {
                        this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX),
                            this._handleSwipe(),
                            g(this._config.endCallback);
                    }
                    _move(e) {
                        this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
                    }
                    _handleSwipe() {
                        let e = Math.abs(this._deltaX);
                        if (e <= 40) return;
                        let t = e / this._deltaX;
                        (this._deltaX = 0), t && g(t > 0 ? this._config.rightCallback : this._config.leftCallback);
                    }
                    _initEvents() {
                        this._supportPointerEvents
                            ? (G.on(this._element, J, (e) => this._start(e)),
                              G.on(this._element, ee, (e) => this._end(e)),
                              this._element.classList.add('pointer-event'))
                            : (G.on(this._element, X, (e) => this._start(e)),
                              G.on(this._element, Y, (e) => this._move(e)),
                              G.on(this._element, Z, (e) => this._end(e)));
                    }
                    _eventIsPointerPenTouch(e) {
                        return this._supportPointerEvents && ('pen' === e.pointerType || 'touch' === e.pointerType);
                    }
                    static isSupported() {
                        return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
                    }
                }
                let ea = '.bs.carousel',
                    eo = '.data-api',
                    es = 'next',
                    er = 'prev',
                    ec = 'left',
                    el = 'right',
                    eu = `slide${ea}`,
                    ed = `slid${ea}`,
                    ep = `keydown${ea}`,
                    em = `mouseenter${ea}`,
                    eh = `mouseleave${ea}`,
                    ef = `dragstart${ea}`,
                    eg = `load${ea}${eo}`,
                    ev = `click${ea}${eo}`,
                    eb = 'carousel',
                    ex = 'active',
                    ey = '.active',
                    eS = '.carousel-item',
                    ew = ey + eS,
                    eA = { ArrowLeft: el, ArrowRight: ec },
                    eC = { interval: 5e3, keyboard: !0, pause: 'hover', ride: !1, touch: !0, wrap: !0 },
                    e_ = {
                        interval: '(number|boolean)',
                        keyboard: 'boolean',
                        pause: '(string|boolean)',
                        ride: '(boolean|string)',
                        touch: 'boolean',
                        wrap: 'boolean',
                    };
                class eP extends z {
                    constructor(e, t) {
                        super(e, t),
                            (this._interval = null),
                            (this._activeElement = null),
                            (this._isSliding = !1),
                            (this.touchTimeout = null),
                            (this._swipeHelper = null),
                            (this._indicatorsElement = U.findOne('.carousel-indicators', this._element)),
                            this._addEventListeners(),
                            this._config.ride === eb && this.cycle();
                    }
                    static get Default() {
                        return eC;
                    }
                    static get DefaultType() {
                        return e_;
                    }
                    static get NAME() {
                        return 'carousel';
                    }
                    next() {
                        this._slide(es);
                    }
                    nextWhenVisible() {
                        !document.hidden && r(this._element) && this.next();
                    }
                    prev() {
                        this._slide(er);
                    }
                    pause() {
                        this._isSliding && a(this._element), this._clearInterval();
                    }
                    cycle() {
                        this._clearInterval(),
                            this._updateInterval(),
                            (this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval));
                    }
                    _maybeEnableCycle() {
                        this._config.ride &&
                            (this._isSliding ? G.one(this._element, ed, () => this.cycle()) : this.cycle());
                    }
                    to(e) {
                        let t = this._getItems();
                        if (e > t.length - 1 || e < 0) return;
                        if (this._isSliding) return void G.one(this._element, ed, () => this.to(e));
                        let n = this._getItemIndex(this._getActive());
                        n !== e && this._slide(e > n ? es : er, t[e]);
                    }
                    dispose() {
                        this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
                    }
                    _configAfterMerge(e) {
                        return (e.defaultInterval = e.interval), e;
                    }
                    _addEventListeners() {
                        this._config.keyboard && G.on(this._element, ep, (e) => this._keydown(e)),
                            'hover' === this._config.pause &&
                                (G.on(this._element, em, () => this.pause()),
                                G.on(this._element, eh, () => this._maybeEnableCycle())),
                            this._config.touch && ei.isSupported() && this._addTouchEventListeners();
                    }
                    _addTouchEventListeners() {
                        for (let e of U.find('.carousel-item img', this._element))
                            G.on(e, ef, (e) => e.preventDefault());
                        this._swipeHelper = new ei(this._element, {
                            leftCallback: () => this._slide(this._directionToOrder(ec)),
                            rightCallback: () => this._slide(this._directionToOrder(el)),
                            endCallback: () => {
                                'hover' === this._config.pause &&
                                    (this.pause(),
                                    this.touchTimeout && clearTimeout(this.touchTimeout),
                                    (this.touchTimeout = setTimeout(
                                        () => this._maybeEnableCycle(),
                                        500 + this._config.interval
                                    )));
                            },
                        });
                    }
                    _keydown(e) {
                        if (/input|textarea/i.test(e.target.tagName)) return;
                        let t = eA[e.key];
                        t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
                    }
                    _getItemIndex(e) {
                        return this._getItems().indexOf(e);
                    }
                    _setActiveIndicatorElement(e) {
                        if (!this._indicatorsElement) return;
                        let t = U.findOne(ey, this._indicatorsElement);
                        t.classList.remove(ex), t.removeAttribute('aria-current');
                        let n = U.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
                        n && (n.classList.add(ex), n.setAttribute('aria-current', 'true'));
                    }
                    _updateInterval() {
                        let e = this._activeElement || this._getActive();
                        if (!e) return;
                        let t = Number.parseInt(e.getAttribute('data-bs-interval'), 10);
                        this._config.interval = t || this._config.defaultInterval;
                    }
                    _slide(e, t = null) {
                        if (this._isSliding) return;
                        let n = this._getActive(),
                            i = e === es,
                            a = t || b(this._getItems(), n, i, this._config.wrap);
                        if (a === n) return;
                        let o = this._getItemIndex(a),
                            s = (t) =>
                                G.trigger(this._element, t, {
                                    relatedTarget: a,
                                    direction: this._orderToDirection(e),
                                    from: this._getItemIndex(n),
                                    to: o,
                                });
                        if (s(eu).defaultPrevented || !n || !a) return;
                        let r = Boolean(this._interval);
                        this.pause(),
                            (this._isSliding = !0),
                            this._setActiveIndicatorElement(o),
                            (this._activeElement = a);
                        let c = i ? 'carousel-item-start' : 'carousel-item-end',
                            l = i ? 'carousel-item-next' : 'carousel-item-prev';
                        a.classList.add(l),
                            d(a),
                            n.classList.add(c),
                            a.classList.add(c),
                            this._queueCallback(
                                () => {
                                    a.classList.remove(c, l),
                                        a.classList.add(ex),
                                        n.classList.remove(ex, l, c),
                                        (this._isSliding = !1),
                                        s(ed);
                                },
                                n,
                                this._isAnimated()
                            ),
                            r && this.cycle();
                    }
                    _isAnimated() {
                        return this._element.classList.contains('slide');
                    }
                    _getActive() {
                        return U.findOne(ew, this._element);
                    }
                    _getItems() {
                        return U.find(eS, this._element);
                    }
                    _clearInterval() {
                        this._interval && (clearInterval(this._interval), (this._interval = null));
                    }
                    _directionToOrder(e) {
                        return h() ? (e === ec ? er : es) : e === ec ? es : er;
                    }
                    _orderToDirection(e) {
                        return h() ? (e === er ? ec : el) : e === er ? el : ec;
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = eP.getOrCreateInstance(this, e);
                            if ('number' != typeof e) {
                                if ('string' == typeof e) {
                                    if (void 0 === t[e] || e.startsWith('_') || 'constructor' === e)
                                        throw TypeError(`No method named "${e}"`);
                                    t[e]();
                                }
                            } else t.to(e);
                        });
                    }
                }
                G.on(document, ev, '[data-bs-slide], [data-bs-slide-to]', function (e) {
                    let t = U.getElementFromSelector(this);
                    if (!t || !t.classList.contains(eb)) return;
                    e.preventDefault();
                    let n = eP.getOrCreateInstance(t),
                        i = this.getAttribute('data-bs-slide-to');
                    return i
                        ? (n.to(i), void n._maybeEnableCycle())
                        : 'next' === L.getDataAttribute(this, 'slide')
                          ? (n.next(), void n._maybeEnableCycle())
                          : (n.prev(), void n._maybeEnableCycle());
                }),
                    G.on(window, eg, () => {
                        let e = U.find('[data-bs-ride="carousel"]');
                        for (let t of e) eP.getOrCreateInstance(t);
                    }),
                    f(eP);
                let ek = '.bs.collapse',
                    eM = `show${ek}`,
                    eE = `shown${ek}`,
                    eT = `hide${ek}`,
                    eI = `hidden${ek}`,
                    ej = `click${ek}.data-api`,
                    eG = 'show',
                    eN = 'collapse',
                    eB = 'collapsing',
                    eO = `:scope .${eN} .${eN}`,
                    eL = '[data-bs-toggle="collapse"]',
                    eD = { parent: null, toggle: !0 },
                    ez = { parent: '(null|element)', toggle: 'boolean' };
                class eR extends z {
                    constructor(e, t) {
                        super(e, t), (this._isTransitioning = !1), (this._triggerArray = []);
                        let n = U.find(eL);
                        for (let e of n) {
                            let t = U.getSelectorFromElement(e),
                                n = U.find(t).filter((e) => e === this._element);
                            null !== t && n.length && this._triggerArray.push(e);
                        }
                        this._initializeChildren(),
                            this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
                            this._config.toggle && this.toggle();
                    }
                    static get Default() {
                        return eD;
                    }
                    static get DefaultType() {
                        return ez;
                    }
                    static get NAME() {
                        return 'collapse';
                    }
                    toggle() {
                        this._isShown() ? this.hide() : this.show();
                    }
                    show() {
                        if (this._isTransitioning || this._isShown()) return;
                        let e = [];
                        if (
                            (this._config.parent &&
                                (e = this._getFirstLevelChildren('.collapse.show, .collapse.collapsing')
                                    .filter((e) => e !== this._element)
                                    .map((e) => eR.getOrCreateInstance(e, { toggle: !1 }))),
                            (e.length && e[0]._isTransitioning) || G.trigger(this._element, eM).defaultPrevented)
                        )
                            return;
                        for (let t of e) t.hide();
                        let t = this._getDimension();
                        this._element.classList.remove(eN),
                            this._element.classList.add(eB),
                            (this._element.style[t] = 0),
                            this._addAriaAndCollapsedClass(this._triggerArray, !0),
                            (this._isTransitioning = !0);
                        let n = `scroll${t[0].toUpperCase() + t.slice(1)}`;
                        this._queueCallback(
                            () => {
                                (this._isTransitioning = !1),
                                    this._element.classList.remove(eB),
                                    this._element.classList.add(eN, eG),
                                    (this._element.style[t] = ''),
                                    G.trigger(this._element, eE);
                            },
                            this._element,
                            !0
                        ),
                            (this._element.style[t] = `${this._element[n]}px`);
                    }
                    hide() {
                        if (this._isTransitioning || !this._isShown() || G.trigger(this._element, eT).defaultPrevented)
                            return;
                        let e = this._getDimension();
                        for (let t of ((this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`),
                        d(this._element),
                        this._element.classList.add(eB),
                        this._element.classList.remove(eN, eG),
                        this._triggerArray)) {
                            let e = U.getElementFromSelector(t);
                            e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1);
                        }
                        (this._isTransitioning = !0),
                            (this._element.style[e] = ''),
                            this._queueCallback(
                                () => {
                                    (this._isTransitioning = !1),
                                        this._element.classList.remove(eB),
                                        this._element.classList.add(eN),
                                        G.trigger(this._element, eI);
                                },
                                this._element,
                                !0
                            );
                    }
                    _isShown(e = this._element) {
                        return e.classList.contains(eG);
                    }
                    _configAfterMerge(e) {
                        return (e.toggle = Boolean(e.toggle)), (e.parent = s(e.parent)), e;
                    }
                    _getDimension() {
                        return this._element.classList.contains('collapse-horizontal') ? 'width' : 'height';
                    }
                    _initializeChildren() {
                        if (!this._config.parent) return;
                        let e = this._getFirstLevelChildren(eL);
                        for (let t of e) {
                            let e = U.getElementFromSelector(t);
                            e && this._addAriaAndCollapsedClass([t], this._isShown(e));
                        }
                    }
                    _getFirstLevelChildren(e) {
                        let t = U.find(eO, this._config.parent);
                        return U.find(e, this._config.parent).filter((e) => !t.includes(e));
                    }
                    _addAriaAndCollapsedClass(e, t) {
                        if (e.length)
                            for (let n of e) n.classList.toggle('collapsed', !t), n.setAttribute('aria-expanded', t);
                    }
                    static jQueryInterface(e) {
                        let t = {};
                        return (
                            'string' == typeof e && /show|hide/.test(e) && (t.toggle = !1),
                            this.each(function () {
                                let n = eR.getOrCreateInstance(this, t);
                                if ('string' == typeof e) {
                                    if (void 0 === n[e]) throw TypeError(`No method named "${e}"`);
                                    n[e]();
                                }
                            })
                        );
                    }
                }
                G.on(document, ej, eL, function (e) {
                    for (let t of (('A' === e.target.tagName ||
                        (e.delegateTarget && 'A' === e.delegateTarget.tagName)) &&
                        e.preventDefault(),
                    U.getMultipleElementsFromSelector(this)))
                        eR.getOrCreateInstance(t, { toggle: !1 }).toggle();
                }),
                    f(eR);
                var eU = 'bottom',
                    eq = 'right',
                    eH = 'left',
                    eW = 'auto',
                    eF = ['top', eU, eq, eH],
                    e$ = 'start',
                    eV = 'clippingParents',
                    eK = 'viewport',
                    eQ = 'popper',
                    eX = 'reference',
                    eY = eF.reduce(function (e, t) {
                        return e.concat([t + '-' + e$, t + '-end']);
                    }, []),
                    eZ = [].concat(eF, [eW]).reduce(function (e, t) {
                        return e.concat([t, t + '-' + e$, t + '-end']);
                    }, []),
                    eJ = 'beforeRead',
                    e0 = 'read',
                    e1 = 'afterRead',
                    e2 = 'beforeMain',
                    e9 = 'main',
                    e4 = 'afterMain',
                    e3 = 'beforeWrite',
                    e5 = 'write',
                    e7 = 'afterWrite',
                    e8 = [eJ, e0, e1, e2, e9, e4, e3, e5, e7];
                function e6(e) {
                    return e ? (e.nodeName || '').toLowerCase() : null;
                }
                function te(e) {
                    if (null == e) return window;
                    if ('[object Window]' !== e.toString()) {
                        var t = e.ownerDocument;
                        return (t && t.defaultView) || window;
                    }
                    return e;
                }
                function tt(e) {
                    return e instanceof te(e).Element || e instanceof Element;
                }
                function tn(e) {
                    return e instanceof te(e).HTMLElement || e instanceof HTMLElement;
                }
                function ti(e) {
                    return (
                        'undefined' != typeof ShadowRoot && (e instanceof te(e).ShadowRoot || e instanceof ShadowRoot)
                    );
                }
                let ta = {
                    name: 'applyStyles',
                    enabled: !0,
                    phase: 'write',
                    fn: function (e) {
                        var t = e.state;
                        Object.keys(t.elements).forEach(function (e) {
                            var n = t.styles[e] || {},
                                i = t.attributes[e] || {},
                                a = t.elements[e];
                            tn(a) &&
                                e6(a) &&
                                (Object.assign(a.style, n),
                                Object.keys(i).forEach(function (e) {
                                    var t = i[e];
                                    !1 === t ? a.removeAttribute(e) : a.setAttribute(e, !0 === t ? '' : t);
                                }));
                        });
                    },
                    effect: function (e) {
                        var t = e.state,
                            n = {
                                popper: { position: t.options.strategy, left: '0', top: '0', margin: '0' },
                                arrow: { position: 'absolute' },
                                reference: {},
                            };
                        return (
                            Object.assign(t.elements.popper.style, n.popper),
                            (t.styles = n),
                            t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                            function () {
                                Object.keys(t.elements).forEach(function (e) {
                                    var i = t.elements[e],
                                        a = t.attributes[e] || {},
                                        o = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(
                                            function (e, t) {
                                                return (e[t] = ''), e;
                                            },
                                            {}
                                        );
                                    tn(i) &&
                                        e6(i) &&
                                        (Object.assign(i.style, o),
                                        Object.keys(a).forEach(function (e) {
                                            i.removeAttribute(e);
                                        }));
                                });
                            }
                        );
                    },
                    requires: ['computeStyles'],
                };
                function to(e) {
                    return e.split('-')[0];
                }
                var ts = Math.max,
                    tr = Math.min,
                    tc = Math.round;
                function tl() {
                    var e = navigator.userAgentData;
                    return null != e && e.brands && Array.isArray(e.brands)
                        ? e.brands
                              .map(function (e) {
                                  return e.brand + '/' + e.version;
                              })
                              .join(' ')
                        : navigator.userAgent;
                }
                function tu() {
                    return !/^((?!chrome|android).)*safari/i.test(tl());
                }
                function td(e, t, n) {
                    void 0 === t && (t = !1), void 0 === n && (n = !1);
                    var i = e.getBoundingClientRect(),
                        a = 1,
                        o = 1;
                    t &&
                        tn(e) &&
                        ((a = (e.offsetWidth > 0 && tc(i.width) / e.offsetWidth) || 1),
                        (o = (e.offsetHeight > 0 && tc(i.height) / e.offsetHeight) || 1));
                    var s = (tt(e) ? te(e) : window).visualViewport,
                        r = !tu() && n,
                        c = (i.left + (r && s ? s.offsetLeft : 0)) / a,
                        l = (i.top + (r && s ? s.offsetTop : 0)) / o,
                        u = i.width / a,
                        d = i.height / o;
                    return { width: u, height: d, top: l, right: c + u, bottom: l + d, left: c, x: c, y: l };
                }
                function tp(e) {
                    var t = td(e),
                        n = e.offsetWidth,
                        i = e.offsetHeight;
                    return (
                        1 >= Math.abs(t.width - n) && (n = t.width),
                        1 >= Math.abs(t.height - i) && (i = t.height),
                        { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
                    );
                }
                function tm(e, t) {
                    var n = t.getRootNode && t.getRootNode();
                    if (e.contains(t)) return !0;
                    if (n && ti(n)) {
                        var i = t;
                        do {
                            if (i && e.isSameNode(i)) return !0;
                            i = i.parentNode || i.host;
                        } while (i);
                    }
                    return !1;
                }
                function th(e) {
                    return te(e).getComputedStyle(e);
                }
                function tf(e) {
                    return ((tt(e) ? e.ownerDocument : e.document) || window.document).documentElement;
                }
                function tg(e) {
                    return 'html' === e6(e) ? e : e.assignedSlot || e.parentNode || (ti(e) ? e.host : null) || tf(e);
                }
                function tv(e) {
                    return tn(e) && 'fixed' !== th(e).position ? e.offsetParent : null;
                }
                function tb(e) {
                    for (
                        var t = te(e), n = tv(e);
                        n && ['table', 'td', 'th'].indexOf(e6(n)) >= 0 && 'static' === th(n).position;

                    )
                        n = tv(n);
                    return n && ('html' === e6(n) || ('body' === e6(n) && 'static' === th(n).position))
                        ? t
                        : n ||
                              (function (e) {
                                  var t = /firefox/i.test(tl());
                                  if (/Trident/i.test(tl()) && tn(e) && 'fixed' === th(e).position) return null;
                                  var n = tg(e);
                                  for (ti(n) && (n = n.host); tn(n) && 0 > ['html', 'body'].indexOf(e6(n)); ) {
                                      var i = th(n);
                                      if (
                                          'none' !== i.transform ||
                                          'none' !== i.perspective ||
                                          'paint' === i.contain ||
                                          -1 !== ['transform', 'perspective'].indexOf(i.willChange) ||
                                          (t && 'filter' === i.willChange) ||
                                          (t && i.filter && 'none' !== i.filter)
                                      )
                                          return n;
                                      n = n.parentNode;
                                  }
                                  return null;
                              })(e) ||
                              t;
                }
                function tx(e) {
                    return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
                }
                function ty(e, t, n) {
                    return ts(e, tr(t, n));
                }
                function tS(e) {
                    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
                }
                function tw(e, t) {
                    return t.reduce(function (t, n) {
                        return (t[n] = e), t;
                    }, {});
                }
                let tA = {
                    name: 'arrow',
                    enabled: !0,
                    phase: 'main',
                    fn: function (e) {
                        var t,
                            n = e.state,
                            i = e.name,
                            a = e.options,
                            o = n.elements.arrow,
                            s = n.modifiersData.popperOffsets,
                            r = to(n.placement),
                            c = tx(r),
                            l = [eH, eq].indexOf(r) >= 0 ? 'height' : 'width';
                        if (o && s) {
                            var u,
                                d = tS(
                                    'number' !=
                                        typeof (u =
                                            'function' == typeof (u = a.padding)
                                                ? u(Object.assign({}, n.rects, { placement: n.placement }))
                                                : u)
                                        ? u
                                        : tw(u, eF)
                                ),
                                p = tp(o),
                                m = n.rects.reference[l] + n.rects.reference[c] - s[c] - n.rects.popper[l],
                                h = s[c] - n.rects.reference[c],
                                f = tb(o),
                                g = f ? ('y' === c ? f.clientHeight || 0 : f.clientWidth || 0) : 0,
                                v = d['y' === c ? 'top' : eH],
                                b = g - p[l] - d['y' === c ? eU : eq],
                                x = g / 2 - p[l] / 2 + (m / 2 - h / 2),
                                y = ty(v, x, b);
                            n.modifiersData[i] = (((t = {})[c] = y), (t.centerOffset = y - x), t);
                        }
                    },
                    effect: function (e) {
                        var t = e.state,
                            n = e.options.element,
                            i = void 0 === n ? '[data-popper-arrow]' : n;
                        null != i &&
                            ('string' != typeof i || (i = t.elements.popper.querySelector(i))) &&
                            tm(t.elements.popper, i) &&
                            (t.elements.arrow = i);
                    },
                    requires: ['popperOffsets'],
                    requiresIfExists: ['preventOverflow'],
                };
                function tC(e) {
                    return e.split('-')[1];
                }
                var t_ = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
                function tP(e) {
                    var t,
                        n = e.popper,
                        i = e.popperRect,
                        a = e.placement,
                        o = e.variation,
                        s = e.offsets,
                        r = e.position,
                        c = e.gpuAcceleration,
                        l = e.adaptive,
                        u = e.roundOffsets,
                        d = e.isFixed,
                        p = s.x,
                        m = void 0 === p ? 0 : p,
                        h = s.y,
                        f = void 0 === h ? 0 : h,
                        g = 'function' == typeof u ? u({ x: m, y: f }) : { x: m, y: f };
                    (m = g.x), (f = g.y);
                    var v = s.hasOwnProperty('x'),
                        b = s.hasOwnProperty('y'),
                        x = eH,
                        y = 'top',
                        S = window;
                    if (l) {
                        var w = tb(n),
                            A = 'clientHeight',
                            C = 'clientWidth';
                        w === te(n) &&
                            'static' !== th((w = tf(n))).position &&
                            'absolute' === r &&
                            ((A = 'scrollHeight'), (C = 'scrollWidth')),
                            ('top' === a || ((a === eH || a === eq) && 'end' === o)) &&
                                ((y = eU),
                                (f -= (d && w === S && S.visualViewport ? S.visualViewport.height : w[A]) - i.height),
                                (f *= c ? 1 : -1)),
                            (a !== eH && (('top' !== a && a !== eU) || 'end' !== o)) ||
                                ((x = eq),
                                (m -= (d && w === S && S.visualViewport ? S.visualViewport.width : w[C]) - i.width),
                                (m *= c ? 1 : -1));
                    }
                    var _,
                        P,
                        k,
                        M,
                        E,
                        T,
                        I = Object.assign({ position: r }, l && t_),
                        j =
                            !0 === u
                                ? ((_ = { x: m, y: f }),
                                  (P = te(n)),
                                  (k = _.x),
                                  (M = _.y),
                                  { x: tc(k * (E = P.devicePixelRatio || 1)) / E || 0, y: tc(M * E) / E || 0 })
                                : { x: m, y: f };
                    return (
                        (m = j.x),
                        (f = j.y),
                        c
                            ? Object.assign(
                                  {},
                                  I,
                                  (((T = {})[y] = b ? '0' : ''),
                                  (T[x] = v ? '0' : ''),
                                  (T.transform =
                                      1 >= (S.devicePixelRatio || 1)
                                          ? 'translate(' + m + 'px, ' + f + 'px)'
                                          : 'translate3d(' + m + 'px, ' + f + 'px, 0)'),
                                  T)
                              )
                            : Object.assign(
                                  {},
                                  I,
                                  (((t = {})[y] = b ? f + 'px' : ''), (t[x] = v ? m + 'px' : ''), (t.transform = ''), t)
                              )
                    );
                }
                let tk = {
                    name: 'computeStyles',
                    enabled: !0,
                    phase: 'beforeWrite',
                    fn: function (e) {
                        var t = e.state,
                            n = e.options,
                            i = n.gpuAcceleration,
                            a = n.adaptive,
                            o = n.roundOffsets,
                            s = void 0 === o || o,
                            r = {
                                placement: to(t.placement),
                                variation: tC(t.placement),
                                popper: t.elements.popper,
                                popperRect: t.rects.popper,
                                gpuAcceleration: void 0 === i || i,
                                isFixed: 'fixed' === t.options.strategy,
                            };
                        null != t.modifiersData.popperOffsets &&
                            (t.styles.popper = Object.assign(
                                {},
                                t.styles.popper,
                                tP(
                                    Object.assign({}, r, {
                                        offsets: t.modifiersData.popperOffsets,
                                        position: t.options.strategy,
                                        adaptive: void 0 === a || a,
                                        roundOffsets: s,
                                    })
                                )
                            )),
                            null != t.modifiersData.arrow &&
                                (t.styles.arrow = Object.assign(
                                    {},
                                    t.styles.arrow,
                                    tP(
                                        Object.assign({}, r, {
                                            offsets: t.modifiersData.arrow,
                                            position: 'absolute',
                                            adaptive: !1,
                                            roundOffsets: s,
                                        })
                                    )
                                )),
                            (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                                'data-popper-placement': t.placement,
                            }));
                    },
                    data: {},
                };
                var tM = { passive: !0 };
                let tE = {
                    name: 'eventListeners',
                    enabled: !0,
                    phase: 'write',
                    fn: function () {},
                    effect: function (e) {
                        var t = e.state,
                            n = e.instance,
                            i = e.options,
                            a = i.scroll,
                            o = void 0 === a || a,
                            s = i.resize,
                            r = void 0 === s || s,
                            c = te(t.elements.popper),
                            l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                        return (
                            o &&
                                l.forEach(function (e) {
                                    e.addEventListener('scroll', n.update, tM);
                                }),
                            r && c.addEventListener('resize', n.update, tM),
                            function () {
                                o &&
                                    l.forEach(function (e) {
                                        e.removeEventListener('scroll', n.update, tM);
                                    }),
                                    r && c.removeEventListener('resize', n.update, tM);
                            }
                        );
                    },
                    data: {},
                };
                var tT = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
                function tI(e) {
                    return e.replace(/left|right|bottom|top/g, function (e) {
                        return tT[e];
                    });
                }
                var tj = { start: 'end', end: 'start' };
                function tG(e) {
                    return e.replace(/start|end/g, function (e) {
                        return tj[e];
                    });
                }
                function tN(e) {
                    var t = te(e);
                    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
                }
                function tB(e) {
                    return td(tf(e)).left + tN(e).scrollLeft;
                }
                function tO(e) {
                    var t = th(e),
                        n = t.overflow,
                        i = t.overflowX,
                        a = t.overflowY;
                    return /auto|scroll|overlay|hidden/.test(n + a + i);
                }
                function tL(e, t) {
                    void 0 === t && (t = []);
                    var n,
                        i = (function e(t) {
                            return ['html', 'body', '#document'].indexOf(e6(t)) >= 0
                                ? t.ownerDocument.body
                                : tn(t) && tO(t)
                                  ? t
                                  : e(tg(t));
                        })(e),
                        a = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
                        o = te(i),
                        s = a ? [o].concat(o.visualViewport || [], tO(i) ? i : []) : i,
                        r = t.concat(s);
                    return a ? r : r.concat(tL(tg(s)));
                }
                function tD(e) {
                    return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
                }
                function tz(e, t, n) {
                    var i, a, o, s, r, c, l, u, d, p;
                    return t === eK
                        ? tD(
                              (function (e, t) {
                                  var n = te(e),
                                      i = tf(e),
                                      a = n.visualViewport,
                                      o = i.clientWidth,
                                      s = i.clientHeight,
                                      r = 0,
                                      c = 0;
                                  if (a) {
                                      (o = a.width), (s = a.height);
                                      var l = tu();
                                      (l || (!l && 'fixed' === t)) && ((r = a.offsetLeft), (c = a.offsetTop));
                                  }
                                  return { width: o, height: s, x: r + tB(e), y: c };
                              })(e, n)
                          )
                        : tt(t)
                          ? (((i = td(t, !1, 'fixed' === n)).top = i.top + t.clientTop),
                            (i.left = i.left + t.clientLeft),
                            (i.bottom = i.top + t.clientHeight),
                            (i.right = i.left + t.clientWidth),
                            (i.width = t.clientWidth),
                            (i.height = t.clientHeight),
                            (i.x = i.left),
                            (i.y = i.top),
                            i)
                          : tD(
                                ((a = tf(e)),
                                (s = tf(a)),
                                (r = tN(a)),
                                (c = null == (o = a.ownerDocument) ? void 0 : o.body),
                                (l = ts(s.scrollWidth, s.clientWidth, c ? c.scrollWidth : 0, c ? c.clientWidth : 0)),
                                (u = ts(
                                    s.scrollHeight,
                                    s.clientHeight,
                                    c ? c.scrollHeight : 0,
                                    c ? c.clientHeight : 0
                                )),
                                (d = -r.scrollLeft + tB(a)),
                                (p = -r.scrollTop),
                                'rtl' === th(c || s).direction && (d += ts(s.clientWidth, c ? c.clientWidth : 0) - l),
                                { width: l, height: u, x: d, y: p })
                            );
                }
                function tR(e) {
                    var t,
                        n = e.reference,
                        i = e.element,
                        a = e.placement,
                        o = a ? to(a) : null,
                        s = a ? tC(a) : null,
                        r = n.x + n.width / 2 - i.width / 2,
                        c = n.y + n.height / 2 - i.height / 2;
                    switch (o) {
                        case 'top':
                            t = { x: r, y: n.y - i.height };
                            break;
                        case eU:
                            t = { x: r, y: n.y + n.height };
                            break;
                        case eq:
                            t = { x: n.x + n.width, y: c };
                            break;
                        case eH:
                            t = { x: n.x - i.width, y: c };
                            break;
                        default:
                            t = { x: n.x, y: n.y };
                    }
                    var l = o ? tx(o) : null;
                    if (null != l) {
                        var u = 'y' === l ? 'height' : 'width';
                        switch (s) {
                            case e$:
                                t[l] = t[l] - (n[u] / 2 - i[u] / 2);
                                break;
                            case 'end':
                                t[l] = t[l] + (n[u] / 2 - i[u] / 2);
                        }
                    }
                    return t;
                }
                function tU(e, t) {
                    void 0 === t && (t = {});
                    var n,
                        i,
                        a,
                        o,
                        s,
                        r,
                        c,
                        l = t,
                        u = l.placement,
                        d = void 0 === u ? e.placement : u,
                        p = l.strategy,
                        m = void 0 === p ? e.strategy : p,
                        h = l.boundary,
                        f = l.rootBoundary,
                        g = l.elementContext,
                        v = void 0 === g ? eQ : g,
                        b = l.altBoundary,
                        x = l.padding,
                        y = void 0 === x ? 0 : x,
                        S = tS('number' != typeof y ? y : tw(y, eF)),
                        w = e.rects.popper,
                        A = e.elements[void 0 !== b && b ? (v === eQ ? eX : eQ) : v],
                        C =
                            ((n = tt(A) ? A : A.contextElement || tf(e.elements.popper)),
                            (r = (s = [].concat(
                                'clippingParents' === (i = void 0 === h ? eV : h)
                                    ? ((a = tL(tg(n))),
                                      tt((o = ['absolute', 'fixed'].indexOf(th(n).position) >= 0 && tn(n) ? tb(n) : n))
                                          ? a.filter(function (e) {
                                                return tt(e) && tm(e, o) && 'body' !== e6(e);
                                            })
                                          : [])
                                    : [].concat(i),
                                [void 0 === f ? eK : f]
                            ))[0]),
                            ((c = s.reduce(
                                function (e, t) {
                                    var i = tz(n, t, m);
                                    return (
                                        (e.top = ts(i.top, e.top)),
                                        (e.right = tr(i.right, e.right)),
                                        (e.bottom = tr(i.bottom, e.bottom)),
                                        (e.left = ts(i.left, e.left)),
                                        e
                                    );
                                },
                                tz(n, r, m)
                            )).width = c.right - c.left),
                            (c.height = c.bottom - c.top),
                            (c.x = c.left),
                            (c.y = c.top),
                            c),
                        _ = td(e.elements.reference),
                        P = tR({ reference: _, element: w, strategy: 'absolute', placement: d }),
                        k = tD(Object.assign({}, w, P)),
                        M = v === eQ ? k : _,
                        E = {
                            top: C.top - M.top + S.top,
                            bottom: M.bottom - C.bottom + S.bottom,
                            left: C.left - M.left + S.left,
                            right: M.right - C.right + S.right,
                        },
                        T = e.modifiersData.offset;
                    if (v === eQ && T) {
                        var I = T[d];
                        Object.keys(E).forEach(function (e) {
                            var t = [eq, eU].indexOf(e) >= 0 ? 1 : -1,
                                n = ['top', eU].indexOf(e) >= 0 ? 'y' : 'x';
                            E[e] += I[n] * t;
                        });
                    }
                    return E;
                }
                let tq = {
                    name: 'flip',
                    enabled: !0,
                    phase: 'main',
                    fn: function (e) {
                        var t = e.state,
                            n = e.options,
                            i = e.name;
                        if (!t.modifiersData[i]._skip) {
                            for (
                                var a = n.mainAxis,
                                    o = void 0 === a || a,
                                    s = n.altAxis,
                                    r = void 0 === s || s,
                                    c = n.fallbackPlacements,
                                    l = n.padding,
                                    u = n.boundary,
                                    d = n.rootBoundary,
                                    p = n.altBoundary,
                                    m = n.flipVariations,
                                    h = void 0 === m || m,
                                    f = n.allowedAutoPlacements,
                                    g = t.options.placement,
                                    v = to(g),
                                    b =
                                        c ||
                                        (v !== g && h
                                            ? (function (e) {
                                                  if (to(e) === eW) return [];
                                                  var t = tI(e);
                                                  return [tG(e), t, tG(t)];
                                              })(g)
                                            : [tI(g)]),
                                    x = [g].concat(b).reduce(function (e, n) {
                                        var i, a, o, s, r, c, p, m, g, v, b, x;
                                        return e.concat(
                                            to(n) === eW
                                                ? ((a = (i = {
                                                      placement: n,
                                                      boundary: u,
                                                      rootBoundary: d,
                                                      padding: l,
                                                      flipVariations: h,
                                                      allowedAutoPlacements: f,
                                                  }).placement),
                                                  (o = i.boundary),
                                                  (s = i.rootBoundary),
                                                  (r = i.padding),
                                                  (c = i.flipVariations),
                                                  (m = void 0 === (p = i.allowedAutoPlacements) ? eZ : p),
                                                  0 ===
                                                      (b = (v = (g = tC(a))
                                                          ? c
                                                              ? eY
                                                              : eY.filter(function (e) {
                                                                    return tC(e) === g;
                                                                })
                                                          : eF).filter(function (e) {
                                                          return m.indexOf(e) >= 0;
                                                      })).length && (b = v),
                                                  Object.keys(
                                                      (x = b.reduce(function (e, n) {
                                                          return (
                                                              (e[n] = tU(t, {
                                                                  placement: n,
                                                                  boundary: o,
                                                                  rootBoundary: s,
                                                                  padding: r,
                                                              })[to(n)]),
                                                              e
                                                          );
                                                      }, {}))
                                                  ).sort(function (e, t) {
                                                      return x[e] - x[t];
                                                  }))
                                                : n
                                        );
                                    }, []),
                                    y = t.rects.reference,
                                    S = t.rects.popper,
                                    w = new Map(),
                                    A = !0,
                                    C = x[0],
                                    _ = 0;
                                _ < x.length;
                                _++
                            ) {
                                var P = x[_],
                                    k = to(P),
                                    M = tC(P) === e$,
                                    E = ['top', eU].indexOf(k) >= 0,
                                    T = E ? 'width' : 'height',
                                    I = tU(t, {
                                        placement: P,
                                        boundary: u,
                                        rootBoundary: d,
                                        altBoundary: p,
                                        padding: l,
                                    }),
                                    j = E ? (M ? eq : eH) : M ? eU : 'top';
                                y[T] > S[T] && (j = tI(j));
                                var G = tI(j),
                                    N = [];
                                if (
                                    (o && N.push(I[k] <= 0),
                                    r && N.push(I[j] <= 0, I[G] <= 0),
                                    N.every(function (e) {
                                        return e;
                                    }))
                                ) {
                                    (C = P), (A = !1);
                                    break;
                                }
                                w.set(P, N);
                            }
                            if (A)
                                for (
                                    var B = function (e) {
                                            var t = x.find(function (t) {
                                                var n = w.get(t);
                                                if (n)
                                                    return n.slice(0, e).every(function (e) {
                                                        return e;
                                                    });
                                            });
                                            if (t) return (C = t), 'break';
                                        },
                                        O = h ? 3 : 1;
                                    O > 0 && 'break' !== B(O);
                                    O--
                                );
                            t.placement !== C && ((t.modifiersData[i]._skip = !0), (t.placement = C), (t.reset = !0));
                        }
                    },
                    requiresIfExists: ['offset'],
                    data: { _skip: !1 },
                };
                function tH(e, t, n) {
                    return (
                        void 0 === n && (n = { x: 0, y: 0 }),
                        {
                            top: e.top - t.height - n.y,
                            right: e.right - t.width + n.x,
                            bottom: e.bottom - t.height + n.y,
                            left: e.left - t.width - n.x,
                        }
                    );
                }
                function tW(e) {
                    return ['top', eq, eU, eH].some(function (t) {
                        return e[t] >= 0;
                    });
                }
                let tF = {
                        name: 'hide',
                        enabled: !0,
                        phase: 'main',
                        requiresIfExists: ['preventOverflow'],
                        fn: function (e) {
                            var t = e.state,
                                n = e.name,
                                i = t.rects.reference,
                                a = t.rects.popper,
                                o = t.modifiersData.preventOverflow,
                                s = tU(t, { elementContext: 'reference' }),
                                r = tU(t, { altBoundary: !0 }),
                                c = tH(s, i),
                                l = tH(r, a, o),
                                u = tW(c),
                                d = tW(l);
                            (t.modifiersData[n] = {
                                referenceClippingOffsets: c,
                                popperEscapeOffsets: l,
                                isReferenceHidden: u,
                                hasPopperEscaped: d,
                            }),
                                (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                                    'data-popper-reference-hidden': u,
                                    'data-popper-escaped': d,
                                }));
                        },
                    },
                    t$ = {
                        name: 'offset',
                        enabled: !0,
                        phase: 'main',
                        requires: ['popperOffsets'],
                        fn: function (e) {
                            var t = e.state,
                                n = e.options,
                                i = e.name,
                                a = n.offset,
                                o = void 0 === a ? [0, 0] : a,
                                s = eZ.reduce(function (e, n) {
                                    var i, a, s, r, c, l;
                                    return (
                                        (e[n] =
                                            ((i = t.rects),
                                            (s = [eH, 'top'].indexOf((a = to(n))) >= 0 ? -1 : 1),
                                            (c = (r =
                                                'function' == typeof o
                                                    ? o(Object.assign({}, i, { placement: n }))
                                                    : o)[0]),
                                            (l = r[1]),
                                            (c = c || 0),
                                            (l = (l || 0) * s),
                                            [eH, eq].indexOf(a) >= 0 ? { x: l, y: c } : { x: c, y: l })),
                                        e
                                    );
                                }, {}),
                                r = s[t.placement],
                                c = r.x,
                                l = r.y;
                            null != t.modifiersData.popperOffsets &&
                                ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += l)),
                                (t.modifiersData[i] = s);
                        },
                    },
                    tV = {
                        name: 'popperOffsets',
                        enabled: !0,
                        phase: 'read',
                        fn: function (e) {
                            var t = e.state,
                                n = e.name;
                            t.modifiersData[n] = tR({
                                reference: t.rects.reference,
                                element: t.rects.popper,
                                strategy: 'absolute',
                                placement: t.placement,
                            });
                        },
                        data: {},
                    },
                    tK = {
                        name: 'preventOverflow',
                        enabled: !0,
                        phase: 'main',
                        fn: function (e) {
                            var t = e.state,
                                n = e.options,
                                i = e.name,
                                a = n.mainAxis,
                                o = n.altAxis,
                                s = n.boundary,
                                r = n.rootBoundary,
                                c = n.altBoundary,
                                l = n.padding,
                                u = n.tether,
                                d = void 0 === u || u,
                                p = n.tetherOffset,
                                m = void 0 === p ? 0 : p,
                                h = tU(t, { boundary: s, rootBoundary: r, padding: l, altBoundary: c }),
                                f = to(t.placement),
                                g = tC(t.placement),
                                v = !g,
                                b = tx(f),
                                x = 'x' === b ? 'y' : 'x',
                                y = t.modifiersData.popperOffsets,
                                S = t.rects.reference,
                                w = t.rects.popper,
                                A =
                                    'function' == typeof m
                                        ? m(Object.assign({}, t.rects, { placement: t.placement }))
                                        : m,
                                C =
                                    'number' == typeof A
                                        ? { mainAxis: A, altAxis: A }
                                        : Object.assign({ mainAxis: 0, altAxis: 0 }, A),
                                _ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
                                P = { x: 0, y: 0 };
                            if (y) {
                                if (void 0 === a || a) {
                                    var k,
                                        M = 'y' === b ? 'top' : eH,
                                        E = 'y' === b ? eU : eq,
                                        T = 'y' === b ? 'height' : 'width',
                                        I = y[b],
                                        j = I + h[M],
                                        G = I - h[E],
                                        N = d ? -w[T] / 2 : 0,
                                        B = g === e$ ? S[T] : w[T],
                                        O = g === e$ ? -w[T] : -S[T],
                                        L = t.elements.arrow,
                                        D = d && L ? tp(L) : { width: 0, height: 0 },
                                        z = t.modifiersData['arrow#persistent']
                                            ? t.modifiersData['arrow#persistent'].padding
                                            : { top: 0, right: 0, bottom: 0, left: 0 },
                                        R = z[M],
                                        U = z[E],
                                        q = ty(0, S[T], D[T]),
                                        H = v ? S[T] / 2 - N - q - R - C.mainAxis : B - q - R - C.mainAxis,
                                        W = v ? -S[T] / 2 + N + q + U + C.mainAxis : O + q + U + C.mainAxis,
                                        F = t.elements.arrow && tb(t.elements.arrow),
                                        $ = F ? ('y' === b ? F.clientTop || 0 : F.clientLeft || 0) : 0,
                                        V = null != (k = null == _ ? void 0 : _[b]) ? k : 0,
                                        K = ty(d ? tr(j, I + H - V - $) : j, I, d ? ts(G, I + W - V) : G);
                                    (y[b] = K), (P[b] = K - I);
                                }
                                if (void 0 !== o && o) {
                                    var Q,
                                        X,
                                        Y = y[x],
                                        Z = 'y' === x ? 'height' : 'width',
                                        J = Y + h['x' === b ? 'top' : eH],
                                        ee = Y - h['x' === b ? eU : eq],
                                        et = -1 !== ['top', eH].indexOf(f),
                                        en = null != (X = null == _ ? void 0 : _[x]) ? X : 0,
                                        ei = et ? J : Y - S[Z] - w[Z] - en + C.altAxis,
                                        ea = et ? Y + S[Z] + w[Z] - en - C.altAxis : ee,
                                        eo =
                                            d && et
                                                ? (Q = ty(ei, Y, ea)) > ea
                                                    ? ea
                                                    : Q
                                                : ty(d ? ei : J, Y, d ? ea : ee);
                                    (y[x] = eo), (P[x] = eo - Y);
                                }
                                t.modifiersData[i] = P;
                            }
                        },
                        requiresIfExists: ['offset'],
                    };
                var tQ = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
                function tX() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return !t.some(function (e) {
                        return !(e && 'function' == typeof e.getBoundingClientRect);
                    });
                }
                function tY(e) {
                    void 0 === e && (e = {});
                    var t = e,
                        n = t.defaultModifiers,
                        i = void 0 === n ? [] : n,
                        a = t.defaultOptions,
                        o = void 0 === a ? tQ : a;
                    return function (e, t, n) {
                        void 0 === n && (n = o);
                        var a,
                            s = {
                                placement: 'bottom',
                                orderedModifiers: [],
                                options: Object.assign({}, tQ, o),
                                modifiersData: {},
                                elements: { reference: e, popper: t },
                                attributes: {},
                                styles: {},
                            },
                            r = [],
                            c = !1,
                            l = {
                                state: s,
                                setOptions: function (n) {
                                    var a = 'function' == typeof n ? n(s.options) : n;
                                    u(),
                                        (s.options = Object.assign({}, o, s.options, a)),
                                        (s.scrollParents = {
                                            reference: tt(e) ? tL(e) : e.contextElement ? tL(e.contextElement) : [],
                                            popper: tL(t),
                                        });
                                    var c,
                                        d,
                                        p,
                                        m,
                                        h,
                                        f =
                                            ((c = Object.keys(
                                                (h = [].concat(i, s.options.modifiers).reduce(function (e, t) {
                                                    var n = e[t.name];
                                                    return (
                                                        (e[t.name] = n
                                                            ? Object.assign({}, n, t, {
                                                                  options: Object.assign({}, n.options, t.options),
                                                                  data: Object.assign({}, n.data, t.data),
                                                              })
                                                            : t),
                                                        e
                                                    );
                                                }, {}))
                                            ).map(function (e) {
                                                return h[e];
                                            })),
                                            (d = new Map()),
                                            (p = new Set()),
                                            (m = []),
                                            c.forEach(function (e) {
                                                d.set(e.name, e);
                                            }),
                                            c.forEach(function (e) {
                                                p.has(e.name) ||
                                                    (function e(t) {
                                                        p.add(t.name),
                                                            []
                                                                .concat(t.requires || [], t.requiresIfExists || [])
                                                                .forEach(function (t) {
                                                                    if (!p.has(t)) {
                                                                        var n = d.get(t);
                                                                        n && e(n);
                                                                    }
                                                                }),
                                                            m.push(t);
                                                    })(e);
                                            }),
                                            e8.reduce(function (e, t) {
                                                return e.concat(
                                                    m.filter(function (e) {
                                                        return e.phase === t;
                                                    })
                                                );
                                            }, []));
                                    return (
                                        (s.orderedModifiers = f.filter(function (e) {
                                            return e.enabled;
                                        })),
                                        s.orderedModifiers.forEach(function (e) {
                                            var t = e.name,
                                                n = e.options,
                                                i = e.effect;
                                            if ('function' == typeof i) {
                                                var a = i({
                                                    state: s,
                                                    name: t,
                                                    instance: l,
                                                    options: void 0 === n ? {} : n,
                                                });
                                                r.push(a || function () {});
                                            }
                                        }),
                                        l.update()
                                    );
                                },
                                forceUpdate: function () {
                                    if (!c) {
                                        var e = s.elements,
                                            t = e.reference,
                                            n = e.popper;
                                        if (tX(t, n)) {
                                            (s.rects = {
                                                reference:
                                                    ((i = tb(n)),
                                                    (a = 'fixed' === s.options.strategy),
                                                    (d = tn(i)),
                                                    (p =
                                                        tn(i) &&
                                                        ((r =
                                                            tc((o = i.getBoundingClientRect()).width) / i.offsetWidth ||
                                                            1),
                                                        (u = tc(o.height) / i.offsetHeight || 1),
                                                        1 !== r || 1 !== u)),
                                                    (m = tf(i)),
                                                    (h = td(t, p, a)),
                                                    (f = { scrollLeft: 0, scrollTop: 0 }),
                                                    (g = { x: 0, y: 0 }),
                                                    (d || (!d && !a)) &&
                                                        (('body' !== e6(i) || tO(m)) &&
                                                            (f =
                                                                i !== te(i) && tn(i)
                                                                    ? {
                                                                          scrollLeft: i.scrollLeft,
                                                                          scrollTop: i.scrollTop,
                                                                      }
                                                                    : tN(i)),
                                                        tn(i)
                                                            ? (((g = td(i, !0)).x += i.clientLeft),
                                                              (g.y += i.clientTop))
                                                            : m && (g.x = tB(m))),
                                                    {
                                                        x: h.left + f.scrollLeft - g.x,
                                                        y: h.top + f.scrollTop - g.y,
                                                        width: h.width,
                                                        height: h.height,
                                                    }),
                                                popper: tp(n),
                                            }),
                                                (s.reset = !1),
                                                (s.placement = s.options.placement),
                                                s.orderedModifiers.forEach(function (e) {
                                                    return (s.modifiersData[e.name] = Object.assign({}, e.data));
                                                });
                                            for (
                                                var i, a, o, r, u, d, p, m, h, f, g, v = 0;
                                                v < s.orderedModifiers.length;
                                                v++
                                            )
                                                if (!0 !== s.reset) {
                                                    var b = s.orderedModifiers[v],
                                                        x = b.fn,
                                                        y = b.options,
                                                        S = void 0 === y ? {} : y,
                                                        w = b.name;
                                                    'function' == typeof x &&
                                                        (s = x({ state: s, options: S, name: w, instance: l }) || s);
                                                } else (s.reset = !1), (v = -1);
                                        }
                                    }
                                },
                                update: function () {
                                    return (
                                        a ||
                                            (a = new Promise(function (e) {
                                                Promise.resolve().then(function () {
                                                    (a = void 0),
                                                        e(
                                                            new Promise(function (e) {
                                                                l.forceUpdate(), e(s);
                                                            })
                                                        );
                                                });
                                            })),
                                        a
                                    );
                                },
                                destroy: function () {
                                    u(), (c = !0);
                                },
                            };
                        if (!tX(e, t)) return l;
                        function u() {
                            r.forEach(function (e) {
                                return e();
                            }),
                                (r = []);
                        }
                        return (
                            l.setOptions(n).then(function (e) {
                                !c && n.onFirstUpdate && n.onFirstUpdate(e);
                            }),
                            l
                        );
                    };
                }
                var tZ = tY(),
                    tJ = tY({ defaultModifiers: [tE, tV, tk, ta] }),
                    t0 = tY({ defaultModifiers: [tE, tV, tk, ta, t$, tq, tK, tA, tF] });
                let t1 = Object.freeze(
                        Object.defineProperty(
                            {
                                __proto__: null,
                                afterMain: e4,
                                afterRead: e1,
                                afterWrite: e7,
                                applyStyles: ta,
                                arrow: tA,
                                auto: eW,
                                basePlacements: eF,
                                beforeMain: e2,
                                beforeRead: eJ,
                                beforeWrite: e3,
                                bottom: eU,
                                clippingParents: eV,
                                computeStyles: tk,
                                createPopper: t0,
                                createPopperBase: tZ,
                                createPopperLite: tJ,
                                detectOverflow: tU,
                                end: 'end',
                                eventListeners: tE,
                                flip: tq,
                                hide: tF,
                                left: eH,
                                main: e9,
                                modifierPhases: e8,
                                offset: t$,
                                placements: eZ,
                                popper: eQ,
                                popperGenerator: tY,
                                popperOffsets: tV,
                                preventOverflow: tK,
                                read: e0,
                                reference: eX,
                                right: eq,
                                start: e$,
                                top: 'top',
                                variationPlacements: eY,
                                viewport: eK,
                                write: e5,
                            },
                            Symbol.toStringTag,
                            { value: 'Module' }
                        )
                    ),
                    t2 = 'dropdown',
                    t9 = '.bs.dropdown',
                    t4 = '.data-api',
                    t3 = 'ArrowDown',
                    t5 = `hide${t9}`,
                    t7 = `hidden${t9}`,
                    t8 = `show${t9}`,
                    t6 = `shown${t9}`,
                    ne = `click${t9}${t4}`,
                    nt = `keydown${t9}${t4}`,
                    nn = `keyup${t9}${t4}`,
                    ni = 'show',
                    na = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
                    no = `${na}.${ni}`,
                    ns = '.dropdown-menu',
                    nr = h() ? 'top-end' : 'top-start',
                    nc = h() ? 'top-start' : 'top-end',
                    nl = h() ? 'bottom-end' : 'bottom-start',
                    nu = h() ? 'bottom-start' : 'bottom-end',
                    nd = h() ? 'left-start' : 'right-start',
                    np = h() ? 'right-start' : 'left-start',
                    nm = {
                        autoClose: !0,
                        boundary: 'clippingParents',
                        display: 'dynamic',
                        offset: [0, 2],
                        popperConfig: null,
                        reference: 'toggle',
                    },
                    nh = {
                        autoClose: '(boolean|string)',
                        boundary: '(string|element)',
                        display: 'string',
                        offset: '(array|string|function)',
                        popperConfig: '(null|object|function)',
                        reference: '(string|element|object)',
                    };
                class nf extends z {
                    constructor(e, t) {
                        super(e, t),
                            (this._popper = null),
                            (this._parent = this._element.parentNode),
                            (this._menu =
                                U.next(this._element, ns)[0] ||
                                U.prev(this._element, ns)[0] ||
                                U.findOne(ns, this._parent)),
                            (this._inNavbar = this._detectNavbar());
                    }
                    static get Default() {
                        return nm;
                    }
                    static get DefaultType() {
                        return nh;
                    }
                    static get NAME() {
                        return t2;
                    }
                    toggle() {
                        return this._isShown() ? this.hide() : this.show();
                    }
                    show() {
                        if (c(this._element) || this._isShown()) return;
                        let e = { relatedTarget: this._element };
                        if (!G.trigger(this._element, t8, e).defaultPrevented) {
                            if (
                                (this._createPopper(),
                                'ontouchstart' in document.documentElement && !this._parent.closest('.navbar-nav'))
                            )
                                for (let e of [].concat(...document.body.children)) G.on(e, 'mouseover', u);
                            this._element.focus(),
                                this._element.setAttribute('aria-expanded', !0),
                                this._menu.classList.add(ni),
                                this._element.classList.add(ni),
                                G.trigger(this._element, t6, e);
                        }
                    }
                    hide() {
                        if (c(this._element) || !this._isShown()) return;
                        let e = { relatedTarget: this._element };
                        this._completeHide(e);
                    }
                    dispose() {
                        this._popper && this._popper.destroy(), super.dispose();
                    }
                    update() {
                        (this._inNavbar = this._detectNavbar()), this._popper && this._popper.update();
                    }
                    _completeHide(e) {
                        if (!G.trigger(this._element, t5, e).defaultPrevented) {
                            if ('ontouchstart' in document.documentElement)
                                for (let e of [].concat(...document.body.children)) G.off(e, 'mouseover', u);
                            this._popper && this._popper.destroy(),
                                this._menu.classList.remove(ni),
                                this._element.classList.remove(ni),
                                this._element.setAttribute('aria-expanded', 'false'),
                                L.removeDataAttribute(this._menu, 'popper'),
                                G.trigger(this._element, t7, e);
                        }
                    }
                    _getConfig(e) {
                        if (
                            'object' == typeof (e = super._getConfig(e)).reference &&
                            !o(e.reference) &&
                            'function' != typeof e.reference.getBoundingClientRect
                        )
                            throw TypeError(
                                `${t2.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
                            );
                        return e;
                    }
                    _createPopper() {
                        if (void 0 === t1)
                            throw TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                        let e = this._element;
                        'parent' === this._config.reference
                            ? (e = this._parent)
                            : o(this._config.reference)
                              ? (e = s(this._config.reference))
                              : 'object' == typeof this._config.reference && (e = this._config.reference);
                        let t = this._getPopperConfig();
                        this._popper = t0(e, this._menu, t);
                    }
                    _isShown() {
                        return this._menu.classList.contains(ni);
                    }
                    _getPlacement() {
                        let e = this._parent;
                        if (e.classList.contains('dropend')) return nd;
                        if (e.classList.contains('dropstart')) return np;
                        if (e.classList.contains('dropup-center')) return 'top';
                        if (e.classList.contains('dropdown-center')) return 'bottom';
                        let t = 'end' === getComputedStyle(this._menu).getPropertyValue('--bs-position').trim();
                        return e.classList.contains('dropup') ? (t ? nc : nr) : t ? nu : nl;
                    }
                    _detectNavbar() {
                        return null !== this._element.closest('.navbar');
                    }
                    _getOffset() {
                        let { offset: e } = this._config;
                        return 'string' == typeof e
                            ? e.split(',').map((e) => Number.parseInt(e, 10))
                            : 'function' == typeof e
                              ? (t) => e(t, this._element)
                              : e;
                    }
                    _getPopperConfig() {
                        let e = {
                            placement: this._getPlacement(),
                            modifiers: [
                                { name: 'preventOverflow', options: { boundary: this._config.boundary } },
                                { name: 'offset', options: { offset: this._getOffset() } },
                            ],
                        };
                        return (
                            (this._inNavbar || 'static' === this._config.display) &&
                                (L.setDataAttribute(this._menu, 'popper', 'static'),
                                (e.modifiers = [{ name: 'applyStyles', enabled: !1 }])),
                            { ...e, ...g(this._config.popperConfig, [e]) }
                        );
                    }
                    _selectMenuItem({ key: e, target: t }) {
                        let n = U.find(
                            '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
                            this._menu
                        ).filter((e) => r(e));
                        n.length && b(n, t, e === t3, !n.includes(t)).focus();
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = nf.getOrCreateInstance(this, e);
                            if ('string' == typeof e) {
                                if (void 0 === t[e]) throw TypeError(`No method named "${e}"`);
                                t[e]();
                            }
                        });
                    }
                    static clearMenus(e) {
                        if (2 === e.button || ('keyup' === e.type && 'Tab' !== e.key)) return;
                        let t = U.find(no);
                        for (let n of t) {
                            let t = nf.getInstance(n);
                            if (!t || !1 === t._config.autoClose) continue;
                            let i = e.composedPath(),
                                a = i.includes(t._menu);
                            if (
                                i.includes(t._element) ||
                                ('inside' === t._config.autoClose && !a) ||
                                ('outside' === t._config.autoClose && a) ||
                                (t._menu.contains(e.target) &&
                                    (('keyup' === e.type && 'Tab' === e.key) ||
                                        /input|select|option|textarea|form/i.test(e.target.tagName)))
                            )
                                continue;
                            let o = { relatedTarget: t._element };
                            'click' === e.type && (o.clickEvent = e), t._completeHide(o);
                        }
                    }
                    static dataApiKeydownHandler(e) {
                        let t = /input|textarea/i.test(e.target.tagName),
                            n = 'Escape' === e.key,
                            i = ['ArrowUp', t3].includes(e.key);
                        if ((!i && !n) || (t && !n)) return;
                        e.preventDefault();
                        let a = this.matches(na)
                                ? this
                                : U.prev(this, na)[0] ||
                                  U.next(this, na)[0] ||
                                  U.findOne(na, e.delegateTarget.parentNode),
                            o = nf.getOrCreateInstance(a);
                        if (i) return e.stopPropagation(), o.show(), void o._selectMenuItem(e);
                        o._isShown() && (e.stopPropagation(), o.hide(), a.focus());
                    }
                }
                G.on(document, nt, na, nf.dataApiKeydownHandler),
                    G.on(document, nt, ns, nf.dataApiKeydownHandler),
                    G.on(document, ne, nf.clearMenus),
                    G.on(document, nn, nf.clearMenus),
                    G.on(document, ne, na, function (e) {
                        e.preventDefault(), nf.getOrCreateInstance(this).toggle();
                    }),
                    f(nf);
                let ng = 'backdrop',
                    nv = 'show',
                    nb = `mousedown.bs.${ng}`,
                    nx = {
                        className: 'modal-backdrop',
                        clickCallback: null,
                        isAnimated: !1,
                        isVisible: !0,
                        rootElement: 'body',
                    },
                    ny = {
                        className: 'string',
                        clickCallback: '(function|null)',
                        isAnimated: 'boolean',
                        isVisible: 'boolean',
                        rootElement: '(element|string)',
                    };
                class nS extends D {
                    constructor(e) {
                        super(), (this._config = this._getConfig(e)), (this._isAppended = !1), (this._element = null);
                    }
                    static get Default() {
                        return nx;
                    }
                    static get DefaultType() {
                        return ny;
                    }
                    static get NAME() {
                        return ng;
                    }
                    show(e) {
                        if (!this._config.isVisible) return void g(e);
                        this._append();
                        let t = this._getElement();
                        this._config.isAnimated && d(t),
                            t.classList.add(nv),
                            this._emulateAnimation(() => {
                                g(e);
                            });
                    }
                    hide(e) {
                        this._config.isVisible
                            ? (this._getElement().classList.remove(nv),
                              this._emulateAnimation(() => {
                                  this.dispose(), g(e);
                              }))
                            : g(e);
                    }
                    dispose() {
                        this._isAppended && (G.off(this._element, nb), this._element.remove(), (this._isAppended = !1));
                    }
                    _getElement() {
                        if (!this._element) {
                            let e = document.createElement('div');
                            (e.className = this._config.className),
                                this._config.isAnimated && e.classList.add('fade'),
                                (this._element = e);
                        }
                        return this._element;
                    }
                    _configAfterMerge(e) {
                        return (e.rootElement = s(e.rootElement)), e;
                    }
                    _append() {
                        if (this._isAppended) return;
                        let e = this._getElement();
                        this._config.rootElement.append(e),
                            G.on(e, nb, () => {
                                g(this._config.clickCallback);
                            }),
                            (this._isAppended = !0);
                    }
                    _emulateAnimation(e) {
                        v(e, this._getElement(), this._config.isAnimated);
                    }
                }
                let nw = '.bs.focustrap',
                    nA = `focusin${nw}`,
                    nC = `keydown.tab${nw}`,
                    n_ = 'backward',
                    nP = { autofocus: !0, trapElement: null },
                    nk = { autofocus: 'boolean', trapElement: 'element' };
                class nM extends D {
                    constructor(e) {
                        super(),
                            (this._config = this._getConfig(e)),
                            (this._isActive = !1),
                            (this._lastTabNavDirection = null);
                    }
                    static get Default() {
                        return nP;
                    }
                    static get DefaultType() {
                        return nk;
                    }
                    static get NAME() {
                        return 'focustrap';
                    }
                    activate() {
                        this._isActive ||
                            (this._config.autofocus && this._config.trapElement.focus(),
                            G.off(document, nw),
                            G.on(document, nA, (e) => this._handleFocusin(e)),
                            G.on(document, nC, (e) => this._handleKeydown(e)),
                            (this._isActive = !0));
                    }
                    deactivate() {
                        this._isActive && ((this._isActive = !1), G.off(document, nw));
                    }
                    _handleFocusin(e) {
                        let { trapElement: t } = this._config;
                        if (e.target === document || e.target === t || t.contains(e.target)) return;
                        let n = U.focusableChildren(t);
                        0 === n.length
                            ? t.focus()
                            : this._lastTabNavDirection === n_
                              ? n[n.length - 1].focus()
                              : n[0].focus();
                    }
                    _handleKeydown(e) {
                        'Tab' === e.key && (this._lastTabNavDirection = e.shiftKey ? n_ : 'forward');
                    }
                }
                let nE = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
                    nT = '.sticky-top',
                    nI = 'padding-right',
                    nj = 'margin-right';
                class nG {
                    constructor() {
                        this._element = document.body;
                    }
                    getWidth() {
                        let e = document.documentElement.clientWidth;
                        return Math.abs(window.innerWidth - e);
                    }
                    hide() {
                        let e = this.getWidth();
                        this._disableOverFlow(),
                            this._setElementAttributes(this._element, nI, (t) => t + e),
                            this._setElementAttributes(nE, nI, (t) => t + e),
                            this._setElementAttributes(nT, nj, (t) => t - e);
                    }
                    reset() {
                        this._resetElementAttributes(this._element, 'overflow'),
                            this._resetElementAttributes(this._element, nI),
                            this._resetElementAttributes(nE, nI),
                            this._resetElementAttributes(nT, nj);
                    }
                    isOverflowing() {
                        return this.getWidth() > 0;
                    }
                    _disableOverFlow() {
                        this._saveInitialAttribute(this._element, 'overflow'),
                            (this._element.style.overflow = 'hidden');
                    }
                    _setElementAttributes(e, t, n) {
                        let i = this.getWidth();
                        this._applyManipulationCallback(e, (e) => {
                            if (e !== this._element && window.innerWidth > e.clientWidth + i) return;
                            this._saveInitialAttribute(e, t);
                            let a = window.getComputedStyle(e).getPropertyValue(t);
                            e.style.setProperty(t, `${n(Number.parseFloat(a))}px`);
                        });
                    }
                    _saveInitialAttribute(e, t) {
                        let n = e.style.getPropertyValue(t);
                        n && L.setDataAttribute(e, t, n);
                    }
                    _resetElementAttributes(e, t) {
                        this._applyManipulationCallback(e, (e) => {
                            let n = L.getDataAttribute(e, t);
                            null !== n
                                ? (L.removeDataAttribute(e, t), e.style.setProperty(t, n))
                                : e.style.removeProperty(t);
                        });
                    }
                    _applyManipulationCallback(e, t) {
                        if (o(e)) t(e);
                        else for (let n of U.find(e, this._element)) t(n);
                    }
                }
                let nN = '.bs.modal',
                    nB = `hide${nN}`,
                    nO = `hidePrevented${nN}`,
                    nL = `hidden${nN}`,
                    nD = `show${nN}`,
                    nz = `shown${nN}`,
                    nR = `resize${nN}`,
                    nU = `click.dismiss${nN}`,
                    nq = `mousedown.dismiss${nN}`,
                    nH = `keydown.dismiss${nN}`,
                    nW = `click${nN}.data-api`,
                    nF = 'modal-open',
                    n$ = 'show',
                    nV = 'modal-static',
                    nK = { backdrop: !0, focus: !0, keyboard: !0 },
                    nQ = { backdrop: '(boolean|string)', focus: 'boolean', keyboard: 'boolean' };
                class nX extends z {
                    constructor(e, t) {
                        super(e, t),
                            (this._dialog = U.findOne('.modal-dialog', this._element)),
                            (this._backdrop = this._initializeBackDrop()),
                            (this._focustrap = this._initializeFocusTrap()),
                            (this._isShown = !1),
                            (this._isTransitioning = !1),
                            (this._scrollBar = new nG()),
                            this._addEventListeners();
                    }
                    static get Default() {
                        return nK;
                    }
                    static get DefaultType() {
                        return nQ;
                    }
                    static get NAME() {
                        return 'modal';
                    }
                    toggle(e) {
                        return this._isShown ? this.hide() : this.show(e);
                    }
                    show(e) {
                        this._isShown ||
                            this._isTransitioning ||
                            G.trigger(this._element, nD, { relatedTarget: e }).defaultPrevented ||
                            ((this._isShown = !0),
                            (this._isTransitioning = !0),
                            this._scrollBar.hide(),
                            document.body.classList.add(nF),
                            this._adjustDialog(),
                            this._backdrop.show(() => this._showElement(e)));
                    }
                    hide() {
                        this._isShown &&
                            !this._isTransitioning &&
                            (G.trigger(this._element, nB).defaultPrevented ||
                                ((this._isShown = !1),
                                (this._isTransitioning = !0),
                                this._focustrap.deactivate(),
                                this._element.classList.remove(n$),
                                this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())));
                    }
                    dispose() {
                        G.off(window, nN),
                            G.off(this._dialog, nN),
                            this._backdrop.dispose(),
                            this._focustrap.deactivate(),
                            super.dispose();
                    }
                    handleUpdate() {
                        this._adjustDialog();
                    }
                    _initializeBackDrop() {
                        return new nS({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
                    }
                    _initializeFocusTrap() {
                        return new nM({ trapElement: this._element });
                    }
                    _showElement(e) {
                        document.body.contains(this._element) || document.body.append(this._element),
                            (this._element.style.display = 'block'),
                            this._element.removeAttribute('aria-hidden'),
                            this._element.setAttribute('aria-modal', !0),
                            this._element.setAttribute('role', 'dialog'),
                            (this._element.scrollTop = 0);
                        let t = U.findOne('.modal-body', this._dialog);
                        t && (t.scrollTop = 0),
                            d(this._element),
                            this._element.classList.add(n$),
                            this._queueCallback(
                                () => {
                                    this._config.focus && this._focustrap.activate(),
                                        (this._isTransitioning = !1),
                                        G.trigger(this._element, nz, { relatedTarget: e });
                                },
                                this._dialog,
                                this._isAnimated()
                            );
                    }
                    _addEventListeners() {
                        G.on(this._element, nH, (e) => {
                            'Escape' === e.key &&
                                (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
                        }),
                            G.on(window, nR, () => {
                                this._isShown && !this._isTransitioning && this._adjustDialog();
                            }),
                            G.on(this._element, nq, (e) => {
                                G.one(this._element, nU, (t) => {
                                    this._element === e.target &&
                                        this._element === t.target &&
                                        ('static' !== this._config.backdrop
                                            ? this._config.backdrop && this.hide()
                                            : this._triggerBackdropTransition());
                                });
                            });
                    }
                    _hideModal() {
                        (this._element.style.display = 'none'),
                            this._element.setAttribute('aria-hidden', !0),
                            this._element.removeAttribute('aria-modal'),
                            this._element.removeAttribute('role'),
                            (this._isTransitioning = !1),
                            this._backdrop.hide(() => {
                                document.body.classList.remove(nF),
                                    this._resetAdjustments(),
                                    this._scrollBar.reset(),
                                    G.trigger(this._element, nL);
                            });
                    }
                    _isAnimated() {
                        return this._element.classList.contains('fade');
                    }
                    _triggerBackdropTransition() {
                        if (G.trigger(this._element, nO).defaultPrevented) return;
                        let e = this._element.scrollHeight > document.documentElement.clientHeight,
                            t = this._element.style.overflowY;
                        'hidden' === t ||
                            this._element.classList.contains(nV) ||
                            (e || (this._element.style.overflowY = 'hidden'),
                            this._element.classList.add(nV),
                            this._queueCallback(() => {
                                this._element.classList.remove(nV),
                                    this._queueCallback(() => {
                                        this._element.style.overflowY = t;
                                    }, this._dialog);
                            }, this._dialog),
                            this._element.focus());
                    }
                    _adjustDialog() {
                        let e = this._element.scrollHeight > document.documentElement.clientHeight,
                            t = this._scrollBar.getWidth(),
                            n = t > 0;
                        if (n && !e) {
                            let e = h() ? 'paddingLeft' : 'paddingRight';
                            this._element.style[e] = `${t}px`;
                        }
                        if (!n && e) {
                            let e = h() ? 'paddingRight' : 'paddingLeft';
                            this._element.style[e] = `${t}px`;
                        }
                    }
                    _resetAdjustments() {
                        (this._element.style.paddingLeft = ''), (this._element.style.paddingRight = '');
                    }
                    static jQueryInterface(e, t) {
                        return this.each(function () {
                            let n = nX.getOrCreateInstance(this, e);
                            if ('string' == typeof e) {
                                if (void 0 === n[e]) throw TypeError(`No method named "${e}"`);
                                n[e](t);
                            }
                        });
                    }
                }
                G.on(document, nW, '[data-bs-toggle="modal"]', function (e) {
                    let t = U.getElementFromSelector(this);
                    ['A', 'AREA'].includes(this.tagName) && e.preventDefault(),
                        G.one(t, nD, (e) => {
                            e.defaultPrevented ||
                                G.one(t, nL, () => {
                                    r(this) && this.focus();
                                });
                        });
                    let n = U.findOne('.modal.show');
                    n && nX.getInstance(n).hide(), nX.getOrCreateInstance(t).toggle(this);
                }),
                    q(nX),
                    f(nX);
                let nY = '.bs.offcanvas',
                    nZ = '.data-api',
                    nJ = `load${nY}${nZ}`,
                    n0 = 'show',
                    n1 = 'showing',
                    n2 = 'hiding',
                    n9 = '.offcanvas.show',
                    n4 = `show${nY}`,
                    n3 = `shown${nY}`,
                    n5 = `hide${nY}`,
                    n7 = `hidePrevented${nY}`,
                    n8 = `hidden${nY}`,
                    n6 = `resize${nY}`,
                    ie = `click${nY}${nZ}`,
                    it = `keydown.dismiss${nY}`,
                    ii = { backdrop: !0, keyboard: !0, scroll: !1 },
                    ia = { backdrop: '(boolean|string)', keyboard: 'boolean', scroll: 'boolean' };
                class io extends z {
                    constructor(e, t) {
                        super(e, t),
                            (this._isShown = !1),
                            (this._backdrop = this._initializeBackDrop()),
                            (this._focustrap = this._initializeFocusTrap()),
                            this._addEventListeners();
                    }
                    static get Default() {
                        return ii;
                    }
                    static get DefaultType() {
                        return ia;
                    }
                    static get NAME() {
                        return 'offcanvas';
                    }
                    toggle(e) {
                        return this._isShown ? this.hide() : this.show(e);
                    }
                    show(e) {
                        this._isShown ||
                            G.trigger(this._element, n4, { relatedTarget: e }).defaultPrevented ||
                            ((this._isShown = !0),
                            this._backdrop.show(),
                            this._config.scroll || new nG().hide(),
                            this._element.setAttribute('aria-modal', !0),
                            this._element.setAttribute('role', 'dialog'),
                            this._element.classList.add(n1),
                            this._queueCallback(
                                () => {
                                    (this._config.scroll && !this._config.backdrop) || this._focustrap.activate(),
                                        this._element.classList.add(n0),
                                        this._element.classList.remove(n1),
                                        G.trigger(this._element, n3, { relatedTarget: e });
                                },
                                this._element,
                                !0
                            ));
                    }
                    hide() {
                        this._isShown &&
                            (G.trigger(this._element, n5).defaultPrevented ||
                                (this._focustrap.deactivate(),
                                this._element.blur(),
                                (this._isShown = !1),
                                this._element.classList.add(n2),
                                this._backdrop.hide(),
                                this._queueCallback(
                                    () => {
                                        this._element.classList.remove(n0, n2),
                                            this._element.removeAttribute('aria-modal'),
                                            this._element.removeAttribute('role'),
                                            this._config.scroll || new nG().reset(),
                                            G.trigger(this._element, n8);
                                    },
                                    this._element,
                                    !0
                                )));
                    }
                    dispose() {
                        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
                    }
                    _initializeBackDrop() {
                        let e = Boolean(this._config.backdrop);
                        return new nS({
                            className: 'offcanvas-backdrop',
                            isVisible: e,
                            isAnimated: !0,
                            rootElement: this._element.parentNode,
                            clickCallback: e
                                ? () => {
                                      'static' !== this._config.backdrop ? this.hide() : G.trigger(this._element, n7);
                                  }
                                : null,
                        });
                    }
                    _initializeFocusTrap() {
                        return new nM({ trapElement: this._element });
                    }
                    _addEventListeners() {
                        G.on(this._element, it, (e) => {
                            'Escape' === e.key && (this._config.keyboard ? this.hide() : G.trigger(this._element, n7));
                        });
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = io.getOrCreateInstance(this, e);
                            if ('string' == typeof e) {
                                if (void 0 === t[e] || e.startsWith('_') || 'constructor' === e)
                                    throw TypeError(`No method named "${e}"`);
                                t[e](this);
                            }
                        });
                    }
                }
                G.on(document, ie, '[data-bs-toggle="offcanvas"]', function (e) {
                    let t = U.getElementFromSelector(this);
                    if ((['A', 'AREA'].includes(this.tagName) && e.preventDefault(), c(this))) return;
                    G.one(t, n8, () => {
                        r(this) && this.focus();
                    });
                    let n = U.findOne(n9);
                    n && n !== t && io.getInstance(n).hide(), io.getOrCreateInstance(t).toggle(this);
                }),
                    G.on(window, nJ, () => {
                        for (let e of U.find(n9)) io.getOrCreateInstance(e).show();
                    }),
                    G.on(window, n6, () => {
                        for (let e of U.find('[aria-modal][class*=show][class*=offcanvas-]'))
                            'fixed' !== getComputedStyle(e).position && io.getOrCreateInstance(e).hide();
                    }),
                    q(io),
                    f(io);
                let is = {
                        '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
                        a: ['target', 'href', 'title', 'rel'],
                        area: [],
                        b: [],
                        br: [],
                        col: [],
                        code: [],
                        dd: [],
                        div: [],
                        dl: [],
                        dt: [],
                        em: [],
                        hr: [],
                        h1: [],
                        h2: [],
                        h3: [],
                        h4: [],
                        h5: [],
                        h6: [],
                        i: [],
                        img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
                        li: [],
                        ol: [],
                        p: [],
                        pre: [],
                        s: [],
                        small: [],
                        span: [],
                        sub: [],
                        sup: [],
                        strong: [],
                        u: [],
                        ul: [],
                    },
                    ir = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']),
                    ic = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
                    il = (e, t) => {
                        let n = e.nodeName.toLowerCase();
                        return t.includes(n)
                            ? !ir.has(n) || Boolean(ic.test(e.nodeValue))
                            : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
                    },
                    iu = {
                        allowList: is,
                        content: {},
                        extraClass: '',
                        html: !1,
                        sanitize: !0,
                        sanitizeFn: null,
                        template: '<div></div>',
                    },
                    id = {
                        allowList: 'object',
                        content: 'object',
                        extraClass: '(string|function)',
                        html: 'boolean',
                        sanitize: 'boolean',
                        sanitizeFn: '(null|function)',
                        template: 'string',
                    },
                    ip = { entry: '(string|element|function|null)', selector: '(string|element)' };
                class im extends D {
                    constructor(e) {
                        super(), (this._config = this._getConfig(e));
                    }
                    static get Default() {
                        return iu;
                    }
                    static get DefaultType() {
                        return id;
                    }
                    static get NAME() {
                        return 'TemplateFactory';
                    }
                    getContent() {
                        return Object.values(this._config.content)
                            .map((e) => this._resolvePossibleFunction(e))
                            .filter(Boolean);
                    }
                    hasContent() {
                        return this.getContent().length > 0;
                    }
                    changeContent(e) {
                        return this._checkContent(e), (this._config.content = { ...this._config.content, ...e }), this;
                    }
                    toHtml() {
                        let e = document.createElement('div');
                        for (let [t, n] of ((e.innerHTML = this._maybeSanitize(this._config.template)),
                        Object.entries(this._config.content)))
                            this._setContent(e, n, t);
                        let t = e.children[0],
                            n = this._resolvePossibleFunction(this._config.extraClass);
                        return n && t.classList.add(...n.split(' ')), t;
                    }
                    _typeCheckConfig(e) {
                        super._typeCheckConfig(e), this._checkContent(e.content);
                    }
                    _checkContent(e) {
                        for (let [t, n] of Object.entries(e)) super._typeCheckConfig({ selector: t, entry: n }, ip);
                    }
                    _setContent(e, t, n) {
                        let i = U.findOne(n, e);
                        i &&
                            ((t = this._resolvePossibleFunction(t))
                                ? o(t)
                                    ? this._putElementInTemplate(s(t), i)
                                    : this._config.html
                                      ? (i.innerHTML = this._maybeSanitize(t))
                                      : (i.textContent = t)
                                : i.remove());
                    }
                    _maybeSanitize(e) {
                        return this._config.sanitize
                            ? (function (e, t, n) {
                                  if (!e.length) return e;
                                  if (n && 'function' == typeof n) return n(e);
                                  let i = new window.DOMParser().parseFromString(e, 'text/html'),
                                      a = [].concat(...i.body.querySelectorAll('*'));
                                  for (let e of a) {
                                      let n = e.nodeName.toLowerCase();
                                      if (!Object.keys(t).includes(n)) {
                                          e.remove();
                                          continue;
                                      }
                                      let i = [].concat(...e.attributes),
                                          a = [].concat(t['*'] || [], t[n] || []);
                                      for (let t of i) il(t, a) || e.removeAttribute(t.nodeName);
                                  }
                                  return i.body.innerHTML;
                              })(e, this._config.allowList, this._config.sanitizeFn)
                            : e;
                    }
                    _resolvePossibleFunction(e) {
                        return g(e, [this]);
                    }
                    _putElementInTemplate(e, t) {
                        if (this._config.html) return (t.innerHTML = ''), void t.append(e);
                        t.textContent = e.textContent;
                    }
                }
                let ih = new Set(['sanitize', 'allowList', 'sanitizeFn']),
                    ig = 'fade',
                    iv = 'show',
                    ib = '.modal',
                    ix = 'hide.bs.modal',
                    iy = 'hover',
                    iS = 'focus',
                    iw = {
                        AUTO: 'auto',
                        TOP: 'top',
                        RIGHT: h() ? 'left' : 'right',
                        BOTTOM: 'bottom',
                        LEFT: h() ? 'right' : 'left',
                    },
                    iA = {
                        allowList: is,
                        animation: !0,
                        boundary: 'clippingParents',
                        container: !1,
                        customClass: '',
                        delay: 0,
                        fallbackPlacements: ['top', 'right', 'bottom', 'left'],
                        html: !1,
                        offset: [0, 6],
                        placement: 'top',
                        popperConfig: null,
                        sanitize: !0,
                        sanitizeFn: null,
                        selector: !1,
                        template:
                            '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                        title: '',
                        trigger: 'hover focus',
                    },
                    iC = {
                        allowList: 'object',
                        animation: 'boolean',
                        boundary: '(string|element)',
                        container: '(string|element|boolean)',
                        customClass: '(string|function)',
                        delay: '(number|object)',
                        fallbackPlacements: 'array',
                        html: 'boolean',
                        offset: '(array|string|function)',
                        placement: '(string|function)',
                        popperConfig: '(null|object|function)',
                        sanitize: 'boolean',
                        sanitizeFn: '(null|function)',
                        selector: '(string|boolean)',
                        template: 'string',
                        title: '(string|element|function)',
                        trigger: 'string',
                    };
                class i_ extends z {
                    constructor(e, t) {
                        if (void 0 === t1)
                            throw TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
                        super(e, t),
                            (this._isEnabled = !0),
                            (this._timeout = 0),
                            (this._isHovered = null),
                            (this._activeTrigger = {}),
                            (this._popper = null),
                            (this._templateFactory = null),
                            (this._newContent = null),
                            (this.tip = null),
                            this._setListeners(),
                            this._config.selector || this._fixTitle();
                    }
                    static get Default() {
                        return iA;
                    }
                    static get DefaultType() {
                        return iC;
                    }
                    static get NAME() {
                        return 'tooltip';
                    }
                    enable() {
                        this._isEnabled = !0;
                    }
                    disable() {
                        this._isEnabled = !1;
                    }
                    toggleEnabled() {
                        this._isEnabled = !this._isEnabled;
                    }
                    toggle() {
                        this._isEnabled &&
                            ((this._activeTrigger.click = !this._activeTrigger.click),
                            this._isShown() ? this._leave() : this._enter());
                    }
                    dispose() {
                        clearTimeout(this._timeout),
                            G.off(this._element.closest(ib), ix, this._hideModalHandler),
                            this._element.getAttribute('data-bs-original-title') &&
                                this._element.setAttribute(
                                    'title',
                                    this._element.getAttribute('data-bs-original-title')
                                ),
                            this._disposePopper(),
                            super.dispose();
                    }
                    show() {
                        if ('none' === this._element.style.display) throw Error('Please use show on visible elements');
                        if (!this._isWithContent() || !this._isEnabled) return;
                        let e = G.trigger(this._element, this.constructor.eventName('show')),
                            t = (l(this._element) || this._element.ownerDocument.documentElement).contains(
                                this._element
                            );
                        if (e.defaultPrevented || !t) return;
                        this._disposePopper();
                        let n = this._getTipElement();
                        this._element.setAttribute('aria-describedby', n.getAttribute('id'));
                        let { container: i } = this._config;
                        if (
                            (this._element.ownerDocument.documentElement.contains(this.tip) ||
                                (i.append(n), G.trigger(this._element, this.constructor.eventName('inserted'))),
                            (this._popper = this._createPopper(n)),
                            n.classList.add(iv),
                            'ontouchstart' in document.documentElement)
                        )
                            for (let e of [].concat(...document.body.children)) G.on(e, 'mouseover', u);
                        this._queueCallback(
                            () => {
                                G.trigger(this._element, this.constructor.eventName('shown')),
                                    !1 === this._isHovered && this._leave(),
                                    (this._isHovered = !1);
                            },
                            this.tip,
                            this._isAnimated()
                        );
                    }
                    hide() {
                        if (
                            this._isShown() &&
                            !G.trigger(this._element, this.constructor.eventName('hide')).defaultPrevented
                        ) {
                            if (
                                (this._getTipElement().classList.remove(iv), 'ontouchstart' in document.documentElement)
                            )
                                for (let e of [].concat(...document.body.children)) G.off(e, 'mouseover', u);
                            (this._activeTrigger.click = !1),
                                (this._activeTrigger[iS] = !1),
                                (this._activeTrigger[iy] = !1),
                                (this._isHovered = null),
                                this._queueCallback(
                                    () => {
                                        this._isWithActiveTrigger() ||
                                            (this._isHovered || this._disposePopper(),
                                            this._element.removeAttribute('aria-describedby'),
                                            G.trigger(this._element, this.constructor.eventName('hidden')));
                                    },
                                    this.tip,
                                    this._isAnimated()
                                );
                        }
                    }
                    update() {
                        this._popper && this._popper.update();
                    }
                    _isWithContent() {
                        return Boolean(this._getTitle());
                    }
                    _getTipElement() {
                        return (
                            this.tip ||
                                (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())),
                            this.tip
                        );
                    }
                    _createTipElement(e) {
                        let t = this._getTemplateFactory(e).toHtml();
                        if (!t) return null;
                        t.classList.remove(ig, iv), t.classList.add(`bs-${this.constructor.NAME}-auto`);
                        let n = ((e) => {
                            do e += Math.floor(1e6 * Math.random());
                            while (document.getElementById(e));
                            return e;
                        })(this.constructor.NAME).toString();
                        return t.setAttribute('id', n), this._isAnimated() && t.classList.add(ig), t;
                    }
                    setContent(e) {
                        (this._newContent = e), this._isShown() && (this._disposePopper(), this.show());
                    }
                    _getTemplateFactory(e) {
                        return (
                            this._templateFactory
                                ? this._templateFactory.changeContent(e)
                                : (this._templateFactory = new im({
                                      ...this._config,
                                      content: e,
                                      extraClass: this._resolvePossibleFunction(this._config.customClass),
                                  })),
                            this._templateFactory
                        );
                    }
                    _getContentForTemplate() {
                        return { '.tooltip-inner': this._getTitle() };
                    }
                    _getTitle() {
                        return (
                            this._resolvePossibleFunction(this._config.title) ||
                            this._element.getAttribute('data-bs-original-title')
                        );
                    }
                    _initializeOnDelegatedTarget(e) {
                        return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
                    }
                    _isAnimated() {
                        return this._config.animation || (this.tip && this.tip.classList.contains(ig));
                    }
                    _isShown() {
                        return this.tip && this.tip.classList.contains(iv);
                    }
                    _createPopper(e) {
                        let t = g(this._config.placement, [this, e, this._element]),
                            n = iw[t.toUpperCase()];
                        return t0(this._element, e, this._getPopperConfig(n));
                    }
                    _getOffset() {
                        let { offset: e } = this._config;
                        return 'string' == typeof e
                            ? e.split(',').map((e) => Number.parseInt(e, 10))
                            : 'function' == typeof e
                              ? (t) => e(t, this._element)
                              : e;
                    }
                    _resolvePossibleFunction(e) {
                        return g(e, [this._element]);
                    }
                    _getPopperConfig(e) {
                        let t = {
                            placement: e,
                            modifiers: [
                                { name: 'flip', options: { fallbackPlacements: this._config.fallbackPlacements } },
                                { name: 'offset', options: { offset: this._getOffset() } },
                                { name: 'preventOverflow', options: { boundary: this._config.boundary } },
                                { name: 'arrow', options: { element: `.${this.constructor.NAME}-arrow` } },
                                {
                                    name: 'preSetPlacement',
                                    enabled: !0,
                                    phase: 'beforeMain',
                                    fn: (e) => {
                                        this._getTipElement().setAttribute('data-popper-placement', e.state.placement);
                                    },
                                },
                            ],
                        };
                        return { ...t, ...g(this._config.popperConfig, [t]) };
                    }
                    _setListeners() {
                        let e = this._config.trigger.split(' ');
                        for (let t of e)
                            if ('click' === t)
                                G.on(this._element, this.constructor.eventName('click'), this._config.selector, (e) => {
                                    this._initializeOnDelegatedTarget(e).toggle();
                                });
                            else if ('manual' !== t) {
                                let e =
                                        t === iy
                                            ? this.constructor.eventName('mouseenter')
                                            : this.constructor.eventName('focusin'),
                                    n =
                                        t === iy
                                            ? this.constructor.eventName('mouseleave')
                                            : this.constructor.eventName('focusout');
                                G.on(this._element, e, this._config.selector, (e) => {
                                    let t = this._initializeOnDelegatedTarget(e);
                                    (t._activeTrigger['focusin' === e.type ? iS : iy] = !0), t._enter();
                                }),
                                    G.on(this._element, n, this._config.selector, (e) => {
                                        let t = this._initializeOnDelegatedTarget(e);
                                        (t._activeTrigger['focusout' === e.type ? iS : iy] = t._element.contains(
                                            e.relatedTarget
                                        )),
                                            t._leave();
                                    });
                            }
                        (this._hideModalHandler = () => {
                            this._element && this.hide();
                        }),
                            G.on(this._element.closest(ib), ix, this._hideModalHandler);
                    }
                    _fixTitle() {
                        let e = this._element.getAttribute('title');
                        e &&
                            (this._element.getAttribute('aria-label') ||
                                this._element.textContent.trim() ||
                                this._element.setAttribute('aria-label', e),
                            this._element.setAttribute('data-bs-original-title', e),
                            this._element.removeAttribute('title'));
                    }
                    _enter() {
                        this._isShown() || this._isHovered
                            ? (this._isHovered = !0)
                            : ((this._isHovered = !0),
                              this._setTimeout(() => {
                                  this._isHovered && this.show();
                              }, this._config.delay.show));
                    }
                    _leave() {
                        this._isWithActiveTrigger() ||
                            ((this._isHovered = !1),
                            this._setTimeout(() => {
                                this._isHovered || this.hide();
                            }, this._config.delay.hide));
                    }
                    _setTimeout(e, t) {
                        clearTimeout(this._timeout), (this._timeout = setTimeout(e, t));
                    }
                    _isWithActiveTrigger() {
                        return Object.values(this._activeTrigger).includes(!0);
                    }
                    _getConfig(e) {
                        let t = L.getDataAttributes(this._element);
                        for (let e of Object.keys(t)) ih.has(e) && delete t[e];
                        return (
                            (e = { ...t, ...('object' == typeof e && e ? e : {}) }),
                            (e = this._mergeConfigObj(e)),
                            (e = this._configAfterMerge(e)),
                            this._typeCheckConfig(e),
                            e
                        );
                    }
                    _configAfterMerge(e) {
                        return (
                            (e.container = !1 === e.container ? document.body : s(e.container)),
                            'number' == typeof e.delay && (e.delay = { show: e.delay, hide: e.delay }),
                            'number' == typeof e.title && (e.title = e.title.toString()),
                            'number' == typeof e.content && (e.content = e.content.toString()),
                            e
                        );
                    }
                    _getDelegateConfig() {
                        let e = {};
                        for (let [t, n] of Object.entries(this._config))
                            this.constructor.Default[t] !== n && (e[t] = n);
                        return (e.selector = !1), (e.trigger = 'manual'), e;
                    }
                    _disposePopper() {
                        this._popper && (this._popper.destroy(), (this._popper = null)),
                            this.tip && (this.tip.remove(), (this.tip = null));
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = i_.getOrCreateInstance(this, e);
                            if ('string' == typeof e) {
                                if (void 0 === t[e]) throw TypeError(`No method named "${e}"`);
                                t[e]();
                            }
                        });
                    }
                }
                f(i_);
                let iP = {
                        ...i_.Default,
                        content: '',
                        offset: [0, 8],
                        placement: 'right',
                        template:
                            '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
                        trigger: 'click',
                    },
                    ik = { ...i_.DefaultType, content: '(null|string|element|function)' };
                class iM extends i_ {
                    static get Default() {
                        return iP;
                    }
                    static get DefaultType() {
                        return ik;
                    }
                    static get NAME() {
                        return 'popover';
                    }
                    _isWithContent() {
                        return this._getTitle() || this._getContent();
                    }
                    _getContentForTemplate() {
                        return { '.popover-header': this._getTitle(), '.popover-body': this._getContent() };
                    }
                    _getContent() {
                        return this._resolvePossibleFunction(this._config.content);
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = iM.getOrCreateInstance(this, e);
                            if ('string' == typeof e) {
                                if (void 0 === t[e]) throw TypeError(`No method named "${e}"`);
                                t[e]();
                            }
                        });
                    }
                }
                f(iM);
                let iE = '.bs.scrollspy',
                    iT = `activate${iE}`,
                    iI = `click${iE}`,
                    ij = `load${iE}.data-api`,
                    iG = 'active',
                    iN = '[href]',
                    iB = '.nav-link',
                    iO = `${iB}, .nav-item > ${iB}, .list-group-item`,
                    iL = {
                        offset: null,
                        rootMargin: '0px 0px -25%',
                        smoothScroll: !1,
                        target: null,
                        threshold: [0.1, 0.5, 1],
                    },
                    iD = {
                        offset: '(number|null)',
                        rootMargin: 'string',
                        smoothScroll: 'boolean',
                        target: 'element',
                        threshold: 'array',
                    };
                class iz extends z {
                    constructor(e, t) {
                        super(e, t),
                            (this._targetLinks = new Map()),
                            (this._observableSections = new Map()),
                            (this._rootElement =
                                'visible' === getComputedStyle(this._element).overflowY ? null : this._element),
                            (this._activeTarget = null),
                            (this._observer = null),
                            (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
                            this.refresh();
                    }
                    static get Default() {
                        return iL;
                    }
                    static get DefaultType() {
                        return iD;
                    }
                    static get NAME() {
                        return 'scrollspy';
                    }
                    refresh() {
                        for (let e of (this._initializeTargetsAndObservables(),
                        this._maybeEnableSmoothScroll(),
                        this._observer ? this._observer.disconnect() : (this._observer = this._getNewObserver()),
                        this._observableSections.values()))
                            this._observer.observe(e);
                    }
                    dispose() {
                        this._observer.disconnect(), super.dispose();
                    }
                    _configAfterMerge(e) {
                        return (
                            (e.target = s(e.target) || document.body),
                            (e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin),
                            'string' == typeof e.threshold &&
                                (e.threshold = e.threshold.split(',').map((e) => Number.parseFloat(e))),
                            e
                        );
                    }
                    _maybeEnableSmoothScroll() {
                        this._config.smoothScroll &&
                            (G.off(this._config.target, iI),
                            G.on(this._config.target, iI, iN, (e) => {
                                let t = this._observableSections.get(e.target.hash);
                                if (t) {
                                    e.preventDefault();
                                    let n = this._rootElement || window,
                                        i = t.offsetTop - this._element.offsetTop;
                                    if (n.scrollTo) return void n.scrollTo({ top: i, behavior: 'smooth' });
                                    n.scrollTop = i;
                                }
                            }));
                    }
                    _getNewObserver() {
                        let e = {
                            root: this._rootElement,
                            threshold: this._config.threshold,
                            rootMargin: this._config.rootMargin,
                        };
                        return new IntersectionObserver((e) => this._observerCallback(e), e);
                    }
                    _observerCallback(e) {
                        let t = (e) => this._targetLinks.get(`#${e.target.id}`),
                            n = (e) => {
                                (this._previousScrollData.visibleEntryTop = e.target.offsetTop), this._process(t(e));
                            },
                            i = (this._rootElement || document.documentElement).scrollTop,
                            a = i >= this._previousScrollData.parentScrollTop;
                        for (let o of ((this._previousScrollData.parentScrollTop = i), e)) {
                            if (!o.isIntersecting) {
                                (this._activeTarget = null), this._clearActiveClass(t(o));
                                continue;
                            }
                            let e = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                            if (a && e) {
                                if ((n(o), !i)) return;
                            } else a || e || n(o);
                        }
                    }
                    _initializeTargetsAndObservables() {
                        (this._targetLinks = new Map()), (this._observableSections = new Map());
                        let e = U.find(iN, this._config.target);
                        for (let t of e) {
                            if (!t.hash || c(t)) continue;
                            let e = U.findOne(decodeURI(t.hash), this._element);
                            r(e) &&
                                (this._targetLinks.set(decodeURI(t.hash), t), this._observableSections.set(t.hash, e));
                        }
                    }
                    _process(e) {
                        this._activeTarget !== e &&
                            (this._clearActiveClass(this._config.target),
                            (this._activeTarget = e),
                            e.classList.add(iG),
                            this._activateParents(e),
                            G.trigger(this._element, iT, { relatedTarget: e }));
                    }
                    _activateParents(e) {
                        if (e.classList.contains('dropdown-item'))
                            U.findOne('.dropdown-toggle', e.closest('.dropdown')).classList.add(iG);
                        else
                            for (let t of U.parents(e, '.nav, .list-group'))
                                for (let e of U.prev(t, iO)) e.classList.add(iG);
                    }
                    _clearActiveClass(e) {
                        e.classList.remove(iG);
                        let t = U.find(`${iN}.${iG}`, e);
                        for (let e of t) e.classList.remove(iG);
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = iz.getOrCreateInstance(this, e);
                            if ('string' == typeof e) {
                                if (void 0 === t[e] || e.startsWith('_') || 'constructor' === e)
                                    throw TypeError(`No method named "${e}"`);
                                t[e]();
                            }
                        });
                    }
                }
                G.on(window, ij, () => {
                    for (let e of U.find('[data-bs-spy="scroll"]')) iz.getOrCreateInstance(e);
                }),
                    f(iz);
                let iR = '.bs.tab',
                    iU = `hide${iR}`,
                    iq = `hidden${iR}`,
                    iH = `show${iR}`,
                    iW = `shown${iR}`,
                    iF = `click${iR}`,
                    i$ = `keydown${iR}`,
                    iV = `load${iR}`,
                    iK = 'ArrowRight',
                    iQ = 'ArrowDown',
                    iX = 'Home',
                    iY = 'active',
                    iZ = 'fade',
                    iJ = 'show',
                    i0 = '.dropdown-toggle',
                    i1 = `:not(${i0})`,
                    i2 = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
                    i9 = `.nav-link${i1}, .list-group-item${i1}, [role="tab"]${i1}, ${i2}`,
                    i4 = `.${iY}[data-bs-toggle="tab"], .${iY}[data-bs-toggle="pill"], .${iY}[data-bs-toggle="list"]`;
                class i3 extends z {
                    constructor(e) {
                        super(e),
                            (this._parent = this._element.closest('.list-group, .nav, [role="tablist"]')),
                            this._parent &&
                                (this._setInitialAttributes(this._parent, this._getChildren()),
                                G.on(this._element, i$, (e) => this._keydown(e)));
                    }
                    static get NAME() {
                        return 'tab';
                    }
                    show() {
                        let e = this._element;
                        if (this._elemIsActive(e)) return;
                        let t = this._getActiveElem(),
                            n = t ? G.trigger(t, iU, { relatedTarget: e }) : null;
                        G.trigger(e, iH, { relatedTarget: t }).defaultPrevented ||
                            (n && n.defaultPrevented) ||
                            (this._deactivate(t, e), this._activate(e, t));
                    }
                    _activate(e, t) {
                        e &&
                            (e.classList.add(iY),
                            this._activate(U.getElementFromSelector(e)),
                            this._queueCallback(
                                () => {
                                    'tab' === e.getAttribute('role')
                                        ? (e.removeAttribute('tabindex'),
                                          e.setAttribute('aria-selected', !0),
                                          this._toggleDropDown(e, !0),
                                          G.trigger(e, iW, { relatedTarget: t }))
                                        : e.classList.add(iJ);
                                },
                                e,
                                e.classList.contains(iZ)
                            ));
                    }
                    _deactivate(e, t) {
                        e &&
                            (e.classList.remove(iY),
                            e.blur(),
                            this._deactivate(U.getElementFromSelector(e)),
                            this._queueCallback(
                                () => {
                                    'tab' === e.getAttribute('role')
                                        ? (e.setAttribute('aria-selected', !1),
                                          e.setAttribute('tabindex', '-1'),
                                          this._toggleDropDown(e, !1),
                                          G.trigger(e, iq, { relatedTarget: t }))
                                        : e.classList.remove(iJ);
                                },
                                e,
                                e.classList.contains(iZ)
                            ));
                    }
                    _keydown(e) {
                        let t;
                        if (!['ArrowLeft', iK, 'ArrowUp', iQ, iX, 'End'].includes(e.key)) return;
                        e.stopPropagation(), e.preventDefault();
                        let n = this._getChildren().filter((e) => !c(e));
                        if ([iX, 'End'].includes(e.key)) t = n[e.key === iX ? 0 : n.length - 1];
                        else {
                            let i = [iK, iQ].includes(e.key);
                            t = b(n, e.target, i, !0);
                        }
                        t && (t.focus({ preventScroll: !0 }), i3.getOrCreateInstance(t).show());
                    }
                    _getChildren() {
                        return U.find(i9, this._parent);
                    }
                    _getActiveElem() {
                        return this._getChildren().find((e) => this._elemIsActive(e)) || null;
                    }
                    _setInitialAttributes(e, t) {
                        for (let n of (this._setAttributeIfNotExists(e, 'role', 'tablist'), t))
                            this._setInitialAttributesOnChild(n);
                    }
                    _setInitialAttributesOnChild(e) {
                        e = this._getInnerElement(e);
                        let t = this._elemIsActive(e),
                            n = this._getOuterElement(e);
                        e.setAttribute('aria-selected', t),
                            n !== e && this._setAttributeIfNotExists(n, 'role', 'presentation'),
                            t || e.setAttribute('tabindex', '-1'),
                            this._setAttributeIfNotExists(e, 'role', 'tab'),
                            this._setInitialAttributesOnTargetPanel(e);
                    }
                    _setInitialAttributesOnTargetPanel(e) {
                        let t = U.getElementFromSelector(e);
                        t &&
                            (this._setAttributeIfNotExists(t, 'role', 'tabpanel'),
                            e.id && this._setAttributeIfNotExists(t, 'aria-labelledby', `${e.id}`));
                    }
                    _toggleDropDown(e, t) {
                        let n = this._getOuterElement(e);
                        if (!n.classList.contains('dropdown')) return;
                        let i = (e, i) => {
                            let a = U.findOne(e, n);
                            a && a.classList.toggle(i, t);
                        };
                        i(i0, iY), i('.dropdown-menu', iJ), n.setAttribute('aria-expanded', t);
                    }
                    _setAttributeIfNotExists(e, t, n) {
                        e.hasAttribute(t) || e.setAttribute(t, n);
                    }
                    _elemIsActive(e) {
                        return e.classList.contains(iY);
                    }
                    _getInnerElement(e) {
                        return e.matches(i9) ? e : U.findOne(i9, e);
                    }
                    _getOuterElement(e) {
                        return e.closest('.nav-item, .list-group-item') || e;
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = i3.getOrCreateInstance(this);
                            if ('string' == typeof e) {
                                if (void 0 === t[e] || e.startsWith('_') || 'constructor' === e)
                                    throw TypeError(`No method named "${e}"`);
                                t[e]();
                            }
                        });
                    }
                }
                G.on(document, iF, i2, function (e) {
                    ['A', 'AREA'].includes(this.tagName) && e.preventDefault(),
                        c(this) || i3.getOrCreateInstance(this).show();
                }),
                    G.on(window, iV, () => {
                        for (let e of U.find(i4)) i3.getOrCreateInstance(e);
                    }),
                    f(i3);
                let i5 = '.bs.toast',
                    i7 = `mouseover${i5}`,
                    i8 = `mouseout${i5}`,
                    i6 = `focusin${i5}`,
                    ae = `focusout${i5}`,
                    at = `hide${i5}`,
                    an = `hidden${i5}`,
                    ai = `show${i5}`,
                    aa = `shown${i5}`,
                    ao = 'hide',
                    as = 'show',
                    ar = 'showing',
                    ac = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
                    al = { animation: !0, autohide: !0, delay: 5e3 };
                class au extends z {
                    constructor(e, t) {
                        super(e, t),
                            (this._timeout = null),
                            (this._hasMouseInteraction = !1),
                            (this._hasKeyboardInteraction = !1),
                            this._setListeners();
                    }
                    static get Default() {
                        return al;
                    }
                    static get DefaultType() {
                        return ac;
                    }
                    static get NAME() {
                        return 'toast';
                    }
                    show() {
                        G.trigger(this._element, ai).defaultPrevented ||
                            (this._clearTimeout(),
                            this._config.animation && this._element.classList.add('fade'),
                            this._element.classList.remove(ao),
                            d(this._element),
                            this._element.classList.add(as, ar),
                            this._queueCallback(
                                () => {
                                    this._element.classList.remove(ar),
                                        G.trigger(this._element, aa),
                                        this._maybeScheduleHide();
                                },
                                this._element,
                                this._config.animation
                            ));
                    }
                    hide() {
                        this.isShown() &&
                            (G.trigger(this._element, at).defaultPrevented ||
                                (this._element.classList.add(ar),
                                this._queueCallback(
                                    () => {
                                        this._element.classList.add(ao),
                                            this._element.classList.remove(ar, as),
                                            G.trigger(this._element, an);
                                    },
                                    this._element,
                                    this._config.animation
                                )));
                    }
                    dispose() {
                        this._clearTimeout(), this.isShown() && this._element.classList.remove(as), super.dispose();
                    }
                    isShown() {
                        return this._element.classList.contains(as);
                    }
                    _maybeScheduleHide() {
                        this._config.autohide &&
                            (this._hasMouseInteraction ||
                                this._hasKeyboardInteraction ||
                                (this._timeout = setTimeout(() => {
                                    this.hide();
                                }, this._config.delay)));
                    }
                    _onInteraction(e, t) {
                        switch (e.type) {
                            case 'mouseover':
                            case 'mouseout':
                                this._hasMouseInteraction = t;
                                break;
                            case 'focusin':
                            case 'focusout':
                                this._hasKeyboardInteraction = t;
                        }
                        if (t) return void this._clearTimeout();
                        let n = e.relatedTarget;
                        this._element === n || this._element.contains(n) || this._maybeScheduleHide();
                    }
                    _setListeners() {
                        G.on(this._element, i7, (e) => this._onInteraction(e, !0)),
                            G.on(this._element, i8, (e) => this._onInteraction(e, !1)),
                            G.on(this._element, i6, (e) => this._onInteraction(e, !0)),
                            G.on(this._element, ae, (e) => this._onInteraction(e, !1));
                    }
                    _clearTimeout() {
                        clearTimeout(this._timeout), (this._timeout = null);
                    }
                    static jQueryInterface(e) {
                        return this.each(function () {
                            let t = au.getOrCreateInstance(this, e);
                            if ('string' == typeof e) {
                                if (void 0 === t[e]) throw TypeError(`No method named "${e}"`);
                                t[e](this);
                            }
                        });
                    }
                }
                return (
                    q(au),
                    f(au),
                    {
                        Alert: $,
                        Button: K,
                        Carousel: eP,
                        Collapse: eR,
                        Dropdown: nf,
                        Modal: nX,
                        Offcanvas: io,
                        Popover: iM,
                        ScrollSpy: iz,
                        Tab: i3,
                        Toast: au,
                        Tooltip: i_,
                    }
                );
            })();
        },
        19755: function (e, t) {
            var n, i, a;
            (i = 'undefined' != typeof window ? window : this),
                (a = function (i, a) {
                    'use strict';
                    var o,
                        s = [],
                        r = Object.getPrototypeOf,
                        c = s.slice,
                        l = s.flat
                            ? function (e) {
                                  return s.flat.call(e);
                              }
                            : function (e) {
                                  return s.concat.apply([], e);
                              },
                        u = s.push,
                        d = s.indexOf,
                        p = {},
                        m = p.toString,
                        h = p.hasOwnProperty,
                        f = h.toString,
                        g = f.call(Object),
                        v = {},
                        b = function (e) {
                            return (
                                'function' == typeof e && 'number' != typeof e.nodeType && 'function' != typeof e.item
                            );
                        },
                        x = function (e) {
                            return null != e && e === e.window;
                        },
                        y = i.document,
                        S = { type: !0, src: !0, nonce: !0, noModule: !0 };
                    function w(e, t, n) {
                        var i,
                            a,
                            o = (n = n || y).createElement('script');
                        if (((o.text = e), t))
                            for (i in S) (a = t[i] || (t.getAttribute && t.getAttribute(i))) && o.setAttribute(i, a);
                        n.head.appendChild(o).parentNode.removeChild(o);
                    }
                    function A(e) {
                        return null == e
                            ? e + ''
                            : 'object' == typeof e || 'function' == typeof e
                              ? p[m.call(e)] || 'object'
                              : typeof e;
                    }
                    var C = '3.7.1',
                        _ = /HTML$/i,
                        P = function (e, t) {
                            return new P.fn.init(e, t);
                        };
                    function k(e) {
                        var t = !!e && 'length' in e && e.length,
                            n = A(e);
                        return (
                            !(b(e) || x(e)) &&
                            ('array' === n || 0 === t || ('number' == typeof t && t > 0 && t - 1 in e))
                        );
                    }
                    function M(e, t) {
                        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
                    }
                    (P.fn = P.prototype =
                        {
                            jquery: C,
                            constructor: P,
                            length: 0,
                            toArray: function () {
                                return c.call(this);
                            },
                            get: function (e) {
                                return null == e ? c.call(this) : e < 0 ? this[e + this.length] : this[e];
                            },
                            pushStack: function (e) {
                                var t = P.merge(this.constructor(), e);
                                return (t.prevObject = this), t;
                            },
                            each: function (e) {
                                return P.each(this, e);
                            },
                            map: function (e) {
                                return this.pushStack(
                                    P.map(this, function (t, n) {
                                        return e.call(t, n, t);
                                    })
                                );
                            },
                            slice: function () {
                                return this.pushStack(c.apply(this, arguments));
                            },
                            first: function () {
                                return this.eq(0);
                            },
                            last: function () {
                                return this.eq(-1);
                            },
                            even: function () {
                                return this.pushStack(
                                    P.grep(this, function (e, t) {
                                        return (t + 1) % 2;
                                    })
                                );
                            },
                            odd: function () {
                                return this.pushStack(
                                    P.grep(this, function (e, t) {
                                        return t % 2;
                                    })
                                );
                            },
                            eq: function (e) {
                                var t = this.length,
                                    n = +e + (e < 0 ? t : 0);
                                return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
                            },
                            end: function () {
                                return this.prevObject || this.constructor();
                            },
                            push: u,
                            sort: s.sort,
                            splice: s.splice,
                        }),
                        (P.extend = P.fn.extend =
                            function () {
                                var e,
                                    t,
                                    n,
                                    i,
                                    a,
                                    o,
                                    s = arguments[0] || {},
                                    r = 1,
                                    c = arguments.length,
                                    l = !1;
                                for (
                                    'boolean' == typeof s && ((l = s), (s = arguments[r] || {}), r++),
                                        'object' == typeof s || b(s) || (s = {}),
                                        r === c && ((s = this), r--);
                                    r < c;
                                    r++
                                )
                                    if (null != (e = arguments[r]))
                                        for (t in e)
                                            (i = e[t]),
                                                '__proto__' !== t &&
                                                    s !== i &&
                                                    (l && i && (P.isPlainObject(i) || (a = Array.isArray(i)))
                                                        ? ((n = s[t]),
                                                          (o =
                                                              a && !Array.isArray(n)
                                                                  ? []
                                                                  : a || P.isPlainObject(n)
                                                                    ? n
                                                                    : {}),
                                                          (a = !1),
                                                          (s[t] = P.extend(l, o, i)))
                                                        : void 0 !== i && (s[t] = i));
                                return s;
                            }),
                        P.extend({
                            expando: 'jQuery' + (C + Math.random()).replace(/\D/g, ''),
                            isReady: !0,
                            error: function (e) {
                                throw Error(e);
                            },
                            noop: function () {},
                            isPlainObject: function (e) {
                                var t, n;
                                return (
                                    !!e &&
                                    '[object Object]' === m.call(e) &&
                                    (!(t = r(e)) ||
                                        ('function' == typeof (n = h.call(t, 'constructor') && t.constructor) &&
                                            f.call(n) === g))
                                );
                            },
                            isEmptyObject: function (e) {
                                var t;
                                for (t in e) return !1;
                                return !0;
                            },
                            globalEval: function (e, t, n) {
                                w(e, { nonce: t && t.nonce }, n);
                            },
                            each: function (e, t) {
                                var n,
                                    i = 0;
                                if (k(e)) for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
                                else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
                                return e;
                            },
                            text: function (e) {
                                var t,
                                    n = '',
                                    i = 0,
                                    a = e.nodeType;
                                if (!a) for (; (t = e[i++]); ) n += P.text(t);
                                return 1 === a || 11 === a
                                    ? e.textContent
                                    : 9 === a
                                      ? e.documentElement.textContent
                                      : 3 === a || 4 === a
                                        ? e.nodeValue
                                        : n;
                            },
                            makeArray: function (e, t) {
                                var n = t || [];
                                return (
                                    null != e &&
                                        (k(Object(e)) ? P.merge(n, 'string' == typeof e ? [e] : e) : u.call(n, e)),
                                    n
                                );
                            },
                            inArray: function (e, t, n) {
                                return null == t ? -1 : d.call(t, e, n);
                            },
                            isXMLDoc: function (e) {
                                var t = e && e.namespaceURI,
                                    n = e && (e.ownerDocument || e).documentElement;
                                return !_.test(t || (n && n.nodeName) || 'HTML');
                            },
                            merge: function (e, t) {
                                for (var n = +t.length, i = 0, a = e.length; i < n; i++) e[a++] = t[i];
                                return (e.length = a), e;
                            },
                            grep: function (e, t, n) {
                                for (var i = [], a = 0, o = e.length, s = !n; a < o; a++)
                                    !t(e[a], a) !== s && i.push(e[a]);
                                return i;
                            },
                            map: function (e, t, n) {
                                var i,
                                    a,
                                    o = 0,
                                    s = [];
                                if (k(e)) for (i = e.length; o < i; o++) null != (a = t(e[o], o, n)) && s.push(a);
                                else for (o in e) null != (a = t(e[o], o, n)) && s.push(a);
                                return l(s);
                            },
                            guid: 1,
                            support: v,
                        }),
                        'function' == typeof Symbol && (P.fn[Symbol.iterator] = s[Symbol.iterator]),
                        P.each(
                            'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
                            function (e, t) {
                                p['[object ' + t + ']'] = t.toLowerCase();
                            }
                        );
                    var E = s.pop,
                        T = s.sort,
                        I = s.splice,
                        j = '[\\x20\\t\\r\\n\\f]',
                        G = RegExp('^' + j + '+|((?:^|[^\\\\])(?:\\\\.)*)' + j + '+$', 'g');
                    P.contains = function (e, t) {
                        var n = t && t.parentNode;
                        return (
                            e === n ||
                            !!(
                                n &&
                                1 === n.nodeType &&
                                (e.contains
                                    ? e.contains(n)
                                    : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n))
                            )
                        );
                    };
                    var N = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
                    function B(e, t) {
                        return t
                            ? '\x00' === e
                                ? '�'
                                : e.slice(0, -1) + '\\' + e.charCodeAt(e.length - 1).toString(16) + ' '
                            : '\\' + e;
                    }
                    (P.escapeSelector = function (e) {
                        return (e + '').replace(N, B);
                    }),
                        (function () {
                            var e,
                                t,
                                n,
                                a,
                                o,
                                r,
                                l,
                                p,
                                m,
                                f,
                                g = u,
                                b = P.expando,
                                x = 0,
                                S = 0,
                                w = ee(),
                                A = ee(),
                                C = ee(),
                                _ = ee(),
                                k = function (e, t) {
                                    return e === t && (o = !0), 0;
                                },
                                N =
                                    'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
                                B = '(?:\\\\[\\da-fA-F]{1,6}' + j + '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+',
                                O =
                                    '\\[' +
                                    j +
                                    '*(' +
                                    B +
                                    ')(?:' +
                                    j +
                                    '*([*^$|!~]?=)' +
                                    j +
                                    '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
                                    B +
                                    '))|)' +
                                    j +
                                    '*\\]',
                                L =
                                    ':(' +
                                    B +
                                    ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
                                    O +
                                    ')*)|.*)\\)|)',
                                D = RegExp(j + '+', 'g'),
                                z = RegExp('^' + j + '*,' + j + '*'),
                                R = RegExp('^' + j + '*([>+~]|' + j + ')' + j + '*'),
                                U = RegExp(j + '|>'),
                                q = RegExp(L),
                                H = RegExp('^' + B + '$'),
                                W = {
                                    ID: RegExp('^#(' + B + ')'),
                                    CLASS: RegExp('^\\.(' + B + ')'),
                                    TAG: RegExp('^(' + B + '|[*])'),
                                    ATTR: RegExp('^' + O),
                                    PSEUDO: RegExp('^' + L),
                                    CHILD: RegExp(
                                        '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                                            j +
                                            '*(even|odd|(([+-]|)(\\d*)n|)' +
                                            j +
                                            '*(?:([+-]|)' +
                                            j +
                                            '*(\\d+)|))' +
                                            j +
                                            '*\\)|)',
                                        'i'
                                    ),
                                    bool: RegExp('^(?:' + N + ')$', 'i'),
                                    needsContext: RegExp(
                                        '^' +
                                            j +
                                            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                                            j +
                                            '*((?:-\\d)?\\d*)' +
                                            j +
                                            '*\\)|)(?=[^-]|$)',
                                        'i'
                                    ),
                                },
                                F = /^(?:input|select|textarea|button)$/i,
                                $ = /^h\d$/i,
                                V = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                                K = /[+~]/,
                                Q = RegExp('\\\\[\\da-fA-F]{1,6}' + j + '?|\\\\([^\\r\\n\\f])', 'g'),
                                X = function (e, t) {
                                    var n = '0x' + e.slice(1) - 65536;
                                    return (
                                        t ||
                                        (n < 0
                                            ? String.fromCharCode(n + 65536)
                                            : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
                                    );
                                },
                                Y = function () {
                                    es();
                                },
                                Z = eu(
                                    function (e) {
                                        return !0 === e.disabled && M(e, 'fieldset');
                                    },
                                    { dir: 'parentNode', next: 'legend' }
                                );
                            try {
                                g.apply((s = c.call(y.childNodes)), y.childNodes), s[y.childNodes.length].nodeType;
                            } catch (e) {
                                g = {
                                    apply: function (e, t) {
                                        u.apply(e, c.call(t));
                                    },
                                    call: function (e) {
                                        u.apply(e, c.call(arguments, 1));
                                    },
                                };
                            }
                            function J(e, t, n, i) {
                                var a,
                                    o,
                                    s,
                                    c,
                                    l,
                                    u,
                                    d,
                                    h = t && t.ownerDocument,
                                    f = t ? t.nodeType : 9;
                                if (((n = n || []), 'string' != typeof e || !e || (1 !== f && 9 !== f && 11 !== f)))
                                    return n;
                                if (!i && (es(t), (t = t || r), p)) {
                                    if (11 !== f && (l = V.exec(e))) {
                                        if ((a = l[1])) {
                                            if (9 === f) {
                                                if (!(s = t.getElementById(a))) return n;
                                                if (s.id === a) return g.call(n, s), n;
                                            } else if (h && (s = h.getElementById(a)) && J.contains(t, s) && s.id === a)
                                                return g.call(n, s), n;
                                        } else if (l[2]) return g.apply(n, t.getElementsByTagName(e)), n;
                                        else if ((a = l[3]) && t.getElementsByClassName)
                                            return g.apply(n, t.getElementsByClassName(a)), n;
                                    }
                                    if (!_[e + ' '] && (!m || !m.test(e))) {
                                        if (((d = e), (h = t), 1 === f && (U.test(e) || R.test(e)))) {
                                            for (
                                                ((h = (K.test(e) && eo(t.parentNode)) || t) == t && v.scope) ||
                                                    ((c = t.getAttribute('id'))
                                                        ? (c = P.escapeSelector(c))
                                                        : t.setAttribute('id', (c = b))),
                                                    o = (u = ec(e)).length;
                                                o--;

                                            )
                                                u[o] = (c ? '#' + c : ':scope') + ' ' + el(u[o]);
                                            d = u.join(',');
                                        }
                                        try {
                                            return g.apply(n, h.querySelectorAll(d)), n;
                                        } catch (t) {
                                            _(e, !0);
                                        } finally {
                                            c === b && t.removeAttribute('id');
                                        }
                                    }
                                }
                                return eh(e.replace(G, '$1'), t, n, i);
                            }
                            function ee() {
                                var e = [];
                                function n(i, a) {
                                    return e.push(i + ' ') > t.cacheLength && delete n[e.shift()], (n[i + ' '] = a);
                                }
                                return n;
                            }
                            function et(e) {
                                return (e[b] = !0), e;
                            }
                            function en(e) {
                                var t = r.createElement('fieldset');
                                try {
                                    return !!e(t);
                                } catch (e) {
                                    return !1;
                                } finally {
                                    t.parentNode && t.parentNode.removeChild(t), (t = null);
                                }
                            }
                            function ei(e) {
                                return function (t) {
                                    if ('form' in t)
                                        return t.parentNode && !1 === t.disabled
                                            ? 'label' in t
                                                ? 'label' in t.parentNode
                                                    ? t.parentNode.disabled === e
                                                    : t.disabled === e
                                                : t.isDisabled === e || (!e !== t.isDisabled && Z(t) === e)
                                            : t.disabled === e;
                                    return 'label' in t && t.disabled === e;
                                };
                            }
                            function ea(e) {
                                return et(function (t) {
                                    return (
                                        (t = +t),
                                        et(function (n, i) {
                                            for (var a, o = e([], n.length, t), s = o.length; s--; )
                                                n[(a = o[s])] && (n[a] = !(i[a] = n[a]));
                                        })
                                    );
                                });
                            }
                            function eo(e) {
                                return e && void 0 !== e.getElementsByTagName && e;
                            }
                            function es(e) {
                                var n,
                                    i = e ? e.ownerDocument || e : y;
                                return (
                                    i != r &&
                                        9 === i.nodeType &&
                                        i.documentElement &&
                                        ((l = (r = i).documentElement),
                                        (p = !P.isXMLDoc(r)),
                                        (f = l.matches || l.webkitMatchesSelector || l.msMatchesSelector),
                                        l.msMatchesSelector &&
                                            y != r &&
                                            (n = r.defaultView) &&
                                            n.top !== n &&
                                            n.addEventListener('unload', Y),
                                        (v.getById = en(function (e) {
                                            return (
                                                (l.appendChild(e).id = P.expando),
                                                !r.getElementsByName || !r.getElementsByName(P.expando).length
                                            );
                                        })),
                                        (v.disconnectedMatch = en(function (e) {
                                            return f.call(e, '*');
                                        })),
                                        (v.scope = en(function () {
                                            return r.querySelectorAll(':scope');
                                        })),
                                        (v.cssHas = en(function () {
                                            try {
                                                return r.querySelector(':has(*,:jqfake)'), !1;
                                            } catch (e) {
                                                return !0;
                                            }
                                        })),
                                        v.getById
                                            ? ((t.filter.ID = function (e) {
                                                  var t = e.replace(Q, X);
                                                  return function (e) {
                                                      return e.getAttribute('id') === t;
                                                  };
                                              }),
                                              (t.find.ID = function (e, t) {
                                                  if (void 0 !== t.getElementById && p) {
                                                      var n = t.getElementById(e);
                                                      return n ? [n] : [];
                                                  }
                                              }))
                                            : ((t.filter.ID = function (e) {
                                                  var t = e.replace(Q, X);
                                                  return function (e) {
                                                      var n = void 0 !== e.getAttributeNode && e.getAttributeNode('id');
                                                      return n && n.value === t;
                                                  };
                                              }),
                                              (t.find.ID = function (e, t) {
                                                  if (void 0 !== t.getElementById && p) {
                                                      var n,
                                                          i,
                                                          a,
                                                          o = t.getElementById(e);
                                                      if (o) {
                                                          if ((n = o.getAttributeNode('id')) && n.value === e)
                                                              return [o];
                                                          for (a = t.getElementsByName(e), i = 0; (o = a[i++]); )
                                                              if ((n = o.getAttributeNode('id')) && n.value === e)
                                                                  return [o];
                                                      }
                                                      return [];
                                                  }
                                              })),
                                        (t.find.TAG = function (e, t) {
                                            return void 0 !== t.getElementsByTagName
                                                ? t.getElementsByTagName(e)
                                                : t.querySelectorAll(e);
                                        }),
                                        (t.find.CLASS = function (e, t) {
                                            if (void 0 !== t.getElementsByClassName && p)
                                                return t.getElementsByClassName(e);
                                        }),
                                        (m = []),
                                        en(function (e) {
                                            var t;
                                            (l.appendChild(e).innerHTML =
                                                "<a id='" +
                                                b +
                                                "' href='' disabled='disabled'></a><select id='" +
                                                b +
                                                "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                                                e.querySelectorAll('[selected]').length ||
                                                    m.push('\\[' + j + '*(?:value|' + N + ')'),
                                                e.querySelectorAll('[id~=' + b + '-]').length || m.push('~='),
                                                e.querySelectorAll('a#' + b + '+*').length || m.push('.#.+[+~]'),
                                                e.querySelectorAll(':checked').length || m.push(':checked'),
                                                (t = r.createElement('input')).setAttribute('type', 'hidden'),
                                                e.appendChild(t).setAttribute('name', 'D'),
                                                (l.appendChild(e).disabled = !0),
                                                2 !== e.querySelectorAll(':disabled').length &&
                                                    m.push(':enabled', ':disabled'),
                                                (t = r.createElement('input')).setAttribute('name', ''),
                                                e.appendChild(t),
                                                e.querySelectorAll("[name='']").length ||
                                                    m.push('\\[' + j + '*name' + j + '*=' + j + '*(?:\'\'|"")');
                                        }),
                                        v.cssHas || m.push(':has'),
                                        (m = m.length && RegExp(m.join('|'))),
                                        (k = function (e, t) {
                                            if (e === t) return (o = !0), 0;
                                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                            return (
                                                n ||
                                                (1 &
                                                    (n =
                                                        (e.ownerDocument || e) == (t.ownerDocument || t)
                                                            ? e.compareDocumentPosition(t)
                                                            : 1) ||
                                                (!v.sortDetached && t.compareDocumentPosition(e) === n)
                                                    ? e === r || (e.ownerDocument == y && J.contains(y, e))
                                                        ? -1
                                                        : t === r || (t.ownerDocument == y && J.contains(y, t))
                                                          ? 1
                                                          : a
                                                            ? d.call(a, e) - d.call(a, t)
                                                            : 0
                                                    : 4 & n
                                                      ? -1
                                                      : 1)
                                            );
                                        })),
                                    r
                                );
                            }
                            for (e in ((J.matches = function (e, t) {
                                return J(e, null, null, t);
                            }),
                            (J.matchesSelector = function (e, t) {
                                if ((es(e), p && !_[t + ' '] && (!m || !m.test(t))))
                                    try {
                                        var n = f.call(e, t);
                                        if (n || v.disconnectedMatch || (e.document && 11 !== e.document.nodeType))
                                            return n;
                                    } catch (e) {
                                        _(t, !0);
                                    }
                                return J(t, r, null, [e]).length > 0;
                            }),
                            (J.contains = function (e, t) {
                                return (e.ownerDocument || e) != r && es(e), P.contains(e, t);
                            }),
                            (J.attr = function (e, n) {
                                (e.ownerDocument || e) != r && es(e);
                                var i = t.attrHandle[n.toLowerCase()],
                                    a = i && h.call(t.attrHandle, n.toLowerCase()) ? i(e, n, !p) : void 0;
                                return void 0 !== a ? a : e.getAttribute(n);
                            }),
                            (J.error = function (e) {
                                throw Error('Syntax error, unrecognized expression: ' + e);
                            }),
                            (P.uniqueSort = function (e) {
                                var t,
                                    n = [],
                                    i = 0,
                                    s = 0;
                                if (((o = !v.sortStable), (a = !v.sortStable && c.call(e, 0)), T.call(e, k), o)) {
                                    for (; (t = e[s++]); ) t === e[s] && (i = n.push(s));
                                    for (; i--; ) I.call(e, n[i], 1);
                                }
                                return (a = null), e;
                            }),
                            (P.fn.uniqueSort = function () {
                                return this.pushStack(P.uniqueSort(c.apply(this)));
                            }),
                            ((t = P.expr =
                                {
                                    cacheLength: 50,
                                    createPseudo: et,
                                    match: W,
                                    attrHandle: {},
                                    find: {},
                                    relative: {
                                        '>': { dir: 'parentNode', first: !0 },
                                        ' ': { dir: 'parentNode' },
                                        '+': { dir: 'previousSibling', first: !0 },
                                        '~': { dir: 'previousSibling' },
                                    },
                                    preFilter: {
                                        ATTR: function (e) {
                                            return (
                                                (e[1] = e[1].replace(Q, X)),
                                                (e[3] = (e[3] || e[4] || e[5] || '').replace(Q, X)),
                                                '~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
                                                e.slice(0, 4)
                                            );
                                        },
                                        CHILD: function (e) {
                                            return (
                                                (e[1] = e[1].toLowerCase()),
                                                'nth' === e[1].slice(0, 3)
                                                    ? (e[3] || J.error(e[0]),
                                                      (e[4] = +(e[4]
                                                          ? e[5] + (e[6] || 1)
                                                          : 2 * ('even' === e[3] || 'odd' === e[3]))),
                                                      (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
                                                    : e[3] && J.error(e[0]),
                                                e
                                            );
                                        },
                                        PSEUDO: function (e) {
                                            var t,
                                                n = !e[6] && e[2];
                                            return W.CHILD.test(e[0])
                                                ? null
                                                : (e[3]
                                                      ? (e[2] = e[4] || e[5] || '')
                                                      : n &&
                                                        q.test(n) &&
                                                        (t = ec(n, !0)) &&
                                                        (t = n.indexOf(')', n.length - t) - n.length) &&
                                                        ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                                                  e.slice(0, 3));
                                        },
                                    },
                                    filter: {
                                        TAG: function (e) {
                                            var t = e.replace(Q, X).toLowerCase();
                                            return '*' === e
                                                ? function () {
                                                      return !0;
                                                  }
                                                : function (e) {
                                                      return M(e, t);
                                                  };
                                        },
                                        CLASS: function (e) {
                                            var t = w[e + ' '];
                                            return (
                                                t ||
                                                ((t = RegExp('(^|' + j + ')' + e + '(' + j + '|$)')),
                                                w(e, function (e) {
                                                    return t.test(
                                                        ('string' == typeof e.className && e.className) ||
                                                            (void 0 !== e.getAttribute && e.getAttribute('class')) ||
                                                            ''
                                                    );
                                                }))
                                            );
                                        },
                                        ATTR: function (e, t, n) {
                                            return function (i) {
                                                var a = J.attr(i, e);
                                                return null == a
                                                    ? '!=' === t
                                                    : !t ||
                                                          (((a += ''), '=' === t)
                                                              ? a === n
                                                              : '!=' === t
                                                                ? a !== n
                                                                : '^=' === t
                                                                  ? n && 0 === a.indexOf(n)
                                                                  : '*=' === t
                                                                    ? n && a.indexOf(n) > -1
                                                                    : '$=' === t
                                                                      ? n && a.slice(-n.length) === n
                                                                      : '~=' === t
                                                                        ? (' ' + a.replace(D, ' ') + ' ').indexOf(n) >
                                                                          -1
                                                                        : '|=' === t &&
                                                                          (a === n ||
                                                                              a.slice(0, n.length + 1) === n + '-'));
                                            };
                                        },
                                        CHILD: function (e, t, n, i, a) {
                                            var o = 'nth' !== e.slice(0, 3),
                                                s = 'last' !== e.slice(-4),
                                                r = 'of-type' === t;
                                            return 1 === i && 0 === a
                                                ? function (e) {
                                                      return !!e.parentNode;
                                                  }
                                                : function (t, n, c) {
                                                      var l,
                                                          u,
                                                          d,
                                                          p,
                                                          m,
                                                          h = o !== s ? 'nextSibling' : 'previousSibling',
                                                          f = t.parentNode,
                                                          g = r && t.nodeName.toLowerCase(),
                                                          v = !c && !r,
                                                          y = !1;
                                                      if (f) {
                                                          if (o) {
                                                              for (; h; ) {
                                                                  for (d = t; (d = d[h]); )
                                                                      if (r ? M(d, g) : 1 === d.nodeType) return !1;
                                                                  m = h = 'only' === e && !m && 'nextSibling';
                                                              }
                                                              return !0;
                                                          }
                                                          if (((m = [s ? f.firstChild : f.lastChild]), s && v)) {
                                                              for (
                                                                  y =
                                                                      (p =
                                                                          (l =
                                                                              (u = f[b] || (f[b] = {}))[e] || [])[0] ===
                                                                              x && l[1]) && l[2],
                                                                      d = p && f.childNodes[p];
                                                                  (d = (++p && d && d[h]) || (y = p = 0) || m.pop());

                                                              )
                                                                  if (1 === d.nodeType && ++y && d === t) {
                                                                      u[e] = [x, p, y];
                                                                      break;
                                                                  }
                                                          } else if (
                                                              (v &&
                                                                  (y = p =
                                                                      (l = (u = t[b] || (t[b] = {}))[e] || [])[0] ===
                                                                          x && l[1]),
                                                              !1 === y)
                                                          )
                                                              for (
                                                                  ;
                                                                  (d = (++p && d && d[h]) || (y = p = 0) || m.pop()) &&
                                                                  (!((r ? M(d, g) : 1 === d.nodeType) && ++y) ||
                                                                      (v && ((u = d[b] || (d[b] = {}))[e] = [x, y]),
                                                                      d !== t));

                                                              );
                                                          return (y -= a) === i || (y % i == 0 && y / i >= 0);
                                                      }
                                                  };
                                        },
                                        PSEUDO: function (e, n) {
                                            var i,
                                                a =
                                                    t.pseudos[e] ||
                                                    t.setFilters[e.toLowerCase()] ||
                                                    J.error('unsupported pseudo: ' + e);
                                            return a[b]
                                                ? a(n)
                                                : a.length > 1
                                                  ? ((i = [e, e, '', n]),
                                                    t.setFilters.hasOwnProperty(e.toLowerCase())
                                                        ? et(function (e, t) {
                                                              for (var i, o = a(e, n), s = o.length; s--; )
                                                                  (i = d.call(e, o[s])), (e[i] = !(t[i] = o[s]));
                                                          })
                                                        : function (e) {
                                                              return a(e, 0, i);
                                                          })
                                                  : a;
                                        },
                                    },
                                    pseudos: {
                                        not: et(function (e) {
                                            var t = [],
                                                n = [],
                                                i = em(e.replace(G, '$1'));
                                            return i[b]
                                                ? et(function (e, t, n, a) {
                                                      for (var o, s = i(e, null, a, []), r = e.length; r--; )
                                                          (o = s[r]) && (e[r] = !(t[r] = o));
                                                  })
                                                : function (e, a, o) {
                                                      return (t[0] = e), i(t, null, o, n), (t[0] = null), !n.pop();
                                                  };
                                        }),
                                        has: et(function (e) {
                                            return function (t) {
                                                return J(e, t).length > 0;
                                            };
                                        }),
                                        contains: et(function (e) {
                                            return (
                                                (e = e.replace(Q, X)),
                                                function (t) {
                                                    return (t.textContent || P.text(t)).indexOf(e) > -1;
                                                }
                                            );
                                        }),
                                        lang: et(function (e) {
                                            return (
                                                H.test(e || '') || J.error('unsupported lang: ' + e),
                                                (e = e.replace(Q, X).toLowerCase()),
                                                function (t) {
                                                    var n;
                                                    do
                                                        if (
                                                            (n = p
                                                                ? t.lang
                                                                : t.getAttribute('xml:lang') || t.getAttribute('lang'))
                                                        )
                                                            return (
                                                                (n = n.toLowerCase()) === e || 0 === n.indexOf(e + '-')
                                                            );
                                                    while ((t = t.parentNode) && 1 === t.nodeType);
                                                    return !1;
                                                }
                                            );
                                        }),
                                        target: function (e) {
                                            var t = i.location && i.location.hash;
                                            return t && t.slice(1) === e.id;
                                        },
                                        root: function (e) {
                                            return e === l;
                                        },
                                        focus: function (e) {
                                            return (
                                                e ===
                                                    (function () {
                                                        try {
                                                            return r.activeElement;
                                                        } catch (e) {}
                                                    })() &&
                                                r.hasFocus() &&
                                                !!(e.type || e.href || ~e.tabIndex)
                                            );
                                        },
                                        enabled: ei(!1),
                                        disabled: ei(!0),
                                        checked: function (e) {
                                            return (M(e, 'input') && !!e.checked) || (M(e, 'option') && !!e.selected);
                                        },
                                        selected: function (e) {
                                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                                        },
                                        empty: function (e) {
                                            for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                                            return !0;
                                        },
                                        parent: function (e) {
                                            return !t.pseudos.empty(e);
                                        },
                                        header: function (e) {
                                            return $.test(e.nodeName);
                                        },
                                        input: function (e) {
                                            return F.test(e.nodeName);
                                        },
                                        button: function (e) {
                                            return (M(e, 'input') && 'button' === e.type) || M(e, 'button');
                                        },
                                        text: function (e) {
                                            var t;
                                            return (
                                                M(e, 'input') &&
                                                'text' === e.type &&
                                                (null == (t = e.getAttribute('type')) || 'text' === t.toLowerCase())
                                            );
                                        },
                                        first: ea(function () {
                                            return [0];
                                        }),
                                        last: ea(function (e, t) {
                                            return [t - 1];
                                        }),
                                        eq: ea(function (e, t, n) {
                                            return [n < 0 ? n + t : n];
                                        }),
                                        even: ea(function (e, t) {
                                            for (var n = 0; n < t; n += 2) e.push(n);
                                            return e;
                                        }),
                                        odd: ea(function (e, t) {
                                            for (var n = 1; n < t; n += 2) e.push(n);
                                            return e;
                                        }),
                                        lt: ea(function (e, t, n) {
                                            var i;
                                            for (i = n < 0 ? n + t : n > t ? t : n; --i >= 0; ) e.push(i);
                                            return e;
                                        }),
                                        gt: ea(function (e, t, n) {
                                            for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                                            return e;
                                        }),
                                    },
                                }).pseudos.nth = t.pseudos.eq),
                            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                                t.pseudos[e] = (function (e) {
                                    return function (t) {
                                        return M(t, 'input') && t.type === e;
                                    };
                                })(e);
                            for (e in { submit: !0, reset: !0 })
                                t.pseudos[e] = (function (e) {
                                    return function (t) {
                                        return (M(t, 'input') || M(t, 'button')) && t.type === e;
                                    };
                                })(e);
                            function er() {}
                            function ec(e, n) {
                                var i,
                                    a,
                                    o,
                                    s,
                                    r,
                                    c,
                                    l,
                                    u = A[e + ' '];
                                if (u) return n ? 0 : u.slice(0);
                                for (r = e, c = [], l = t.preFilter; r; ) {
                                    for (s in ((!i || (a = z.exec(r))) &&
                                        (a && (r = r.slice(a[0].length) || r), c.push((o = []))),
                                    (i = !1),
                                    (a = R.exec(r)) &&
                                        ((i = a.shift()),
                                        o.push({ value: i, type: a[0].replace(G, ' ') }),
                                        (r = r.slice(i.length))),
                                    t.filter))
                                        (a = W[s].exec(r)) &&
                                            (!l[s] || (a = l[s](a))) &&
                                            ((i = a.shift()),
                                            o.push({ value: i, type: s, matches: a }),
                                            (r = r.slice(i.length)));
                                    if (!i) break;
                                }
                                return n ? r.length : r ? J.error(e) : A(e, c).slice(0);
                            }
                            function el(e) {
                                for (var t = 0, n = e.length, i = ''; t < n; t++) i += e[t].value;
                                return i;
                            }
                            function eu(e, t, n) {
                                var i = t.dir,
                                    a = t.next,
                                    o = a || i,
                                    s = n && 'parentNode' === o,
                                    r = S++;
                                return t.first
                                    ? function (t, n, a) {
                                          for (; (t = t[i]); ) if (1 === t.nodeType || s) return e(t, n, a);
                                          return !1;
                                      }
                                    : function (t, n, c) {
                                          var l,
                                              u,
                                              d = [x, r];
                                          if (c) {
                                              for (; (t = t[i]); ) if ((1 === t.nodeType || s) && e(t, n, c)) return !0;
                                          } else
                                              for (; (t = t[i]); )
                                                  if (1 === t.nodeType || s) {
                                                      if (((u = t[b] || (t[b] = {})), a && M(t, a))) t = t[i] || t;
                                                      else if ((l = u[o]) && l[0] === x && l[1] === r)
                                                          return (d[2] = l[2]);
                                                      else if (((u[o] = d), (d[2] = e(t, n, c)))) return !0;
                                                  }
                                          return !1;
                                      };
                            }
                            function ed(e) {
                                return e.length > 1
                                    ? function (t, n, i) {
                                          for (var a = e.length; a--; ) if (!e[a](t, n, i)) return !1;
                                          return !0;
                                      }
                                    : e[0];
                            }
                            function ep(e, t, n, i, a) {
                                for (var o, s = [], r = 0, c = e.length, l = null != t; r < c; r++)
                                    (o = e[r]) && (!n || n(o, i, a)) && (s.push(o), l && t.push(r));
                                return s;
                            }
                            function em(e, i) {
                                var a,
                                    o,
                                    s,
                                    c,
                                    l = [],
                                    u = [],
                                    m = C[e + ' '];
                                if (!m) {
                                    for (i || (i = ec(e)), c = i.length; c--; )
                                        (m = (function e(i) {
                                            for (
                                                var a,
                                                    o,
                                                    s,
                                                    r = i.length,
                                                    c = t.relative[i[0].type],
                                                    l = c || t.relative[' '],
                                                    u = c ? 1 : 0,
                                                    p = eu(
                                                        function (e) {
                                                            return e === a;
                                                        },
                                                        l,
                                                        !0
                                                    ),
                                                    m = eu(
                                                        function (e) {
                                                            return d.call(a, e) > -1;
                                                        },
                                                        l,
                                                        !0
                                                    ),
                                                    h = [
                                                        function (e, t, i) {
                                                            var o =
                                                                (!c && (i || t != n)) ||
                                                                ((a = t).nodeType ? p(e, t, i) : m(e, t, i));
                                                            return (a = null), o;
                                                        },
                                                    ];
                                                u < r;
                                                u++
                                            )
                                                if ((o = t.relative[i[u].type])) h = [eu(ed(h), o)];
                                                else {
                                                    if ((o = t.filter[i[u].type].apply(null, i[u].matches))[b]) {
                                                        for (s = ++u; s < r && !t.relative[i[s].type]; s++);
                                                        return (function e(t, n, i, a, o, s) {
                                                            return (
                                                                a && !a[b] && (a = e(a)),
                                                                o && !o[b] && (o = e(o, s)),
                                                                et(function (e, s, r, c) {
                                                                    var l,
                                                                        u,
                                                                        p,
                                                                        m,
                                                                        h = [],
                                                                        f = [],
                                                                        v = s.length,
                                                                        b =
                                                                            e ||
                                                                            (function (e, t, n) {
                                                                                for (
                                                                                    var i = 0, a = t.length;
                                                                                    i < a;
                                                                                    i++
                                                                                )
                                                                                    J(e, t[i], n);
                                                                                return n;
                                                                            })(n || '*', r.nodeType ? [r] : r, []),
                                                                        x = t && (e || !n) ? ep(b, h, t, r, c) : b;
                                                                    if (
                                                                        (i
                                                                            ? i(
                                                                                  x,
                                                                                  (m = o || (e ? t : v || a) ? [] : s),
                                                                                  r,
                                                                                  c
                                                                              )
                                                                            : (m = x),
                                                                        a)
                                                                    )
                                                                        for (
                                                                            l = ep(m, f), a(l, [], r, c), u = l.length;
                                                                            u--;

                                                                        )
                                                                            (p = l[u]) && (m[f[u]] = !(x[f[u]] = p));
                                                                    if (e) {
                                                                        if (o || t) {
                                                                            if (o) {
                                                                                for (l = [], u = m.length; u--; )
                                                                                    (p = m[u]) && l.push((x[u] = p));
                                                                                o(null, (m = []), l, c);
                                                                            }
                                                                            for (u = m.length; u--; )
                                                                                (p = m[u]) &&
                                                                                    (l = o ? d.call(e, p) : h[u]) >
                                                                                        -1 &&
                                                                                    (e[l] = !(s[l] = p));
                                                                        }
                                                                    } else
                                                                        (m = ep(m === s ? m.splice(v, m.length) : m)),
                                                                            o ? o(null, s, m, c) : g.apply(s, m);
                                                                })
                                                            );
                                                        })(
                                                            u > 1 && ed(h),
                                                            u > 1 &&
                                                                el(
                                                                    i
                                                                        .slice(0, u - 1)
                                                                        .concat({
                                                                            value: ' ' === i[u - 2].type ? '*' : '',
                                                                        })
                                                                ).replace(G, '$1'),
                                                            o,
                                                            u < s && e(i.slice(u, s)),
                                                            s < r && e((i = i.slice(s))),
                                                            s < r && el(i)
                                                        );
                                                    }
                                                    h.push(o);
                                                }
                                            return ed(h);
                                        })(i[c]))[b]
                                            ? l.push(m)
                                            : u.push(m);
                                    (m = C(
                                        e,
                                        ((a = l.length > 0),
                                        (o = u.length > 0),
                                        (s = function (e, i, s, c, d) {
                                            var m,
                                                h,
                                                f,
                                                v = 0,
                                                b = '0',
                                                y = e && [],
                                                S = [],
                                                w = n,
                                                A = e || (o && t.find.TAG('*', d)),
                                                C = (x += null == w ? 1 : Math.random() || 0.1),
                                                _ = A.length;
                                            for (d && (n = i == r || i || d); b !== _ && null != (m = A[b]); b++) {
                                                if (o && m) {
                                                    for (
                                                        h = 0, i || m.ownerDocument == r || (es(m), (s = !p));
                                                        (f = u[h++]);

                                                    )
                                                        if (f(m, i || r, s)) {
                                                            g.call(c, m);
                                                            break;
                                                        }
                                                    d && (x = C);
                                                }
                                                a && ((m = !f && m) && v--, e && y.push(m));
                                            }
                                            if (((v += b), a && b !== v)) {
                                                for (h = 0; (f = l[h++]); ) f(y, S, i, s);
                                                if (e) {
                                                    if (v > 0) for (; b--; ) y[b] || S[b] || (S[b] = E.call(c));
                                                    S = ep(S);
                                                }
                                                g.apply(c, S),
                                                    d && !e && S.length > 0 && v + l.length > 1 && P.uniqueSort(c);
                                            }
                                            return d && ((x = C), (n = w)), y;
                                        }),
                                        a ? et(s) : s)
                                    )).selector = e;
                                }
                                return m;
                            }
                            function eh(e, n, i, a) {
                                var o,
                                    s,
                                    r,
                                    c,
                                    l,
                                    u = 'function' == typeof e && e,
                                    d = !a && ec((e = u.selector || e));
                                if (((i = i || []), 1 === d.length)) {
                                    if (
                                        (s = d[0] = d[0].slice(0)).length > 2 &&
                                        'ID' === (r = s[0]).type &&
                                        9 === n.nodeType &&
                                        p &&
                                        t.relative[s[1].type]
                                    ) {
                                        if (!(n = (t.find.ID(r.matches[0].replace(Q, X), n) || [])[0])) return i;
                                        u && (n = n.parentNode), (e = e.slice(s.shift().value.length));
                                    }
                                    for (
                                        o = W.needsContext.test(e) ? 0 : s.length;
                                        o-- && ((r = s[o]), !t.relative[(c = r.type)]);

                                    )
                                        if (
                                            (l = t.find[c]) &&
                                            (a = l(
                                                r.matches[0].replace(Q, X),
                                                (K.test(s[0].type) && eo(n.parentNode)) || n
                                            ))
                                        ) {
                                            if ((s.splice(o, 1), !(e = a.length && el(s)))) return g.apply(i, a), i;
                                            break;
                                        }
                                }
                                return (u || em(e, d))(a, n, !p, i, !n || (K.test(e) && eo(n.parentNode)) || n), i;
                            }
                            (er.prototype = t.filters = t.pseudos),
                                (t.setFilters = new er()),
                                (v.sortStable = b.split('').sort(k).join('') === b),
                                es(),
                                (v.sortDetached = en(function (e) {
                                    return 1 & e.compareDocumentPosition(r.createElement('fieldset'));
                                })),
                                (P.find = J),
                                (P.expr[':'] = P.expr.pseudos),
                                (P.unique = P.uniqueSort),
                                (J.compile = em),
                                (J.select = eh),
                                (J.setDocument = es),
                                (J.tokenize = ec),
                                (J.escape = P.escapeSelector),
                                (J.getText = P.text),
                                (J.isXML = P.isXMLDoc),
                                (J.selectors = P.expr),
                                (J.support = P.support),
                                (J.uniqueSort = P.uniqueSort);
                        })();
                    var O = function (e, t, n) {
                            for (var i = [], a = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                                if (1 === e.nodeType) {
                                    if (a && P(e).is(n)) break;
                                    i.push(e);
                                }
                            return i;
                        },
                        L = function (e, t) {
                            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                            return n;
                        },
                        D = P.expr.match.needsContext,
                        z = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
                    function R(e, t, n) {
                        return b(t)
                            ? P.grep(e, function (e, i) {
                                  return !!t.call(e, i, e) !== n;
                              })
                            : t.nodeType
                              ? P.grep(e, function (e) {
                                    return (e === t) !== n;
                                })
                              : 'string' != typeof t
                                ? P.grep(e, function (e) {
                                      return d.call(t, e) > -1 !== n;
                                  })
                                : P.filter(t, e, n);
                    }
                    (P.filter = function (e, t, n) {
                        var i = t[0];
                        return (n && (e = ':not(' + e + ')'), 1 === t.length && 1 === i.nodeType)
                            ? P.find.matchesSelector(i, e)
                                ? [i]
                                : []
                            : P.find.matches(
                                  e,
                                  P.grep(t, function (e) {
                                      return 1 === e.nodeType;
                                  })
                              );
                    }),
                        P.fn.extend({
                            find: function (e) {
                                var t,
                                    n,
                                    i = this.length,
                                    a = this;
                                if ('string' != typeof e)
                                    return this.pushStack(
                                        P(e).filter(function () {
                                            for (t = 0; t < i; t++) if (P.contains(a[t], this)) return !0;
                                        })
                                    );
                                for (t = 0, n = this.pushStack([]); t < i; t++) P.find(e, a[t], n);
                                return i > 1 ? P.uniqueSort(n) : n;
                            },
                            filter: function (e) {
                                return this.pushStack(R(this, e || [], !1));
                            },
                            not: function (e) {
                                return this.pushStack(R(this, e || [], !0));
                            },
                            is: function (e) {
                                return !!R(this, 'string' == typeof e && D.test(e) ? P(e) : e || [], !1).length;
                            },
                        });
                    var U,
                        q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
                    ((P.fn.init = function (e, t, n) {
                        var i, a;
                        if (!e) return this;
                        if (((n = n || U), 'string' == typeof e)) {
                            if (
                                (i =
                                    '<' === e[0] && '>' === e[e.length - 1] && e.length >= 3
                                        ? [null, e, null]
                                        : q.exec(e)) &&
                                (i[1] || !t)
                            ) {
                                if (!i[1])
                                    return (a = y.getElementById(i[2])) && ((this[0] = a), (this.length = 1)), this;
                                if (
                                    ((t = t instanceof P ? t[0] : t),
                                    P.merge(this, P.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : y, !0)),
                                    z.test(i[1]) && P.isPlainObject(t))
                                )
                                    for (i in t) b(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                                return this;
                            }
                            return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                        }
                        return e.nodeType
                            ? ((this[0] = e), (this.length = 1), this)
                            : b(e)
                              ? void 0 !== n.ready
                                  ? n.ready(e)
                                  : e(P)
                              : P.makeArray(e, this);
                    }).prototype = P.fn),
                        (U = P(y));
                    var H = /^(?:parents|prev(?:Until|All))/,
                        W = { children: !0, contents: !0, next: !0, prev: !0 };
                    function F(e, t) {
                        for (; (e = e[t]) && 1 !== e.nodeType; );
                        return e;
                    }
                    P.fn.extend({
                        has: function (e) {
                            var t = P(e, this),
                                n = t.length;
                            return this.filter(function () {
                                for (var e = 0; e < n; e++) if (P.contains(this, t[e])) return !0;
                            });
                        },
                        closest: function (e, t) {
                            var n,
                                i = 0,
                                a = this.length,
                                o = [],
                                s = 'string' != typeof e && P(e);
                            if (!D.test(e)) {
                                for (; i < a; i++)
                                    for (n = this[i]; n && n !== t; n = n.parentNode)
                                        if (
                                            n.nodeType < 11 &&
                                            (s ? s.index(n) > -1 : 1 === n.nodeType && P.find.matchesSelector(n, e))
                                        ) {
                                            o.push(n);
                                            break;
                                        }
                            }
                            return this.pushStack(o.length > 1 ? P.uniqueSort(o) : o);
                        },
                        index: function (e) {
                            return e
                                ? 'string' == typeof e
                                    ? d.call(P(e), this[0])
                                    : d.call(this, e.jquery ? e[0] : e)
                                : this[0] && this[0].parentNode
                                  ? this.first().prevAll().length
                                  : -1;
                        },
                        add: function (e, t) {
                            return this.pushStack(P.uniqueSort(P.merge(this.get(), P(e, t))));
                        },
                        addBack: function (e) {
                            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                        },
                    }),
                        P.each(
                            {
                                parent: function (e) {
                                    var t = e.parentNode;
                                    return t && 11 !== t.nodeType ? t : null;
                                },
                                parents: function (e) {
                                    return O(e, 'parentNode');
                                },
                                parentsUntil: function (e, t, n) {
                                    return O(e, 'parentNode', n);
                                },
                                next: function (e) {
                                    return F(e, 'nextSibling');
                                },
                                prev: function (e) {
                                    return F(e, 'previousSibling');
                                },
                                nextAll: function (e) {
                                    return O(e, 'nextSibling');
                                },
                                prevAll: function (e) {
                                    return O(e, 'previousSibling');
                                },
                                nextUntil: function (e, t, n) {
                                    return O(e, 'nextSibling', n);
                                },
                                prevUntil: function (e, t, n) {
                                    return O(e, 'previousSibling', n);
                                },
                                siblings: function (e) {
                                    return L((e.parentNode || {}).firstChild, e);
                                },
                                children: function (e) {
                                    return L(e.firstChild);
                                },
                                contents: function (e) {
                                    return null != e.contentDocument && r(e.contentDocument)
                                        ? e.contentDocument
                                        : (M(e, 'template') && (e = e.content || e), P.merge([], e.childNodes));
                                },
                            },
                            function (e, t) {
                                P.fn[e] = function (n, i) {
                                    var a = P.map(this, t, n);
                                    return (
                                        'Until' !== e.slice(-5) && (i = n),
                                        i && 'string' == typeof i && (a = P.filter(i, a)),
                                        this.length > 1 && (W[e] || P.uniqueSort(a), H.test(e) && a.reverse()),
                                        this.pushStack(a)
                                    );
                                };
                            }
                        );
                    var $ = /[^\x20\t\r\n\f]+/g;
                    function V(e) {
                        return e;
                    }
                    function K(e) {
                        throw e;
                    }
                    function Q(e, t, n, i) {
                        var a;
                        try {
                            e && b((a = e.promise))
                                ? a.call(e).done(t).fail(n)
                                : e && b((a = e.then))
                                  ? a.call(e, t, n)
                                  : t.apply(void 0, [e].slice(i));
                        } catch (e) {
                            n.apply(void 0, [e]);
                        }
                    }
                    (P.Callbacks = function (e) {
                        e =
                            'string' == typeof e
                                ? ((t = e),
                                  (n = {}),
                                  P.each(t.match($) || [], function (e, t) {
                                      n[t] = !0;
                                  }),
                                  n)
                                : P.extend({}, e);
                        var t,
                            n,
                            i,
                            a,
                            o,
                            s,
                            r = [],
                            c = [],
                            l = -1,
                            u = function () {
                                for (s = s || e.once, o = i = !0; c.length; l = -1)
                                    for (a = c.shift(); ++l < r.length; )
                                        !1 === r[l].apply(a[0], a[1]) && e.stopOnFalse && ((l = r.length), (a = !1));
                                e.memory || (a = !1), (i = !1), s && (r = a ? [] : '');
                            },
                            d = {
                                add: function () {
                                    return (
                                        r &&
                                            (a && !i && ((l = r.length - 1), c.push(a)),
                                            (function t(n) {
                                                P.each(n, function (n, i) {
                                                    b(i)
                                                        ? (e.unique && d.has(i)) || r.push(i)
                                                        : i && i.length && 'string' !== A(i) && t(i);
                                                });
                                            })(arguments),
                                            a && !i && u()),
                                        this
                                    );
                                },
                                remove: function () {
                                    return (
                                        P.each(arguments, function (e, t) {
                                            for (var n; (n = P.inArray(t, r, n)) > -1; ) r.splice(n, 1), n <= l && l--;
                                        }),
                                        this
                                    );
                                },
                                has: function (e) {
                                    return e ? P.inArray(e, r) > -1 : r.length > 0;
                                },
                                empty: function () {
                                    return r && (r = []), this;
                                },
                                disable: function () {
                                    return (s = c = []), (r = a = ''), this;
                                },
                                disabled: function () {
                                    return !r;
                                },
                                lock: function () {
                                    return (s = c = []), a || i || (r = a = ''), this;
                                },
                                locked: function () {
                                    return !!s;
                                },
                                fireWith: function (e, t) {
                                    return (
                                        s || ((t = t || []), (t = [e, t.slice ? t.slice() : t]), c.push(t), i || u()),
                                        this
                                    );
                                },
                                fire: function () {
                                    return d.fireWith(this, arguments), this;
                                },
                                fired: function () {
                                    return !!o;
                                },
                            };
                        return d;
                    }),
                        P.extend({
                            Deferred: function (e) {
                                var t = [
                                        ['notify', 'progress', P.Callbacks('memory'), P.Callbacks('memory'), 2],
                                        [
                                            'resolve',
                                            'done',
                                            P.Callbacks('once memory'),
                                            P.Callbacks('once memory'),
                                            0,
                                            'resolved',
                                        ],
                                        [
                                            'reject',
                                            'fail',
                                            P.Callbacks('once memory'),
                                            P.Callbacks('once memory'),
                                            1,
                                            'rejected',
                                        ],
                                    ],
                                    n = 'pending',
                                    a = {
                                        state: function () {
                                            return n;
                                        },
                                        always: function () {
                                            return o.done(arguments).fail(arguments), this;
                                        },
                                        catch: function (e) {
                                            return a.then(null, e);
                                        },
                                        pipe: function () {
                                            var e = arguments;
                                            return P.Deferred(function (n) {
                                                P.each(t, function (t, i) {
                                                    var a = b(e[i[4]]) && e[i[4]];
                                                    o[i[1]](function () {
                                                        var e = a && a.apply(this, arguments);
                                                        e && b(e.promise)
                                                            ? e
                                                                  .promise()
                                                                  .progress(n.notify)
                                                                  .done(n.resolve)
                                                                  .fail(n.reject)
                                                            : n[i[0] + 'With'](this, a ? [e] : arguments);
                                                    });
                                                }),
                                                    (e = null);
                                            }).promise();
                                        },
                                        then: function (e, n, a) {
                                            var o = 0;
                                            function s(e, t, n, a) {
                                                return function () {
                                                    var r = this,
                                                        c = arguments,
                                                        l = function () {
                                                            var i, l;
                                                            if (!(e < o)) {
                                                                if ((i = n.apply(r, c)) === t.promise())
                                                                    throw TypeError('Thenable self-resolution');
                                                                b(
                                                                    (l =
                                                                        i &&
                                                                        ('object' == typeof i ||
                                                                            'function' == typeof i) &&
                                                                        i.then)
                                                                )
                                                                    ? a
                                                                        ? l.call(i, s(o, t, V, a), s(o, t, K, a))
                                                                        : (o++,
                                                                          l.call(
                                                                              i,
                                                                              s(o, t, V, a),
                                                                              s(o, t, K, a),
                                                                              s(o, t, V, t.notifyWith)
                                                                          ))
                                                                    : (n !== V && ((r = void 0), (c = [i])),
                                                                      (a || t.resolveWith)(r, c));
                                                            }
                                                        },
                                                        u = a
                                                            ? l
                                                            : function () {
                                                                  try {
                                                                      l();
                                                                  } catch (i) {
                                                                      P.Deferred.exceptionHook &&
                                                                          P.Deferred.exceptionHook(i, u.error),
                                                                          e + 1 >= o &&
                                                                              (n !== K && ((r = void 0), (c = [i])),
                                                                              t.rejectWith(r, c));
                                                                  }
                                                              };
                                                    e
                                                        ? u()
                                                        : (P.Deferred.getErrorHook
                                                              ? (u.error = P.Deferred.getErrorHook())
                                                              : P.Deferred.getStackHook &&
                                                                (u.error = P.Deferred.getStackHook()),
                                                          i.setTimeout(u));
                                                };
                                            }
                                            return P.Deferred(function (i) {
                                                t[0][3].add(s(0, i, b(a) ? a : V, i.notifyWith)),
                                                    t[1][3].add(s(0, i, b(e) ? e : V)),
                                                    t[2][3].add(s(0, i, b(n) ? n : K));
                                            }).promise();
                                        },
                                        promise: function (e) {
                                            return null != e ? P.extend(e, a) : a;
                                        },
                                    },
                                    o = {};
                                return (
                                    P.each(t, function (e, i) {
                                        var s = i[2],
                                            r = i[5];
                                        (a[i[1]] = s.add),
                                            r &&
                                                s.add(
                                                    function () {
                                                        n = r;
                                                    },
                                                    t[3 - e][2].disable,
                                                    t[3 - e][3].disable,
                                                    t[0][2].lock,
                                                    t[0][3].lock
                                                ),
                                            s.add(i[3].fire),
                                            (o[i[0]] = function () {
                                                return o[i[0] + 'With'](this === o ? void 0 : this, arguments), this;
                                            }),
                                            (o[i[0] + 'With'] = s.fireWith);
                                    }),
                                    a.promise(o),
                                    e && e.call(o, o),
                                    o
                                );
                            },
                            when: function (e) {
                                var t = arguments.length,
                                    n = t,
                                    i = Array(n),
                                    a = c.call(arguments),
                                    o = P.Deferred(),
                                    s = function (e) {
                                        return function (n) {
                                            (i[e] = this),
                                                (a[e] = arguments.length > 1 ? c.call(arguments) : n),
                                                --t || o.resolveWith(i, a);
                                        };
                                    };
                                if (
                                    t <= 1 &&
                                    (Q(e, o.done(s(n)).resolve, o.reject, !t),
                                    'pending' === o.state() || b(a[n] && a[n].then))
                                )
                                    return o.then();
                                for (; n--; ) Q(a[n], s(n), o.reject);
                                return o.promise();
                            },
                        });
                    var X = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                    (P.Deferred.exceptionHook = function (e, t) {
                        i.console &&
                            i.console.warn &&
                            e &&
                            X.test(e.name) &&
                            i.console.warn('jQuery.Deferred exception: ' + e.message, e.stack, t);
                    }),
                        (P.readyException = function (e) {
                            i.setTimeout(function () {
                                throw e;
                            });
                        });
                    var Y = P.Deferred();
                    function Z() {
                        y.removeEventListener('DOMContentLoaded', Z), i.removeEventListener('load', Z), P.ready();
                    }
                    (P.fn.ready = function (e) {
                        return (
                            Y.then(e).catch(function (e) {
                                P.readyException(e);
                            }),
                            this
                        );
                    }),
                        P.extend({
                            isReady: !1,
                            readyWait: 1,
                            ready: function (e) {
                                !(!0 === e ? --P.readyWait : P.isReady) &&
                                    ((P.isReady = !0), (!0 !== e && --P.readyWait > 0) || Y.resolveWith(y, [P]));
                            },
                        }),
                        (P.ready.then = Y.then),
                        'complete' !== y.readyState && ('loading' === y.readyState || y.documentElement.doScroll)
                            ? (y.addEventListener('DOMContentLoaded', Z), i.addEventListener('load', Z))
                            : i.setTimeout(P.ready);
                    var J = function (e, t, n, i, a, o, s) {
                            var r = 0,
                                c = e.length,
                                l = null == n;
                            if ('object' === A(n)) for (r in ((a = !0), n)) J(e, t, r, n[r], !0, o, s);
                            else if (
                                void 0 !== i &&
                                ((a = !0),
                                b(i) || (s = !0),
                                l &&
                                    (s
                                        ? (t.call(e, i), (t = null))
                                        : ((l = t),
                                          (t = function (e, t, n) {
                                              return l.call(P(e), n);
                                          }))),
                                t)
                            )
                                for (; r < c; r++) t(e[r], n, s ? i : i.call(e[r], r, t(e[r], n)));
                            return a ? e : l ? t.call(e) : c ? t(e[0], n) : o;
                        },
                        ee = /^-ms-/,
                        et = /-([a-z])/g;
                    function en(e, t) {
                        return t.toUpperCase();
                    }
                    function ei(e) {
                        return e.replace(ee, 'ms-').replace(et, en);
                    }
                    var ea = function (e) {
                        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
                    };
                    function eo() {
                        this.expando = P.expando + eo.uid++;
                    }
                    (eo.uid = 1),
                        (eo.prototype = {
                            cache: function (e) {
                                var t = e[this.expando];
                                return (
                                    !t &&
                                        ((t = {}),
                                        ea(e) &&
                                            (e.nodeType
                                                ? (e[this.expando] = t)
                                                : Object.defineProperty(e, this.expando, {
                                                      value: t,
                                                      configurable: !0,
                                                  }))),
                                    t
                                );
                            },
                            set: function (e, t, n) {
                                var i,
                                    a = this.cache(e);
                                if ('string' == typeof t) a[ei(t)] = n;
                                else for (i in t) a[ei(i)] = t[i];
                                return a;
                            },
                            get: function (e, t) {
                                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][ei(t)];
                            },
                            access: function (e, t, n) {
                                return void 0 === t || (t && 'string' == typeof t && void 0 === n)
                                    ? this.get(e, t)
                                    : (this.set(e, t, n), void 0 !== n ? n : t);
                            },
                            remove: function (e, t) {
                                var n,
                                    i = e[this.expando];
                                if (void 0 !== i) {
                                    if (void 0 !== t)
                                        for (
                                            n = (t = Array.isArray(t)
                                                ? t.map(ei)
                                                : ((t = ei(t)) in i)
                                                  ? [t]
                                                  : t.match($) || []).length;
                                            n--;

                                        )
                                            delete i[t[n]];
                                    (void 0 === t || P.isEmptyObject(i)) &&
                                        (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
                                }
                            },
                            hasData: function (e) {
                                var t = e[this.expando];
                                return void 0 !== t && !P.isEmptyObject(t);
                            },
                        });
                    var es = new eo(),
                        er = new eo(),
                        ec = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                        el = /[A-Z]/g;
                    function eu(e, t, n) {
                        var i, a;
                        if (void 0 === n && 1 === e.nodeType) {
                            if (
                                ((i = 'data-' + t.replace(el, '-$&').toLowerCase()),
                                'string' == typeof (n = e.getAttribute(i)))
                            ) {
                                try {
                                    (a = n),
                                        (n =
                                            'true' === a ||
                                            ('false' !== a &&
                                                ('null' === a
                                                    ? null
                                                    : a === +a + ''
                                                      ? +a
                                                      : ec.test(a)
                                                        ? JSON.parse(a)
                                                        : a)));
                                } catch (e) {}
                                er.set(e, t, n);
                            } else n = void 0;
                        }
                        return n;
                    }
                    P.extend({
                        hasData: function (e) {
                            return er.hasData(e) || es.hasData(e);
                        },
                        data: function (e, t, n) {
                            return er.access(e, t, n);
                        },
                        removeData: function (e, t) {
                            er.remove(e, t);
                        },
                        _data: function (e, t, n) {
                            return es.access(e, t, n);
                        },
                        _removeData: function (e, t) {
                            es.remove(e, t);
                        },
                    }),
                        P.fn.extend({
                            data: function (e, t) {
                                var n,
                                    i,
                                    a,
                                    o = this[0],
                                    s = o && o.attributes;
                                if (void 0 === e) {
                                    if (
                                        this.length &&
                                        ((a = er.get(o)), 1 === o.nodeType && !es.get(o, 'hasDataAttrs'))
                                    ) {
                                        for (n = s.length; n--; )
                                            s[n] &&
                                                0 === (i = s[n].name).indexOf('data-') &&
                                                eu(o, (i = ei(i.slice(5))), a[i]);
                                        es.set(o, 'hasDataAttrs', !0);
                                    }
                                    return a;
                                }
                                return 'object' == typeof e
                                    ? this.each(function () {
                                          er.set(this, e);
                                      })
                                    : J(
                                          this,
                                          function (t) {
                                              var n;
                                              if (o && void 0 === t)
                                                  return void 0 !== (n = er.get(o, e)) || void 0 !== (n = eu(o, e))
                                                      ? n
                                                      : void 0;
                                              this.each(function () {
                                                  er.set(this, e, t);
                                              });
                                          },
                                          null,
                                          t,
                                          arguments.length > 1,
                                          null,
                                          !0
                                      );
                            },
                            removeData: function (e) {
                                return this.each(function () {
                                    er.remove(this, e);
                                });
                            },
                        }),
                        P.extend({
                            queue: function (e, t, n) {
                                var i;
                                if (e)
                                    return (
                                        (t = (t || 'fx') + 'queue'),
                                        (i = es.get(e, t)),
                                        n &&
                                            (!i || Array.isArray(n)
                                                ? (i = es.access(e, t, P.makeArray(n)))
                                                : i.push(n)),
                                        i || []
                                    );
                            },
                            dequeue: function (e, t) {
                                t = t || 'fx';
                                var n = P.queue(e, t),
                                    i = n.length,
                                    a = n.shift(),
                                    o = P._queueHooks(e, t);
                                'inprogress' === a && ((a = n.shift()), i--),
                                    a &&
                                        ('fx' === t && n.unshift('inprogress'),
                                        delete o.stop,
                                        a.call(
                                            e,
                                            function () {
                                                P.dequeue(e, t);
                                            },
                                            o
                                        )),
                                    !i && o && o.empty.fire();
                            },
                            _queueHooks: function (e, t) {
                                var n = t + 'queueHooks';
                                return (
                                    es.get(e, n) ||
                                    es.access(e, n, {
                                        empty: P.Callbacks('once memory').add(function () {
                                            es.remove(e, [t + 'queue', n]);
                                        }),
                                    })
                                );
                            },
                        }),
                        P.fn.extend({
                            queue: function (e, t) {
                                var n = 2;
                                return ('string' != typeof e && ((t = e), (e = 'fx'), n--), arguments.length < n)
                                    ? P.queue(this[0], e)
                                    : void 0 === t
                                      ? this
                                      : this.each(function () {
                                            var n = P.queue(this, e, t);
                                            P._queueHooks(this, e),
                                                'fx' === e && 'inprogress' !== n[0] && P.dequeue(this, e);
                                        });
                            },
                            dequeue: function (e) {
                                return this.each(function () {
                                    P.dequeue(this, e);
                                });
                            },
                            clearQueue: function (e) {
                                return this.queue(e || 'fx', []);
                            },
                            promise: function (e, t) {
                                var n,
                                    i = 1,
                                    a = P.Deferred(),
                                    o = this,
                                    s = this.length,
                                    r = function () {
                                        --i || a.resolveWith(o, [o]);
                                    };
                                for ('string' != typeof e && ((t = e), (e = void 0)), e = e || 'fx'; s--; )
                                    (n = es.get(o[s], e + 'queueHooks')) && n.empty && (i++, n.empty.add(r));
                                return r(), a.promise(t);
                            },
                        });
                    var ed = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                        ep = RegExp('^(?:([+-])=|)(' + ed + ')([a-z%]*)$', 'i'),
                        em = ['Top', 'Right', 'Bottom', 'Left'],
                        eh = y.documentElement,
                        ef = function (e) {
                            return P.contains(e.ownerDocument, e);
                        },
                        eg = { composed: !0 };
                    eh.getRootNode &&
                        (ef = function (e) {
                            return P.contains(e.ownerDocument, e) || e.getRootNode(eg) === e.ownerDocument;
                        });
                    var ev = function (e, t) {
                        return (
                            'none' === (e = t || e).style.display ||
                            ('' === e.style.display && ef(e) && 'none' === P.css(e, 'display'))
                        );
                    };
                    function eb(e, t, n, i) {
                        var a,
                            o,
                            s = 20,
                            r = i
                                ? function () {
                                      return i.cur();
                                  }
                                : function () {
                                      return P.css(e, t, '');
                                  },
                            c = r(),
                            l = (n && n[3]) || (P.cssNumber[t] ? '' : 'px'),
                            u = e.nodeType && (P.cssNumber[t] || ('px' !== l && +c)) && ep.exec(P.css(e, t));
                        if (u && u[3] !== l) {
                            for (c /= 2, l = l || u[3], u = +c || 1; s--; )
                                P.style(e, t, u + l), (1 - o) * (1 - (o = r() / c || 0.5)) <= 0 && (s = 0), (u /= o);
                            (u *= 2), P.style(e, t, u + l), (n = n || []);
                        }
                        return (
                            n &&
                                ((u = +u || +c || 0),
                                (a = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
                                i && ((i.unit = l), (i.start = u), (i.end = a))),
                            a
                        );
                    }
                    var ex = {};
                    function ey(e, t) {
                        for (var n, i, a = [], o = 0, s = e.length; o < s; o++)
                            (i = e[o]).style &&
                                ((n = i.style.display),
                                t
                                    ? ('none' !== n ||
                                          ((a[o] = es.get(i, 'display') || null), a[o] || (i.style.display = '')),
                                      '' === i.style.display &&
                                          ev(i) &&
                                          (a[o] = (function (e) {
                                              var t,
                                                  n = e.ownerDocument,
                                                  i = e.nodeName,
                                                  a = ex[i];
                                              return (
                                                  a ||
                                                      ((t = n.body.appendChild(n.createElement(i))),
                                                      (a = P.css(t, 'display')),
                                                      t.parentNode.removeChild(t),
                                                      'none' === a && (a = 'block'),
                                                      (ex[i] = a)),
                                                  a
                                              );
                                          })(i)))
                                    : 'none' !== n && ((a[o] = 'none'), es.set(i, 'display', n)));
                        for (o = 0; o < s; o++) null != a[o] && (e[o].style.display = a[o]);
                        return e;
                    }
                    P.fn.extend({
                        show: function () {
                            return ey(this, !0);
                        },
                        hide: function () {
                            return ey(this);
                        },
                        toggle: function (e) {
                            return 'boolean' == typeof e
                                ? e
                                    ? this.show()
                                    : this.hide()
                                : this.each(function () {
                                      ev(this) ? P(this).show() : P(this).hide();
                                  });
                        },
                    });
                    var eS = /^(?:checkbox|radio)$/i,
                        ew = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                        eA = /^$|^module$|\/(?:java|ecma)script/i;
                    (e7 = y.createDocumentFragment().appendChild(y.createElement('div'))),
                        (e8 = y.createElement('input')).setAttribute('type', 'radio'),
                        e8.setAttribute('checked', 'checked'),
                        e8.setAttribute('name', 't'),
                        e7.appendChild(e8),
                        (v.checkClone = e7.cloneNode(!0).cloneNode(!0).lastChild.checked),
                        (e7.innerHTML = '<textarea>x</textarea>'),
                        (v.noCloneChecked = !!e7.cloneNode(!0).lastChild.defaultValue),
                        (e7.innerHTML = '<option></option>'),
                        (v.option = !!e7.lastChild);
                    var eC = {
                        thead: [1, '<table>', '</table>'],
                        col: [2, '<table><colgroup>', '</colgroup></table>'],
                        tr: [2, '<table><tbody>', '</tbody></table>'],
                        td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
                        _default: [0, '', ''],
                    };
                    function e_(e, t) {
                        var n;
                        return ((n =
                            void 0 !== e.getElementsByTagName
                                ? e.getElementsByTagName(t || '*')
                                : void 0 !== e.querySelectorAll
                                  ? e.querySelectorAll(t || '*')
                                  : []),
                        void 0 === t || (t && M(e, t)))
                            ? P.merge([e], n)
                            : n;
                    }
                    function eP(e, t) {
                        for (var n = 0, i = e.length; n < i; n++)
                            es.set(e[n], 'globalEval', !t || es.get(t[n], 'globalEval'));
                    }
                    (eC.tbody = eC.tfoot = eC.colgroup = eC.caption = eC.thead),
                        (eC.th = eC.td),
                        v.option || (eC.optgroup = eC.option = [1, "<select multiple='multiple'>", '</select>']);
                    var ek = /<|&#?\w+;/;
                    function eM(e, t, n, i, a) {
                        for (var o, s, r, c, l, u = t.createDocumentFragment(), d = [], p = 0, m = e.length; p < m; p++)
                            if ((o = e[p]) || 0 === o) {
                                if ('object' === A(o)) P.merge(d, o.nodeType ? [o] : o);
                                else if (ek.test(o)) {
                                    for (
                                        s = s || u.appendChild(t.createElement('div')),
                                            r = eC[(ew.exec(o) || ['', ''])[1].toLowerCase()] || eC._default,
                                            s.innerHTML = r[1] + P.htmlPrefilter(o) + r[2],
                                            l = r[0];
                                        l--;

                                    )
                                        s = s.lastChild;
                                    P.merge(d, s.childNodes), ((s = u.firstChild).textContent = '');
                                } else d.push(t.createTextNode(o));
                            }
                        for (u.textContent = '', p = 0; (o = d[p++]); ) {
                            if (i && P.inArray(o, i) > -1) {
                                a && a.push(o);
                                continue;
                            }
                            if (((c = ef(o)), (s = e_(u.appendChild(o), 'script')), c && eP(s), n))
                                for (l = 0; (o = s[l++]); ) eA.test(o.type || '') && n.push(o);
                        }
                        return u;
                    }
                    var eE = /^([^.]*)(?:\.(.+)|)/;
                    function eT() {
                        return !0;
                    }
                    function eI() {
                        return !1;
                    }
                    function ej(e, t, n, i, a, o) {
                        var s, r;
                        if ('object' == typeof t) {
                            for (r in ('string' != typeof n && ((i = i || n), (n = void 0)), t))
                                ej(e, r, n, i, t[r], o);
                            return e;
                        }
                        if (
                            (null == i && null == a
                                ? ((a = n), (i = n = void 0))
                                : null == a &&
                                  ('string' == typeof n ? ((a = i), (i = void 0)) : ((a = i), (i = n), (n = void 0))),
                            !1 === a)
                        )
                            a = eI;
                        else if (!a) return e;
                        return (
                            1 === o &&
                                ((s = a),
                                ((a = function (e) {
                                    return P().off(e), s.apply(this, arguments);
                                }).guid = s.guid || (s.guid = P.guid++))),
                            e.each(function () {
                                P.event.add(this, t, a, i, n);
                            })
                        );
                    }
                    function eG(e, t, n) {
                        if (!n) {
                            void 0 === es.get(e, t) && P.event.add(e, t, eT);
                            return;
                        }
                        es.set(e, t, !1),
                            P.event.add(e, t, {
                                namespace: !1,
                                handler: function (e) {
                                    var n,
                                        i = es.get(this, t);
                                    if (1 & e.isTrigger && this[t]) {
                                        if (i) (P.event.special[t] || {}).delegateType && e.stopPropagation();
                                        else if (
                                            ((i = c.call(arguments)),
                                            es.set(this, t, i),
                                            this[t](),
                                            (n = es.get(this, t)),
                                            es.set(this, t, !1),
                                            i !== n)
                                        )
                                            return e.stopImmediatePropagation(), e.preventDefault(), n;
                                    } else
                                        i &&
                                            (es.set(this, t, P.event.trigger(i[0], i.slice(1), this)),
                                            e.stopPropagation(),
                                            (e.isImmediatePropagationStopped = eT));
                                },
                            });
                    }
                    (P.event = {
                        global: {},
                        add: function (e, t, n, i, a) {
                            var o,
                                s,
                                r,
                                c,
                                l,
                                u,
                                d,
                                p,
                                m,
                                h,
                                f,
                                g = es.get(e);
                            if (ea(e))
                                for (
                                    n.handler && ((n = (o = n).handler), (a = o.selector)),
                                        a && P.find.matchesSelector(eh, a),
                                        n.guid || (n.guid = P.guid++),
                                        (c = g.events) || (c = g.events = Object.create(null)),
                                        (s = g.handle) ||
                                            (s = g.handle =
                                                function (t) {
                                                    return P.event.triggered !== t.type
                                                        ? P.event.dispatch.apply(e, arguments)
                                                        : void 0;
                                                }),
                                        l = (t = (t || '').match($) || ['']).length;
                                    l--;

                                )
                                    (m = f = (r = eE.exec(t[l]) || [])[1]),
                                        (h = (r[2] || '').split('.').sort()),
                                        m &&
                                            ((d = P.event.special[m] || {}),
                                            (m = (a ? d.delegateType : d.bindType) || m),
                                            (d = P.event.special[m] || {}),
                                            (u = P.extend(
                                                {
                                                    type: m,
                                                    origType: f,
                                                    data: i,
                                                    handler: n,
                                                    guid: n.guid,
                                                    selector: a,
                                                    needsContext: a && P.expr.match.needsContext.test(a),
                                                    namespace: h.join('.'),
                                                },
                                                o
                                            )),
                                            (p = c[m]) ||
                                                (((p = c[m] = []).delegateCount = 0),
                                                (!d.setup || !1 === d.setup.call(e, i, h, s)) &&
                                                    e.addEventListener &&
                                                    e.addEventListener(m, s)),
                                            d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)),
                                            a ? p.splice(p.delegateCount++, 0, u) : p.push(u),
                                            (P.event.global[m] = !0));
                        },
                        remove: function (e, t, n, i, a) {
                            var o,
                                s,
                                r,
                                c,
                                l,
                                u,
                                d,
                                p,
                                m,
                                h,
                                f,
                                g = es.hasData(e) && es.get(e);
                            if (g && (c = g.events)) {
                                for (l = (t = (t || '').match($) || ['']).length; l--; ) {
                                    if (
                                        ((m = f = (r = eE.exec(t[l]) || [])[1]),
                                        (h = (r[2] || '').split('.').sort()),
                                        !m)
                                    ) {
                                        for (m in c) P.event.remove(e, m + t[l], n, i, !0);
                                        continue;
                                    }
                                    for (
                                        d = P.event.special[m] || {},
                                            p = c[(m = (i ? d.delegateType : d.bindType) || m)] || [],
                                            r = r[2] && RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                                            s = o = p.length;
                                        o--;

                                    )
                                        (u = p[o]),
                                            (a || f === u.origType) &&
                                                (!n || n.guid === u.guid) &&
                                                (!r || r.test(u.namespace)) &&
                                                (!i || i === u.selector || ('**' === i && u.selector)) &&
                                                (p.splice(o, 1),
                                                u.selector && p.delegateCount--,
                                                d.remove && d.remove.call(e, u));
                                    s &&
                                        !p.length &&
                                        ((d.teardown && !1 !== d.teardown.call(e, h, g.handle)) ||
                                            P.removeEvent(e, m, g.handle),
                                        delete c[m]);
                                }
                                P.isEmptyObject(c) && es.remove(e, 'handle events');
                            }
                        },
                        dispatch: function (e) {
                            var t,
                                n,
                                i,
                                a,
                                o,
                                s,
                                r = Array(arguments.length),
                                c = P.event.fix(e),
                                l = (es.get(this, 'events') || Object.create(null))[c.type] || [],
                                u = P.event.special[c.type] || {};
                            for (t = 1, r[0] = c; t < arguments.length; t++) r[t] = arguments[t];
                            if (((c.delegateTarget = this), !u.preDispatch || !1 !== u.preDispatch.call(this, c))) {
                                for (
                                    s = P.event.handlers.call(this, c, l), t = 0;
                                    (a = s[t++]) && !c.isPropagationStopped();

                                )
                                    for (
                                        c.currentTarget = a.elem, n = 0;
                                        (o = a.handlers[n++]) && !c.isImmediatePropagationStopped();

                                    )
                                        (!c.rnamespace || !1 === o.namespace || c.rnamespace.test(o.namespace)) &&
                                            ((c.handleObj = o),
                                            (c.data = o.data),
                                            void 0 !==
                                                (i = ((P.event.special[o.origType] || {}).handle || o.handler).apply(
                                                    a.elem,
                                                    r
                                                )) &&
                                                !1 === (c.result = i) &&
                                                (c.preventDefault(), c.stopPropagation()));
                                return u.postDispatch && u.postDispatch.call(this, c), c.result;
                            }
                        },
                        handlers: function (e, t) {
                            var n,
                                i,
                                a,
                                o,
                                s,
                                r = [],
                                c = t.delegateCount,
                                l = e.target;
                            if (c && l.nodeType && !('click' === e.type && e.button >= 1)) {
                                for (; l !== this; l = l.parentNode || this)
                                    if (1 === l.nodeType && !('click' === e.type && !0 === l.disabled)) {
                                        for (n = 0, o = [], s = {}; n < c; n++)
                                            void 0 === s[(a = (i = t[n]).selector + ' ')] &&
                                                (s[a] = i.needsContext
                                                    ? P(a, this).index(l) > -1
                                                    : P.find(a, this, null, [l]).length),
                                                s[a] && o.push(i);
                                        o.length && r.push({ elem: l, handlers: o });
                                    }
                            }
                            return (l = this), c < t.length && r.push({ elem: l, handlers: t.slice(c) }), r;
                        },
                        addProp: function (e, t) {
                            Object.defineProperty(P.Event.prototype, e, {
                                enumerable: !0,
                                configurable: !0,
                                get: b(t)
                                    ? function () {
                                          if (this.originalEvent) return t(this.originalEvent);
                                      }
                                    : function () {
                                          if (this.originalEvent) return this.originalEvent[e];
                                      },
                                set: function (t) {
                                    Object.defineProperty(this, e, {
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: t,
                                    });
                                },
                            });
                        },
                        fix: function (e) {
                            return e[P.expando] ? e : new P.Event(e);
                        },
                        special: {
                            load: { noBubble: !0 },
                            click: {
                                setup: function (e) {
                                    var t = this || e;
                                    return eS.test(t.type) && t.click && M(t, 'input') && eG(t, 'click', !0), !1;
                                },
                                trigger: function (e) {
                                    var t = this || e;
                                    return eS.test(t.type) && t.click && M(t, 'input') && eG(t, 'click'), !0;
                                },
                                _default: function (e) {
                                    var t = e.target;
                                    return (
                                        (eS.test(t.type) && t.click && M(t, 'input') && es.get(t, 'click')) || M(t, 'a')
                                    );
                                },
                            },
                            beforeunload: {
                                postDispatch: function (e) {
                                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                                },
                            },
                        },
                    }),
                        (P.removeEvent = function (e, t, n) {
                            e.removeEventListener && e.removeEventListener(t, n);
                        }),
                        (P.Event = function (e, t) {
                            if (!(this instanceof P.Event)) return new P.Event(e, t);
                            e && e.type
                                ? ((this.originalEvent = e),
                                  (this.type = e.type),
                                  (this.isDefaultPrevented =
                                      e.defaultPrevented || (void 0 === e.defaultPrevented && !1 === e.returnValue)
                                          ? eT
                                          : eI),
                                  (this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target),
                                  (this.currentTarget = e.currentTarget),
                                  (this.relatedTarget = e.relatedTarget))
                                : (this.type = e),
                                t && P.extend(this, t),
                                (this.timeStamp = (e && e.timeStamp) || Date.now()),
                                (this[P.expando] = !0);
                        }),
                        (P.Event.prototype = {
                            constructor: P.Event,
                            isDefaultPrevented: eI,
                            isPropagationStopped: eI,
                            isImmediatePropagationStopped: eI,
                            isSimulated: !1,
                            preventDefault: function () {
                                var e = this.originalEvent;
                                (this.isDefaultPrevented = eT), e && !this.isSimulated && e.preventDefault();
                            },
                            stopPropagation: function () {
                                var e = this.originalEvent;
                                (this.isPropagationStopped = eT), e && !this.isSimulated && e.stopPropagation();
                            },
                            stopImmediatePropagation: function () {
                                var e = this.originalEvent;
                                (this.isImmediatePropagationStopped = eT),
                                    e && !this.isSimulated && e.stopImmediatePropagation(),
                                    this.stopPropagation();
                            },
                        }),
                        P.each(
                            {
                                altKey: !0,
                                bubbles: !0,
                                cancelable: !0,
                                changedTouches: !0,
                                ctrlKey: !0,
                                detail: !0,
                                eventPhase: !0,
                                metaKey: !0,
                                pageX: !0,
                                pageY: !0,
                                shiftKey: !0,
                                view: !0,
                                char: !0,
                                code: !0,
                                charCode: !0,
                                key: !0,
                                keyCode: !0,
                                button: !0,
                                buttons: !0,
                                clientX: !0,
                                clientY: !0,
                                offsetX: !0,
                                offsetY: !0,
                                pointerId: !0,
                                pointerType: !0,
                                screenX: !0,
                                screenY: !0,
                                targetTouches: !0,
                                toElement: !0,
                                touches: !0,
                                which: !0,
                            },
                            P.event.addProp
                        ),
                        P.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
                            function n(e) {
                                if (y.documentMode) {
                                    var n = es.get(this, 'handle'),
                                        i = P.event.fix(e);
                                    (i.type = 'focusin' === e.type ? 'focus' : 'blur'),
                                        (i.isSimulated = !0),
                                        n(e),
                                        i.target === i.currentTarget && n(i);
                                } else P.event.simulate(t, e.target, P.event.fix(e));
                            }
                            (P.event.special[e] = {
                                setup: function () {
                                    var i;
                                    if ((eG(this, e, !0), !y.documentMode)) return !1;
                                    (i = es.get(this, t)) || this.addEventListener(t, n), es.set(this, t, (i || 0) + 1);
                                },
                                trigger: function () {
                                    return eG(this, e), !0;
                                },
                                teardown: function () {
                                    var e;
                                    if (!y.documentMode) return !1;
                                    (e = es.get(this, t) - 1)
                                        ? es.set(this, t, e)
                                        : (this.removeEventListener(t, n), es.remove(this, t));
                                },
                                _default: function (t) {
                                    return es.get(t.target, e);
                                },
                                delegateType: t,
                            }),
                                (P.event.special[t] = {
                                    setup: function () {
                                        var i = this.ownerDocument || this.document || this,
                                            a = y.documentMode ? this : i,
                                            o = es.get(a, t);
                                        o ||
                                            (y.documentMode
                                                ? this.addEventListener(t, n)
                                                : i.addEventListener(e, n, !0)),
                                            es.set(a, t, (o || 0) + 1);
                                    },
                                    teardown: function () {
                                        var i = this.ownerDocument || this.document || this,
                                            a = y.documentMode ? this : i,
                                            o = es.get(a, t) - 1;
                                        o
                                            ? es.set(a, t, o)
                                            : (y.documentMode
                                                  ? this.removeEventListener(t, n)
                                                  : i.removeEventListener(e, n, !0),
                                              es.remove(a, t));
                                    },
                                });
                        }),
                        P.each(
                            {
                                mouseenter: 'mouseover',
                                mouseleave: 'mouseout',
                                pointerenter: 'pointerover',
                                pointerleave: 'pointerout',
                            },
                            function (e, t) {
                                P.event.special[e] = {
                                    delegateType: t,
                                    bindType: t,
                                    handle: function (e) {
                                        var n,
                                            i = e.relatedTarget,
                                            a = e.handleObj;
                                        return (
                                            (i && (i === this || P.contains(this, i))) ||
                                                ((e.type = a.origType),
                                                (n = a.handler.apply(this, arguments)),
                                                (e.type = t)),
                                            n
                                        );
                                    },
                                };
                            }
                        ),
                        P.fn.extend({
                            on: function (e, t, n, i) {
                                return ej(this, e, t, n, i);
                            },
                            one: function (e, t, n, i) {
                                return ej(this, e, t, n, i, 1);
                            },
                            off: function (e, t, n) {
                                var i, a;
                                if (e && e.preventDefault && e.handleObj)
                                    return (
                                        (i = e.handleObj),
                                        P(e.delegateTarget).off(
                                            i.namespace ? i.origType + '.' + i.namespace : i.origType,
                                            i.selector,
                                            i.handler
                                        ),
                                        this
                                    );
                                if ('object' == typeof e) {
                                    for (a in e) this.off(a, t, e[a]);
                                    return this;
                                }
                                return (
                                    (!1 === t || 'function' == typeof t) && ((n = t), (t = void 0)),
                                    !1 === n && (n = eI),
                                    this.each(function () {
                                        P.event.remove(this, e, n, t);
                                    })
                                );
                            },
                        });
                    var eN = /<script|<style|<link/i,
                        eB = /checked\s*(?:[^=]|=\s*.checked.)/i,
                        eO = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
                    function eL(e, t) {
                        return (
                            (M(e, 'table') &&
                                M(11 !== t.nodeType ? t : t.firstChild, 'tr') &&
                                P(e).children('tbody')[0]) ||
                            e
                        );
                    }
                    function eD(e) {
                        return (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e;
                    }
                    function ez(e) {
                        return (
                            'true/' === (e.type || '').slice(0, 5)
                                ? (e.type = e.type.slice(5))
                                : e.removeAttribute('type'),
                            e
                        );
                    }
                    function eR(e, t) {
                        var n, i, a, o, s, r;
                        if (1 === t.nodeType) {
                            if (es.hasData(e) && (r = es.get(e).events))
                                for (a in (es.remove(t, 'handle events'), r))
                                    for (n = 0, i = r[a].length; n < i; n++) P.event.add(t, a, r[a][n]);
                            er.hasData(e) && ((o = er.access(e)), (s = P.extend({}, o)), er.set(t, s));
                        }
                    }
                    function eU(e, t, n, i) {
                        t = l(t);
                        var a,
                            o,
                            s,
                            r,
                            c,
                            u,
                            d = 0,
                            p = e.length,
                            m = p - 1,
                            h = t[0],
                            f = b(h);
                        if (f || (p > 1 && 'string' == typeof h && !v.checkClone && eB.test(h)))
                            return e.each(function (a) {
                                var o = e.eq(a);
                                f && (t[0] = h.call(this, a, o.html())), eU(o, t, n, i);
                            });
                        if (
                            p &&
                            ((o = (a = eM(t, e[0].ownerDocument, !1, e, i)).firstChild),
                            1 === a.childNodes.length && (a = o),
                            o || i)
                        ) {
                            for (r = (s = P.map(e_(a, 'script'), eD)).length; d < p; d++)
                                (c = a),
                                    d !== m && ((c = P.clone(c, !0, !0)), r && P.merge(s, e_(c, 'script'))),
                                    n.call(e[d], c, d);
                            if (r)
                                for (u = s[s.length - 1].ownerDocument, P.map(s, ez), d = 0; d < r; d++)
                                    (c = s[d]),
                                        eA.test(c.type || '') &&
                                            !es.access(c, 'globalEval') &&
                                            P.contains(u, c) &&
                                            (c.src && 'module' !== (c.type || '').toLowerCase()
                                                ? P._evalUrl &&
                                                  !c.noModule &&
                                                  P._evalUrl(c.src, { nonce: c.nonce || c.getAttribute('nonce') }, u)
                                                : w(c.textContent.replace(eO, ''), c, u));
                        }
                        return e;
                    }
                    function eq(e, t, n) {
                        for (var i, a = t ? P.filter(t, e) : e, o = 0; null != (i = a[o]); o++)
                            n || 1 !== i.nodeType || P.cleanData(e_(i)),
                                i.parentNode && (n && ef(i) && eP(e_(i, 'script')), i.parentNode.removeChild(i));
                        return e;
                    }
                    P.extend({
                        htmlPrefilter: function (e) {
                            return e;
                        },
                        clone: function (e, t, n) {
                            var i,
                                a,
                                o,
                                s,
                                r = e.cloneNode(!0),
                                c = ef(e);
                            if (!v.noCloneChecked && (1 === e.nodeType || 11 === e.nodeType) && !P.isXMLDoc(e))
                                for (i = 0, s = e_(r), a = (o = e_(e)).length; i < a; i++)
                                    !(function (e, t) {
                                        var n = t.nodeName.toLowerCase();
                                        'input' === n && eS.test(e.type)
                                            ? (t.checked = e.checked)
                                            : ('input' === n || 'textarea' === n) && (t.defaultValue = e.defaultValue);
                                    })(o[i], s[i]);
                            if (t) {
                                if (n)
                                    for (i = 0, o = o || e_(e), s = s || e_(r), a = o.length; i < a; i++)
                                        eR(o[i], s[i]);
                                else eR(e, r);
                            }
                            return (s = e_(r, 'script')).length > 0 && eP(s, !c && e_(e, 'script')), r;
                        },
                        cleanData: function (e) {
                            for (var t, n, i, a = P.event.special, o = 0; void 0 !== (n = e[o]); o++)
                                if (ea(n)) {
                                    if ((t = n[es.expando])) {
                                        if (t.events)
                                            for (i in t.events)
                                                a[i] ? P.event.remove(n, i) : P.removeEvent(n, i, t.handle);
                                        n[es.expando] = void 0;
                                    }
                                    n[er.expando] && (n[er.expando] = void 0);
                                }
                        },
                    }),
                        P.fn.extend({
                            detach: function (e) {
                                return eq(this, e, !0);
                            },
                            remove: function (e) {
                                return eq(this, e);
                            },
                            text: function (e) {
                                return J(
                                    this,
                                    function (e) {
                                        return void 0 === e
                                            ? P.text(this)
                                            : this.empty().each(function () {
                                                  (1 === this.nodeType ||
                                                      11 === this.nodeType ||
                                                      9 === this.nodeType) &&
                                                      (this.textContent = e);
                                              });
                                    },
                                    null,
                                    e,
                                    arguments.length
                                );
                            },
                            append: function () {
                                return eU(this, arguments, function (e) {
                                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) &&
                                        eL(this, e).appendChild(e);
                                });
                            },
                            prepend: function () {
                                return eU(this, arguments, function (e) {
                                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                        var t = eL(this, e);
                                        t.insertBefore(e, t.firstChild);
                                    }
                                });
                            },
                            before: function () {
                                return eU(this, arguments, function (e) {
                                    this.parentNode && this.parentNode.insertBefore(e, this);
                                });
                            },
                            after: function () {
                                return eU(this, arguments, function (e) {
                                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                                });
                            },
                            empty: function () {
                                for (var e, t = 0; null != (e = this[t]); t++)
                                    1 === e.nodeType && (P.cleanData(e_(e, !1)), (e.textContent = ''));
                                return this;
                            },
                            clone: function (e, t) {
                                return (
                                    (e = null != e && e),
                                    (t = null == t ? e : t),
                                    this.map(function () {
                                        return P.clone(this, e, t);
                                    })
                                );
                            },
                            html: function (e) {
                                return J(
                                    this,
                                    function (e) {
                                        var t = this[0] || {},
                                            n = 0,
                                            i = this.length;
                                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                                        if (
                                            'string' == typeof e &&
                                            !eN.test(e) &&
                                            !eC[(ew.exec(e) || ['', ''])[1].toLowerCase()]
                                        ) {
                                            e = P.htmlPrefilter(e);
                                            try {
                                                for (; n < i; n++)
                                                    (t = this[n] || {}),
                                                        1 === t.nodeType && (P.cleanData(e_(t, !1)), (t.innerHTML = e));
                                                t = 0;
                                            } catch (e) {}
                                        }
                                        t && this.empty().append(e);
                                    },
                                    null,
                                    e,
                                    arguments.length
                                );
                            },
                            replaceWith: function () {
                                var e = [];
                                return eU(
                                    this,
                                    arguments,
                                    function (t) {
                                        var n = this.parentNode;
                                        0 > P.inArray(this, e) && (P.cleanData(e_(this)), n && n.replaceChild(t, this));
                                    },
                                    e
                                );
                            },
                        }),
                        P.each(
                            {
                                appendTo: 'append',
                                prependTo: 'prepend',
                                insertBefore: 'before',
                                insertAfter: 'after',
                                replaceAll: 'replaceWith',
                            },
                            function (e, t) {
                                P.fn[e] = function (e) {
                                    for (var n, i = [], a = P(e), o = a.length - 1, s = 0; s <= o; s++)
                                        (n = s === o ? this : this.clone(!0)), P(a[s])[t](n), u.apply(i, n.get());
                                    return this.pushStack(i);
                                };
                            }
                        );
                    var eH = RegExp('^(' + ed + ')(?!px)[a-z%]+$', 'i'),
                        eW = /^--/,
                        eF = function (e) {
                            var t = e.ownerDocument.defaultView;
                            return (t && t.opener) || (t = i), t.getComputedStyle(e);
                        },
                        e$ = function (e, t, n) {
                            var i,
                                a,
                                o = {};
                            for (a in t) (o[a] = e.style[a]), (e.style[a] = t[a]);
                            for (a in ((i = n.call(e)), t)) e.style[a] = o[a];
                            return i;
                        },
                        eV = RegExp(em.join('|'), 'i');
                    function eK(e, t, n) {
                        var i,
                            a,
                            o,
                            s,
                            r = eW.test(t),
                            c = e.style;
                        return (
                            (n = n || eF(e)) &&
                                ((s = n.getPropertyValue(t) || n[t]),
                                r && s && (s = s.replace(G, '$1') || void 0),
                                '' !== s || ef(e) || (s = P.style(e, t)),
                                !v.pixelBoxStyles() &&
                                    eH.test(s) &&
                                    eV.test(t) &&
                                    ((i = c.width),
                                    (a = c.minWidth),
                                    (o = c.maxWidth),
                                    (c.minWidth = c.maxWidth = c.width = s),
                                    (s = n.width),
                                    (c.width = i),
                                    (c.minWidth = a),
                                    (c.maxWidth = o))),
                            void 0 !== s ? s + '' : s
                        );
                    }
                    function eQ(e, t) {
                        return {
                            get: function () {
                                if (e()) {
                                    delete this.get;
                                    return;
                                }
                                return (this.get = t).apply(this, arguments);
                            },
                        };
                    }
                    !(function () {
                        function e() {
                            if (u) {
                                (l.style.cssText =
                                    'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                                    (u.style.cssText =
                                        'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                                    eh.appendChild(l).appendChild(u);
                                var e = i.getComputedStyle(u);
                                (n = '1%' !== e.top),
                                    (c = 12 === t(e.marginLeft)),
                                    (u.style.right = '60%'),
                                    (s = 36 === t(e.right)),
                                    (a = 36 === t(e.width)),
                                    (u.style.position = 'absolute'),
                                    (o = 12 === t(u.offsetWidth / 3)),
                                    eh.removeChild(l),
                                    (u = null);
                            }
                        }
                        function t(e) {
                            return Math.round(parseFloat(e));
                        }
                        var n,
                            a,
                            o,
                            s,
                            r,
                            c,
                            l = y.createElement('div'),
                            u = y.createElement('div');
                        u.style &&
                            ((u.style.backgroundClip = 'content-box'),
                            (u.cloneNode(!0).style.backgroundClip = ''),
                            (v.clearCloneStyle = 'content-box' === u.style.backgroundClip),
                            P.extend(v, {
                                boxSizingReliable: function () {
                                    return e(), a;
                                },
                                pixelBoxStyles: function () {
                                    return e(), s;
                                },
                                pixelPosition: function () {
                                    return e(), n;
                                },
                                reliableMarginLeft: function () {
                                    return e(), c;
                                },
                                scrollboxSize: function () {
                                    return e(), o;
                                },
                                reliableTrDimensions: function () {
                                    var e, t, n, a;
                                    return (
                                        null == r &&
                                            ((e = y.createElement('table')),
                                            (t = y.createElement('tr')),
                                            (n = y.createElement('div')),
                                            (e.style.cssText =
                                                'position:absolute;left:-11111px;border-collapse:separate'),
                                            (t.style.cssText = 'box-sizing:content-box;border:1px solid'),
                                            (t.style.height = '1px'),
                                            (n.style.height = '9px'),
                                            (n.style.display = 'block'),
                                            eh.appendChild(e).appendChild(t).appendChild(n),
                                            (a = i.getComputedStyle(t)),
                                            (r =
                                                parseInt(a.height, 10) +
                                                    parseInt(a.borderTopWidth, 10) +
                                                    parseInt(a.borderBottomWidth, 10) ===
                                                t.offsetHeight),
                                            eh.removeChild(e)),
                                        r
                                    );
                                },
                            }));
                    })();
                    var eX = ['Webkit', 'Moz', 'ms'],
                        eY = y.createElement('div').style,
                        eZ = {};
                    function eJ(e) {
                        return (
                            P.cssProps[e] ||
                            eZ[e] ||
                            (e in eY
                                ? e
                                : (eZ[e] =
                                      (function (e) {
                                          for (var t = e[0].toUpperCase() + e.slice(1), n = eX.length; n--; )
                                              if ((e = eX[n] + t) in eY) return e;
                                      })(e) || e))
                        );
                    }
                    var e0 = /^(none|table(?!-c[ea]).+)/,
                        e1 = { position: 'absolute', visibility: 'hidden', display: 'block' },
                        e2 = { letterSpacing: '0', fontWeight: '400' };
                    function e9(e, t, n) {
                        var i = ep.exec(t);
                        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || 'px') : t;
                    }
                    function e4(e, t, n, i, a, o) {
                        var s = 'width' === t ? 1 : 0,
                            r = 0,
                            c = 0,
                            l = 0;
                        if (n === (i ? 'border' : 'content')) return 0;
                        for (; s < 4; s += 2)
                            'margin' === n && (l += P.css(e, n + em[s], !0, a)),
                                i
                                    ? ('content' === n && (c -= P.css(e, 'padding' + em[s], !0, a)),
                                      'margin' !== n && (c -= P.css(e, 'border' + em[s] + 'Width', !0, a)))
                                    : ((c += P.css(e, 'padding' + em[s], !0, a)),
                                      'padding' !== n
                                          ? (c += P.css(e, 'border' + em[s] + 'Width', !0, a))
                                          : (r += P.css(e, 'border' + em[s] + 'Width', !0, a)));
                        return (
                            !i &&
                                o >= 0 &&
                                (c +=
                                    Math.max(
                                        0,
                                        Math.ceil(e['offset' + t[0].toUpperCase() + t.slice(1)] - o - c - r - 0.5)
                                    ) || 0),
                            c + l
                        );
                    }
                    function e3(e, t, n) {
                        var i = eF(e),
                            a = (!v.boxSizingReliable() || n) && 'border-box' === P.css(e, 'boxSizing', !1, i),
                            o = a,
                            s = eK(e, t, i),
                            r = 'offset' + t[0].toUpperCase() + t.slice(1);
                        if (eH.test(s)) {
                            if (!n) return s;
                            s = 'auto';
                        }
                        return (
                            ((!v.boxSizingReliable() && a) ||
                                (!v.reliableTrDimensions() && M(e, 'tr')) ||
                                'auto' === s ||
                                (!parseFloat(s) && 'inline' === P.css(e, 'display', !1, i))) &&
                                e.getClientRects().length &&
                                ((a = 'border-box' === P.css(e, 'boxSizing', !1, i)), (o = r in e) && (s = e[r])),
                            (s = parseFloat(s) || 0) + e4(e, t, n || (a ? 'border' : 'content'), o, i, s) + 'px'
                        );
                    }
                    function e5(e, t, n, i, a) {
                        return new e5.prototype.init(e, t, n, i, a);
                    }
                    P.extend({
                        cssHooks: {
                            opacity: {
                                get: function (e, t) {
                                    if (t) {
                                        var n = eK(e, 'opacity');
                                        return '' === n ? '1' : n;
                                    }
                                },
                            },
                        },
                        cssNumber: {
                            animationIterationCount: !0,
                            aspectRatio: !0,
                            borderImageSlice: !0,
                            columnCount: !0,
                            flexGrow: !0,
                            flexShrink: !0,
                            fontWeight: !0,
                            gridArea: !0,
                            gridColumn: !0,
                            gridColumnEnd: !0,
                            gridColumnStart: !0,
                            gridRow: !0,
                            gridRowEnd: !0,
                            gridRowStart: !0,
                            lineHeight: !0,
                            opacity: !0,
                            order: !0,
                            orphans: !0,
                            scale: !0,
                            widows: !0,
                            zIndex: !0,
                            zoom: !0,
                            fillOpacity: !0,
                            floodOpacity: !0,
                            stopOpacity: !0,
                            strokeMiterlimit: !0,
                            strokeOpacity: !0,
                        },
                        cssProps: {},
                        style: function (e, t, n, i) {
                            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                                var a,
                                    o,
                                    s,
                                    r = ei(t),
                                    c = eW.test(t),
                                    l = e.style;
                                if ((c || (t = eJ(r)), (s = P.cssHooks[t] || P.cssHooks[r]), void 0 === n))
                                    return s && 'get' in s && void 0 !== (a = s.get(e, !1, i)) ? a : l[t];
                                'string' == (o = typeof n) &&
                                    (a = ep.exec(n)) &&
                                    a[1] &&
                                    ((n = eb(e, t, a)), (o = 'number')),
                                    null != n &&
                                        n == n &&
                                        ('number' !== o || c || (n += (a && a[3]) || (P.cssNumber[r] ? '' : 'px')),
                                        v.clearCloneStyle ||
                                            '' !== n ||
                                            0 !== t.indexOf('background') ||
                                            (l[t] = 'inherit'),
                                        (s && 'set' in s && void 0 === (n = s.set(e, n, i))) ||
                                            (c ? l.setProperty(t, n) : (l[t] = n)));
                            }
                        },
                        css: function (e, t, n, i) {
                            var a,
                                o,
                                s,
                                r = ei(t);
                            return (eW.test(t) || (t = eJ(r)),
                            (s = P.cssHooks[t] || P.cssHooks[r]) && 'get' in s && (a = s.get(e, !0, n)),
                            void 0 === a && (a = eK(e, t, i)),
                            'normal' === a && t in e2 && (a = e2[t]),
                            '' === n || n)
                                ? ((o = parseFloat(a)), !0 === n || isFinite(o) ? o || 0 : a)
                                : a;
                        },
                    }),
                        P.each(['height', 'width'], function (e, t) {
                            P.cssHooks[t] = {
                                get: function (e, n, i) {
                                    if (n)
                                        return !e0.test(P.css(e, 'display')) ||
                                            (e.getClientRects().length && e.getBoundingClientRect().width)
                                            ? e3(e, t, i)
                                            : e$(e, e1, function () {
                                                  return e3(e, t, i);
                                              });
                                },
                                set: function (e, n, i) {
                                    var a,
                                        o = eF(e),
                                        s = !v.scrollboxSize() && 'absolute' === o.position,
                                        r = (s || i) && 'border-box' === P.css(e, 'boxSizing', !1, o),
                                        c = i ? e4(e, t, i, r, o) : 0;
                                    return (
                                        r &&
                                            s &&
                                            (c -= Math.ceil(
                                                e['offset' + t[0].toUpperCase() + t.slice(1)] -
                                                    parseFloat(o[t]) -
                                                    e4(e, t, 'border', !1, o) -
                                                    0.5
                                            )),
                                        c &&
                                            (a = ep.exec(n)) &&
                                            'px' !== (a[3] || 'px') &&
                                            ((e.style[t] = n), (n = P.css(e, t))),
                                        e9(e, n, c)
                                    );
                                },
                            };
                        }),
                        (P.cssHooks.marginLeft = eQ(v.reliableMarginLeft, function (e, t) {
                            if (t)
                                return (
                                    (parseFloat(eK(e, 'marginLeft')) ||
                                        e.getBoundingClientRect().left -
                                            e$(e, { marginLeft: 0 }, function () {
                                                return e.getBoundingClientRect().left;
                                            })) + 'px'
                                );
                        })),
                        P.each({ margin: '', padding: '', border: 'Width' }, function (e, t) {
                            (P.cssHooks[e + t] = {
                                expand: function (n) {
                                    for (var i = 0, a = {}, o = 'string' == typeof n ? n.split(' ') : [n]; i < 4; i++)
                                        a[e + em[i] + t] = o[i] || o[i - 2] || o[0];
                                    return a;
                                },
                            }),
                                'margin' !== e && (P.cssHooks[e + t].set = e9);
                        }),
                        P.fn.extend({
                            css: function (e, t) {
                                return J(
                                    this,
                                    function (e, t, n) {
                                        var i,
                                            a,
                                            o = {},
                                            s = 0;
                                        if (Array.isArray(t)) {
                                            for (i = eF(e), a = t.length; s < a; s++) o[t[s]] = P.css(e, t[s], !1, i);
                                            return o;
                                        }
                                        return void 0 !== n ? P.style(e, t, n) : P.css(e, t);
                                    },
                                    e,
                                    t,
                                    arguments.length > 1
                                );
                            },
                        }),
                        (P.Tween = e5),
                        (e5.prototype = {
                            constructor: e5,
                            init: function (e, t, n, i, a, o) {
                                (this.elem = e),
                                    (this.prop = n),
                                    (this.easing = a || P.easing._default),
                                    (this.options = t),
                                    (this.start = this.now = this.cur()),
                                    (this.end = i),
                                    (this.unit = o || (P.cssNumber[n] ? '' : 'px'));
                            },
                            cur: function () {
                                var e = e5.propHooks[this.prop];
                                return e && e.get ? e.get(this) : e5.propHooks._default.get(this);
                            },
                            run: function (e) {
                                var t,
                                    n = e5.propHooks[this.prop];
                                return (
                                    this.options.duration
                                        ? (this.pos = t =
                                              P.easing[this.easing](
                                                  e,
                                                  this.options.duration * e,
                                                  0,
                                                  1,
                                                  this.options.duration
                                              ))
                                        : (this.pos = t = e),
                                    (this.now = (this.end - this.start) * t + this.start),
                                    this.options.step && this.options.step.call(this.elem, this.now, this),
                                    n && n.set ? n.set(this) : e5.propHooks._default.set(this),
                                    this
                                );
                            },
                        }),
                        (e5.prototype.init.prototype = e5.prototype),
                        (e5.propHooks = {
                            _default: {
                                get: function (e) {
                                    var t;
                                    return 1 !== e.elem.nodeType ||
                                        (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                                        ? e.elem[e.prop]
                                        : (t = P.css(e.elem, e.prop, '')) && 'auto' !== t
                                          ? t
                                          : 0;
                                },
                                set: function (e) {
                                    P.fx.step[e.prop]
                                        ? P.fx.step[e.prop](e)
                                        : 1 === e.elem.nodeType &&
                                            (P.cssHooks[e.prop] || null != e.elem.style[eJ(e.prop)])
                                          ? P.style(e.elem, e.prop, e.now + e.unit)
                                          : (e.elem[e.prop] = e.now);
                                },
                            },
                        }),
                        (e5.propHooks.scrollTop = e5.propHooks.scrollLeft =
                            {
                                set: function (e) {
                                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                                },
                            }),
                        (P.easing = {
                            linear: function (e) {
                                return e;
                            },
                            swing: function (e) {
                                return 0.5 - Math.cos(e * Math.PI) / 2;
                            },
                            _default: 'swing',
                        }),
                        (P.fx = e5.prototype.init),
                        (P.fx.step = {});
                    var e7,
                        e8,
                        e6,
                        te,
                        tt = /^(?:toggle|show|hide)$/,
                        tn = /queueHooks$/;
                    function ti() {
                        return (
                            i.setTimeout(function () {
                                e6 = void 0;
                            }),
                            (e6 = Date.now())
                        );
                    }
                    function ta(e, t) {
                        var n,
                            i = 0,
                            a = { height: e };
                        for (t = t ? 1 : 0; i < 4; i += 2 - t) a['margin' + (n = em[i])] = a['padding' + n] = e;
                        return t && (a.opacity = a.width = e), a;
                    }
                    function to(e, t, n) {
                        for (
                            var i, a = (ts.tweeners[t] || []).concat(ts.tweeners['*']), o = 0, s = a.length;
                            o < s;
                            o++
                        )
                            if ((i = a[o].call(n, t, e))) return i;
                    }
                    function ts(e, t, n) {
                        var i,
                            a,
                            o = 0,
                            s = ts.prefilters.length,
                            r = P.Deferred().always(function () {
                                delete c.elem;
                            }),
                            c = function () {
                                if (a) return !1;
                                for (
                                    var t = e6 || ti(),
                                        n = Math.max(0, l.startTime + l.duration - t),
                                        i = 1 - (n / l.duration || 0),
                                        o = 0,
                                        s = l.tweens.length;
                                    o < s;
                                    o++
                                )
                                    l.tweens[o].run(i);
                                return (r.notifyWith(e, [l, i, n]), i < 1 && s)
                                    ? n
                                    : (s || r.notifyWith(e, [l, 1, 0]), r.resolveWith(e, [l]), !1);
                            },
                            l = r.promise({
                                elem: e,
                                props: P.extend({}, t),
                                opts: P.extend(!0, { specialEasing: {}, easing: P.easing._default }, n),
                                originalProperties: t,
                                originalOptions: n,
                                startTime: e6 || ti(),
                                duration: n.duration,
                                tweens: [],
                                createTween: function (t, n) {
                                    var i = P.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                                    return l.tweens.push(i), i;
                                },
                                stop: function (t) {
                                    var n = 0,
                                        i = t ? l.tweens.length : 0;
                                    if (a) return this;
                                    for (a = !0; n < i; n++) l.tweens[n].run(1);
                                    return (
                                        t
                                            ? (r.notifyWith(e, [l, 1, 0]), r.resolveWith(e, [l, t]))
                                            : r.rejectWith(e, [l, t]),
                                        this
                                    );
                                },
                            }),
                            u = l.props;
                        for (
                            (function (e, t) {
                                var n, i, a, o, s;
                                for (n in e)
                                    if (
                                        ((a = t[(i = ei(n))]),
                                        Array.isArray((o = e[n])) && ((a = o[1]), (o = e[n] = o[0])),
                                        n !== i && ((e[i] = o), delete e[n]),
                                        (s = P.cssHooks[i]) && ('expand' in s))
                                    )
                                        for (n in ((o = s.expand(o)), delete e[i], o))
                                            (n in e) || ((e[n] = o[n]), (t[n] = a));
                                    else t[i] = a;
                            })(u, l.opts.specialEasing);
                            o < s;
                            o++
                        )
                            if ((i = ts.prefilters[o].call(l, e, u, l.opts)))
                                return b(i.stop) && (P._queueHooks(l.elem, l.opts.queue).stop = i.stop.bind(i)), i;
                        return (
                            P.map(u, to, l),
                            b(l.opts.start) && l.opts.start.call(e, l),
                            l
                                .progress(l.opts.progress)
                                .done(l.opts.done, l.opts.complete)
                                .fail(l.opts.fail)
                                .always(l.opts.always),
                            P.fx.timer(P.extend(c, { elem: e, anim: l, queue: l.opts.queue })),
                            l
                        );
                    }
                    (P.Animation = P.extend(ts, {
                        tweeners: {
                            '*': [
                                function (e, t) {
                                    var n = this.createTween(e, t);
                                    return eb(n.elem, e, ep.exec(t), n), n;
                                },
                            ],
                        },
                        tweener: function (e, t) {
                            b(e) ? ((t = e), (e = ['*'])) : (e = e.match($));
                            for (var n, i = 0, a = e.length; i < a; i++)
                                (n = e[i]), (ts.tweeners[n] = ts.tweeners[n] || []), ts.tweeners[n].unshift(t);
                        },
                        prefilters: [
                            function (e, t, n) {
                                var i,
                                    a,
                                    o,
                                    s,
                                    r,
                                    c,
                                    l,
                                    u,
                                    d = 'width' in t || 'height' in t,
                                    p = this,
                                    m = {},
                                    h = e.style,
                                    f = e.nodeType && ev(e),
                                    g = es.get(e, 'fxshow');
                                for (i in (n.queue ||
                                    (null == (s = P._queueHooks(e, 'fx')).unqueued &&
                                        ((s.unqueued = 0),
                                        (r = s.empty.fire),
                                        (s.empty.fire = function () {
                                            s.unqueued || r();
                                        })),
                                    s.unqueued++,
                                    p.always(function () {
                                        p.always(function () {
                                            s.unqueued--, P.queue(e, 'fx').length || s.empty.fire();
                                        });
                                    })),
                                t))
                                    if (((a = t[i]), tt.test(a))) {
                                        if ((delete t[i], (o = o || 'toggle' === a), a === (f ? 'hide' : 'show'))) {
                                            if ('show' !== a || !g || void 0 === g[i]) continue;
                                            f = !0;
                                        }
                                        m[i] = (g && g[i]) || P.style(e, i);
                                    }
                                if (!(!(c = !P.isEmptyObject(t)) && P.isEmptyObject(m)))
                                    for (i in (d &&
                                        1 === e.nodeType &&
                                        ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                                        null == (l = g && g.display) && (l = es.get(e, 'display')),
                                        'none' === (u = P.css(e, 'display')) &&
                                            (l
                                                ? (u = l)
                                                : (ey([e], !0),
                                                  (l = e.style.display || l),
                                                  (u = P.css(e, 'display')),
                                                  ey([e]))),
                                        ('inline' === u || ('inline-block' === u && null != l)) &&
                                            'none' === P.css(e, 'float') &&
                                            (c ||
                                                (p.done(function () {
                                                    h.display = l;
                                                }),
                                                null != l || (l = 'none' === (u = h.display) ? '' : u)),
                                            (h.display = 'inline-block'))),
                                    n.overflow &&
                                        ((h.overflow = 'hidden'),
                                        p.always(function () {
                                            (h.overflow = n.overflow[0]),
                                                (h.overflowX = n.overflow[1]),
                                                (h.overflowY = n.overflow[2]);
                                        })),
                                    (c = !1),
                                    m))
                                        c ||
                                            (g
                                                ? 'hidden' in g && (f = g.hidden)
                                                : (g = es.access(e, 'fxshow', { display: l })),
                                            o && (g.hidden = !f),
                                            f && ey([e], !0),
                                            p.done(function () {
                                                for (i in (f || ey([e]), es.remove(e, 'fxshow'), m))
                                                    P.style(e, i, m[i]);
                                            })),
                                            (c = to(f ? g[i] : 0, i, p)),
                                            i in g || ((g[i] = c.start), f && ((c.end = c.start), (c.start = 0)));
                            },
                        ],
                        prefilter: function (e, t) {
                            t ? ts.prefilters.unshift(e) : ts.prefilters.push(e);
                        },
                    })),
                        (P.speed = function (e, t, n) {
                            var i =
                                e && 'object' == typeof e
                                    ? P.extend({}, e)
                                    : {
                                          complete: n || (!n && t) || (b(e) && e),
                                          duration: e,
                                          easing: (n && t) || (t && !b(t) && t),
                                      };
                            return (
                                P.fx.off
                                    ? (i.duration = 0)
                                    : 'number' != typeof i.duration &&
                                      (i.duration in P.fx.speeds
                                          ? (i.duration = P.fx.speeds[i.duration])
                                          : (i.duration = P.fx.speeds._default)),
                                (null == i.queue || !0 === i.queue) && (i.queue = 'fx'),
                                (i.old = i.complete),
                                (i.complete = function () {
                                    b(i.old) && i.old.call(this), i.queue && P.dequeue(this, i.queue);
                                }),
                                i
                            );
                        }),
                        P.fn.extend({
                            fadeTo: function (e, t, n, i) {
                                return this.filter(ev).css('opacity', 0).show().end().animate({ opacity: t }, e, n, i);
                            },
                            animate: function (e, t, n, i) {
                                var a = P.isEmptyObject(e),
                                    o = P.speed(t, n, i),
                                    s = function () {
                                        var t = ts(this, P.extend({}, e), o);
                                        (a || es.get(this, 'finish')) && t.stop(!0);
                                    };
                                return (s.finish = s), a || !1 === o.queue ? this.each(s) : this.queue(o.queue, s);
                            },
                            stop: function (e, t, n) {
                                var i = function (e) {
                                    var t = e.stop;
                                    delete e.stop, t(n);
                                };
                                return (
                                    'string' != typeof e && ((n = t), (t = e), (e = void 0)),
                                    t && this.queue(e || 'fx', []),
                                    this.each(function () {
                                        var t = !0,
                                            a = null != e && e + 'queueHooks',
                                            o = P.timers,
                                            s = es.get(this);
                                        if (a) s[a] && s[a].stop && i(s[a]);
                                        else for (a in s) s[a] && s[a].stop && tn.test(a) && i(s[a]);
                                        for (a = o.length; a--; )
                                            o[a].elem === this &&
                                                (null == e || o[a].queue === e) &&
                                                (o[a].anim.stop(n), (t = !1), o.splice(a, 1));
                                        (t || !n) && P.dequeue(this, e);
                                    })
                                );
                            },
                            finish: function (e) {
                                return (
                                    !1 !== e && (e = e || 'fx'),
                                    this.each(function () {
                                        var t,
                                            n = es.get(this),
                                            i = n[e + 'queue'],
                                            a = n[e + 'queueHooks'],
                                            o = P.timers,
                                            s = i ? i.length : 0;
                                        for (
                                            n.finish = !0,
                                                P.queue(this, e, []),
                                                a && a.stop && a.stop.call(this, !0),
                                                t = o.length;
                                            t--;

                                        )
                                            o[t].elem === this &&
                                                o[t].queue === e &&
                                                (o[t].anim.stop(!0), o.splice(t, 1));
                                        for (t = 0; t < s; t++) i[t] && i[t].finish && i[t].finish.call(this);
                                        delete n.finish;
                                    })
                                );
                            },
                        }),
                        P.each(['toggle', 'show', 'hide'], function (e, t) {
                            var n = P.fn[t];
                            P.fn[t] = function (e, i, a) {
                                return null == e || 'boolean' == typeof e
                                    ? n.apply(this, arguments)
                                    : this.animate(ta(t, !0), e, i, a);
                            };
                        }),
                        P.each(
                            {
                                slideDown: ta('show'),
                                slideUp: ta('hide'),
                                slideToggle: ta('toggle'),
                                fadeIn: { opacity: 'show' },
                                fadeOut: { opacity: 'hide' },
                                fadeToggle: { opacity: 'toggle' },
                            },
                            function (e, t) {
                                P.fn[e] = function (e, n, i) {
                                    return this.animate(t, e, n, i);
                                };
                            }
                        ),
                        (P.timers = []),
                        (P.fx.tick = function () {
                            var e,
                                t = 0,
                                n = P.timers;
                            for (e6 = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                            n.length || P.fx.stop(), (e6 = void 0);
                        }),
                        (P.fx.timer = function (e) {
                            P.timers.push(e), P.fx.start();
                        }),
                        (P.fx.interval = 13),
                        (P.fx.start = function () {
                            te ||
                                ((te = !0),
                                (function e() {
                                    te &&
                                        (!1 === y.hidden && i.requestAnimationFrame
                                            ? i.requestAnimationFrame(e)
                                            : i.setTimeout(e, P.fx.interval),
                                        P.fx.tick());
                                })());
                        }),
                        (P.fx.stop = function () {
                            te = null;
                        }),
                        (P.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
                        (P.fn.delay = function (e, t) {
                            return (
                                (e = (P.fx && P.fx.speeds[e]) || e),
                                (t = t || 'fx'),
                                this.queue(t, function (t, n) {
                                    var a = i.setTimeout(t, e);
                                    n.stop = function () {
                                        i.clearTimeout(a);
                                    };
                                })
                            );
                        }),
                        (tr = y.createElement('input')),
                        (tc = y.createElement('select').appendChild(y.createElement('option'))),
                        (tr.type = 'checkbox'),
                        (v.checkOn = '' !== tr.value),
                        (v.optSelected = tc.selected),
                        ((tr = y.createElement('input')).value = 't'),
                        (tr.type = 'radio'),
                        (v.radioValue = 't' === tr.value);
                    var tr,
                        tc,
                        tl,
                        tu = P.expr.attrHandle;
                    P.fn.extend({
                        attr: function (e, t) {
                            return J(this, P.attr, e, t, arguments.length > 1);
                        },
                        removeAttr: function (e) {
                            return this.each(function () {
                                P.removeAttr(this, e);
                            });
                        },
                    }),
                        P.extend({
                            attr: function (e, t, n) {
                                var i,
                                    a,
                                    o = e.nodeType;
                                if (3 !== o && 8 !== o && 2 !== o) {
                                    if (void 0 === e.getAttribute) return P.prop(e, t, n);
                                    if (
                                        ((1 === o && P.isXMLDoc(e)) ||
                                            (a =
                                                P.attrHooks[t.toLowerCase()] ||
                                                (P.expr.match.bool.test(t) ? tl : void 0)),
                                        void 0 !== n)
                                    ) {
                                        if (null === n) {
                                            P.removeAttr(e, t);
                                            return;
                                        }
                                        return a && 'set' in a && void 0 !== (i = a.set(e, n, t))
                                            ? i
                                            : (e.setAttribute(t, n + ''), n);
                                    }
                                    return a && 'get' in a && null !== (i = a.get(e, t))
                                        ? i
                                        : null == (i = P.find.attr(e, t))
                                          ? void 0
                                          : i;
                                }
                            },
                            attrHooks: {
                                type: {
                                    set: function (e, t) {
                                        if (!v.radioValue && 'radio' === t && M(e, 'input')) {
                                            var n = e.value;
                                            return e.setAttribute('type', t), n && (e.value = n), t;
                                        }
                                    },
                                },
                            },
                            removeAttr: function (e, t) {
                                var n,
                                    i = 0,
                                    a = t && t.match($);
                                if (a && 1 === e.nodeType) for (; (n = a[i++]); ) e.removeAttribute(n);
                            },
                        }),
                        (tl = {
                            set: function (e, t, n) {
                                return !1 === t ? P.removeAttr(e, n) : e.setAttribute(n, n), n;
                            },
                        }),
                        P.each(P.expr.match.bool.source.match(/\w+/g), function (e, t) {
                            var n = tu[t] || P.find.attr;
                            tu[t] = function (e, t, i) {
                                var a,
                                    o,
                                    s = t.toLowerCase();
                                return (
                                    i || ((o = tu[s]), (tu[s] = a), (a = null != n(e, t, i) ? s : null), (tu[s] = o)), a
                                );
                            };
                        });
                    var td = /^(?:input|select|textarea|button)$/i,
                        tp = /^(?:a|area)$/i;
                    function tm(e) {
                        return (e.match($) || []).join(' ');
                    }
                    function th(e) {
                        return (e.getAttribute && e.getAttribute('class')) || '';
                    }
                    function tf(e) {
                        return Array.isArray(e) ? e : ('string' == typeof e && e.match($)) || [];
                    }
                    P.fn.extend({
                        prop: function (e, t) {
                            return J(this, P.prop, e, t, arguments.length > 1);
                        },
                        removeProp: function (e) {
                            return this.each(function () {
                                delete this[P.propFix[e] || e];
                            });
                        },
                    }),
                        P.extend({
                            prop: function (e, t, n) {
                                var i,
                                    a,
                                    o = e.nodeType;
                                if (3 !== o && 8 !== o && 2 !== o)
                                    return ((1 === o && P.isXMLDoc(e)) ||
                                        ((t = P.propFix[t] || t), (a = P.propHooks[t])),
                                    void 0 !== n)
                                        ? a && 'set' in a && void 0 !== (i = a.set(e, n, t))
                                            ? i
                                            : (e[t] = n)
                                        : a && 'get' in a && null !== (i = a.get(e, t))
                                          ? i
                                          : e[t];
                            },
                            propHooks: {
                                tabIndex: {
                                    get: function (e) {
                                        var t = P.find.attr(e, 'tabindex');
                                        return t
                                            ? parseInt(t, 10)
                                            : td.test(e.nodeName) || (tp.test(e.nodeName) && e.href)
                                              ? 0
                                              : -1;
                                    },
                                },
                            },
                            propFix: { for: 'htmlFor', class: 'className' },
                        }),
                        v.optSelected ||
                            (P.propHooks.selected = {
                                get: function (e) {
                                    var t = e.parentNode;
                                    return t && t.parentNode && t.parentNode.selectedIndex, null;
                                },
                                set: function (e) {
                                    var t = e.parentNode;
                                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                                },
                            }),
                        P.each(
                            [
                                'tabIndex',
                                'readOnly',
                                'maxLength',
                                'cellSpacing',
                                'cellPadding',
                                'rowSpan',
                                'colSpan',
                                'useMap',
                                'frameBorder',
                                'contentEditable',
                            ],
                            function () {
                                P.propFix[this.toLowerCase()] = this;
                            }
                        ),
                        P.fn.extend({
                            addClass: function (e) {
                                var t, n, i, a, o, s;
                                return b(e)
                                    ? this.each(function (t) {
                                          P(this).addClass(e.call(this, t, th(this)));
                                      })
                                    : (t = tf(e)).length
                                      ? this.each(function () {
                                            if (((i = th(this)), (n = 1 === this.nodeType && ' ' + tm(i) + ' '))) {
                                                for (o = 0; o < t.length; o++)
                                                    (a = t[o]), 0 > n.indexOf(' ' + a + ' ') && (n += a + ' ');
                                                (s = tm(n)), i !== s && this.setAttribute('class', s);
                                            }
                                        })
                                      : this;
                            },
                            removeClass: function (e) {
                                var t, n, i, a, o, s;
                                return b(e)
                                    ? this.each(function (t) {
                                          P(this).removeClass(e.call(this, t, th(this)));
                                      })
                                    : arguments.length
                                      ? (t = tf(e)).length
                                          ? this.each(function () {
                                                if (((i = th(this)), (n = 1 === this.nodeType && ' ' + tm(i) + ' '))) {
                                                    for (o = 0; o < t.length; o++)
                                                        for (a = t[o]; n.indexOf(' ' + a + ' ') > -1; )
                                                            n = n.replace(' ' + a + ' ', ' ');
                                                    (s = tm(n)), i !== s && this.setAttribute('class', s);
                                                }
                                            })
                                          : this
                                      : this.attr('class', '');
                            },
                            toggleClass: function (e, t) {
                                var n,
                                    i,
                                    a,
                                    o,
                                    s = typeof e,
                                    r = 'string' === s || Array.isArray(e);
                                return b(e)
                                    ? this.each(function (n) {
                                          P(this).toggleClass(e.call(this, n, th(this), t), t);
                                      })
                                    : 'boolean' == typeof t && r
                                      ? t
                                          ? this.addClass(e)
                                          : this.removeClass(e)
                                      : ((n = tf(e)),
                                        this.each(function () {
                                            if (r)
                                                for (a = 0, o = P(this); a < n.length; a++)
                                                    (i = n[a]), o.hasClass(i) ? o.removeClass(i) : o.addClass(i);
                                            else
                                                (void 0 === e || 'boolean' === s) &&
                                                    ((i = th(this)) && es.set(this, '__className__', i),
                                                    this.setAttribute &&
                                                        this.setAttribute(
                                                            'class',
                                                            i || !1 === e ? '' : es.get(this, '__className__') || ''
                                                        ));
                                        }));
                            },
                            hasClass: function (e) {
                                var t,
                                    n,
                                    i = 0;
                                for (t = ' ' + e + ' '; (n = this[i++]); )
                                    if (1 === n.nodeType && (' ' + tm(th(n)) + ' ').indexOf(t) > -1) return !0;
                                return !1;
                            },
                        });
                    var tg = /\r/g;
                    P.fn.extend({
                        val: function (e) {
                            var t,
                                n,
                                i,
                                a = this[0];
                            return arguments.length
                                ? ((i = b(e)),
                                  this.each(function (n) {
                                      var a;
                                      1 === this.nodeType &&
                                          (null == (a = i ? e.call(this, n, P(this).val()) : e)
                                              ? (a = '')
                                              : 'number' == typeof a
                                                ? (a += '')
                                                : Array.isArray(a) &&
                                                  (a = P.map(a, function (e) {
                                                      return null == e ? '' : e + '';
                                                  })),
                                          ((t = P.valHooks[this.type] || P.valHooks[this.nodeName.toLowerCase()]) &&
                                              'set' in t &&
                                              void 0 !== t.set(this, a, 'value')) ||
                                              (this.value = a));
                                  }))
                                : a
                                  ? (t = P.valHooks[a.type] || P.valHooks[a.nodeName.toLowerCase()]) &&
                                    'get' in t &&
                                    void 0 !== (n = t.get(a, 'value'))
                                      ? n
                                      : 'string' == typeof (n = a.value)
                                        ? n.replace(tg, '')
                                        : null == n
                                          ? ''
                                          : n
                                  : void 0;
                        },
                    }),
                        P.extend({
                            valHooks: {
                                option: {
                                    get: function (e) {
                                        var t = P.find.attr(e, 'value');
                                        return null != t ? t : tm(P.text(e));
                                    },
                                },
                                select: {
                                    get: function (e) {
                                        var t,
                                            n,
                                            i,
                                            a = e.options,
                                            o = e.selectedIndex,
                                            s = 'select-one' === e.type,
                                            r = s ? null : [],
                                            c = s ? o + 1 : a.length;
                                        for (i = o < 0 ? c : s ? o : 0; i < c; i++)
                                            if (
                                                ((n = a[i]).selected || i === o) &&
                                                !n.disabled &&
                                                (!n.parentNode.disabled || !M(n.parentNode, 'optgroup'))
                                            ) {
                                                if (((t = P(n).val()), s)) return t;
                                                r.push(t);
                                            }
                                        return r;
                                    },
                                    set: function (e, t) {
                                        for (var n, i, a = e.options, o = P.makeArray(t), s = a.length; s--; )
                                            ((i = a[s]).selected = P.inArray(P.valHooks.option.get(i), o) > -1) &&
                                                (n = !0);
                                        return n || (e.selectedIndex = -1), o;
                                    },
                                },
                            },
                        }),
                        P.each(['radio', 'checkbox'], function () {
                            (P.valHooks[this] = {
                                set: function (e, t) {
                                    if (Array.isArray(t)) return (e.checked = P.inArray(P(e).val(), t) > -1);
                                },
                            }),
                                v.checkOn ||
                                    (P.valHooks[this].get = function (e) {
                                        return null === e.getAttribute('value') ? 'on' : e.value;
                                    });
                        });
                    var tv = i.location,
                        tb = { guid: Date.now() },
                        tx = /\?/;
                    P.parseXML = function (e) {
                        var t, n;
                        if (!e || 'string' != typeof e) return null;
                        try {
                            t = new i.DOMParser().parseFromString(e, 'text/xml');
                        } catch (e) {}
                        return (
                            (n = t && t.getElementsByTagName('parsererror')[0]),
                            (!t || n) &&
                                P.error(
                                    'Invalid XML: ' +
                                        (n
                                            ? P.map(n.childNodes, function (e) {
                                                  return e.textContent;
                                              }).join('\n')
                                            : e)
                                ),
                            t
                        );
                    };
                    var ty = /^(?:focusinfocus|focusoutblur)$/,
                        tS = function (e) {
                            e.stopPropagation();
                        };
                    P.extend(P.event, {
                        trigger: function (e, t, n, a) {
                            var o,
                                s,
                                r,
                                c,
                                l,
                                u,
                                d,
                                p,
                                m = [n || y],
                                f = h.call(e, 'type') ? e.type : e,
                                g = h.call(e, 'namespace') ? e.namespace.split('.') : [];
                            if (
                                ((s = p = r = n = n || y),
                                !(3 === n.nodeType || 8 === n.nodeType || ty.test(f + P.event.triggered)) &&
                                    (f.indexOf('.') > -1 && ((f = (g = f.split('.')).shift()), g.sort()),
                                    (l = 0 > f.indexOf(':') && 'on' + f),
                                    ((e = e[P.expando] ? e : new P.Event(f, 'object' == typeof e && e)).isTrigger = a
                                        ? 2
                                        : 3),
                                    (e.namespace = g.join('.')),
                                    (e.rnamespace = e.namespace
                                        ? RegExp('(^|\\.)' + g.join('\\.(?:.*\\.|)') + '(\\.|$)')
                                        : null),
                                    (e.result = void 0),
                                    e.target || (e.target = n),
                                    (t = null == t ? [e] : P.makeArray(t, [e])),
                                    (d = P.event.special[f] || {}),
                                    a || !d.trigger || !1 !== d.trigger.apply(n, t)))
                            ) {
                                if (!a && !d.noBubble && !x(n)) {
                                    for (
                                        c = d.delegateType || f, ty.test(c + f) || (s = s.parentNode);
                                        s;
                                        s = s.parentNode
                                    )
                                        m.push(s), (r = s);
                                    r === (n.ownerDocument || y) && m.push(r.defaultView || r.parentWindow || i);
                                }
                                for (o = 0; (s = m[o++]) && !e.isPropagationStopped(); )
                                    (p = s),
                                        (e.type = o > 1 ? c : d.bindType || f),
                                        (u =
                                            (es.get(s, 'events') || Object.create(null))[e.type] &&
                                            es.get(s, 'handle')) && u.apply(s, t),
                                        (u = l && s[l]) &&
                                            u.apply &&
                                            ea(s) &&
                                            ((e.result = u.apply(s, t)), !1 === e.result && e.preventDefault());
                                return (
                                    (e.type = f),
                                    !a &&
                                        !e.isDefaultPrevented() &&
                                        (!d._default || !1 === d._default.apply(m.pop(), t)) &&
                                        ea(n) &&
                                        l &&
                                        b(n[f]) &&
                                        !x(n) &&
                                        ((r = n[l]) && (n[l] = null),
                                        (P.event.triggered = f),
                                        e.isPropagationStopped() && p.addEventListener(f, tS),
                                        n[f](),
                                        e.isPropagationStopped() && p.removeEventListener(f, tS),
                                        (P.event.triggered = void 0),
                                        r && (n[l] = r)),
                                    e.result
                                );
                            }
                        },
                        simulate: function (e, t, n) {
                            var i = P.extend(new P.Event(), n, { type: e, isSimulated: !0 });
                            P.event.trigger(i, null, t);
                        },
                    }),
                        P.fn.extend({
                            trigger: function (e, t) {
                                return this.each(function () {
                                    P.event.trigger(e, t, this);
                                });
                            },
                            triggerHandler: function (e, t) {
                                var n = this[0];
                                if (n) return P.event.trigger(e, t, n, !0);
                            },
                        });
                    var tw = /\[\]$/,
                        tA = /\r?\n/g,
                        tC = /^(?:submit|button|image|reset|file)$/i,
                        t_ = /^(?:input|select|textarea|keygen)/i;
                    (P.param = function (e, t) {
                        var n,
                            i = [],
                            a = function (e, t) {
                                var n = b(t) ? t() : t;
                                i[i.length] = encodeURIComponent(e) + '=' + encodeURIComponent(null == n ? '' : n);
                            };
                        if (null == e) return '';
                        if (Array.isArray(e) || (e.jquery && !P.isPlainObject(e)))
                            P.each(e, function () {
                                a(this.name, this.value);
                            });
                        else
                            for (n in e)
                                !(function e(t, n, i, a) {
                                    var o;
                                    if (Array.isArray(n))
                                        P.each(n, function (n, o) {
                                            i || tw.test(t)
                                                ? a(t, o)
                                                : e(
                                                      t + '[' + ('object' == typeof o && null != o ? n : '') + ']',
                                                      o,
                                                      i,
                                                      a
                                                  );
                                        });
                                    else if (i || 'object' !== A(n)) a(t, n);
                                    else for (o in n) e(t + '[' + o + ']', n[o], i, a);
                                })(n, e[n], t, a);
                        return i.join('&');
                    }),
                        P.fn.extend({
                            serialize: function () {
                                return P.param(this.serializeArray());
                            },
                            serializeArray: function () {
                                return this.map(function () {
                                    var e = P.prop(this, 'elements');
                                    return e ? P.makeArray(e) : this;
                                })
                                    .filter(function () {
                                        var e = this.type;
                                        return (
                                            this.name &&
                                            !P(this).is(':disabled') &&
                                            t_.test(this.nodeName) &&
                                            !tC.test(e) &&
                                            (this.checked || !eS.test(e))
                                        );
                                    })
                                    .map(function (e, t) {
                                        var n = P(this).val();
                                        return null == n
                                            ? null
                                            : Array.isArray(n)
                                              ? P.map(n, function (e) {
                                                    return { name: t.name, value: e.replace(tA, '\r\n') };
                                                })
                                              : { name: t.name, value: n.replace(tA, '\r\n') };
                                    })
                                    .get();
                            },
                        });
                    var tP = /%20/g,
                        tk = /#.*$/,
                        tM = /([?&])_=[^&]*/,
                        tE = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                        tT = /^(?:GET|HEAD)$/,
                        tI = /^\/\//,
                        tj = {},
                        tG = {},
                        tN = '*/'.concat('*'),
                        tB = y.createElement('a');
                    function tO(e) {
                        return function (t, n) {
                            'string' != typeof t && ((n = t), (t = '*'));
                            var i,
                                a = 0,
                                o = t.toLowerCase().match($) || [];
                            if (b(n))
                                for (; (i = o[a++]); )
                                    '+' === i[0]
                                        ? (e[(i = i.slice(1) || '*')] = e[i] || []).unshift(n)
                                        : (e[i] = e[i] || []).push(n);
                        };
                    }
                    function tL(e, t, n, i) {
                        var a = {},
                            o = e === tG;
                        function s(r) {
                            var c;
                            return (
                                (a[r] = !0),
                                P.each(e[r] || [], function (e, r) {
                                    var l = r(t, n, i);
                                    return 'string' != typeof l || o || a[l]
                                        ? o
                                            ? !(c = l)
                                            : void 0
                                        : (t.dataTypes.unshift(l), s(l), !1);
                                }),
                                c
                            );
                        }
                        return s(t.dataTypes[0]) || (!a['*'] && s('*'));
                    }
                    function tD(e, t) {
                        var n,
                            i,
                            a = P.ajaxSettings.flatOptions || {};
                        for (n in t) void 0 !== t[n] && ((a[n] ? e : i || (i = {}))[n] = t[n]);
                        return i && P.extend(!0, e, i), e;
                    }
                    (tB.href = tv.href),
                        P.extend({
                            active: 0,
                            lastModified: {},
                            etag: {},
                            ajaxSettings: {
                                url: tv.href,
                                type: 'GET',
                                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(tv.protocol),
                                global: !0,
                                processData: !0,
                                async: !0,
                                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                accepts: {
                                    '*': tN,
                                    text: 'text/plain',
                                    html: 'text/html',
                                    xml: 'application/xml, text/xml',
                                    json: 'application/json, text/javascript',
                                },
                                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                                responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' },
                                converters: {
                                    '* text': String,
                                    'text html': !0,
                                    'text json': JSON.parse,
                                    'text xml': P.parseXML,
                                },
                                flatOptions: { url: !0, context: !0 },
                            },
                            ajaxSetup: function (e, t) {
                                return t ? tD(tD(e, P.ajaxSettings), t) : tD(P.ajaxSettings, e);
                            },
                            ajaxPrefilter: tO(tj),
                            ajaxTransport: tO(tG),
                            ajax: function (e, t) {
                                'object' == typeof e && ((t = e), (e = void 0)), (t = t || {});
                                var n,
                                    a,
                                    o,
                                    s,
                                    r,
                                    c,
                                    l,
                                    u,
                                    d,
                                    p,
                                    m = P.ajaxSetup({}, t),
                                    h = m.context || m,
                                    f = m.context && (h.nodeType || h.jquery) ? P(h) : P.event,
                                    g = P.Deferred(),
                                    v = P.Callbacks('once memory'),
                                    b = m.statusCode || {},
                                    x = {},
                                    S = {},
                                    w = 'canceled',
                                    A = {
                                        readyState: 0,
                                        getResponseHeader: function (e) {
                                            var t;
                                            if (l) {
                                                if (!s)
                                                    for (s = {}; (t = tE.exec(o)); )
                                                        s[t[1].toLowerCase() + ' '] = (
                                                            s[t[1].toLowerCase() + ' '] || []
                                                        ).concat(t[2]);
                                                t = s[e.toLowerCase() + ' '];
                                            }
                                            return null == t ? null : t.join(', ');
                                        },
                                        getAllResponseHeaders: function () {
                                            return l ? o : null;
                                        },
                                        setRequestHeader: function (e, t) {
                                            return (
                                                null == l &&
                                                    (x[(e = S[e.toLowerCase()] = S[e.toLowerCase()] || e)] = t),
                                                this
                                            );
                                        },
                                        overrideMimeType: function (e) {
                                            return null == l && (m.mimeType = e), this;
                                        },
                                        statusCode: function (e) {
                                            var t;
                                            if (e) {
                                                if (l) A.always(e[A.status]);
                                                else for (t in e) b[t] = [b[t], e[t]];
                                            }
                                            return this;
                                        },
                                        abort: function (e) {
                                            var t = e || w;
                                            return n && n.abort(t), C(0, t), this;
                                        },
                                    };
                                if (
                                    (g.promise(A),
                                    (m.url = ((e || m.url || tv.href) + '').replace(tI, tv.protocol + '//')),
                                    (m.type = t.method || t.type || m.method || m.type),
                                    (m.dataTypes = (m.dataType || '*').toLowerCase().match($) || ['']),
                                    null == m.crossDomain)
                                ) {
                                    c = y.createElement('a');
                                    try {
                                        (c.href = m.url),
                                            (c.href = c.href),
                                            (m.crossDomain =
                                                tB.protocol + '//' + tB.host != c.protocol + '//' + c.host);
                                    } catch (e) {
                                        m.crossDomain = !0;
                                    }
                                }
                                if (
                                    (m.data &&
                                        m.processData &&
                                        'string' != typeof m.data &&
                                        (m.data = P.param(m.data, m.traditional)),
                                    tL(tj, m, t, A),
                                    l)
                                )
                                    return A;
                                for (d in ((u = P.event && m.global) && 0 == P.active++ && P.event.trigger('ajaxStart'),
                                (m.type = m.type.toUpperCase()),
                                (m.hasContent = !tT.test(m.type)),
                                (a = m.url.replace(tk, '')),
                                m.hasContent
                                    ? m.data &&
                                      m.processData &&
                                      0 === (m.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                                      (m.data = m.data.replace(tP, '+'))
                                    : ((p = m.url.slice(a.length)),
                                      m.data &&
                                          (m.processData || 'string' == typeof m.data) &&
                                          ((a += (tx.test(a) ? '&' : '?') + m.data), delete m.data),
                                      !1 === m.cache &&
                                          ((a = a.replace(tM, '$1')),
                                          (p = (tx.test(a) ? '&' : '?') + '_=' + tb.guid++ + p)),
                                      (m.url = a + p)),
                                m.ifModified &&
                                    (P.lastModified[a] && A.setRequestHeader('If-Modified-Since', P.lastModified[a]),
                                    P.etag[a] && A.setRequestHeader('If-None-Match', P.etag[a])),
                                ((m.data && m.hasContent && !1 !== m.contentType) || t.contentType) &&
                                    A.setRequestHeader('Content-Type', m.contentType),
                                A.setRequestHeader(
                                    'Accept',
                                    m.dataTypes[0] && m.accepts[m.dataTypes[0]]
                                        ? m.accepts[m.dataTypes[0]] +
                                              ('*' !== m.dataTypes[0] ? ', ' + tN + '; q=0.01' : '')
                                        : m.accepts['*']
                                ),
                                m.headers))
                                    A.setRequestHeader(d, m.headers[d]);
                                if (m.beforeSend && (!1 === m.beforeSend.call(h, A, m) || l)) return A.abort();
                                if (
                                    ((w = 'abort'),
                                    v.add(m.complete),
                                    A.done(m.success),
                                    A.fail(m.error),
                                    (n = tL(tG, m, t, A)))
                                ) {
                                    if (((A.readyState = 1), u && f.trigger('ajaxSend', [A, m]), l)) return A;
                                    m.async &&
                                        m.timeout > 0 &&
                                        (r = i.setTimeout(function () {
                                            A.abort('timeout');
                                        }, m.timeout));
                                    try {
                                        (l = !1), n.send(x, C);
                                    } catch (e) {
                                        if (l) throw e;
                                        C(-1, e);
                                    }
                                } else C(-1, 'No Transport');
                                function C(e, t, s, c) {
                                    var d,
                                        p,
                                        x,
                                        y,
                                        S,
                                        w = t;
                                    !l &&
                                        ((l = !0),
                                        r && i.clearTimeout(r),
                                        (n = void 0),
                                        (o = c || ''),
                                        (A.readyState = e > 0 ? 4 : 0),
                                        (d = (e >= 200 && e < 300) || 304 === e),
                                        s &&
                                            (y = (function (e, t, n) {
                                                for (var i, a, o, s, r = e.contents, c = e.dataTypes; '*' === c[0]; )
                                                    c.shift(),
                                                        void 0 === i &&
                                                            (i = e.mimeType || t.getResponseHeader('Content-Type'));
                                                if (i) {
                                                    for (a in r)
                                                        if (r[a] && r[a].test(i)) {
                                                            c.unshift(a);
                                                            break;
                                                        }
                                                }
                                                if (c[0] in n) o = c[0];
                                                else {
                                                    for (a in n) {
                                                        if (!c[0] || e.converters[a + ' ' + c[0]]) {
                                                            o = a;
                                                            break;
                                                        }
                                                        s || (s = a);
                                                    }
                                                    o = o || s;
                                                }
                                                if (o) return o !== c[0] && c.unshift(o), n[o];
                                            })(m, A, s)),
                                        !d &&
                                            P.inArray('script', m.dataTypes) > -1 &&
                                            0 > P.inArray('json', m.dataTypes) &&
                                            (m.converters['text script'] = function () {}),
                                        (y = (function (e, t, n, i) {
                                            var a,
                                                o,
                                                s,
                                                r,
                                                c,
                                                l = {},
                                                u = e.dataTypes.slice();
                                            if (u[1]) for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
                                            for (o = u.shift(); o; )
                                                if (
                                                    (e.responseFields[o] && (n[e.responseFields[o]] = t),
                                                    !c && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                                                    (c = o),
                                                    (o = u.shift()))
                                                ) {
                                                    if ('*' === o) o = c;
                                                    else if ('*' !== c && c !== o) {
                                                        if (!(s = l[c + ' ' + o] || l['* ' + o])) {
                                                            for (a in l)
                                                                if (
                                                                    (r = a.split(' '))[1] === o &&
                                                                    (s = l[c + ' ' + r[0]] || l['* ' + r[0]])
                                                                ) {
                                                                    !0 === s
                                                                        ? (s = l[a])
                                                                        : !0 !== l[a] && ((o = r[0]), u.unshift(r[1]));
                                                                    break;
                                                                }
                                                        }
                                                        if (!0 !== s) {
                                                            if (s && e.throws) t = s(t);
                                                            else
                                                                try {
                                                                    t = s(t);
                                                                } catch (e) {
                                                                    return {
                                                                        state: 'parsererror',
                                                                        error: s
                                                                            ? e
                                                                            : 'No conversion from ' + c + ' to ' + o,
                                                                    };
                                                                }
                                                        }
                                                    }
                                                }
                                            return { state: 'success', data: t };
                                        })(m, y, A, d)),
                                        d
                                            ? (m.ifModified &&
                                                  ((S = A.getResponseHeader('Last-Modified')) &&
                                                      (P.lastModified[a] = S),
                                                  (S = A.getResponseHeader('etag')) && (P.etag[a] = S)),
                                              204 === e || 'HEAD' === m.type
                                                  ? (w = 'nocontent')
                                                  : 304 === e
                                                    ? (w = 'notmodified')
                                                    : ((w = y.state), (p = y.data), (d = !(x = y.error))))
                                            : ((x = w), (e || !w) && ((w = 'error'), e < 0 && (e = 0))),
                                        (A.status = e),
                                        (A.statusText = (t || w) + ''),
                                        d ? g.resolveWith(h, [p, w, A]) : g.rejectWith(h, [A, w, x]),
                                        A.statusCode(b),
                                        (b = void 0),
                                        u && f.trigger(d ? 'ajaxSuccess' : 'ajaxError', [A, m, d ? p : x]),
                                        v.fireWith(h, [A, w]),
                                        !u ||
                                            (f.trigger('ajaxComplete', [A, m]),
                                            --P.active || P.event.trigger('ajaxStop')));
                                }
                                return A;
                            },
                            getJSON: function (e, t, n) {
                                return P.get(e, t, n, 'json');
                            },
                            getScript: function (e, t) {
                                return P.get(e, void 0, t, 'script');
                            },
                        }),
                        P.each(['get', 'post'], function (e, t) {
                            P[t] = function (e, n, i, a) {
                                return (
                                    b(n) && ((a = a || i), (i = n), (n = void 0)),
                                    P.ajax(
                                        P.extend(
                                            { url: e, type: t, dataType: a, data: n, success: i },
                                            P.isPlainObject(e) && e
                                        )
                                    )
                                );
                            };
                        }),
                        P.ajaxPrefilter(function (e) {
                            var t;
                            for (t in e.headers)
                                'content-type' === t.toLowerCase() && (e.contentType = e.headers[t] || '');
                        }),
                        (P._evalUrl = function (e, t, n) {
                            return P.ajax({
                                url: e,
                                type: 'GET',
                                dataType: 'script',
                                cache: !0,
                                async: !1,
                                global: !1,
                                converters: { 'text script': function () {} },
                                dataFilter: function (e) {
                                    P.globalEval(e, t, n);
                                },
                            });
                        }),
                        P.fn.extend({
                            wrapAll: function (e) {
                                var t;
                                return (
                                    this[0] &&
                                        (b(e) && (e = e.call(this[0])),
                                        (t = P(e, this[0].ownerDocument).eq(0).clone(!0)),
                                        this[0].parentNode && t.insertBefore(this[0]),
                                        t
                                            .map(function () {
                                                for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                                                return e;
                                            })
                                            .append(this)),
                                    this
                                );
                            },
                            wrapInner: function (e) {
                                return b(e)
                                    ? this.each(function (t) {
                                          P(this).wrapInner(e.call(this, t));
                                      })
                                    : this.each(function () {
                                          var t = P(this),
                                              n = t.contents();
                                          n.length ? n.wrapAll(e) : t.append(e);
                                      });
                            },
                            wrap: function (e) {
                                var t = b(e);
                                return this.each(function (n) {
                                    P(this).wrapAll(t ? e.call(this, n) : e);
                                });
                            },
                            unwrap: function (e) {
                                return (
                                    this.parent(e)
                                        .not('body')
                                        .each(function () {
                                            P(this).replaceWith(this.childNodes);
                                        }),
                                    this
                                );
                            },
                        }),
                        (P.expr.pseudos.hidden = function (e) {
                            return !P.expr.pseudos.visible(e);
                        }),
                        (P.expr.pseudos.visible = function (e) {
                            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
                        }),
                        (P.ajaxSettings.xhr = function () {
                            try {
                                return new i.XMLHttpRequest();
                            } catch (e) {}
                        });
                    var tz = { 0: 200, 1223: 204 },
                        tR = P.ajaxSettings.xhr();
                    (v.cors = !!tR && 'withCredentials' in tR),
                        (v.ajax = tR = !!tR),
                        P.ajaxTransport(function (e) {
                            var t, n;
                            if (v.cors || (tR && !e.crossDomain))
                                return {
                                    send: function (a, o) {
                                        var s,
                                            r = e.xhr();
                                        if ((r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields))
                                            for (s in e.xhrFields) r[s] = e.xhrFields[s];
                                        for (s in (e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType),
                                        e.crossDomain ||
                                            a['X-Requested-With'] ||
                                            (a['X-Requested-With'] = 'XMLHttpRequest'),
                                        a))
                                            r.setRequestHeader(s, a[s]);
                                        (t = function (e) {
                                            return function () {
                                                t &&
                                                    ((t =
                                                        n =
                                                        r.onload =
                                                        r.onerror =
                                                        r.onabort =
                                                        r.ontimeout =
                                                        r.onreadystatechange =
                                                            null),
                                                    'abort' === e
                                                        ? r.abort()
                                                        : 'error' === e
                                                          ? 'number' != typeof r.status
                                                              ? o(0, 'error')
                                                              : o(r.status, r.statusText)
                                                          : o(
                                                                tz[r.status] || r.status,
                                                                r.statusText,
                                                                'text' !== (r.responseType || 'text') ||
                                                                    'string' != typeof r.responseText
                                                                    ? { binary: r.response }
                                                                    : { text: r.responseText },
                                                                r.getAllResponseHeaders()
                                                            ));
                                            };
                                        }),
                                            (r.onload = t()),
                                            (n = r.onerror = r.ontimeout = t('error')),
                                            void 0 !== r.onabort
                                                ? (r.onabort = n)
                                                : (r.onreadystatechange = function () {
                                                      4 === r.readyState &&
                                                          i.setTimeout(function () {
                                                              t && n();
                                                          });
                                                  }),
                                            (t = t('abort'));
                                        try {
                                            r.send((e.hasContent && e.data) || null);
                                        } catch (e) {
                                            if (t) throw e;
                                        }
                                    },
                                    abort: function () {
                                        t && t();
                                    },
                                };
                        }),
                        P.ajaxPrefilter(function (e) {
                            e.crossDomain && (e.contents.script = !1);
                        }),
                        P.ajaxSetup({
                            accepts: {
                                script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
                            },
                            contents: { script: /\b(?:java|ecma)script\b/ },
                            converters: {
                                'text script': function (e) {
                                    return P.globalEval(e), e;
                                },
                            },
                        }),
                        P.ajaxPrefilter('script', function (e) {
                            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET');
                        }),
                        P.ajaxTransport('script', function (e) {
                            if (e.crossDomain || e.scriptAttrs) {
                                var t, n;
                                return {
                                    send: function (i, a) {
                                        (t = P('<script>')
                                            .attr(e.scriptAttrs || {})
                                            .prop({ charset: e.scriptCharset, src: e.url })
                                            .on(
                                                'load error',
                                                (n = function (e) {
                                                    t.remove(),
                                                        (n = null),
                                                        e && a('error' === e.type ? 404 : 200, e.type);
                                                })
                                            )),
                                            y.head.appendChild(t[0]);
                                    },
                                    abort: function () {
                                        n && n();
                                    },
                                };
                            }
                        });
                    var tU = [],
                        tq = /(=)\?(?=&|$)|\?\?/;
                    P.ajaxSetup({
                        jsonp: 'callback',
                        jsonpCallback: function () {
                            var e = tU.pop() || P.expando + '_' + tb.guid++;
                            return (this[e] = !0), e;
                        },
                    }),
                        P.ajaxPrefilter('json jsonp', function (e, t, n) {
                            var a,
                                o,
                                s,
                                r =
                                    !1 !== e.jsonp &&
                                    (tq.test(e.url)
                                        ? 'url'
                                        : 'string' == typeof e.data &&
                                          0 === (e.contentType || '').indexOf('application/x-www-form-urlencoded') &&
                                          tq.test(e.data) &&
                                          'data');
                            if (r || 'jsonp' === e.dataTypes[0])
                                return (
                                    (a = e.jsonpCallback = b(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                                    r
                                        ? (e[r] = e[r].replace(tq, '$1' + a))
                                        : !1 !== e.jsonp && (e.url += (tx.test(e.url) ? '&' : '?') + e.jsonp + '=' + a),
                                    (e.converters['script json'] = function () {
                                        return s || P.error(a + ' was not called'), s[0];
                                    }),
                                    (e.dataTypes[0] = 'json'),
                                    (o = i[a]),
                                    (i[a] = function () {
                                        s = arguments;
                                    }),
                                    n.always(function () {
                                        void 0 === o ? P(i).removeProp(a) : (i[a] = o),
                                            e[a] && ((e.jsonpCallback = t.jsonpCallback), tU.push(a)),
                                            s && b(o) && o(s[0]),
                                            (s = o = void 0);
                                    }),
                                    'script'
                                );
                        }),
                        (v.createHTMLDocument =
                            (((o = y.implementation.createHTMLDocument('').body).innerHTML =
                                '<form></form><form></form>'),
                            2 === o.childNodes.length)),
                        (P.parseHTML = function (e, t, n) {
                            var i, a, o;
                            return 'string' != typeof e
                                ? []
                                : ('boolean' == typeof t && ((n = t), (t = !1)),
                                    t ||
                                        (v.createHTMLDocument
                                            ? (((i = (t = y.implementation.createHTMLDocument('')).createElement(
                                                  'base'
                                              )).href = y.location.href),
                                              t.head.appendChild(i))
                                            : (t = y)),
                                    (a = z.exec(e)),
                                    (o = !n && []),
                                    a)
                                  ? [t.createElement(a[1])]
                                  : ((a = eM([e], t, o)), o && o.length && P(o).remove(), P.merge([], a.childNodes));
                        }),
                        (P.fn.load = function (e, t, n) {
                            var i,
                                a,
                                o,
                                s = this,
                                r = e.indexOf(' ');
                            return (
                                r > -1 && ((i = tm(e.slice(r))), (e = e.slice(0, r))),
                                b(t) ? ((n = t), (t = void 0)) : t && 'object' == typeof t && (a = 'POST'),
                                s.length > 0 &&
                                    P.ajax({ url: e, type: a || 'GET', dataType: 'html', data: t })
                                        .done(function (e) {
                                            (o = arguments), s.html(i ? P('<div>').append(P.parseHTML(e)).find(i) : e);
                                        })
                                        .always(
                                            n &&
                                                function (e, t) {
                                                    s.each(function () {
                                                        n.apply(this, o || [e.responseText, t, e]);
                                                    });
                                                }
                                        ),
                                this
                            );
                        }),
                        (P.expr.pseudos.animated = function (e) {
                            return P.grep(P.timers, function (t) {
                                return e === t.elem;
                            }).length;
                        }),
                        (P.offset = {
                            setOffset: function (e, t, n) {
                                var i,
                                    a,
                                    o,
                                    s,
                                    r,
                                    c,
                                    l = P.css(e, 'position'),
                                    u = P(e),
                                    d = {};
                                'static' === l && (e.style.position = 'relative'),
                                    (r = u.offset()),
                                    (o = P.css(e, 'top')),
                                    (c = P.css(e, 'left')),
                                    ('absolute' === l || 'fixed' === l) && (o + c).indexOf('auto') > -1
                                        ? ((s = (i = u.position()).top), (a = i.left))
                                        : ((s = parseFloat(o) || 0), (a = parseFloat(c) || 0)),
                                    b(t) && (t = t.call(e, n, P.extend({}, r))),
                                    null != t.top && (d.top = t.top - r.top + s),
                                    null != t.left && (d.left = t.left - r.left + a),
                                    'using' in t ? t.using.call(e, d) : u.css(d);
                            },
                        }),
                        P.fn.extend({
                            offset: function (e) {
                                if (arguments.length)
                                    return void 0 === e
                                        ? this
                                        : this.each(function (t) {
                                              P.offset.setOffset(this, e, t);
                                          });
                                var t,
                                    n,
                                    i = this[0];
                                return i
                                    ? i.getClientRects().length
                                        ? ((t = i.getBoundingClientRect()),
                                          (n = i.ownerDocument.defaultView),
                                          { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset })
                                        : { top: 0, left: 0 }
                                    : void 0;
                            },
                            position: function () {
                                if (this[0]) {
                                    var e,
                                        t,
                                        n,
                                        i = this[0],
                                        a = { top: 0, left: 0 };
                                    if ('fixed' === P.css(i, 'position')) t = i.getBoundingClientRect();
                                    else {
                                        for (
                                            t = this.offset(),
                                                n = i.ownerDocument,
                                                e = i.offsetParent || n.documentElement;
                                            e &&
                                            (e === n.body || e === n.documentElement) &&
                                            'static' === P.css(e, 'position');

                                        )
                                            e = e.parentNode;
                                        e &&
                                            e !== i &&
                                            1 === e.nodeType &&
                                            ((a = P(e).offset()),
                                            (a.top += P.css(e, 'borderTopWidth', !0)),
                                            (a.left += P.css(e, 'borderLeftWidth', !0)));
                                    }
                                    return {
                                        top: t.top - a.top - P.css(i, 'marginTop', !0),
                                        left: t.left - a.left - P.css(i, 'marginLeft', !0),
                                    };
                                }
                            },
                            offsetParent: function () {
                                return this.map(function () {
                                    for (var e = this.offsetParent; e && 'static' === P.css(e, 'position'); )
                                        e = e.offsetParent;
                                    return e || eh;
                                });
                            },
                        }),
                        P.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (e, t) {
                            var n = 'pageYOffset' === t;
                            P.fn[e] = function (i) {
                                return J(
                                    this,
                                    function (e, i, a) {
                                        var o;
                                        if ((x(e) ? (o = e) : 9 === e.nodeType && (o = e.defaultView), void 0 === a))
                                            return o ? o[t] : e[i];
                                        o ? o.scrollTo(n ? o.pageXOffset : a, n ? a : o.pageYOffset) : (e[i] = a);
                                    },
                                    e,
                                    i,
                                    arguments.length
                                );
                            };
                        }),
                        P.each(['top', 'left'], function (e, t) {
                            P.cssHooks[t] = eQ(v.pixelPosition, function (e, n) {
                                if (n) return (n = eK(e, t)), eH.test(n) ? P(e).position()[t] + 'px' : n;
                            });
                        }),
                        P.each({ Height: 'height', Width: 'width' }, function (e, t) {
                            P.each({ padding: 'inner' + e, content: t, '': 'outer' + e }, function (n, i) {
                                P.fn[i] = function (a, o) {
                                    var s = arguments.length && (n || 'boolean' != typeof a),
                                        r = n || (!0 === a || !0 === o ? 'margin' : 'border');
                                    return J(
                                        this,
                                        function (t, n, a) {
                                            var o;
                                            return x(t)
                                                ? 0 === i.indexOf('outer')
                                                    ? t['inner' + e]
                                                    : t.document.documentElement['client' + e]
                                                : 9 === t.nodeType
                                                  ? ((o = t.documentElement),
                                                    Math.max(
                                                        t.body['scroll' + e],
                                                        o['scroll' + e],
                                                        t.body['offset' + e],
                                                        o['offset' + e],
                                                        o['client' + e]
                                                    ))
                                                  : void 0 === a
                                                    ? P.css(t, n, r)
                                                    : P.style(t, n, a, r);
                                        },
                                        t,
                                        s ? a : void 0,
                                        s
                                    );
                                };
                            });
                        }),
                        P.each(
                            ['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'],
                            function (e, t) {
                                P.fn[t] = function (e) {
                                    return this.on(t, e);
                                };
                            }
                        ),
                        P.fn.extend({
                            bind: function (e, t, n) {
                                return this.on(e, null, t, n);
                            },
                            unbind: function (e, t) {
                                return this.off(e, null, t);
                            },
                            delegate: function (e, t, n, i) {
                                return this.on(t, e, n, i);
                            },
                            undelegate: function (e, t, n) {
                                return 1 == arguments.length ? this.off(e, '**') : this.off(t, e || '**', n);
                            },
                            hover: function (e, t) {
                                return this.on('mouseenter', e).on('mouseleave', t || e);
                            },
                        }),
                        P.each(
                            'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
                                ' '
                            ),
                            function (e, t) {
                                P.fn[t] = function (e, n) {
                                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                                };
                            }
                        );
                    var tH = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
                    (P.proxy = function (e, t) {
                        var n, i, a;
                        if (('string' == typeof t && ((n = e[t]), (t = e), (e = n)), b(e)))
                            return (
                                (i = c.call(arguments, 2)),
                                ((a = function () {
                                    return e.apply(t || this, i.concat(c.call(arguments)));
                                }).guid = e.guid =
                                    e.guid || P.guid++),
                                a
                            );
                    }),
                        (P.holdReady = function (e) {
                            e ? P.readyWait++ : P.ready(!0);
                        }),
                        (P.isArray = Array.isArray),
                        (P.parseJSON = JSON.parse),
                        (P.nodeName = M),
                        (P.isFunction = b),
                        (P.isWindow = x),
                        (P.camelCase = ei),
                        (P.type = A),
                        (P.now = Date.now),
                        (P.isNumeric = function (e) {
                            var t = P.type(e);
                            return ('number' === t || 'string' === t) && !isNaN(e - parseFloat(e));
                        }),
                        (P.trim = function (e) {
                            return null == e ? '' : (e + '').replace(tH, '$1');
                        }),
                        void 0 !==
                            (n = function () {
                                return P;
                            }.apply(t, [])) && (e.exports = n);
                    var tW = i.jQuery,
                        tF = i.$;
                    return (
                        (P.noConflict = function (e) {
                            return i.$ === P && (i.$ = tF), e && i.jQuery === P && (i.jQuery = tW), P;
                        }),
                        void 0 === a && (i.jQuery = i.$ = P),
                        P
                    );
                }),
                'object' == typeof e.exports
                    ? (e.exports = i.document
                          ? a(i, !0)
                          : function (e) {
                                if (!e.document) throw Error('jQuery requires a window with a document');
                                return a(e);
                            })
                    : a(i);
        },
        83454: function (e, t, n) {
            'use strict';
            var i, a;
            e.exports =
                (null == (i = n.g.process) ? void 0 : i.env) &&
                'object' == typeof (null == (a = n.g.process) ? void 0 : a.env)
                    ? n.g.process
                    : n(77663);
        },
        91118: function (e, t, n) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                '/_app',
                function () {
                    return n(24013);
                },
            ]);
        },
        20091: function (e, t, n) {
            'use strict';
            var i = n(85893);
            let a = (e) => {
                let { path: t, year: n } = e;
                return (0, i.jsx)(i.Fragment, {
                    children: (0, i.jsxs)('div', {
                        className: 'px-2 footer pt-5',
                        children: [
                            (0, i.jsx)('div', {
                                className: 'footer_Main_Content mt-4 mb-4 container',
                                children: (0, i.jsxs)('div', {
                                    className: 'row justify-content-sm-between',
                                    children: [
                                        (0, i.jsxs)('div', {
                                            className: 'col-6 col-lg-4 mb-4',
                                            children: [
                                                (0, i.jsx)('h3', {
                                                    className: 'c-fs-5 d-flex flex-column',
                                                    children: 'Our products',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className:
                                                        'a-nav-link-cont d-flex flex-column mt-2 align-items-start',
                                                    children: [
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/hello'),
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Hello',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/segmento'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Segmento',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/campaign'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Campaign',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/otp'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'OTP',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(
                                                                '/in' === t ? '/in/otp/magiclink' : '/otp/magiclink'
                                                            ),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'OTP-MagicLink',
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsx)('h3', {
                                                    className: 'c-fs-5 d-flex flex-column mt-5',
                                                    children: 'Utilities',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className:
                                                        'a-nav-link-cont d-flex flex-column mt-2 align-items-start',
                                                    children: [
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/shorturl'),
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'URL Shortener',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/knowledgebase'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'KnowledgeBase',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/free-whatsapp-link-generator'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Free WhatsApp link generator',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/whatsapp/chatbot'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'WhatsApp Chatbot',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('div', {
                                            className: 'col-6 col-lg-3 mb-4',
                                            children: [
                                                (0, i.jsx)('h3', {
                                                    className: ' c-fs-5 d-flex flex-column',
                                                    children: 'Channels',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className:
                                                        'a-nav-link-cont d-flex flex-column mt-2 align-items-start',
                                                    children: [
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/sms'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'SMS',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/email'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Email',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/whatsapp'),
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'WhatsApp',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/voice'),
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Voice',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: ''.concat(t, '/numbers'),
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Numbers',
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsx)('h3', {
                                                    className: 'c-fs-5 d-flex flex-column mt-5',
                                                    children: 'Resources',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className:
                                                        'a-nav-link-cont d-flex flex-column mt-2 align-items-start',
                                                    children: [
                                                        (0, i.jsx)('a', {
                                                            href: '/guide',
                                                            target: '_blank',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Guide',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: '/case-studies',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Case Studies',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: 'https://msg91.com/help',
                                                            target: '_blank',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'FAQ',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: 'https://docs.msg91.com/overview',
                                                            target: '_blank',
                                                            className: ' c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'API Documentation',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: 'https://features.msg91.com/feature-requests',
                                                            target: '_blank',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Request a Feature',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('div', {
                                            className: 'col-6 col-lg-3 mb-4',
                                            children: [
                                                (0, i.jsx)('h3', {
                                                    className: ' c-fs-5 d-flex flex-column',
                                                    children: 'Discover',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className:
                                                        'a-nav-link-cont d-flex flex-column mt-2 align-items-start',
                                                    children: [
                                                        (0, i.jsx)('a', {
                                                            href: '/about-us',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'About us',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: '/pricing/sms',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Pricing',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: '/contact-us',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Contact us',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: '/developers',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Developers',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: '/startups',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'MSG91 for startups',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: '/partners-and-integrations',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Partners and integrations',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: '/become-a-partner',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Become a partner',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: 'https://apply.workable.com/walkover/',
                                                            target: '_blank',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Career',
                                                        }),
                                                        (0, i.jsx)('a', {
                                                            href: '/certificates',
                                                            target: '_blank',
                                                            className: 'c-link-underline c-fs-5 mt-2 c-fw-t',
                                                            children: 'Certificates',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('div', {
                                            className:
                                                'd-flex d-lg-block col-12 col-lg-2 f-social-a-cont mb-4 text-start text-lg-end order-first order-lg-last',
                                            children: [
                                                (0, i.jsxs)('div', {
                                                    className: 'footer-social-a-content col-6 col-lg-12',
                                                    children: [
                                                        (0, i.jsx)('span', {
                                                            className:
                                                                'footer-social-a-text  c-fs-5 d-flex flex-column',
                                                            children: 'Download Apps',
                                                        }),
                                                        (0, i.jsxs)('div', {
                                                            className:
                                                                'footer-social-a d-flex mt-3 justify-content-start justify-content-lg-end',
                                                            children: [
                                                                (0, i.jsx)('a', {
                                                                    href: 'https://play.google.com/store/apps/details?id=com.hellornapp',
                                                                    target: '_blank',
                                                                    className: 'me-4',
                                                                    children: (0, i.jsx)('img', {
                                                                        src: '/img/icon/android.svg',
                                                                        width: 20,
                                                                        height: 23,
                                                                        alt: '#',
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('a', {
                                                                    href: 'https://apps.apple.com/in/app/hello-by-msg91/id1635375551',
                                                                    target: '_blank',
                                                                    children: (0, i.jsx)('img', {
                                                                        src: '/img/icon/apple.svg',
                                                                        width: 20,
                                                                        height: 24,
                                                                        alt: '#',
                                                                    }),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className: 'footer-social-a-content col-6 col-lg-12 mt-lg-5',
                                                    children: [
                                                        (0, i.jsx)('span', {
                                                            className: 'footer-social-a-text c-fs-5 d-flex flex-column',
                                                            children: 'Follow us',
                                                        }),
                                                        (0, i.jsxs)('div', {
                                                            className:
                                                                'footer-social-a d-flex mt-3 align-items-start justify-content-between justify-content-lg-end',
                                                            children: [
                                                                (0, i.jsx)('a', {
                                                                    href: 'https://www.facebook.com/msg91',
                                                                    target: '_blank',
                                                                    className: 'me-3',
                                                                    children: (0, i.jsx)('img', {
                                                                        src: '/img/icon/facebook.svg',
                                                                        width: 24,
                                                                        height: 24,
                                                                        alt: '#',
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('a', {
                                                                    href: 'https://www.linkedin.com/company/msg91/',
                                                                    target: '_blank',
                                                                    className: 'me-3',
                                                                    children: (0, i.jsx)('img', {
                                                                        src: '/img/icon/linkedin.svg',
                                                                        width: 24,
                                                                        height: 24,
                                                                        alt: '#',
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('a', {
                                                                    href: 'https://twitter.com/msg91',
                                                                    target: '_blank',
                                                                    className: 'me-3',
                                                                    children: (0, i.jsx)('img', {
                                                                        src: '/img/icon/twitter.svg',
                                                                        width: 24,
                                                                        height: 24,
                                                                        alt: '#',
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('a', {
                                                                    href: 'https://www.youtube.com/@WalkoverWS',
                                                                    target: '_blank',
                                                                    children: (0, i.jsx)('img', {
                                                                        src: '/img/icon/youtube.svg',
                                                                        width: 24,
                                                                        height: 24,
                                                                        alt: '#',
                                                                    }),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                            (0, i.jsx)('div', {
                                className: 'pt-4 pb-5 footer2 w-100',
                                children: (0, i.jsxs)('div', {
                                    className: 'container',
                                    children: [
                                        (0, i.jsxs)('div', {
                                            className: 'd-flex justify-content-sm-between flex-column flex-lg-row',
                                            children: [
                                                (0, i.jsxs)('div', {
                                                    className: 'mt-4 mt-lg-0 gap-3',
                                                    children: [
                                                        (0, i.jsx)('a', {
                                                            href: '/terms-of-use',
                                                            className: 'c-link-underline c-fs-5 ',
                                                            children: 'Terms of use',
                                                        }),
                                                        (0, i.jsx)('span', { className: 'f2-spacer', children: ' | ' }),
                                                        (0, i.jsx)('a', {
                                                            href: '/privacy-policy',
                                                            className: 'c-link-underline c-fs-5 ',
                                                            children: 'Privacy policy',
                                                        }),
                                                        (0, i.jsx)('span', { className: 'f2-spacer', children: ' | ' }),
                                                        (0, i.jsx)('a', {
                                                            href: '/gdpr',
                                                            className: 'c-link-underline c-fs-5 ',
                                                            children: 'GDPR',
                                                        }),
                                                        (0, i.jsx)('span', { className: 'f2-spacer', children: ' | ' }),
                                                        (0, i.jsx)('a', {
                                                            href: '/refund-policy',
                                                            className: 'c-link-underline c-fs-5 ',
                                                            children: 'Refund policy',
                                                        }),
                                                        (0, i.jsx)('span', { className: 'f2-spacer', children: ' | ' }),
                                                        (0, i.jsx)('a', {
                                                            href: '/no-spam',
                                                            className: 'c-link-underline c-fs-5 ',
                                                            children: 'No spam',
                                                        }),
                                                        (0, i.jsx)('span', { className: 'f2-spacer', children: ' | ' }),
                                                        (0, i.jsx)('a', {
                                                            href: '/startup-policy',
                                                            className: 'c-link-underline c-fs-5 ',
                                                            children: 'Startup policy',
                                                        }),
                                                        (0, i.jsx)('span', { className: 'f2-spacer', children: ' | ' }),
                                                        (0, i.jsx)('a', {
                                                            href: '/fair-pricing-policy',
                                                            className: 'c-link-underline c-fs-5 ',
                                                            children: 'Fair pricing policy',
                                                        }),
                                                        (0, i.jsx)('span', { className: 'f2-spacer', children: ' | ' }),
                                                        (0, i.jsx)('a', {
                                                            href: '/cookie-policy',
                                                            className: 'c-link-underline c-fs-5 ',
                                                            children: 'Cookie policy',
                                                        }),
                                                    ],
                                                }),
                                                '/in' === t &&
                                                    (0, i.jsx)('div', {
                                                        className: 'mt-4 mt-lg-0',
                                                        children: (0, i.jsxs)('span', {
                                                            className: 'c-fs-5',
                                                            children: [
                                                                'A product of',
                                                                (0, i.jsx)('img', {
                                                                    src: '/img/walkover.svg',
                                                                    width: 20,
                                                                    height: 20,
                                                                    alt: '#',
                                                                }),
                                                                (0, i.jsx)('a', {
                                                                    href: 'https://walkover.in',
                                                                    target: '_blank',
                                                                    className: 'c-link-underline c-fs-5',
                                                                    children: 'Walkover',
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                            ],
                                        }),
                                        (0, i.jsxs)('div', {
                                            className: 'c-fs-7 copyright mt-3 text-white',
                                            children: [
                                                'Copyright 2008-',
                                                n,
                                                ', ',
                                                '/in' === t ? 'MSG91' : 'MSG91 Ltd.',
                                                ' | All rights reserved.',
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    }),
                });
            };
            t.Z = a;
        },
        15269: function (e, t, n) {
            'use strict';
            function i(e) {
                var t;
                let n = null === (t = (e || '').split('?')) || void 0 === t ? void 0 : t[1];
                if (n) {
                    let e = n.split('&'),
                        t = {};
                    for (let n of e) {
                        let e = n.split('=');
                        t[e[0]] = e[1];
                    }
                    return t;
                }
                return null;
            }
            function a(e) {
                let t = '';
                for (let n in e) e.hasOwnProperty(n) && e[n] && (t += ''.concat(n, '=').concat(e[n], '&'));
                return t;
            }
            function o(e) {
                for (var t = e + '=', n = decodeURIComponent(document.cookie).split(';'), i = 0; i < n.length; i++) {
                    for (var a = n[i]; ' ' === a.charAt(0); ) a = a.substring(1);
                    if (0 === a.indexOf(t)) return a.substring(t.length, a.length);
                }
                return null;
            }
            function s(e, t, n) {
                let i = new Date();
                i.setDate(i.getDate() + n);
                let a = encodeURIComponent(t) + (n ? '; expires=' + i.toUTCString() : '');
                document.cookie = e + '=' + a + '; path=/';
            }
            function r(e) {
                location.href = 'https://github.com/login/oauth/authorize?client_id='
                    .concat('9a9249259e5a41d58af0', '&allow_signup=true&scope=user&redirect_uri=')
                    .concat('https://msg91.com', '/github-auth-token?')
                    .concat(e ? 'githublogin=true' : 'githubsignup=true', '&state=')
                    .concat(Math.floor(1e8 + 9e8 * Math.random()));
            }
            function c() {
                for (
                    var e,
                        t,
                        n,
                        i,
                        a,
                        s,
                        r,
                        c,
                        l = document.querySelectorAll('.utm'),
                        u = Object.fromEntries(
                            null !==
                                (i =
                                    null ===
                                        (e =
                                            null ===
                                                (t =
                                                    null === (n = o('msg91_query')) || void 0 === n
                                                        ? void 0
                                                        : n.replace('?', '')) || void 0 === t
                                                ? void 0
                                                : t.split('&')) || void 0 === e
                                        ? void 0
                                        : e.map((e) => e.split('='))) && void 0 !== i
                                ? i
                                : []
                        ),
                        d = 0;
                    d < l.length;
                    d++
                ) {
                    let e = l[d].getAttribute('href'),
                        t = {},
                        n = null == e ? void 0 : e.split('?');
                    n[1] &&
                        (t = Object.fromEntries(
                            null !==
                                (c =
                                    null === (s = null === (r = n[1]) || void 0 === r ? void 0 : r.split('&')) ||
                                    void 0 === s
                                        ? void 0
                                        : s.map((e) => e.split('='))) && void 0 !== c
                                ? c
                                : []
                        )),
                        Object.assign(t, u);
                    let i =
                        null === (a = Object.entries(t)) || void 0 === a
                            ? void 0
                            : a
                                  .map((e) => {
                                      let [t, n] = e;
                                      return ''.concat(t, '=').concat(n);
                                  })
                                  .join('&');
                    e && i && l[d].setAttribute('href', n[0] + (i ? '?' + i : ''));
                }
            }
            n.d(t, {
                Jc: function () {
                    return a;
                },
                NF: function () {
                    return i;
                },
                Rd: function () {
                    return r;
                },
                Wi: function () {
                    return c;
                },
                d8: function () {
                    return s;
                },
                ej: function () {
                    return o;
                },
            });
        },
        81516: function (e, t) {
            'use strict';
            Object.defineProperty(t, '__esModule', { value: !0 }),
                (t.getDomainLocale = function (e, t, n, i) {
                    return !1;
                }),
                ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
                    void 0 === t.default.__esModule &&
                    (Object.defineProperty(t.default, '__esModule', { value: !0 }),
                    Object.assign(t.default, t),
                    (e.exports = t.default));
        },
        93740: function (e, t, n) {
            'use strict';
            Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
            var i = n(6495).Z,
                a = n(92648).Z,
                o = n(91598).Z,
                s = n(17273).Z,
                r = o(n(67294)),
                c = a(n(42636)),
                l = n(97757),
                u = n(3735),
                d = n(83341);
            n(34210);
            var p = a(n(57746));
            let m = {
                deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
                path: '/_next/image',
                loader: 'default',
                dangerouslyAllowSVG: !1,
                unoptimized: !1,
            };
            function h(e) {
                return void 0 !== e.default;
            }
            function f(e) {
                return 'number' == typeof e || void 0 === e
                    ? e
                    : 'string' == typeof e && /^[0-9]+$/.test(e)
                      ? parseInt(e, 10)
                      : NaN;
            }
            function g(e, t, n, a, o, s, r) {
                if (!e || e['data-loaded-src'] === t) return;
                e['data-loaded-src'] = t;
                let c = 'decode' in e ? e.decode() : Promise.resolve();
                c.catch(() => {}).then(() => {
                    if (e.parentElement && e.isConnected) {
                        if (('blur' === n && s(!0), null == a ? void 0 : a.current)) {
                            let t = new Event('load');
                            Object.defineProperty(t, 'target', { writable: !1, value: e });
                            let n = !1,
                                o = !1;
                            a.current(
                                i({}, t, {
                                    nativeEvent: t,
                                    currentTarget: e,
                                    target: e,
                                    isDefaultPrevented: () => n,
                                    isPropagationStopped: () => o,
                                    persist: () => {},
                                    preventDefault: () => {
                                        (n = !0), t.preventDefault();
                                    },
                                    stopPropagation: () => {
                                        (o = !0), t.stopPropagation();
                                    },
                                })
                            );
                        }
                        (null == o ? void 0 : o.current) && o.current(e);
                    }
                });
            }
            let v = r.forwardRef((e, t) => {
                    var {
                            imgAttributes: n,
                            heightInt: a,
                            widthInt: o,
                            qualityInt: c,
                            className: l,
                            imgStyle: u,
                            blurStyle: d,
                            isLazy: p,
                            fill: m,
                            placeholder: h,
                            loading: f,
                            srcString: v,
                            config: b,
                            unoptimized: x,
                            loader: y,
                            onLoadRef: S,
                            onLoadingCompleteRef: w,
                            setBlurComplete: A,
                            setShowAltText: C,
                            onLoad: _,
                            onError: P,
                        } = e,
                        k = s(e, [
                            'imgAttributes',
                            'heightInt',
                            'widthInt',
                            'qualityInt',
                            'className',
                            'imgStyle',
                            'blurStyle',
                            'isLazy',
                            'fill',
                            'placeholder',
                            'loading',
                            'srcString',
                            'config',
                            'unoptimized',
                            'loader',
                            'onLoadRef',
                            'onLoadingCompleteRef',
                            'setBlurComplete',
                            'setShowAltText',
                            'onLoad',
                            'onError',
                        ]);
                    return (
                        (f = p ? 'lazy' : f),
                        r.default.createElement(
                            r.default.Fragment,
                            null,
                            r.default.createElement(
                                'img',
                                Object.assign(
                                    {},
                                    k,
                                    {
                                        loading: f,
                                        width: o,
                                        height: a,
                                        decoding: 'async',
                                        'data-nimg': m ? 'fill' : '1',
                                        className: l,
                                        style: i({}, u, d),
                                    },
                                    n,
                                    {
                                        ref: r.useCallback(
                                            (e) => {
                                                t &&
                                                    ('function' == typeof t
                                                        ? t(e)
                                                        : 'object' == typeof t && (t.current = e)),
                                                    e && (P && (e.src = e.src), e.complete && g(e, v, h, S, w, A, x));
                                            },
                                            [v, h, S, w, A, P, x, t]
                                        ),
                                        onLoad: (e) => {
                                            let t = e.currentTarget;
                                            g(t, v, h, S, w, A, x);
                                        },
                                        onError: (e) => {
                                            C(!0), 'blur' === h && A(!0), P && P(e);
                                        },
                                    }
                                )
                            )
                        )
                    );
                }),
                b = r.forwardRef((e, t) => {
                    let n, a;
                    var o,
                        {
                            src: g,
                            sizes: b,
                            unoptimized: x = !1,
                            priority: y = !1,
                            loading: S,
                            className: w,
                            quality: A,
                            width: C,
                            height: _,
                            fill: P,
                            style: k,
                            onLoad: M,
                            onLoadingComplete: E,
                            placeholder: T = 'empty',
                            blurDataURL: I,
                            layout: j,
                            objectFit: G,
                            objectPosition: N,
                            lazyBoundary: B,
                            lazyRoot: O,
                        } = e,
                        L = s(e, [
                            'src',
                            'sizes',
                            'unoptimized',
                            'priority',
                            'loading',
                            'className',
                            'quality',
                            'width',
                            'height',
                            'fill',
                            'style',
                            'onLoad',
                            'onLoadingComplete',
                            'placeholder',
                            'blurDataURL',
                            'layout',
                            'objectFit',
                            'objectPosition',
                            'lazyBoundary',
                            'lazyRoot',
                        ]);
                    let D = r.useContext(d.ImageConfigContext),
                        z = r.useMemo(() => {
                            let e = m || D || u.imageConfigDefault,
                                t = [...e.deviceSizes, ...e.imageSizes].sort((e, t) => e - t),
                                n = e.deviceSizes.sort((e, t) => e - t);
                            return i({}, e, { allSizes: t, deviceSizes: n });
                        }, [D]),
                        R = L,
                        U = R.loader || p.default;
                    delete R.loader;
                    let q = '__next_img_default' in U;
                    if (q) {
                        if ('custom' === z.loader)
                            throw Error(
                                'Image with src "'.concat(g, '" is missing "loader" prop.') +
                                    '\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'
                            );
                    } else {
                        let e = U;
                        U = (t) => {
                            let { config: n } = t,
                                i = s(t, ['config']);
                            return e(i);
                        };
                    }
                    if (j) {
                        'fill' === j && (P = !0);
                        let e = {
                            intrinsic: { maxWidth: '100%', height: 'auto' },
                            responsive: { width: '100%', height: 'auto' },
                        }[j];
                        e && (k = i({}, k, e));
                        let t = { responsive: '100vw', fill: '100vw' }[j];
                        t && !b && (b = t);
                    }
                    let H = '',
                        W = f(C),
                        F = f(_);
                    if ('object' == typeof (o = g) && (h(o) || void 0 !== o.src)) {
                        let e = h(g) ? g.default : g;
                        if (!e.src)
                            throw Error(
                                'An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received '.concat(
                                    JSON.stringify(e)
                                )
                            );
                        if (!e.height || !e.width)
                            throw Error(
                                'An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received '.concat(
                                    JSON.stringify(e)
                                )
                            );
                        if (((n = e.blurWidth), (a = e.blurHeight), (I = I || e.blurDataURL), (H = e.src), !P)) {
                            if (W || F) {
                                if (W && !F) {
                                    let t = W / e.width;
                                    F = Math.round(e.height * t);
                                } else if (!W && F) {
                                    let t = F / e.height;
                                    W = Math.round(e.width * t);
                                }
                            } else (W = e.width), (F = e.height);
                        }
                    }
                    let $ = !y && ('lazy' === S || void 0 === S);
                    ((g = 'string' == typeof g ? g : H).startsWith('data:') || g.startsWith('blob:')) &&
                        ((x = !0), ($ = !1)),
                        z.unoptimized && (x = !0),
                        q && g.endsWith('.svg') && !z.dangerouslyAllowSVG && (x = !0);
                    let [V, K] = r.useState(!1),
                        [Q, X] = r.useState(!1),
                        Y = f(A),
                        Z = Object.assign(
                            P
                                ? {
                                      position: 'absolute',
                                      height: '100%',
                                      width: '100%',
                                      left: 0,
                                      top: 0,
                                      right: 0,
                                      bottom: 0,
                                      objectFit: G,
                                      objectPosition: N,
                                  }
                                : {},
                            Q ? {} : { color: 'transparent' },
                            k
                        ),
                        J =
                            'blur' === T && I && !V
                                ? {
                                      backgroundSize: Z.objectFit || 'cover',
                                      backgroundPosition: Z.objectPosition || '50% 50%',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundImage: 'url("data:image/svg+xml;charset=utf-8,'.concat(
                                          l.getImageBlurSvg({
                                              widthInt: W,
                                              heightInt: F,
                                              blurWidth: n,
                                              blurHeight: a,
                                              blurDataURL: I,
                                              objectFit: Z.objectFit,
                                          }),
                                          '")'
                                      ),
                                  }
                                : {},
                        ee = (function (e) {
                            let { config: t, src: n, unoptimized: i, width: a, quality: o, sizes: s, loader: r } = e;
                            if (i) return { src: n, srcSet: void 0, sizes: void 0 };
                            let { widths: c, kind: l } = (function (e, t, n) {
                                    let { deviceSizes: i, allSizes: a } = e;
                                    if (n) {
                                        let e = /(^|\s)(1?\d?\d)vw/g,
                                            t = [];
                                        for (let i; (i = e.exec(n)); i) t.push(parseInt(i[2]));
                                        if (t.length) {
                                            let e = 0.01 * Math.min(...t);
                                            return { widths: a.filter((t) => t >= i[0] * e), kind: 'w' };
                                        }
                                        return { widths: a, kind: 'w' };
                                    }
                                    if ('number' != typeof t) return { widths: i, kind: 'w' };
                                    let o = [
                                        ...new Set([t, 2 * t].map((e) => a.find((t) => t >= e) || a[a.length - 1])),
                                    ];
                                    return { widths: o, kind: 'x' };
                                })(t, a, s),
                                u = c.length - 1;
                            return {
                                sizes: s || 'w' !== l ? s : '100vw',
                                srcSet: c
                                    .map((e, i) =>
                                        ''
                                            .concat(r({ config: t, src: n, quality: o, width: e }), ' ')
                                            .concat('w' === l ? e : i + 1)
                                            .concat(l)
                                    )
                                    .join(', '),
                                src: r({ config: t, src: n, quality: o, width: c[u] }),
                            };
                        })({ config: z, src: g, unoptimized: x, width: W, quality: Y, sizes: b, loader: U }),
                        et = g,
                        en = { imageSrcSet: ee.srcSet, imageSizes: ee.sizes, crossOrigin: R.crossOrigin },
                        ei = r.useRef(M);
                    r.useEffect(() => {
                        ei.current = M;
                    }, [M]);
                    let ea = r.useRef(E);
                    r.useEffect(() => {
                        ea.current = E;
                    }, [E]);
                    let eo = i(
                        {
                            isLazy: $,
                            imgAttributes: ee,
                            heightInt: F,
                            widthInt: W,
                            qualityInt: Y,
                            className: w,
                            imgStyle: Z,
                            blurStyle: J,
                            loading: S,
                            config: z,
                            fill: P,
                            unoptimized: x,
                            placeholder: T,
                            loader: U,
                            srcString: et,
                            onLoadRef: ei,
                            onLoadingCompleteRef: ea,
                            setBlurComplete: K,
                            setShowAltText: X,
                        },
                        R
                    );
                    return r.default.createElement(
                        r.default.Fragment,
                        null,
                        r.default.createElement(v, Object.assign({}, eo, { ref: t })),
                        y
                            ? r.default.createElement(
                                  c.default,
                                  null,
                                  r.default.createElement(
                                      'link',
                                      Object.assign(
                                          {
                                              key: '__nimg-' + ee.src + ee.srcSet + ee.sizes,
                                              rel: 'preload',
                                              as: 'image',
                                              href: ee.srcSet ? void 0 : ee.src,
                                          },
                                          en
                                      )
                                  )
                              )
                            : null
                    );
                });
            (t.default = b),
                ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
                    void 0 === t.default.__esModule &&
                    (Object.defineProperty(t.default, '__esModule', { value: !0 }),
                    Object.assign(t.default, t),
                    (e.exports = t.default));
        },
        95569: function (e, t, n) {
            'use strict';
            Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
            var i = n(92648).Z,
                a = n(17273).Z,
                o = i(n(67294)),
                s = n(14532),
                r = n(83353),
                c = n(61410),
                l = n(79064),
                u = n(370),
                d = n(69955),
                p = n(24224),
                m = n(80508),
                h = n(81516),
                f = n(64266);
            let g = new Set();
            function v(e, t, n, i, a) {
                if (a || r.isLocalURL(t)) {
                    if (!i.bypassPrefetchedCheck) {
                        let a = void 0 !== i.locale ? i.locale : 'locale' in e ? e.locale : void 0,
                            o = t + '%' + n + '%' + a;
                        if (g.has(o)) return;
                        g.add(o);
                    }
                    Promise.resolve(e.prefetch(t, n, i)).catch((e) => {});
                }
            }
            function b(e) {
                return 'string' == typeof e ? e : c.formatUrl(e);
            }
            let x = o.default.forwardRef(function (e, t) {
                let n, i;
                let {
                        href: c,
                        as: g,
                        children: x,
                        prefetch: y,
                        passHref: S,
                        replace: w,
                        shallow: A,
                        scroll: C,
                        locale: _,
                        onClick: P,
                        onMouseEnter: k,
                        onTouchStart: M,
                        legacyBehavior: E = !1,
                    } = e,
                    T = a(e, [
                        'href',
                        'as',
                        'children',
                        'prefetch',
                        'passHref',
                        'replace',
                        'shallow',
                        'scroll',
                        'locale',
                        'onClick',
                        'onMouseEnter',
                        'onTouchStart',
                        'legacyBehavior',
                    ]);
                (n = x),
                    E && ('string' == typeof n || 'number' == typeof n) && (n = o.default.createElement('a', null, n));
                let I = !1 !== y,
                    j = o.default.useContext(d.RouterContext),
                    G = o.default.useContext(p.AppRouterContext),
                    N = null != j ? j : G,
                    B = !j,
                    { href: O, as: L } = o.default.useMemo(() => {
                        if (!j) {
                            let e = b(c);
                            return { href: e, as: g ? b(g) : e };
                        }
                        let [e, t] = s.resolveHref(j, c, !0);
                        return { href: e, as: g ? s.resolveHref(j, g) : t || e };
                    }, [j, c, g]),
                    D = o.default.useRef(O),
                    z = o.default.useRef(L);
                E && (i = o.default.Children.only(n));
                let R = E ? i && 'object' == typeof i && i.ref : t,
                    [U, q, H] = m.useIntersection({ rootMargin: '200px' }),
                    W = o.default.useCallback(
                        (e) => {
                            (z.current !== L || D.current !== O) && (H(), (z.current = L), (D.current = O)),
                                U(e),
                                R && ('function' == typeof R ? R(e) : 'object' == typeof R && (R.current = e));
                        },
                        [L, R, O, H, U]
                    );
                o.default.useEffect(() => {
                    N && q && I && v(N, O, L, { locale: _ }, B);
                }, [L, O, q, _, I, null == j ? void 0 : j.locale, N, B]);
                let F = {
                    ref: W,
                    onClick(e) {
                        E || 'function' != typeof P || P(e),
                            E && i.props && 'function' == typeof i.props.onClick && i.props.onClick(e),
                            N &&
                                !e.defaultPrevented &&
                                (function (e, t, n, i, a, s, c, l, u, d) {
                                    let { nodeName: p } = e.currentTarget,
                                        m = 'A' === p.toUpperCase();
                                    if (
                                        m &&
                                        ((function (e) {
                                            let t = e.currentTarget,
                                                n = t.getAttribute('target');
                                            return (
                                                (n && '_self' !== n) ||
                                                e.metaKey ||
                                                e.ctrlKey ||
                                                e.shiftKey ||
                                                e.altKey ||
                                                (e.nativeEvent && 2 === e.nativeEvent.which)
                                            );
                                        })(e) ||
                                            (!u && !r.isLocalURL(n)))
                                    )
                                        return;
                                    e.preventDefault();
                                    let h = () => {
                                        'beforePopState' in t
                                            ? t[a ? 'replace' : 'push'](n, i, { shallow: s, locale: l, scroll: c })
                                            : t[a ? 'replace' : 'push'](i || n, { forceOptimisticNavigation: !d });
                                    };
                                    u ? o.default.startTransition(h) : h();
                                })(e, N, O, L, w, A, C, _, B, I);
                    },
                    onMouseEnter(e) {
                        E || 'function' != typeof k || k(e),
                            E && i.props && 'function' == typeof i.props.onMouseEnter && i.props.onMouseEnter(e),
                            N && (I || !B) && v(N, O, L, { locale: _, priority: !0, bypassPrefetchedCheck: !0 }, B);
                    },
                    onTouchStart(e) {
                        E || 'function' != typeof M || M(e),
                            E && i.props && 'function' == typeof i.props.onTouchStart && i.props.onTouchStart(e),
                            N && (I || !B) && v(N, O, L, { locale: _, priority: !0, bypassPrefetchedCheck: !0 }, B);
                    },
                };
                if (l.isAbsoluteUrl(L)) F.href = L;
                else if (!E || S || ('a' === i.type && !('href' in i.props))) {
                    let e = void 0 !== _ ? _ : null == j ? void 0 : j.locale,
                        t =
                            (null == j ? void 0 : j.isLocaleDomain) &&
                            h.getDomainLocale(
                                L,
                                e,
                                null == j ? void 0 : j.locales,
                                null == j ? void 0 : j.domainLocales
                            );
                    F.href = t || f.addBasePath(u.addLocale(L, e, null == j ? void 0 : j.defaultLocale));
                }
                return E ? o.default.cloneElement(i, F) : o.default.createElement('a', Object.assign({}, T, F), n);
            });
            (t.default = x),
                ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
                    void 0 === t.default.__esModule &&
                    (Object.defineProperty(t.default, '__esModule', { value: !0 }),
                    Object.assign(t.default, t),
                    (e.exports = t.default));
        },
        80508: function (e, t, n) {
            'use strict';
            Object.defineProperty(t, '__esModule', { value: !0 }),
                (t.useIntersection = function (e) {
                    let { rootRef: t, rootMargin: n, disabled: c } = e,
                        l = c || !o,
                        [u, d] = i.useState(!1),
                        p = i.useRef(null),
                        m = i.useCallback((e) => {
                            p.current = e;
                        }, []);
                    i.useEffect(() => {
                        if (o) {
                            if (l || u) return;
                            let e = p.current;
                            if (e && e.tagName) {
                                let i = (function (e, t, n) {
                                    let {
                                        id: i,
                                        observer: a,
                                        elements: o,
                                    } = (function (e) {
                                        let t;
                                        let n = { root: e.root || null, margin: e.rootMargin || '' },
                                            i = r.find((e) => e.root === n.root && e.margin === n.margin);
                                        if (i && (t = s.get(i))) return t;
                                        let a = new Map(),
                                            o = new IntersectionObserver((e) => {
                                                e.forEach((e) => {
                                                    let t = a.get(e.target),
                                                        n = e.isIntersecting || e.intersectionRatio > 0;
                                                    t && n && t(n);
                                                });
                                            }, e);
                                        return (t = { id: n, observer: o, elements: a }), r.push(n), s.set(n, t), t;
                                    })(n);
                                    return (
                                        o.set(e, t),
                                        a.observe(e),
                                        function () {
                                            if ((o.delete(e), a.unobserve(e), 0 === o.size)) {
                                                a.disconnect(), s.delete(i);
                                                let e = r.findIndex((e) => e.root === i.root && e.margin === i.margin);
                                                e > -1 && r.splice(e, 1);
                                            }
                                        }
                                    );
                                })(e, (e) => e && d(e), { root: null == t ? void 0 : t.current, rootMargin: n });
                                return i;
                            }
                        } else if (!u) {
                            let e = a.requestIdleCallback(() => d(!0));
                            return () => a.cancelIdleCallback(e);
                        }
                    }, [l, n, t, u, p.current]);
                    let h = i.useCallback(() => {
                        d(!1);
                    }, []);
                    return [m, u, h];
                });
            var i = n(67294),
                a = n(10029);
            let o = 'function' == typeof IntersectionObserver,
                s = new Map(),
                r = [];
            ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
                void 0 === t.default.__esModule &&
                (Object.defineProperty(t.default, '__esModule', { value: !0 }),
                Object.assign(t.default, t),
                (e.exports = t.default));
        },
        97757: function (e, t) {
            'use strict';
            Object.defineProperty(t, '__esModule', { value: !0 }),
                (t.getImageBlurSvg = function (e) {
                    let { widthInt: t, heightInt: n, blurWidth: i, blurHeight: a, blurDataURL: o, objectFit: s } = e,
                        r = i || t,
                        c = a || n,
                        l = o.startsWith('data:image/jpeg')
                            ? "%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%"
                            : '';
                    return r && c
                        ? "%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 "
                              .concat(r, ' ')
                              .concat(
                                  c,
                                  "'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='"
                              )
                              .concat(i && a ? '1' : '20', "'/%3E")
                              .concat(
                                  l,
                                  "%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='"
                              )
                              .concat(o, "'/%3E%3C/svg%3E")
                        : "%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='"
                              .concat(
                                  'contain' === s ? 'xMidYMid' : 'cover' === s ? 'xMidYMid slice' : 'none',
                                  "' x='0' y='0' height='100%25' width='100%25' href='"
                              )
                              .concat(o, "'/%3E%3C/svg%3E");
                });
        },
        57746: function (e, t) {
            'use strict';
            function n(e) {
                let { config: t, src: n, width: i, quality: a } = e;
                return ''
                    .concat(t.path, '?url=')
                    .concat(encodeURIComponent(n), '&w=')
                    .concat(i, '&q=')
                    .concat(a || 75);
            }
            Object.defineProperty(t, '__esModule', { value: !0 }),
                (t.default = void 0),
                (n.__next_img_default = !0),
                (t.default = n);
        },
        24013: function (e, t, n) {
            'use strict';
            n.r(t),
                n.d(t, {
                    default: function () {
                        return j;
                    },
                });
            var i = n(85893);
            n(64627), n(84494);
            var a = n(25675),
                o = n.n(a),
                s = n(67294),
                r = n(19755),
                c = n.n(r);
            let l = (e) => {
                let { path: t } = e;
                return (0, i.jsx)(i.Fragment, {
                    children: (0, i.jsx)('div', {
                        className: 'mininav container d-md-none d-block',
                        id: 'mininav',
                        children: (0, i.jsxs)('div', {
                            className: 'overlay-menu container d-flex flex-wrap gap-3 p-3 mininav-cont',
                            children: [
                                (0, i.jsxs)('div', {
                                    className: 'menu mt-4 d-flex flex-column ',
                                    children: [
                                        (0, i.jsx)('p', {
                                            className: 'c-fs-3 c-fw-sb text-grey text-uppercase ',
                                            children: 'Applications',
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/hello'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/hello.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className: '',
                                                    children: [
                                                        (0, i.jsx)('h4', { className: 'c-fs-2', children: 'Hello' }),
                                                        (0, i.jsx)('p', {
                                                            className: 'c-fs-5',
                                                            children: 'Ticketing and Chat',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/campaign'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/campaign.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className: '',
                                                    children: [
                                                        (0, i.jsx)('h4', { className: 'c-fs-2', children: 'Campaign' }),
                                                        (0, i.jsx)('p', {
                                                            className: 'c-fs-5',
                                                            children: 'Event Based Automation',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/segmento'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/segmento.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className: '',
                                                    children: [
                                                        (0, i.jsx)('h4', { className: 'c-fs-2', children: 'Segmento' }),
                                                        (0, i.jsx)('p', {
                                                            className: 'c-fs-5',
                                                            children: 'Contact Managment',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/otp'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/otp.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className: '',
                                                    children: [
                                                        (0, i.jsx)('h4', { className: 'c-fs-2', children: 'OTP' }),
                                                        (0, i.jsx)('p', {
                                                            className: 'c-fs-5',
                                                            children: 'Simplified OTP Platform',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, i.jsxs)('div', {
                                    className: 'menu mt-4 d-flex flex-column',
                                    children: [
                                        (0, i.jsx)('p', {
                                            className: 'c-fs-3 c-fw-sb text-grey text-uppercase ',
                                            children: 'Utilities',
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/shorturl'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/shorturl.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className: '',
                                                    children: [
                                                        (0, i.jsx)('h4', { className: 'c-fs-2', children: 'Shorturl' }),
                                                        (0, i.jsx)('p', {
                                                            className: 'c-fs-5',
                                                            children: "Cutomise and Track URL's",
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/knowledgebase'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/knowledgebase.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsxs)('div', {
                                                    className: '',
                                                    children: [
                                                        (0, i.jsx)('h4', {
                                                            className: 'c-fs-2',
                                                            children: 'KnowledgeBase',
                                                        }),
                                                        (0, i.jsx)('p', {
                                                            className: 'c-fs-5',
                                                            children: 'Manage Help Docs and Guides',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, i.jsxs)('div', {
                                    className: 'menu mt-4 d-flex flex-column ',
                                    children: [
                                        (0, i.jsx)('p', {
                                            className: 'c-fs-3 c-fw-sb text-grey text-uppercase ',
                                            children: 'Channels',
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/sms'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/sms.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsx)('h4', { className: 'c-fs-2', children: 'SMS' }),
                                            ],
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/email'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/email.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsx)('h4', { className: 'c-fs-2', children: 'Email' }),
                                            ],
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/voice'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/voice.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsx)('h4', { className: 'c-fs-2', children: 'Voice' }),
                                            ],
                                        }),
                                        (0, i.jsxs)('a', {
                                            className: 'd-flex gap-3 align-items-center product-menu-btn p-3',
                                            href: ''.concat(t, '/whatsapp'),
                                            children: [
                                                (0, i.jsx)(o(), {
                                                    src: '/img/icon/whatsapp.svg',
                                                    width: 40,
                                                    height: 40,
                                                    alt: 'ico',
                                                }),
                                                (0, i.jsx)('h4', { className: 'c-fs-2', children: 'WhatsApp' }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                });
            };
            var u = n(11163),
                d = n(5434);
            let p = (e) => {
                var t,
                    n,
                    a,
                    s,
                    r,
                    c,
                    l,
                    u,
                    p,
                    m,
                    h,
                    f,
                    g,
                    v,
                    b,
                    x,
                    y,
                    S,
                    w,
                    A,
                    C,
                    _,
                    P,
                    k,
                    M,
                    E,
                    T,
                    I,
                    j,
                    G,
                    N,
                    B,
                    O,
                    L,
                    D,
                    z,
                    R,
                    U,
                    q,
                    H,
                    W,
                    F,
                    $,
                    V,
                    K,
                    Q,
                    X,
                    Y,
                    Z,
                    J,
                    ee,
                    et,
                    en,
                    ei,
                    ea,
                    eo,
                    es,
                    er,
                    ec,
                    el,
                    eu,
                    ed,
                    ep,
                    em,
                    eh,
                    ef,
                    eg,
                    ev,
                    eb,
                    ex,
                    ey,
                    eS,
                    ew,
                    eA,
                    eC;
                let { path: e_, compData: eP } = e;
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        (0, i.jsx)('div', { className: 'bg-overlay', id: 'bgoverlay' }),
                        (0, i.jsxs)('div', {
                            className: 'overlay-menu-cont d-flex justify-content-end',
                            id: 'overlaymenucont',
                            children: [
                                (0, i.jsxs)('div', {
                                    className: 'overlay-menu d-flex flex-wrap gap-5',
                                    id: 'productmenu',
                                    children: [
                                        (0, i.jsxs)('div', {
                                            className: 'menu mt-4 d-flex flex-column ',
                                            children: [
                                                (0, i.jsx)('p', {
                                                    className: 'c-fs-3 c-fw-sb text-grey text-uppercase ',
                                                    children: ''.concat(
                                                        (null == eP
                                                            ? void 0
                                                            : null === (t = eP.products) || void 0 === t
                                                              ? void 0
                                                              : null === (n = t.applications) || void 0 === n
                                                                ? void 0
                                                                : n.heading) || 'Applications'
                                                    ),
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/hello'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/hello.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsxs)('div', {
                                                            className: '',
                                                            children: [
                                                                (0, i.jsx)('h4', {
                                                                    className: 'c-fs-2',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (a =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (s = eP.products) ||
                                                                                        void 0 === s
                                                                                      ? void 0
                                                                                      : null === (r = s.applications) ||
                                                                                          void 0 === r
                                                                                        ? void 0
                                                                                        : r.content[0]) || void 0 === a
                                                                            ? void 0
                                                                            : a.name) || 'Hello'
                                                                    ),
                                                                }),
                                                                (0, i.jsx)('p', {
                                                                    className: 'c-fs-5',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (c =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (l = eP.products) ||
                                                                                        void 0 === l
                                                                                      ? void 0
                                                                                      : null === (u = l.applications) ||
                                                                                          void 0 === u
                                                                                        ? void 0
                                                                                        : u.content[0]) || void 0 === c
                                                                            ? void 0
                                                                            : c.description) || 'Ticketing and Chat'
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/campaign'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/campaign.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsxs)('div', {
                                                            className: '',
                                                            children: [
                                                                (0, i.jsx)('h4', {
                                                                    className: 'c-fs-2',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (p =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (m = eP.products) ||
                                                                                        void 0 === m
                                                                                      ? void 0
                                                                                      : null === (h = m.applications) ||
                                                                                          void 0 === h
                                                                                        ? void 0
                                                                                        : h.content[1]) || void 0 === p
                                                                            ? void 0
                                                                            : p.name) || 'Campaign'
                                                                    ),
                                                                }),
                                                                (0, i.jsx)('p', {
                                                                    className: 'c-fs-5',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (f =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (g = eP.products) ||
                                                                                        void 0 === g
                                                                                      ? void 0
                                                                                      : null === (v = g.applications) ||
                                                                                          void 0 === v
                                                                                        ? void 0
                                                                                        : v.content[1]) || void 0 === f
                                                                            ? void 0
                                                                            : f.description) || 'Event Based Automation'
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/segmento'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/segmento.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsxs)('div', {
                                                            className: '',
                                                            children: [
                                                                (0, i.jsx)('h4', {
                                                                    className: 'c-fs-2',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (b =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (x = eP.products) ||
                                                                                        void 0 === x
                                                                                      ? void 0
                                                                                      : null === (y = x.applications) ||
                                                                                          void 0 === y
                                                                                        ? void 0
                                                                                        : y.content[2]) || void 0 === b
                                                                            ? void 0
                                                                            : b.name) || 'Segmento'
                                                                    ),
                                                                }),
                                                                (0, i.jsx)('p', {
                                                                    className: 'c-fs-5',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (S =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (w = eP.products) ||
                                                                                        void 0 === w
                                                                                      ? void 0
                                                                                      : null === (A = w.applications) ||
                                                                                          void 0 === A
                                                                                        ? void 0
                                                                                        : A.content[2]) || void 0 === S
                                                                            ? void 0
                                                                            : S.description) || 'Contact Management'
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/otp'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/otp.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsxs)('div', {
                                                            className: '',
                                                            children: [
                                                                (0, i.jsx)('h4', {
                                                                    className: 'c-fs-2',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (C =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (_ = eP.products) ||
                                                                                        void 0 === _
                                                                                      ? void 0
                                                                                      : null === (P = _.applications) ||
                                                                                          void 0 === P
                                                                                        ? void 0
                                                                                        : P.content[3]) || void 0 === C
                                                                            ? void 0
                                                                            : C.name) || 'OTP'
                                                                    ),
                                                                }),
                                                                (0, i.jsx)('p', {
                                                                    className: 'c-fs-5',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (k =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (M = eP.products) ||
                                                                                        void 0 === M
                                                                                      ? void 0
                                                                                      : null === (E = M.applications) ||
                                                                                          void 0 === E
                                                                                        ? void 0
                                                                                        : E.content[3]) || void 0 === k
                                                                            ? void 0
                                                                            : k.description) ||
                                                                            'Simplified OTP Platform'
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('div', {
                                            className: 'menu mt-4 d-flex flex-column',
                                            children: [
                                                (0, i.jsx)('p', {
                                                    className: 'c-fs-3 c-fw-sb text-grey text-uppercase ',
                                                    children: ''.concat(
                                                        (null == eP
                                                            ? void 0
                                                            : null === (T = eP.products) || void 0 === T
                                                              ? void 0
                                                              : null === (I = T.channels) || void 0 === I
                                                                ? void 0
                                                                : I.heading) || 'Channels'
                                                    ),
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/sms'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/sms.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsx)('h4', {
                                                            className: 'c-fs-2',
                                                            children: ''.concat(
                                                                (null ===
                                                                    (j =
                                                                        null == eP
                                                                            ? void 0
                                                                            : null === (G = eP.products) || void 0 === G
                                                                              ? void 0
                                                                              : null === (N = G.channels) ||
                                                                                  void 0 === N
                                                                                ? void 0
                                                                                : N.content[0]) || void 0 === j
                                                                    ? void 0
                                                                    : j.name) || 'SMS'
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/rcs'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/rcs.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsx)('h4', {
                                                            className: 'c-fs-2',
                                                            children: ''.concat(
                                                                (null ===
                                                                    (B =
                                                                        null == eP
                                                                            ? void 0
                                                                            : null === (O = eP.products) || void 0 === O
                                                                              ? void 0
                                                                              : null === (L = O.channels) ||
                                                                                  void 0 === L
                                                                                ? void 0
                                                                                : L.content[1]) || void 0 === B
                                                                    ? void 0
                                                                    : B.name) || 'RCS'
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/email'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/email.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsx)('h4', {
                                                            className: 'c-fs-2',
                                                            children: ''.concat(
                                                                (null ===
                                                                    (D =
                                                                        null == eP
                                                                            ? void 0
                                                                            : null === (z = eP.products) || void 0 === z
                                                                              ? void 0
                                                                              : null === (R = z.channels) ||
                                                                                  void 0 === R
                                                                                ? void 0
                                                                                : R.content[2]) || void 0 === D
                                                                    ? void 0
                                                                    : D.name) || 'Email'
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/whatsapp'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/whatsapp.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsx)('h4', {
                                                            className: 'c-fs-2',
                                                            children: ''.concat(
                                                                (null ===
                                                                    (U =
                                                                        null == eP
                                                                            ? void 0
                                                                            : null === (q = eP.products) || void 0 === q
                                                                              ? void 0
                                                                              : null === (H = q.channels) ||
                                                                                  void 0 === H
                                                                                ? void 0
                                                                                : H.content[3]) || void 0 === U
                                                                    ? void 0
                                                                    : U.name) || 'WhatsApp'
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/voice'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/voice.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsx)('h4', {
                                                            className: 'c-fs-2',
                                                            children: ''.concat(
                                                                (null ===
                                                                    (W =
                                                                        null == eP
                                                                            ? void 0
                                                                            : null === (F = eP.products) || void 0 === F
                                                                              ? void 0
                                                                              : null === ($ = F.channels) ||
                                                                                  void 0 === $
                                                                                ? void 0
                                                                                : $.content[4]) || void 0 === W
                                                                    ? void 0
                                                                    : W.name) || 'Voice'
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/numbers'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/numbers.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsx)('h4', {
                                                            className: 'c-fs-2',
                                                            children: ''.concat(
                                                                (null ===
                                                                    (V =
                                                                        null == eP
                                                                            ? void 0
                                                                            : null === (K = eP.products) || void 0 === K
                                                                              ? void 0
                                                                              : null === (Q = K.channels) ||
                                                                                  void 0 === Q
                                                                                ? void 0
                                                                                : Q.content[5]) || void 0 === V
                                                                    ? void 0
                                                                    : V.name) || 'Numbers'
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, i.jsxs)('div', {
                                            className: 'menu mt-4 d-flex flex-column',
                                            children: [
                                                (0, i.jsx)('p', {
                                                    className: 'c-fs-3 c-fw-sb text-grey text-uppercase ',
                                                    children: ''.concat(
                                                        (null == eP
                                                            ? void 0
                                                            : null === (X = eP.products) || void 0 === X
                                                              ? void 0
                                                              : null === (Y = X.utilities) || void 0 === Y
                                                                ? void 0
                                                                : Y.heading) || 'Utilities'
                                                    ),
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/shorturl'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/shorturl.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsxs)('div', {
                                                            className: '',
                                                            children: [
                                                                (0, i.jsx)('h4', {
                                                                    className: 'c-fs-2',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (Z =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (J = eP.products) ||
                                                                                        void 0 === J
                                                                                      ? void 0
                                                                                      : null === (ee = J.utilities) ||
                                                                                          void 0 === ee
                                                                                        ? void 0
                                                                                        : ee.content[0]) || void 0 === Z
                                                                            ? void 0
                                                                            : Z.name) || 'URL Shortener'
                                                                    ),
                                                                }),
                                                                (0, i.jsx)('p', {
                                                                    className: 'c-fs-5',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (et =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (en = eP.products) ||
                                                                                        void 0 === en
                                                                                      ? void 0
                                                                                      : null === (ei = en.utilities) ||
                                                                                          void 0 === ei
                                                                                        ? void 0
                                                                                        : ei.content[0]) ||
                                                                        void 0 === et
                                                                            ? void 0
                                                                            : et.description) ||
                                                                            "Cutomise and Track URL's"
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                    href: ''.concat(e_, '/knowledgebase'),
                                                    children: [
                                                        (0, i.jsx)(o(), {
                                                            src: '/img/icon/knowledgebase.svg',
                                                            width: 40,
                                                            height: 40,
                                                            alt: 'ico',
                                                        }),
                                                        (0, i.jsxs)('div', {
                                                            className: '',
                                                            children: [
                                                                (0, i.jsx)('h4', {
                                                                    className: 'c-fs-2',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (ea =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (eo = eP.products) ||
                                                                                        void 0 === eo
                                                                                      ? void 0
                                                                                      : null === (es = eo.utilities) ||
                                                                                          void 0 === es
                                                                                        ? void 0
                                                                                        : es.content[1]) ||
                                                                        void 0 === ea
                                                                            ? void 0
                                                                            : ea.name) || 'KnowledgeBase'
                                                                    ),
                                                                }),
                                                                (0, i.jsx)('p', {
                                                                    className: 'c-fs-5',
                                                                    children: ''.concat(
                                                                        (null ===
                                                                            (er =
                                                                                null == eP
                                                                                    ? void 0
                                                                                    : null === (ec = eP.products) ||
                                                                                        void 0 === ec
                                                                                      ? void 0
                                                                                      : null === (el = ec.utilities) ||
                                                                                          void 0 === el
                                                                                        ? void 0
                                                                                        : el.content[1]) ||
                                                                        void 0 === er
                                                                            ? void 0
                                                                            : er.description) ||
                                                                            'Manage Help Docs and Guides'
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, i.jsx)('div', {
                                    className: 'overlay-menu d-flex flex-wrap gap-3',
                                    id: 'integrationsmenu',
                                    children: (0, i.jsxs)('div', {
                                        className: 'menu mt-4 d-flex flex-column ',
                                        children: [
                                            (0, i.jsxs)('a', {
                                                className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                href: 'https://apps.shopify.com/msg91',
                                                target: '_blank',
                                                children: [
                                                    (0, i.jsx)(o(), {
                                                        src: '/img/integrations/shopify.svg',
                                                        width: 40,
                                                        height: 40,
                                                        alt: 'ico',
                                                    }),
                                                    (0, i.jsx)('h4', {
                                                        className: 'c-fs-2',
                                                        children: ''.concat(
                                                            (null ===
                                                                (eu =
                                                                    null == eP
                                                                        ? void 0
                                                                        : null === (ed = eP.integrations) ||
                                                                            void 0 === ed
                                                                          ? void 0
                                                                          : ed.content[0]) || void 0 === eu
                                                                ? void 0
                                                                : eu.name) || 'Shopify'
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            (0, i.jsxs)('a', {
                                                className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                href: '/partners-and-integrations/tally',
                                                target: '_blank',
                                                children: [
                                                    (0, i.jsx)(o(), {
                                                        src: '/img/integrations/tally.jpeg',
                                                        width: 40,
                                                        height: 40,
                                                        alt: 'ico',
                                                    }),
                                                    (0, i.jsxs)('h4', {
                                                        className: 'c-fs-2',
                                                        children: [
                                                            ''.concat(
                                                                (null ===
                                                                    (ep =
                                                                        null == eP
                                                                            ? void 0
                                                                            : null === (em = eP.integrations) ||
                                                                                void 0 === em
                                                                              ? void 0
                                                                              : em.content[1]) || void 0 === ep
                                                                    ? void 0
                                                                    : ep.name) || 'Tally'
                                                            ),
                                                            ' ',
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, i.jsxs)('a', {
                                                className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                href: '/partners-and-integrations/zapier',
                                                children: [
                                                    (0, i.jsx)(o(), {
                                                        src: '/img/integrations/zapier.svg',
                                                        width: 40,
                                                        height: 40,
                                                        alt: 'ico',
                                                    }),
                                                    (0, i.jsx)('h4', {
                                                        className: 'c-fs-2',
                                                        children: ''.concat(
                                                            (null ===
                                                                (eh =
                                                                    null == eP
                                                                        ? void 0
                                                                        : null === (ef = eP.integrations) ||
                                                                            void 0 === ef
                                                                          ? void 0
                                                                          : ef.content[2]) || void 0 === eh
                                                                ? void 0
                                                                : eh.name) || 'Zapier'
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            (0, i.jsxs)('a', {
                                                className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                href: '/partners-and-integrations/freshworks',
                                                children: [
                                                    (0, i.jsx)(o(), {
                                                        src: '/img/integrations/freshworks.svg',
                                                        width: 40,
                                                        height: 40,
                                                        alt: 'ico',
                                                    }),
                                                    (0, i.jsx)('h4', {
                                                        className: 'c-fs-2',
                                                        children: ''.concat(
                                                            (null ===
                                                                (eg =
                                                                    null == eP
                                                                        ? void 0
                                                                        : null === (ev = eP.integrations) ||
                                                                            void 0 === ev
                                                                          ? void 0
                                                                          : ev.content[3]) || void 0 === eg
                                                                ? void 0
                                                                : eg.name) || 'Freshworks'
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            (0, i.jsxs)('a', {
                                                className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                href: '/partners-and-integrations/firebase',
                                                children: [
                                                    (0, i.jsx)(o(), {
                                                        src: '/img/integrations/firebase-logo.svg',
                                                        width: 40,
                                                        height: 40,
                                                        alt: 'ico',
                                                    }),
                                                    (0, i.jsx)('h4', {
                                                        className: 'c-fs-2',
                                                        children: ''.concat(
                                                            (null ===
                                                                (eb =
                                                                    null == eP
                                                                        ? void 0
                                                                        : null === (ex = eP.integrations) ||
                                                                            void 0 === ex
                                                                          ? void 0
                                                                          : ex.content[4]) || void 0 === eb
                                                                ? void 0
                                                                : eb.name) || 'Firebase'
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            (0, i.jsxs)('a', {
                                                className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                href: '/partners-and-integrations/hubspot',
                                                children: [
                                                    (0, i.jsx)(o(), {
                                                        src: '/img/integrations/hubspot-logo.svg',
                                                        width: 40,
                                                        height: 40,
                                                        alt: 'ico',
                                                    }),
                                                    (0, i.jsx)('h4', {
                                                        className: 'c-fs-2',
                                                        children: ''.concat(
                                                            (null ===
                                                                (ey =
                                                                    null == eP
                                                                        ? void 0
                                                                        : null === (eS = eP.integrations) ||
                                                                            void 0 === eS
                                                                          ? void 0
                                                                          : eS.content[5]) || void 0 === ey
                                                                ? void 0
                                                                : ey.name) || 'HubSpot'
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            (0, i.jsxs)('a', {
                                                className: 'd-flex gap-3 align-items-center product-menu-btn py-3',
                                                href: 'https://msg91.com/help/how-to-send-sms-and-email-from-google-spreadsheet',
                                                target: '_blank',
                                                children: [
                                                    (0, i.jsx)(o(), {
                                                        src: '/img/integrations/google-sheets.svg',
                                                        width: 40,
                                                        height: 40,
                                                        alt: 'ico',
                                                    }),
                                                    (0, i.jsx)('h4', {
                                                        className: 'c-fs-2',
                                                        children: ''.concat(
                                                            (null ===
                                                                (ew =
                                                                    null == eP
                                                                        ? void 0
                                                                        : null === (eA = eP.integrations) ||
                                                                            void 0 === eA
                                                                          ? void 0
                                                                          : eA.content[6]) || void 0 === ew
                                                                ? void 0
                                                                : ew.name) || 'Google Sheets'
                                                        ),
                                                    }),
                                                ],
                                            }),
                                            (0, i.jsxs)('a', {
                                                className: 'd-flex gap-3 align-items-center mt-4',
                                                href: '/partners-and-integrations',
                                                children: [
                                                    (0, i.jsx)('span', {
                                                        children: ''.concat(
                                                            (null == eP
                                                                ? void 0
                                                                : null === (eC = eP.integrations) || void 0 === eC
                                                                  ? void 0
                                                                  : eC.morebtn) || 'Explore More Plugins'
                                                        ),
                                                    }),
                                                    (0, i.jsx)(d.AeI, {}),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                    ],
                });
            };
            n(73066);
            var m = n(27918),
                h = n(15269),
                f = n(83454);
            let g = f.env.LOGIN_URL,
                v = (e) => {
                    var t;
                    let { path: n, compData: a, pathArray: o } = e,
                        [r, c] = (0, s.useState)(''),
                        [l, u] = (0, s.useState)('/?'),
                        [p, f] = (0, s.useState)('English');
                    return (
                        (0, s.useEffect)(() => {
                            for (let e in ((null == (n = n || (0, h.ej)('country_code'))
                                ? void 0
                                : n.startsWith('/')) && (n = n.substring(1)),
                            f('br' === n ? 'English' : 'Portuguese'),
                            r || (c('Global'), u('/?')),
                            m))
                                if ((null == n ? void 0 : n.toUpperCase()) === m[e].shortname) {
                                    c(m[e].name),
                                        (0, h.d8)('country_code', m[e].shortname.toLowerCase(), 30),
                                        u(m[e].shortname.toLowerCase());
                                    break;
                                }
                        }, []),
                        (0, i.jsx)(i.Fragment, {
                            children: (0, i.jsx)('div', {
                                className: 'section b-bottom-1',
                                children: (0, i.jsxs)('div', {
                                    className:
                                        'container d-flex align-items-center justify-content-between notification',
                                    children: [
                                        (0, i.jsx)('div', { className: 'my-2 d-flex align-items-center' }),
                                        (0, i.jsxs)('div', {
                                            className: 'd-flex gap-4 align-items-center justify-content-end',
                                            children: [
                                                ('br' === o[1] || 'br-pt' === o[1]) &&
                                                    (0, i.jsxs)('div', {
                                                        className: 'dropdown d-flex align-items-center',
                                                        children: [
                                                            (0, i.jsxs)('a', {
                                                                href: void 0,
                                                                className: 'align-items-center d-flex text-dark cp',
                                                                'data-bs-toggle': 'dropdown',
                                                                'aria-expanded': 'false',
                                                                role: 'button',
                                                                children: [
                                                                    (0, i.jsx)(d.vhT, { className: 'me-1' }),
                                                                    (0, i.jsx)('span', {
                                                                        className: 'c-fs-5 d-flex align-items-center',
                                                                        children: p,
                                                                    }),
                                                                    (0, i.jsx)(d.Yc6, { className: 'ms-1' }),
                                                                ],
                                                            }),
                                                            (0, i.jsxs)('ul', {
                                                                className: 'dropdown-menu',
                                                                children: [
                                                                    (0, i.jsx)('li', {
                                                                        children: (0, i.jsx)('a', {
                                                                            href: '/br',
                                                                            className: 'dropdown-item c-fs-5',
                                                                            children: 'English',
                                                                        }),
                                                                    }),
                                                                    (0, i.jsx)('li', {
                                                                        children: (0, i.jsx)('a', {
                                                                            href: '/br-pt',
                                                                            className: 'dropdown-item c-fs-5',
                                                                            children: 'Portuguese',
                                                                        }),
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                (0, i.jsxs)('div', {
                                                    className: 'dropdown d-flex d-flex  align-items-center',
                                                    children: [
                                                        (0, i.jsxs)('a', {
                                                            href: void 0,
                                                            className: 'align-items-center d-flex text-dark cp',
                                                            'data-bs-toggle': 'dropdown',
                                                            'aria-expanded': 'false',
                                                            role: 'button',
                                                            children: [
                                                                '/?' === l || '?' === l || '' === l || '/' === l
                                                                    ? (0, i.jsx)(d.$lZ, { className: 'me-1' })
                                                                    : (0, i.jsx)('img', {
                                                                          src: '/assets/country-flags/'.concat(
                                                                              'br-pt' === l ? 'br' : l,
                                                                              '.svg'
                                                                          ),
                                                                          className: 'nav-flag',
                                                                      }),
                                                                (0, i.jsx)('span', {
                                                                    className: 'c-fs-5 d-flex align-items-center',
                                                                    children: r,
                                                                }),
                                                                (0, i.jsx)(d.Yc6, { className: 'ms-1' }),
                                                            ],
                                                        }),
                                                        (0, i.jsxs)('ul', {
                                                            className: 'dropdown-menu',
                                                            id: 'change-country',
                                                            children: [
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/?',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)(d.$lZ, { className: 'me-2' }),
                                                                            'Global',
                                                                        ],
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/in',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)('img', {
                                                                                src: '/assets/country-flags/in.svg',
                                                                                className: 'nav-flag',
                                                                            }),
                                                                            'India',
                                                                        ],
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/br-pt',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)('img', {
                                                                                src: '/assets/country-flags/br.svg',
                                                                                className: 'nav-flag',
                                                                            }),
                                                                            'Brazil',
                                                                        ],
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/ae',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)('img', {
                                                                                src: '/assets/country-flags/ae.svg',
                                                                                className: 'nav-flag',
                                                                            }),
                                                                            'United Arab Emirates',
                                                                        ],
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/ph',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)('img', {
                                                                                src: '/assets/country-flags/ph.svg',
                                                                                className: 'nav-flag',
                                                                            }),
                                                                            'Philippines',
                                                                        ],
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/sg',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)('img', {
                                                                                src: '/assets/country-flags/sg.svg',
                                                                                className: 'nav-flag',
                                                                            }),
                                                                            'Singapore',
                                                                        ],
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/es',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)('img', {
                                                                                src: '/assets/country-flags/es.svg',
                                                                                className: 'nav-flag',
                                                                            }),
                                                                            'Spain',
                                                                        ],
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/gb',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)('img', {
                                                                                src: '/assets/country-flags/gb.svg',
                                                                                className: 'nav-flag',
                                                                            }),
                                                                            'United Kingdom',
                                                                        ],
                                                                    }),
                                                                }),
                                                                (0, i.jsx)('li', {
                                                                    children: (0, i.jsxs)('a', {
                                                                        href: '/us',
                                                                        className:
                                                                            'dropdown-item c-fs-5 d-flex align-items-center',
                                                                        children: [
                                                                            (0, i.jsx)('img', {
                                                                                src: '/assets/country-flags/us.svg',
                                                                                className: 'nav-flag',
                                                                            }),
                                                                            'United States',
                                                                        ],
                                                                    }),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, i.jsx)('a', {
                                                    href: '/contact-us',
                                                    className: 'text-dark',
                                                    children: (0, i.jsxs)('span', {
                                                        className: 'c-fs-5 d-flex align-items-center',
                                                        children: [
                                                            (0, i.jsx)(d.fFs, { className: 'me-1' }),
                                                            null == a
                                                                ? void 0
                                                                : null === (t = a.notification) || void 0 === t
                                                                  ? void 0
                                                                  : t.contact,
                                                        ],
                                                    }),
                                                }),
                                                (0, i.jsx)('a', {
                                                    href: ''.concat(g, '/signin/'),
                                                    className: 'text-dark utm',
                                                    children: (0, i.jsxs)('span', {
                                                        className: 'c-fs-5 d-flex align-items-center',
                                                        children: [
                                                            (0, i.jsx)(d.HOZ, { className: 'me-1' }),
                                                            null == a ? void 0 : a.notification.login,
                                                        ],
                                                    }),
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        })
                    );
                };
            var b = n(41664),
                x = n.n(b),
                y = n(72588),
                S = JSON.parse(
                    '{"w":{"m":{"notification":{"contact":"Contact","login":"Login"},"menu":{"products":"Products","integrations":"Integrations","pricing":"Pricing","api":"API Documentation","signup":"Sign Up"},"products":{"applications":{"heading":"Applications","content":[{"slug":"hello","name":"Hello","description":"Ticketing and Chat"},{"slug":"campaign","name":"Campaign","description":"Event-Based Automation"},{"slug":"segmento","name":"Segment","description":"Contact Management"},{"slug":"otp","name":"OTP","description":"Simplified OTP Platform"}]},"channels":{"heading":"Channels","content":[{"slug":"sms","name":"SMS"},{"slug":"rcs","name":"RCS"},{"slug":"email","name":"Email"},{"slug":"whatsapp","name":"WhatsApp"},{"slug":"voice","name":"Voice"},{"slug":"numbers","name":"Numbers"}]},"utilities":{"heading":"Utilities","content":[{"slug":"shortenerurl","name":"URL Shortener","description":"Customize and Track URLs"},{"slug":"knowledgeBase","name":"Knowledge Base","description":"Manage Help Documents and Guides"}]}},"integrations":{"morebtn":"Explore More Plugins","content":[{"slug":"shopify","name":"Shopify","link":"https://apps.shopify.com/msg91"},{"slug":"tally","name":"Tally","link":"https://msg91.com/partners-and-integrations/tally"},{"slug":"zapier","name":"Zapier","link":"https://msg91.com/partners-and-integrations/zapier"},{"slug":"freshworks","name":"Freshworks","link":"https://msg91.com/partners-and-integrations/freshworks"},{"slug":"firebase","name":"Firebase","link":"https://msg91.com/partners-and-integrations/firebase"},{"slug":"hubspot","name":"HubSpot","link":"https://msg91.com/partners-and-integrations/hubspot"},{"slug":"googlesheets","name":"Google Sheets","link":"https://msg91.com/help/how-to-send-sms-and-email-from-google-spreadsheet"},{"slug":"","name":"Explore More Plugins","link":"https://msg91.com/partners-and-integrations"}]}}}}'
                );
            let w = (e) => {
                let { browserPath: t, pricingPath: n, path: a, pageSlug: o, pathArray: r } = e,
                    u = '/br-pt' === t ? y.components.navbar : S.w.m,
                    m = 3 === a.length || '/br-pt' === a ? a : '/';
                var f,
                    g,
                    b,
                    w,
                    A,
                    C = {
                        '/sms': 'SMS',
                        '/email': 'Email',
                        '/voice': 'Voice',
                        '/whatsapp': 'WhatsApp',
                        '/rcs': 'RCS',
                        '/otp': 'OTP',
                        '/numbers': 'Numbers',
                        '/hello': 'Hello',
                        '/segmento': 'Segmento',
                        '/campaign': 'Campaign',
                        '/shorturl': 'URL Shortener',
                        '/knowledgebase': 'KnowledgeBase',
                    }[o];
                let [_, P] = (0, s.useState)(!1),
                    [k, M] = (0, s.useState)(''),
                    [E, T] = (0, s.useState)(!1);
                (0, s.useEffect)(() => {
                    c()('#product-link').on('mouseenter', function () {
                        c()('#overlaymenucont, #productmenu, #bgoverlay').addClass('active'),
                            c()('#integrationsmenu').removeClass('active'),
                            c()('body').addClass('oh');
                    }),
                        c()('#integrations-link').on('mouseenter', function () {
                            c()('#overlaymenucont, #integrationsmenu, #bgoverlay').addClass('active'),
                                c()('#productmenu').removeClass('active'),
                                c()('body').addClass('oh');
                        }),
                        c()('#pricing-link').on('mouseenter', function () {
                            c()('#overlaymenucont, #productmenu, #bgoverlay, #integrationsmenu').removeClass('active'),
                                c()('body').removeClass('oh');
                        }),
                        c()('#bgoverlay').on('mouseenter', function () {
                            c()('#overlaymenucont, #productmenu, #bgoverlay, #integrationsmenu').removeClass('active'),
                                c()('body').removeClass('oh');
                        }),
                        c()('#mininav-tog-open').on('click', function () {
                            c()('body').addClass('overflow-hidden'),
                                c()('#mininav-tog-open').addClass('d-none'),
                                c()('#mininav-tog-hidden').addClass('d-block'),
                                c()('#mininav-tog-hidden').removeClass('d-none');
                        }),
                        c()('#mininav-tog-hidden').on('click', function () {
                            c()('body').removeClass('overflow-hidden'),
                                c()('#mininav-tog-hidden').addClass('d-none'),
                                c()('#mininav-tog-open').addClass('d-block'),
                                c()('#mininav-tog-open').removeClass('d-none');
                        }),
                        M((0, h.ej)('country_code'));
                }, []);
                let [I, j] = (0, s.useState)(!0),
                    G = () => {
                        j(!I);
                    };
                return (0, i.jsxs)(i.Fragment, {
                    children: [
                        E && (0, i.jsx)(l, { path: a }),
                        (0, i.jsx)('div', {
                            className: 'd-none d-md-block',
                            children: (0, i.jsx)(v, { path: a, compData: u, pathArray: r }),
                        }),
                        (0, i.jsxs)('nav', {
                            className: 'w-100 py-2 sticy align-items-center d-flex ',
                            id: 'navbar',
                            children: [
                                (0, i.jsxs)('div', {
                                    className:
                                        'container relative d-none align-items-center d-md-flex justify-content-between c-fs-4 c-fw-m nav-menu-cont',
                                    children: [
                                        (0, i.jsxs)('div', {
                                            className:
                                                ' d-flex gap-4 gap-lg-4 gap-xl-5 w-nav-menu align-items-center justify-content-start nav-menu',
                                            children: [
                                                (0, i.jsxs)('a', {
                                                    className: 'nav-link menu-opt text-dark '.concat(C ? 'active' : ''),
                                                    href: void 0,
                                                    id: 'product-link',
                                                    children: [
                                                        (0, i.jsx)('div', {
                                                            className: 'c-fs-4 c-fw-m',
                                                            children: C
                                                                ? (0, i.jsxs)('div', {
                                                                      className: 'd-flex align-items-center gap-2',
                                                                      children: [
                                                                          (0, i.jsx)('img', {
                                                                              width: '24',
                                                                              height: '24',
                                                                              'data-nimg': '1',
                                                                              src: '/img/icon/'.concat(
                                                                                  C.toLowerCase().replace(/ +/g, ''),
                                                                                  '.svg'
                                                                              ),
                                                                              alt: 'products icon',
                                                                          }),
                                                                          C,
                                                                      ],
                                                                  })
                                                                : ''.concat(
                                                                      (null == u
                                                                          ? void 0
                                                                          : null === (f = u.menu) || void 0 === f
                                                                            ? void 0
                                                                            : f.products) || 'Products'
                                                                  ),
                                                        }),
                                                        (0, i.jsx)('div', { className: 'nav-line' }),
                                                    ],
                                                }),
                                                (0, i.jsxs)('a', {
                                                    className: 'nav-link menu-opt text-dark',
                                                    href: void 0,
                                                    id: 'integrations-link',
                                                    children: [
                                                        (0, i.jsx)('span', {
                                                            className: 'c-fs-4 c-fw-m',
                                                            children: ''.concat(
                                                                (null == u
                                                                    ? void 0
                                                                    : null === (g = u.menu) || void 0 === g
                                                                      ? void 0
                                                                      : g.integrations) || 'Integrations'
                                                            ),
                                                        }),
                                                        (0, i.jsx)('div', { className: 'nav-line' }),
                                                    ],
                                                }),
                                                '/shorturl' !== t &&
                                                    (0, i.jsxs)(x(), {
                                                        className: 'nav-link menu-opt text-dark '.concat(
                                                            '/pricing' === t ? 'active' : ''
                                                        ),
                                                        href: n,
                                                        id: 'pricing-link',
                                                        children: [
                                                            (0, i.jsx)('span', {
                                                                className: 'c-fs-4 c-fw-m',
                                                                children: ''.concat(
                                                                    (null == u
                                                                        ? void 0
                                                                        : null === (b = u.menu) || void 0 === b
                                                                          ? void 0
                                                                          : b.pricing) || 'Pricing'
                                                                ),
                                                            }),
                                                            (0, i.jsx)('div', { className: 'nav-line' }),
                                                        ],
                                                    }),
                                            ],
                                        }),
                                        (0, i.jsx)('div', {
                                            className:
                                                'msg91-logo-cont  align-items-center justify-content-center d-flex',
                                            id: 'main-logo',
                                            children: (0, i.jsx)('a', {
                                                href: ''.concat(m),
                                                children: (0, i.jsx)('img', {
                                                    className: 'msg91-logo ms-5 ps-5',
                                                    src: '/img/logo.svg',
                                                    alt: 'MSG91',
                                                }),
                                            }),
                                        }),
                                        (0, i.jsxs)('div', {
                                            className:
                                                ' d-flex gap-4 gap-lg-4 gap-xl-5 w-nav-menu align-items-center justify-content-end',
                                            children: [
                                                (0, i.jsxs)(x(), {
                                                    className: 'nav-link menu-opt text-dark',
                                                    href: 'https://docs.msg91.com/overview',
                                                    target: '_blank',
                                                    id: 'apidocs-link',
                                                    children: [
                                                        (0, i.jsx)('span', {
                                                            className: 'c-fs-4 c-fw-m ',
                                                            children: ''.concat(
                                                                (null == u
                                                                    ? void 0
                                                                    : null === (w = u.menu) || void 0 === w
                                                                      ? void 0
                                                                      : w.api) || 'API Docs'
                                                            ),
                                                        }),
                                                        (0, i.jsx)('div', { className: 'nav-line' }),
                                                    ],
                                                }),
                                                (0, i.jsx)(x(), {
                                                    href: '/signup',
                                                    target: '_blank',
                                                    className: 'btn btn-dark c-fs-4 c-fw-sb px-3 utm',
                                                    id: 'signup-btn',
                                                    children: ''.concat(
                                                        (null == u
                                                            ? void 0
                                                            : null === (A = u.menu) || void 0 === A
                                                              ? void 0
                                                              : A.signup) || 'Sign Up'
                                                    ),
                                                }),
                                            ],
                                        }),
                                        (0, i.jsx)(p, { path: a, compData: u }),
                                    ],
                                }),
                                (0, i.jsxs)('div', {
                                    className:
                                        'container relative d-md-none d-flex align-items-center justify-content-between c-fs-4 c-fw-m nav-menu-cont',
                                    children: [
                                        (0, i.jsx)('div', {
                                            className:
                                                'msg91-logo-cont  align-items-center justify-content-center d-flex',
                                            children: (0, i.jsx)(x(), {
                                                href: ''.concat(m),
                                                children: (0, i.jsx)('img', {
                                                    className: 'msg91-logo',
                                                    src: '/img/logo.svg',
                                                    alt: 'MSG91',
                                                }),
                                            }),
                                        }),
                                        (0, i.jsxs)('div', {
                                            style: { height: '40px', width: '40px' },
                                            className: 'd-flex justify-content-center align-items-center',
                                            children: [
                                                (0, i.jsx)(d.QoK, {
                                                    className: 'one',
                                                    style: { fontSize: '32px' },
                                                    id: 'mininav-tog-open',
                                                    onClick: () => {
                                                        T(!E), G();
                                                    },
                                                }),
                                                (0, i.jsx)(d.FU5, {
                                                    className: 'c-fs-1 two d-none z-mininav',
                                                    id: 'mininav-tog-hidden',
                                                    onClick: () => {
                                                        T(!E), G();
                                                    },
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
            };
            var A = n(20091),
                C = n(9008),
                _ = n.n(C),
                P = JSON.parse(
                    '{"/in/otp/magiclink":{"title":"MSG91 OTP Magic Link India - Hassle-Free & Secure User Authentication","description":"Enhance user experience with MSG91 OTP Magic Link, providing secure, one-click authentication without the need for manual OTP entry. Simplify sign-ups and boost conversions effortlessly."},"/otp/magiclink":{"title":"MSG91 OTP Magic Link - Secure & Seamless User Authentication","description":"Enhance user experience with MSG91 OTP Magic Link, providing secure, one-click authentication without the need for manual OTP entry. Simplify sign-ups and boost conversions effortlessly."},"/signup":{"title":"Sign up now to access the full range of MSG91 products.","description":"Sign up to access the complete suite of MSG91 products, including programmable SMS, customer contact centers, virtual numbers, automated user segmentation, and OTP invisible verification. Trusted by 30,000+ startups and enterprises."},"/pricing":{"title":"API Pricing | MSG91","description":"Avail robust and powerful services like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing":{"title":"API Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing":{"title":"API Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/br-pt/pricing":{"title":"Pre\xe7os de API no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como SMS transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/ae/pricing":{"title":"API Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing":{"title":"API Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing":{"title":"API Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing":{"title":"API Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing":{"title":"API Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing":{"title":"API Pricing in United States | MSG91-United States","description":"Avail robust and powerful services like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"Home ******************************":{},"/":{"title":"Best Cloud Communication Platform for Businesses | MSG91","description":"MSG91 cloud communications platform integrates cloud-based voice, video, messaging, chat, & collaboration into any app, service, or business process. Request a demo for cloud based communication today!"},"":{"title":"Best Cloud Communication Platform for Businesses | MSG91","description":"MSG91 cloud communications platform integrates cloud-based voice, video, messaging, chat, & collaboration into any app, service, or business process. Request a demo for cloud based communication today!"},"/?":{"title":"Best Cloud Communication Platform for Businesses | MSG91","description":"MSG91 cloud communications platform integrates cloud-based voice, video, messaging, chat, & collaboration into any app, service, or business process. Request a demo for cloud based communication today!"},"/in":{"title":"Best Cloud Communication Platform in India | Communication Platform as a Service - MSG91-India","description":"MSG91 cloud communications platform integrates cloud-based voice, video, messaging, chat, & collaboration into any app, service, or business process. Request a demo for cloud based communication today!"},"/br":{"title":"Best Cloud Communication Platform in Brazil | Communication Platform as a Service - MSG91-Brazil","description":"MSG91 cloud communications platform integrates cloud-based voice, video, messaging, chat, & collaboration into any app, service, or business process. Request a demo for cloud based communication today!"},"/br-pt":{"title":"Melhor Plataforma de Comunica\xe7\xe3o em Nuvem no Brasil | Plataforma de Comunica\xe7\xe3o como Servi\xe7o - MSG91-Brasil","description":"A plataforma de comunica\xe7\xf5es em nuvem da MSG91 integra voz, v\xeddeo, mensagens, chat e colabora\xe7\xe3o baseados em nuvem em qualquer aplicativo, servi\xe7o ou processo empresarial. Solicite uma demonstra\xe7\xe3o para comunica\xe7\xe3o em nuvem hoje mesmo!"},"/ae":{"title":"Best Cloud Communication Platform for Businesses in United Arab Emirates| MSG91-United Arab Emirates","description":"MSG91 is one of the finest communication platforms that provide businesses to integrate themselves with SMS APIs, e-mail APIs, voice call APIs, etc."},"/ph":{"title":"Best Cloud Communication Platform for Businesses in Philippines| MSG91-Philippines","description":"MSG91 is one of the finest communication platforms that provide businesses to integrate themselves with SMS APIs, e-mail APIs, voice call APIs, etc."},"/sg":{"title":"Best Cloud Communication Platform for Businesses in Singapore| MSG91-Singapore","description":"MSG91 is one of the finest communication platforms that provide businesses to integrate themselves with SMS APIs, e-mail APIs, voice call APIs, etc."},"/es":{"title":"Best Cloud Communication Platform for Businesses in Spain| MSG91-Spain","description":"MSG91 is one of the finest communication platforms that provide businesses to integrate themselves with SMS APIs, e-mail APIs, voice call APIs, etc."},"/gb":{"title":"Best Cloud Communication Platform for Businesses in United Kingdom| MSG91-United Kingdom","description":"MSG91 is one of the finest communication platforms that provide businesses to integrate themselves with SMS APIs, e-mail APIs, voice call APIs, etc."},"/us":{"title":"Best Cloud Communication Platform for Businesses in United States | MSG91-United States","description":"MSG91 is one of the finest communication platforms that provide businesses to integrate themselves with SMS APIs, e-mail APIs, voice call APIs, etc."},"Hello ******************************":{},"/hello":{"title":"Customer Support Platform for your Business by MSG91","description":"Harness the power of omnichannel customer experience with HELLO, a robust and data-driven customer support platform to meet all your customer service needs."},"/in/hello":{"title":"Best Customer Support Software in India | Digital Customer Service Platform| MSG91 -India","description":"We are the leading cloud customer service platform. Check out the best customer service software in India to proactively engage customers and answer all customer queries with MSG91."},"/br/hello":{"title":"Best Customer Support Software in Brazil | Digital Customer Service Platform| MSG91 -Brazil","description":"We are the leading cloud customer service platform. Check out the best customer service software in Brazil to proactively engage customers and answer all customer queries with MSG91."},"/br-pt/hello":{"title":"Melhor Software de Suporte ao Cliente no Brasil | Plataforma de Atendimento Digital ao Cliente | MSG91-Brasil","description":"Somos a principal plataforma de atendimento ao cliente em nuvem. Confira o melhor software de atendimento ao cliente no Brasil para engajar proativamente os clientes e responder a todas as suas d\xfavidas com a MSG91."},"/ae/hello":{"title":"Customer Support Platform for your Business by MSG91-United Arab Emirates","description":"Harness the power of omnichannel customer experience with HELLO, a robust and data-driven customer support platform to meet all your customer service needs."},"/ph/hello":{"title":"Customer Support Platform for your Business by MSG91-Philippines","description":"Harness the power of omnichannel customer experience with HELLO, a robust and data-driven customer support platform to meet all your customer service needs."},"/sg/hello":{"title":"Customer Support Platform for your Business by MSG91-Singapore","description":"Harness the power of omnichannel customer experience with HELLO, a robust and data-driven customer support platform to meet all your customer service needs."},"/es/hello":{"title":"Customer Support Platform for your Business by MSG91-Spain","description":"Harness the power of omnichannel customer experience with HELLO, a robust and data-driven customer support platform to meet all your customer service needs."},"/gb/hello":{"title":"Customer Support Platform for your Business by MSG91-United Kingdom","description":"Harness the power of omnichannel customer experience with HELLO, a robust and data-driven customer support platform to meet all your customer service needs."},"/us/hello":{"title":"Customer Support Platform for your Business by MSG91-United States","description":"Harness the power of omnichannel customer experience with HELLO, a robust and data-driven customer support platform to meet all your customer service needs."},"campaign ******************************":{},"/campaign":{"title":"SMS Campaign","description":"Boost audience engagement through smart communication and on-time delivery. It\'s not only about communicating, it\'s about communicating with your users smartly and efficiently. Get Demo Reach your segmented customers across the world, Send your messages at the right moment! Features Automate sending messages under defined conditions Define different messaging parameters like time, region, number of.."},"/in/campaign":{"title":"Best Campaign Software | Transactional Text Messages in India| MSG91-India","description":"MSG91s SMS Marketing software helps businesses build and manage subscriber lists, send transactional sms, and automate customer engagement. Checkout the best campaign automation tool in India."},"/br/campaign":{"title":"Best Campaign Software | Transactional Text Messages in Brazil| MSG91-Brazil","description":"MSG91s SMS Marketing software helps businesses build and manage subscriber lists, send transactional sms, and automate customer engagement. Checkout the best campaign automation tool in Brazil."},"/br-pt/campaign":{"title":"Melhor Software de Campanha | Mensagens de Texto Transacionais no Brasil | MSG91-Brasil","description":"O software de marketing por SMS da MSG91 ajuda as empresas a construir e gerenciar listas de assinantes, enviar SMS transacionais e automatizar o engajamento dos clientes. Confira a melhor ferramenta de automa\xe7\xe3o de campanhas no Brasil."},"/ae/campaign":{"title":"SMS Campaign| MSG91-United Arab Emirates","description":"Boost audience engagement through smart communication and on-time delivery. It\'s not only about communicating, it\'s about communicating with your users smartly and efficiently. Get Demo Reach your segmented customers across the world, Send your messages at the right moment! Features Automate sending messages under defined conditions Define different messaging parameters like time, region, number of.."},"/ph/campaign":{"title":"SMS Campaign| MSG91-Philippines","description":"Boost audience engagement through smart communication and on-time delivery. It\'s not only about communicating, it\'s about communicating with your users smartly and efficiently. Get Demo Reach your segmented customers across the world, Send your messages at the right moment! Features Automate sending messages under defined conditions Define different messaging parameters like time, region, number of.."},"/sg/campaign":{"title":"SMS Campaign| MSG91-Singapore","description":"Boost audience engagement through smart communication and on-time delivery. It\'s not only about communicating, it\'s about communicating with your users smartly and efficiently. Get Demo Reach your segmented customers across the world, Send your messages at the right moment! Features Automate sending messages under defined conditions Define different messaging parameters like time, region, number of.."},"/es/campaign":{"title":"SMS Campaign| MSG91-Spain","description":"Boost audience engagement through smart communication and on-time delivery. It\'s not only about communicating, it\'s about communicating with your users smartly and efficiently. Get Demo Reach your segmented customers across the world, Send your messages at the right moment! Features Automate sending messages under defined conditions Define different messaging parameters like time, region, number of.."},"/gb/campaign":{"title":"SMS Campaign| MSG91-United Kingdom","description":"Boost audience engagement through smart communication and on-time delivery. It\'s not only about communicating, it\'s about communicating with your users smartly and efficiently. Get Demo Reach your segmented customers across the world, Send your messages at the right moment! Features Automate sending messages under defined conditions Define different messaging parameters like time, region, number of.."},"/us/campaign":{"title":"SMS Campaign| MSG91-United States","description":"Boost audience engagement through smart communication and on-time delivery. It\'s not only about communicating, it\'s about communicating with your users smartly and efficiently. Get Demo Reach your segmented customers across the world, Send your messages at the right moment! Features Automate sending messages under defined conditions Define different messaging parameters like time, region, number of.."},"segmento ******************************":{},"/segmento":{"title":"Customer Segmentation Software | MSG91","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"/in/segmento":{"title":"Customer Segmentation Software | MSG91-India","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"/br/segmento":{"title":"Customer Segmentation Software | MSG91-Brazil","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"/br-pt/segmento":{"title":"Software de Segmenta\xe7\xe3o de Clientes | MSG91-Brasil","description":"Execute campanhas de marketing direcionadas com a ajuda de segmenta\xe7\xe3o autom\xe1tica de clientes e conte\xfado direcionado. Experimente agora."},"/ae/segmento":{"title":"Customer Segmentation Software | MSG91-United Arab Emirates","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"/ph/segmento":{"title":"Customer Segmentation Software | MSG91-Philippines","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"/sg/segmento":{"title":"Customer Segmentation Software | MSG91-Singapore","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"/es/segmento":{"title":"Customer Segmentation Software | MSG91-Spain","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"/gb/segmento":{"title":"Customer Segmentation Software | MSG91-United Kingdom","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"/us/segmento":{"title":"Customer Segmentation Software | MSG91-United States","description":"Execute targeted marketing campaigns with the help of automated customer segmentation and targeted content. Try it out now."},"OTP ******************************":{},"/otp":{"title":"Send OTP | OTP Service Providers - MSG91","description":"Send OTP provides secure and reliable SMS API Integration that helps you easily send OTP to your users for 2 factor authentication."},"/in/otp":{"title":"OTP Authentication API | OTP SMS Service Provider in India -MSG91-India","description":"OTP Service Provider - Consume simple API’s and give secure OTP with 2FA\'s and validations to your website and applications by using MSG91s best otp api service."},"/br/otp":{"title":"OTP Authentication API | OTP SMS Service Provider in Brazil -MSG91-Brazil","description":"OTP Service Provider - Consume simple API’s and give secure OTP with 2FA\'s and validations to your website and applications by using MSG91s best otp api service."},"/br-pt/otp":{"title":"API de Autentica\xe7\xe3o por OTP | Provedor de Servi\xe7o de SMS OTP no Brasil - MSG91-Brasil","description":"Provedor de Servi\xe7o de OTP - Utilize APIs simples e ofere\xe7a OTP seguro com autentica\xe7\xe3o de dois fatores (2FA) e valida\xe7\xf5es para seu site e aplicativos usando o melhor servi\xe7o de API OTP da MSG91."},"/ae/otp":{"title":"Send OTP | OTP Service Providers -MSG91-United Arab Emirates","description":"Send OTP provides secure and reliable SMS API Integration that helps you easily send OTP to your users for 2 factor authentication."},"/ph/otp":{"title":"Send OTP | OTP Service Providers -MSG91-Philippines","description":"Send OTP provides secure and reliable SMS API Integration that helps you easily send OTP to your users for 2 factor authentication."},"/sg/otp":{"title":"Send OTP | OTP Service Providers -MSG91-Singapore","description":"Send OTP provides secure and reliable SMS API Integration that helps you easily send OTP to your users for 2 factor authentication."},"/es/otp":{"title":"Send OTP | OTP Service Providers -MSG91-Spain","description":"Send OTP provides secure and reliable SMS API Integration that helps you easily send OTP to your users for 2 factor authentication."},"/gb/otp":{"title":"Send OTP | OTP Service Providers -MSG91-United Kingdom","description":"Send OTP provides secure and reliable SMS API Integration that helps you easily send OTP to your users for 2 factor authentication."},"/us/otp":{"title":"Send OTP | OTP Service Providers -MSG91-United States","description":"Send OTP provides secure and reliable SMS API Integration that helps you easily send OTP to your users for 2 factor authentication."},"SMS ******************************":{},"/sms":{"title":"Transactional SMS | Transactional SMS Provider -MSG91","description":"MSG91 is among the leading transactional SMS service providers. Empowering businesses with easy-to-integrate transactional SMS API to enhance customer satisfaction."},"/in/sms":{"title":"Best SMS API For Developers | Transactional SMS Service -MSG91-India","description":"MSG91 is a bulk transactional sms service provider offering reliable business solutions, supporting both marketing campaigns and daily notifications. Start with a transactional sms api trial today."},"/br/sms":{"title":"Best SMS API For Developers | Transactional SMS Service -MSG91-Brazil","description":"MSG91 is a bulk transactional sms service provider offering reliable business solutions, supporting both marketing campaigns and daily notifications. Start with a transactional sms api trial today."},"/br-pt/sms":{"title":"Melhor API de SMS para Desenvolvedores | Servi\xe7o de SMS Transacional - MSG91-Brasil","description":"A MSG91 \xe9 um provedor de servi\xe7o de SMS transacional em massa que oferece solu\xe7\xf5es empresariais confi\xe1veis, suportando tanto campanhas de marketing quanto notifica\xe7\xf5es di\xe1rias. Comece hoje mesmo com um teste da API de SMS transacional."},"/ae/sms":{"title":"Transactional SMS | Transactional SMS Provider - MSG91-United Arab Emirates","description":"MSG91 is among the leading transactional SMS service providers. Empowering businesses with easy-to-integrate transactional SMS API to enhance customer satisfaction."},"/ph/sms":{"title":"Transactional SMS | Transactional SMS Provider - MSG91-Philippines","description":"MSG91 is among the leading transactional SMS service providers. Empowering businesses with easy-to-integrate transactional SMS API to enhance customer satisfaction."},"/sg/sms":{"title":"Transactional SMS | Transactional SMS Provider - MSG91-Singapore","description":"MSG91 is among the leading transactional SMS service providers. Empowering businesses with easy-to-integrate transactional SMS API to enhance customer satisfaction."},"/es/sms":{"title":"Transactional SMS | Transactional SMS Provider - MSG91-Spain","description":"MSG91 is among the leading transactional SMS service providers. Empowering businesses with easy-to-integrate transactional SMS API to enhance customer satisfaction."},"/gb/sms":{"title":"Transactional SMS | Transactional SMS Provider - MSG91-United Kingdom","description":"MSG91 is among the leading transactional SMS service providers. Empowering businesses with easy-to-integrate transactional SMS API to enhance customer satisfaction."},"/us/sms":{"title":"Transactional SMS | Transactional SMS Provider - MSG91-United States","description":"MSG91 is among the leading transactional SMS service providers. Empowering businesses with easy-to-integrate transactional SMS API to enhance customer satisfaction."},"RCS ******************************":{},"/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"/in/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91 - India","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"/br/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"/br-pt/rcs":{"title":"RCS: Experi\xeancias Aprimoradas, Personalizadas e Interativas - MSG91 - Brasil","description":"Aprimore o engajamento com seus clientes usando o Rich Communication Service. A integra\xe7\xe3o f\xe1cil do RCS e recursos avan\xe7ados impulsionam a comunica\xe7\xe3o e estimulam o crescimento dos neg\xf3cios."},"/ae/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91 - United Arab Emirates","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"/ph/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91 - Philippines","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"/sg/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91 - Singapore","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"/es/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91 - Spain","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"/gb/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91 - United Kingdom","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"/us/rcs":{"title":"RCS: Enhanced, Branded, and Interactive Experiences - MSG91 - United States","description":"Enhance your customer engagement with Rich Communication Service. Effortless RCS integration and advanced features boost communication and stimulate business growth"},"Email ******************************":{},"/email":{"title":"Transactional Email | Transactional Email API - MSG91","description":"Send transactional emails to your customers with the help of Transactional Email API from MSG91 that is easy to integrate, secure and reliable."},"/in/email":{"title":"Transactional Email Services in India | Email Api Provider -MSG91-India","description":"Our best email api integration for application-driven emails gives you an easy way to automate your sending based on user actions. Send, receive, and track emails with MSG91\'s best email api service."},"/br/email":{"title":"Transactional Email Services in Brazil | Email Api Provider -MSG91-Brazil","description":"Our best email api integration for application-driven emails gives you an easy way to automate your sending based on user actions. Send, receive, and track emails with MSG91\'s best email api service."},"/br-pt/email":{"title":"Servi\xe7os de Email Transacional no Brasil | Provedor de API de Email - MSG91-Brasil","description":"Nossa melhor integra\xe7\xe3o de API de email para emails orientados por aplicativos oferece uma maneira f\xe1cil de automatizar o envio com base nas a\xe7\xf5es dos usu\xe1rios. Envie, receba e acompanhe emails com o melhor servi\xe7o de API de email da MSG91."},"/ae/email":{"title":"Transactional Email | Transactional Email API - MSG91-United Arab Emirates","description":"Send transactional emails to your customers with the help of Transactional Email API from MSG91 that is easy to integrate, secure and reliable."},"/ph/email":{"title":"Transactional Email | Transactional Email API - MSG91-Philippines","description":"Send transactional emails to your customers with the help of Transactional Email API from MSG91 that is easy to integrate, secure and reliable."},"/sg/email":{"title":"Transactional Email | Transactional Email API - MSG91-Singapore","description":"Send transactional emails to your customers with the help of Transactional Email API from MSG91 that is easy to integrate, secure and reliable."},"/es/email":{"title":"Transactional Email | Transactional Email API - MSG91-Spain","description":"Send transactional emails to your customers with the help of Transactional Email API from MSG91 that is easy to integrate, secure and reliable."},"/gb/email":{"title":"Transactional Email | Transactional Email API - MSG91-United Kingdom","description":"Send transactional emails to your customers with the help of Transactional Email API from MSG91 that is easy to integrate, secure and reliable."},"/us/email":{"title":"Transactional Email | Transactional Email API - MSG91-United States","description":"Send transactional emails to your customers with the help of Transactional Email API from MSG91 that is easy to integrate, secure and reliable."},"WhatsApp ******************************":{},"/whatsapp":{"title":"WhatsApp API for businesses | MSG91","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"/in/whatsapp":{"title":"WhatsApp API for businesses in India | MSG91-India","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"/br/whatsapp":{"title":"WhatsApp API for businesses in Brazil | MSG91-Brazil","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"/br-pt/whatsapp":{"title":"API do WhatsApp para Empresas no Brasil | MSG91-Brasil","description":"Envie e receba mensagens instant\xe2neas e notifica\xe7\xf5es para fornecer suporte ao cliente em tempo real globalmente em uma das plataformas de chat mais preferidas e confi\xe1veis. Integre a API do WhatsApp da MSG91 ao seu site ou aplicativo agora mesmo."},"/ae/whatsapp":{"title":"WhatsApp API for businesses | MSG91-United Arab Emirates","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"/ph/whatsapp":{"title":"WhatsApp API for businesses | MSG91-Philippines","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"/sg/whatsapp":{"title":"WhatsApp API for businesses | MSG91-Singapore","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"/es/whatsapp":{"title":"WhatsApp API for businesses | MSG91-Spain","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"/gb/whatsapp":{"title":"WhatsApp API for businesses | MSG91-United Kingdom","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"/us/whatsapp":{"title":"WhatsApp API for businesses | MSG91-United States","description":"Send and receive instant messages and notification to provide real-time customer support globally on one of most preferred & reliable chat platform. Integrate MSG91 WhatsApp API into your website or application now."},"Numbers ******************************":{},"/numbers":{"title":"Numbers API for business | MSG91","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"/in/numbers":{"title":"Numbers API for business | MSG91-India","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"/br/numbers":{"title":"Numbers API for business | MSG91-Brazil","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"/br-pt/numbers":{"title":"API de N\xfameros para Neg\xf3cios | MSG91-Brasil","description":"Receba, responda e personalize SMS com C\xf3digos Longos, para um Engajamento e Comunica\xe7\xe3o M\xe1ximos!"},"/ae/numbers":{"title":"Numbers API for business | MSG91-United Arab Emirates","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"/ph/numbers":{"title":"Numbers API for business | MSG91-Philippines","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"/sg/numbers":{"title":"Numbers API for business | MSG91-Singapore","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"/es/numbers":{"title":"Numbers API for business | MSG91-Spain","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"/gb/numbers":{"title":"Numbers API for business | MSG91-United Kingdom","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"/us/numbers":{"title":"Numbers API for business | MSG91-United States","description":"Receive, Reply, and Customize SMS with Long Codes, for Ultimate Engagement and Communication!"},"Voice ******************************":{},"/voice":{"title":"Voice API for your Business | Voice Call API | MSG91","description":"MSG91 provides voice call api\'s to your business which helps to engage your customers over voice with our virtual phone numbers, and voice APIs."},"/in/voice":{"title":"Best Voice Call Api | Voice Api Service Provider in India - MSG91","description":"We are the leading Voice Call API provider in India. With MSG91 voice api service, every developer can build and integrate communication systems, missed call services etc."},"/br/voice":{"title":"Best Voice Call Api | Voice Api Service Provider in Brazil - MSG91","description":"We are the leading Voice Call API provider in Brazil. With MSG91 voice api service, every developer can build and integrate communication systems, missed call services etc."},"/br-pt/voice":{"title":"Melhor API de Chamadas de Voz | Provedor de Servi\xe7o de API de Voz no Brasil - MSG91","description":"Somos o principal provedor de API de chamadas de voz no Brasil. Com o servi\xe7o de API de voz da MSG91, cada desenvolvedor pode construir e integrar sistemas de comunica\xe7\xe3o, servi\xe7os de chamadas perdidas, entre outros."},"/ae/voice":{"title":"Voice API for your Business | Voice Call API | MSG91-United Arab Emirates","description":"MSG91 provides voice call api\'s to your business which helps to engage your customers over voice with our virtual phone numbers, and voice APIs."},"/ph/voice":{"title":"Voice API for your Business | Voice Call API | MSG91-Philippines","description":"MSG91 provides voice call api\'s to your business which helps to engage your customers over voice with our virtual phone numbers, and voice APIs."},"/sg/voice":{"title":"Voice API for your Business | Voice Call API | MSG91-Singapore","description":"MSG91 provides voice call api\'s to your business which helps to engage your customers over voice with our virtual phone numbers, and voice APIs."},"/es/voice":{"title":"Voice API for your Business | Voice Call API | MSG91-Spain","description":"MSG91 provides voice call api\'s to your business which helps to engage your customers over voice with our virtual phone numbers, and voice APIs."},"/gb/voice":{"title":"Voice API for your Business | Voice Call API | MSG91-United Kingdom","description":"MSG91 provides voice call api\'s to your business which helps to engage your customers over voice with our virtual phone numbers, and voice APIs."},"/us/voice":{"title":"Voice API for your Business | Voice Call API | MSG91-United States","description":"MSG91 provides voice call api\'s to your business which helps to engage your customers over voice with our virtual phone numbers, and voice APIs."},"ShortURL ******************************":{},"/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"/in/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"/br/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"/br-pt/shorturl":{"title":"ShortUrl - Brasil","description":"Links Personalizados para o Sucesso Empresarial Destaque-se com links personalizados que atraem mais cliques para melhorar as taxas de convers\xe3o. Otimize links inteligentes que podem ajudar voc\xea a gerar mais receitas. Personaliza\xe7\xe3o, rastreamento e gerenciamento facilitados. Obtenha uma Demonstra\xe7\xe3o Recursos Links Inteligentes que ampliam suas convers\xf5es Melhore a entregabilidade das mensagens atrav\xe9s das melhores pr\xe1ticas aceitas globalmente. Garanta uma melhoria..."},"/ae/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"/ph/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"/sg/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"/es/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"/gb/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"/us/shorturl":{"title":"ShortUrl","description":"Customised Links for Business Success Stand out with branded links that drive more clicks to improve conversion rates. Optimise smart links that can help you realise more revenues. Customising, tracking, managing, made easy. Get Demo Features Smart Links that magnify your conversions Enhance the deliverability of messages through our globally accepted best practices. Ensure improved..."},"Knowledgebase ******************************":{},"/knowledgebase":{"title":"Customer knowledgebase platform by MSG91","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"/in/knowledgebase":{"title":"Customer knowledgebase platform by MSG91-India","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"/br/knowledgebase":{"title":"Customer knowledgebase platform by MSG91-Brazil","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"/br-pt/knowledgebase":{"title":"Plataforma de Base de Conhecimento para Clientes da MSG91-Brasil","description":"Reposit\xf3rio central de informa\xe7\xf5es sobre seus produtos, servi\xe7os ou t\xf3picos. Ajude seus clientes a encontrar respostas para suas perguntas por conta pr\xf3pria, na conveni\xeancia deles."},"/ae/knowledgebase":{"title":"Customer knowledgebase platform by MSG91-United Arab Emirates","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"/ph/knowledgebase":{"title":"Customer knowledgebase platform by MSG91-Philippines","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"/sg/knowledgebase":{"title":"Customer knowledgebase platform by MSG91-Singapore","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"/es/knowledgebase":{"title":"Customer knowledgebase platform by MSG91-Spain","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"/gb/knowledgebase":{"title":"Customer knowledgebase platform by MSG91-United Kingdom","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"/us/knowledgebase":{"title":"Customer knowledgebase platform by MSG91-United States","description":"Central repository for information on your products, services or topics Help your customers find answers to their queries on their own at their own convenience"},"Single Pages ******************************":{},"/about-us":{"title":"MSG91 - Our team, culture and happy clients.","description":"Empowering developers with communication APIs. Building modern communication tools and supporting ideas for startups and enterprises globally."},"/contact-us":{"title":"Contact Us - Reach out to Team MSG91!","description":"Questions? Comments? Suggestions? We love to hear them. Contact us and get support via phone, chat or on our email. MSG91 is here just for you!"},"/become-a-partner":{"title":"MSG91 Partner Program | API Consultation - MSG91","description":"Looking for a long term partnership to boost your customer communication solutions? Our consultation and Integration Partnerships can help."},"/partners-and-integrations":{"title":"Magento, WooCommerce, OpenCart, WordPress SMS addon plugin - MSG91","description":"Wordpress SMS plugin, WooCommerce SMS plugin, OpenCart SMS extension, Magento SMS extension, OpenCart SMS gateway to send unlimited SMS directly from website"},"/developers":{"title":"Send SMS API | SMS API Integration in php - MSG91","description":"Revolutionary communication APIs designed with developers in mind. Read more."},"/startups":{"title":"MSG91 for Startups - upto 25,000 SMS per month for every Startup","description":"A startup for startups. Grow your startup with MSG91’s SMS for startups. First few transactional bulk SMS free every month. Spread this initiative and help startup."},"/certificates":{"title":"MSG91\'s Industry Certifications: Enhancing Secure Communication","description":"Discover MSG91\'s range of industry certifications that affirm our dedication to secure, reliable messaging services. Explore how our ISO, CASA, and other certifications build trust with global businesses."},"/startups-form":{"title":"MSG91 Startups form","description":"Shared about you and your business is up to date and accurate at the time of submission"},"/terms-of-use":{"title":"Terms","description":"Terms Privacy policy GDPR Refund policy Cookie policy Startup Policy Fair pricing policy No spam Terms Simple terms for a longterm relationship!Our services consist of the platform, features and connectivity that MSG91 provides to you. This policy is w.e.f. Nov 7, 2012.Using our services? Keep `em in mind!This policy is effective from Nov 07, 2012...."},"/privacy-policy":{"title":"Privacy Policy of msg91.com","description":"Kindly read privacy policy of MSG91 before using its website or services. Information about cookies, web beacons used by msg91.com website."},"/gdpr":{"title":"GDPR - More than just compliance at MSG91 | Customers\' Privacy and Security","description":"GDPR has not just been a compliance practice for us at MSG91 but it has always been about the trust our customers have garnered on us and the responsibility which lies with us to keep their data protected. Know more!"},"/refund-policy":{"title":"Refund policy","description":"Terms Privacy policy GDPR Refund policy Cookie policy Startup policy Fair pricing policy No spam Refund Policy We will refund your amount, but if someone tries to misuse, they’re legally bound.Account closing 1. The user may close his account at any time. Account closing means that the further use of services with the use of..."},"/cookie-policy":{"title":"Cookie policy","description":"Cookie policy Terms Privacy policy GDPR Refund policy Cookie policy Startup policy Fair pricing policy No spam We love cookies…umm both kinds ;)Cookies are small pieces of information saved about you when you’re online, to help us track you as you browse. So say you go to the Regional SMS page to see how you..."},"/startup-policy":{"title":"Startup Policy","description":"Terms Privacy policy GDPR Refund policy Cookie policy Startup policy Fair pricing policy No spam Startup policy We love Startups. After all, we too are a Startup!You grow, we grow! We have set the..."},"/fair-pricing-policy":{"title":"Fair pricing policy","description":"Terms Privacy policy GDPR Refund policy Cookie policy Startup policy Fair pricing policy No spam Fair pricing policy We play fair!Our purpose is to give you maximum value at the lowest price keeping us profitable and sustainable.Fair Pricing Policy to be honest, and open, providing our customers with reliable and high-quality services at a fair..."},"/no-spam":{"title":"No spam policy","description":"No spam policy Terms Privacy policy GDPR Refund policy Cookie policy Startup policy Fair pricing policy No spam We don’t SPAM and won’t accept anyone’s either!Any unsolicited, unexpected or unwanted SMS sent to the recipients in order to mislead them is considered SPAM by us. Also, if you send messages to unregistered users- SPAM. MSG91’s..."},"Integration Pages ******************************":{},"/partners-and-integrations/zapier":{"title":"Connect your app with Zapier | Intergrate with MSG91","description":"MSG91 is a robust communication platform that seamlessly integrates with Zapier, a powerful automation tool. By leveraging MSG91 through Zapier, you can streamline your workflow and automate processes, such as sending WhatsApp messages, emails, and voice messages. This eliminates the need for manual intervention and enhances your communication capabilities."},"/partners-and-integrations/firebase":{"title":"Firebase Integration | Connect your apps with MSG91","description":"Enhance your app\'s communication capabilities with seamless integration of MSG91 and Firebase. Send real-time notifications, SMS alerts, and engage users effectively. Unlock the power of MSG91 and Firebase integration to deliver an exceptional user experience and drive app success"},"/partners-and-integrations/freshworks":{"title":"Automate your Message | Send SMS, Email and Whatsapp - MSG91","description":"Supercharge your customer support and engagement with the powerful combination of MSG91 and Freshworks integration. Deliver timely notifications, automate customer interactions, and drive better user experiences. Experience the seamless synergy between MSG91 and Freshworks for enhanced business growth."},"/partners-and-integrations/hubspot":{"title":"Hubspot Intergration | Connect your apps with MSG91","description":"Unlock the true potential of your marketing and sales efforts with the seamless integration of MSG91 and Hubspot. Drive personalized communication, automate lead nurturing, and supercharge your customer engagement. Discover the winning combination of MSG91 and Hubspot integration for accelerated business growth and success."},"/partners-and-integrations/tally":{"title":"Tally Intergration | Experience Tally Prime - MSG91","description":"Automate invoice delivery via WhatsApp and Email, ensuring timely communication. Effortlessly send SMS and Voice messages for voucher creations and updations with MSG91 Tally Prime Plugin"},"commentin":{"comment":"in country"},"/in/pricing/sms":{"title":"SMS Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/email":{"title":"Email Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/voice":{"title":"Voice Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/whatsapp":{"title":"WhatsApp Business API Pricing (2024) | MSG91","description":"Avail robust and powerful services in India like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/rcs":{"title":"RCS Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/otp":{"title":"OTP Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/hello":{"title":"Hello Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/segmento":{"title":"Segmento Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/campaign":{"title":"Campaign Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/knowledgebase":{"title":"KnowledgeBase Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/in/pricing/otpwidget":{"title":"otpwidget Pricing in India | MSG91-India","description":"Avail robust and powerful services in India like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"commentbr":{"comment":"br country"},"/br/pricing/sms":{"title":"SMS Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/email":{"title":"Email Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/voice":{"title":"Voice Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/whatsapp":{"title":"WhatsApp Business API Pricing (2024) | MSG91","description":"Avail robust and powerful services in Brazil like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/rcs":{"title":"RCS Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/otp":{"title":"OTP Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/hello":{"title":"Hello Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/segmento":{"title":"Segmento Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/campaign":{"title":"Campaign Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/knowledgebase":{"title":"KnowledgeBase Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/br/pricing/otpwidget":{"title":"otpwidget Pricing in Brazil | MSG91-Brazil","description":"Avail robust and powerful services in Brazil like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"commentbrpt":{"comment":"pa\xeds br"},"/br-pt/pricing/sms":{"title":"Pre\xe7os de SMS no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como SMS transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/email":{"title":"Pre\xe7os de Email no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como Email transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/voice":{"title":"Pre\xe7os de Voz no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como Voz transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/whatsapp":{"title":"Pre\xe7os da API do WhatsApp Business (2024) | MSG91","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como WhatsApp transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/rcs":{"title":"Pre\xe7os de RCS no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como RCS transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/otp":{"title":"Pre\xe7os de OTP no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como OTP transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/hello":{"title":"Pre\xe7os de Hello no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como Hello transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/segmento":{"title":"Pre\xe7os de Segmento no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como Segmento transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/campaign":{"title":"Pre\xe7os de Campanha no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como Campanha transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/knowledgebase":{"title":"Pre\xe7os de KnowledgeBase no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como KnowledgeBase transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"/br-pt/pricing/otpwidget":{"title":"Pre\xe7os de otpwidget no Brasil | MSG91-Brasil","description":"Aproveite servi\xe7os robustos e poderosos no Brasil, como otpwidget transacional, APIs de comunica\xe7\xe3o e muito mais a pre\xe7os acess\xedveis. Confira os pre\xe7os agora."},"commentae":{"comment":"ae country"},"/ae/pricing/sms":{"title":"SMS Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/email":{"title":"Email Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/voice":{"title":"Voice Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/whatsapp":{"title":"WhatsApp Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/rcs":{"title":"RCS Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/otp":{"title":"OTP Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/hello":{"title":"Hello Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/segmento":{"title":"Segmento Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/campaign":{"title":"Campaign Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/knowledgebase":{"title":"KnowledgeBase Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/ae/pricing/otpwidget":{"title":"otpwidget Pricing in United Arab Emirates | MSG91-United Arab Emirates","description":"Avail robust and powerful services in United Arab Emirates like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"commentph":{"comment":"ph country"},"/ph/pricing/sms":{"title":"SMS Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/email":{"title":"Email Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/voice":{"title":"Voice Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/whatsapp":{"title":"WhatsApp Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/rcs":{"title":"RCS Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/otp":{"title":"OTP Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/hello":{"title":"Hello Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/segmento":{"title":"Segmento Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/campaign":{"title":"Campaign Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/knowledgebase":{"title":"KnowledgeBase Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/ph/pricing/otpwidget":{"title":"otpwidget Pricing in Philippines | MSG91-Philippines","description":"Avail robust and powerful services in Philippines like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"commentsg":{"comment":"sg country"},"/sg/pricing/sms":{"title":"SMS Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/email":{"title":"Email Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/voice":{"title":"Voice Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/whatsapp":{"title":"WhatsApp Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/rcs":{"title":"RCS Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/otp":{"title":"OTP Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/hello":{"title":"Hello Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/segmento":{"title":"Segmento Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/campaign":{"title":"Campaign Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/knowledgebase":{"title":"KnowledgeBase Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/sg/pricing/otpwidget":{"title":"otpwidget Pricing in Singapore | MSG91-Singapore","description":"Avail robust and powerful services in Singapore like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"commentes":{"comment":"es country"},"/es/pricing/sms":{"title":"SMS Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/email":{"title":"Email Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/voice":{"title":"Voice Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/whatsapp":{"title":"WhatsApp Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/rcs":{"title":"RCS Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/otp":{"title":"OTP Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/hello":{"title":"Hello Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/segmento":{"title":"Segmento Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/campaign":{"title":"Campaign Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/knowledgebase":{"title":"KnowledgeBase Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/es/pricing/otpwidget":{"title":"otpwidget Pricing in Spain | MSG91-Spain","description":"Avail robust and powerful services in Spain like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"commentgb":{"comment":"gb country"},"/gb/pricing/sms":{"title":"SMS Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/email":{"title":"Email Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/voice":{"title":"Voice Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/whatsapp":{"title":"WhatsApp Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/rcs":{"title":"RCS Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/otp":{"title":"OTP Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/hello":{"title":"Hello Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/segmento":{"title":"Segmento Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/campaign":{"title":"Campaign Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/knowledgebase":{"title":"KnowledgeBase Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/gb/pricing/otpwidget":{"title":"otpwidget Pricing in United Kingdom | MSG91-United Kingdom","description":"Avail robust and powerful services in United Kingdom like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"commentus":{"comment":"us country"},"/us/pricing/sms":{"title":"SMS Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/email":{"title":"Email Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/voice":{"title":"Voice Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/whatsapp":{"title":"WhatsApp Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/rcs":{"title":"RCS Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/otp":{"title":"OTP Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/hello":{"title":"Hello Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/segmento":{"title":"Segmento Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/campaign":{"title":"Campaign Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/knowledgebase":{"title":"KnowledgeBase Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/us/pricing/otpwidget":{"title":"otpwidget Pricing in United States | MSG91-United States","description":"Avail robust and powerful services in United States like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"commentglobal":{"comment":"global"},"/pricing/sms":{"title":"SMS Pricing | MSG91","description":"Avail robust and powerful services like transactional SMS, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/email":{"title":"Email Pricing | MSG91","description":"Avail robust and powerful services like transactional Email, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/voice":{"title":"Voice Pricing  | MSG91","description":"Avail robust and powerful services like transactional Voice, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/whatsapp":{"title":"WhatsApp Pricing | MSG91","description":"Avail robust and powerful services like transactional WhatsApp, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/rcs":{"title":"RCS Pricing | MSG91","description":"Avail robust and powerful services like transactional RCS, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/otp":{"title":"OTP Pricing | MSG91","description":"Avail robust and powerful services like transactional OTP, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/hello":{"title":"Hello Pricing | MSG91","description":"Avail robust and powerful services like transactional Hello, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/segmento":{"title":"Segmento Pricing | MSG91","description":"Avail robust and powerful services like transactional Segmento, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/campaign":{"title":"Campaign Pricing | MSG91","description":"Avail robust and powerful services like transactional Campaign, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/knowledgebase":{"title":"KnowledgeBase Pricing | MSG91","description":"Avail robust and powerful services like transactional KnowledgeBase, communication APIs and more at affordable prices. Check out the pricing now."},"/pricing/otpwidget":{"title":"OtpWidget Pricing | MSG91","description":"Avail robust and powerful services like transactional otpwidget, communication APIs and more at affordable prices. Check out the pricing now."},"LinkGenrator ******************************":{},"/free-whatsapp-link-generator":{"title":"WhatsApp API for businesses | MSG91","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"/in/free-whatsapp-link-generator":{"title":"Free Whatsapp Link generator| MSG91 - India","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"/br/free-whatsapp-link-generator":{"title":"WhatsApp API for businesses | MSG91","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"/ae/free-whatsapp-link-generator":{"title":"Free Whatsapp Link generator | MSG91 - United Arab Emirates","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"/ph/free-whatsapp-link-generator":{"title":"Free Whatsapp Link generator in India | MSG91 - Philippines","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"/sg/free-whatsapp-link-generator":{"title":"Free Whatsapp Link generator | MSG91 - Singapore","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"/es/free-whatsapp-link-generator":{"title":"Free Whatsapp Link generator | MSG91 - Spain","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"/gb/free-whatsapp-link-generator":{"title":"Free Whatsapp Link generator | MSG91 - United Kingdom","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"/us/free-whatsapp-link-generator":{"title":"Free Whatsapp Link generator | MSG91 - United States","description":"Generate WhatsApp links and QR codes easily with our WhatsApp Link Generator. Start chatting instantly!."},"case-studies -----------------------":{},"/case-studies":{"title":"Customer success stories: Businesses Thrive with MSG91 API Integration"},"/case-studies/azimpremji":{"title":"Azim Premji Foundation: Informing Teachers and Trainers via  API | MSG91"},"/case-studies/crazypolar":{"title":"Craypolar: Communicating with Customers via  API | MSG91"},"/case-studies/ixigo":{"title":"Ixigo: Ensuring Seamless Communication via API | MSG91"},"/case-studies/milkbasket":{"title":"Milkbasket: Sending Regular Updates to Customers via API | MSG91"},"/case-studies/talkcharge":{"title":"TalkCharge: Updating Customers Regularly via API | MSG91"},"/case-studies/razorpay":{"title":"Razorpay: Ensuring Customer Security via API | MSG91"},"/case-studies/zebpay":{"title":"Zebpay: Ensuring Customer Security via API | MSG91"},"/case-studies/eurokids":{"title":"Eurokids: Updating Parents on School Activities via API | MSG91"},"/case-studies/blackbuck":{"title":"Blackbuck: Conducting Seamless Operations via Communication | MSG91"},"/case-studies/barbequenation":{"title":"Barbeque Nation: Updating Customers on Orders via API | MSG91"},"/case-studies/policybazaar":{"title":"Policy Bazaar: Updating Customers via Messaging | MSG91"},"/case-studies/joeyrooms":{"title":"Joey Rooms: Keeping Clients Updated with Notifications | MSG91"},"/case-studies/leadsq":{"title":"LeadSquared: Updating Clients\' Customers Across Industries with | MSG91"},"/case-studies/letsshave":{"title":"LetsShave: Updating Customers on Orders and Offers via Messaging | MSG91"},"/case-studies/grabonrent":{"title":"GrabOnRent: Updating Customers on Orders and Offers via Messaging | MSG91"},"/case-studies/kartfood":{"title":"KartFood: Updating Customers on Orders via Messaging | MSG91"},"/case-studies/sankalp":{"title":"Sankalp India Foundation: Informing Blood Donors and Recipients with | MSG91"},"/case-studies/leegality":{"title":"Leegality: Keeping Clients Updated with Messaging | MSG91"},"/case-studies/oxebox":{"title":"OxeBox: Securing Customer Accounts via for Enhanced Security | MSG91"},"/case-studies/loco":{"title":"Loco: Safeguarding Customer Accounts with OTP for Enhanced Security | MSG91"},"/case-studies/technovision":{"title":"Technovision: Keeping Customers Informed about Offers via | MSG91"},"/case-studies/mahindra":{"title":"Mahindra & Mahindra Automotive Division: Keeping Customers Informed via | MSG91"},"/case-studies/clickpost":{"title":"ClickPost: Keeping Customers Informed about Orders via | MSG91"},"/case-studies/smartshift":{"title":"Smart Shift: Ensuring a Hassle-Free Shift with Notifications | MSG91"},"/case-studies/saboro":{"title":"Mahindra Saboro: Sending Order Updates to Customers via | MSG91"},"/case-studies/zing":{"title":"ZingHR: Communicating with Potential Candidates via Messaging | MSG91"},"/case-studies/indialends":{"title":"IndiaLends: Ensuring Seamless Operations for Customers with | MSG91"},"/case-studies/unacademy":{"title":"Unacademy: Making Learning and Teaching Easy with | MSG91"},"/case-studies/leadsquared":{"title":"Leadsquared: Ensuring Sales Execution with | MSG91"},"case-studies-tags -----------------------":{},"/case-studies/tag/ngo":{"title":"NGO\'s Case Studies | MSG91"},"/case-studies/tag/transaction-sms":{"title":"Transaction SMS Case Studies | MSG91"},"/case-studies/tag/unicode":{"title":"Unicode Case Studies | MSG91"},"/case-studies/tag/services":{"title":"Services Case Studies | MSG91"},"/case-studies/tag/startup":{"title":"Startup Case Studies | MSG91"},"/case-studies/tag/food-travel-and-hospitality":{"title":"Food, Travel and Hospitality Case Studies | MSG91"},"/case-studies/tag/promotional-sms":{"title":"Promotional SMS Case Studies | MSG91"},"/case-studies/tag/e-commerce":{"title":"E-commerce Case Studies | MSG91"},"/case-studies/tag/otp":{"title":"OTP Case Studies | MSG91"},"/case-studies/tag/fintech":{"title":"Fintech Case Studies | MSG91"},"/case-studies/tag/education":{"title":"Education Case Studies | MSG91"},"/case-studies/tag/logistics":{"title":"Logistics Case Studies | MSG91"},"/case-studies/tag/crm":{"title":"CRM Case Studies | MSG91"},"/case-studies/tag/trivia-game":{"title":"Trivia Game Case Studies | MSG91"},"/case-studies/tag/automobile":{"title":"Automobile Case Studies | MSG91"},"/case-studies/tag/transactional-sms":{"title":"Transactional-SMS Case Studies | MSG91"},"/whatsapp/chatbot -----------------------":{},"/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"},"/br/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"},"/br-pt/whatsapp/chatbot":{"title":"Whatsapp com Chatbot | MSG91","description":"Maximize o potencial de neg\xf3cios com o WhatsApp: Libere a automa\xe7\xe3o, supercarregue as vendas e aproveite a efici\xeancia de um chatbot do WhatsApp. Eleve sua estrat\xe9gia para o sucesso hoje!"},"/in/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91-India","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"},"/gb/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91-United Kingdom","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"},"/us/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91-United States","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"},"/ph/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91-Philippines","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"},"/sg/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91-Singapore","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"},"/ae/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91-United Arab Emirates","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"},"/es/whatsapp/chatbot":{"title":"Whatsapp with Chatbot | MSG91-Spain","description":"Maximize business potential with WhatsApp: Unleash automation, supercharge sales, and harness the efficiency of a WhatsApp chatbot. Elevate your strategy for success today!"}}'
                );
            let k = (e) => {
                let t = ['in', 'ae', 'ph', 'sg', 'es', 'gb', 'us'],
                    n = {
                        gbl: [
                            'contact-us',
                            'blog',
                            'partners-and-integrations',
                            'about-us',
                            'developers',
                            'startups',
                            'become-a-partner',
                            'certificates',
                            'case-studies',
                            'terms-of-use',
                            'privacy-policy',
                            'gdpr',
                            'refund-policy',
                            'cookie-policy',
                            'startup-policy',
                            'fair-pricing-policy',
                            'no-spam',
                            'login',
                            'signup',
                            'signin',
                            'guide',
                            'startups-form',
                            'thank-you',
                        ],
                    },
                    a = e.browserPath.split('?')[0].replace(/\/$/, '');
                var o,
                    s,
                    r,
                    c = P[a] ? P[a] : { title: '', description: '' };
                let l = e.browserPath.split('?'),
                    u = l[0].split('/');
                return (
                    2 == u.length
                        ? t.includes(u[1])
                            ? ((o = ''), (s = '/' + u[1]))
                            : ((o = u[1] ? '/' + u[1] : ''), (s = ''), (r = n.gbl.includes(u[1])))
                        : t.includes(u[1])
                          ? ((s = '/' + u[1]), (o = '/' + u.slice(2).join('/')))
                          : ((o = '/' + u.slice(1).join('/')), (s = ''), (r = n.gbl.includes(u[1]))),
                    (0, i.jsx)(i.Fragment, {
                        children: (0, i.jsxs)(_(), {
                            children: [
                                (0, i.jsx)('title', { children: null == c ? void 0 : c.title }),
                                (0, i.jsx)('meta', {
                                    name: 'description',
                                    content: null == c ? void 0 : c.description,
                                }),
                                (0, i.jsx)('meta', {
                                    name: 'viewport',
                                    content:
                                        'width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no',
                                }),
                                (0, i.jsx)('meta', {
                                    name: 'google-site-verification',
                                    content: 'RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ',
                                }),
                                (0, i.jsx)('link', { rel: 'icon', href: '/fav.svg' }),
                                !1,
                                (0, i.jsx)('link', { rel: 'canonical', href: 'https://msg91.com'.concat(l[0]) }),
                                !r &&
                                    s &&
                                    (0, i.jsx)(i.Fragment, {
                                        children: (0, i.jsx)('link', {
                                            rel: 'alternate',
                                            hrefLang: 'en-'.concat(u[1].toUpperCase()),
                                            href: 'https://msg91.com'.concat(s).concat(o),
                                        }),
                                    }),
                                r ||
                                    (!s &&
                                        (0, i.jsx)(i.Fragment, {
                                            children: (0, i.jsx)('link', {
                                                rel: 'alternate',
                                                hrefLang: 'en',
                                                href: 'https://msg91.com'.concat(o),
                                            }),
                                        })),
                            ],
                        }),
                    })
                );
            };
            var M = n(4298),
                E = n.n(M);
            n(71399);
            var T = n(22920);
            let I = () =>
                (0, i.jsx)(T.Ix, {
                    position: 'top-right',
                    autoClose: 3e3,
                    hideProgressBar: !1,
                    newestOnTop: !1,
                    draggable: !1,
                    pauseOnVisibilityChange: !0,
                    closeOnClick: !0,
                    pauseOnHover: !0,
                });
            function j(e) {
                let { Component: t, pageProps: a } = e,
                    o = (0, u.useRouter)();
                var r = !1,
                    l = o.asPath;
                let d = o.asPath;
                var p = l.split('?')[0].split('/'),
                    f = l,
                    g = l;
                if (l.includes('partners-and-integrations')) {
                    var v = l.split('/')[2];
                    console.log('\uD83D\uDE80 ~ App ~ plugin:', l);
                }
                if ('/' !== l) {
                    let e = l.match(/\/([^/?]+)/);
                    l = e ? e[0] : l;
                }
                var b = l.split('/')[1];
                b = (null == b ? void 0 : b.length) === 2 || 'br-pt' === b || '?' === b ? '/'.concat(b) : '';
                let x = [
                    '/sms',
                    '/email',
                    '/voice',
                    '/whatsapp',
                    '/rcs',
                    '/otp',
                    '/hello',
                    '/numbers',
                    '/segmento',
                    '/campaign',
                    '/free-whatsapp-link-generator',
                    '/pricing',
                    '/pricing/sms',
                    '/shorturl',
                ];
                var y = Object.keys(o.query).length ? '/'.concat(o.query.pageslug) : l,
                    S = (function (e) {
                        let t = '/pricing/hello',
                            n = '',
                            i = '',
                            a = (0, u.useRouter)(),
                            o = a.asPath,
                            s = o.split('/');
                        return (
                            ['in', 'br', 'br-pt', 'ae', 'ph', 'sg', 'es', 'gb', 'us'].includes(s[1]) &&
                                ((n = '/'.concat(s[1])), (t = ''.concat(n, '/pricing/hello'))),
                            [
                                'hello',
                                'campaign',
                                'segmento',
                                'otpwidget',
                                'sms',
                                'otp',
                                'email',
                                'whatsapp',
                                'voice',
                                'rcs',
                            ].includes(s[2]) && ((i = '/'.concat(s[2])), (t = ''.concat(n, '/pricing').concat(i))),
                            t
                        );
                    })();
                let C = new Date().getFullYear();
                return (
                    ['/signin', '/signup', '/github-auth', '/github-auth-token', '/outlook-token', '/verify'].includes(
                        l
                    ) || (r = !0),
                    (0, s.useEffect)(() => {
                        n(78702);
                        let e = window.location.search;
                        e.includes('utm_')
                            ? (0, h.d8)('msg91_query', e.replace(/service=\w+&?/, ''), 30)
                            : v
                              ? (0, h.d8)(
                                    'msg91_query',
                                    '?utm_campaign=tigerplugin&utm_source='.concat(v, '&utm_medium=website'),
                                    30
                                )
                              : (0, h.ej)('msg91_query') ||
                                (0, h.d8)('msg91_query', '?utm_source=msg91Website&source=msg91', 30),
                            (0, h.Wi)(),
                            Object.keys(m).includes(b) && (0, h.d8)('country_code', b, 30);
                        var t = (0, h.ej)('country_code');
                        c()('a').on('click', function (e) {
                            e.preventDefault();
                            var n = c()(this).attr('href'),
                                i = c()(this).attr('target');
                            void 0 !== n &&
                                ('?' === t && '/' === n && (n = '/?'),
                                x.includes(n) && t && '?' !== t && (n = '/' + t + n),
                                '_blank' === i ? window.open(n, '_blank') : (window.location.href = n));
                        });
                    }, []),
                    (0, i.jsxs)(i.Fragment, {
                        children: [
                            (0, i.jsx)(E(), {
                                strategy: 'afterInteractive',
                                dangerouslySetInnerHTML: {
                                    __html: 'var helloConfig = {\n              widgetToken: "1d31e",\n              hide_launcher: false\n            };',
                                },
                            }),
                            (0, i.jsx)(E(), {
                                onload: 'initChatWidget(helloConfig, 5000)',
                                src: 'https://control.msg91.com/app/assets/widget/chat-widget.js',
                            }),
                            (0, i.jsx)(E(), {
                                strategy: 'afterInteractive',
                                dangerouslySetInnerHTML: {
                                    __html: "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-NWZKLRJ');",
                                },
                            }),
                            '/in' == l.browserPath &&
                                (0, i.jsxs)(i.Fragment, {
                                    children: [
                                        (0, i.jsx)(E(), {
                                            type: 'application/ld+json',
                                            strategy: 'afterInteractive',
                                            dangerouslySetInnerHTML: {
                                                __html: '{\n              "@context": "https://schema.org/",\n              "@type": "WebSite",\n              "name": "MSG91",\n              "url": "https://msg91.com'.concat(
                                                    l.browserPath,
                                                    '",\n              "potentialAction": {\n                "@type": "SearchAction",\n                "target": "https://msg91.com/in/search?q={search_term_string}",\n                "query-input": "required name=search_term_string"\n              }\n            }'
                                                ),
                                            },
                                        }),
                                        (0, i.jsx)(E(), {
                                            type: 'application/ld+json',
                                            strategy: 'afterInteractive',
                                            dangerouslySetInnerHTML: {
                                                __html: '{\n              "@context": "https://schema.org",\n              "@type": "Organization",\n              "name": "MSG91",\n              "url": "https://msg91.com/in",\n              "logo": "https://msg91.com/img/logo.svg",\n              "sameAs": [\n                "https://www.facebook.com/msg91",\n                "https://twitter.com/msg91",\n                "https://www.youtube.com/@WalkoverWS"\n              ]\n            }',
                                            },
                                        }),
                                    ],
                                }),
                            (0, i.jsx)(k, { browserPath: g }),
                            r && (0, i.jsx)(w, { browserPath: l, pricingPath: S, path: b, pageSlug: y, pathArray: p }),
                            (0, i.jsx)(t, {
                                ...a,
                                path: b,
                                browserPath: l,
                                browserPathCase: f,
                                pricingPath: S,
                                pathArray: p,
                                rawPath: d,
                            }),
                            r && (0, i.jsx)(A.Z, { path: b, year: C }),
                            (0, i.jsx)(I, {}),
                        ],
                    })
                );
            }
            j.getInitialProps = async (e) => {
                let { asPath: t } = e;
                return { asPath: t };
            };
        },
        84494: function () {},
        71399: function () {},
        64627: function () {},
        77663: function (e) {
            !(function () {
                var t = {
                        229: function (e) {
                            var t,
                                n,
                                i,
                                a = (e.exports = {});
                            function o() {
                                throw Error('setTimeout has not been defined');
                            }
                            function s() {
                                throw Error('clearTimeout has not been defined');
                            }
                            function r(e) {
                                if (t === setTimeout) return setTimeout(e, 0);
                                if ((t === o || !t) && setTimeout) return (t = setTimeout), setTimeout(e, 0);
                                try {
                                    return t(e, 0);
                                } catch (n) {
                                    try {
                                        return t.call(null, e, 0);
                                    } catch (n) {
                                        return t.call(this, e, 0);
                                    }
                                }
                            }
                            !(function () {
                                try {
                                    t = 'function' == typeof setTimeout ? setTimeout : o;
                                } catch (e) {
                                    t = o;
                                }
                                try {
                                    n = 'function' == typeof clearTimeout ? clearTimeout : s;
                                } catch (e) {
                                    n = s;
                                }
                            })();
                            var c = [],
                                l = !1,
                                u = -1;
                            function d() {
                                l && i && ((l = !1), i.length ? (c = i.concat(c)) : (u = -1), c.length && p());
                            }
                            function p() {
                                if (!l) {
                                    var e = r(d);
                                    l = !0;
                                    for (var t = c.length; t; ) {
                                        for (i = c, c = []; ++u < t; ) i && i[u].run();
                                        (u = -1), (t = c.length);
                                    }
                                    (i = null),
                                        (l = !1),
                                        (function (e) {
                                            if (n === clearTimeout) return clearTimeout(e);
                                            if ((n === s || !n) && clearTimeout)
                                                return (n = clearTimeout), clearTimeout(e);
                                            try {
                                                n(e);
                                            } catch (t) {
                                                try {
                                                    return n.call(null, e);
                                                } catch (t) {
                                                    return n.call(this, e);
                                                }
                                            }
                                        })(e);
                                }
                            }
                            function m(e, t) {
                                (this.fun = e), (this.array = t);
                            }
                            function h() {}
                            (a.nextTick = function (e) {
                                var t = Array(arguments.length - 1);
                                if (arguments.length > 1)
                                    for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                                c.push(new m(e, t)), 1 !== c.length || l || r(p);
                            }),
                                (m.prototype.run = function () {
                                    this.fun.apply(null, this.array);
                                }),
                                (a.title = 'browser'),
                                (a.browser = !0),
                                (a.env = {}),
                                (a.argv = []),
                                (a.version = ''),
                                (a.versions = {}),
                                (a.on = h),
                                (a.addListener = h),
                                (a.once = h),
                                (a.off = h),
                                (a.removeListener = h),
                                (a.removeAllListeners = h),
                                (a.emit = h),
                                (a.prependListener = h),
                                (a.prependOnceListener = h),
                                (a.listeners = function (e) {
                                    return [];
                                }),
                                (a.binding = function (e) {
                                    throw Error('process.binding is not supported');
                                }),
                                (a.cwd = function () {
                                    return '/';
                                }),
                                (a.chdir = function (e) {
                                    throw Error('process.chdir is not supported');
                                }),
                                (a.umask = function () {
                                    return 0;
                                });
                        },
                    },
                    n = {};
                function i(e) {
                    var a = n[e];
                    if (void 0 !== a) return a.exports;
                    var o = (n[e] = { exports: {} }),
                        s = !0;
                    try {
                        t[e](o, o.exports, i), (s = !1);
                    } finally {
                        s && delete n[e];
                    }
                    return o.exports;
                }
                i.ab = '//';
                var a = i(229);
                e.exports = a;
            })();
        },
        9008: function (e, t, n) {
            e.exports = n(42636);
        },
        25675: function (e, t, n) {
            e.exports = n(93740);
        },
        41664: function (e, t, n) {
            e.exports = n(95569);
        },
        11163: function (e, t, n) {
            e.exports = n(96885);
        },
        4298: function (e, t, n) {
            e.exports = n(85442);
        },
        88357: function (e, t, n) {
            'use strict';
            n.d(t, {
                w_: function () {
                    return c;
                },
            });
            var i = n(67294),
                a = { color: void 0, size: void 0, className: void 0, style: void 0, attr: void 0 },
                o = i.createContext && i.createContext(a),
                s = function () {
                    return (s =
                        Object.assign ||
                        function (e) {
                            for (var t, n = 1, i = arguments.length; n < i; n++)
                                for (var a in (t = arguments[n]))
                                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                            return e;
                        }).apply(this, arguments);
                },
                r = function (e, t) {
                    var n = {};
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && 0 > t.indexOf(i) && (n[i] = e[i]);
                    if (null != e && 'function' == typeof Object.getOwnPropertySymbols)
                        for (var a = 0, i = Object.getOwnPropertySymbols(e); a < i.length; a++)
                            0 > t.indexOf(i[a]) &&
                                Object.prototype.propertyIsEnumerable.call(e, i[a]) &&
                                (n[i[a]] = e[i[a]]);
                    return n;
                };
            function c(e) {
                return function (t) {
                    return i.createElement(
                        l,
                        s({ attr: s({}, e.attr) }, t),
                        (function e(t) {
                            return (
                                t &&
                                t.map(function (t, n) {
                                    return i.createElement(t.tag, s({ key: n }, t.attr), e(t.child));
                                })
                            );
                        })(e.child)
                    );
                };
            }
            function l(e) {
                var t = function (t) {
                    var n,
                        a = e.attr,
                        o = e.size,
                        c = e.title,
                        l = r(e, ['attr', 'size', 'title']),
                        u = o || t.size || '1em';
                    return (
                        t.className && (n = t.className),
                        e.className && (n = (n ? n + ' ' : '') + e.className),
                        i.createElement(
                            'svg',
                            s({ stroke: 'currentColor', fill: 'currentColor', strokeWidth: '0' }, t.attr, a, l, {
                                className: n,
                                style: s(s({ color: e.color || t.color }, t.style), e.style),
                                height: u,
                                width: u,
                                xmlns: 'http://www.w3.org/2000/svg',
                            }),
                            c && i.createElement('title', null, c),
                            e.children
                        )
                    );
                };
                return void 0 !== o
                    ? i.createElement(o.Consumer, null, function (e) {
                          return t(e);
                      })
                    : t(a);
            }
        },
        5434: function (e, t, n) {
            'use strict';
            n.d(t, {
                $lZ: function () {
                    return p;
                },
                $x8: function () {
                    return d;
                },
                AeI: function () {
                    return _;
                },
                B4e: function () {
                    return T;
                },
                BTW: function () {
                    return j;
                },
                D6S: function () {
                    return y;
                },
                E0L: function () {
                    return N;
                },
                EGB: function () {
                    return f;
                },
                F8X: function () {
                    return O;
                },
                FU5: function () {
                    return I;
                },
                HOZ: function () {
                    return m;
                },
                Ix0: function () {
                    return A;
                },
                NsK: function () {
                    return a;
                },
                OhQ: function () {
                    return L;
                },
                QoK: function () {
                    return h;
                },
                S2C: function () {
                    return w;
                },
                T2A: function () {
                    return z;
                },
                Tcr: function () {
                    return o;
                },
                VzJ: function () {
                    return M;
                },
                Yc6: function () {
                    return G;
                },
                ZSR: function () {
                    return s;
                },
                dKE: function () {
                    return S;
                },
                f$3: function () {
                    return r;
                },
                fFs: function () {
                    return v;
                },
                gSd: function () {
                    return g;
                },
                hdK: function () {
                    return E;
                },
                ixJ: function () {
                    return b;
                },
                jyD: function () {
                    return D;
                },
                oXF: function () {
                    return x;
                },
                rWj: function () {
                    return P;
                },
                sG8: function () {
                    return C;
                },
                uAz: function () {
                    return k;
                },
                vB0: function () {
                    return l;
                },
                vhT: function () {
                    return u;
                },
                w2P: function () {
                    return B;
                },
                w6: function () {
                    return c;
                },
            });
            var i = n(88357);
            function a(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: { d: 'M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z' },
                        },
                    ],
                })(e);
            }
            function o(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0zm0 0h24v24H0V0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
                            },
                        },
                    ],
                })(e);
            }
            function s(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
                            },
                        },
                    ],
                })(e);
            }
            function r(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
                            },
                        },
                    ],
                })(e);
            }
            function c(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M19.77 5.03l1.4 1.4L8.43 19.17l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 5.03m0-2.83L8.43 13.54l-4.2-4.2L0 13.57 8.43 22 24 6.43 19.77 2.2z',
                            },
                        },
                    ],
                })(e);
            }
            function l(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        { tag: 'path', attr: { d: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' } },
                    ],
                })(e);
            }
            function u(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        {
                            tag: 'path',
                            attr: {
                                d: 'M21 4H11l-1-3H3c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8l1 3h9c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 16c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.35 0 2.48.5 3.35 1.3L9.03 8.57c-.38-.36-1.04-.78-2.03-.78-1.74 0-3.15 1.44-3.15 3.21S5.26 14.21 7 14.21c2.01 0 2.84-1.44 2.92-2.41H7v-1.71h4.68c.07.31.12.61.12 1.02C11.8 13.97 9.89 16 7 16zm6.17-5.42h3.7c-.43 1.25-1.11 2.43-2.05 3.47-.31-.35-.6-.72-.86-1.1l-.79-2.37zm8.33 9.92c0 .55-.45 1-1 1H14l2-2.5-1.04-3.1 3.1 3.1.92-.92-3.3-3.25.02-.02c1.13-1.25 1.93-2.69 2.4-4.22H20v-1.3h-4.53V8h-1.29v1.29h-1.44L11.46 5.5h9.04c.55 0 1 .45 1 1v14z',
                            },
                        },
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0zm0 0h24v24H0z' } },
                    ],
                })(e);
            }
            function d(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z',
                            },
                        },
                    ],
                })(e);
            }
            function p(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z',
                            },
                        },
                    ],
                })(e);
            }
            function m(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z',
                            },
                        },
                    ],
                })(e);
            }
            function h(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0z' } },
                        { tag: 'path', attr: { d: 'M9 18h12v-2H9v2zM3 6v2h18V6H3zm6 7h12v-2H9v2z' } },
                    ],
                })(e);
            }
            function f(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M9 11.24V7.5a2.5 2.5 0 015 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74c-3.6-.76-3.54-.75-3.67-.75-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z',
                            },
                        },
                    ],
                })(e);
            }
            function g(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: { d: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z' },
                        },
                    ],
                })(e);
            }
            function v(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z',
                            },
                        },
                    ],
                })(e);
            }
            function b(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
                            },
                        },
                    ],
                })(e);
            }
            function x(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        {
                            tag: 'path',
                            attr: {
                                d: 'M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z',
                            },
                        },
                    ],
                })(e);
            }
            function y(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        { tag: 'path', attr: { d: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' } },
                    ],
                })(e);
            }
            function S(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
                            },
                        },
                        { tag: 'path', attr: { d: 'M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z' } },
                    ],
                })(e);
            }
            function w(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z',
                            },
                        },
                    ],
                })(e);
            }
            function A(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0z' } },
                        { tag: 'path', attr: { d: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' } },
                    ],
                })(e);
            }
            function C(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0z' } },
                        { tag: 'path', attr: { d: 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z' } },
                    ],
                })(e);
            }
            function _(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0z' } },
                        { tag: 'path', attr: { d: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' } },
                    ],
                })(e);
            }
            function P(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        { tag: 'path', attr: { d: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z' } },
                    ],
                })(e);
            }
            function k(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: { d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z' },
                        },
                    ],
                })(e);
            }
            function M(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z',
                            },
                        },
                    ],
                })(e);
            }
            function E(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        { tag: 'path', attr: { d: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z' } },
                    ],
                })(e);
            }
            function T(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
                            },
                        },
                    ],
                })(e);
            }
            function I(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
                            },
                        },
                    ],
                })(e);
            }
            function j(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        { tag: 'path', attr: { d: 'M15 5l-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z' } },
                    ],
                })(e);
            }
            function G(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        { tag: 'path', attr: { d: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' } },
                    ],
                })(e);
            }
            function N(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z',
                            },
                        },
                        { tag: 'circle', attr: { cx: '9', cy: '13', r: '1' } },
                        { tag: 'circle', attr: { cx: '15', cy: '13', r: '1' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M18 11.03A6.04 6.04 0 0012.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 004.86-5.89c1.31 2.63 4 4.44 7.12 4.47z',
                            },
                        },
                    ],
                })(e);
            }
            function B(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M19.05 4.91A9.816 9.816 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z',
                            },
                        },
                    ],
                })(e);
            }
            function O(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z',
                            },
                        },
                    ],
                })(e);
            }
            function L(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0V0z' } },
                        { tag: 'path', attr: { d: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' } },
                    ],
                })(e);
            }
            function D(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41a1.42 1.42 0 01-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z',
                            },
                        },
                    ],
                })(e);
            }
            function z(e) {
                return (0, i.w_)({
                    tag: 'svg',
                    attr: { viewBox: '0 0 24 24' },
                    child: [
                        { tag: 'path', attr: { fill: 'none', d: 'M0 0h24v24H0z' } },
                        {
                            tag: 'path',
                            attr: {
                                d: 'M10.5 13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3V13zM12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z',
                            },
                        },
                    ],
                })(e);
            }
        },
        22920: function (e, t, n) {
            'use strict';
            n.d(t, {
                Ix: function () {
                    return w;
                },
                Am: function () {
                    return T;
                },
            });
            var i = n(67294),
                a = function () {
                    for (var e, t, n = 0, i = ''; n < arguments.length; )
                        (e = arguments[n++]) &&
                            (t = (function e(t) {
                                var n,
                                    i,
                                    a = '';
                                if ('string' == typeof t || 'number' == typeof t) a += t;
                                else if ('object' == typeof t) {
                                    if (Array.isArray(t))
                                        for (n = 0; n < t.length; n++)
                                            t[n] && (i = e(t[n])) && (a && (a += ' '), (a += i));
                                    else for (n in t) t[n] && (a && (a += ' '), (a += n));
                                }
                                return a;
                            })(e)) &&
                            (i && (i += ' '), (i += t));
                    return i;
                };
            let o = (e) => 'number' == typeof e && !isNaN(e),
                s = (e) => 'string' == typeof e,
                r = (e) => 'function' == typeof e,
                c = (e) => (s(e) || r(e) ? e : null),
                l = (e) => (0, i.isValidElement)(e) || s(e) || r(e) || o(e);
            function u(e) {
                let { enter: t, exit: n, appendPosition: a = !1, collapse: o = !0, collapseDuration: s = 300 } = e;
                return function (e) {
                    let { children: r, position: c, preventExitTransition: l, done: u, nodeRef: d, isIn: p } = e,
                        m = a ? `${t}--${c}` : t,
                        h = a ? `${n}--${c}` : n,
                        f = (0, i.useRef)(0);
                    return (
                        (0, i.useLayoutEffect)(() => {
                            let e = d.current,
                                t = m.split(' '),
                                n = (i) => {
                                    i.target === d.current &&
                                        (e.dispatchEvent(new Event('d')),
                                        e.removeEventListener('animationend', n),
                                        e.removeEventListener('animationcancel', n),
                                        0 === f.current && 'animationcancel' !== i.type && e.classList.remove(...t));
                                };
                            e.classList.add(...t),
                                e.addEventListener('animationend', n),
                                e.addEventListener('animationcancel', n);
                        }, []),
                        (0, i.useEffect)(() => {
                            let e = d.current,
                                t = () => {
                                    e.removeEventListener('animationend', t),
                                        o
                                            ? (function (e, t, n) {
                                                  void 0 === n && (n = 300);
                                                  let { scrollHeight: i, style: a } = e;
                                                  requestAnimationFrame(() => {
                                                      (a.minHeight = 'initial'),
                                                          (a.height = i + 'px'),
                                                          (a.transition = `all ${n}ms`),
                                                          requestAnimationFrame(() => {
                                                              (a.height = '0'),
                                                                  (a.padding = '0'),
                                                                  (a.margin = '0'),
                                                                  setTimeout(t, n);
                                                          });
                                                  });
                                              })(e, u, s)
                                            : u();
                                };
                            p ||
                                (l
                                    ? t()
                                    : ((f.current = 1),
                                      (e.className += ` ${h}`),
                                      e.addEventListener('animationend', t)));
                        }, [p]),
                        i.createElement(i.Fragment, null, r)
                    );
                };
            }
            function d(e, t) {
                return null != e
                    ? {
                          content: e.content,
                          containerId: e.props.containerId,
                          id: e.props.toastId,
                          theme: e.props.theme,
                          type: e.props.type,
                          data: e.props.data || {},
                          isLoading: e.props.isLoading,
                          icon: e.props.icon,
                          status: t,
                      }
                    : {};
            }
            let p = {
                    list: new Map(),
                    emitQueue: new Map(),
                    on(e, t) {
                        return this.list.has(e) || this.list.set(e, []), this.list.get(e).push(t), this;
                    },
                    off(e, t) {
                        if (t) {
                            let n = this.list.get(e).filter((e) => e !== t);
                            return this.list.set(e, n), this;
                        }
                        return this.list.delete(e), this;
                    },
                    cancelEmit(e) {
                        let t = this.emitQueue.get(e);
                        return t && (t.forEach(clearTimeout), this.emitQueue.delete(e)), this;
                    },
                    emit(e) {
                        this.list.has(e) &&
                            this.list.get(e).forEach((t) => {
                                let n = setTimeout(() => {
                                    t(...[].slice.call(arguments, 1));
                                }, 0);
                                this.emitQueue.has(e) || this.emitQueue.set(e, []), this.emitQueue.get(e).push(n);
                            });
                    },
                },
                m = (e) => {
                    let { theme: t, type: n, ...a } = e;
                    return i.createElement('svg', {
                        viewBox: '0 0 24 24',
                        width: '100%',
                        height: '100%',
                        fill: 'colored' === t ? 'currentColor' : `var(--toastify-icon-color-${n})`,
                        ...a,
                    });
                },
                h = {
                    info: function (e) {
                        return i.createElement(
                            m,
                            { ...e },
                            i.createElement('path', {
                                d: 'M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z',
                            })
                        );
                    },
                    warning: function (e) {
                        return i.createElement(
                            m,
                            { ...e },
                            i.createElement('path', {
                                d: 'M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z',
                            })
                        );
                    },
                    success: function (e) {
                        return i.createElement(
                            m,
                            { ...e },
                            i.createElement('path', {
                                d: 'M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z',
                            })
                        );
                    },
                    error: function (e) {
                        return i.createElement(
                            m,
                            { ...e },
                            i.createElement('path', {
                                d: 'M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z',
                            })
                        );
                    },
                    spinner: function () {
                        return i.createElement('div', { className: 'Toastify__spinner' });
                    },
                };
            function f(e) {
                return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientX : e.clientX;
            }
            function g(e) {
                return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientY : e.clientY;
            }
            function v(e) {
                let { closeToast: t, theme: n, ariaLabel: a = 'close' } = e;
                return i.createElement(
                    'button',
                    {
                        className: `Toastify__close-button Toastify__close-button--${n}`,
                        type: 'button',
                        onClick: (e) => {
                            e.stopPropagation(), t(e);
                        },
                        'aria-label': a,
                    },
                    i.createElement(
                        'svg',
                        { 'aria-hidden': 'true', viewBox: '0 0 14 16' },
                        i.createElement('path', {
                            fillRule: 'evenodd',
                            d: 'M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z',
                        })
                    )
                );
            }
            function b(e) {
                let {
                        delay: t,
                        isRunning: n,
                        closeToast: o,
                        type: s = 'default',
                        hide: c,
                        className: l,
                        style: u,
                        controlledProgress: d,
                        progress: p,
                        rtl: m,
                        isIn: h,
                        theme: f,
                    } = e,
                    g = c || (d && 0 === p),
                    v = {
                        ...u,
                        animationDuration: `${t}ms`,
                        animationPlayState: n ? 'running' : 'paused',
                        opacity: g ? 0 : 1,
                    };
                d && (v.transform = `scaleX(${p})`);
                let b = a(
                        'Toastify__progress-bar',
                        d ? 'Toastify__progress-bar--controlled' : 'Toastify__progress-bar--animated',
                        `Toastify__progress-bar-theme--${f}`,
                        `Toastify__progress-bar--${s}`,
                        { 'Toastify__progress-bar--rtl': m }
                    ),
                    x = r(l) ? l({ rtl: m, type: s, defaultClassName: b }) : a(b, l);
                return i.createElement('div', {
                    role: 'progressbar',
                    'aria-hidden': g ? 'true' : 'false',
                    'aria-label': 'notification timer',
                    className: x,
                    style: v,
                    [d && p >= 1 ? 'onTransitionEnd' : 'onAnimationEnd']:
                        d && p < 1
                            ? null
                            : () => {
                                  h && o();
                              },
                });
            }
            let x = (e) => {
                    let {
                            isRunning: t,
                            preventExitTransition: n,
                            toastRef: o,
                            eventHandlers: s,
                        } = (function (e) {
                            let [t, n] = (0, i.useState)(!1),
                                [a, o] = (0, i.useState)(!1),
                                s = (0, i.useRef)(null),
                                c = (0, i.useRef)({
                                    start: 0,
                                    x: 0,
                                    y: 0,
                                    delta: 0,
                                    removalDistance: 0,
                                    canCloseOnClick: !0,
                                    canDrag: !1,
                                    boundingRect: null,
                                    didMove: !1,
                                }).current,
                                l = (0, i.useRef)(e),
                                { autoClose: u, pauseOnHover: d, closeToast: p, onClick: m, closeOnClick: h } = e;
                            function v(t) {
                                if (e.draggable) {
                                    'touchstart' === t.nativeEvent.type && t.nativeEvent.preventDefault(),
                                        (c.didMove = !1),
                                        document.addEventListener('mousemove', S),
                                        document.addEventListener('mouseup', w),
                                        document.addEventListener('touchmove', S),
                                        document.addEventListener('touchend', w);
                                    let n = s.current;
                                    (c.canCloseOnClick = !0),
                                        (c.canDrag = !0),
                                        (c.boundingRect = n.getBoundingClientRect()),
                                        (n.style.transition = ''),
                                        (c.x = f(t.nativeEvent)),
                                        (c.y = g(t.nativeEvent)),
                                        'x' === e.draggableDirection
                                            ? ((c.start = c.x),
                                              (c.removalDistance = n.offsetWidth * (e.draggablePercent / 100)))
                                            : ((c.start = c.y),
                                              (c.removalDistance =
                                                  n.offsetHeight *
                                                  (80 === e.draggablePercent
                                                      ? 1.5 * e.draggablePercent
                                                      : e.draggablePercent / 100)));
                                }
                            }
                            function b(t) {
                                if (c.boundingRect) {
                                    let { top: n, bottom: i, left: a, right: o } = c.boundingRect;
                                    'touchend' !== t.nativeEvent.type &&
                                    e.pauseOnHover &&
                                    c.x >= a &&
                                    c.x <= o &&
                                    c.y >= n &&
                                    c.y <= i
                                        ? y()
                                        : x();
                                }
                            }
                            function x() {
                                n(!0);
                            }
                            function y() {
                                n(!1);
                            }
                            function S(n) {
                                let i = s.current;
                                c.canDrag &&
                                    i &&
                                    ((c.didMove = !0),
                                    t && y(),
                                    (c.x = f(n)),
                                    (c.y = g(n)),
                                    (c.delta = 'x' === e.draggableDirection ? c.x - c.start : c.y - c.start),
                                    c.start !== c.x && (c.canCloseOnClick = !1),
                                    (i.style.transform = `translate${e.draggableDirection}(${c.delta}px)`),
                                    (i.style.opacity = '' + (1 - Math.abs(c.delta / c.removalDistance))));
                            }
                            function w() {
                                document.removeEventListener('mousemove', S),
                                    document.removeEventListener('mouseup', w),
                                    document.removeEventListener('touchmove', S),
                                    document.removeEventListener('touchend', w);
                                let t = s.current;
                                if (c.canDrag && c.didMove && t) {
                                    if (((c.canDrag = !1), Math.abs(c.delta) > c.removalDistance))
                                        return o(!0), void e.closeToast();
                                    (t.style.transition = 'transform 0.2s, opacity 0.2s'),
                                        (t.style.transform = `translate${e.draggableDirection}(0)`),
                                        (t.style.opacity = '1');
                                }
                            }
                            (0, i.useEffect)(() => {
                                l.current = e;
                            }),
                                (0, i.useEffect)(
                                    () => (
                                        s.current && s.current.addEventListener('d', x, { once: !0 }),
                                        r(e.onOpen) && e.onOpen((0, i.isValidElement)(e.children) && e.children.props),
                                        () => {
                                            let e = l.current;
                                            r(e.onClose) &&
                                                e.onClose((0, i.isValidElement)(e.children) && e.children.props);
                                        }
                                    ),
                                    []
                                ),
                                (0, i.useEffect)(
                                    () => (
                                        e.pauseOnFocusLoss &&
                                            (document.hasFocus() || y(),
                                            window.addEventListener('focus', x),
                                            window.addEventListener('blur', y)),
                                        () => {
                                            e.pauseOnFocusLoss &&
                                                (window.removeEventListener('focus', x),
                                                window.removeEventListener('blur', y));
                                        }
                                    ),
                                    [e.pauseOnFocusLoss]
                                );
                            let A = { onMouseDown: v, onTouchStart: v, onMouseUp: b, onTouchEnd: b };
                            return (
                                u && d && ((A.onMouseEnter = y), (A.onMouseLeave = x)),
                                h &&
                                    (A.onClick = (e) => {
                                        m && m(e), c.canCloseOnClick && p();
                                    }),
                                {
                                    playToast: x,
                                    pauseToast: y,
                                    isRunning: t,
                                    preventExitTransition: a,
                                    toastRef: s,
                                    eventHandlers: A,
                                }
                            );
                        })(e),
                        {
                            closeButton: c,
                            children: l,
                            autoClose: u,
                            onClick: d,
                            type: p,
                            hideProgressBar: m,
                            closeToast: h,
                            transition: x,
                            position: y,
                            className: S,
                            style: w,
                            bodyClassName: A,
                            bodyStyle: C,
                            progressClassName: _,
                            progressStyle: P,
                            updateId: k,
                            role: M,
                            progress: E,
                            rtl: T,
                            toastId: I,
                            deleteToast: j,
                            isIn: G,
                            isLoading: N,
                            iconOut: B,
                            closeOnClick: O,
                            theme: L,
                        } = e,
                        D = a(
                            'Toastify__toast',
                            `Toastify__toast-theme--${L}`,
                            `Toastify__toast--${p}`,
                            { 'Toastify__toast--rtl': T },
                            { 'Toastify__toast--close-on-click': O }
                        ),
                        z = r(S) ? S({ rtl: T, position: y, type: p, defaultClassName: D }) : a(D, S),
                        R = !!E || !u,
                        U = { closeToast: h, type: p, theme: L },
                        q = null;
                    return (
                        !1 === c || (q = r(c) ? c(U) : (0, i.isValidElement)(c) ? (0, i.cloneElement)(c, U) : v(U)),
                        i.createElement(
                            x,
                            { isIn: G, done: j, position: y, preventExitTransition: n, nodeRef: o },
                            i.createElement(
                                'div',
                                { id: I, onClick: d, className: z, ...s, style: w, ref: o },
                                i.createElement(
                                    'div',
                                    {
                                        ...(G && { role: M }),
                                        className: r(A) ? A({ type: p }) : a('Toastify__toast-body', A),
                                        style: C,
                                    },
                                    null != B &&
                                        i.createElement(
                                            'div',
                                            {
                                                className: a('Toastify__toast-icon', {
                                                    'Toastify--animate-icon Toastify__zoom-enter': !N,
                                                }),
                                            },
                                            B
                                        ),
                                    i.createElement('div', null, l)
                                ),
                                q,
                                i.createElement(b, {
                                    ...(k && !R ? { key: `pb-${k}` } : {}),
                                    rtl: T,
                                    theme: L,
                                    delay: u,
                                    isRunning: t,
                                    isIn: G,
                                    closeToast: h,
                                    hide: m,
                                    type: p,
                                    style: P,
                                    className: _,
                                    controlledProgress: R,
                                    progress: E || 0,
                                })
                            )
                        )
                    );
                },
                y = function (e, t) {
                    return (
                        void 0 === t && (t = !1),
                        {
                            enter: `Toastify--animate Toastify__${e}-enter`,
                            exit: `Toastify--animate Toastify__${e}-exit`,
                            appendPosition: t,
                        }
                    );
                },
                S = u(y('bounce', !0)),
                w =
                    (u(y('slide', !0)),
                    u(y('zoom')),
                    u(y('flip')),
                    (0, i.forwardRef)((e, t) => {
                        let {
                                getToastToRender: n,
                                containerRef: u,
                                isToastActive: m,
                            } = (function (e) {
                                let [, t] = (0, i.useReducer)((e) => e + 1, 0),
                                    [n, a] = (0, i.useState)([]),
                                    u = (0, i.useRef)(null),
                                    m = (0, i.useRef)(new Map()).current,
                                    f = (e) => -1 !== n.indexOf(e),
                                    g = (0, i.useRef)({
                                        toastKey: 1,
                                        displayedToast: 0,
                                        count: 0,
                                        queue: [],
                                        props: e,
                                        containerId: null,
                                        isToastActive: f,
                                        getToast: (e) => m.get(e),
                                    }).current;
                                function v(e) {
                                    let { containerId: t } = e,
                                        { limit: n } = g.props;
                                    !n || (t && g.containerId !== t) || ((g.count -= g.queue.length), (g.queue = []));
                                }
                                function b(e) {
                                    a((t) => (null == e ? [] : t.filter((t) => t !== e)));
                                }
                                function x() {
                                    let { toastContent: e, toastProps: t, staleId: n } = g.queue.shift();
                                    S(e, t, n);
                                }
                                function y(e, n) {
                                    var a, f;
                                    let { delay: v, staleId: y, ...w } = n;
                                    if (
                                        !l(e) ||
                                        !u.current ||
                                        (g.props.enableMultiContainer && w.containerId !== g.props.containerId) ||
                                        (m.has(w.toastId) && null == w.updateId)
                                    )
                                        return;
                                    let { toastId: A, updateId: C, data: _ } = w,
                                        { props: P } = g,
                                        k = () => b(A),
                                        M = null == C;
                                    M && g.count++;
                                    let E = {
                                        ...P,
                                        style: P.toastStyle,
                                        key: g.toastKey++,
                                        ...Object.fromEntries(
                                            Object.entries(w).filter((e) => {
                                                let [t, n] = e;
                                                return null != n;
                                            })
                                        ),
                                        toastId: A,
                                        updateId: C,
                                        data: _,
                                        closeToast: k,
                                        isIn: !1,
                                        className: c(w.className || P.toastClassName),
                                        bodyClassName: c(w.bodyClassName || P.bodyClassName),
                                        progressClassName: c(w.progressClassName || P.progressClassName),
                                        autoClose:
                                            !w.isLoading &&
                                            ((a = w.autoClose), (f = P.autoClose), !1 === a || (o(a) && a > 0) ? a : f),
                                        deleteToast() {
                                            let e = d(m.get(A), 'removed');
                                            m.delete(A), p.emit(4, e);
                                            let n = g.queue.length;
                                            if (
                                                ((g.count = null == A ? g.count - g.displayedToast : g.count - 1),
                                                g.count < 0 && (g.count = 0),
                                                n > 0)
                                            ) {
                                                let e = null == A ? g.props.limit : 1;
                                                if (1 === n || 1 === e) g.displayedToast++, x();
                                                else {
                                                    let t = e > n ? n : e;
                                                    g.displayedToast = t;
                                                    for (let e = 0; e < t; e++) x();
                                                }
                                            } else t();
                                        },
                                    };
                                    (E.iconOut = (function (e) {
                                        let { theme: t, type: n, isLoading: a, icon: c } = e,
                                            l = null,
                                            u = { theme: t, type: n };
                                        return (
                                            !1 === c ||
                                                (r(c)
                                                    ? (l = c(u))
                                                    : (0, i.isValidElement)(c)
                                                      ? (l = (0, i.cloneElement)(c, u))
                                                      : s(c) || o(c)
                                                        ? (l = c)
                                                        : a
                                                          ? (l = h.spinner())
                                                          : n in h && (l = h[n](u))),
                                            l
                                        );
                                    })(E)),
                                        r(w.onOpen) && (E.onOpen = w.onOpen),
                                        r(w.onClose) && (E.onClose = w.onClose),
                                        (E.closeButton = P.closeButton),
                                        !1 === w.closeButton || l(w.closeButton)
                                            ? (E.closeButton = w.closeButton)
                                            : !0 === w.closeButton &&
                                              (E.closeButton = !l(P.closeButton) || P.closeButton);
                                    let T = e;
                                    (0, i.isValidElement)(e) && !s(e.type)
                                        ? (T = (0, i.cloneElement)(e, { closeToast: k, toastProps: E, data: _ }))
                                        : r(e) && (T = e({ closeToast: k, toastProps: E, data: _ })),
                                        P.limit && P.limit > 0 && g.count > P.limit && M
                                            ? g.queue.push({ toastContent: T, toastProps: E, staleId: y })
                                            : o(v)
                                              ? setTimeout(() => {
                                                    S(T, E, y);
                                                }, v)
                                              : S(T, E, y);
                                }
                                function S(e, t, n) {
                                    let { toastId: i } = t;
                                    n && m.delete(n);
                                    let o = { content: e, props: t };
                                    m.set(i, o),
                                        a((e) => [...e, i].filter((e) => e !== n)),
                                        p.emit(4, d(o, null == o.props.updateId ? 'added' : 'updated'));
                                }
                                return (
                                    (0, i.useEffect)(
                                        () => (
                                            (g.containerId = e.containerId),
                                            p
                                                .cancelEmit(3)
                                                .on(0, y)
                                                .on(1, (e) => u.current && b(e))
                                                .on(5, v)
                                                .emit(2, g),
                                            () => {
                                                m.clear(), p.emit(3, g);
                                            }
                                        ),
                                        []
                                    ),
                                    (0, i.useEffect)(() => {
                                        (g.props = e), (g.isToastActive = f), (g.displayedToast = n.length);
                                    }),
                                    {
                                        getToastToRender: function (t) {
                                            let n = new Map(),
                                                i = Array.from(m.values());
                                            return (
                                                e.newestOnTop && i.reverse(),
                                                i.forEach((e) => {
                                                    let { position: t } = e.props;
                                                    n.has(t) || n.set(t, []), n.get(t).push(e);
                                                }),
                                                Array.from(n, (e) => t(e[0], e[1]))
                                            );
                                        },
                                        containerRef: u,
                                        isToastActive: f,
                                    }
                                );
                            })(e),
                            { className: f, style: g, rtl: v, containerId: b } = e;
                        return (
                            (0, i.useEffect)(() => {
                                t && (t.current = u.current);
                            }, []),
                            i.createElement(
                                'div',
                                { ref: u, className: 'Toastify', id: b },
                                n((e, t) => {
                                    let n = t.length ? { ...g } : { ...g, pointerEvents: 'none' };
                                    return i.createElement(
                                        'div',
                                        {
                                            className: (function (e) {
                                                let t = a(
                                                    'Toastify__toast-container',
                                                    `Toastify__toast-container--${e}`,
                                                    { 'Toastify__toast-container--rtl': v }
                                                );
                                                return r(f)
                                                    ? f({ position: e, rtl: v, defaultClassName: t })
                                                    : a(t, c(f));
                                            })(e),
                                            style: n,
                                            key: `container-${e}`,
                                        },
                                        t.map((e, n) => {
                                            let { content: a, props: o } = e;
                                            return i.createElement(
                                                x,
                                                {
                                                    ...o,
                                                    isIn: m(o.toastId),
                                                    style: { ...o.style, '--nth': n + 1, '--len': t.length },
                                                    key: `toast-${o.key}`,
                                                },
                                                a
                                            );
                                        })
                                    );
                                })
                            )
                        );
                    }));
            (w.displayName = 'ToastContainer'),
                (w.defaultProps = {
                    position: 'top-right',
                    transition: S,
                    autoClose: 5e3,
                    closeButton: v,
                    pauseOnHover: !0,
                    pauseOnFocusLoss: !0,
                    closeOnClick: !0,
                    draggable: !0,
                    draggablePercent: 80,
                    draggableDirection: 'x',
                    role: 'alert',
                    theme: 'light',
                });
            let A,
                C = new Map(),
                _ = [],
                P = 1;
            function k(e, t) {
                return C.size > 0 ? p.emit(0, e, t) : _.push({ content: e, options: t }), t.toastId;
            }
            function M(e, t) {
                return {
                    ...t,
                    type: (t && t.type) || e,
                    toastId: t && (s(t.toastId) || o(t.toastId)) ? t.toastId : '' + P++,
                };
            }
            function E(e) {
                return (t, n) => k(t, M(e, n));
            }
            function T(e, t) {
                return k(e, M('default', t));
            }
            (T.loading = (e, t) =>
                k(
                    e,
                    M('default', {
                        isLoading: !0,
                        autoClose: !1,
                        closeOnClick: !1,
                        closeButton: !1,
                        draggable: !1,
                        ...t,
                    })
                )),
                (T.promise = function (e, t, n) {
                    let i,
                        { pending: a, error: o, success: c } = t;
                    a && (i = s(a) ? T.loading(a, n) : T.loading(a.render, { ...n, ...a }));
                    let l = {
                            isLoading: null,
                            autoClose: null,
                            closeOnClick: null,
                            closeButton: null,
                            draggable: null,
                        },
                        u = (e, t, a) => {
                            if (null == t) return void T.dismiss(i);
                            let o = { type: e, ...l, ...n, data: a },
                                r = s(t) ? { render: t } : t;
                            return i ? T.update(i, { ...o, ...r }) : T(r.render, { ...o, ...r }), a;
                        },
                        d = r(e) ? e() : e;
                    return d.then((e) => u('success', c, e)).catch((e) => u('error', o, e)), d;
                }),
                (T.success = E('success')),
                (T.info = E('info')),
                (T.error = E('error')),
                (T.warning = E('warning')),
                (T.warn = T.warning),
                (T.dark = (e, t) => k(e, M('default', { theme: 'dark', ...t }))),
                (T.dismiss = (e) => {
                    C.size > 0 ? p.emit(1, e) : (_ = _.filter((t) => null != e && t.options.toastId !== e));
                }),
                (T.clearWaitingQueue = function (e) {
                    return void 0 === e && (e = {}), p.emit(5, e);
                }),
                (T.isActive = (e) => {
                    let t = !1;
                    return (
                        C.forEach((n) => {
                            n.isToastActive && n.isToastActive(e) && (t = !0);
                        }),
                        t
                    );
                }),
                (T.update = function (e, t) {
                    void 0 === t && (t = {}),
                        setTimeout(() => {
                            let n = (function (e, t) {
                                let { containerId: n } = t,
                                    i = C.get(n || A);
                                return i && i.getToast(e);
                            })(e, t);
                            if (n) {
                                let { props: i, content: a } = n,
                                    o = { delay: 100, ...i, ...t, toastId: t.toastId || e, updateId: '' + P++ };
                                o.toastId !== e && (o.staleId = e);
                                let s = o.render || a;
                                delete o.render, k(s, o);
                            }
                        }, 0);
                }),
                (T.done = (e) => {
                    T.update(e, { progress: 1 });
                }),
                (T.onChange = (e) => (
                    p.on(4, e),
                    () => {
                        p.off(4, e);
                    }
                )),
                (T.POSITION = {
                    TOP_LEFT: 'top-left',
                    TOP_RIGHT: 'top-right',
                    TOP_CENTER: 'top-center',
                    BOTTOM_LEFT: 'bottom-left',
                    BOTTOM_RIGHT: 'bottom-right',
                    BOTTOM_CENTER: 'bottom-center',
                }),
                (T.TYPE = { INFO: 'info', SUCCESS: 'success', WARNING: 'warning', ERROR: 'error', DEFAULT: 'default' }),
                p
                    .on(2, (e) => {
                        (A = e.containerId || e),
                            C.set(A, e),
                            _.forEach((e) => {
                                p.emit(0, e.content, e.options);
                            }),
                            (_ = []);
                    })
                    .on(3, (e) => {
                        C.delete(e.containerId || e), 0 === C.size && p.off(0).off(1).off(5);
                    });
        },
        27918: function (e) {
            'use strict';
            e.exports = JSON.parse(
                '{"?":{"shortname":"?","name":"Global","code":0,"language":"English","currency":"USD"},"in":{"shortname":"IN","name":"India","code":91,"language":"English","currency":"INR"},"br":{"shortname":"BR","name":"Brazil","code":55,"language":"English","currency":"USD"},"br-pt":{"shortname":"BR-PT","name":"Brazil","code":55,"language":"Portuguese","currency":"USD"},"ph":{"shortname":"PH","name":"Philippines","code":63,"language":"English","currency":"GBP"},"sg":{"shortname":"SG","name":"Singapore","code":65,"language":"English","currency":"GBP"},"es":{"shortname":"ES","name":"Spain","code":34,"language":"English","currency":"GBP"},"ae":{"shortname":"AE","name":"United Arab Emirates","code":971,"language":"English","currency":"USD"},"gb":{"shortname":"GB","name":"United Kingdom","code":55,"language":"English","currency":"GBP"},"us":{"shortname":"US","name":"United States","code":55,"language":"English","currency":"USD"}}'
            );
        },
        73066: function (e) {
            'use strict';
            e.exports = JSON.parse(
                '[{"name":"Afghanistan","shortname":"AF","currency":"GBP"},{"name":"Albania","shortname":"AL","currency":"GBP"},{"name":"Algeria","shortname":"DZ","currency":"GBP"},{"name":"Andorra","shortname":"AD","currency":"GBP"},{"name":"Angola","shortname":"AO","currency":"GBP"},{"name":"Antigua and Barbuda","shortname":"AG","currency":"USD"},{"name":"Argentina","shortname":"AR","currency":"USD"},{"name":"Armenia","shortname":"AM","currency":"GBP"},{"name":"Aruba","shortname":"AW","currency":"USD"},{"name":"Australia","shortname":"AU","currency":"USD"},{"name":"Austria","shortname":"AT","currency":"GBP"},{"name":"Azerbaijan","shortname":"AZ","currency":"GBP"},{"name":"Bahamas","shortname":"BS","currency":"USD"},{"name":"Bahrain","shortname":"BH","currency":"GBP"},{"name":"Bangladesh","shortname":"BD","currency":"GBP"},{"name":"Barbados","shortname":"BB","currency":"USD"},{"name":"Belarus","shortname":"BY","currency":"GBP"},{"name":"Belgium","shortname":"BE","currency":"GBP"},{"name":"Belize","shortname":"BZ","currency":"USD"},{"name":"Benin","shortname":"BJ","currency":"GBP"},{"name":"Bermuda","shortname":"BM","currency":"USD"},{"name":"Bhutan","shortname":"BT","currency":"INR"},{"name":"Bolivia","shortname":"BO","currency":"GBP"},{"name":"Bosnia and Herzegovina","shortname":"BA","currency":"GBP"},{"name":"Botswana","shortname":"BW","currency":"GBP"},{"name":"Brazil","shortname":"BR","currency":"USD"},{"name":"Brunei","shortname":"BN","currency":"GBP"},{"name":"Bulgaria","shortname":"BG","currency":"GBP"},{"name":"Burkina Faso","shortname":"BF","currency":"GBP"},{"name":"Burundi","shortname":"BI","currency":"GBP"},{"name":"Cambodia","shortname":"KH","currency":"GBP"},{"name":"Cameroon","shortname":"CM","currency":"GBP"},{"name":"Canada","shortname":"CA","currency":"USD"},{"name":"Cape Verde","shortname":"CV","currency":"GBP"},{"name":"Cayman Islands","shortname":"KY","currency":"USD"},{"name":"Central African Republic","shortname":"CF","currency":"GBP"},{"name":"Chad Republic","shortname":"TD","currency":"GBP"},{"name":"Chile","shortname":"CL","currency":"GBP"},{"name":"China","shortname":"CN","currency":"GBP"},{"name":"Colombia","shortname":"CO","currency":"USD"},{"name":"Comoros","shortname":"KM","currency":"GBP"},{"name":"Congo","shortname":"CG","currency":"USD"},{"name":"Congo Democratic","shortname":"CG","currency":"GBP"},{"name":"Cook Islands","shortname":"CK","currency":"USD"},{"name":"Costa Rica","shortname":"CR","currency":"GBP"},{"name":"Cote divoire","shortname":"CI","currency":"USD"},{"name":"Croatia","shortname":"HR","currency":"GBP"},{"name":"Cuba","shortname":"CU","currency":"GBP"},{"name":"Cyprus","shortname":"CY","currency":"GBP"},{"name":"Czech Republic","shortname":"CZ","currency":"GBP"},{"name":"Denmark","shortname":"DK","currency":"GBP"},{"name":"Djibouti Republic","shortname":"DJ","currency":"USD"},{"name":"Dominican Republic","shortname":"DO","currency":"USD"},{"name":"Ecuador","shortname":"EC","currency":"USD"},{"name":"Egypt","shortname":"EG","currency":"GBP"},{"name":"El Salvador","shortname":"SV","currency":"USD"},{"name":"Equatorial Guinea","shortname":"GQ","currency":"GBP"},{"name":"Estonia","shortname":"EE","currency":"GBP"},{"name":"Ethiopia","shortname":"ET","currency":"GBP"},{"name":"Falkland Islands","shortname":"FK","currency":"GBP"},{"name":"Faroe Islands","shortname":"FO","currency":"GBP"},{"name":"Fiji","shortname":"FJ","currency":"USD"},{"name":"Finland","shortname":"FI","currency":"GBP"},{"name":"France","shortname":"FR","currency":"GBP"},{"name":"French Guiana","shortname":"GF","currency":"GBP"},{"name":"French Polynesia","shortname":"PF","currency":"USD"},{"name":"Gabon","shortname":"GA","currency":"GBP"},{"name":"Gambia","shortname":"GM","currency":"USD"},{"name":"Georgia","shortname":"GE","currency":"GBP"},{"name":"Germany","shortname":"DE","currency":"GBP"},{"name":"Ghana","shortname":"GH","currency":"GBP"},{"name":"Gibraltar","shortname":"GI","currency":"GBP"},{"name":"Greece","shortname":"GR","currency":"GBP"},{"name":"Greenland","shortname":"GL","currency":"GBP"},{"name":"Grenada","shortname":"GD","currency":"USD"},{"name":"Guadeloupe","shortname":"GP","currency":"GBP"},{"name":"Guam","shortname":"GU","currency":"USD"},{"name":"Guatemala","shortname":"GT","currency":"USD"},{"name":"Guernsey","shortname":"XU","currency":"GBP"},{"name":"Guinea","shortname":"GN","currency":"GBP"},{"name":"Guinea-Bissau","shortname":"GW","currency":"GBP"},{"name":"Guyana","shortname":"GY","currency":"USD"},{"name":"Haiti","shortname":"HT","currency":"USD"},{"name":"Honduras","shortname":"HN","currency":"USD"},{"name":"Hong Kong","shortname":"HK","currency":"GBP"},{"name":"Hungary","shortname":"HU","currency":"GBP"},{"name":"Iceland","shortname":"IS","currency":"GBP"},{"name":"India","shortname":"IN","currency":"INR"},{"name":"Indonesia","shortname":"ID","currency":"GBP"},{"name":"Iran","shortname":"IR","currency":"GBP"},{"name":"Iraq","shortname":"IQ","currency":"GBP"},{"name":"Ireland","shortname":"IE","currency":"GBP"},{"name":"Isle of Man","shortname":"IM","currency":"GBP"},{"name":"Israel","shortname":"IL","currency":"GBP"},{"name":"Italy","shortname":"IT","currency":"GBP"},{"name":"Jamaica","shortname":"JM","currency":"USD"},{"name":"Japan","shortname":"JP","currency":"GBP"},{"name":"Jersey","shortname":"JE","currency":"GBP"},{"name":"Jordan","shortname":"JO","currency":"USD"},{"name":"Kazakhstan","shortname":"KZ","currency":"GBP"},{"name":"Kenya","shortname":"KE","currency":"GBP"},{"name":"Kuwait","shortname":"KW","currency":"GBP"},{"name":"Kyrgyzstan","shortname":"KG","currency":"GBP"},{"name":"Latvia","shortname":"LV","currency":"GBP"},{"name":"Lebanon","shortname":"LB","currency":"USD"},{"name":"Lesotho","shortname":"LS","currency":"GBP"},{"name":"Liberia","shortname":"LR","currency":"GBP"},{"name":"Libya","shortname":"LY","currency":"USD"},{"name":"Liechtenstein","shortname":"LI","currency":"GBP"},{"name":"Lithuania","shortname":"LT","currency":"GBP"},{"name":"Luxembourg","shortname":"LU","currency":"GBP"},{"name":"Macau","shortname":"MO","currency":"GBP"},{"name":"Madagascar","shortname":"MG","currency":"GBP"},{"name":"Malawi","shortname":"MW","currency":"GBP"},{"name":"Malaysia","shortname":"MY","currency":"GBP"},{"name":"Maldives","shortname":"MV","currency":"GBP"},{"name":"Mali","shortname":"ML","currency":"GBP"},{"name":"Malta","shortname":"MT","currency":"GBP"},{"name":"Martinique","shortname":"MQ","currency":"GBP"},{"name":"Mauritania","shortname":"MR","currency":"GBP"},{"name":"Mauritius","shortname":"MU","currency":"GBP"},{"name":"Mexico","shortname":"MX","currency":"USD"},{"name":"Moldova","shortname":"MD","currency":"GBP"},{"name":"Monaco","shortname":"MC","currency":"GBP"},{"name":"Mongolia","shortname":"MN","currency":"GBP"},{"name":"Montenegro","shortname":"ME","currency":"GBP"},{"name":"Morocco","shortname":"MA","currency":"GBP"},{"name":"Mozambique","shortname":"MZ","currency":"GBP"},{"name":"Myanmar","shortname":"MM","currency":"GBP"},{"name":"Namibia","shortname":"NA","currency":"GBP"},{"name":"Nauru","shortname":"NR","currency":"USD"},{"name":"Nepal","shortname":"NP","currency":"INR"},{"name":"Netherlands","shortname":"NL","currency":"GBP"},{"name":"New Caledonia","shortname":"NC","currency":"USD"},{"name":"New Zealand","shortname":"NZ","currency":"USD"},{"name":"Nicaragua","shortname":"NI","currency":"USD"},{"name":"Niger","shortname":"NE","currency":"GBP"},{"name":"Nigeria","shortname":"NG","currency":"GBP"},{"name":"Norfolk Island","shortname":"NF","currency":"USD"},{"name":"North Macedonia","shortname":"MK","currency":"GBP"},{"name":"Norway","shortname":"NO","currency":"GBP"},{"name":"Oman","shortname":"OM","currency":"GBP"},{"name":"Pakistan","shortname":"PK","currency":"GBP"},{"name":"Palau","shortname":"PW","currency":"USD"},{"name":"Palestinian Territory","shortname":"PS","currency":"USD"},{"name":"Panama","shortname":"PA","currency":"USD"},{"name":"Papua New Guinea","shortname":"PG","currency":"USD"},{"name":"Paraguay","shortname":"PY","currency":"USD"},{"name":"Peru","shortname":"PE","currency":"USD"},{"name":"Philippines","shortname":"PH","currency":"USD"},{"name":"Poland","shortname":"PL","currency":"GBP"},{"name":"Portugal","shortname":"PT","currency":"GBP"},{"name":"Qatar","shortname":"QA","currency":"GBP"},{"name":"Reunion","shortname":"RE","currency":"USD"},{"name":"Romania","shortname":"RO","currency":"GBP"},{"name":"Russia","shortname":"RU","currency":"GBP"},{"name":"Rwanda","shortname":"RW","currency":"GBP"},{"name":"Saint Kitts and Nevis","shortname":"KN","currency":"USD"},{"name":"Saint Lucia","shortname":"LC","currency":"USD"},{"name":"Samoa","shortname":"WS","currency":"USD"},{"name":"Saudi Arabia","shortname":"SA","currency":"USD"},{"name":"Senegal","shortname":"SN","currency":"GBP"},{"name":"Serbia","shortname":"RS","currency":"GBP"},{"name":"Seychelles","shortname":"SC","currency":"GBP"},{"name":"Sierra Leone","shortname":"SL","currency":"GBP"},{"name":"Singapore","shortname":"SG","currency":"USD"},{"name":"Sint Maarten","shortname":"SX","currency":"GBP"},{"name":"Slovakia","shortname":"SK","currency":"GBP"},{"name":"Slovenia","shortname":"SI","currency":"GBP"},{"name":"Solomon Islands","shortname":"SB","currency":"USD"},{"name":"Somalia","shortname":"SO","currency":"GBP"},{"name":"South Africa","shortname":"ZA","currency":"GBP"},{"name":"South Korea","shortname":"KR","currency":"GBP"},{"name":"South Sudan","shortname":"SS","currency":"GBP"},{"name":"Spain","shortname":"ES","currency":"USD"},{"name":"Sri Lanka","shortname":"LK","currency":"GBP"},{"name":"Sudan","shortname":"SD","currency":"GBP"},{"name":"Suriname","shortname":"SR","currency":"USD"},{"name":"Sweden","shortname":"SE","currency":"GBP"},{"name":"Switzerland","shortname":"CH","currency":"GBP"},{"name":"Syria","shortname":"SY","currency":"GBP"},{"name":"Taiwan","shortname":"TW","currency":"USD"},{"name":"Tajikistan","shortname":"TJ","currency":"GBP"},{"name":"Tanzania","shortname":"TZ","currency":"GBP"},{"name":"Thailand","shortname":"TH","currency":"GBP"},{"name":"Timor-Leste","shortname":"TL","currency":"GBP"},{"name":"Togo","shortname":"TG","currency":"GBP"},{"name":"Tonga","shortname":"TO","currency":"USD"},{"name":"Trinidad and Tobago","shortname":"TT","currency":"USD"},{"name":"Tunisia","shortname":"TN","currency":"GBP"},{"name":"Turkey","shortname":"TR","currency":"USD"},{"name":"Turkmenistan","shortname":"TM","currency":"GBP"},{"name":"Uganda","shortname":"UG","currency":"GBP"},{"name":"Ukraine","shortname":"UA","currency":"GBP"},{"name":"United Arab Emirates","shortname":"AE","currency":"USD"},{"name":"United Kingdom","shortname":"GB","currency":"GBP"},{"name":"United States","shortname":"US","currency":"USD"},{"name":"Uruguay","shortname":"UY","currency":"USD"},{"name":"Uzbekistan","shortname":"UZ","currency":"GBP"},{"name":"Vanuatu","shortname":"VU","currency":"GBP"},{"name":"Venezuela","shortname":"VE","currency":"GBP"},{"name":"Vietnam","shortname":"VN","currency":"GBP"},{"name":"Yemen","shortname":"YE","currency":"USD"},{"name":"Zambia","shortname":"ZM","currency":"GBP"},{"name":"Zimbabwe","shortname":"ZW","currency":"GBP"}]'
            );
        },
        72588: function (e) {
            'use strict';
            e.exports = JSON.parse(
                '{"pages":{"index":{"tagline":"PLATAFORMA DE SOLU\xc7\xd5ES PARA CLIENTES","heading":"Plataforma de Comunica\xe7\xe3o em Nuvem","subheading":"APIs seguras e robustas para SMS, Email, Voice, Autentica\xe7\xe3o e mais","btn":"Come\xe7ar","img":"./assets/img/pages/brpt/index/banner.webp","products":{"learnmore":"Saiba mais","content":[{"slug":"hello","name":"Hello","tagline":"Centro de contato","description":"Empodere seus funcion\xe1rios, apoie seus clientes."},{"slug":"campaign","name":"Campaign","tagline":"Automa\xe7\xe3o baseada em eventos","description":"Aumente o engajamento do p\xfablico atrav\xe9s de uma plataforma inteligente."},{"slug":"segmento","name":"Segmento","tagline":"Plataforma de dados de clientes","description":"Segmenta\xe7\xe3o de clientes por suas a\xe7\xf5es ou eventos."},{"slug":"otp","name":"OTP","tagline":"VERIFICA\xc7\xc3O SEGURA INSTANT\xc2NEA","description":"Verifica\xe7\xe3o de OTP multicanal r\xe1pida e confi\xe1vel"}]},"channels":{"heading":"Canais de Comunica\xe7\xe3o","subheading":"Capacite conversas com a melhor API de comunica\xe7\xe3o da categoria APIs completas para desenvolvedores e empresas se conectarem e envolverem seus clientes globalmente","learnmore":"Saiba mais","content":[{"slug":"sms","name":"SMS","description":"Transforme sua comunica\xe7\xe3o global com os servi\xe7os e APIs de SMS confi\xe1veis da MSG91. Envolva, analise e conecte-se sem esfor\xe7o em escala global"},{"slug":"email","name":"Email","description":"Melhore o alcance de emails com templates, AMP, estat\xedsticas, SMTP/API e valida\xe7\xe3o para um engajamento eficaz do cliente"},{"slug":"whatsapp","name":"WhatsApp","description":"Melhore a intera\xe7\xe3o no WhatsApp com suporte Base64, comunica\xe7\xe3o bidirecional, gerenciamento de templates, an\xe1lises e registros de mensagens"},{"slug":"voice","name":"Voice","description":"Aumente o engajamento do cliente com chamadas em tempo real, monitoramento de chamadas, chamadas pelo navegador, IVR avan\xe7ado, mensagens de voz em massa e conex\xf5es de agente em tempo real"},{"slug":"numbers","name":"Numbers","description":"Desbloqueie mercados globais com n\xfameros virtuais econ\xf4micos. Aumente o engajamento com servi\xe7os de chamadas perdidas, mensagens de palavras-chave, pesquisas e respostas autom\xe1ticas"}]},"stats":[{"stats":"2,5 Bilh\xf5es+","name":"Chamadas de API","each":"por m\xeas"},{"stats":"1,6 Bilh\xf5es+","name":"Chamadas de SMS","each":"por m\xeas"},{"stats":"1 Bilh\xe3o+","name":"Chamadas de OTP","each":"por m\xeas"},{"stats":"1 Bilh\xe3o+","name":"Emails enviados","each":"por m\xeas"}],"services":{"heading":"Mais servi\xe7os","learnmore":"Saiba mais","content":[{"slug":"shorturl","name":"Encurtador de URL","heading":"Fa\xe7a seus URLs longos ficarem curtos","description":"Encurta automaticamente URLs e rastreia seu sucesso, um clique de cada vez. Transforme seus links longos e bagun\xe7ados em links curtos e memor\xe1veis com sua marca"},{"slug":"knowledgebase","name":"Aplicativo de Base de Conhecimento","heading":"Gerencie seus documentos e artigos de ajuda","description":"N\xe3o deixe seus clientes esperando por solu\xe7\xf5es simples. D\xea a eles acesso instant\xe2neo \xe0 biblioteca de autoatendimento."},{"slug":"filehosting","link":"https://msg91.com/help/all-you-need-to-know-about-files-option-of-msg91","name":"Hospedagem de Arquivos","heading":"Armazenamento de arquivos simples e seguro","description":"Um hub central para armazenamento, compartilhamento e sincroniza\xe7\xe3o de arquivos online. Armazene todos os seus arquivos com seguran\xe7a usando um armazenamento em nuvem poderoso, confi\xe1vel e f\xe1cil de usar."}]},"customerstories":{"heading":"Hist\xf3rias de Sucesso de Clientes impulsionadas pela MSG91","learnmore":"Saiba mais","content":[{"slug":"milkbasket","description":"Milkbasket envia atualiza\xe7\xf5es regulares para seus clientes oferecendo suporte proativo e recomenda\xe7\xf5es","link":"/case-studies/milkbasket"},{"slug":"unacademy","description":"A Unacademy mant\xe9m seu p\xfablico engajado e nutrido com campanhas personalizadas usando omnicanal","link":"/case-studies/unacademy"},{"slug":"ixigo","description":"A Ixigo engaja e atualiza seu p\xfablico atrav\xe9s de comunica\xe7\xe3o multicanal por mensagens, email e WhatsApp","link":"/case-studies/ixigo"}]},"faq":{"heading":"Perguntas Frequentes","content":[{"que":"Como o MSG91 pode beneficiar o meu neg\xf3cio?","des":"O MSG91 oferece in\xfameros benef\xedcios para os neg\xf3cios, incluindo maior engajamento do cliente, fluxos de comunica\xe7\xe3o simplificados, aumento da efici\xeancia operacional e melhoria da reputa\xe7\xe3o da marca. Nossa plataforma permite que as empresas automatizem a comunica\xe7\xe3o, personalizem intera\xe7\xf5es e alcancem seu p\xfablico-alvo atrav\xe9s dos canais de sua prefer\xeancia."},{"que":"O que torna o MSG91 diferente de outras plataformas de comunica\xe7\xe3o?","des":"O MSG91 se destaca devido \xe0 sua confiabilidade, escalabilidade e versatilidade. Somos especializados em fornecer plataformas de comunica\xe7\xe3o em nuvem m\xf3vel na \xcdndia, atendendo \xe0s necessidades \xfanicas das empresas neste mercado. Nossa plataforma oferece recursos avan\xe7ados, solu\xe7\xf5es personaliz\xe1veis e suporte ao cliente excepcional para ajudar as empresas a alcan\xe7arem seus objetivos de comunica\xe7\xe3o."},{"que":"O MSG91 \xe9 adequado para empresas de todos os tamanhos?","des":"Sim, o MSG91 atende empresas de todos os tamanhos. Seja voc\xea uma startup, pequena empresa ou grande empresa, nossa plataforma pode ser adaptada para atender \xe0s suas necessidades espec\xedficas. Oferecemos solu\xe7\xf5es escal\xe1veis que podem acomodar as necessidades de comunica\xe7\xe3o das empresas \xe0 medida que elas crescem e se expandem."},{"que":"O MSG91 \xe9 seguro?","des":"A seguran\xe7a \xe9 uma prioridade no MSG91. Implementamos protocolos e t\xe9cnicas de criptografia padr\xe3o da ind\xfastria para garantir a confidencialidade e integridade dos seus dados. Nossa plataforma de comunica\xe7\xf5es em nuvem para empresas oferece recursos como autentica\xe7\xe3o de dois fatores e verifica\xe7\xe3o de OTP para aumentar a seguran\xe7a e proteger informa\xe7\xf5es sens\xedveis."},{"que":"Posso integrar o MSG91 com meus sistemas ou aplicativos existentes?","des":"Absolutamente! O MSG91 fornece APIs e documenta\xe7\xe3o amig\xe1veis para desenvolvedores, tornando f\xe1cil integrar nossa plataforma com seus sistemas ou aplicativos existentes. Nossas APIs permitem incorporar nossas funcionalidades de comunica\xe7\xe3o sem problemas, permitindo que voc\xea automatize a comunica\xe7\xe3o e simplifique seus fluxos de trabalho."}]}},"hello":{"product":"hello","heroData":{"tagline":"REVOLUCIONE O SUPORTE AO CLIENTE","heading":"Software de Atendimento ao Cliente","sub":"Nunca perca de vista o que \xe9 importante. N\xe3o resolva apenas tickets, construa relacionamentos com clientes","btntext":"Iniciar"},"trustedData":{"headings":"Suporte a mais de 15 canais e plataformas","trustedImgs":["facebook","gmail","googlechat","instagram","outlook","sms","telegram","twitter","voice","whatsapp","zoho"],"moreText":"e mais ..."},"features":[{"slug":"unlimited-agents","name":"Agentes Ilimitados","des":"Agentes gratuitos ilimitados para impulsionar seu suporte ao cliente. Mais agentes significam engajamento cont\xednuo, mais tickets resolvidos e melhor suporte ao cliente em oferta. N\xe3o h\xe1 n\xfamero limite para a quantidade de agentes de suporte ao cliente."},{"slug":"chatbot","name":"Chatbot","des":"Resolva consultas de clientes 24 horas por dia, em texto e voz. Deixe o chatbot lidar com consultas simples e repetitivas que n\xe3o exigem as habilidades e experi\xeancia de seus agentes e, quando necess\xe1rio, inclua agentes ao vivo de forma transparente."},{"slug":"screen-control","name":"Controle de Tela","des":"Controle a tela do seu cliente de onde voc\xea estiver. Trabalhe na tela remota como se voc\xea realmente estivesse l\xe1. Uma vez que voc\xea obtenha acesso, tenha controle total da tela, mouse e teclado do seu cliente para resolver rapidamente os problemas."},{"slug":"video-call---screen-sharing","name":"Chamada de V\xeddeo / Compartilhamento de Tela","des":"Chamadas de v\xeddeo de alta qualidade onde quer que seu cliente esteja. Fa\xe7a uma chamada de v\xeddeo com seu cliente para navegar juntos na tela do cliente. Assuma o controle da reuni\xe3o enquanto seu cliente compartilha a tela para mostrar informa\xe7\xf5es ou levantar um problema."},{"slug":"workflow","name":"Fluxo de Trabalho","des":"Atribua automaticamente conversas a uma equipe ou agente dedicado. Comece com nosso Fluxo de Trabalho existente ou configure seu Fluxo de Trabalho personalizado com base nas necessidades de suporte do seu neg\xf3cio."},{"slug":"analytics","name":"An\xe1lises","des":"An\xe1lises e relat\xf3rios para monitorar o desempenho de seus agentes. Obtenha insights profundos e acion\xe1veis para oferecer suporte excepcional e alcan\xe7ar seus objetivos. Os relat\xf3rios de an\xe1lise f\xe1ceis de analisar ajudar\xe3o seus agentes a aumentar seu suporte ao cliente."}],"faq":[{"que":"Como assinar o seu Plano Hello.","des":"No painel Hello, clique na aba de assinatura, que est\xe1 dispon\xedvel no canto esquerdo. Isso abrir\xe1 a p\xe1gina do plano atual e tamb\xe9m a op\xe7\xe3o de adquirir um novo plano. Clique nisso e voc\xea poder\xe1 selecionar entre op\xe7\xf5es mensais e anuais. <br/>Voc\xea pode assinar o plano diretamente do site. L\xe1 v\xe1 para o Servi\xe7o Hello, clique em Come\xe7ar, preencha os detalhes necess\xe1rios e assine o plano."},{"que":"Existem cobran\xe7as pelo chatbot de IA?","des":"N\xe3o, n\xe3o h\xe1 cobran\xe7as pelo Chat Bot, somos cobrados apenas pelos planos b\xe1sico e premium. Voc\xea pode usar o chatbot em um plano gratuito at\xe9 50 tickets no Hello, depois disso, voc\xea precisa atualizar seu plano Hello. Basicamente, estamos fornecendo o chatbot gratuitamente para fins de teste. <br/> Voc\xea pode usar este Chat Bot no WhatsApp, Instagram, Widget de Chat no seu site, Facebook e assim por diante. Ent\xe3o teste o Chat Bot agora."},{"que":"Existem cobran\xe7as extras para a Caixa de Entrada do Instagram/Facebook?","des":"<p>Voc\xea pode usar caixas de entrada que est\xe3o dispon\xedveis no seu Plano Hello para Instagram ou Whatsapp. O n\xfamero de caixas de entrada atribu\xeddas em cada plano.</p> <ul> <li><strong>Plano Gratuito-</strong> 2 caixas de entrada</li> <li><strong>Plano B\xe1sico-</strong> 2 caixas de entrada</li> <li><strong>Plano Premium-</strong> 3 caixas de entrada</li> </ul> <p>Mas, caso voc\xea j\xe1 tenha usado as caixas de entrada atribu\xeddas, voc\xea sempre pode comprar uma nova caixa de entrada nos planos b\xe1sico e premium por 500 r\xfapias cada.</p> <p>No caso de um plano gratuito, voc\xea n\xe3o poder\xe1 comprar novas caixas de entrada. Voc\xea tem que atualizar o plano se quiser a caixa de entrada extra.</p>"},{"que":"Quais s\xe3o as cobran\xe7as por tickets e tickets extras no Hello?","des":"<p>Estamos fornecendo tickets mensais com cada plano e, caso eles terminem, voc\xea tamb\xe9m pode usar tickets extras que voc\xea paga na cobran\xe7a p\xf3s-paga. Aqui est\xe3o o n\xfamero de tickets atribu\xeddos em cada plano:</p> <ul> <li><strong>Plano Gratuito-</strong> 150 tickets/mensal</li> <li><strong>Plano B\xe1sico-</strong> 1000 tickets/mensal</li> <li><strong>Plano Premium-</strong> 2000 tickets/mensal</li> </ul> <p>Cobran\xe7as Extras por cada ticket em diferentes planos:</p> <ul> <li><strong>Plano Gratuito-</strong> N\xe3o h\xe1 op\xe7\xe3o para mais tickets em planos gratuitos, pois voc\xea tem que atualizar o Plano Hello para B\xe1sico ou Premium conforme sua escolha.</li> <li><strong>Plano B\xe1sico-</strong> ₹0,50 por ticket</li> <li><strong>Plano Premium-</strong> ₹0,75 por ticket</li> </ul>"},{"que":"Posso personalizar o Plano Hello?","des":"Sim, voc\xea pode ter um plano personalizado para o hello. Clique no link para <a href=\'/contact-us\' target=\'_blank\'>agendar a reuni\xe3o</a> com os chefes de vendas."}]},"campaign":{"name":"Campaign","slug":"campaign","tagline":"Automa\xe7\xe3o Baseada em Eventos","heading":"Conecte conversas atrav\xe9s de canais e ferramentas.","subheading":"Ofere\xe7a experi\xeancias personalizadas, envolventes e cont\xednuas.","btntext":"Comece gratuitamente","icon":"/assets/img/pages/brpt/banner-campaign.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/campaign/campaign-multi-channel-support.svg","heading":"Suporte Multicanal","subheading":"Apoie seus clientes no canal de sua prefer\xeancia.","content":"Proporcione uma melhor experi\xeancia de suporte aos seus clientes atrav\xe9s de seu canal preferido - SMS, Email, Voz, Notifica\xe7\xe3o Push, WhatsApp e mais. Encontre seus clientes onde eles est\xe3o."},{"img":"/assets/img/pages/brpt/campaign/campaign-draggable-flow.svg","heading":"Fluxo Arrast\xe1vel","subheading":"Arraste e solte para criar um fluxo omnichannel com cen\xe1rios \'se-ent\xe3o\'.","content":"Escolha quando voc\xea precisa iniciar uma conversa por SMS, email ou mensagem em um \xfanico fluxo de trabalho. Crie um fluxo que seja t\xe3o simples ou complexo quanto as necessidades do seu neg\xf3cio."},{"img":"/assets/img/pages/brpt/campaign/campaign-time-based-condition.svg","heading":"Condi\xe7\xe3o Baseada em Tempo","subheading":"Envie mensagens autom\xe1ticas perfeitamente cronometradas.","content":"Crie um cronograma de envio cuidadoso com condi\xe7\xf5es baseadas em tempo que controlam o fuso hor\xe1rio de quando suas campanhas s\xe3o entregues. Apoie seus clientes no momento certo."},{"img":"/assets/img/pages/brpt/campaign/campaign-api-based-conditions.svg","heading":"Condi\xe7\xf5es Baseadas em API","subheading":"Obtenha informa\xe7\xf5es instantaneamente para intera\xe7\xf5es em tempo real.","content":"Solicite dados mesmo no meio de um fluxo, enviando dados para um sistema de terceiros ou solicitando dados necess\xe1rios para seus passos de comunica\xe7\xe3o. Entregue informa\xe7\xf5es em tempo real para seus clientes."},{"img":"/assets/img/pages/brpt/campaign/campaign-country-based-condition.svg","heading":"Condi\xe7\xe3o Baseada em Pa\xeds","subheading":"Apoie seus clientes em todo o mundo.","content":"Crie experi\xeancias personalizadas e memor\xe1veis para seus clientes em v\xe1rios pa\xedses, idiomas, conte\xfados, canais, fluxos e mais. Conecte, personalize e comunique-se facilmente."}]}},"segmento":{"name":"Segmento","slug":"segmento","tagline":"Marketing baseado em alvos","heading":"Personalize as jornadas dos clientes com segmenta\xe7\xe3o de dados.","subheading":"Segmente pessoas com base em seus dados demogr\xe1ficos, comportamento, interesses e outras caracter\xedsticas.","btntext":"Comece gratuitamente","icon":"/img/icon/segmento.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/segmento/segmento-create-filters-as-per-segments.svg","heading":"Crie filtros por segmento","subheading":"Crie uma lista filtrada no seu cat\xe1logo de endere\xe7os comercial.","content":"Adapte seus esfor\xe7os de marketing segmentando pessoas com base em seus requisitos, tra\xe7os ou padr\xf5es criando um filtro espec\xedfico no seu cat\xe1logo de endere\xe7os."},{"img":"/assets/img/pages/brpt/segmento/segmento-automation-trigger.svg","heading":"Gatilho de automa\xe7\xe3o","subheading":"Acione informa\xe7\xf5es relevantes para os segmentos filtrados.","content":"Automatize a\xe7\xf5es nos filtros criados com base na a\xe7\xe3o ou entrada do usu\xe1rio para entregar mensagens relevantes e personalizadas para cada grupo."},{"img":"/assets/img/pages/brpt/segmento/segmento-automation-repeater.svg","heading":"Repetidor de automa\xe7\xe3o","subheading":"Envie o conte\xfado mais relevante no momento mais relevante.","content":"Envie mensagens autom\xe1ticas para o mesmo filtro em intervalos baseados em tempo atrav\xe9s do canal de comunica\xe7\xe3o comercial preferido do seu p\xfablico."},{"img":"/assets/img/pages/brpt/segmento/segmento-open-api.svg","heading":"API aberta","subheading":"Use API para obter, criar, atualizar ou excluir contatos.","content":"Fornecemos APIs para todas as a\xe7\xf5es, grandes ou pequenas, para que voc\xea possa se concentrar no que mais importa - construir seu produto incr\xedvel."}],"morefeatures":[{"more":"Forne\xe7a suporte ao cliente via compartilhamento de tela com um \xfanico clique"},{"more":"Resolu\xe7\xe3o de problemas por v\xeddeo em segundos"},{"more":"Grave o desempenho do agente para controle de qualidade"},{"more":"Entenda as emo\xe7\xf5es de seus clientes por meio da an\xe1lise de sentimentos"},{"more":"Solu\xe7\xe3o para acesso remoto e suporte"},{"more":"Acompanhe o desempenho do segmento"}]}},"otp":{"name":"OTP","slug":"otp","tagline":"Verifica\xe7\xe3o instant\xe2nea e segura","heading":"A forma mais simples, r\xe1pida e eficaz de verificar seus usu\xe1rios","subheading":"Construa confian\xe7a com o cliente e proteja o seu neg\xf3cio com autentica\xe7\xe3o de dois fatores.","btntext":"Comece gratuitamente","icon":"/img/icon/otp.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/otp/otp-simple-login.svg","heading":"T\xe3o simples quanto Login com Google","subheading":"Login com OTP \xe9 t\xe3o simples quanto login com Gmail","content":"D\xea aos seus usu\xe1rios uma experi\xeancia de autentica\xe7\xe3o r\xe1pida, n\xe3o disruptiva e simples. Implemente login com OTP inserindo seu n\xfamero de celular ou endere\xe7o de e-mail para receber OTP via SMS ou e-mail."},{"img":"/assets/img/pages/brpt/otp/otp-inbuilt-ip-security.svg","heading":"Seguran\xe7a IP Integrada","subheading":"Prote\xe7\xe3o contra fraudes, hacks, valida\xe7\xe3o, bloqueio","content":"Minimize fraudes com uma camada extra de seguran\xe7a. A seguran\xe7a integrada garante que, quando um login \xe9 arriscado, o fluxo n\xe3o permite que o ator mal-intencionado fa\xe7a login, visualizando-o como potencialmente fraudulento."},{"img":"/assets/img/pages/brpt/otp/otp-support-multiple-channels.svg","heading":"Suporte a m\xfaltiplos canais","subheading":"Construa confian\xe7a com o cliente e aumente a convers\xe3o em v\xe1rios canais","content":"Autentique seus usu\xe1rios nos canais que eles preferem. Suportamos v\xe1rios canais, incluindo SMS, e-mail, voz, WhatsApp, dando \xe0s empresas e usu\xe1rios a flexibilidade de que precisam para autenticar."}],"morefeatures":[{"more":"Forne\xe7a suporte ao cliente via compartilhamento de tela com um \xfanico clique"},{"more":"Resolu\xe7\xe3o de problemas por v\xeddeo em segundos"},{"more":"Grave o desempenho do agente para controle de qualidade"},{"more":"Entenda as emo\xe7\xf5es dos seus clientes por meio da an\xe1lise de sentimentos"},{"more":"Solu\xe7\xe3o para acesso remoto e suporte"},{"more":"Acompanhe o desempenho do OTP"}]}},"shorturl":{"name":"ShortUrl","slug":"shorturl","tagline":"Simplifique seus links","heading":"Personalize, compartilhe e acompanhe links inteligentes","subheading":"Otimize seus links complexos para criar links curtos e mais limpos que s\xe3o mais f\xe1ceis de compartilhar.","btntext":"Comece gratuitamente","icon":"/img/icon/shorturl.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/shorturl/shorturl-no-code.svg","heading":"Sem C\xf3digo","subheading":"Sem c\xf3digo e menos cr\xe9ditos tornam-no um link inteligente.","content":"Encurte seu URL em tempo real sem inserir qualquer c\xf3digo. Basta colar seu link e voc\xea ter\xe1 um link inteligente que \xe9 f\xe1cil de compartilhar, economiza espa\xe7o e consome menos cr\xe9ditos."},{"img":"/assets/img/pages/brpt/shorturl/shorturl-number-wise-tracking.svg","heading":"Rastreamento Num\xe9rico","subheading":"Re\xfana estat\xedsticas monitorando o n\xfamero de acessos do seu URL.","content":"Acompanhe o desempenho do seu shortURL e o n\xfamero de acessos para cada destinat\xe1rio. Saiba quantas vezes o link foi clicado, onde foi compartilhado e como est\xe1 direcionando o tr\xe1fego."}],"morefeatures":[{"more":"Forne\xe7a suporte ao cliente via compartilhamento de tela com um \xfanico clique"},{"more":"Resolu\xe7\xe3o de problemas por v\xeddeo em segundos"},{"more":"Grave o desempenho do agente para controle de qualidade"},{"more":"Entenda as emo\xe7\xf5es dos seus clientes por meio da an\xe1lise de sentimentos"},{"more":"Solu\xe7\xe3o para acesso remoto e suporte"},{"more":"Acompanhe o desempenho do shortURL"}]}},"knowledgebase":{"name":"KnowledgeBase","slug":"knowledgebase","tagline":"Capacite os Clientes com Op\xe7\xf5es de Autoatendimento","heading":"A base de conhecimento \xe9 a espinha dorsal de um bom suporte ao cliente","subheading":"Obtenha todos os recursos essenciais do software de base de conhecimento a um pre\xe7o nominal","btntext":"Comece gratuitamente","icon":"/img/icon/knowledgebase.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/knowledgebase/knowledgebase-wysiwyg-editor.svg","heading":"Editor WYSIWYG","subheading":"Crie ou edite facilmente seus artigos da base de conhecimento","content":"Crie rapidamente seus artigos com o editor de conte\xfado \'o que voc\xea v\xea \xe9 o que voc\xea obt\xe9m\'. \xc9 t\xe3o simples de usar quanto um processador de texto ou editor HTML."},{"img":"/assets/img/pages/brpt/knowledgebase/knowledgebase-seo-friendly.svg","heading":"Amig\xe1vel para SEO (Suporta subpasta e subdom\xednio)","subheading":"Uma base de conhecimento otimizada e amig\xe1vel para SEO","content":"Sua base de conhecimento \xe9 executada em seu pr\xf3prio dom\xednio e n\xe3o em um subdom\xednio, para que os algoritmos a tratem como seu site, dando a ela a mesma import\xe2ncia que suas outras p\xe1ginas da web."},{"img":"/assets/img/pages/brpt/knowledgebase/knowledgebase-whitelable.svg","heading":"Whitelabel","subheading":"Funciona com sua marca e n\xe3o com a nossa","content":"Seus usu\xe1rios visualizam sua base de conhecimento com sua marca em seu site. Nossos servi\xe7os de whitelabel garantem que n\xe3o haja indica\xe7\xe3o de que \xe9 alimentado pela MSG91."}],"morefeatures":[{"more":"Forne\xe7a suporte ao cliente via compartilhamento de tela com um \xfanico clique"},{"more":"Resolu\xe7\xe3o de problemas por v\xeddeo em segundos"},{"more":"Grave o desempenho do agente para controle de qualidade"},{"more":"Entenda as emo\xe7\xf5es dos seus clientes por meio da an\xe1lise de sentimentos"},{"more":"Solu\xe7\xe3o para acesso remoto e suporte"},{"more":"Acompanhe o desempenho da base de conhecimento"}]}},"sms":{"name":"SMS","slug":"sms","code":true,"tagline":"Mensagens de pr\xf3ximo n\xedvel","heading":"Engaje seus clientes globalmente com mensagens r\xe1pidas, escal\xe1veis e personaliz\xe1veis","subheading":"Integre nossas APIs amig\xe1veis para desenvolvedores para enviar e receber mensagens de texto. Nossa rede distribu\xedda de operadoras e roteamento inteligente garantem a maior entrega e menor lat\xeancia.","btntext":"Comece gratuitamente","icon":"/img/icon/sms.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/sms/sms-intelligent-sms-routing.svg","heading":"Algoritmo Inteligente de Retentativa de SMS","subheading":"","content":"Nosso servi\xe7o de API de SMS encontra a rota de telecom mais confi\xe1vel e r\xe1pida para cada mensagem que voc\xea envia. Caso o SMS falhe, nosso algoritmo tenta novamente em uma fra\xe7\xe3o de segundo e entrega suas mensagens usando outra rota de telecom."},{"img":"/assets/img/pages/brpt/sms/sms-a-reliable-scalable-and-feature-rich-sms-api.svg","heading":"API de SMS Confi\xe1vel, Escal\xe1vel e Rica em Recursos","subheading":"","content":"Dispon\xedvel em todas as linguagens de programa\xe7\xe3o, a integra\xe7\xe3o com nossa API de SMS para desenvolvedores \xe9 r\xe1pida, f\xe1cil e perfeita. Desenvolvida por desenvolvedores para desenvolvedores, explore guias de in\xedcio r\xe1pido, trechos de c\xf3digo, SDKs e mais."},{"img":"/assets/img/pages/brpt/sms/sms-enjoy-reliable-low-latency-delivery-worldwide.svg","heading":"Desfrute de Entrega com Baixa Lat\xeancia - Mundial","subheading":"","content":"Alcance mais de 210 pa\xedses de forma confi\xe1vel com operadoras de telecom locais. O redirecionamento autom\xe1tico do tr\xe1fego global em tempo real nos ajuda a evitar falhas e lat\xeancia."},{"img":"/assets/img/pages/brpt/sms/sms-multi-lingual-support.svg","heading":"Suporte Multil\xedngue","subheading":"","content":"Converse com seu p\xfablico em seu idioma local e leve o engajamento com o cliente para o pr\xf3ximo n\xedvel. Construa a confian\xe7a do cliente ao enviar mensagens em seu idioma regional em qualquer lugar do mundo."},{"img":"/assets/img/pages/brpt/sms/sms-personalized-sms.svg","heading":"SMS Personalizado","subheading":"Aumente a satisfa\xe7\xe3o do cliente com um engajamento significativo.","content":"N\xe3o apenas interaja com os clientes, crie experi\xeancias personalizadas adicionando caracter\xedsticas \xe0s suas mensagens. Aproveite o poder da personaliza\xe7\xe3o para aumentar seu ROI."},{"img":"/assets/img/pages/brpt/sms/sms-link-shortener.svg","heading":"Encurtador de Links","subheading":"Transforme uma URL longa em um link mais curto e leg\xedvel.","content":"Habilite o encurtador de links profundamente integrado para converter URLs longas em links mais curtos. Obtenha um relat\xf3rio detalhado de usu\xe1rios sobre cliques com n\xfameros de celular, navegador e IP."},{"img":"/assets/img/pages/brpt/sms/sms-enhanced-analytics.svg","heading":"An\xe1lise Aprimorada","subheading":"Visualiza\xe7\xe3o gr\xe1fica em tempo real para monitoramento e solu\xe7\xe3o de problemas.","content":"Otimize a entrega de seus SMS, me\xe7a a efic\xe1cia de suas campanhas e melhore o ROI. Esteja sempre a par de quais mensagens os clientes receberam e quais foram perdidas."}],"morefeatures":[{"more":"Forne\xe7a suporte ao cliente via compartilhamento de tela com um \xfanico clique"},{"more":"Resolu\xe7\xe3o de problemas por v\xeddeo em segundos"},{"more":"Grave o desempenho do agente para controle de qualidade"},{"more":"Entenda as emo\xe7\xf5es dos seus clientes por meio da an\xe1lise de sentimentos"},{"more":"Solu\xe7\xe3o para acesso remoto e suporte"},{"more":"Acompanhe o desempenho do SMS"}]}},"rcs":{"name":"RCS","slug":"rcs","code":true,"tagline":"Servi\xe7os de Comunica\xe7\xe3o Enriquecida","heading":"Engaje os clientes na caixa de entrada SMS, entregando mensagens ricas e interativas usando RCS","subheading":"RCS \xe9 um canal de mensagens integrado que permite \xe0s empresas engajar os clientes por meio de conversas ricas, imersivas e bidirecionais","btntext":"Comece gratuitamente","icon":"/img/icon/rcs.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/img/feature/rcs-communications-branding.svg","heading":"Comunica\xe7\xf5es Corporativas com Branding","subheading":"Destaque-se pela marca","content":"Aumente a visibilidade da sua marca na caixa de entrada SMS usando um ID de remetente distinto e logotipo. Utilize uma interface visualmente atraente para engajar efetivamente os clientes."},{"img":"/img/feature/rcs-multimedia-interactions.svg","heading":"Forne\xe7a Intera\xe7\xf5es Multim\xeddia","subheading":"Comunica\xe7\xe3o por meio de representa\xe7\xe3o visual","content":"Aprimore a comunica\xe7\xe3o da sua marca entregando RCS que constr\xf3i confian\xe7a. Incorpore seu logotipo, nome da marca, v\xeddeos, imagens e carross\xe9is em suas mensagens para aumentar as convers\xf5es."},{"img":"/img/feature/rcs-boost-sales.svg","heading":"Aumente as Vendas por Meio de Conversas Interativas","subheading":"","content":"Crie uma experi\xeancia de conversa envolvente com imagens, v\xeddeos, carross\xe9is e bot\xf5es de a\xe7\xe3o interativos. Destaque-se dos concorrentes enviando mensagens RCS envolventes e confi\xe1veis que impulsionam convers\xf5es."},{"img":"/img/feature/rcs-customer-trust.svg","heading":"Confian\xe7a Aprimorada do Cliente","subheading":"Entenda os h\xe1bitos dos seus clientes","content":"Personalize sua comunica\xe7\xe3o e construa relacionamentos duradouros que promovam a lealdade. Utilize IDs de remetente verificados e badged pela Google para taxas de resposta mais altas e maior confian\xe7a e credibilidade."}]},"morefeatures":[{"more":"0"}]},"email":{"name":"Email","slug":"email","code":true,"tagline":"estrat\xe9gia de email mais inteligente","heading":"Emails inteligentes que chegam diretamente na caixa de entrada certa","subheading":"Aproveite ao m\xe1ximo esses pontos de contato poderosos entre sua marca e seus clientes.","btntext":"Comece gratuitamente","icon":"/img/icon/email.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/email/email-template-builder.svg","heading":"Construtor de Modelos de Email","subheading":"Arraste e solte para criar o layout do seu email.","content":"Personalize seus emails transacionais usando nossa interface sem c\xf3digo, de arrastar e soltar. Visualize para ver como seu email aparecer\xe1 quando visualizado em diferentes dispositivos."},{"img":"/assets/img/pages/brpt/email/email-amp-emails.svg","heading":"Emails AMP","subheading":"Emails interativos ricos para aumentar o engajamento do usu\xe1rio.","content":"Emails interativos ricos para aumentar o engajamento do usu\xe1rio. Seus clientes podem interagir dinamicamente com sua mensagem diretamente no email para realizar tarefas e CTAs com menos etapas e sem redirecionamentos."},{"img":"/assets/img/pages/brpt/email/email-statistics.svg","heading":"Estat\xedsticas","subheading":"Monitore e acompanhe todos os aspectos do ciclo de vida do seu email.","content":"Obtenha uma representa\xe7\xe3o gr\xe1fica das taxas de entrega, taxas de abertura, taxas de cliques, taxas de rejei\xe7\xe3o e spam para iterar e garantir que voc\xea chegue \xe0 caixa de entrada do seu cliente."},{"img":"/assets/img/pages/brpt/email/email-smtp-restapi-support.svg","heading":"Suporte SMTP/RestAPI","subheading":"Integre com nossas APIs RESTful e SMTP em minutos.","content":"Integre com nossas APIs RESTful e SMTP em minutos. Tenha acesso \xe0 nossa documenta\xe7\xe3o abrangente ou conecte-se com nossos her\xf3is de suporte para integrar facilmente em seus aplicativos personalizados ou de terceiros para come\xe7ar a enviar emails."},{"img":"/assets/img/pages/brpt/email/email-validation.svg","heading":"Valida\xe7\xe3o de Email","subheading":"Impacte positivamente o engajamento e a reputa\xe7\xe3o da sua marca.","content":"Envie mais mensagens para contatos reais com nossa API em tempo real que detecta e suprime endere\xe7os de email inv\xe1lidos com uma taxa de precis\xe3o de at\xe9 85% para fornecer uma lista limpa."}],"morefeatures":[{"more":"Forne\xe7a suporte ao cliente via compartilhamento de tela com um \xfanico clique"},{"more":"Resolu\xe7\xe3o de problemas por v\xeddeo em segundos"},{"more":"Grave o desempenho do agente para controle de qualidade"},{"more":"Entenda as emo\xe7\xf5es dos seus clientes por meio da an\xe1lise de sentimentos"},{"more":"Solu\xe7\xe3o para acesso remoto e suporte"},{"more":"Acompanhe o desempenho do email"}]}},"voice":{"name":"Voice","slug":"voice","code":true,"tagline":"conecte-se com confian\xe7a","heading":"Aumente o engajamento do cliente e construa confian\xe7a","subheading":"Inicie conversas em tempo real com \xe1udio cristalino, baixa lat\xeancia e insights mais profundos.","btntext":"Comece gratuitamente","icon":"/img/icon/voice.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/voice/voice-call-monitoring.svg","heading":"Monitoramento de Chamadas","subheading":"Apresentando a experi\xeancia de comunica\xe7\xe3o de pr\xf3ximo n\xedvel com nossos novos recursos de Monitoramento de Chamadas","content":"Estamos colocando voc\xea no controle de suas conversas com os chamadores. Esses recursos robustos oferecem maior controle e percep\xe7\xe3o durante suas chamadas, garantindo uma comunica\xe7\xe3o aprimorada e satisfa\xe7\xe3o do cliente. Espionagem de chamadas: sua arma secreta para garantia de qualidade! Interven\xe7\xe3o em chamadas: suporte em tempo real, a apenas um clique de dist\xe2ncia! Sussurro de chamadas: orienta\xe7\xe3o ao seu alcance!"},{"img":"/assets/img/pages/brpt/voice/voice-direct-calling-from-hello.svg","heading":"Chamada direta do navegador","subheading":"Pule a chamada bidirecional e ligue diretamente do navegador.","content":"Economize o tempo de chamada do seu agente e melhore a experi\xeancia do cliente. Conecte facilmente dois n\xfameros de telefone sem manter um em espera para iniciar uma conversa com o cliente."},{"img":"/assets/img/pages/brpt/voice/voice-ivr-flow.svg","heading":"Fluxo IVR","subheading":"IVR moderno que torna a intera\xe7\xe3o do cliente r\xe1pida e sem complica\xe7\xf5es.","content":"Sistema IVR inteligente que oferece mais do que apenas resolver consultas. Al\xe9m do habitual, voc\xea pode criar uma configura\xe7\xe3o baseada em tempo ou agente e at\xe9 mesmo gravar uma mensagem."},{"img":"/assets/img/pages/brpt/voice/voice-bulk-voice.svg","heading":"Voz em Massa","subheading":"Fale diretamente com seu p\xfablico em uma \xfanica chamada.","content":"Grave sua mensagem de voz e envie a mensagem que deseja transmitir para centenas e milhares de clientes de uma s\xf3 vez. Uma chamada telef\xf4nica geralmente \xe9 dif\xedcil de ignorar."},{"img":"/assets/img/pages/brpt/voice/voice-multiple-way-to-upload-file.svg","heading":"M\xfaltiplas maneiras de carregar arquivo","subheading":"Carregue sua mensagem de \xe1udio de v\xe1rias maneiras.","content":"Amplifique sua intera\xe7\xe3o com o cliente com uma mensagem de voz personalizada. Grave sua mensagem para chamada de voz em massa ou menu IVR atrav\xe9s de texto para fala, microfone do navegador ou chamada telef\xf4nica."},{"img":"/assets/img/pages/brpt/voice/voice-bulk-voice-with-ivr.svg","heading":"Voz em massa com IVR","subheading":"Conecte sua chamada de voz ao IVR.","content":"N\xe3o apenas envie uma mensagem de voz em massa, mas tamb\xe9m receba uma resposta de seus usu\xe1rios. Grave a mensagem que voc\xea gostaria de transmitir e envie-a para seus clientes usando um IVR."},{"img":"/assets/img/pages/brpt/voice/voice-real-time-connect-with-agent-on-user-input-on-bulk-call.svg","heading":"Conex\xe3o em tempo real com agente na entrada do usu\xe1rio em chamada em massa","subheading":"Direcione seu usu\xe1rio para seu agente de suporte.","content":"Melhore a experi\xeancia do cliente oferecendo suporte em tempo real quando voc\xea conecta seus usu\xe1rios aos seus agentes de suporte ao cliente com base na entrada de chamada em massa."}],"morefeatures":[{"more":"Forne\xe7a suporte ao cliente via compartilhamento de tela com um \xfanico clique"},{"more":"Resolu\xe7\xe3o de problemas por v\xeddeo em segundos"},{"more":"Grave o desempenho do agente para controle de qualidade"},{"more":"Entenda as emo\xe7\xf5es dos seus clientes por meio da an\xe1lise de sentimentos"},{"more":"Solu\xe7\xe3o para acesso remoto e suporte"},{"more":"Acompanhe o desempenho do Voice"}]}},"whatsapp":{"name":"WhatsApp","slug":"whatsapp","code":true,"tagline":"domine as plataformas populares","heading":"Impulsione melhores resultados de engajamento do cliente","subheading":"Encontre seus clientes onde eles j\xe1 est\xe3o, na plataforma com mais de 2 bilh\xf5es de usu\xe1rios.","btntext":"Comece gratuitamente","icon":"/img/icon/whatsapp.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/whatsapp/whatsapp-support-base64.svg","heading":"Suporte a Base64","subheading":"Envie o corpo em JSON e deixe o resto conosco.","content":"N\xe3o \xe9 necess\xe1rio criar uma URL ou fazer o upload do seu arquivo, pois voc\xea pode enviar diretamente o corpo JSON e ele ser\xe1 convertido automaticamente em formato Base64 e enviado via WhatsApp."},{"img":"/assets/img/pages/brpt/whatsapp/whatsapp-2way-communication.svg","heading":"Comunica\xe7\xe3o bidirecional","subheading":"Diga ol\xe1 para continuar no HELLO.","content":"D\xea ao seu cliente a plataforma certa para continuar a conversa. Assim que ele responder, ele ser\xe1 levado diretamente para o HELLO para iniciar uma comunica\xe7\xe3o bidirecional com sua empresa."},{"img":"/assets/img/pages/brpt/whatsapp/whatsapp-manage-template-inside-panel.svg","heading":"Gerencie o template dentro do painel","subheading":"Crie e gerencie seus templates aqui mesmo.","content":"N\xe3o \xe9 necess\xe1rio trocar de plataforma para criar seu template. Voc\xea pode criar os templates, gerenci\xe1-los e verificar o status deles aqui mesmo, sem acessar o Facebook."},{"img":"/assets/img/pages/brpt/whatsapp/whatsapp-analytics.svg","heading":"An\xe1lise","subheading":"Obtenha insights gr\xe1ficos sobre as mensagens da sua empresa.","content":"Analise e melhore a comunica\xe7\xe3o da sua empresa com as m\xe9tricas certas. Obtenha um relat\xf3rio gr\xe1fico sobre o n\xfamero de mensagens enviadas, entregues, conversas e muito mais."},{"img":"/assets/img/pages/brpt/whatsapp/whatsapp-export-logs.svg","heading":"Exportar Logs","subheading":"Obtenha logs individuais de mensagens enviadas e recebidas.","content":"Exporte os logs para uma melhor visualiza\xe7\xe3o e insights. Obtenha detalhes de todas as mensagens enviadas e recebidas e das conversas que sua empresa teve com seus clientes."}],"morefeatures":[{"more":"Forne\xe7a suporte ao cliente via compartilhamento de tela com um \xfanico clique"},{"more":"Resolu\xe7\xe3o de problemas por v\xeddeo em segundos"},{"more":"Grave o desempenho do agente para controle de qualidade"},{"more":"Entenda as emo\xe7\xf5es dos seus clientes por meio da an\xe1lise de sentimentos"},{"more":"Solu\xe7\xe3o para acesso remoto e suporte"},{"more":"Acompanhe o desempenho do WhatsApp"}]}},"numbers":{"name":"Numbers","slug":"numbers","code":true,"tagline":"Desbloqueie o Poder dos N\xfameros Virtuais","heading":"Receba, Responda e Personalize SMS com Long Codes, para o M\xe1ximo Engajamento e Comunica\xe7\xe3o!","subheading":"","btntext":"Comece gratuitamente","icon":"/img/icon/numbers.svg","features":{"heading":"Caracter\xedsticas","content":[{"img":"/assets/img/pages/brpt/numbers/numbers-global-market-entry-with-numbers.svg","heading":"Entrada no Mercado Global com N\xfameros: Expandindo sua Presen\xe7a","subheading":"","content":"Os n\xfameros oferecem uma estrat\xe9gia eficaz para empresas que buscam ampliar seu alcance no mercado. Esses n\xfameros facilitam a cria\xe7\xe3o de uma conex\xe3o local ao adquirir um n\xfamero de telefone, simplificando a comunica\xe7\xe3o com clientes e associados. Ao aproveitar os n\xfameros, as empresas podem estabelecer confian\xe7a, melhorar a acessibilidade, superar divis\xf5es geogr\xe1ficas, tudo enquanto projetam uma imagem profissional e otimizam a rela\xe7\xe3o custo-benef\xedcio. Essa abordagem \xe9 especialmente ben\xe9fica para empresas internacionais que buscam oportunidades no mercado diversificado e competitivo."},{"img":"/assets/img/pages/brpt/numbers/numbers-cost-efficiency.svg","heading":"Efici\xeancia de Custo","subheading":"","content":"Os n\xfameros apresentam uma alternativa econ\xf4mica \xe0s linhas telef\xf4nicas tradicionais. Eles exigem menos despesas iniciais, minimizam os custos de manuten\xe7\xe3o e eliminam a necessidade de infraestrutura f\xedsica, tornando-os uma escolha financeiramente eficiente para empresas de todos os portes no mercado."},{"img":"/assets/img/pages/brpt/numbers/numbers-missed-call-services.svg","heading":"Servi\xe7os de Chamada Perdida","subheading":"","content":"V\xe1rios provedores de n\xfameros virtuais oferecem funcionalidades como alertas e notifica\xe7\xf5es de chamadas perdidas, permitindo que as empresas se comuniquem prontamente com os clientes que n\xe3o conseguiram estabelecer contato. Esse recurso aprimora a comunica\xe7\xe3o e a capacidade de resposta do cliente no mercado."},{"img":"/assets/img/pages/brpt/numbers/numbers-keyword-specific-messaging.svg","heading":"Mensagens Espec\xedficas por Palavra-chave","subheading":"Voc\xea pode escolher uma palavra-chave exclusiva para sua empresa ou campanha","content":"Quando os usu\xe1rios enviam um SMS come\xe7ando com sua palavra-chave escolhida para seu c\xf3digo longo dedicado ou compartilhado, voc\xea pode receber essas mensagens. Esse recurso permite uma comunica\xe7\xe3o personalizada e espec\xedfica ao contexto."},{"img":"/assets/img/pages/brpt/numbers/numbers-keyword-independent-messaging.svg","heading":"Mensagens Independentes de Palavra-chave","subheading":"Al\xe9m das palavras-chave","content":"voc\xea pode receber mensagens sem palavras-chave espec\xedficas. Isso amplia suas op\xe7\xf5es de comunica\xe7\xe3o, permitindo que os usu\xe1rios entrem em contato com voc\xea sem a necessidade de palavras-chave predefinidas."},{"img":"/assets/img/pages/brpt/numbers/numbers-pre-formatted-questions.svg","heading":"Conjunto de Perguntas Pr\xe9-formatadas","subheading":"","content":"Voc\xea pode configurar um conjunto de perguntas pr\xe9-formatadas para enviar ao seu p\xfablico. Isso \xe9 particularmente \xfatil para realizar pesquisas, question\xe1rios ou coletar informa\xe7\xf5es espec\xedficas em um formato estruturado."},{"img":"/assets/img/pages/brpt/numbers/numbers-online-survey.svg","heading":"Pesquisas Online","subheading":"","content":"Use nosso servi\xe7o Numbers para criar e conduzir pesquisas online. Colete insights e feedbacks valiosos do seu p\xfablico com facilidade."},{"img":"/assets/img/pages/brpt/numbers/numbers-lead-generation.svg","heading":"Gera\xe7\xe3o de Leads","subheading":"","content":"Engaje na gera\xe7\xe3o de leads permitindo que clientes potenciais entrem em contato com voc\xea por SMS. Colete detalhes de contato e consultas, ajudando voc\xea a expandir sua base de clientes."},{"img":"/assets/img/pages/brpt/numbers/numbers-auto-responses.svg","heading":"Crie Respostas Autom\xe1ticas","subheading":"","content":"Voc\xea tem a op\xe7\xe3o de configurar respostas autom\xe1ticas para as mensagens que receber. Personalize essas respostas para fornecer feedback ou informa\xe7\xf5es imediatas aos seus usu\xe1rios."},{"img":"/assets/img/pages/brpt/numbers/numbers-integration-into-web.svg","heading":"Integra\xe7\xe3o em Aplica\xe7\xf5es Web","subheading":"","content":"Integre perfeitamente os N\xfameros na sua aplica\xe7\xe3o web ou software. Isso permite estender as capacidades do seu software e melhorar a comunica\xe7\xe3o com o usu\xe1rio."}]}}},"components":{"navbar":{"notification":{"contact":"Contato","login":"Login"},"menu":{"products":"Produtos","integrations":"Integra\xe7\xf5es","pricing":"Pre\xe7os","api":"Documentos da API","signup":"Inscrever-se"},"products":{"applications":{"heading":"Aplica\xe7\xf5es","content":[{"slug":"hello","name":"Hello","description":"Bilheteria e Chat"},{"slug":"campaign","name":"Campaign","description":"Automa\xe7\xe3o Baseada em Eventos"},{"slug":"segmento","name":"Segmento","description":"Gest\xe3o de Contatos"},{"slug":"otp","name":"OTP","description":"Plataforma Simplificada de OTP"}]},"channels":{"heading":"Canais","content":[{"slug":"sms","name":"SMS"},{"slug":"rcs","name":"RCS"},{"slug":"email","name":"Email"},{"slug":"whatsapp","name":"WhatsApp"},{"slug":"voice","name":"Voice"},{"slug":"numbers","name":"Numbers"}]},"utilities":{"heading":"Utilit\xe1rios","content":[{"slug":"shortenerurl","name":"URL Shortner","description":"Personalize e Rastreie URLs"},{"slug":"knowledgeBase","name":"knowledgeBase","description":"Gerencie Documentos de Ajuda e Guias"}]}},"integrations":{"morebtn":"Explorar Mais Plugins","content":[{"slug":"shopify","name":"Shopify","link":"https://apps.shopify.com/msg91"},{"slug":"tally","name":"Tally","link":"https://msg91.com/partners-and-integrations/tally"},{"slug":"zapier","name":"Zapier","link":"https://msg91.com/partners-and-integrations/zapier"},{"slug":"freshworks","name":"Freshworks","link":"https://msg91.com/partners-and-integrations/freshworks"},{"slug":"firebase","name":"Firebase","link":"https://msg91.com/partners-and-integrations/firebase"},{"slug":"hubspot","name":"HubSpot","link":"https://msg91.com/partners-and-integrations/hubspot"},{"slug":"googlesheets","name":"Google Sheets","link":"https://msg91.com/help/how-to-send-sms-and-email-from-google-spreadsheet"},{"slug":"","name":"Explorar Mais Plugins","link":"https://msg91.com/partners-and-integrations"}]}},"footer":{"applications":{"heading":"Nossos produtos","content":[{"slug":"hello","name":"Hello"},{"slug":"segmento","name":"Segmento"},{"slug":"campaign","name":"Campaign"},{"slug":"otp","name":"OTP"}]},"channels":{"heading":"Canais","content":[{"slug":"sms","name":"SMS"},{"slug":"email","name":"Email"},{"slug":"whatsapp","name":"WhatsApp"},{"slug":"voice","name":"Voz"},{"slug":"numbers","name":"N\xfameros"}]},"utilities":{"heading":"Utilit\xe1rios","content":[{"slug":"shorturl","name":"Encurtador de URL"},{"slug":"knowledgebase","name":"Base de Conhecimento"},{"slug":"free-whatsapp-link-generator","name":"Gerador de Link do WhatsApp Gratuito"},{"slug":"whatsapp/chatbot","name":"Chatbot do WhatsApp"}]}}}}'
            );
        },
    },
    function (e) {
        var t = function (t) {
            return e((e.s = t));
        };
        e.O(0, [9774, 179], function () {
            return t(91118), t(96885);
        }),
            (_N_E = e.O());
    },
]);
