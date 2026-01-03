import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';
import getURL from '@/utils/getURL';
import Image from 'next/image';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import CalculatePricingWhatsApp from './CalculatePricingWhatsApp/CalculatePricingWhatsApp';
import styles from './PricingWhatsApp.module.scss';
import { useState, useMemo, useEffect } from 'react';
import { MdArrowRightAlt, MdClose } from 'react-icons/md';

export default function PricingWhatsApp({ pricingData, pageData, pageInfo }) {
    console.log('🚀 ~ PricingWhatsApp ~ pricingData:', pricingData);
    const { symbol, currency } = GetCurrencySymbol(pageInfo?.country);
    const currentCountry = GetCountryDetails({ shortname: pageInfo?.country, type: 'shortname' });
    const [tabtype, setTabtype] = useState('Messages');
    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const messageData = useMemo(() => {
        let sorted = [...(pricingData?.messagePricing || [])];
        const index = sorted.findIndex((item) => item.country_name === currentCountry?.name);
        if (index > -1) {
            const [current] = sorted.splice(index, 1);
            sorted.unshift(current);
        }
        return sorted;
    }, [pricingData, currentCountry]);

    const voiceData = useMemo(() => {
        let sorted = [...(pricingData?.voicePricing || [])];
        const index = sorted.findIndex((item) => item.country_name === currentCountry?.name);
        if (index > -1) {
            const [current] = sorted.splice(index, 1);
            sorted.unshift(current);
        }
        return sorted;
    }, [pricingData, currentCountry]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchText]);

    const filteredMessageData = useMemo(() => {
        if (!debouncedSearch) return messageData;
        return messageData.filter((item) => item.country_name.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }, [debouncedSearch, messageData]);

    const filteredVoiceData = useMemo(() => {
        if (!debouncedSearch) return voiceData;
        return voiceData.filter((item) => item.country_name.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }, [debouncedSearch, voiceData]);

    const noCountryFound =
        (tabtype === 'Messages' && filteredMessageData?.length === 0) ||
        (tabtype === 'Voice' && filteredVoiceData?.length === 0);

    return (
        <>
            <div className='flex flex-col gap-3 max-w-full w-full overflow-hidden'>
                <h1 className='text-2xl md:text-3xl font-semibold capitalize'>WhatsApp Pricing</h1>

                <div role='tablist' className='tabs tabs-boxed p-0 w-fit'>
                    <span
                        role='tab'
                        className={`tab ${tabtype === 'Messages' && 'tab-active'}`}
                        onClick={() => setTabtype('Messages')}
                    >
                        Messages
                    </span>
                    <span
                        role='tab'
                        className={`tab ${tabtype === 'Voice' && 'tab-active'}`}
                        onClick={() => setTabtype('Voice')}
                    >
                        Voice
                    </span>
                </div>

                <div className='flex flex-col w-full gap-8'>
                    <div className='flex lg:flex-row flex-col-reverse bg-white rounded xl:p-8 lg:p-6 p-4 items-center justify-between lg:gap-6 xl:gap-12 gap-4'>
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

                        <div
                            className={`flex flex-col gap-4 sm:gap-6 w-full md:text-start text-center md:items-start items-center ${
                                tabtype === 'Messages' ? '' : 'hidden'
                            }`}
                        >
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-xl md:text-3xl font-semibold'>
                                    <span className='text-green-600 font-bold text-2xl lg:text-4xl'>Zero</span> margin
                                    on meta price.
                                </h2>
                                {currentCountry?.name === 'India' && <p className='txt-sm lg:text-lg'>GST excluded.</p>}
                                {currentCountry?.name === 'United Kingdom' && (
                                    <p className='txt-sm md:text-lg'>VAT excluded.</p>
                                )}
                            </div>
                            <a href={getURL('signup', 'whatsapp')} className='w-fit' target='_blank'>
                                <button className='btn btn-primary btn-md'>Get Started</button>
                            </a>
                        </div>

                        <Image
                            src={'/assets/icons/products/whatsapp.svg'}
                            className={`max-w-[200px] min-w-[200px] w-full h-fit`}
                            width={240}
                            height={240}
                            alt='whatsapp logo'
                            fetchpriority='high'
                        />
                    </div>

                    <div className='flex flex-col gap-8 w-full'>
                        <div className={`flex flex-col gap-2 ${tabtype === 'Messages' ? '' : 'hidden'}`}>
                            <div className='flex flex-col md:flex-row w-full justify-between ms:items-center gap-1'>
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
                            <p>{pageData?.tax}</p>
                            {pageData?.adds && <p>{pageData?.adds}</p>}
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

                            <Table
                                data={filteredMessageData}
                                tabtype={tabtype}
                                tabletype='messages'
                                symbol={symbol}
                                className={`${
                                    tabtype === 'Messages' && filteredMessageData?.length > 0 ? '' : 'hidden'
                                }`}
                            />

                            <Table
                                data={filteredVoiceData}
                                tabtype={tabtype}
                                tabletype='voice'
                                symbol={symbol}
                                className={`${tabtype === 'Voice' && filteredVoiceData?.length > 0 ? '' : 'hidden'}`}
                            />
                        </div>
                    </div>

                    <ConnectWithTeam
                        product='WhatsApp'
                        pageData={pageData?.connectComp}
                        href='whatsapp'
                        isPlan={true}
                    />
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

function Table({ data, symbol, className, tabletype }) {
    const isMessageTable = tabletype === 'messages';

    return (
        <div className={`overflow-y-scroll h-[700px] scrollbar-none ${className}`}>
            <table className={`table bg-white rounded w-full ${tabletype}`}>
                <thead className='sticky top-0 bg-white z-10'>
                    <tr className='font-bold text-[16px] text-black'>
                        <th className='border-r text-left'>Market</th>
                        <th className='border-r text-left'>Prefix</th>
                        {isMessageTable && <th className='border-r text-left'>Marketing</th>}
                        {isMessageTable && <th className='border-r text-left'>Utility</th>}
                        {isMessageTable && <th className='text-left'>Authentication</th>}
                        {!isMessageTable && <th>Charges (per minute)</th>}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        const formatRate = (rate) =>
                            !isNaN(parseFloat(rate)) ? `${symbol}${parseFloat(rate).toFixed(5)}` : 'N/A';

                        return (
                            <tr className={`${styles.table_row}`} key={index}>
                                <td className='border-r'>{item?.country_name}</td>
                                <td className='border-r'>{item?.prefix === 0 ? 'N/A' : item?.prefix}</td>
                                {isMessageTable && <td className='border-r'>{formatRate(item?.marketing_rate)}</td>}
                                {isMessageTable && <td className='border-r'>{formatRate(item?.utility_rate)}</td>}
                                {isMessageTable && <td>{formatRate(item?.authentication_rate)}</td>}
                                {!isMessageTable && <td>{formatRate(item?.charges)}</td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
