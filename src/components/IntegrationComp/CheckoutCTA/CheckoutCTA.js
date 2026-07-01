export default function CheckoutCTA({ data }) {
    return (
        <section className='bg-shopifyCheckout-primary'>
            <div className='container cont cont_p flex flex-col items-center gap-8 py-16 text-center md:gap-10 md:py-20'>
                {data?.heading_segments?.length > 0 && (
                    <h2 className='heading max-w-3xl'>
                        {data.heading_segments.map((part, index) => (
                            <span
                                key={index}
                                className={`${part?.accent ? 'italic text-shopifyCheckout-primaryFg' : 'text-shopifyCheckout-primaryFg'}${part?.block ? ' block' : ''}`}
                            >
                                {part?.text}
                            </span>
                        ))}
                    </h2>
                )}

                {data?.subheading && (
                    <p className='max-w-2xl text-base leading-relaxed text-shopifyCheckout-primaryFg/75'>
                        {data.subheading}
                    </p>
                )}

                {data?.buttons?.some((btn) => btn?.url) && (
                    <div className='flex flex-wrap items-center justify-center gap-4'>
                        {data.buttons.map((btn, index) =>
                            !btn?.url ? null : btn?.variant === 'secondary' ? (
                                <a
                                    key={index}
                                    href={btn.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-flex items-center justify-center rounded-md border border-shopifyCheckout-primaryFg/40 px-6 py-3 text-base font-semibold text-shopifyCheckout-primaryFg hover:bg-white/10'
                                >
                                    {btn.label}
                                </a>
                            ) : (
                                <a
                                    key={index}
                                    href={btn.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-flex items-center justify-center rounded-md bg-shopifyCheckout-primaryFg px-6 py-3 text-base font-semibold text-shopifyCheckout-primary hover:opacity-90'
                                >
                                    {btn.label}
                                </a>
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
