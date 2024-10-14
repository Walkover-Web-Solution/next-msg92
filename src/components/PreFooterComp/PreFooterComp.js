export default function PreFooterComp({ data }) {
    return (
        <>
            <div className='bg-neutral py-10'>
                <div className='container flex flex-col lg:flex-row md:justify-between items-center gap-6'>
                    <h2 className='text-3xl font-bold lg:w-1/2'>
                        {data?.content || 'Start building your ideal customer engagement experience'}
                    </h2>
                    <div className='flex gap-4 flex-wrap items-center  '>
                        <a href={data?.buttons?.contactSales?.link}>
                            <button className='btn btn-primary btn-outline btn-md'>
                                {data?.buttons?.contactSales?.text}
                            </button>
                        </a>
                        <a href={data?.buttons?.pricing?.link}>
                            <button className='btn btn-primary btn-outline btn-md '>
                                {data?.buttons?.pricing?.text}
                            </button>
                        </a>
                        <a href={data?.buttons?.getStarted?.link}>
                            <button className='btn btn-primary btn-md w-full'>{data?.buttons?.getStarted?.text}</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
