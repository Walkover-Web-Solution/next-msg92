export default function EligibilityComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section id='eligibility' className='bg-sky-50 border-t border-sky-100 scroll-mt-10'>
            <div className='container cont_p'>
                <div className='max-w-5xl mx-auto flex flex-col gap-8'>
                    <header className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
                        <div>
                            {data?.kicker && <p className='py-2 text-xs font-semibold text-accent'>{data.kicker}</p>}
                            <h2 className='heading font-semibold whitespace-pre-line'>{data.heading}</h2>
                        </div>
                        {data?.description && (
                            <p className='max-w-md text-base text-gray-600 md:text-right'>{data.description}</p>
                        )}
                    </header>

                    {data?.cards?.length > 0 && (
                        <div className='bg-white border border-sky-100 rounded-2xl overflow-hidden'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-sky-100'>
                                {data.cards.map((card, index) => (
                                    <article key={index} className='p-6 sm:p-7 flex flex-col'>
                                        {card?.number && (
                                            <span className='text-xs font-bold text-accent mb-12 block'>
                                                {card.number}
                                            </span>
                                        )}
                                        <h3 className='text-base font-bold mb-2'>{card?.title}</h3>
                                        <p className='text-xs sm:text-sm text-gray-600'>{card?.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
