export default function PreFooterComp({ data }) {
    return (
        <>
            <div className='bg-neutral py-10'>
                <div className='container flex flex-col lg:flex-row md:justify-between items-center gap-6'>
                    <h2 className='text-3xl font-bold lg:w-1/2'>
                        {data?.content || 'Start building your ideal customer engagement experience'}
                    </h2>
                    <div className='flex gap-4 flex-wrap items-center  '>
                        <button className='btn btn-primary btn-outline btn-md'>
                            {data?.buttons?.contactSales?.text}
                        </button>
                        <button className='btn btn-primary btn-outline btn-md '>{data?.buttons?.pricing?.text}</button>
                        <button className='btn btn-primary btn-md w-full'>{data?.buttons?.getStarted?.text}</button>
                    </div>
                </div>
            </div>
        </>
    );
}
