import NotFoundComp from '@/components/NotFoundComp/NotFoundComp';
import Head from 'next/head';
import Script from 'next/script';

export default function NoData() {
    return (
        <>
            <Script
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `var helloConfig = {
              widgetToken: '${process.env.CHAT_WIDGET_TOKEN}',
              hide_launcher: false
            };`,
                }}
            />
            <Script onload='initChatWidget(helloConfig, 0)' src={`${process.env.CHAT_WIDGET_URL}`} />

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
            <Script
                id='ms-clarity'
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `
                            (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "script", "ru7xog184s");
                        `,
                }}
            />
            <Head>
                <title>404 - Page Not Found | MSG91</title>
                <meta
                    name='description'
                    content="Sorry, the page you're looking for doesn't exist. It may have been moved or deleted. Go back to the homepage or explore other content on MSG91."
                />
                <meta property='og:title' content='404 - Page Not Found | MSG91' />
                <meta
                    property='og:description'
                    content="Sorry, the page you're looking for doesn't exist. It may have been moved or deleted. Go back to the homepage or explore other content on MSG91."
                />
                <meta property='og:image' content={'/assets/brand/favicon.svg'} />
                <link rel='icon' href='/assets/brand/favicon.svg' />
                <meta name='msvalidate.01' content='38DA8FFFF9D52A1C9236A51CEFEE7542' />
                <meta
                    name='viewport'
                    content='width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no'
                />
                {process.env.BASE_URL !== 'https://msg91.com' && (
                    <>
                        <meta name='robots' content='noindex,nofollow' />
                        <meta name='googlebot' content='noindex,nofollow' />
                        <meta name='bingbot' content='noindex,nofollow' />
                    </>
                )}
            </Head>
            <NotFoundComp />
        </>
    );
}
