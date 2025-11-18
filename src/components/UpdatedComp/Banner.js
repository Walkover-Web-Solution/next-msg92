import Image from 'next/image';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import getURL from '@/utils/getURL';
import { LinkButton, LinkText } from '../UIComponent/Buttons/LinkButton';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';

export default function Banner({ pageInfo, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <section className='container '>
            <div className='cont xl:gap-6 gap-3 flex flex-col lg:flex-row items-center lg:min-h-[75dvh] md:min-h-[60dvh] min-h-fit py-8'>
                <div className='cont gap-1 md:gap-2 lg:gap-3 lg:w-1/2 w-full'>
                    {data?.product && (
                        <div className='flex items-center gap-2'>
                            <Image
                                src={data?.product?.icon}
                                alt={data?.product?.name + ' icon'}
                                width={40}
                                height={40}
                                sizes='40px'
                                priority
                            />
                            <span className='font-semibold text-2xl'>{data?.product?.name}</span>
                        </div>
                    )}
                    <p className={`text-lg md:text-xl uppercase tracking-widest ${data?.slug}_dark_text`}>
                        {data?.tagline}
                    </p>
                    <h1 className='heading text-primary'>{data?.heading}</h1>
                    <p className='subheading text-gray-600'>{data?.subheading}</p>
                    <div className='flex gap-2'>
                        <LinkButton
                            href={getURL('signup', pageInfo?.page, pageInfo)}
                            target='_blank'
                            customClasses={`btn btn-${data?.slug} btn-md`}
                            content={data?.getstarted_btn || 'Get Started'}
                        />
                        {data?.schedule_meet && (
                            <button
                                className={`btn btn-${data?.slug} btn-outline btn-md`}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <LinkText>Schedule a Meeting</LinkText>
                            </button>
                        )}
                        {data?.chatbot && (
                            <button
                                className={`btn btn-${data?.slug} btn-outline btn-md`}
                                onClick={() => {
                                    window.open('https://msg91.com/chatbot', '_blank');
                                }}
                            >
                                <LinkText>{data?.chatbot}</LinkText>
                            </button>
                        )}
                    </div>
                </div>

                <div className='lg:w-1/2 w-full ratio-square'>
                    <Graphics data={data} />
                </div>
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

function Graphics({ data }) {
    if (data?.lottie) {
        return <LottiePlayer lottie={data?.lottie} />;
    } else if (data?.banner_img) {
        return (
            <Image
                className='w-full'
                key={data?.tagline}
                src={data?.banner_img}
                width={600}
                height={600}
                alt={data?.tagline}
                priority
                fetchPriority='high'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 100vw'
            />
        );
    }
}
