import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import ConnectWithTeam from '../ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import countries from '@/data/countries.json';
import { Typeahead } from 'react-bootstrap-typeahead';
import GetCurrencySymbol from '@/utils/pricing/getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';
import getURL from '@/utils/getURL';

export default function PricingSMSOTP({ data, type, country, initialData }) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const currentCountry = GetCountryDetails({ shortname: country, type: 'shortname' });
    const defaultOrigin = initialData?.origin || currentCountry?.name;

    const pricingEnv = type === 'sms' ? 4 : process.env.PRICING_URL === 'https://test.msg91.com' ? 19 : 106;

    const [loading, setLoading] = useState(!initialData?.pricingData);
    const [pricingData, setPricingData] = useState(initialData?.pricingData || null);
    const [origin, setOrigin] = useState(defaultOrigin);
    const [destination, setDestination] = useState(initialData?.destination || currentCountry?.name);
    const [noOfSmsArray, setNoOfSmsArray] = useState(() => {
        if (!initialData?.pricingData) return [];
        return [...initialData.pricingData].sort((a, b) => a[pricingEnv]?.totalNoOfSms - b[pricingEnv]?.totalNoOfSms);
    });
    const [amountArray, setAmountArray] = useState(
        initialData?.amountArray ||
            (defaultOrigin === 'India' && currency === 'INR'
                ? ['1250', '3300', '5400', '10200', '20000', '76500', '154000']
                : ['5000'])
    );
    const [per, setPer] = useState(
        defaultOrigin === 'India' &&
            (initialData?.destination || currentCountry?.name) === 'India' &&
            currency === 'INR' &&
            type === 'sms'
    );

    //slider states
    const [sliderValue, setSliderValue] = useState(2);

    useEffect(() => {
        if (pricingData) {
            setNoOfSmsArray([...pricingData].sort((a, b) => a[pricingEnv]?.totalNoOfSms - b[pricingEnv]?.totalNoOfSms));
        }
    }, [pricingData]);

    // Initial fetch only when SSR did not provide data
    useEffect(() => {
        if (!initialData?.pricingData) {
            loadPricingData(origin, destination);
        }
    }, []);

    // Fetch pricing for a given origin/destination (used on country change)
    const loadPricingData = async (newOrigin, newDestination) => {
        const newAmountArray =
            newOrigin === 'India' && currency === 'INR'
                ? ['1250', '3300', '5400', '10200', '20000', '76500', '154000']
                : ['5000'];
        setAmountArray(newAmountArray);
        setPer(newOrigin === 'India' && newDestination === 'India' && currency === 'INR' && type === 'sms');
        setLoading(true);
        try {
            const data = await GetSmsOtpPricing(newAmountArray, currency, newOrigin, newDestination);
            setPricingData(data);
        } catch (error) {
            console.error('Error fetching SMS OTP pricing:', error);
        } finally {
            setLoading(false);
        }
    };

    const contvertToLocal = (number) => {
        if (currency === 'INR') {
            {
                return Number(number).toLocaleString('en-IN');
            }
        } else {
            {
                return Number(number).toLocaleString('en-US');
            }
        }
    };
    const PricingToShow =
        noOfSmsArray[sliderValue] && noOfSmsArray[sliderValue][pricingEnv]
            ? Number(noOfSmsArray[sliderValue][pricingEnv].totalNoOfSms) *
              Number(noOfSmsArray[sliderValue][pricingEnv].rate)
            : 0;

    //Auto complete functions
    const handleOnSelectOrigin = (item) => {
        const newOrigin = item[0]?.name;
        setOrigin(newOrigin);
        if (newOrigin) loadPricingData(newOrigin, destination);
    };
    const handleOnSelectDestination = (item) => {
        const newDestination = item[0]?.name;
        setDestination(newDestination);
        if (newDestination) loadPricingData(origin, newDestination);
    };

    return (
        <>
            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold capitalize'>{`${type?.toUpperCase()} Pricing`}</h1>
                <div className='w-full flex flex-col gap-8'>
                    <div className='flex lg:flex-row flex-col items-center text-lg gap-3'>
                        <span>Send {type?.toUpperCase()} From</span>
                        <div className='w-[300px]'>
                            <Typeahead
                                className='country-typehead'
                                id='origin-country'
                                placeholder='Origin Country'
                                labelKey='name'
                                onChange={(selected) => {
                                    handleOnSelectOrigin(selected);
                                }}
                                options={countries}
                                defaultSelected={[
                                    countries?.find((item) => item.shortname === currentCountry?.shortname),
                                ]}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </div>
                        <span>To</span>
                        <div className='w-[300px]'>
                            <Typeahead
                                className='country-typehead'
                                id='destination-country'
                                placeholder='Destination Country'
                                labelKey='name'
                                onChange={(selected) => {
                                    handleOnSelectDestination(selected);
                                }}
                                options={countries}
                                defaultSelected={[
                                    countries?.find((item) => item.shortname === currentCountry?.shortname),
                                ]}
                                inputProps={{
                                    autoComplete: 'off',
                                }}
                            />
                        </div>
                    </div>
                    {!loading ? (
                        noOfSmsArray.length > 1 ? (
                            <>
                                <div className='w-full md:p-4 lg:p-8 p-2 bg-white h-fit flex flex-col gap-6'>
                                    <div className='text-center'>Number of SMS</div>
                                    <div className=' flex lg:hidden justify-between'>
                                        {noOfSmsArray.map((item, index) => {
                                            if (index === 0 || index === noOfSmsArray.length - 1) {
                                                return (
                                                    <div className='text-center w-fit ' key={index}>
                                                        {contvertToLocal(item[pricingEnv]?.totalNoOfSms)}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                    <div className='lg:flex hidden'>
                                        {noOfSmsArray.map((item, index) => {
                                            return (
                                                <div className='text-center w-full' key={index}>
                                                    {contvertToLocal(item[pricingEnv]?.totalNoOfSms)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className='input-slider-padding w-full'>
                                        <input
                                            className='slider'
                                            type='range'
                                            min='0'
                                            max={noOfSmsArray.length - 1}
                                            step='1'
                                            value={sliderValue}
                                            onChange={(e) => setSliderValue(e.target.value)}
                                            aria-label='Slider'
                                        />
                                    </div>
                                    <div className=' flex lg:hidden justify-between'>
                                        {noOfSmsArray.map((item, index) => {
                                            if (index === 0 || index === noOfSmsArray.length - 1) {
                                                return (
                                                    <div className='text-center w-fit ' key={index}>
                                                        {`${symbol}${item[pricingEnv]?.rate}`}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                    <div className=' lg:flex hidden'>
                                        {noOfSmsArray.map((item, index) => {
                                            return (
                                                <div className='text-center w-full' key={index}>
                                                    {`${symbol}${item[pricingEnv]?.rate}`}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className='d-none d-lg-block text-center text-dark c-fw-m'>Cost per SMS</div>
                                </div>
                                <p className='flex gap-1 text-2xl items-end flex-wrap '>
                                    <span className='text-3xl font-bold'>
                                        {noOfSmsArray[sliderValue] && noOfSmsArray[sliderValue][pricingEnv]
                                            ? Number(noOfSmsArray[sliderValue][pricingEnv].totalNoOfSms)
                                            : 'N/A'}
                                    </span>

                                    <span>SMS for </span>

                                    <span className='text-3xl font-bold text-green-600'>
                                        {`${symbol}${contvertToLocal(
                                            (Number(PricingToShow) % 1 === 0
                                                ? Number(PricingToShow)
                                                : Number(PricingToShow).toFixed(3)
                                            )
                                                .toString()
                                                .replace(/\.0$/, '')
                                        )}`}
                                    </span>

                                    {currency === 'INR' && <span> +18% GST at </span>}

                                    <span className='text-3xl font-bold text-green-600'>
                                        {`${symbol}${
                                            noOfSmsArray[sliderValue] && noOfSmsArray[sliderValue][pricingEnv]
                                                ? noOfSmsArray[sliderValue][pricingEnv].rate
                                                : 'N/A'
                                        }`}
                                    </span>
                                    <span>per SMS</span>
                                </p>{' '}
                                <a href={getURL('signup', 'sms')} target='_blank'>
                                    <button className='btn btn-primary btn-md'>Get Started</button>
                                </a>
                            </>
                        ) : noOfSmsArray.length > 0 && noOfSmsArray[0]?.[pricingEnv]?.rate ? (
                            <div className='flex flex-col gap-8 justify-around items-center h-[282px] bg-white p-8 w-fit border rounded '>
                                <div>SMS Pricing</div>
                                <div className='text-3xl font-bold text-green-600'>
                                    {`${symbol}${
                                        noOfSmsArray.length > 0 && noOfSmsArray[0]?.[pricingEnv]?.rate
                                            ? noOfSmsArray[0][pricingEnv].rate
                                            : 'N/A'
                                    }`}{' '}
                                    per {type?.toUpperCase()}
                                </div>
                                <a href={getURL('signup', 'otp')} target='_blank'>
                                    <button className='btn btn-primary btn-md'>Get Started</button>
                                </a>
                            </div>
                        ) : (
                            <div className='skeleton border h-[282px] bg-white p-8 w-full  rounded '></div>
                        )
                    ) : (
                        <div className='skeleton border h-[282px] bg-white p-8 w-full  rounded '></div>
                    )}

                    {noOfSmsArray.length > 0 && (
                        <div className='w-full overflow-x-auto sr-only'>
                            <div className='overflow-y-auto rounded-xl border border-slate-200 bg-white'>
                                <table className='table-fixed min-w-max w-full border-collapse text-sm'>
                                    <caption className='sr-only'>{`${type?.toUpperCase()} Pricing — ${origin} to ${destination}`}</caption>
                                    <thead className='sticky top-0 z-30 bg-slate-50'>
                                        <tr className='border-b border-slate-200'>
                                            <th className='min-w-[200px] px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50 z-40 border-r border-slate-200'>
                                                Count
                                            </th>
                                            <th className='min-w-[150px] px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-r border-slate-200'>
                                                {`Rate per ${type?.toUpperCase()}`}
                                            </th>
                                            <th className='min-w-[150px] px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider'>
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {noOfSmsArray.map((item, index) => {
                                            const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50';
                                            const count = item[pricingEnv]?.totalNoOfSms;
                                            const rate = item[pricingEnv]?.rate;
                                            const total =
                                                count && rate ? (Number(count) * Number(rate)).toFixed(3) : 'N/A';
                                            return (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-slate-100 last:border-b-0 ${rowBg}`}
                                                >
                                                    <td
                                                        className={`px-4 py-2.5 text-xs font-medium text-slate-700 sticky left-0 ${rowBg} z-20 border-r border-slate-100`}
                                                    >
                                                        {contvertToLocal(count)}
                                                    </td>
                                                    <td className='px-4 py-2.5 text-xs text-slate-600 border-r border-slate-100'>
                                                        {rate ? `${symbol}${rate}` : 'N/A'}
                                                    </td>
                                                    <td className='px-4 py-2.5 text-xs text-slate-600'>
                                                        {total !== 'N/A' ? `${symbol}${total}` : 'N/A'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    <ConnectWithTeam
                        product={type?.toUpperCase()}
                        pageData={data?.connectComp}
                        isPlan={true}
                        currency={currency}
                        href={type}
                        per={per}
                    />
                    <FaqsComp data={data?.faqComp} notCont={true} />
                </div>
            </div>
        </>
    );
}

export async function GetSmsOtpPricing(amountArray, currency, origin, destination) {
    try {
        const fetchRequests = amountArray.map(async (amount) => {
            const response = await axios.get(
                `${process.env.PRICING_URL}/api/v5/web/fetchPricingDetails?amount=${amount}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
            );
            return response.data.data;
        });

        const newData = await Promise.all(fetchRequests);
        return newData;
    } catch (error) {
        console.error('Error fetching pricing details:', error);
        return null;
    }
}
