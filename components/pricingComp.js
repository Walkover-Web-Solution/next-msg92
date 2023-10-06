import { useEffect, useState } from "react";
import axios from "axios";
import countries from "@/data/countries.json";
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
import { getCookie } from "@/components/utils";

export function setUtm(){
  // Get all anchor tags in the document using querySelectorAll
  var anchorTags = document.querySelectorAll(".utm");
  // Loop through the anchor tags
  for (var i = 0; i < anchorTags.length; i++) {
    var href = anchorTags[i].getAttribute("href"); // Get the current href value
    var query = getCookie('msg91_query');
    if (href && query) {
      anchorTags[i].setAttribute("href", href + query);
    }
  }
}

const PricingComp = ({ countryCode, product, browserPath }) => {
  var pathLength = browserPath?.split("/")[1].length;
  var pathLengthCond = true
  if (pathLength === 2)
  {
    pathLengthCond = true;
  }
  else{
    pathLengthCond = false;
  }
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
  var [subscriptionHello, setSubscriptionHello] = useState([]);
  const[fetchCurrency, setfetchCurrency] = useState();
  const [fetchMsId, setfetchMsId] = useState("");
  const[states, setStates] = useState()

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
  const fetchemailData =async()=>{
    setfetchCurrency(currency);
    setfetchMsId("1");
    setStates("subscriptionEmail");
    fetchSubscription(currency,"1","subscriptionEmail")
  }
  const fetchSegmentoData = async()=>{
    setfetchCurrency(currency);
    setfetchMsId("2");
    setStates("subscriptionSegmento");
    fetchSubscription(currency,"2","subscriptionSegmento")
  }
  const fetchHelloData = async()=>{
    setfetchCurrency(currency);
    setfetchMsId("7");
    setStates("SubscriptionHello");
    fetchSubscription(currency,"7","subscriptionHello")
  }
  const fetchWhatsAppData = async()=>{
    setfetchCurrency(currency);
    setfetchMsId("5");
    setStates("SubscriptionWhatsapp");
    fetchSubscription(currency,"5","SubscriptionWhatsapp")
  }
  useEffect(()=>{
    if(product === "email"){
      fetchemailData(currency)
    }
    else if(product === "segmento"){
      fetchSegmentoData(currency)
      }
    else if(product === "whatsapp"){
    fetchWhatsAppData(currency)
    }
    else if(product === "hello"){
      fetchHelloData(currency)
      }
  },[product, currency]);
  const fetchSMSData = async (currency, origin, destination) => {
    setOriginCountry(origin);
    setDestinationCountry(destination);
    amountArr = origin == "India" && currency == "INR" ? amountArr : ["5000"];
    changeCurrencySymbol(currency);
    try {
      const fetchRequests = amountArr.map(async (amount) => {
        const response = await axios.get(
          `https://api.msg91.com/api/v5/web/fetchPricingDetails?amount=${amount}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
          )

        /* const response = await axios.get(
          `https://test.msg91.com/api/v5/web/fetchPricingDetails?amount=${amount}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
        ); */
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
      switch (state) {
        case "subscriptionEmail":
          setSubscriptionEmail([...response.data.data]);
          break;
        case "SubscriptionWhatsapp":
          setSubscriptionWhatsapp([...response.data.data]);
          break;
          case "subscriptionSegmento":
            setSubscriptionSegmento([...response.data.data]);
            break;
          case "SubscriptionVoice":
            setSubscriptionVoice([...response.data.data]);
            break;
          case "subscriptionHello":
            setSubscriptionHello([...response.data.data]);
            break;
        default:
          break;
      }
      
    } catch (error) {
      // throw new Error("Some error on server: " + error.message);
    }
  };
  
  const findCountry = async (code) => {
    const response = await countries?.find((el) => el.sortname === code);
    setCurrency(response?.currency);
    fetchSMSData(response?.currency, response?.name, response?.name);

    if(product === "email"){
      fetchemailData(response?.currency);
    }
    else if(product === "segmento"){
      fetchSegmentoData(response?.currency);
    }
    else if(product === "whatsapp"){
      fetchWhatsAppData(response?.currency);
    }
    else if(product === "hello"){
      fetchHelloData(response?.currency);
    }
  };  

  useEffect(() => {
    findCountry(countryCode);    
  }, [countryCode]);


  return (
    <>
      {/* <Head>                
        <link rel="canonical" href={`https://msg91.com${browserPath}`} />                
        <link rel="alternate" hreflang="x-default" href="https://msg91.com" />
        <link rel="alternate" hreflang={hreflang} href={`https://msg91.com/${country}`} />
        {country && 
          <link rel="alternate" hreflang={hreflang} href={`https://msg91.com/${country}`} />
        }
      </Head> */}
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
              <img src="/img/icon/sms.svg" alt="#" className="icon"/>
              SMS
            </span>
          </Link>

          {/* for email */}
          <Link
            href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/email":"/pricing/email"}
            className={`nav-item ${product === 'email' ? 'active' : ''}`}
            id="email-btn"
            onClick={() => {
              fetchSubscription(currency, "1","subscriptionEmail");
            }}
          >
            <span className="nav-link"> 
              <img src="/img/icon/email.svg" alt="#" className="icon" />
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
              <img src="/img/icon/voice.svg" alt="#" className="icon" />
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
              <img src="/img/icon/whatsapp.svg" alt="#" className="icon" />
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
              <img src="/img/icon/rcs.svg" alt="#" className="icon" />
              RCS
            </span>
          </Link>

          {/* link for otp */}
          <Link
           href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/otp":"/pricing/otp"}
            className={`nav-item ${product === 'otp' ? 'active' : ''}`}
            id="otp-btn"
            onClick={() => {
              fetchSMSData(currency, originCountry, destinationCountry);
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/otp.svg" alt="#" className="icon"/>
              OTP
            </span>
          </Link>

           {/* link for hello */}
          <Link
           href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/hello":"/pricing/hello"}
           className={`nav-item ${product === 'hello' ? 'active' : ''}`}
           id="hello-btn"
           onClick={()=>{
            fetchSubscription(currency, "7","subscriptionHello");
           }}
            >
            <span className="nav-link">
              <img src="/img/icon/hello.svg" alt="#" className="icon" />
              Hello
            </span>
          </Link>

           {/* link for segmento */}
          <Link
            href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/segmento":"/pricing/segmento"}
            className={`nav-item ${product === 'segmento' ? 'active' : ''}`}
            id="segmento-btn"
            onClick={() => {
              fetchSubscription(currency, "2","subscriptionSegmento");
            }}
          >
            <span className="nav-link">
              <img src="/img/icon/segmento.svg" alt="#" className="icon"/>
              Segmento
            </span>
          </Link>

           {/* link for campaign */}
          <Link 
           href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/campaign":"/pricing/campaign"}
           className={`nav-item ${product === 'campaign' ? 'active' : ''}`}
            id="campaign-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/campaign.svg" alt="#" className="icon"/>
              Campaign
            </span>
          </Link>
          
           {/* link for knowledgebase */}
          <Link
          href={pathLengthCond ? "/"+countryCode.toLowerCase()+"/pricing/knowledgebase":"/pricing/knowledgebase"}
           className={`nav-item ${product === 'knowledgebase' ? 'active' : ''}`}
            id="kb-btn"
            >
            <span className="nav-link">
              <img src="/img/icon/knowledgebase.svg" alt="#" className="icon" />
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
          setSubscriptionEmail={setSubscriptionEmail}
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
        {product === "hello" && (
        <Pricinghello
           setSubscriptionHello={setSubscriptionHello}
            subscriptionHello={subscriptionHello}
            fetchSubscriptionHello={fetchSubscription}
            currency={currency}
            state= {"SubscriptionHello"}
            setCurrencySymbol={setCurrencySymbol}
            countryCode={countryCode}
          />
        )}       
        {product === "segmento" && (
          <Pricingsegmento
            subscriptionSegmento={subscriptionSegmento}
            setSubscriptionSegmento={setSubscriptionSegmento}
            fetchSubscriptionSegmento={fetchSubscription}
            currency={currency}
            state= {"subscriptionSegmento"}
            setCurrencySymbol={setCurrencySymbol}
            countryCode={countryCode}
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