import { MdDone } from "react-icons/md";
import { useEffect, useState } from "react";
import { setUtm } from "../pricingComp";

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
      <div className="price-card whatsapp bg-white p-4">
<<<<<<< HEAD
      <h3 className="text-start fw-bold fs-4 text-green">Zero <span className="text-dark d-inline">markup on meta price</span></h3>
     <a className="link d-block mt-3" href="#">Check meta pricing</a>
=======
      <h3 className="text-start fw-bold fs-4 text-green">Zero <span className="text-dark d-inline mb-3">margin on meta price</span></h3>
     <a className="link" href="#">Check meta pricing</a>
>>>>>>> 6ec587890189abacc6c06e735501f2ef2444a2fe
      <h3 className="tds c-fs-4">TDS and GST excluded.</h3>
      <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-4 btn btn-dark rounded-1 py-2 px-3 mt-3">
        Get Started
      </button>
      {/* <a href="/contact-us" className="btn btn-outline-dark col-6 col-sm-5 col-md-3 mx-auto mt-3">Talk to an Expert</a> */}
    </div>
    <a className="link" href="#"> 
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            <span>Know more about WhatsApp</span>
          </a> 
    </>
  );
};

export default pricingwp;
 