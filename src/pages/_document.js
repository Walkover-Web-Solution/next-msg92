import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';
import availableCountries from '@/data/availableCountries.json';

function getLanguageFromPath(path) {
    const countryFromPath = path?.split('/')[1]?.toUpperCase() || 'GLOBAL';
    const countryInfo = availableCountries.find((country) => country.shortname.toUpperCase() === countryFromPath);
    return countryInfo?.htmlLang || 'en';
}

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        const path = ctx.req?.url || '';
        const lang = getLanguageFromPath(path);
        return {
            ...initialProps,
            lang,
        };
    }
    render() {
        return (
            <Html lang={this.props.lang} data-theme='light'>
                <Head>
                    <link rel='icon' type='image/png' sizes='192x192' href='/assets/brand/favicon-192.png' />
                    <link rel='icon' href='/assets/brand/favicon.svg' type='image/svg+xml' />
                    <link rel='apple-touch-icon' href='/assets/brand/apple-touch-icon.png' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
