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

export default function BannerComp({ pageInfo, data }) {
    const [isCopied, setIsCopied] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('node');

    useEffect(() => {
        if (pageInfo.page !== 'Numbers') {
            Prism.highlightAll();
        }
    }, []);

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 5000);
        } catch (err) {
            console.error('Failed to Copy: ', err);
        }
    };

    let snippet;
    if (snipped?.snipped[pageInfo.page]) {
        snippet = new HTTPSnippet(snipped?.snipped[pageInfo.page]);
    } else {
        console.error(`No snippet found for page: ${pageInfo.page}`);
    }
    const code = {
        node: snippet?.convert('node'),
        curl: snippet?.convert('shell', 'curl'),
        php: snippet?.convert('php'),
        python: snippet?.convert('python'),
        ruby: snippet?.convert('ruby'),
    };

    return (
        <>
            <div className='container cont_p flex gap-6 h-fit flex-col lg:flex-row '>
                <div
                    className={
                        !data?.code
                            ? 'flex flex-col lg:gap-12 gap-8 h-full justify-center lg:w-1/2 w-full z-10'
                            : 'flex flex-col lg:gap-12 gap-8 h-full justify-center w-full z-10'
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
                        <h1 className='heading'>{data?.heading}</h1>
                        <h2 className='suheading'>{data?.subheading}</h2>
                    </div>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <LinkButton
                            href={'/'}
                            content={data?.getstarted_btn}
                            customClasses={'btn btn-primary btn-md '}
                        />
                        {data?.schedule_meet && (
                            <LinkButton
                                href={'/'}
                                content={data?.schedule_meet}
                                customClasses={'btn btn-primary btn-outline btn-md '}
                            />
                        )}{' '}
                    </div>
                    <TrustedByComp data={data?.trustedByComp} />
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

                            <div className='relative '>
                                <button
                                    className='absolute right-0 z-20 text-gray-200 flex gap-1 items-center p-4'
                                    onClick={() => copyText(code)}
                                >
                                    <MdCopyAll />
                                    {isCopied ? 'Copied!' : 'Copy'}
                                </button>
                                <div className='overflow-auto h-[400px]'>
                                    {' '}
                                    {/* Added container for scrollable code */}
                                    <pre className='code-m-0'>
                                        <code className={`language-javascript text-sm`}>{code[selectedLanguage]}</code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
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
        </>
    );
}
