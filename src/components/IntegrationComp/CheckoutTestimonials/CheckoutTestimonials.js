export default function CheckoutTestimonials({ data }) {
    if (!data?.items?.length) return null;

    return (
        <section className='bg-shopifyCheckout-cream'>
            <div className='container cont cont_p'>
                <div className='flex flex-col gap-6 py-12 md:py-16'>
                    {data?.eyebrow && (
                        <div className='flex items-center gap-3'>
                            <span className='h-px w-8 bg-shopifyCheckout-accent' aria-hidden />
                            <span className='text-xs font-semibold uppercase tracking-widest text-shopifyCheckout-accent'>
                                {data.eyebrow}
                            </span>
                        </div>
                    )}

                    {data?.heading_segments?.length > 0 && (
                        <h2 className='heading max-w-3xl'>
                            {data.heading_segments.map((part, index) => (
                                <span
                                    key={index}
                                    className={`${part?.accent ? 'italic text-shopifyCheckout-accent' : 'text-shopifyCheckout-heading'}${part?.block ? ' block' : ''}`}
                                >
                                    {part?.text}
                                </span>
                            ))}
                        </h2>
                    )}
                </div>

                <div className='grid grid-cols-1 divide-y divide-shopifyCheckout-heading/10 border-t border-shopifyCheckout-heading/10 md:grid-cols-3 md:divide-x md:divide-y-0'>
                    {data.items.map((item, index) => (
                        <figure key={index} className='flex flex-col gap-6 px-0 py-10 md:px-8 md:py-12 lg:px-10'>
                            <span className='text-3xl leading-none text-shopifyCheckout-accent' aria-hidden>
                                &ldquo;
                            </span>

                            {item?.quote && (
                                <blockquote className='text-base italic leading-relaxed text-shopifyCheckout-heading'>
                                    {item.quote}
                                </blockquote>
                            )}

                            <div className='flex flex-col gap-1'>
                                {item?.stat && (
                                    <p className='text-4xl font-bold text-shopifyCheckout-accent md:text-5xl'>
                                        {item.stat}
                                    </p>
                                )}
                                {item?.stat_label && (
                                    <p className='text-sm text-shopifyCheckout-body'>{item.stat_label}</p>
                                )}
                            </div>

                            <figcaption className='mt-auto flex flex-col gap-1'>
                                {item?.name && (
                                    <cite className='text-base font-bold not-italic text-shopifyCheckout-heading'>
                                        {item.name}
                                    </cite>
                                )}
                                {item?.role && <p className='text-sm text-shopifyCheckout-body'>{item.role}</p>}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
