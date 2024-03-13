import { MdDone, MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import countries from '@/data/countries.json';
import { Typeahead } from 'react-bootstrap-typeahead';
import { setUtm } from '@/components/utils';

const Pricingotp = ({
    pricing,
    setPricing,
    amountArr,
    fetchSMSData,
    originCountry,
    setOriginCountry,
    destinationCountry,
    setDestinationCountry,
    currency,
    currencySymbol,
    countryCode,
}) => {
    useEffect(() => {
        setUtm();
    }, [pricing, originCountry, destinationCountry]);
    const [sliderValue, setSliderValue] = useState(47);
    const [pricingEnv, setPricingEnv] = useState(106);
    const [totalNoOfSmsArray, setTotalNoOfSmsArray] = useState([]);

    useEffect(() => {
        setUtm();
    }, [pricing, originCountry, destinationCountry]);
    useEffect(() => {
        if (process.env.PRICING_URL === 'https://test.msg91.com') {
            setPricingEnv(19);
        }
    }, []);

    useEffect(() => {
        if (pricing.length > 0 && pricing[0]?.[pricingEnv]) {
            setTotalNoOfSmsArray(pricing.map((item) => item[pricingEnv]['totalNoOfSms']).sort((a, b) => a - b));
        }
    }, [pricing]);

    let noOfOtp = 0,
        pricingOTP = 0,
        ratePerOTP = 0;

    if (pricing[0] && pricing.length > 2) {
        let arrayOfPrices = totalNoOfSmsArray.slice();
        arrayOfPrices.unshift('-36');

        const lenAmountArr = totalNoOfSmsArray.length;
        const widthOfSection = 100 / lenAmountArr;
        const noOfSection = Math.floor(sliderValue / widthOfSection);
        if (pricing[0]) {
            if (pricing[noOfSection]) {
                ratePerOTP = pricing[noOfSection][pricingEnv]?.rate;
            } else {
                ratePerOTP = pricing[noOfSection - 1][pricingEnv]?.rate;
            }

            const rangeInSection = lenAmountArr * (sliderValue - widthOfSection * noOfSection);
            const noOfExtraOTP = ((arrayOfPrices[noOfSection + 1] - arrayOfPrices[noOfSection]) * rangeInSection) / 100;
            noOfOtp = Number(arrayOfPrices[noOfSection]) + Math.floor(noOfExtraOTP);
        }
        if (sliderValue == 100) {
            noOfOtp = Number(arrayOfPrices[noOfSection]);
        }
        let pricingSMSstr = noOfOtp * ratePerOTP;
        if (countryCode === 'IN') {
            pricingOTP = pricingSMSstr.toLocaleString('en-IN');
        } else {
            pricingOTP = pricingSMSstr.toLocaleString(undefined);
        }
    }
    return (
        <>
            <div className="d-flex flex-column gap-5">
                {originCountry?.length >= 1 && (
                    <div className="d-flex flex-column flex-lg-row align-items-center  gap-4 ">
                        <span className="Send-otp c-fw-m ">Send OTP from</span>
                        <div className="gap-3 col d-flex flex-column text-start flex-md-row align-items-center justify-content-start col-12 col-md-10 col-lg-7">
                            <Typeahead
                                className="col c-fs-6"
                                id="originCountry c-fs-6"
                                placeholder="Origin Country"
                                labelKey="name"
                                onChange={(selected) => {
                                    setPricing([]);
                                    if (selected[0]?.name)
                                        fetchSMSData(currency, selected[0]?.name, destinationCountry);
                                }}
                                options={countries}
                                clearButton
                                defaultSelected={[countries?.find((item) => item.name === originCountry)]}
                                inputProps={{
                                    autoComplete: 'off' /* Add the autoComplete attribute here */,
                                }}
                            />

                            <div className="c-fw-m">To</div>

                            <Typeahead
                                className="col"
                                id="destinationCountry"
                                placeholder="Destination Country"
                                labelKey="name"
                                onChange={(selected) => {
                                    setPricing([]);
                                    if (selected[0]?.name) fetchSMSData(currency, originCountry, selected[0]?.name);
                                }}
                                options={countries}
                                clearButton
                                defaultSelected={[countries?.find((item) => item.name === originCountry)]}
                            />
                        </div>
                    </div>
                )}
                {pricing[0] && (
                    <>
                        {pricing.length > 2 ? (
                            <>
                                <div className="d-flex flex-column gap-3 align-items center p-4 bg-white rounded">
                                    <div className="text-center text-dark c-fw-m">Number of OTP</div>
                                    <div className=" d-none d-md-flex">
                                        {totalNoOfSmsArray.map((amount, index) => {
                                            return (
                                                <div className="text-end col c-fs-5" key={index}>
                                                    {amount}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="d-flex d-md-none">
                                        <div className="text-start col c-fs-5">0</div>
                                        <div className="text-end col c-fs-5">
                                            {totalNoOfSmsArray[totalNoOfSmsArray.length - 1]}
                                        </div>
                                    </div>

                                    <input
                                        className="slider"
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={sliderValue}
                                        onChange={(e) => setSliderValue(e.target.value)}
                                        aria-label="Slider"
                                    />
                                    <div className="d-none d-md-flex">
                                        {pricing.map((data, index) => {
                                            return (
                                                <div className="text-end col c-fs-5" key={index}>
                                                    {currencySymbol}
                                                    {data[pricingEnv]?.rate}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="text-center text-dark c-fw-m">Cost per OTP</div>
                                </div>
                                <div className="d-flex align-items-end ">
                                    <p className="c-fs-2 c-fw-500">
                                        <span className="c-fs-1 fw-bold">{noOfOtp.toLocaleString('en-IN')}</span>
                                        <span className="c-fs-1 text-green fw-bold"></span> OTPs for{' '}
                                        <span className="c-fs-1 text-green fw-bold">
                                            {' '}
                                            {currencySymbol} {pricingOTP}{' '}
                                        </span>{' '}
                                        +18%GST at <span className="c-fs-1 text-green fw-bold">{ratePerOTP}</span>
                                        per OTP{' '}
                                    </p>
                                </div>
                                <a
                                    href="/signup?service=SendOTP"
                                    target="_blank"
                                    className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3 btn-ft `}
                                >
                                    Get Started
                                </a>
                            </>
                        ) : (
                            <>
                                {pricing[0][pricingEnv]?.rate && (
                                    <div className="content-fit bg-white btn-ft d-flex flex-column gap-5 border rounded p-4 border-2 align-items-center">
                                        <h3 className="c-fs-4">SMS Pricing</h3>
                                        <h3 className="text-green c-fs-2">
                                            {currencySymbol}
                                            {pricing[0][pricingEnv]?.rate}per SMS
                                        </h3>
                                        <button className="btn btn-dark px-5">Get Started</button>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}

                <div className="talk-to-sales connect-personalized ">
                    <span className="personalized d-block c-fs-4">
                        Connect with our team for a personalized pricing and get up to meet your needs.
                    </span>
                    <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#sales-modal"
                        className="btn btn-outline-dark mt-2 mb-4 c-fs-5 border border-dark rounded-1 px-3 py-1"
                    >
                        Talk to Sales
                    </button>
                    <br />
                    <a className="more-about" href="/otp">
                        <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
                        <span>Know more about SendOTP</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Pricingotp;
