import GetMdIcons from '@/utils/getMdIcons';
import Image from 'next/image';
import { MoreButton } from '../UIComponent/Buttons/LinkButton';
import { useState } from 'react';

export default function FeatureComp({ data }) {
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
                                    className={` bg-white border flex items-center overflow-hidden gap-1 rounded ${
                                        (index + 1) % 3 === 0
                                            ? 'flex flex-col lg:flex-row col-span-2'
                                            : 'flex flex-col lg:col-span-1 col-span-2'
                                    }`}
                                >
                                    <div className='lg:p-12 p-4 flex flex-col gap-2'>
                                        {feature?.icon && <Icon className='text-5xl text-[#F7DC6F]' />}

                                        <h3 className='text-2xl font-semibold'>{feature?.name}</h3>
                                        <span className='flex text-lg'>
                                            <span className='font-bold'>{feature?.subheading} </span>
                                            <span dangerouslySetInnerHTML={{ __html: feature?.content }}></span>
                                        </span>
                                        {}
                                        <div
                                            className={`text-lg ${openedFeatures.includes(index) ? 'block' : 'hidden'}`}
                                            dangerouslySetInnerHTML={{ __html: feature?.more_content }}
                                        ></div>
                                        <div
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
                                            <MoreButton open={openedFeatures.includes(index)} content={'Read More'} />
                                        </div>
                                    </div>
                                    <Image
                                        src={feature?.img}
                                        alt={feature?.name}
                                        className='w-full xl:max-w-[600px] lg:max-w-[400px] max-w-[300px] md:mx-12 mx-2'
                                        width={420}
                                        height={420}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
