import axios from 'axios';
import { useEffect, useState } from 'react';
import availableCountries from '@/data/available-countries.json';

const pricingwp = ({ countryCode }) => {
    const [selectedCurrency, setSelectedCurrency] = useState(change);
    const [tableData, setTableData] = useState([]);
    const [pricing, setPricing] = useState([]);
    var change;
    var changeSymbol;
    if (
        countryCode === 'US' ||
        countryCode === 'AE' ||
        countryCode === 'SG' ||
        countryCode === 'PH' ||
        countryCode === 'BR' ||
        countryCode === ''
    ) {
        change = 'USD';
        changeSymbol = '$';
    } else if (countryCode === 'GB' || countryCode === 'ES') {
        change = 'GBP';
        changeSymbol = '£';
    } else if (countryCode === 'IN') {
        change = 'INR';
        changeSymbol = '₹';
    }

    const getWhatsAppPricing = async (currency) => {
        try {
            const response = await axios.get(`https://whatsapp.phone91.com/get-pricing-data/${currency}`);
            setPricing(response?.data?.data.sort((a, b) => a.country_name.localeCompare(b.country_name)));
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };
    useEffect(() => {
        getWhatsAppPricing(change.toLowerCase());
    }, [countryCode, change]);
    useEffect(() => {
        const currentCountry = availableCountries[countryCode.toLowerCase()]?.name;
        const fetchData = async () => {
            const matchingCountry = pricing.find((country) => country.country_name === currentCountry);
            const defaultCountry = pricing.find((country) => country.country_name === 'Default');

            const updatedPricing = pricing.filter(
                (country) => country.country_name !== currentCountry && country.country_name !== 'Default'
            );
            setTableData([matchingCountry, defaultCountry, ...updatedPricing]);
        };

        if (pricing.length > 0) {
            fetchData();
            setSelectedCurrency(change);
        }
    }, [countryCode, pricing]);

    return (
        <>
            <div className="price-card whatsapp d-flex flex-sm-row flex-column rounded-1 col-xl-12 col-lg-11 col-md-10 bg-white p-4 gap-4 justify-content-between align-items-sm-center mb-0">
                <div className=" ">
                    <h3 className="text-start fw-bolder fs-2 text-green mb-3">
                        Zero <span className="text-dark ">margin on meta price</span>
                    </h3>

                    <h3 className="tds fw-medium c-fs-4 mt-2 d-block">TDS and GST excluded.</h3>
                    <a
                        type="button"
                        className="btn btn-dark fw-semibold my-3 rounded-1"
                        href="/signup?service=whatsapp"
                        target="_blank"
                    >
                        Get Started
                    </a>
                    {/* <a href="/contact-us" className="btn btn-outline-dark col-6 col-sm-5 col-md-3 mx-auto mt-3">Talk to an Expert</a> */}
                </div>
                <div className=" ">
                    <img src={`/img/icon/whatsapp-black.svg`} />
                </div>
            </div>

            <div className="d-flex container gap-3 flex-column text-start">
                <div className="c-fs-5 mt-5">
                    {/* MSG91 takes one time fee <strong>{symbol}{oneTimeWtsAppFee}</strong> to set up your WhatsApp Business account. */}
                    Since we do not impose any service charge,{' '}
                    <strong>{selectedCurrency === 'INR' ? 'GST' : 'Taxes'}</strong> will be applied to WhatsApp pricing
                </div>

                <table className="table table-sm c-fs-5">
                    <thead>
                        <tr>
                            <th scope="col">Market</th>
                            <th scope="col">prefix</th>

                            <th scope="col">Marketing</th>
                            <th scope="col">Utility</th>
                            <th scope="col">Authentication</th>
                            <th scope="col">Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.length &&
                            tableData.map((item, index) => {
                                if (item?.country_name) {
                                    return (
                                        <tr key={index}>
                                            <td>{item?.country_name}</td>
                                            <td>{item?.prefix}</td>

                                            <td>
                                                {changeSymbol}
                                                {!isNaN(parseFloat(item?.marketing_rate))
                                                    ? parseFloat(item.marketing_rate).toFixed(5)
                                                    : 'N/A'}
                                            </td>
                                            <td>
                                                {changeSymbol}
                                                {!isNaN(parseFloat(item?.utility_rate))
                                                    ? parseFloat(item.utility_rate).toFixed(5)
                                                    : 'N/A'}
                                            </td>
                                            <td>
                                                {changeSymbol}
                                                {!isNaN(parseFloat(item?.authentication_rate))
                                                    ? parseFloat(item.authentication_rate).toFixed(5)
                                                    : 'N/A'}
                                            </td>
                                            <td>
                                                {changeSymbol}
                                                {!isNaN(parseFloat(item?.user_initiated_rate))
                                                    ? parseFloat(item?.user_initiated_rate).toFixed(5)
                                                    : 'N/A'}
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                    </tbody>
                </table>
                <a className="more-about" href="/whatsapp">
                    <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
                    <span>Know more about WhatsApp</span>
                </a>
            </div>
        </>
    );
};

export default pricingwp;
