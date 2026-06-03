import Image from 'next/image';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { MdOutlineCall, MdOutlineEmail, MdOutlineLocalMall, MdOutlineSupportAgent } from 'react-icons/md';

const CHAT_WIDGET_SCRIPT = 'https://blacksea.msg91.com/chat-widget.js';
const DEFAULT_CHAT_WIDGET_TOKEN = '8e51b';

export default function ContactUsComp({ data }) {
    const [widgetScriptLoaded, setWidgetScriptLoaded] = useState(false);

    const contactCards = data?.cards?.filter((card) => ['sales', 'support'].includes(card?.key)) ?? [];
    const chatCard = data?.cards?.find((card) => card?.key === 'chat' || card?.key === 'meeting');
    const widgetToken = chatCard?.widgetToken || DEFAULT_CHAT_WIDGET_TOKEN;

    useEffect(() => {
        if (!widgetScriptLoaded || !chatCard || !window.initChatWidget) return;

        const container = document.getElementById('contactChatWidget');
        if (!container) return;

        container.innerHTML = '';
        window.initChatWidget(
            {
                widgetToken,
                hide_launcher: true,
                launch_widget: true,
                show_close_button: false,
                show_widget_form: false,
                parentId: 'contactChatWidget',
                fullScreen: true,
            },
            0
        );
    }, [widgetScriptLoaded, widgetToken]);

    return (
        <section className='container cont py-12 items-center gap-12'>
            <Script strategy='afterInteractive' src={CHAT_WIDGET_SCRIPT} onLoad={() => setWidgetScriptLoaded(true)} />
            <h1 className='text-center text-4xl font-semibold'>{data?.heading}</h1>
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,400px)] gap-8 lg:gap-12 w-full'>
                {chatCard && (
                    <div id='contactChatWidget' className='contact-chat-widget w-full min-h-[500px] lg:min-h-[680px]' />
                )}
                <div className='flex flex-col gap-12 items-center lg:items-stretch w-full'>
                    {contactCards.map((card) => (
                        <ContactCard key={card.key} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ContactCard({ card }) {
    const Icon = card?.key === 'sales' ? MdOutlineLocalMall : MdOutlineSupportAgent;

    return (
        <div className='flex flex-col items-center lg:items-start gap-4 p-4 sm:p-12 rounded-lg border border-gray-200 w-full'>
            <div className='flex flex-col items-center lg:items-start gap-2'>
                <div className='bg-blue-100 text-blue-500 rounded-full p-3'>
                    <Icon className='text-3xl' />
                </div>
                <h2 className='text-3xl font-semibold'>{card?.heading}</h2>
            </div>
            <div className='flex flex-col items-center lg:items-start gap-4 w-full'>
                <a className='flex items-center gap-2 text-lg text-link' href={`mailto:${card?.email}`}>
                    <MdOutlineEmail className='text-2xl text-blue-500 shrink-0' />
                    {card?.email}
                </a>
                {card?.phone?.map((phone, index) => {
                    const number = phone?.number?.replace(/\s+/g, '') ?? '';

                    return (
                        <div className='flex items-center justify-center lg:justify-start gap-2 flex-wrap' key={index}>
                            <MdOutlineCall className='text-2xl text-blue-500 shrink-0' />
                            <span className='text-lg'>{phone?.number}</span>
                            {phone?.whatsapp && (
                                <a
                                    href={`https://wa.me/${number}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='p-1 bg-green-200 hover:bg-green-300 rounded-full'
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
                                <a href={`tel:${number}`} className='p-1 bg-blue-100 hover:bg-blue-200 rounded-full'>
                                    <Image src='/assets/icons/social/call.svg' alt='Call' width={20} height={20} />
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
