import React from "react";
import { GrAndroid, GrApple } from "react-icons/gr"
import {
    MdOutlinePeopleAlt,
    MdOutlineChatBubbleOutline,
    MdThumbUpOffAlt,
} from "react-icons/md";

const developers = () => {
    return (
        <>
            <div className="container">
                <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
                    <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row py-3">
                        <h1 className="heading">Hello Developers</h1>
                    </div>
                    <h2 className="c-fs-2 px-3 w-md-75 w-100 mx-auto pb-2">
                        Integrate SMS, Email, Voice API with Java, PHP, HTTP Scripts. Build
                        apps, innovation and ideas for rapid growing business, or just
                        integrate for your team development.
                    </h2>
                    <a
                        target="_blank"
                        href="https://docs.msg91.com/reference/send-sms"
                    >
                        <button
                            className="btn btn-dark btn-md mt-3 c-fs-4"
                            type="button"
                        >
                            Explore Documentation
                        </button>
                    </a>
                </div>
            </div>
            <section className="col-12 py-5">
                <div className="container">
                    <h2 className="small-heading">
                        One API to revolutionalise the way developers integrate
                    </h2>
                    <p className="c-fs-3 mt-2">
                        A single, unified API to simplify communication across multiple
                        architectures. Build integrations faster and deliver a unified
                        experience across channels for faster performance, more productivity
                        and greater innovation.
                    </p>
                    <p className="c-fs-3 c-fw-b mt-3">
                        {" "}
                        Just integrate and forget the rest of the challenges.
                    </p>
                </div>
            </section>
            <div className="container my-5">
                <h2>We enable communication in your awesome products</h2>
                <div className="d-flex w-100">
                    <div className="col-12 col-lg-10  flex-column flex-md-row d-flex align-items-center my-4 justify-content-center gap-3 gap-lg-5 mx-auto">
                        <div className="developers-card">
                            <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                                <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex py-2">
                                    <MdThumbUpOffAlt className="p-auto text-primary" />
                                </span>
                                <p className="w-100 c-fs-2 px-2 py-5 mt-n3 rounded text-center">
                                    Engineered for reliability
                                </p>
                            </div>
                        </div>
                        <div className="developers-card">
                            <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                                <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex py-2">
                                    <MdOutlineChatBubbleOutline className="p-auto text-primary" />
                                </span>
                                <p className="w-100 c-fs-2 px-2 py-5 mt-n3 rounded text-center">
                                    Communication addons
                                </p>
                            </div>
                        </div>
                        <div className="developers-card">
                            <div className="w-100 d-flex flex-column align-items-center mt-4 mt-sm-0 mt-lg-4">
                                <span className="c-fs-1 c-fw-b  rounded-circle social-circle justify-content-center align-items-center d-flex py-2">
                                    <MdOutlinePeopleAlt className="p-auto text-primary" />
                                </span>
                                <p className="w-100 c-fs-2 px-2 py-5 mt-n3 rounded text-center">
                                    Problem solvers at service
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="col-12 py-5">
                <div className="col-11 col-md-10 col-lg-9 mx-auto">
                    <h2 className="small-heading">
                        Why MSG91 API is developer friendly for real?
                    </h2>
                    <div className="mt-5">
                        <p className="c-fs-3 c-fw-b">Powerful sending infrastructure</p>
                        <p className="c-fs-3">
                            Easy API integration and a simple, HTTP or JSON/XML API enables
                            your App with Text, Voice and Email functionality. Scale quickly,
                            whether it’s a matter of communicating to 10 users or 10 million.
                            Build exactly what you need with flexible APIs.
                        </p>
                    </div>
                    <div className="mt-5">
                        <p className="c-fs-3 c-fw-b">Tracking and analytics</p>
                        <p className="c-fs-3">
                            Searchable logs means you always know what is happening to your
                            messages, while tags make it easy to report on your data and all
                            that via our efficient panel and webhooks.
                        </p>
                    </div>
                    <div className="mt-5">
                        <p className="c-fs-3 c-fw-b">
                            Manage your contact and SMS campaigns wisely
                        </p>
                        <p className="c-fs-3">
                            Track and optimise your SMS campaign and know how your customer is
                            interacting with your messages.
                        </p>
                    </div>
                </div>
            </section>
            <div className="container d-flex flex-md-row  flex-column  justify-content-betweeen d-flex my-5 ">
                <div className="col-12 col-md-6 pe-0 pe-md-4 mb-4 mb-md-0 d-flex flex-column align-content-center justify-content-center">
                    <h2 className="small-heading">
                        Start your custom code adventure now
                    </h2>
                    <p className="c-fs-3">
                        Easily integrate MSG91 APIs for Sending SMS, OTP verification or
                        communicate across channels. Access sample codes in Ruby, Python,
                        PHP, Java and more.
                    </p>
                </div>
                <div className="col-md-6 col-12">
                    <img
                        className="developers-code-img w-100"
                        src="/img/developers-code-img.png"
                        alt="#"
                    />
                </div>
            </div>
            <div className="container my-5 text-center d-flex flex-column align-items-center gap-4">
                <h2 className="small-heading mt-5">5 Minute Setup</h2>
                <p className="c-fs-3 col-12 col-md-9">Build real-time communications into your apps in a few minutes and a few lines of code.The SDKs seamlessly connect to MSG91 global infrastructure.</p>
                <div className="col-4 justify-content-center gap-5 d-flex">
                    <div className="dev-page-ico ">
                        <div className="mx-auto d-flex justify-content-center align-items-center">
                            <a href="https://play.google.com/store/apps/details?id=com.hellornapp"> <GrAndroid className="c-fs-1" /> </a>
                        </div>
                        <p className="c-fs-2">Android</p>
                    </div>
                    <div className="dev-page-ico">
                        <div className="mx-auto d-flex justify-content-center align-items-center">
                            <a href="https://apps.apple.com/in/app/msg91/id981827687"> <GrApple className="c-fs-1" /> </a>
                        </div>
                        <p className="c-fs-2">iOS</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default developers;
