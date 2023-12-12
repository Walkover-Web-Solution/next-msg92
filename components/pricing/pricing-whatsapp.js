import { MdDone } from "react-icons/md";
import { useEffect, useState } from "react";
import { setUtm } from "@/components/utils";

const pricingwp = ({subscriptionWhatsapp, fetchSubscriptionWhatsapp, oneTimeWtsAppFee,countryCode}) => {
  var change
  var changeSymbol
  if(countryCode === 'US' || countryCode === 'AE' ||  countryCode === 'SG' || countryCode === 'PH'){
    change = 'USD'
    changeSymbol = '$'
  }
  else if(countryCode === 'GB' || countryCode === 'ES'){
    change = 'GBP'
    changeSymbol = '£'
  }
  else if (countryCode === 'IN'){
    change = 'INR'
    changeSymbol = '₹'
  }
  const [selectedMode, setSelectedMode] = useState("Monthly");  
  const [selectedCurrency, setSelectedCurrency] = useState(change);
  const [onetime, setOnetime] = useState("");
  const [symbol, setSymbol] = useState(changeSymbol);
  
  const changeCurrency = (currency) => {
    setSelectedCurrency(currency);
    fetchSubscriptionWhatsapp(currency, '5');
    switch (currency) {
      case "INR":      
        setSymbol('₹');  
        setOnetime('3000')
        break;
      case "USD":
        setSymbol('$');
        setOnetime('38')
        break;      
      case "GBP":
        setSymbol('£');
        setOnetime('32')
        break;
    }
  };

  useEffect(() => {    
    setUtm();
  }, []);  

  return (
    <>
      <div className="d-flex justify-content-center mb-4">
        <select style={{width: 'fit-content'}} className="form-select me-4" aria-label="Default select example" value={selectedCurrency} onChange={(e)=>changeCurrency(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
        {/* <select style={{width: 'fit-content'}} className="form-select" aria-label="Default select example" onChange={(e)=>setSelectedMode(e.target.value)}>
          <option value="Monthly">Monthly</option>
          <option value="Half yearly">Half Yearly</option>
          <option value="Yearly">Yearly</option>
        </select> */}
      </div>
      <div className="d-flex flex-wrap flex-gap justify-content-center w-100  card-container align-items-end">
      {subscriptionWhatsapp?.length ?
          subscriptionWhatsapp?.map((item, index) => {
            return(
              <div key={`email-card-${index}`} className="mx-3">
              {item.plan_amounts[0]?.plan_amount === 7500
              ?              
                <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ">
                  <div className="popular-chip c-fs-6">POPULAR</div>
                  <div className="card-popular price-card whatsapp card text-center mb-4 mb-sm-0 c-bg-grey">                  
                    <div className="card-body">
                      <h3 className="c-fs-3">{item.name}</h3>
                      <h5 className="mt-2 c-fs-2 text-green">
                        {symbol}
                        {(selectedMode === 'Monthly') ? item.plan_amounts[2]?.plan_amount : (selectedMode === 'Half yearly') ? item.plan_amounts[1]?.plan_amount : item.plan_amounts[0]?.plan_amount}
                        /
                        {(selectedMode === 'Monthly') ? 'Month' : (selectedMode === 'Half yearly') ? 'Half yearly' : 'Yearly'}
                      </h5>
                      <p className="c-fs-5">+</p>
                      <a href="https://developers.facebook.com/docs/whatsapp/pricing" target="_blank" className="c-fs-5">WhatsApp Pricing</a>
                      <p className="c-fs-5"> 
                        {(item.plan_amounts[0]?.plan_amount === 0) ? '' : '+18%GST'}
                      </p>
                      <div className="c-fs-5 mt-2">
                        <span className="text-success c-fs-3">
                          <MdDone />
                        </span>
                        {item.plan_services[0].service_credit.free_credits} for Outbound calls
                      </div>                    
                      <a href="/signup?service=whatsapp" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              :
                <div className="card price-card whatsapp border-0 text-center mb-4 mb-sm-0 c-bg-grey">                
                  <div className="card-body justify-content-between">
                    <h3 className="c-fs-3">{item.name}</h3>
                    <h5 className="mt-2 c-fs-2 text-green">
                      {symbol}
                      {(selectedMode === 'Monthly') ? item.plan_amounts[0]?.plan_amount : item.plan_amounts[1].plan_amount}
                      /
                      {(selectedMode === 'Monthly') ? 'Monthly' : 'Yearly'}
                    </h5>
                    <p className="c-fs-5">+</p>
                    <a href="https://developers.facebook.com/docs/whatsapp/pricing" target="_blank" className="c-fs-5">WhatsApp Pricing</a>
                    <p className="c-fs-5"> 
                      {(item.plan_amounts[0]?.plan_amount === 0) ? '' : '+18%GST'}
                    </p>
                    <div className="c-fs-5 mt-2">
                      <span className="text-success c-fs-3">
                        <MdDone />
                      </span>
                      Free balance of {symbol} {item.plan_services[0].service_credit.service_credit_rates[0].free_credits}
                    </div>                    
                    <a href="/signup?service=whatsapp" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                      Get Started
                    </a>
                  </div>
                </div>
              }
              </div>
            )
          }):''
      }
        <div className="card price-card whatsapp border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div className="card-body justify-content-between">
            <h3 className="c-fs-3">CUSTOM</h3>                  
            <p className="c-fs-5">Talk to sales for a customized plan.</p>
            <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
              Talk to sales
            </button>
          </div>
        </div>
      </div>
      <div className="c-fs-5 mt-5">
        MSG91 takes one time fee <strong>{symbol}{oneTimeWtsAppFee}</strong> to set up your WhatsApp Business account.
      </div>
    </>
  );
};

export default pricingwp;
