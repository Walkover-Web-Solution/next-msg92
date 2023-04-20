import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";

const pricingemail = ({subscriptionEmail, fetchSubscriptionEmail}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedMode, setSelectedMode] = useState("Monthly");
  const [symbol, setSymbol] = useState("₹");
  
  const changeCurrency = (currency) => {
    setSelectedCurrency(currency);
    fetchSubscriptionEmail(currency, '1');
    switch (currency) {
      case "INR":
        setSymbol("₹");
        break;
      case "USD":
      setSymbol("$");
        break;      
      case "GBP":
        setSymbol("£");
        break;
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center">
      <select style={{width: 'fit-content'}} className="form-select me-4" aria-label="Default select example" onChange={(e)=>changeCurrency(e.target.value)}>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
      <select style={{width: 'fit-content'}} className="form-select" aria-label="Default select example" onChange={(e)=>setSelectedMode(e.target.value)}>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
    </div>
      <div className="d-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-end">
        {subscriptionEmail?.length ?
          subscriptionEmail?.map((item, index) => {
            return(
              <div key={`email-card-${index}`} className="mx-3">
              {item.plan_amounts[0].plan_amount === 7500
              ?
                <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ">
                  <div className="popular-chip c-fs-6">POPULAR</div>
                  <div className="card-popular price-card email card text-center mb-4 mb-sm-0 c-bg-grey">                  
                    <div className="card-body">
                      <h3 className="c-fs-3">{item.name}</h3>
                      <h5 className="mt-2 c-fs-2 text-green">
                        {symbol}
                        {(selectedMode === 'Monthly') ? item.plan_amounts[0].plan_amount : item.plan_amounts[1].plan_amount}
                        /
                        {(selectedMode === 'Monthly') ? 'Month' : 'Yearly'}
                      </h5>
                      <p className="c-fs-5"> 
                        {(item.plan_amounts[0].plan_amount === 0) ? '-' : '+18%GST'}
                      </p>
                      <div className="c-fs-5 mt-2">
                        <span className="text-success c-fs-3">
                          <MdDone />
                        </span>
                        {item.plan_services[0].service_credit.free_credits} Emails
                      </div>
                      <div className="c-fs-5 ">                  
                          {
                          (item.plan_amounts[0].plan_amount === 0) ? 
                          <span className="text-danger c-fs-3"><MdClose /></span> 
                          : 
                          <span className="text-success c-fs-3"><MdDone /></span> 
                          }
                        {item.plan_services[1].service_credit.free_credits} Email Verifications
                      </div>

                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>  
              :
                <div className="card price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">                
                  <div className="card-body">
                    <h3 className="c-fs-3">{item.name}</h3>
                    <h5 className="mt-2 c-fs-2 text-green">
                      {symbol}
                      {(selectedMode === 'Monthly') ? item.plan_amounts[0].plan_amount : item.plan_amounts[1].plan_amount}
                      /
                      {(selectedMode === 'Monthly') ? 'Month' : 'Yearly'}
                    </h5>
                    <p className="c-fs-5"> 
                      {(item.plan_amounts[0].plan_amount === 0) ? '-' : '+18%GST'}
                    </p>
                    <div className="c-fs-5 mt-2">
                      <span className="text-success c-fs-3">
                        <MdDone />
                      </span>
                      {item.plan_services[0].service_credit.free_credits} Emails
                    </div>
                    <div className="c-fs-5 ">                  
                        {
                        (item.plan_amounts[0].plan_amount === 0) ? 
                        <span className="text-danger c-fs-3"><MdClose /></span> 
                        : 
                        <span className="text-success c-fs-3"><MdDone /></span> 
                        }
                      {item.plan_services[1].service_credit.free_credits} Email Verifications
                    </div>

                    <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                      Get Started
                    </a>
                  </div>
                </div>
              }
              </div>
            )
          }):''
        }
        <div className="card price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div className="card-body">
            <h3 className="c-fs-3">CUSTOM</h3>                  
            <p className="c-fs-5">Talk to sales for a customized plan.</p>
            <button data-bs-toggle="modal" data-bs-target="#custom-pricing-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
              Talk to sales
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default pricingemail;
