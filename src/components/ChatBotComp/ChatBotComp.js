import GetMdIcons from '@/utils/getMdIcons';
import getURL from '@/utils/getURL';
import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export default function ChatBotComp({ data, pageInfo }) {
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
                        <p className='text-2xl font-bold '>{data?.product?.name}</p>
                    </div>
                    <p className='text-lg uppercase  tracking-widest'>{data?.tagline}</p>
                    <h1 className='text-4xl font-bold'>{data?.heading}</h1>
                    <h2 className='text-xl '>{data?.subheading}</h2>
                    <a href={getURL('signup', 'whatsapp/chatbot', pageInfo)} target='_blank'>
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
                        <h2 className='text-3xl font-semibold'>{data?.business_use?.heading}</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                        {data?.business_use?.content.map((content, index) => {
                            const Icon = GetMdIcons(content?.icon);
                            return (
                                <div key={index} className='flex flex-col gap-6 py-12'>
                                    <div className='text-4xl text-green-700 border border-gray-300 rounded-lg w-[80px] h-[80px] bg-white flex items-center justify-center '>
                                        {Icon && <Icon />}
                                    </div>
                                    <h3 className='text-2xl font-medium'>{content?.heading}</h3>
                                    <p
                                        className='text-lg'
                                        dangerouslySetInnerHTML={{ __html: content?.description }}
                                    ></p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col py-20 gap-6'>
                <div className='row'>
                    <h2 className='text-2xl md:text-3xl font-bold'>{data?.across_industries?.heading}</h2>
                </div>
                <div className='flex flex-col gap-6'>
                    {data?.across_industries?.content.map((industry, index) => {
                        const Icon = GetMdIcons(industry?.icon);
                        return (
                            <div
                                key={index}
                                className={`flex flex-col gap-6 py-8 md:py-12 ${
                                    index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                                }`}
                            >
                                <div className='flex items-center justify-center w-full md:w-1/2'>
                                    <img
                                        className='w-full h-auto object-cover  '
                                        src={industry?.image}
                                        alt='Industry Icon'
                                    />
                                </div>

                                <div className='flex flex-col gap-6 w-full md:w-1/2 bg-neutral p-6 md:p-12'>
                                    <div className='text-4xl md:text-6xl'>{Icon && <Icon />}</div>

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

                                    <div className={`gap-6  flex-col ${expandedIndex === index ? 'flex' : 'hidden'}`}>
                                        {industry?.extra.map((extra, extraIndex) => (
                                            <div key={extraIndex} className='flex flex-col gap-1'>
                                                <h3 className='font-semibold text-lg'>{extra?.title}</h3>
                                                <p className=' '>{extra?.description}</p>
                                            </div>
                                        ))}
                                    </div>

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
                        );
                    })}
                </div>
            </div>
        </>
    );
}
