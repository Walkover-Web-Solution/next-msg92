import Image from 'next/image';
import React from 'react';

export default function FormatsComp({ data, pageInfo }) {
    if (!data) return null;

    return (
        <section className='bg-white'>
            <div className='container cont_p cont_gap flex flex-col'>
                <div className='flex flex-col gap-4 text-center max-w-5xl mx-auto'>
                    {data?.tagline && <span className='text-xs font-semibold text-fh sm:text-sm'>{data.tagline}</span>}
                    {data?.heading && <h2 className='heading md:whitespace-nowrap'>{data.heading}</h2>}
                    {data?.subheading && (
                        <p className='text-base text-gray-600 md:text-xl max-w-3xl mx-auto'>{data.subheading}</p>
                    )}
                </div>

                <div className='grid grid-cols-1 items-center gap-8 lg:gap-12 lg:grid-cols-12 pt-8'>
                    <div className='flex flex-col gap-4 lg:col-span-6'>
                        {data?.steps?.map((step, index) => (
                            <div
                                key={index}
                                className='flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm'
                            >
                                <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-fh font-bold text-white'>
                                    {step?.number}
                                </span>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='text-lg font-bold text-gray-900'>{step?.title}</h3>
                                    <p className='text-sm text-gray-600'>{step?.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='lg:col-span-6 flex items-center justify-center'>
                        {data?.video ? (
                            <video
                                className='w-full max-w-[530px] aspect-square object-contain rounded-xl'
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload='metadata'
                                poster={data?.img}
                                aria-label={data?.heading}
                            >
                                <source src={data.video} type='video/webm' />
                            </video>
                        ) : data?.img ? (
                            <Image
                                src={data.img}
                                alt={data?.heading}
                                width={1080}
                                height={1080}
                                className='w-full max-w-[530px] aspect-square object-contain rounded-xl'
                                loading='lazy'
                                sizes='(max-width: 768px) 100vw, 530px'
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
