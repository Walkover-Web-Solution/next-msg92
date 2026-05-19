import Image from 'next/image';

export default function UseCases({ data }) {
    if (!data?.items?.length) return null;

    return (
        <section className={`solutions-grid solutions-grid--${data.theme} w-full`}>
            <div className='container cont cont_p flex flex-col items-center gap-10'>
                {(data.heading_segments?.length > 0 || data.heading) && (
                    <div className='cont cont_gap items-center text-center'>
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
                        {data.subheading && <p className='solutions-grid_intro subheading'>{data.subheading}</p>}
                    </div>
                )}

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
                    {data.items.map((item, index) => (
                        <article
                            key={index}
                            className='solutions-grid_card cont gap-3 rounded-md border border-slate-200 bg-slate-50 p-6'
                        >
                            <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-50 p-2 shadow-sm ring-1 ring-indigo-100'>
                                {item.icon?.startsWith('/') ? (
                                    <Image
                                        src={item.icon}
                                        alt={item.title ? `${item.title} icon` : ''}
                                        width={56}
                                        height={56}
                                        className='h-12 w-12 object-contain'
                                    />
                                ) : (
                                    <span className='text-3xl leading-none md:text-4xl' role='img'>
                                        {item.icon}
                                    </span>
                                )}
                            </div>
                            <h3 className='solutions-grid_card-title text-lg font-bold'>{item.title}</h3>
                            <p className='solutions-grid_card-body text-base'>{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
