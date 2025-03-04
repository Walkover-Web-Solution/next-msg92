import getSubscriptions from '@/utils/getSubscription';
import { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import Link from 'next/link';
import getURL from '@/utils/getURL';
import CalculatePricingSegmento from './CalculatePricingSegmento/CalculatePricingSegmento';

export default function PricingSegmento({ data, country }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState();
    const [tabtype, setTabtype] = useState('Monthly');
    const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(true);
    const [hasyYarly, setHasYearly] = useState(false);

    const fetchPlans = useCallback(async () => {
        setIsLoading(true);
        const response = await getSubscriptions(currency, 2);
        if (response) {
            setPlans(response);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);

    const hasYearlyPlan = useCallback(() => {
        return plans?.some((plan) => plan.plan_amounts?.some((amount) => amount.plan_type?.name === 'Yearly'));
    }, [plans]);

    useEffect(() => {
        if (hasYearlyPlan()) {
            setHasYearly(true);
        }
    }, [hasYearlyPlan]);

    function handleOfferPrice(price) {
        let ammount;
        let percent;
        switch (price?.currency?.short_name) {
            case 'INR':
                if (price.plan_amount == 1000) {
                    percent = ((1500 - 1000) / 1500) * 100;
                    ammount = 1500;
                } else if (price.plan_amount == 2000) {
                    percent = ((3000 - 2000) / 3000) * 100;
                    ammount = 3000;
                }
                break;
            case 'USD':
                if (price.plan_amount == 28) {
                    percent = ((40 - 28) / 40) * 100;
                    ammount = 40;
                } else if (price.plan_amount == 56) {
                    percent = ((80 - 56) / 80) * 100;
                    ammount = 80;
                }
                break;
            case 'GBP':
                if (price.plan_amount == 24) {
                    percent = ((35 - 24) / 35) * 100;
                    ammount = 35;
                } else if (price.plan_amount == 45) {
                    percent = ((65 - 45) / 65) * 100;
                    ammount = 65;
                }
                break;
            default:
                break;
        }
        percent = Math.round(percent) === 31 ? 30 : Math.round(percent);
        if (ammount) {
            return (
                <div className='flex gap-2 items-center'>
                    <span className=' text-gray-400 text-lg'>
                        <span className=' line-through'>
                            {price?.currency?.symbol}
                            {ammount}
                        </span>
                    </span>
                    <span className='font-bold'>{percent}% Off</span>
                </div>
            );
        }
    }
    return (
        <>
            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold capitalize '>segmento Pricing</h1>
                <div className='flex flex-col w-full gap-8'>
                    {hasyYarly && (
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
                    )}

                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full gap-8 '>
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
                                                    className={`flex flex-col gap-4 col-span-1 p-6  rounded bg-white ${
                                                        plan?.name === 'Starter' ? 'border-4 border-black' : 'border'
                                                    }`}
                                                >
                                                    <div className='flex flex-col gap-2'>
                                                        <div className='flex items-center justify-between'>
                                                            <h2 className=' text-2xl font-semibold'>{plan?.name}</h2>
                                                            {plan?.name === 'Starter' && (
                                                                <span className='bg-black text-white px-2 rounded-badge'>
                                                                    Popular
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className='gap-1 flex flex-col'>
                                                            <p className=' text-2xl font-semibold text-green-600 capitalize'>
                                                                {amount?.currency?.symbol}
                                                                {amount?.plan_amount} {tabtype}
                                                            </p>
                                                            <p className='text-sm'>
                                                                {amount?.currency?.short_name === 'INR' &&
                                                                plan?.name != 'Free'
                                                                    ? '+18% GST'
                                                                    : amount?.currency?.short_name === 'GBP' &&
                                                                        plan?.name != 'Free'
                                                                      ? '+ VAT'
                                                                      : '-'}
                                                            </p>
                                                            {/* <div>{handleOfferPrice(amount) || '-'}</div> */}
                                                        </div>

                                                        <Link href={getURL('signup', 'segmento')} target='_blank'>
                                                            <button
                                                                className={`btn btn-primary  btn-sm ${
                                                                    plan?.name === 'Starter' ? '' : 'btn-outline'
                                                                }`}
                                                            >
                                                                Get Started
                                                            </button>
                                                        </Link>
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
                                                                                {`${
                                                                                    rate?.free_credits === -1
                                                                                        ? 'Unlimited'
                                                                                        : rate?.free_credits
                                                                                } ${
                                                                                    service?.service_credit?.service
                                                                                        ?.name
                                                                                }${
                                                                                    rate?.free_credits === -1
                                                                                        ? ''
                                                                                        : '/month'
                                                                                }`}
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
                                                                                                    {`${symbol} ${rate?.follow_up_rate}/${rate?.chunk_size} ${service?.service_credit?.service?.name}`}
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    <MdClose
                                                                                                        fontSize={18}
                                                                                                        color='#DC3645'
                                                                                                    />
                                                                                                    {`No Extra ${service?.service_credit?.service?.name}`}
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
                                                    {/* {plan?.name !== 'Free' && (
                                                        <button
                                                            className=' btn btn-accent btn-outline btn-md '
                                                            onClick={() => setIsCalculationModalOpen(true)}
                                                        >
                                                            Calculate
                                                        </button>
                                                    )} */}
                                                </div>
                                            );
                                    })
                            )}

                        {isLoading &&
                            [...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className='flex col-span-1  flex-col gap-6  h-[800px] p-6 border rounded bg-white'
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

                    <ConnectWithTeam product={'Segmento'} href={'segmento'} data={data?.connectComp} isPlan={true} />
                    <FaqsComp data={data?.faqComp} notCont={true} />
                </div>
            </div>

            {/* // calculate segmento pricing */}
            {/* {plans && isCalculationModalOpen && (
                <dialog id='calculate_segmento_pricing' className='modal' open>
                    <CalculatePricingSegmento />
                </dialog>
            )} */}
        </>
    );
}
