import { MdAutoAwesome, MdGroups, MdShoppingBag, MdTrendingUp } from 'react-icons/md';

const ICONS = {
    revenue: MdTrendingUp,
    commerce: MdShoppingBag,
    ai: MdAutoAwesome,
    scale: MdGroups,
};

export default function WhyTrust({ data }) {
    if (!data?.items?.length) return null;

    return (
        <section className={`why-trust why-trust--${data.theme} w-full`}>
            <div className='container cont cont_p flex flex-col items-center gap-10'>
                <div className='cont cont_gap max-w-3xl items-center text-center'>
                    {data?.eyebrow && (
                        <p className='why-trust_eyebrow text-sm font-semibold tracking-wide'>{data.eyebrow}</p>
                    )}
                    {(data.heading_segments?.length > 0 || data.heading) &&
                        (data.heading_segments?.length > 0 ? (
                            <h2 className='heading'>
                                {data.heading_segments.map((part, index) => (
                                    <span
                                        key={index}
                                        className={part?.accent ? 'why-trust_heading-accent' : 'why-trust_heading'}
                                    >
                                        {part?.text}
                                    </span>
                                ))}
                            </h2>
                        ) : (
                            <h2 className='heading why-trust_heading'>{data.heading}</h2>
                        ))}
                    {data?.subheading && <p className='why-trust_intro subheading'>{data.subheading}</p>}
                </div>

                <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8'>
                    {data.items.map((item, index) => {
                        const Icon = ICONS[item.icon] || MdTrendingUp;

                        return (
                            <article
                                key={index}
                                className='why-trust_card flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center'
                            >
                                <div className='why-trust_icon flex h-12 w-12 items-center justify-center rounded-lg'>
                                    <Icon size={24} aria-hidden />
                                </div>
                                <h3 className='why-trust_card-title text-lg font-bold'>{item.title}</h3>
                                <p className='why-trust_card-body text-base'>{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
