export const BOOKING_CHAT_READY_MESSAGE = 'msg91-booking-chat-ready';

export default function BookingChatLoadingOverlay() {
    return (
        <div
            className='absolute inset-0 z-20 flex flex-col bg-white'
            role='status'
            aria-live='polite'
            aria-busy='true'
            aria-label='Loading assistant'
        >
            <div className='flex items-center justify-between border-b border-slate-200 px-4 py-3'>
                <span className='skeleton h-5 w-5 rounded' />
                <span className='skeleton h-4 w-28 rounded' />
                <span className='skeleton h-5 w-5 rounded' />
            </div>
            <div className='flex flex-1 flex-col items-center justify-center gap-6 px-6'>
                <span className='loading loading-spinner loading-lg text-primary' />
                <p className='text-sm text-slate-500'>Connecting to assistant…</p>
                <div className='flex w-full max-w-md flex-col gap-3'>
                    <div className='skeleton ml-auto h-10 w-3/4 rounded-2xl rounded-br-sm' />
                    <div className='skeleton h-10 w-2/3 rounded-2xl rounded-bl-sm' />
                    <div className='skeleton ml-auto h-10 w-4/5 rounded-2xl rounded-br-sm' />
                </div>
            </div>
            <div className='border-t border-slate-200 px-4 py-4'>
                <span className='skeleton block h-12 w-full rounded-full' />
            </div>
        </div>
    );
}
