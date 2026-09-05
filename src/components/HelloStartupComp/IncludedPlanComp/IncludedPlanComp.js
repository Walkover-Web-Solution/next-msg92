export default function IncludedPlanComp({ data }) {
    if (!data?.heading) return null;

    const feeBadgeText = data?.fee_badge || data?.action_badge;

    return (
        <section id='plan' className='bg-sky-50 border-b border-sky-100'>
            <div className='container cont_p flex flex-col gap-8'>
                <header className='text-center max-w-4xl mx-auto'>
                    <h2 className='heading font-semibold'>{data?.heading}</h2>
                    {data?.subheading && (
                        <p className='my-3 max-w-2xl text-base md:text-lg text-gray-600'>{data?.subheading}</p>
                    )}
                </header>

                <div className='bg-white border border-sky-100 rounded-xl overflow-hidden max-w-5xl mx-auto'>
                    <div className='p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100'>
                        <div>
                            {data?.plan_badge && (
                                <div className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5'>
                                    {data.plan_badge}
                                </div>
                            )}
                            <div className='text-4xl sm:text-5xl font-extrabold text-gray-900 flex items-baseline'>
                                <span>{data?.price}</span>
                                {data?.period && (
                                    <span className='text-xs sm:text-sm font-normal text-gray-500 ml-1.5'>
                                        {data.period}
                                    </span>
                                )}
                            </div>
                        </div>

                        {feeBadgeText && (
                            <div className='text-accent bg-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider w-fit'>
                                {feeBadgeText}
                            </div>
                        )}
                    </div>

                    {data?.stats?.length > 0 && (
                        <div className='grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-sky-100'>
                            {data?.stats?.map((stat, index) => (
                                <div key={index} className='p-6 sm:p-8 flex flex-col'>
                                    <b className='text-2xl sm:text-3xl font-extrabold text-accent mb-1.5 block'>
                                        {stat?.value}
                                    </b>
                                    <span className='text-xs sm:text-sm text-gray-600 whitespace-pre-line'>
                                        {stat?.sublabel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='m-6 sm:m-8 p-4 rounded-xl bg-sky-50 border border-sky-100 text-xs sm:text-sm text-gray-600 flex items-center gap-2'>
                        <span className='font-bold text-sm'>✓</span>
                        {data?.notice ? (
                            <div dangerouslySetInnerHTML={{ __html: data.notice }} />
                        ) : (
                            <div>
                                <strong className='font-bold text-gray-900'>Grow beyond a limit?</strong> Your account
                                and data stay intact — you simply move to a paid Hello plan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
