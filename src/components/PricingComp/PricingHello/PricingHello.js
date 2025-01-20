import GetSubscriptions from '@/utils/getSubscription';
import { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import Link from 'next/link';
import getURL from '@/utils/getURL';
import style from './PricingHello.module.scss';

export default function PricingHello({ data, country }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState();
    const [tabtype, setTabtype] = useState('Monthly');
    const [plansObj, setPlansObj] = useState({});
    const [inboxes, setInboxes] = useState(0);
    const [tickets, setTickets] = useState(0);
    const [showCalculations, setShowCalculations] = useState(false);
    const [rawInboxes, setRawInboxes] = useState(0);
    const [rawTickets, setRawTickets] = useState(0);
    const [hasyYarly, setHasYearly] = useState(false);

    const fetchPlans = useCallback(async () => {
        setIsLoading(true);
        const response = await GetSubscriptions(currency, 7);
        if (response) {
            setPlans(response);
        }
        setIsLoading(false);
    }, []);
    const onCalculate = () => {
        if (rawInboxes > 0 || rawTickets > 0) {
            setShowCalculations(true);
            setTickets(rawTickets);
            setInboxes(rawInboxes);
        }
    };
    useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);
    const contvertToLocal = (number) => {
        if (currency === 'INR') {
            {
                return Number(number).toLocaleString('en-IN');
            }
        } else {
            {
                return Number(number).toLocaleString('en-US');
            }
        }
    };
    useEffect(() => {
        if (plans) {
            const plansObj = plans
                .filter((plan) => plan.name !== 'Free')
                .reduce((acc, plan) => {
                    const key = plan.name;
                    acc[key] = {
                        planAmount: plan.plan_amounts
                            .map((amount) =>
                                amount.currency.short_name === currency && amount.plan_type.name === tabtype
                                    ? amount
                                    : null
                            )
                            .filter((amount) => amount !== null)[0]?.plan_amount,

                        planServices: {
                            'Inbox': plan.plan_services
                                .map((service) =>
                                    service?.service_credit?.service_credit_rates?.find(
                                        (rate) => rate?.currency?.short_name === currency
                                    )
                                        ? service
                                        : null
                                )
                                ?.filter((service) => service?.service_credit?.service?.name === 'Inbox')[0]
                                ?.service_credit?.service_credit_rates?.filter(
                                    (service) => service?.currency?.short_name === currency
                                )[0],

                            'Tickets': plan.plan_services
                                .map((service) =>
                                    service?.service_credit?.service_credit_rates?.find(
                                        (rate) => rate?.currency?.short_name === currency
                                    )
                                        ? service
                                        : null
                                )
                                ?.filter((service) => service?.service_credit?.service?.name === 'Tickets')[0]
                                ?.service_credit?.service_credit_rates?.filter(
                                    (service) => service?.currency?.short_name === currency
                                )[0],
                        },

                        extra: {
                            'Inbox': Math.max(
                                0,
                                inboxes -
                                    plan.plan_services
                                        .map((service) =>
                                            service?.service_credit?.service_credit_rates?.find(
                                                (rate) => rate?.currency?.short_name === currency
                                            )
                                                ? service
                                                : null
                                        )
                                        ?.filter((service) => service?.service_credit?.service?.name === 'Inbox')[0]
                                        ?.service_credit?.service_credit_rates?.filter(
                                            (service) => service?.currency?.short_name === currency
                                        )[0].free_credits
                            ),

                            'Tickets': Math.max(
                                0,
                                tickets -
                                    plan.plan_services
                                        .map((service) =>
                                            service?.service_credit?.service_credit_rates?.find(
                                                (rate) => rate?.currency?.short_name === currency
                                            )
                                                ? service
                                                : null
                                        )
                                        ?.filter((service) => service?.service_credit?.service?.name === 'Tickets')[0]
                                        ?.service_credit?.service_credit_rates?.filter(
                                            (service) => service?.currency?.short_name === currency
                                        )[0].free_credits
                            ),
                        },

                        extraCharges: {
                            'Inbox':
                                Math.max(
                                    0,
                                    inboxes -
                                        plan.plan_services
                                            .map((service) =>
                                                service?.service_credit?.service_credit_rates?.find(
                                                    (rate) => rate?.currency?.short_name === currency
                                                )
                                                    ? service
                                                    : null
                                            )
                                            ?.filter((service) => service?.service_credit?.service?.name === 'Inbox')[0]
                                            ?.service_credit?.service_credit_rates?.filter(
                                                (service) => service?.currency?.short_name === currency
                                            )[0].free_credits
                                ) *
                                plan.plan_services
                                    .map((service) =>
                                        service?.service_credit?.service_credit_rates?.find(
                                            (rate) => rate?.currency?.short_name === currency
                                        )
                                            ? service
                                            : null
                                    )
                                    ?.filter((service) => service?.service_credit?.service?.name === 'Inbox')[0]
                                    ?.service_credit?.service_credit_rates?.filter(
                                        (service) => service?.currency?.short_name === currency
                                    )[0].follow_up_rate,

                            'Tickets':
                                Math.max(
                                    0,
                                    tickets -
                                        plan.plan_services
                                            .map((service) =>
                                                service?.service_credit?.service_credit_rates?.find(
                                                    (rate) => rate?.currency?.short_name === currency
                                                )
                                                    ? service
                                                    : null
                                            )
                                            ?.filter(
                                                (service) => service?.service_credit?.service?.name === 'Tickets'
                                            )[0]
                                            ?.service_credit?.service_credit_rates?.filter(
                                                (service) => service?.currency?.short_name === currency
                                            )[0].free_credits
                                ) *
                                plan.plan_services
                                    .map((service) =>
                                        service?.service_credit?.service_credit_rates?.find(
                                            (rate) => rate?.currency?.short_name === currency
                                        )
                                            ? service
                                            : null
                                    )
                                    ?.filter((service) => service?.service_credit?.service?.name === 'Tickets')[0]
                                    ?.service_credit?.service_credit_rates?.filter(
                                        (service) => service?.currency?.short_name === currency
                                    )[0].follow_up_rate,
                        },
                    };
                    setPlansObj(acc);
                    return acc;
                }, {});
        }
    }, [plans, tickets, inboxes]);

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
                            {' '}
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
                <h1 className='text-3xl font-semibold capitalize '>Hello Pricing</h1>
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
                                                        <div className='gap-1 flex flex-col'>
                                                            <p className=' text-2xl font-semibold text-green-600 capitalize'>
                                                                {amount?.currency?.symbol}
                                                                {amount?.plan_amount} {tabtype}
                                                            </p>
                                                            <div>{handleOfferPrice(amount) || '-'}</div>
                                                        </div>
                                                        <p>
                                                            {amount?.currency?.short_name === 'INR' &&
                                                            plan?.name != 'Free'
                                                                ? '+18% GST'
                                                                : amount?.currency?.short_name === 'GBP' &&
                                                                    plan?.name != 'Free'
                                                                  ? '+ VAT'
                                                                  : '-'}
                                                        </p>
                                                        <Link href={getURL('signup', 'hello')} target='_blank'>
                                                            <button
                                                                className={`btn btn-primary  btn-md ${
                                                                    plan?.name === 'Basic' ? '' : 'btn-outline'
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
                                                                                                        fontSize={18}
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
                                                    {plan?.name !== 'Free' && (
                                                        <button
                                                            className=' btn btn-accent btn-outline btn-md '
                                                            onClick={() =>
                                                                document
                                                                    .getElementById('calculate_hello_pricing')
                                                                    .showModal()
                                                            }
                                                        >
                                                            Calculate
                                                        </button>
                                                    )}
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

                    <ConnectWithTeam product={'Hello'} href={'hello'} data={data?.connectComp} isPlan={true} />
                    <FaqsComp data={data?.faqComp} notCont={true} />
                </div>
            </div>
            {/* // calculate hello pricing */}
            {plansObj && (
                <dialog id='calculate_hello_pricing' className='modal '>
                    <div className={`modal-box flex flex-col gap-4 ${style.modal}`}>
                        <div className='flex justify-between'>
                            <h2 className='font-bold text-xl'>Calculate</h2>
                            <form method='dialog'>
                                <button className='btn btn-sm btn-circle btn-ghost  right-2 top-2'>✕</button>
                            </form>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p className=''>Here you can calculate your monthly expense based on your usage.</p>
                            <div className='flex gap-6 items-end'>
                                <label className='form-control w-full flex flex-col gap-1'>
                                    <span className='label-text'>Monthly Ticket usage</span>
                                    <input
                                        type='number'
                                        step='1'
                                        placeholder='Monthly Ticket usage'
                                        className='input input-bordered w-full '
                                        onChange={(e) => {
                                            setRawTickets(Number(e.target.value));
                                        }}
                                    />
                                </label>

                                <label className='form-control w-full flex flex-col gap-1'>
                                    <span className='label-text'>Monthly Inbox usage</span>
                                    <input
                                        type='number'
                                        step='1'
                                        placeholder='Monthly Inbox usage'
                                        className='input input-bordered w-full '
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d+$/.test(value)) {
                                                // Check if the value is a whole number
                                                setRawInboxes(Number(value));
                                            }
                                        }}
                                    />
                                </label>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => {
                                        onCalculate();
                                    }}
                                >
                                    Calculate
                                </button>
                            </div>
                        </div>
                        <div className={`${showCalculations ? 'flex' : 'hidden'} flex-col  border rounded`}>
                            <div className='flex flex-col gap-1 py-2'>
                                <h3 className='px-4 font-medium text-gray-500'>Plan details</h3>
                                <div className='grid grid-cols-3 bg-gray'>
                                    <div className='p-4 border-e-2 flex flex-col gap-4'>
                                        <h4>Plan</h4>
                                        <h4>Plan charges</h4>
                                    </div>
                                    <div className='p-4 border-e-2 flex flex-col gap-4'>
                                        <span>{Object.keys(plansObj)[0]}</span>
                                        <span className='font-bold text-green-600'>
                                            {symbol}
                                            {plansObj[Object.keys(plansObj)[0]]?.planAmount}
                                        </span>
                                    </div>
                                    <div className='p-4 flex flex-col gap-4'>
                                        <span>{Object.keys(plansObj)[1]}</span>
                                        <span className='font-bold text-green-600'>
                                            {symbol} {plansObj[Object.keys(plansObj)[1]]?.planAmount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 py-2'>
                                <h3 className='px-4 font-medium text-gray-500'>Included benefits</h3>
                                <div className='grid grid-cols-3 bg-gray'>
                                    <div className='p-4 border-e-2 flex flex-col gap-4'>
                                        <h4>Tickets</h4>
                                        <h4>Inboxes</h4>
                                    </div>
                                    <div className='p-4 border-e-2 flex flex-col gap-4'>
                                        <span>
                                            {plansObj[Object.keys(plansObj)[0]]?.planServices?.Tickets?.free_credits}
                                        </span>
                                        <span>
                                            {plansObj[Object.keys(plansObj)[0]]?.planServices?.Inbox?.free_credits}
                                        </span>
                                    </div>
                                    <div className='p-4 flex flex-col gap-4'>
                                        <span>
                                            {plansObj[Object.keys(plansObj)[1]]?.planServices?.Tickets?.free_credits}
                                        </span>
                                        <span>
                                            {plansObj[Object.keys(plansObj)[1]]?.planServices?.Inbox?.free_credits}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 py-2'>
                                <h3 className='px-4 font-medium text-gray-500'>Calculations</h3>
                                <div className='grid grid-cols-3 bg-gray'>
                                    <div className='p-4 border-e-2 flex flex-col gap-4'>
                                        <h4>Extra tickets</h4>
                                        <h4>Extra tickets charges</h4>
                                        <h4>Extra inboxs</h4>
                                        <h4>Extra inbox charges</h4>
                                    </div>
                                    <div className='p-4 flex flex-col gap-4'>
                                        <span>
                                            {contvertToLocal(plansObj[Object.keys(plansObj)[0]]?.extra?.Tickets)}
                                        </span>
                                        {plansObj[Object.keys(plansObj)[0]]?.extraCharges?.Tickets !== 0 ? (
                                            <span>
                                                {contvertToLocal(plansObj[Object.keys(plansObj)[0]]?.extra?.Tickets)} X{' '}
                                                {
                                                    plansObj[Object.keys(plansObj)[0]]?.planServices?.Tickets
                                                        ?.follow_up_rate
                                                }{' '}
                                                =
                                                <span className='text-green-600 font-semibold'>
                                                    {''} {symbol}{' '}
                                                    {contvertToLocal(
                                                        plansObj[Object.keys(plansObj)[0]]?.extraCharges?.Tickets
                                                    )}
                                                </span>
                                            </span>
                                        ) : (
                                            <span>-</span>
                                        )}
                                        <span>{contvertToLocal(plansObj[Object.keys(plansObj)[0]]?.extra?.Inbox)}</span>
                                        {plansObj[Object.keys(plansObj)[0]]?.extraCharges?.Inbox !== 0 ? (
                                            <span>
                                                {contvertToLocal(plansObj[Object.keys(plansObj)[0]]?.extra?.Inbox)} X{' '}
                                                {
                                                    plansObj[Object.keys(plansObj)[0]]?.planServices?.Inbox
                                                        ?.follow_up_rate
                                                }{' '}
                                                ={''}
                                                <span className='text-green-600 font-semibold'>
                                                    {' '}
                                                    {symbol}{' '}
                                                    {contvertToLocal(
                                                        plansObj[Object.keys(plansObj)[0]]?.extraCharges?.Inbox
                                                    )}
                                                </span>
                                            </span>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </div>
                                    <div className='p-4 flex flex-col gap-4'>
                                        <span>
                                            {contvertToLocal(plansObj[Object.keys(plansObj)[1]]?.extra?.Tickets)}
                                        </span>
                                        {plansObj[Object.keys(plansObj)[1]]?.extraCharges?.Tickets !== 0 ? (
                                            <span>
                                                {contvertToLocal(plansObj[Object.keys(plansObj)[1]]?.extra?.Tickets)} X{' '}
                                                {
                                                    plansObj[Object.keys(plansObj)[1]]?.planServices?.Tickets
                                                        ?.follow_up_rate
                                                }{' '}
                                                ={''}
                                                <span className='text-green-600 font-semibold'>
                                                    {''} {symbol}{' '}
                                                    {contvertToLocal(
                                                        plansObj[Object.keys(plansObj)[1]]?.extraCharges?.Tickets
                                                    )}
                                                </span>
                                            </span>
                                        ) : (
                                            <span>-</span>
                                        )}
                                        <span>{contvertToLocal(plansObj[Object.keys(plansObj)[1]]?.extra?.Inbox)}</span>
                                        {plansObj[Object.keys(plansObj)[1]]?.extraCharges?.Inbox !== 0 ? (
                                            <span>
                                                {contvertToLocal(plansObj[Object.keys(plansObj)[1]]?.extra?.Inbox)} X{' '}
                                                {
                                                    plansObj[Object.keys(plansObj)[1]]?.planServices?.Inbox
                                                        ?.follow_up_rate
                                                }{' '}
                                                ={''}
                                                <span className='text-green-600 font-semibold'>
                                                    {' '}
                                                    {symbol}{' '}
                                                    {contvertToLocal(
                                                        plansObj[Object.keys(plansObj)[1]]?.extraCharges?.Inbox
                                                    )}
                                                </span>
                                            </span>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 pt-2'>
                                <h3 className='px-4 font-medium text-gray-500'>Total</h3>
                                <div className='grid grid-cols-3 bg-gray'>
                                    <div className='p-4 border-e-2 flex flex-col gap-4'>
                                        <h4>Monthly recurring charges</h4>
                                    </div>
                                    <div className='p-4 border-e-2 flex flex-col gap-4'>
                                        <span className='font-bold text-green-600'>
                                            {' '}
                                            {symbol}{' '}
                                            {contvertToLocal(
                                                plansObj[Object.keys(plansObj)[0]]?.planAmount +
                                                    plansObj[Object.keys(plansObj)[0]]?.extraCharges?.Tickets +
                                                    plansObj[Object.keys(plansObj)[0]]?.extraCharges?.Inbox
                                            )}
                                        </span>
                                        <span>
                                            {' '}
                                            {currency === 'INR'
                                                ? 'Excluding 18% GST'
                                                : currency === 'GBP'
                                                  ? 'Excluding VAT'
                                                  : ''}
                                        </span>
                                    </div>
                                    <div className='p-4 flex flex-col gap-4'>
                                        <span className='font-bold text-green-600'>
                                            {' '}
                                            {symbol}{' '}
                                            {contvertToLocal(
                                                plansObj[Object.keys(plansObj)[1]]?.planAmount +
                                                    plansObj[Object.keys(plansObj)[1]]?.extraCharges?.Tickets +
                                                    plansObj[Object.keys(plansObj)[1]]?.extraCharges?.Inbox
                                            )}
                                        </span>
                                        <span>
                                            {currency === 'INR'
                                                ? 'Excluding 18% GST'
                                                : currency === 'GBP'
                                                  ? 'Excluding VAT'
                                                  : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}
