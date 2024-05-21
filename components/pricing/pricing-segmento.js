// import {MdDoneOutline} from "react-icons/md"
// import { MdDone, MdClose } from "react-icons/md";
// import Link from "next/link";
// import {useEffect, useState } from "react";
// import { setUtm } from "../pricingComp";
// const pricingsegmento = ({subscriptionSegmento, fetchSubscriptionSegmento,countryCode , currency}) => {
//   const [symbol, setSymbol] = useState("₹");
//   const [selectedMode, setSelectedMode] = useState("Monthly");
//   const [selectedCurrency, setSelectedCurrency] = useState('INR');
//     const changeCurrency = async(currency) => {
//       setSelectedCurrency(currency);
      
//       try {
//         const response = await fetchSubscriptionSegmento(currency, '2',"subscriptionSegmento");
  
//       } catch (error) {
//         console.log(error.message,"error")
//       }
      
//       switch (currency) {
//         case "INR":
//           setSymbol("₹");
//           break;
//         case "USD":
//         setSymbol("$");
//           break;      
//         case "GBP":
//           setSymbol("£");
//           break;
//       }
//     };
//     const numberWithCommas = (x) => {
//       let nf = (currency === 'INR') ? new Intl.NumberFormat('en-IN') : new Intl.NumberFormat('en-US');    
//       return nf.format(x);
//     }
//     useEffect(() => {    
//       setUtm();
//     }, []);  

// return (
//     <>
//     <div className="d-flex justify-content-center">
//       <select style={{width: 'fit-content'}} className="form-select me-4" aria-label="Default select example" onChange={(e)=>changeCurrency(e.target.value)}>
//         <option value="INR">INR</option>
//         <option value="USD">USD</option>
//         <option value="GBP">GBP</option>
//       </select>
//       <select style={{width: 'fit-content'}} className="form-select" aria-label="Default select example" onChange={(e)=>setSelectedMode(e.target.value)}>
//         <option value="Monthly">Monthly</option>
//         <option value="Yearly">Yearly</option>
//       </select>
//     </div>
//       <div className="d-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-end">
//         {subscriptionSegmento?.length ?
//           subscriptionSegmento?.map((item, index) => {
//             return(
//               <div key={`email-card-${index}`} className="mx-3">
//                 <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ">
//                   {/* <div className="popular-chip c-fs-6">POPULAR</div> */}
//                    <div className=" price-card email card text-center mb-4 mb-sm-0 c-bg-grey">                  
//                     <div className="card-body">
//                       <h3 className="c-fs-3">{item.name}</h3>
//                       <h5 className="mt-2 c-fs-2 text-green">
//                         {symbol}
//                         {(selectedMode === 'Monthly') ? item?.plan_amounts[0]?.plan_amount : item?.plan_amounts[1]?.plan_amount}
//                         /
//                         {(selectedMode === 'Monthly') ? 'Month' : 'Yearly'}
//                       </h5>
//                       <p className="c-fs-5"> 
//                         {(item.plan_amounts[0]?.plan_amount === 0) ? '-' : '+18%GST'}
//                       </p>
//                       <div className="c-fs-5 mt-2">
//                         <span className="text-success">
//                           <MdDone />
//                         </span>
//                         {numberWithCommas(item.plan_services[0]?.service_credit.free_credits)} free Credits
//                         {/* {item?.plan_services[0]?.service_credit?.free_credits}  */}
//                         {item.show_features && item.planFeatures.map((data) => {
//                             if (data.is_visible === 1) {
//                               var feature = data?.feature?.key;
//                               feature = feature.replace(/_/g, " ");
//                               return (
//                                 <p>
//                                   <span className="text-success">
//                                     <MdDone />
//                                   </span>
//                                   {feature}
//                                 </p>
//                               );
//                             }
//                           })}
//                       </div>
//                       {/* <div className="c-fs-5 ">                  
//                           {
//                           (item.plan_amounts[0].plan_amount === 0) ? 
//                           <span className="text-danger"><MdClose /></span> 
//                           : 
//                           <span className="text-success"><MdDone /></span> 
//                           }
//                           {numberWithCommas(item.plan_services[1]?.service_credit?.free_credits)} Hello Chats
//                       </div> */}

//                       {item.postpaid_allowed &&
//                       <div className="c-fs-5 mt-4">
//                         <strong>Extra</strong>
//                         <div>{symbol} {item.plan_services[0]?.service_credit?.service_credit_rates[0]?.follow_up_rate} per Chat</div>                      
//                         {/* <div>{symbol} {item.plan_services[1]?.service_credit?.service_credit_rates[0]?.follow_up_rate} per Chat Validation</div>                       */}
//                       </div>
//                       }

//                       <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
//                         Get Started
//                       </a>
//                     </div>
//                   </div>
//                 </div>  
//               </div>
//             )
//           }):''
//         }
//         <div className="card price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">
//           <div className="card-body">
//             <h3 className="c-fs-3">CUSTOM</h3>                  
//             <p className="c-fs-5">Talk to sales for a customized plan.</p>
//             <button data-bs-toggle="modal" data-bs-target="#custom-pricing-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
//               Talk to sales
//             </button>
//           </div>
//         </div>
        
//       </div>




//       {/* <div className="price-card rcs d-flex col-11 col-lg-10 flex-column mx-auto c-bg-grey p-4">
//       <h3 className="c-fs=3">Connect to our team for the customized pricing</h3>
//       <a href="/contact-us" className="btn btn-outline-dark col-6 col-sm-5 col-md-3 mx-auto mt-3">Talk to an Expert</a>
//       </div> */}
//     </>
//   );
// };

// export default pricingsegmento;


import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
const pricingsegmento = ({subscriptionSegmento, fetchSubscriptionSegmento}) => {
  const [selectedMode, setSelectedMode] = useState("Monthly");
  const [symbol, setSymbol] = useState("₹");
  
  const changeCurrency = (currency) => {    
    fetchSubscriptionSegmento(currency, '5');
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
  return <>
      {/* <div className="d-flex justify-content-center mb-4">
        <select style={{width: 'fit-content'}} className="form-select me-4" aria-label="Default select example" onChange={(e)=>changeCurrency(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
        <select style={{width: 'fit-content'}} className="form-select" aria-label="Default select example" onChange={(e)=>setSelectedMode(e.target.value)}>
          <option value="Monthly">Monthly</option>
          <option value="Half yearly">Half Yearly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="d-flex flex-wrap flex-gap justify-content-center w-100  card-container align-items-end">
      {subscriptionSegmento?.length ?
          subscriptionSegmento?.map((item, index) => {
            return(
              <div key={`email-card-${index}`} className="mx-3">
              {item.plan_amounts[0]?.plan_amount === 7500
              ?              
                <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ">
                  <div className="popular-chip c-fs-6">POPULAR</div>
                  <div className="card-popular price-card segmento card text-center mb-4 mb-sm-0 c-bg-grey">                  
                    <div className="card-body">
                      <h3 className="c-fs-3">{item.name}</h3>
                      <h5 className="c-fs-2 mt-2 text-green">
                        {symbol}
                        {(selectedMode === 'Monthly') ? item.plan_amounts[2]?.plan_amount : (selectedMode === 'Half yearly') ? item.plan_amounts[1]?.plan_amount : item.plan_amounts[0]?.plan_amount}
                        /
                        {(selectedMode === 'Monthly') ? 'Month' : (selectedMode === 'Half yearly') ? 'Half yearly' : 'Yearly'}
                      </h5>
                      <p className="c-fs-5"> 
                        {(item.plan_amounts[0]?.plan_amount === 0) ? '-' : '+18%GST'}
                      </p>
                      <div className="c-fs-5 mt-2">
                        <span className="text-success c-fs-3">
                          <MdDone />
                        </span>
                        {item.plan_services[0].service_credit.free_credits} for Outbound calls
                      </div>                    
                      <a href="/signup?service=segmento" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              :
                <div className="card price-card segmento border-0 text-center mb-4 mb-sm-0 c-bg-grey">                
                  <div className="card-body">
                    <h3 className="c-fs-3">{item.name}</h3>
                    <h5 className="c-fs-4 mt-2">
                      {symbol}
                      {(selectedMode === 'Monthly') ? item.plan_amounts[0]?.plan_amount : item.plan_amounts[1].plan_amount}
                      /
                      {(selectedMode === 'Monthly') ? 'Monthly' : 'Yearly'}
                    </h5>
                    <p className="c-fs-5"> 
                      {(item.plan_amounts[0]?.plan_amount === 0) ? '-' : '+18%GST'}
                    </p>
                    <div className="c-fs-5 mt-2">
                      <span className="text-success c-fs-3">
                        <MdDone />
                      </span>
                      {item.plan_services[0].service_credit.service_credit_rates[0].free_credits} for Whatsapp
                    </div>                    
                    <a href="/signup?service=segmento" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
                      Get Started
                    </a>
                  </div>
                </div>
              }
              </div>
            )
          }):''
      }
        <div className="card price-card segmento border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div className="card-body">
            <h3 className="c-fs-3">CUSTOM</h3>                  
            <p className="c-fs-5">Talk to sales for a customized plan.</p>
            <button data-bs-toggle="modal" data-bs-target="#custom-pricing-modal" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2">
              Talk to sales
            </button>
          </div>
        </div>
      </div> */}
      <div className="price-card rcs bg-white rounded-2 p-4">
      <h2 className="text-start fw-bold c-fs-1 text-green">Free</h2>
      <h3 className="card-write c-fs-3 my-3 c-fw-m">You can store user information for free using Segmento.</h3>
      <a
        href="/signup?service=segmento"
        target="_blank"
        className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3`}
      >
          Get Started
      </a>
      </div>
      <a className="more-about" href="/segmento"> 
        <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
        <span>Know more about Segmento</span>
      </a>
    </>
};

export default pricingsegmento;
