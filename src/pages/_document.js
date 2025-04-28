import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';

function getLanguageFromPath(path) {
    const country = path?.split('/')[1] || 'global';

    if (country === 'br-pt' || country === 'br') return 'pt-BR';
    return 'en';
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
