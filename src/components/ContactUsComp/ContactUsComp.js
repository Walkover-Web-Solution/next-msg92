import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { MdCall, MdOutlineEmail, MdWhatsapp, MdOutlineWhatsapp, MdOutlineCall } from 'react-icons/md';

export default function ContactUsComp({ data, pageInfo }) {
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    const [hoverWA, setHoverWA] = useState(false);
    const [hoverCall, setHoverCall] = useState(false);

    const CONTACTS = {
        'gb': {
            email: 'sales@msg91.com',
            contact: '+44 7418351106',
        },
        'es': {
            email: 'sales@msg91.com',
            contact: '+44 7418351106',
        },
        'us': {
            email: 'sales@msg91.com',
            contact: '+44 7418351106',
        },
        'global': {
            email: 'sales@msg91.com',
            contact: '+44 7418351106',
        },
        'br-pt': {
            email: 'sales@msg91.com',
            contact: '+44 7418351106',
        },
        'in': {
            email: 'contact@msg91.com',
            telNumber: '+65 31595004',
        },
        'sg': {
            email: 'sales@msg91.com',
            contact: '+65 31595004',
        },
        'fil-ph': {
            email: 'sales@msg91.com',
            contact: '+65 31595004',
        },
        'ae': {
            email: 'sales@msg91.com',
            contact: '+65 31595004',
        },
    };

    const country = (pageInfo?.country || '').toLowerCase();
    const contacts = CONTACTS[country] || CONTACTS.default;

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
                                    <div className='flex items-center gap-2 text-2xl text-link'>
                                        <MdOutlineEmail className='text-2xl' />
                                        <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                                    </div>
                                    {contacts.contact && (
                                        <div className='flex flex-row items-center gap-4 text-2xl'>
                                            <span>{contacts?.contact}</span>

                                            <a
                                                href={`https://wa.me/${contacts.contact.replace('+', '')}`}
                                                onMouseEnter={() => setHoverWA(true)}
                                                onMouseLeave={() => setHoverWA(false)}
                                            >
                                                {hoverWA ? (
                                                    <MdWhatsapp className='text-2xl text-base-200' />
                                                ) : (
                                                    <MdWhatsapp className='text-2xl' />
                                                )}
                                            </a>

                                            <a
                                                href={`tel:${contacts.contact}`}
                                                onMouseEnter={() => setHoverCall(true)}
                                                onMouseLeave={() => setHoverCall(false)}
                                            >
                                                {hoverCall ? (
                                                    <MdCall className='text-2xl text-base-200' />
                                                ) : (
                                                    <MdCall className='text-2xl' />
                                                )}
                                            </a>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className='flex items-center gap-2 text-2xl text-link'>
                                        <MdOutlineEmail />
                                        <a href='mailto:sales@msg91.com'>sales@msg91.com</a>
                                    </div>
                                    {/* <div className='flex items-center gap-2 text-2xl text-link'>
                                    <MdWhatsapp className='text-2xl' />
                                    <a href='https://wa.me/917316914352'>+91 73169 14352</a>
                                </div> */}
                                    <div className='flex items-center gap-2 text-2xl text-link'>
                                        <MdCall />
                                        <a href='tel:+917049088848'>+91 7049088848</a>
                                    </div>
                                    <div className='flex items-center gap-2 text-2xl text-link'>
                                        <MdCall />
                                        <a href='tel:+918889378605'>+91 8889378605</a>
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
                            <div className='flex items-center gap-2 text-2xl text-link'>
                                <MdOutlineEmail className='text-2xl' />
                                <a href='mailto:support@msg91.com'>support@msg91.com</a>
                            </div>
                            <div className='flex items-center gap-2 text-2xl text-link'>
                                <MdWhatsapp className='text-2xl' />
                                <a href='https://wa.me/917316914364'>+91 7316914364</a>
                            </div>

                            <div className='flex items-center gap-2 text-2xl text-link'>
                                <MdCall />
                                <a href='tel:+918818888733'>+91 8818888733</a>
                            </div>
                            <div className='flex items-center gap-2 text-2xl text-link'>
                                <MdCall />
                                <a href='tel:+917316914364'>+91 7316914364</a>
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
                        <InlineWidget url='https://calendly.com/d/csks-4j4-sy3' styles={{ height: '680px' }} />
                    </div>
                </dialog>
            )}
        </>
    );
}
