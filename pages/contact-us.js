import { useEffect, useState } from 'react';
import { MdOutlineEmail, MdCall, MdWhatsapp } from 'react-icons/md';
const contactus = ({ path }) => {
    var [countryName, setCountryName] = useState('');
    useEffect(() => {
        fetch('https://api.db-ip.com/v2/free/self')
            .then((response) => response.json())
            .then((response) => {
                setCountryName(response.countryName);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);
    return (
        <>
            <div className="container text-center px-4 col-xs-12 col-sm-10 col-md-10 mx-auto  py-5">
                <h1 className="sub-heading pb-1 pb-md-5">Contact Us</h1>
                <div className="justify-content-around row gap-5">
                    <div className="contact-card d-flex flex-column align-items-center justify-content-between gap-3 gap-md-5 px-3 py-2 py-md-4 col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-10">
                        <h2>Sales</h2>
                        <div className="d-flex flex-column align-items-start gap-4">
                            {countryName && countryName !== 'India' ? (
                                <>
                                    <div className="d-flex align-items-center">
                                        <span className="c-fs-1   justify-content-center align-items-center d-flex">
                                            <MdOutlineEmail className="p-auto c-fw-sb  " />
                                        </span>
                                        <a
                                            href="mailto:contact@msg91.com"
                                            className="c-fs-2 ms-3 c-text-link text-center bg-white"
                                        >
                                            contact@msg91.com
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="c-fs-1 c-fw-b  justify-content-center align-items-center d-flex">
                                            <MdCall className="p-auto" />
                                        </span>
                                        <a
                                            href="tel:+6531595004"
                                            className="c-fs-2 ms-3 c-text-link text-center bg-white"
                                        >
                                            +65 31595004
                                        </a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="d-flex align-items-center">
                                        <span className="c-fs-1   justify-content-center align-items-center d-flex">
                                            <MdOutlineEmail className="p-auto c-fw-sb  " />
                                        </span>
                                        <a
                                            href="mailto:sales@msg91.com"
                                            className="c-fs-2 ms-3 c-text-link text-center bg-white"
                                        >
                                            sales@msg91.com
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="c-fs-1 c-fw-b  justify-content-center align-items-center d-flex">
                                            <MdCall className="p-auto" />
                                        </span>
                                        <a
                                            href="tel:+917049088848"
                                            className="c-fs-2 ms-3 c-text-link text-center bg-white"
                                        >
                                            +91 70490 88848
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="c-fs-1 c-fw-b  justify-content-center align-items-center d-flex">
                                            <MdCall className="p-auto" />
                                        </span>
                                        <a
                                            href="tel:+918889378605"
                                            className="c-fs-2 ms-3 c-text-link text-center bg-white"
                                        >
                                            +91 88893 78605
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#sales-modal">
                            Schedule a meeting
                        </button>
                    </div>

                    <div className="contact-card d-flex flex-column align-items-center justify-content-between gap-3 gap-md-5 px-3 py-2 py-md-4 col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-10">
                        <h2>Support</h2>
                        <div className="d-flex flex-column align-items-start gap-4">
                            <div className="d-flex  align-items-center">
                                <span className="c-fs-1  justify-content-center align-items-center d-flex">
                                    <MdOutlineEmail className="p-auto c-fw-sb  " />
                                </span>
                                <a
                                    href="mailto:support@msg91.com"
                                    className="c-fs-2 ms-3 c-text-link text-center bg-white "
                                >
                                    support@msg91.com
                                </a>
                            </div>

                            <div className="d-flex align-items-center">
                                <span className="c-fs-1 c-fw-b  justify-content-center align-items-center d-flex">
                                    <MdWhatsapp className="p-auto  " />
                                </span>
                                <a
                                    href="https://wa.me/918818888733"
                                    className="c-fs-2 c-text-link ms-3 text-center bg-white"
                                >
                                    +91 88188 88733
                                </a>
                            </div>

                            <div className="d-flex  align-items-center">
                                <span className="c-fs-1 c-fw-b  justify-content-center align-items-center d-flex">
                                    <MdCall className="p-auto  " />
                                </span>
                                <a href="tel:918818888733" className="c-fs-2  ms-3 c-text-link text-center bg-white">
                                    +91 88188 88733
                                </a>
                            </div>
                        </div>

                        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#support-modal">
                            Schedule a meeting
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default contactus;
