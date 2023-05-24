import { MdDone, MdClose, MdKeyboardArrowRight,MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PricingCalls = ({ subscriptionVoice, fetchSubscriptionVoice }) => {
  const [selectedMode, setSelectedMode] = useState("Monthly");
  const [symbol, setSymbol] = useState("₹");
  const [searchValue, setSearchValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeCurrency = (currency) => {
    fetchSubscriptionVoice(currency, "6");
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
      default:
        setSymbol("₹");
        break;
    }
  };

  const handleSearch = () => {
    setDisplayValue(searchValue);
    console.log("Search value:", searchValue);
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        Authorization: {
          authkey: process.env.Authorization_authkey,
        },
        // other headers if required
      };

      const response = await fetch(
        `https://testvoice.phone91.com/public/dialplans/1?prefix=${searchValue}`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error("Error fetching data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  var maindata = 0;
  maindata = JSON.stringify(data, null, 2);
  const router = useRouter();
  const showDiv = router.asPath.includes("/in");
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Perform search operation
      handleSearch();
    }
  };

  return (
    <>
      <div>
      
          <div className="nonin price-card rcs d-flex col-11 col-lg-10 flex-column mx-auto c-bg-grey p-4">
            <h3 className="c-fs=3">
              Connect to our team for the customized pricing
            </h3>
            <a
              href="/contact-us"
              className="btn btn-outline-dark col-6 col-sm-5 col-md-3 mx-auto mt-3"
            >
              Talk to an Expert
            </a>
          </div>
        
      </div>
    </>
  );
};

export default PricingCalls;
