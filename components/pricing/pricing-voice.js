import { MdDone, MdClose, MdKeyboardArrowRight, MdAdd } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CIDData from '@/data/countriesWIthCID.json';
import faqData from '@/data/faq.json';
import FaqSection from '../faqSection/faqSection';




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
            <FaqSection faqData={faqData?.voice}/>
        </>
    );
};

export default PricingCalls;