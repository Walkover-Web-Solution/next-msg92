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
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
