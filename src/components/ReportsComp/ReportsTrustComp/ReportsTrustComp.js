import {
    MdCheck,
    MdOutlineAnalytics,
    MdOutlineElectricBolt,
    MdOutlineFilterAlt,
    MdOutlineFileDownload,
    MdOutlineSpeed,
    MdOutlineLightbulb,
} from 'react-icons/md';

const trustIcons = {
    unified: MdOutlineAnalytics,
    realtime: MdOutlineElectricBolt,
    filters: MdOutlineFilterAlt,
    enterprise: MdOutlineFileDownload,
    scale: MdOutlineSpeed,
    insights: MdOutlineLightbulb,
};

export default function ReportsTrustComp({ data }) {
    if (!data || !data?.cards?.length) return null;

    return (
        <section className='bg-white py-16 md:py-20'>
            <div className='container cont cont_p cont_gap'>
                <div className='cont gap-4 text-center max-w-4xl mx-auto'>
                    {data?.tagline && (
                        <span className='text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent'>
                            {data.tagline}
                        </span>
                    )}
                    {data?.heading && <h2 className='heading'>{data.heading}</h2>}
                    {data?.subheading && <p className='subheading'>{data.subheading}</p>}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-6'>
                    {data.cards.map((card, index) => {
                        const IconComponent = trustIcons[card?.icon] || MdOutlineAnalytics;
                        return (
                            <div
                                key={index}
                                className='rounded-xl border border-slate-200/90 bg-white p-6 md:p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow'
                            >
                                <div className='flex items-center gap-3'>
                                    <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent text-2xl'>
                                        <IconComponent aria-hidden />
                                    </span>
                                    <h3 className='font-bold text-xl text-primary leading-snug'>{card?.title}</h3>
                                </div>

                                <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
                                    {card?.description}
                                </p>

                                {card?.benefits?.length > 0 && (
                                    <div className='pt-3 border-t border-slate-100 flex flex-col gap-2'>
                                        {card?.benefits_heading && (
                                            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>
                                                {card.benefits_heading}
                                            </span>
                                        )}
                                        <ul className='flex flex-col gap-2'>
                                            {card.benefits.map((benefit, bIdx) => (
                                                <li
                                                    key={bIdx}
                                                    className='flex items-start gap-2 text-sm text-slate-700 leading-snug'
                                                >
                                                    <MdCheck
                                                        className='text-emerald-600 text-lg shrink-0 mt-0.5'
                                                        aria-hidden
                                                    />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
