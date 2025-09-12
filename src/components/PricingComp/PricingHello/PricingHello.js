import { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import getURL from '@/utils/getURL';
import CalculateHelloPricing from './calculateHelloPricing';
import getPlanServices from '@/utils/getPlanServices';

export default function PricingHello({ pageData, pricingData, country }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const [tabtype, setTabtype] = useState('Monthly');
    const [hasyYarly, setHasYearly] = useState(false);

    const hasYearlyPlan = useCallback(() => {
        return pricingData?.some((plan) => plan.plan_amounts?.some((amount) => amount.plan_type?.name === 'Yearly'));
    }, [pricingData]);

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
                <div className='flex flex-col w-full gap-6'>
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

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 w-full gap-4 '>
                        {pricingData &&
                            pricingData.length > 0 &&
                            pricingData.map(
                                (plan) =>
                                    plan?.plan_amounts?.length > 0 &&
                                    plan?.plan_amounts.map((amount, index) => {
                                        if (
                                            amount?.currency?.short_name === currency &&
                                            amount?.plan_type?.name === tabtype
                                        ) {
                                            const services = getPlanServices(plan, currency);
                                            return (
                                                <div
                                                    key={plan?.name + index}
                                                    className={`flex flex-col gap-6 col-span-1 p-6  rounded bg-white ${
                                                        plan?.name === 'Basic' ? 'border-4 border-black' : 'border'
                                                    }`}
                                                >
                                                    <div className='flex flex-col gap-3'>
                                                        <div className='flex items-center justify-between'>
                                                            <h2 className=' text-xl font-semibold'>{plan?.name}</h2>
                                                            {plan?.name === 'Basic' && (
                                                                <span className='bg-black text-white px-2 rounded-badge'>
                                                                    Popular
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className='gap-1 flex flex-col'>
                                                            <p className=' text-xl font-semibold text-green-600 capitalize'>
                                                                {`${amount?.currency?.symbol}${amount?.plan_amount} ${tabtype}`}
                                                            </p>
                                                            {handleOfferPrice(amount) ? (
                                                                <div>{handleOfferPrice(amount) || '-'}</div>
                                                            ) : null}
                                                        </div>

                                                        <a href={getURL('signup', 'hello')} target='_blank'>
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
                                                        <div className='flex flex-col gap-1'>
                                                            {plan?.plan_services?.map((service, index) =>
                                                                service?.service_credit?.service_credit_rates?.map(
                                                                    (rate, i) =>
                                                                        rate?.currency?.short_name === currency && (
                                                                            <p key={i} className='text-sm'>
                                                                                {`${
                                                                                    rate?.free_credits === -1 ||
                                                                                    rate?.free_credits === '-1'
                                                                                        ? 'Unlimited'
                                                                                        : rate?.free_credits
                                                                                } ${
                                                                                    service?.service_credit?.service
                                                                                        ?.name
                                                                                }/month`}
                                                                            </p>
                                                                        )
                                                                )
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* features */}
                                                    <div className='flex flex-col gap-2'>
                                                        <h3 className='font-semibold'>Features</h3>
                                                        <div className='flex flex-col gap-1'>
                                                            {plan?.plan_features?.length > 0 &&
                                                                plan?.plan_features.map((feature, index) => {
                                                                    if (
                                                                        feature?.is_visible ||
                                                                        !feature?.feature?.is_included
                                                                    ) {
                                                                        return (
                                                                            <p
                                                                                className='flex items-center gap-1 text-sm'
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
                                                                                )}{' '}
                                                                                {feature?.feature?.name}
                                                                            </p>
                                                                        );
                                                                    }
                                                                })}
                                                        </div>
                                                    </div>

                                                    {services?.servicesList?.length > 0 && services?.showExtra && (
                                                        <div className='flex flex-col gap-2'>
                                                            <h3 className='font-semibold'>Extra @</h3>
                                                            <div className='flex flex-col gap-1'>
                                                                {services?.servicesList.map((service, index) => {
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
                                                                                {rate && services?.postpaidAllowed ? (
                                                                                    <span className='flex items-center gap-1 w-fit'>
                                                                                        <MdCheck
                                                                                            fontSize={18}
                                                                                            color='#16A34A'
                                                                                        />
                                                                                        {`${symbol}${rate}/${serviceName}/month`}
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className='flex items-center gap-1 w-fit'>
                                                                                        <MdClose
                                                                                            fontSize={18}
                                                                                            color='#DC3645'
                                                                                        />
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
                                                    {plan?.postpaid_allowed && (
                                                        <CalculateHelloPricing
                                                            plan={plan}
                                                            currency={currency}
                                                            symbol={symbol}
                                                            tabtype={tabtype}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        }
                                    })
                            )}
                    </div>
                    {country === 'in' || country === 'gb' ? (
                        <div className='text-gray-500'>
                            *Prices are exclusive of {country === 'in' ? '18% GST' : 'VAT'}
                        </div>
                    ) : null}

                    <ConnectWithTeam product={'Hello'} href={'hello'} data={pageData?.connectComp} isPlan={true} />
                    <FaqsComp data={pageData?.faqComp} notCont={true} />
                </div>
            </div>
        </>
    );
}
