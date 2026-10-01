import Image from 'next/image';

import getURL from '@/utils/getURL';

export default function WhatsAppHeroComp({ data, pageInfo }) {
    if (!data) return null;

    const primaryUrl =
        data?.primary_btn_link && !data.primary_btn_link.includes('signup')
            ? data.primary_btn_link
            : getURL('signup', pageInfo?.page, pageInfo);

    const contactUrl = data?.secondary_btn_link || getURL('contact-us', pageInfo?.page, pageInfo);

    return (
        <section className='bg-white overflow-hidden flex items-center'>
            <div className='container cont_p'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center'>
                    <div className='lg:col-span-5 flex flex-col items-start text-left gap-5'>
                        {data?.product_icon && (
                            <div className='flex items-center gap-2.5'>
                                <Image
                                    src={data?.product_icon}
                                    alt={data?.product_name}
                                    width={32}
                                    height={32}
                                    priority
                                />
                                <span className='font-semibold text-2xl text-[#18181B]'>{data?.product_name}</span>
                            </div>
                        )}

                        {data?.tagline && (
                            <p className='text-xs md:text-sm uppercase font-semibold text-[#15803d]'>{data?.tagline}</p>
                        )}

                        <h1 className='heading whitespace-pre-line text-[#18181B]'>
                            {data?.heading_prefix}
                            <span className='text-[#38A14E] font-bold'>{data?.heading_accent}</span>
                            {data?.heading_suffix}
                        </h1>

                        <p className='subheading whitespace-pre-line text-[#4B5563]'>{data?.subheading}</p>

                        <div className='flex flex-row gap-4 items-center'>
                            {data?.primary_btn && (
                                <a
                                    href={primaryUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='btn btn-md bg-[#38A14E] hover:bg-[#2e823f] text-white border-0 rounded font-medium px-6'
                                >
                                    {data?.primary_btn}
                                </a>
                            )}

                            {data?.secondary_btn && (
                                <a
                                    href={contactUrl}
                                    className='btn btn-md bg-white hover:bg-slate-50 border border-[#38A14E] text-[#38A14E] rounded font-medium px-6'
                                >
                                    {data?.secondary_btn}
                                </a>
                            )}
                        </div>
                    </div>

                    {data?.video && (
                        <div className='lg:col-span-7 flex justify-center lg:justify-end w-full'>
                            <video
                                className='w-full max-w-[720px] h-auto block'
                                autoPlay
                                muted
                                loop
                                playsInline
                                aria-label={data?.tagline}
                            >
                                <source src={data?.video} type='video/webm' />
                            </video>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
