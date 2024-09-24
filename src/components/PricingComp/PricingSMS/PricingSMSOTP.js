import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import countries from '@/data/countries.json';

export default function PricingSMSOTP({ data, type }) {
    const [loading, setLoading] = useState(true);
    const [pricingData, setPricingData] = useState(null);
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState('$');
    const [origin, setOrigin] = useState('India');
    const [destination, setDestination] = useState('India');
    const [noOfSmsArray, setNoOfSmsArray] = useState([]);
    const [amountArray, setAmountArray] = useState([]);

    //slider states
    const [sliderValue, setSliderValue] = useState(2);

    useEffect(() => {
        setAmountArray(
            origin == 'India' && currency == 'INR'
                ? ['1250', '3300', '5400', '10200', '20000', '76500', '154000']
                : ['5000']
        );
    }, [origin, destination]);

    const pricingEnv = type === 'sms' ? 4 : 19;
    useEffect(() => {
        if (pricingData) {
            setNoOfSmsArray(pricingData.sort((a, b) => a[pricingEnv]?.totalNoOfSms - b[pricingEnv]?.totalNoOfSms));
        }
    });

    useEffect(() => {
        setLoading(true);
        const fetchPricingData = async () => {
            setLoading(true);
            try {
                const data = await GetSmsOtpPricing(amountArray, currency, origin, destination);
                setPricingData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching SMS OTP pricing:', error);
                setLoading(false);
            }
        };
        fetchPricingData();
    }, [currency, amountArray]);

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
        setOrigin(item?.name);
    };
    const handleOnSelectDestination = (item) => {
        setDestination(item?.name);
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
            <div className='w-full flex flex-col gap-8'>
                <div className='flex items-center text-lg gap-3'>
                    <span>Send {type.toUpperCase()} From</span>
                    <div className='w-[300px] z-50'>
                        <ReactSearchAutocomplete
                            items={countries}
                            onSelect={handleOnSelectOrigin}
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
                    <span>To</span>
                    <div className='w-[300px] z-50'>
                        <ReactSearchAutocomplete
                            items={countries}
                            onSelect={handleOnSelectDestination}
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
                </div>
                {!loading ? (
                    noOfSmsArray.length > 1 ? (
                        <>
                            <div className='w-full p-8 bg-white h-fit flex flex-col gap-6'>
                                <div className='d-none d-lg-block text-center text-dark c-fw-m'>Number of SMS</div>
                                <div className=' flex'>
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
                                <div className=' flex'>
                                    {noOfSmsArray.map((item, index) => {
                                        return (
                                            <div className='text-center w-full' key={index}>
                                                {symbol}
                                                {item[pricingEnv]?.rate}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className='d-none d-lg-block text-center text-dark c-fw-m'>Cost per SMS</div>
                            </div>
                            <p className='flex gap-1 text-2xl items-end'>
                                <span className='text-3xl font-bold '>
                                    {' '}
                                    {noOfSmsArray[sliderValue] && noOfSmsArray[sliderValue][pricingEnv]
                                        ? contvertToLocal(Number(noOfSmsArray[sliderValue][pricingEnv].totalNoOfSms))
                                        : 'N/A'}
                                </span>

                                <span>SMS for </span>

                                <span className='text-3xl font-bold text-green-600'>
                                    {symbol}
                                    {contvertToLocal(
                                        (Number(PricingToShow) % 1 === 0
                                            ? Number(PricingToShow)
                                            : Number(PricingToShow).toFixed(1)
                                        )
                                            .toString()
                                            .replace(/\.0$/, '')
                                    )}
                                </span>

                                {currency === 'INR' && <span> +18% GST at </span>}

                                <span className='text-3xl font-bold text-green-600'>
                                    {symbol}
                                    {noOfSmsArray[sliderValue] && noOfSmsArray[sliderValue][pricingEnv]
                                        ? noOfSmsArray[sliderValue][pricingEnv].rate
                                        : 'N/A'}
                                </span>
                                <span>per SMS</span>
                            </p>
                            <button className='btn btn-primary btn-md'>Get Started</button>
                        </>
                    ) : (
                        <div className='flex flex-col gap-8 justify-around items-center h-[282px] bg-white p-8 w-fit border rounded '>
                            <div>SMS Pricing</div>
                            <div className='text-3xl font-bold text-green-600'>
                                {noOfSmsArray[0] && noOfSmsArray[0][pricingEnv]
                                    ? contvertToLocal(noOfSmsArray[0][pricingEnv].rate)
                                    : 'N/A'}{' '}
                                per {type?.toUpperCase()}
                            </div>
                            <button className='btn btn-primary btn-md'>Get Started</button>
                        </div>
                    )
                ) : (
                    <div className='skeleton h-[282px] bg-white p-8 w-full  rounded '></div>
                )}

                <ConnectWithTeam
                    product={type?.toUpperCase()}
                    data={data?.connectComp}
                    isPlan={true}
                    currency={currency}
                />
                <FaqsComp data={data?.faqComp} notCont={true} />
            </div>
        </>
    );
}

export async function GetSmsOtpPricing(amountArray, currency, origin, destination) {
    try {
        const fetchRequests = amountArray.map(async (amount) => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_PRICING_URL}/api/v5/web/fetchPricingDetails?amount=${amount}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
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
