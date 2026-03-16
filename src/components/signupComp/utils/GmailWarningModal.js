import { MdMailOutline, MdClose } from 'react-icons/md';

export default function GmailWarningModal({ email, onUpdate, onContinue }) {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4'>
            <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5'>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0'>
                            <MdMailOutline size={20} className='text-amber-600' />
                        </div>
                        <h2 className='text-base font-semibold text-slate-900'>Use your private domain email</h2>
                    </div>
                    <button
                        type='button'
                        onClick={onUpdate}
                        className='text-slate-400 hover:text-slate-600 transition-colors shrink-0'
                        aria-label='Close'
                    >
                        <MdClose size={20} />
                    </button>
                </div>

                <p className='text-sm text-slate-600 leading-relaxed'>
                    We recommend using your <span className='font-medium text-slate-800'>private domain email ID</span>{' '}
                    to receive premium assistance. If you don&apos;t have one, you can continue with{' '}
                    <span className='font-medium text-slate-800'>{email}</span>.
                </p>

                <div className='flex flex-col sm:flex-row gap-3'>
                    <button type='button' onClick={onContinue} className='btn btn-md flex-1 btn-primary btn-outline'>
                        Continue
                    </button>
                    <button type='button' onClick={onUpdate} className='btn btn-accent btn-md flex-1'>
                        Update Email
                    </button>
                </div>
            </div>
        </div>
    );
}
