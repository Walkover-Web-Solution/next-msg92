import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { MdCall, MdOutlineEmail, MdWhatsapp } from 'react-icons/md';

export default function ContactUsComp({ data, pageInfo }) {
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    return (
        <>
            <div className='container flex flex-col cont_gap cont_p'>
                <h1 className='text-center text-4xl font-semibold'>{data?.heading}</h1>
                <div className='flex lg:flex-row flex-col gap-12 justify-between mx-40'>
                    <div className='flex flex-col gap-6 items-center'>
                        <h2 className='text-3xl font-semibold'>{data?.sales?.heading}</h2>
                        <div className='flex flex-col gap-6'>
                            {pageInfo?.country != 'in' ? (
                                <>
                                    <div className='flex items-center gap-2 text-2xl'>
                                        <MdOutlineEmail className='text-2xl' />
                                        <a href='mailto:contact@msg91.com'>contact@msg91.com</a>
                                    </div>
                                    <div className='flex items-center gap-2 text-2xl'>
                                        <MdCall className='text-2xl' />
                                        <a href='tel:+6531595004'>+65 31595004</a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex items-center gap-2 text-2xl'>
                                        <MdOutlineEmail />
                                        <a href='mailto:sales@msg91.com'>sales@msg91.com</a>
                                    </div>
                                    <div className='flex items-center gap-2 text-2xl'>
                                        <MdCall />
                                        <a href='tel:+917049088848'>+91 70490 88848</a>
                                    </div>
                                    <div className='flex items-center gap-2 text-2xl'>
                                        <MdCall />
                                        <a href='tel:+918889378605'>+91 88893 78605</a>
                                    </div>
                                </>
                            )}
                        </div>
                        <button className='btn btn-md btn-primary' onClick={() => setIsSalesModalOpen(true)}>
                            Schedule a meeting
                        </button>
                    </div>
                    <div className='flex flex-col gap-6 items-center'>
                        <h2 className='text-3xl font-semibold '>{data?.support?.heading}</h2>
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-center gap-2 text-2xl'>
                                <MdOutlineEmail className='text-2xl' />
                                <a href='mailto:support@msg91.com'>support@msg91.com</a>
                            </div>
                            <div className='flex items-center gap-2 text-2xl'>
                                <MdWhatsapp className='text-2xl' />
                                <a href='https://wa.me/918818888733'> +91 88188 88733</a>
                            </div>

                            <div className='flex items-center gap-2 text-2xl'>
                                <MdCall />
                                <a href='tel:+918818888733'> +91 88188 88733</a>
                            </div>
                        </div>
                        <button className='btn btn-md btn-primary' onClick={() => setIsSupportModalOpen(true)}>
                            Schedule a meeting
                        </button>
                    </div>
                </div>
            </div>
            {isSupportModalOpen && (
                <dialog id='support_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsSupportModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget
                            url='https://calendly.com/d/y3n-29s-29h?hide_gdpr_banner=1'
                            styles={{ height: '680px' }}
                        />
                    </div>
                </dialog>
            )}
            {isSalesModalOpen && (
                <dialog id='sales_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsSalesModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget url='https://calendly.com/sales-msg91/pre-sales' styles={{ height: '680px' }} />
                    </div>
                </dialog>
            )}
        </>
    );
}
