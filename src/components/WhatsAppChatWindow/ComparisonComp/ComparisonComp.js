import { MdClose, MdCheck } from 'react-icons/md';

export default function WhatsAppComparisonComp({ data }) {
    if (!data) return null;

    return (
        <section id='comparison' className='bg-emerald-50/40 border-y border-emerald-900/10'>
            <div className='container cont_p flex flex-col gap-12 sm:gap-16'>
                <div className='text-center max-w-4xl mx-auto'>
                    <h2 className='heading tracking-tight mb-4 text-gray-900'>
                        {data?.heading_prefix}
                        <span className='text-emerald-700'>{data?.heading_accent}</span>
                    </h2>

                    <p className='subheading text-gray-600 max-w-2xl mx-auto font-normal'>{data?.subheading}</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch w-full'>
                    <div className='rounded-3xl border border-rose-200/90 bg-white overflow-hidden shadow-xs flex flex-col justify-between'>
                        <div>
                            <div className='bg-rose-50/90 border-b border-rose-100 px-6 py-5 flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0'>
                                        <MdClose className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-lg text-gray-900'>{data?.colTraditional}</h3>
                                        <p className='text-xs text-gray-500'>{data?.colTraditionalSub}</p>
                                    </div>
                                </div>
                                <span className='text-[11px] font-semibold text-rose-700 bg-rose-100/80 border border-rose-200 px-2.5 py-1 rounded-full'>
                                    {data?.colTraditionalBadge}
                                </span>
                            </div>

                            <div className='p-6 space-y-4'>
                                {data?.rows?.map((row, index) => (
                                    <div
                                        key={index}
                                        className='flex items-start gap-3.5 p-2 rounded-xl hover:bg-rose-50/50 transition-colors'
                                    >
                                        <div className='w-5 h-5 rounded-full bg-rose-100/90 text-rose-500 flex items-center justify-center shrink-0 mt-0.5'>
                                            {row?.isNeutral ? (
                                                <span className='text-xs font-bold text-gray-500'>•</span>
                                            ) : (
                                                <MdClose className='h-3 w-3' />
                                            )}
                                        </div>
                                        <span className='text-sm text-gray-600 font-normal leading-snug'>
                                            {row?.traditional}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {data?.outcomeTraditional && (
                            <div className='mx-6 mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/70 text-center'>
                                <p className='text-xs font-medium text-rose-800'>{data.outcomeTraditional}</p>
                            </div>
                        )}
                    </div>

                    <div className='rounded-3xl border-2 border-emerald-600/30 bg-white overflow-hidden shadow-xs flex flex-col justify-between relative'>
                        <div className='absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none' />

                        <div>
                            <div className='bg-emerald-50 border-b border-emerald-100 px-6 py-5 flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-2xs'>
                                        <MdCheck className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-lg text-gray-900 flex items-center gap-2'>
                                            {data?.colMsg91}
                                        </h3>
                                        <p className='text-xs text-emerald-700 font-medium'>{data?.colMsg91Sub}</p>
                                    </div>
                                </div>
                                <span className='text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-full shadow-2xs'>
                                    {data?.colMsg91Badge}
                                </span>
                            </div>

                            <div className='p-6 space-y-4'>
                                {data?.rows?.map((row, index) => (
                                    <div
                                        key={index}
                                        className='flex items-start gap-3.5 p-2 rounded-xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50 transition-colors'
                                    >
                                        <div className='w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs'>
                                            <MdCheck className='h-3 w-3' />
                                        </div>
                                        <span className='text-sm text-gray-900 font-medium leading-snug'>
                                            {row?.msg91}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {data?.outcomeMsg91 && (
                            <div className='mx-6 mb-6 p-3.5 rounded-2xl bg-emerald-100/60 border border-emerald-200 text-center'>
                                <p className='text-xs font-semibold text-emerald-900'>{data.outcomeMsg91}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
