import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { setUtm } from "../pricingComp";
const pricingemail = ({ subscriptionEmail, fetchSubscriptionEmail, currency, setSubscriptionEmail }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedMode, setSelectedMode] = useState("Monthly");
  const [symbol, setSymbol] = useState("₹");

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
  }

  useEffect(() => {
    setUtm();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <select style={{ width: 'fit-content' }} className="form-select me-4" aria-label="Default select example" onChange={(e) => changeCurrency(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
        <select style={{ width: 'fit-content' }} className="form-select" aria-label="Default select example" onChange={(e) => setSelectedMode(e.target.value)}>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="d-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-end">
        {subscriptionEmail?.length ?
          subscriptionEmail?.map((item, index) => {
            return (
              <div key={`email-card-${index}`} className="mx-3">
                {item.plan_amounts[0].plan_amount === 7500 ||
                  item.plan_amounts[0].plan_amount === 100 ||
                  item.plan_amounts[0].plan_amount === 75
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
                          {symbol === '₹' && item.plan_amounts[0].plan_amount === 0 ? '-' : '' || symbol === '₹' && item.plan_amounts[0].plan_amount !== 0 ? '18%GST' : ''}
                        </p>
                        <div className="c-fs-5 mt-2">
                          <span className="text-success">
                            <MdDone />
                          </span>
                          {numberWithCommas(item.plan_services[0].service_credit.free_credits)} free credits
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

                      <Link href="https://control.msg91.com/signup/" target="_blank" className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm">
                        Get Started
                      </Link>
                    </div>
                  </div>
                }
              </div>
            )
          }) : ''
        }
        <div className="card price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div className="card-body">
            <h3 className="c-fs-3">CUSTOM</h3>
            <p className="c-fs-5">Talk to sales for a customized plan.</p>
            <Link
                data-bs-toggle="modal#"
                data-bs-target="#custom-pricing-modal"
                className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2"
                href="/contact-us"
              >
                Talk to sales
              </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default pricingemail;
