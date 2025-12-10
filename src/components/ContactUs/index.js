import Image from 'next/image';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { MdOutlineCall, MdOutlineEmail, MdOutlineLocalMall, MdOutlineSupportAgent } from 'react-icons/md';

export default function ContactUsComp({ data }) {
    const [modalType, setModalType] = useState(null);

    return (
        <section className='container cont cont_p items-center justify-center gap-12'>
            <div className='cont gap-2 items-center cont_w'>
                <h1 className='text-center text-4xl font-semibold'>{data?.heading}</h1>
                <p className='text-center text-lg text-gray-500'>{data?.subheading}</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12  items-center justify-center w-full lg:w-auto'>
                {data?.cards?.map((card, index) => {
                    return (
                        <div
                            key={index}
                            className='cont items-center p-4 sm:p-12 rounded-lg border border-gray-200 h-full col-span-1 justify-between lg:aspect-square lg:w-[400px] max-w-full w-full'
                        >
                            <div className='cont  gap-4  h-full'>
                                <div className='cont gap-2'>
                                    <div className='bg-blue-100 text-blue-500 rounded-full p-3 w-fit h-fit'>
                                        {card?.key === 'sales' ? (
                                            <MdOutlineLocalMall className='text-3xl' />
                                        ) : (
                                            <MdOutlineSupportAgent className='text-3xl' />
                                        )}
                                    </div>
                                    <h2 className='text-3xl font-semibold'>{card?.heading}</h2>
                                </div>
                                <div className='flex flex-col gap-4  pb-4'>
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineEmail className='text-2xl text-blue-500' />
                                        <a
                                            className='text-lg text-link'
                                            href={`mailto:${card?.email}`}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            {card?.email}
                                        </a>
                                    </div>
                                    {card?.phone?.map((phone, index) => {
                                        return (
                                            <div className='flex items-center gap-2' key={index}>
                                                <MdOutlineCall className='text-2xl text-blue-500' />
                                                <span className='text-lg'>{phone?.number}</span>
                                                <div className='flex items-center gap-2 ml-2'>
                                                    {phone?.whatsapp && (
                                                        <a
                                                            href={`https://wa.me/${phone?.number.replace(/\s+/g, '')}`}
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            className='cursor-pointer transition-all duration-100 p-1 bg-green-200 hover:bg-green-300 rounded-full'
                                                        >
                                                            <Image
                                                                src='/assets/icons/social/whatsapp_logo.svg'
                                                                alt='WhatsApp'
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </a>
                                                    )}
                                                    {phone?.call && (
                                                        <a
                                                            href={`tel:${phone?.number.replace(/\s+/g, '')}`}
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            className='cursor-pointer transition-all duration-100 p-1 bg-blue-100 hover:bg-blue-200 rounded-full'
                                                        >
                                                            <Image
                                                                src='/assets/icons/social/call.svg'
                                                                alt='WhatsApp'
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    className='btn btn-md btn-primary mt-auto'
                                    onClick={() =>
                                        card?.key === 'sales' ? setModalType('sales') : setModalType('support')
                                    }
                                >
                                    Schedule a meeting
                                </button>
                                <CalendlyModal
                                    url={card?.calendlyUrl}
                                    setModalType={setModalType}
                                    isOpen={modalType === card?.key}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function CalendlyModal({ url, setModalType, isOpen }) {
    return (
        <dialog id={`calendly_modal_${url}`} className='modal' open={isOpen}>
            <div className='modal-box'>
                <button
                    onClick={() => setModalType(null)}
                    className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                >
                    ✕
                </button>
                <InlineWidget url={url} styles={{ height: '680px', width: 'auto' }} />
            </div>
        </dialog>
    );
}
