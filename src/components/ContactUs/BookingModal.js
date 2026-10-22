import { useEffect } from 'react';

function restoreGlobalChatLauncher() {
    window.chatWidget?.SendDataToBot?.({
        parentId: '',
        hide_launcher: false,
        fullScreen: false,
        launch_widget: false,
    });
    document.getElementById('hello-chatbot-iframe-container')?.classList?.remove('hello-full-screen-interfaceEmbed');
    window.chatWidget?.close?.();
    if (window.helloConfig) {
        window.initChatWidget?.({ ...window.helloConfig, hide_launcher: false, launch_widget: false }, 0);
    }
    window.chatWidget?.show?.();
}

export default function BookingModal({ isOpen, onClose, widgetToken, widgetScriptLoaded }) {
    const handleClose = () => {
        restoreGlobalChatLauncher();
        onClose();
    };

    useEffect(() => {
        if (!isOpen || !widgetScriptLoaded || !window.initChatWidget) return;

        const container = document.getElementById('contactChatWidget');
        if (!container) return;

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
            restoreGlobalChatLauncher();
        };
    }, [isOpen, widgetScriptLoaded, widgetToken]);

    if (!isOpen) return null;

    return (
        <dialog className='modal z-[1001]' open>
            <div className='modal-box relative p-0 overflow-hidden max-w-4xl w-full'>
                <button
                    type='button'
                    onClick={handleClose}
                    className='btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-50 bg-white/90'
                >
                    ✕
                </button>
                <div id='contactChatWidget' className='w-full' style={{ minHeight: '680px' }} />
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button type='button' onClick={handleClose}>
                    close
                </button>
            </form>
        </dialog>
    );
}
