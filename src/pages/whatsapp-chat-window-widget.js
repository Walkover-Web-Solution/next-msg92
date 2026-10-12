import { useRef } from 'react';
import Script from 'next/script';

const sendWidgetDebugLog = (message, data = {}) => {
    fetch('http://127.0.0.1:7257/ingest/b793e390-f4eb-4a66-a46a-52f4889d25bd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ea2c69' },
        body: JSON.stringify({
            sessionId: 'ea2c69',
            runId: 'post-fix',
            hypothesisId: 'C',
            location: 'whatsapp-chat-window-widget.js',
            message,
            data,
            timestamp: Date.now(),
        }),
    }).catch(() => {});
};

export default function WhatsAppChatWindowWidget() {
    const initializedRef = useRef(false);

    const initializeWidget = () => {
        if (initializedRef.current || typeof window.initChatWidget !== 'function') return;

        const container = document.getElementById('isolatedWhatsappChatWidget');
        if (!container) return;

        initializedRef.current = true;

        // #region agent log
        sendWidgetDebugLog('Initializing isolated widget', {
            pathname: window.location.pathname,
            scriptOrigins: Array.from(document.querySelectorAll('script[src*="chat-widget"]')).map((script) => {
                try {
                    return new URL(script.src).origin;
                } catch {
                    return 'invalid-url';
                }
            }),
            containerConnected: container.isConnected,
        });
        // #endregion

        window.initChatWidget(
            {
                widgetToken: process.env.WHATSAPP_CHAT_WIDGET_TOKEN,
                hide_launcher: true,
                launch_widget: true,
                show_close_button: false,
                show_widget_form: false,
                show_send_button: true,
                parentId: 'isolatedWhatsappChatWidget',
                fullScreen: true,
                theme: 'light',
            },
            0
        );
    };

    return (
        <main className='w-screen h-screen overflow-hidden'>
            <Script
                id='isolatedWhatsappChatWidgetScript'
                strategy='afterInteractive'
                src={process.env.CHAT_WIDGET_URL}
                onLoad={initializeWidget}
            />
            <div id='isolatedWhatsappChatWidget' className='w-full h-full' />
        </main>
    );
}
