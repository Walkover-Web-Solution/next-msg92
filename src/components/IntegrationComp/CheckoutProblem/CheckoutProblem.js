export default function CheckoutProblem({ data }) {
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

                    {data?.subheading && (
                        <p className='max-w-2xl text-base text-shopifyCheckout-body'>{data.subheading}</p>
                    )}
                </div>

                <div className='border-t border-shopifyCheckout-heading/10'>
                    {data.items.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col gap-8 border-b border-shopifyCheckout-heading/10 py-10 lg:flex-row lg:items-stretch lg:gap-12 lg:py-14 ${
                                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                            }`}
                        >
                            <div className='flex flex-1 flex-col justify-center gap-4 lg:px-4'>
                                {item?.title && (
                                    <h3 className='text-xl font-bold text-shopifyCheckout-heading md:text-2xl'>
                                        {item.title}
                                    </h3>
                                )}
                                {item?.description && (
                                    <p className='text-base leading-relaxed text-shopifyCheckout-body'>
                                        {item.description}
                                    </p>
                                )}
                                {item?.metric && (
                                    <p className='text-xs font-semibold uppercase tracking-wider text-shopifyCheckout-accent'>
                                        {item.metric}
                                    </p>
                                )}
                            </div>

                            <div className='relative flex min-h-[10rem] flex-1 items-center justify-center lg:min-h-[14rem]'>
                                {item?.number && (
                                    <span
                                        className='select-none text-[7rem] font-bold leading-none text-shopifyCheckout-heading/[0.07] md:text-[9rem] lg:text-[11rem]'
                                        aria-hidden
                                    >
                                        {item.number}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
