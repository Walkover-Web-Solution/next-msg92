import { useEffect, useState } from 'react';
import countries from '@/data/countries.json';

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
    useEffect(() => {
        setSelectedCountry(countries.find((country) => country.sortname === countryCode));
        setCurrencyCode(countries.find((selectedCountry) => selectedCountry?.sortname === countryCode)?.currency);
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
    useEffect(() => {
        if (selectedCountry) {
            console.log('🚀 ~ useEffect ~ selectedCountry:', selectedCountry);

            if (selectedCountry.currency === 'GBP') {
                setSymbol('£');
            } else if (selectedCountry.currency === 'INR') {
                setSymbol('₹');
            } else {
                setSymbol('$');
            }
            fetchCountryData();
        }
    }, [selectedCountry]);
    useEffect(() => {
        if (currencyCode) {
            fetchDialPlan(currencyCode);
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
                console.log(data, selectedCountry, dialPlan);
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

    return (
        <>
            <div className="col-3">
                {countryData && (
                    <Typeahead
                        className="col"
                        id="country"
                        placeholder={selectedCountry?.name}
                        labelKey="name"
                        onChange={(selected) => {
                            setSelectedCountry(selected[0]);

                            setCurrencyCode(countries.find((country) => country.name === selected[0].name).currency);
                        }}
                        options={countryData}
                        clearButton={false}
                    />
                )}
            </div>
            <table className="table border border-dark rounded-2 my-3 overflow-hidden">
                <thead>
                    <tr>
                        <th className="border-bottom border-dark">Recipient’s Network</th>
                        <th className="border-bottom border-dark">Local rates</th>
                        <th className="border-bottom border-dark">International rates</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data &&
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

            <FaqSection faqData={faqData?.voice} />
        </>
    );
};

export default PricingCalls;
