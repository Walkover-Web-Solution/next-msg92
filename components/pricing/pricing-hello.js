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
                                        console.log("card: " + planAmount);
                                        return <HelloPricingCard plan={plan} planAmount={planAmount} />
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

export function HelloPricingCard(data) {
    return <div>
        
    </div>
}
