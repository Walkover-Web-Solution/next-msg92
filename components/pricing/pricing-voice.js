import { useEffect, useState } from 'react';
import countries from '@/data/countriesWIthCID.json';
import { MdDone} from "react-icons/md";
import faqData from '@/data/faq.json';
import FaqSection from '../faqSection/faqSection';
import { Typeahead } from 'react-bootstrap-typeahead';

const PricingCalls = ({ countryCode }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [dialPlan, setDialPlan] = useState();
    const [countryData, setCountryData] = useState();
    const [currencyCode, setCurrencyCode] = useState();
    const [symbol, setSymbol] = useState();

    //set intial states
    useEffect(() => {
        if (countryData?.length > 0) {
            setSelectedCountry(countryData.find((country) => country.country_code === countryCode));
        }
    }, [countryData ]);

    useEffect(() => {
        if (selectedCountry) {
            setCurrencyCode(countries.find((country) => country.sortname === selectedCountry?.country_code)?.currency);
        }
    }, [selectedCountry, countries]);

    //fetch Counties
    useEffect(() => {
        fetchCountryData();
    }, []);
    const fetchCountryData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://testvoice.phone91.com/public/country/`);
            if (response.ok) {
                const data = await response.json();
                setCountryData(data);
            } else {
                throw new Error('Currently we only have plan for India(91)');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    //fetch dialPlan and set corrency
    useEffect(() => {
        if (currencyCode) {
            fetchDialPlan(currencyCode);
            if (currencyCode === 'GBP') {
                setSymbol('£');
            } else if (currencyCode === 'INR') {
                setSymbol('₹');
            } else {
                setSymbol('$');
            }
        }
    }, [currencyCode]);
    const fetchDialPlan = async (currencyCode) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://testvoice.phone91.com/public/dialplanPricing/?currency=${currencyCode}`
            );
            if (response.ok) {
                const data = await response.json();

                setDialPlan(data?.data.dialplan_id);
            } else {
                throw new Error('Currently we only have plan for India(91)');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    //fetch pricing data
    useEffect(() => {
        if ((dialPlan, selectedCountry)) {
            fetchData(selectedCountry, dialPlan);
        }
    }, [dialPlan, selectedCountry]);

    const fetchData = async (selectedCountry, dialPlan) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://testvoice.phone91.com/public/pricing/?cid=${selectedCountry?.id}&dialplan_id=${dialPlan}`
            );
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                throw new Error('Currently we only have plan for India(91)');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    function myFunction() {
        document.getElementById("demo").innerHTML = "watting";
      }
// myFunction();
    return (
        <>
            <div className="col-3">
                {countryData && (
                    <>
                        <Typeahead
                            className="col c-fs-6"
                            id="country"
                            placeholder={selectedCountry?.name}
                            labelKey="name"
                            options={countryData}
                            clearButton
                            inputProps={{
                                autoComplete: 'off',
                            }}
                            onChange={(selected) => {
                                if (selected[0]) {
                                    setSelectedCountry(selected[0]);

                                    setCurrencyCode(
                                        countries.find((country) => country.name === selected[0]?.name)?.currency
                                    );
                                }
                            }}
                        />
                    </>
                )}
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
                    {data &&
                        data?.data.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data?.network}</td>
                                    <td>
                                        {symbol}
                                        {data?.local_rates_min} - {symbol}
                                        {data?.local_rates_max}{' '}
                                    </td>
                                    <td>
                                        {symbol} {data?.international_rates_min} - {symbol}
                                        {data?.international_rates_max}{' '}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
             <div className="pb-3">
          <span className="c-fw-m">
            to download the detailed network and prefix wise pricing sheet.
            {" "}
          </span>
          <a onClick={myFunction} id="demo" className="c-fw-m click-hear cursor-pointer">Export</a>
        </div>

        <div className="services w-100 rounded-2 bg-white p-4 my-4">
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
                Call Monitoring
              </div>
              <div>
                <span className="text-success me-2 c-fs-3">
                  <MdDone />
                </span>
                Number Masking
              </div>
            </div>
          </div>
          <div className="c-fw-m mt-3">
            All the Add-On Services are
            <span className="text-green c-fw-m"> FREE</span> of cost
          </div>
        </div>

        <a type="button" class="btn btn-dark fw-semibold my-4 rounded-1"
         href="/signup?service=voice"
         target="_blank">
          Get Started
        </a>
        <div className='mt-3'>
          <span className="fw-semibold my-3">International rate:</span>
          <span>
            Calls are routed through premium A-Z routes and CLI can be any valid
            number. Calls without a CLI, with invalid CLI, with manipulated CLI,
            with CLI originated from unidentified, closed or unallocated prefix
            ranges, with CLI not in E.164 format, with CLI not matching ITU
            standards might be blocked or charged at the highest price.
          </span>
        </div>
        <div className='mt-3'>
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
            data-bs-toggle="modal" data-bs-target="#sales-modal"
            className="btn btn-outline-dark mt-3 mb-5 fw-semibold border border-dark border rounded-1 px-3 py-1"
          >
            Talk to Sales
          </button>
          <br />
          <a className='mt-3' href="#">
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            <span className="link">Know more about Voice</span>
          </a>
        </div>

            <FaqSection faqData={faqData?.voice} />
        </>
    );
};

export default PricingCalls;
