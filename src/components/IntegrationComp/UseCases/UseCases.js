import Image from 'next/image';

export default function UseCases({ data }) {
    if (!data?.items?.length) return null;

    const renderIcon = (item) => {
        const src = item.icon_src || (typeof item.icon === 'string' && item.icon.startsWith('/') ? item.icon : null);
        if (src) {
            const w = item.icon_width || 40;
            const h = item.icon_height || 40;
            return (
                <Image
                    src={src}
                    alt={item.title ? `${item.title} icon` : ''}
                    width={w}
                    height={h}
                    className='h-10 w-10 object-contain object-left'
                />
            );
        }
        if (item.icon) {
            return (
                <span className='text-2xl leading-none' role='img'>
                    {item.icon}
                </span>
            );
        }
        return <span className='block h-10 w-10 shrink-0 rounded bg-gray-100' aria-hidden />;
    };

    return (
        <section className={`solutions-grid solutions-grid--${data.theme} w-full bg-white`}>
            <div className='container cont cont_p flex flex-col items-center gap-10 md:gap-12'>
                {(data.heading_segments?.length > 0 || data.heading) && (
                    <div className='cont cont_gap max-w-3xl items-center text-center'>
                        {data.heading_segments?.length > 0 ? (
                            <h2 className='heading'>
                                {data.heading_segments.map((part, index) => (
                                    <span
                                        key={index}
                                        className={
                                            part?.accent ? 'solutions-grid_heading-accent' : 'solutions-grid_heading'
                                        }
                                    >
                                        {part?.text}
                                    </span>
                                ))}
                            </h2>
                        ) : (
                            <h2 className='heading solutions-grid_heading'>{data.heading}</h2>
                        )}
                        {data.subheading && (
                            <p className='solutions-grid_intro text-base leading-relaxed md:text-lg'>
                                {data.subheading}
                            </p>
                        )}
                    </div>
                )}

                <div className='grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
                    {data.items.map((item, index) => (
                        <article
                            key={index}
                            className='solutions-grid_card cont gap-3 rounded-xl border border-gray-200 bg-white p-6 text-left'
                        >
                            <div className='flex items-start justify-start'>{renderIcon(item)}</div>
                            <h3 className='solutions-grid_card-title text-lg font-bold md:text-xl'>{item.title}</h3>
                            <p className='solutions-grid_card-body text-sm leading-relaxed md:text-base'>
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
