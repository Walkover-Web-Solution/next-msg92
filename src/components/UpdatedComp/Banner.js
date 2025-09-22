import Image from 'next/image';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import getURL from '@/utils/getURL';
import { LinkText } from '../UIComponent/Buttons/LinkButton';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';

export default function Banner({ pageInfo, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <section className='container '>
            <div className='cont gap-6 flex flex-col lg:flex-row items-center min-h-[75dvh] '>
                <div className='cont gap-1 md:gap-2 lg:gap-3 w-full'>
                    {data?.product && (
                        <div className='flex items-center gap-2'>
                            <Image src={data?.product?.icon} width={40} height={40} alt={data?.product?.name} />
                            <span className='font-semibold text-2xl'>{data?.product?.name}</span>
                        </div>
                    )}
                    <p className={`text-lg md:text-xl uppercase tracking-widest text-${data?.slug}`}>{data?.tagline}</p>
                    <h1 className='heading text-primary'>{data?.heading}</h1>
                    <p className='subheading text-gray-600'>{data?.subheading}</p>
                    <div className='flex gap-2 flex-col sm:flex-row'>
                        <a href={getURL('signup', pageInfo?.page, pageInfo)} target='_blank'>
                            <button className='btn btn-hello btn-md'>
                                <LinkText>Get Started</LinkText>
                            </button>
                        </a>
                        <a href='/demochatbot'>
                            <button className='btn btn-hello btn-outline btn-md'>
                                <LinkText>Test Chatbot</LinkText>
                            </button>
                        </a>
                        {data?.schedule_meet && (
                            <button className='btn btn-md btn-hello btn-outline' onClick={() => setIsModalOpen(true)}>
                                <LinkText>Schedule a Meeting</LinkText>
                            </button>
                        )}
                    </div>
                </div>
                {data?.lottie && !data?.code && (
                    <div className='w-full '>
                        <LottiePlayer lottie={data?.lottie} />
                    </div>
                )}
            </div>
            {isModalOpen && (
                <dialog id='schedule_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget
                            url='https://calendly.com/hello-shared-inbox/hello-meeting'
                            styles={{ height: '680px', width: 'auto' }}
                        />
                    </div>
                </dialog>
            )}
        </section>
    );
}
