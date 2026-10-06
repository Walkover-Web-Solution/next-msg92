import { MdArrowForward } from 'react-icons/md';

import GetMdIcons from '@/utils/getMdIcons';
import getURL from '@/utils/getURL';

export default function WhatsAppCTAComp({ pageInfo, data }) {
    if (!data) return null;

    const floatingBubbles = data?.floating_bubbles || [];
    const floatingIcons = data?.floating_icons || [];
    const primaryUrl = data?.primary_btn_link || getURL('signup', pageInfo?.page, pageInfo);

    return (
        <section
            id='get-started'
            className='relative overflow-hidden bg-gradient-to-br from-emerald-50 via-whatsappChat-light to-slate-50 border-t border-slate-200'
        >
            <div className='absolute inset-0 pointer-events-none hidden md:block'>
                {floatingBubbles.map((bubble, index) => (
                    <div
                        key={`bubble-${index}`}
                        className={`absolute px-4 py-2.5 rounded-xl text-xs font-medium shadow-md border ${
                            bubble?.dir === 'customer'
                                ? 'bg-white border-slate-200 text-slate-700'
                                : 'bg-whatsappChat-bubble border-whatsappChat-teal/20 text-whatsappChat-teal'
                        } ${bubble?.animationClass}`}
                        style={{ left: bubble?.left, top: bubble?.top }}
                    >
                        {bubble?.text}
                    </div>
                ))}

                {floatingIcons.map((item, index) => {
                    const Icon = GetMdIcons(item?.icon);
                    return (
                        <div
                            key={`icon-${index}`}
                            className={`absolute w-11 h-11 rounded-xl bg-white border border-emerald-100 shadow-md flex items-center justify-center ${
                                item?.animationClass
                            }`}
                            style={{ left: item?.left, top: item?.top }}
                        >
                            {Icon && <Icon className='w-5 h-5 text-whatsappChat-primary' />}
                        </div>
                    );
                })}
            </div>

            <div className='absolute top-8 right-12 w-64 h-64 bg-whatsappChat-primary/15 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute bottom-8 left-12 w-72 h-72 bg-whatsappChat-teal/15 rounded-full blur-3xl pointer-events-none' />

            <div className='container cont_p relative z-10'>
                <div className='max-w-3xl mx-auto text-center flex flex-col gap-6 items-center'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='heading'>
                            {data?.heading_prefix}
                            <span className='text-whatsappChat-primary'>{data?.heading_accent}</span>
                            {data?.heading_suffix}
                        </h2>

                        {data?.subheading && <p className='subheading max-w-xl mx-auto'>{data?.subheading}</p>}
                    </div>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto'>
                        {data?.primary_btn && (
                            <a
                                href={primaryUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='btn btn-whatsapp-chat btn-md gap-2 w-full sm:w-auto'
                            >
                                <span>{data?.primary_btn}</span>
                                <MdArrowForward className='w-4 h-4' />
                            </a>
                        )}
                        {data?.secondary_btn && data?.secondary_btn_link && (
                            <a
                                href={data?.secondary_btn_link}
                                className='btn btn-md btn-whatsapp-chat btn-outline w-full sm:w-auto'
                            >
                                {data?.secondary_btn}
                            </a>
                        )}
                    </div>

                    {data?.footnote && <p className='text-slate-500 text-xs'>{data?.footnote}</p>}
                </div>
            </div>
        </section>
    );
}
