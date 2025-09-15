import { MdCheck, MdClose } from 'react-icons/md';
import getURL from '@/utils/getURL';

export default function PricingHello({ pricingData, symbol, tabtype }) {
    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 w-full gap-2 '>
                {pricingData?.length > 0 &&
                    pricingData?.map((plan, index) => {
                        return (
                            <>
                                <div
                                    key={plan?.name + index}
                                    className={`flex flex-col gap-4 col-span-1 p-4  rounded bg-white relative ${
                                        plan?.name === 'Basic' ? 'border-2 border-black' : 'border'
                                    }`}
                                >
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center justify-between'>
                                            <h2 className=' text-xl font-semibold'>{plan?.name}</h2>
                                            {plan?.name === 'Basic' && (
                                                <span className='bg-black text-white px-3 rounded-badge text-sm'>
                                                    Popular
                                                </span>
                                            )}
                                        </div>
                                        <div className='gap-1 flex flex-col'>
                                            <p className=' text-xl font-semibold text-green-600 capitalize'>
                                                {symbol}
                                                {plan?.amount[0]?.plan_amount} {tabtype}
                                            </p>
                                        </div>

                                        <a className='w-fit' href={getURL('signup', 'hello')} target='_blank'>
                                            <button
                                                className={`btn btn-primary  btn-sm ${
                                                    plan?.name === 'Basic' ? '' : 'btn-outline'
                                                }`}
                                            >
                                                Get Started
                                            </button>
                                        </a>
                                    </div>
                                    <span className='border-b-[1px]'></span>

                                    {/* included */}
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='font-semibold'>Included</h3>
                                        <div className='flex flex-col gap-1 text-sm'>
                                            {plan?.included?.map((service, index) => (
                                                <p key={index}>
                                                    {`${service?.amount === -1 ? 'Unlimited' : service?.amount} ${
                                                        service.service_name
                                                    }${service?.amount === -1 ? '' : '/month'}`}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* features */}
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='font-semibold'>Features</h3>
                                        <div className='flex flex-col gap-1'>
                                            {plan?.features?.length > 0 &&
                                                plan?.features.map((feature, index) => {
                                                    return (
                                                        <p className='flex items-center gap-1 text-sm' key={index}>
                                                            {feature?.is_included ? (
                                                                <MdCheck fontSize={18} color='#16A34A' />
                                                            ) : (
                                                                <MdClose fontSize={18} color='#DC3645' />
                                                            )}{' '}
                                                            {feature?.name}
                                                        </p>
                                                    );
                                                })}
                                        </div>
                                    </div>

                                    {/* Extras */}
                                    <div className='flex flex-col gap-1'>
                                        {plan?.extras?.servicesList?.length > 0 && plan?.extras?.showExtra && (
                                            <div className='flex flex-col gap-2'>
                                                <h3 className='font-semibold'>Extra @</h3>
                                                <div className='flex flex-col gap-1'>
                                                    {plan?.extras?.servicesList.map((service, index) => {
                                                        const rate = service?.follow_up_rate;
                                                        const serviceName = service?.servicename;
                                                        if (
                                                            service?.free_credits === -1 ||
                                                            service?.free_credits === '-1'
                                                        ) {
                                                            return null;
                                                        } else {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className='flex items-center gap-1 text-sm'
                                                                >
                                                                    {rate && plan?.extras?.postpaidAllowed ? (
                                                                        <span className='flex items-center gap-1 w-fit'>
                                                                            <MdCheck fontSize={18} color='#16A34A' />
                                                                            {`${symbol}${rate}/${serviceName}/month`}
                                                                        </span>
                                                                    ) : (
                                                                        <span className='flex items-center gap-1 w-fit'>
                                                                            <MdClose fontSize={18} color='#DC3645' />
                                                                            {`No Extra ${serviceName}`}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* {plan?.extras?.postpaidAllowed && plan?.extras?.showExtra && (
                                                <CalculateHelloPricing
                                                    plan={plan}
                                                    currency={currency}
                                                    symbol={symbol}
                                                    tabtype={tabtype}
                                                />
                                            )} */}
                                </div>
                            </>
                        );
                    })}
            </div>
        </>
    );
}
