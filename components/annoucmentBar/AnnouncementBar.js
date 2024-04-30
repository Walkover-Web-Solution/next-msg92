import { useState, useEffect } from "react";
import styles from "./AnnouncementBar.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function AnnouncementBar() {
    const [showSecondAnnouncement, setShowSecondAnnouncement] = useState(false);

    const handleToggle = () => {
        setShowSecondAnnouncement((prev) => !prev);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setShowSecondAnnouncement((prev) => !prev);
        }, 10000); // Adjusted interval for clarity

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`announcement-bar-cont ${styles.container}`}>
            <div className={`container d-flex align-items-center gap-3`}>
                {/* {showSecondAnnouncement ? (
                    <div className={styles.announcement}>
                        <Image
                            src="/img/webinar_ico_hello.svg"
                            width={125}
                            height={58}
                            alt="Second Announcement"
                            className="d-md-block d-none"
                        />
                        <div className="d-flex flex-column">
                            <span>
                                <span className="c-fs-3 c-fw-b text-white">Chatbot webinar on 30th April </span>
                                <span style={{ fontSize: "12px" }} className="  text-white">
                                    (  English)
                                </span>
                            </span>

                            <span className="text-white-800 c-fs-5">
                                <span>Unlock the Power of AI Chatbots </span>

                                <span>
                                    ( <img src="/img/icon/color_instagram.svg" className="icon-h-ann" /> Instagram &{" "}
                                    <img src="/img/icon/color_whatsapp.svg" className="icon-h-ann" /> WhatsApp){" "}
                                </span>
                                <span>to Supercharge Your Business Growth and Skyrocket Conversions! </span>
                                <Link
                                    className="text-white c-fw-b text-decoration-underline"
                                    href="https://meet.zoho.in/6wEakaPajI"
                                    target="_blank"
                                >
                                    Register Now
                                </Link>
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.announcement}>
                        <Image
                            src="/img/webinar_ico.svg"
                            width={125}
                            height={58}
                            alt="First Announcement"
                            className="d-md-block d-none"
                        />
                        <div className="d-flex flex-column">
                            <span className="c-fs-3 c-fw-b text-white">Join our webinar on 17th May</span>
                            <span className="text-white-800 c-fs-5">
                                Mastering E-commerce with WhatsApp Campaigns that Convert.
                                <Link
                                    className="text-white c-fw-b text-decoration-underline"
                                    href="https://forms.gle/2Er1hw4GYkupmebb8"
                                    target="_blank"
                                >
                                    Register Now
                                </Link>
                            </span>
                        </div>
                    </div>
                )} */}
                {/* <button onClick={handleToggle} className="btn btn-outline-light btn-sm rounded-1 ms-auto">
                    Next
                </button> */}
                <div className={styles.announcement}>
                        <Image
                            src="/img/webinar_ico.svg"
                            width={125}
                            height={58}
                            alt="First Announcement"
                            className="d-md-block d-none"
                        />
                        <div className="d-flex flex-column">
                            <span className="c-fs-3 c-fw-b text-white">Join our webinar on 17th May</span>
                            <span className="text-white-800 c-fs-5">
                                Mastering E-commerce with WhatsApp Campaigns that Convert.
                                <Link
                                    className="text-white c-fw-b text-decoration-underline"
                                    href="https://forms.gle/2Er1hw4GYkupmebb8"
                                    target="_blank"
                                >
                                    Register Now
                                </Link>
                            </span>
                        </div>
                    </div>
            </div>
        </div>        
    );
}
