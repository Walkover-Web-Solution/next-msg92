import { MdDone, MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { setUtm } from '@/components/utils';
const pricingemail = ({ subscriptionEmail, fetchSubscriptionEmail, currency, setSubscriptionEmail, countryCode }) => {
    var change;
    var changeSymbol;
    if (countryCode === 'US' || countryCode === 'AE' || countryCode === 'SG' || countryCode === 'PH') {
        change = 'USD';
        changeSymbol = '$';
    } else if (countryCode === 'GB' || countryCode === 'ES') {
        change = 'GBP';
        changeSymbol = '£';
    } else if (countryCode === 'IN') {
        change = 'INR';
        changeSymbol = '₹';
    }
    // ph,global
    const [selectedCurrency, setSelectedCurrency] = useState(change);
    const [selectedMode, setSelectedMode] = useState('Monthly');
    const [symbol, setSymbol] = useState(changeSymbol);

    const changeCurrency = async (currency) => {
        setSelectedCurrency(currency);
        try {
            const response = await fetchSubscriptionEmail(currency, '1', 'subscriptionEmail');
            console.log(response);
        } catch (error) {
            console.log(error.message, 'error');
        }

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
        }
    };

    const numberWithCommas = (x) => {
        let nf = currency === 'INR' ? new Intl.NumberFormat('en-IN') : new Intl.NumberFormat('en-US');
        return nf.format(x);
    };

    useEffect(() => {
        setUtm();
    }, []);

    return (
        <>
            <div className="header d-flex  gap-3 justify-content-between flex-wrap mb-4">
                <span className="d-flex">
                    <h6
                        className={` ${
                            selectedMode === 'Monthly' ? 'active' : null
                        }  text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer`}
                        onClick={() => setSelectedMode('Monthly')}
                    >
                        Monthly
                    </h6>
                    <h6
                        className={` ${
                            selectedMode === 'Yearly' ? 'active' : null
                        }  text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer`}
                        onClick={() => setSelectedMode('Yearly')}
                    >
                        Yearly (20% off)
                    </h6>
                </span>
                <span className="d-flex">
                    <h6
                        className={`${
                            symbol === '₹' ? 'active' : null
                        }  text-Secondary bg-white p-2 border rounded-start c-fs-6 cursor-pointer`}
                        onClick={() => changeCurrency('INR')}
                    >
                        INR
                    </h6>
                    <h6
                        className={`${
                            symbol === '$' ? 'active' : null
                        }  text-Secondary bg-white p-2 border  c-fs-6 cursor-pointer`}
                        onClick={() => changeCurrency('USD')}
                    >
                        USD
                    </h6>
                    <h6
                        className={`${
                            symbol === '£' ? 'active' : null
                        }  text-Secondary bg-white p-2 border rounded-end c-fs-6 cursor-pointer`}
                        onClick={() => changeCurrency('GBP')}
                    >
                        GBP
                    </h6>
                </span>
            </div>

            <div className="card-wrapper row d-flex w-100 py-4">
                {subscriptionEmail.map((item, index) => {
                    return (
                        <>
                            {item.name === 'Free' ? (
                                <div
                                    key={`email-card-${index}`}
                                    className={`${
                                        item.name === 'Alpha' ? 'border-2' : 'border-0'
                                    } d-flex flex-column flex-lg-row justify-content-between card-price   p-4 bg-white rounded-2 col-lg-12`}
                                >
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <h3 className="fs-4 fw-semibold">{item.name}</h3>
                                            {item.name === 'Alpha' && (
                                                <span className="tex-center px-2 pt-1 c-fs-7 c-fw-m border border-dark rounded-4">
                                                    Popular
                                                </span>
                                            )}
                                        </div>
                                        <div className="d-flex  mt-4 flex-wrap">
                                            <h5 className="c-fs-1 fw-bold text-green ">
                                                {' '}
                                                {symbol}
                                                {selectedMode === 'Monthly'
                                                    ? item.plan_amounts[0].plan_amount
                                                    : item.plan_amounts[1].plan_amount}
                                            </h5>
                                            <span className="text-dark ms-1 mt-auto fw-medium ">
                                                per {selectedMode === 'Monthly' ? 'month' : 'year'}
                                            </span>
                                        </div>
                                    </div>
                                    <a
                                        href="https://control.msg91.com/signup/"
                                        target="_blank"
                                        className="d-block d-lg-none align-items-end py-4 border-bottom border-2"
                                    >
                                        <button type="button" class="btn btn-outline-dark rounded-1 fw-semibold">
                                            Get Started
                                        </button>
                                    </a>
                                    <div>
                                        {' '}
                                        <h3 className="c-fs-4 fw-semibold mt-4">Included</h3>
                                        <div className="c-fs-5 ">
                                            <span className="text-success prcing-check me-1">
                                                <MdDone />
                                            </span>
                                            {numberWithCommas(item.plan_services[0].service_credit.free_credits)} Emails
                                        </div>
                                        <div className="c-fs-5 ">
                                            <span className="text-danger prcing-check me-1">
                                                <MdClose />
                                            </span>
                                            No Email Validations
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="c-fs-4 fw-semibold mt-4">Extra @</h3>
                                        <div className="c-fs-5 ">
                                            <span className="text-danger prcing-check me-1">
                                                <MdClose />
                                            </span>
                                            No Email
                                        </div>
                                        <div className="c-fs-5 ">
                                            <span className="text-danger prcing-check me-1">
                                                <MdClose />
                                            </span>
                                            No Email Validation
                                        </div>
                                    </div>
                                    <a href="https://control.msg91.com/signup/" target="_blank" className="mt-auto d-lg-block d-none">
                                        <button type="button" class="btn btn-outline-dark rounded-1 fw-semibold mt-4">
                                            Get Started
                                        </button>
                                    </a>
                                </div>
                            ) : (
                                <div
                                    key={`email-card-${index}`}
                                    className={`${
                                        item.name === 'Alpha' ? 'border-2' : 'border-0'
                                    } card-price card  p-4 bg-white rounded-2 col-lg`}
                                >
                                    <div className="d-flex justify-content-between">
                                        <h3 className="fs-4 fw-semibold">{item.name}</h3>
                                        {item.name === 'Alpha' && (
                                            <span className="tex-center px-2 pt-1 c-fs-7 c-fw-m border border-dark rounded-4">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <div className="d-flex align-items-end mt-4 flex-wrap">
                                        <h5 className="c-fs-1 fw-bold text-green ">
                                            {' '}
                                            {symbol}
                                            {selectedMode === 'Monthly'
                                                ? item.plan_amounts[0].plan_amount
                                                : item.plan_amounts[1].plan_amount}
                                        </h5>
                                        <span className="text-dark ms-1 fw-medium ">
                                            per {selectedMode === 'Monthly' ? 'month' : 'year'}
                                        </span>
                                    </div>
                                    <span>
                                        {' '}
                                        {symbol === '₹' && item.plan_amounts[0]?.plan_amount === 0
                                            ? '-'
                                            : '' || (symbol === '₹' && item.plan_amounts[0]?.plan_amount !== 0)
                                            ? '+18%GST'
                                            : ''}
                                    </span>
                                    <a
                                        href="https://control.msg91.com/signup/"
                                        target="_blank"
                                        className="d-flex align-items-end py-4 border-bottom border-2"
                                    >
                                        <button
                                            type="button"
                                            class={`${
                                                item.name === 'Alpha' ? 'btn-dark' : 'btn-outline-dark'
                                            } btn  rounded-1 fw-semibold `}
                                        >
                                            Get Started
                                        </button>
                                    </a>
                                    <h3 className="c-fs-4 fw-semibold mt-4">Included</h3>
                                    <div className="c-fs-5 ">
                                        <span className="text-success prcing-check me-1">
                                            <MdDone />
                                        </span>
                                        {numberWithCommas(item.plan_services[0].service_credit.free_credits)} Emails
                                    </div>
                                    <div className="c-fs-5 ">
                                        <span className="text-success prcing-check me-1">
                                            <MdDone />
                                        </span>
                                        {numberWithCommas(item.plan_services[1].service_credit.free_credits)} Email
                                        Validations
                                    </div>
                                    <h3 className="c-fs-4 fw-semibold mt-4">Extra @</h3>
                                    <div className="c-fs-5 ">
                                        <span className="text-success prcing-check me-1">
                                            <MdDone />
                                        </span>
                                        {symbol}{' '}
                                        {item.plan_services[0].service_credit.service_credit_rates[0].follow_up_rate}{' '}
                                        per Email
                                    </div>
                                    <div className="c-fs-5 ">
                                        <span className="text-success prcing-check me-1">
                                            <MdDone />
                                        </span>
                                        {symbol}{' '}
                                        {item.plan_services[1].service_credit.service_credit_rates[0].follow_up_rate}{' '}
                                        per Email Validation
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })}
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
                <a className="mt-3" href="#">
                    <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
                    <span className="link">Know more about Email</span>
                </a>
            </div>
        </>
    );
};

export default pricingemail;
