import Image from 'next/image';
import styles from './subProductComp.module.scss';
import {
    MdBolt,
    MdAccessTime,
    MdHelpOutline,
    MdSupportAgent,
    MdOutlineHealthAndSafety,
    MdOutlineStorefront,
    MdAccountBalance,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
} from 'react-icons/md';
import React, { useState } from 'react';
import PreFooter from '@/components/preFooter';

export default function SubProductComp({path}) {
    console.log('path', path);
    const [learnMore, setLearnMore] = useState();
    const icons = {
        MdBolt: MdBolt,
        MdAccessTime: MdAccessTime,
        MdHelpOutline: MdHelpOutline,
        MdSupportAgent: MdSupportAgent,
        MdOutlineHealthAndSafety: MdOutlineHealthAndSafety,
        MdOutlineStorefront: MdOutlineStorefront,
        MdAccountBalance: MdAccountBalance,
    };
    function renderIcon(iconName, class_name) {
        const IconComponent = icons[iconName];
        return <IconComponent className={styles[class_name]} />;
    }

    const features = [
        {
            name: 'Boost Engagement, Maximize Sales',
            icon: 'MdBolt',
            description:
                'WhatsApp chatbot platforms drive engagement by facilitating interactive conversations, guiding potential customers through the sales funnel to boost sales and improve user experience.',
        },
        {
            name: 'Establish a 24/7 Communication Channel',
            icon: 'MdAccessTime',
            description:
                'A WhatsApp Chatbot ensures 24/7 accessibility, addressing customer queries at any hour, reinforcing your commitment to their needs and maintaining an always-responsive chatbot flow.',
        },
        {
            name: 'Streamline Responses to FAQs ',
            icon: 'MdHelpOutline',
            description:
                `WhatsApp Chatbots swiftly address frequently asked questions by leveraging the <a href="${path}/whatsapp">WhatsApp Business API</a> to save businesses time and resources.`,
        },
        {
            name: 'Elevate Customer Support',
            icon: 'MdSupportAgent',
            description:
                'WhatsApp Chatbots deliver instant responses, ensuring prompt acknowledgment and boosting brand loyalty.',
        },
    ];
    const useCases = [
        {
            name: 'Healthcare',
            icon: 'MdOutlineHealthAndSafety',
            img: 'whatsapp-healthcare',
            description:
                'Automate appointment bookings and send consultation reminders hassle-free with MSG91s WhatsApp Chatbot for Business. Say goodbye to waiting on hold and callbacks. This tool streamlines scheduling for clinics and hospitals, minimizing no-shows and promoting punctuality.',
            features: [
                'Automated appointment scheduling',
                'Timely reminders to reduce no-show rates',
                'Enhanced punctuality in consultations',
                'Simplified process for patients and providers',
            ],

            learnmore:
                "<h6>Automating Appointment Bookings & Sending Consultation Reminders:</h6><br/><p>Traditional hassles of waiting on hold or dealing with callbacks are a thing of the past. MSG91's WhatsApp Chatbot for Business enables clinics and hospitals to automate appointment scheduling, streamlining the process for both patients and healthcare providers. Additionally, the chatbot sends timely reminders, minimizing no-show rates and promoting punctuality.</p><br/><br/> <h6>Addressing Common Medical Queries:</h6><br/><p>Patients often have urgent inquiries about their health, medications, or hospital procedures. Leveraging the WhatsApp Business API, MSG91's chatbot delivers automated responses to frequently asked questions, providing patients with quick and reliable information, thereby enhancing customer support within the healthcare sector.</p><br/><br/><h6>Disseminating Health Tips and Medication Reminders:</h6><br/><p>TProactive healthcare is optimal. MSG91's WhatsApp Chatbot can be configured to share relevant health tips, including dietary recommendations and exercise routines. For those on medication, the chatbot sends timely reminders, promoting adherence to prescribed regimens.</p><br/><br/><h6>Fostering Trust with Patients:</h6><br/><p>In the digital healthcare era, cultivating and retaining patient trust is paramount. By developing a chatbot flow that is empathetic, responsive, and consistent, healthcare providers can establish an environment where patients feel valued and heard. This seamless interaction is facilitated through MSG91's platform.</p><br/><br/><h6>Ensuring Patient Data Privacy:</h6><br/><p>In healthcare, safeguarding data privacy is non-negotiable. MSG91 prioritizes the security features of its WhatsApp Chatbot platforms, ensuring that patient information is securely stored, handled ethically, and complies with all relevant regulations.</p><br/><br/><p>In conclusion, the convergence of healthcare and technology is inevitable. Leveraging the capabilities of WhatsApp Chatbots, healthcare providers can not only enhance patient interactions but also streamline operations, leading to improved care and better patient outcomes. With MSG91 steering the journey, the experience is smoother, more intuitive, and ultimately more rewarding.</p>",
        },
        {
            name: 'E-Commerce',
            icon: 'MdOutlineStorefront',
            img: 'whatsapp-e-commerce',
            description:
                'The e-commerce landscape has undergone a significant transformation due to digital advancements, and at the core of this evolution lies the WhatsApp Chatbot.',
            features: [
                'Product queries and suggestions',
                'Real-time order tracking via WhatsApp',
                'Handling of returns, exchange and feedback',
                'Engagement via updates and promotions',
            ],
            learnmore:
                "<p>The e-commerce landscape has undergone a significant transformation due to digital advancements, and at the core of this evolution lies the WhatsApp Chatbot.</p><br/><br/><h6>Product Queries and Suggestions:</h6><br/><p>Navigating through a plethora of online products can be overwhelming for shoppers. MSG91's WhatsApp Chatbot for Business assists customers by furnishing comprehensive product details, reviews, and personalized recommendations based on browsing history and preferences, ensuring a tailored shopping experience.</p><br/><br/> <h6>Real-Time Order Tracking via WhatsApp:</h6><br/><p>The excitement and occasional anxiety associated with awaiting a package are addressed through the WhatsApp Business API. Our chatbot provides real-time order tracking, keeping customers informed about the status and location of their purchases, thereby enhancing customer support within the e-commerce realm.</p><br/><br/><h6>Instant Handling of Returns and Customer Feedback:</h6><br/><p>Returns, exchanges, and feedback play a crucial role in e-commerce. MSG91's chatbot streamlines these processes by delivering immediate solutions and gathering feedback, allowing businesses to continuously improve while prioritizing customer satisfaction.</p><br/><br/><h6>Automated Responses for Common Queries:</h6><br/><p>Customers often seek information on payment methods, shipping policies, and other details. Our chatbot, powered by the WhatsApp Business API, efficiently provides automated responses to frequently asked questions, simplifying the shopping experience.</p><br/><br/><h6>Customer Engagement through Promotions and Updates:</h6><br/><p>Staying abreast of developments in the dynamic e-commerce environment is essential. By crafting a chatbot flow that engages users, businesses can keep customers informed about sales, new arrivals, and exclusive offers, directly enhancing opportunities for engagement and sales.</p><br/><br/><p>In the intricate tapestry of e-commerce, the WhatsApp Chatbot emerges as a connecting thread that brings businesses and customers into a closer relationship than ever before. At MSG91, we are dedicated to ensuring that this connection is not only robust but also fruitful, driving sales while ensuring unparalleled customer satisfaction.</p>",
        },
        {
            name: 'Banking & Finance',
            icon: 'MdAccountBalance',
            img: 'whatsapp-banking-finance',
            description:
                'WhatsApp Chatbot for Business revolutionizes banking with features like instant balance checks, quick customer support, tailored financial tips, robust security, and simplified onboarding, ensuring a smooth, secure, and superior customer experience.',
            features: [
                'Get  balance updates & transaction alerts',
                'Daily bills and deductions remainders',
                'Check account balance and other details',
                'Engagement via updates and promotions',
            ],
            learnmore:
                "<h6>Checking Account Balances and Receiving Transaction Alerts:</h6><br/><p>The era of logging into banking portals or making helpline calls is a thing of the past. With MSG91's WhatsApp Chatbot for Business, customers can effortlessly inquire about account balances or receive instant transaction alerts, ensuring constant awareness and control over their financial information.</p><br/><br/> <h6>Providing Swift Customer Support for Financial Inquiries:</h6><br/><p>Whether it's grasping interest rates, navigating loan processes, or understanding account features, customers frequently have urgent queries. Utilizing the capabilities of the WhatsApp Business API, our chatbot delivers prompt automated responses to frequently asked questions, fostering clarity and instilling confidence in financial decision-making.</p><br/><br/><h6>Sharing Financial Tips and Service Updates:</h6><br/><p>The financial landscape is expansive and ever-evolving. MSG91's WhatsApp Chatbots ensure customers stay well-informed by sharing tailored financial tips, news, and updates on banking services, aligning with each individual's banking profile.</p><br/><br/><h6>Upholding Security and Trust:</h6><br/><p>In the delicate domain of banking and finance, security is of utmost importance. At MSG91, we prioritize the robust security features of our Chatbot platforms for WhatsApp, ensuring encrypted communication, secure data handling, and compliance with banking regulations.</p><br/><br/><h6>Simplified Onboarding and Access to Services:</h6><br/><p>Onboarding new customers or accessing various banking services can be intricate. Through a thoughtfully designed chatbot flow that streamlines these processes, we provide a seamless, hassle-free experience for all banking activities.</p><br/><br/><p>As the financial sector steps into a new era, the WhatsApp Chatbot emerges as an indispensable ally. With MSG91 leading the way, we are enthusiastic about assisting banks and financial institutions in reshaping the narrative, offering customers an experience that is smooth, secure, and superior.</p>",
        },
    ];
    return (
        <>
            <div className="container d-flex flex-column flex-md-row align-items-center  justify-content-between my-md-5">
                <div className="d-flex flex-column gap-3 col-md-6 my-md-5 my-3">
                    <div className="d-flex align-items-center">
                        <Image src="/img/icon/whatsapp.svg" width="40" height="40" alt="whatsApp logo" />
                        <span className="c-fs-2 c-fw-sb uppercase">WhatsApp Chatbot</span>
                    </div>
                    <p className="c-fs-3 c-fw-t ls-3">DOMINATE POPULAR PLATFORMS</p>
                    <h1 className="heading c-fw-xb">Transform Automation and Sales on WhatsApp</h1>
                    <p className="c-fs-2">
                        Enhance sales, streamline responses, and effortlessly reconnect with your contacts.
                    </p>
                    <button className="btn btn-dark btn-lg rounded-1 btn-ft">Get started</button>
                </div>
                <Image
                    src="/img/pageimg/whatapp-chatbot.png"
                    width={1080}
                    height={1080}
                    className="col-md-6 col-12 h-auto"
                    alt="whatsApp Hero Image"
                />
            </div>
            <div className={`${styles.feature_cont} p-lg-5 p-md-3  px-2 py-4`}>
                <div className="container d-flex flex-column gap-5">
                    <h2>Why businesses should use WhatsApp Chatbot</h2>
                    <div className={`d-grid gap-5 ${styles.features}`}>
                        {features.map((feature) => (
                            <div key={feature.name} className={`d-grid gap-lg-4 gap-md-3 gap-2 ${styles.feature}`}>
                                <div
                                    className={`${styles.feature_icon_cont} d-flex align-items-center justify-content-center border border-2 rounded bg-white`}
                                >
                                    {renderIcon(feature.icon, 'feature_icon')}
                                </div>
                                <h3 className="c-fs-2">{feature.name}</h3>
                                <p dangerouslySetInnerHTML={{ __html: feature.description }}></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="my-5">
                <div className="container d-flex flex-column gap-5 py-5">
                    <h2>WhatsApp Chatbot Applications Across Industries</h2>
                    <div className="d-flex flex-column gap-5">
                        {useCases.map((useCase, i) => {
                            return (
                                <div
                                    className={`d-flex ${
                                        i % 2 === 0
                                            ? 'flex-lg-row flex-column-reverse'
                                            : 'flex-lg-row-reverse flex-column-reverse'
                                    }  gap-5 py-3 justify-content-center align-items-center`}
                                >
                                    <div className={`${styles.usecase_bg} p-md-3 p-xl-5 p-2 rounded-1 d-grid gap-3`}>
                                        {renderIcon(useCase.icon, 'useCase_feature_icon')}
                                        <h3>{useCase?.name}</h3>
                                        <p>{useCase?.description}</p>
                                        <div className={`${styles.usecase_features} gap-2 gap-lg-3 gap-xl-4`}>
                                            {useCase?.features.map((feature, indexft) => {
                                                return (
                                                    <div
                                                        className={`${styles.usecase_feature} p-3 bg-white border border-2 rounded `}
                                                    >
                                                        {feature}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div
                                            className={`${learnMore == i ? 'd-block' : 'd-none'} my-3`}
                                            dangerouslySetInnerHTML={{ __html: useCase.learnmore }}
                                        ></div>
                                        {learnMore == i ? (
                                            <button
                                                onClick={() => {
                                                    setLearnMore();
                                                }}
                                                className="btn-ft btn d-flex align-items-center gap-1"
                                            >
                                                Show Less <MdKeyboardArrowUp fontSize={20} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setLearnMore(i);
                                                }}
                                                className="btn-ft btn d-flex align-items-center gap-1"
                                            >
                                                Learn More <MdKeyboardArrowDown fontSize={20} />
                                            </button>
                                        )}
                                    </div>
                                    <Image
                                        src={`/img/feature/${useCase?.img}.png`}
                                        width={450}
                                        height={500}
                                        className={`${styles.useCase_img} col-12 col-lg-6 p-1 `}
                                        alt="whatsApp Hero Image"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <PreFooter />
        </>
    );
}
