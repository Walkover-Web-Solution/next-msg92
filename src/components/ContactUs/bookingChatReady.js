import { BOOKING_CHAT_READY_MESSAGE } from './BookingChatLoadingOverlay';

const GREETING_PATTERN = /greetings|virtual assistant|schedule a meeting/i;

export function notifyBookingChatReady() {
    if (typeof window === 'undefined') return;

    try {
        window.parent?.postMessage({ type: BOOKING_CHAT_READY_MESSAGE }, window.location.origin);
    } catch {
        // ignore cross-origin parent access errors
    }
}

export function isBookingChatGreetingVisible(containerId) {
    if (typeof document === 'undefined') return false;

    const container = document.getElementById(containerId);
    if (!container) return false;

    const visibleText = container.innerText || '';
    return GREETING_PATTERN.test(visibleText);
}

export function isAllowedWidgetMessageOrigin(origin) {
    return origin.includes('msg91.com') || origin.includes('phone91.com') || origin.includes('blacksea.msg91.com');
}
