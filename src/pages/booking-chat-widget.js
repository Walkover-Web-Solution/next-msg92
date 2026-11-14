import { useRef, useState } from 'react';
import Script from 'next/script';

export default function BookingChatWidget() {
    const initializedRef = useRef(false);
    const widgetScriptUrl = process.env.BOOKING_CHAT_WIDGET_URL;

    const initializeWidget = () => {
        if (initializedRef.current || typeof window.initChatWidget !== 'function') return;

        const container = document.getElementById('isolatedBookingChatWidget');
        const widgetToken = process.env.BOOKING_CHAT_WIDGET_TOKEN;

        if (!container || !widgetToken) return;
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
                />
            )}
            <div id='isolatedBookingChatWidget' className='w-full h-full' />
        </main>
    );
}
