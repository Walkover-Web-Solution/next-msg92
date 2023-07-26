import { useEffect, useState } from "react";
import axios from "axios";
import countries from "@/data/countries.json";
import $ from 'jquery';

import Pricingemail from "@/components/pricing/pricing-email";
import Pricingsms from "@/components/pricing/pricing-sms";
import Pricingvoice from "@/components/pricing/pricing-voice";
import Pricingotp from "@/components/pricing/pricing-otp";
import Pricingwp from "@/components/pricing/pricing-whatsapp";
import Pricinghello from "@/components/pricing/pricing-hello";
import Pricingsegmento from "@/components/pricing/pricing-segmento";
import Pricingcampaign from "@/components/pricing/pricing-campaign";
import Pricingrcs from "@/components/pricing/pricing-rcs";
import Pricingknowledgebase from "@/components/pricing/pricing-knowledgebase";

const PricingComp = ({ countryCode, product }) => {
  //console.log('PricingComp countryCode', countryCode);
  console.log("PricingComp product", product);
  var [pricing, setPricing] = useState([]);
  var [originCountry, setOriginCountry] = useState("");
  var [destinationCountry, setDestinationCountry] = useState("");
  var [currency, setCurrency] = useState("");
  var [currencySymbol, setCurrencySymbol] = useState("");
  var [oneTimeWtsAppFee, setOneTimeWtsAppFee] = useState("");

  var amountArr = ["1250", "3300", "5400", "10200", "20000", "76500", "154000"];

  var [subscriptionEmail, setSubscriptionEmail] = useState([]);
  var [subscriptionVoice, setSubscriptionVoice] = useState([]);
  var [subscriptionWhatsapp, setSubscriptionWhatsapp] = useState([]);
  var [subscriptionSegmento, setSubscriptionSegmento] = useState([]);

  const changeCurrencySymbol = async (currency) => {
    if (currency == "INR") {
      setCurrencySymbol("₹");
      setOneTimeWtsAppFee("3000 +GST");
    } else if (currency == "GBP") {
      setOneTimeWtsAppFee("35");
      setCurrencySymbol("£");
    } else {
      setCurrencySymbol("$");
      setOneTimeWtsAppFee("40");
    }
  };

  const fetchSMSData = async (currency, origin, destination) => {
    setOriginCountry(origin);
    setDestinationCountry(destination);
    //console.log('fetchsmsdata', currency, origin, destination, countryCode);
    amountArr = origin == "India" && currency == "INR" ? amountArr : ["5000"];
    changeCurrencySymbol(currency);
    var newData = [];
    let i = 0;
    for (; i < amountArr.length; i++) {
      // const response = await axios.get(
      //   `https://test.msg91.com/api/v5/web/fetchPricingDetails?amount=${amountArr[i]}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
      // );
      const response = await axios.get(`https://api.msg91.com/api/v5/web/fetchPricingDetails?amount=${amountArr[i]}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`)
      //const response = await axios.get(`http://52.221.182.19/api/v5/web/fetchPricingDetails?amount=${amountArr[i]}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`)
      newData.push(response.data.data);
    }
    setPricing([...newData]);
  };

  const fetchSubscriptionEmail = async (currency, msId) => {
    changeCurrencySymbol(currency);
    const response = await axios.get(
      `https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`
    );
    setSubscriptionEmail([...response.data.data]);
    // console.log(response.data.data);
  };
  const fetchSubscriptionVoice = async (currency, msId) => {
    changeCurrencySymbol(currency);
    const response = await axios.get(
      `https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`
    );
    setSubscriptionVoice([...response.data.data]);
    // console.log(response.data.data);
  };
  const fetchSubscriptionWhatsapp = async (currency, msId) => {
    changeCurrencySymbol(currency);
    const response = await axios.get(
      `https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`
    );
    setSubscriptionWhatsapp([...response.data.data]);
    // console.log(response.data.data);
  };
  const fetchSubscriptionSegmento = async (currency, msId) => {
    changeCurrencySymbol(currency);
    const response = await axios.get(
      `https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`
    );
    setSubscriptionSegmento([...response.data.data]);
    // console.log(response.data.data);
  };

  const findCountry = async (code) => {
    const response = await countries?.find((el) => el.sortname === code);
    //console.log('findCountry, response?.currency:', response?.currency, 'code', code);
    setCurrency(response?.currency);
    fetchSMSData(response?.currency, response?.name, response?.name);
  };

  useEffect(() => {
    findCountry(countryCode);
    //console.log('useeffect', countryCode);
  }, [countryCode]);


  return (
    <>
      <div>
        <div
          className=" my-4 d-flex w-100 gap-2 align-items-center justify-content-center flex-wrap"
          id="pricing-pills-tab"
        >
          <a
            href="sms"
            className={`nav-item ${product === 'sms' ? 'active' : ''}`}
            id="sms-btn"
            onClick={() => {
              fetchSMSData(currency, originCountry, destinationCountry);
            }}
          >
            <span className="nav-link ">
              <img src="/img/icon/sms.svg" alt="#" />
              SMS
            </span>
          </a>
          <a
            href="email"
            className={`nav-item ${product === 'email' ? 'active' : ''}`}
            id="email-btn"
            onClick={() => {
              fetchSubscriptionEmail(currency, "1");
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/email.svg" alt="#" />
              Email
            </span>
          </a>
          <a href="voice" 
           className={`nav-item ${product === 'voice' ? 'active' : ''}`}
            id="voice-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/voice.svg" alt="#" />
              Voice
            </span>
          </a>
          <a
            href="whatsapp"
            className={`nav-item ${product === 'whatsapp' ? 'active' : ''}`}
            id="wp-btn"
            onClick={() => {
              fetchSubscriptionWhatsapp(currency, "5");
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/whatsapp.svg" alt="#" />
              WhatsApp
            </span>
          </a>
          <a href="rcs" 
           className={`nav-item ${product === 'rcs' ? 'active' : ''}`}
            id="rcs-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/rcs.svg" alt="#" />
              RCS
            </span>
          </a>
          <a
            href="otp"
            className={`nav-item ${product === 'otp' ? 'active' : ''}`}
            id="otp-btn"
            onClick={() => {
              fetchSMSData(currency, originCountry, destinationCountry);
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/otp.svg" alt="#" />
              OTP
            </span>
          </a>
          <a href="hello" 
           className={`nav-item ${product === 'hello' ? 'active' : ''}`}
            id="hello-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/hello.svg" alt="#" />
              Hello
            </span>
          </a>
          <a
            href="segmento"
            className={`nav-item ${product === 'segmento' ? 'active' : ''}`}
            id="segmento-btn"
            onClick={() => {
              fetchSubscriptionSegmento(currency, "2");
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/segmento.svg" alt="#" />
              Segmento
            </span>
          </a>
          <a href="campaign" 
           className={`nav-item ${product === 'campaign' ? 'active' : ''}`}
            id="campaign-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/campaign.svg" alt="#" />
              Campaign
            </span>
          </a>
          <a href="knowledgebase" 
           className={`nav-item ${product === 'knowledgebase' ? 'active' : ''}`}
            id="kb-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/knowledgebase.svg" alt="#" />
              KnowledgeBase
            </span>
          </a>
        </div>
      </div>
      <div className="my-5 text-center">
        {product === "sms" && (
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
            currencySymbol={currencySymbol}
          />
        )}

        {product === "email" && (
          <Pricingemail
            subscriptionEmail={subscriptionEmail}
            fetchSubscriptionEmail={fetchSubscriptionEmail}
            currency={currency}
            currencySymbol={currencySymbol}
          />
        )}
        {product === "voice" && (
          <Pricingvoice
            subscriptionVoice={subscriptionVoice}
            fetchSubscriptionVoice={fetchSubscriptionVoice}
            currency={currency}
            setCurrencySymbol={setCurrencySymbol}
            countryCode={countryCode}
          />
        )}
        {product === "whatsapp" && (
          <Pricingwp
            subscriptionWhatsapp={subscriptionWhatsapp}
            fetchSubscriptionWhatsapp={fetchSubscriptionWhatsapp}
            currency={currency}
            currencySymbol={currencySymbol}
            oneTimeWtsAppFee={oneTimeWtsAppFee}
          />
        )}
        {product === "rcs" && <Pricingrcs />}
        {product === "otp" && (
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
        {product === "hello" && <Pricinghello countryCode={countryCode} />}
        {product === "segmento" && (
          <Pricingsegmento
            subscriptionSegmento={subscriptionSegmento}
            fetchSubscriptionSegmento={fetchSubscriptionSegmento}
            currency={currency}
            currencySymbol={currencySymbol}
          />
        )}
        {product === "campaign" && <Pricingcampaign />}
        {product === "knowledgebase" && <Pricingknowledgebase />}
      </div>
    </>
  );
};

export default PricingComp;