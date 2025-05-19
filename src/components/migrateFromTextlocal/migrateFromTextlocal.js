import Image from 'next/image';
import Link from 'next/link';
import { LinkText } from '../UIComponent/Buttons/LinkButton';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';

export default function MigrateFromTextlocal({ pageInfo, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div className='container'>
                <div className=' cont_p  gap-6 h-fit cont overflow-hidden max-w-[1000px]'>
                    <h1 className='heading'>Textlocal is Shutting Down — Switch to MSG91 in just One Meeting</h1>
                    <h2 className='text-2xl'>
                        As of October 31, 2025, Textlocal Messenger will be discontinued. They are also not allowing to
                        recharge the existing accounts from May 01, 2025 onwards. Keep your messaging seamless by moving
                        to MSG91 — enjoy powerful features, reliable delivery, and transparent pricing.
                    </h2>
                    <button onClick={() => setIsModalOpen(true)} className='btn btn-md btn-primary'>
                        Schedule a Meeting Now
                    </button>
                </div>
            </div>
            <div className='container cont cont_p cont_gap'>
                <h2 className='text-3xl font-bold'>Why Choose MSG91 Over Other Alternatives?</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-12'>
                    {data?.why_msg91?.map((why, index) => (
                        <div className=' bg-gray sm:p-8 p-6 md:p-8 lg:p-12 cont gap-4 rounded-lg' key={index}>
                            <span className='text-3xl'>{why?.icon}</span>
                            <h3 className='text-2xl font-semibold'>{why?.title}</h3>
                            <p className='text-xl text-gray-700'>{why?.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-gray'>
                <div className='container cont cont_p cont_gap'>
                    <h2 className='text-3xl font-bold'>How to Migrate from Textlocal to MSG91</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-12'>
                        {data?.how_to_migrate?.map((how, index) => (
                            <div className=' bg-white sm:p-8 p-6 md:p-8 lg:p-12 cont gap-3 rounded-lg ' key={index}>
                                <span className='text-4xl font-semibold text-accent'>{index + 1}</span>
                                <h3 className='text-2xl font-semibold'>{how?.title}</h3>
                                <p className='text-xl text-gray-700'>{how?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container cont cont_p cont_gap'>
                <h2 className='text-3xl font-bold'>Beyond SMS: Discover Our Full Suite of Communication Tools</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2  gap-6 md:gap-12'>
                    {data?.beyond_sms?.map((product, index) => (
                        <Link href={product?.slug} key={index}>
                            <div
                                className={`bg-gray sm:p-8 p-6 md:p-8 lg:p-12 cont gap-4 h-full rounded-lg ${product?.slug}_lite_bg LinkButtonCard hover:shadow-lg`}
                                key={index}
                            >
                                <Image
                                    width={40}
                                    height={40}
                                    src={`/assets/icons/products/${product?.slug}.svg`}
                                    alt={product?.name}
                                />
                                <h3 className='text-2xl font-semibold'>{product?.title}</h3>
                                <p className='text-xl text-gray-700 mb-auto'>{product?.description}</p>
                                <LinkText className='link-btn' href={'/'}>
                                    Learn More
                                </LinkText>
                            </div>
                        </Link>
                    ))}
                </div>
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
                            url={'https://calendly.com/sales-msg91/pre-sales'}
                            styles={{ height: '680px', width: 'auto' }}
                        />
                    </div>
                </dialog>
            )}
        </>
    );
}
