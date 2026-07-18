import { MdDone } from 'react-icons/md';
import React, { useRef, useState } from 'react';
import { InlineWidget } from 'react-calendly';
import Image from 'next/image';
import Head from 'next/head';

export default function IntegrationAppComp({ data }) {
    const [isPluginModalOpen, setIsPluginModalOpen] = useState(false);
    const videoRef = useRef();
    const handleVideoClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            videoRef.current.controls = true;
        } else {
            videoRef.current.pause();
        }
    };

    return (
        <>
            <Head>
                <script
                    type='module'
                    src='https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js'
                ></script>
                <link
                    rel='stylesheet'
                    href='https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css'
                />
            </Head>
            <div
                className='py-4'
                style={{
                    background: `linear-gradient(90deg, var(--${data?.slug}) 11%, rgba(242, 242, 243, 0.91995) 11%, #f2f2f3 100%)`,
                }}
            >
                <div className='flex container gap-8 items-center '>
                    <div className='p-4 bg-white rounded'>
                        <Image
                            className='h-12 w-fit'
                            width={300}
                            height={300}
                            src={data?.nav?.img}
                            alt='tally logo'
                            loading='lazy'
                        />
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold'>{data?.nav?.heading}</h1>
                        <h2 className='text-lg font-medium'>{data?.nav?.subheading}</h2>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='flex flex-col gap-4 py-20'>
                    <h2 className='text-6xl font-bold'>{data?.heading}</h2>
                    <p className='text-lg w-full md:w-1/2'>{data?.subheading}</p>
                    {data?.buttons && (
                        <div className='flex  gap-3'>
                            {data?.buttons?.get_plugin && (
                                <a
                                    className='btn btn-primary bnt-md'
                                    href={data?.buttons?.get_plugin?.link}
                                    target='_blank'
                                >
                                    Get The Plugin
                                </a>
                            )}
                            {data?.buttons?.meet && (
                                <button onClick={() => setIsPluginModalOpen(true)} className='btn btn-secondary '>
                                    Schedule a meeting
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {data?.slug === 'tally' && (
                    <div className='flex justify-center cont_p'>
                        <div className='max-w-[900px]'>
                            <video
                                ref={videoRef}
                                onClick={handleVideoClick}
                                height={600}
                                preload='none'
                                poster='https://storage.googleapis.com/production-file-system/293020/gkacnbuk'
                            >
                                <source
                                    src='https://storage.googleapis.com/production-file-system/293020/yzeokyfz'
                                    type='video/mp4'
                                />
                                <track kind='captions' srclang='en' label='english_captions' />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                )}
                {data?.slug === 'zapier' && (
                    <div className='flex justify-center '>
                        <div className='w-[900px]'>
                            <zapier-zap-templates
                                theme='light'
                                apps='msg91'
                                create-without-template='hide'
                                limit='10'
                                link-target='new-tab'
                                presentation='row'
                                use-this-zap='show'
                            ></zapier-zap-templates>
                        </div>
                    </div>
                )}
                {data?.features && (
                    <div className='flex flex-col cont_gap cont_p'>
                        <h2 className='text-4xl font-bold'>Top features of this powerful integration</h2>
                        <div className='grid grid-cols-3 gap-8'>
                            {data?.features?.content?.map((feature, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='p-6 rounded flex flex-col h-full w-full bg-neutral justify-center gap-2 '
                                    >
                                        <MdDone
                                            className={`text-4xl font-bold`}
                                            style={{ color: `var(--${data?.slug})` }}
                                        />
                                        <h3 className='text-2xl  font-medium'>{feature}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className=' flex justify-between bg-neutral p-20'>
                    <span className='text-4xl font-medium'>
                        Customize your workflow to fit your specific requirements
                    </span>
                    <a className='btn btn-primary btn-outline' href={data?.workflow?.link} target='_blank'>
                        Get The Plugin
                    </a>
                </div>
                <div className=' flex justify-between cont_gap items-center p-20'>
                    <p className='text-2xl' dangerouslySetInnerHTML={{ __html: data?.supercharge?.content }}></p>
                    <img src={data?.supercharge?.img} alt='tally-graphics image' />
                </div>
                <div className='flex flex-col cont_gap cont_p'>
                    <h2 className='text-4xl font-bold'>{data?.offers?.heading}</h2>
                    <div className='flex flex-col gap-8'>
                        {data?.offers?.content?.map((feature, index) => {
                            return (
                                <div key={index} className='flex  gap-2 items-center '>
                                    <MdDone className='text-2xl text-accent' />
                                    <h3 className='text-xl'>{feature}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='flex justify-between items-center cont_p'>
                    <h2 className='text-4xl w-full md:w-1/2 font-medium'>
                        Enhance your communication capabilities and automate your engagement tasks
                    </h2>
                    <a className='btn btn-primary' href={data?.get_plugin?.link} target='_blank'>
                        {data?.get_plugin?.content}
                    </a>
                </div>
                {isPluginModalOpen && (
                    <dialog id='plugin_modal' className='modal' open>
                        <div className='modal-box'>
                            <button
                                onClick={() => setIsPluginModalOpen(false)}
                                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                            >
                                ✕
                            </button>
                            <InlineWidget url='https://calendly.com/d/y3n-29s-29h' styles={{ height: '820px' }} />
                        </div>
                    </dialog>
                )}
            </div>
        </>
    );
}
