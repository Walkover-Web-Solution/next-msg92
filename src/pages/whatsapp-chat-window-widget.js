import { useEffect, useRef } from 'react';
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
    const mutationCountRef = useRef(0);

    useEffect(() => {
        const handleWidgetMessage = (event) => {
            if (!event.origin.includes('msg91.com') && !event.origin.includes('phone91.com')) return;

            const eventData = event.data;
            const eventPayload = eventData && typeof eventData === 'object' ? eventData.data : null;

            // #region agent log
            sendWidgetDebugLog('Isolated widget event received', {
                origin: event.origin,
                action:
                    eventData && typeof eventData === 'object'
                        ? eventData.type || eventData.action || eventData.event || null
                        : null,
                status:
                    eventPayload && typeof eventPayload === 'object'
                        ? eventPayload.status || eventPayload.statusCode || eventPayload.code || null
                        : null,
                error:
                    eventPayload && typeof eventPayload === 'object'
                        ? eventPayload.error || eventPayload.reason || null
                        : null,
            });
            // #endregion
        };

        const observer = new MutationObserver((mutations) => {
            const relevantMutation = mutations.some((mutation) =>
                [...mutation.addedNodes, ...mutation.removedNodes].some(
                    (node) =>
                        node.nodeType === Node.ELEMENT_NODE &&
                        (node.id === 'hello-chatbot-iframe-container' ||
                            node.tagName === 'IFRAME' ||
                            node.querySelector?.('#hello-chatbot-iframe-container, iframe'))
                )
            );
            if (!relevantMutation || mutationCountRef.current >= 6) return;

            mutationCountRef.current += 1;
            const iframe = document.querySelector('#isolatedWhatsappChatWidget iframe');

            // #region agent log
            sendWidgetDebugLog('Isolated widget DOM changed', {
                mutationNumber: mutationCountRef.current,
                containerChildren: document.getElementById('isolatedWhatsappChatWidget')?.childElementCount ?? -1,
                iframeConnected: Boolean(iframe?.isConnected),
                iframeOrigin: (() => {
                    try {
                        return iframe?.src ? new URL(iframe.src).origin : null;
                    } catch {
                        return 'invalid-url';
                    }
                })(),
            });
            // #endregion
        });

        window.addEventListener('message', handleWidgetMessage);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('message', handleWidgetMessage);
            observer.disconnect();
        };
    }, []);

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
