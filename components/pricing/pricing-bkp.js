import { MdDone, MdClose, MdKeyboardArrowRight, MdAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CIDData from '@/data/countriesWIthCID.json';

const PricingCalls = ({ subscriptionVoice, fetchSubscriptionVoice, countryCode }) => {
    const [selectedMode, setSelectedMode] = useState('Monthly');
    const [symbol, setSymbol] = useState('₹');
    const [searchValue, setSearchValue] = useState('91');
    const [pagination, setPagination] = useState(0);
    const [pagesize, setPagesize] = useState(25);
    const [pageNum, setPageNum] = useState(1);
    const [displayValue, setDisplayValue] = useState('');
    const [data, setData] = useState(null);
    const [pulse, setPulse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paginationArray, setPaginationArray] = useState([]);
    const [cIDCode, setCIDCode] = useState(91);

    const changeCurrency = (currency) => {
        fetchSubscriptionVoice(currency, '6');
        switch (currency) {
            case 'INR':
                setSymbol('₹');
                break;
            case 'USD':
                setSymbol('$');
                break;
            case 'GBP':
                setSymbol('£');
                break;
            default:
                setSymbol('₹');
                break;
        }
    };

    const handleSearch = () => {
        setDisplayValue(searchValue);
        fetchData(1);
    };
    const cidData = CIDData.find((country) => country.code === cIDCode);
    const countryName = cidData.name;

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
                // `https://voice.phone91.com/public/dialplans/8?page_size=${pagesize}&page_num=${page}&prefix=${searchValue}`,
                // `https://testvoice.phone91.com/public/pricing/?cid=${cid}&dialplan_id=244`,
                `https://testvoice.phone91.com/public/pricing/?cid=509&dialplan_id=244`,
                {
                    headers: headers,
                }
            );

            if (response.ok) {
                const data = await response.json();
                setData(data);
                let getPulse = data.data.rates[0].billing.split('/');
                setPulse(getPulse[0]);
                const lenght = Math.ceil(data.data.count / pagesize);
                setPagination(lenght);
                const d = Array.from({ length: lenght }, (_, i) => i + 1);
                setPaginationArray(d);
            } else {
                throw new Error('Currently we only have plan for India(91)');
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
    const showDiv = router.asPath.includes('/in');
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            // Perform search operation
            handleSearch();
        }
    };

    useEffect(() => {
        fetchData(1);
    }, [countryCode]);
    console.log(data);

    return (
        <>
            <div>
                <div className="header d-flex justify-content-between mb-4">
                    <div class="dropdown">
                        <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {countryName}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {CIDData.map((data, index) => {
                                return (
                                    <li key={index} class="dropdown-item" onClick={() => setCIDCode(data.code)}>
                                        {data.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* <span className="d-flex">
            <h6 className="active country text-Secondary cursor-pointer bg-white d-flex align-items-center p-2 border round-start c-fs-6">
              INR
            </h6>
            <h6 className="country text-Secondary cursor-pointer bg-white d-flex align-items-center p-2 border c-fs-6">USD</h6>
            <h6 className="country text-Secondary cursor-pointer bg-white d-flex align-items-center p-2 border round-end c-fs-6">
              GBP
            </h6>
          </span> */}
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
                        {/* {data.data.map((data, index) => {
                            <tr>
                                <td>Landline</td>
                                <td>₹0.015 - ₹0.030</td>
                                <td>₹0.059 - ₹0.100</td>
                            </tr>;
                        })} */}
                    </tbody>
                </table>

                <div className="mb-4">
                    <span className="c-fw-m click-hear cursor-pointer">Click here</span>
                    <span className="c-fw-m"> to download the detailed network and prefix wise pricing sheet.</span>
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
                        Calls are routed through premium A-Z routes and CLI can be any valid number. Calls without a
                        CLI, with invalid CLI, with manipulated CLI, with CLI originated from unidentified, closed or
                        unallocated prefix ranges, with CLI not in E.164 format, with CLI not matching ITU standards
                        might be blocked or charged at the highest price.
                    </span>
                </div>
                <div>
                    <span className="fw-semibold mb-3">Local Rate:</span>
                    <span>
                        {' '}
                        Calls are routed through local operators’ in-country network. Only numbers on your MSG91 account
                        can be used.
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
