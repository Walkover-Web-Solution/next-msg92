import getPricingURL from '@/utils/pricing/getPricingURL';
import getURL from '@/utils/getURL';
import Image from 'next/image';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';

function PreFooterButtons({ data, pageInfo, onOpenModal }) {
    return (
        <div className='flex flex-wrap items-center gap-4'>
            {data?.buttons?.contactSales?.link && (
                <a href={data?.buttons?.contactSales?.link}>
                    <button className='btn btn-primary btn-outline btn-md'>{data?.buttons?.contactSales?.text}</button>
                </a>
            )}
            {data?.buttons?.salesModal?.text && (
                <button className='btn btn-primary btn-outline btn-md' onClick={onOpenModal}>
                    {data?.buttons?.salesModal?.text}
                </button>
            )}
            {data?.buttons?.pricing?.text && (
                <a href={getPricingURL(pageInfo)}>
                    <button
                        className={`btn btn-primary btn-md ${data?.buttons?.pricing?.primary ? '' : 'btn-outline'}`}
                    >
                        {data?.buttons?.pricing?.text}
                    </button>
                </a>
            )}
            {data?.buttons?.getStarted?.text && (
                <a target='_blank' href={getURL('signup', pageInfo?.page !== 'home' ? pageInfo?.page : 'hello')}>
                    <button
                        className={`btn btn-primary btn-md w-full ${data?.buttons?.getStarted?.primary === false ? 'btn-outline' : ''}`}
                    >
                        {data?.buttons?.getStarted?.text}
                    </button>
                </a>
            )}
        </div>
    );
}

export default function PreFooterComp({ data, pageInfo }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const content = data?.content || 'Start building your ideal customer engagement experience';

    return (
        <>
            <div className={`bg-neutral ${data?.img ? 'py-10 lg:py-0' : 'py-10'}`}>
                {data?.img ? (
                    <div className='container flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8'>
                        <div className='flex w-full flex-col justify-center gap-6 py-0 lg:w-7/12 lg:py-10'>
                            <p className='text-3xl font-bold'>{content}</p>
                            <PreFooterButtons
                                data={data}
                                pageInfo={pageInfo}
                                onOpenModal={() => setIsModalOpen(true)}
                            />
                        </div>
                        <div className='relative hidden min-h-0 lg:flex lg:w-5/12 lg:items-end lg:justify-end pt-5'>
                            <Image
                                src={data.img}
                                alt=''
                                width={400}
                                height={400}
                                className='block h-full w-auto max-w-[320px] object-contain object-bottom'
                                loading='lazy'
                            />
                        </div>
                    </div>
                ) : (
                    <div className='container flex flex-col items-center gap-6 md:flex-row md:justify-between'>
                        <p className='text-3xl font-bold lg:w-1/2'>{content}</p>
                        <PreFooterButtons data={data} pageInfo={pageInfo} onOpenModal={() => setIsModalOpen(true)} />
                    </div>
                )}
            </div>
            {isModalOpen && (
                <dialog id='whatsapp_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget
                            url={data?.buttons?.salesModal?.link}
                            styles={{ height: '680px', width: 'auto' }}
                        />
                    </div>
                </dialog>
            )}
        </>
    );
}
