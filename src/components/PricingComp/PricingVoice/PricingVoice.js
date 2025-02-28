import { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
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
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-3xl font-semibold capitalize '>Voice Pricing </h1>
                </div>

                <div className='w-full flex flex-col gap-10'>
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
                        <div className='flex items-center gap-4'>
                            <h2 className='text-xl font-semibold'>{data?.heading}</h2>{' '}
                            <button
                                onClick={() => document.getElementById('calculate_voice_pricing').showModal()}
                                className='btn btn-accent btn-outline w-fit btn-sm'
                            >
                                Calculate
                            </button>
                        </div>
                        {country === 'in' && <p className='text-lg'>GST excluded.</p>}
                        {country === 'gb' && <p className='text-lg'>VAT excluded.</p>}
                        <table className='table bg-white rounded w-full'>
                            <thead>
                                <tr className='font-bold text-[16px] text-black '>
                                    <th className='w-[300px] border-r p-4'>Recipient’s Network</th>
                                    <th className='border-r p-4'>Local rates</th>
                                    <th className='p-4'>International rates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans &&
                                    plans.map((item, index) => {
                                        return (
                                            <tr className='border-none text-[16px]' key={index}>
                                                <td className='border-r p-4'>{item?.network}</td>
                                                <td className='border-r p-4'>
                                                    {' '}
                                                    {item?.local_rates_min && (
                                                        <>
                                                            {symbol}
                                                            {item?.local_rates_min}
                                                        </>
                                                    )}
                                                    {item?.local_rates_min !== item?.local_rates_max && (
                                                        <>
                                                            {' '}
                                                            -{' '}
                                                            {item?.local_rates_max && (
                                                                <>
                                                                    {symbol}
                                                                    {item?.local_rates_max}
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                    {!item?.local_rates_min && !item?.local_rates_max && <>-</>}
                                                </td>
                                                <td className='p-4'>
                                                    {' '}
                                                    {item?.international_rates_min && (
                                                        <>
                                                            {symbol}
                                                            {item?.international_rates_min}
                                                        </>
                                                    )}
                                                    {item?.international_rates_min !==
                                                        item?.international_rates_max && (
                                                        <>
                                                            {' '}
                                                            -{' '}
                                                            {item?.international_rates_max && (
                                                                <>
                                                                    {symbol}
                                                                    {item?.international_rates_max}
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                    {!item?.international_rates_min &&
                                                        !item?.international_rates_max && <>-</>}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {loading
                                    ? Array.from({ length: 5 }).map((_, index) => {
                                          return (
                                              <tr className='border-none text-[16px]' key={index}>
                                                  <td className='border-r p-4'>
                                                      <div className='skeleton w-2/3 h-[24px]'></div>
                                                  </td>
                                                  <td className='border-r p-4'>
                                                      <div className='skeleton w-1/3 h-[24px]'></div>
                                                  </td>
                                                  <td className='p-4'>
                                                      <div className='skeleton w-1/3 h-[24px]'></div>
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : plans?.length === 0 && (
                                          <tr className='border-none text-[16px]'>
                                              <td className='border-r p-4'>-</td>
                                              <td className='border-r p-4'>-</td>
                                              <td className='p-4'>-</td>
                                          </tr>
                                      )}
                            </tbody>
                        </table>
                        {data?.exportData && (
                            <p className='font-medium'>
                                {data?.exportData?.content}
                                {loadingExport ? (
                                    <span className='active-link'>{data?.exportData?.waiting}</span>
                                ) : (
                                    <span onClick={exportPricing} className='text-link active-link'>
                                        {data?.exportData?.export}
                                    </span>
                                )}
                            </p>
                        )}
                    </div>
                    <div className='w-full flex flex-col gap-4 p-8 bg-white rounded'>
                        {data?.addOns?.content && data?.addOns?.content.length > 0 && (
                            <>
                                <h2 className='text-lg font-semibold'>{data?.addOns?.heading || 'Add-on services'}</h2>
                                <div className='grid grid-cols-2 gap-4'>
                                    {data?.addOns?.content.map((item, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-1'>
                                                <MdCheck color='#29a653' fontSize={22} /> <p>{item}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        <div className='text-lg' dangerouslySetInnerHTML={{ __html: data?.addOns?.freeText }}></div>
                    </div>
                    <a href={getURL('signup', 'voice')} target='_blank'>
                        <button className='btn btn-primary btn-md'>Get started</button>
                    </a>

                    <div className='flex flex-col gap-4'>
                        {data?.rates &&
                            data?.rates.length > 0 &&
                            data?.rates.map((rate, index) => {
                                return (
                                    <p key={index}>
                                        <strong>{rate?.heading}: </strong>
                                        {rate?.content}
                                    </p>
                                );
                            })}
                    </div>

                    <ConnectWithTeam product={'Voice'} data={data?.connectComp} href={'voice'} isPlan={true} />
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
