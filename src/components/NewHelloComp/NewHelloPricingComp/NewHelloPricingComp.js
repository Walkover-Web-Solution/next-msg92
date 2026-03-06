import getSubscriptions from '@/utils/pricing/getSubscription';
import { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import Link from 'next/link';
import getURL from '@/utils/getURL';
import style from './NewHelloPricingComp.module.scss';

export default function PricingHello({ country, pageInfo }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState();
    const [tabtype, setTabtype] = useState('Monthly');

    const fetchPlans = useCallback(async () => {
        setIsLoading(true);
        const response = await getSubscriptions(currency, 7);
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
            <div className='bg-[#26D9D0] py-24'>
                <div className='container'>
                    <div className='flex flex-col w-full gap-12'>
                        <div className={style.heading}>
                            A plan for every business and budget,
                            <br />
                            Find yours today!
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full gap-24 '>
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
                                                        className={`flex flex-col gap-6 col-span-1 p-8  bg-white ${style.shadow_black}`}
                                                    >
                                                        <div className='flex flex-col items-center gap-4'>
                                                            <h2 className=' text-2xl font-semibold'>{plan?.name}</h2>

                                                            <p className=' text-2xl font-semibold text-green-600 capitalize'>
                                                                {amount?.currency?.symbol}
                                                                {amount?.plan_amount} {tabtype}
                                                            </p>
                                                            <a
                                                                className='w-full'
                                                                href={getURL('signup', 'hello', pageInfo)}
                                                                target='_blank'
                                                            >
                                                                <button
                                                                    className={`btn rounded-none btn-primary btn-outline w-full ${style.get_started}`}
                                                                >
                                                                    Get Started
                                                                </button>
                                                            </a>
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
                                                                                    {
                                                                                        service?.service_credit?.service
                                                                                            ?.name
                                                                                    }
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
                                                                            {service?.service_credit
                                                                                ?.service_credit_rates?.length > 0 &&
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
                                                                                                            fontSize={
                                                                                                                18
                                                                                                            }
                                                                                                            color='#16A34A'
                                                                                                        />
                                                                                                        {symbol}
                                                                                                        {
                                                                                                            rate?.follow_up_rate
                                                                                                        }
                                                                                                        /
                                                                                                        {
                                                                                                            service
                                                                                                                ?.service_credit
                                                                                                                ?.service
                                                                                                                ?.name
                                                                                                        }
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <>
                                                                                                        <MdClose
                                                                                                            fontSize={
                                                                                                                18
                                                                                                            }
                                                                                                            color='#DC3645'
                                                                                                        />
                                                                                                        {'No Extra  '}{' '}
                                                                                                        {
                                                                                                            service
                                                                                                                ?.service_credit
                                                                                                                ?.service
                                                                                                                ?.name
                                                                                                        }
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
                                        className='flex col-span-1 flex flex-col gap-6  h-[800px] p-6 border rounded bg-white'
                                    >
                                        <div className='flex flex-col gap-4'>
                                            <div className=' skeleton h-[40px] w-full'></div>
                                            <div className=' skeleton h-[30px] w-2/3'></div>
                                            <div className=' skeleton h-[20px] w-1/3'></div>
                                            <div className=' skeleton h-[40px] w-1/2'></div>
                                            <span className='border-b-[1px]'></span>
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            <div className=' skeleton h-[20px] w-2/3'></div>
                                            <div className=' skeleton h-[20px] w-1/3'></div>
                                            <div className=' skeleton h-[20px] w-1/3'></div>
                                        </div>
                                        <div className='flex flex-col gap-4 mt-4'>
                                            <div className=' skeleton h-[20px] w-2/3'></div>
                                            <div className=' skeleton h-[20px] w-1/3'></div>
                                            <div className=' skeleton h-[20px] w-1/3'></div>
                                        </div>
                                        <div className='flex flex-col gap-4 mt-4'>
                                            <div className=' skeleton h-[20px] w-2/3'></div>
                                            <div className=' skeleton h-[20px] w-1/3'></div>
                                            <div className=' skeleton h-[20px] w-1/3'></div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div
                            className={`flex p-8 justify-between flex-col md:flex-row gap-4 items-center bg-white ${style.shadow_black}`}
                        >
                            <p className='text-xl font-medium'>For a personalised plan to meet your custom need.</p>
                            <a className='w-full sm:w-fit' href={getURL('contact-us', 'hello')} target='_blank'>
                                <button
                                    className={`btn rounded-none btn-primary w-full btn-outline uppercase ${style.get_started}`}
                                >
                                    Contact Us
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
