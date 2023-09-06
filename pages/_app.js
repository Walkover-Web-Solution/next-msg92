import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Headcomp from "@/components/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // const { slug } = router.query; 
  var  brawserPath = router.asPath;
  var brawserPathCase = brawserPath;
  var brawserPathMeta = brawserPath;
  if (brawserPath !== '/') {
    const pattern = /\/([^/?]+)/;
    const result = brawserPath.match(pattern);
    brawserPath = result ? result[0] : brawserPath;
  }
  var path = brawserPath.split("/")[1];
  const year = new Date().getFullYear();
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
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

        { brawserPath.brawserPath == '/in' &&
          <>
          <Script type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "MSG91",
              "url": "https://msg91.com${brawserPath.brawserPath}",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://msg91.com/in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }`,
          }}
          />
          
          <Script type="application/ld+json" strategy="afterInteractive"
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
        }
        <Headcomp brawserPath={brawserPathMeta} />
        <Navbar brawserPath={brawserPath} />
        <Component {...pageProps} path={path} browserPath={brawserPath} browserPathCase={brawserPathCase}/>
        <Footer path={path} year={year} />
    </>
    );
}
