import { MdArrowForward } from 'react-icons/md';

import getURL from '@/utils/getURL';

export default function WhatsAppCTAComp({ data, pageInfo }) {
    if (!data) return null;

    const floatingBubbles = data?.floating_bubbles || [];
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
                        key={index}
                        className={`absolute px-4 py-2.5 rounded-2xl text-xs font-medium shadow-md border whitespace-nowrap backdrop-blur-xs transition-all duration-300 ${
                            bubble?.dir === 'customer'
                                ? 'bg-white/95 border-gray-100 text-[#374151]'
                                : 'bg-[#DCF8C6]/95 border-[#128C7E]/20 text-[#128C7E]'
                        } ${bubble?.animationClass || 'animate-float-1'}`}
                        style={{ left: bubble?.left, top: bubble?.top }}
                    >
                        {bubble?.text}
                    </div>
                ))}
            </div>

            <div className='absolute top-8 right-12 w-64 h-64 bg-[#529837]/15 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute bottom-8 left-12 w-72 h-72 bg-[#128C7E]/15 rounded-full blur-3xl pointer-events-none' />

            <div className='container cont_p relative z-10'>
                <div className='max-w-3xl mx-auto text-center'>
                    <h2 className='heading text-[#18181B] mb-5 tracking-tight leading-tight'>
                        {data?.heading_prefix}
                        <span className='text-[#529837]'>{data?.heading_accent}</span>
                    </h2>

                    <p className='subheading text-[#4B5563] mb-9 max-w-xl mx-auto font-normal leading-relaxed'>
                        {data?.subheading}
                    </p>

                    <div className='flex flex-col sm:flex-row gap-3.5 justify-center items-center w-full sm:w-auto'>
                        {data?.primary_btn && (
                            <a
                                href={primaryUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='btn btn-md bg-[#529837] hover:bg-[#43822b] text-white border-0 px-9 rounded-xl shadow-md hover:shadow-lg gap-2 font-semibold w-full sm:w-auto'
                            >
                                <span>{data?.primary_btn}</span>
                                <MdArrowForward className='w-4 h-4' />
                            </a>
                        )}
                        {data?.secondary_btn && data?.secondary_btn_link && (
                            <a
                                href={data?.secondary_btn_link}
                                className='btn btn-md bg-white hover:bg-slate-50 border border-gray-200 text-[#18181B] font-medium px-8 rounded-xl shadow-2xs w-full sm:w-auto'
                            >
                                {data?.secondary_btn}
                            </a>
                        )}
                    </div>

                    {data?.footnote && <p className='mt-6 text-[#6B7280] text-xs font-normal'>{data?.footnote}</p>}
                </div>
            </div>

            <style jsx>{`
                .animate-float-1 {
                    animation: floatFlow1 6s ease-in-out infinite;
                }
                .animate-float-2 {
                    animation: floatFlow2 7.5s ease-in-out infinite;
                }
                .animate-float-3 {
                    animation: floatFlow3 8.5s ease-in-out infinite;
                }

                @keyframes floatFlow1 {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-14px) rotate(1deg);
                    }
                }

                @keyframes floatFlow2 {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(12px) rotate(-1.5deg);
                    }
                }

                @keyframes floatFlow3 {
                    0%,
                    100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    33% {
                        transform: translateY(-10px) translateX(5px);
                    }
                    66% {
                        transform: translateY(8px) translateX(-4px);
                    }
                }
            `}</style>
        </section>
    );
}
