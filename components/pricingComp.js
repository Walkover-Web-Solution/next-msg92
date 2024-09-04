import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import countries from '@/data/countries.json';
import Pricingemail from '@/components/pricing/pricing-email';
import Pricingsms from '@/components/pricing/pricing-sms';
import Pricingvoice from '@/components/pricing/pricing-voice';
import Pricingotp from '@/components/pricing/pricing-otp';
import Pricingwp from '@/components/pricing/pricing-whatsapp';
import Pricinghello from '@/components/pricing/pricing-hello';
import Pricingsegmento from '@/components/pricing/pricing-segmento';
import Pricingcampaign from '@/components/pricing/pricing-campaign';
import Pricingrcs from '@/components/pricing/pricing-rcs';
import PricingOtpWidget from '@/components/pricing/pricing-otpwidget';
import Pricingknowledgebase from '@/components/pricing/pricing-knowledgebase';
import Link from 'next/link';
import { MdExpandMore } from 'react-icons/md';
import getRelativeURL from '@/utils/getRelativeURL';

const PricingComp = ({ countryCode, product, browserPath, pathArray }) => {
    var availCont = ['US', 'GB', 'IN', 'BR', 'SG', 'AE', 'PH', 'ES'];
    var pathLengthCond = availCont.includes(countryCode );
    var [pricing, setPricing] = useState([]);
    var [originCountry, setOriginCountry] = useState('');
    var [destinationCountry, setDestinationCountry] = useState('');
    var [currency, setCurrency] = useState('');
    var [currencySymbol, setCurrencySymbol] = useState('');
    var [oneTimeWtsAppFee, setOneTimeWtsAppFee] = useState('');
    var amountArr = ['1250', '3300', '5400', '10200', '20000', '76500', '154000'];
    var [subscriptionEmail, setSubscriptionEmail] = useState([]);
    var [subscriptionVoice, setSubscriptionVoice] = useState([]);
    var [subscriptionWhatsapp, setSubscriptionWhatsapp] = useState([]);
    var [subscriptionSegmento, setSubscriptionSegmento] = useState([]);
    var [subscriptionHello, setSubscriptionHello] = useState([]);
    const [fetchCurrency, setfetchCurrency] = useState();
    const [fetchMsId, setfetchMsId] = useState('');
    const [states, setStates] = useState();

    const changeCurrencySymbol = async (currency) => {
        if (currency == 'INR') {
            setCurrencySymbol('₹');
            setOneTimeWtsAppFee('3000 +GST');
        } else if (currency == 'GBP') {
            setOneTimeWtsAppFee('35');
            setCurrencySymbol('£');
        } else {
            setCurrencySymbol('$');
            setOneTimeWtsAppFee('40');
        }
    };
    const fetchemailData = async () => {
        setfetchCurrency(currency);
        setfetchMsId('1');
        setStates('subscriptionEmail');
        fetchSubscription(currency, '1', 'subscriptionEmail');
    };
    const fetchSegmentoData = async () => {
        setfetchCurrency(currency);
        setfetchMsId('2');
        setStates('subscriptionSegmento');
        fetchSubscription(currency, '2', 'subscriptionSegmento');
    };
    const fetchHelloData = async () => {
        setfetchCurrency(currency);
        setfetchMsId('7');
        setStates('SubscriptionHello');
        fetchSubscription(currency, '7', 'subscriptionHello');
    };
    const fetchWhatsAppData = async () => {
        setfetchCurrency(currency);
        setfetchMsId('5');
        setStates('SubscriptionWhatsapp');
        fetchSubscription(currency, '5', 'SubscriptionWhatsapp');
    };
    useEffect(() => {
        if (product === 'email') {
            fetchemailData(currency);
        } else if (product === 'segmento') {
            fetchSegmentoData(currency);
        } else if (product === 'whatsapp') {
            fetchWhatsAppData(currency);
        } else if (product === 'hello') {
            fetchHelloData(currency);
        }
    }, [product, currency]);

    const fetchSMSData = async (currency, origin, destination) => {
        setOriginCountry(origin);
        setDestinationCountry(destination);
        amountArr = origin == 'India' && currency == 'INR' ? amountArr : ['5000'];
        changeCurrencySymbol(currency);
        try {
            const fetchRequests = amountArr.map(async (amount) => {
                const response = await axios.get(
                    `${process.env.PRICING_URL}/api/v5/web/fetchPricingDetails?amount=${amount}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
                );
                return response.data.data;
            });

            const newData = await Promise.all(fetchRequests);
            setPricing([...newData]);
        } catch (error) {
            // Handle errors here
            console.error('Error fetching pricing details:', error);
        }
    };

    const fetchSubscription = async (currency, msId, state) => {
        if (currency && msId) {
            try {
                changeCurrencySymbol(currency);
                const response = await axios.get(
                    `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currency}&ms_id=${msId}`
                );

                switch (state) {
                    case 'subscriptionEmail':
                        setSubscriptionEmail([...response.data.data]);
                        break;
                    case 'SubscriptionWhatsapp':
                        setSubscriptionWhatsapp([...response.data.data]);
                        break;
                    case 'subscriptionSegmento':
                        setSubscriptionSegmento([...response.data.data]);
                        break;
                    case 'SubscriptionVoice':
                        setSubscriptionVoice([...response.data.data]);
                        break;
                    case 'subscriptionHello':
                        setSubscriptionHello([...response.data.data]);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                throw new Error('Some error on server: ' + error.message);
            }
        }
    };

    const findCountry = async (code) => {
        const response = await countries?.find((el) => el.shortname === code);
        setCurrency(response?.currency);
        fetchSMSData(response?.currency, response?.name, response?.name);

        if (product === 'email') {
            fetchemailData(response?.currency);
        } else if (product === 'segmento') {
            fetchSegmentoData(response?.currency);
        } else if (product === 'whatsapp') {
            fetchWhatsAppData(response?.currency);
        } else if (product === 'hello') {
            fetchHelloData(response?.currency);
        }
    };

    useEffect(() => {
        findCountry(countryCode);
    }, [countryCode]);
    const productPricingData = [
        {
            type: 'heading',
            heading: 'Applications',
        },
        {
            product: 'hello',
            productDes: 'hello logo',
            productName: 'Hello',
            des: 'Contact Center',
            onclick: () => fetchSubscription(currency, '7', 'subscriptionHello'),
        },
        {
            product: 'campaign',
            productDes: 'campaign logo',
            productName: 'Campaign',
            des: 'Event-bassed automation',
            onclick: () => fetchSubscription(currency, '7', 'subscriptionHello'),
        },
        {
            product: 'segmento',
            productDes: 'segmento logo',
            productName: 'Segmento',
            des: 'Contact management',
            onclick: () => fetchSubscription(currency, '2', 'subscriptionSegmento'),
        },
        {
            product: 'otpwidget',
            productDes: 'otpwidget logo',
            productName: 'OTP',
            des: 'OTP widget SDK',
        },
        {
            type: 'heading',
            heading: 'Channels',
        },
        {
            product: 'sms',
            productDes: 'sms logo',
            productName: 'SMS',
            onclick: () => fetchSMSData(currency, originCountry, destinationCountry),
        },
        {
            product: 'otp',
            productDes: 'otp logo',
            productName: 'SendOTP',
            onclick: () => fetchSMSData(currency, originCountry, destinationCountry),
        },
        {
            product: 'email',
            productDes: 'email logo',
            productName: 'Email',
            onclick: () => fetchSubscription(currency, '1', 'subscriptionEmail'),
        },
        {
            product: 'whatsapp',
            productDes: 'whatsapp logo',
            productName: 'WhatsApp',
            onclick: () => fetchSubscription(currency, '5', 'SubscriptionWhatsapp'),
        },
        {
            product: 'voice',
            productDes: 'voice logo',
            productName: 'Voice',
        },
        {
            product: 'rcs',
            productDes: 'rcs logo',
            productName: 'RCS',
        },
    ];

    return (
        <>
            <div className="main-container  ">
                <div className="container p-md-4 p-2 d-flex gap-4 flex-column flex-md-row">
                    <div className="dropdown d-flex d-md-none align-items-center   w-75 px-2 py-1 br-2">
                        <button
                            className="w-100 gap-2 align-items-center d-flex text-dark border-0 outline-none "
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className=" d-flex align-items-center gap-1">
                                <img src={`/img/icon/${product}.svg`} alt={product} className="icon-drop" />
                                <span className="c-fs-5 c-fw-m text-capitalize">{product}</span>
                            </div>

                            <MdExpandMore />
                        </button>
                        <ul className="dropdown-menu p-2">
                            {productPricingData.map((productData, index) =>
                                productData.type === 'heading' ? (
                                    <li className="c-fw-m c-fs-5 " key={index}>
                                        {productData.heading}
                                    </li>
                                ) : (
                                    <li key={index}>
                                        <Link
                                            href={getRelativeURL(productData?.product)}
                                            className={`dropdown-item  w-100 ${
                                                product === productData?.product ? 'active' : ''
                                            }`}
                                            id={`${productData?.product}-btn`}
                                            onClick={() => {
                                                if (productData?.onclick) {
                                                    productData?.onclick();
                                                }
                                            }}
                                        >
                                            <span className="nav-link d-flex flex-column align-items-start justify-content-center">
                                                <div className="d-flex align-items-center gap-1">
                                                    <img
                                                        src={`/img/icon/${productData?.product}.svg`}
                                                        alt={productData?.productDes}
                                                        className="icon-drop"
                                                    />
                                                    <span className="c-fs-5 c-fw-m text-capitalize">
                                                        {productData?.productName}
                                                    </span>
                                                </div>
                                            </span>
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className=" d-none d-md-flex flex-column gap-2 align-items-start py-4" id="pricing-pills-tab">
                        {productPricingData.map((productData, index) =>
                            productData.type === 'heading' ? (
                                <h1 className="c-fw-m fs-6  " key={index}>
                                    {productData.heading}
                                </h1>
                            ) : (
                                <Link
                                    key={index}
                                    href={
                                        pathLengthCond && pathArray
                                            ? `/${pathArray[1]}/pricing/${productData?.product}`
                                            : `/pricing/${productData?.product}`
                                    }
                                    className={`nav-item w-100 ${product === productData?.product ? 'active' : ''}`}
                                    id={`${productData?.product}-btn`}
                                    onClick={() => {
                                        if (productData?.onclick) {
                                            // Execute the onclick function if it exists
                                            productData?.onclick();
                                        }
                                    }}
                                >
                                    <span className="nav-link d-flex flex-column align-items-start justify-content-center">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={`/img/icon/${productData?.product}.svg`}
                                                alt={productData?.productDes}
                                                className="icon"
                                            />
                                            <span className="c-fs-4 c-fw-m text-capitalize">
                                                {productData?.productName}
                                            </span>
                                        </div>
                                        <span className="base">{productData?.des}</span>
                                    </span>
                                </Link>
                            )
                        )}
                    </div>
                    <div className=" price-container w-100 p-md-4 p-1">
                        {product === 'sms' && (
                            <Pricingsms
                                amountArr={amountArr}
                                pricing={pricing}
                                setPricing={setPricing}
                                fetchSMSData={fetchSMSData}
                                originCountry={originCountry}
                                setOriginCountry={setOriginCountry}
                                destinationCountry={destinationCountry}
                                setDestinationCountry={setDestinationCountry}
                                currency={currency}
                                countryCode={countryCode}
                                currencySymbol={currencySymbol}
                            />
                        )}

                        {product === 'email' && (
                            <Pricingemail
                                setSubscriptionEmail={setSubscriptionEmail}
                                subscriptionEmail={subscriptionEmail}
                                fetchSubscriptionEmail={fetchSubscription}
                                currency={currency}
                                currencySymbol={currencySymbol}
                                countryCode={countryCode}
                            />
                        )}
                        {product === 'voice' && (
                            <Pricingvoice
                                subscriptionVoice={subscriptionVoice}
                                fetchSubscriptionVoice={fetchSubscription}
                                currency={currency}
                                state={'SubscriptionVoice'}
                                setCurrencySymbol={setCurrencySymbol}
                                countryCode={countryCode}
                            />
                        )}
                        {product === 'whatsapp' && (
                            <Pricingwp
                                subscriptionWhatsapp={subscriptionWhatsapp}
                                fetchSubscriptionWhatsapp={fetchSubscription}
                                currency={currency}
                                currencySymbol={currencySymbol}
                                oneTimeWtsAppFee={oneTimeWtsAppFee}
                                countryCode={countryCode}
                                pathArray={pathArray}
                            />
                        )}
                        {product === 'otpwidget' && <PricingOtpWidget />}
                        {product === 'otp' && (
                            <Pricingotp
                                amountArr={amountArr}
                                pricing={pricing}
                                setPricing={setPricing}
                                fetchSMSData={fetchSMSData}
                                originCountry={originCountry}
                                setOriginCountry={setOriginCountry}
                                destinationCountry={destinationCountry}
                                setDestinationCountry={setDestinationCountry}
                                currency={currency}
                                currencySymbol={currencySymbol}
                            />
                        )}
                        {product === 'hello' && (
                            <Pricinghello
                                setSubscriptionHello={setSubscriptionHello}
                                subscriptionHello={subscriptionHello}
                                fetchSubscriptionHello={fetchSubscription}
                                currency={currency}
                                state={'SubscriptionHello'}
                                setCurrencySymbol={setCurrencySymbol}
                                countryCode={countryCode}
                            />
                        )}
                        {product === 'segmento' && (
                            <Pricingsegmento
                                subscriptionSegmento={subscriptionSegmento}
                                setSubscriptionSegmento={setSubscriptionSegmento}
                                fetchSubscriptionSegmento={fetchSubscription}
                                currency={currency}
                                state={'subscriptionSegmento'}
                                setCurrencySymbol={setCurrencySymbol}
                                countryCode={countryCode}
                                currencySymbol={currencySymbol}
                            />
                        )}
                        {product === 'campaign' && <Pricingcampaign />}
                        {product === 'knowledgebase' && <Pricingknowledgebase />}
                        {product === 'rcs' && <Pricingrcs />}
                    </div>
                </div>
                {/* <div className="bg-white">
        <div className="container Frequently-Questions py-5">
        <strong className="sub-heading">Frequently Asked Questions</strong>
        <div className="accordion mt-4" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  How can MSG91 benefit my business?
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  MSG91 offers numerous benefits for businesses, including
                  improved customer engagement, streamlined communication
                  workflows, increased operational efficiency, and enhanced
                  brand reputation. Our platform enables businesses to automate
                  communication, personalize interactions, and reach their
                  target audience through their preferred channels.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  What makes MSG91 different from other communication platforms?
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  MSG91 offers numerous benefits for businesses, including
                  improved customer engagement, streamlined communication
                  workflows, increased operational efficiency, and enhanced
                  brand reputation. Our platform enables businesses to automate
                  communication, personalize interactions, and reach their
                  target audience through their preferred channels.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Is MSG91 suitable for businesses of all sizes?
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  MSG91 offers numerous benefits for businesses, including
                  improved customer engagement, streamlined communication
                  workflows, increased operational efficiency, and enhanced
                  brand reputation. Our platform enables businesses to automate
                  communication, personalize interactions, and reach their
                  target audience through their preferred channels.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Is MSG91 secure?
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  MSG91 offers numerous benefits for businesses, including
                  improved customer engagement, streamlined communication
                  workflows, increased operational efficiency, and enhanced
                  brand reputation. Our platform enables businesses to automate
                  communication, personalize interactions, and reach their
                  target audience through their preferred channels.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Can I integrate MSG91 with my existing systems or
                  applications?
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  MSG91 offers numerous benefits for businesses, including
                  improved customer engagement, streamlined communication
                  workflows, increased operational efficiency, and enhanced
                  brand reputation. Our platform enables businesses to automate
                  communication, personalize interactions, and reach their
                  target audience through their preferred channels.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  What level of support can I expect from MSG91?
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  MSG91 offers numerous benefits for businesses, including
                  improved customer engagement, streamlined communication
                  workflows, increased operational efficiency, and enhanced
                  brand reputation. Our platform enables businesses to automate
                  communication, personalize interactions, and reach their
                  target audience through their preferred channels.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  How do I get started with MSG91?
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  MSG91 offers numerous benefits for businesses, including
                  improved customer engagement, streamlined communication
                  workflows, increased operational efficiency, and enhanced
                  brand reputation. Our platform enables businesses to automate
                  communication, personalize interactions, and reach their
                  target audience through their preferred channels.
                </div>
              </div>
            </div>
          </div>
        </div>
        </div> */}
            </div>
        </>
    );
};

export default React.memo(PricingComp);
