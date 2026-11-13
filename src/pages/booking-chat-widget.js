import { useRef } from 'react';
import Script from 'next/script';

export default function BookingChatWidget() {
    const initializedRef = useRef(false);

    const initializeWidget = () => {
        if (initializedRef.current || typeof window.initChatWidget !== 'function') return;

        const container = document.getElementById('isolatedBookingChatWidget');
        if (!container) return;

        initializedRef.current = true;

        window.initChatWidget(
            {
                widgetToken: process.env.BOOKING_CHAT_WIDGET_TOKEN,
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
        <main className='w-screen h-screen overflow-hidden'>
            <Script
                id='isolatedBookingChatWidgetScript'
                strategy='afterInteractive'
                src={process.env.BOOKING_CHAT_WIDGET_URL}
                onLoad={initializeWidget}
            />
            <div id='isolatedBookingChatWidget' className='w-full h-full' />
        </main>
    );
}
