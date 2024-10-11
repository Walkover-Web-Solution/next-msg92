import React from 'react';
import { MdArrowForward, MdCheck, MdCheckCircleOutline, MdChevronRight } from 'react-icons/md';
export default function StartupComp({ pageInfo, data }) {
    return (
        <>
            {' '}
            <div className='container flx flex-col gap-6 py-20'>
                <h1 class='text-4xl font-bold'>{data?.heading || ' this is heading '}</h1>
                <h2 class='text-xl font-normal py-4  w-full lg:w-1/2 gap-6'>
                    {data?.subheading || ' this is heading '}
                </h2>

                <a
                    href={data?.doc_btn_link}
                    target='_blank'
                    className='btn  btn-outline sm:btn-sm md:btn-md lg:btn-lg bg-black py-2 text-white'
                >
                    {data?.doc_btn}
                </a>
            </div>
            <div className='bg-neutral'>
                <div className='container py-20'>
                    <h1 class='text-xl font-bold  weight-700'>{data?.tag || ' this is heading '}</h1>
                </div>
            </div>
            <div className='container flex flex-col gap-6 py-20'>
                <h2 class='text-3xl font-bold'>{data?.infrastructure?.heading}</h2>
                <div className='flex flex-col lg:flex-row gap-8 items-center justify-center'>
                    {data?.infrastructure?.cards.map((card, index) => (
                        <>
                            <div key={index} className='bg-neutral w-full p-4 rounded flex flex-col gap-4'>
                                <div className='flex-shrink-0'>
                                    <img src={card.icon} alt={card.head} width={40} height={40} />
                                </div>
                                <div className='flex-grow'>
                                    <h3 className='text-lg font-bold mb-2'>{card.head}</h3>
                                    <p className='text-md'>{card.tag}</p>
                                </div>
                            </div>

                            {index < data?.infrastructure.cards.length - 1 && (
                                <MdArrowForward className='min-w-8 lg:block hidden' key={index + 4} fontSize={36} />
                            )}
                        </>
                    ))}
                </div>
            </div>
            <div className='bg-neutral'>
                <div className=' container gap-6 py-20'>
                    <h2 className='text-2xl font-bold'>{data?.benifits?.heading}</h2>
                    <p className='py-2'>{data?.benifits?.subheading}</p>
                    <div>
                        {data?.benifits?.content.map((line, index) => (
                            <div key={index} className='flex  py-2'>
                                <MdCheck className='min-w-8 text-green-600' />
                                <p dangerouslySetInnerHTML={{ __html: line.lines }}></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className=' container gap-6 py-20'>
                <h2 className='text-2xl font-bold'>{data?.benifits?.heading}</h2>
                <div>
                    {data?.terms?.map((line, index) => (
                        <div key={index} className='flex  py-2'>
                            <MdChevronRight className='min-w-8' />
                            <p>{line.content}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20'>
                    <h2 className='text-2xl md:text-3xl font-bold'>{data?.colaborator?.heading}</h2>
                    <p className='text-md md:text-lg'>{data?.colaborator?.subheading}</p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {data?.colaborator?.cards.map((card, index) => (
                            <div
                                key={index}
                                className='bg-white p-6 rounded-lg flex flex-col items-start justify-center'
                            >
                                <a href={card.url} target='_blank' rel='noopener noreferrer'>
                                    <div className='flex flex-col items-start'>
                                        <div className='w-full'>
                                            <img src={card.icon} alt={card.tag} className='w-10 h-10' />
                                        </div>
                                        <div className='text-lg font-bold my-2'>{card.tag}</div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className=' container flex flex-col gap-6 py-20'>
                <h2 className='text-2xl  font-bold'>{data?.checklist?.heading}</h2>
                {data?.checklist?.content.map((line, index) => (
                    <div key={index} className='flex '>
                        <MdCheckCircleOutline className='min-w-8 text-green-600' />
                        {line?.line}
                    </div>
                ))}
            </div>
            <div className='bg-neutral'>
                <div className='container py-20 px-4 sm:px-6 lg:px-8 gap-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center md:items-start'>
                        <div className='flex-1 mb-6 md:mb-0'>
                            <h2 className='text-lg md:text-2xl font-bold'>{data?.PreFooterComp?.content}</h2>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between gap-6 w-full md:w-auto'>
                            <a href={data?.PreFooterComp?.buttons?.contactSales?.link} className='w-full md:w-auto'>
                                <button className='btn bg-white border border-black w-full md:w-auto'>
                                    {data?.PreFooterComp?.buttons?.contactSales?.text}
                                </button>
                            </a>
                            <a href={data?.PreFooterComp?.buttons?.getStarted?.link} className='w-full md:w-auto'>
                                <button className='btn btn-active btn-outline w-full md:w-auto'>
                                    {data?.PreFooterComp?.buttons?.getStarted?.text}
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
