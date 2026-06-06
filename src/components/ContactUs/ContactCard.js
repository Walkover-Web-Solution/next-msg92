import Image from 'next/image';
import { MdCheck, MdOutlineCall, MdOutlineEmail } from 'react-icons/md';

const ICON_BG = {
    sales: 'bg-blue-100 text-blue-600',
    support: 'bg-purple-100 text-purple-600',
};

export default function ContactCard({ card, icon: Icon }) {
    return (
        <div className='flex flex-col p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm h-full'>
            <div className='flex flex-col gap-3'>
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${ICON_BG[card?.key] ?? ''}`}>
                    <Icon className='text-2xl' />
                </div>
                <h2 className='text-xl font-bold text-slate-900'>{card?.heading}</h2>
                {card?.description && <p className='text-sm text-gray-500 leading-relaxed'>{card.description}</p>}
                {card?.features?.length > 0 && (
                    <ul className='flex flex-col gap-2'>
                        {card.features.map((feature) => (
                            <li key={feature} className='flex items-center gap-2 text-sm text-gray-600'>
                                <MdCheck className='text-blue-500 shrink-0' />
                                {feature}
                            </li>
                        ))}
                    </ul>
                )}
                <a
                    className='flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600'
                    href={`mailto:${card?.email}`}
                >
                    <MdOutlineEmail className='text-lg text-blue-500 shrink-0' />
                    {card?.email}
                </a>
                {card?.phone?.map((phone, index) => {
                    const number = phone?.number?.replace(/\s+/g, '') ?? '';

                    return (
                        <div className='flex items-center gap-2 flex-wrap' key={index}>
                            <MdOutlineCall className='text-lg text-blue-500 shrink-0' />
                            <span className='text-sm text-gray-600'>{phone?.number}</span>
                            {phone?.whatsapp && (
                                <a
                                    href={`https://wa.me/${number}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='p-1 bg-green-100 hover:bg-green-200 rounded-full'
                                >
                                    <Image
                                        src='/assets/icons/social/whatsapp_logo.svg'
                                        alt='WhatsApp'
                                        width={18}
                                        height={18}
                                    />
                                </a>
                            )}
                            {phone?.call && (
                                <a href={`tel:${number}`} className='p-1 bg-blue-100 hover:bg-blue-200 rounded-full'>
                                    <Image src='/assets/icons/social/call.svg' alt='Call' width={18} height={18} />
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className='mt-auto' />
        </div>
    );
}
