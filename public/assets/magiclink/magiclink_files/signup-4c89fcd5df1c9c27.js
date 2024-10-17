(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7616],
    {
        98588: function (e, t, s) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                '/signup',
                function () {
                    return s(70381);
                },
            ]);
        },
        70381: function (e, t, s) {
            'use strict';
            s.r(t),
                s.d(t, {
                    default: function () {
                        return T;
                    },
                });
            var i,
                a,
                l,
                n = s(14924),
                r = s(85893),
                o = s(67294),
                d = s(5434),
                c = s(15269);
            class u extends o.Component {
                render() {
                    return (0, r.jsx)(r.Fragment, {
                        children: (0, r.jsxs)('div', {
                            className: 'step-one d-grid',
                            children: [
                                (0, r.jsxs)('div', {
                                    className: 'stepone__dev d-grid gap-3',
                                    children: [
                                        (0, r.jsx)('p', {
                                            className: 'stepone__dev__que c-fs-7 ',
                                            children: 'Are you a developer?',
                                        }),
                                        (0, r.jsx)('div', {
                                            className: 'stepone__dev__icons',
                                            children: (0, r.jsx)('a', {
                                                href: void 0,
                                                onClick: () => this.signupWithGitHub(),
                                                children: (0, r.jsx)('button', {
                                                    className:
                                                        'devlogin__btn__btn d-flex justify-content-center align-items-center',
                                                    children: (0, r.jsx)('img', {
                                                        src: '/img/icon-github.svg',
                                                        alt: 'Github',
                                                    }),
                                                }),
                                            }),
                                        }),
                                    ],
                                }),
                                (0, r.jsxs)('span', {
                                    className: 'step-one__break c-fs-7 d-flex align-items-center gap-3',
                                    children: ['or', (0, r.jsx)('span', { className: 'step-one__break__line' })],
                                }),
                                (0, r.jsx)('div', {
                                    className: 'step-one__nondev',
                                    children: (0, r.jsxs)('button', {
                                        className: 'step-one__nondev__withemail btn btn-login-prime c-fs-7',
                                        onClick: () => this.props.setStep(2),
                                        children: ['Sign up with Email', (0, r.jsx)(d.AeI, {})],
                                    }),
                                }),
                                (0, r.jsxs)('p', {
                                    className: 'step-one__login c-text c-fs-7',
                                    children: [
                                        'If you already have an account,',
                                        ' ',
                                        (0, r.jsx)('a', {
                                            href: '/signin',
                                            className: 'text-hover-underline',
                                            children: 'Login',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    });
                }
                constructor(...e) {
                    super(...e),
                        (0, n.Z)(this, 'signupWithGitHub', () => {
                            (0, c.Rd)(!1);
                        });
                }
            }
            let m = /^(?!\.)\d+$/;
            function h(e, t, s) {
                var i;
                if ((null === (i = null == e ? void 0 : e.trim()) || void 0 === i ? void 0 : i.length) !== +s)
                    return !1;
                for (let i = 1; i <= +s; i++) {
                    let a = document.getElementById(t + i);
                    a && ((a.value = +e.charAt(i - 1)), i === +s && a.focus());
                }
                return !0;
            }
            class p extends o.Component {
                render() {
                    let e = Array.from({ length: this.props.otpLength }, (e, t) => t + 1);
                    return (0, r.jsx)(r.Fragment, {
                        children: (0, r.jsxs)('div', {
                            className: 'd-flex gap-3 ver-input',
                            children: [
                                (0, r.jsx)('div', {
                                    className: 'd-flex gap-3 ver-input__input',
                                    children: e.map((e) =>
                                        (0, r.jsx)(
                                            'input',
                                            {
                                                type: 'number',
                                                inputMode: 'numeric',
                                                className: 'form-control otp-input',
                                                placeholder: '*',
                                                autoComplete: 'off',
                                                min: '0',
                                                max: '9',
                                                id: this.props.tag + e,
                                                onPaste: (e) => {
                                                    var t;
                                                    let s =
                                                        null === (t = e.clipboardData || window.clipboardData) ||
                                                        void 0 === t
                                                            ? void 0
                                                            : t.getData('Text');
                                                    m.test(s) && h(s, this.props.tag, this.props.otpLength),
                                                        null == e || e.preventDefault();
                                                },
                                                onKeyDown: (t) => {
                                                    if (t.ctrlKey || t.metaKey) return !1;
                                                    if (m.test(t.key)) {
                                                        if (e < this.props.otpLength) {
                                                            let s = document.getElementById(this.props.tag + (e + 1));
                                                            t.target.value && (s.value = t.key),
                                                                setTimeout(() => {
                                                                    s.focus();
                                                                }, 20);
                                                        } else
                                                            e === +this.props.otpLength &&
                                                                t.target.value &&
                                                                t.preventDefault();
                                                        setTimeout(() => {
                                                            var t, s;
                                                            let i = document.getElementById(this.props.tag + e);
                                                            (null == i
                                                                ? void 0
                                                                : null === (t = i.value) || void 0 === t
                                                                  ? void 0
                                                                  : t.length) > 1 &&
                                                                (i.value =
                                                                    null === (s = i.value) || void 0 === s
                                                                        ? void 0
                                                                        : s.slice(0, 1));
                                                        }, 20);
                                                    } else if ('Backspace' === t.key) {
                                                        if (!t.target.value && e > 1) {
                                                            let t = document.getElementById(this.props.tag + (e - 1));
                                                            (t.value = ''),
                                                                setTimeout(() => {
                                                                    t.focus();
                                                                }, 20);
                                                        }
                                                    } else
                                                        null == t || t.preventDefault(),
                                                            setTimeout(() => {
                                                                let t = document.getElementById(this.props.tag + e);
                                                                if (m.test(null == t ? void 0 : t.value)) {
                                                                    if (
                                                                        !h(
                                                                            null == t ? void 0 : t.value,
                                                                            this.props.tag,
                                                                            this.props.otpLength
                                                                        )
                                                                    ) {
                                                                        var s, i, a;
                                                                        if (
                                                                            (null == t
                                                                                ? void 0
                                                                                : null === (s = t.value) || void 0 === s
                                                                                  ? void 0
                                                                                  : s.length) > 1
                                                                        ) {
                                                                            let s = document.getElementById(
                                                                                this.props.tag + (e + 1)
                                                                            );
                                                                            s &&
                                                                                ((s.value =
                                                                                    null === (a = t.value) ||
                                                                                    void 0 === a
                                                                                        ? void 0
                                                                                        : a.slice(1)),
                                                                                s.focus()),
                                                                                (t.value =
                                                                                    null === (i = t.value) ||
                                                                                    void 0 === i
                                                                                        ? void 0
                                                                                        : i.slice(0, 1));
                                                                        }
                                                                    }
                                                                } else t.value = '';
                                                            }, 20);
                                                },
                                            },
                                            e
                                        )
                                    ),
                                }),
                                (0, r.jsx)('button', {
                                    className: 'btn btn-login-prime-o c-fs-7',
                                    onClick: () => {
                                        let e = '';
                                        for (let t = 1; t <= +this.props.otpLength; t++)
                                            e += document.getElementById(this.props.tag + t).value;
                                        (null == e ? void 0 : e.length) === +this.props.otpLength &&
                                            this.props.verifyOtp(e, this.props.requestId, this.props.notByEmail);
                                    },
                                    children: 'Verify',
                                }),
                            ],
                        }),
                    });
                }
            }
            class v extends o.Component {
                onChange(e) {
                    var t, s, a, l, n, r, o;
                    let d = document.getElementById('init-contact'),
                        c = (null === (t = this.props) || void 0 === t ? void 0 : t.required)
                            ? null == i
                                ? void 0
                                : i.isRequiredValidNumber
                            : null == i
                              ? void 0
                              : i.isValidNumber;
                    c
                        ? null == d || null === (r = d.classList) || void 0 === r || r.remove('invalid-input')
                        : null == d || null === (o = d.classList) || void 0 === o || o.add('invalid-input'),
                        (null === (s = this.props) || void 0 === s ? void 0 : s.onInput) &&
                            (null === (a = this.props) || void 0 === a || a.onInput(i.phoneNumber)),
                        (null === (l = this.props) || void 0 === l ? void 0 : l.setInvalid) &&
                            (null === (n = this.props) || void 0 === n || n.setInvalid(!c)),
                        e || setTimeout(() => (null == d ? void 0 : d.focus()), 200);
                }
                render() {
                    var e, t;
                    return (
                        setTimeout(() => {
                            if ('undefined' != typeof document) {
                                let t = document.querySelector('body'),
                                    s = document.getElementById('init-contact');
                                if (s) {
                                    var e;
                                    i = new x(
                                        s,
                                        t,
                                        ''.concat('https://msg91.com', '/intl-tel-input-custom.css'),
                                        null === (e = this.props) || void 0 === e ? void 0 : e.defaultValue
                                    );
                                }
                            }
                        }, 50),
                        (0, r.jsx)(r.Fragment, {
                            children: (0, r.jsx)('input', {
                                className: 'w-100 form-control',
                                type: 'text',
                                id: 'init-contact',
                                placeholder: this.props.placeholder,
                                onInput: (e) => {
                                    this.onChange();
                                },
                                onBlur: (e) => {
                                    this.onChange(!0);
                                },
                                onFocus: (e) => {
                                    this.onChange(!0);
                                },
                                defaultValue: null === (e = this.props) || void 0 === e ? void 0 : e.defaultValue,
                                disabled: null === (t = this.props) || void 0 === t ? void 0 : t.disabled,
                            }),
                        })
                    );
                }
            }
            var g = {
                    nationalMode: !0,
                    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/utils.js',
                    autoHideDialCode: !1,
                    separateDialCode: !1,
                    initialCountry: 'auto',
                    geoIpLookup: function (e) {
                        fetch('https://api.db-ip.com/v2/free/self')
                            .then(function (e) {
                                return e.json();
                            })
                            .then(function (t) {
                                var s;
                                e(
                                    (null == t
                                        ? void 0
                                        : null === (s = t.countryCode) || void 0 === s
                                          ? void 0
                                          : s.toLowerCase()) || 'in'
                                );
                            })
                            .catch(function () {
                                e('in');
                            });
                    },
                    formatOnDisplay: !1,
                },
                f = /^[0-9-+()\/\\ ]+$/;
            class x {
                set phoneNumber(e) {
                    null == a || a.setNumber(e);
                }
                set setCountry(e) {
                    null == a || a.setCountry(e);
                }
                get intlData() {
                    return a;
                }
                get phoneNumber() {
                    return null == a ? void 0 : a.getNumber();
                }
                get isRequiredValidNumber() {
                    return null == a ? void 0 : a.isValidNumber();
                }
                get isValidNumber() {
                    var e;
                    return (
                        null === (e = null == a ? void 0 : a.getNumber()) ||
                        void 0 === e ||
                        !e.length ||
                        (null == a ? void 0 : a.isValidNumber())
                    );
                }
                get selectedCountryData() {
                    return null == a ? void 0 : a.getSelectedCountryData();
                }
                get getExtension() {
                    return null == a ? void 0 : a.getExtension();
                }
                checkMobileFlag(e, t) {
                    let s = 0,
                        i = setInterval(() => {
                            let a = document.querySelector('body.iti-mobile'),
                                n = 0,
                                r = setInterval(() => {
                                    let s = e.querySelector('.iti__flag-container');
                                    t &&
                                        (l = setInterval(() => {
                                            let e = document.querySelector('.iti--container');
                                            null == e || e.setAttribute('style', 'z-index: 9999999'),
                                                e && clearInterval(l);
                                        }, 100)),
                                        (s || n > 10) && clearInterval(r),
                                        n++;
                                }, 200);
                            s++, (a || s > 5) && clearInterval(i);
                        }, 200);
                }
                showCountryDropdown(e) {
                    setTimeout(() => {
                        let t = e.querySelector('.iti__flag-container'),
                            s = e.querySelector('.iti__country-list');
                        s &&
                            t.addEventListener('click', (e) => {
                                let i = t.getBoundingClientRect(),
                                    a = i.top + 34;
                                s.setAttribute('style', 'position: fixed;top:' + a + 'px; left:' + i.left + 'px');
                            });
                    }, 700);
                }
                onlyPhoneNumber(e) {
                    let t = String.fromCharCode(e.charCode);
                    (('Backspace' === e.key || RegExp(f).test(t)) && 'Space' !== e.code) || e.preventDefault();
                }
                clearChangeFlagZIndexInterval() {
                    clearInterval(l);
                }
                destroyIntlClass() {
                    null == a || a.destroy();
                }
                constructor(e, t, s, i, l = !1, n = {}) {
                    let r = document.createElement('script');
                    (r.type = 'text/javascript'),
                        (r.src =
                            'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/intlTelInput.min.js'),
                        (r.onload = () => {
                            (a = window.intlTelInput(e, { ...g, ...n })),
                                (this.phoneNumber = i),
                                this.checkMobileFlag(t, l);
                        });
                    let o = document.createElement('link');
                    (o.rel = 'stylesheet'),
                        (o.href = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css');
                    let d = document.createElement('link');
                    if (
                        ((d.rel = 'stylesheet'),
                        (d.href = ''.concat(s)),
                        t && (t.appendChild(r), t.appendChild(o), t.appendChild(d)),
                        setTimeout(() => {
                            document.head.appendChild(r), document.head.appendChild(o);
                        }, 200),
                        document.getElementById('iti-0__country-listbox'))
                    ) {
                        let e = Array.from(document.getElementsByClassName('iti__flag'));
                        for (let t = 0; t < e.length; t++)
                            e[t].style.backgroundImage =
                                'url(https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/img/flags@2x.png)';
                    }
                    this.showCountryDropdown(t);
                }
            }
            var y = s(22920);
            class N extends o.Component {
                componentDidMount() {
                    this.setState({ timer: 1 }), this.startTimer();
                }
                startTimer() {
                    this.state.interval && clearInterval(this.state.interval),
                        this.setState({
                            interval: setInterval(() => {
                                this.setState({ timer: 1 }),
                                    this.state.timer >= 35
                                        ? (this.setState({ timer: 0 }), clearInterval(this.state.interval))
                                        : this.setState({ timer: this.state.timer + 1 });
                            }, 1e3),
                        });
                }
                render() {
                    var e, t, s, i, a, l, n, o;
                    return (0, r.jsxs)(r.Fragment, {
                        children: [
                            this.state.timer
                                ? (0, r.jsxs)('p', {
                                      className: 'col-dark my-3 c-fs-9 ',
                                      children: ['Retry in ', 36 - this.state.timer, ' seconds'],
                                  })
                                : null,
                            !this.state.timer &&
                            this.props.emailRequestId &&
                            (null === (e = this.props.allowedRetry) || void 0 === e ? void 0 : e.email)
                                ? (0, r.jsxs)('p', {
                                      className: 'col-dark my-3 c-fs-9 ',
                                      children: [
                                          'Resend on',
                                          ' ',
                                          (0, r.jsx)('a', {
                                              href: void 0,
                                              onClick: () => {
                                                  this.startTimer(),
                                                      this.props.retryOtp(
                                                          this.props.OTPRetryModes.Email,
                                                          this.props.emailRequestId,
                                                          !1
                                                      );
                                              },
                                              className: 'col-primary c-fw-m p-3 cursor-pointer text-hover-underline',
                                              children: 'Email',
                                          }),
                                      ],
                                  })
                                : null,
                            !this.state.timer && (null === (t = this.props) || void 0 === t ? void 0 : t.smsRequestId)
                                ? (0, r.jsxs)('p', {
                                      className: 'col-dark my-3 c-fs-9',
                                      children: [
                                          'Resend on',
                                          ' ',
                                          (null === (s = this.props.allowedRetry) || void 0 === s ? void 0 : s.sms)
                                              ? (0, r.jsx)('a', {
                                                    href: void 0,
                                                    onClick: () => {
                                                        this.startTimer(),
                                                            this.props.retryOtp(
                                                                this.props.OTPRetryModes.Sms,
                                                                this.props.smsRequestId,
                                                                !0
                                                            );
                                                    },
                                                    className:
                                                        'col-primary c-fw-600 p-3 cursor-pointer text-hover-underline',
                                                    children: 'Text',
                                                })
                                              : null,
                                          (null === (i = this.props.allowedRetry) || void 0 === i ? void 0 : i.whatsApp)
                                              ? (0, r.jsxs)('span', {
                                                    children: [
                                                        (null === (a = this.props.allowedRetry) || void 0 === a
                                                            ? void 0
                                                            : a.sms) && (0, r.jsx)('span', { children: 'or ' }),
                                                        (0, r.jsx)('a', {
                                                            href: void 0,
                                                            onClick: () => {
                                                                this.startTimer(),
                                                                    this.props.retryOtp(
                                                                        this.props.OTPRetryModes.Whatsapp,
                                                                        this.props.smsRequestId,
                                                                        !0
                                                                    );
                                                            },
                                                            className:
                                                                'col-primary c-fw-600 p-3 cursor-pointer text-hover-underline',
                                                            children: 'WhatsApp',
                                                        }),
                                                    ],
                                                })
                                              : null,
                                          (null === (l = this.props.allowedRetry) || void 0 === l ? void 0 : l.voice)
                                              ? (0, r.jsxs)('span', {
                                                    children: [
                                                        ((null === (n = this.props.allowedRetry) || void 0 === n
                                                            ? void 0
                                                            : n.sms) ||
                                                            (null === (o = this.props.allowedRetry) || void 0 === o
                                                                ? void 0
                                                                : o.whatsApp)) &&
                                                            (0, r.jsx)('span', { children: 'or ' }),
                                                        (0, r.jsx)('a', {
                                                            href: void 0,
                                                            onClick: () => {
                                                                this.startTimer(),
                                                                    this.props.retryOtp(
                                                                        this.props.OTPRetryModes.Voice,
                                                                        this.props.smsRequestId,
                                                                        !0
                                                                    );
                                                            },
                                                            className:
                                                                'col-primary c-fw-600 p-3 cursor-pointer text-hover-underline c-fw-m',
                                                            children: 'Call',
                                                        }),
                                                    ],
                                                })
                                              : null,
                                      ],
                                  })
                                : null,
                        ],
                    });
                }
                constructor(e) {
                    super(e), (this.state = { timer: 0, interval: null });
                }
            }
            var b = '',
                j = !1;
            class S extends o.Component {
                componentDidMount() {
                    let e = new URLSearchParams(window.location.search);
                    e.toString();
                    let t = e.get('source');
                    this.setState({ sourceValue: t });
                }
                render() {
                    var e,
                        t,
                        s,
                        i,
                        a,
                        l,
                        n,
                        o,
                        c,
                        u,
                        m,
                        h,
                        g,
                        f,
                        x,
                        S,
                        C,
                        _,
                        I,
                        k,
                        D,
                        w,
                        E,
                        R,
                        T,
                        A,
                        P,
                        V,
                        O,
                        B,
                        M,
                        L,
                        q,
                        Z,
                        F,
                        H,
                        U,
                        Y,
                        G;
                    return (0, r.jsx)(r.Fragment, {
                        children: (0, r.jsxs)('div', {
                            className: 'step-two d-grid gap-4',
                            children: [
                                (0, r.jsxs)('div', {
                                    className: 'step-two__progress d-flex align-items-center gap-2 gap-lg-4',
                                    children: [
                                        (0, r.jsxs)('div', {
                                            className: 'd-flex align-items-center gap-1 c-fs-7 form_step',
                                            children: [
                                                (0, r.jsx)(d.ZSR, {
                                                    className:
                                                        (null === (e = this.props) || void 0 === e
                                                            ? void 0
                                                            : e.smsAccessToken) &&
                                                        (null === (t = this.props) || void 0 === t
                                                            ? void 0
                                                            : t.emailAccessToken)
                                                            ? 'ico-green'
                                                            : 'ico-grey',
                                                }),
                                                ' ',
                                                'Verify email & mobile number',
                                            ],
                                        }),
                                        (0, r.jsx)('span', {
                                            className: 'progress-line__none progress-line d-lg-block',
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: 'd-lg-flex align-items-center gap-1 c-fs-7 ico-grey form_step',
                                            children: [(0, r.jsx)(d.Tcr, {}), ' Enter details'],
                                        }),
                                    ],
                                }),
                                (0, r.jsxs)('div', {
                                    className: 'step-two__email w-100  d-grid gap-2',
                                    children: [
                                        (0, r.jsx)('label', {
                                            htmlFor: 'email',
                                            className: 'step-two__email__lable c-fw-m c-fs-7',
                                            children: 'Verify email',
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: 'ver-email d-flex gap-4 align-items-top flex-wrap',
                                            children: [
                                                (0, r.jsx)('div', {
                                                    className: 'ver-email__main',
                                                    children: (0, r.jsxs)('div', {
                                                        className: 'ver-email-main d-flex gap-3 ver-input',
                                                        children: [
                                                            (0, r.jsxs)('div', {
                                                                className:
                                                                    'ver-email-main__input col ver-input__input d-flex align-items-center',
                                                                children: [
                                                                    (
                                                                        null === (s = this.props) || void 0 === s
                                                                            ? void 0
                                                                            : s.signupByGitHub
                                                                    )
                                                                        ? (0, r.jsxs)('div', {
                                                                              className:
                                                                                  'd-flex align-items-center gap-1 c-fs-7 text-green',
                                                                              children: [
                                                                                  'Email Verified ',
                                                                                  (0, r.jsx)(d.ZSR, {
                                                                                      className: 'ico-green',
                                                                                  }),
                                                                              ],
                                                                          })
                                                                        : (0, r.jsx)('input', {
                                                                              type: 'email',
                                                                              className: 'form-control c-fs-7',
                                                                              id: 'emailIdentifier',
                                                                              placeholder: 'Email Address*',
                                                                              defaultValue: this.state.emailIdentifier,
                                                                              onInput: (e) =>
                                                                                  this.props.identifierChange(!1),
                                                                              disabled:
                                                                                  null === (i = this.props) ||
                                                                                  void 0 === i
                                                                                      ? void 0
                                                                                      : i.emailAccessToken,
                                                                          }),
                                                                    (0, r.jsx)('span', {
                                                                        className: 'ver-email-main__input__check',
                                                                        children:
                                                                            (null === (a = this.props) || void 0 === a
                                                                                ? void 0
                                                                                : a.emailAccessToken) &&
                                                                            (0, r.jsx)(d.ZSR, {
                                                                                className: 'ico-green',
                                                                            }),
                                                                    }),
                                                                ],
                                                            }),
                                                            (null === (l = this.props) || void 0 === l
                                                                ? void 0
                                                                : l.emailAccessToken) ||
                                                            (null === (n = this.props) || void 0 === n
                                                                ? void 0
                                                                : n.signupByGitHub)
                                                                ? (0, r.jsxs)('button', {
                                                                      className:
                                                                          'ver-email-main__btn btn  btn-login-prime-o c-fw-m c-fs-7',
                                                                      onClick: (e) => this.props.identifierChange(!1),
                                                                      children: [
                                                                          'Change',
                                                                          (
                                                                              null === (o = this.props) || void 0 === o
                                                                                  ? void 0
                                                                                  : o.signupByGitHub
                                                                          )
                                                                              ? ''
                                                                              : '/Re-verify',
                                                                          ' Email',
                                                                      ],
                                                                  })
                                                                : (0, r.jsx)('button', {
                                                                      className:
                                                                          'ver-email-main__btn btn c-fw-m c-fs-7 '.concat(
                                                                              (
                                                                                  null === (c = this.props) ||
                                                                                  void 0 === c
                                                                                      ? void 0
                                                                                      : c.emailIdentifier
                                                                              )
                                                                                  ? 'btn-light disabled'
                                                                                  : 'btn-login-prime-o'
                                                                          ),
                                                                      onClick: () =>
                                                                          this.props.sendOtp(
                                                                              document.getElementById('emailIdentifier')
                                                                                  .value,
                                                                              !1
                                                                          ),
                                                                      disabled:
                                                                          null === (u = this.props) || void 0 === u
                                                                              ? void 0
                                                                              : u.isLoading,
                                                                      children: 'Get OTP',
                                                                  }),
                                                        ],
                                                    }),
                                                }),
                                                (null === (m = this.props) || void 0 === m
                                                    ? void 0
                                                    : m.emailIdentifier) &&
                                                !(null === (h = this.props) || void 0 === h
                                                    ? void 0
                                                    : h.emailAccessToken)
                                                    ? (0, r.jsxs)(r.Fragment, {
                                                          children: [
                                                              (0, r.jsx)('span', { className: 'hor-line' }),
                                                              (0, r.jsx)('div', {
                                                                  className: 'ver-email__otp',
                                                                  children: (0, r.jsxs)('div', {
                                                                      className: 'd-flex flex-column',
                                                                      children: [
                                                                          (0, r.jsx)(p, {
                                                                              tag: 'email',
                                                                              verifyOtp: this.props.verifyOtp,
                                                                              otpLength:
                                                                                  null ===
                                                                                      (g = this.props.widgetData) ||
                                                                                  void 0 === g
                                                                                      ? void 0
                                                                                      : g.otpLength,
                                                                              requestId: this.props.emailRequestId,
                                                                              notByEmail: !1,
                                                                          }),
                                                                          (
                                                                              null === (f = this.props) || void 0 === f
                                                                                  ? void 0
                                                                                  : f.hideEmailRetry
                                                                          )
                                                                              ? null
                                                                              : (0, r.jsx)(N, {
                                                                                    allowedRetry:
                                                                                        this.props.allowedRetry,
                                                                                    OTPRetryModes:
                                                                                        this.props.OTPRetryModes,
                                                                                    retryOtp: this.props.retryOtp,
                                                                                    emailRequestId:
                                                                                        this.props.emailRequestId,
                                                                                }),
                                                                      ],
                                                                  }),
                                                              }),
                                                          ],
                                                      })
                                                    : null,
                                            ],
                                        }),
                                        (null === (x = this.props) || void 0 === x ? void 0 : x.emailIdentifier) &&
                                        (null === (S = this.props) || void 0 === S ? void 0 : S.emailSuccessMessage) &&
                                        !(null === (C = this.props) || void 0 === C ? void 0 : C.emailAccessToken)
                                            ? (0, r.jsxs)('p', {
                                                  className: 'ver-email-message mt-2 ico-green c-fs-7',
                                                  children: [
                                                      null === (_ = this.props) || void 0 === _
                                                          ? void 0
                                                          : _.emailSuccessMessage,
                                                      ' ',
                                                      null === (I = this.props) || void 0 === I
                                                          ? void 0
                                                          : I.emailIdentifier,
                                                      '.',
                                                  ],
                                              })
                                            : null,
                                    ],
                                }),
                                (0, r.jsxs)('div', {
                                    className: 'step-two__phone  w-100  d-grid gap-2',
                                    children: [
                                        (0, r.jsx)('label', {
                                            htmlFor: 'contact',
                                            className: 'step-two__phone__lable c-fw-m c-fs-7',
                                            children: 'Verify Mobile number',
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: 'ver-phone d-flex gap-4 align-items-top flex-wrap',
                                            children: [
                                                (0, r.jsx)('div', {
                                                    className: 'ver-phone__main',
                                                    children: (0, r.jsxs)('div', {
                                                        className: 'ver-phone-main d-flex gap-3 ver-input flex-wrap',
                                                        children: [
                                                            (0, r.jsxs)('div', {
                                                                className:
                                                                    'ver-phone-main__input col ver-input__input' +
                                                                    ((
                                                                        null === (k = this.props) || void 0 === k
                                                                            ? void 0
                                                                            : k.smsAccessToken
                                                                    )
                                                                        ? ' pointer-none'
                                                                        : ''),
                                                                children: [
                                                                    (0, r.jsx)(v, {
                                                                        onInput: (e) => {
                                                                            let t =
                                                                                null == e ? void 0 : e.replace('+', '');
                                                                            t !== b &&
                                                                                ((b = t),
                                                                                this.props.identifierChange(!0));
                                                                        },
                                                                        required: !0,
                                                                        disabled:
                                                                            null === (D = this.props) || void 0 === D
                                                                                ? void 0
                                                                                : D.smsAccessToken,
                                                                        defaultValue: b ? '+' + b : '',
                                                                        setInvalid: (e) => (j = e),
                                                                        placeholder: 'Mobile Number*',
                                                                    }),
                                                                    (0, r.jsx)('span', {
                                                                        className: 'ver-phone-main__input__check',
                                                                        children:
                                                                            (null === (w = this.props) || void 0 === w
                                                                                ? void 0
                                                                                : w.smsAccessToken) &&
                                                                            (0, r.jsx)(d.ZSR, {
                                                                                className: 'ico-green',
                                                                            }),
                                                                    }),
                                                                ],
                                                            }),
                                                            (
                                                                null === (E = this.props) || void 0 === E
                                                                    ? void 0
                                                                    : E.smsAccessToken
                                                            )
                                                                ? (0, r.jsx)('button', {
                                                                      className:
                                                                          'ver-mobile-main__btn btn  btn-login-prime-o c-fw-m c-fs-7',
                                                                      onClick: (e) => this.props.identifierChange(!0),
                                                                      children: 'Change/Re-verify Mobile Number',
                                                                  })
                                                                : (0, r.jsx)('button', {
                                                                      className:
                                                                          'ver-mobile-main__btn btn c-fw-m c-fs-7 '.concat(
                                                                              (
                                                                                  null === (R = this.props) ||
                                                                                  void 0 === R
                                                                                      ? void 0
                                                                                      : R.smsIdentifier
                                                                              )
                                                                                  ? 'btn-light disabled'
                                                                                  : 'btn-login-prime-o'
                                                                          ),
                                                                      onClick: () =>
                                                                          j
                                                                              ? y.Am.error('Invalid mobile number.')
                                                                              : this.props.sendOtp(b, !0),
                                                                      disabled:
                                                                          null === (T = this.props) || void 0 === T
                                                                              ? void 0
                                                                              : T.isLoading,
                                                                      children: 'Get OTP',
                                                                  }),
                                                        ],
                                                    }),
                                                }),
                                                (null === (A = this.props) || void 0 === A
                                                    ? void 0
                                                    : A.smsIdentifier) &&
                                                !(null === (P = this.props) || void 0 === P ? void 0 : P.smsAccessToken)
                                                    ? (0, r.jsxs)(r.Fragment, {
                                                          children: [
                                                              (0, r.jsx)('span', { className: 'hor-line' }),
                                                              (0, r.jsx)('div', {
                                                                  className: 'ver-email__otp',
                                                                  children: (0, r.jsxs)('div', {
                                                                      className: 'd-flex flex-column',
                                                                      children: [
                                                                          (0, r.jsx)(p, {
                                                                              tag: 'sms',
                                                                              verifyOtp: this.props.verifyOtp,
                                                                              otpLength:
                                                                                  null ===
                                                                                      (V = this.props.widgetData) ||
                                                                                  void 0 === V
                                                                                      ? void 0
                                                                                      : V.otpLength,
                                                                              requestId: this.props.smsRequestId,
                                                                              notByEmail: !0,
                                                                          }),
                                                                          (
                                                                              null === (O = this.props) || void 0 === O
                                                                                  ? void 0
                                                                                  : O.hideMobileRetry
                                                                          )
                                                                              ? null
                                                                              : (0, r.jsx)(N, {
                                                                                    allowedRetry:
                                                                                        this.props.allowedRetry,
                                                                                    OTPRetryModes:
                                                                                        this.props.OTPRetryModes,
                                                                                    retryOtp: this.props.retryOtp,
                                                                                    smsRequestId:
                                                                                        this.props.smsRequestId,
                                                                                }),
                                                                      ],
                                                                  }),
                                                              }),
                                                          ],
                                                      })
                                                    : null,
                                            ],
                                        }),
                                        (null === (B = this.props) || void 0 === B ? void 0 : B.smsIdentifier) &&
                                        (null === (M = this.props) || void 0 === M ? void 0 : M.smsSuccessMessage) &&
                                        !(null === (L = this.props) || void 0 === L ? void 0 : L.smsAccessToken)
                                            ? (0, r.jsxs)('p', {
                                                  className: 'ver-email-message ico-green c-fs-7',
                                                  children: [
                                                      null === (q = this.props) || void 0 === q
                                                          ? void 0
                                                          : q.smsSuccessMessage,
                                                      ' +',
                                                      null === (Z = this.props) || void 0 === Z
                                                          ? void 0
                                                          : null === (F = Z.smsIdentifier) || void 0 === F
                                                            ? void 0
                                                            : F.replace('+', ''),
                                                  ],
                                              })
                                            : null,
                                    ],
                                }),
                                (0, r.jsx)('div', {
                                    style: { width: '360px' },
                                    children: (0, r.jsxs)('select', {
                                        autoComplete: 'on',
                                        className: 'form-select',
                                        'aria-label': 'Select Source',
                                        name: 'source',
                                        onChange: this.handleSourceChange,
                                        children: [
                                            (0, r.jsx)('option', { value: '', children: 'Select Source' }),
                                            (0, r.jsx)('option', {
                                                value: 'search_engine',
                                                children: 'Search engine (Google, Bing, Yahoo, etc)',
                                            }),
                                            (0, r.jsx)('option', {
                                                value: 'recommended_by_friend',
                                                children: 'Recommended by friend or colleague',
                                            }),
                                            (0, r.jsx)('option', { value: 'social_media', children: 'Social Media' }),
                                            (0, r.jsx)('option', { value: 'blog', children: 'Blog or Publication' }),
                                            (0, r.jsx)('option', { value: 'advertisement', children: 'Advertisement' }),
                                            (0, r.jsx)('option', { value: 'event', children: 'Event' }),
                                            (0, r.jsx)('option', { value: 'tiedelhincr', children: 'TiEDelhiNCR' }),
                                        ],
                                    }),
                                }),
                                (0, r.jsx)('div', {
                                    className: 'row',
                                    children: (0, r.jsxs)('div', {
                                        className: 'd-flex align-items-center gap-3',
                                        children: [
                                            (0, r.jsxs)('button', {
                                                className: 'btn btn-login-secondary c-fs-7',
                                                onClick: () => this.props.setStep(1),
                                                children: [' ', (0, r.jsx)(d.sG8, {}), 'Back'],
                                            }),
                                            (0, r.jsxs)('button', {
                                                className: 'btn btn-login-prime c-fs-7',
                                                onClick: () => {
                                                    var e, t, s;
                                                    return (
                                                        (null === (e = this.props) || void 0 === e
                                                            ? void 0
                                                            : e.smsAccessToken) &&
                                                        ((null === (t = this.props) || void 0 === t
                                                            ? void 0
                                                            : t.emailAccessToken) ||
                                                            (null === (s = this.props) || void 0 === s
                                                                ? void 0
                                                                : s.githubCode)) &&
                                                        this.props.validateUserForCompany()
                                                    );
                                                },
                                                disabled:
                                                    !(null === (H = this.props) || void 0 === H
                                                        ? void 0
                                                        : H.smsAccessToken) ||
                                                    (!(null === (U = this.props) || void 0 === U
                                                        ? void 0
                                                        : U.emailAccessToken) &&
                                                        !(null === (Y = this.props) || void 0 === Y
                                                            ? void 0
                                                            : Y.githubCode)) ||
                                                    (null === (G = this.props) || void 0 === G ? void 0 : G.isLoading),
                                                children: [' ', 'Next ', (0, r.jsx)(d.AeI, {})],
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                    });
                }
                constructor(e) {
                    super(e),
                        (0, n.Z)(this, 'handleSourceChange', (e) => {
                            e.target.value;
                            let t = (0, c.ej)('msg91_query');
                            t.includes('&source')
                                ? (0, c.d8)('msg91_query', t.replace(/&source=([\w_-])+/, '&source=' + sourceValue), 30)
                                : (0, c.d8)('msg91_query', t + '&source=' + sourceValue, 30);
                        }),
                        (this.state = {
                            emailIdentifier: e.emailIdentifierBackup || '',
                            smsIdentifier: e.smsIdentifierBackup || '',
                            sourceValue: '',
                        }),
                        (b = this.state.smsIdentifier);
                }
            }
            var C = s(5121),
                _ = s(16371);
            class I extends o.Component {
                componentDidMount() {
                    this.fetchServices()
                        .then((e) => {
                            var t;
                            let s = e.data.data;
                            this.setState({ services: s });
                            let i = this.state.formData.serviceNeeded;
                            if (
                                !i.length &&
                                (null === (t = this.props) || void 0 === t ? void 0 : t.preselectedService)
                            )
                                Object.entries(s).find((e) => {
                                    var t;
                                    let [s, i] = e;
                                    if (
                                        i
                                            .toLowerCase()
                                            .includes(
                                                null === (t = this.props) || void 0 === t
                                                    ? void 0
                                                    : t.preselectedService.toLowerCase()
                                            )
                                    )
                                        return (
                                            this.setState({
                                                defaultServiceNeeded: [{ value: +s, label: i }],
                                                formData: {
                                                    ...this.state.formData,
                                                    serviceNeeded: [{ value: +s, label: i }],
                                                },
                                                serviceRender: !1,
                                            }),
                                            setTimeout(() => {
                                                this.setState({ serviceRender: !0 });
                                            }, 1),
                                            !0
                                        );
                                });
                            else if (i.length) {
                                let e = [];
                                Object.entries(s).forEach((t) => {
                                    let [s, a] = t;
                                    i.includes(+s) && e.push({ value: +s, label: a });
                                }),
                                    this.setState({
                                        defaultServiceNeeded: e,
                                        formData: { ...this.state.formData, serviceNeeded: e },
                                        serviceRender: !1,
                                    }),
                                    setTimeout(() => {
                                        this.setState({ serviceRender: !0 });
                                    }, 1);
                            }
                        })
                        .catch((e) => {
                            console.error(e);
                        }),
                        this.fetchIndustry()
                            .then((e) => {
                                this.setState({ industries: e.data.data });
                            })
                            .catch((e) => {
                                console.error(e);
                            }),
                        this.getCountries()
                            .then((e) => {
                                this.setState({ countryNames: e.data.data });
                            })
                            .catch((e) => {
                                console.error(e);
                            });
                }
                componentDidUpdate(e, t) {
                    t.formData.country !== this.state.formData.country &&
                        this.fetchDataBasedOnCountry(this.state.formData.country),
                        t.formData.stateProvince !== this.state.formData.stateProvince &&
                            this.fetchDataBasedOnState(this.state.formData.stateProvince);
                }
                render() {
                    var e, t, s, i, a, l, n, o, c;
                    return (0, r.jsx)(r.Fragment, {
                        children: (0, r.jsxs)('div', {
                            className: 'trep-three d-flex flex-column gap-4',
                            children: [
                                (0, r.jsxs)('div', {
                                    className: 'step-three__progress d-flex align-items-center gap-4',
                                    children: [
                                        (0, r.jsxs)('div', {
                                            className:
                                                'ico-green align-items-center gap-2 c-fs-7 d-lg-flex hide-on-mobile',
                                            children: [
                                                (0, r.jsx)(d.ZSR, { className: 'ico-green svg-icon' }),
                                                ' Verify email & mobile number',
                                            ],
                                        }),
                                        (0, r.jsx)('span', {
                                            className: 'progress-line line-green d-lg-block hide-on-mobile',
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: 'd-flex  align-items-center gap-2 c-fs-7 ',
                                            children: [
                                                (0, r.jsx)(d.ZSR, { className: 'ico-grey svg-icon' }),
                                                'Enter details',
                                            ],
                                        }),
                                    ],
                                }),
                                (0, r.jsxs)('div', {
                                    className:
                                        'd-flex gap-4 flex-column  flex-lg-row detail-form__group step-three__main mt-3',
                                    children: [
                                        (0, r.jsxs)('div', {
                                            className: 'w-100 form-input-with-error',
                                            children: [
                                                (0, r.jsx)('input', {
                                                    type: 'text',
                                                    className: this.state.formErrorData.firstNameError
                                                        ? 'form-control input-error-display'
                                                        : 'form-control',
                                                    placeholder: 'First Name*',
                                                    name: 'firstName',
                                                    value: this.state.formData.firstName,
                                                    onChange: this.handleInputChange,
                                                }),
                                                (0, r.jsx)('div', {
                                                    className: 'text-danger input-error-message c-fs-7',
                                                    children: this.state.formErrorData.firstNameError,
                                                }),
                                            ],
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: 'w-100 form-input-with-error',
                                            children: [
                                                (0, r.jsx)('input', {
                                                    type: 'text',
                                                    className: this.state.formErrorData.lastNameError
                                                        ? 'form-control input-error-display'
                                                        : 'form-control',
                                                    placeholder: 'Last Name*',
                                                    name: 'lastName',
                                                    value: this.state.formData.lastName,
                                                    onChange: this.handleInputChange,
                                                }),
                                                (0, r.jsx)('div', {
                                                    className: 'text-danger input-error-message c-fs-7',
                                                    children: this.state.formErrorData.lastNameError,
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                this.props.invitations &&
                                    (0, r.jsx)('div', {
                                        className: 'd-grid gap-4 my-2',
                                        children:
                                            this.state.invitationRender &&
                                            Object.values(this.props.invitations).map((e) =>
                                                (0, r.jsxs)('div', {
                                                    className: 'd-flex flex-wrap gap-4 align-items-center',
                                                    children: [
                                                        (0, r.jsxs)('p', {
                                                            className: 'invitation-banner',
                                                            children: [
                                                                'You are invited to join',
                                                                ' ',
                                                                (0, r.jsx)('span', {
                                                                    className: 'c-fw-sb',
                                                                    children: e.companyName,
                                                                }),
                                                            ],
                                                        }),
                                                        ((null == e ? void 0 : e.accept) === null ||
                                                            (null == e ? void 0 : e.accept) === void 0) &&
                                                            (0, r.jsxs)('div', {
                                                                className: 'd-flex gap-4 align-items-center',
                                                                children: [
                                                                    (0, r.jsx)('button', {
                                                                        className: 'btn btn-sm btn-accept rounded',
                                                                        onClick: () => {
                                                                            (e.accept = !0),
                                                                                this.state.formData.acceptInviteForCompanies.push(
                                                                                    e.companyId
                                                                                ),
                                                                                this.handleInvitationSelection();
                                                                        },
                                                                        children: 'Accept',
                                                                    }),
                                                                    (0, r.jsx)('button', {
                                                                        className: 'btn btn-sm btn-reject rounded',
                                                                        onClick: () => {
                                                                            (e.accept = !1),
                                                                                this.state.formData.rejectInviteForCompanies.push(
                                                                                    e.companyId
                                                                                ),
                                                                                this.handleInvitationSelection();
                                                                        },
                                                                        children: 'Reject',
                                                                    }),
                                                                ],
                                                            }),
                                                        (null == e ? void 0 : e.accept) === !0 &&
                                                            (0, r.jsx)(d.ZSR, { className: 'ico-green svg-icon' }),
                                                        (null == e ? void 0 : e.accept) === !1 &&
                                                            (0, r.jsx)(d.B4e, { className: 'ico-red svg-icon' }),
                                                    ],
                                                })
                                            ),
                                    }),
                                (null === (e = this.props) || void 0 === e ? void 0 : e.invitations) &&
                                    !this.state.createCompany &&
                                    (0, r.jsx)('div', {
                                        children: (0, r.jsxs)('button', {
                                            className: 'btn btn-login-prime-o create-company-btn',
                                            onClick: () => this.setState({ createCompany: !0 }),
                                            children: [' ', 'Create New Company'],
                                        }),
                                    }),
                                (null === (t = this.props) || void 0 === t ? void 0 : t.invitations) &&
                                    this.state.createCompany &&
                                    (0, r.jsxs)('div', {
                                        className: 'd-flex align-items-center justify-content-between step-three__main',
                                        children: [
                                            (0, r.jsx)('span', {
                                                className: 'c-fs-5 fw-medium',
                                                children: ' Create Company ',
                                            }),
                                            (0, r.jsxs)('button', {
                                                className: 'btn c-fs-6 c-fw-r btn-default',
                                                onClick: () => this.setState({ createCompany: !1 }),
                                                children: [' ', 'Cancel'],
                                            }),
                                        ],
                                    }),
                                this.state.createCompany &&
                                    (0, r.jsx)('form', {
                                        className: 'step-three__main',
                                        children: (0, r.jsxs)('div', {
                                            className: 'detail-form d-flex flex-column gap-4',
                                            children: [
                                                (0, r.jsxs)('div', {
                                                    className: 'col-12 form-input-with-error',
                                                    children: [
                                                        (0, r.jsx)('input', {
                                                            type: 'text',
                                                            className: 'form-control',
                                                            placeholder: 'Company Name*',
                                                            name: 'companyName',
                                                            value: this.state.formData.companyName,
                                                            onChange: this.handleInputChange,
                                                        }),
                                                        (0, r.jsx)('div', {
                                                            className: 'text-danger input-error-message c-fs-7',
                                                            children: this.state.formErrorData.companyNameError,
                                                        }),
                                                    ],
                                                }),
                                                (0, r.jsxs)('div', {
                                                    className: 'col-12 form-input-with-error',
                                                    children: [
                                                        (0, r.jsxs)('select', {
                                                            autoComplete: 'on',
                                                            className: 'form-select',
                                                            'aria-label': 'Default Industry Type',
                                                            name: 'industryType',
                                                            value: this.state.formData.industryType,
                                                            onChange: this.handleInputChange,
                                                            children: [
                                                                (0, r.jsx)('option', {
                                                                    value: '',
                                                                    children: 'Select Industry Type*',
                                                                }),
                                                                this.state.industries &&
                                                                    Object.keys(this.state.industries).length > 0 &&
                                                                    (0, r.jsx)(r.Fragment, {
                                                                        children: this.state.industries.map((e) =>
                                                                            (0, r.jsx)(
                                                                                'option',
                                                                                { value: e.name, children: e.name },
                                                                                e.id
                                                                            )
                                                                        ),
                                                                    }),
                                                            ],
                                                        }),
                                                        (0, r.jsx)('div', {
                                                            className: 'text-danger input-error-message c-fs-7',
                                                            children: this.state.formErrorData.industryTypeError,
                                                        }),
                                                    ],
                                                }),
                                                (0, r.jsxs)('div', {
                                                    className: 'col-12 form-input-with-error',
                                                    children: [
                                                        this.state.serviceRender &&
                                                            (0, r.jsx)(_.ZP, {
                                                                isMulti: !0,
                                                                isClearable: !0,
                                                                instanceId: 'serviceNeeded',
                                                                defaultValue: this.state.defaultServiceNeeded,
                                                                onChange: (e) => {
                                                                    this.setState((t) => ({
                                                                        formData: {
                                                                            ...t.formData,
                                                                            serviceNeeded: e.map((e) => e.value),
                                                                        },
                                                                    }));
                                                                },
                                                                placeholder: 'Select Service Needed*',
                                                                options: this.state.services
                                                                    ? Object.entries(this.state.services).map((e) => {
                                                                          let [t, s] = e;
                                                                          return { value: +t, label: s };
                                                                      })
                                                                    : [],
                                                                className: 'chip-list-select',
                                                                classNamePrefix: 'signup_react_select',
                                                            }),
                                                        (0, r.jsx)('div', {
                                                            className: 'text-danger input-error-message c-fs-7',
                                                            children: this.state.formErrorData.serviceNeededError,
                                                        }),
                                                    ],
                                                }),
                                                (0, r.jsxs)('div', {
                                                    className:
                                                        'd-flex gap-4 flex-column flex-lg-row detail-form__group',
                                                    children: [
                                                        (0, r.jsxs)('div', {
                                                            className: 'w-100 form-input-with-error',
                                                            children: [
                                                                (0, r.jsxs)('select', {
                                                                    autoComplete: 'on',
                                                                    className: 'form-select',
                                                                    'aria-label': 'Default Country',
                                                                    name: 'country',
                                                                    value: this.state.formData.country,
                                                                    onChange: this.handleInputChange,
                                                                    children: [
                                                                        (0, r.jsx)('option', {
                                                                            value: '',
                                                                            children: 'Select Country*',
                                                                        }),
                                                                        this.state.countryNames.map((e) =>
                                                                            (0, r.jsx)(
                                                                                'option',
                                                                                { value: e.id, children: e.name },
                                                                                e.id
                                                                            )
                                                                        ),
                                                                        (0, r.jsx)(
                                                                            'option',
                                                                            { value: 'other', children: 'Other' },
                                                                            'other'
                                                                        ),
                                                                    ],
                                                                }),
                                                                (0, r.jsx)('div', {
                                                                    className: 'text-danger input-error-message c-fs-7',
                                                                    children: this.state.formErrorData.countryError,
                                                                }),
                                                            ],
                                                        }),
                                                        (0, r.jsxs)('div', {
                                                            className: 'w-100 form-input-with-error',
                                                            children: [
                                                                (0, r.jsxs)('select', {
                                                                    autoComplete: 'on',
                                                                    className: 'form-select',
                                                                    'aria-label': 'Default State/Province',
                                                                    name: 'stateProvince',
                                                                    value: this.state.formData.stateProvince,
                                                                    onChange: this.handleInputChange,
                                                                    children: [
                                                                        (0, r.jsx)('option', {
                                                                            value: '',
                                                                            children: 'Select State/Province*',
                                                                        }),
                                                                        this.state.countryData
                                                                            ? null === (s = this.state.countryData) ||
                                                                              void 0 === s
                                                                                ? void 0
                                                                                : s.data.map((e) =>
                                                                                      (0, r.jsx)(
                                                                                          'option',
                                                                                          {
                                                                                              value: e.id,
                                                                                              children: e.name,
                                                                                          },
                                                                                          e.id
                                                                                      )
                                                                                  )
                                                                            : null,
                                                                    ],
                                                                }),
                                                                (0, r.jsx)('div', {
                                                                    className: 'text-danger input-error-message c-fs-7',
                                                                    children: this.state.formErrorData.stateError,
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, r.jsxs)('div', {
                                                    className:
                                                        'd-flex gap-4 flex-column flex-lg-row detail-form__group',
                                                    children: [
                                                        (0, r.jsxs)('div', {
                                                            className: 'w-100 form-input-with-error',
                                                            children: [
                                                                (0, r.jsx)('input', {
                                                                    type: 'text',
                                                                    className: this.state.formErrorData.pincodeError
                                                                        ? 'form-control input-error-display'
                                                                        : 'form-control',
                                                                    placeholder: 'Pincode*',
                                                                    name: 'pincode',
                                                                    value: this.state.formData.pincode,
                                                                    onChange: this.handleInputChange,
                                                                }),
                                                                (0, r.jsx)('div', {
                                                                    className: 'text-danger input-error-message c-fs-7',
                                                                    children: this.state.formErrorData.pincodeError,
                                                                }),
                                                            ],
                                                        }),
                                                        (0, r.jsxs)('div', {
                                                            className: 'w-100 form-input-with-error',
                                                            children: [
                                                                (0, r.jsxs)('select', {
                                                                    autoComplete: 'on',
                                                                    className: 'form-select',
                                                                    'aria-label': 'Default City',
                                                                    name: 'city',
                                                                    value: this.state.formData.city,
                                                                    onChange: (e) => {
                                                                        var t;
                                                                        this.handleInputChange(e),
                                                                            this.setCityIdByCityName(
                                                                                null == e
                                                                                    ? void 0
                                                                                    : null === (t = e.target) ||
                                                                                        void 0 === t
                                                                                      ? void 0
                                                                                      : t.value
                                                                            );
                                                                    },
                                                                    children: [
                                                                        (0, r.jsx)('option', {
                                                                            value: '',
                                                                            children: 'Select City*',
                                                                        }),
                                                                        this.state.countryData
                                                                            ? null === (i = this.state.stateData) ||
                                                                              void 0 === i
                                                                                ? void 0
                                                                                : i.data.map((e) =>
                                                                                      (0, r.jsx)(
                                                                                          'option',
                                                                                          {
                                                                                              value: e.name,
                                                                                              children: e.name,
                                                                                          },
                                                                                          e.id
                                                                                      )
                                                                                  )
                                                                            : null,
                                                                        (0, r.jsx)('option', {
                                                                            value: 'other',
                                                                            children: 'Other',
                                                                        }),
                                                                    ],
                                                                }),
                                                                (0, r.jsx)('div', {
                                                                    className: 'text-danger input-error-message c-fs-7',
                                                                    children: this.state.formErrorData.cityError,
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                'other' == this.state.formData.city &&
                                                    (0, r.jsxs)('div', {
                                                        className: 'col-12  form-input-with-error',
                                                        children: [
                                                            (0, r.jsx)('input', {
                                                                type: 'text',
                                                                className: 'form-control',
                                                                placeholder: 'Enter your city*',
                                                                name: 'otherCity',
                                                                value: this.state.formData.otherCity,
                                                                onChange: this.handleInputChange,
                                                            }),
                                                            (0, r.jsx)('div', {
                                                                className: 'text-danger input-error-message c-fs-7',
                                                                children: this.state.formErrorData.otherCityError,
                                                            }),
                                                        ],
                                                    }),
                                                (0, r.jsxs)('div', {
                                                    className: 'col-12 form-input-with-error',
                                                    children: [
                                                        (0, r.jsx)('input', {
                                                            type: 'text',
                                                            className: 'form-control',
                                                            placeholder: 'Address*',
                                                            name: 'address',
                                                            value: this.state.formData.address,
                                                            onChange: this.handleInputChange,
                                                        }),
                                                        (0, r.jsx)('div', {
                                                            className: 'text-danger input-error-message c-fs-7',
                                                            children: this.state.formErrorData.addressError,
                                                        }),
                                                    ],
                                                }),
                                                (null ===
                                                    (a =
                                                        null === (l = this.state.formData.countryName) || void 0 === l
                                                            ? void 0
                                                            : l.toLowerCase()) || void 0 === a
                                                    ? void 0
                                                    : a.includes('united kingdom')) &&
                                                    (0, r.jsx)('div', {
                                                        className: 'col-12 form-input-with-error',
                                                        children: (0, r.jsx)('input', {
                                                            type: 'text',
                                                            className: 'form-control',
                                                            placeholder: 'VAT number',
                                                            name: 'vatNumber',
                                                            value: this.state.formData.vatNumber,
                                                            onChange: this.handleInputChange,
                                                        }),
                                                    }),
                                                (null ===
                                                    (n =
                                                        null === (o = this.state.formData.countryName) || void 0 === o
                                                            ? void 0
                                                            : o.toLowerCase()) || void 0 === n
                                                    ? void 0
                                                    : n.includes('india')) &&
                                                    (0, r.jsxs)('div', {
                                                        className: 'col-12 form-input-with-error',
                                                        children: [
                                                            (0, r.jsx)('input', {
                                                                type: 'text',
                                                                className: 'form-control',
                                                                placeholder: 'GST number',
                                                                name: 'gstNumber',
                                                                value: this.state.formData.gstNumber,
                                                                onChange: this.handleInputChange,
                                                            }),
                                                            (0, r.jsx)('div', {
                                                                className: 'text-danger input-error-message c-fs-7',
                                                                children: this.state.formErrorData.gstNumberError,
                                                            }),
                                                        ],
                                                    }),
                                            ],
                                        }),
                                    }),
                                (0, r.jsx)('div', {
                                    className: 'row',
                                    children: (0, r.jsxs)('div', {
                                        className: 'col-12',
                                        children: [
                                            (0, r.jsxs)('div', {
                                                className: 'form-check my-2 d-flex align-items-center gap-2',
                                                children: [
                                                    (0, r.jsx)('input', {
                                                        className: 'form-check-input',
                                                        type: 'checkbox',
                                                        value: 'true',
                                                        id: 'termsCheckBox',
                                                        name: 'agreeToTerms',
                                                        checked: this.state.formData.agreeToTerms,
                                                        onChange: this.handleInputChange,
                                                    }),
                                                    (0, r.jsxs)('p', {
                                                        className: 'form-check-label c-fs-7 c-fw-500 ps-0',
                                                        htmlFor: 'termsCheckBox',
                                                        children: [
                                                            'I agree to the',
                                                            ' ',
                                                            (0, r.jsx)('a', {
                                                                href: 'https://msg91.com/terms-of-use',
                                                                target: '_blank',
                                                                className: 'cp text-hover-underline',
                                                                children: 'terms of use',
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, r.jsxs)('div', {
                                                className: 'd-flex gap-3 mt-4',
                                                children: [
                                                    (0, r.jsxs)('button', {
                                                        className: 'btn btn-login-secondary c-fs-7',
                                                        onClick: () => this.props.setStep(2),
                                                        children: [' ', (0, r.jsx)(d.sG8, {}), 'Back'],
                                                    }),
                                                    (0, r.jsxs)('button', {
                                                        className: 'btn btn-login-prime c-fs-7',
                                                        type: 'button',
                                                        onClick: this.finalSubmit,
                                                        disabled:
                                                            !this.state.formData.agreeToTerms ||
                                                            (null === (c = this.props) || void 0 === c
                                                                ? void 0
                                                                : c.isLoading),
                                                        children: ['Next ', (0, r.jsx)(d.AeI, {})],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                    });
                }
                constructor(e) {
                    super(e),
                        (0, n.Z)(this, 'handleInputChange', (e) => {
                            let { name: t, value: s, type: i, checked: a } = e.target;
                            this.setState((e) => ({ formData: { ...e.formData, [t]: 'checkbox' === i ? a : s } }));
                        }),
                        (0, n.Z)(this, 'getCountries', async () => {
                            let e = await C.Z.get(''.concat('https://control.msg91.com', '/api/v5/web/getCountries'), {
                                headers: {
                                    Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
                                },
                            });
                            return e;
                        }),
                        (0, n.Z)(this, 'fetchServices', async () => {
                            let e = await C.Z.get(
                                ''.concat('https://control.msg91.com', '/api/v5/web/getAllServices'),
                                {
                                    headers: {
                                        Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
                                    },
                                }
                            );
                            return e;
                        }),
                        (0, n.Z)(this, 'fetchIndustry', async () => {
                            let e = await C.Z.get(''.concat('https://control.msg91.com', '/api/v5/web/getIndustry'), {
                                headers: {
                                    Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
                                },
                            });
                            return e;
                        }),
                        (0, n.Z)(this, 'fetchDataBasedOnCountry', async (e) => {
                            var t;
                            let s =
                                null ===
                                    (t = this.state.countryNames.find((e) => +e.id == +this.state.formData.country)) ||
                                void 0 === t
                                    ? void 0
                                    : t.name;
                            try {
                                let t = await C.Z.get(
                                    ''
                                        .concat('https://control.msg91.com', '/api/v5/web/getStatesByCountryId/')
                                        .concat(e),
                                    {
                                        headers: {
                                            Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
                                        },
                                    }
                                );
                                this.setState({
                                    countryData: t.data,
                                    formData: {
                                        ...this.state.formData,
                                        countryName: s,
                                        gstNumber: '',
                                        vatNumber: '',
                                        stateProvince: '',
                                        stateName: '',
                                        city: '',
                                    },
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        }),
                        (0, n.Z)(this, 'fetchDataBasedOnState', async (e) => {
                            var t, s, i, a;
                            let l =
                                null ===
                                    (t =
                                        null === (s = this.state) || void 0 === s
                                            ? void 0
                                            : null === (i = s.countryData) || void 0 === i
                                              ? void 0
                                              : null === (a = i.data) || void 0 === a
                                                ? void 0
                                                : a.find((t) => +t.id == +e)) || void 0 === t
                                    ? void 0
                                    : t.name;
                            try {
                                let t = await C.Z.get(
                                    ''.concat('https://control.msg91.com', '/api/v5/web/getCitiesByStateId/').concat(e),
                                    {
                                        headers: {
                                            Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
                                        },
                                    }
                                );
                                this.setState({
                                    stateData: t.data,
                                    formData: { ...this.state.formData, stateName: l },
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        }),
                        (0, n.Z)(this, 'setCityIdByCityName', (e) => {
                            var t, s, i, a;
                            let l =
                                null ===
                                    (t =
                                        null === (s = this.state) || void 0 === s
                                            ? void 0
                                            : null === (i = s.stateData) || void 0 === i
                                              ? void 0
                                              : null === (a = i.data) || void 0 === a
                                                ? void 0
                                                : a.find((t) => t.name === e)) || void 0 === t
                                    ? void 0
                                    : t.id;
                            this.setState((e) => ({ formData: { ...e.formData, cityId: l } }));
                        }),
                        (0, n.Z)(this, 'validateFirstName', () => {
                            let { firstName: e } = this.state.formData;
                            return '' === e.trim()
                                ? 'First Name is required'
                                : /^[A-Za-z]+$/.test(e)
                                  ? ''
                                  : 'First Name should only contain letters';
                        }),
                        (0, n.Z)(this, 'validateLastName', () => {
                            let { lastName: e } = this.state.formData;
                            return '' === e.trim()
                                ? 'Last Name is required'
                                : /^[A-Za-z]+$/.test(e)
                                  ? ''
                                  : 'Last Name should only contain letters';
                        }),
                        (0, n.Z)(this, 'validateGSTNumber', () => {
                            var e;
                            let { gstNumber: t, countryName: s } = this.state.formData;
                            return (null === (e = null == s ? void 0 : s.toLowerCase()) || void 0 === e
                                ? void 0
                                : e.includes('india')) &&
                                t &&
                                !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(t)
                                ? 'Invalid GST Number'
                                : '';
                        }),
                        (0, n.Z)(this, 'validatePincode', () => {
                            let { pincode: e } = this.state.formData;
                            return e
                                ? /^[0-9 A-Z a-z -]{4,11}$/.test(e)
                                    ? ''
                                    : 'Pincode must be a valid'
                                : 'Pincode is required';
                        }),
                        (0, n.Z)(this, 'validateRequired', (e, t) => {
                            var s, i;
                            let a = null === (s = this.state.formData) || void 0 === s ? void 0 : s[e];
                            return (null === (i = null == a ? void 0 : a.trim()) || void 0 === i
                                ? void 0
                                : i.length) === 0
                                ? t + ' is required'
                                : '';
                        }),
                        (0, n.Z)(this, 'validateMinMax', (e, t, s, i) => {
                            var a;
                            let l = null === (a = this.state.formData) || void 0 === a ? void 0 : a[e];
                            return null != s && +s && (null == l ? void 0 : l.length) < s
                                ? ''.concat(t, ' must be more than ').concat(s, ' characters')
                                : null != i && +i && (null == l ? void 0 : l.length) > i
                                  ? ''.concat(t, ' should be less than ').concat(i, ' characters')
                                  : '';
                        }),
                        (0, n.Z)(this, 'finalSubmit', () => {
                            var e;
                            let t = {
                                firstNameError:
                                    this.validateFirstName() ||
                                    this.validateMinMax('firstName', 'First Name', null, 50),
                                lastNameError:
                                    this.validateLastName() || this.validateMinMax('lastName', 'Last Name', null, 50),
                                gstNumberError: this.validateGSTNumber(),
                                pincodeError: this.validatePincode(),
                                companyNameError: this.validateRequired('companyName', 'Company Name'),
                                industryTypeError: this.validateRequired('industryType', 'Industry Type'),
                                serviceNeededError:
                                    (null === (e = this.state.formData.serviceNeeded) || void 0 === e
                                        ? void 0
                                        : e.length) === 0
                                        ? 'Need to select atleast one service'
                                        : '',
                                countryError: this.validateRequired('country', 'Country'),
                                stateError: this.validateRequired('stateName', 'State'),
                                cityError: this.validateRequired('city', 'City'),
                                otherCityError:
                                    'other' === this.state.formData.city
                                        ? this.validateRequired('otherCity', 'City')
                                        : '',
                                addressError:
                                    this.validateRequired('address', 'Address') ||
                                    this.validateMinMax('address', 'Address', 5, 100),
                            };
                            this.state.createCompany &&
                                this.setState((e) => ({ formErrorData: { ...e.formErrorData, ...t } })),
                                (this.state.createCompany && Object.values(t).find((e) => Boolean(e))) ||
                                    (!this.props.invitations ||
                                    this.state.createCompany ||
                                    this.state.formData.acceptInviteForCompanies.length
                                        ? this.props.finalSubmit(this.state.formData, this.state.createCompany)
                                        : y.Am.error('Accept atleast one invitation or create a new company'));
                        }),
                        (0, n.Z)(this, 'handleInvitationSelection', () => {
                            this.setState({ invitationRender: !1 }),
                                setTimeout(() => {
                                    this.setState({ invitationRender: !0 });
                                }, 1);
                        }),
                        (this.state = {
                            formData: (null == e ? void 0 : e.formData) || {
                                firstName: '',
                                lastName: '',
                                companyName: '',
                                industryType: '',
                                serviceNeeded: [],
                                country: '',
                                countryName: '',
                                stateProvince: '',
                                stateName: '',
                                pincode: '',
                                city: '',
                                cityId: '',
                                otherCity: '',
                                address: '',
                                gstNumber: '',
                                vatNumber: '',
                                agreeToTerms: !1,
                                acceptInviteForCompanies: [],
                                rejectInviteForCompanies: [],
                            },
                            formErrorData: {
                                firstNameError: '',
                                lastNameError: '',
                                gstNumberError: '',
                                pincodeError: '',
                                companyNameError: '',
                                industryTypeError: '',
                                serviceNeededError: '',
                                countryError: '',
                                stateError: '',
                                cityError: '',
                                otherCityError: '',
                                addressError: '',
                            },
                            invitationRender: !0,
                            defaultServiceNeeded: null,
                            serviceRender: !0,
                            createCompany: !e.invitations,
                            countryNames: [],
                        });
                }
            }
            let k = 'https://control.msg91.com/api/nexusRedirection.php?session=:session',
                D = { Sms: '11', Voice: '4', Email: '3', Whatsapp: '12' },
                w = /^[+]?[0-9]{7,15}$/,
                E =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            class R extends o.Component {
                retryOtp(e, t, s) {
                    window.retryOtp(
                        e,
                        (e) => {
                            s
                                ? this.setState({ smsSuccessMessage: 'OTP resent successfully.' })
                                : this.setState({ emailSuccessMessage: 'OTP resent successfully.' });
                        },
                        (e) => {
                            (null == e ? void 0 : e.code) === 704 &&
                                this.setState({ [s ? 'hideMobileRetry' : 'hideEmailRetry']: !0 }),
                                y.Am.error(null == e ? void 0 : e.message);
                        },
                        t
                    );
                }
                render() {
                    var e, t, s, i, a, l, n, o, c, m, h, p, v, g, f, x, y;
                    return (0, r.jsx)(r.Fragment, {
                        children: (0, r.jsxs)('section', {
                            className: 'signup d-flex flex-column flex-md-row-reverse ',
                            children: [
                                (0, r.jsxs)('div', {
                                    className: 'signup__right d-flex gap-4 flex-column ',
                                    children: [
                                        (0, r.jsx)('img', {
                                            src: '/images/msgOriginalsvg.png',
                                            className: 'signup__right__logo d-block d-md-none',
                                        }),
                                        1 === this.state.activeStep &&
                                            (0, r.jsx)('h1', {
                                                className: 'signup__right__heading c-fs-2 mobile-heading d-md-none',
                                                children: 'Signup to avail a complete suite of MSG91 products',
                                            }),
                                        4 === this.state.activeStep
                                            ? (0, r.jsx)('h1', {
                                                  className: 'signup__right__heading c-fs-2 heading text-green mt-3',
                                                  children: 'Account created Successfully!',
                                              })
                                            : (0, r.jsx)('h1', {
                                                  className: 'signup__right__heading c-fs-2 heading ',
                                                  children: 'Create an account',
                                              }),
                                        (0, r.jsxs)('div', {
                                            className: 'signup__right__main c-text',
                                            children: [
                                                1 === this.state.activeStep && (0, r.jsx)(u, { setStep: this.setStep }),
                                                (2 === this.state.activeStep || 1 === this.state.activeStep) &&
                                                    (0, r.jsx)('div', {
                                                        className: 2 !== this.state.activeStep ? 'd-none' : '',
                                                        children: (0, r.jsx)(S, {
                                                            sendOtp: this.sendOtp,
                                                            setStep: this.setStep,
                                                            verifyOtp: this.verifyOtp,
                                                            widgetData: this.state.widgetData,
                                                            allowedRetry: this.state.allowedRetry,
                                                            retryOtp: this.retryOtp,
                                                            validateUserForCompany: this.validateUserForCompany,
                                                            identifierChange: this.identifierChange,
                                                            OTPRetryModes: D,
                                                            smsRequestId:
                                                                null === (e = this.state) || void 0 === e
                                                                    ? void 0
                                                                    : e.smsRequestId,
                                                            emailRequestId:
                                                                null === (t = this.state) || void 0 === t
                                                                    ? void 0
                                                                    : t.emailRequestId,
                                                            smsIdentifier:
                                                                null === (s = this.state) || void 0 === s
                                                                    ? void 0
                                                                    : s.smsIdentifier,
                                                            emailIdentifier:
                                                                null === (i = this.state) || void 0 === i
                                                                    ? void 0
                                                                    : i.emailIdentifier,
                                                            smsSuccessMessage:
                                                                null === (a = this.state) || void 0 === a
                                                                    ? void 0
                                                                    : a.smsSuccessMessage,
                                                            emailSuccessMessage:
                                                                null === (l = this.state) || void 0 === l
                                                                    ? void 0
                                                                    : l.emailSuccessMessage,
                                                            smsAccessToken:
                                                                null === (n = this.state) || void 0 === n
                                                                    ? void 0
                                                                    : n.smsAccessToken,
                                                            emailAccessToken:
                                                                null === (o = this.state) || void 0 === o
                                                                    ? void 0
                                                                    : o.emailAccessToken,
                                                            signupByGitHub:
                                                                null === (c = this.state) || void 0 === c
                                                                    ? void 0
                                                                    : c.signupByGitHub,
                                                            githubCode:
                                                                null === (m = this.state) || void 0 === m
                                                                    ? void 0
                                                                    : m.githubCode,
                                                            smsIdentifierBackup:
                                                                null === (h = this.state) || void 0 === h
                                                                    ? void 0
                                                                    : h.smsIdentifierBackup,
                                                            emailIdentifierBackup:
                                                                null === (p = this.state) || void 0 === p
                                                                    ? void 0
                                                                    : p.emailIdentifierBackup,
                                                            hideMobileRetry:
                                                                null === (v = this.state) || void 0 === v
                                                                    ? void 0
                                                                    : v.hideMobileRetry,
                                                            hideEmailRetry:
                                                                null === (g = this.state) || void 0 === g
                                                                    ? void 0
                                                                    : g.hideEmailRetry,
                                                            isLoading:
                                                                null === (f = this.state) || void 0 === f
                                                                    ? void 0
                                                                    : f.isLoading,
                                                        }),
                                                    }),
                                                3 === this.state.activeStep &&
                                                    (0, r.jsx)(I, {
                                                        invitations: this.state.invitations,
                                                        preselectedService: this.state.preselectedService,
                                                        setStep: this.setStep,
                                                        finalSubmit: this.finalSubmit,
                                                        formData:
                                                            null === (x = this.state) || void 0 === x
                                                                ? void 0
                                                                : x.thirdStepData,
                                                        isLoading:
                                                            null === (y = this.state) || void 0 === y
                                                                ? void 0
                                                                : y.isLoading,
                                                    }),
                                                4 === this.state.activeStep &&
                                                    (0, r.jsxs)('div', {
                                                        className: 'trep-three d-flex flex-column gap-lg-3 gap-0',
                                                        children: [
                                                            (0, r.jsx)('div', {
                                                                className: 'hide-on-mobile',
                                                                children: (0, r.jsxs)('div', {
                                                                    className:
                                                                        'step-three__progress d-flex align-items-center gap-2',
                                                                    children: [
                                                                        (0, r.jsxs)('div', {
                                                                            className:
                                                                                'text-green align-items-center gap-2 c-fs-7 d-lg-flex',
                                                                            children: [
                                                                                (0, r.jsx)(d.ZSR, {
                                                                                    className: 'ico-green svg-icon',
                                                                                }),
                                                                                ' Verify email & mobile number',
                                                                            ],
                                                                        }),
                                                                        (0, r.jsx)('span', {
                                                                            className:
                                                                                'progress-line line-green d-lg-block',
                                                                        }),
                                                                        (0, r.jsxs)('div', {
                                                                            className:
                                                                                'text-green d-flex align-items-center gap-2 c-fs-7',
                                                                            children: [
                                                                                (0, r.jsx)(d.ZSR, {
                                                                                    className: 'ico-green svg-icon',
                                                                                }),
                                                                                (0, r.jsx)('span', {
                                                                                    children: 'Enter details',
                                                                                }),
                                                                            ],
                                                                        }),
                                                                    ],
                                                                }),
                                                            }),
                                                            (0, r.jsx)('p', {
                                                                className: 'step-three__reddirect c-fw-m c-fs-7 mt-3',
                                                                children: 'Redirecting...',
                                                            }),
                                                        ],
                                                    }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, r.jsxs)('div', {
                                    className: ''.concat(
                                        1 !== this.state.activeStep
                                            ? 'signup__left d-lg-flex d-md-flex gap-4 flex-column hide-on-mobile'
                                            : 'signup__left d-lg-flex d-md-flex gap-4 flex-column'
                                    ),
                                    children: [
                                        (0, r.jsx)('img', {
                                            src: '/images/msgOriginalsvg.png',
                                            className: 'signup__left__logo d-none d-md-block',
                                        }),
                                        (0, r.jsx)('h1', {
                                            className: 'signup__left__heading c-fs-2 heading d-none d-md-block c-fw-r',
                                            children: 'Signup to avail a complete suite of MSG91 products',
                                        }),
                                        (0, r.jsx)('p', {
                                            className: 'signup__left__que c-fs-8 fw-medium c-text',
                                            children: 'What can you build with MSG91?',
                                        }),
                                        (0, r.jsx)('div', {
                                            className: 'signup__left__features d-grid gap-2',
                                            children: (0, r.jsxs)('ul', {
                                                className: 'list-unstyled d-grid gap-3 c-fs-4',
                                                children: [
                                                    (0, r.jsxs)('li', {
                                                        className: 'd-flex align-items-center gap-2 c-fs-7 c-text',
                                                        children: [
                                                            (0, r.jsx)(d.vB0, { className: 'icon-done ico-primary' }),
                                                            'Programmable SMS',
                                                        ],
                                                    }),
                                                    (0, r.jsxs)('li', {
                                                        className: 'd-flex align-items-center gap-2 c-fs-7 c-text',
                                                        children: [
                                                            (0, r.jsx)(d.vB0, { className: 'icon-done ico-primary' }),
                                                            'Customer Contact Center',
                                                        ],
                                                    }),
                                                    (0, r.jsxs)('li', {
                                                        className: 'd-flex align-items-center gap-2 c-fs-7 c-text',
                                                        children: [
                                                            (0, r.jsx)(d.vB0, { className: 'icon-done ico-primary' }),
                                                            'Virtual Number',
                                                        ],
                                                    }),
                                                    (0, r.jsxs)('li', {
                                                        className: 'd-flex align-items-center gap-2 c-fs-7 c-text',
                                                        children: [
                                                            (0, r.jsx)(d.vB0, { className: 'icon-done ico-primary' }),
                                                            'Automated user segmentation',
                                                        ],
                                                    }),
                                                    (0, r.jsxs)('li', {
                                                        className: 'd-flex align-items-center gap-2 c-fs-7 c-text',
                                                        children: [
                                                            (0, r.jsx)(d.vB0, { className: 'icon-done ico-primary' }),
                                                            'OTP invisible verification',
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        }),
                                        (0, r.jsxs)('p', {
                                            className: 'signup__left__que c-fs-8 c-text',
                                            children: [
                                                'Trusted by ',
                                                (0, r.jsx)('span', { className: 'fw-medium', children: '30000+' }),
                                                ' startups and enterprises',
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    });
                }
                constructor(e) {
                    var t;
                    super(e),
                        (0, n.Z)(this, 'componentDidMount', () => {
                            var e;
                            this.otpWidgetSetup();
                            let t = (0, c.NF)(null === (e = this.props) || void 0 === e ? void 0 : e.browserPathCase);
                            (null == t ? void 0 : t.service) && this.setState({ preselectedService: t.service });
                            try {
                                let e = { session: (0, c.ej)('sessionId') },
                                    t = {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(e),
                                    };
                                fetch('https://control.msg91.com/api/v5/nexus/checkSession', t)
                                    .then((e) => (null == e ? void 0 : e.json()))
                                    .then((t) => {
                                        (null == t ? void 0 : t.status) === 'success' &&
                                            (location.href = k.replace(':session', e.session));
                                    });
                            } catch (e) {
                                console.log('No Session Found');
                            }
                        }),
                        (0, n.Z)(this, 'setStep', (e) => {
                            if (1 === e)
                                this.setState({
                                    emailIdentifier: null,
                                    emailAccessToken: null,
                                    smsIdentifier: null,
                                    smsAccessToken: null,
                                    signupByGitHub: !1,
                                    githubCode: null,
                                    githubState: null,
                                    thirdStepData: null,
                                    smsIdentifierBackup: null,
                                    emailIdentifierBackup: null,
                                    hideMobileRetry: null,
                                    hideEmailRetry: null,
                                    isLoading: !1,
                                });
                            else if (2 === e) {
                                var t, s;
                                if (
                                    (null === (t = this.state) || void 0 === t ? void 0 : t.signupByGitHub) &&
                                    !(null === (s = this.state) || void 0 === s ? void 0 : s.githubCode)
                                )
                                    return this.setStep(1);
                            } else
                                3 === e &&
                                    this.setState({
                                        emailAccessToken: null,
                                        smsAccessToken: null,
                                        githubCode: null,
                                        githubState: null,
                                        smsSuccessMessage: null,
                                        emailSuccessMessage: null,
                                        smsIdentifierBackup: this.state.smsIdentifier || '',
                                        emailIdentifierBackup: this.state.emailIdentifier || '',
                                        smsIdentifier: null,
                                        emailIdentifier: null,
                                    });
                            this.setState({ activeStep: e });
                        }),
                        (0, n.Z)(this, 'otpWidgetSetup', () => {
                            let e = document.getElementsByTagName('head')[0],
                                t = new Date().getTime(),
                                s = document.createElement('script');
                            (s.type = 'text/javascript'),
                                (s.src = ''
                                    .concat('https://control.msg91.com/app/assets/otp-provider/otp-provider.js', '?v=')
                                    .concat(t)),
                                (s.onload = () => {
                                    window.initSendOTP({
                                        widgetId: '336c676d7537343338383336',
                                        tokenAuth: '125TtMrV40q6Sq6576e46fP1',
                                        success: (e) => {},
                                        failure: (e) => {},
                                        exposeMethods: !0,
                                    });
                                    let e = setInterval(() => {
                                        let t = window.getWidgetData();
                                        if (t) {
                                            var s, i, a, l;
                                            this.setState({
                                                widgetData: window.getWidgetData(),
                                                allowedRetry: {
                                                    email:
                                                        null == t
                                                            ? void 0
                                                            : null === (s = t.processes) || void 0 === s
                                                              ? void 0
                                                              : s.find((e) => {
                                                                    var t, s;
                                                                    return (
                                                                        (null === (t = e.processVia) || void 0 === t
                                                                            ? void 0
                                                                            : t.value) === '5' &&
                                                                        (null === (s = e.channel) || void 0 === s
                                                                            ? void 0
                                                                            : s.value) === D.Email
                                                                    );
                                                                }),
                                                    whatsApp:
                                                        null == t
                                                            ? void 0
                                                            : null === (i = t.processes) || void 0 === i
                                                              ? void 0
                                                              : i.find((e) => {
                                                                    var t, s;
                                                                    return (
                                                                        (null === (t = e.processVia) || void 0 === t
                                                                            ? void 0
                                                                            : t.value) === '5' &&
                                                                        (null === (s = e.channel) || void 0 === s
                                                                            ? void 0
                                                                            : s.value) === D.Whatsapp
                                                                    );
                                                                }),
                                                    voice:
                                                        null == t
                                                            ? void 0
                                                            : null === (a = t.processes) || void 0 === a
                                                              ? void 0
                                                              : a.find((e) => {
                                                                    var t, s;
                                                                    return (
                                                                        (null === (t = e.processVia) || void 0 === t
                                                                            ? void 0
                                                                            : t.value) === '5' &&
                                                                        (null === (s = e.channel) || void 0 === s
                                                                            ? void 0
                                                                            : s.value) === D.Voice
                                                                    );
                                                                }),
                                                    sms:
                                                        null == t
                                                            ? void 0
                                                            : null === (l = t.processes) || void 0 === l
                                                              ? void 0
                                                              : l.find((e) => {
                                                                    var t, s;
                                                                    return (
                                                                        (null === (t = e.processVia) || void 0 === t
                                                                            ? void 0
                                                                            : t.value) === '5' &&
                                                                        (null === (s = e.channel) || void 0 === s
                                                                            ? void 0
                                                                            : s.value) === D.Sms
                                                                    );
                                                                }),
                                                },
                                            }),
                                                clearInterval(e);
                                        }
                                    }, 1e3);
                                }),
                                e.appendChild(s);
                        }),
                        (0, n.Z)(this, 'identifierChange', (e) => {
                            if (e) {
                                (this.state.smsIdentifier || this.state.smsAccessToken) &&
                                    this.setState({ smsIdentifier: null, smsAccessToken: null });
                                return;
                            }
                            (this.state.emailIdentifier || this.state.emailAccessToken) &&
                                this.setState({ emailIdentifier: null, emailAccessToken: null }),
                                this.state.signupByGitHub &&
                                    this.setState({ signupByGitHub: !1, githubCode: null, githubState: null });
                        }),
                        (0, n.Z)(this, 'sendOtp', (e, t) => {
                            if (!RegExp(E).test(e) && !t) {
                                y.Am.error('Invalid email address.');
                                return;
                            }
                            if (!RegExp(w).test(e) && t) {
                                y.Am.error('Invalid mobile number.');
                                return;
                            }
                            this.setState({ isLoading: !0 }),
                                window.sendOtp(
                                    e,
                                    (s) => {
                                        t
                                            ? this.setState({
                                                  smsRequestId: null == s ? void 0 : s.message,
                                                  smsIdentifier: e,
                                                  smsSuccessMessage: 'OTP has been successfully sent to',
                                                  hideMobileRetry: null,
                                                  isLoading: !1,
                                              })
                                            : this.setState({
                                                  emailRequestId: null == s ? void 0 : s.message,
                                                  emailIdentifier: e,
                                                  emailSuccessMessage: 'OTP has been successfully sent to',
                                                  hideEmailRetry: null,
                                                  isLoading: !1,
                                              });
                                    },
                                    (e) => {
                                        y.Am.error(null == e ? void 0 : e.message), this.setState({ isLoading: !1 });
                                    }
                                );
                        }),
                        (0, n.Z)(this, 'verifyOtp', (e, t, s) => {
                            window.verifyOtp(
                                ''.concat(e),
                                (e) => {
                                    s
                                        ? this.setState({
                                              smsAccessToken: e.message,
                                              smsSuccessMessage: 'Mobile verified.',
                                          })
                                        : this.setState({
                                              emailAccessToken: e.message,
                                              emailSuccessMessage: 'Email verified.',
                                          });
                                },
                                (e) => {
                                    y.Am.error(null == e ? void 0 : e.message);
                                },
                                t
                            );
                        }),
                        (0, n.Z)(this, 'validateUserForCompany', () => {
                            var e, t, s, i, a;
                            if (
                                !this.state.smsAccessToken ||
                                (!this.state.emailAccessToken &&
                                    !(null === (e = this.state) || void 0 === e ? void 0 : e.githubCode))
                            ) {
                                y.Am.error('Email and Mobile should be verified.');
                                return;
                            }
                            let l = 'https://control.msg91.com/api/v5/nexus/validateEmailSignUp',
                                n = Object.fromEntries(
                                    null !==
                                        (a =
                                            null ===
                                                (t =
                                                    null ===
                                                        (s =
                                                            null === (i = (0, c.ej)('msg91_query')) || void 0 === i
                                                                ? void 0
                                                                : i.replace('?', '')) || void 0 === s
                                                        ? void 0
                                                        : s.split('&')) || void 0 === t
                                                ? void 0
                                                : t.map((e) => e.split('='))) && void 0 !== a
                                        ? a
                                        : []
                                ),
                                r = { session: (0, c.ej)('sessionId'), mobileToken: this.state.smsAccessToken, ...n };
                            this.state.githubCode && this.state.signupByGitHub
                                ? ((r.code = this.state.githubCode),
                                  (r.state = this.state.githubState),
                                  (l = 'https://control.msg91.com/api/v5/nexus/validateGithubSignUp'))
                                : (r.emailToken = this.state.emailAccessToken);
                            let o = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(r),
                            };
                            this.setState({ isLoading: !0 }),
                                fetch(l, o)
                                    .then((e) => (null == e ? void 0 : e.json()))
                                    .then((e) => {
                                        var t, s, i, a, l, n, r, o, d, c, u, m, h;
                                        this.setSession(e),
                                            this.setState({
                                                sessionDetails:
                                                    null == e
                                                        ? void 0
                                                        : null === (t = e.data) || void 0 === t
                                                          ? void 0
                                                          : t.sessionDetails,
                                                isLoading: !1,
                                                emailAccessToken: null,
                                                smsAccessToken: null,
                                                githubCode: null,
                                                githubState: null,
                                                smsSuccessMessage: null,
                                                emailSuccessMessage: null,
                                                smsIdentifierBackup: this.state.smsIdentifier || '',
                                                emailIdentifierBackup: this.state.emailIdentifier || '',
                                                smsIdentifier: null,
                                                emailIdentifier: null,
                                            }),
                                            (null == e ? void 0 : e.status) === 'success'
                                                ? (null == e
                                                      ? void 0
                                                      : null === (s = e.data) || void 0 === s
                                                        ? void 0
                                                        : null === (i = s.data) || void 0 === i
                                                          ? void 0
                                                          : i.nextStep) === 'createNewCompany'
                                                    ? this.setStep(3)
                                                    : (null == e
                                                            ? void 0
                                                            : null === (a = e.data) || void 0 === a
                                                              ? void 0
                                                              : null === (l = a.data) || void 0 === l
                                                                ? void 0
                                                                : l.nextStep) === 'loginIntoExistingAccount'
                                                      ? (this.setState({ isLoading: !0 }),
                                                        (location.href = k.replace(
                                                            ':session',
                                                            null == e
                                                                ? void 0
                                                                : null === (o = e.data) || void 0 === o
                                                                  ? void 0
                                                                  : null === (d = o.sessionDetails) || void 0 === d
                                                                    ? void 0
                                                                    : d.PHPSESSID
                                                        )))
                                                      : (null == e
                                                            ? void 0
                                                            : null === (n = e.data) || void 0 === n
                                                              ? void 0
                                                              : null === (r = n.data) || void 0 === r
                                                                ? void 0
                                                                : r.nextStep) === 'hasInvitations' &&
                                                        (this.setState({
                                                            invitations:
                                                                null == e
                                                                    ? void 0
                                                                    : null === (c = e.data) || void 0 === c
                                                                      ? void 0
                                                                      : null === (u = c.data) || void 0 === u
                                                                        ? void 0
                                                                        : u.invitations,
                                                        }),
                                                        this.setStep(3))
                                                : (null == e ? void 0 : e.hasError) &&
                                                  (y.Am.error(
                                                      null !==
                                                          (h =
                                                              null == e
                                                                  ? void 0
                                                                  : null === (m = e.errors) || void 0 === m
                                                                    ? void 0
                                                                    : m[0]) && void 0 !== h
                                                          ? h
                                                          : null == e
                                                            ? void 0
                                                            : e.errors
                                                  ),
                                                  this.state.signupByGitHub &&
                                                      setTimeout(() => {
                                                          this.setStep(1);
                                                      }, 200));
                                    })
                                    .catch((e) => {
                                        this.setState({
                                            isLoading: !1,
                                            emailAccessToken: null,
                                            smsAccessToken: null,
                                            githubCode: null,
                                            githubState: null,
                                            smsSuccessMessage: null,
                                            emailSuccessMessage: null,
                                            smsIdentifierBackup: this.state.smsIdentifier || '',
                                            emailIdentifierBackup: this.state.emailIdentifier || '',
                                            smsIdentifier: null,
                                            emailIdentifier: null,
                                        }),
                                            console.error(e);
                                    });
                        }),
                        (0, n.Z)(this, 'setSession', (e) => {
                            var t, s;
                            let i =
                                null == e
                                    ? void 0
                                    : null === (t = e.data) || void 0 === t
                                      ? void 0
                                      : null === (s = t.sessionDetails) || void 0 === s
                                        ? void 0
                                        : s.PHPSESSID;
                            i && (0, c.d8)('sessionId', i, 30);
                        }),
                        (0, n.Z)(this, 'finalSubmit', (e, t) => {
                            this.setState({
                                thirdStepData: { ...e, acceptInviteForCompanies: [], rejectInviteForCompanies: [] },
                            });
                            let s = {
                                    companyDetails: t
                                        ? {
                                              industry: null == e ? void 0 : e.industryType,
                                              state: null == e ? void 0 : e.stateName,
                                              cityId: (null == e ? void 0 : e.cityId) || '0',
                                              customCity: null == e ? void 0 : e.otherCity,
                                              country: null == e ? void 0 : e.countryName,
                                              city:
                                                  (null == e ? void 0 : e.city) === 'other'
                                                      ? ''
                                                      : null == e
                                                        ? void 0
                                                        : e.city,
                                              zipcode: null == e ? void 0 : e.pincode,
                                              address: null == e ? void 0 : e.address,
                                              gstNo: null == e ? void 0 : e.gstNumber,
                                              countryId: null == e ? void 0 : e.country,
                                              stateId: null == e ? void 0 : e.stateProvince,
                                              companyName: null == e ? void 0 : e.companyName,
                                              service: null == e ? void 0 : e.serviceNeeded,
                                              vatNo: null == e ? void 0 : e.vatNumber,
                                          }
                                        : {},
                                    userDetails: {
                                        firstName: null == e ? void 0 : e.firstName,
                                        lastName: null == e ? void 0 : e.lastName,
                                    },
                                    acceptInviteForCompanies: e.acceptInviteForCompanies,
                                    rejectInviteForCompanies: e.rejectInviteForCompanies,
                                    session: (0, c.ej)('sessionId'),
                                },
                                i = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(s),
                                };
                            this.setState({ isLoading: !0 }),
                                fetch('https://control.msg91.com/api/v5/nexus/finalRegister', i)
                                    .then((e) => (null == e ? void 0 : e.json()))
                                    .then((e) => {
                                        if (
                                            (this.setState({ isLoading: !1 }),
                                            this.setSession(e),
                                            (null == e ? void 0 : e.status) === 'success')
                                        )
                                            this.setStep(4),
                                                setTimeout(() => {
                                                    var t, s;
                                                    location.href = k.replace(
                                                        ':session',
                                                        null == e
                                                            ? void 0
                                                            : null === (t = e.data) || void 0 === t
                                                              ? void 0
                                                              : null === (s = t.sessionDetails) || void 0 === s
                                                                ? void 0
                                                                : s.PHPSESSID
                                                    );
                                                }, 10);
                                        else if (null == e ? void 0 : e.hasError) {
                                            var t, s;
                                            y.Am.error(
                                                null !==
                                                    (s =
                                                        null == e
                                                            ? void 0
                                                            : null === (t = e.errors) || void 0 === t
                                                              ? void 0
                                                              : t[0]) && void 0 !== s
                                                    ? s
                                                    : null == e
                                                      ? void 0
                                                      : e.errors
                                            );
                                        }
                                    })
                                    .catch((e) => {
                                        this.setState({ isLoading: !1 }), console.error(e);
                                    });
                        }),
                        (this.sendOtp = this.sendOtp.bind(this)),
                        (this.retryOtp = this.retryOtp.bind(this)),
                        (this.verifyOtp = this.verifyOtp.bind(this));
                    let s = (0, c.NF)(null === (t = this.props) || void 0 === t ? void 0 : t.browserPathCase);
                    this.state = {
                        activeStep: (null == s ? void 0 : s.code) ? 2 : 1,
                        signupByGitHub: null != s && !!s.githubsignup,
                        githubCode: null == s ? void 0 : s.code,
                        githubState: null == s ? void 0 : s.state,
                        widgetData: null,
                        allowedRetry: null,
                        emailAccessToken: null,
                        smsAccessToken: null,
                        preselectedService: null,
                        isLoading: !1,
                    };
                }
            }
            var T = R;
        },
    },
    function (e) {
        e.O(0, [1876, 5121, 6272, 9774, 2888, 179], function () {
            return e((e.s = 98588));
        }),
            (_N_E = e.O());
    },
]);
