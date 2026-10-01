import { BsWhatsapp } from 'react-icons/bs';
import { HiSparkles } from 'react-icons/hi2';
import { MdClose, MdCheck, MdSmartToy, MdSupportAgent } from 'react-icons/md';

const flowIcons = {
    whatsapp: <BsWhatsapp className='w-4 h-4 text-[#25D366]' />,
    cost: <span className='text-sm font-semibold text-rose-500'>$</span>,
    window: <HiSparkles className='w-4 h-4 text-[#529837]' />,
    bot: <MdSmartToy className='w-4 h-4 text-[#529837]' />,
    agent: <MdSupportAgent className='w-4 h-4 text-[#529837]' />,
};

export default function WhatsAppComparisonComp({ data }) {
    if (!data) return null;

    const traditionalFlow = data?.traditional_flow || [];
    const msg91Flow = Array.isArray(data?.msg91_flow) ? data.msg91_flow : [];
    const compareRows = (data?.rows || []).filter((row) => !row?.isNeutral);

    return (
        <section id='comparison' className='bg-[#FAFAF9] border-y'>
            <div className='container cont_p flex flex-col gap-10'>
                <div className='text-center flex flex-col gap-3'>
                    <h2 className='heading text-[#18181B]'>
                        {data?.heading_prefix}
                        <span className='text-[#529837]'>{data?.heading_accent}</span>
                        {data?.heading_suffix}
                    </h2>
                    <p className='subheading text-[#4B5563] max-w-2xl mx-auto'>{data?.subheading}</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className='bg-rose-50/60 border border-rose-100 rounded-lg p-6 flex flex-col justify-between gap-6'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-start justify-between gap-3'>
                                <div className='flex items-start gap-3'>
                                    <div className='w-8 h-8 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center'>
                                        <MdClose className='w-4 h-4' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h3 className='font-semibold text-lg text-[#18181B]'>{data?.colTraditional}</h3>
                                        <p className='text-sm text-[#4B5563]'>{data?.colTraditionalSub}</p>
                                    </div>
                                </div>
                                {data?.colTraditionalBadge && (
                                    <span className='text-[11px] font-semibold text-rose-700 bg-white border border-rose-200 px-2.5 py-0.5 rounded-full'>
                                        {data?.colTraditionalBadge}
                                    </span>
                                )}
                            </div>

                            {traditionalFlow.length > 0 && (
                                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                                    {traditionalFlow.map((step, index) => (
                                        <div
                                            key={index}
                                            className='bg-white border border-rose-100 rounded-lg p-3 flex flex-col gap-2'
                                        >
                                            <div className='flex items-center justify-between gap-1'>
                                                {flowIcons[step?.icon]}
                                                {step?.tag && (
                                                    <span className='text-[10px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded-full'>
                                                        {step?.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <p className='text-xs font-medium text-[#18181B]'>{step?.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                {compareRows.map((row, index) => (
                                    <div key={index} className='flex items-start gap-2'>
                                        <MdClose className='w-4 h-4 text-rose-400' />
                                        <p className='text-xs text-[#4B5563] leading-relaxed'>{row?.traditional}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {(data?.outcomeTraditional || data?.outcomeTraditionalHint) && (
                            <div className='bg-rose-100/80 rounded-lg p-4 flex flex-col gap-1'>
                                {data?.outcomeTraditional && (
                                    <p className='text-xs font-semibold text-rose-900'>{data?.outcomeTraditional}</p>
                                )}
                                {data?.outcomeTraditionalHint && (
                                    <p className='text-xs text-rose-800'>{data?.outcomeTraditionalHint}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='bg-[#529837]/5 border border-[#529837]/20 rounded-lg p-6 flex flex-col justify-between gap-6'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-start justify-between gap-3'>
                                <div className='flex items-start gap-3'>
                                    <div className='w-8 h-8 rounded-full bg-[#529837] text-white flex items-center justify-center'>
                                        <MdCheck className='w-4 h-4' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h3 className='font-semibold text-lg text-[#18181B]'>{data?.colMsg91}</h3>
                                        <p className='text-sm text-[#529837]'>{data?.colMsg91Sub}</p>
                                    </div>
                                </div>
                                {data?.colMsg91Badge && (
                                    <span className='text-[11px] font-semibold text-emerald-900 bg-white border border-[#529837]/30 px-2.5 py-0.5 rounded-full'>
                                        {data?.colMsg91Badge}
                                    </span>
                                )}
                            </div>

                            {msg91Flow.length > 0 && (
                                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                                    {msg91Flow.map((step, index) => (
                                        <div
                                            key={index}
                                            className='bg-white border border-[#529837]/20 rounded-lg p-3 flex flex-col gap-2'
                                        >
                                            <div className='flex items-center justify-between gap-1'>
                                                {flowIcons[step?.icon]}
                                                {step?.tag && (
                                                    <span className='text-[10px] font-semibold text-[#529837] bg-[#529837]/10 border border-[#529837]/20 px-1.5 py-0.5 rounded-full'>
                                                        {step?.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <p className='text-xs font-medium text-[#18181B]'>{step?.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                {compareRows.map((row, index) => (
                                    <div key={index} className='flex items-start gap-2'>
                                        <MdCheck className='w-4 h-4 text-[#529837]' />
                                        <p className='text-xs text-[#18181B] leading-relaxed'>{row?.msg91}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {(data?.outcomeMsg91 || data?.outcomeMsg91Hint) && (
                            <div className='bg-[#529837]/10 rounded-lg p-4 flex flex-col gap-1'>
                                {data?.outcomeMsg91 && (
                                    <p className='text-xs font-semibold text-emerald-950'>{data?.outcomeMsg91}</p>
                                )}
                                {data?.outcomeMsg91Hint && (
                                    <p className='text-xs text-[#529837]'>{data?.outcomeMsg91Hint}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
