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
    useEffect(() => {
        setUtm();

    }, [pricing, originCountry, destinationCountry]);
    useEffect(() => {
        if(process.env.PRICING_URL === 'https://test.msg91.com'){
            setPricingEnv(19)
        }

    },[]);
    let noOfOtp = 0,
        pricingOTP = 0,
        ratePerOTP = 0;

    if (pricing[0] && pricing.length > 2) {
        let arrayOfPrices = amountArr.slice();
        arrayOfPrices.unshift('-94');

        const lenAmountArr = amountArr.length;
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
            <div>
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
                                <div className="d-flex flex-column gap-3 align-items center mt-3">
                                    <div className="text-center text-dark c-fw-m">Number of OTP</div>
                                    <div className=" d-none d-md-flex">
                                        {amountArr.map((amount, index) => {
                                            return (
                                                <div className="text-end col c-fs-5" key={index}>
                                                    {amount}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="d-flex d-md-none">
                                        <div className="text-start col c-fs-5">0</div>
                                        <div className="text-end col c-fs-5">{amountArr[amountArr.length - 1]}</div>
                                    </div>

                                    <input
                                        className="slider"
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={sliderValue}
                                        onChange={(e) => setSliderValue(e.target.value)}
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
                                <div className="d-flex align-items-end mt-4 mb-3">
                                    <p className="c-fs-2 c-fw-500">
                                        <span className="c-fs-1 fw-bold">{noOfOtp.toLocaleString('en-IN')}</span>
                                        <span className="c-fs-1 text-green fw-bold"></span>
                                        OTP for <span className="c-fs-1 text-green fw-bold">{pricingOTP} </span> +18%GST
                                        at <span className="c-fs-1 text-green fw-bold">{ratePerOTP}</span>
                                        per OTP{' '}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="content-fit bg-white btn-ft d-flex flex-column gap-5 border rounded p-4 border-2 mt-4 align-items-center">
                                    <h3 className="c-fs-4">SMS Pricing</h3>
                                    <h3 className="text-green c-fs-2">
                                        {currencySymbol}
                                        {pricing[0][4].rate}per SMS
                                    </h3>
                                    <button className="btn btn-outline-dark px-5">Get Started</button>
                                </div>
                            </>
                        )}
                    </>
                )}
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#sales-modal"
                    className=" btn btn-dark rounded-1 py-2 px-3 mt-4 mb-3"
                >
                    Get Started
                </button>
                <div className="talk-to-sales connect-personalized mt-4">
                    <span className="personalized d-block c-fs-4">
                        Connect with our team for a personalized pricing and get up to meet your needs.
                    </span>
                    <button
                        type="button"
                        className="btn btn-outline-dark mt-2 mb-4 border border-dark border-2 rounded-1 fw-semibold px-3"
                    >
                        Talk to Sales
                    </button>
                    <br />
                    <a className="mt-3" href="#">
                        <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
                        <span className="link">Know more about OTP</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Pricingotp;