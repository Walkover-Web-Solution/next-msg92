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
  console.log(subscriptionHello, "dddd");
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
  // var plans = [];
  // var tempFeaturesArray = [];
  // for (let i = 0; i < subscriptionHello.length; i++) {
  //   plans[i] = {};
  //   plans[i].channels = [];
  //   plans[i].features = [];
  //   const subscription = subscriptionHello[i].planFeatures.map(
  //     (data, index) => {
  //       if (data.is_visible === 1 && subscriptionHello[i].show_features) {
  //         if (data.feature.key.includes("support_channel")) {
  //           plans[i].channels.push(data.feature.name);
  //         } else {
  //           if (!tempFeaturesArray.includes(data.feature.name)) {
  //             tempFeaturesArray.push(data.feature.name);
  //             plans[i].features.push(data.feature.name);
  //           }
  //         }
  //       }
  //     }
  //   );
  // }

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
      <div className="w-100 card-container d-flex flex-wrap gap-4">
        {console.log(subscriptionHello, 222)}
        {subscriptionHello?.length
          ? subscriptionHello?.map((item, index) => {
              return (
                <div
                  key={`email-card-${index}`}
                  className="d-flex h-100 align-items-start"
                >
                  {/* <div className="popular-chip c-fs-6">POPULAR</div> */}
                  <div className="price-card email card c-bg-grey border-0 h-100">
                    <div className="card-body bg-white p-3 gap-3  rounded-3">
                      <div className="d-flex  align-items-center justify-content-between">
                        <h3 className="text-start fw-bold fs-4">{item.name}</h3>
                        <span className="popular-plan-tag border border-2 border-dark px-3 py-1 c-fs-5 c-fw-600 rounded-5">
                          Popular
                        </span>
                      </div>
                      <h5 className=" c-fs-2">
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
                        className="btn btn-sm w-50 btn-outline-dark utm rounded-1 fw-bold  border border-2 border-dark px-3"
                      >
                        Get Started
                      </a>
                      <hr style={{ borderColor: "#999" }}></hr>
                      <div className="c-fs-6  ">
                        <h4 className="c-fs-4 ">Included</h4>
                        <div className="c-fw-400 mt-2">
                          <div>
                            {" "}
                            {
                              item.plan_services[0].service_credit
                                .service_credit_rates[0].free_credits
                            }{" "}
                            {item.plan_services[0].service_credit.service.name}{" "}
                          </div>
                          <div>
                            {
                              item.plan_services[1].service_credit
                                .service_credit_rates[0].free_credits
                            }{" "}
                            {item.plan_services[1].service_credit.service.name}
                          </div>
                        </div>
                      </div>
                      <div className="c-fs-6 ">
                        <h4 className="c-fs-4 mb-2">Features</h4>
                        {console.log(item?.plan_features[index], 322323)}
                        {item?.plan_features?.map((data, index) => {
                          if (data.is_visible) {
                            return (
                              <div key={`data-${index}`}>
                                <MdDone className="text-green me-2 prcing-check" />
                                <span>{data?.feature?.name}</span>
                              </div>
                            );
                          }
                          return null; // Don't render anything if data.id is not "0"
                        })}
                      </div>
                      <div className="c-fs-6 text-start feature-list">
                        <h4 className="c-fs-4 mb-2">Extra</h4>
                        {item?.postpaid_allowed ? (
                          <>
                            <div className="text-lowercase">
                              <MdDone className="text-success me-2 prcing-check" />
                              <span>
                                {" "}
                                {symbol}
                                {
                                  item?.plan_services[0]?.service_credit
                                    ?.service_credit_rates[0]?.follow_up_rate
                                }
                                /{" "}
                                {
                                  item?.plan_services[0]?.service_credit
                                    ?.service?.name
                                }/month
                              </span>
                            </div>
                            <div className="text-lowercase">
                              <MdDone className="text-success me-2 prcing-check" />
                              <span>
                                {" "}
                                {symbol}
                                {
                                  item.plan_services[1].service_credit
                                    .service_credit_rates[0].follow_up_rate
                                }
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
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div className="my-4">
        <span className="talk-to-sales d-block c-fs-4">
          Connect with our team for a personalized plan to meet your needs.
        </span>
        <button
          type="button"
          className="btn btn-outline-dark mt-2 mb-4 c-fs-4 border border-dark border-2 rounded-1 px-3"
        >
          Talk to Sales
        </button>
        <br />
        <a href="#">
          <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
          Know more about Hello
        </a>
      </div>
    </>
  );
};

export default pricinghello;
