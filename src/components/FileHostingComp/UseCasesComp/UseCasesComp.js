import Image from 'next/image';
import React from 'react';
import { MdCheck } from 'react-icons/md';

export default function UseCasesComp({ data, pageInfo }) {
    if (!data) return null;

    return (
        <section className='bg-white'>
            <div className='container cont_p cont_gap flex flex-col'>
                <div className='flex flex-col gap-4 text-center max-w-4xl mx-auto'>
                    {data?.tagline && <span className='text-xs font-semibold text-fh sm:text-sm'>{data.tagline}</span>}
                    {data?.heading && <h2 className='heading'>{data.heading}</h2>}
                    {data?.subheading && (
                        <p className='text-base text-gray-600 md:text-xl max-w-3xl mx-auto'>{data.subheading}</p>
                    )}
                </div>

                <div className='flex flex-col gap-10 md:gap-16 pt-8'>
                    {data?.features?.map((item, index) => {
                        const reverse = index % 2 === 1;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center gap-8 lg:gap-12 ${
                                    reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                }`}
                            >
                                <div className='w-full lg:w-1/2 flex flex-col gap-3'>
                                    {item?.eyebrow && <span className='text-xs font-bold text-fh'>{item.eyebrow}</span>}
                                    <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>{item?.name}</h3>
                                    {item?.subtitle && (
                                        <h4 className='text-base font-semibold text-gray-700'>{item.subtitle}</h4>
                                    )}
                                    {item?.content && (
                                        <p className='text-base text-gray-600 leading-relaxed'>{item.content}</p>
                                    )}

                                    {item?.bullets?.length > 0 && (
                                        <ul className='mt-2 flex flex-col gap-2'>
                                            {item.bullets.map((bullet, bulletIndex) => (
                                                <li
                                                    key={bulletIndex}
                                                    className='flex items-start gap-2.5 text-sm md:text-base text-gray-700'
                                                >
                                                    <span className='flex h-5 w-5 items-center justify-center rounded-xl bg-fh-light text-fh mt-0.5'>
                                                        <MdCheck className='h-3.5 w-3.5' />
                                                    </span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className='w-full lg:w-1/2 flex items-center justify-center'>
                                    {item?.video ? (
                                        <video
                                            className='w-full max-h-[380px] object-contain rounded-xl'
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload='metadata'
                                            poster={item?.img}
                                            aria-label={item?.name}
                                        >
                                            <source src={item.video} type='video/webm' />
                                        </video>
                                    ) : item?.img ? (
                                        <Image
                                            src={item.img}
                                            alt={item?.name}
                                            width={1080}
                                            height={1080}
                                            className='w-full max-h-[380px] object-contain rounded-xl'
                                            loading='lazy'
                                            sizes='(max-width: 768px) 100vw, 50vw'
                                        />
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
