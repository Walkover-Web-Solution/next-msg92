import { useEffect, useState } from 'react';
import BookingChatLoadingOverlay, { BOOKING_CHAT_READY_MESSAGE } from './BookingChatLoadingOverlay';

export default function BookingModal({ isOpen, onClose, widgetToken }) {
    const [isWidgetLoading, setIsWidgetLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return undefined;

        setIsWidgetLoading(true);

        const handleReadyMessage = (event) => {
            if (event.origin !== window.location.origin) return;
            if (event.data?.type !== BOOKING_CHAT_READY_MESSAGE) return;
            setIsWidgetLoading(false);
        };

        window.addEventListener('message', handleReadyMessage);

        return () => {
            window.removeEventListener('message', handleReadyMessage);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const iframeSrc = widgetToken
        ? `/booking-chat-widget?widgetToken=${encodeURIComponent(widgetToken)}`
        : '/booking-chat-widget';

    return (
        <dialog className='modal z-[1001]' open>
            <div className='modal-box relative p-0 overflow-hidden max-w-4xl w-full'>
                <button
                    type='button'
                    onClick={onClose}
                    className='btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-50 bg-white/90'
                >
                    ✕
                </button>
                <div id='contactChatWidget' className='relative w-full h-[680px]'>
                    {isWidgetLoading ? <BookingChatLoadingOverlay /> : null}
                    <iframe
                        title='MSG91 booking assistant'
                        src={iframeSrc}
                        allow='microphone'
                        className='w-full h-full border-0'
                    />
                </div>
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button type='button' onClick={onClose}>
                    close
                </button>
            </form>
        </dialog>
    );
}
