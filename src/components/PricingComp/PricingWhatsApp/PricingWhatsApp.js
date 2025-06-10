import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';
import getURL from '@/utils/getURL';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import CalculatePricingWhatsApp from './CalculatePricingWhatsApp/CalculatePricingWhatsApp';
import styles from './PricingWhatsApp.module.scss';

export default function PricingWhatsApp({ country, data }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const currentCountry = GetCountryDetails({ shortname: country, type: 'shortname' });
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState();

    useEffect(() => {
        const getWhatsAppPricing = async () => {
            setLoading(true);

            try {
                const response = await axios.get(`${process.env.WHATSAPP_PRICING_URL}/${currency}`);
                setPlans(response?.data?.data.sort((a, b) => a.country_name.localeCompare(b.country_name)));
                setLoading(false);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
                setLoading(false);
            }
        };
        getWhatsAppPricing();
    }, []);
    return (
        <>
            <div className='flex flex-col gap-3 max-w-full w-full overflow-hidden'>
                <h1 className='text-2xl md:text-3xl font-semibold capitalize'>WhatsApp Pricing</h1>
                <div className='flex flex-col w-full gap-8'>
                    <div className='flex flex-col-reverse lg:flex-row justify-between w-full sm:p- lg:p-8 sm:rounded h-fit sm:bg-white'>
                        <div className='flex flex-col gap-2 sm:gap-4'>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-xl md:text-3xl font-semibold'>
                                    <span className='text-green-600  font-bold text-2xl md:text-4xl'>Zero</span> margin
                                    on meta price.
                                </h2>
                                {country === 'in' && <p className='txt-sm md:text-lg'>GST excluded.</p>}
                                {country === 'gb' && <p className='txt-sm md:text-lg'>VAT excluded.</p>}
                            </div>
                            <a href={getURL('signup', 'whatsapp')} className='w-fit' target='_blank'>
                                <button className='btn btn-primary btn-md'>Get Started</button>
                            </a>
                        </div>
                        <Image
                            src={'/assets/icons/extras/whatsapp-black.svg'}
                            className='w-[140px] h-fit hidden lg:block'
                            width={400}
                            height={400}
                            alt='whatsapp logo'
                        />
                    </div>
                    <div className='flex flex-col gap-8 w-full'>
                        {(data?.heading || data?.tax || data?.adds) && (
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col md:flex-row w-full justify-between ms:items-center gap-1'>
                                    {data?.heading && <h2 className='text-2xl font-bold '>{data?.heading} </h2>}
                                    {plans && plans?.length > 0 && (
                                        <button
                                            onClick={() =>
                                                document.getElementById('calculate_whatsapp_pricing').showModal()
                                            }
                                            className='btn btn-accent btn-outline w-fit btn-sm'
                                        >
                                            Calculate
                                        </button>
                                    )}
                                </div>
                                <p>{data?.tax}</p>
                                {data?.adds && <p>{data?.adds}</p>}
                            </div>
                        )}

                        {!loading ? (
                            <div className={styles?.table_cont}>
                                {plans && plans?.length > 0 && (
                                    <div className={styles?.table}>
                                        <div className={`${styles.table_row} font-bold border-b`}>
                                            <span className='border-r'>Market</span>
                                            <span className='border-r'>Prefix</span>
                                            <span className='border-r'>Marketing</span>
                                            <span className='border-r'>Utility</span>
                                            <span className='border-r'>Authentication</span>
                                            <span className='border-r'>Service</span>
                                            <span className=''>MM Lite</span>
                                        </div>
                                        {plans?.map((item, index) => {
                                            if (currentCountry.name === item.country_name) {
                                                return <RowComp item={item} index={index} symbol={symbol} />;
                                            }
                                        })}
                                        {plans?.map((item, index) => {
                                            if (item.country_name === 'Default') {
                                                return <RowComp item={item} index={index} symbol={symbol} />;
                                            }
                                        })}

                                        {plans?.map((item, index) => {
                                            if (
                                                item?.country_name &&
                                                currentCountry?.name !== item?.country_name &&
                                                item.country_name !== 'Default'
                                            ) {
                                                return <RowComp item={item} index={index} symbol={symbol} />;
                                            }
                                        })}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='cont cont_gap p-4 bg-white w-full'>
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <div key={index} className='flex gap-4'>
                                        {Array.from({ length: 7 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className='skeleton bg-gray-500 text-gray-400 w-full h-6 rounded-sm'
                                            ></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <ConnectWithTeam product={'WhatsApp'} data={data?.connectComp} href={'whatsapp'} isPlan={true} />
                </div>
            </div>
            {plans && plans?.length > 0 && (
                <dialog id='calculate_whatsapp_pricing' className='modal'>
                    <CalculatePricingWhatsApp
                        plans={plans}
                        currentCountry={currentCountry}
                        currency={currency}
                        symbol={symbol}
                    />
                </dialog>
            )}
        </>
    );
}

function RowComp({ item, index, symbol }) {
    const formatRate = (rate) => (!isNaN(parseFloat(rate)) ? `${symbol}${parseFloat(rate).toFixed(5)}` : 'N/A');
    return (
        <div className={`${styles.table_row}  `} key={index}>
            <span className='border-r'>{item?.country_name}</span>
            <span className='border-r'>{item?.prefix === 0 ? 'N/A' : item?.prefix}</span>
            <span className='border-r'>{formatRate(item?.marketing_rate)}</span>
            <span className='border-r'>{formatRate(item?.utility_rate)}</span>
            <span className='border-r'>{formatRate(item?.authentication_rate)}</span>
            <span className='border-r'>{formatRate(item?.user_initiated_rate)}</span>
            <span>{formatRate(item?.mm_lite_rate)}</span>
        </div>
    );
}
