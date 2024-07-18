import React from "react";
import { MdKeyboardArrowRight, MdDone } from "react-icons/md";
import axios from "axios";
import GetStartedSection from "@/components/getStartedSection/getStartedSection";
import startups from "@/data/startups.json";

const msg91ForStartups = ({ staticData }) => {
    
    return (
        <>
            <div className="container d-flex justify-content-center flex-column text-center my-5 gap-3 ">
                <div>
                    <h1 className="heading">Expand your vision with us</h1>
                </div>

                <div>
                    <p className="small-heading p-2">
                        Get a complimentary communication API package tailored to meet your needs
                    </p>
                </div>

                <div>
                    <a
                        href="/startups-form/"
                        className="btn btn-dark small-heading px-3 py-2 mt-3 c-fw-sb px-md-4 py-md-3 ls-3"
                    >
                        Apply Now
                    </a>
                </div>
            </div>

            <section className="bg-dark p-5 text-white my-80 text-center small-heading">
                Today we help you, tomorrow we can change the world together
            </section>
            <div className=" my-80 text-center justify-content-center">
                <h2 className="c-head sub-heading mt-3">Grow your Startup with Robust Infrastructure</h2>
                <div className="container d-flex flex-column flex-md-row gap-5 gap-md-0 my-5 align-items-center justify-content-md-between justify-content-cenetr">
                    <div className="signup-cont startUpCart  p-3 d-flex flex-column align-items-center justify-content-center">
                        <span className="c-fs-2 c-fw-sb">Sign up</span>
                        <p className="c-fs-4 mt-2">Sign up with your official email ID and integrate MSG91 API</p>
                    </div>

                    <div className=" d-none p-2 p-lg-2 p-xl-4 c-fs-1 c-col-grey d-md-flex flex-column align-items-center justify-content-center">
                        <MdKeyboardArrowRight />
                    </div>
                    <div className="signup-cont startUpCart p-4 d-flex flex-column align-items-center justify-content-center">
                        <span className="c-fs-2 c-fw-sb">Apply</span>
                        <p className="c-fs-4 mt-2">If you fulfill criteria, you can apply for the startup program</p>
                    </div>

                    <div className="d-none p-2 p-lg-2 p-xl-4 c-fs-1 c-col-grey d-md-flex flex-column align-items-center justify-content-center">
                        <MdKeyboardArrowRight />
                    </div>
                    <div className="signup-cont startUpCart p-4 d-flex flex-column align-items-center justify-content-center">
                        <span className="c-fs-2 c-fw-sb">Enjoy</span>
                        <p className="c-fs-4 mt-2">You are good to go to avail the benifits</p>
                    </div>
                </div>
            </div>

            <div className="container px-3 px-md-auto">
                <h2 className="sub-heading c-head">Benefits Offered in the form of Startup Balance</h2>
                <p className="mt-3 c-fs-3">Startup Balance can be used in either of the following ways: </p>
                <div className="mt-2 ">
                    <span className="c-fs-1 c-fw-b text-green">
                        <MdDone />
                    </span>
                    <span className="c-fs-4 ms-2">25,000 SMS credits per month for a duration of 6 months.</span>
                </div>

                <div className="mt-2 ">
                    <span className="c-fs-1 c-fw-b text-green">
                        <MdDone />
                    </span>
                    <span className="c-fs-4 ms-2">
                        4,00,000 Emails as well as 4000 Email Verifications per month for a duration of 6 months.
                    </span>
                </div>

                <div className="mt-2 ">
                    <span className="c-fs-1 c-fw-b text-green">
                        <MdDone />
                    </span>
                    <span className="c-fs-4 ms-2">
                        Upto 10,000 WhatsApp Sessions(depending on the type of template) per month for a duration of 6
                        months.
                    </span>
                </div>

                <div className="mt-2 ">
                    <span className="c-fs-1 c-fw-b text-green">
                        <MdDone />
                    </span>
                    <span className="c-fs-4 ms-2">
                        25,000 OTP verification SMS credits per month for a duration of 6 months
                    </span>
                </div>

                <div className=" mt-2">
                    <span className="c-fs-1 c-fw-b text-green">
                        <MdDone />
                    </span>
                    <span className="c-fs-4 ms-2">
                        Access to Cloud Contact Center/Ticket Management Platform{" "}
                        <a href="https://msg91.com/hello">HELLO</a>, Data Management & WareHouse Application{" "}
                        <a href="https://msg91.com/segmento">SEGMENTO</a>, Flow Automation Application{" "}
                        <a href="https://msg91.com/campaign">CAMPAIGN</a>, MSG91’s FAQ software{" "}
                        <a href="https://msg91.com/knowledgebase">KnowledgeBase</a>.
                    </span>
                </div>

                <p className="mt-5 sub-heading  c-head">Eligibility and Terms:</p>
                <ul>
                    <li className="c-fs-4 ms-2 mt-2">
                        All credits should be utilised for transactional messaging only.
                    </li>
                    <li className="c-fs-4 ms-2 mt-2">Only applicable for New MSG91 users.</li>
                    <li className="c-fs-4 ms-2 mt-2">
                        Registered email should be a private domain email (gmail/yahoo/outlook etc will be
                        auto-rejected).
                    </li>
                    <li className="c-fs-4 ms-2 mt-2">Startup should be associated with one of our collaborators.</li>
                    <li className="c-fs-4 ms-2 mt-2">
                        Startup has to add MSG91's Startup Badge on their website with tagline - "Communication
                        Partner".
                    </li>
                </ul>
            </div>

            <section className="my-80 bg-integration-cont">
                <div className="container px-3 px-md-auto">
                    <h2 className="sub-heading  c-head">Our Collaborators</h2>
                    <p className="c-fs-4 col-12 col-md-10 mb-4 mt-2 ">
                        We’re proud to be associated with a growing set of Venture Capitalists, Accelerators, Incubators
                        and Crowdfunding platforms across to inspire, identify and develop end-to-end solutions for
                        businesses to discover and engage.
                    </p>
                    {startups && (
                        <div className="integrations-card-cont">
                            {startups.map((record, index) => {
                                if (record?.Website) {
                                    return (
                                            <a
                                                target="_blank"
                                                href={`${record?.Website}`}
                                                key={`startup-${index}`}
                                                className="integrations-card p-4 d-flex flex-column gap-2"
                                            >
                                                <div>
                                                    <img
                                                        src={record?.Logo}
                                                        alt={record?.CompanyName}
                                                        className="integrations-card-img"
                                                    />
                                                </div>

                                                <div className="mt-2">
                                                    <h5 className="text-dark">{record?.CompanyName}</h5>
                                                </div>
                                               
                                            </a>
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>
            </section>
            <div className="container px-3 px-md-auto my-80">
                <h2 className="c-head sub-heading">Checklist to become a part of the program</h2>
                <div className=" ">
                    <span className="c-fs-1 c-fw-b text-green">
                        <MdDone />
                    </span>
                    <span className="c-fs-4 ms-2">New MSG91 subscriber</span>
                </div>
                <div className=" ">
                    <span className="c-fs-1 c-fw-b text-green">
                        <MdDone />
                    </span>
                    <span className="c-fs-4 ms-2">Sign up from a private domain ID</span>
                </div>
                <div className=" ">
                    <span className="c-fs-1 c-fw-b text-green">
                        <MdDone />
                    </span>
                    <span className="c-fs-4 ms-2">Associated with our preferred collaborators</span>
                </div>
            </div>
            <GetStartedSection/>
        </>
    );
};
export default msg91ForStartups;
