import {
    MdCampaign,
    MdNotificationsActive,
    MdSupportAgent,
    MdShoppingCart,
    MdLayers,
    MdArrowForward,
} from 'react-icons/md';
import getURL from '@/utils/getURL';

const iconMap = {
    MdCampaign,
    MdNotificationsActive,
    MdSupportAgent,
    MdShoppingCart,
    MdLayers,
};

export default function SplitColumns({ data, pageInfo }) {
    if (!data?.heading) return null;

    const ways = data?.ways || [];

    return (
        <section className='whatsapp_lite_bg'>
            <div className='container cont cont_p'>
                <div className='flex flex-col lg:flex-row lg:items-start cont_gap lg:gap-16'>
                    <div className='flex-1 cont cont_gap'>
                        <h2 className='text-3xl md:text-4xl font-bold'>{data?.heading}</h2>
                        <span className='h-1 w-16 whatsapp_bg rounded-full' aria-hidden />
                        {data?.paragraphs?.map((paragraph, index) => (
                            <p key={index} className='text-base md:text-lg text-gray-600'>
                                {paragraph}
                            </p>
                        ))}
                        {data?.cta?.text && (
                            <a
                                href={data?.cta?.link || getURL('signup', pageInfo?.page, pageInfo)}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group w-fit'
                            >
                                <button className='btn btn-md whatsapp_bg gap-2 border-none text-white hover:opacity-90'>
                                    {data?.cta?.text}
                                    <MdArrowForward
                                        className='h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5'
                                        aria-hidden
                                    />
                                </button>
                            </a>
                        )}
                    </div>

                    {(data?.ways_heading || ways?.length > 0) && (
                        <div className='flex-1 cont cont_gap w-full'>
                            {data?.ways_heading && (
                                <div className='flex items-center gap-2'>
                                    <MdLayers className='shrink-0 text-whatsapp' size={22} aria-hidden />
                                    <h3 className='text-xl md:text-2xl font-bold'>{data?.ways_heading}</h3>
                                </div>
                            )}
                            {ways?.length > 0 && (
                                <ul className='cont cont_gap'>
                                    {ways?.map((way, index) => {
                                        const Icon = iconMap[way?.icon];

                                        return (
                                            <li
                                                key={index}
                                                className='flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4'
                                            >
                                                <span className='whatsapp_lite_bg flex h-11 w-11 shrink-0 items-center justify-center rounded-full'>
                                                    {Icon && <Icon size={22} className='text-whatsapp' />}
                                                </span>
                                                <div className='cont gap-1'>
                                                    {way?.title && <h4 className='text-lg font-bold'>{way?.title}</h4>}
                                                    {way?.description && (
                                                        <p className='text-base text-gray-600'>{way?.description}</p>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
