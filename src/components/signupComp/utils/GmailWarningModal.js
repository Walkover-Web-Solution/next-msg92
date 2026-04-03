import { MdMailOutline, MdClose, MdVerified } from 'react-icons/md';

export default function GmailWarningModal({ email, onUpdate, onContinue }) {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden'>
                <div className='p-6 flex flex-col gap-5'>
                    {/* Header */}
                    <div className='flex items-start justify-between gap-3'>
                        <div className='flex items-center gap-3'>
                            <div className='w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0'>
                                <MdMailOutline size={22} className='text-indigo-600' />
                            </div>
                            <div>
                                <h2 className='text-base font-bold text-slate-900 leading-tight'>
                                    Use a private domain email
                                </h2>
                                <p className='text-xs text-slate-400 mt-0.5'>For better & premium assistance</p>
                            </div>
                        </div>
                        <button
                            type='button'
                            onClick={onContinue}
                            className='text-slate-300 hover:text-slate-500 transition-colors shrink-0 mt-0.5'
                            aria-label='Close'
                        >
                            <MdClose size={18} />
                        </button>
                    </div>

                    {/* Info box */}
                    <div className='bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3'>
                        <MdVerified size={18} className='text-indigo-500 shrink-0 mt-0.5' />
                        <p className='text-sm text-slate-600 leading-relaxed'>
                            We recommend using your{' '}
                            <span className='font-semibold text-indigo-700'>private domain email ID</span> to receive
                            premium assistance. If you don&apos;t have one, you can continue with{' '}
                            <span className='font-semibold text-slate-800'>{email}</span>.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className='flex flex-col sm:flex-row gap-2.5'>
                        <button
                            type='button'
                            onClick={onContinue}
                            className='flex-1 py-2.5 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all'
                        >
                            Continue with Gmail
                        </button>
                        <button
                            type='button'
                            onClick={onUpdate}
                            className='flex-1 py-2.5 px-4 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-sm shadow-indigo-200'
                        >
                            Update Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
