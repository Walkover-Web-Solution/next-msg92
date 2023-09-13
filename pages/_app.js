import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Headcomp from '@/components/head';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import Script from 'next/script';
import Toastify from "@/components/toast";
import { getCookie, setCookie } from "@/components/utils";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    var showNavbar = false;
    // const { slug } = router.query;
    var browserPath = router.asPath;
    var browserPathCase = browserPath;
    var browserPathMeta = browserPath;
    //var product = router.query.product;

    if (browserPath !== '/') {
        const pattern = /\/([^/?]+)/;
        const result = browserPath.match(pattern);
        browserPath = result ? result[0] : browserPath;
    }
    var path = browserPath.split('/')[1];
    const products = [
        '/sms',
        '/email',
        '/voice',
        '/whatsapp',
        '/rcs',
        '/otp',
        '/hello',
        '/segmento',
        '/campaign',
        '/knowledgebase',
    ];
    var pageSlug = Object.keys(router.query).length ? `/${router.query.pageslug}` : browserPath;
    var pricingPath = products.includes(pageSlug) ? `/pricing${pageSlug}` : `/pricing/sms`;

    const year = new Date().getFullYear();
    if (browserPath !== '/login' && browserPath !== '/signup' && browserPath !== '/github-auth') {
        showNavbar = true;
    }

    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
        
        const search = window.location.search;
        if (search.includes('utm_')) {
            setCookie('msg91_query', search, 30);
        }

        // Get all anchor tags in the document using querySelectorAll
        var anchorTags = document.querySelectorAll('.utm');
        // Loop through the anchor tags
        for (var i = 0; i < anchorTags.length; i++) {
            var href = anchorTags[i].getAttribute('href'); // Get the current href value
            var query = getCookie('msg91_query');
            if (href && query) {
                anchorTags[i].setAttribute('href', href + query);
            }
        }
    }, []);
    return (
        <>
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `var helloConfig = {
              widgetToken: "1d31e",
              hide_launcher: false
            };`,
                }}
            />

            <Script
                onload="initChatWidget(helloConfig, 5000)"
                src="https://control.msg91.com/app/assets/widget/chat-widget.js"
            />

            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NWZKLRJ');`,
                }}
            />

            {browserPath.browserPath == '/in' && (
                <>
                    <Script
                        type="application/ld+json"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `{
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "MSG91",
              "url": "https://msg91.com${browserPath.browserPath}",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://msg91.com/in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }`,
                        }}
                    />

                    <Script
                        type="application/ld+json"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `{
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MSG91",
              "url": "https://msg91.com/in",
              "logo": "https://msg91.com/img/logo.svg",
              "sameAs": [
                "https://www.facebook.com/msg91",
                "https://twitter.com/msg91",
                "https://www.youtube.com/@WalkoverWS"
              ]
            }`,
                        }}
                    />
                </>
            )}
            <Headcomp browserPath={browserPathMeta} />
            {showNavbar && <Navbar browserPath={browserPath} pricingPath={pricingPath} />}
            <Component
                {...pageProps}
                path={path}
                browserPath={browserPath}
                browserPathCase={browserPathCase}
                pricingPath={pricingPath}
            />
            {showNavbar && <Footer path={path} year={year} />}
            <Toastify />
        </>
    );
}
