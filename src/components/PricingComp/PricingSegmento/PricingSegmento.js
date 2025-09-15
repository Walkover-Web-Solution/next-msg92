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
import contvertToLocal from '@/utils/convertToLocal';
import InfoIcon from '@/components/UIComponent/InfoIcon/InfoIcon';

export default function PricingSegmento({ pageData, pricingData, country }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const [tabtype, setTabtype] = useState('Monthly');
    const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
    const [openedFeatureModal, setOpenedFeatureModal] = useState('');
    const [hasyYarly, setHasYearly] = useState(false);

    const hasYearlyPlan = useCallback(() => {
        return pricingData?.some((plan) => plan.amount?.some((amount) => amount.plan_type?.name === 'Yearly'));
    }, [pricingData]);

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
                        {`Extra Contacts are available for purchase in bundles of ${contvertToLocal(
                            1000
                        )} contacts each`}
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
                        {pricingData?.length > 0 &&
                            pricingData?.map((plan, index) => {
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
                                                        {plan?.amount[0]?.plan_amount} {tabtype}
                                                    </p>
                                                    {plan?.amount[0]?.plan_amount > 0 ? (
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
                    </div>

                    <ConnectWithTeam
                        product={'Segmento'}
                        href={'segmento'}
                        data={pageData?.connectComp}
                        isPlan={true}
                    />
                    <FaqsComp data={pageData?.faqComp} notCont={true} />
                </div>
            </div>
            {pricingData && isCalculationModalOpen && (
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
                        <CalculatePricingSegmento
                            plans={pricingData}
                            currency={currency}
                            symbol={symbol}
                            tabtype={tabtype}
                        />
                    </div>
                </dialog>
            )}
        </>
    );
}
