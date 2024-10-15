import { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import GetCurrencySymbol from '@/utils/getCurrencySymbol';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function PricingVoice({ data, country }) {
    const [countryData, setCountryData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [plans, setPlans] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [dialPlan, setDialPlan] = useState();
    const [loadingExport, setLoadingExport] = useState(false);
    const { currency, symbol } = GetCurrencySymbol(selectedCountry?.country_code);

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

    useEffect(() => {
        if (countryData?.length > 0) {
            setSelectedCountry(countryData?.find((item) => item?.country_code?.toLowerCase() === country));
        }
    }, [countryData]);

    // Set Currency Symbol
    useEffect(() => {
        if (currency) {
            fetchDialPlan(currency);
        }
    }, [currency]);

    //fetch dialPlan
    const fetchDialPlan = async (currency) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_VOICE_API_BASE_URL}/public/dialplanPricing/?currency=${currency}`
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
    }, [selectedCountry?.id, dialPlan]);

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
        setSelectedCountry(item[0]);
    };

    return (
        <>
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
                                    countryData?.find((item) => item?.country_code?.toLowerCase() === country),
                                ]}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </div>
                    )}
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

                    <div className='text-lg' dangerouslySetInnerHTML={{ __html: data?.addOns?.freeText }}></div>
                </div>
                <a href='https://web.msg91.com/signup?service=voice'>
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

                <ConnectWithTeam product={'voice'} data={data?.connectComp} isPlan={true} />
                <FaqsComp data={data?.faqComp} notCont={true} />
            </div>
        </>
    );
}
