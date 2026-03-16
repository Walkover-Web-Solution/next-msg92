import { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import getURL from '@/utils/getURL';
import GetCountryDetails from '@/utils/getCurrentCountry';
import countries from '@/data/countries.json';
import CalculateVoicePricing from './CalculateVoicePricing/CalculateVoicePricing';

export default function PricingVoice({ data, country }) {
    const [countryData, setCountryData] = useState([]);
    const currentCountry = GetCountryDetails({ shortname: country, type: 'shortname' });
    const [selectedCountry, setSelectedCountry] = useState(currentCountry?.name);
    const [plans, setPlans] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [dialPlan, setDialPlan] = useState();
    const [loadingExport, setLoadingExport] = useState(false);
    const [currency, setCurrency] = useState();
    const [symbol, setSymbol] = useState();

    //fetch Counties
    useEffect(() => {
        fetchCountryData();
    }, []);

    const fetchCountryData = async () => {
        try {
            const response = await fetch(`${process.env.VOICE_API_URL}/public/country/`);
            if (response.ok) {
                const data = await response.json();
                setCountryData(data);
            } else {
                throw new Error('Currently we only have plan for India(91)');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (countryData?.length > 0) {
            setSelectedCountry(
                countryData?.find(
                    (item) => item?.country_code?.toLowerCase() === currentCountry?.shortname?.toLowerCase()
                )
            );
        }
    }, [countryData]);

    // Set Currency Symbol
    useEffect(() => {
        if (selectedCountry && selectedCountry?.id) {
            const { currency, symbol } = GetCurrencySymbol(selectedCountry?.country_code);
            setCurrency(currency === 'INR' ? 'INR' : 'USD');
            setSymbol(currency === 'INR' ? '₹' : '$');
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (currency) {
            fetchDialPlan(currency);
        }
    }, [currency]);

    //fetch dialPlan
    const fetchDialPlan = async (currency) => {
        try {
            const response = await fetch(`${process.env.VOICE_API_URL}/public/dialplanPricing/?currency=${currency}`);
            if (response.ok) {
                const data = await response.json();

                setDialPlan(data?.data.dialplan_id);
            } else {
                throw new Error('Currently we only have plan for India(91)');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // fetch Plans
    useEffect(() => {
        if (selectedCountry && selectedCountry?.id && dialPlan) {
            fetchData(selectedCountry?.id, dialPlan);
        }
    }, [dialPlan, selectedCountry]);

    const fetchData = async (selectedCountry, dialPlan) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.VOICE_API_URL}/public/pricing/?cid=${selectedCountry}&dialplan_id=${dialPlan}`
            );
            if (response.ok) {
                const data = await response.json();
                setPlans(data?.data);
            } else {
                throw new Error('Currently we only have plan for India(91)');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    //export function
    async function exportPricing() {
        setLoadingExport(true);

        try {
            const response = await axios.get(
                `${process.env.VOICE_API_URL}/public/pricing/?cid=${selectedCountry?.id}&dialplan_id=${dialPlan}&export=1`
            );
            if (response) {
                setLoadingExport(false);
                if (response?.data?.data?.url) {
                    window.location.href = response.data.data.url;
                }
            }
        } catch (e) {
            console.log(e, 'error in my function');
        } finally {
            setLoadingExport(false);
        }
    }

    //Auto complete functions
    const handleOnSelect = (item) => {
        setSelectedCountry(item[0]);
    };

    return (
        <>
            <div className='flex flex-col gap-6 w-full'>
                <h1 className='text-2xl md:text-3xl font-bold capitalize'>Voice Pricing</h1>

                <div className='w-full flex flex-col gap-8'>
                    {/* Country selector + rates table */}
                    <div className='w-full flex flex-col gap-4'>
                        {countryData.length > 0 && (
                            <div className='w-[300px] z-50'>
                                <Typeahead
                                    className='country-typehead'
                                    id='origin-country'
                                    placeholder='Origin Country'
                                    labelKey='name'
                                    onChange={(selected) => {
                                        handleOnSelect(selected);
                                    }}
                                    options={countryData}
                                    defaultSelected={[
                                        countries?.find((item) => item.shortname === currentCountry?.shortname),
                                    ]}
                                    inputProps={{
                                        autoComplete: 'off',
                                    }}
                                />
                            </div>
                        )}

                        <div className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-3'>
                                {data?.heading && (
                                    <h2 className='text-base font-semibold text-slate-700'>{data?.heading}</h2>
                                )}
                                {(country === 'in' || country === 'gb') && (
                                    <span className='text-xs text-slate-400 font-medium'>
                                        {country === 'in' ? '(GST excluded)' : '(VAT excluded)'}
                                    </span>
                                )}
                            </div>
                            {plans && (
                                <button
                                    onClick={() => document.getElementById('calculate_voice_pricing').showModal()}
                                    className='py-2 px-4 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold bg-indigo-50 hover:bg-indigo-100 transition-colors'
                                >
                                    Calculate
                                </button>
                            )}
                        </div>

                        <div className='w-full overflow-x-auto'>
                            <div className='overflow-y-auto rounded-xl border border-slate-200 bg-white'>
                                <table className='table-fixed min-w-max w-full border-collapse text-sm'>
                                    <thead className='sticky top-0 z-30 bg-slate-50'>
                                        <tr className='border-b border-slate-200'>
                                            <th className='min-w-[200px] px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50 z-40 border-r border-slate-200'>
                                                Recipient&apos;s Network
                                            </th>
                                            <th className='min-w-[150px] px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-r border-slate-200'>
                                                Local Rates
                                            </th>
                                            <th className='min-w-[150px] px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider'>
                                                International Rates
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plans &&
                                            plans.map((item, index) => {
                                                const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50';
                                                return (
                                                    <tr
                                                        key={index}
                                                        className={`border-b border-slate-100 last:border-b-0 ${rowBg}`}
                                                    >
                                                        <td
                                                            className={`px-4 py-2.5 text-xs font-medium text-slate-700 sticky left-0 ${rowBg} z-20 border-r border-slate-100`}
                                                        >
                                                            {item?.network}
                                                        </td>
                                                        <td className='px-4 py-2.5 text-xs text-slate-600 border-r border-slate-100'>
                                                            {item?.local_rates_min ? (
                                                                <>
                                                                    {symbol}
                                                                    {item?.local_rates_min}
                                                                    {item?.local_rates_min !== item?.local_rates_max &&
                                                                        item?.local_rates_max && (
                                                                            <>
                                                                                {' '}
                                                                                &ndash; {symbol}
                                                                                {item?.local_rates_max}
                                                                            </>
                                                                        )}
                                                                </>
                                                            ) : (
                                                                'N/A'
                                                            )}
                                                        </td>
                                                        <td className='px-4 py-2.5 text-xs text-slate-600'>
                                                            {item?.international_rates_min ? (
                                                                <>
                                                                    {symbol}
                                                                    {item?.international_rates_min}
                                                                    {item?.international_rates_min !==
                                                                        item?.international_rates_max &&
                                                                        item?.international_rates_max && (
                                                                            <>
                                                                                {' '}
                                                                                &ndash; {symbol}
                                                                                {item?.international_rates_max}
                                                                            </>
                                                                        )}
                                                                </>
                                                            ) : (
                                                                'N/A'
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        {loading &&
                                            Array.from({ length: 5 }).map((_, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                                                >
                                                    <td className='px-4 py-2.5 sticky left-0 bg-inherit border-r border-slate-100'>
                                                        <div className='h-4 w-2/3 bg-slate-100 rounded animate-pulse' />
                                                    </td>
                                                    <td className='px-4 py-2.5 border-r border-slate-100'>
                                                        <div className='h-4 w-1/3 bg-slate-100 rounded animate-pulse' />
                                                    </td>
                                                    <td className='px-4 py-2.5'>
                                                        <div className='h-4 w-1/3 bg-slate-100 rounded animate-pulse' />
                                                    </td>
                                                </tr>
                                            ))}
                                        {!loading && plans?.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className='px-4 py-8 text-center text-sm text-slate-400'
                                                >
                                                    No plans available for this country.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {data?.exportData && (
                            <p className='text-sm text-slate-600'>
                                {data?.exportData?.content}
                                {loadingExport ? (
                                    <span className='text-indigo-400 ml-1'>{data?.exportData?.waiting}</span>
                                ) : (
                                    <span
                                        onClick={exportPricing}
                                        className='text-indigo-600 font-medium cursor-pointer hover:text-indigo-800 ml-1 transition-colors'
                                    >
                                        {data?.exportData?.export}
                                    </span>
                                )}
                            </p>
                        )}
                    </div>

                    {/* Add-ons card */}
                    {(data?.addOns?.content?.length > 0 || data?.addOns?.freeText) && (
                        <div className='w-full flex flex-col gap-4 p-6 bg-white rounded-2xl border border-slate-200'>
                            {data?.addOns?.content?.length > 0 && (
                                <>
                                    <h2 className='text-base font-semibold text-slate-900'>
                                        {data?.addOns?.heading || 'Add-on services'}
                                    </h2>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                                        {data?.addOns?.content.map((item, index) => (
                                            <div key={index} className='flex items-center gap-2 text-sm text-slate-600'>
                                                <MdCheck size={15} className='text-indigo-400 shrink-0' />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            {data?.addOns?.freeText && (
                                <div
                                    className='text-sm text-slate-600'
                                    dangerouslySetInnerHTML={{ __html: data?.addOns?.freeText }}
                                />
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    <a
                        href={getURL('signup', 'voice')}
                        target='_blank'
                        className='w-fit py-2.5 px-6 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors'
                    >
                        Get started
                    </a>

                    {/* Rate notes */}
                    {data?.rates?.length > 0 && (
                        <div className='flex flex-col gap-2'>
                            {data.rates.map((rate, index) => (
                                <p key={index} className='text-sm text-slate-600'>
                                    <span className='font-semibold text-slate-800'>{rate?.heading}: </span>
                                    {rate?.content}
                                </p>
                            ))}
                        </div>
                    )}

                    <ConnectWithTeam product={'Voice'} pageData={data?.connectComp} href={'voice'} isPlan={true} />
                    <FaqsComp data={data?.faqComp} notCont={true} />
                </div>
            </div>
            {plans?.length > 0 && (
                <dialog id='calculate_voice_pricing' className='modal'>
                    <CalculateVoicePricing plans={plans} currency={currency} symbol={symbol} />
                </dialog>
            )}
        </>
    );
}
