import getPricingURL from '@/utils/getPricingURL';
import getURL from '@/utils/getURL';

export default function PreFooterComp({ data, pageInfo }) {
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
                        {data?.buttons?.pricing?.text && (
                            <a href={getPricingURL(pageInfo)}>
                                <button className='btn btn-primary btn-outline btn-md '>
                                    {data?.buttons?.pricing?.text}
                                </button>
                            </a>
                        )}
                        <a
                            target='_blank'
                            href={getURL('signup', pageInfo?.page !== 'home' ? pageInfo?.page : 'hello')}
                        >
                            <button className='btn btn-primary btn-md w-full'>{data?.buttons?.getStarted?.text}</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
