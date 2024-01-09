import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { setUtm } from "../pricingComp";
import Link from "next/link";
const pricinghello = ({
  subscriptionHello,
  fetchSubscriptionHello,
  currency,
  countryCode,
}) => {
  var change;
  var changeSymbol;
  if (
    countryCode === "US" ||
    countryCode === "AE" ||
    countryCode === "SG" ||
    countryCode === "PH"
  ) {
    change = "USD";
    changeSymbol = "$";
  } else if (countryCode === "GB" || countryCode === "ES") {
    change = "GBP";
    changeSymbol = "£";
  } else if (countryCode === "IN") {
    change = "INR";
    changeSymbol = "₹";
  }
  const [selectedCurrency, setSelectedCurrency] = useState(change);
  const [selectedMode, setSelectedMode] = useState("Monthly");
  const [symbol, setSymbol] = useState(changeSymbol);
  var plans = [];
  var tempFeaturesArray = [];
  for (let i = 0; i < subscriptionHello.length; i++) {
    plans[i] = {};
    plans[i].channels = [];
    plans[i].features = [];
    const subscription = subscriptionHello[i].planFeatures.map(
      (data, index) => {
        if (data.is_visible === 1 && subscriptionHello[i].show_features) {
          if (data.feature.key.includes("support_channel")) {
            plans[i].channels.push(data.feature.name);
          } else {
            if (!tempFeaturesArray.includes(data.feature.name)) {
              tempFeaturesArray.push(data.feature.name);
              plans[i].features.push(data.feature.name);
            }
          }
        }
      }
    );
  }

  const changeCurrency = async (currency) => {
    setSelectedCurrency(currency);

    try {
      const response = await fetchSubscriptionHello(
        currency,
        "7",
        "subscriptionHello"
      );
    } catch (error) {
      console.log(error.message, "error");
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
        {/* <select style={{width: 'fit-content'}} className="form-select" aria-label="Default select example" onChange={(e)=>setSelectedMode(e.target.value)}>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select> */}
      {/* </div> */}
      <div>
        <div className="w-100 card-container d-flex">
          {subscriptionHello?.length
            ? subscriptionHello?.map((item, index) => {
                return (
                  <div key={`email-card-${index}`}>
                    <div className="d-flex h-100 align-items-start">
                      {/* <div className="popular-chip c-fs-6">POPULAR</div> */}
                      <div className="price-card email card c-bg-grey border-0 h-100">
                        <div className="card-body bg-white p-4 position-relative rounded-3">

                            <span className="popular-plan-tag position-absolute border border-2 border-dark px-3 py-1 c-fs-5 c-fw-600 rounded-5">Popular</span>

                          <h3 className="text-start fw-bold fs-4">{item.name}</h3>
                          <h5 className="mt-3 c-fs-2">
                            <span className="text-green c-fs-1">
                              {symbol}
                              {selectedMode === "Monthly"
                                ? item?.plan_amounts[0]?.plan_amount
                                : item?.plan_amounts[1]?.plan_amount}
                            </span>
                            /{selectedMode === "Monthly" ? "Month" : "Yearly"}
                          </h5>
                          <p className="c-fs-5">
                            {symbol === "₹" &&
                            item.plan_amounts[0]?.plan_amount === 0
                              ? "-"
                              : "" ||
                                (symbol === "₹" &&
                                  item.plan_amounts[0]?.plan_amount !== 0)
                              ? "+18%GST"
                              : ""}
                          </p>
                          <a
                            href="https://control.msg91.com/signup/"
                            target="_blank"
                            className="btn btn-sm w-50 btn-outline-dark mt-4 utm rounded-1 fw-bold  border border-2 border-dark px-3"
                          >
                            Get Started
                          </a>
                          <div className="c-fs-6 mt-4 text-start feature-list">
                            <hr style={{ borderColor: "#999" }}></hr>
                            <div className="c-fs-6 mb-4 mt-4 ">
                              <strong className="c-fs-6 mb-3 mt-4">
                                Included
                              </strong>
                              <div className="c-fw-400">
                                <div>
                                  {" "}
                                  {
                                    item.plan_services[0].service_credit
                                      .service_credit_rates[0].free_credits
                                  }{" "}
                                  {
                                    item.plan_services[0].service_credit.service
                                      .name
                                  }{" "}
                                </div>
                                <div>
                                  {
                                    item.plan_services[1].service_credit
                                      .service_credit_rates[0].free_credits
                                  }{" "}
                                  {
                                    item.plan_services[1].service_credit.service
                                      .name
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="c-fs-6 ">
                              <strong>Features </strong>
                            </div>
                            {index > 0 && (
                              <div>
                                <span className="text-green me-2">
                                  <MdDone />
                                </span>
                                <span className="text-danger me-2">
                                  <MdClose />
                                </span>
                                <strong>
                                  {" "}
                                  All {subscriptionHello[index - 1].name} Plan
                                  Features
                                </strong>
                              </div>
                            )}
                            {
                              /* item.show_features &&
                          item.planFeatures
                            .filter((data) => data.is_visible === 1)
                            .sort((a, b) => {
                              const featureA = a?.feature?.key?.replace(/_/g, ' ');
                              const featureB = b?.feature?.key?.replace(/_/g, ' ');
                              return featureA.localeCompare(featureB);
                            })
                            .map((data, index) => {
                              const feature = data?.feature?.key?.replace(/_/g, ' ');
                              let groupSupportChannel = false
                              if (feature.includes("support channel")) {
                                groupSupportChannel = true
                              }
                              return (
                                <>
                                  {!groupSupportChannel &&
                                    <div key={`data-${index}`}>
                                        <p>
                                          <span className="text-green me-2">
                                            <MdDone />
                                          </span>
                                          {feature}
                                        </p>
                                    </div>
                                  }
                                </>
                              );
                            }) */
                              plans[index].features &&
                                plans[index].features.map((data, index) => {
                                  return (
                                    <div key={`data-${index}`}>
                                      <p>
                                        <span className="text-green me-2">
                                          <MdDone />
                                        </span>
                                        {data}
                                      </p>
                                    </div>
                                  );
                                })
                            }

                            {index === 0 && (
                              <div className="c-fs-6 mb-2">
                                <span className="text-danger me-2">
                                  <MdClose />
                                </span>
                                <span className="text-green me-2">
                                  <MdDone />
                                </span>{" "}
                                Supported Channels
                                <ul
                                  className="mt-1 mb-1"
                                  style={{ marginLeft: "7px" }}
                                >
                                  {plans[index].channels.map((data, index) => {
                                    return (
                                      <li key={`data-${index}`}>{data}</li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}

                            <div className="c-fs-6 text-start feature-list">
                              <strong>Extra</strong>
                              <div>
                                <span className="text-danger me-2">
                                  <MdClose />
                                </span>
                                -/inbox/month
                              </div>
                              <div>
                                <span className="text-danger me-2">
                                  <MdClose />
                                </span>
                                -/inbox/month
                              </div>
                            </div>
                          </div>

                          {item.postpaid_allowed && (
                            <div className="c-fs-6 text-start feature-list">
                              <strong>Extra</strong>
                              <div>
                                {symbol}
                                {
                                  item.plan_services[0].service_credit
                                    .service_credit_rates[0].follow_up_rate
                                }
                                /
                                {
                                  item.plan_services[0].service_credit.service
                                    .name
                                }
                              </div>
                              <div>
                                <div></div>
                                {symbol}
                                {
                                  item.plan_services[1].service_credit
                                    .service_credit_rates[0].follow_up_rate
                                }
                                /ticket
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="mt-4">
          <span className="talk-to-sales d-block c-fs-4">
            Connect with our team for a personalized plan to meet your needs.
          </span>
          <button type="button" className="btn btn-outline-dark mt-2 mb-4 fw-semibold border border-dark border-2 rounded-1 px-3">
            Talk to Sales
          </button>
          <br />
          <a href="#">
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            Know more about Hello
          </a>
        </div>
       
      </div>
    </>
  );
};

export default pricinghello;
