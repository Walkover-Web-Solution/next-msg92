import { MdCheck } from 'react-icons/md';

export default function CheckoutHero({ data }) {
    return (
        <section className='bg-checkout-hero-blend'>
            <div className='container cont cont_p'>
                <div className='flex flex-col gap-10 py-10 lg:flex-row lg:items-center lg:gap-12 lg:py-14'>
                    <div className='flex flex-1 flex-col gap-6'>
                        {data?.eyebrow && (
                            <div className='flex items-center gap-3'>
                                <span className='h-px w-8 bg-shopifyCheckout-accent' aria-hidden />
                                <span className='text-xs font-semibold uppercase tracking-widest text-shopifyCheckout-accent'>
                                    {data.eyebrow}
                                </span>
                            </div>
                        )}

                        {data?.heading_segments?.length > 0 && (
                            <h1 className='heading'>
                                {data.heading_segments.map((part, index) => (
                                    <span
                                        key={index}
                                        className={
                                            part?.accent
                                                ? 'italic text-shopifyCheckout-accent'
                                                : 'text-shopifyCheckout-heading'
                                        }
                                    >
                                        {part?.text}
                                    </span>
                                ))}
                            </h1>
                        )}

                        {data?.subheading_segments?.length > 0 && (
                            <p className='max-w-xl text-base text-shopifyCheckout-body'>
                                {data.subheading_segments.map((part, index) => (
                                    <span
                                        key={index}
                                        className={
                                            part?.bold ? 'font-semibold text-shopifyCheckout-heading' : undefined
                                        }
                                    >
                                        {part?.text}
                                    </span>
                                ))}
                            </p>
                        )}

                        {data?.buttons?.some((btn) => btn?.url) && (
                            <div className='flex flex-wrap items-center gap-4'>
                                {data.buttons.map((btn, index) =>
                                    !btn?.url ? null : btn?.variant === 'secondary' ? (
                                        <a
                                            key={index}
                                            href={btn.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='inline-flex items-center justify-center px-2 py-3 text-base font-semibold text-shopifyCheckout-heading underline decoration-1 decoration-black/25 underline-offset-4 hover:opacity-80'
                                        >
                                            {btn.label}
                                        </a>
                                    ) : (
                                        <a
                                            key={index}
                                            href={btn.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='inline-flex items-center justify-center rounded-md border border-shopifyCheckout-primary bg-shopifyCheckout-primary px-6 py-3 text-base font-semibold text-shopifyCheckout-primaryFg hover:opacity-90'
                                        >
                                            {btn.label}
                                        </a>
                                    )
                                )}
                            </div>
                        )}

                        {data?.note_segments?.length > 0 && (
                            <p className='text-sm'>
                                {data.note_segments.map((part, index) => (
                                    <span
                                        key={index}
                                        className={
                                            part?.accent
                                                ? 'font-semibold text-shopifyCheckout-accent'
                                                : 'text-shopifyCheckout-note'
                                        }
                                    >
                                        {part?.text}
                                    </span>
                                ))}
                            </p>
                        )}

                        {data?.badges?.length > 0 && (
                            <ul className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3'>
                                {data.badges.map((badge, index) => (
                                    <li key={index} className='flex items-center gap-2'>
                                        <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-shopifyCheckout-accent'>
                                            <MdCheck size={14} aria-hidden />
                                        </span>
                                        <span className='text-sm text-shopifyCheckout-body'>{badge}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className='flex flex-1 items-center justify-center'>
                        <div
                            className='min-h-[20rem] w-full rounded-2xl bg-shopifyCheckout-placeholder lg:min-h-[28rem] lg:translate-y-1'
                            aria-hidden
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
