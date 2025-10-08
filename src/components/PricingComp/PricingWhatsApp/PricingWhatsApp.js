import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';
import getURL from '@/utils/getURL';
import Image from 'next/image';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import CalculatePricingWhatsApp from './CalculatePricingWhatsApp/CalculatePricingWhatsApp';
import styles from './PricingWhatsApp.module.scss';
import { useState, useMemo, useEffect } from 'react';
import { MdArrowForward, MdCircle } from 'react-icons/md';

export default function PricingWhatsApp({ pricingData, pageData, pageInfo }) {
    const { symbol, currency } = GetCurrencySymbol(pageInfo?.country);
    const currentCountry = GetCountryDetails({ shortname: pageInfo?.country, type: 'shortname' });
    const [tabtype, setTabtype] = useState('Messages');
    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    let voiceData = pricingData?.voicePricing;
    const messageData = useMemo(() => {
        let sorted = pricingData?.messagePricing;
        const index = sorted?.findIndex((item) => item.country_name === currentCountry?.name);
        if (index > -1) {
            const [current] = sorted.splice(index, 1);
            sorted.unshift(current);
        }
        return sorted;
    }, [pricingData, currentCountry]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 1000);
        return () => clearTimeout(handler);
    }, [searchText]);

    const filteredMessageData = useMemo(() => {
        if (!debouncedSearch) return pricingData?.messagePricing;
        return pricingData?.messagePricing.filter((item) =>
            item.country_name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [debouncedSearch, pricingData]);

    const filteredVoiceData = useMemo(() => {
        if (!debouncedSearch) return voiceData;
        return voiceData?.filter((item) => item?.country_name?.toLowerCase()?.includes(debouncedSearch.toLowerCase()));
    }, [debouncedSearch, voiceData]);
    return (
        <>
            <div className='flex flex-col gap-3 max-w-full w-full overflow-hidden'>
                <h1 className='text-2xl md:text-3xl font-semibold capitalize'>WhatsApp Pricing</h1>
                <div role='tablist' className='tabs tabs-boxed p-0 w-fit'>
                    <span
                        role='tab'
                        className={`tab ${tabtype === 'Messages' && 'tab-active'}`}
                        onClick={() => {
                            setTabtype('Messages');
                        }}
                    >
                        Messages
                    </span>
                    <span
                        role='tab'
                        className={`tab ${tabtype === 'Voice' && 'tab-active'}`}
                        onClick={() => {
                            setTabtype('Voice');
                        }}
                    >
                        Voice
                    </span>
                </div>
                <div className='flex flex-col w-full gap-8'>
                    <div className='flex flex-col-reverse lg:flex-row justify-between w-full sm:p- lg:p-8 sm:rounded h-fit sm:bg-white'>
                        {pageData?.whatsappVoice && (
                            <div className={`${tabtype === 'Voice' ? '' : 'hidden'} flex flex-col gap-1`}>
                                <h2 className='text-2xl font-bold'> {pageData?.whatsappVoice?.heading} </h2>
                                <p> {pageData?.whatsappVoice?.description}</p>
                                <ul>
                                    {pageData?.whatsappVoice?.content?.map((item, index) => (
                                        <div className='flex gap-2 ps-3 font-semibold items-center'>
                                            <MdArrowForward size={10} /> <li key={index}> {item}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className={`flex flex-col gap-2 sm:gap-4 ${tabtype === 'Messages' ? '' : 'hidden'}`}>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-xl md:text-3xl font-semibold'>
                                    <span className='text-green-600  font-bold text-2xl md:text-4xl'>Zero</span> margin
                                    on meta price.
                                </h2>
                                {currentCountry?.name === 'India' && <p className='txt-sm md:text-lg'>GST excluded.</p>}
                                {currentCountry?.name === 'United Kingdom' && (
                                    <p className='txt-sm md:text-lg'>VAT excluded.</p>
                                )}
                            </div>
                            <a href={getURL('signup', 'whatsapp')} className='w-fit' target='_blank'>
                                <button className='btn btn-primary btn-md'>Get Started</button>
                            </a>
                        </div>
                        <Image
                            src={'/assets/icons/extras/whatsapp-black.svg'}
                            className={`w-[140px] h-fit lg:block`}
                            width={400}
                            height={400}
                            alt='whatsapp logo'
                        />
                    </div>
                    <div className='flex flex-col gap-8 w-full'>
                        <div className={`flex flex-col gap-2 ${tabtype === 'Messages' ? '' : 'hidden'}`}>
                            <div className='flex flex-col md:flex-row w-full justify-between ms:items-center gap-1 '>
                                {pageData?.heading && <h2 className='text-2xl font-bold '>{pageData?.heading} </h2>}
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
                        <div>
                            <input
                                type='text'
                                placeholder='Search country...'
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className='border p-2 rounded mb-4 w-full max-w-[300px] hover'
                            />
                            {messageData && messageData?.length > 0 && (
                                // <div className={styles?.table_cont}>
                                //     <table className={styles?.table}>
                                //         <thead>
                                //             <tr className={`${styles.table_row} font-bold border-b`}>
                                //                 <th className='border-r text-left'>Market</th>
                                //                 <th className='border-r text-left'>Prefix</th>
                                //                 <th className='border-r text-left'>Marketing</th>
                                //                 <th className='border-r text-left'>Utility</th>
                                //                 <th className='text-left'>Authentication</th>
                                //             </tr>
                                //         </thead>
                                //         <tbody>
                                //             {messageData?.map((item, index) => {
                                //                 if (currentCountry.name === item.country_name) {
                                //                     return (
                                //                         <RowComp
                                //                             item={item}
                                //                             index={index}
                                //                             symbol={symbol}
                                //                             key={`current-${index}`}
                                //                         />
                                //                     );
                                //                 }
                                //             })}
                                //             {messageData?.map((item, index) => {
                                //                 if (item.country_name === 'Default') {
                                //                     return (
                                //                         <RowComp
                                //                             item={item}
                                //                             index={index}
                                //                             symbol={symbol}
                                //                             key={`default-${index}`}
                                //                         />
                                //                     );
                                //                 }
                                //             })}
                                //             {messageData?.map((item, index) => {
                                //                 if (
                                //                     item?.country_name &&
                                //                     currentCountry?.name !== item?.country_name &&
                                //                     item.country_name !== 'Default'
                                //                 ) {
                                //                     return (
                                //                         <RowComp
                                //                             item={item}
                                //                             index={index}
                                //                             symbol={symbol}
                                //                             key={`other-${index}`}
                                //                         />
                                //                     );
                                //                 }
                                //             })}
                                //         </tbody>
                                //     </table>
                                // </div>
                                <>
                                    <Table
                                        data={filteredMessageData}
                                        tabtype={tabtype}
                                        tabletype={'messages'}
                                        symbol={symbol}
                                        className={tabtype === 'Messages' ? '' : 'hidden'}
                                    />
                                </>
                            )}
                            {voiceData && voiceData?.length > 0 && (
                                <Table
                                    data={filteredVoiceData}
                                    tabtype={tabtype}
                                    tabletype='voice'
                                    symbol={symbol}
                                    className={tabtype === 'Voice' ? '' : ' hidden'}
                                />
                            )}
                        </div>
                    </div>
                    <ConnectWithTeam
                        product={'WhatsApp'}
                        pageData={pageData?.connectComp}
                        href={'whatsapp'}
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
        <div className={`overflow-y-scroll h-[700px]  ${className}`}>
            <table className={`table bg-white rounded w-full  ${tabletype}`}>
                <thead className='sticky top-0 bg-white z-10'>
                    <tr className='font-bold text-[16px] text-black'>
                        <th className='border-r text-left'>Market</th>
                        <th className='border-r text-left'>Prefix</th>
                        {isMessageTable && <th className='border-r text-left'>Marketing</th>}
                        {isMessageTable && <th className='border-r text-left'>Utility</th>}
                        {isMessageTable && <th className='text-left'>Authentication</th>}
                        {!isMessageTable && <th className=''>Charges</th>}
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
                                {isMessageTable && <td className=''>{formatRate(item?.authentication_rate)}</td>}
                                {!isMessageTable && <td className=''>{item?.charges}</td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
