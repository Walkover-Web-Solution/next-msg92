import { MdDone, MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { setUtm } from '@/components/utils';
const pricingemail = ({ subscriptionEmail, fetchSubscriptionEmail, currency, setSubscriptionEmail, countryCode }) => {
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

    const changeCurrency = (currency) => {
        setSelectedCurrency(currency);
        // try {
        //     const response = await fetchSubscriptionEmail(currency, '1', 'subscriptionEmail');
        // } catch (error) {
        //     console.log(error.message, 'error');
        // }

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
                    value={selectedCurrency}
                    onChange={(e) => changeCurrency(e.target.value)}
                >
                    <>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                    </>
                </select>
                <select
                    style={{ width: 'fit-content' }}
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setSelectedMode(e.target.value)}
                >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
            </div>
            <div className="d-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-end">

                {subscriptionEmail?.length
                    ? subscriptionEmail?.map((item, index) => {
                          return (
                              <div key={`email-card-${index}`} className="mx-3">
                                  {item?.slug ==="basic" ? (
                                      <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ">
                                          <div className="popular-chip c-fs-6">POPULAR</div>
                                          <div className="card-popular price-card email card text-center mb-4 mb-sm-0 c-bg-grey">
                                              <div className="card-body">
                                                  <h3 className="c-fs-3">{item.name}</h3>
                                                  <h5 className="mt-2 c-fs-2 text-green">
                                                      {symbol}

                                                      {symbol === '₹' && (
                                                          <>
                                                              {selectedMode === 'Monthly'
                                                                  ? item?.plan_amounts[0]?.plan_amount + '/Month'
                                                                  : item?.plan_amounts[1]?.plan_amount}
                                                              {selectedMode !== 'Monthly' && <>/year</>}
                                                          </>
                                                      )}
                                                      {symbol === '$' && (
                                                          <>
                                                              {selectedMode === 'Monthly'
                                                                  ? item?.plan_amounts[2]?.plan_amount + '/Month'
                                                                  : item?.plan_amounts[3]?.plan_amount}
                                                              {selectedMode !== 'Monthly' && <>/year</>}
                                                          </>
                                                      )}
                                                      {symbol === '£' && (
                                                          <>
                                                              {selectedMode === 'Monthly'
                                                                  ? item?.plan_amounts[4]?.plan_amount + '/Month'
                                                                  : item?.plan_amounts[5]?.plan_amount}
                                                              {selectedMode !== 'Monthly' && <>/year</>}
                                                          </>
                                                      )}
                                                  </h5>
                                                  <p className="c-fs-5">
                                                      {symbol === '₹' && item.plan_amounts[0]?.plan_amount === 0
                                                          ? '-'
                                                          : '' ||
                                                            (symbol === '₹' && item.plan_amounts[0]?.plan_amount !== 0)
                                                          ? '+18%GST'
                                                          : ''}
                                                  </p>
                                                  <div className="c-fs-6 mb-2 mt-2 ">
                                                      <strong className="c-fs-6 mb-2 mt-2">Included</strong>
                                                      <div>
                                                          <div>
                                                              {' '}
                                                              {numberWithCommas(
                                                                  item.plan_services[0].service_credit
                                                                      .service_credit_rates[2].free_credits
                                                              )}{' '}
                                                              {item.plan_services[0].service_credit.service.name}{' '}
                                                          </div>
                                                          <div>
                                                              {numberWithCommas(
                                                                  item.plan_services[1].service_credit
                                                                      .service_credit_rates[0].free_credits
                                                              )}{' '}
                                                              {item.plan_services[1].service_credit.service.name}
                                                          </div>
                                                      </div>
                                                  </div>
                                                  {item.postpaid_allowed && (
                                                      <div className="c-fs-6 text-center feature-list">
                                                          <strong>Extra</strong>
                                                          <div>
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
                                                          </div>
                                                          <div>
                                                              <div></div>
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
                                                              /Email Validation
                                                          </div>
                                                      </div>
                                                  )}

                                                  <a
                                                      href="/signup?service=email"
                                                      target="_blank"
                                                      className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm"
                                                  >
                                                      Get Started
                                                  </a>
                                              </div>
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="card price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">
                                          <div className="card-body">
                                              <h3 className="c-fs-3">{item.name}</h3>
                                              <h5 className="mt-2 c-fs-2 text-green">
                                                  {symbol}

                                                  {symbol === '₹' && (
                                                      <>
                                                          {selectedMode === 'Monthly'
                                                              ? item?.plan_amounts[0]?.plan_amount + '/Month'
                                                              : item?.plan_amounts[1]?.plan_amount}
                                                          {selectedMode !== 'Monthly' && <>/year</>}
                                                      </>
                                                  )}
                                                  {symbol === '$' && (
                                                      <>
                                                          {selectedMode === 'Monthly'
                                                              ? item?.plan_amounts[2]?.plan_amount + '/Month'
                                                              : item?.plan_amounts[3]?.plan_amount}
                                                          {selectedMode !== 'Monthly' && <>/year</>}
                                                      </>
                                                  )}
                                                  {symbol === '£' && (
                                                      <>
                                                          {selectedMode === 'Monthly'
                                                              ? item?.plan_amounts[4]?.plan_amount + '/Month'
                                                              : item?.plan_amounts[5]?.plan_amount}
                                                          {selectedMode !== 'Monthly' && <>/year</>}
                                                      </>
                                                  )}
                                              </h5>
                                              <p className="c-fs-5">
                                                  {symbol === '₹' && item.plan_amounts[0]?.plan_amount === 0
                                                      ? '-'
                                                      : '' ||
                                                        (symbol === '₹' && item.plan_amounts[0]?.plan_amount !== 0)
                                                      ? '+18%GST'
                                                      : ''}
                                              </p>
                                              <div className="c-fs-6 mb-2 mt-2 ">
                                                  <strong className="c-fs-6 mb-2 mt-2">Included</strong>
                                                  <div>
                                                      <div>
                                                          {' '}
                                                          {numberWithCommas(
                                                              item.plan_services[0].service_credit
                                                                  .service_credit_rates[2].free_credits
                                                          )}{' '}
                                                          {item.plan_services[0].service_credit.service.name}{' '}
                                                      </div>
                                                      <div>
                                                          {numberWithCommas(
                                                              item.plan_services[1].service_credit
                                                                  .service_credit_rates[0].free_credits
                                                          )}{' '}
                                                          {item.plan_services[1].service_credit.service.name}
                                                      </div>
                                                  </div>
                                              </div>
                                              {item.postpaid_allowed && (
                                                  <div className="c-fs-6 text-center feature-list">
                                                      <strong>Extra</strong>
                                                      <div>
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
                                                      </div>
                                                      <div>
                                                          <div></div>
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
                                                          /Email Validation
                                                      </div>
                                                  </div>
                                              )}

                                              <Link
                                                  href="/signup?service=email"
                                                  target="_blank"
                                                  className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm"
                                              >
                                                  Get Started
                                              </Link>
                                          </div>
                                      </div>
                                  )}
                              </div>
                          );
                      })
                    : ''}
                <div className="card price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">
                    <div className="card-body justify-content-between">
                        <h3 className="c-fs-3">CUSTOM</h3>
                        <p className="c-fs-5">Talk to sales for a customized plan.</p>
                        <button
                            data-bs-toggle="modal"
                            data-bs-target="#sales-modal"
                            className="c-fs-4 btn btn-sm w-100 btn-outline-dark mt-2"
                        >
                            Talk to sales
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default pricingemail;
