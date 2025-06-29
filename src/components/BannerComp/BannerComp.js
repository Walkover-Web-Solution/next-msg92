import Image from 'next/image';
import TrustedByComp from '../TrustedByComp/TrustedByComp';
import styles from './BannerComp.module.scss';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import { useEffect, useState } from 'react';
import snipped from '@/data/snipped.json';
import { HTTPSnippet } from 'httpsnippet';
import { MdCopyAll } from 'react-icons/md';
import { InlineWidget } from 'react-calendly';
import getURL from '@/utils/getURL';
import LottiePlayer from '../LottiePlayer/LottiePlayer';

export default function BannerComp({ pageInfo, data }) {
    const [isCopied, setIsCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('curl');
    const [showLoader, setShowLoader] = useState(false);
    useEffect(() => {
        if (pageInfo.page !== 'Numbers') {
            Prism.highlightAll();
        }
    }, [selectedLanguage, snipped, code]);

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 5000);
        } catch (err) {
            console.error('Failed to Copy: ', err);
        }
    };

    useEffect(() => {
        let snippet;
        if (snipped?.snipped[pageInfo.page]) {
            snippet = new HTTPSnippet(snipped?.snipped[pageInfo.page]);
        }

        const snippetCode = {
            curl: snippet?.convert('shell', 'curl'),
            node: snippet?.convert('node'),
            php: snippet?.convert('php'),
            ruby: snippet?.convert('ruby'),
            python: snippet?.convert('python'),
        };
        setCode(snippetCode);
    }, [pageInfo]);

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
                                <Image src={data?.product?.icon} width={40} height={40} alt={data?.product?.name} />
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
                        <p className={`${data?.slug === 'whatsapp' ? 'whatsapp__suheading' : 'suheading'}`}>
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
                    <div className='flex flex-col gap-3'>
                        {data?.text_h2 && <h2 className='text-center font-semibold text-xl'>{data?.text_h2}</h2>}
                        {data?.code && (
                            <div className='md:w-[800px] max-w-full mx-auto flex flex-col gap-0 rounded-lg overflow-hidden border'>
                                <div role='tablist' className='flex bg-gray-700'>
                                    {snipped?.languages.map((language, index) => {
                                        return (
                                            <a
                                                key={index}
                                                role='tab'
                                                className={` w-full p-2 text-center cursor-pointer transition-all  hover:bg-gray-800 text-sm ${
                                                    language?.value === selectedLanguage
                                                        ? 'bg-primary text-white '
                                                        : 'text-slate-300'
                                                }`}
                                                onClick={() => {
                                                    setSelectedLanguage(language?.value);
                                                }}
                                            >
                                                {language?.name}
                                            </a>
                                        );
                                    })}
                                </div>
                                <div className='relative bg-black '>
                                    <div className='absolute right-0 z-20 text-white flex gap-1 items-center p-4'>
                                        <button
                                            className='btn btn-primary btn-sm'
                                            onClick={() => copyText(code[selectedLanguage])}
                                        >
                                            <MdCopyAll />
                                            {isCopied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className='overflow-auto h-[380px]'>
                                        <pre className='code-m-0'>
                                            <code className={`language-javascript ${styles.code_sm} `}>
                                                {code[selectedLanguage]}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {!data?.code && data?.banner_img && !data?.not_absolute && (
                    <div className={styles.cont}>
                        <Image
                            key={data?.tagline}
                            className={pageInfo?.page === 'home' ? styles.homeimg : styles.img}
                            src={data?.banner_img}
                            width={2000}
                            height={2000}
                            alt={data?.tagline}
                        />
                    </div>
                )}
                {!data?.code && data?.banner_img && data?.not_absolute && (
                    <div className='lg:w-1/2'>
                        <Image
                            key={data?.tagline}
                            className='w-full'
                            src={data?.banner_img}
                            width={2000}
                            height={2000}
                            alt={data?.tagline}
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
