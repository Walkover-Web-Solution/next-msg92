import { getScripts } from '@/components/Metadata';
import '@/styles/global.scss';

export default function RootLayout({ children }) {
    const scripts = getScripts();
    return (
        <html lang='en' data-theme='light'>
            <head>
                {scripts.map((script, i) => {
                    if (script.src) {
                        return <script key={`src-${i}`} src={script.src} async />;
                    }

                    if (script.inline) {
                        return (
                            <script
                                key={`inline-${i}`}
                                type={script.type || 'text/javascript'}
                                dangerouslySetInnerHTML={{ __html: script.inline }}
                            />
                        );
                    }

                    return null;
                })}
            </head>
            <body className={` antialiased`}>{children}</body>
        </html>
    );
}
