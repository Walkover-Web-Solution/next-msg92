import { MdDone, MdClose, MdKeyboardArrowRight,MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PricingCalls = ({ subscriptionVoice, fetchSubscriptionVoice, countryCode }) => {
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
  const [paginationArray,setPaginationArray] = useState([]);

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
    console.log('fetch data page', page);
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
        const lenght = Math.ceil(data.data.count/pagesize)        
        setPagination(lenght)
        const d = Array.from({length: lenght}, (_, i) => i + 1)        
        setPaginationArray(d)
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
        {showDiv ? (
          <>
            <label for="tie-id" className="fs-6 text-secondary mb-2">Enter Prefix, e.g. 91</label>
            <div className="onlyin mb-5 d-flex col-3 mx-auto">
              <div className="input-group mb-3">
              {/* <span className=" arrow-search-btn">
                  <MdAdd className="arrow-search" />
                </span> */}
                <input
                  className="c-fs-3 form-control"
                  type="text"
                  placeholder="Enter Country Code"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <span className=" btn btn-dark arrow-search-btn" onClick={handleSearch}>
                  <MdKeyboardArrowRight className="arrow-search" />
                </span>
              </div>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="mb-5">{error}</div>
            ) : data ? (
                <div className="m-auto rate-table">
                  <table className="table">
                    <thead>
                      <tr>                      
                        <th scope="col">Prefix</th>
                        <th scope="col">Rate <div className="c-fs-5">(Incoming/Outgoing)</div></th>
                      </tr>
                    </thead>
                    <tbody>
                    {data.data.rates.map((rateObj, index) => (
                      <tr key={`rate-${index}`}>                    
                        <td>{rateObj.prefix}</td>
                        <td>{rateObj.rate} <small>{data.data.currency_code}</small></td>
                      </tr>                    
                    ))}
                    </tbody>                  
                  </table>
                  <div className="pb-5"></div>                  
                  <div className="d-flex">
                    <ul className="pagination m-auto">
                      {pagination > 1 && 
                        paginationArray.map((num)=>{
                          return(
                            <li className={`page-item ${ pageNum === num ? 'active' : ''}`} key={`page-${num}`} onClick={()=>fetchData(num)}>
                              <a class="page-link">{num}</a>
                            </li>  
                          )
                        })
                        }           
                    </ul>
                  </div>
                  <div>1 Pluse = {pulse} seconds</div>
                  <div>Free incoming on web calls</div>
                  <div className="mb-5">₹ 1000/month for each Caller ID</div>
                </div>                
            ) : null}
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
          </>
        ) : (
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
        )}
    </>
  );
};

export default PricingCalls;