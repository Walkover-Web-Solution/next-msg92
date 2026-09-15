import Image from 'next/image';
import React from 'react';
import { MdCheck } from 'react-icons/md';
import { LinkButton, LinkText } from '@/components/UIComponent/Buttons/LinkButton';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';
import getURL from '@/utils/getURL';

export default function FeatureHighlightComp({ data, pageInfo }) {
    if (!data) return null;

    return (
        <section className='file-hosting_lite_bg'>
            <div className='container cont_p cont_gap flex flex-col'>
                <div className='flex flex-col gap-3 text-center w-full max-w-none mx-auto mb-8'>
                    {data?.tagline && <span className='text-xs font-semibold text-fh sm:text-sm'>{data?.tagline}</span>}
                    {data?.heading && <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>{data?.heading}</h2>}
                    {data?.subheading && (
                        <p className='text-base md:text-lg text-gray-600 max-w-none'>{data?.subheading}</p>
                    )}
                </div>

                <div className='flex flex-col gap-12 md:gap-16'>
                    {data?.content?.map((item, index) => {
                        const reverse = index % 2 === 1;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-between gap-8 lg:gap-12 ${
                                    reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                }`}
                            >
                                <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                                    {item?.subtitle && (
                                        <span className='text-xs font-bold text-fh'>{item?.subtitle}</span>
                                    )}
                                    {item?.title && (
                                        <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>{item?.title}</h3>
                                    )}

                                    {item?.description && (
                                        <p className='text-base text-gray-600 leading-relaxed'>{item?.description}</p>
                                    )}

                                    {item?.highlights && (
                                        <ul className='flex flex-col gap-2.5'>
                                            {item.highlights.map((highlight, highlightIndex) => (
                                                <li key={highlightIndex} className='flex items-start gap-2.5'>
                                                    <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fh-light text-fh mt-0.5'>
                                                        <MdCheck className='h-3.5 w-3.5' />
                                                    </span>
                                                    <span className='text-sm md:text-base text-gray-700'>
                                                        {highlight}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {item?.footer && (
                                        <p className='text-sm md:text-base text-gray-600'>{item?.footer}</p>
                                    )}

                                    {item?.cta && (
                                        <LinkButton
                                            href={item?.cta?.link}
                                            target='_blank'
                                            customClasses={'text-link active-link'}
                                            content={item?.cta?.text}
                                        />
                                    )}

                                    {item?.schedule_meet && (
                                        <a href={getURL('contact-us', pageInfo?.page, pageInfo)}>
                                            <LinkText customClasses={'text-link active-link'}>
                                                {item?.schedule_meet}
                                            </LinkText>
                                        </a>
                                    )}
                                </div>

                                <div className='w-full lg:w-1/2 flex items-center justify-center'>
                                    {item?.img?.endsWith('.json') ? (
                                        <LottiePlayer lottie={item?.img} />
                                    ) : item?.video ? (
                                        <video
                                            className='w-full max-w-[540px] aspect-square object-contain rounded-2xl border border-slate-200 bg-white p-3 shadow-sm'
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload='metadata'
                                            aria-label={item?.title}
                                        >
                                            <source src={item.video} type='video/webm' />
                                        </video>
                                    ) : item?.img ? (
                                        <Image
                                            src={item?.img}
                                            width={700}
                                            height={700}
                                            alt={item?.title || ''}
                                            className='w-full max-w-[540px] aspect-square object-contain rounded-2xl border border-slate-200 bg-white p-3 shadow-sm'
                                            loading='lazy'
                                            sizes='(max-width: 768px) 100vw, 540px'
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
