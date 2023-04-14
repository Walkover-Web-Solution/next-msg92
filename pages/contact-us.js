import React from "react";
import { MdOutlineEmail, MdAddCall, MdWhatsapp } from "react-icons/md";
import { InlineWidget } from "react-calendly";
const contactus = () => {
    return (
        <>
            <div className="container text-center px-4 col-xs-12 col-sm-10 col-md-10 mx-auto section py-3">
                <h1 className="sub-heading pb-2">Contact Us</h1>
                <div className="d-flex justify-content-around">
                    <div className="contact-card shadow col-4">
                        <h2>Sales</h2>
                        <div className="w-100 d-flex flex-column align-items-center">
                            <span className="c-fs-1   rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdOutlineEmail className="p-auto c-fw-sb text-primary" />
                            </span>
                            <a href="mailto:sales@msg91.com"  className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                sales@msg91.com
                            </a>
                        </div>
                        <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                            <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdAddCall className="p-auto text-primary" />
                            </span>
                            <a href="tel:91987654321" className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                +91-987654321
                            </a>
                        </div>
                        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#sales-modal">Schedule a meeting</button>
                    </div>

                    <div className="contact-card shadow col-4">
                        <h2>Support</h2>
                        <div className="w-100 d-flex flex-column align-items-center">
                            <span className="c-fs-1   rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdOutlineEmail className="p-auto c-fw-sb text-primary" />
                            </span>
                            <a href="mailto:support@msg91.com" className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                support@msg91.com
                            </a>
                        </div>
                        
                        <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                            <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdWhatsapp className="p-auto text-primary" />
                            </span>
                            <a href="https://wa.me/918818888733" className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                +91 88188 88733                
                            </a>
                        </div>

                        <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                            <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdAddCall className="p-auto text-primary" />
                            </span>
                            <a href="tel:918818888733" className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                +91 88188 88733
                            </a>
                        </div>
                        
                        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#support-modal">Schedule a meeting</button>
                    </div>

                </div>
                
            </div>
            
            {/* <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-body">
                    <InlineWidget url="https://calendly.com/sales-msg91/pre-sales" />
                    <InlineWidget url="https://calendly.com/support--msg91" />
                </div>
                </div>
            </div>
            </div> */}

            <div
                className="modal fade"
                id="sales-modal"
                tabIndex={-1}
                aria-labelledby="Schedule a meeting"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">                    
                        <div className="modal-body">
                            <InlineWidget url="https://calendly.com/sales-msg91/pre-sales" />
                        </div>                    
                    </div>
                </div>
            </div>
            
            <div
                className="modal fade"
                id="support-modal"
                tabIndex={-1}
                aria-labelledby="Schedule a meeting"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">                    
                        <div className="modal-body">
                            <InlineWidget url="https://calendly.com/support--msg91" />
                        </div>                    
                    </div>
                </div>
            </div>
        </>
    );
};
export default contactus;
