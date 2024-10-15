import Image from 'next/image';
import React from 'react';
import { MdArrowForward, MdCheck, MdCheckCircleOutline, MdChevronRight, MdLogin } from 'react-icons/md';
export default function StartupComp({ pageInfo, data }) {
    return (
        <>
            <div className='container flex flex-col cont_gap cont_p'>
                <h1 class='text-5xl font-bold'>{data?.heading}</h1>
                <p class='text-xl'>{data?.subheading}</p>
                <a href={data?.doc_btn_link} target='_blank'>
                    <button className='btn btn-primary  '>{data?.doc_btn}</button>
                </a>
            </div>

            <div className='bg-neutral'>
                <div className='container flex flex-col cont_gap cont_p text-center'>
                    <p class='text-xl font-bold'>{data?.tag}</p>
                </div>
            </div>

            <div className='container flex flex-col cont_gap cont_p'>
                <h2 class='text-3xl font-bold'>{data?.infrastructure?.heading}</h2>
                <div className='flex flex-col lg:flex-row gap-10 items-center justify-center'>
                    {data?.infrastructure?.cards.map((card, index) => (
                        <>
                            <div key={index} className='bg-neutral w-full p-4 rounded flex flex-col gap-4 h-fill'>
                                <MdLogin fontSize={40} className='text-accent' />
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-xl font-bold'>{card.head}</h3>
                                    <p className=''>{card.tag}</p>
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
                <div className='container flex flex-col cont_gap cont_p'>
                    <h2 className='text-3xl font-bold'>{data?.benifits?.heading}</h2>
                    <p className='text-lg'>{data?.benifits?.subheading}</p>
                    <div className='flex flex-col gap-2'>
                        {data?.benifits?.content.map((line, index) => (
                            <div key={index} className='flex gap-2'>
                                <MdCheck className='text-green-600 text-2xl' />
                                <div dangerouslySetInnerHTML={{ __html: line.lines }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='container flex flex-col cont_gap cont_p'>
                <h2 className='text-3xl font-bold'>{data?.terms?.heading}</h2>
                <div className='flex flex-col gap-2'>
                    {data?.terms?.content?.map((line, index) => (
                        <div key={index} className='flex gap-2'>
                            <MdChevronRight className=' text-2xl' />
                            <p>{line.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='bg-neutral'>
                <div className='container flex flex-col cont_gap cont_p'>
                    <h2 className='text-3xl font-bold'>{data?.colaborator?.heading}</h2>
                    <p className='text-lg'>{data?.colaborator?.subheading}</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {data?.colaborator?.cards.map((card, index) => (
                            <a
                                href={card.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                key={index}
                                className='bg-white p-6 gap-4 rounded flex flex-col'
                            >
                                <Image width={30} height={30} src={card.icon} alt={card.tag} className='w-10 h-10' />
                                <div className='text-lg font-bold'>{card.tag}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className='container flex flex-col cont_gap cont_p'>
                <h2 className='text-3xl font-bold'>{data?.checklist?.heading}</h2>
                {data?.checklist?.content.map((line, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <MdCheckCircleOutline className='text-green-600 text-lg' />
                        {line?.line}
                    </div>
                ))}
            </div>
        </>
    );
}
