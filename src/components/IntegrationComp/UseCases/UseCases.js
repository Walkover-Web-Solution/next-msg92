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
                        <article key={index} className='solutions-grid_card cont gap-3 rounded-md border p-6'>
                            <div className='flex items-start justify-start'>
                                {item.icon?.startsWith('/') ? (
                                    <Image
                                        src={item.icon}
                                        alt={item.title ? `${item.title} icon` : ''}
                                        width={40}
                                        height={40}
                                        className='object-contain object-left'
                                    />
                                ) : (
                                    <span className='text-2xl' role='img'>
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
