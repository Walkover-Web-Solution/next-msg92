import { MdEditNote, MdLink, MdSettings, MdChatBubbleOutline, MdAnalytics } from 'react-icons/md';
import getURL from '@/utils/getURL';
import Image from 'next/image';

const iconMap = {
    MdEditNote,
    MdLink,
    MdSettings,
    MdChatBubbleOutline,
    MdAnalytics,
};

export default function ProcessSteps({ data, pageInfo }) {
    if (!data?.heading) return null;

    return (
        <section>
            <div className='container cont cont_p cont_gap'>
                <header className='cont gap-3 items-center text-center'>
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
                                    <article
                                        className={`cont cont_gap w-full rounded-xl border border-gray-200 bg-white p-6 transition-colors duration-200 ${
                                            pageInfo?.page === 'hello'
                                                ? 'hover:border-yellow-600'
                                                : 'hover:border-green-600'
                                        }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <span
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                                    pageInfo?.page === 'hello'
                                                        ? 'hello_gradient_bg'
                                                        : 'whatsapp_lite_bg'
                                                }`}
                                            >
                                                {Icon && (
                                                    <Icon
                                                        size={26}
                                                        className={
                                                            pageInfo?.page === 'hello' ? 'text-hello' : 'text-whatsapp'
                                                        }
                                                    />
                                                )}
                                            </span>
                                            {step?.number && (
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                        pageInfo?.page === 'hello'
                                                            ? 'hello_gradient_bg text-hello'
                                                            : 'whatsapp_lite_bg text-whatsapp'
                                                    }`}
                                                >
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

                {data?.practice?.heading && (
                    <div className='cont cont_gap rounded-xl border border-gray-200 bg-white p-6 md:p-8'>
                        <h3 className='text-xl font-bold text-primary'>{data.practice.heading}</h3>

                        {data.practice.paragraphs?.map((paragraph, index) => (
                            <p key={index} className='text-base leading-relaxed text-gray-600'>
                                {paragraph}
                            </p>
                        ))}

                        {(data?.note || data?.cta?.text) && (
                            <div className='flex flex-col cont_gap md:flex-row md:items-center md:justify-between'>
                                {data?.note && <p className='flex-1 text-base text-gray-600'>{data.note}</p>}

                                {data?.cta?.text && (
                                    <a href={getURL('signup', pageInfo?.page, pageInfo)} target='_blank'>
                                        <button
                                            className={`btn btn-md w-full text-white md:w-auto ${
                                                pageInfo?.page === 'hello'
                                                    ? 'bg-[var(--hello-dark-color)]'
                                                    : 'whatsapp_bg'
                                            }`}
                                        >
                                            {data.cta.text}
                                        </button>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {data?.G2Badges?.badges?.length > 0 && (
                    <div className='cont cont_gap'>
                        <div className='flex flex-wrap items-center justify-center gap-6 md:gap-8'>
                            {data.G2Badges.badges.map((badge, index) => (
                                <div key={index} className='flex items-center justify-center'>
                                    <Image
                                        src={badge.src}
                                        alt={badge.alt || 'G2 badge'}
                                        width={160}
                                        height={160}
                                        className='h-28 w-36 object-contain'
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='cont gap-2 rounded-xl border border-gray-200 bg-white p-6 md:p-8'>
                            {data.G2Badges.heading && (
                                <h3 className='text-xl font-bold text-primary'>{data.G2Badges.heading}</h3>
                            )}

                            {data.G2Badges.description && (
                                <p className='text-base leading-relaxed text-gray-600'>{data.G2Badges.description}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
