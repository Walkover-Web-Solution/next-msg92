import GetSubscriptions from '@/utils/getSubscription';
import { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';

export default function PricingHello({ data }) {
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState();
    const [tabtype, setTabtype] = useState('Monthly');
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState('₹');

    const fetchPlans = useCallback(async () => {
        setIsLoading(true);
        const response = await GetSubscriptions(currency, 7);
        if (response) {
            setPlans(response);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);

    return (
        <>
            <div className='flex flex-col w-full gap-8'>
                <div role='tablist' className='tabs tabs-boxed p-0 w-fit'>
                    <span
                        role='tab'
                        className={`tab ${tabtype === 'Monthly' && 'tab-active'}`}
                        onClick={() => {
                            setTabtype('Monthly');
                        }}
                    >
                        Monthly
                    </span>
                    <span
                        role='tab'
                        className={`tab ${tabtype === 'Yearly' && 'tab-active'}`}
                        onClick={() => {
                            setTabtype('Yearly');
                        }}
                    >
                        Yearly (20% off)
                    </span>
                </div>
                <div className='grid grid-cols-3 w-full gap-8 '>
                    {plans &&
                        plans.length > 0 &&
                        plans.map(
                            (plan) =>
                                plan?.plan_amounts?.length > 0 &&
                                plan?.plan_amounts.map((amount, index) => {
                                    if (
                                        amount?.currency?.short_name === currency &&
                                        amount?.plan_type?.name === tabtype
                                    )
                                        return (
                                            <div
                                                key={plan?.name + index}
                                                className={`flex flex-col gap-6 col-span-1 p-6  rounded bg-white ${
                                                    plan?.name === 'Basic' ? 'border-4 border-black' : 'border'
                                                }`}
                                            >
                                                <div className='flex flex-col gap-4'>
                                                    <div className='flex items-center justify-between'>
                                                        <h2 className=' text-2xl font-semibold'>{plan?.name}</h2>
                                                        {plan?.name === 'Basic' && (
                                                            <span className='bg-black text-white px-2 rounded-badge'>
                                                                Popular
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className=' text-2xl font-semibold text-green-600 capitalize'>
                                                        {amount?.currency?.symbol}
                                                        {amount?.plan_amount} {tabtype}
                                                    </p>
                                                    <p>{amount?.currency?.short_name === 'INR' ? '+18% GST' : '-'}</p>
                                                    <button
                                                        className={`btn btn-primary  btn-md ${
                                                            plan?.name === 'Basic' ? '' : 'btn-outline'
                                                        }`}
                                                    >
                                                        Get Started
                                                    </button>
                                                </div>
                                                <span className='border-b-[1px]'></span>

                                                {/* included */}
                                                <div className='flex flex-col gap-2'>
                                                    <h3 className='text-lg font-semibold'>Included</h3>
                                                    <div className='flex flex-col gap-1'>
                                                        {plan?.plan_services?.map((service, index) =>
                                                            service?.service_credit?.service_credit_rates?.map(
                                                                (rate, i) =>
                                                                    rate?.currency?.short_name === currency && (
                                                                        <p key={i}>
                                                                            {rate?.free_credits}{' '}
                                                                            {service?.service_credit?.service?.name}
                                                                            /month
                                                                        </p>
                                                                    )
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                {/* features */}
                                                <div className='flex flex-col gap-2'>
                                                    <h3 className='text-lg font-semibold'>Features</h3>
                                                    <div className='flex flex-col gap-1'>
                                                        {plan?.plan_features?.length > 0 &&
                                                            plan?.plan_features.map((feature, index) => {
                                                                if (
                                                                    feature?.is_visible ||
                                                                    !feature?.feature?.is_included
                                                                ) {
                                                                    return (
                                                                        <p
                                                                            className='flex items-center gap-1'
                                                                            key={index}
                                                                        >
                                                                            {feature?.is_visible &&
                                                                            feature?.feature?.is_included ? (
                                                                                <MdCheck
                                                                                    fontSize={18}
                                                                                    color='#16A34A'
                                                                                />
                                                                            ) : (
                                                                                <MdClose
                                                                                    fontSize={18}
                                                                                    color='#DC3645'
                                                                                />
                                                                            )}

                                                                            {feature?.feature?.name}
                                                                        </p>
                                                                    );
                                                                }
                                                            })}
                                                    </div>
                                                </div>

                                                {/* Extras */}
                                                <div className='flex flex-col gap-2'>
                                                    <h3 className='text-lg font-semibold'>Extra @</h3>
                                                    <div className='flex flex-col gap-1'>
                                                        {plan?.plan_services?.length > 0 &&
                                                            plan?.plan_services.map((service, index) => (
                                                                <div key={index}>
                                                                    {service?.service_credit?.service_credit_rates
                                                                        ?.length > 0 &&
                                                                        service?.service_credit?.service_credit_rates.map(
                                                                            (rate, i) =>
                                                                                rate?.currency?.short_name ===
                                                                                    currency && (
                                                                                    <p
                                                                                        className='flex items-center gap-1'
                                                                                        key={i}
                                                                                    >
                                                                                        {plan?.postpaid_allowed ? (
                                                                                            <>
                                                                                                <MdCheck
                                                                                                    fontSize={18}
                                                                                                    color='#16A34A'
                                                                                                />
                                                                                                {symbol}
                                                                                                {rate?.follow_up_rate}/
                                                                                                {
                                                                                                    service
                                                                                                        ?.service_credit
                                                                                                        ?.service?.name
                                                                                                }
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <MdClose
                                                                                                    fontSize={18}
                                                                                                    color='#DC3645'
                                                                                                />
                                                                                                {'No Extra '}
                                                                                            </>
                                                                                        )}
                                                                                        {service?.service_credit
                                                                                            ?.service?.is_rental
                                                                                            ? '/month'
                                                                                            : ''}
                                                                                    </p>
                                                                                )
                                                                        )}
                                                                </div>
                                                            ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                })
                        )}

                    {isLoading &&
                        [...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className='flex col-span-1 flex-col gap-6  h-[800px] p-6 border rounded bg-white'
                            >
                                <div className='flex flex-col gap-4'>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[40px] w-full'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[30px] w-2/3'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-1/3'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[40px] w-1/2'></div>
                                    <span className='border-b-[1px]'></span>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-2/3'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-1/3'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-1/3'></div>
                                </div>
                                <div className='flex flex-col gap-4 mt-4'>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-2/3'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-1/3'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-1/3'></div>
                                </div>
                                <div className='flex flex-col gap-4 mt-4'>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-2/3'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-1/3'></div>
                                    <div className='bg-slate-50 rounded-sm skeleton h-[20px] w-1/3'></div>
                                </div>
                            </div>
                        ))}
                </div>

                <ConnectWithTeam product={'hello'} data={data?.connectComp} isPlan={true} />
                <FaqsComp data={data?.faqComp} notCont={true} />
            </div>
        </>
    );
}
