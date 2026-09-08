import GetMdIcons from '@/utils/getMdIcons';

export default function CategoriesComp({ data }) {
    if (!data?.categories?.length) return null;

    return (
        <section className='bg-neutral'>
            <div className='container cont cont_p cont_gap'>
                <div className='cont cont_w gap-3'>
                    {data?.tagline && (
                        <span className='text-xs sm:text-sm font-semibold text-report-primary-dark'>
                            {data.tagline}
                        </span>
                    )}
                    {data?.heading && <h2 className='heading'>{data.heading}</h2>}
                    {data?.subheading && <p>{data.subheading}</p>}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2'>
                    {data.categories.map((category, index) => {
                        const IconComponent = GetMdIcons(category?.icon);

                        return (
                            <div
                                key={index}
                                className='bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-report-primary/40'
                            >
                                <div>
                                    {IconComponent && (
                                        <div className='w-12 h-12 rounded-xl bg-report-primary-light border border-report-primary/30 text-report-primary-dark flex items-center justify-center text-2xl mb-5 shadow-sm'>
                                            <IconComponent aria-hidden />
                                        </div>
                                    )}

                                    {category?.title && (
                                        <h3 className='text-lg font-bold text-slate-900 mb-2'>{category.title}</h3>
                                    )}

                                    {category?.description && (
                                        <p className='text-sm text-slate-600'>{category.description}</p>
                                    )}
                                </div>

                                {category?.highlights?.length > 0 && (
                                    <div className='pt-6 mt-6 border-t border-slate-100 flex flex-wrap gap-1.5'>
                                        {category.highlights.map((highlight, highlightIndex) => (
                                            <span
                                                key={highlightIndex}
                                                className='inline-flex items-center px-2.5 py-1 rounded-xl bg-report-primary-light text-report-primary-dark text-xs font-medium border border-report-primary/20'
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
