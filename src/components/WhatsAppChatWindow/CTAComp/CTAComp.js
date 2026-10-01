import { BsWhatsapp } from 'react-icons/bs';
import { HiSparkles } from 'react-icons/hi2';
import { MdArrowForward, MdSmartToy, MdRecordVoiceOver, MdSupportAgent } from 'react-icons/md';

import getURL from '@/utils/getURL';

const floatingIconMap = {
    whatsapp: <BsWhatsapp className='w-5 h-5 text-[#25D366]' />,
    ai: <HiSparkles className='w-5 h-5 text-amber-500' />,
    bot: <MdSmartToy className='w-5 h-5 text-[#15803d]' />,
    voice: <MdRecordVoiceOver className='w-5 h-5 text-teal-600' />,
    agent: <MdSupportAgent className='w-5 h-5 text-blue-600' />,
};

export default function WhatsAppCTAComp({ data, pageInfo }) {
    if (!data) return null;

    const floatingBubbles = data?.floating_bubbles || [];
    const floatingIcons = data?.floating_icons || [];
    const primaryUrl =
        data?.primary_btn_link && !data.primary_btn_link.includes('signup')
            ? data.primary_btn_link
            : getURL('signup', pageInfo?.page, pageInfo);

    return (
        <section
            id='get-started'
            className='relative overflow-hidden bg-gradient-to-br from-emerald-50 via-[#DCF8C6]/50 to-teal-50'
        >
            <div className='absolute inset-0 pointer-events-none hidden md:block'>
                {floatingBubbles.map((bubble, index) => (
                    <div
                        key={`bubble-${index}`}
                        className={`absolute px-4 py-2.5 rounded-lg text-xs font-medium shadow-md border whitespace-nowrap ${
                            bubble?.dir === 'customer'
                                ? 'bg-white border-gray-100 text-[#374151]'
                                : 'bg-[#DCF8C6] border-[#128C7E]/20 text-[#128C7E]'
                        } ${bubble?.animationClass || 'animate-float-1'}`}
                        style={{ left: bubble?.left, top: bubble?.top }}
                    >
                        {bubble?.text}
                    </div>
                ))}

                {floatingIcons.map((item, index) => (
                    <div
                        key={`icon-${index}`}
                        className={`absolute w-11 h-11 rounded-lg bg-white border border-emerald-100 shadow-md flex items-center justify-center ${
                            item?.animationClass || 'animate-float-1'
                        }`}
                        style={{ left: item?.left, top: item?.top }}
                    >
                        {floatingIconMap[item?.icon]}
                    </div>
                ))}
            </div>

            <div className='absolute top-8 right-12 w-64 h-64 bg-[#529837]/15 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute bottom-8 left-12 w-72 h-72 bg-[#128C7E]/15 rounded-full blur-3xl pointer-events-none' />

            <div className='container cont_p relative z-10'>
                <div className='max-w-3xl mx-auto text-center flex flex-col gap-6 items-center'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='heading text-[#18181B] leading-tight'>
                            {data?.heading_prefix}
                            <span className='text-[#529837]'>{data?.heading_accent}</span>
                        </h2>

                        <p className='subheading text-[#4B5563] max-w-xl mx-auto'>{data?.subheading}</p>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto'>
                        {data?.primary_btn && (
                            <a
                                href={primaryUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='btn btn-md bg-[#529837] hover:bg-[#43822b] text-white border-0 px-8 rounded font-medium gap-2 w-full sm:w-auto'
                            >
                                <span>{data?.primary_btn}</span>
                                <MdArrowForward className='w-4 h-4' />
                            </a>
                        )}
                        {data?.secondary_btn && data?.secondary_btn_link && (
                            <a
                                href={data?.secondary_btn_link}
                                className='btn btn-md bg-white hover:bg-slate-50 border border-gray-200 text-[#18181B] font-medium px-8 rounded w-full sm:w-auto'
                            >
                                {data?.secondary_btn}
                            </a>
                        )}
                    </div>

                    {data?.footnote && <p className='text-[#6B7280] text-xs font-normal'>{data?.footnote}</p>}
                </div>
            </div>
        </section>
    );
}
