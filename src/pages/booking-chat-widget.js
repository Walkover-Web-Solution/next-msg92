import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import BookingChatLoadingOverlay from '@/components/ContactUs/BookingChatLoadingOverlay';
import {
    isAllowedWidgetMessageOrigin,
    isBookingChatGreetingVisible,
    notifyBookingChatReady,
} from '@/components/ContactUs/bookingChatReady';

const CHAT_WIDGET_SCRIPT = 'https://blacksea.msg91.com/chat-widget.js';
const DEFAULT_CHAT_WIDGET_TOKEN = '8e51b';
const WIDGET_CONTAINER_ID = 'isolatedBookingChatWidget';
const MAX_LOADING_MS = 30000;
const GREETING_POLL_MS = 400;

export default function BookingChatWidget() {
    const router = useRouter();
    const initializedRef = useRef(false);
    const readyRef = useRef(false);
    const [isLoading, setIsLoading] = useState(true);

    const widgetToken =
        typeof router.query?.widgetToken === 'string' && router.query.widgetToken
            ? router.query.widgetToken
            : DEFAULT_CHAT_WIDGET_TOKEN;

    const markReady = () => {
        if (readyRef.current) return;
        readyRef.current = true;
        setIsLoading(false);
        notifyBookingChatReady();
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleWidgetMessage = (event) => {
            if (!isAllowedWidgetMessageOrigin(event.origin)) return;
            markReady();
        };

        window.addEventListener('message', handleWidgetMessage);

        const greetingPollId = window.setInterval(() => {
            if (isBookingChatGreetingVisible(WIDGET_CONTAINER_ID)) {
                markReady();
            }
        }, GREETING_POLL_MS);

        const maxWaitId = window.setTimeout(markReady, MAX_LOADING_MS);

        const observer = new MutationObserver(() => {
            if (isBookingChatGreetingVisible(WIDGET_CONTAINER_ID)) {
                markReady();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true, characterData: true });

        return () => {
            window.removeEventListener('message', handleWidgetMessage);
            window.clearInterval(greetingPollId);
            window.clearTimeout(maxWaitId);
            observer.disconnect();
        };
    }, []);

    const initializeWidget = () => {
        if (initializedRef.current || typeof window.initChatWidget !== 'function') return;

        const container = document.getElementById(WIDGET_CONTAINER_ID);
        if (!container) return;

        initializedRef.current = true;

        window.initChatWidget(
            {
                widgetToken,
                hide_launcher: true,
                launch_widget: true,
                show_close_button: false,
                show_widget_form: false,
                parentId: WIDGET_CONTAINER_ID,
                fullScreen: true,
            },
            0
        );
    };

    return (
        <main className='relative w-screen h-screen overflow-hidden'>
            <Script
                id='isolatedBookingChatWidgetScript'
                strategy='afterInteractive'
                src={CHAT_WIDGET_SCRIPT}
                onLoad={initializeWidget}
            />
            <div id={WIDGET_CONTAINER_ID} className='w-full h-full' />
            {isLoading ? <BookingChatLoadingOverlay /> : null}
        </main>
    );
}
