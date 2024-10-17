(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [865],
    {
        31828: function (t, r, n) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                '/[country]/pricing/[product]',
                function () {
                    return n(7780);
                },
            ]);
        },
        7780: function (t, r, n) {
            'use strict';
            n.r(r);
            var e = n(85893),
                u = n(11163),
                o = n(67306);
            n(27918);
            let s = (t) => {
                let { pathArray: r } = t,
                    n = (0, u.useRouter)(),
                    s = '';
                var c = n.asPath,
                    i = c.split('/')[1];
                s = 'br-pt' === i ? 'br' : i;
                var p = c.split('/')[3];
                p = p.split('?')[0];
                let a = () => {
                        var t = null == s ? void 0 : s.toUpperCase();
                        return ((s = 2 == s.length ? '/' + s : ''), '[COUNTRY]' === t) ? a() : t;
                    },
                    l = a();
                return '[COUNTRY]' !== l && 0 !== l.length && 'product' !== p
                    ? (0, e.jsx)(o.Z, { countryCode: l, product: p, browserPath: c, pathArray: r })
                    : (0, e.jsx)(e.Fragment, { children: 'LOADING' });
            };
            r.default = s;
        },
    },
    function (t) {
        t.O(0, [1876, 5121, 4543, 7306, 9774, 2888, 179], function () {
            return t((t.s = 31828));
        }),
            (_N_E = t.O());
    },
]);
