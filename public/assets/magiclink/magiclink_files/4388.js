((t) => {
    t || (t = document.location.href);
    const n = 'https://tracking.g2crowd.com',
        e = '',
        i = '4388',
        o = 'external',
        a = '',
        s = '',
        r = {
            allKeys: [],
            key: '',
            localStorageKey: 'g2tracking',
            date: ((t = new Date()) => (1e4 * t.getFullYear() + 100 * t.getMonth() + t.getDate()).toString())(),
            setKey: function (t) {
                this.key = t
                    .map(([t, n]) => n)
                    .join(',')
                    .replace(/\s/g, '');
            },
            isFresh: function () {
                return this.refresh(), this.allKeys.includes(this.key);
            },
            refresh: function () {
                try {
                    const t = window.localStorage.getItem(this.localStorageKey);
                    this.allKeys = (t && JSON.parse(t)[this.date]) || [];
                } catch (t) {
                    console.warn(t), (this.allKeys = []);
                }
            },
            persist: function () {
                const t = this.isFresh() ? this.allKeys : [this.key, ...this.allKeys],
                    n = Object.fromEntries([[this.date, t]]);
                try {
                    window.localStorage.setItem(this.localStorageKey, JSON.stringify(n));
                } catch (t) {
                    console.warn(t);
                }
            },
        };
    let c = !1,
        g = !1,
        w = 0;
    const d = 7;
    function l(t) {
        return t <= 1 ? t : l(t - 1) + l(t - 2);
    }
    function h(n, e = '') {
        const c = window.navigator && window.navigator.userAgent,
            g = window.screen && window.screen.availHeight.toString(),
            w = [
                ['aid', e],
                ['ua', c],
                ['sr', (window.screen && window.screen.availWidth.toString()) + 'x' + g],
                ['lang', window.navigator.language],
                ['tz', new Date().getTimezoneOffset().toString()],
                ['sid', i],
                ['uid', s],
                ['e', ''],
            ];
        if ((r.setKey(w), !r.isFresh())) {
            if (window.navigator && window.navigator.sendBeacon) {
                const e = new FormData();
                e.append('pid', a),
                    e.append('p', t),
                    e.append('s', o),
                    w.forEach(([t, n]) => e.append(t, n)),
                    window.navigator.sendBeacon(n, e);
            } else if (window.fetch) {
                const e = { p: t, pid: a, s: o, ...Object.fromEntries(w) };
                window.fetch(n, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(e),
                });
            }
            r.persist();
        }
    }
    function f(t) {
        if (c) return !1;
        t
            ? ((c = !0), h(`${n}/attribution_tracking/conversions/assign`, t))
            : (g || (h(`${n}/attribution_tracking/conversions/assign`), (g = !0)), y());
    }
    function u() {
        c ||
            w >= d ||
            (e || (h(`${n}/attribution_tracking/conversions/assign`), (c = !0)),
            window.ga &&
                (function (t, n) {
                    let e;
                    !(function (t, n) {
                        for (let e = 0, i = t.length; e < i; e++) n(t[e]);
                    })((window.ga && window.ga.getAll && window.ga.getAll()) || [], function (n) {
                        n.get('trackingId') === t && (e = n);
                    }),
                        n(!!e && e.get('clientId'));
                })(e, f),
            window.gtag &&
                (function (t, n) {
                    window.gtag('get', t, 'client_id', n);
                })(e, f),
            window.dataLayer &&
                (function (t, n) {
                    window.dataLayer.push(['get', t, 'client_id', n]), f('');
                })(e, f),
            window.gtag || window.ga || y());
    }
    function y() {
        w >= d ? (c = !0) : (window.setTimeout(u, 500 * l(w)), (w += 1));
    }
    u();
})('https://msg91.com/in/otp/magiclink');
