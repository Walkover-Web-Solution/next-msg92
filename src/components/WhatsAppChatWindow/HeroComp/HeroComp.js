import { BsWhatsapp } from 'react-icons/bs';

import getURL from '@/utils/getURL';

export default function WhatsAppHeroComp({ data, pageInfo }) {
    if (!data) return null;

    const primaryUrl =
        data?.primary_btn_link && !data.primary_btn_link.includes('signup')
            ? data.primary_btn_link
            : getURL('signup', pageInfo?.page, pageInfo);

    return (
        <section className='bg-white overflow-hidden min-h-[calc(100vh-80px)] flex items-center py-8 lg:py-0'>
            <div className='container cont_p flex flex-col w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
                    <div className='lg:col-span-6 flex flex-col items-start text-left'>
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='w-10 h-10 rounded-xl bg-[#DCF8C6] flex items-center justify-center shadow-xs text-[#25D366]'>
                                <BsWhatsapp className='w-6 h-6' />
                            </div>
                            <span className='font-bold text-2xl text-[#18181B] tracking-tight'>{data?.badge}</span>
                        </div>

                        <h1 className='heading leading-tight tracking-tight text-[#18181B] mb-5'>
                            {data?.heading_prefix}
                            <span className='text-[#529837]'>{data?.heading_accent}</span>
                            {data?.heading_suffix}
                        </h1>

                        <p className='subheading text-[#4B5563] leading-relaxed max-w-lg mb-8 font-normal'>
                            {data?.subheading}
                        </p>

                        <div className='flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center w-full sm:w-auto'>
                            {data?.primary_btn && (
                                <a
                                    href={primaryUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='btn btn-md bg-[#529837] hover:bg-[#43822b] text-white border-0 px-8 rounded-lg shadow-sm hover:shadow-md'
                                >
                                    {data?.primary_btn}
                                </a>
                            )}
                            {data?.secondary_btn && data?.secondary_btn_link && (
                                <a
                                    href={data?.secondary_btn_link}
                                    className='btn btn-md btn-outline border-[#529837] text-[#529837] hover:bg-[#529837]/10 hover:border-[#529837] px-8 rounded-lg'
                                >
                                    {data?.secondary_btn}
                                </a>
                            )}
                        </div>
                    </div>

                    <div className='lg:col-span-6 flex justify-center lg:justify-end w-full'>
                        {data?.hero_video ? (
                            <div className='relative w-full max-w-[540px] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-gray-200/90 bg-[#F7F4EE] flex items-center justify-center p-2 sm:p-3'>
                                <video
                                    className='w-full h-auto rounded-[18px] sm:rounded-[28px] object-cover shadow-sm'
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    aria-label={data?.heading_prefix}
                                >
                                    <source src={data?.hero_video} type='video/mp4' />
                                </video>
                            </div>
                        ) : (
                            <div className='relative w-full max-w-[500px] rounded-[28px] sm:rounded-[44px] overflow-hidden bg-gradient-to-b from-[#f2f7ec] via-[#f7faf3] to-[#e8f2dd] border border-[#e4eed9] p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_-15px_rgba(82,152,55,0.09)] min-h-[400px] sm:min-h-[500px] flex items-center justify-center'>
                                <span className='absolute top-8 left-1/3 text-[#84cc16]/50 text-base select-none pointer-events-none animate-pulse'>
                                    ✦
                                </span>
                                <span className='absolute bottom-12 left-10 text-[#84cc16]/40 text-sm select-none pointer-events-none'>
                                    ✦
                                </span>
                                <span className='absolute top-24 right-10 text-[#84cc16]/40 text-base select-none pointer-events-none'>
                                    ✦
                                </span>

                                <div className='relative z-10 w-full flex items-center justify-between'>
                                    <div className='relative w-[48%] sm:w-[52%] max-w-[290px] flex-shrink-0 flex items-center justify-center'>
                                        <div className='w-32 h-32 sm:w-48 sm:h-48 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-4 sm:p-6 flex flex-col items-center justify-center shadow-xl text-white relative overflow-hidden'>
                                            <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl sm:text-3xl mb-1.5 sm:mb-2'>
                                                🤖
                                            </div>
                                            <span className='text-[10px] sm:text-xs font-bold tracking-wider uppercase text-emerald-100'>
                                                {data?.ai_card_title}
                                            </span>
                                            <span className='text-[9px] sm:text-[10px] text-white/80 font-medium'>
                                                {data?.ai_card_subtitle}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='w-[52%] -ml-4 sm:-ml-4 flex flex-col gap-3 sm:gap-4 z-20'>
                                        <div className='relative self-end w-full max-w-[200px] sm:max-w-[240px]'>
                                            <div className='bg-[#529837] text-white px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl rounded-bl-sm shadow-md border border-[#44822d]'>
                                                <p className='font-semibold text-xs sm:text-base leading-tight'>
                                                    {data?.hero_msg_1}
                                                </p>
                                            </div>
                                            <div className='absolute -bottom-2 left-3 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-[#529837]' />
                                        </div>

                                        <div className='relative self-end w-full max-w-[200px] sm:max-w-[240px]'>
                                            <div className='bg-white/95 backdrop-blur-md text-[#18181B] px-3 py-2.5 sm:px-4.5 sm:py-3 rounded-2xl rounded-tl-sm shadow-md border border-gray-100/90'>
                                                <p className='font-medium text-xs sm:text-sm text-[#374151] leading-snug'>
                                                    {data?.hero_msg_2}
                                                </p>
                                            </div>
                                            <div className='absolute -top-2 left-4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[9px] border-b-white' />
                                        </div>

                                        <div className='self-end mt-1'>
                                            <div className='w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-lg border border-gray-100/90 flex items-center justify-center p-3 sm:p-3.5 text-[#25D366]'>
                                                <BsWhatsapp className='w-6 h-6 sm:w-8 sm:h-8' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
