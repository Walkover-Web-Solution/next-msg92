import FaqsComp from '@/components/FaqsComp/FaqsComp';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import { useCallback, useEffect, useState } from 'react';
import getSubscriptions from '@/utils/getSubscription';
import { MdCheck, MdClose } from 'react-icons/md';
import getURL from '@/utils/getURL';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import CalculateEmailPricing from './calculateEmailPricing/calculateEmailPricing';

export default function PricingEmail({ data, country }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState();
    const [tabtype, setTabtype] = useState('Monthly');

    const fetchPlans = useCallback(async () => {
        setIsLoading(true);
        const response = await getSubscriptions(currency, 1);
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
            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold capitalize '>Email Pricing</h1>
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
                    <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6'>
                        {plans &&
                            plans?.length > 0 &&
                            plans?.map(
                                (plan, i) =>
                                    plan?.plan_amounts?.length &&
                                    plan?.plan_amounts?.map((amount) => {
                                        if (
                                            amount?.currency?.short_name === currency &&
                                            amount?.plan_type?.name === tabtype
                                        ) {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex gap-6 p-6 rounded bg-white col-span-1 lg:max-w-full max-w-[350px] ${
                                                        plan?.name === 'Basic' ? 'border-4 border-black' : 'border'
                                                    }  ${
                                                        i == 0
                                                            ? ' xl:col-span-3 xl:flex-row flex flex-col '
                                                            : ' flex flex-col '
                                                    }`}
                                                >
                                                    <div className='flex flex-col gap-2 w-full'>
                                                        <div className='flex items-center justify-between'>
                                                            <h2 className=' text-2xl font-semibold'>{plan?.name}</h2>
                                                            {plan?.name === 'Basic' && (
                                                                <span className='bg-black text-white px-2 rounded-badge'>
                                                                    Popular
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className='flex items-end gap-1 '>
                                                            <h3 className='text-2xl font-semibold text-green-600 capitalize'>
                                                                {amount?.currency?.symbol}
                                                                {amount?.plan_amount}
                                                            </h3>
                                                            <p> {tabtype}</p>
                                                        </div>
                                                        {country === 'in' && amount?.plan_amount !== 0 && (
                                                            <p className='text-sm'>+ 18% GST</p>
                                                        )}
                                                        {country === 'gb' && amount?.plan_amount !== 0 && (
                                                            <p className='text-sm'>+ VAT</p>
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`border-b-[1px] w-full ${
                                                            i == 0 ? ' block xl:hidden ' : ' block '
                                                        }`}
                                                    ></span>
                                                    <a href={getURL('signup', 'email')} target='_blank'>
                                                        <button
                                                            className={`btn btn-primary  btn-md ${
                                                                plan?.name === 'Basic' ? '' : 'btn-outline'
                                                            } ${i == 0 ? ' block xl:hidden ' : ' block '}`}
                                                        >
                                                            Get Started
                                                        </button>
                                                    </a>
                                                    {/* included */}
                                                    <div className='flex flex-col gap-2 w-full'>
                                                        <h3 className='text-lg font-semibold'>Included</h3>
                                                        <div className='flex flex-col gap-1'>
                                                            {plan?.plan_services?.map((service) =>
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

                                                    {/* Extras */}
                                                    <div className='flex flex-col gap-2 w-full'>
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
                                                                                                    {'No Extra ' +
                                                                                                        service
                                                                                                            ?.service_credit
                                                                                                            ?.service
                                                                                                            ?.name}
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
                                                    <a
                                                        href={getURL('signup', 'email')}
                                                        target='_blank'
                                                        className='w-full justify-end '
                                                    >
                                                        <button
                                                            className={`btn btn-primary  btn-md mt-auto ${
                                                                plan?.name === 'Basic' ? '' : 'btn-outline'
                                                            } ${i == 0 ? ' xl:block hidden ' : ' hidden '}`}
                                                        >
                                                            Get Started
                                                        </button>
                                                    </a>
                                                    {plan?.name !== 'Free' && plan?.name !== 'free' && (
                                                        <button
                                                            onClick={() =>
                                                                document
                                                                    .getElementById('calculate_email_pricing')
                                                                    .showModal()
                                                            }
                                                            className='btn btn-accent btn-outline w-fit btn-sm mt-auto'
                                                        >
                                                            Calculate
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        }
                                    })
                            )}
                        {isLoading &&
                            [...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className='flex col-span-1 flex flex-col gap-6  h-[440px] p-6 border rounded bg-white'
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

                    <ConnectWithTeam product={'Email'} data={data?.connectComp} href={'email'} isPlan={true} />
                    <FaqsComp data={data?.faqComp} notCont={true} />
                </div>
            </div>
            {plans?.length > 0 && (
                <dialog id='calculate_email_pricing' className='modal'>
                    <CalculateEmailPricing plans={plans} currency={currency} symbol={symbol} tabtype={tabtype} />
                </dialog>
            )}
        </>
    );
}
