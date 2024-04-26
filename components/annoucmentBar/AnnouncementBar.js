import { useState, useEffect } from "react";
import Announcement from "./Announcement";

const announcements = [
    {
        imageSrc: "/img/webinar_ico.svg",
        title: "Join our webinar on 17th May",
        description: "Mastering E-commerce with WhatsApp Campaigns that Convert and get benefits worth INR 25,000",
        linkText: "Register Now",
        linkHref: "https://forms.gle/2Er1hw4GYkupmebb8",
    },
    {
        imageSrc: "/img/webinar_ico_hello.svg",
        title: "Chatbot webinar on 30th April (English)",
        description:
            "Unlock the Power of AI Chatbots (Instagram & WhatsApp) to Supercharge Your Business Growth and Skyrocket Conversions!",
        linkText: "Register Now",
        linkHref: "https://meet.zoho.in/6wEakaPajI",
    },
];

export default function AnnouncementBar() {
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleIndex((prev) => (prev + 1) % announcements.length);
        }, 10000); // Change every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []); // Only run this effect once when the component is mounted

    return (
        <div className="bg-primary">
            <div className="announcement-bar container">
                {announcements.map((announcement, index) => (
                    <Announcement
                        key={index}
                        imageSrc={announcement.imageSrc}
                        title={announcement.title}
                        description={announcement.description}
                        linkText={announcement.linkText}
                        linkHref={announcement.linkHref}
                        isVisible={index === visibleIndex} // Only show the current announcement
                    />
                ))}
            </div>
        </div>
    );
}
