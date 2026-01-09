import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';
import getURL from '@/utils/getURL';
import { sortByCurrentCountry, filterBySearch } from '@/utils/pricingUtils';
import Image from 'next/image';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import CalculatePricingWhatsApp from './CalculatePricingWhatsApp/CalculatePricingWhatsApp';
import PricingTable from './PricingTable/PricingTable';
import PricingPlanCard from './PricingPlanCard/PricingPlanCard';
import { useState, useMemo, useEffect } from 'react';
import { MdArrowRightAlt, MdClose } from 'react-icons/md';

export default function PricingWhatsApp({ pricingData, pageData, pageInfo }) {
    const planConfig = pricingData?.planConfig || {};
    const { symbol, currency } = GetCurrencySymbol(pageInfo?.country);
    const currentCountry = GetCountryDetails({ shortname: pageInfo?.country, type: 'shortname' });
    const [tabtype, setTabtype] = useState('Messages');
    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const messagePricing = pricingData?.messagePricing || [];
    const availablePlans = messagePricing.filter((plan) => plan?.country_data?.length > 0).map((plan) => plan.planName);

    const [planType, setPlanType] = useState(availablePlans[0]);

    const messageDataByPlan = useMemo(() => {
        const dataByPlan = {};
        messagePricing.forEach((plan) => {
            if (plan?.planName && plan?.country_data?.length) {
                dataByPlan[plan.planName] = sortByCurrentCountry(plan.country_data, currentCountry);
            }
        });
        return dataByPlan;
    }, [messagePricing, currentCountry]);

    const voiceData = useMemo(() => {
        return sortByCurrentCountry(pricingData?.voicePricing || [], currentCountry);
    }, [pricingData, currentCountry]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchText]);

    const filteredMessageDataByPlan = useMemo(() => {
        const filtered = {};
        availablePlans.forEach((planName) => {
            filtered[planName] = filterBySearch(messageDataByPlan[planName] || [], debouncedSearch);
        });
        return filtered;
    }, [debouncedSearch, messageDataByPlan, availablePlans]);

    const filteredVoiceData = useMemo(() => {
        return filterBySearch(voiceData, debouncedSearch);
    }, [debouncedSearch, voiceData]);

    const filteredMessageData = filteredMessageDataByPlan[planType] || [];
    const messageData = messageDataByPlan[planType] || [];
    const isMessagePricingEmpty = tabtype === 'Messages' && availablePlans.length === 0;
    const noCountryFound =
        (tabtype === 'Messages' && filteredMessageData?.length === 0) ||
        (tabtype === 'Voice' && filteredVoiceData?.length === 0);
    return (
        <>
            <div className='flex flex-col gap-3 max-w-full w-full overflow-hidden'>
                <h1 className='text-2xl md:text-3xl font-semibold capitalize'>WhatsApp Pricing</h1>

                <div role='tablist' className='flex gap-0 bg-gray-100 rounded-lg p-1 w-fit'>
                    <button
                        role='tab'
                        className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                            tabtype === 'Messages'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setTabtype('Messages')}
                    >
                        Messages
                    </button>
                    <button
                        role='tab'
                        className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                            tabtype === 'Voice'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setTabtype('Voice')}
                    >
                        Voice
                    </button>
                </div>
                {!isMessagePricingEmpty && (
                    <div
                        className={`flex flex-col lg:flex-row md:gap-4 gap-4 py-4 ${
                            tabtype === 'Messages' ? '' : 'hidden'
                        }`}
                    >
                        {messagePricing.map((plan) => {
                            if (!plan?.planName || !plan?.country_data?.length) return null;

                            // Use amount from the plan object
                            const planAmount = plan.amount?.plan_amount || 0;
                            const planPeriod = plan.amount?.plan_type === 'yearly' ? ' / Year' : ' / Month';

                            return (
                                <PricingPlanCard
                                    key={plan.planName}
                                    title={plan.planName}
                                    price={`${symbol}${planAmount}`}
                                    period={planPeriod}
                                    features={plan.description || []}
                                    isSelected={planType === plan.planName}
                                    IsMultiPlan={messagePricing.length > 1}
                                    onSelect={() => {
                                        setPlanType(plan.planName);
                                        setSearchText('');
                                    }}
                                    symbol={symbol}
                                />
                            );
                        })}
                    </div>
                )}
                <div className='flex flex-col w-full gap-8'>
                    <div
                        className={`flex lg:flex-row flex-col-reverse bg-white rounded xl:p-8 lg:p-6 p-4 items-center justify-between lg:gap-6 xl:gap-12 gap-4 ${
                            tabtype === 'Messages' ? 'hidden' : ''
                        }`}
                    >
                        <div className={`${tabtype === 'Voice' ? '' : 'hidden'} flex flex-col gap-4 w-full`}>
                            <div>
                                <h2 className='text-xl md:text-3xl font-bold'>{pageData?.whatsappVoice?.heading}</h2>
                                <ul className='flex flex-col gap-2'>
                                    {pageData?.whatsappVoice?.content?.map((item, index) => (
                                        <div key={index} className='flex gap-2 text-gray-600 items-center'>
                                            <MdArrowRightAlt size={18} /> <li>{item}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <a href={getURL('signup', 'whatsapp')} className='w-fit' target='_blank'>
                                <button className='btn btn-primary btn-md'>Get Started</button>
                            </a>
                        </div>

                        {!isMessagePricingEmpty && (
                            <div
                                className={`flex flex-col gap-4 sm:gap-6 w-full md:text-start text-center md:items-start items-center ${
                                    tabtype === 'Messages' ? '' : 'hidden'
                                }`}
                            >
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-xl md:text-3xl font-semibold'>
                                        <span className='text-green-600 font-bold text-2xl lg:text-4xl'>Zero</span>{' '}
                                        margin on meta price.
                                    </h2>
                                    {currentCountry?.name === 'India' && (
                                        <p className='txt-sm lg:text-lg'>GST excluded.</p>
                                    )}
                                    {currentCountry?.name === 'United Kingdom' && (
                                        <p className='txt-sm md:text-lg'>VAT excluded.</p>
                                    )}
                                </div>
                                <a href={getURL('signup', 'whatsapp')} className='w-fit' target='_blank'>
                                    <button className='btn btn-primary btn-md'>Get Started</button>
                                </a>
                            </div>
                        )}

                        <Image
                            src={'/assets/icons/products/whatsapp.svg'}
                            className={`max-w-[200px] min-w-[200px] w-full h-fit`}
                            width={240}
                            height={240}
                            alt='whatsapp logo'
                            fetchpriority='high'
                        />
                    </div>

                    {!isMessagePricingEmpty && (
                        <div className='flex flex-col gap-8 w-full'>
                            <div className={`flex flex-col gap-2 ${tabtype === 'Messages' ? '' : 'hidden'}`}>
                                <div className='flex flex-col justify-between gap-1'>
                                    {pageData?.heading && <h2 className='text-2xl font-bold'>{pageData?.heading}</h2>}
                                    {messageData && messageData?.length > 0 && (
                                        <button
                                            onClick={() =>
                                                document.getElementById('calculate_whatsapp_pricing').showModal()
                                            }
                                            className='btn btn-accent btn-outline w-fit btn-sm ms-auto'
                                        >
                                            Calculate
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-col gap-4'>
                                <h2 className={`text-2xl font-bold ${tabtype === 'Voice' ? '' : 'hidden'}`}>
                                    Outbound Call Pricing
                                </h2>

                                <div className='relative w-full max-w-[300px] mb-4'>
                                    <input
                                        type='text'
                                        placeholder='Search market...'
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className={`p-2 rounded w-full pr-8 border focus:outline-none ${
                                            noCountryFound ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {searchText && (
                                        <button
                                            onClick={() => setSearchText('')}
                                            className='absolute right-2 top-5 -translate-y-1/2 '
                                        >
                                            <MdClose size={20} />
                                        </button>
                                    )}
                                    {(tabtype === 'Messages' && filteredMessageData?.length === 0) ||
                                    (tabtype === 'Voice' && filteredVoiceData?.length === 0) ? (
                                        <p className='text-sm p-2'>No country found. Please check your search.</p>
                                    ) : null}
                                </div>

                                {availablePlans?.map((planName) => (
                                    <PricingTable
                                        key={`messages-${planName}`}
                                        data={filteredMessageDataByPlan[planName] || []}
                                        tabtype={tabtype}
                                        tabletype='messages'
                                        symbol={symbol}
                                        className={`${
                                            tabtype === 'Messages' &&
                                            planType === planName &&
                                            filteredMessageDataByPlan[planName]?.length > 0
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    />
                                ))}

                                <PricingTable
                                    data={filteredVoiceData}
                                    tabtype={tabtype}
                                    tabletype='voice'
                                    symbol={symbol}
                                    className={`${
                                        tabtype === 'Voice' && filteredVoiceData?.length > 0 ? '' : 'hidden'
                                    }`}
                                />
                            </div>
                        </div>
                    )}
                    <div className={`${!isMessagePricingEmpty ? '' : 'p-5'}`}>
                        <ConnectWithTeam
                            product='WhatsApp'
                            pageData={pageData?.connectComp}
                            href='whatsapp'
                            isPlan={true}
                        />
                    </div>
                </div>
            </div>

            {messageData && messageData?.length > 0 && (
                <dialog id='calculate_whatsapp_pricing' className='modal'>
                    <CalculatePricingWhatsApp
                        plans={messageData}
                        currentCountry={currentCountry}
                        currency={currency}
                        symbol={symbol}
                    />
                </dialog>
            )}
        </>
    );
}
