import { useRef, useState } from 'react';
import Script from 'next/script';

export default function BookingChatWidget() {
    const initializedRef = useRef(false);
    const [widgetError, setWidgetError] = useState('');
    const widgetScriptUrl = process.env.BOOKING_CHAT_WIDGET_URL;

    const initializeWidget = () => {
        if (initializedRef.current) return;

        if (typeof window.initChatWidget !== 'function') {
            setWidgetError('The booking assistant could not be loaded. Please try again later.');
            return;
        }

        const container = document.getElementById('isolatedBookingChatWidget');
        const widgetToken =
            new URLSearchParams(window.location.search).get('widgetToken') || process.env.BOOKING_CHAT_WIDGET_TOKEN;

        if (!container || !widgetToken) {
            setWidgetError('The booking assistant could not be started. Please try again later.');
            return;
        }
        initializedRef.current = true;

        window.initChatWidget(
            {
                widgetToken,
                hide_launcher: true,
                launch_widget: true,
                show_close_button: false,
                show_widget_form: false,
                parentId: 'isolatedBookingChatWidget',
                fullScreen: true,
            },
            0
        );
    };

    return (
        <main className='relative w-screen h-screen overflow-hidden'>
            {widgetScriptUrl && (
                <Script
                    id='isolatedBookingChatWidgetScript'
                    strategy='afterInteractive'
                    src={widgetScriptUrl}
                    onLoad={initializeWidget}
                    onError={() => setWidgetError('The booking assistant could not be loaded. Please try again later.')}
                />
            )}
            <div id='isolatedBookingChatWidget' className='w-full h-full' />
            {(!widgetScriptUrl || widgetError) && (
                <p role='alert' className='absolute inset-0 flex items-center justify-center p-4 text-center text-sm'>
                    {widgetError || 'The booking assistant is not configured for this environment.'}
                </p>
            )}
        </main>
    );
}
