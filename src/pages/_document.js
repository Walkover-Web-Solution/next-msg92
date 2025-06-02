import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        let pathname = '';
        if (ctx.req) {
            const url = ctx.req.url || '';
            pathname = url.split('?')[0];
            if (pathname.startsWith('/')) {
                pathname = pathname.slice(1);
            }
        }
        let htmlLang;
        if (pathname && !pathname.startsWith('.well-known')) {
            const pathNameArray = pathname?.split('/') || [];
            try {
                const availableCountries = require('../data/availableCountries.json');
                const country = availableCountries.find(
                    (c) => c.shortname && c.shortname.toLowerCase() === pathNameArray[0]?.toLowerCase()
                );
                if (country && country?.htmlLang) {
                    htmlLang = country.htmlLang;
                } else {
                    htmlLang = 'en';
                }
            } catch (e) {
                // fallback logic if needed
                htmlLang = 'en';
            }
        } else {
            // htmlLang = 'en';
        }
        console.log('⚡️ ~ :36 ~ MyDocument ~ getInitialProps ~ htmlLang:', htmlLang);
        return {
            ...initialProps,
            htmlLang,
        };
    }
    render() {
        return (
            <Html lang={this.props.htmlLang} data-theme='light' data-base-url={this.props.baseUrl}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
