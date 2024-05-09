import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { setUtm } from "@/components/utils";
import faqData from "@/data/faq.json";
import FaqSection from "../faqSection/faqSection";

const pricingemail = ({ subscriptionEmail,  currency, countryCode }) => {
    var change;
    var changeSymbol;
    if (countryCode === "US" || countryCode === "AE" || countryCode === "SG" || countryCode === "PH") {
        change = "USD";
        changeSymbol = "$";
    } else if (countryCode === "GB" || countryCode === "ES") {
        change = "GBP";
        changeSymbol = "£";
    } else if (countryCode === "IN") {
        change = "INR";
        changeSymbol = "₹";
    }
    // ph,global
    const [selectedMode, setSelectedMode] = useState("Monthly");
    const [symbol, setSymbol] = useState(changeSymbol);

    const changeCurrency = async (currency) => {

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
        let nf = currency === "INR" ? new Intl.NumberFormat("en-IN") : new Intl.NumberFormat("en-US");
        return nf.format(x);
    };

    useEffect(() => {
        setUtm();
    }, []);

    return (
        <>
            <div className="header d-flex  gap-3 justify-content-between flex-wrap mb-4">
                <span className="d-flex">
                    <h2
                        className={` ${
                            selectedMode === "Monthly" ? "active" : null
                        }  text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer`}
                        onClick={() => setSelectedMode("Monthly")}
                    >
                        Monthly
                    </h2>
                    <h2
                        className={` ${
                            selectedMode === "Yearly" ? "active" : null
                        }  text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer`}
                        onClick={() => setSelectedMode("Yearly")}
                    >
                        Yearly (20% off)
                    </h2>
                </span>
            </div>

            <div className="card-wrapper row d-flex w-100 py-4">
                {subscriptionEmail &&
                    subscriptionEmail.map((item, index) => {
                        return (
                            <>
                                {item?.plan_amounts.map((ammount, index) => {
                                    if (
                                        ammount?.currency?.symbol === symbol &&
                                        ammount?.plan_type?.name === selectedMode
                                    ) {
                                        return (
                                            <>
                                                {item.name === "Free" ? (
                                                    <div
                                                        key={`email-card-${index}`}
                                                        className={`${
                                                            item.name === "Alpha" ? "border-2" : "border-0"
                                                        } d-flex flex-column flex-lg-row justify-content-between card-price align-items-start align-items-lg-end p-4 bg-white rounded-2 col-lg-12`}
                                                    >
                                                        <div>
                                                            <div className="d-flex justify-content-between w-100">
                                                                <h3 className="fs-4 fw-semibold">{item.name}</h3>
                                                            </div>
                                                            <div className="d-flex align-items-end  flex-wrap">
                                                                <h3 className="c-fs-1 fw-bold text-green ">
                                                                    {" "}
                                                                    {symbol}
                                                                    {ammount?.plan_amount}
                                                                </h3>
                                                                <span className="text-dark ms-1 fw-medium ">
                                                                    {" "}
                                                                    {selectedMode}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <a
                                                            href="https://control.msg91.com/signup/"
                                                            target="_blank"
                                                            className="d-block d-lg-none align-items-end py-4 "
                                                        >
                                                            <button
                                                                type="button"
                                                                class="btn btn-outline-dark rounded-1 fw-semibold"
                                                            >
                                                                Get Started
                                                            </button>
                                                        </a>
                                                        <div className="d-flex d-lg-none border-bottom w-100 "></div>
                                                        <div className="d-flex flex-column gap-2">
                                                            <h3 className="c-fs-4 fw-semibold ">Included</h3>
                                                            <div className="c-fs-5 ">
                                                                {item.plan_services[0].service_credit
                                                                    .service_credit_rates[2].free_credits == 0 ? (
                                                                    <span className="text-danger prcing-check me-1">
                                                                        <MdClose />
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-success prcing-check me-1">
                                                                        <MdDone />
                                                                    </span>
                                                                )}{" "}
                                                                {numberWithCommas(
                                                                    item.plan_services[0].service_credit
                                                                        .service_credit_rates[2].free_credits
                                                                )}{" "}
                                                                {item.plan_services[0].service_credit.service.name}{" "}
                                                                {selectedMode !== "Monthly" ? "/month" : ""}
                                                            </div>
                                                            <div className="c-fs-5 ">
                                                                {item.plan_services[1].service_credit
                                                                    .service_credit_rates[0].free_credits == 0 ? (
                                                                    <span className="text-danger prcing-check me-1">
                                                                        <MdClose />
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-success prcing-check me-1">
                                                                        <MdDone />
                                                                    </span>
                                                                )}
                                                                {numberWithCommas(
                                                                    item.plan_services[1].service_credit
                                                                        .service_credit_rates[0].free_credits
                                                                )}{" "}
                                                                {item.plan_services[1].service_credit.service.name}{" "}
                                                                {selectedMode !== "Monthly" ? "/month" : ""}
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column gap-2">
                                                            <h3 className="c-fs-4 fw-semibold ">Extra @</h3>
                                                            <div className="c-fs-5 ">
                                                                {item.plan_services[0].service_credit
                                                                    .service_credit_rates[0].follow_up_rate == 0 ? (
                                                                    <span className="text-danger prcing-check me-1">
                                                                        <MdClose />
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-success prcing-check me-1">
                                                                        <MdDone />
                                                                    </span>
                                                                )}
                                                                {symbol}{" "}
                                                                {symbol === "₹" &&
                                                                    item.plan_services[0].service_credit
                                                                        .service_credit_rates[0].follow_up_rate}
                                                                {symbol === "$" &&
                                                                    item.plan_services[0].service_credit
                                                                        .service_credit_rates[1].follow_up_rate}
                                                                {symbol === "£" &&
                                                                    item.plan_services[0].service_credit
                                                                        .service_credit_rates[2].follow_up_rate}
                                                                {" per"}{" "}
                                                                {item.plan_services[0].service_credit.service.name}{" "}
                                                                {selectedMode !== "Monthly" ? "/month" : ""}
                                                            </div>
                                                            <div className="c-fs-5 ">
                                                                {item.plan_services[1].service_credit
                                                                    .service_credit_rates[0].follow_up_rate == 0 ? (
                                                                    <span className="text-danger prcing-check me-1">
                                                                        <MdClose />
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-success prcing-check me-1">
                                                                        <MdDone />
                                                                    </span>
                                                                )}
                                                                {symbol}{" "}
                                                                {symbol === "₹" &&
                                                                    item.plan_services[1].service_credit
                                                                        .service_credit_rates[0].follow_up_rate}
                                                                {symbol === "$" &&
                                                                    item.plan_services[1].service_credit
                                                                        .service_credit_rates[1].follow_up_rate}
                                                                {symbol === "£" &&
                                                                    item.plan_services[1].service_credit
                                                                        .service_credit_rates[2].follow_up_rate}{" "}
                                                                per Email Validation{" "}
                                                                {selectedMode !== "Monthly" ? "/month" : ""}
                                                            </div>
                                                        </div>
                                                        <a
                                                            href="/signup?service=Email"
                                                            target="_blank"
                                                            className="btn btn-outline-dark fw-semibold rounded-1 border border-dark px-3 d-lg-flex d-none"
                                                        >
                                                            Get Started
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={`email-card-${index}`}
                                                        className={`${
                                                            item.name === "Alpha" ? "border-black" : "border-0"
                                                        } card-price card  p-4 bg-white rounded-2 col-lg align-items-start flex flex-column gap-4`}
                                                    >
                                                        <div className="d-flex justify-content-between w-100">
                                                            <h3 className="fs-4 fw-semibold">{item.name}</h3>
                                                            {item.name === "Alpha" && (
                                                                <span className="tex-center px-2 pt-1 c-fs-7 c-fw-m border border-dark rounded-4">
                                                                    Popular
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="d-flex align-items-end  flex-wrap">
                                                                <h3 className="c-fs-1 fw-bold text-green ">
                                                                    {" "}
                                                                    {symbol}
                                                                    {ammount?.plan_amount}
                                                                </h3>
                                                                <span className="text-dark ms-1 fw-medium ">
                                                                    {" "}
                                                                    {selectedMode}
                                                                </span>
                                                            </div>
                                                            <span>
                                                                {" "}
                                                                {symbol === "₹" &&
                                                                item.plan_amounts[0]?.plan_amount === 0
                                                                    ? "-"
                                                                    : "" ||
                                                                      (symbol === "₹" &&
                                                                          item.plan_amounts[0]?.plan_amount !== 0)
                                                                    ? "+18%GST"
                                                                    : ""}
                                                            </span>
                                                        </div>
                                                        <a
                                                            href="/signup?service=Email"
                                                            target="_blank"
                                                            className={`${
                                                                item.name === "Alpha" ? "btn-dark" : "btn-outline-dark"
                                                            } btn fw-semibold rounded-1 border border-dark px-3`}
                                                        >
                                                            Get Started
                                                        </a>
                                                        <div className="border-bottom w-100 "></div>
                                                        <div className="d-flex flex-column gap-2">
                                                            <h3 className="c-fs-4 fw-semibold ">Included</h3>
                                                            <div className="c-fs-5 ">
                                                                {(() => {
                                                                    let i;
                                                                    switch (symbol) {
                                                                        case "₹":
                                                                            i = 0;
                                                                            break;
                                                                        case "$":
                                                                            i = 1;
                                                                            break;
                                                                        case "£":
                                                                            i = 2;
                                                                            break;
                                                                        default:
                                                                            return null;
                                                                    }
                                                                    const freeCredits =
                                                                        item.plan_services[0].service_credit
                                                                            .service_credit_rates[i].free_credits;
                                                                    return freeCredits === 0 ? (
                                                                        <>
                                                                            <span className="text-danger prcing-check me-1">
                                                                                <MdClose />
                                                                            </span>
                                                                            No
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className="text-success prcing-check me-1">
                                                                                <MdDone />
                                                                            </span>
                                                                            {numberWithCommas(freeCredits)}
                                                                        </>
                                                                    );
                                                                })()}{" "}
                                                                {item.plan_services[0].service_credit.service.name}
                                                                {selectedMode !== "Monthly" ? "/month" : ""}
                                                            </div>
                                                            <div className="c-fs-5 ">
                                                                {(() => {
                                                                    let i;
                                                                    switch (symbol) {
                                                                        case "₹":
                                                                            i = 0;
                                                                            break;
                                                                        case "$":
                                                                            i = 1;
                                                                            break;
                                                                        case "£":
                                                                            i = 2;
                                                                            break;
                                                                        default:
                                                                            return null;
                                                                    }
                                                                    const freeCredits =
                                                                        item.plan_services[1].service_credit
                                                                            .service_credit_rates[i].free_credits;
                                                                    return freeCredits === 0 ? (
                                                                        <>
                                                                            <span className="text-danger prcing-check me-1">
                                                                                <MdClose />
                                                                            </span>
                                                                            No
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className="text-success prcing-check me-1">
                                                                                <MdDone />
                                                                            </span>
                                                                            {numberWithCommas(freeCredits)}
                                                                        </>
                                                                    );
                                                                })()}{" "}
                                                                {item.plan_services[1].service_credit.service.name}{" "}
                                                                {selectedMode !== "Monthly" ? "/month" : ""}
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column gap-2">
                                                            <h3 className="c-fs-4 fw-semibold ">Extra @</h3>
                                                            <div className="c-fs-5 ">
                                                                {(() => {
                                                                    let i;
                                                                    switch (symbol) {
                                                                        case "₹":
                                                                            i = 0;
                                                                            break;
                                                                        case "$":
                                                                            i = 1;
                                                                            break;
                                                                        case "£":
                                                                            i = 2;
                                                                            break;
                                                                        default:
                                                                            return null;
                                                                    }
                                                                    const freeCredits =
                                                                        item.plan_services[0].service_credit
                                                                            .service_credit_rates[i].follow_up_rate;
                                                                    return freeCredits == 0 ? (
                                                                        <>
                                                                            <span className="text-danger prcing-check me-1">
                                                                                <MdClose />
                                                                            </span>
                                                                            No
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className="text-success prcing-check me-1">
                                                                                <MdDone />
                                                                            </span>
                                                                            {symbol} {freeCredits}
                                                                        </>
                                                                    );
                                                                })()}
                                                                {" per"}{" "}
                                                                {item.plan_services[0].service_credit.service.name}
                                                            </div>

                                                            <div className="c-fs-5 ">
                                                                {(() => {
                                                                    let i;
                                                                    switch (symbol) {
                                                                        case "₹":
                                                                            i = 0;
                                                                            break;
                                                                        case "$":
                                                                            i = 1;
                                                                            break;
                                                                        case "£":
                                                                            i = 2;
                                                                            break;
                                                                        default:
                                                                            return null;
                                                                    }
                                                                    const freeCredits =
                                                                        item.plan_services[1].service_credit
                                                                            .service_credit_rates[i].follow_up_rate;
                                                                    return freeCredits == 0 ? (
                                                                        <>
                                                                            <span className="text-danger prcing-check me-1">
                                                                                <MdClose />
                                                                            </span>
                                                                            No
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className="text-success prcing-check me-1">
                                                                                <MdDone />
                                                                            </span>
                                                                            {symbol} {freeCredits}
                                                                        </>
                                                                    );
                                                                })()}
                                                                {" per"}{" "}
                                                                {item.plan_services[1].service_credit.service.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    }
                                })}
                            </>
                        );
                    })}
            </div>
            <div className="connect-personalized my-4">
                <span className="talk-to-sales d-block c-fs-4 fw-medium">
                    Connect with our team for a personalized plan to meet your needs.
                </span>
                <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#sales-modal"
                    className="btn btn-outline-dark mt-2 mb-4 c-fs-5 border border-dark rounded-1 px-3 py-1"
                >
                    Talk to Sales
                </button>
                <br />
                <a className="more-about" href="/email">
                    <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
                    <span>Know more about Email</span>
                </a>
            </div>
            <FaqSection faqData={faqData?.email} />
        </>
    );
};

export default pricingemail;
