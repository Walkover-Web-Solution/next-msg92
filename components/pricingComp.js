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
import Link from "next/link"; 

const PricingComp = ({ countryCode, product, brawserPath }) => {
  console.log("bbfbfbf", brawserPath)
  var pathLength = brawserPath?.split("/")[1].length;
  var pathLengthCond = true
  if (pathLength === 2)
  {
    console.log("inside if ");
    pathLengthCond = true;
  }
  else{
    console.log("inside else");
    pathLengthCond = false;
  }

  console.log("pathLength", pathLengthCond)




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
    // console.log("clicked in sms data for global");
    amountArr = origin == "India" && currency == "INR" ? amountArr : ["5000"];
    console.log(amountArr,"aoutnarr")
    changeCurrencySymbol(currency);
    try {
      const fetchRequests = amountArr.map(async (amount) => {
        const response = await axios.get(
          `https://test.msg91.com/api/v5/web/fetchPricingDetails?amount=${amount}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
        );
        console.log(response, "response in sms");
        return response.data.data;
      });
  
      const newData = await Promise.all(fetchRequests);
      setPricing([...newData]);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching pricing details:", error);
    }
  };

  const fetchSubscription = async (currency, msId,state) => {
    try {
      changeCurrencySymbol(currency);
      const response = await axios.get(
        `https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`
      );
      console.log(response,"reposne")
      switch (state) {
        case "subscriptionEmail":
          setSubscriptionEmail([...response.data.data]);
          break;
        case "SubscriptionWhatsapp":
          setSubscriptionWhatsapp([...response.data.data]);
          break;
          case "SubscriptionSegmento":
            setSubscriptionSegmento([...response.data.data]);
            break;
          case "SubscriptionVoice":
            setSubscriptionVoice([...response.data.data]);
            break;
          case "SubscriptionSegmento":
            setSubscriptionSegmento([...response.data.data]);
            break;
        default:
          break;
      }
      
    } catch (error) {
      throw new Error("Some error on server: " + error.message);
    }
  };

  const findCountry = async (code) => {
    const response = await countries?.find((el) => el.sortname === code);

    console.log(response, "response for find country");
    //console.log('findCountry, response?.currency:', response?.currency, 'code', code);
    setCurrency(response?.currency);
    fetchSMSData(response?.currency, response?.name, response?.name);
  };

  useEffect(() => {
    // const selectedcountryCode =  countryCode|| defaultCountryCode
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
          {/* for sms */}
          <Link
            href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/sms":"/pricing/sms"}
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
          </Link>
          {/* for email */}
          <Link
            // href="/{}/pricing/email"
            href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/email":"/pricing/email"}
            className={`nav-item ${product === 'email' ? 'active' : ''}`}
            id="email-btn"
            onClick={() => {
              fetchSubscription(currency, "1","subscriptionEmail");
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/email.svg" alt="#" />
              Email
            </span>
          </Link>
          {/* for voice */}
          <Link
            href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/voice":"/pricing/voice"}
            className={`nav-item ${product === 'voice' ? 'active' : ''}`}
            id="voice-btn"
          >
            <span className="nav-link">
              <img src="/img/icon/voice.svg" alt="#" />
              Voice
            </span>
          </Link>

          {/* for whatsapp */}
          <Link
           href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/whatsapp":"/pricing/whatsapp"}
            className={`nav-item ${product === 'whatsapp' ? 'active' : ''}`}
            id="wp-btn"
            onClick={() => {
              fetchSubscription(currency, "5","SubscriptionWhatsapp");
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/whatsapp.svg" alt="#" />
              WhatsApp
            </span>
          </Link>
          {/* for RCS */}
          <Link
          href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/rcs":"/pricing/rcs"}
           className={`nav-item ${product === 'rcs' ? 'active' : ''}`}
            id="rcs-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/rcs.svg" alt="#" />
              RCS
            </span>
          </Link>
          <Link
           href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/otp":"/pricing/otp"}
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
          </Link>
          <Link
           href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/hello":"/pricing/hello"}
           className={`nav-item ${product === 'hello' ? 'active' : ''}`}
            id="hello-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/hello.svg" alt="#" />
              Hello
            </span>
          </Link>
          <Link
            href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/segmento":"/pricing/segmento"}
            className={`nav-item ${product === 'segmento' ? 'active' : ''}`}
            id="segmento-btn"
            onClick={() => {
              fetchSubscription(currency, "2","SubscriptionSegmento");
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/segmento.svg" alt="#" />
              Segmento
            </span>
          </Link>
          <Link 
           href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/campaign":"/pricing/campaign"}
           className={`nav-item ${product === 'campaign' ? 'active' : ''}`}
            id="campaign-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/campaign.svg" alt="#" />
              Campaign
            </span>
          </Link>
          <Link
          href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/knowledgebase":"/pricing/knowledgebase"}
           className={`nav-item ${product === 'knowledgebase' ? 'active' : ''}`}
            id="kb-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/knowledgebase.svg" alt="#" />
              KnowledgeBase
            </span>
          </Link>
        </div>
      </div>
      <div className="my-5 text-center container price-container">
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
            fetchSubscriptionEmail={fetchSubscription}
            currency={currency}
            currencySymbol={currencySymbol}
          />
        )}
        {product === "voice" && (
          <Pricingvoice
            subscriptionVoice={subscriptionVoice}
            fetchSubscriptionVoice={fetchSubscription}
            currency={currency}
            state= {"SubscriptionVoice"}
            setCurrencySymbol={setCurrencySymbol}
            countryCode={countryCode}
          />
        )}
        {product === "whatsapp" && (
          <Pricingwp
            subscriptionWhatsapp={subscriptionWhatsapp}
            fetchSubscriptionWhatsapp={fetchSubscription}
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
            fetchSubscriptionSegmento={fetchSubscription}
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