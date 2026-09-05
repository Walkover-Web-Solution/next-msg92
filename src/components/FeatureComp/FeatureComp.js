import GetMdIcons from '@/utils/getMdIcons';
import Image from 'next/image';
import { LinkButton, MoreButton } from '../UIComponent/Buttons/LinkButton';
import { useState } from 'react';
import LottiePlayer from '../LottiePlayer/LottiePlayer';

function FeatureCard({ feature, index, featureKey, total, openedFeatures, setOpenedFeatures, pageInfo, readMore }) {
    const Icon = GetMdIcons(feature?.icon);
    const isWide = (index + 1) % 3 === 0 || (index === total - 1 && total % 3 === 1);
    const isOpen = openedFeatures.includes(featureKey);

    return (
        <div
            className={`bg-white border flex items-center overflow-hidden rounded justify-between ${
                isWide ? 'flex flex-col lg:flex-row col-span-2' : 'flex flex-col lg:col-span-1 col-span-2'
            }`}
        >
            <div className='lg:p-12 p-4 flex flex-col gap-3 w-full'>
                {feature?.icon && <Icon className='text-5xl text-[#F7DC6F]' />}

                <h3 className='text-2xl font-semibold'>{feature?.name}</h3>
                {feature?.subtitle && <h4 className=''>{feature?.subtitle}</h4>}
                <div className='flex flex-col gap-3'>
                    {feature?.subheading && <span className='font-bold'>{feature?.subheading}</span>}
                    {feature?.content && (
                        <div
                            className='text-base leading-relaxed flex flex-col gap-3 [&>p]:m-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2 [&>ul>li]:leading-snug'
                            dangerouslySetInnerHTML={{ __html: feature?.content }}
                        />
                    )}
                </div>
                {feature?.button && (
                    <LinkButton
                        customClasses={'active-link text-link'}
                        target='_blank'
                        content={feature?.button?.name}
                        href={feature?.button?.link}
                    />
                )}
                {feature?.more_content && (
                    <>
                        {feature?.more_content.content && (
                            <div
                                className={`text-lg ${isOpen ? 'block' : 'hidden'}`}
                                dangerouslySetInnerHTML={{
                                    __html: feature?.more_content.content,
                                }}
                            ></div>
                        )}
                        {feature?.more_content?.usecases?.length > 0 && (
                            <div className={` ${isOpen ? 'block' : 'hidden'}`}>
                                <span className='font-semibold text-lg'>{`${
                                    pageInfo?.country === 'br-pt' ? 'Casos de uso' : 'Use Cases'
                                }:`}</span>
                                <ul className='flex flex-col gap-1 list-disc'>
                                    {feature?.more_content?.usecases?.map((usecase, i) => {
                                        return (
                                            <li key={i}>
                                                <strong>{usecase.name}:</strong> {usecase?.description}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                        {feature?.more_content?.features?.length > 0 && (
                            <div className={` ${isOpen ? 'block' : 'hidden'}`}>
                                <span className='font-semibold text-lg'>{`${
                                    pageInfo?.country === 'br-pt' ? 'Principais recursos' : 'Key Features'
                                }:`}</span>
                                <ul className='flex flex-col gap-1 list-disc'>
                                    {feature?.more_content?.features?.map((item, i) => {
                                        return <li key={i}>{item}</li>;
                                    })}
                                </ul>
                            </div>
                        )}
                        {feature?.footer && <p className={` ${isOpen ? 'block' : 'hidden'}`}>{feature?.footer}</p>}
                        <div
                            className='cursor-pointer'
                            onClick={() => {
                                setOpenedFeatures((prevOpenedFeatures) => {
                                    if (prevOpenedFeatures.includes(featureKey)) {
                                        return prevOpenedFeatures.filter((i) => i !== featureKey);
                                    } else {
                                        return [...prevOpenedFeatures, featureKey];
                                    }
                                });
                            }}
                        >
                            <MoreButton open={isOpen} content={readMore || 'Read More'} />
                        </div>{' '}
                    </>
                )}
            </div>
            {feature?.video ? (
                <video
                    className='w-full xl:max-w-[620px] lg:max-w-[500px] max-w-[300px] p-10'
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={feature?.video} type='video/webm' />
                </video>
            ) : (
                feature?.img &&
                (feature?.img.endsWith('.json') ? (
                    <div className='w-full xl:max-w-[600px] lg:max-w-[400px] max-w-[300px] md:mx-6 mx-2'>
                        <LottiePlayer lottie={feature?.img} />
                    </div>
                ) : (
                    <Image
                        src={feature?.img}
                        alt={feature?.name}
                        className='w-full xl:max-w-[620px] lg:max-w-[500px] max-w-[300px] p-10 '
                        width={1080}
                        height={1080}
                        loading='lazy'
                        sizes='(max-width: 768px) 300px, (max-width: 1024px) 500px, (max-width: 1280px) 620px, 1080px'
                    />
                ))
            )}
        </div>
    );
}

export default function FeatureComp({ data, pageInfo }) {
    const [openedFeatures, setOpenedFeatures] = useState([]);
    const features = data?.features || [];

    return (
        <div className={data?.bg || 'bg-neutral'}>
            <div className='container py-20 flex flex-col gap-6'>
                {data?.heading && <h2 className='text-3xl font-bold'>{data.heading}</h2>}
                {data?.subheading && <p className='text-lg text-gray-600 max-w-3xl'>{data.subheading}</p>}
                <div className='grid grid-cols-2 md:gap-12 gap-6'>
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            featureKey={index}
                            total={features.length}
                            openedFeatures={openedFeatures}
                            setOpenedFeatures={setOpenedFeatures}
                            pageInfo={pageInfo}
                            readMore={data?.read_more}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
