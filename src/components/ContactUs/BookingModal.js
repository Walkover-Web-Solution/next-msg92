import { useEffect } from 'react';

export default function BookingModal({ isOpen, onClose, widgetToken, widgetScriptLoaded }) {
    useEffect(() => {
        if (!isOpen || !widgetScriptLoaded || !window.initChatWidget) return;

        const container = document.getElementById('contactChatWidget');
        if (!container) return;

        container.innerHTML = '';
        window.initChatWidget(
            {
                widgetToken,
                hide_launcher: true,
                launch_widget: true,
                show_close_button: false,
                show_widget_form: false,
                parentId: 'contactChatWidget',
                fullScreen: true,
            },
            0
        );

        return () => {
            container.innerHTML = '';
        };
    }, [isOpen, widgetScriptLoaded, widgetToken]);

    if (!isOpen) return null;

    return (
        <dialog className='modal' open>
            <div className='modal-box p-0 overflow-hidden max-w-4xl w-full'>
                <button
                    type='button'
                    onClick={onClose}
                    className='btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-10 bg-white/90'
                >
                    ✕
                </button>
                <div id='contactChatWidget' className='w-full' style={{ minHeight: '680px' }} />
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button type='button' onClick={onClose}>
                    close
                </button>
            </form>
        </dialog>
    );
}
