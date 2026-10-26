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
                    {data?.kicker && <p className='text-sm font-semibold text-whatsapp'>{data?.kicker}</p>}
                    <h2 className='heading'>{data?.heading}</h2>
                    {data?.description && <p className='subheading'>{data?.description}</p>}
                </header>

                {data?.steps?.length > 0 && (
                    <div className='relative w-full'>
                        <div className='hidden lg:block absolute top-10 left-[10%] right-[10%] border-t border-dashed border-gray-200 z-0 pointer-events-none' />

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 cont_gap relative z-10'>
                            {data?.steps?.map((step, index) => {
                                const Icon = iconMap[step?.icon];

                                return (
                                    <div key={index} className='cont cont_gap items-center text-center'>
                                        <span className='whatsapp_lite_bg flex h-20 w-20 items-center justify-center rounded-full relative z-10'>
                                            {Icon && <Icon size={30} className='text-whatsapp' />}
                                        </span>
                                        {step?.number && (
                                            <p className='text-sm font-bold text-whatsapp'>Step {step?.number}</p>
                                        )}
                                        {step?.title && <h3 className='text-lg font-bold'>{step?.title}</h3>}
                                        {step?.description && (
                                            <p className='text-base text-gray-600'>{step?.description}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {(data?.note || data?.cta?.text) && (
                    <div className='cont cont_gap items-center w-full'>
                        {data?.note && (
                            <div className='flex w-full'>
                                <span className='w-1 whatsapp_bg shrink-0' aria-hidden />
                                <div className='whatsapp_lite_bg flex-1 p-4'>
                                    <p className='text-base text-gray-600'>{data?.note}</p>
                                </div>
                            </div>
                        )}
                        {data?.cta?.text && (
                            <a
                                href={getURL('signup', pageInfo?.page, pageInfo)}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <button className='btn btn-md whatsapp_bg text-white'>{data?.cta?.text}</button>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
