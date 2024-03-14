import { MdDone, MdClose } from 'react-icons/md';
import { useEffect, useState, useRef, use } from 'react';
import countries from '@/data/countries.json';
import { Typeahead } from 'react-bootstrap-typeahead';
import { setUtm } from '@/components/utils';

const Pricingsms = ({
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
    const [sliderValue, setSliderValue] = useState(0);
    const [pricingEnv, setPricingEnv] = useState(4);
    const [totalNoOfSmsArray, setTotalNoOfSmsArray] = useState([]);
    console.log('pricing-----------',pricing);
    useEffect(() => {
        setUtm();
    }, [pricing, originCountry, destinationCountry]);
    useEffect(() => {
        if (process.env.PRICING_URL === 'https://test.msg91.com') {
            setPricingEnv(4);
        }
    }, []);

    useEffect(() => {
        if (pricing.length > 0) {
            //setTotalNoOfSmsArray(pricing.map((item) => item[pricingEnv]['totalNoOfSms']).sort((a, b) => a - b));
            setTotalNoOfSmsArray(pricing.sort((a, b) => a[pricingEnv].totalNoOfSms - b[pricingEnv].totalNoOfSms));
            
        }
    }, [pricing]);

    let noOfsms = 0,
        pricingsms = 0,
        ratePersms = 0;

    if (pricing[0] && pricing.length > 2) {
        let arrayOfPrices = totalNoOfSmsArray.slice();
        arrayOfPrices.unshift('-36');

        const lenAmountArr = totalNoOfSmsArray.length;
        const widthOfSection = 100 / lenAmountArr;
        const noOfSection = Math.floor(sliderValue / widthOfSection);
        if (pricing[0]) {
            if (pricing[noOfSection]) {
                ratePersms = pricing[noOfSection][pricingEnv]?.rate;
            } else {
                ratePersms = pricing[noOfSection - 1][pricingEnv]?.rate;
            }

            const rangeInSection = lenAmountArr * (sliderValue - widthOfSection * noOfSection);
            const noOfExtrasms = ((arrayOfPrices[noOfSection + 1] - arrayOfPrices[noOfSection]) * rangeInSection) / 100;
            noOfsms = Number(arrayOfPrices[noOfSection]) + Math.floor(noOfExtrasms);
        }
        if (sliderValue == 100) {
            noOfsms = Number(arrayOfPrices[noOfSection]);
        }
        let pricingSMSstr = noOfsms * ratePersms;
        if (countryCode === 'IN') {
            pricingsms = pricingSMSstr.toLocaleString('en-IN');
        } else {
            pricingsms = pricingSMSstr.toLocaleString(undefined);
        }
        
        //console.log('sliderValue, pricingEnv', sliderValue, pricingEnv, );
        noOfsms = totalNoOfSmsArray[sliderValue][4]?.totalNoOfSms;
        ratePersms = totalNoOfSmsArray[sliderValue][4].rate;
        pricingsms = noOfsms * ratePersms;
        console.log('---------------------', noOfsms, ratePersms, pricingsms);
    }
    
    
    return (
        <>
            <div>
                {originCountry?.length >= 1 && (
                    <div className="d-flex flex-column flex-lg-row align-items-center  gap-4 ">
                        <span className="Send-sms c-fw-m ">Send SMS from</span>
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
                                <div className="d-flex flex-column gap-3 align-items center mt-3 p-4 bg-white rounded ">
                                    <div className="text-center text-dark c-fw-m">Number of SMS</div>
                                    <div className=" d-none d-md-flex">
                                        {totalNoOfSmsArray.map((item, index) => {
                                            return (
                                                <div className="text-end col c-fs-5" key={index}>
                                                    {item[pricingEnv].totalNoOfSms}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* <div className="d-flex d-md-none">
                                        <div className="text-start col c-fs-5">0</div>
                                        <div className="text-end col c-fs-5">
                                            {totalNoOfSmsArray[totalNoOfSmsArray.length - 1]}
                                        </div>
                                    </div> */}

                                    {/* <input
                                        className="slider"
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={sliderValue}
                                        onChange={(e) => setSliderValue(e.target.value)}
                                        aria-label="Slider"
                                    /> */}
                                    <input
                                        className="slider"
                                        type="range"
                                        min="0"
                                        max={totalNoOfSmsArray.length-1}
                                        step="1"
                                        value={sliderValue}
                                        onChange={(e) => setSliderValue(e.target.value)}
                                        aria-label="Slider"
                                    />                                     

                                    <div className="d-none d-md-flex">
                                        {totalNoOfSmsArray.map((item, index) => {
                                            return (
                                                <div className="text-end col c-fs-5" key={index}>
                                                    {currencySymbol}
                                                    {item[pricingEnv]?.rate}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="text-center text-dark c-fw-m">Cost per SMS</div>
                                </div>
                                <div className="d-flex align-items-end mt-4 mb-3">
                                    <p className="c-fs-2 c-fw-500">
                                        <span className="c-fs-1 fw-bold">{noOfsms.toLocaleString('en-IN')}</span> SMS
                                        for{' '}
                                        <span className="c-fs-1 text-green fw-bold">
                                            {currencySymbol}
                                            {pricingsms}{' '}
                                        </span>{' '}
                                        +18%GST at{' '}
                                        <span className="c-fs-1 text-green fw-bold">
                                            {currencySymbol}
                                            {ratePersms}
                                        </span>
                                        per SMS{' '}
                                    </p>
                                </div>
                                <a
                                    href="/signup?service=SMS"
                                    target="_blank"
                                    className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3`}
                                >
                                    Get Started
                                </a>
                            </>
                        ) : (
                            <>
                                {pricing[0][pricingEnv].rate && (
                                    <div className="content-fit bg-white btn-ft d-flex flex-column border rounded gap-5 p-4 border-2 mt-4 align-items-center">
                                        <h3 className="c-fs-4">SMS Pricing</h3>
                                        <h3 className="text-green c-fs-2">
                                            {currencySymbol}
                                            {pricing[0][pricingEnv].rate}per SMS
                                        </h3>
                                        <a
                                            href="/signup?service=SMS"
                                            target="_blank"
                                            className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3 btn-ft`}
                                        >
                                            Get Started
                                        </a>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}

                <div className="talk-to-sales connect-personalized mt-4">
                    <span className="personalized d-block c-fs-4">
                        Connect with our team for a personalized pricing
                        {originCountry === 'India' && (
                            <>
                                {' '}
                                and get up to <span className="text-green c-fs-4 fw-medium"> ₹0.13</span> per SMS to
                                meet your needs.{' '}
                            </>
                        )}
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
                    <a className="more-about" href="/sms">
                        <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
                        <span>Know more about SMS</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Pricingsms;
