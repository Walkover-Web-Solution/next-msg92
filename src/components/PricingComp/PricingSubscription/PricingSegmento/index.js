import { useState, useEffect, useCallback } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import getURL from '@/utils/getURL';
import CalculatePricingSegmento from './CalculatePricingSegmento/CalculatePricingSegmento';
import features from '@/data/segmentoPricingFeatures.json';
import FeaturesModalComp from './FeaturesModalComp/FeaturesModalComp';
import InfoIcon from '@/components/UIComponent/InfoIcon/InfoIcon';

export default function PricingSegmento({ pricingData, symbol, tabtype, pageInfo }) {
    const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
    const [openedFeatureModal, setOpenedFeatureModal] = useState('');

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
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full gap-8 '>
                {pricingData?.length > 0 &&
                    pricingData?.map((plan, index) => {
                        return (
                            <div
                                key={plan?.name + index}
                                className={`${
                                    plan?.amount?.plan_type === tabtype ? 'flex' : 'hidden'
                                } flex-col gap-4 col-span-1 p-6  rounded bg-white relative ${
                                    plan?.name === 'Starter' ? 'border-4 border-black' : 'border'
                                }`}
                            >
                                <div className='flex flex-col gap-2'>
                                    <div className='flex items-center justify-between'>
                                        <h2 className=' text-2xl font-semibold'>{`${plan?.name}`}</h2>
                                        {plan?.name === 'Starter' && (
                                            <span className='bg-black text-white px-2 rounded-badge'>Popular</span>
                                        )}
                                    </div>
                                    <div className='gap-1 flex flex-col'>
                                        <p className=' text-2xl font-semibold text-green-700 capitalize'>
                                            {`${symbol}${plan?.amount?.plan_amount} ${tabtype}`}
                                        </p>
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
                                                {`${service?.amount === -1 ? 'Unlimited' : service?.amount} ${
                                                    service.service_name
                                                }${service?.amount === -1 ? '' : '/month'}`}
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
                                                    <div
                                                        className='flex text-start gap-1 w-fit hover:underline tooltip tooltip-secondary cursor-pointer'
                                                        key={index}
                                                        data-tip={feature?.description}
                                                    >
                                                        {feature?.notIncluded &&
                                                        feature?.notIncluded.includes(plan?.name) ? (
                                                            <MdClose fontSize={18} className='text-red-500' />
                                                        ) : (
                                                            <MdCheck fontSize={18} className='text-green-500' />
                                                        )}{' '}
                                                        <p>{`${feature?.name}`}</p>
                                                    </div>
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
                                <div className='flex flex-col gap-1'>
                                    {plan?.extras?.servicesList?.length > 0 && plan?.extras?.showExtra && (
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex items-center gap-1'>
                                                <h3 className='text-lg font-semibold'>Extra @</h3>{' '}
                                                {pageInfo?.product === 'segmento' && plan?.extras?.postpaidAllowed ? (
                                                    <InfoIcon
                                                        content={`Extra Contacts are available for purchase in bundles of 1,000 contacts each.`}
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </div>
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

                                {isFeatureModalOpen && openedFeatureModal === plan?.name && (
                                    <dialog className='modal modal-scrollable absolute' open>
                                        <div className='bg-white w-[95%] h-[95%] relative rounded-md border modal-box flex flex-col '>
                                            <div className='flex items-center justify-between h-fit'>
                                                <h3 className='text-xl font-bold'>More Features</h3>
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
                                            <FeaturesModalComp features={features?.modal} plan_name={plan?.name} />
                                        </div>
                                    </dialog>
                                )}
                            </div>
                        );
                    })}
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
