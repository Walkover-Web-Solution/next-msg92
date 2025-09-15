import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';
import getURL from '@/utils/getURL';
import Image from 'next/image';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import CalculatePricingWhatsApp from './CalculatePricingWhatsApp/CalculatePricingWhatsApp';
import styles from './PricingWhatsApp.module.scss';

export default function PricingWhatsApp({ pricingData, pageData, pageInfo }) {
    console.log('⚡️ ~ :12 ~ PricingWhatsApp ~ pageInfo:', pageInfo);
    const { symbol, currency } = GetCurrencySymbol(pageInfo?.country);
    const currentCountry = GetCountryDetails({ shortname: pageInfo?.country, type: 'shortname' });

    console.log('⚡️ ~ :15 ~ PricingWhatsApp ~ currentCountry:', currentCountry);
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
                            className='w-[140px] h-fit hidden lg:block'
                            width={400}
                            height={400}
                            alt='whatsapp logo'
                        />
                    </div>
                    <div className='flex flex-col gap-8 w-full'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col md:flex-row w-full justify-between ms:items-center gap-1'>
                                {pageData?.heading && <h2 className='text-2xl font-bold '>{pageData?.heading} </h2>}
                                {pricingData && pricingData?.length > 0 && (
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

                        {pricingData && pricingData?.length > 0 && (
                            <div className={styles?.table_cont}>
                                <table className={styles?.table}>
                                    <thead>
                                        <tr className={`${styles.table_row} font-bold border-b`}>
                                            <th className='border-r text-left'>Market</th>
                                            <th className='border-r text-left'>Prefix</th>
                                            <th className='border-r text-left'>Marketing</th>
                                            <th className='border-r text-left'>Utility</th>
                                            <th className='text-left'>Authentication</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pricingData?.map((item, index) => {
                                            if (currentCountry.name === item.country_name) {
                                                return (
                                                    <RowComp
                                                        item={item}
                                                        index={index}
                                                        symbol={symbol}
                                                        key={`current-${index}`}
                                                    />
                                                );
                                            }
                                        })}
                                        {pricingData?.map((item, index) => {
                                            if (item.country_name === 'Default') {
                                                return (
                                                    <RowComp
                                                        item={item}
                                                        index={index}
                                                        symbol={symbol}
                                                        key={`default-${index}`}
                                                    />
                                                );
                                            }
                                        })}
                                        {pricingData?.map((item, index) => {
                                            if (
                                                item?.country_name &&
                                                currentCountry?.name !== item?.country_name &&
                                                item.country_name !== 'Default'
                                            ) {
                                                return (
                                                    <RowComp
                                                        item={item}
                                                        index={index}
                                                        symbol={symbol}
                                                        key={`other-${index}`}
                                                    />
                                                );
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <ConnectWithTeam
                        product={'WhatsApp'}
                        data={pageData?.connectComp}
                        href={'whatsapp'}
                        isPlan={true}
                    />
                </div>
            </div>
            {pricingData && pricingData?.length > 0 && (
                <dialog id='calculate_whatsapp_pricing' className='modal'>
                    <CalculatePricingWhatsApp
                        plans={pricingData}
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
        <tr className={`${styles.table_row}`}>
            <td className='border-r'>{item?.country_name}</td>
            <td className='border-r'>{item?.prefix === 0 ? 'N/A' : item?.prefix}</td>
            <td className='border-r'>{formatRate(item?.marketing_rate)}</td>
            <td className='border-r'>{formatRate(item?.utility_rate)}</td>
            <td className=''>{formatRate(item?.authentication_rate)}</td>
        </tr>
    );
}
