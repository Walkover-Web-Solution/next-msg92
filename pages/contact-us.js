import React from "react";
import { MdOutlineEmail, MdAddCall, MdWhatsapp } from "react-icons/md";
import { InlineWidget } from "react-calendly";
const contactus = () => {
    return (
        <>
            <div className="container text-center px-4 col-xs-12 col-sm-10 col-md-10 mx-auto  py-5">
                <h1 className="sub-heading pb-5">Contact Us</h1>
                <div className="justify-content-around row gap-5">

                    <div className="contact-card d-flex flex-column align-items-center justify-content-between shadow gap-5 px-3 py-5 border col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-10">
                        <h2>Sales</h2>
                        <div className="d-flex flex-column align-items-start gap-4">
                        <div className="d-flex  align-items-center">
                            <span className="c-fs-1   rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdOutlineEmail className="p-auto c-fw-sb  " />
                            </span>
                            <a href="mailto:sales@msg91.com"  className="c-fs-2 ms-3 text-dark text-center bg-white">
                                sales@msg91.com
                            </a>
                        </div>
                        <div className="d-flex  align-items-center">
                            <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdAddCall className="p-auto  " />
                            </span>
                            <a href="tel:91987654321" className="c-fs-2 ms-3 text-dark text-center bg-white">
                                +91-987654321
                            </a>
                        </div>
                        </div>
                        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#sales-modal">Schedule a meeting</button>
                    </div>
                    
                    <div className="contact-card d-flex flex-column align-items-center justify-content-between shadow gap-5 px-3 py-5 border col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-10">
                        <h2>Support</h2>
                        <div className="d-flex flex-column align-items-start gap-4">
                        <div className="d-flex  align-items-center">
                            <span className="c-fs-1   rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdOutlineEmail className="p-auto c-fw-sb  " />
                            </span>
                            <a href="mailto:support@msg91.com" className="c-fs-2 ms-3 text-dark text-center bg-white">
                                support@msg91.com
                            </a>
                        </div>
                        
                        <div className="d-flex  align-items-center">
                            <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdWhatsapp className="p-auto  " />
                            </span>
                            <a href="https://wa.me/918818888733" className="c-fs-2 text-dark ms-3 text-center bg-white">
                                +91 88188 88733                
                            </a>
                        </div>

                        <div className="d-flex  align-items-center">
                            <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                                <MdAddCall className="p-auto  " />
                            </span>
                            <a href="tel:918818888733" className="c-fs-2  ms-3 text-dark text-center bg-white">
                                +91 88188 88733
                            </a>
                        </div>
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
