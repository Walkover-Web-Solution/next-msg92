import { MdDoneOutline } from 'react-icons/md';
import { MdDone, MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { setUtm } from '../pricingComp';
import { ListGroup } from 'react-bootstrap';
import Link from 'next/link';
const pricinghello = ({ subscriptionHello, fetchSubscriptionHello, countryCode, currency }) => {
  const [symbol, setSymbol] = useState('₹');
  const [selectedMode, setSelectedMode] = useState('Monthly');
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const notavailable = '/img/not-available-red.svg';
  const available = '/img/available-green.svg';
  let basicprice = '0';
  let basicRate = '0';
  let premiumprice = '0';
  let premiumRate = '0';
  if (countryCode == 'IN') {
    basicprice = '₹500';
    basicRate = '₹0.50';
    premiumprice = '₹1000';
    premiumRate = '₹0.75';
  } else {
    basicprice = '$10';
    basicRate = '$0.0061';
    premiumprice = '$20';
    premiumRate = '$0.0091';
  }

  const changeCurrency = async (currency) => {
    setSelectedCurrency(currency);

    try {
      const response = await fetchSubscriptionHello(currency, '7', 'subscriptionHello');
    } catch (error) {
      console.log(error.message, 'error');
    }

    switch (currency) {
      case 'INR':
        setSymbol('₹');
        break;
      case 'USD':
        setSymbol('$');
        break;
      case 'GBP':
        setSymbol('£');
        break;
    }
  };
  const numberWithCommas = (x) => {
    let nf = currency === 'INR' ? new Intl.NumberFormat('en-IN') : new Intl.NumberFormat('en-US');
    return nf.format(x);
  };
  useEffect(() => {
    setUtm();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <select
          style={{ width: 'fit-content' }}
          className="form-select me-4"
          aria-label="Default select example"
          onChange={(e) => changeCurrency(e.target.value)}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
        {/* <select style={{width: 'fit-content'}} className="form-select" aria-label="Default select example" onChange={(e)=>setSelectedMode(e.target.value)}>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select> */}
      </div>
      <div className="d-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-start mt-5">
        {subscriptionHello?.length
          ? subscriptionHello?.map((item, index) => {
            return (
              <div key={`email-card-${index}`} className="mx-3">
                <div className=" d-flex flex-column mb-4 mb-sm-0 align-items-center ">
                  {/* <div className="popular-chip c-fs-6">POPULAR</div> */}
                  <div className=" price-card email card  mb-4 mb-sm-0 c-bg-grey border-0">
                    <div className="card-body text-center">
                      <h3 className="c-fs-3">{item.name}</h3>
                      <h5 className="mt-2 c-fs-2 text-green">
                        {symbol}
                        {selectedMode === 'Monthly'
                          ? item?.plan_amounts[0]?.plan_amount
                          : item?.plan_amounts[1]?.plan_amount}
                        /{selectedMode === 'Monthly' ? 'Month' : 'Yearly'}
                      </h5>
                      <p className="c-fs-5">
                        {symbol === '₹' && item.plan_amounts[0]?.plan_amount === 0
                          ? ''
                          : '' ||
                            (symbol === '₹' && item.plan_amounts[0]?.plan_amount !== 0)
                            ? '+18%GST'
                            : ''}
                      </p>
                      <div className="c-fs-6 mb-2 mt-2 text-start feature-list">
                        {/* <span className="text-success me-2">
                                                        <MdDone />
                                                        </span> */}
                                                        <hr style={{borderColor: "#999"}}></hr>
                        <div className="c-fs-6 mb-2 mt-2 ">
                          <strong className="c-fs-6 mb-2 mt-2">Included</strong>
                          <div>
                            <div>
                              {' '}
                              {
                                item.plan_services[0].service_credit
                                  .service_credit_rates[0].free_credits
                              }{' '}
                              {item.plan_services[0].service_credit.service.name}{' '}
                            </div>
                            <div>
                              {
                                item.plan_services[1].service_credit
                                  .service_credit_rates[0].free_credits
                              }{' '}
                              {item.plan_services[1].service_credit.service.name}
                            </div>
                          </div>
                        </div>
                        <div className="c-fs-4 mb-2 mt-2 ">
                          <p>Features</p>
                        </div>

                        {item.show_features &&
                          item.planFeatures.map((data, index) => {
                            if (data.is_visible === 1) {
                              var feature = data?.feature?.key;
                              feature = feature.replace(/_/g, ' ');
                              return (
                                <p key={`data-${index}`}>
                                  <span className="text-green me-2">
                                    <MdDone />
                                  </span>
                                  {feature}
                                </p>
                              );
                            }
                          })}
                        {/* <div className="c-fs-6">                  
                           {
                           (item.plan_amounts[0].plan_amount === 0) ? 
                             <span className="text-danger me-2"><MdClose /></span> 
                                 : 
                               <span className="text-success me-2"><MdDone /></span> 
                                 }
                                  {numberWithCommas(item.plan_services[1].service_credit.free_credits)} Hello Chats
                                  </div> */}
                      </div>

                      {item.postpaid_allowed && (
                        <div className="c-fs-6 mb-2 mt-2 text-start feature-list">
                          <strong>Extra</strong>
                          <div>
                            {item.plan_services[0].service_credit.service.name} @ {symbol}
                            {
                              item.plan_services[0].service_credit
                                .service_credit_rates[0].follow_up_rate
                            }
                          </div>
                          <div>
                            {item.plan_services[1].service_credit.service.name} @ {symbol}{' '}
                            {
                              item.plan_services[1].service_credit
                                .service_credit_rates[0].follow_up_rate
                            }{' '}
                            /per ticket
                          </div>
                        </div>
                      )}
                      <a
                        href="https://control.msg91.com/login/"
                        target="_blank"
                        className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          : ''}
        <div className="mx-3">
          <div className="card price-card email border-0  mb-4 mb-sm-0 c-bg-grey">
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
      </div>

      {/* <div className="price-card hello d-flex col-10 col-lg-11 flex-md-row flex-column mx-auto border">
        <div className="col-12 col-md-8 col-xl-9 text-start p-4 bg-white">
          <h3>Customer support Platform</h3>
          <div className="d-flex"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">Integrate multiple channels on a single platform - Email, RCS, social media, call & more</p></div>
          <div className="d-flex mt-2"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">Track, monitor, analyze agent performance</p></div>
          <div className="d-flex mt-2"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">18*7 free customer support</p></div>
        </div>
        <div className="c-bg-grey col-12 col-md-4 col-xl-3  p-4 text-start">
          <h3 className="c-fs-3">Access platform for FREE</h3>
          <p className="c-fs-4 mt-2">Pay only for the channels you use</p>
          <a href="https://control.msg91.com/signup/" target="_blank" className="btn btn-outline-dark mt-3 px-5">Get Started</a>
        </div>
      </div> */}
    </>
  );
};

export default pricinghello;
