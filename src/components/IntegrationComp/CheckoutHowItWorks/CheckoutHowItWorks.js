export default function CheckoutHowItWorks({ data }) {
    if (!data?.steps?.length) return null;

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

                <div className='relative pb-12 md:pb-16'>
                    <div
                        className='absolute left-6 right-6 top-6 hidden h-px bg-shopifyCheckout-accent/40 md:block'
                        aria-hidden
                    />

                    <div className='grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6'>
                        {data.steps.map((step, index) => (
                            <div key={index} className='relative flex flex-col gap-4'>
                                <div className='relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-shopifyCheckout-accent bg-shopifyCheckout-cream text-sm font-semibold text-shopifyCheckout-accent'>
                                    {step?.step ?? index + 1}
                                </div>

                                {step?.title && (
                                    <h3 className='text-lg font-bold text-shopifyCheckout-heading md:text-xl'>
                                        {step.title}
                                    </h3>
                                )}

                                {step?.description && (
                                    <p className='text-sm leading-relaxed text-shopifyCheckout-body'>
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
