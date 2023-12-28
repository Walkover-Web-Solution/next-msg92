import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Headcomp from '@/components/head';
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from 'next/script'
import Toastify from "@/components/toast";
import { getCookie, setCookie, setUtm } from "@/components/utils";
import $ from "jquery";
export default function App({ Component, pageProps }) {
  const router = useRouter();  
  var showNavbar = false;
  var  browserPath = router.asPath;  
  var browserPathCase = browserPath;
  var browserPathMeta = browserPath;
  
  if(browserPath.includes('partners-and-integrations')){
    var plugin = browserPath.split("/")[2];    
  }

  if (browserPath !== '/') {
    const pattern = /\/([^/?]+)/;
    const result = browserPath.match(pattern);    
    browserPath = result ? result[0] : browserPath;
  }
  
  var path = browserPath.split("/")[1];
  
  const products = [
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
  ]  

  var pageSlug = Object.keys(router.query).length ? `/${router.query.pageslug}` : browserPath
  var pricingPath = (products.includes(pageSlug)) ? `/pricing${pageSlug}` : `/pricing/sms`;

  const year = new Date().getFullYear();
  if (!['/signin', '/signup', '/github-auth', '/github-auth-token', '/outlook-token'].includes(browserPath)) {
    showNavbar = true;
}
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    
    const search = window.location.search;
    if (search.includes('utm_')) {
        setCookie('msg91_query', search.replace(/service=\w+&?/,''), 30);
    } else if(plugin){      
        setCookie('msg91_query', `?utm_campaign=tigerplugin&utm_source=${plugin}&utm_medium=website`, 30);      
    } else if (!getCookie('msg91_query')) {
      setCookie('msg91_query', '?utm_source=msg91Website&source=msg91', 30);
    }
    
    setUtm();

    const countryList = ['in','ae','ph','sg','es','gb','us','?']    
    
    var cc = getCookie('country_code');    
    if(!cc && countryList.includes(path)){
      setCookie('country_code', path, 30);
    }
    $("a").on("click", function (event) {
      event.preventDefault();
      var href =  $(this).attr('href');      
      if(href !== undefined){
        if(cc === '?' && href === '/') href = '/?'; 
        if(products.includes(href) && cc && cc !== '?'){          
          window.location.href = '/'+ cc + href;
        }
        else{
          window.location.href = href;
        }
      }
    });

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
        {showNavbar && <Navbar browserPath={browserPath} pricingPath={pricingPath} appPath={browserPathMeta} pageSlug = {pageSlug} /> }
        <Component 
        {...pageProps} 
        path={path} 
        browserPath={browserPath} 
        browserPathCase={browserPathCase} 
        pricingPath={pricingPath}
        />
        {showNavbar && <Footer path={path} year={year} /> }
        <Toastify />
    </>
    );
}

/* 
getInitialProps solves serverside rendering in pricing page 
without getInitialProps it was giving path: '/pricing/[product]' 
with getInitialProps it returns path: '/pricing/hello'
*/
App.getInitialProps = async ({ asPath }) => {
  return {
    asPath,
  };
};