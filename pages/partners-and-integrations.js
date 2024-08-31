import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineCheck, MdArrowForward } from "react-icons/md";
import partners from "@/data/partners.json";
const partnersAndIntegrations = ({data}) => {    
    return (
        <>
            <div className="container text-center  ">
                <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
                    <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
                        <h1 className="heading py-3">Integrations & Add-ons</h1>
                    </div>
                    <h2 className="small-heading px-3 w-md-75 w-100 mx-auto pb-1">
                        Add-ons that enable SMS notifications in your application with a single click.
                    </h2>
                    <a target="_blank" href="/signup">
                        <button
                            className="btn btn-dark small-heading px-3 py-2 mt-3 c-fw-sb px-md-4 py-md-3 ls-3"
                            type="button"
                        >
                            Get your API key
                        </button>
                    </a>
                </div>
            </div>
            <section className="bg-integration-cont">
                <div className="container ">
                    <div className=" px-2 px-lg-0 text-center text-sm-start">
                        <h2 className="sub-heading c-head">MSG91 Add-ons for your preferred Platform</h2>
                        <p className="c-fs-3 mt-2 mb-2">
                            Note – For paid plugins you will receive free credits, depending on the policy.
                        </p>
                    </div>
                    {partners && (
                        <div className="integrations-card-cont">
                            {partners.map((record, index) => {
                                if (record?.Link) {
                                    return (
                                            <a
                                                target="_blank"
                                                href={record.Link}
                                                key={`partner-${index}`}
                                                className="integrations-card p-4 d-flex flex-column gap-2"
                                            >
                                                <div>
                                                    <img
                                                        src={record?.Logo}
                                                        alt=""
                                                        className="integrations-card-img"
                                                    />
                                                </div>

                                                <div className="mt-2">
                                                    <h5 className="text-dark">{record.Partner}</h5>
                                                    <p className="text-grey mt-1">{record.Description}</p>
                                                </div>
                                                <span className="mt-auto text-grey ">
                                                    By: {record.DevelopedBy}
                                                </span>
                                            </a>
                                    );
                                }
                            })}
                        </div>
                    )}
                    <div className="container my-80 text-center">
                        <h2 className=" c-head sub-heading">Don’t see the Add-on or Plugin you are looking for?</h2>
                        <div className="col-12 px-2 px-lg-0 text-start mt-5 d-flex flex-column flex-lg-row justify-content-between">
                            <div className="col-12 col-lg-7">
                                <h3 className="c-fs-2 c-head">Why Build MSG91 Plugins?</h3>
                                <div className="mt-2 mt-lg-0">
                                    <span className="c-fs-2 text-green">
                                        <MdOutlineCheck />
                                    </span>
                                    <span className="c-fs-4">
                                        All the revenues on the plugin will be yours and it will be your plugin.
                                    </span>
                                </div>
                                <div className="mt-2 mt-lg-0">
                                    <span className="c-fs-2 text-green">
                                        <MdOutlineCheck />
                                    </span>
                                    <span className="c-fs-4">
                                        We will provide free OTP SMS (one time) to every plug-in users.
                                    </span>
                                </div>
                                <div className="mt-2 mt-lg-0">
                                    <span className="c-fs-2 text-green">
                                        <MdOutlineCheck />
                                    </span>
                                    <span className="c-fs-4">
                                        Mentoring for developing plug-in for your choice of platform.
                                    </span>
                                </div>
                                <div className="mt-2 mt-lg-0">
                                    <span className="c-fs-2 text-green">
                                        <MdOutlineCheck />
                                    </span>
                                    <span className="c-fs-4">
                                        We will promote your plugin using Google ad, blogs, mail to all our 40K clients.
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 mt-4 mt-lg-0 bg-white p-5 rounded text-center d-flex justify-content-center align-content-center">
                                <h3 className="small-heading">
                                    Up for creating one? Great!
                                    <p className="c-fs-4 mt-2">We would be glad to add you too.</p>
                                    <a href="/become-a-partner">
                                        <button className="c-fs-3 btn btn-dark btn-sm mt-3">Become a partner</button>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container d-flex flex-column my-80 ">
                <h2 className="sub-heading c-head text-center text-sm-start">Hear from our Partner</h2>
                <div className="w-100 d-flex flex-wrap  h-100 p-3 pe-3 pe-md-4 our-partner">
                    {/* <div className=" c-w-pp  pe-0 pe-md-5 our-partner h-100">
                        <img className="mt-3" src="/img/the-weeky-img.png" alt="weeky logo" />
                        <div className="d-flex flex-column">
                            <p className="c-fs-3 my-3">
                                Our long standing Partnership with MSG91 has been very successful. The quality of
                                services and support MSG91 provides is excellent. We have been treated with a positive
                                response every single time.
                            </p>
                            <p className="c-fs-3 c-fw-m">Prateek Agrawal</p>
                        </div>
                    </div> */}
                    <div className="c-w-pp mt-4 mt-md-0 h-100 pe-0 pe-md-5 our-partner pt-4 ">
                        <img className="mt-3 " src="/img/rixyncs-img.png" alt="rixyncs logo" />
                        <div className=" d-flex flex-column justify-content-between">
                            <p className="c-fs-3 my-3">
                                We are happy partnering with MSG91, the team has been prompt in addressing the queries
                                and taking our partnership ahead. Thank you MSG91
                            </p>
                            <p className="c-fs-3 c-fw-m t-auto">Bharat Kumar</p>
                        </div>
                    </div>
                </div>
                {/* <a
          className="mx-auto text-primary c-fs-4 c-fw-m mt-5"
          href="/partners-and-integrations"
        >
          Explore more partners <MdArrowForward />
        </a> */}
            </div>
        </>
    );
};
export async function getStaticProps() {
    let data = null;
    try {
        const response = await axios.get("https://api.airtable.com/v0/apprWVB91nVC9dqoS/tblkIzJ6ITtAwQXXx", {
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
            },
        });
        data = response.data;
        //console.log('getStaticProps', data);
    } catch (error) {
        console.error("There was an error fetching the data!", error);
    }
    
    return {
        props: {
            data
        },
    };
}

export default partnersAndIntegrations;
