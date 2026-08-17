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
        <section className='bg-neutral py-16 md:py-24'>
            <div className='container cont cont_p cont_gap'>
                {/* Header */}
                <div className='cont cont_w gap-3 max-w-3xl'>
                    {data?.tagline && (
                        <div>
                            <span className='text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#268080]'>
                                {data.tagline}
                            </span>
                        </div>
                    )}
                    {data?.heading && <h2 className='heading'>{data.heading}</h2>}
                    {data?.subheading && <p className='subheading text-slate-600'>{data.subheading}</p>}
                </div>

                {/* Ultra-Clean 4-Card Minimalist Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2'>
                    {data.categories.map((category, index) => {
                        const meta = categoryMeta[category?.icon] || categoryMeta.communication;
                        const IconComponent = meta.icon;
                        const description = category?.description || meta.description;
                        const highlights = category?.highlights || meta.highlights;

                        return (
                            <div
                                key={index}
                                className='bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-[#24B3B3]/40 hover:-translate-y-1 transition-all duration-300'
                            >
                                <div>
                                    {/* Icon */}
                                    <div className='w-12 h-12 rounded-xl bg-[#f0faf9] border border-[#24B3B3]/30 text-[#24B3B3] flex items-center justify-center text-2xl mb-5 shadow-sm'>
                                        <IconComponent aria-hidden />
                                    </div>

                                    {/* Title */}
                                    <h3 className='text-lg font-bold text-slate-900 mb-2.5 leading-snug'>
                                        {category?.title}
                                    </h3>

                                    {/* Short Clean Summary */}
                                    <p className='text-sm text-slate-600 leading-relaxed'>{description}</p>
                                </div>

                                {/* Key Highlights Pills */}
                                <div className='pt-6 mt-6 border-t border-slate-100 flex flex-wrap gap-1.5'>
                                    {highlights.map((item, i) => (
                                        <span
                                            key={i}
                                            className='inline-flex items-center px-2.5 py-1 rounded-md bg-[#f0faf9] text-[#268080] text-xs font-medium border border-[#24B3B3]/20'
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
