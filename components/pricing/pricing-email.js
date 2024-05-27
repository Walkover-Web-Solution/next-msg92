import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { setUtm } from "@/components/utils";
import faqData from "@/data/faq.json";
import FaqSection from "../faqSection/faqSection";

const pricingemail = ({ subscriptionEmail, fetchSubscriptionEmail, currency, setSubscriptionEmail, countryCode }) => {
    console.log("🚀 ~ pricingemail ~ subscriptionEmail:", subscriptionEmail)
    var change;
    var changeSymbol;
    if (
        countryCode === "US" ||
        countryCode === "AE" ||
        countryCode === "SG" ||
        countryCode === "PH" ||
        countryCode === "BR"
    ) {
        change = "USD";
        changeSymbol = "$";
    } else if (countryCode === "GB" || countryCode === "ES") {
        change = "GBP";
        changeSymbol = "£";
    } else if (countryCode === "IN") {
        change = "INR";
        changeSymbol = "₹";
    } else {
        change = "USD";
        changeSymbol = "$";
    }
    // ph,global
    const [selectedCurrency, setSelectedCurrency] = useState(change);
    const [selectedMode, setSelectedMode] = useState("Monthly");
    const [symbol, setSymbol] = useState(changeSymbol);

    const changeCurrency = async (currency) => {
        setSelectedCurrency(currency);

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

            <div className="w-100 card-container d-grid email-card-grid flex-wrap gap-4">
                {subscriptionEmail?.length &&
                    subscriptionEmail?.map((plan, i) => {
                        return (
                            <>
                                {plan?.plan_amounts?.length &&
                                    plan?.plan_amounts?.map((planAmount, index) => {
                                        if (
                                            planAmount?.currency?.short_name === currency &&
                                            planAmount?.plan_type?.name === selectedMode
                                        )
                                            return (
                                                <>
                                                    {i === 0 ? (
                                                        <EmailPricingCardFree
                                                            plan={plan}
                                                            planAmount={planAmount}
                                                            currency={currency}
                                                            selectedMode={selectedMode}
                                                        />
                                                    ) : (
                                                        <EmailPricingCard
                                                            plan={plan}
                                                            planAmount={planAmount}
                                                            currency={currency}
                                                            selectedMode={selectedMode}
                                                        />
                                                    )}
                                                </>
                                            );
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

export function EmailPricingCardFree({ plan, planAmount, currency, selectedMode }) {
    return (
        <>
            <div className="p-4 bg-white rounded-2 free_card d-flex flex-lg-row flex-column justify-content-between gap-4   ">
                <div className="d-flex flex-column gap-2">
                    <h3 className="fs-4 fw-semibold">{plan?.name}</h3>
                    <span className="text-dark mt-auto fw-medium">
                        {" "}
                        <span className="c-fs-1 fw-bold text-green ">{planAmount?.currency?.symbol} {planAmount?.plan_amount} </span>{selectedMode}
                    </span>

                    <a
                        href="/signup?service=Email"
                        target="_blank"
                        className="btn btn-outline-dark fw-semibold rounded-1 border border-dark px-3 d-lg-none d-flex btn-ft mt-auto"
                    >
                        Get Started
                    </a>
                </div>
                <hr className="w-100 d-block d-lg-none " style={{ borderColor: "rgba(0, 0, 0, 0.6)" }} />
                {/* Included */}
                <div className="d-flex flex-column gap-2">
                    <h4 class="c-fs-4 c-fw-sb">Included</h4>
                    <div className="d-flex flex-column">
                        {plan?.plan_services?.length &&
                            plan?.plan_services?.map((service, index) => {
                                return (
                                    <>
                                        {service?.service_credit?.service_credit_rates?.length &&
                                            service?.service_credit?.service_credit_rates?.map((rate, i) => {
                                                if (rate?.currency?.short_name === currency)
                                                    return (
                                                        <span>
                                                            {
                                                                service?.service_credit?.service_credit_rates[0]
                                                                    ?.free_credits
                                                            }{" "}
                                                            {service?.service_credit?.service?.name}/month
                                                        </span>
                                                    );
                                            })}
                                    </>
                                );
                            })}
                    </div>
                </div>
                {/* Included */}
                {/* Extras */}
                <div className="d-flex flex-column gap-2">
                    <h4 class="c-fs-4 c-fw-sb">Extra @</h4>
                    <div className="d-flex flex-column">
                        {plan?.plan_services?.length &&
                            plan?.plan_services?.map((service, index) => {
                                return (
                                    <>
                                        {service?.service_credit?.service_credit_rates?.length &&
                                            service?.service_credit?.service_credit_rates?.map((rate, i) => {
                                                if (rate?.currency?.short_name === currency)
                                                    return (
                                                        <span>
                                                            {plan?.postpaid_allowed ? (
                                                                <>
                                                                    <MdDone className="text-green me-2 prcing-check" />
                                                                    {rate?.currency?.symbol}
                                                                    {rate?.follow_up_rate}/
                                                                    {service?.service_credit?.service?.name}
                                                                    {service?.service_credit?.service?.is_rental
                                                                        ? "/month"
                                                                        : ""}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <MdClose className="text-danger me-2 prcing-check" />
                                                                    {"No Extra "}{" "}
                                                                    {service?.service_credit?.service?.name}
                                                                </>
                                                            )}
                                                        </span>
                                                    );
                                            })}
                                    </>
                                );
                            })}
                    </div>
                </div>
                {/* Extras */}
                <a
                    href="/signup?service=Email"
                    target="_blank"
                    className="btn btn-outline-dark fw-semibold rounded-1 border border-dark px-3 d-lg-flex d-none w-fit mt-auto"
                >
                    Get Started
                </a>
            </div>
        </>
    );
}
export function EmailPricingCard({ plan, planAmount, currency, selectedMode }) {
    return (
        <>
            <div className="p-4 bg-white rounded-2  d-flex flex-column gap-4   ">
                <div className="d-flex flex-column gap-2">
                    <h3 className="fs-4 fw-semibold">{plan?.name}</h3>
                    <span className="text-dark mt-auto fw-medium">
                        {" "}
                        <span className="c-fs-1 fw-bold text-green ">{planAmount?.currency?.symbol} {planAmount?.plan_amount} </span>{selectedMode}
                    </span>

                    <a
                        href="/signup?service=Email"
                        target="_blank"
                        className="btn btn-outline-dark fw-semibold rounded-1 border border-dark px-3  d-flex btn-ft mt-auto"
                    >
                        Get Started
                    </a>
                </div>
                <hr className="w-100" style={{ borderColor: "rgba(0, 0, 0, 0.6)" }} />
                {/* Included */}
                <div className="d-flex flex-column gap-2">
                    <h4 class="c-fs-4 c-fw-sb">Included</h4>
                    <div className="d-flex flex-column">
                        {plan?.plan_services?.length &&
                            plan?.plan_services?.map((service, index) => {
                                return (
                                    <>
                                        {service?.service_credit?.service_credit_rates?.length &&
                                            service?.service_credit?.service_credit_rates?.map((rate, i) => {
                                                if (rate?.currency?.short_name === currency)
                                                    return (
                                                        <span>
                                                            {
                                                                service?.service_credit?.service_credit_rates[0]
                                                                    ?.free_credits
                                                            }{" "}
                                                            {service?.service_credit?.service?.name}/month
                                                        </span>
                                                    );
                                            })}
                                    </>
                                );
                            })}
                    </div>
                </div>
                {/* Included */}
                {/* Extras */}
                <div className="d-flex flex-column gap-2">
                    <h4 class="c-fs-4 c-fw-sb">Extra @</h4>
                    <div className="d-flex flex-column">
                        {plan?.plan_services?.length &&
                            plan?.plan_services?.map((service, index) => {
                                return (
                                    <>
                                        {service?.service_credit?.service_credit_rates?.length &&
                                            service?.service_credit?.service_credit_rates?.map((rate, i) => {
                                                if (rate?.currency?.short_name === currency)
                                                    return (
                                                        <span>
                                                            {plan?.postpaid_allowed ? (
                                                                <>
                                                                    <MdDone className="text-green me-2 prcing-check" />
                                                                    {rate?.currency?.symbol}
                                                                    {rate?.follow_up_rate}/
                                                                    {service?.service_credit?.service?.name}
                                                                    {service?.service_credit?.service?.is_rental
                                                                        ? "/month"
                                                                        : ""}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <MdClose className="text-danger me-2 prcing-check" />
                                                                    {"No Extra "}{" "}
                                                                    {service?.service_credit?.service?.name}
                                                                </>
                                                            )}
                                                        </span>
                                                    );
                                            })}
                                    </>
                                );
                            })}
                    </div>
                </div>
                {/* Extras */}
          
            </div>
        </>
    );
}
