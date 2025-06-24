import { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import Link from 'next/link';
import getURL from '@/utils/getURL';
import CalculatePricingSegmento from './CalculatePricingSegmento/CalculatePricingSegmento';
import features from '@/data/segmentoPricingFeatures.json';
import FeaturesModalComp from './FeaturesModalComp/FeaturesModalComp';
import getSubscriptions from '@/utils/getSimplifiedPlans';
import contvertToLocal from '@/utils/convertToLocal';
import InfoIcon from '@/components/UIComponent/InfoIcon/InfoIcon';

export default function PricingSegmento({ data, country }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const [isLoading, setIsLoading] = useState(true);
    const [plans, setPlans] = useState();
    const [tabtype, setTabtype] = useState('Monthly');
    const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
    const [openedFeatureModal, setOpenedFeatureModal] = useState('');
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
    }, []);

    const hasYearlyPlan = useCallback(() => {
        return plans?.some((plan) => plan.plan_amounts?.some((amount) => amount.plan_type?.name === 'Yearly'));
    }, [plans]);

    useEffect(() => {
        if (hasYearlyPlan()) {
            setHasYearly(true);
        }
    }, [hasYearlyPlan]);

    useEffect(() => {
        if (isFeatureModalOpen) {
            const style = document.createElement('style');
            style.innerHTML = `
                .modal {
                    overflow-scroll: scroll !important;
                }
            `;
            document.head.appendChild(style);

            // Cleanup on unmount or when modal closes
            return () => {
                document.head.removeChild(style);
            };
        }
    }, [isFeatureModalOpen]);

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
            <div className='flex flex-col gap-6 w-full'>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl font-semibold capitalize '>segmento Pricing</h1>
                        <button
                            className=' btn btn-accent btn-outline btn-sm'
                            onClick={() => setIsCalculationModalOpen(true)}
                        >
                            Calculate
                        </button>
                    </div>{' '}
                    <p className='text-sm'>
                        <strong>Note:</strong>{' '}
                        {`Extra Contacts are available for purchase in bundles of ${contvertToLocal(1000)} contacts each`}
                        .
                    </p>
                </div>

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
                        {plans?.length > 0 &&
                            plans?.map((plan, index) => {
                                return (
                                    <>
                                        <div
                                            key={plan?.name + index}
                                            className={`flex flex-col gap-4 col-span-1 p-6  rounded bg-white relative ${
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
                                                        {symbol}
                                                        {plan?.amount} {tabtype}
                                                    </p>
                                                    {plan?.amount > 0 ? (
                                                        <p className='text-sm'>
                                                            {currency === 'INR'
                                                                ? '+18% GST'
                                                                : currency === 'GBP'
                                                                  ? '+VAT'
                                                                  : '-'}
                                                        </p>
                                                    ) : (
                                                        '-'
                                                    )}
                                                    {/* <div>{handleOfferPrice(amount) || '-'}</div> */}
                                                </div>

                                                <a href={getURL('signup', 'segmento')} target='_blank'>
                                                    <button
                                                        className={`btn btn-primary  btn-sm ${
                                                            plan?.name === 'Starter' ? '' : 'btn-outline'
                                                        }`}
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
                                                    {plan?.included?.map((service, index) => (
                                                        <p key={index}>
                                                            {`${
                                                                service?.amount === -1 ? 'Unlimited' : service?.amount
                                                            } ${service.service_name}${
                                                                service?.amount === -1 ? '' : '/month'
                                                            }`}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* features */}
                                            <div className='flex flex-col gap-2'>
                                                <h3 className='text-lg font-semibold'>Features</h3>
                                                <div className='flex flex-col gap-1'>
                                                    {features?.primary?.length > 0 &&
                                                        features.primary.map((feature, index) => {
                                                            return (
                                                                <p
                                                                    className='flex text-start gap-1 w-fit hover:underline tooltip tooltip-secondary cursor-pointer'
                                                                    key={index}
                                                                    data-tip={feature?.description}
                                                                >
                                                                    {feature?.notIncluded &&
                                                                    feature?.notIncluded.includes(plan?.name) ? (
                                                                        <MdClose
                                                                            className='mt-1'
                                                                            fontSize={20}
                                                                            color='#DC3645'
                                                                        />
                                                                    ) : (
                                                                        <MdCheck
                                                                            className='mt-1'
                                                                            fontSize={20}
                                                                            color='#16A34A'
                                                                        />
                                                                    )}

                                                                    {feature?.name}
                                                                </p>
                                                            );
                                                        })}
                                                </div>
                                                <p
                                                    onClick={() => {
                                                        setIsFeatureModalOpen(true);
                                                        setOpenedFeatureModal(plan?.name);
                                                    }}
                                                    className='text-link active-link text-sm'
                                                >
                                                    See More Features
                                                </p>
                                            </div>

                                            {/* Extras */}
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex items-center gap-1'>
                                                    <h3 className='text-lg font-semibold'>Extra @</h3>{' '}
                                                    {plan.postpaid_allowed ? (
                                                        <InfoIcon
                                                            content={`Extra Contacts are available for purchase in bundles of 1,000 contacts each.`}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    {plan?.extras?.length > 0 &&
                                                        plan?.extras.map((service, index) => (
                                                            <div key={index} className='flex  gap-1'>
                                                                {service?.postpaid_allowed ? (
                                                                    <>
                                                                        {' '}
                                                                        <MdCheck
                                                                            className='mt-1'
                                                                            fontSize={20}
                                                                            color='#16A34A'
                                                                        />
                                                                        <p>
                                                                            {`${symbol}${service?.rate}/${
                                                                                service?.chunk > 1 ? service?.chunk : ''
                                                                            } ${service?.service_name}/month`}
                                                                        </p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {' '}
                                                                        <MdClose
                                                                            className='mt-1'
                                                                            fontSize={20}
                                                                            color='#DC3645'
                                                                        />
                                                                        <p> No Extra {service?.service_name}</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>

                                            {isFeatureModalOpen && openedFeatureModal === plan?.name && (
                                                <dialog className='modal modal-scrollable absolute' open>
                                                    <div className='bg-white w-[95%] h-[95%] relative rounded-md border modal-box flex flex-col '>
                                                        <div className='flex items-center justify-between h-fit'>
                                                            <h3 className='text-2xl font-bold'>More Features</h3>
                                                            <button
                                                                onClick={() => {
                                                                    setIsFeatureModalOpen(false);
                                                                    setOpenedFeatureModal('');
                                                                }}
                                                                className='btn btn-sm btn-circle btn-ghost'
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                        <FeaturesModalComp
                                                            features={features?.modal}
                                                            plan_name={plan?.name}
                                                        />
                                                    </div>
                                                </dialog>
                                            )}
                                        </div>
                                    </>
                                );
                            })}

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
            {plans && isCalculationModalOpen && (
                <dialog id='calculate_segmento_pricing' className='modal z-[1000!important]' open>
                    <div className='modal-box rounded-md flex flex-col gap-4 justify-between'>
                        <div className='flex items-center justify-between'>
                            <h3 className='font-bold text-lg'>Calculate Email Pricing</h3>
                            <span
                                className='btn btn-sm btn-circle btn-ghost '
                                onClick={() => {
                                    setIsCalculationModalOpen(false);
                                }}
                            >
                                ✕
                            </span>
                        </div>
                        <CalculatePricingSegmento plans={plans} currency={currency} symbol={symbol} tabtype={tabtype} />
                    </div>
                </dialog>
            )}
        </>
    );
}
