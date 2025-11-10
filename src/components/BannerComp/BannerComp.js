import Image from 'next/image';
import TrustedByComp from '../TrustedByComp/TrustedByComp';
import styles from './BannerComp.module.scss';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import getURL from '@/utils/getURL';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import CodeSnippet from '../CodeSnipped/CodeSnipped';

export default function BannerComp({ pageInfo, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className='container cont_p flex gap-6 h-fit flex-col lg:flex-row overflow-hidden '>
                <div
                    className={
                        !data?.code
                            ? 'flex flex-col lg:gap-12 gap-8 h-full justify-center lg:w-1/2 w-full z-10'
                            : 'flex flex-col lg:gap-12 gap-8 h-full justify-center w-full  z-10'
                    }
                >
                    <div className='flex flex-col gap-6'>
                        {data?.product && (
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={data?.product?.icon}
                                    width={40}
                                    height={40}
                                    alt={data?.product?.name}
                                    loading='lazy'
                                    sizes='(max-width: 768px) 32px, (max-width: 1024px) 36px, 40px'
                                />
                                <span className='font-semibold text-2xl'>{data?.product?.name}</span>
                            </div>
                        )}
                        <span className={`text-xl uppercase tracking-widest text-${data?.slug}`}>{data?.tagline}</span>
                        {data?.product ? (
                            <h1 className={`${data?.slug === 'whatsapp' ? 'whatsapp__' : ''}heading`}>
                                {data?.heading}
                            </h1>
                        ) : (
                            <h1 className='heading'>{data?.heading}</h1>
                        )}
                        <p className={`${data?.slug === 'whatsapp' ? 'whatsapp__subheading' : 'subheading'}`}>
                            {data?.subheading}
                        </p>
                    </div>

                    <div className='flex flex-col md:flex-row gap-6'>
                        {data?.getstarted_btn && (
                            <a
                                href={getURL('signup', pageInfo?.page, pageInfo)}
                                target='_blank'
                                className='btn btn-primary btn-md'
                            >
                                {data?.getstarted_btn}
                            </a>
                        )}

                        {data?.schedule_meet && (
                            <button className='btn btn-md btn-primary btn-outline' onClick={() => setIsModalOpen(true)}>
                                {data?.schedule_meet}
                            </button>
                        )}
                        {/* {pageInfo?.page === 'hello' && (
                            <a
                                href='/demochatbot'
                                onClick={() => {
                                    setShowLoader(true);
                                }}
                            >
                                <button className='btn btn-md btn-primary btn-outline'>
                                    {showLoader ? (
                                        <span className='flex align-baseline justify-end gap-1'>
                                            Redirecting <span className='loading loading-dots loading-sm'></span>
                                        </span>
                                    ) : (
                                        <span>Test Chatbot</span>
                                    )}
                                </button>
                            </a>
                        )} */}
                    </div>

                    <TrustedByComp data={data?.trustedByComp} />
                    {data?.code && <CodeSnippet curlKey={data?.slug} />}
                </div>
                {!data?.code && data?.banner_img && !data?.not_absolute && (
                    <div className={styles.cont}>
                        <Image
                            key={data?.tagline}
                            className={pageInfo?.page === 'home' ? styles.homeimg : styles.img}
                            src={data?.banner_img}
                            width={720}
                            height={720}
                            alt={data?.tagline}
                            priority
                            fetchPriority='high'
                            sizes='(max-width: 768px) 300px, (max-width: 1024px) 500px, (max-width: 1280px) 600px, 720px'
                        />
                    </div>
                )}
                {!data?.code && data?.banner_img && data?.not_absolute && (
                    <div className='lg:w-1/2'>
                        <Image
                            key={data?.tagline}
                            className='w-full'
                            src={data?.banner_img}
                            width={720}
                            height={720}
                            alt={data?.tagline}
                            priority
                            fetchPriority='high'
                            sizes='(max-width: 768px) 300px, (max-width: 1024px) 500px, (max-width: 1280px) 600px, 720px'
                        />
                    </div>
                )}
                {data?.lottie && !data?.code && (
                    <div className={styles.lottie_animation}>
                        <LottiePlayer lottie={data?.lottie} />
                    </div>
                )}
            </div>
            {isModalOpen && (
                <dialog id='whatsapp_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget
                            url='https://calendly.com/d/y3n-29s-29h?back=1'
                            styles={{ height: '680px', width: 'auto' }}
                        />
                    </div>
                </dialog>
            )}
        </>
    );
}
