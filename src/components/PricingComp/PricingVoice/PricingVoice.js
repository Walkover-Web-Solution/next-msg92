import { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import countries from '@/data/countries.json';
import { MdCheck } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import axios from 'axios';

export default function PricingVoice({ data }) {
    const [countryData, setCountryData] = useState();
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [currencyCode, setCurrencyCode] = useState();
    const [symbol, setSymbol] = useState();
    const [plans, setPlans] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [dialPlan, setDialPlan] = useState();
    const [loadingExport, setLoadingExport] = useState(false);

    //fetch Counties
    useEffect(() => {
        fetchCountryData();
    }, []);

    const fetchCountryData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_VOICE_API_BASE_URL}/public/country/`);
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

    // Set Country code
    useEffect(() => {
        const selectedCountryData = countries.find((country) => country?.shortname === selectedCountry?.country_code);
        if (selectedCountryData) {
            setCurrencyCode(selectedCountryData?.currency);
        }
    }, [selectedCountry]);

    // Set Currency Symbol
    useEffect(() => {
        if (currencyCode) {
            fetchDialPlan(currencyCode);
            setSymbol(GetCurrencySymbol(currencyCode));
        }
    }, [currencyCode]);

    //fetch dialPlan
    const fetchDialPlan = async (currencyCode) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_VOICE_API_BASE_URL}/public/dialplanPricing/?currency=${currencyCode}`
            );
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
    }, [dialPlan]);

    const fetchData = async (selectedCountry, dialPlan) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_VOICE_API_BASE_URL}/public/pricing/?cid=${selectedCountry}&dialplan_id=${dialPlan}`
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
                `${process.env.NEXT_PUBLIC_VOICE_API_BASE_URL}/public/pricing/?cid=${selectedCountry?.id}&dialplan_id=${dialPlan}&export=1`
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
        setSelectedCountry(item);
    };

    const formatResult = (item) => {
        return (
            <>
                <span className=''>{item?.name}</span>
            </>
        );
    };

    return (
        <>
            <div className='w-full flex flex-col gap-10'>
                <div className='w-full flex flex-col gap-4'>
                    <div className='w-[300px] z-50'>
                        <ReactSearchAutocomplete
                            items={countryData}
                            onSelect={handleOnSelect}
                            showIcon={false}
                            formatResult={formatResult}
                            className={'pricing-country-input'}
                            placeholder={'Select a country'}
                            menuStyle={{
                                borderRadius: '3px',
                                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                padding: '2px 0',
                                fontSize: '90%',
                                position: 'fixed',
                                overflow: 'auto',
                                maxHeight: '50%',
                            }}
                        />
                    </div>
                    <h1 className='text-xl font-semibold'>{data?.heading}</h1>
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
                                                {item?.international_rates_min !== item?.international_rates_max && (
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
                                                {!item?.international_rates_min && !item?.international_rates_max && (
                                                    <>-</>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            {loading &&
                                Array.from({ length: 5 }).map((_, index) => {
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
                                })}
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

                    <p className='text-lg' dangerouslySetInnerHTML={{ __html: data?.addOns?.freeText }}></p>
                </div>
                <button className='btn btn-primary btn-md'>Get started</button>

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

                <ConnectWithTeam product={'voice'} data={data?.connectComp} isPlan={true} />
                <FaqsComp data={data?.faqComp} notCont={true} />
            </div>
        </>
    );
}
