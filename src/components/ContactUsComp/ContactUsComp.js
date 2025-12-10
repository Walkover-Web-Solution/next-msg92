import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { MdCall, MdOutlineEmail, MdWhatsapp } from 'react-icons/md';

export default function ContactUsComp({ data, pageInfo }) {
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

    const CONTACTS = {
        'gb': {
            email: 'sales@msg91.com',
            telNumber: ['+44 7418351106'],
            waNumber: '+44 7418351106',
        },
        'es': {
            email: 'sales@msg91.com',
            telNumber: ['+44 7418351106'],
            waNumber: '+44 7418351106',
        },
        'us': {
            email: 'sales@msg91.com',
            telNumber: ['+44 7418351106'],
            waNumber: '+44 7418351106',
        },
        'global': {
            email: 'sales@msg91.com',
            telNumber: ['+44 7418351106'],
            waNumber: '+44 7418351106',
        },
        'br-pt': {
            email: 'sales@msg91.com',
            telNumber: ['+44 7418351106'],
            waNumber: '+44 7418351106',
        },
        'in': {
            email: 'contact@msg91.com',
            telNumber: ['+65 31595004'],
            waNumber: '+65 31595004',
        },
        'sg': {
            email: 'sales@msg91.com',
            telNumber: ['+65 31595004'],
            waNumber: '+65 31595004',
        },
        'fil-ph': {
            email: 'sales@msg91.com',
            telNumber: ['+65 31595004'],
            waNumber: '+65 31595004',
        },
        'ae': {
            email: 'sales@msg91.com',
            telNumber: ['+65 31595004'],
            waNumber: '+65 31595004',
        },
        'default': {
            email: 'sales@msg91.com',
            telNumber: ['+65 31595004', '+91 7049088848'],
            waNumber: '',
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
                            <div className='flex items-center gap-2 text-2xl text-link'>
                                <MdOutlineEmail className='text-2xl' />
                                <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                            </div>

                            {contacts.waNumber ? (
                                <div className='flex items-center gap-2 text-2xl text-link'>
                                    <MdWhatsapp className='text-2xl' />
                                    <a href={`https://wa.me/${contacts.waNumber.replace('+', '')}`}>
                                        {contacts.waNumber}
                                    </a>
                                </div>
                            ) : null}

                            {contacts?.telNumber?.length != 0 ? (
                                contacts?.telNumber?.map((num, idx) => (
                                    <div key={idx} className='flex items-center gap-2 text-2xl text-link'>
                                        <MdCall className='text-2xl' />
                                        <a href={`tel:${num}`}>{num}</a>
                                    </div>
                                ))
                            ) : (
                                <div className='flex items-center gap-2 text-2xl text-link'>
                                    <MdCall className='text-2xl' />
                                    <a href={`tel:${contacts.telNumber}`}>
                                        {Array.isArray(contacts.telNumber) ? contacts.telNumber[0] : contacts.telNumber}
                                    </a>
                                </div>
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
