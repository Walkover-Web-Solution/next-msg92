import Head from 'next/head';
import Script from 'next/script';

export default function HeadComp({ data, pageInfo }) {
    return (
        <>
            <Script
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `var helloConfig = {
              widgetToken: "1d31e",
              hide_launcher: false
            };`,
                }}
            />

            <Script onload='initChatWidget(helloConfig, 5000)' src='https://blacksea.msg91.com/chat-widget.js' />

            <Script
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NWZKLRJ');`,
                }}
            />

            {pageInfo?.country === 'in' && (
                <>
                    <Script
                        type='application/ld+json'
                        strategy='afterInteractive'
                        dangerouslySetInnerHTML={{
                            __html: `{
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "MSG91",
              "url": "https://msg91.com/${pageInfo?.pathURL}",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://msg91.com/in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }`,
                        }}
                    />

                    <Script
                        type='application/ld+json'
                        strategy='afterInteractive'
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

            <Head>
                <title>{data?.title}</title>
                <meta name='description' content={data?.description} />
                <meta property='og:title' content={data?.title} />
                <meta property='og:description' content={data?.description} />
                <meta property='og:image' content={'/assets/brand/favicon.svg'} />
                <link rel='icon' href='/assets/brand/favicon.svg' />
                <meta
                    name='viewport'
                    content='width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no'
                />
                <meta name='google-site-verification' content='RfcBy_Lv1Ao1j0eP8UlMjJ44ik5_1YDKsRQSNFr9jEQ' />
                <link rel='canonical' href={`https://msg91.com/${pageInfo?.pathURL}`} />
                <link
                    rel='alternate'
                    hrefLang={`${
                        pageInfo?.country === 'global' || pageInfo?.country === 'br-pt'
                            ? 'en'
                            : 'en-' + pageInfo?.country.toUpperCase()
                    }`}
                    href={`https://msg91.com/${pageInfo?.pathURL}`}
                />
                {process.env.BASE_URL !== 'https://msg91.com' && (
                    <>
                        <meta name='robots' content='noindex,nofollow' />
                        <meta name='googlebot' content='noindex,nofollow' />
                        <meta name='bingbot' content='noindex,nofollow' />
                    </>
                )}
            </Head>
        </>
    );
}
