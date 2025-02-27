import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import { InlineWidget } from 'react-calendly';
import CalculatePricingRCS from './CalculatePricingRCS/CalculatePricingRCS';

export default function PricingRCS({ country, data, pageInfo }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const currentCountry = GetCountryDetails({ shortname: country, type: 'shortname' });
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState();
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);

    useEffect(() => {
        const getWhatsAppPricing = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://rcs.phone91.com/get-pricing-data/${currency}`);
                setPlans(
                    response?.data?.data?.pricing_list?.sort((a, b) => a.country_name.localeCompare(b.country_name))
                );
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
            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold capitalize'>RCS Pricing</h1>
                <div className='flex flex-col w-full gap-8'>
                    <div className='p-8 flex flex-col gap-4 bg-white h-full rounded w-full'>
                        <h2 className='text-2xl'>Connect To Our Team For The Customized RCS Message Pricing</h2>
                        <button
                            onClick={() => {
                                setIsSalesModalOpen(true);
                            }}
                            className='btn btn-primary btn-md'
                        >
                            Connect
                        </button>
                    </div>
                    {(plans || loading) && (
                        <>
                            <div className='flex w-full justify-end items-center'>
                                <button
                                    onClick={() => document.getElementById('calculate_rcs_pricing').showModal()}
                                    className='btn btn-accent btn-outline w-fit btn-sm'
                                >
                                    Calculate
                                </button>
                            </div>
                            <div className='flex flex-col gap-8'>
                                <table className='table bg-white rounded'>
                                    <thead>
                                        <tr className='font-bold text-[16px] text-black '>
                                            <th className='w-[300px] border-r'>Market</th>
                                            <th className='border-r'>Prefix</th>
                                            <th className='border-r text-wrap'>Single Text Promotional Rate</th>
                                            <th className='border-r text-wrap'>Single Text Transactional Rate</th>
                                            <th className='border-r text-wrap'>Rich Promotional Rate</th>
                                            <th className='text-wrap'>Rich Transactional Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plans &&
                                            plans.map((item, index) => {
                                                if (currentCountry.name === item.country_name) {
                                                    return (
                                                        <tr className='border-none text-[16px]' key={index}>
                                                            <td className='border-r'>{item?.country_name}</td>
                                                            <td className='border-r'>{item?.country_prefix}</td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.single_text_promotional_rate || 'N/A'}
                                                            </td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.single_text_transactional_rate || 'N/A'}
                                                            </td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.rich_promotional_rate || 'N/A'}
                                                            </td>
                                                            <td className=''>
                                                                {symbol}
                                                                {item?.rich_transactional_rate || 'N/A'}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            })}
                                        {plans &&
                                            plans.map((item, index) => {
                                                if (item.country_name === 'Default') {
                                                    return (
                                                        <tr className='border-none text-[16px]' key={index}>
                                                            <td className='border-r'>{item?.country_name}</td>
                                                            <td className='border-r'>{item?.country_prefix}</td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.single_text_promotional_rate || 'N/A'}
                                                            </td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.single_text_transactional_rate || 'N/A'}
                                                            </td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.rich_promotional_rate || 'N/A'}
                                                            </td>
                                                            <td className=''>
                                                                {symbol}
                                                                {item?.rich_transactional_rate || 'N/A'}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            })}
                                        {plans &&
                                            plans.map((item, index) => {
                                                if (
                                                    item?.country_name &&
                                                    currentCountry?.name !== item?.country_name &&
                                                    item.country_name !== 'Default'
                                                ) {
                                                    return (
                                                        <tr className='border-none text-[16px]' key={index}>
                                                            <td className='border-r'>{item?.country_name}</td>
                                                            <td className='border-r'>{item?.country_prefix}</td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.single_text_promotional_rate || 'N/A'}
                                                            </td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.single_text_transactional_rate || 'N/A'}
                                                            </td>
                                                            <td className='border-r'>
                                                                {symbol}
                                                                {item?.rich_promotional_rate || 'N/A'}
                                                            </td>
                                                            <td className=''>
                                                                {symbol}
                                                                {item?.rich_transactional_rate || 'N/A'}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            })}

                                        {loading &&
                                            Array.from({ length: 20 }).map((_, index) => {
                                                return (
                                                    <tr className='border-none text-[16px]' key={index}>
                                                        <td className='border-r'>
                                                            {' '}
                                                            <div className='skeleton w-2/3 h-[24px]'></div>
                                                        </td>
                                                        <td className='border-r'>
                                                            {' '}
                                                            <div className='skeleton w-2/3 h-[24px]'></div>
                                                        </td>
                                                        <td className='border-r'>
                                                            <div className='skeleton w-2/3 h-[24px]'></div>
                                                        </td>
                                                        <td className='border-r'>
                                                            <div className='skeleton w-2/3 h-[24px]'></div>
                                                        </td>
                                                        <td className='border-r'>
                                                            <div className='skeleton w-2/3 h-[24px]'></div>
                                                        </td>
                                                        <td className=''>
                                                            <div className='skeleton w-2/3 h-[24px]'></div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                    <ConnectWithTeam product={'RCS'} data={data?.connectComp} href={'rcs'} isPlan={false} />
                </div>
            </div>

            {isSalesModalOpen && (
                <dialog id='sales_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsSalesModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget
                            url='https://calendly.com/msg91-rcs/15-min-rcs-meeting'
                            styles={{ height: '680px' }}
                        />
                    </div>
                </dialog>
            )}
            {plans?.length > 0 && (
                <dialog id='calculate_rcs_pricing' className='modal'>
                    <CalculatePricingRCS
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
