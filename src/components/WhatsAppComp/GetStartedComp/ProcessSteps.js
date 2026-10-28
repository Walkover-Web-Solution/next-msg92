import { MdEditNote, MdLink, MdSettings, MdChatBubbleOutline } from 'react-icons/md';
import getURL from '@/utils/getURL';

const iconMap = {
    MdEditNote,
    MdLink,
    MdSettings,
    MdChatBubbleOutline,
};

export default function ProcessSteps({ data, pageInfo }) {
    if (!data?.heading) return null;

    return (
        <section>
            <div className='container cont cont_p cont_gap'>
                <header className='cont cont_gap items-center text-center'>
                    {data?.kicker && <h2 className='whatsapp__heading text-primary'>{data?.kicker}</h2>}
                    {data?.heading && (
                        <p
                            className={
                                data?.kicker ? 'whatsapp__subheading text-gray-600' : 'whatsapp__heading text-primary'
                            }
                        >
                            {data?.heading}
                        </p>
                    )}
                    {data?.description && <p className='text-base text-gray-600 max-w-2xl'>{data?.description}</p>}
                </header>

                {data?.steps?.length > 0 && (
                    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 cont_gap'>
                        {data?.steps?.map((step, index) => {
                            const Icon = iconMap[step?.icon];

                            return (
                                <li key={index} className='flex'>
                                    <article className='cont cont_gap w-full rounded-xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-green-600'>
                                        <div className='flex items-center justify-between'>
                                            <span className='whatsapp_lite_bg flex h-12 w-12 items-center justify-center rounded-xl'>
                                                {Icon && <Icon size={26} className='text-whatsapp' />}
                                            </span>
                                            {step?.number && (
                                                <span className='whatsapp_lite_bg rounded-full px-3 py-1 text-xs font-bold text-whatsapp'>
                                                    Step {step?.number}
                                                </span>
                                            )}
                                        </div>
                                        <div className='cont gap-2'>
                                            {step?.title && (
                                                <h3 className='text-lg font-bold leading-snug'>{step?.title}</h3>
                                            )}
                                            {step?.description && (
                                                <p
                                                    className='text-base leading-relaxed text-gray-600'
                                                    dangerouslySetInnerHTML={{ __html: step?.description }}
                                                />
                                            )}
                                        </div>
                                    </article>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {(data?.note || data?.cta?.text) && (
                    <div className='whatsapp_lite_bg flex w-full flex-col cont_gap rounded-xl p-6 md:flex-row md:items-center md:justify-between md:p-8'>
                        {data?.note && <p className='flex-1 text-base text-gray-600'>{data?.note}</p>}
                        {data?.cta?.text && (
                            <a href={getURL('signup', pageInfo?.page, pageInfo)} target='_blank'>
                                <button className='btn btn-md whatsapp_bg w-full text-white md:w-auto'>
                                    {data?.cta?.text}
                                </button>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
