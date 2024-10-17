import React, { useState } from 'react';
import {
    MdAccountBalance,
    MdContactSupport,
    MdExpandMore,
    MdFlashOn,
    MdOutlineHealthAndSafety,
    MdOutlineQuestionMark,
    MdOutlineStorefront,
    MdOutlineSupport,
    MdOutlineSupportAgent,
    MdOutlineWatch,
    MdOutlineWatchLater,
    MdExpandLess,
} from 'react-icons/md';

export default function ChatBotComp({ data }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <>
            <div className='flex lg:flex-row flex-col container py-20 justify-between'>
                <div className='flex flex-col gap-6 justify-center'>
                    <div className='flex items-center'>
                        <img src={data?.product?.icon} alt='Product Icon' />
                        <p className='text-xl font-bold '>{data?.product?.name}</p>
                    </div>
                    <p className='text-lg'>{data?.tagline}</p>
                    <h1 className='text-4xl font-bold '>{data?.heading}</h1>
                    <h2 className='text-xl '>{data?.subheading}</h2>
                    <a
                        href='https://web.msg91.com/signup?utm_campaign=tigerplugin&utm_source=tally&utm_medium=website'
                        target='_blank'
                    >
                        <button className='btn btn-primary'>{data?.getstarted_btn}</button>
                    </a>
                </div>
                <div>
                    <img src={data?.banner_img} alt='Banner Image' />
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col py-20 gap-6'>
                    <div className='row'>
                        <h2 className='text-3xl font-bold'>{data?.business_use?.heading}</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {data?.business_use?.content.map((content, index) => (
                            <div key={index} className='flex flex-col gap-6 py-12'>
                                <div className='text-3xl text-green-700 py-6 border border-gray-300 rounded-lg bg-white flex items-center justify-center w-1/6 md:w-1/6'>
                                    {content?.icon === 'MdFlashOn' && <MdFlashOn />}
                                    {content?.icon === 'MdOutlineWatch' && <MdOutlineWatchLater />}
                                    {content?.icon === 'MDoutlineQuestion' && <MdContactSupport />}
                                    {content?.icon === 'MDoutlineSupport' && <MdOutlineSupportAgent />}
                                </div>
                                <p className='text-2xl font-semibold'>{content?.heading}</p>
                                <p className='text-sm' dangerouslySetInnerHTML={{ __html: content?.description }}></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col py-20 gap-6'>
                <div className='row'>
                    <h2 className='text-2xl md:text-3xl font-bold'>{data?.Across_industries?.heading}</h2>
                </div>
                <div className='flex flex-col gap-6'>
                    {data?.Across_industries?.content.map((industry, index) => (
                        <div
                            key={index}
                            className={`flex flex-col gap-6 py-8 md:py-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                        >
                            <div className='flex items-center justify-center w-full md:w-1/2'>
                                <img
                                    className='w-full h-auto object-cover  '
                                    src={industry?.image}
                                    alt='Industry Icon'
                                />
                            </div>

                            <div className='flex flex-col gap-6 w-full md:w-1/2 bg-neutral p-6 md:p-12'>
                                <div className='text-4xl md:text-6xl'>
                                    {industry?.icon === 'MdOutlineHealthAndSafety' && <MdOutlineHealthAndSafety />}
                                    {industry?.icon === 'MdOutlineStorefront' && <MdOutlineStorefront />}
                                    {industry?.icon === 'MdAccountBalance' && <MdAccountBalance />}
                                </div>

                                <h2 className='text-2xl md:text-3xl font-semibold'>{industry?.heading}</h2>
                                <p
                                    className='text-md md:text-lg'
                                    dangerouslySetInnerHTML={{ __html: industry?.description }}
                                ></p>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                                    {industry?.card.map((card, cardIndex) => (
                                        <div
                                            key={cardIndex}
                                            className='text-md md:text-lg font-normal bg-white border border-gray-300 rounded p-4 overflow-hidden'
                                        >
                                            {card?.line}
                                        </div>
                                    ))}
                                </div>

                                {expandedIndex === index && (
                                    <div className='gap-6 flex flex-col'>
                                        {industry?.extra.map((extra, extraIndex) => (
                                            <div key={extraIndex} className='flex flex-col gap-4'>
                                                <h3 className='text-md md:text-lg'>{extra?.title}</h3>
                                                <p className='text-sm md:text-md'>{extra?.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className='flex items-center'>
                                    <button
                                        className='text-sm md:text-md font-semibold text-blue-600'
                                        onClick={() => toggleExpand(index)}
                                    >
                                        {expandedIndex === index ? 'Show Less' : 'Learn More'}
                                    </button>
                                    {expandedIndex === index ? <MdExpandLess /> : <MdExpandMore />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
