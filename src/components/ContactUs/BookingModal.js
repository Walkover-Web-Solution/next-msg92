export default function BookingModal({ isOpen, onClose }) {
    if (!isOpen) return null;

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
                <div id='contactChatWidget' className='w-full h-[680px]'>
                    <iframe
                        title='MSG91 booking assistant'
                        src='/booking-chat-widget'
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
