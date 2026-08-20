import { MdBarChart, MdCampaign, MdSettingsSuggest, MdTrendingUp } from 'react-icons/md';

const categoryMeta = {
    communication: {
        icon: MdBarChart,
        description: 'Track delivery, open rates, and customer responses across all messaging channels.',
        highlights: ['SMS', 'WhatsApp', 'Email', 'OTP', 'Voice', 'RCS'],
    },
    campaign: {
        icon: MdCampaign,
        description: 'Measure campaign ROI, click-through rates, and audience engagement in real time.',
        highlights: ['Delivery Rates', 'Read Rates', 'CTR', 'Conversions'],
    },
    operational: {
        icon: MdSettingsSuggest,
        description: 'Monitor delivery latency, webhook reliability, credit consumption, and queues.',
        highlights: ['Delivery Latency', 'Webhooks', 'Queue Status', 'Billing'],
    },
    bi: {
        icon: MdTrendingUp,
        description: 'Executive dashboards and cross-channel intelligence to maximize communication ROI.',
        highlights: ['Executive Views', 'ROI Analysis', 'SLA Tracking', 'Compliance'],
    },
};

export default function ReportsOverviewComp({ data }) {
    if (!data?.categories?.length) return null;

    return (
        <section className='bg-neutral'>
            <div className='container cont cont_p cont_gap'>
                <div className='cont cont_w gap-3'>
                    {data?.tagline && (
                        <span className='text-xs sm:text-sm font-semibold text-reports'>{data.tagline}</span>
                    )}
                    {data?.heading && <h2 className='heading'>{data.heading}</h2>}
                    {data?.subheading && <p>{data.subheading}</p>}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2'>
                    {data.categories.map((category, index) => {
                        const meta = categoryMeta[category?.icon] || categoryMeta.communication;
                        const IconComponent = meta.icon;
                        const description = category?.description || meta.description;
                        const highlights = category?.highlights || meta.highlights;

                        return (
                            <div
                                key={index}
                                className='bg-white rounded-xl border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-[var(--reports-color)]/40 hover:-translate-y-1 duration-300'
                            >
                                <div>
                                    <div className='w-12 h-12 rounded-xl bg-[var(--reports-lite-color)] border border-[var(--reports-color)]/30 text-reports flex items-center justify-center text-2xl mb-5 shadow-sm'>
                                        <IconComponent aria-hidden />
                                    </div>

                                    <h3 className='text-lg font-bold text-slate-900 mb-2.5 leading-snug'>
                                        {category?.title}
                                    </h3>

                                    <p className='text-sm text-slate-600 leading-relaxed'>{description}</p>
                                </div>

                                <div className='pt-6 mt-6 border-t border-slate-100 flex flex-wrap gap-1.5'>
                                    {highlights.map((item, i) => (
                                        <span
                                            key={i}
                                            className='inline-flex items-center px-2.5 py-1 rounded-xl bg-[var(--reports-lite-color)] text-reports text-xs font-medium border border-[var(--reports-color)]/20'
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
