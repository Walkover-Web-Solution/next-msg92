'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7306],
    {
        12108: function (e, a, n) {
            n.d(a, {
                Z: function () {
                    return s;
                },
            });
            var r = n(85893);
            function s(e) {
                let { faqData: a, faq: n } = e;
                return (0, r.jsx)(r.Fragment, {
                    children: (0, r.jsxs)('div', {
                        className: ' my-5 d-grid gap-4',
                        children: [
                            (0, r.jsx)('h2', {
                                className: 'c-fs-1',
                                children: (null == n ? void 0 : n.heading) || 'Frequently Asked Questions',
                            }),
                            (0, r.jsx)('div', {
                                className: 'accordion',
                                id: 'accordionExample',
                                children: a.map((e, a) =>
                                    (0, r.jsxs)(
                                        'div',
                                        {
                                            className: 'accordion-item  border-start-0 border-end-0',
                                            children: [
                                                (0, r.jsx)('h2', {
                                                    className: 'accordion-header',
                                                    id: 'heading'.concat(a),
                                                    children: (0, r.jsx)('button', {
                                                        className: 'accordion-button collapsed c-fs-3 c-fw-m',
                                                        type: 'button',
                                                        'data-bs-toggle': 'collapse',
                                                        'data-bs-target': '#collapse'.concat(a),
                                                        'aria-expanded': 'true',
                                                        'aria-controls': 'collapse'.concat(a),
                                                        children: null == e ? void 0 : e.que,
                                                    }),
                                                }),
                                                (0, r.jsx)('div', {
                                                    id: 'collapse'.concat(a),
                                                    className:
                                                        'accordion-collapse border border-start-1 border-end-1 collapse \n                  ',
                                                    'aria-labelledby': 'heading'.concat(a),
                                                    'data-bs-parent': '#accordionExample',
                                                    children: (0, r.jsx)('div', {
                                                        className: 'accordion-body c-fs-4',
                                                        dangerouslySetInnerHTML: {
                                                            __html:
                                                                null == e
                                                                    ? void 0
                                                                    : e.des.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                                                        },
                                                    }),
                                                }),
                                            ],
                                        },
                                        'heading'.concat(a)
                                    )
                                ),
                            }),
                        ],
                    }),
                });
            }
        },
        67306: function (e, a, n) {
            n.d(a, {
                Z: function () {
                    return U;
                },
            });
            var r = n(85893),
                s = n(67294),
                c = n(5121),
                o = n(73066),
                l = n(5434),
                t = n(41664),
                i = n.n(t),
                d = n(15269),
                m = JSON.parse(
                    '{"otp":[{"que":"What is the pricing of the OTP Widget?","des":"The pricing of the OTP Widget is primarily determined by the volume of OTPs sent and the specific channels utilized, including SMS, Voice, Email, and WhatsApp. Charges are incurred based on the quantity of OTPs sent through each respective channel."},{"que":"Is there a fixed monthly subscription fee for using the OTP Widget?","des":" No, there is no monthly subscription fee associated with the OTP Widget."},{"que":"Are there different pricing plans available based on usage levels?","des":"Yes, different pricing plans are available based on usage, and if you have a substantial volume, we can customize the pricing to suit your needs."},{"que":"How is the pricing structured for Voice OTPs?","des":"Voice OTPs may have a separate pricing structure, often based on factors such as the number of voice calls made, and whether a global or local caller ID is used."},{"que":"Are there any additional charges for using advanced security features, such as Google Captcha validation?","des":"While some providers may charge additional fees for features like Google Captcha validation to boost OTP Widget security, we do not impose any additional charges for captcha validation."},{"que":"Can I get a customized pricing plan based on my specific business needs?","des":"Many service providers offer customized pricing plans for businesses with unique requirements. Contact the sales team to discuss your needs and explore tailored pricing options."},{"que":"Are there any hidden fees or charges that I should be aware of? dsd","des":":No, there are no hidden additional charges for the widget, except for the actual sending of OTPs through any channel. To send OTPs, you simply need to subscribe or add balance to your account"},{"que":"Is there a trial period or demo available for the testing of otp widget ?","des":"We do not offer a trial period or demo for testing the widget. However, you can add funds to your wallet with a low amount for testing purposes."}],"email":[{"que":"Do I get 5000 free emails only once or every month?","des":"With the free plan subscription, you will receive 5000 free emails every month."},{"que":"I purchased the starter plan and received 100,000 emails for a month. What if my email traffic exceeds 100,000 in a month?","des":"In the starter plan, you get 100,000 emails and 100 email validations. If you send more than 100,000 emails in a month, you will be charged an additional 0.02/- per email. Additionally, if you perform more than 100 email validations, you will be charged 0.25/- per validation. This amount will be deducted from your MSG91 wallet. The Extra section in every email plans displays this information."},{"que":"In the plan I bought, there are two limits: a Monthly Spending Limit and a Postpaid Billing Limit. Could you explain the difference between them and how they\'re used?","des":"You, as the user, can set the monthly spending limit, while the postpaid billing limit can only be set by the MSG91. If you have exhausted the emails and validations allotted according to your subscribed plan and wish to send more emails or validate additional email IDs, MSG91 will deduct the excess usage amount from your wallet when you reach 90% of your postpaid billing limit. After this deduction, your postpaid billing limit will reset to the default. If your consumption continues and reaches 90% of your postpaid billing limit again, another deduction will occur from your wallet. In this situation, the total maximum deduction aligns with the monthly spending limit you\'ve set."},{"que":"I am a free plan user, and I don\'t get any email validations in it. How can I use validations?","des":"If you want to go beyond the benefits provided in any plan, check the extra section of that plan for details. To use email validation in the free plan, you\'ll need to pay 0.35 per email validation, which will be deducted from your MSG91 wallet."},{"que":"I subscribed to the starter plan, which should give me 1 Lac emails at 2000/-. However, after subscribing, I noticed that the deducted amount was less than 2000, and I received fewer than 1 Lac emails.","des":"Each plan operates on a monthly basis, starting from the first date to the last. If you purchase a plan in the middle of the month, the system will calculate charges and benefits on a pro-rated basis, considering the remaining days in the month."}],"voice":[{"que":"How can I get in touch for further assistance or custom pricing plans, and are there any volume-based discounts for high call volumes?","des":"For further assistance or to discuss custom pricing plans, please reach out to our support team at [support@email.com]. Yes, we do offer volume-based discounts for high call volumes. Contact our sales team for personalized solutions."},{"que":"Do the listed prices include taxes or additional fees?","des":"The listed prices for our voice services are exclusive of taxes and additional fees. Taxes and fees, if applicable, will be clearly communicated during the billing process."},{"que":"Is there a difference in pricing for landline and mobile numbers?","des":"Our pricing structure may vary based on the destination type, including landline and mobile numbers. Please refer to our pricing page or contact our sales team for specific details."},{"que":"Inbound calls are free on the Hello panel. If I take a call on a mobile phone, how will it be charged?","des":"While inbound calls on the Hello panel are free, taking a call on a mobile phone will be subject to the applicable outbound call rates as per our pricing. Check our pricing details for specific rates."},{"que":"Difference between local and international prices?","des":"Local and international call prices differ based on the destination. Local calls typically refer to calls within the same country, while international calls involve calls to numbers outside the country. Refer to our pricing page for detailed information on local and international rates."}],"hello":[{"que":"How to subscribe to your Hello Plan.","des":"In the Hello panel, click on the subscription tab, that is available on the left corner. It will open the page of the current plan and also the option to purchase a new plan. Click on that and you will be able to select from monthly and yearly options. You can directly subscribe to the plan from the website itself. There go to hello service and click on get started, and fill the necessary details and subscribe to the plan."},{"que":"Are there any charges for AI Chat Bot?","des":"No, There are no charges for Chat Bot, we are only charged for basic and premium plans. You can use the chat bot in a free plan till 50 tickets in Hello, after that you have to upgrade your hello plan. Basically we are providing the chat Bot free for Trial purposes. You can use this Chat Bot in Whatsapp, Instagram, Chat Widget on your Website, Facebook and so on. So test the Chat Bot Now."},{"que":" Are there any extra charges for Instagram/ Facebook Inbox?","des":"<p>You can use inboxes that are available in your Hello Plan for Instagram or Whatsapp. The number of inboxes assigned in each plan.</p><ul><li>Free Plan- 2 inboxes</li><li>Basic Plan- 2 inboxes</li><li>Premium Plan- 3 inboxes</li></ul><p>But in case you already have used the assigned inboxes you can always purchase a new inbox in basic and premium plan for rupees 500 each.</p><p>In case of a free plan you won\'t be able to purchase new inboxes. You have to upgrade the plan if you want the extra inbox.</p>"},{"que":"What are the charges for tickets and extra tickets in Hello?","des":"<p>We are providing monthly tickets with each plan and in case they end, you can also use extra tickets which you pay in postpaid billing.</p><p>Here are the number of tickets assigned in each plan:</p><ul><li>Free Plan- 50 tickets/monthly</li><li>Basic Plan- 1000 tickets/monthly</li><li>Premium Plan- 2000 tickets/monthly</li></ul><p>Extra Charges for each ticket in different plans:</p><ul><li>Free Plan- there is no option for more tickets in free plans as you have to upgrade the Hello Plan to Basic or Premium as per your choice.</li><li>Basic Plan- ₹0.5 per ticket</li><li>Premium Plan- ₹0.75 per ticket</li></ul>"},{"que":" Can I customize the Hello Plan?","des":"Yes, you can have a customized plan for hello. Click on the link to schedule the meeting with the sales heads."}]}'
                ),
                u = n(12108);
            let h = (e) => {
                var a, n;
                let {
                    subscriptionEmail: c,
                    fetchSubscriptionEmail: o,
                    currency: l,
                    setSubscriptionEmail: t,
                    countryCode: i,
                } = e;
                'US' === i || 'AE' === i || 'SG' === i || 'PH' === i || 'BR' === i || 'ES' === i
                    ? ((a = 'USD'), (n = '$'))
                    : 'GB' === i
                      ? ((a = 'GBP'), (n = '\xa3'))
                      : 'IN' === i
                        ? ((a = 'INR'), (n = '₹'))
                        : ((a = 'USD'), (n = '$'));
                let [h, x] = (0, s.useState)(a),
                    [f, g] = (0, s.useState)('Monthly'),
                    [y, b] = (0, s.useState)(n);
                return (
                    (0, s.useEffect)(() => {
                        (0, d.Wi)();
                    }, []),
                    (0, r.jsxs)(r.Fragment, {
                        children: [
                            (0, r.jsx)('div', {
                                className: 'header d-flex  gap-3 justify-content-between flex-wrap mb-4',
                                children: (0, r.jsxs)('span', {
                                    className: 'd-flex',
                                    children: [
                                        (0, r.jsx)('h2', {
                                            className: ' '.concat(
                                                'Monthly' === f ? 'active' : null,
                                                '  text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer'
                                            ),
                                            onClick: () => g('Monthly'),
                                            children: 'Monthly',
                                        }),
                                        (0, r.jsx)('h2', {
                                            className: ' '.concat(
                                                'Yearly' === f ? 'active' : null,
                                                '  text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer'
                                            ),
                                            onClick: () => g('Yearly'),
                                            children: 'Yearly (20% off)',
                                        }),
                                    ],
                                }),
                            }),
                            (0, r.jsx)('div', {
                                className: 'w-100 card-container d-grid email-card-grid flex-wrap gap-4',
                                children:
                                    (null == c ? void 0 : c.length) &&
                                    (null == c
                                        ? void 0
                                        : c.map((e, a) => {
                                              var n, s;
                                              return (0, r.jsx)(r.Fragment, {
                                                  children:
                                                      (null == e
                                                          ? void 0
                                                          : null === (n = e.plan_amounts) || void 0 === n
                                                            ? void 0
                                                            : n.length) &&
                                                      (null == e
                                                          ? void 0
                                                          : null === (s = e.plan_amounts) || void 0 === s
                                                            ? void 0
                                                            : s.map((n, s) => {
                                                                  var c, o;
                                                                  if (
                                                                      (null == n
                                                                          ? void 0
                                                                          : null === (c = n.currency) || void 0 === c
                                                                            ? void 0
                                                                            : c.short_name) === l &&
                                                                      (null == n
                                                                          ? void 0
                                                                          : null === (o = n.plan_type) || void 0 === o
                                                                            ? void 0
                                                                            : o.name) === f
                                                                  )
                                                                      return (0, r.jsx)(r.Fragment, {
                                                                          children:
                                                                              0 === a
                                                                                  ? (0, r.jsx)(p, {
                                                                                        plan: e,
                                                                                        planAmount: n,
                                                                                        currency: l,
                                                                                        selectedMode: f,
                                                                                    })
                                                                                  : (0, r.jsx)(v, {
                                                                                        plan: e,
                                                                                        planAmount: n,
                                                                                        currency: l,
                                                                                        selectedMode: f,
                                                                                    }),
                                                                      });
                                                              })),
                                              });
                                          })),
                            }),
                            (0, r.jsxs)('div', {
                                className: 'connect-personalized my-4',
                                children: [
                                    (0, r.jsx)('span', {
                                        className: 'talk-to-sales d-block c-fs-4 fw-medium',
                                        children: 'Connect with our team for a personalized plan to meet your needs.',
                                    }),
                                    (0, r.jsx)('button', {
                                        type: 'button',
                                        'data-bs-toggle': 'modal',
                                        'data-bs-target': '#sales-modal',
                                        className:
                                            'btn btn-outline-dark mt-2 mb-4 c-fs-5 border border-dark rounded-1 px-3 py-1',
                                        children: 'Talk to Sales',
                                    }),
                                    (0, r.jsx)('br', {}),
                                    (0, r.jsxs)('a', {
                                        className: 'more-about',
                                        href: '/email',
                                        children: [
                                            (0, r.jsx)('img', {
                                                src: '/img/icon/link.svg',
                                                alt: 'Know more',
                                                className: 'icon me-2',
                                            }),
                                            (0, r.jsx)('span', { children: 'Know more about Email' }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, r.jsx)(u.Z, { faqData: null == m ? void 0 : m.email }),
                        ],
                    })
                );
            };
            function p(e) {
                var a, n, s, c, o;
                let { plan: t, planAmount: i, currency: d, selectedMode: m } = e;
                return (0, r.jsx)(r.Fragment, {
                    children: (0, r.jsxs)('div', {
                        className:
                            'p-4 bg-white rounded-2 free_card d-flex flex-lg-row flex-column justify-content-between gap-4   ',
                        children: [
                            (0, r.jsxs)('div', {
                                className: 'd-flex flex-column gap-2',
                                children: [
                                    (0, r.jsx)('h3', {
                                        className: 'fs-4 fw-semibold',
                                        children: null == t ? void 0 : t.name,
                                    }),
                                    (0, r.jsxs)('span', {
                                        className: 'text-dark mt-auto fw-medium',
                                        children: [
                                            ' ',
                                            (0, r.jsxs)('span', {
                                                className: 'c-fs-1 fw-bold text-green ',
                                                children: [
                                                    null == i
                                                        ? void 0
                                                        : null === (a = i.currency) || void 0 === a
                                                          ? void 0
                                                          : a.symbol,
                                                    ' ',
                                                    null == i ? void 0 : i.plan_amount,
                                                    ' ',
                                                ],
                                            }),
                                            m,
                                        ],
                                    }),
                                    (0, r.jsx)('a', {
                                        href: '/signup?service=Email',
                                        target: '_blank',
                                        className:
                                            'btn btn-outline-dark fw-semibold rounded-1 border border-dark px-3 d-lg-none d-flex btn-ft mt-auto',
                                        children: 'Get Started',
                                    }),
                                ],
                            }),
                            (0, r.jsx)('hr', {
                                className: 'w-100 d-block d-lg-none ',
                                style: { borderColor: 'rgba(0, 0, 0, 0.6)' },
                            }),
                            (0, r.jsxs)('div', {
                                className: 'd-flex flex-column gap-2',
                                children: [
                                    (0, r.jsx)('h4', { class: 'c-fs-4 c-fw-sb', children: 'Included' }),
                                    (0, r.jsx)('div', {
                                        className: 'd-flex flex-column',
                                        children:
                                            (null == t
                                                ? void 0
                                                : null === (n = t.plan_services) || void 0 === n
                                                  ? void 0
                                                  : n.length) &&
                                            (null == t
                                                ? void 0
                                                : null === (s = t.plan_services) || void 0 === s
                                                  ? void 0
                                                  : s.map((e, a) => {
                                                        var n, s, c, o;
                                                        return (0, r.jsx)(r.Fragment, {
                                                            children:
                                                                (null == e
                                                                    ? void 0
                                                                    : null === (n = e.service_credit) || void 0 === n
                                                                      ? void 0
                                                                      : null === (s = n.service_credit_rates) ||
                                                                          void 0 === s
                                                                        ? void 0
                                                                        : s.length) &&
                                                                (null == e
                                                                    ? void 0
                                                                    : null === (c = e.service_credit) || void 0 === c
                                                                      ? void 0
                                                                      : null === (o = c.service_credit_rates) ||
                                                                          void 0 === o
                                                                        ? void 0
                                                                        : o.map((a, n) => {
                                                                              var s, c, o, l, t;
                                                                              if (
                                                                                  (null == a
                                                                                      ? void 0
                                                                                      : null === (s = a.currency) ||
                                                                                          void 0 === s
                                                                                        ? void 0
                                                                                        : s.short_name) === d
                                                                              )
                                                                                  return (0, r.jsxs)('span', {
                                                                                      children: [
                                                                                          null ===
                                                                                              (c =
                                                                                                  null == e
                                                                                                      ? void 0
                                                                                                      : null ===
                                                                                                              (o =
                                                                                                                  e.service_credit) ||
                                                                                                          void 0 === o
                                                                                                        ? void 0
                                                                                                        : o
                                                                                                              .service_credit_rates[0]) ||
                                                                                          void 0 === c
                                                                                              ? void 0
                                                                                              : c.free_credits,
                                                                                          ' ',
                                                                                          null == e
                                                                                              ? void 0
                                                                                              : null ===
                                                                                                      (l =
                                                                                                          e.service_credit) ||
                                                                                                  void 0 === l
                                                                                                ? void 0
                                                                                                : null ===
                                                                                                        (t =
                                                                                                            l.service) ||
                                                                                                    void 0 === t
                                                                                                  ? void 0
                                                                                                  : t.name,
                                                                                          '/month',
                                                                                      ],
                                                                                  });
                                                                          })),
                                                        });
                                                    })),
                                    }),
                                ],
                            }),
                            (0, r.jsxs)('div', {
                                className: 'd-flex flex-column gap-2',
                                children: [
                                    (0, r.jsx)('h4', { class: 'c-fs-4 c-fw-sb', children: 'Extra @' }),
                                    (0, r.jsx)('div', {
                                        className: 'd-flex flex-column',
                                        children:
                                            (null == t
                                                ? void 0
                                                : null === (c = t.plan_services) || void 0 === c
                                                  ? void 0
                                                  : c.length) &&
                                            (null == t
                                                ? void 0
                                                : null === (o = t.plan_services) || void 0 === o
                                                  ? void 0
                                                  : o.map((e, a) => {
                                                        var n, s, c, o;
                                                        return (0, r.jsx)(r.Fragment, {
                                                            children:
                                                                (null == e
                                                                    ? void 0
                                                                    : null === (n = e.service_credit) || void 0 === n
                                                                      ? void 0
                                                                      : null === (s = n.service_credit_rates) ||
                                                                          void 0 === s
                                                                        ? void 0
                                                                        : s.length) &&
                                                                (null == e
                                                                    ? void 0
                                                                    : null === (c = e.service_credit) || void 0 === c
                                                                      ? void 0
                                                                      : null === (o = c.service_credit_rates) ||
                                                                          void 0 === o
                                                                        ? void 0
                                                                        : o.map((a, n) => {
                                                                              var s, c, o, i, m, u, h, p;
                                                                              if (
                                                                                  (null == a
                                                                                      ? void 0
                                                                                      : null === (s = a.currency) ||
                                                                                          void 0 === s
                                                                                        ? void 0
                                                                                        : s.short_name) === d
                                                                              )
                                                                                  return (0, r.jsx)('span', {
                                                                                      children: (
                                                                                          null == t
                                                                                              ? void 0
                                                                                              : t.postpaid_allowed
                                                                                      )
                                                                                          ? (0, r.jsxs)(r.Fragment, {
                                                                                                children: [
                                                                                                    (0, r.jsx)(l.vB0, {
                                                                                                        className:
                                                                                                            'text-green me-2 prcing-check',
                                                                                                    }),
                                                                                                    null == a
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (c =
                                                                                                                    a.currency) ||
                                                                                                            void 0 === c
                                                                                                          ? void 0
                                                                                                          : c.symbol,
                                                                                                    null == a
                                                                                                        ? void 0
                                                                                                        : a.follow_up_rate,
                                                                                                    '/',
                                                                                                    null == e
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (o =
                                                                                                                    e.service_credit) ||
                                                                                                            void 0 === o
                                                                                                          ? void 0
                                                                                                          : null ===
                                                                                                                  (i =
                                                                                                                      o.service) ||
                                                                                                              void 0 ===
                                                                                                                  i
                                                                                                            ? void 0
                                                                                                            : i.name,
                                                                                                    (
                                                                                                        null == e
                                                                                                            ? void 0
                                                                                                            : null ===
                                                                                                                    (m =
                                                                                                                        e.service_credit) ||
                                                                                                                void 0 ===
                                                                                                                    m
                                                                                                              ? void 0
                                                                                                              : null ===
                                                                                                                      (u =
                                                                                                                          m.service) ||
                                                                                                                  void 0 ===
                                                                                                                      u
                                                                                                                ? void 0
                                                                                                                : u.is_rental
                                                                                                    )
                                                                                                        ? '/month'
                                                                                                        : '',
                                                                                                ],
                                                                                            })
                                                                                          : (0, r.jsxs)(r.Fragment, {
                                                                                                children: [
                                                                                                    (0, r.jsx)(l.FU5, {
                                                                                                        className:
                                                                                                            'text-danger me-2 prcing-check',
                                                                                                    }),
                                                                                                    'No Extra ',
                                                                                                    ' ',
                                                                                                    null == e
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (h =
                                                                                                                    e.service_credit) ||
                                                                                                            void 0 === h
                                                                                                          ? void 0
                                                                                                          : null ===
                                                                                                                  (p =
                                                                                                                      h.service) ||
                                                                                                              void 0 ===
                                                                                                                  p
                                                                                                            ? void 0
                                                                                                            : p.name,
                                                                                                ],
                                                                                            }),
                                                                                  });
                                                                          })),
                                                        });
                                                    })),
                                    }),
                                ],
                            }),
                            (0, r.jsx)('a', {
                                href: '/signup?service=Email',
                                target: '_blank',
                                className:
                                    'btn btn-outline-dark fw-semibold rounded-1 border border-dark px-3 d-lg-flex d-none w-fit mt-auto',
                                children: 'Get Started',
                            }),
                        ],
                    }),
                });
            }
            function v(e) {
                var a, n, s, c, o;
                let { plan: t, planAmount: i, currency: d, selectedMode: m } = e;
                return (0, r.jsx)(r.Fragment, {
                    children: (0, r.jsxs)('div', {
                        className: 'card d-flex align-items-start rounded-2 bg-white p-4  gap-3 '.concat(
                            (null == t ? void 0 : t.most_popular) ? 'border-2' : 'border-0'
                        ),
                        children: [
                            (0, r.jsxs)('div', {
                                className: 'd-flex flex-column gap-2 w-100',
                                children: [
                                    (0, r.jsxs)('div', {
                                        className: 'd-flex flex-wrap gap-2 populartag_cont w-100',
                                        children: [
                                            (0, r.jsx)('h3', {
                                                className: 'fs-4 fw-semibold email_plan_name w-100',
                                                children: null == t ? void 0 : t.name,
                                            }),
                                            t &&
                                                (null == t ? void 0 : t.most_popular) &&
                                                (0, r.jsx)('span', {
                                                    className:
                                                        'populartag_tag border border-1 border-dark c-fw-sb rounded-5 px-3 btn-ft ms-auto',
                                                    children: 'Popular',
                                                }),
                                        ],
                                    }),
                                    (0, r.jsxs)('span', {
                                        className: 'text-dark mt-auto fw-medium',
                                        children: [
                                            ' ',
                                            (0, r.jsxs)('span', {
                                                className: 'c-fs-1 fw-bold text-green ',
                                                children: [
                                                    null == i
                                                        ? void 0
                                                        : null === (a = i.currency) || void 0 === a
                                                          ? void 0
                                                          : a.symbol,
                                                    ' ',
                                                    null == i ? void 0 : i.plan_amount,
                                                    ' ',
                                                ],
                                            }),
                                            m,
                                        ],
                                    }),
                                    (0, r.jsx)('a', {
                                        href: '/signup?service=Email',
                                        target: '_blank',
                                        className: 'btn '.concat(
                                            (null == t ? void 0 : t.most_popular) ? 'btn-dark' : 'btn-outline-dark',
                                            ' mt-2 rounded-md btn-ft'
                                        ),
                                        children: 'Get Started',
                                    }),
                                ],
                            }),
                            (0, r.jsx)('hr', { className: 'w-100', style: { borderColor: 'rgba(0, 0, 0, 0.6)' } }),
                            (0, r.jsxs)('div', {
                                className: 'd-flex flex-column gap-2',
                                children: [
                                    (0, r.jsx)('h4', { class: 'c-fs-4 c-fw-sb', children: 'Included' }),
                                    (0, r.jsx)('div', {
                                        className: 'd-flex flex-column',
                                        children:
                                            (null == t
                                                ? void 0
                                                : null === (n = t.plan_services) || void 0 === n
                                                  ? void 0
                                                  : n.length) &&
                                            (null == t
                                                ? void 0
                                                : null === (s = t.plan_services) || void 0 === s
                                                  ? void 0
                                                  : s.map((e, a) => {
                                                        var n, s, c, o;
                                                        return (0, r.jsx)(r.Fragment, {
                                                            children:
                                                                (null == e
                                                                    ? void 0
                                                                    : null === (n = e.service_credit) || void 0 === n
                                                                      ? void 0
                                                                      : null === (s = n.service_credit_rates) ||
                                                                          void 0 === s
                                                                        ? void 0
                                                                        : s.length) &&
                                                                (null == e
                                                                    ? void 0
                                                                    : null === (c = e.service_credit) || void 0 === c
                                                                      ? void 0
                                                                      : null === (o = c.service_credit_rates) ||
                                                                          void 0 === o
                                                                        ? void 0
                                                                        : o.map((a, n) => {
                                                                              var s, c, o, l, t;
                                                                              if (
                                                                                  (null == a
                                                                                      ? void 0
                                                                                      : null === (s = a.currency) ||
                                                                                          void 0 === s
                                                                                        ? void 0
                                                                                        : s.short_name) === d
                                                                              )
                                                                                  return (0, r.jsxs)('span', {
                                                                                      children: [
                                                                                          null ===
                                                                                              (c =
                                                                                                  null == e
                                                                                                      ? void 0
                                                                                                      : null ===
                                                                                                              (o =
                                                                                                                  e.service_credit) ||
                                                                                                          void 0 === o
                                                                                                        ? void 0
                                                                                                        : o
                                                                                                              .service_credit_rates[0]) ||
                                                                                          void 0 === c
                                                                                              ? void 0
                                                                                              : c.free_credits,
                                                                                          ' ',
                                                                                          null == e
                                                                                              ? void 0
                                                                                              : null ===
                                                                                                      (l =
                                                                                                          e.service_credit) ||
                                                                                                  void 0 === l
                                                                                                ? void 0
                                                                                                : null ===
                                                                                                        (t =
                                                                                                            l.service) ||
                                                                                                    void 0 === t
                                                                                                  ? void 0
                                                                                                  : t.name,
                                                                                          '/month',
                                                                                      ],
                                                                                  });
                                                                          })),
                                                        });
                                                    })),
                                    }),
                                ],
                            }),
                            (0, r.jsxs)('div', {
                                className: 'd-flex flex-column gap-2',
                                children: [
                                    (0, r.jsx)('h4', { class: 'c-fs-4 c-fw-sb', children: 'Extra @' }),
                                    (0, r.jsx)('div', {
                                        className: 'd-flex flex-column',
                                        children:
                                            (null == t
                                                ? void 0
                                                : null === (c = t.plan_services) || void 0 === c
                                                  ? void 0
                                                  : c.length) &&
                                            (null == t
                                                ? void 0
                                                : null === (o = t.plan_services) || void 0 === o
                                                  ? void 0
                                                  : o.map((e, a) => {
                                                        var n, s, c, o;
                                                        return (0, r.jsx)(r.Fragment, {
                                                            children:
                                                                (null == e
                                                                    ? void 0
                                                                    : null === (n = e.service_credit) || void 0 === n
                                                                      ? void 0
                                                                      : null === (s = n.service_credit_rates) ||
                                                                          void 0 === s
                                                                        ? void 0
                                                                        : s.length) &&
                                                                (null == e
                                                                    ? void 0
                                                                    : null === (c = e.service_credit) || void 0 === c
                                                                      ? void 0
                                                                      : null === (o = c.service_credit_rates) ||
                                                                          void 0 === o
                                                                        ? void 0
                                                                        : o.map((a, n) => {
                                                                              var s, c, o, i, m, u, h, p;
                                                                              if (
                                                                                  (null == a
                                                                                      ? void 0
                                                                                      : null === (s = a.currency) ||
                                                                                          void 0 === s
                                                                                        ? void 0
                                                                                        : s.short_name) === d
                                                                              )
                                                                                  return (0, r.jsx)('span', {
                                                                                      children: (
                                                                                          null == t
                                                                                              ? void 0
                                                                                              : t.postpaid_allowed
                                                                                      )
                                                                                          ? (0, r.jsxs)(r.Fragment, {
                                                                                                children: [
                                                                                                    (0, r.jsx)(l.vB0, {
                                                                                                        className:
                                                                                                            'text-green me-2 prcing-check',
                                                                                                    }),
                                                                                                    null == a
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (c =
                                                                                                                    a.currency) ||
                                                                                                            void 0 === c
                                                                                                          ? void 0
                                                                                                          : c.symbol,
                                                                                                    null == a
                                                                                                        ? void 0
                                                                                                        : a.follow_up_rate,
                                                                                                    '/',
                                                                                                    null == e
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (o =
                                                                                                                    e.service_credit) ||
                                                                                                            void 0 === o
                                                                                                          ? void 0
                                                                                                          : null ===
                                                                                                                  (i =
                                                                                                                      o.service) ||
                                                                                                              void 0 ===
                                                                                                                  i
                                                                                                            ? void 0
                                                                                                            : i.name,
                                                                                                    (
                                                                                                        null == e
                                                                                                            ? void 0
                                                                                                            : null ===
                                                                                                                    (m =
                                                                                                                        e.service_credit) ||
                                                                                                                void 0 ===
                                                                                                                    m
                                                                                                              ? void 0
                                                                                                              : null ===
                                                                                                                      (u =
                                                                                                                          m.service) ||
                                                                                                                  void 0 ===
                                                                                                                      u
                                                                                                                ? void 0
                                                                                                                : u.is_rental
                                                                                                    )
                                                                                                        ? '/month'
                                                                                                        : '',
                                                                                                ],
                                                                                            })
                                                                                          : (0, r.jsxs)(r.Fragment, {
                                                                                                children: [
                                                                                                    (0, r.jsx)(l.FU5, {
                                                                                                        className:
                                                                                                            'text-danger me-2 prcing-check',
                                                                                                    }),
                                                                                                    'No Extra ',
                                                                                                    ' ',
                                                                                                    null == e
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (h =
                                                                                                                    e.service_credit) ||
                                                                                                            void 0 === h
                                                                                                          ? void 0
                                                                                                          : null ===
                                                                                                                  (p =
                                                                                                                      h.service) ||
                                                                                                              void 0 ===
                                                                                                                  p
                                                                                                            ? void 0
                                                                                                            : p.name,
                                                                                                ],
                                                                                            }),
                                                                                  });
                                                                          })),
                                                        });
                                                    })),
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            var x = n(42371);
            let f = (e) => {
                let {
                        pricing: a,
                        setPricing: n,
                        amountArr: c,
                        fetchSMSData: l,
                        originCountry: t,
                        setOriginCountry: i,
                        destinationCountry: m,
                        setDestinationCountry: u,
                        currency: h,
                        currencySymbol: p,
                        countryCode: v,
                    } = e,
                    [f, g] = (0, s.useState)(0),
                    [y, b] = (0, s.useState)(4),
                    [j, S] = (0, s.useState)([]);
                (0, s.useEffect)(() => {
                    (0, d.Wi)();
                }, [a, t, m]),
                    (0, s.useEffect)(() => {}, []),
                    (0, s.useEffect)(() => {
                        a.length > 0 && S(a.sort((e, a) => e[y].totalNoOfSms - a[y].totalNoOfSms));
                    }, [a]);
                let N = 0,
                    w = 0,
                    G = 0;
                if (a[0] && a.length > 2) {
                    var P, B, k;
                    let e = j.slice();
                    e.unshift('-36');
                    let n = j.length,
                        r = 100 / n,
                        s = Math.floor(f / r);
                    if (a[0]) {
                        G = a[s]
                            ? null === (P = a[s][y]) || void 0 === P
                                ? void 0
                                : P.rate
                            : null === (B = a[s - 1][y]) || void 0 === B
                              ? void 0
                              : B.rate;
                        let c = ((e[s + 1] - e[s]) * (n * (f - r * s))) / 100;
                        N = Number(e[s]) + Math.floor(c);
                    }
                    100 == f && (N = Number(e[s])),
                        j.length > 0 &&
                            (w =
                                (N = null === (k = j[f][y]) || void 0 === k ? void 0 : k.totalNoOfSms) *
                                (G = j[f][y].rate));
                }
                let _ = (e) => ('₹' === p ? Number(e).toLocaleString('en-IN') : Number(e).toLocaleString('en-US'));
                return (0, r.jsx)(r.Fragment, {
                    children: (0, r.jsxs)('div', {
                        children: [
                            (null == t ? void 0 : t.length) >= 1 &&
                                (0, r.jsxs)('div', {
                                    className: 'd-flex flex-column flex-lg-row align-items-center  gap-4 ',
                                    children: [
                                        (0, r.jsx)('span', {
                                            className: 'Send-sms c-fw-m ',
                                            children: 'Send SMS from',
                                        }),
                                        (0, r.jsxs)('div', {
                                            className:
                                                'gap-3 col d-flex flex-column text-start flex-md-row align-items-center justify-content-start col-12 col-md-10 col-lg-7',
                                            children: [
                                                (0, r.jsx)(x.pY, {
                                                    className: 'col c-fs-6',
                                                    id: 'originCountry c-fs-6',
                                                    placeholder: 'Origin Country',
                                                    labelKey: 'name',
                                                    onChange: (e) => {
                                                        var a, r;
                                                        n([]),
                                                            (null === (a = e[0]) || void 0 === a ? void 0 : a.name) &&
                                                                l(
                                                                    h,
                                                                    null === (r = e[0]) || void 0 === r
                                                                        ? void 0
                                                                        : r.name,
                                                                    m
                                                                );
                                                    },
                                                    options: o,
                                                    clearButton: !0,
                                                    defaultSelected: [null == o ? void 0 : o.find((e) => e.name === t)],
                                                    inputProps: { autoComplete: 'off' },
                                                }),
                                                (0, r.jsx)('div', { className: 'c-fw-m', children: 'To' }),
                                                (0, r.jsx)(x.pY, {
                                                    className: 'col',
                                                    id: 'destinationCountry',
                                                    placeholder: 'Destination Country',
                                                    labelKey: 'name',
                                                    onChange: (e) => {
                                                        var a, r;
                                                        n([]),
                                                            (null === (a = e[0]) || void 0 === a ? void 0 : a.name) &&
                                                                l(
                                                                    h,
                                                                    t,
                                                                    null === (r = e[0]) || void 0 === r
                                                                        ? void 0
                                                                        : r.name
                                                                );
                                                    },
                                                    options: o,
                                                    clearButton: !0,
                                                    defaultSelected: [null == o ? void 0 : o.find((e) => e.name === t)],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            a[0] &&
                                (0, r.jsx)(r.Fragment, {
                                    children:
                                        a.length > 2
                                            ? (0, r.jsxs)(r.Fragment, {
                                                  children: [
                                                      (0, r.jsxs)('div', {
                                                          className:
                                                              'd-flex flex-column gap-4 align-items center mt-3 p-4 bg-white rounded ',
                                                          children: [
                                                              (0, r.jsx)('div', {
                                                                  className:
                                                                      'd-none d-lg-block text-center text-dark c-fw-m',
                                                                  children: 'Number of SMS',
                                                              }),
                                                              (0, r.jsx)('div', {
                                                                  className: ' d-none d-lg-flex',
                                                                  children: j.map((e, a) =>
                                                                      (0, r.jsx)(
                                                                          'div',
                                                                          {
                                                                              className: 'text-center col c-fs-5',
                                                                              children: _(e[y].totalNoOfSms),
                                                                          },
                                                                          a
                                                                      )
                                                                  ),
                                                              }),
                                                              (0, r.jsx)('div', {
                                                                  className: 'input-slider-padding',
                                                                  children: (0, r.jsx)('input', {
                                                                      className: 'slider',
                                                                      type: 'range',
                                                                      min: '0',
                                                                      max: j.length - 1,
                                                                      step: '1',
                                                                      value: f,
                                                                      onChange: (e) => g(e.target.value),
                                                                      'aria-label': 'Slider',
                                                                  }),
                                                              }),
                                                              (0, r.jsx)('div', {
                                                                  className: 'd-none d-lg-flex',
                                                                  children: j.map((e, a) => {
                                                                      var n;
                                                                      return (0, r.jsxs)(
                                                                          'div',
                                                                          {
                                                                              className: 'text-center col c-fs-5',
                                                                              children: [
                                                                                  p,
                                                                                  null === (n = e[y]) || void 0 === n
                                                                                      ? void 0
                                                                                      : n.rate,
                                                                              ],
                                                                          },
                                                                          a
                                                                      );
                                                                  }),
                                                              }),
                                                              (0, r.jsx)('div', {
                                                                  className:
                                                                      'text-center text-dark c-fw-m d-none d-lg-block',
                                                                  children: 'Cost per SMS',
                                                              }),
                                                          ],
                                                      }),
                                                      (0, r.jsx)('div', {
                                                          className: 'd-flex align-items-end mt-4 mb-3',
                                                          children: (0, r.jsxs)('p', {
                                                              className: 'c-fs-2 c-fw-500',
                                                              children: [
                                                                  (0, r.jsx)('span', {
                                                                      className: 'c-fs-1 fw-bold',
                                                                      children: _(N),
                                                                  }),
                                                                  ' SMS for',
                                                                  ' ',
                                                                  (0, r.jsxs)('span', {
                                                                      className: 'c-fs-1 text-green fw-bold',
                                                                      children: [
                                                                          p,
                                                                          _(
                                                                              (Number(w) % 1 == 0
                                                                                  ? Number(w)
                                                                                  : Number(w).toFixed(1)
                                                                              )
                                                                                  .toString()
                                                                                  .replace(/\.0$/, '')
                                                                          ),
                                                                      ],
                                                                  }),
                                                                  ' ',
                                                                  '₹' === p && '+18 % GST',
                                                                  ' at',
                                                                  ' ',
                                                                  (0, r.jsxs)('span', {
                                                                      className: 'c-fs-1 text-green fw-bold',
                                                                      children: [p, G],
                                                                  }),
                                                                  'per SMS',
                                                                  ' ',
                                                              ],
                                                          }),
                                                      }),
                                                      (0, r.jsx)('a', {
                                                          href: '/signup?service=SMS',
                                                          target: '_blank',
                                                          className:
                                                              'btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3',
                                                          children: 'Get Started',
                                                      }),
                                                  ],
                                              })
                                            : (0, r.jsx)(r.Fragment, {
                                                  children:
                                                      a[0][y].rate &&
                                                      (0, r.jsxs)('div', {
                                                          className:
                                                              'content-fit bg-white btn-ft d-flex flex-column border rounded gap-5 p-4 border-2 mt-4 align-items-center',
                                                          children: [
                                                              (0, r.jsx)('h3', {
                                                                  className: 'c-fs-4',
                                                                  children: 'SMS Pricing',
                                                              }),
                                                              (0, r.jsxs)('h3', {
                                                                  className: 'text-green c-fs-2',
                                                                  children: [p, a[0][y].rate, 'per SMS'],
                                                              }),
                                                              (0, r.jsx)('a', {
                                                                  href: '/signup?service=SMS',
                                                                  target: '_blank',
                                                                  className:
                                                                      'btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3 btn-ft',
                                                                  children: 'Get Started',
                                                              }),
                                                          ],
                                                      }),
                                              }),
                                }),
                            (0, r.jsxs)('div', {
                                className: 'talk-to-sales connect-personalized mt-4',
                                children: [
                                    (0, r.jsxs)('span', {
                                        className: 'personalized d-block c-fs-4',
                                        children: [
                                            'Connect with our team for a personalized pricing',
                                            'India' === t &&
                                                'India' === m &&
                                                (0, r.jsxs)(r.Fragment, {
                                                    children: [
                                                        ' ',
                                                        'and get up to ',
                                                        (0, r.jsx)('span', {
                                                            className: 'text-green c-fs-4 fw-medium',
                                                            children: ' ₹0.13',
                                                        }),
                                                        ' per SMS to meet your needs.',
                                                        ' ',
                                                    ],
                                                }),
                                        ],
                                    }),
                                    (0, r.jsx)('button', {
                                        type: 'button',
                                        'data-bs-toggle': 'modal',
                                        'data-bs-target': '#sales-modal',
                                        className:
                                            'btn btn-outline-dark mt-2 mb-4 c-fs-5 border border-dark rounded-1 px-3 py-1',
                                        children: 'Talk to Sales',
                                    }),
                                    (0, r.jsx)('br', {}),
                                    (0, r.jsxs)('a', {
                                        className: 'more-about',
                                        href: '/sms',
                                        children: [
                                            (0, r.jsx)('img', {
                                                src: '/img/icon/link.svg',
                                                alt: 'Know more',
                                                className: 'icon me-2',
                                            }),
                                            (0, r.jsx)('span', { children: 'Know more about SMS' }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            };
            var g = JSON.parse(
                '[{"shortname":"AF","name":"Afghanistan","code":93,"currency":"GBP"},{"shortname":"AL","name":"Albania","code":355,"currency":"GBP"},{"shortname":"DZ","name":"Algeria","code":213,"currency":"GBP"},{"shortname":"AD","name":"Andorra","code":376,"currency":"GBP"},{"shortname":"AO","name":"Angola","code":244,"currency":"GBP"},{"shortname":"AR","name":"Argentina","code":54,"currency":"USD"},{"shortname":"AM","name":"Armenia","code":374,"currency":"GBP"},{"shortname":"AW","name":"Aruba","code":297,"currency":"USD"},{"shortname":"AU","name":"Australia","code":61,"currency":"USD"},{"shortname":"AT","name":"Austria","code":43,"currency":"GBP"},{"shortname":"AZ","name":"Azerbaijan","code":994,"currency":"GBP"},{"shortname":"BH","name":"Bahrain","code":973,"currency":"GBP"},{"shortname":"BD","name":"Bangladesh","code":880,"currency":"GBP"},{"shortname":"BY","name":"Belarus","code":375,"currency":"GBP"},{"shortname":"BE","name":"Belgium","code":32,"currency":"GBP"},{"shortname":"BZ","name":"Belize","code":501,"currency":"USD"},{"shortname":"BJ","name":"Benin","code":229,"currency":"GBP"},{"shortname":"BT","name":"Bhutan","code":975,"currency":"INR"},{"shortname":"BO","name":"Bolivia","code":591,"currency":"GBP"},{"shortname":"BA","name":"Bosnia and Herzegovina","code":387,"currency":"GBP"},{"shortname":"BW","name":"Botswana","code":267,"currency":"GBP"},{"shortname":"BR","name":"Brazil","code":55,"currency":"USD"},{"shortname":"BN","name":"Brunei","code":673,"currency":"GBP"},{"shortname":"BG","name":"Bulgaria","code":359,"currency":"GBP"},{"shortname":"BF","name":"Burkina Faso","code":226,"currency":"GBP"},{"shortname":"BI","name":"Burundi","code":257,"currency":"GBP"},{"shortname":"KH","name":"Cambodia","code":855,"currency":"GBP"},{"shortname":"CM","name":"Cameroon","code":237,"currency":"GBP"},{"shortname":"CV","name":"Cape Verde","code":238,"currency":"GBP"},{"shortname":"CF","name":"Central African Republic","code":236,"currency":"GBP"},{"shortname":"TD","name":"Chad","code":235,"currency":"GBP"},{"shortname":"CL","name":"Chile","code":56,"currency":"GBP"},{"shortname":"CN","name":"China","code":86,"currency":"GBP"},{"shortname":"CO","name":"Colombia","code":57,"currency":"USD"},{"shortname":"KM","name":"Comoros","code":269,"currency":"GBP"},{"shortname":"CK","name":"Cook Islands","code":682,"currency":"USD"},{"shortname":"CR","name":"Costa Rica","code":506,"currency":"GBP"},{"shortname":"HR","name":"Croatia","code":385,"currency":"GBP"},{"shortname":"CU","name":"Cuba","code":53,"currency":"GBP"},{"shortname":"CY","name":"Cyprus","code":357,"currency":"GBP"},{"shortname":"CZ","name":"Czech Republic","code":420,"currency":"GBP"},{"shortname":"CG","name":"Democratic Republic of the Congo","code":243,"currency":"GBP"},{"shortname":"DK","name":"Denmark","code":45,"currency":"GBP"},{"shortname":"TL","name":"East Timor","code":670,"currency":"GBP"},{"shortname":"EC","name":"Ecuador","code":593,"currency":"USD"},{"shortname":"EG","name":"Egypt","code":20,"currency":"GBP"},{"shortname":"SV","name":"El Salvador","code":503,"currency":"USD"},{"shortname":"GQ","name":"Equatorial Guinea","code":240,"currency":"GBP"},{"shortname":"EE","name":"Estonia","code":372,"currency":"GBP"},{"shortname":"ET","name":"Ethiopia","code":251,"currency":"GBP"},{"shortname":"FK","name":"Falkland Islands","code":500,"currency":"GBP"},{"shortname":"FO","name":"Faroe Islands","code":298,"currency":"GBP"},{"shortname":"FM","name":"Federated States of Micronesia","code":691,"currency":"USD"},{"shortname":"FJ","name":"Fiji Islands","code":679,"currency":"USD"},{"shortname":"FI","name":"Finland","code":358,"currency":"GBP"},{"shortname":"FR","name":"France","code":33,"currency":"GBP"},{"shortname":"GF","name":"French Guiana","code":594,"currency":"GBP"},{"shortname":"PF","name":"French Polynesia","code":689,"currency":"USD"},{"shortname":"GA","name":"Gabon","code":241,"currency":"GBP"},{"shortname":"GE","name":"Georgia","code":995,"currency":"GBP"},{"shortname":"DE","name":"Germany","code":49,"currency":"GBP"},{"shortname":"GH","name":"Ghana","code":233,"currency":"GBP"},{"shortname":"GI","name":"Gibraltar","code":350,"currency":"GBP"},{"shortname":"GR","name":"Greece","code":30,"currency":"GBP"},{"shortname":"GL","name":"Greenland","code":299,"currency":"GBP"},{"shortname":"GP","name":"Guadeloupe","code":590,"currency":"GBP"},{"shortname":"GT","name":"Guatemala","code":502,"currency":"USD"},{"shortname":"GN","name":"Guinea","code":224,"currency":"GBP"},{"shortname":"GW","name":"Guinea-Bissau","code":245,"currency":"GBP"},{"shortname":"GY","name":"Guyana","code":592,"currency":"USD"},{"shortname":"HT","name":"Haiti","code":509,"currency":"USD"},{"shortname":"HN","name":"Honduras","code":504,"currency":"USD"},{"shortname":"HK","name":"Hong Kong","code":852,"currency":"GBP"},{"shortname":"HU","name":"Hungary","code":36,"currency":"GBP"},{"shortname":"IS","name":"Iceland","code":354,"currency":"GBP"},{"shortname":"IN","name":"India","code":91,"currency":"INR"},{"shortname":"ID","name":"Indonesia","code":62,"currency":"GBP"},{"shortname":"IR","name":"Iran","code":98,"currency":"GBP"},{"shortname":"IQ","name":"Iraq","code":964,"currency":"GBP"},{"shortname":"IE","name":"Ireland","code":353,"currency":"GBP"},{"shortname":"IL","name":"Israel","code":972,"currency":"GBP"},{"shortname":"IT","name":"Italy","code":39,"currency":"GBP"},{"shortname":"JP","name":"Japan","code":81,"currency":"GBP"},{"shortname":"JO","name":"Jordan","code":962,"currency":"USD"},{"shortname":"KE","name":"Kenya","code":254,"currency":"GBP"},{"shortname":"KI","name":"Kiribati","code":686,"currency":"USD"},{"shortname":"KW","name":"Kuwait","code":965,"currency":"GBP"},{"shortname":"KG","name":"Kyrgyzstan","code":996,"currency":"GBP"},{"shortname":"LA","name":"Laos","code":856,"currency":"GBP"},{"shortname":"LV","name":"Latvia","code":371,"currency":"GBP"},{"shortname":"LB","name":"Lebanon","code":961,"currency":"USD"},{"shortname":"LS","name":"Lesotho","code":266,"currency":"GBP"},{"shortname":"LR","name":"Liberia","code":231,"currency":"GBP"},{"shortname":"LY","name":"Libya","code":218,"currency":"USD"},{"shortname":"LI","name":"Liechtenstein","code":423,"currency":"GBP"},{"shortname":"LT","name":"Lithuania","code":370,"currency":"GBP"},{"shortname":"LU","name":"Luxembourg","code":352,"currency":"GBP"},{"shortname":"MO","name":"Macau","code":853,"currency":"GBP"},{"shortname":"MK","name":"Macedonia","code":389,"currency":"GBP"},{"shortname":"MG","name":"Madagascar","code":261,"currency":"GBP"},{"shortname":"MW","name":"Malawi","code":265,"currency":"GBP"},{"shortname":"MY","name":"Malaysia","code":60,"currency":"GBP"},{"shortname":"MV","name":"Maldives","code":960,"currency":"GBP"},{"shortname":"ML","name":"Mali","code":223,"currency":"GBP"},{"shortname":"MT","name":"Malta","code":356,"currency":"GBP"},{"shortname":"MH","name":"Marshall Islands","code":692,"currency":"USD"},{"shortname":"MQ","name":"Martinique","code":596,"currency":"GBP"},{"shortname":"MR","name":"Mauritania","code":222,"currency":"GBP"},{"shortname":"MU","name":"Mauritius","code":230,"currency":"GBP"},{"shortname":"MX","name":"Mexico","code":52,"currency":"USD"},{"shortname":"MD","name":"Moldova","code":373,"currency":"GBP"},{"shortname":"MC","name":"Monaco","code":377,"currency":"GBP"},{"shortname":"MN","name":"Mongolia","code":976,"currency":"GBP"},{"shortname":"ME","name":"Montenegro","code":382,"currency":"GBP"},{"shortname":"MA","name":"Morocco","code":212,"currency":"GBP"},{"shortname":"MZ","name":"Mozambique","code":258,"currency":"GBP"},{"shortname":"MM","name":"Myanmar","code":95,"currency":"GBP"},{"shortname":"NA","name":"Namibia","code":264,"currency":"GBP"},{"shortname":"NR","name":"Nauru","code":674,"currency":"USD"},{"shortname":"NP","name":"Nepal","code":977,"currency":"INR"},{"shortname":"NL","name":"Netherlands","code":31,"currency":"GBP"},{"shortname":"NC","name":"New Caledonia","code":687,"currency":"USD"},{"shortname":"NZ","name":"New Zealand","code":64,"currency":"USD"},{"shortname":"NI","name":"Nicaragua","code":505,"currency":"USD"},{"shortname":"NE","name":"Niger","code":227,"currency":"GBP"},{"shortname":"NG","name":"Nigeria","code":234,"currency":"GBP"},{"shortname":"NU","name":"Niue","code":683,"currency":"USD"},{"shortname":"NF","name":"Norfolk Island","code":672,"currency":"USD"},{"shortname":"KP","name":"North Korea","code":850,"currency":"GBP"},{"shortname":"NO","name":"Norway","code":47,"currency":"GBP"},{"shortname":"OM","name":"Oman","code":968,"currency":"GBP"},{"shortname":"PK","name":"Pakistan","code":92,"currency":"GBP"},{"shortname":"PW","name":"Palau","code":680,"currency":"USD"},{"shortname":"PA","name":"Panama","code":507,"currency":"USD"},{"shortname":"PG","name":"Papua New Guinea","code":675,"currency":"USD"},{"shortname":"PY","name":"Paraguay","code":595,"currency":"USD"},{"shortname":"PE","name":"Peru","code":51,"currency":"USD"},{"shortname":"PH","name":"Philippines","code":63,"currency":"GBP"},{"shortname":"PL","name":"Poland","code":48,"currency":"GBP"},{"shortname":"PT","name":"Portugal","code":351,"currency":"GBP"},{"shortname":"QA","name":"Qatar","code":974,"currency":"GBP"},{"shortname":"RO","name":"Romania","code":40,"currency":"GBP"},{"shortname":"RU","name":"Russian Federation","code":7,"currency":"GBP"},{"shortname":"RW","name":"Rwanda","code":250,"currency":"GBP"},{"shortname":"PM","name":"Saint Pierre and Miquelon","code":508,"currency":"USD"},{"shortname":"WS","name":"Samoa","code":685,"currency":"USD"},{"shortname":"ST","name":"Sao Tome and Principe","code":239,"currency":"GBP"},{"shortname":"SA","name":"Saudi Arabia","code":966,"currency":"USD"},{"shortname":"SN","name":"Senegal","code":221,"currency":"GBP"},{"shortname":"RS","name":"Serbia","code":381,"currency":"GBP"},{"shortname":"SC","name":"Seychelles","code":248,"currency":"GBP"},{"shortname":"SL","name":"Sierra Leone","code":232,"currency":"GBP"},{"shortname":"SG","name":"Singapore","code":65,"currency":"GBP"},{"shortname":"SK","name":"Slovakia","code":421,"currency":"GBP"},{"shortname":"SI","name":"Slovenia","code":386,"currency":"GBP"},{"shortname":"SB","name":"Solomon Islands","code":677,"currency":"USD"},{"shortname":"SO","name":"Somalia","code":252,"currency":"GBP"},{"shortname":"ZA","name":"South Africa","code":27,"currency":"GBP"},{"shortname":"KR","name":"South Korea","code":82,"currency":"GBP"},{"shortname":"SS","name":"South Sudan","code":211,"currency":"GBP"},{"shortname":"ES","name":"Spain","code":34,"currency":"GBP"},{"shortname":"LK","name":"Sri Lanka","code":94,"currency":"GBP"},{"shortname":"SD","name":"Sudan","code":249,"currency":"GBP"},{"shortname":"SR","name":"Suriname","code":597,"currency":"USD"},{"shortname":"SZ","name":"Swaziland","code":268,"currency":"GBP"},{"shortname":"SE","name":"Sweden","code":46,"currency":"GBP"},{"shortname":"CH","name":"Switzerland","code":41,"currency":"GBP"},{"shortname":"SY","name":"Syria","code":963,"currency":"GBP"},{"shortname":"TW","name":"Taiwan","code":886,"currency":"USD"},{"shortname":"TJ","name":"Tajikistan","code":992,"currency":"GBP"},{"shortname":"TZ","name":"Tanzania","code":255,"currency":"GBP"},{"shortname":"TH","name":"Thailand","code":66,"currency":"GBP"},{"shortname":"TG","name":"Togo","code":228,"currency":"GBP"},{"shortname":"TK","name":"Tokelau","code":690,"currency":"USD"},{"shortname":"TO","name":"Tonga","code":676,"currency":"USD"},{"shortname":"TN","name":"Tunisia","code":216,"currency":"GBP"},{"shortname":"TR","name":"Turkey","code":90,"currency":"USD"},{"shortname":"TM","name":"Turkmenistan","code":993,"currency":"GBP"},{"shortname":"TV","name":"Tuvalu","code":688,"currency":"USD"},{"shortname":"UG","name":"Uganda","code":256,"currency":"GBP"},{"shortname":"UA","name":"Ukraine","code":380,"currency":"GBP"},{"shortname":"AE","name":"United Arab Emirates","code":971,"currency":"USD"},{"shortname":"GB","name":"United Kingdom and Region","code":44,"currency":"GBP"},{"shortname":"US","name":"United States and Canada Region","code":1,"currency":"USD"},{"shortname":"UY","name":"Uruguay","code":598,"currency":"USD"},{"shortname":"UZ","name":"Uzbekistan","code":998,"currency":"GBP"},{"shortname":"VU","name":"Vanuatu","code":678,"currency":"GBP"},{"shortname":"VE","name":"Venezuela","code":58,"currency":"GBP"},{"shortname":"VN","name":"Vietnam","code":84,"currency":"GBP"},{"shortname":"WF","name":"Wallis And Futuna Islands","code":681,"currency":"GBP"},{"shortname":"YE","name":"Yemen","code":967,"currency":"USD"},{"shortname":"ZM","name":"Zambia","code":260,"currency":"GBP"},{"shortname":"ZW","name":"Zimbabwe","code":263,"currency":"GBP"},{"shortname":"AS","name":"American Samoa","code":1,"currency":"USD"},{"shortname":"AI","name":"Anguilla","code":1,"currency":"USD"},{"shortname":"AQ","name":"Antarctica","code":672,"currency":"USD"},{"shortname":"AG","name":"Antigua And Barbuda","code":1,"currency":"USD"},{"shortname":"BS","name":"Bahamas The","code":1,"currency":"USD"},{"shortname":"BB","name":"Barbados","code":1246,"currency":"USD"},{"shortname":"BM","name":"Bermuda","code":1,"currency":"USD"},{"shortname":"BV","name":"Bouvet Island","code":47,"currency":"USD"},{"shortname":"IO","name":"British Indian Ocean Territory","code":44,"currency":"GBP"},{"shortname":"CA","name":"Canada","code":1,"currency":"USD"},{"shortname":"KY","name":"Cayman Islands","code":1,"currency":"USD"},{"shortname":"CX","name":"Christmas Island","code":61,"currency":"USD"},{"shortname":"CC","name":"Cocos (Keeling) Islands","code":61,"currency":"USD"},{"shortname":"CG","name":"Congo","code":242,"currency":"USD"},{"shortname":"CI","name":"Cote dIvoire","code":225,"currency":"USD"},{"shortname":"DJ","name":"Djibouti","code":253,"currency":"USD"},{"shortname":"DM","name":"Dominica","code":1,"currency":"USD"},{"shortname":"DO","name":"Dominican Republic","code":1,"currency":"USD"},{"shortname":"ER","name":"Eritrea","code":291,"currency":"USD"},{"shortname":"XA","name":"External Territories of Australia","code":672,"currency":"USD"},{"shortname":"TF","name":"French Southern Territories","code":262,"currency":"USD"},{"shortname":"GM","name":"Gambia The","code":220,"currency":"USD"},{"shortname":"GD","name":"Grenada","code":1473,"currency":"USD"},{"shortname":"GU","name":"Guam","code":1,"currency":"USD"},{"shortname":"XU","name":"Guernsey and Alderney","code":44,"currency":"GBP"},{"shortname":"HM","name":"Heard and McDonald Islands","code":672,"currency":"USD"},{"shortname":"JM","name":"Jamaica","code":1876,"currency":"USD"},{"shortname":"JE","name":"Jersey","code":44,"currency":"GBP"},{"shortname":"KZ","name":"Kazakhstan","code":7,"currency":"GBP"},{"shortname":"IM","name":"Man (Isle of)","code":44,"currency":"GBP"},{"shortname":"YT","name":"Mayotte","code":262,"currency":"USD"},{"shortname":"FM","name":"Micronesia","code":691,"currency":"USD"},{"shortname":"MS","name":"Montserrat","code":1,"currency":"USD"},{"shortname":"MP","name":"Northern Mariana Islands","code":1,"currency":"USD"},{"shortname":"PS","name":"Palestinian Territory Occupied","code":970,"currency":"USD"},{"shortname":"PN","name":"Pitcairn Island","code":64,"currency":"USD"},{"shortname":"PR","name":"Puerto Rico","code":1,"currency":"USD"},{"shortname":"RE","name":"Reunion","code":262,"currency":"USD"},{"shortname":"SH","name":"Saint Helena","code":290,"currency":"USD"},{"shortname":"KN","name":"Saint Kitts And Nevis","code":1869,"currency":"USD"},{"shortname":"LC","name":"Saint Lucia","code":1758,"currency":"USD"},{"shortname":"VC","name":"Saint Vincent And The Grenadines","code":1,"currency":"USD"},{"shortname":"SM","name":"San Marino","code":378,"currency":"USD"},{"shortname":"XG","name":"Smaller Territories of the UK","code":44,"currency":"GBP"},{"shortname":"GS","name":"South Georgia","code":995,"currency":"USD"},{"shortname":"SJ","name":"Svalbard And Jan Mayen Islands","code":47,"currency":"USD"},{"shortname":"TT","name":"Trinidad And Tobago","code":1868,"currency":"USD"},{"shortname":"TC","name":"Turks And Caicos Islands","code":1,"currency":"USD"},{"shortname":"VA","name":"Vatican City State (Holy See)","code":379,"currency":"USD"},{"shortname":"VG","name":"Virgin Islands (British)","code":1,"currency":"USD"},{"shortname":"VI","name":"Virgin Islands (US)","code":1,"currency":"USD"},{"shortname":"EH","name":"Western Sahara","code":212,"currency":"GBP"},{"shortname":"YU","name":"Yugoslavia","code":38,"currency":"USD"},{"shortname":"XK","name":"Kosovo","code":383,"currency":"GBP"}]'
            );
            let y = (e) => {
                    var a, n;
                    let { countryCode: o, currency: t } = e,
                        [i, d] = (0, s.useState)(null),
                        [h, p] = (0, s.useState)(!1),
                        [v, f] = (0, s.useState)(!1),
                        [y, b] = (0, s.useState)(null),
                        [j, S] = (0, s.useState)([]),
                        [N, w] = (0, s.useState)(),
                        [G, P] = (0, s.useState)(),
                        [B, k] = (0, s.useState)(),
                        [_, C] = (0, s.useState)(),
                        D = 'https://voice.phone91.com';
                    (0, s.useEffect)(() => {
                        (null == G ? void 0 : G.length) > 0 && S(G.find((e) => e.country_code === o));
                    }, [G]),
                        (0, s.useEffect)(() => {
                            j &&
                                ('GBP' === t
                                    ? k('USD')
                                    : 'INR' === t && (null == j ? void 0 : j.name) !== 'India'
                                      ? k('USD')
                                      : k(t));
                        }, [j, g]),
                        (0, s.useEffect)(() => {
                            U();
                        }, []);
                    let U = async () => {
                        p(!0);
                        try {
                            let e = await fetch(''.concat(D, '/public/country/'));
                            if (e.ok) {
                                let a = await e.json();
                                P(a);
                            } else throw Error('Currently we only have plan for India(91)');
                        } catch (e) {
                            b(e.message);
                        } finally {
                            p(!1);
                        }
                    };
                    (0, s.useEffect)(() => {
                        B && (I(B), 'GBP' === B ? C('\xa3') : 'INR' === B ? C('₹') : C('$'));
                    }, [B]);
                    let I = async (e) => {
                        p(!0);
                        try {
                            let a = await fetch(''.concat(D, '/public/dialplanPricing/?currency=').concat(e));
                            if (a.ok) {
                                let e = await a.json();
                                w(null == e ? void 0 : e.data.dialplan_id);
                            } else throw Error('Currently we only have plan for India(91)');
                        } catch (e) {
                            b(e.message);
                        } finally {
                            p(!1);
                        }
                    };
                    (0, s.useEffect)(() => {
                        j && M(j, N);
                    }, [N, j]);
                    let M = async (e, a) => {
                        p(!0);
                        try {
                            let n = await fetch(
                                ''
                                    .concat(D, '/public/pricing/?cid=')
                                    .concat(null == e ? void 0 : e.id, '&dialplan_id=')
                                    .concat(a)
                            );
                            if (n.ok) {
                                let e = await n.json();
                                d(e);
                            } else throw Error('Currently we only have plan for India(91)');
                        } catch (e) {
                            b(e.message);
                        } finally {
                            p(!1);
                        }
                    };
                    async function F() {
                        f(!0);
                        try {
                            let n = await c.Z.get(
                                ''
                                    .concat(D, '/public/pricing/?cid=')
                                    .concat(null == j ? void 0 : j.id, '&dialplan_id=')
                                    .concat(N, '&export=1')
                            );
                            if (n) {
                                var e, a;
                                f(!1),
                                    (null == n
                                        ? void 0
                                        : null === (e = n.data) || void 0 === e
                                          ? void 0
                                          : null === (a = e.data) || void 0 === a
                                            ? void 0
                                            : a.url) && (window.location.href = n.data.data.url);
                            }
                        } catch (e) {
                            console.log(e, 'error in my function');
                        } finally {
                            f(!1);
                        }
                    }
                    let [T, E] = (0, s.useState)([]);
                    (0, s.useEffect)(() => {
                        if (G && j) {
                            let e = G.find((e) => e.name === j.name);
                            e && E([e]);
                        }
                    }, [G, j]);
                    let [A, K] = (0, s.useState)(!1);
                    return (0, r.jsxs)(r.Fragment, {
                        children: [
                            (0, r.jsx)('div', {
                                className: 'col-3',
                                children:
                                    G &&
                                    (0, r.jsx)(r.Fragment, {
                                        children: (0, r.jsx)(
                                            x.pY,
                                            {
                                                className: 'col c-fs-6',
                                                id: 'country',
                                                placeholder: 'Select a country',
                                                open: A,
                                                onInputChange: (e) => {
                                                    K(!0);
                                                },
                                                onFocus: (e) => {
                                                    K(!0);
                                                },
                                                labelKey: 'name',
                                                options: G,
                                                clearButton: !0,
                                                defaultSelected: T,
                                                inputProps: { autoComplete: 'off' },
                                                onChange: (e) => {
                                                    if ((K(!1), e[0])) {
                                                        var a;
                                                        S(e[0]),
                                                            k(
                                                                null ===
                                                                    (a = g.find((a) => {
                                                                        var n;
                                                                        return (
                                                                            a.name ===
                                                                            (null === (n = e[0]) || void 0 === n
                                                                                ? void 0
                                                                                : n.name)
                                                                        );
                                                                    })) || void 0 === a
                                                                    ? void 0
                                                                    : a.currency
                                                            );
                                                    }
                                                },
                                            },
                                            T.length > 0 ? 'hasDefault' : 'noDefault'
                                        ),
                                    }),
                            }),
                            (null == i ? void 0 : null === (a = i.data) || void 0 === a ? void 0 : a.length) > 0 &&
                                (0, r.jsxs)('div', {
                                    children: [
                                        (0, r.jsx)('h4', {
                                            className: 'c-fs-4 fw-semibold mt-3',
                                            children: 'Outgoing call charges/min',
                                        }),
                                        (0, r.jsxs)('table', {
                                            className: 'table border border-dark rounded-2 my-3 overflow-hidden',
                                            children: [
                                                (0, r.jsx)('thead', {
                                                    children: (0, r.jsxs)('tr', {
                                                        children: [
                                                            (0, r.jsx)('th', {
                                                                className: 'border-bottom border-dark',
                                                                children: 'Recipient’s Network',
                                                            }),
                                                            (0, r.jsx)('th', {
                                                                className: 'border-bottom border-dark',
                                                                children: 'Local rates',
                                                            }),
                                                            (0, r.jsx)('th', {
                                                                className: 'border-bottom border-dark',
                                                                children: 'International rates',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                (0, r.jsx)('tbody', {
                                                    children:
                                                        i &&
                                                        (null == i
                                                            ? void 0
                                                            : i.data.map((e, a) =>
                                                                  (0, r.jsxs)(
                                                                      'tr',
                                                                      {
                                                                          children: [
                                                                              (0, r.jsx)('td', {
                                                                                  children:
                                                                                      null == e ? void 0 : e.network,
                                                                              }),
                                                                              (0, r.jsxs)('td', {
                                                                                  children: [
                                                                                      (null == e
                                                                                          ? void 0
                                                                                          : e.local_rates_min) &&
                                                                                          (0, r.jsxs)(r.Fragment, {
                                                                                              children: [
                                                                                                  _,
                                                                                                  null == e
                                                                                                      ? void 0
                                                                                                      : e.local_rates_min,
                                                                                              ],
                                                                                          }),
                                                                                      (null == e
                                                                                          ? void 0
                                                                                          : e.local_rates_min) !==
                                                                                          (null == e
                                                                                              ? void 0
                                                                                              : e.local_rates_max) &&
                                                                                          (0, r.jsxs)(r.Fragment, {
                                                                                              children: [
                                                                                                  ' ',
                                                                                                  '-',
                                                                                                  ' ',
                                                                                                  (null == e
                                                                                                      ? void 0
                                                                                                      : e.local_rates_max) &&
                                                                                                      (0, r.jsxs)(
                                                                                                          r.Fragment,
                                                                                                          {
                                                                                                              children:
                                                                                                                  [
                                                                                                                      _,
                                                                                                                      null ==
                                                                                                                      e
                                                                                                                          ? void 0
                                                                                                                          : e.local_rates_max,
                                                                                                                  ],
                                                                                                          }
                                                                                                      ),
                                                                                              ],
                                                                                          }),
                                                                                      !(null == e
                                                                                          ? void 0
                                                                                          : e.local_rates_min) &&
                                                                                          !(null == e
                                                                                              ? void 0
                                                                                              : e.local_rates_max) &&
                                                                                          (0, r.jsx)(r.Fragment, {
                                                                                              children: '-',
                                                                                          }),
                                                                                  ],
                                                                              }),
                                                                              (0, r.jsxs)('td', {
                                                                                  children: [
                                                                                      (null == e
                                                                                          ? void 0
                                                                                          : e.international_rates_min) &&
                                                                                          (0, r.jsxs)(r.Fragment, {
                                                                                              children: [
                                                                                                  _,
                                                                                                  ' ',
                                                                                                  null == e
                                                                                                      ? void 0
                                                                                                      : e.international_rates_min,
                                                                                              ],
                                                                                          }),
                                                                                      (null == e
                                                                                          ? void 0
                                                                                          : e.international_rates_min) !==
                                                                                          (null == e
                                                                                              ? void 0
                                                                                              : e.international_rates_max) &&
                                                                                          (0, r.jsxs)(r.Fragment, {
                                                                                              children: [
                                                                                                  ' ',
                                                                                                  '-',
                                                                                                  ' ',
                                                                                                  (null == e
                                                                                                      ? void 0
                                                                                                      : e.international_rates_max) &&
                                                                                                      (0, r.jsxs)(
                                                                                                          r.Fragment,
                                                                                                          {
                                                                                                              children:
                                                                                                                  [
                                                                                                                      _,
                                                                                                                      null ==
                                                                                                                      e
                                                                                                                          ? void 0
                                                                                                                          : e.international_rates_max,
                                                                                                                  ],
                                                                                                          }
                                                                                                      ),
                                                                                              ],
                                                                                          }),
                                                                                      !(null == e
                                                                                          ? void 0
                                                                                          : e.international_rates_min) &&
                                                                                          !(null == e
                                                                                              ? void 0
                                                                                              : e.international_rates_max) &&
                                                                                          (0, r.jsx)(r.Fragment, {
                                                                                              children: '-',
                                                                                          }),
                                                                                  ],
                                                                              }),
                                                                          ],
                                                                      },
                                                                      a
                                                                  )
                                                              )),
                                                }),
                                            ],
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: 'pb-3',
                                            children: [
                                                (0, r.jsx)('span', {
                                                    className: 'c-fw-m',
                                                    children:
                                                        'To download the detailed network and prefix wise pricing sheet. ',
                                                }),
                                                !v &&
                                                    (0, r.jsx)('button', {
                                                        onClick: F,
                                                        className: 'c-fw-m p-0 border-0 text-link text-underline',
                                                        children: (0, r.jsx)('u', { children: 'Export' }),
                                                    }),
                                                v && (0, r.jsx)('span', { className: '', children: 'Waiting...' }),
                                            ],
                                        }),
                                    ],
                                }),
                            (0, r.jsxs)('div', {
                                className: 'services w-100 rounded-2 bg-white p-4 my-4',
                                children: [
                                    (0, r.jsx)('strong', {
                                        className: 'c-fs-4 fw-semibold',
                                        children: 'Add-on services',
                                    }),
                                    (0, r.jsxs)('div', {
                                        className: 'row',
                                        children: [
                                            (0, r.jsxs)('div', {
                                                className: 'col-6',
                                                children: [
                                                    (0, r.jsxs)('div', {
                                                        className: 'my-2 c-fs-5',
                                                        children: [
                                                            (0, r.jsx)('span', {
                                                                className: 'text-success me-2 c-fs-3',
                                                                children: (0, r.jsx)(l.vB0, {}),
                                                            }),
                                                            'Call Recording',
                                                        ],
                                                    }),
                                                    (0, r.jsxs)('div', {
                                                        children: [
                                                            (0, r.jsx)('span', {
                                                                className: 'text-success me-2 c-fs-3',
                                                                children: (0, r.jsx)(l.vB0, {}),
                                                            }),
                                                            'Analytics',
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, r.jsxs)('div', {
                                                className: 'col-6',
                                                children: [
                                                    (0, r.jsxs)('div', {
                                                        className: 'my-2',
                                                        children: [
                                                            (0, r.jsx)('span', {
                                                                className: 'text-success me-2 c-fs-3',
                                                                children: (0, r.jsx)(l.vB0, {}),
                                                            }),
                                                            'Call Monitoring',
                                                        ],
                                                    }),
                                                    (0, r.jsxs)('div', {
                                                        children: [
                                                            (0, r.jsx)('span', {
                                                                className: 'text-success me-2 c-fs-3',
                                                                children: (0, r.jsx)(l.vB0, {}),
                                                            }),
                                                            'Number Masking',
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, r.jsxs)('div', {
                                        className: 'c-fw-m mt-3',
                                        children: [
                                            'All the Add-On Services are',
                                            (0, r.jsx)('span', { className: 'text-green c-fw-m', children: ' FREE' }),
                                            ' of cost',
                                        ],
                                    }),
                                ],
                            }),
                            (null == i ? void 0 : null === (n = i.data) || void 0 === n ? void 0 : n.length) > 0 &&
                                (0, r.jsxs)(r.Fragment, {
                                    children: [
                                        (0, r.jsx)('a', {
                                            type: 'button',
                                            className: 'btn btn-dark fw-semibold my-4 rounded-1',
                                            href: '/signup?service=voice',
                                            target: '_blank',
                                            children: 'Get Started',
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: 'mt-3',
                                            children: [
                                                (0, r.jsx)('span', {
                                                    className: 'fw-semibold my-3',
                                                    children: 'International rate:',
                                                }),
                                                (0, r.jsx)('span', {
                                                    children:
                                                        'Calls are routed through premium A-Z routes and CLI can be any valid number. Calls without a CLI, with invalid CLI, with manipulated CLI, with CLI originated from unidentified, closed or unallocated prefix ranges, with CLI not in E.164 format, with CLI not matching ITU standards might be blocked or charged at the highest price.',
                                                }),
                                            ],
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: 'mt-3',
                                            children: [
                                                (0, r.jsx)('span', {
                                                    className: 'fw-semibold mb-3',
                                                    children: 'Local Rate:',
                                                }),
                                                (0, r.jsxs)('span', {
                                                    children: [
                                                        ' ',
                                                        'Calls are routed through local operators’ in-country network. Only numbers on your MSG91 account can be used.',
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            (0, r.jsxs)('div', {
                                className: 'connect-personalized my-4',
                                children: [
                                    (0, r.jsx)('span', {
                                        className: 'talk-to-sales d-block c-fs-4 fw-medium',
                                        children: 'Connect with our team for a personalized plan to meet your needs.',
                                    }),
                                    (0, r.jsx)('button', {
                                        type: 'button',
                                        'data-bs-toggle': 'modal',
                                        'data-bs-target': '#sales-modal',
                                        className:
                                            'btn btn-outline-dark mt-3 mb-5 fw-semibold border border-dark border rounded-1 px-3 py-1',
                                        children: 'Talk to Sales',
                                    }),
                                    (0, r.jsx)('br', {}),
                                    (0, r.jsxs)('a', {
                                        className: 'mt-3',
                                        href: '/voice',
                                        children: [
                                            (0, r.jsx)('img', {
                                                src: '/img/icon/link.svg',
                                                alt: '#',
                                                className: 'icon me-2',
                                            }),
                                            (0, r.jsx)('span', {
                                                className: 'link',
                                                children: 'Know more about Voice',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, r.jsx)(u.Z, { faqData: null == m ? void 0 : m.voice }),
                        ],
                    });
                },
                b = (e) => {
                    var a, n, c, l;
                    let {
                            pricing: t,
                            setPricing: i,
                            amountArr: m,
                            fetchSMSData: u,
                            originCountry: h,
                            setOriginCountry: p,
                            destinationCountry: v,
                            setDestinationCountry: f,
                            currency: g,
                            currencySymbol: y,
                            countryCode: b,
                        } = e,
                        [j, S] = (0, s.useState)(0),
                        [N, w] = (0, s.useState)(106),
                        [G, P] = (0, s.useState)([]);
                    (0, s.useEffect)(() => {
                        (0, d.Wi)();
                    }, [t, h, v]),
                        (0, s.useEffect)(() => {}, []),
                        (0, s.useEffect)(() => {
                            t.length > 0 && P(t.sort((e, a) => e[N].totalNoOfSms - a[N].totalNoOfSms));
                        }, [t]);
                    let B = 0,
                        k = 0,
                        _ = 0;
                    if (t[0] && t.length > 2) {
                        let e = G.slice();
                        e.unshift('-36');
                        let a = G.length,
                            r = 100 / a,
                            s = Math.floor(j / r);
                        if (t[0]) {
                            _ = t[s]
                                ? null === (n = t[s][N]) || void 0 === n
                                    ? void 0
                                    : n.rate
                                : null === (c = t[s - 1][N]) || void 0 === c
                                  ? void 0
                                  : c.rate;
                            let o = ((e[s + 1] - e[s]) * (a * (j - r * s))) / 100;
                            B = Number(e[s]) + Math.floor(o);
                        }
                        100 == j && (B = Number(e[s]));
                        let o = B * _;
                        (k = 'IN' === b ? o.toLocaleString('en-IN') : o.toLocaleString(void 0)),
                            G.length > 0 &&
                                (k =
                                    (B = null === (l = G[j][N]) || void 0 === l ? void 0 : l.totalNoOfSms) *
                                    (_ = G[j][N].rate));
                    }
                    let C = (e) => ('₹' === y ? Number(e).toLocaleString('en-IN') : Number(e).toLocaleString('en-US'));
                    return (0, r.jsx)(r.Fragment, {
                        children: (0, r.jsxs)('div', {
                            children: [
                                (null == h ? void 0 : h.length) >= 1 &&
                                    (0, r.jsxs)('div', {
                                        className: 'd-flex flex-column flex-lg-row align-items-center  gap-4 ',
                                        children: [
                                            (0, r.jsx)('span', {
                                                className: 'Send-sms c-fw-m ',
                                                children: 'Send SMS from',
                                            }),
                                            (0, r.jsxs)('div', {
                                                className:
                                                    'gap-3 col d-flex flex-column text-start flex-md-row align-items-center justify-content-start col-12 col-md-10 col-lg-7',
                                                children: [
                                                    (0, r.jsx)(x.pY, {
                                                        className: 'col c-fs-6',
                                                        id: 'originCountry c-fs-6',
                                                        placeholder: 'Origin Country',
                                                        labelKey: 'name',
                                                        onChange: (e) => {
                                                            var a, n;
                                                            i([]),
                                                                (null === (a = e[0]) || void 0 === a
                                                                    ? void 0
                                                                    : a.name) &&
                                                                    u(
                                                                        g,
                                                                        null === (n = e[0]) || void 0 === n
                                                                            ? void 0
                                                                            : n.name,
                                                                        v
                                                                    );
                                                        },
                                                        options: o,
                                                        clearButton: !0,
                                                        defaultSelected: [
                                                            null == o ? void 0 : o.find((e) => e.name === h),
                                                        ],
                                                        inputProps: { autoComplete: 'off' },
                                                    }),
                                                    (0, r.jsx)('div', { className: 'c-fw-m', children: 'To' }),
                                                    (0, r.jsx)(x.pY, {
                                                        className: 'col',
                                                        id: 'destinationCountry',
                                                        placeholder: 'Destination Country',
                                                        labelKey: 'name',
                                                        onChange: (e) => {
                                                            var a, n;
                                                            i([]),
                                                                (null === (a = e[0]) || void 0 === a
                                                                    ? void 0
                                                                    : a.name) &&
                                                                    u(
                                                                        g,
                                                                        h,
                                                                        null === (n = e[0]) || void 0 === n
                                                                            ? void 0
                                                                            : n.name
                                                                    );
                                                        },
                                                        options: o,
                                                        clearButton: !0,
                                                        defaultSelected: [
                                                            null == o ? void 0 : o.find((e) => e.name === h),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                t[0] &&
                                    (0, r.jsx)(r.Fragment, {
                                        children:
                                            t.length > 2
                                                ? (0, r.jsxs)(r.Fragment, {
                                                      children: [
                                                          (0, r.jsxs)('div', {
                                                              className:
                                                                  'd-flex flex-column gap-4 align-items center mt-3 p-4 bg-white rounded ',
                                                              children: [
                                                                  (0, r.jsx)('div', {
                                                                      className:
                                                                          'd-none d-lg-block text-center text-dark c-fw-m',
                                                                      children: 'Number of SMS',
                                                                  }),
                                                                  (0, r.jsx)('div', {
                                                                      className: ' d-none d-lg-flex',
                                                                      children: G.map((e, a) =>
                                                                          (0, r.jsx)(
                                                                              'div',
                                                                              {
                                                                                  className: 'text-center col c-fs-5',
                                                                                  children: C(e[N].totalNoOfSms),
                                                                              },
                                                                              a
                                                                          )
                                                                      ),
                                                                  }),
                                                                  (0, r.jsx)('div', {
                                                                      className: 'input-slider-padding',
                                                                      children: (0, r.jsx)('input', {
                                                                          className: 'slider',
                                                                          type: 'range',
                                                                          min: '0',
                                                                          max: G.length - 1,
                                                                          step: '1',
                                                                          value: j,
                                                                          onChange: (e) => S(e.target.value),
                                                                          'aria-label': 'Slider',
                                                                      }),
                                                                  }),
                                                                  (0, r.jsx)('div', {
                                                                      className: 'd-none d-lg-flex',
                                                                      children: G.map((e, a) => {
                                                                          var n;
                                                                          return (0, r.jsxs)(
                                                                              'div',
                                                                              {
                                                                                  className: 'text-center col c-fs-5',
                                                                                  children: [
                                                                                      y,
                                                                                      null === (n = e[N]) ||
                                                                                      void 0 === n
                                                                                          ? void 0
                                                                                          : n.rate,
                                                                                  ],
                                                                              },
                                                                              a
                                                                          );
                                                                      }),
                                                                  }),
                                                                  (0, r.jsx)('div', {
                                                                      className:
                                                                          'text-center text-dark c-fw-m d-none d-lg-block',
                                                                      children: 'Cost per SMS',
                                                                  }),
                                                              ],
                                                          }),
                                                          (0, r.jsx)('div', {
                                                              className: 'd-flex align-items-end mt-4 mb-3',
                                                              children: (0, r.jsxs)('p', {
                                                                  className: 'c-fs-2 c-fw-500',
                                                                  children: [
                                                                      (0, r.jsx)('span', {
                                                                          className: 'c-fs-1 fw-bold',
                                                                          children: C(B),
                                                                      }),
                                                                      ' SMS for',
                                                                      ' ',
                                                                      (0, r.jsxs)('span', {
                                                                          className: 'c-fs-1 text-green fw-bold',
                                                                          children: [
                                                                              y,
                                                                              C(
                                                                                  (Number(k) % 1 == 0
                                                                                      ? Number(k)
                                                                                      : Number(k).toFixed(1)
                                                                                  )
                                                                                      .toString()
                                                                                      .replace(/\.0$/, '')
                                                                              ),
                                                                          ],
                                                                      }),
                                                                      ' ',
                                                                      '₹' === y && '+18 % GST',
                                                                      ' at',
                                                                      ' ',
                                                                      (0, r.jsxs)('span', {
                                                                          className: 'c-fs-1 text-green fw-bold',
                                                                          children: [y, _],
                                                                      }),
                                                                      'per SMS',
                                                                      ' ',
                                                                  ],
                                                              }),
                                                          }),
                                                          (0, r.jsx)('a', {
                                                              href: '/signup?service=SMS',
                                                              target: '_blank',
                                                              className:
                                                                  'btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3',
                                                              children: 'Get Started',
                                                          }),
                                                      ],
                                                  })
                                                : (0, r.jsx)(r.Fragment, {
                                                      children:
                                                          (null === (a = t[0][N]) || void 0 === a ? void 0 : a.rate) &&
                                                          (0, r.jsxs)('div', {
                                                              className:
                                                                  'content-fit bg-white btn-ft d-flex flex-column border rounded gap-5 p-4 border-2 mt-4 align-items-center',
                                                              children: [
                                                                  (0, r.jsx)('h3', {
                                                                      className: 'c-fs-4',
                                                                      children: 'SMS Pricing',
                                                                  }),
                                                                  (0, r.jsxs)('h3', {
                                                                      className: 'text-green c-fs-2',
                                                                      children: [y, t[0][N].rate, 'per SMS'],
                                                                  }),
                                                                  (0, r.jsx)('a', {
                                                                      href: '/signup?service=SMS',
                                                                      target: '_blank',
                                                                      className:
                                                                          'btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3 btn-ft',
                                                                      children: 'Get Started',
                                                                  }),
                                                              ],
                                                          }),
                                                  }),
                                    }),
                                (0, r.jsxs)('div', {
                                    className: 'talk-to-sales connect-personalized mt-4',
                                    children: [
                                        (0, r.jsxs)('span', {
                                            className: 'personalized d-block c-fs-4',
                                            children: [
                                                'Connect with our team for a personalized pricing to meet your needs.',
                                                ' ',
                                            ],
                                        }),
                                        (0, r.jsx)('button', {
                                            type: 'button',
                                            'data-bs-toggle': 'modal',
                                            'data-bs-target': '#sales-modal',
                                            className:
                                                'btn btn-outline-dark mt-2 mb-4 c-fs-5 border border-dark rounded-1 px-3 py-1',
                                            children: 'Talk to Sales',
                                        }),
                                        (0, r.jsx)('br', {}),
                                        (0, r.jsxs)('a', {
                                            className: 'more-about',
                                            href: '/otp',
                                            children: [
                                                (0, r.jsx)('img', {
                                                    src: '/img/icon/link.svg',
                                                    alt: 'Know more',
                                                    className: 'icon me-2',
                                                }),
                                                (0, r.jsx)('span', { children: 'Know more about OTP' }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    });
                };
            var j = n(27918);
            let S = (e) => {
                    var a, n;
                    let { countryCode: o } = e,
                        [l, t] = (0, s.useState)(a),
                        [i, d] = (0, s.useState)([]),
                        [m, u] = (0, s.useState)([]);
                    'US' === o || 'AE' === o || 'SG' === o || 'PH' === o || 'BR' === o || '' === o || 'ES' === o
                        ? ((a = 'USD'), (n = '$'))
                        : 'GB' === o
                          ? ((a = 'GBP'), (n = '\xa3'))
                          : 'IN' === o && ((a = 'INR'), (n = '₹'));
                    let h = async (e) => {
                        try {
                            var a;
                            let n = await c.Z.get('https://whatsapp.phone91.com/get-pricing-data/'.concat(e));
                            u(
                                null == n
                                    ? void 0
                                    : null === (a = n.data) || void 0 === a
                                      ? void 0
                                      : a.data.sort((e, a) => e.country_name.localeCompare(a.country_name))
                            );
                        } catch (e) {
                            console.error('There was an error fetching the data!', e);
                        }
                    };
                    return (
                        (0, s.useEffect)(() => {
                            h(a.toLowerCase());
                        }, [o, a]),
                        (0, s.useEffect)(() => {
                            var e;
                            let n = null === (e = j[o.toLowerCase()]) || void 0 === e ? void 0 : e.name,
                                r = async () => {
                                    let e = m.find((e) => e.country_name === n),
                                        a = m.find((e) => 'Default' === e.country_name),
                                        r = m.filter((e) => e.country_name !== n && 'Default' !== e.country_name);
                                    d([e, a, ...r]);
                                };
                            m.length > 0 && (r(), t(a));
                        }, [o, m]),
                        (0, r.jsxs)(r.Fragment, {
                            children: [
                                (0, r.jsxs)('div', {
                                    className:
                                        'price-card whatsapp d-flex flex-sm-row flex-column rounded-1 col-xl-12 col-lg-11 col-md-10 bg-white p-4 gap-4 justify-content-between align-items-sm-center mb-0',
                                    children: [
                                        (0, r.jsxs)('div', {
                                            className: ' ',
                                            children: [
                                                (0, r.jsxs)('h3', {
                                                    className: 'text-start fw-bolder fs-2 text-green mb-3',
                                                    children: [
                                                        'Zero ',
                                                        (0, r.jsx)('span', {
                                                            className: 'text-dark ',
                                                            children: 'margin on meta price',
                                                        }),
                                                    ],
                                                }),
                                                (0, r.jsx)('h3', {
                                                    className: 'tds fw-medium c-fs-4 mt-2 d-block',
                                                    children: 'TDS and GST excluded.',
                                                }),
                                                (0, r.jsx)('a', {
                                                    type: 'button',
                                                    className: 'btn btn-dark fw-semibold my-3 rounded-1',
                                                    href: '/signup?service=whatsapp',
                                                    target: '_blank',
                                                    children: 'Get Started',
                                                }),
                                            ],
                                        }),
                                        (0, r.jsx)('div', {
                                            className: ' ',
                                            children: (0, r.jsx)('img', { src: '/img/icon/whatsapp-black.svg' }),
                                        }),
                                    ],
                                }),
                                (0, r.jsxs)('div', {
                                    className: 'd-flex container gap-3 flex-column text-start',
                                    children: [
                                        (0, r.jsxs)('div', {
                                            className: 'c-fs-5 mt-5',
                                            children: [
                                                'Since we do not impose any service charge,',
                                                ' ',
                                                (0, r.jsx)('strong', { children: 'INR' === l ? 'GST' : 'Taxes' }),
                                                ' will be applied to WhatsApp pricing',
                                            ],
                                        }),
                                        (null == i ? void 0 : i.length) > 0 &&
                                            (0, r.jsxs)('table', {
                                                className: 'table table-sm c-fs-5',
                                                children: [
                                                    (0, r.jsx)('thead', {
                                                        children: (0, r.jsxs)('tr', {
                                                            children: [
                                                                (0, r.jsx)('th', { scope: 'col', children: 'Market' }),
                                                                (0, r.jsx)('th', { scope: 'col', children: 'prefix' }),
                                                                (0, r.jsx)('th', {
                                                                    scope: 'col',
                                                                    children: 'Marketing',
                                                                }),
                                                                (0, r.jsx)('th', { scope: 'col', children: 'Utility' }),
                                                                (0, r.jsx)('th', {
                                                                    scope: 'col',
                                                                    children: 'Authentication',
                                                                }),
                                                                (0, r.jsx)('th', { scope: 'col', children: 'Service' }),
                                                            ],
                                                        }),
                                                    }),
                                                    (0, r.jsx)('tbody', {
                                                        children: i.map((e, a) => {
                                                            if (null == e ? void 0 : e.country_name)
                                                                return (0, r.jsxs)(
                                                                    'tr',
                                                                    {
                                                                        children: [
                                                                            (0, r.jsx)('td', {
                                                                                children:
                                                                                    null == e ? void 0 : e.country_name,
                                                                            }),
                                                                            (0, r.jsx)('td', {
                                                                                children: null == e ? void 0 : e.prefix,
                                                                            }),
                                                                            (0, r.jsxs)('td', {
                                                                                children: [
                                                                                    n,
                                                                                    isNaN(
                                                                                        parseFloat(
                                                                                            null == e
                                                                                                ? void 0
                                                                                                : e.marketing_rate
                                                                                        )
                                                                                    )
                                                                                        ? 'N/A'
                                                                                        : parseFloat(
                                                                                              e.marketing_rate
                                                                                          ).toFixed(5),
                                                                                ],
                                                                            }),
                                                                            (0, r.jsxs)('td', {
                                                                                children: [
                                                                                    n,
                                                                                    isNaN(
                                                                                        parseFloat(
                                                                                            null == e
                                                                                                ? void 0
                                                                                                : e.utility_rate
                                                                                        )
                                                                                    )
                                                                                        ? 'N/A'
                                                                                        : parseFloat(
                                                                                              e.utility_rate
                                                                                          ).toFixed(5),
                                                                                ],
                                                                            }),
                                                                            (0, r.jsxs)('td', {
                                                                                children: [
                                                                                    n,
                                                                                    isNaN(
                                                                                        parseFloat(
                                                                                            null == e
                                                                                                ? void 0
                                                                                                : e.authentication_rate
                                                                                        )
                                                                                    )
                                                                                        ? 'N/A'
                                                                                        : parseFloat(
                                                                                              e.authentication_rate
                                                                                          ).toFixed(5),
                                                                                ],
                                                                            }),
                                                                            (0, r.jsxs)('td', {
                                                                                children: [
                                                                                    n,
                                                                                    isNaN(
                                                                                        parseFloat(
                                                                                            null == e
                                                                                                ? void 0
                                                                                                : e.user_initiated_rate
                                                                                        )
                                                                                    )
                                                                                        ? 'N/A'
                                                                                        : parseFloat(
                                                                                              null == e
                                                                                                  ? void 0
                                                                                                  : e.user_initiated_rate
                                                                                          ).toFixed(5),
                                                                                ],
                                                                            }),
                                                                        ],
                                                                    },
                                                                    a
                                                                );
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        (0, r.jsxs)('a', {
                                            className: 'more-about',
                                            href: '/whatsapp',
                                            children: [
                                                (0, r.jsx)('img', {
                                                    src: '/img/icon/link.svg',
                                                    alt: '#',
                                                    className: 'icon me-2',
                                                }),
                                                (0, r.jsx)('span', { children: 'Know more about WhatsApp' }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        })
                    );
                },
                N = (e) => {
                    var a, n;
                    let { subscriptionHello: c, fetchSubscriptionHello: o, currency: l, countryCode: t } = e;
                    'US' === t || 'AE' === t || 'SG' === t || 'PH' === t || 'BR' === t || 'ES' === t
                        ? ((a = 'USD'), (n = '$'))
                        : 'GB' === t
                          ? ((a = 'GBP'), (n = '\xa3'))
                          : 'IN' === t
                            ? ((a = 'INR'), (n = '₹'))
                            : ((a = 'USD'), (n = '$'));
                    let [i, h] = (0, s.useState)(a),
                        [p, v] = (0, s.useState)('Monthly'),
                        [x, f] = (0, s.useState)(n);
                    return (
                        (0, s.useEffect)(() => {
                            (0, d.Wi)();
                        }, []),
                        (0, r.jsxs)(r.Fragment, {
                            children: [
                                (0, r.jsx)('div', {
                                    className: 'header d-flex  gap-3 justify-content-between flex-wrap my-4',
                                    children: (0, r.jsxs)('span', {
                                        className: 'd-flex',
                                        children: [
                                            (0, r.jsx)('h2', {
                                                className: ' '.concat(
                                                    'Monthly' === p ? 'active' : null,
                                                    '  text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer'
                                                ),
                                                onClick: () => v('Monthly'),
                                                children: 'Monthly',
                                            }),
                                            (0, r.jsx)('h3', {
                                                className: ' '.concat(
                                                    'Yearly' === p ? 'active' : null,
                                                    '  text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer'
                                                ),
                                                onClick: () => v('Yearly'),
                                                children: 'Yearly (20% off)',
                                            }),
                                        ],
                                    }),
                                }),
                                (0, r.jsx)('div', {
                                    className: 'w-100 card-container d-flex flex-wrap gap-4',
                                    children:
                                        (null == c ? void 0 : c.length) &&
                                        (null == c
                                            ? void 0
                                            : c.map((e) => {
                                                  var a, n;
                                                  return (0, r.jsx)(r.Fragment, {
                                                      children:
                                                          (null == e
                                                              ? void 0
                                                              : null === (a = e.plan_amounts) || void 0 === a
                                                                ? void 0
                                                                : a.length) &&
                                                          (null == e
                                                              ? void 0
                                                              : null === (n = e.plan_amounts) || void 0 === n
                                                                ? void 0
                                                                : n.map((a, n) => {
                                                                      var s, c;
                                                                      if (
                                                                          (null == a
                                                                              ? void 0
                                                                              : null === (s = a.currency) ||
                                                                                  void 0 === s
                                                                                ? void 0
                                                                                : s.short_name) === l &&
                                                                          (null == a
                                                                              ? void 0
                                                                              : null === (c = a.plan_type) ||
                                                                                  void 0 === c
                                                                                ? void 0
                                                                                : c.name) === p
                                                                      )
                                                                          return (0, r.jsx)(w, {
                                                                              plan: e,
                                                                              planAmount: a,
                                                                              currency: l,
                                                                              selectedMode: p,
                                                                          });
                                                                  })),
                                                  });
                                              })),
                                }),
                                (0, r.jsxs)('div', {
                                    className: 'my-4 connect-personalized',
                                    children: [
                                        (0, r.jsx)('span', {
                                            className: 'talk-to-sales d-block c-fs-4',
                                            children:
                                                'Connect with our team for a personalized plan to meet your needs.',
                                        }),
                                        (0, r.jsx)('button', {
                                            type: 'button',
                                            'data-bs-toggle': 'modal',
                                            'data-bs-target': '#sales-modal',
                                            className:
                                                'btn btn-outline-dark mt-2 mb-4 c-fs-5 border border-dark rounded-1 px-3 py-1',
                                            children: 'Talk to Sales',
                                        }),
                                        (0, r.jsx)('br', {}),
                                        (0, r.jsxs)('a', {
                                            href: '/hello',
                                            children: [
                                                (0, r.jsx)('img', {
                                                    src: '/img/icon/link.svg',
                                                    alt: 'Know more',
                                                    className: 'icon me-2',
                                                }),
                                                (0, r.jsx)('span', {
                                                    className: 'link',
                                                    children: 'Know more about Hello',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, r.jsx)(u.Z, { faqData: null == m ? void 0 : m.hello }),
                            ],
                        })
                    );
                };
            function w(e) {
                var a, n, s, c, o, t, d, m;
                let { plan: u, planAmount: h, currency: p, selectedMode: v } = e;
                return (0, r.jsxs)('div', {
                    className: 'card d-flex align-items-start rounded-2 bg-white p-4  gap-3 '.concat(
                        (null == u ? void 0 : u.most_popular) ? 'border-2' : 'border-0'
                    ),
                    children: [
                        (0, r.jsxs)('div', {
                            className: 'd-flex flex-column gap-3 w-100',
                            children: [
                                (0, r.jsxs)('div', {
                                    className: 'd-flex flex-wrap gap-2 populartag_cont w-100',
                                    children: [
                                        (0, r.jsx)('h3', {
                                            className: 'fs-4 fw-semibold email_plan_name w-100',
                                            children: null == u ? void 0 : u.name,
                                        }),
                                        u &&
                                            (null == u ? void 0 : u.most_popular) &&
                                            (0, r.jsx)('span', {
                                                className:
                                                    'populartag_tag border border-1 border-dark c-fw-sb rounded-5 px-3 btn-ft ms-auto',
                                                children: 'Popular',
                                            }),
                                    ],
                                }),
                                (0, r.jsxs)('span', {
                                    className: 'mt-2 c-fs-2 c-fw-sb text-green',
                                    children: [
                                        null == h
                                            ? void 0
                                            : null === (a = h.currency) || void 0 === a
                                              ? void 0
                                              : a.symbol,
                                        null == h ? void 0 : h.plan_amount,
                                        ' ',
                                        v,
                                    ],
                                }),
                                (0, r.jsxs)('span', {
                                    className: 'c-fs-5',
                                    children: [
                                        ' ',
                                        (null == h
                                            ? void 0
                                            : null === (n = h.currency) || void 0 === n
                                              ? void 0
                                              : n.short_name) === 'INR'
                                            ? '+18% GST'
                                            : '-',
                                    ],
                                }),
                                (0, r.jsx)(i(), {
                                    href: '/signup?service=hello',
                                    target: '_blank',
                                    children: (0, r.jsx)('button', {
                                        className: 'btn '.concat(
                                            (null == u ? void 0 : u.most_popular) ? 'btn-dark' : 'btn-outline-dark',
                                            '  rounded-md'
                                        ),
                                        children: 'Get Started',
                                    }),
                                }),
                            ],
                        }),
                        (0, r.jsx)('hr', { className: 'w-100', style: { borderColor: 'rgba(0, 0, 0, 0.6)' } }),
                        (0, r.jsxs)('div', {
                            className: 'd-flex flex-column gap-2',
                            children: [
                                (0, r.jsx)('h4', { className: 'c-fs-4 c-fw-sb', children: 'Included' }),
                                (0, r.jsx)('div', {
                                    className: 'd-flex flex-column',
                                    children:
                                        (null == u
                                            ? void 0
                                            : null === (s = u.plan_services) || void 0 === s
                                              ? void 0
                                              : s.length) &&
                                        (null == u
                                            ? void 0
                                            : null === (c = u.plan_services) || void 0 === c
                                              ? void 0
                                              : c.map((e, a) => {
                                                    var n, s, c, o;
                                                    return (0, r.jsx)(r.Fragment, {
                                                        children:
                                                            (null == e
                                                                ? void 0
                                                                : null === (n = e.service_credit) || void 0 === n
                                                                  ? void 0
                                                                  : null === (s = n.service_credit_rates) ||
                                                                      void 0 === s
                                                                    ? void 0
                                                                    : s.length) &&
                                                            (null == e
                                                                ? void 0
                                                                : null === (c = e.service_credit) || void 0 === c
                                                                  ? void 0
                                                                  : null === (o = c.service_credit_rates) ||
                                                                      void 0 === o
                                                                    ? void 0
                                                                    : o.map((a, n) => {
                                                                          var s, c, o, l, t;
                                                                          if (
                                                                              (null == a
                                                                                  ? void 0
                                                                                  : null === (s = a.currency) ||
                                                                                      void 0 === s
                                                                                    ? void 0
                                                                                    : s.short_name) === p
                                                                          )
                                                                              return (0, r.jsxs)(
                                                                                  'span',
                                                                                  {
                                                                                      children: [
                                                                                          null ===
                                                                                              (c =
                                                                                                  null == e
                                                                                                      ? void 0
                                                                                                      : null ===
                                                                                                              (o =
                                                                                                                  e.service_credit) ||
                                                                                                          void 0 === o
                                                                                                        ? void 0
                                                                                                        : o
                                                                                                              .service_credit_rates[0]) ||
                                                                                          void 0 === c
                                                                                              ? void 0
                                                                                              : c.free_credits,
                                                                                          ' ',
                                                                                          null == e
                                                                                              ? void 0
                                                                                              : null ===
                                                                                                      (l =
                                                                                                          e.service_credit) ||
                                                                                                  void 0 === l
                                                                                                ? void 0
                                                                                                : null ===
                                                                                                        (t =
                                                                                                            l.service) ||
                                                                                                    void 0 === t
                                                                                                  ? void 0
                                                                                                  : t.name,
                                                                                          '/month',
                                                                                      ],
                                                                                  },
                                                                                  n
                                                                              );
                                                                      })),
                                                    });
                                                })),
                                }),
                            ],
                        }),
                        (0, r.jsxs)('div', {
                            className: 'd-flex flex-column gap-2',
                            children: [
                                (0, r.jsx)('h4', { className: 'c-fs-4 c-fw-sb', children: 'Features' }),
                                (0, r.jsx)('div', {
                                    className: 'd-flex flex-column',
                                    children:
                                        (null == u
                                            ? void 0
                                            : null === (o = u.plan_features) || void 0 === o
                                              ? void 0
                                              : o.length) &&
                                        (null == u
                                            ? void 0
                                            : null === (t = u.plan_features) || void 0 === t
                                              ? void 0
                                              : t.map((e, a) => {
                                                    var n, s, c, o;
                                                    return (null == e ? void 0 : e.is_visible)
                                                        ? (0, r.jsxs)(
                                                              'span',
                                                              {
                                                                  children: [
                                                                      (
                                                                          null == e
                                                                              ? void 0
                                                                              : null === (s = e.feature) || void 0 === s
                                                                                ? void 0
                                                                                : s.is_included
                                                                      )
                                                                          ? (0, r.jsx)(l.vB0, {
                                                                                className:
                                                                                    'text-green me-2 prcing-check',
                                                                            })
                                                                          : (0, r.jsx)(l.FU5, {
                                                                                className:
                                                                                    'text-danger me-2 prcing-check',
                                                                            }),
                                                                      null == e
                                                                          ? void 0
                                                                          : null === (c = e.feature) || void 0 === c
                                                                            ? void 0
                                                                            : c.name,
                                                                  ],
                                                              },
                                                              'feature'.concat(a)
                                                          )
                                                        : (
                                                                null == e
                                                                    ? void 0
                                                                    : null === (n = e.feature) || void 0 === n
                                                                      ? void 0
                                                                      : n.is_included
                                                            )
                                                          ? void 0
                                                          : (0, r.jsxs)(
                                                                'span',
                                                                {
                                                                    children: [
                                                                        (0, r.jsx)(l.FU5, {
                                                                            className: 'text-danger me-2 prcing-check',
                                                                        }),
                                                                        null == e
                                                                            ? void 0
                                                                            : null === (o = e.feature) || void 0 === o
                                                                              ? void 0
                                                                              : o.name,
                                                                    ],
                                                                },
                                                                'feature'.concat(a)
                                                            );
                                                })),
                                }),
                            ],
                        }),
                        (0, r.jsxs)('div', {
                            className: 'd-flex flex-column gap-2',
                            children: [
                                (0, r.jsx)('h4', { className: 'c-fs-4 c-fw-sb', children: 'Extra @' }),
                                (0, r.jsx)('div', {
                                    className: 'd-flex flex-column',
                                    children:
                                        (null == u
                                            ? void 0
                                            : null === (d = u.plan_services) || void 0 === d
                                              ? void 0
                                              : d.length) &&
                                        (null == u
                                            ? void 0
                                            : null === (m = u.plan_services) || void 0 === m
                                              ? void 0
                                              : m.map((e, a) => {
                                                    var n, s, c, o;
                                                    return (0, r.jsx)(r.Fragment, {
                                                        children:
                                                            (null == e
                                                                ? void 0
                                                                : null === (n = e.service_credit) || void 0 === n
                                                                  ? void 0
                                                                  : null === (s = n.service_credit_rates) ||
                                                                      void 0 === s
                                                                    ? void 0
                                                                    : s.length) &&
                                                            (null == e
                                                                ? void 0
                                                                : null === (c = e.service_credit) || void 0 === c
                                                                  ? void 0
                                                                  : null === (o = c.service_credit_rates) ||
                                                                      void 0 === o
                                                                    ? void 0
                                                                    : o.map((a, n) => {
                                                                          var s, c, o, t, i, d, m, h;
                                                                          if (
                                                                              (null == a
                                                                                  ? void 0
                                                                                  : null === (s = a.currency) ||
                                                                                      void 0 === s
                                                                                    ? void 0
                                                                                    : s.short_name) === p
                                                                          )
                                                                              return (0, r.jsx)(
                                                                                  'span',
                                                                                  {
                                                                                      children: (
                                                                                          null == u
                                                                                              ? void 0
                                                                                              : u.postpaid_allowed
                                                                                      )
                                                                                          ? (0, r.jsxs)(r.Fragment, {
                                                                                                children: [
                                                                                                    (0, r.jsx)(l.vB0, {
                                                                                                        className:
                                                                                                            'text-green me-2 prcing-check',
                                                                                                    }),
                                                                                                    null == a
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (c =
                                                                                                                    a.currency) ||
                                                                                                            void 0 === c
                                                                                                          ? void 0
                                                                                                          : c.symbol,
                                                                                                    null == a
                                                                                                        ? void 0
                                                                                                        : a.follow_up_rate,
                                                                                                    '/',
                                                                                                    null == e
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (o =
                                                                                                                    e.service_credit) ||
                                                                                                            void 0 === o
                                                                                                          ? void 0
                                                                                                          : null ===
                                                                                                                  (t =
                                                                                                                      o.service) ||
                                                                                                              void 0 ===
                                                                                                                  t
                                                                                                            ? void 0
                                                                                                            : t.name,
                                                                                                    (
                                                                                                        null == e
                                                                                                            ? void 0
                                                                                                            : null ===
                                                                                                                    (i =
                                                                                                                        e.service_credit) ||
                                                                                                                void 0 ===
                                                                                                                    i
                                                                                                              ? void 0
                                                                                                              : null ===
                                                                                                                      (d =
                                                                                                                          i.service) ||
                                                                                                                  void 0 ===
                                                                                                                      d
                                                                                                                ? void 0
                                                                                                                : d.is_rental
                                                                                                    )
                                                                                                        ? '/month'
                                                                                                        : '',
                                                                                                ],
                                                                                            })
                                                                                          : (0, r.jsxs)(r.Fragment, {
                                                                                                children: [
                                                                                                    (0, r.jsx)(l.FU5, {
                                                                                                        className:
                                                                                                            'text-danger me-2 prcing-check',
                                                                                                    }),
                                                                                                    'No Extra ',
                                                                                                    ' ',
                                                                                                    null == e
                                                                                                        ? void 0
                                                                                                        : null ===
                                                                                                                (m =
                                                                                                                    e.service_credit) ||
                                                                                                            void 0 === m
                                                                                                          ? void 0
                                                                                                          : null ===
                                                                                                                  (h =
                                                                                                                      m.service) ||
                                                                                                              void 0 ===
                                                                                                                  h
                                                                                                            ? void 0
                                                                                                            : h.name,
                                                                                                ],
                                                                                            }),
                                                                                  },
                                                                                  n
                                                                              );
                                                                      })),
                                                    });
                                                })),
                                }),
                            ],
                        }),
                        (0, r.jsx)('div', {}),
                    ],
                });
            }
            let G = () =>
                    (0, r.jsxs)(r.Fragment, {
                        children: [
                            (0, r.jsxs)('div', {
                                className: 'price-card rcs bg-white rounded-2 p-4',
                                children: [
                                    (0, r.jsx)('h2', {
                                        className: 'text-start fw-bold c-fs-1 text-green',
                                        children: 'Free',
                                    }),
                                    (0, r.jsx)('h3', {
                                        className: 'card-write c-fs-3 my-3 c-fw-m',
                                        children: 'You can store user information for free using Segmento.',
                                    }),
                                    (0, r.jsx)('a', {
                                        href: '/signup?service=segmento',
                                        target: '_blank',
                                        className:
                                            'btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3',
                                        children: 'Get Started',
                                    }),
                                ],
                            }),
                            (0, r.jsxs)('a', {
                                className: 'more-about',
                                href: '/segmento',
                                children: [
                                    (0, r.jsx)('img', {
                                        src: '/img/icon/link.svg',
                                        alt: 'Know more',
                                        className: 'icon me-2',
                                    }),
                                    (0, r.jsx)('span', { children: 'Know more about Segmento' }),
                                ],
                            }),
                        ],
                    }),
                P = () =>
                    (0, r.jsxs)(r.Fragment, {
                        children: [
                            (0, r.jsxs)('div', {
                                className: 'price-card campaign rounded-2 bg-white p-4',
                                children: [
                                    (0, r.jsx)('h2', {
                                        className: 'text-start fw-bold c-fs-1 text-green',
                                        children: 'Free',
                                    }),
                                    (0, r.jsx)('h3', { className: 'c-fs-3 mt-3', children: 'Campaign usage is free.' }),
                                    (0, r.jsx)('h3', {
                                        className: 'c-fs-3 mb-3',
                                        children: 'Channel wise pricing will be applicable for sending message.',
                                    }),
                                    (0, r.jsx)('a', {
                                        href: '/signup?service=campaign',
                                        target: '_blank',
                                        className:
                                            'btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3',
                                        children: 'Get Started',
                                    }),
                                ],
                            }),
                            (0, r.jsxs)('a', {
                                href: '/campaign',
                                children: [
                                    (0, r.jsx)('img', {
                                        src: '/img/icon/link.svg',
                                        alt: 'Know more',
                                        className: 'icon me-2',
                                    }),
                                    (0, r.jsx)('span', { className: 'link', children: 'Know more about Campaign' }),
                                ],
                            }),
                        ],
                    });
            var B = n(20761);
            let k = () =>
                    (0, r.jsxs)(r.Fragment, {
                        children: [
                            (0, r.jsxs)('div', {
                                className: 'price-card rcs bg-white p-4 rounded-2',
                                children: [
                                    (0, r.jsx)('h2', {
                                        className: 'card-write c-fs-3 mb-3',
                                        children: 'Connect To Our Team For The Customized Pricing',
                                    }),
                                    (0, r.jsx)('button', {
                                        'data-bs-toggle': 'modal',
                                        'data-bs-target': '#sales-modal',
                                        className: 'fw-semibold  btn btn-dark rounded-1 py-2 px-3 mt-2',
                                        children: 'Get Started',
                                    }),
                                ],
                            }),
                            (0, r.jsx)('div', {
                                className: 'modal fade',
                                id: 'sales-modal',
                                tabIndex: -1,
                                'aria-labelledby': 'Schedule a meeting',
                                'aria-hidden': 'true',
                                children: (0, r.jsx)('div', {
                                    className: 'modal-dialog modal-xl',
                                    children: (0, r.jsxs)('div', {
                                        className: 'modal-content',
                                        children: [
                                            (0, r.jsx)('div', {
                                                className: 'modal-header',
                                                children: (0, r.jsx)('button', {
                                                    type: 'button',
                                                    className: 'btn-close',
                                                    'data-bs-dismiss': 'modal',
                                                    'aria-label': 'Close',
                                                }),
                                            }),
                                            (0, r.jsx)('div', {
                                                className: 'modal-body',
                                                children: (0, r.jsx)(B.KS, {
                                                    url: 'https://calendly.com/sales-msg91/pre-sales',
                                                    styles: { height: '660px' },
                                                }),
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                        ],
                    }),
                _ = () =>
                    (0, r.jsxs)(r.Fragment, {
                        children: [
                            (0, r.jsxs)('div', {
                                className: 'price-card rcs bg-white p-4 rounded-2',
                                children: [
                                    (0, r.jsx)('h2', {
                                        className: 'text-start fw-bold c-fs-1 text-green',
                                        children: 'Free',
                                    }),
                                    (0, r.jsx)('h3', {
                                        className: 'card-write c-fs-3 mt-3',
                                        children: 'OTP widget/SDK usage is free. ',
                                    }),
                                    (0, r.jsx)('h3', {
                                        className: 'card-write c-fs-3 mb-3',
                                        children: 'Channel wise pricing will be applicable for sending message.',
                                    }),
                                    (0, r.jsx)('a', {
                                        href: '/signup?service=otpwidget',
                                        target: '_blank',
                                        className:
                                            'btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3',
                                        children: 'Get Started',
                                    }),
                                ],
                            }),
                            (0, r.jsxs)('a', {
                                className: 'more-about',
                                href: '/otp',
                                children: [
                                    (0, r.jsx)('img', {
                                        src: '/img/icon/link.svg',
                                        alt: 'Know more',
                                        className: 'icon me-2',
                                    }),
                                    (0, r.jsx)('span', { children: 'Know more about OTP widget/SDK' }),
                                ],
                            }),
                            (0, r.jsx)(u.Z, { faqData: null == m ? void 0 : m.otp }),
                        ],
                    }),
                C = () => (
                    (0, s.useEffect)(() => {
                        (0, d.Wi)();
                    }, []),
                    (0, r.jsx)(r.Fragment, {
                        children: (0, r.jsxs)('div', {
                            className:
                                'd-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-end',
                            children: [
                                (0, r.jsx)('div', {
                                    className: 'mx-3',
                                    children: (0, r.jsx)('div', {
                                        className:
                                            'card kb price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey',
                                        children: (0, r.jsxs)('div', {
                                            className: 'card-body',
                                            children: [
                                                (0, r.jsx)('h3', { className: 'c-fs-3', children: 'Free' }),
                                                (0, r.jsx)('h5', { className: 'mt-2 c-fs-2', children: '$0/Month' }),
                                                (0, r.jsxs)('div', {
                                                    className: 'c-fs-5 mt-2',
                                                    children: [
                                                        'This plan is free of cost and offers limited but ',
                                                        (0, r.jsx)('a', {
                                                            href: '/knowledgebase',
                                                            target: '_blank',
                                                            children: 'all necessary features',
                                                        }),
                                                        ' to make your customer KnowledgeBase live.',
                                                    ],
                                                }),
                                                (0, r.jsx)(i(), {
                                                    href: '/signup?service=knowledgebase',
                                                    target: '_blank',
                                                    className: 'c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm',
                                                    children: 'Get Started',
                                                }),
                                            ],
                                        }),
                                    }),
                                }),
                                (0, r.jsx)('div', {
                                    className: 'mx-3',
                                    children: (0, r.jsx)('div', {
                                        className: 'text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ',
                                        children: (0, r.jsx)('div', {
                                            className:
                                                'price-card email card kb text-center mb-4 mb-sm-0 c-bg-grey border-0',
                                            children: (0, r.jsxs)('div', {
                                                className: 'card-body',
                                                children: [
                                                    (0, r.jsx)('h3', { className: 'c-fs-3', children: 'Alpha' }),
                                                    (0, r.jsx)('h5', {
                                                        className: 'mt-2 c-fs-2',
                                                        children: '$50/Month',
                                                    }),
                                                    (0, r.jsx)('div', { className: 'c-fs-3', children: '+' }),
                                                    (0, r.jsx)('div', {
                                                        className: 'c-fs-4',
                                                        children: '0.00275 USD per read count',
                                                    }),
                                                    (0, r.jsxs)('div', {
                                                        className: 'c-fs-5 mt-2',
                                                        children: [
                                                            'Unlock all premium/nice to have/ luxury features, Explore all features ',
                                                            (0, r.jsx)(i(), {
                                                                href: '/knowledgebase',
                                                                target: '_blank',
                                                                children: 'here',
                                                            }),
                                                        ],
                                                    }),
                                                    (0, r.jsx)(i(), {
                                                        href: '/signup?service=knowledgebase',
                                                        target: '_blank',
                                                        className: 'c-fs-5 btn btn-sm w-100 btn-dark mt-2 utm',
                                                        children: 'Get Started',
                                                    }),
                                                ],
                                            }),
                                        }),
                                    }),
                                }),
                            ],
                        }),
                    })
                ),
                D = (e) => {
                    let { countryCode: a, product: n, browserPath: t, pathArray: d } = e;
                    var m = ['US', 'GB', 'IN', 'BR', 'SG', 'AE', 'PH', 'ES'].includes(a),
                        [u, p] = (0, s.useState)([]),
                        [v, x] = (0, s.useState)(''),
                        [g, j] = (0, s.useState)(''),
                        [w, D] = (0, s.useState)(''),
                        [U, I] = (0, s.useState)(''),
                        [M, F] = (0, s.useState)(''),
                        T = ['1250', '3300', '5400', '10200', '20000', '76500', '154000'],
                        [E, A] = (0, s.useState)([]),
                        [K, L] = (0, s.useState)([]),
                        [H, R] = (0, s.useState)([]),
                        [O, W] = (0, s.useState)([]),
                        [q, z] = (0, s.useState)([]);
                    let [Y, V] = (0, s.useState)(),
                        [Z, J] = (0, s.useState)(''),
                        [$, Q] = (0, s.useState)(),
                        X = async (e) => {
                            'INR' == e
                                ? (I('₹'), F('3000 +GST'))
                                : 'GBP' == e
                                  ? (F('35'), I('\xa3'))
                                  : (I('$'), F('40'));
                        },
                        ee = async () => {
                            V(w), J('1'), Q('subscriptionEmail'), ec(w, '1', 'subscriptionEmail');
                        },
                        ea = async () => {
                            V(w), J('2'), Q('subscriptionSegmento'), ec(w, '2', 'subscriptionSegmento');
                        },
                        en = async () => {
                            V(w), J('7'), Q('SubscriptionHello'), ec(w, '7', 'subscriptionHello');
                        },
                        er = async () => {
                            V(w), J('5'), Q('SubscriptionWhatsapp'), ec(w, '5', 'SubscriptionWhatsapp');
                        };
                    (0, s.useEffect)(() => {
                        'email' === n
                            ? ee(w)
                            : 'segmento' === n
                              ? ea(w)
                              : 'whatsapp' === n
                                ? er(w)
                                : 'hello' === n && en(w);
                    }, [n, w]);
                    let es = async (e, a, n) => {
                            x(a), j(n), (T = 'India' == a && 'INR' == e ? T : ['5000']), X(e);
                            try {
                                let r = T.map(async (r) => {
                                        let s = await c.Z.get(
                                            ''
                                                .concat(
                                                    'https://api.msg91.com',
                                                    '/api/v5/web/fetchPricingDetails?amount='
                                                )
                                                .concat(r, '&currency=')
                                                .concat(e, '&originCountry=')
                                                .concat(a, '&destinationCountry=')
                                                .concat(n)
                                        );
                                        return s.data.data;
                                    }),
                                    s = await Promise.all(r);
                                p([...s]);
                            } catch (e) {
                                console.error('Error fetching pricing details:', e);
                            }
                        },
                        ec = async (e, a, n) => {
                            if (e && a)
                                try {
                                    X(e);
                                    let r = await c.Z.get(
                                        ''
                                            .concat('https://subscription.msg91.com/api', '/plans?currency=')
                                            .concat(e, '&ms_id=')
                                            .concat(a)
                                    );
                                    switch (n) {
                                        case 'subscriptionEmail':
                                            A([...r.data.data]);
                                            break;
                                        case 'SubscriptionWhatsapp':
                                            R([...r.data.data]);
                                            break;
                                        case 'subscriptionSegmento':
                                            W([...r.data.data]);
                                            break;
                                        case 'SubscriptionVoice':
                                            L([...r.data.data]);
                                            break;
                                        case 'subscriptionHello':
                                            z([...r.data.data]);
                                    }
                                } catch (e) {
                                    throw Error('Some error on server: ' + e.message);
                                }
                        },
                        eo = async (e) => {
                            let a = await (null == o ? void 0 : o.find((a) => a.shortname === e));
                            D(null == a ? void 0 : a.currency),
                                es(
                                    null == a ? void 0 : a.currency,
                                    null == a ? void 0 : a.name,
                                    null == a ? void 0 : a.name
                                ),
                                'email' === n
                                    ? ee(null == a ? void 0 : a.currency)
                                    : 'segmento' === n
                                      ? ea(null == a ? void 0 : a.currency)
                                      : 'whatsapp' === n
                                        ? er(null == a ? void 0 : a.currency)
                                        : 'hello' === n && en(null == a ? void 0 : a.currency);
                        };
                    (0, s.useEffect)(() => {
                        eo(a);
                    }, [a]);
                    let el = [
                        { type: 'heading', heading: 'Applications' },
                        {
                            product: 'hello',
                            productDes: 'hello logo',
                            productName: 'Hello',
                            des: 'Contact Center',
                            onclick: () => ec(w, '7', 'subscriptionHello'),
                        },
                        {
                            product: 'campaign',
                            productDes: 'campaign logo',
                            productName: 'Campaign',
                            des: 'Event-bassed automation',
                            onclick: () => ec(w, '7', 'subscriptionHello'),
                        },
                        {
                            product: 'segmento',
                            productDes: 'segmento logo',
                            productName: 'Segmento',
                            des: 'Contact management',
                            onclick: () => ec(w, '2', 'subscriptionSegmento'),
                        },
                        {
                            product: 'otpwidget',
                            productDes: 'otpwidget logo',
                            productName: 'OTP',
                            des: 'OTP widget SDK',
                        },
                        { type: 'heading', heading: 'Channels' },
                        { product: 'sms', productDes: 'sms logo', productName: 'SMS', onclick: () => es(w, v, g) },
                        { product: 'otp', productDes: 'otp logo', productName: 'SendOTP', onclick: () => es(w, v, g) },
                        {
                            product: 'email',
                            productDes: 'email logo',
                            productName: 'Email',
                            onclick: () => ec(w, '1', 'subscriptionEmail'),
                        },
                        {
                            product: 'whatsapp',
                            productDes: 'whatsapp logo',
                            productName: 'WhatsApp',
                            onclick: () => ec(w, '5', 'SubscriptionWhatsapp'),
                        },
                        { product: 'voice', productDes: 'voice logo', productName: 'Voice' },
                        { product: 'rcs', productDes: 'rcs logo', productName: 'RCS' },
                    ];
                    return (0, r.jsx)(r.Fragment, {
                        children: (0, r.jsxs)('div', {
                            className: 'main-container  ',
                            children: [
                                (0, r.jsxs)('div', {
                                    className: 'container p-md-4 p-2 d-flex gap-4 flex-column flex-md-row',
                                    children: [
                                        (0, r.jsxs)('div', {
                                            className:
                                                'dropdown d-flex d-md-none align-items-center   w-75 px-2 py-1 br-2',
                                            children: [
                                                (0, r.jsxs)('button', {
                                                    className:
                                                        'w-100 gap-2 align-items-center d-flex text-dark border-0 outline-none ',
                                                    'data-bs-toggle': 'dropdown',
                                                    'aria-expanded': 'false',
                                                    children: [
                                                        (0, r.jsxs)('div', {
                                                            className: ' d-flex align-items-center gap-1',
                                                            children: [
                                                                (0, r.jsx)('img', {
                                                                    src: '/img/icon/'.concat(n, '.svg'),
                                                                    alt: n,
                                                                    className: 'icon-drop',
                                                                }),
                                                                (0, r.jsx)('span', {
                                                                    className: 'c-fs-5 c-fw-m text-capitalize',
                                                                    children: n,
                                                                }),
                                                            ],
                                                        }),
                                                        (0, r.jsx)(l.Yc6, {}),
                                                    ],
                                                }),
                                                (0, r.jsx)('ul', {
                                                    className: 'dropdown-menu p-2',
                                                    children: el.map((e, a) =>
                                                        'heading' === e.type
                                                            ? (0, r.jsx)(
                                                                  'li',
                                                                  { className: 'c-fw-m c-fs-5 ', children: e.heading },
                                                                  a
                                                              )
                                                            : (0, r.jsx)(
                                                                  'li',
                                                                  {
                                                                      children: (0, r.jsx)(i(), {
                                                                          href:
                                                                              m && d
                                                                                  ? '/'
                                                                                        .concat(d[1], '/pricing/')
                                                                                        .concat(
                                                                                            null == e
                                                                                                ? void 0
                                                                                                : e.product
                                                                                        )
                                                                                  : '/pricing/'.concat(
                                                                                        null == e ? void 0 : e.product
                                                                                    ),
                                                                          className: 'dropdown-item  w-100 '.concat(
                                                                              n === (null == e ? void 0 : e.product)
                                                                                  ? 'active'
                                                                                  : ''
                                                                          ),
                                                                          id: ''.concat(
                                                                              null == e ? void 0 : e.product,
                                                                              '-btn'
                                                                          ),
                                                                          onClick: () => {
                                                                              (null == e ? void 0 : e.onclick) &&
                                                                                  (null == e || e.onclick());
                                                                          },
                                                                          children: (0, r.jsx)('span', {
                                                                              className:
                                                                                  'nav-link d-flex flex-column align-items-start justify-content-center',
                                                                              children: (0, r.jsxs)('div', {
                                                                                  className:
                                                                                      'd-flex align-items-center gap-1',
                                                                                  children: [
                                                                                      (0, r.jsx)('img', {
                                                                                          src: '/img/icon/'.concat(
                                                                                              null == e
                                                                                                  ? void 0
                                                                                                  : e.product,
                                                                                              '.svg'
                                                                                          ),
                                                                                          alt:
                                                                                              null == e
                                                                                                  ? void 0
                                                                                                  : e.productDes,
                                                                                          className: 'icon-drop',
                                                                                      }),
                                                                                      (0, r.jsx)('span', {
                                                                                          className:
                                                                                              'c-fs-5 c-fw-m text-capitalize',
                                                                                          children:
                                                                                              null == e
                                                                                                  ? void 0
                                                                                                  : e.productName,
                                                                                      }),
                                                                                  ],
                                                                              }),
                                                                          }),
                                                                      }),
                                                                  },
                                                                  a
                                                              )
                                                    ),
                                                }),
                                            ],
                                        }),
                                        (0, r.jsx)('div', {
                                            className: ' d-none d-md-flex flex-column gap-2 align-items-start py-4',
                                            id: 'pricing-pills-tab',
                                            children: el.map((e, a) =>
                                                'heading' === e.type
                                                    ? (0, r.jsx)(
                                                          'h1',
                                                          { className: 'c-fw-m fs-6  ', children: e.heading },
                                                          a
                                                      )
                                                    : (0, r.jsx)(
                                                          i(),
                                                          {
                                                              href:
                                                                  m && d
                                                                      ? '/'
                                                                            .concat(d[1], '/pricing/')
                                                                            .concat(null == e ? void 0 : e.product)
                                                                      : '/pricing/'.concat(
                                                                            null == e ? void 0 : e.product
                                                                        ),
                                                              className: 'nav-item w-100 '.concat(
                                                                  n === (null == e ? void 0 : e.product) ? 'active' : ''
                                                              ),
                                                              id: ''.concat(null == e ? void 0 : e.product, '-btn'),
                                                              onClick: () => {
                                                                  (null == e ? void 0 : e.onclick) &&
                                                                      (null == e || e.onclick());
                                                              },
                                                              children: (0, r.jsxs)('span', {
                                                                  className:
                                                                      'nav-link d-flex flex-column align-items-start justify-content-center',
                                                                  children: [
                                                                      (0, r.jsxs)('div', {
                                                                          className: 'd-flex align-items-center',
                                                                          children: [
                                                                              (0, r.jsx)('img', {
                                                                                  src: '/img/icon/'.concat(
                                                                                      null == e ? void 0 : e.product,
                                                                                      '.svg'
                                                                                  ),
                                                                                  alt:
                                                                                      null == e ? void 0 : e.productDes,
                                                                                  className: 'icon',
                                                                              }),
                                                                              (0, r.jsx)('span', {
                                                                                  className:
                                                                                      'c-fs-4 c-fw-m text-capitalize',
                                                                                  children:
                                                                                      null == e
                                                                                          ? void 0
                                                                                          : e.productName,
                                                                              }),
                                                                          ],
                                                                      }),
                                                                      (0, r.jsx)('span', {
                                                                          className: 'base',
                                                                          children: null == e ? void 0 : e.des,
                                                                      }),
                                                                  ],
                                                              }),
                                                          },
                                                          a
                                                      )
                                            ),
                                        }),
                                        (0, r.jsxs)('div', {
                                            className: ' price-container w-100 p-md-4 p-1',
                                            children: [
                                                'sms' === n &&
                                                    (0, r.jsx)(f, {
                                                        amountArr: T,
                                                        pricing: u,
                                                        setPricing: p,
                                                        fetchSMSData: es,
                                                        originCountry: v,
                                                        setOriginCountry: x,
                                                        destinationCountry: g,
                                                        setDestinationCountry: j,
                                                        currency: w,
                                                        countryCode: a,
                                                        currencySymbol: U,
                                                    }),
                                                'email' === n &&
                                                    (0, r.jsx)(h, {
                                                        setSubscriptionEmail: A,
                                                        subscriptionEmail: E,
                                                        fetchSubscriptionEmail: ec,
                                                        currency: w,
                                                        currencySymbol: U,
                                                        countryCode: a,
                                                    }),
                                                'voice' === n &&
                                                    (0, r.jsx)(y, {
                                                        subscriptionVoice: K,
                                                        fetchSubscriptionVoice: ec,
                                                        currency: w,
                                                        state: 'SubscriptionVoice',
                                                        setCurrencySymbol: I,
                                                        countryCode: a,
                                                    }),
                                                'whatsapp' === n &&
                                                    (0, r.jsx)(S, {
                                                        subscriptionWhatsapp: H,
                                                        fetchSubscriptionWhatsapp: ec,
                                                        currency: w,
                                                        currencySymbol: U,
                                                        oneTimeWtsAppFee: M,
                                                        countryCode: a,
                                                        pathArray: d,
                                                    }),
                                                'otpwidget' === n && (0, r.jsx)(_, {}),
                                                'otp' === n &&
                                                    (0, r.jsx)(b, {
                                                        amountArr: T,
                                                        pricing: u,
                                                        setPricing: p,
                                                        fetchSMSData: es,
                                                        originCountry: v,
                                                        setOriginCountry: x,
                                                        destinationCountry: g,
                                                        setDestinationCountry: j,
                                                        currency: w,
                                                        currencySymbol: U,
                                                    }),
                                                'hello' === n &&
                                                    (0, r.jsx)(N, {
                                                        setSubscriptionHello: z,
                                                        subscriptionHello: q,
                                                        fetchSubscriptionHello: ec,
                                                        currency: w,
                                                        state: 'SubscriptionHello',
                                                        setCurrencySymbol: I,
                                                        countryCode: a,
                                                    }),
                                                'segmento' === n &&
                                                    (0, r.jsx)(G, {
                                                        subscriptionSegmento: O,
                                                        setSubscriptionSegmento: W,
                                                        fetchSubscriptionSegmento: ec,
                                                        currency: w,
                                                        state: 'subscriptionSegmento',
                                                        setCurrencySymbol: I,
                                                        countryCode: a,
                                                        currencySymbol: U,
                                                    }),
                                                'campaign' === n && (0, r.jsx)(P, {}),
                                                'knowledgebase' === n && (0, r.jsx)(C, {}),
                                                'rcs' === n && (0, r.jsx)(k, {}),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, r.jsx)('div', {
                                    className: 'modal fade',
                                    id: 'sales-modal',
                                    tabIndex: -1,
                                    'aria-labelledby': 'Schedule a meeting',
                                    'aria-hidden': 'true',
                                    children: (0, r.jsx)('div', {
                                        className: 'modal-dialog modal-xl',
                                        children: (0, r.jsxs)('div', {
                                            className: 'modal-content',
                                            children: [
                                                (0, r.jsx)('div', {
                                                    className: 'modal-header',
                                                    children: (0, r.jsx)('button', {
                                                        type: 'button',
                                                        className: 'btn-close',
                                                        'data-bs-dismiss': 'modal',
                                                        'aria-label': 'Close',
                                                    }),
                                                }),
                                                (0, r.jsx)('div', {
                                                    className: 'modal-body',
                                                    children: (0, r.jsx)(B.KS, {
                                                        url: 'https://calendly.com/sales-msg91/pre-sales',
                                                        styles: { height: '660px' },
                                                    }),
                                                }),
                                            ],
                                        }),
                                    }),
                                }),
                            ],
                        }),
                    });
                };
            var U = s.memo(D);
        },
    },
]);
