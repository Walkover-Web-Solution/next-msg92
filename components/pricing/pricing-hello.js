import { MdDone, MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { setUtm } from '@/components/utils';
import Link from 'next/link';
import faqData from '@/data/faq.json';
import FaqSection from '../faqSection/faqSection';

const pricinghello = ({ subscriptionHello, fetchSubscriptionHello, currency, countryCode }) => {
    var change;
    var changeSymbol;
    if (countryCode === 'US' || countryCode === 'AE' || countryCode === 'SG' || countryCode === 'PH') {
        change = 'USD';
        changeSymbol = '$';
    } else if (countryCode === 'GB' || countryCode === 'ES') {
        change = 'GBP';
        changeSymbol = '£';
    } else if (countryCode === 'IN') {
        change = 'INR';
        changeSymbol = '₹';
    }
    const [selectedCurrency, setSelectedCurrency] = useState(change);
    const [selectedMode, setSelectedMode] = useState('Monthly');
    const [symbol, setSymbol] = useState(changeSymbol);

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
    useEffect(() => {
        setUtm();
    }, []);
    console.log(subscriptionHello);

    return (
        <>
            {symbol === '₹' && (
                <div className="header d-flex  gap-3 justify-content-between flex-wrap my-4">
                    <span className="d-flex">
                        <h6
                            className={` ${
                                selectedMode === 'Monthly' ? 'active' : null
                            }  text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer`}
                            onClick={() => setSelectedMode('Monthly')}
                        >
                            Monthly
                        </h6>
                        <h6
                            className={` ${
                                selectedMode === 'Yearly' ? 'active' : null
                            }  text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer`}
                            onClick={() => setSelectedMode('Yearly')}
                        >
                            Yearly (20% off)
                        </h6>
                    </span>
                </div>
            )}

            <div className="w-100 card-container d-flex flex-wrap gap-4">
                {subscriptionHello?.length
                    ? subscriptionHello?.map((item, index) => {
                          return (
                              <div
                                  key={`email-card-${index}`}
                                  className={`card d-flex align-items-start rounded-2 bg-white p-4  gap-3 ${
                                      item?.name === 'Premium' ? 'border-black' : 'border-0'
                                  }`}
                              >
                                  <div className=" w-100 d-flex align-items-center justify-content-between">
                                      <h3 className="text-start c-fw-sb fs-4">{item.name}</h3>
                                      {item?.name === 'Premium' && (
                                          <span className="popular-plan-tag border border-1 border-dark c-fw-sb rounded-5 px-3 m-auto">
                                              Popular
                                          </span>
                                      )}
                                  </div>
                                  <h5 className="mt-2 c-fs-2 text-green fw-bold">
                                      {symbol}

                                      {symbol === '₹' && (
                                          <>
                                              {selectedMode === 'Monthly'
                                                  ? item?.plan_amounts[0]?.plan_amount + ' per Month'
                                                  : item?.plan_amounts[3]?.plan_amount}
                                              {selectedMode !== 'Monthly' && (
                                                  <>
                                                      {!item?.plan_amounts[3]?.plan_amount ? '0 per Year' : ' per Year'}
                                                  </>
                                              )}
                                          </>
                                      )}
                                      {symbol === '$' && item?.plan_amounts[1]?.plan_amount + ' per Month'}
                                      {symbol === '£' && item?.plan_amounts[2]?.plan_amount + ' per Month'}
                                  </h5>
                                  <p className="c-fs-5">
                                      {symbol === '₹' && item.plan_amounts[0]?.plan_amount === 0
                                          ? '-'
                                          : '' || (symbol === '₹' && item.plan_amounts[0]?.plan_amount !== 0)
                                          ? '+18%GST'
                                          : ''}
                                  </p>
                                  <a
                                      href="/signup?service=hello"
                                      target="_blank"
                                      className={`${
                                          item?.name === 'Premium' ? 'btn-dark' : 'btn-outline-dark'
                                      }  btn fw-semibold rounded-1 border border-dark px-3 btn-sm`}
                                  >
                                      Get Started
                                  </a>
                                  <hr className="w-100" style={{ borderColor: '#0009' }}></hr>
                                  <div className="c-fs-6  ">
                                      <h4 className="c-fs-4 c-fw-sb">Included</h4>
                                      <div className="c-fw-400 mt-2">
                                          <div>
                                              {' '}
                                              {
                                                  item.plan_services[0].service_credit.service_credit_rates[0]
                                                      .free_credits
                                              }{' '}
                                              {item.plan_services[0].service_credit.service.name}{' '}
                                          </div>
                                          <div>
                                              {
                                                  item.plan_services[1].service_credit.service_credit_rates[0]
                                                      .free_credits
                                              }{' '}
                                              {item.plan_services[1].service_credit.service.name}
                                          </div>
                                      </div>
                                  </div>
                                  <div className="c-fs-6 mt-4">
                                      <h4 className="c-fs-4 mb-2 c-fw-sb">Features</h4>
                                      {item?.plan_features?.map((data, index) => {
                                          if (data.is_visible) {
                                              return (
                                                  <div key={`data-${index}`}>
                                                      {data.feature.is_included ? (
                                                          <MdDone className="text-green me-2 prcing-check" />
                                                      ) : (
                                                          <MdClose className="text-danger me-2 prcing-check" />
                                                      )}
                                                      <span>{data?.feature?.name}</span>
                                                  </div>
                                              );
                                          } else {
                                              return (
                                                  <>
                                                      {!data.feature.is_included && (
                                                          <div key={`data-${index}`}>
                                                              {data.feature.is_included ? (
                                                                  <MdDone className="text-green me-2 prcing-check" />
                                                              ) : (
                                                                  <MdClose className="text-danger me-2 prcing-check" />
                                                              )}
                                                              <span>{data?.feature?.name}</span>
                                                          </div>
                                                      )}
                                                  </>
                                              );
                                          }
                                          return null;
                                      })}
                                  </div>
                                  <div className="c-fs-6 text-start feature-list mt-4">
                                      <h4 className="c-fs-4 mb-2 c-fw-sb">Extra</h4>
                                      {item?.postpaid_allowed ? (
                                          <>
                                              <div className="text-lowercase">
                                                  <MdDone className="text-success me-2 prcing-check" />
                                                  <span>
                                                      {' '}
                                                      {symbol}
                                                          {symbol === '₹' &&
                                                              item.plan_services[0].service_credit
                                                                  .service_credit_rates[0].follow_up_rate}
                                                          {symbol === '$' &&
                                                              item.plan_services[0].service_credit
                                                                  .service_credit_rates[1].follow_up_rate}
                                                          {symbol === '£' &&
                                                              item.plan_services[0].service_credit
                                                                  .service_credit_rates[2].follow_up_rate}
                                                          /{item.plan_services[0].service_credit.service.name}
                                                      /month
                                                  </span>
                                              </div>
                                              <div className="text-lowercase">
                                                  <MdDone className="text-success me-2 prcing-check" />
                                                  <span>
                                                      {' '}
                                                      {symbol}
                                                          {symbol === '₹' &&
                                                              item.plan_services[1].service_credit
                                                                  .service_credit_rates[0].follow_up_rate}
                                                          {symbol === '$' &&
                                                              item.plan_services[1].service_credit
                                                                  .service_credit_rates[1].follow_up_rate}
                                                          {symbol === '£' &&
                                                              item.plan_services[1].service_credit
                                                                  .service_credit_rates[2].follow_up_rate}
                                                      /ticket/month
                                                  </span>
                                              </div>
                                          </>
                                      ) : (
                                          <>
                                              <div className="text-lowercase">
                                                  <MdClose className="text-danger me-2 prcing-check" />
                                                  <span>inbox/month</span>
                                              </div>
                                              <div className="text-lowercase">
                                                  <MdClose className="text-danger me-2 prcing-check" />
                                                  <span>tickets/month</span>
                                              </div>
                                          </>
                                      )}
                                  </div>
                              </div>
                          );
                      })
                    : ''}
            </div>
            <div className="my-4 connect-personalized">
                <span className="talk-to-sales d-block c-fs-4">
                    Connect with our team for a personalized plan to meet your needs.
                </span>                     
                <button
                    type="button"
                    data-bs-toggle="modal" data-bs-target="#sales-modal"
                    className="btn btn-outline-dark mt-2 mb-4 c-fs-5 border border-dark rounded-1 px-3 py-1"
                >
                    Talk to Sales
                </button>
                <br />
                <a href="/hello">
                    <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
                    <span className="link">Know more about Hello</span>
                </a>
            </div>
            <FaqSection faqData={faqData?.hello} />
        </>
    );
};

export default pricinghello;
