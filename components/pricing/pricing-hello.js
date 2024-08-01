import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { setUtm } from "@/components/utils";
import Link from "next/link";
import faqData from "@/data/faq.json";
import FaqSection from "../faqSection/faqSection";

const pricinghello = ({ subscriptionHello, fetchSubscriptionHello, currency, countryCode }) => {
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
    const [selectedCurrency, setSelectedCurrency] = useState(change);
    const [selectedMode, setSelectedMode] = useState("Monthly");
    const [symbol, setSymbol] = useState(changeSymbol);

    const changeCurrency = async (currency) => {
        setSelectedCurrency(currency);

        try {
            const response = await fetchSubscriptionHello(currency, "7", "subscriptionHello");
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
            <div className="header d-flex  gap-3 justify-content-between flex-wrap my-4">
                <span className="d-flex">
                    <h2
                        className={` ${
                            selectedMode === "Monthly" ? "active" : null
                        }  text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer`}
                        onClick={() => setSelectedMode("Monthly")}
                    >
                        Monthly
                    </h2>
                    <h3
                        className={` ${
                            selectedMode === "Yearly" ? "active" : null
                        }  text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer`}
                        onClick={() => setSelectedMode("Yearly")}
                    >
                        Yearly (20% off)
                    </h3>
                </span>
            </div>

            <div className="w-100 card-container d-flex flex-wrap gap-4">
                {subscriptionHello?.length &&
                    subscriptionHello?.map((plan) => {
                        return (
                            <>
                                {plan?.plan_amounts?.length &&
                                    plan?.plan_amounts?.map((planAmount, index) => {
                                        if (
                                            planAmount?.currency?.short_name === currency &&
                                            planAmount?.plan_type?.name === selectedMode
                                        )
                                            return (
                                                <HelloPricingCard
                                                    plan={plan}
                                                    planAmount={planAmount}
                                                    currency={currency}
                                                    selectedMode={selectedMode}
                                                />
                                            );
                                    })}
                            </>
                        );
                    })}
            </div>

            <div className="my-4 connect-personalized">
                <span className="talk-to-sales d-block c-fs-4">
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

export function HelloPricingCard({ plan, planAmount, currency, selectedMode }) {
    return (
        <div
            className={`card d-flex align-items-start rounded-2 bg-white p-4  gap-3 ${
                plan?.most_popular ? "border-2" : "border-0"
            }`}
        >
            <div className="d-flex flex-column gap-3 w-100">
                <div className="d-flex flex-wrap gap-2 populartag_cont w-100">
                    <h3 className="fs-4 fw-semibold email_plan_name w-100">{plan?.name}</h3>
                    {plan && plan?.most_popular && (
                        <span className="populartag_tag border border-1 border-dark c-fw-sb rounded-5 px-3 btn-ft ms-auto">
                            Popular
                        </span>
                    )}
                </div>

                <span className="mt-2 c-fs-2 c-fw-sb text-green">
                    {planAmount?.currency?.symbol}
                    {planAmount?.plan_amount} {selectedMode}
                </span>
                <span className="c-fs-5"> {planAmount?.currency?.short_name === "INR" ? "+18% GST" : "-"}</span>
                <Link href={"/signup?service=hello"}>
                    <button className={`btn ${plan?.most_popular ? 'btn-dark':'btn-outline-dark'}  rounded-md`}>Get Started</button>
                </Link>
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
                                                        {service?.service_credit?.service_credit_rates[0]?.free_credits}{" "}
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
            {/* Features */}
            <div className="d-flex flex-column gap-2">
                <h4 class="c-fs-4 c-fw-sb">Features</h4>
                <div className="d-flex flex-column">
                    {plan?.plan_features?.length &&
                        plan?.plan_features?.map((feature, i) => {
                            if (feature?.is_visible) {
                                return (
                                    <span>
                                        {feature?.feature?.is_included ? (
                                            <MdDone className="text-green me-2 prcing-check" />
                                        ) : (
                                            <MdClose className="text-danger me-2 prcing-check" />
                                        )}
                                        {feature?.feature?.name}
                                    </span>
                                );
                            } else if (!feature?.feature?.is_included) {
                                return (
                                    <span>
                                        <MdClose className="text-danger me-2 prcing-check" />
                                        {feature?.feature?.name}
                                    </span>
                                );
                            }
                        })}
                </div>
            </div>
            {/* Features */}
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
                                                                {"No Extra "} {service?.service_credit?.service?.name}
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

            <div></div>
        </div>
    );
}
