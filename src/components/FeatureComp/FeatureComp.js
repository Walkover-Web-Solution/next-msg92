import GetMdIcons from '@/utils/getMdIcons';
import Image from 'next/image';
import { LinkButton, MoreButton } from '../UIComponent/Buttons/LinkButton';
import { useState } from 'react';
import LottiePlayer from '../LottiePlayer/LottiePlayer';

export default function FeatureComp({ data, pageInfo }) {
    const [openedFeatures, setOpenedFeatures] = useState([]);
    return (
        <>
            <div className='bg-neutral'>
                <div className='container py-20 flex flex-col gap-6'>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                    <div className='grid grid-cols-2 md:gap-12 gap-6'>
                        {data?.features?.map((feature, index) => {
                            const Icon = GetMdIcons(feature?.icon);
                            return (
                                <div
                                    key={index}
                                    className={` bg-white border flex items-center overflow-hidden gap-1 rounded justify-between ${
                                        (index + 1) % 3 === 0
                                            ? 'flex flex-col lg:flex-row col-span-2'
                                            : 'flex flex-col lg:col-span-1 col-span-2'
                                    }`}
                                >
                                    <div className='lg:p-12 p-4 flex flex-col gap-3 w-full'>
                                        {feature?.icon && <Icon className='text-5xl text-[#F7DC6F]' />}

                                        <h3 className='text-2xl font-semibold'>{feature?.name}</h3>
                                        <span className='flex text-lg'>
                                            <span className='font-bold'>{feature?.subheading} </span>
                                            <span dangerouslySetInnerHTML={{ __html: feature?.content }}></span>
                                        </span>
                                        {feature?.more_content && (
                                            <>
                                                {feature?.more_content.content && (
                                                    <div
                                                        className={`text-lg ${
                                                            openedFeatures.includes(index) ? 'block' : 'hidden'
                                                        }`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: feature?.more_content.content,
                                                        }}
                                                    ></div>
                                                )}
                                                {feature?.more_content?.usecases?.length > 0 && (
                                                    <div
                                                        className={` ${
                                                            openedFeatures.includes(index) ? 'block' : 'hidden'
                                                        }`}
                                                    >
                                                        <h4 className='font-semibold text-lg'>{`${
                                                            pageInfo?.country === 'br-pt' ? 'Casos de uso' : 'Use Cases'
                                                        }:`}</h4>
                                                        <ul className='flex flex-col gap-1 list-disc'>
                                                            {feature?.more_content?.usecases?.map((usecase, index) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <strong>{usecase.name}:</strong>{' '}
                                                                        {usecase?.description}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}
                                                {feature?.more_content?.features?.length > 0 && (
                                                    <div
                                                        className={` ${
                                                            openedFeatures.includes(index) ? 'block' : 'hidden'
                                                        }`}
                                                    >
                                                        <h4 className='font-semibold text-lg'>{`${
                                                            pageInfo?.country === 'br-pt'
                                                                ? 'Principais recursos'
                                                                : 'Key Features'
                                                        }:`}</h4>
                                                        <ul className='flex flex-col gap-1 list-disc'>
                                                            {feature?.more_content?.features?.map((feature, index) => {
                                                                return <li key={index}>{feature}</li>;
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}
                                                {feature?.button && (
                                                    <LinkButton
                                                        customClasses={'active-link text-link'}
                                                        target='_blank'
                                                        content={feature?.button?.name}
                                                        href={feature?.button?.link}
                                                    />
                                                )}
                                                <div
                                                    className='cursor-pointer'
                                                    onClick={() => {
                                                        setOpenedFeatures((prevOpenedFeatures) => {
                                                            if (prevOpenedFeatures.includes(index)) {
                                                                return prevOpenedFeatures.filter((i) => i !== index);
                                                            } else {
                                                                return [...prevOpenedFeatures, index];
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <MoreButton
                                                        open={openedFeatures.includes(index)}
                                                        content={'Read More'}
                                                    />
                                                </div>{' '}
                                            </>
                                        )}
                                    </div>
                                    {feature?.img && feature?.img.endsWith('.json') ? (
                                        <div className='w-full xl:max-w-[600px] lg:max-w-[400px] max-w-[300px] md:mx-12 mx-2'>
                                            <LottiePlayer lottie={feature?.img} />
                                        </div>
                                    ) : (
                                        <Image
                                            src={feature?.img}
                                            alt={feature?.name}
                                            className='w-full xl:max-w-[600px] lg:max-w-[400px] max-w-[300px] md:mx-12 mx-2'
                                            width={420}
                                            height={420}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
