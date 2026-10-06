import Image from 'next/image';

import getURL from '@/utils/getURL';

export default function WhatsAppHeroComp({ pageInfo, data }) {
    if (!data) return null;

    const primaryUrl = data?.primary_btn_link || getURL('signup', pageInfo?.page, pageInfo);
    const contactUrl = data?.secondary_btn_link || getURL('contact-us', pageInfo?.page, pageInfo);

    return (
        <section className='bg-white overflow-hidden'>
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
                                <span className='font-semibold text-2xl'>{data?.product_name}</span>
                            </div>
                        )}

                        {data?.tagline && (
                            <p className='text-xs md:text-sm uppercase font-semibold text-whatsappChat-dark'>
                                {data?.tagline}
                            </p>
                        )}

                        <h1 className='heading'>
                            {data?.heading_prefix}
                            <span className='text-whatsappChat-accent'>{data?.heading_accent}</span>
                            {data?.heading_suffix}
                        </h1>

                        <p className='subheading'>{data?.subheading}</p>

                        <div className='flex flex-row gap-4 items-center'>
                            {data?.primary_btn && (
                                <a
                                    href={primaryUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='btn btn-whatsapp-chat btn-md'
                                >
                                    {data?.primary_btn}
                                </a>
                            )}

                            {data?.secondary_btn && (
                                <a href={contactUrl} className='btn btn-md btn-whatsapp-chat btn-outline'>
                                    {data?.secondary_btn}
                                </a>
                            )}
                        </div>
                    </div>

                    {data?.video && (
                        <div className='lg:col-span-7 flex justify-center lg:justify-end w-full'>
                            <video
                                className='w-full max-w-[720px] h-auto block rounded-xl'
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
