export default function IncludedPlanComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section id='plan' className='bg-sky-50 border-b border-sky-100'>
            <div className='container cont_p flex flex-col gap-8'>
                <header className='text-center max-w-4xl mx-auto'>
                    <h2 className='heading font-semibold'>{data?.heading}</h2>
                    {data?.subheading && (
                        <p className='my-3 max-w-2xl text-base text-gray-600 mx-auto'>{data.subheading}</p>
                    )}
                </header>

                <div className='bg-white border border-sky-100 rounded-xl overflow-hidden max-w-6xl w-full mx-auto'>
                    <div className='p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100'>
                        <div>
                            {data?.plan_badge && (
                                <p className='text-xs font-bold text-gray-500 uppercase mb-1'>{data.plan_badge}</p>
                            )}
                            <div className='text-4xl sm:text-5xl font-extrabold flex items-baseline gap-2'>
                                <span>{data?.price}</span>
                                {data?.period && (
                                    <span className='text-sm font-normal text-gray-500'>{data.period}</span>
                                )}
                            </div>
                        </div>

                        {data?.fee_badge && (
                            <span className='text-accent bg-secondary px-4 py-2 rounded-full text-xs font-bold'>
                                {data.fee_badge}
                            </span>
                        )}
                    </div>

                    {data?.stats?.length > 0 && (
                        <div className='grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-sky-100'>
                            {data?.stats?.map((stat, index) => (
                                <div key={index} className='p-6 sm:p-8 flex flex-col gap-1'>
                                    <span className='text-2xl sm:text-3xl font-extrabold text-accent'>
                                        {stat?.value}
                                    </span>
                                    <span className='text-sm text-gray-600 whitespace-pre-line'>{stat?.sublabel}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {data?.notice && (
                        <div className='m-6 sm:m-8 p-4 rounded-xl bg-sky-50 border border-sky-100 text-sm text-gray-600 flex items-center gap-2'>
                            <span>✓</span>
                            <div dangerouslySetInnerHTML={{ __html: data.notice }} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
