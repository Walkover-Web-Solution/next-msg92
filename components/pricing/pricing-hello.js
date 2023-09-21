import {MdDoneOutline} from "react-icons/md"
import { MdDone, MdClose } from "react-icons/md";
import Link from "next/link";
import {useEffect, useState } from "react";
import { setUtm } from "../pricingComp";
const pricinghello = ({subscriptionHello, fetchSubscriptionHello,countryCode , currency}) => {
  console.log(currency, "currency");
  console.log(subscriptionHello, "subscriptionHello");
  const [symbol, setSymbol] = useState("₹");
  const [selectedMode, setSelectedMode] = useState("Monthly");
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const notavailable = "/img/not-available-red.svg";
  const available = "/img/available-green.svg";
  let basicprice = "0";
  let basicRate = "0";
  let premiumprice = "0";
  let premiumRate = "0";
  if (countryCode == "IN") {
    basicprice = "₹500";
    basicRate = "₹0.50";
    premiumprice = "₹1000";
    premiumRate = "₹0.75";
  } else {
    basicprice = "$10";
    basicRate = "$0.0061";
    premiumprice = "$20";
    premiumRate = "$0.0091";
  }
  
    const changeCurrency = async(currency) => {
      console.log(currency, "change currency");
      setSelectedCurrency(currency);
      
      try {
        const response = await fetchSubscriptionHello(currency, '7',"subscriptionHello");
        console.log(response, "response from hello api");
  
      } catch (error) {
        console.log(error.message,"error")
      }
      
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
    const numberWithCommas = (x) => {
      let nf = (currency === 'INR') ? new Intl.NumberFormat('en-IN') : new Intl.NumberFormat('en-US');    
      return nf.format(x);
    }
    useEffect(() => {    
      setUtm();
    }, []);  

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
        {subscriptionHello?.length ?
          subscriptionHello?.map((item, index) => {
            return(
              <div key={`email-card-${index}`} className="mx-3">
                <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ">
                  {/* <div className="popular-chip c-fs-6">POPULAR</div> */}
                   <div className=" price-card email card text-center mb-4 mb-sm-0 c-bg-grey">                  
                    <div className="card-body">
                      <h3 className="c-fs-3">{item.name}</h3>
                      <h5 className="mt-2 c-fs-2 text-green">
                        {symbol}
                        {(selectedMode === 'Monthly') ? item?.plan_amounts[0]?.plan_amount : item?.plan_amounts[1]?.plan_amount}
                        /
                        {(selectedMode === 'Monthly') ? 'Month' : 'Yearly'}
                      </h5>
                      <p className="c-fs-5"> 
                        {(item.plan_amounts[0]?.plan_amount === 0) ? '-' : '+18%GST'}
                      </p>
                      <div className="c-fs-5 mt-2">
                        <span className="text-success">
                          <MdDone />
                        </span>
                        {numberWithCommas(item.plan_services[0].service_credit.free_credits)} free Credits
                        {/* {item?.plan_services[0]?.service_credit?.free_credits}  */}
                        {item.show_features && item.planFeatures.map((data) => {
                            if (data.is_visible === 1) {
                              var feature = data?.feature?.key;
                              feature = feature.replace(/_/g, " ");
                              return (
                                <p>
                                  <span className="text-success">
                                    <MdDone />
                                  </span>
                                  {feature}
                                </p>
                              );
                            }
                          })}
                      </div>
                      <div className="c-fs-5 ">                  
                          {
                          (item.plan_amounts[0].plan_amount === 0) ? 
                          <span className="text-danger"><MdClose /></span> 
                          : 
                          <span className="text-success"><MdDone /></span> 
                          }
                          {numberWithCommas(item.plan_services[1].service_credit.free_credits)} Hello Chats
                      </div>

                      {item.postpaid_allowed &&
                      <div className="c-fs-5 mt-4">
                        <strong>Extra</strong>
                        <div>{symbol} {item.plan_services[0].service_credit.service_credit_rates[0].follow_up_rate} per Chat</div>                      
                        <div>{symbol} {item.plan_services[1].service_credit.service_credit_rates[0].follow_up_rate} per Chat Validation</div>                      
                      </div>
                      }

                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>  
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




     <div className="col-12 col-md-8 col-xl-9 text-start p-4 bg-white ">
      <h3>Customer support Platform</h3>
      <div className="d-flex"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">Integrate multiple channels on a single platform - Email, RCS, social media, call & more</p></div>
      <div className="d-flex mt-2"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">Track, monitor, analyze agent performance</p></div>
      <div className="d-flex mt-2"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">18*7 free customer support</p></div>
     </div>
     {/* <div className="c-bg-grey col-12 col-md-4 col-xl-3  p-4 text-start">
      <h3 className="c-fs-3">Access platform for FREE</h3>
      <p className="c-fs-4 mt-2">Pay only for the channels you use</p>
      <Link href="https://control.msg91.com/signup/" target="_blank" className="btn btn-outline-dark mt-3 px-5 utm">Get Started</Link>
     </div> */}
    </>
  );
};

export default pricinghello;
