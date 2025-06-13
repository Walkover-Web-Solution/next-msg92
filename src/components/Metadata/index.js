// components/Metadata.jsx

let meta = {
    title: '',
    description: '',
    robots: 'index, follow',
    canonical: '',
    openGraph: {
        title: '',
        description: '',
        url: '',
        images: [],
    },
    alternates: {
        canonical: '',
        languages: {},
    },
    scripts: [],
};

export function setMetadata({ data, pageInfo }) {
    const slug = pageInfo?.slug || [];
    const baseUrl = 'https://msg91.com';
    const fullSlug = slug.join('/');
    const url = `${baseUrl}/${fullSlug}`.replace(/\/+$/, '') || baseUrl;

    meta.title = data?.title || `Page - ${fullSlug || 'Home'}`;
    meta.description = data?.description || `Info about ${fullSlug || 'this page'}`;
    meta.canonical = url;

    const isEcommerce = data?.isEcommerceStore || false;
    const widgetToken = isEcommerce ? process.env.ECOMMERCE_WIDGET_TOKEN : process.env.CHAT_WIDGET_TOKEN;

    meta.scripts = [
        // 1. helloConfig definition
        {
            inline: `var helloConfig = {
          widgetToken: '${widgetToken}',
          hide_launcher: false
        };`,
        },

        // 2. External chat widget script
        {
            src: process.env.CHAT_WIDGET_URL,
        },

        // 3. initChatWidget call after load
        {
            inline: `window.addEventListener('load', function() {
          if (typeof initChatWidget === 'function') {
            initChatWidget(helloConfig, 0);
          }
        });`,
        },

        // 4. Google Tag Manager loader
        {
            inline: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NWZKLRJ');`,
        },
    ];

    // 5 & 6. JSON-LD if country is 'in'
    if (pageInfo?.country === 'in') {
        meta.scripts.push(
            {
                type: 'application/ld+json',
                inline: JSON.stringify({
                    '@context': 'https://schema.org/',
                    '@type': 'WebSite',
                    name: 'MSG91',
                    url: `https://msg91.com/${pageInfo?.pathURL || ''}`,
                    potentialAction: {
                        '@type': 'SearchAction',
                        target: 'https://msg91.com/in/search?q={search_term_string}',
                        'query-input': 'required name=search_term_string',
                    },
                }),
            },
            {
                type: 'application/ld+json',
                inline: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'MSG91',
                    url: 'https://msg91.com/in',
                    logo: 'https://msg91.com/img/logo.svg',
                    sameAs: [
                        'https://www.facebook.com/msg91',
                        'https://twitter.com/msg91',
                        'https://www.youtube.com/@WalkoverWS',
                    ],
                }),
            }
        );
    }
}

export function generateMetadata() {
    const { scripts, ...rest } = meta;
    return rest;
}

export function getScripts() {
    return meta.scripts || [];
}

export default function Metadata() {
    return null;
}
