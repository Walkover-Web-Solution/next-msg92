import { MdDone, MdClose, MdKeyboardArrowRight, MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PricingCalls = ({
  subscriptionVoice,
  fetchSubscriptionVoice,
  countryCode,
}) => {
  const [selectedMode, setSelectedMode] = useState("Monthly");
  const [symbol, setSymbol] = useState("₹");
  const [searchValue, setSearchValue] = useState("91");
  const [pagination, setPagination] = useState(0);
  const [pagesize, setPagesize] = useState(25);
  const [pageNum, setPageNum] = useState(1);
  const [displayValue, setDisplayValue] = useState("");
  const [data, setData] = useState(null);
  const [pulse, setPulse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationArray, setPaginationArray] = useState([]);

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
    fetchData(1);
  };

  const fetchData = async (page) => {
    setLoading(true);
    setError(null);
    setPageNum(page);
    try {
      const headers = {
        Authorization: {
          authkey: process.env.Authorization_authkey,
        },
        // other headers if required
      };

      const response = await fetch(
        //`https://testvoice.phone91.com/public/dialplans/1?page_size=${pagesize}&page_num=${page}&prefix=${searchValue}`,
        `https://voice.phone91.com/public/dialplans/8?page_size=${pagesize}&page_num=${page}&prefix=${searchValue}`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
        let getPulse = data.data.rates[0].billing.split("/");
        setPulse(getPulse[0]);
        const lenght = Math.ceil(data.data.count / pagesize);
        setPagination(lenght);
        const d = Array.from({ length: lenght }, (_, i) => i + 1);
        setPaginationArray(d);
      } else {
        throw new Error("Currently we only have plan for India(91)");
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

  useEffect(() => {
    fetchData(1);
  }, [countryCode]);

  return (
    <>
      {/* {showDiv ? ( */}
      {/* // <>
          //   <label for="tie-id" className="fs-6 text-secondary mb-2">Enter Prefix, e.g. 91</label>
          //   <div className="onlyin mb-5 d-flex col-3 mx-auto">
          //     <div className="input-group mb-3"> */}
      {/* <span className=" arrow-search-btn">
          //         <MdAdd className="arrow-search" />
          //       </span> */}
      {/* //       <input */}
      {/* //         className="c-fs-3 form-control"
          //         type="text"
          //         placeholder="Enter Country Code"
          //         value={searchValue}
          //         onChange={(e) => setSearchValue(e.target.value)}
          //         onKeyDown={handleKeyDown}
          //       />
          //       <span className=" btn btn-dark arrow-search-btn" onClick={handleSearch}>
          //         <MdKeyboardArrowRight className="arrow-search" />
          //       </span>
          //     </div> */}

      {/* //   {loading ? ( */}
      {/* //     <div>Loading...</div>
          //   ) : error ? (
          //     <div className="mb-5">{error}</div>
          //   ) : data ? (
          //       <div className="m-auto rate-table">
          //         <table className="table">
          //           <thead>
          //             <tr>
          //               <th scope="col">Prefix</th>
          //               <th scope="col">Rate <div className="c-fs-5">(Incoming/Outgoing)</div></th>
          //             </tr>
          //           </thead>
          //           <tbody>
          //           {data.data.rates.map((rateObj, index) => ( */}
      {/* //             <tr key={`rate-${index}`}>
          //               <td>{rateObj.prefix}</td>
          //               <td>{rateObj.rate} <small>{data.data.currency_code}/Minute</small></td>
          //             </tr>
          //           ))}
          //           </tbody> */}
      {/* //         </table> */}

      {/* //         <div className="pb-5"></div>
          //         <div className="d-flex">
          //           <ul className="pagination m-auto">
          //             {pagination > 1 && */}
      {/* //               paginationArray.map((num)=>{ */}
      {/* //                 return(
          //                   <li className={`page-item ${ pageNum === num ? 'active' : ''}`} key={`page-${num}`} onClick={()=>fetchData(num)}>
          //                     <a className="page-link">{num}</a>
          //                   </li>
          //                 )
          //               })
          //               }
          //           </ul> */}
      {/* //         </div> */}
      {/* <div>1 Pluse = {pulse} seconds</div> */}
      {/* //         <div className="mb-5 c-fs-5">
          //           <div>Incoming calls on Web - <strong>Free</strong></div>
          //         </div>
          //       </div> */}
      {/* //   ) : null} */}
      {/* <div className="nonin price-card rcs d-flex col-11 col-lg-10 flex-column mx-auto c-bg-grey p-4 gap-3 align-items-center">
              <h3 className="c-fs=3">
                Connect to our team for the customized pricing
              </h3>
              <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-4 btn btn-outline-dark mt-2">
                Talk to an Expert
            </button>
        //     </div> */}
      {/* //   </> */}
      {/* // ) : ( */}
      {/* // <div className="nonin price-card rcs d-flex col-6 col-lg-6 flex-column mx-auto c-bg-grey p-4 gap-3 align-items-center">
          //   <h3 className="c-fs-3">
          //     Connect to our team for the customized pricing
          //   </h3>
          //   <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-4 btn btn-outline-dark mt-2">
          //     Talk to an Expert
          //   </button>
          // </div> */}

      <div>
        <div className="header d-flex justify-content-between mb-4">
          <div class="input-group justify-content-between w-25 border border-2 rounded-1 bg-white">
            <input
              type="text"
              class="border border-0 ps-3"
              aria-label="Text input with dropdown button"
            />
            <button
              class="btn bg-white border border-0 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#">
                  INR
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  GBP
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  USD
                </a>
              </li>
            </ul>
          </div>
          <span className="d-flex">
            <h6 className="active country text-Secondary cursor-pointer bg-white d-flex align-items-center p-2 border round-start c-fs-6">
              INR
            </h6>
            <h6 className="country text-Secondary cursor-pointer bg-white d-flex align-items-center p-2 border c-fs-6">USD</h6>
            <h6 className="country text-Secondary cursor-pointer bg-white d-flex align-items-center p-2 border round-end c-fs-6">
              GBP
            </h6>
          </span>
        </div>

        <h4 className="c-fs-4 fw-semibold mt-3">Outgoing call charges/min</h4>

        <table className="table border border-dark rounded-2 my-3 overflow-hidden">
          <thead>
            <tr>
              <th className="border-bottom border-dark">Recipient’s Network</th>
              <th className="border-bottom border-dark">Local rates</th>
              <th className="border-bottom border-dark">International rates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Landline</td>
              <td>₹0.015 - ₹0.030</td>
              <td>₹0.059 - ₹0.100</td>
            </tr>
            <tr>
              <td>Jio</td>
              <td>₹0.015</td>
              <td>₹0.080 - ₹0.180</td>
            </tr>
            <tr>
              <td>Airtel</td>
              <td>₹0.025 - ₹0.075</td>
              <td>₹0.025 - ₹0.075</td>
            </tr>
            <tr>
              <td>Vi</td>
              <td>₹0.025 - ₹0.075</td>
              <td>₹0.110 - ₹0.025</td>
            </tr>
            <tr>
              <td>BSNL</td>
              <td>₹0.015</td>
              <td>₹0.065 - ₹0.125</td>
            </tr>
            <tr>
              <td>Network-5</td>
              <td>₹0.025 - ₹0.075</td>
              <td>₹0.023</td>
            </tr>
            <tr>
              <td>Other</td>
              <td>₹0.025 - ₹0.075</td>
              <td>₹0.045</td>
            </tr>
          </tbody>
        </table>

        <div className="mb-4">
          <span className="c-fw-m click-hear cursor-pointer">Click here</span>
          <span className="c-fw-m">
            {" "}
            to download the detailed network and prefix wise pricing sheet.
          </span>
        </div>

        <div className="services w-100 rounded-2 bg-white p-4 my-3">
          <strong className="c-fs-4 fw-semibold">Add-on services</strong>
          <div className="row">
            <div className="col-6">
              <div className="my-2 c-fs-5">
                <span className="text-success me-2 c-fs-3">
                  <MdDone />
                </span>
                Call Recording
              </div>
              <div>
                <span className="text-success me-2 c-fs-3">
                  <MdDone />
                </span>
                Analytics
              </div>
            </div>
            <div className="col-6">
              <div className="my-2">
                <span className="text-success me-2 c-fs-3">
                  <MdDone />
                </span>
                Call Recording
              </div>
              <div>
                <span className="text-success me-2 c-fs-3">
                  <MdDone />
                </span>
                Add...
              </div>
            </div>
          </div>
          <div className="c-fw-m mt-3">
            All the Add-On Services are
            <span className="text-green c-fw-m"> FREE</span> of cost
          </div>
        </div>

        <button type="button" class="btn btn-dark fw-semibold my-4 rounded-1">
          Get Started
        </button>
        <div>
          <span className="fw-semibold my-3">International rate:</span>
          <span>
            Calls are routed through premium A-Z routes and CLI can be any valid
            number. Calls without a CLI, with invalid CLI, with manipulated CLI,
            with CLI originated from unidentified, closed or unallocated prefix
            ranges, with CLI not in E.164 format, with CLI not matching ITU
            standards might be blocked or charged at the highest price.
          </span>
        </div>
        <div>
          <span className="fw-semibold mb-3">Local Rate:</span>
          <span>
            {" "}
            Calls are routed through local operators’ in-country network. Only
            numbers on your MSG91 account can be used.
          </span>
        </div>
        <div className="connect-personalized my-4">
          <span className="talk-to-sales d-block c-fs-4 fw-medium">
            Connect with our team for a personalized plan to meet your needs.
          </span>
          <button
            type="button"
            className="btn btn-outline-dark mt-3 mb-4 fw-semibold border border-dark border-2 rounded-1 px-3 py-1"
          >
            Talk to Sales
          </button>
          <br />
          <a href="#">
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            <span className="link">Know more about Voice</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default PricingCalls;
