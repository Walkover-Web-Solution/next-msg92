export default function PreFooterComp({ data }) {
    return (
        <>
            <div className='bg-neutral py-10'>
                <div className='container flex flex-col lg:flex-row justify-between gap-6'>
                    <h2 className='text-3xl font-bold lg:w-1/2'>
                        {data?.content || 'Start building your ideal customer engagement experience'}
                    </h2>
                    <div className='grid sm:grid-cols-3 grid-cols-2 gap-3 '>
                        <button className='btn btn-primary btn-outline sm:btn-md'>
                            {data?.buttons?.contactSales?.text}
                        </button>
                        <button className='btn btn-primary btn-outline sm:btn-md '>
                            {data?.buttons?.pricing?.text}
                        </button>
                        <button className='btn btn-primary sm:btn-md sm:col-span-1 col-span-2'>
                            {data?.buttons?.getStarted?.text}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
