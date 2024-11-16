import Image from 'next/image';
import TrustedByComp from '../TrustedByComp/TrustedByComp';
import { LinkButton } from '../UIComponent/Buttons/LinkButton';
import styles from './BannerComp.module.scss';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import { useEffect, useState } from 'react';
import snipped from '@/data/snipped.json';
import { HTTPSnippet } from 'httpsnippet';
import { MdCopyAll } from 'react-icons/md';
import { InlineWidget } from 'react-calendly';
import getURL from '@/utils/getURL';

export default function BannerComp({ pageInfo, data }) {
    const [isCopied, setIsCopied] = useState(false);
    const [code, setCode] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('curl');

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
    }, []);

    return (
        <>
            <div className='container cont_p flex gap-6 h-fit flex-col lg:flex-row overflow-hidden'>
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
                                <h1 className='font-semibold text-2xl'>{data?.product?.name}</h1>
                            </div>
                        )}
                        <span className={`text-xl uppercase tracking-widest text-${data?.slug}`}>{data?.tagline}</span>
                        <h2 className='heading'>{data?.heading}</h2>
                        <h3 className='suheading'>{data?.subheading}</h3>
                    </div>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <a
                            href={getURL('signup', pageInfo?.page, pageInfo)}
                            target='_blank'
                            className='btn btn-primary btn-md'
                        >
                            {data?.getstarted_btn}
                        </a>
                        {data?.schedule_meet && (
                            <button
                                className='btn btn-md btn-primary btn-outline'
                                onClick={() => document.getElementById('whatsapp_modal').showModal()}
                            >
                                {data?.schedule_meet}
                            </button>
                        )}{' '}
                    </div>

                    <TrustedByComp data={data?.trustedByComp} />
                    <div className='flex flex-col gap-3'>
                        {data?.text_h2 && <h2 className='text-center font-semibold text-xl'>{data?.text_h2}</h2>}
                        {data?.code && (
                            <div className='md:w-[800px] max-w-full mx-auto flex flex-col gap-0 rounded overflow-hidden border'>
                                <div role='tablist' className='flex'>
                                    {snipped?.languages.map((language, index) => {
                                        return (
                                            <a
                                                key={index}
                                                role='tab'
                                                className={` w-full p-2 text-center cursor-pointer  ${
                                                    language?.value === selectedLanguage ? 'bg-primary text-white' : ''
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
                                    <button
                                        className='absolute right-0 z-20 text-gray-200 flex gap-1 items-center p-4'
                                        onClick={() => copyText(code[selectedLanguage])}
                                    >
                                        <MdCopyAll />
                                        {isCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <div className='overflow-auto h-[400px]'>
                                        <pre className='code-m-0'>
                                            <code className={`language-javascript text-sm`}>
                                                {code[selectedLanguage]}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {!data?.code && (
                    <div className={styles.cont}>
                        <Image
                            className={pageInfo?.page === 'home' ? styles.homeimg : styles.img}
                            src={data?.banner_img}
                            width={2000}
                            height={2000}
                            alt={data?.tagline}
                        />
                    </div>
                )}
            </div>
            <dialog id='whatsapp_modal' className='modal'>
                <div className='modal-box'>
                    <form method='dialog'>
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>
                    <InlineWidget
                        url='https://calendly.com/msg91-whatsapp/15-min-meeting?back=1'
                        styles={{ height: '680px', width: 'auto' }}
                    />
                </div>
            </dialog>
        </>
    );
}
