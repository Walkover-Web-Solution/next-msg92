import { useEffect, useState } from "react";
import Footer from "@/components/footer";
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
import axios from "axios";
import { InlineWidget } from "react-calendly";
import { useRouter } from 'next/router'
import countries from "@/data/countries.json";

const PricingComp = ({countryCode}) => {
    //console.log('PricingComp countryCode', countryCode);
    var [pricing, setPricing] = useState([]);
    var [originCountry, setOriginCountry] = useState('')
    var [destinationCountry, setDestinationCountry] = useState('');
    var [currency, setCurrency] = useState('');
    var [currencySymbol, setCurrencySymbol] = useState('');
    var [oneTimeWtsAppFee, setOneTimeWtsAppFee] = useState('');
    
    var amountArr = ['1250', '3300', '5400', '10200', '20000', '76500', '154000'];

    var [subscriptionEmail, setSubscriptionEmail] = useState([]);
    var [subscriptionVoice, setSubscriptionVoice] = useState([]);
    var [subscriptionWhatsapp, setSubscriptionWhatsapp] = useState([]);
    var [subscriptionSegmento, setSubscriptionSegmento] = useState([]);  

    const changeCurrencySymbol = async (currency) => {      
      if(currency == 'INR'){
        setCurrencySymbol('₹');
        setOneTimeWtsAppFee('3000 +GST')
      }else if(currency == 'GBP'){
        setOneTimeWtsAppFee('35')
        setCurrencySymbol('£');        
      }else{
        setCurrencySymbol('$');
        setOneTimeWtsAppFee('40')        
      }            
    };

    const fetchSMSData = async (currency, origin, destination) => {
      setOriginCountry(origin);
      setDestinationCountry(destination);
      //console.log('fetchsmsdata', currency, origin, destination, countryCode);
      amountArr = (origin == 'India') && (currency == 'INR') ? amountArr : ['5000'];
      changeCurrencySymbol(currency);
      var newData = [];
      let i=0;
      for(;i<amountArr.length;i++){
        //const response = await axios.get(`https://test.msg91.com/api/v5/web/fetchPricingDetails?amount=${amountArr[i]}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`)
        const response = await axios.get(`https://api.msg91.com/api/v5/web/fetchPricingDetails?amount=${amountArr[i]}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`)
        //const response = await axios.get(`http://52.221.182.19/api/v5/web/fetchPricingDetails?amount=${amountArr[i]}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`)
        newData.push(response.data.data)
      }
      setPricing([...newData])
    };
        
  const fetchSubscriptionEmail = async (currency, msId) => {
    changeCurrencySymbol(currency);
    const response = await axios.get(`https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`)    
    setSubscriptionEmail([...response.data.data])
    // console.log(response.data.data);
  };
  const fetchSubscriptionVoice = async (currency, msId) => {
    changeCurrencySymbol(currency);
    const response = await axios.get(`https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`)    
    setSubscriptionVoice([...response.data.data])
    // console.log(response.data.data);
  };
  const fetchSubscriptionWhatsapp = async (currency, msId) => {
    changeCurrencySymbol(currency);
    const response = await axios.get(`https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`)    
    setSubscriptionWhatsapp([...response.data.data])
    // console.log(response.data.data);
  };
  const fetchSubscriptionSegmento = async (currency, msId) => {
    changeCurrencySymbol(currency);
    const response = await axios.get(`https://subscription.msg91.com/api/plans?currency=${currency}&ms_id=${msId}`)    
    setSubscriptionSegmento([...response.data.data])
    // console.log(response.data.data);
  };
  
  const findCountry = async (code) => {
    const response = await countries?.find(el => el.sortname === code);        
    //console.log('findCountry, response?.currency:', response?.currency);
    setCurrency(response?.currency);
    fetchSMSData(response?.currency, response?.name, response?.name);
  };

   
  useEffect(() => {
    findCountry(countryCode);    
  }, [countryCode]);

  return (
    <>      
      <div className="container d-flex justify-content-center">
        <div className="text-center py-5">
          <h1 className="sub-heading mb-5">
            A plan for every business and budget, Find yours today!
          </h1>
          <div className="c-fs-3">
            <div className="d-flex justify-content-center">
              <ul className="nav nav-pills c-fs-5 pb-5" id="pricing-pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{fetchSMSData(currency, originCountry, destinationCountry)}} className="nav-link active"  data-bs-toggle="pill" data-bs-target="#pills-sms" type="button" role="tab" aria-controls="pills-sms" aria-selected="true">
                    <img src="/img/icon/sms.svg" alt="#" />
                    SMS
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{fetchSubscriptionEmail(currency, '1')}} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-email" type="button" role="tab" aria-controls="pills-email" aria-selected="false">
                  <img src="/img/icon/email.svg" alt="#" />
                    Email
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{fetchSubscriptionVoice(currency, '6')}} className="nav-link"  data-bs-toggle="pill" data-bs-target="#pills-voice" type="button" role="tab" aria-controls="pills-voice" aria-selected="false">
                    <img src="/img/icon/voice.svg" alt="#" />
                    Voice
                  </button>
                </li>          
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{fetchSubscriptionWhatsapp(currency, '5')}} className="nav-link"  data-bs-toggle="pill" data-bs-target="#pills-whatsapp" type="button" role="tab" aria-controls="pills-whatsapp" aria-selected="false">
                    <img src="/img/icon/whatsapp.svg" alt="#" />
                    WhatsApp
                  </button>
                </li>          
                <li className="nav-item" role="presentation">
                  <button className="nav-link"  data-bs-toggle="pill" data-bs-target="#pills-rcs" type="button" role="tab" aria-controls="pills-rcs" aria-selected="false">
                    <img src="/img/icon/rcs.svg" alt="#" />
                    RCS
                  </button>
                </li>          
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{fetchSMSData(currency, originCountry, destinationCountry)}} className="nav-link"  data-bs-toggle="pill" data-bs-target="#pills-otp" type="button" role="tab" aria-controls="pills-otp" aria-selected="false">
                    <img src="/img/icon/otp.svg" alt="#" />
                    OTP
                  </button>
                </li>          
                <li className="nav-item" role="presentation">
                  <button className="nav-link"  data-bs-toggle="pill" data-bs-target="#pills-hello" type="button" role="tab" aria-controls="pills-hello" aria-selected="false">
                    <img src="/img/icon/hello.svg" alt="#" />
                    Hello
                  </button>
                </li>          
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{fetchSubscriptionSegmento(currency, '2')}} className="nav-link"  data-bs-toggle="pill" data-bs-target="#pills-segmento" type="button" role="tab" aria-controls="pills-segmento" aria-selected="false">
                    <img src="/img/icon/segmento.svg" alt="#" />
                    Segmento
                  </button>
                </li>          
                <li className="nav-item" role="presentation">
                  <button className="nav-link"  data-bs-toggle="pill" data-bs-target="#pills-campaign" type="button" role="tab" aria-controls="pills-campaign" aria-selected="false">
                    <img src="/img/icon/campaign.svg" alt="#" />
                    Campaign
                  </button>
                </li>          
                <li className="nav-item" role="presentation">
                  <button className="nav-link"  data-bs-toggle="pill" data-bs-target="#pills-knowledgebase" type="button" role="tab" aria-controls="pills-campaign" aria-selected="false">
                    <img src="/img/icon/knowledgebase.svg" alt="#" />
                    KnowledgeBase
                  </button>
                </li>          
              </ul>
            </div>

            <div className="tab-content d-flex " id="pills-tabContent">
              <div className="tab-pane fade show active w-100" id="pills-sms" role="tabpanel" aria-labelledby="pills-sms-tab" tabIndex={0}>
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
              </div>

              <div className="tab-pane fade w-100" id="pills-email" role="tabpanel" aria-labelledby="pills-email-tab" tabIndex={0}>
               <Pricingemail
               subscriptionEmail={subscriptionEmail}
               fetchSubscriptionEmail={fetchSubscriptionEmail}
               currency={currency}
                currencySymbol={currencySymbol}
               />
              </div>

              <div className="tab-pane fade w-100" id="pills-voice" role="tabpanel" aria-labelledby="pills-voice-tab" tabIndex={0}>
                <Pricingvoice
                subscriptionVoice={subscriptionVoice}
                fetchSubscriptionVoice={fetchSubscriptionVoice}
                currency={currency}
                setCurrencySymbol={setCurrencySymbol}
                />
              </div>

              <div className="tab-pane fade w-100" id="pills-whatsapp" role="tabpanel" aria-labelledby="pills-whatsapp-tab" tabIndex={0}>
                <Pricingwp
                subscriptionWhatsapp={subscriptionWhatsapp}
                fetchSubscriptionWhatsapp={fetchSubscriptionWhatsapp}
                currency={currency}
                currencySymbol={currencySymbol}
                oneTimeWtsAppFee={oneTimeWtsAppFee}
                />
              </div>

              <div className="tab-pane fade w-100" id="pills-rcs" role="tabpanel" aria-labelledby="pills-rcs-tab" tabIndex={0}>
                <Pricingrcs/>              
              </div>     

              <div className="tab-pane fade w-100" id="pills-otp" role="tabpanel" aria-labelledby="pills-otp-tab" tabIndex={0}>
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
              </div>

              <div className="tab-pane fade w-100" id="pills-hello" role="tabpanel" aria-labelledby="pills-hello-tab" tabIndex={0}>
                <Pricinghello/>
              </div>
              
              <div className="tab-pane fade w-100" id="pills-segmento" role="tabpanel" aria-labelledby="pills-segmento-tab" tabIndex={0}>
                <Pricingsegmento
                subscriptionSegmento={subscriptionSegmento}
                fetchSubscriptionSegmento={fetchSubscriptionSegmento}
                currency={currency}
                currencySymbol={currencySymbol}
                />
              </div>
              
              <div className="tab-pane fade w-100" id="pills-campaign" role="tabpanel" aria-labelledby="pills-campaign-tab" tabIndex={0}>
                <Pricingcampaign/>
              </div>

              <div className="tab-pane fade w-100" id="pills-knowledgebase" role="tabpanel" aria-labelledby="pills-knowledgebase-tab" tabIndex={0}>
                <Pricingknowledgebase/>              
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="custom-pricing-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">                        
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {
                (countryCode == 'IN')
                ?
                <InlineWidget url="https://calendly.com/sales-msg91/pre-sales" styles={{height: '700px'}} />
                :
                <InlineWidget url="https://calendly.com/msg91international/talktoexpert" styles={{height: '700px'}} />
              }
            </div>            
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingComp;