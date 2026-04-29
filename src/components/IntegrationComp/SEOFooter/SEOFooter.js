import { useId, useState } from 'react';

export default function SEOFooter({ data }) {
    const [expanded, setExpanded] = useState(false);
    const panelId = useId();
    const moreParagraphs = Array.isArray(data?.more_paragraphs) ? data.more_paragraphs : [];

    return (
        <section className={`seo-footer seo-footer--${data.theme} w-full`} aria-label={data?.heading || undefined}>
            <div className='container cont cont_p'>
                <div className='mx-auto max-w-4xl py-12 md:py-16'>
                    {data?.heading && (
                        <h2 className='seo-footer_heading mb-6 text-left text-2xl font-bold md:text-[1.75rem]'>
                            {data.heading}
                        </h2>
                    )}
                    {data?.intro && (
                        <p className='seo-footer_body mb-6 text-justify text-base leading-relaxed'>{data.intro}</p>
                    )}

                    {moreParagraphs.length > 0 && (
                        <>
                            {!expanded && (
                                <button
                                    type='button'
                                    className='seo-footer_toggle text-left text-base font-semibold underline underline-offset-2 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-shopifyBanner-visual focus-visible:ring-offset-2'
                                    aria-expanded={expanded}
                                    aria-controls={panelId}
                                    onClick={() => setExpanded(true)}
                                >
                                    {data?.read_more_label || 'Read more'}
                                </button>
                            )}

                            <div id={panelId} hidden={!expanded} className='seo-footer_more mt-6 space-y-6'>
                                {moreParagraphs.map((text, index) => (
                                    <p key={index} className='seo-footer_body text-justify text-base leading-relaxed'>
                                        {text}
                                    </p>
                                ))}
                            </div>

                            {expanded && (
                                <button
                                    type='button'
                                    className='seo-footer_toggle mt-8 text-left text-base font-semibold underline underline-offset-2 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-shopifyBanner-visual focus-visible:ring-offset-2'
                                    aria-expanded={expanded}
                                    aria-controls={panelId}
                                    onClick={() => setExpanded(false)}
                                >
                                    {data?.read_less_label || 'Read less'}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
