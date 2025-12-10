import { MdCheck, MdClose } from 'react-icons/md';
import getURL from '@/utils/getURL';
import CalculateEmailPricing from './calculateEmailPricing/calculateEmailPricing';

export default function PricingEmail({ pricingData, symbol, currency, tabtype }) {
    return (
        <>
            <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6'>
                {pricingData?.length > 0 &&
                    pricingData?.map((plan, index) => {
                        return (
                            <div
                                key={index}
                                className={`${
                                    plan?.amount?.plan_type === tabtype ? 'flex' : 'hidden'
                                } flex gap-4 p-6 rounded bg-white col-span-1 lg:max-w-full max-w-[350px] ${
                                    plan?.name === 'Basic' ? 'border-2 border-black' : 'border'
                                }  ${
                                    plan.name === 'Free'
                                        ? ' xl:col-span-3 xl:flex-row flex flex-col '
                                        : ' flex flex-col '
                                }`}
                            >
                                <div className='flex flex-col gap-2 w-full'>
                                    <div className='flex items-center justify-between'>
                                        <h2 className=' text-xl font-semibold'>{plan?.name}</h2>
                                        {plan?.name === 'Basic' && (
                                            <span className='bg-black text-white px-3 rounded-badge text-sm'>
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <p className=' text-xl font-semibold text-green-700 capitalize'>
                                        {`${symbol}${plan?.amount?.plan_amount} ${tabtype}`}
                                    </p>
                                </div>
                                <span
                                    className={`border-b-[1px] w-full ${
                                        plan.name === 'Free' ? ' block xl:hidden ' : ' block '
                                    }`}
                                ></span>
                                {plan.name !== 'Free' && (
                                    <a
                                        href={getURL('signup', 'email')}
                                        target='_blank'
                                        className={`btn btn-primary btn-sm w-fit ${
                                            plan?.name === 'Basic' ? '' : 'btn-outline'
                                        } `}
                                    >
                                        Get Started
                                    </a>
                                )}

                                {/* included */}
                                <div className='w-full flex flex-col gap-2'>
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

                                {/* Extras */}
                                <div className='w-full flex flex-col gap-1'>
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
                                                                        <p>{`${symbol}${rate}/${serviceName}/month`}</p>
                                                                    </span>
                                                                ) : (
                                                                    <span className='flex items-center gap-1 w-fit'>
                                                                        <MdClose fontSize={18} color='#DC3645' />
                                                                        <p>{`No Extra ${serviceName}`}</p>
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
                                <div className='w-full flex justify-end'>
                                    {plan.name === 'Free' && (
                                        <a
                                            href={getURL('signup', 'email')}
                                            target='_blank'
                                            className='btn btn-primary btn-sm w-fit btn-outline'
                                        >
                                            Get Started
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
            {pricingData?.length > 0 && (
                <dialog id='calculate_email_pricing' className='modal'>
                    <CalculateEmailPricing plans={pricingData} currency={currency} symbol={symbol} tabtype={tabtype} />
                </dialog>
            )}
        </>
    );
}
