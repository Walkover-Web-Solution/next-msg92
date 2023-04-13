import React from "react";
import { MdOutlineEmail, MdAddCall } from "react-icons/md";
import { InlineWidget } from "react-calendly";
const contactus = () => {
    return (
        <>
            <div className="container text-center px-4 col-xs-12 col-sm-10 col-md-10 mx-auto section py-3">
                <ul
                    className="d-flex justify-content-center nav nav-pills"
                    id="pills-tab"
                    role="tablist"
                >
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                        >
                            Sales
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                        >
                            Support
                        </button>
                    </li>
                </ul>
            </div>
            <div className="d-none w-100 h-auto py-4 flex-column  gap-4 gap-lg-0 flex-lg-row">
                <div className="col-12 col-lg-4 d-flex flex-column flex-lg-column flex-sm-row align-items-center justify-content-center ">
                    <div className="w-100 d-flex flex-column align-items-center">
                        <span className="c-fs-1   rounded-circle social-circle justify-content-center align-items-center d-flex">
                            <MdOutlineEmail className="p-auto c-fw-sb text-primary" />
                        </span>
                        <p className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                            sales@msg91.com
                        </p>
                    </div>
                    <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                        <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                            <MdAddCall className="p-auto text-primary" />
                        </span>
                        <p className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                            +91-987654321
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-100 h-auto">

                <div className="tab-content " id="pills-tabContent">
                    <div
                        className="tab-pane fade show active "
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                    >
                        <div className=" d-flex w-100 h-auto flex-column  gap-4 gap-lg-0 flex-lg-row pb-5">
                            <div className="col-12 col-lg-4 d-flex flex-column flex-lg-column flex-sm-row align-items-center justify-content-center ">
                                <div className="w-100 d-flex flex-column align-items-center ">
                                    <h1 className="sub-heading pb-2">Contact Us</h1>
                                    <p className="c-fs-1 m-auto col-md-112 pb-5">We'd love to hear from you!</p>
                                </div>
                                <div className="w-100 d-flex flex-column align-items-center">
                                    <span className="c-fs-1   rounded-circle social-circle justify-content-center align-items-center d-flex">
                                        <MdOutlineEmail className="p-auto c-fw-sb text-primary" />
                                    </span>
                                    <p className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                        sales@msg91.com
                                    </p>
                                </div>
                                <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                                    <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                                        <MdAddCall className="p-auto text-primary" />
                                    </span>
                                    <p className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                        +91-987654321
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8">
                                <InlineWidget url="https://calendly.com/sales-msg91/pre-sales" />
                            </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade "
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                    >
                        <div className=" d-flex w-100 h-auto py-4 flex-column  gap-4 gap-lg-0 flex-lg-row">
                            <div className="col-12 col-lg-4 d-flex flex-column flex-lg-column flex-sm-row align-items-center justify-content-center ">
                                <div className="w-100 d-flex flex-column align-items-center">
                                    <span className="c-fs-1   rounded-circle social-circle justify-content-center align-items-center d-flex">
                                        <MdOutlineEmail className="p-auto c-fw-sb text-primary" />
                                    </span>
                                    <p className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                        support@msg91.com
                                    </p>
                                </div>
                                <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                                    <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex">
                                        <MdAddCall className="p-auto text-primary" />
                                    </span>
                                    <p className="c-fs-2 px-3 py-3 mt-n2 rounded w-75 text-center bg-white">
                                        +91-987654321
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8 pb-5">
                                <InlineWidget url="https://calendly.com/support--msg91" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};
export default contactus;
