import GetMdIcons from '@/utils/getMdIcons';

export default function CheckoutVerification({ data }) {
    if (!data?.items?.length) return null;

    return (
        <section className='bg-shopifyCheckout-primary'>
            <div className='container cont cont_p'>
                <div className='flex flex-col gap-8 py-12 md:gap-10 md:py-16 lg:flex-row lg:items-start lg:justify-between lg:gap-16'>
                    <div className='flex max-w-xl flex-col gap-6'>
                        {data?.eyebrow && (
                            <div className='flex items-center gap-3'>
                                <span className='h-px w-8 bg-shopifyCheckout-accent' aria-hidden />
                                <span className='text-xs font-semibold uppercase tracking-widest text-shopifyCheckout-accent'>
                                    {data.eyebrow}
                                </span>
                            </div>
                        )}

                        {data?.heading_segments?.length > 0 && (
                            <h2 className='heading'>
                                {data.heading_segments.map((part, index) => (
                                    <span
                                        key={index}
                                        className={`${part?.accent ? 'italic text-shopifyCheckout-accent' : 'text-shopifyCheckout-primaryFg'}${part?.block ? ' block' : ''}`}
                                    >
                                        {part?.text}
                                    </span>
                                ))}
                            </h2>
                        )}
                    </div>

                    {data?.intro && (
                        <p className='max-w-sm text-sm leading-relaxed text-shopifyCheckout-primaryFg/75 lg:pt-10'>
                            {data.intro}
                        </p>
                    )}
                </div>

                <div className='border-t border-shopifyCheckout-primaryFg/15'>
                    <div className='grid grid-cols-1 divide-y divide-shopifyCheckout-primaryFg/15 md:grid-cols-5 md:divide-x md:divide-y-0'>
                        {data.items.map((item, index) => {
                            const Icon = GetMdIcons(item?.icon);

                            return (
                                <div
                                    key={index}
                                    className='group flex flex-col items-center gap-4 border border-transparent px-4 py-8 text-center transition-colors hover:border-shopifyCheckout-primaryFg/25 hover:bg-white/10 md:py-10'
                                >
                                    {item?.icon && (
                                        <div className='flex h-11 w-11 items-center justify-center rounded-lg bg-black/20 text-shopifyCheckout-primaryFg'>
                                            {item.icon === 'truecaller' ? (
                                                <span className='flex h-6 w-6 items-center justify-center rounded-full border border-shopifyCheckout-primaryFg text-[10px] font-bold text-shopifyCheckout-primaryFg'>
                                                    T
                                                </span>
                                            ) : (
                                                Icon && <Icon size={22} aria-hidden />
                                            )}
                                        </div>
                                    )}

                                    {item?.title && (
                                        <h3 className='text-lg font-bold text-shopifyCheckout-primaryFg'>
                                            {item.title}
                                        </h3>
                                    )}

                                    {item?.description && (
                                        <p className='text-xs leading-relaxed text-shopifyCheckout-primaryFg/60'>
                                            {item.description}
                                        </p>
                                    )}

                                    {item?.tag && (
                                        <span className='mt-auto rounded border border-shopifyCheckout-primaryFg/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-shopifyCheckout-primaryFg/80'>
                                            {item.tag}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
