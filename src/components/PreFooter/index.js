import getURL from '@/utils/getURL';
import { SalesModal } from '../1UIComponents/Modals';

export default function PreFooter({ data, pageInfo }) {
    return (
        <>
            <div className='bg-neutral py-10'>
                <div className='container flex flex-col lg:flex-row md:justify-between items-center gap-6'>
                    <h2 className='text-3xl font-bold lg:w-1/2'>
                        {data?.content || 'Start building your ideal customer engagement experience'}
                    </h2>
                    <div className='flex gap-4 flex-wrap items-center  '>
                        {data?.buttons?.contactSales?.link && (
                            <a href={data?.buttons?.contactSales?.link}>
                                <button className='btn btn-primary btn-outline btn-md'>
                                    {data?.buttons?.contactSales?.text}
                                </button>
                            </a>
                        )}
                        {data?.buttons?.salesModal?.text && (
                            <SalesModal url={data?.buttons?.salesModal?.link} salesButtonText={data?.buttons?.salesModal?.text}/>
                        )}

                        {/* {data?.buttons?.pricing?.text && (
                            <a href={getPricingURL(pageInfo)}>
                                <button className='btn btn-primary btn-outline btn-md '>
                                    {data?.buttons?.pricing?.text}
                                </button>
                            </a>
                        )} */}
                        {data?.buttons?.getStarted?.text && (
                            <a
                                target='_blank'
                                href={getURL('signup', pageInfo?.page !== 'home' ? pageInfo?.page : 'hello')}
                            >
                                <button className='btn btn-primary btn-md w-full'>
                                    {data?.buttons?.getStarted?.text}
                                </button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
       
        </>
    );
}
