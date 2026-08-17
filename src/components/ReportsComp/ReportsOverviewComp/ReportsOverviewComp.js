import { MdOutlineBarChart, MdOutlineCampaign, MdOutlineSettingsSuggest, MdOutlineTrendingUp } from 'react-icons/md';

const categoryThemes = {
    communication: {
        icon: MdOutlineBarChart,
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        border: 'border-sky-100',
        dot: 'bg-sky-500',
    },
    campaign: {
        icon: MdOutlineCampaign,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        dot: 'bg-indigo-500',
    },
    operational: {
        icon: MdOutlineSettingsSuggest,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        dot: 'bg-emerald-500',
    },
    bi: {
        icon: MdOutlineTrendingUp,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        dot: 'bg-amber-500',
    },
};

export default function ReportsOverviewComp({ data }) {
    if (!data) return null;

    return (
        <section className='bg-neutral py-14 md:py-20'>
            <div className='container cont cont_p cont_gap'>
                <div className='flex flex-col gap-3 max-w-4xl'>
                    {data?.tagline && (
                        <div>
                            <span className='inline-block text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1 rounded-full border border-accent/20'>
                                {data.tagline}
                            </span>
                        </div>
                    )}
                    {data?.heading && (
                        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight'>
                            {data.heading}
                        </h2>
                    )}
                    {data?.subheading && (
                        <p className='text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed'>
                            {data.subheading}
                        </p>
                    )}
                    {data?.section_title && (
                        <h3 className='text-base md:text-lg font-bold text-primary mt-2'>{data.section_title}</h3>
                    )}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {data?.categories?.map((category, index) => {
                        const theme = categoryThemes[category?.icon] || categoryThemes.communication;
                        const IconComponent = theme.icon;

                        return (
                            <div
                                key={index}
                                className='bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200'
                            >
                                <div className='flex items-center gap-3 pb-3 border-b border-slate-100'>
                                    <span
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${theme.bg} ${theme.color}`}
                                    >
                                        <IconComponent aria-hidden />
                                    </span>
                                    <h4 className='font-bold text-base text-primary leading-snug'>{category?.title}</h4>
                                </div>

                                <ul className='flex flex-col gap-2.5'>
                                    {category?.metrics?.map((metric, metricIdx) => (
                                        <li
                                            key={metricIdx}
                                            className='flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 leading-snug'
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${theme.dot}`} />
                                            <span>{metric}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
