import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { setUtm } from "@/components/utils";
const pricingemail = ({subscriptionEmail, fetchSubscriptionEmail, currency,setSubscriptionEmail, countryCode}) => {
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
  // ph,global
  const [selectedCurrency, setSelectedCurrency] = useState(change);
  const [selectedMode, setSelectedMode] = useState("Monthly");
  const [symbol, setSymbol] = useState(changeSymbol);

  const changeCurrency = async (currency) => {
    setSelectedCurrency(currency);
    try {
      const response = await fetchSubscriptionEmail(currency, '1', "subscriptionEmail");

    } catch (error) {
      console.log(error.message, "error")
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
  };

  useEffect(() => {
    setUtm();
  }, []);

  return (
    <>
      {/* <div className="d-flex justify-content-center">
    <select style={{width: 'fit-content'}} className="form-select me-4" aria-label="Default select example" value={selectedCurrency} onChange={(e)=>changeCurrency(e.target.value)}>
    <>
      <option value="INR">INR</option>
      <option value="USD">USD</option>
      <option value="GBP">GBP</option>
    </>
</select>
      <select style={{width: 'fit-content'}} className="form-select" aria-label="Default select example" onChange={(e)=>setSelectedMode(e.target.value)}>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
    </div> */}
      <div className="header d-flex justify-content-between mb-4">
        <span className="d-flex">
          <h6 className="active text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer">
            Monthly
          </h6>
          <h6 className="text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer">
            Yearly (20% off)
          </h6>
        </span>
        <span className="d-flex">
          <h6 className="active text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer">
            INR
          </h6>
          <h6 className="text-Secondary bg-white p-2 border c-fs-6 cursor-pointer">USD</h6>
          <h6 className="text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer">
            GBP
          </h6>
        </span>
      </div>
      {/* <div className=" gap-3 justify-content-center w-100  card-container align-items-end">
        {subscriptionEmail?.length ?
          subscriptionEmail?.map((item, index) => {
            return(
              <div key={`email-card-${index}`} className="mx-3">
              { item.plan_amounts[0].plan_amount === 7500 || 
                item.plan_amounts[0].plan_amount === 100 ||
                item.plan_amounts[0].plan_amount === 75
              ?
                <div className="text-center flex-column mb-4 mb-sm-0 align-items-center">
                  <div className="popular-chip c-fs-6">POPULAR</div>
                  <div className="card-popular price-card email card text-center mb-4 mb-sm-0 c-bg-grey">                  
                    <div className="card-body w-100">
                      <h3 className="c-fs-3">{item.name}</h3>
                      <h5 className="mt-2 c-fs-2 text-green">
                        {symbol}
                        {(selectedMode === 'Monthly') ? item.plan_amounts[0].plan_amount : item.plan_amounts[1].plan_amount}
                        /
                        {(selectedMode === 'Monthly') ? 'Month' : 'Yearly'}
                      </h5>
                      <p className="c-fs-5">
                        {symbol === '₹' && item.plan_amounts[0]?.plan_amount === 0
                          ? '-'
                          : '' ||
                            (symbol === '₹' && item.plan_amounts[0]?.plan_amount !== 0)
                            ? '+18%GST'
                            : ''}
                      </p>
                      <div className="c-fs-5 mt-2">
                        <span className="text-success">
                          <MdDone />
                        </span>
                        {numberWithCommas(item.plan_services[0].service_credit.free_credits)} Emails
                      </div>
                      <div className="c-fs-5 ">                  
                          {
                          (item.plan_amounts[0].plan_amount === 0) ? 
                          <span className="text-danger"><MdClose /></span> 
                          : 
                          <span className="text-success"><MdDone /></span> 
                          }
                        {numberWithCommas(item.plan_services[1].service_credit.free_credits)} Email Validations
                      </div>

                      <div className="c-fs-5 mt-4">
                        <strong>Extra</strong>
                        <div>{symbol} {item.plan_services[0].service_credit.service_credit_rates[0].follow_up_rate} per Email</div>                      
                        <div>{symbol} {item.plan_services[1].service_credit.service_credit_rates[0].follow_up_rate} per Email Validation</div>
                      </div>

                      <a href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>  
              :
                <div className="card price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">                
                  <div className="card-body w-100">
                    <h3 className="c-fs-3">{item.name}</h3>
                    <h5 className="mt-2 c-fs-2 text-green">
                      {symbol}
                      {(selectedMode === 'Monthly') ? item.plan_amounts[0].plan_amount : item.plan_amounts[1].plan_amount}
                      /
                      {(selectedMode === 'Monthly') ? 'Month' : 'Yearly'}
                    </h5>
                    <p className="c-fs-5">
                        {symbol === '₹' && item.plan_amounts[0]?.plan_amount === 0
                          ? '-'
                          : '' ||
                            (symbol === '₹' && item.plan_amounts[0]?.plan_amount !== 0)
                            ? '+18%GST'
                            : ''}
                      </p>
                    <div className="c-fs-5 mt-2">
                      <span className="text-success">
                        <MdDone />
                      </span>
                      {numberWithCommas(item.plan_services[0].service_credit.free_credits)} Emails
                    </div>
                    <div className="c-fs-5 ">                  
                        {
                        (item.plan_amounts[0].plan_amount === 0) ? 
                        <span className="text-danger"><MdClose /></span> 
                        : 
                        <span className="text-success"><MdDone /></span> 
                        }
                      {numberWithCommas(item.plan_services[1].service_credit.free_credits)} Email Validations
                    </div>
                    
                    <div className="c-fs-5 mt-4">
                        <strong>Extra</strong>
                        <div>{symbol} {item.plan_services[0].service_credit.service_credit_rates[0].follow_up_rate} per Email</div>                      
                        <div>{symbol} {item.plan_services[1].service_credit.service_credit_rates[0].follow_up_rate} per Email Validation</div>
                    </div>

                    <Link href="/signup?service=email" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                      Get Started
                    </Link>
                  </div>
                </div>
              }
              </div>
            )
          }):''
        }
        <div className="card price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div className="card-body justify-content-between">
            <h3 className="c-fs-3">CUSTOM</h3>                  
            <p className="c-fs-5">Talk to sales for a customized plan.</p>
            <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-4 btn btn-sm w-100 btn-outline-dark mt-2">
              Talk to sales
            </button>
          </div>
        </div>
        
      </div> */}

      <div className="d-flex p-4 justify-content-between bg-white w-100 rounded-2 mt-3">
        <div>
          <h3 className="fs-4 fw-semibold">Free</h3>
          <div className="d-flex align-items-end">
            <h5 className="mt-2 c-fs-1 fw-bold text-green ">₹0</h5>
            <span className="text-dark fs-4 fw-medium">per month</span>
          </div>
        </div>

        <div>
          <h3 className="c-fs-4 fw-semibold">Included</h3>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            5,000 Email Validations
          </div>
          <div className="c-fs-5 ">
            <span className="text-danger">
              <MdClose />
            </span>
            No Email Validations
          </div>
        </div>

        <div>
          <h3 className="c-fs-4 fw-semibold">Extra @</h3>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            ₹0.035/Email
          </div>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            ₹0.035/EmailValidations
          </div>
        </div>

        <a
          href="https://control.msg91.com/signup/"
          target="_blank"
          className="d-flex align-items-end"
        >
          <button
            type="button"
            class="btn btn-outline-dark rounded-1 fw-semibold"
          >
            Get Started
          </button>
        </a>
      </div>

      <div className="card-wrapper d-flex w-100 py-4">
        <div className="card-price p-4 bg-white rounded-2">
          <h3 className="fs-4 fw-semibold">Starter</h3>
          <div className="d-flex align-items-end mt-4">
            <h5 className="c-fs-1 fw-bold text-green ">₹2,000</h5>
            <span className="text-dark fs-4 fw-medium">per month</span>
          </div>
          <span>+18% GST</span>
          <a
            href="https://control.msg91.com/signup/"
            target="_blank"
            className="d-flex align-items-end py-4 border-bottom border-2"
          >
            <button
              type="button"
              class="btn btn-outline-dark rounded-1 fw-semibold"
            >
              Get Started
            </button>
          </a>
          <h3 className="c-fs-4 fw-semibold mt-4">Included</h3>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            100,000 Email
          </div>
          <div className="c-fs-5 ">
            <span className="text-danger">
              <MdDone />
            </span>
            100 EmailValidations
          </div>
          <h3 className="c-fs-4 fw-semibold mt-4">Extra @</h3>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            ₹0.020/Email
          </div>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            ₹0.025/EmailValidations
          </div>
        </div>

        <div className="card-price p-4 bg-white rounded-2">
          <h3 className="fs-4 fw-semibold">Basic</h3>
          <div className="d-flex align-items-end mt-4">
            <h5 className="c-fs-1 fw-bold text-green ">₹4,600</h5>
            <span className="text-dark fs-4 fw-medium">per month</span>
          </div>
          <span>+18% GST</span>
          <a
            href="https://control.msg91.com/signup/"
            target="_blank"
            className="d-flex align-items-end py-4 border-bottom border-2"
          >
            <button
              type="button"
              class="btn btn-outline-dark rounded-1 fw-semibold"
            >
              Get Started
            </button>
          </a>
          <h3 className="c-fs-4 fw-semibold mt-4">Included</h3>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            250,000 Email
          </div>
          <div className="c-fs-5 ">
            <span className="text-danger">
              <MdDone />
            </span>
            3,000 EmailValidations
          </div>
          <h3 className="c-fs-4 fw-semibold mt-4">Extra @</h3>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            ₹0.015/Email
          </div>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            ₹0.02/EmailValidations
          </div>
        </div>

        <div className="card-price p-4 bg-white rounded-2">
          <div className="d-flex justify-content-between">
            <h3 className="fs-4 fw-semibold">Alpha</h3>
            <span className="tex-center px-2 pt-1 c-fs-7 c-fw-m border border-dark rounded-4">Popular</span>
          </div>
          <div className="d-flex align-items-end mt-4">
            <h5 className="c-fs-1 fw-bold text-green ">₹7,500</h5>
            <span className="text-dark fs-4 fw-medium">per month</span>
          </div>
          <span>+18% GST</span>
          <a
            href="https://control.msg91.com/signup/"
            target="_blank"
            className="d-flex align-items-end py-4 border-bottom border-2"
          >
            <button type="button" class="btn btn-dark rounded-1 fw-semibold">
              Get Started
            </button>
          </a>
          <h3 className="c-fs-4 fw-semibold mt-4">Included</h3>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            500,000 Email
          </div>
          <div className="c-fs-5 ">
            <span className="text-danger">
              <MdDone />
            </span>
            5,000 EmailValidations
          </div>
          <h3 className="c-fs-4 fw-semibold mt-4">Extra @</h3>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            ₹0.010/Email
          </div>
          <div className="c-fs-5 ">
            <span className="text-success">
              <MdDone />
            </span>
            ₹0.015/EmailValidations
          </div>
        </div>
      </div>
      <div className="connect-personalized my-4">
        <span className="talk-to-sales d-block c-fs-4 fw-medium">
          Connect with our team for a personalized plan to meet your needs.
        </span>
        <button
          type="button"
          className="btn btn-outline-dark mt-3 mb-4 fw-semibold border border-dark border-2 rounded-1 px-3 py-1"
        >
          Talk to Sales
        </button>
        <br />
        <a className="mt-3" href="#">
          <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
          <span className="link">Know more about Email</span>
        </a>
      </div>
    </>
  );
};

export default pricingemail;
