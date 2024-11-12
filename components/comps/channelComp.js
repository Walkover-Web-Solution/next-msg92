// Child Component
import { React, useEffect, useState } from 'react';
import TrustedBy from '../trustedby';
import Seo from '../seoComp';

import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import snippetData from '@/pages/snippet.json';
import { InlineWidget } from 'react-calendly';
import GetStartedSection from '../getStartedSection/getStartedSection';
import FaqSection from '../faqSection/faqSection';

const ChannelComponent = ({ pageData, path, pricingPath }) => {
    var HTTPSnippet = require('httpsnippet');
    var i = 0;
    const [isCopied, setIsCopied] = useState(false);
    const handleSearch = () => {
        setDisplayValue(searchValue);
        fetchData(1);
    };

    useEffect(() => {
        if (pageData?.pagename !== 'Numbers') {
            Prism.highlightAll();
        }
    }, []);

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 5000);
        } catch (err) {
            console.error('Failed to Copy: ', err);
        }
    };

    const snippet = new HTTPSnippet(snippetData[pageData.pagename]);
    const node = snippet.convert('node');
    const cURL = snippet.convert('shell', 'curl');
    const php = snippet.convert('php');
    const python = snippet.convert('python');
    const ruby = snippet.convert('ruby');

    return (
        <div>
            <div className="container text-center overflow-hidden d-flex flex-column gap-4">
                <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
                    <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
                        <img src={pageData.icon} className="product-page-logo me-2" alt="product page logo" />
                        <h1 className={`heading page-title ${pageData.pagename}-heading`}>{pageData.pagetag}</h1>
                    </div>

                    <p className="text-uppercase col-otp c-ls-20 mx-auto">{pageData.tagline}</p>
                    <div className="py-5">
                        <h2 className="sub-heading c-fw-xb  w-md-75 w-100 mx-auto mb-2">{pageData.heading}</h2>
                        <p className="c-fs-4 w-md-75 w-100 mx-auto fw-normal">{pageData.subheading}</p>
                    </div>
                    <div className="d-flex flex-column flex-md-row gap-2 align-items-center justify-content-center">
                        <a
                            href={`/signup?service=${pageData.pagename}`}
                            target="_blank"
                            className="btn btn-dark btn-lg c-fs-2 utm"
                        >
                            Get started
                        </a>

                        {pageData.pagename === 'WhatsApp' && (
                            <button
                                className="btn btn-lg btn-outline-dark c-fs-2"
                                data-bs-toggle="modal"
                                data-bs-target="#whatsapp-meeting"
                            >
                                Schedule a meeting
                            </button>
                        )}
                    </div>
                </div>

                <h2>Whatsapp Business API to Send Message</h2>
                {pageData?.pagename !== 'Numbers' && (
                    <div className="row justify-content-center">
                        <div className="code-wrp col-lg-8 col-md-8 col-10">
                            <ul className="nav nav-pills justify-content-around" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="pills-cURL-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-cURL"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-cURL"
                                        aria-selected="true"
                                    >
                                        cURL
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-node-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-node"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-node"
                                        aria-selected="false"
                                    >
                                        Node
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-php-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-php"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-php"
                                        aria-selected="false"
                                    >
                                        PHP
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-ruby-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-ruby"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-ruby"
                                        aria-selected="false"
                                    >
                                        Ruby
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-python-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#pills-python"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-python"
                                        aria-selected="false"
                                    >
                                        Python
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="pills-cURL"
                                    role="tabpanel"
                                    aria-labelledby="pills-cURL-tab"
                                >
                                    <button className="copy-code btn btn-dark" onClick={() => copyText(cURL)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path
                                                fill="#999"
                                                d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
                                            />
                                        </svg>
                                        {isCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <pre>
                                        <code className={`language-javascript`}>{cURL}</code>
                                    </pre>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="pills-node"
                                    role="tabpanel"
                                    aria-labelledby="pills-node-tab"
                                >
                                    <button className="copy-code btn btn-dark" onClick={() => copyText(node)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path
                                                fill="#999"
                                                d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
                                            />
                                        </svg>
                                        {isCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <pre>
                                        <code className={`language-javascript`}>{node}</code>
                                    </pre>
                                </div>

                                <div
                                    className="tab-pane fade"
                                    id="pills-php"
                                    role="tabpanel"
                                    aria-labelledby="pills-php-tab"
                                >
                                    <button className="copy-code btn btn-dark" onClick={() => copyText(php)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path
                                                fill="#999"
                                                d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
                                            />
                                        </svg>
                                        {isCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <pre>
                                        <code className={`language-javascript`}>{php}</code>
                                    </pre>
                                </div>

                                <div
                                    className="tab-pane fade"
                                    id="pills-ruby"
                                    role="tabpanel"
                                    aria-labelledby="pills-ruby-tab"
                                >
                                    <button className="copy-code btn btn-dark" onClick={() => copyText(ruby)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path
                                                fill="#999"
                                                d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
                                            />
                                        </svg>
                                        {isCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <pre>
                                        <code className={`language-javascript`}>{ruby}</code>
                                    </pre>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="pills-python"
                                    role="tabpanel"
                                    aria-labelledby="pills-python-tab"
                                >
                                    <button className="copy-code btn btn-dark" onClick={() => copyText(python)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path
                                                fill="#999"
                                                d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
                                            />
                                        </svg>
                                        {isCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <pre>
                                        <code className={`language-javascript`}>{python}</code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div
                className={` my-5  px-sm-0 d-flex flex-column justify-content-center justift-content-sm-start section`}
            >
                <span className="container c-head sub-heading  c-head pt-4 pt-md-0 c-fw-b">Features</span>
                {pageData?.features?.map((item, index) => {
                    if (item?.content) {
                        i++;
                        return (
                            <div
                                key={`key-${index}`}
                                className={`container flex-column d-flex my-4  align-items-center justify-content-between  ${
                                    i % 2 ? 'flex-md-row-reverse' : 'flex-md-row '
                                }`}
                            >
                                <div className="col-12 col-md-6 d-flex justify-content-center ">
                                    {item?.img && <img src={item?.img} className="feature-img" alt="feature" />}
                                </div>
                                <div className="col-12 col-md-5 d-flex flex-column mt-3">
                                    <span className="c-fs-2 c-fw-b ">{item?.heading}</span>
                                    <span className="c-fs-3  mt-1">
                                        <span className="c-fw-b">{item?.subheading} </span>
                                        <span dangerouslySetInnerHTML={{ __html: item?.content }}></span>
                                    </span>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>

            <Seo path={path} pageData={pageData.pagename} />

            <GetStartedSection pricingPath={pricingPath} />
            <div className="container">
                <FaqSection
                    faqData={[
                        {
                            'que': 'What is WhatsApp Business API?',
                            'des': "<ul class='list-disc'><li>The WhatsApp Business API is a tool offered by WhatsApp that enables businesses to integrate WhatsApp messaging into their customer service, marketing, and engagement strategies.</li><li>It is particularly designed for medium and large enterprises to automate interactions and send messages from the official WhatsApp app to customers.</li><li>Through this API, businesses can enhance customer experiences by enabling chat services on their websites or applications.</li></ul>",
                        },
                        {
                            'que': 'How can businesses use AI for WhatsApp chat?',
                            'des': "<ul class='list-disc'><li>By integrating AI with WhatsApp Business API, businesses can create automated chatbots that provide instant replies to customer inquiries.</li><li>AI-based solutions can analyze incoming messages and respond appropriately, increasing efficiency in customer service without the need for human intervention.</li><li>Popular AI platforms can be integrated with WhatsApp via API to deliver seamless AI-driven chat experiences.</li></ul>",
                        },
                        {
                            'que': 'Can WhatsApp messages be sent via API for free?',
                            'des': "<ul class='list-disc'><li>WhatsApp Business API does require a subscription or payment depending on the service plan.</li><li>However, Facebook offers some pricing flexibility for click-to-WhatsApp ads, where businesses may avoid session charges.</li><li>It's best to review the latest pricing on the official Facebook or WhatsApp developer website.</li></ul>",
                        },
                        {
                            'que': 'How does WhatsApp API integration work?',
                            'des': "<ul class='list-disc'><li>WhatsApp API integration involves setting up the API to work with your website or application.</li><li>This enables your business to send messages from WhatsApp to users directly on their phones, facilitating real-time engagement.</li><li>Integration requires a WhatsApp Business account and an MSG91 account for developers to set up.</li></ul>",
                        },
                        {
                            'que': 'How can I use WhatsApp Business API with my website/CRM?',
                            'des': "<ul class='list-disc'><li>You can integrate WhatsApp Business API with your website to allow customers to reach you via click-to-chat links or automated response buttons.</li><li>Using HTML, JavaScript, and the API documentation, developers can configure 'Send WhatsApp Message' buttons on a website.</li><li>Integration can be done through your WhatsApp Business account setup and by following the instructions on the official WhatsApp developer site.</li></ul>",
                        },
                        {
                            'que': 'What do I need to start using WhatsApp Business API?',
                            'des': "To begin using WhatsApp Business API, you need: <br/> <ul class='list-disc'><li>WhatsApp Business Account</li><li>A phone number dedicated to the business account</li><li>Access to Facebook's developer platform at <a class='text-link active-link' target='_blank' href='https://developers.facebook.com/'>https://developers.facebook.com/</a></li><li>API credentials for integration</li><li>MSG91 Account <a class='text-link active-link' target='_blank' href='https://msg91.com/signup?utm_source=msg91Website&source=msg91Whatsapp'>(click here to register)</a></li></ul>",
                        },
                        {
                            'que': 'Can WhatsApp Business API be used for enterprises?',
                            'des': "<ul class='list-disc'><li>Yes, the WhatsApp Business API is ideal for enterprises looking to implement robust customer service and engagement solutions.</li><li>It provides a scalable solution that can support high message volumes, perfect for enterprises handling multiple customer inquiries daily.</li><li>Enterprises can also benefit from automated AI chatbots integrated with the API.</li></ul>",
                        },
                        {
                            'que': 'Is there a web interface for WhatsApp Business API?',
                            'des': "<ul class='list-disc'><li>Yes, MSG91 offers a web-based panel for easy understanding and implementation.</li><li>The WhatsApp Web API does not have a direct, visual interface like the regular WhatsApp Web. However, messages can be sent and received via API requests programmatically, which developers can configure using code or cloud-hosted solutions.</li></ul>",
                        },
                        {
                            'que': 'How is the WhatsApp Business API different from the regular WhatsApp app?',
                            'des': "<ul class='list-disc'><li>Unlike the WhatsApp app used for personal messaging, the WhatsApp Business API is designed specifically for businesses.</li><li>The API allows for automated messaging, integration with other software solutions, and bulk messaging while adhering to WhatsApp’s policies.</li><li>It is intended for use through programmatic integration rather than a direct user interface.</li></ul>",
                        },
                        {
                            'que': 'What is required to set up the WhatsApp API with a cloud account?',
                            'des': "<ul class='list-disc'><li>Registering your WhatsApp Business Account</li><li>Securing API credentials from Facebook's developer portal</li></ul>",
                        },
                        {
                            'que': 'How does WhatsApp API help with customer service?',
                            'des': "<ul class='list-disc'><li>WhatsApp API is highly beneficial for customer service as it enables quick responses and easy follow-up with customers.</li><li>With AI chatbot integration, businesses can automate frequent queries, freeing up customer service representatives to handle more complex cases.</li><li>The API supports two-way communication, ensuring customers get real-time updates on their inquiries.</li></ul>",
                        },
                        {
                            'que': 'Can I integrate WhatsApp API with existing business applications?',
                            'des': "<ul class='list-disc'><li>Yes, the WhatsApp API can be integrated with various applications, including CRM systems and e-commerce platforms.</li><li>Developers can set up API calls to trigger messages based on user actions, such as order confirmations, shipping updates, or customer service inquiries.</li><li>Custom integration solutions can be built for your business needs with the help of a developer.</li></ul>",
                        },
                        {
                            'que': 'What phone number should be used for WhatsApp Business API?',
                            'des': "<ul class='list-disc'><li>A dedicated business phone number is required for the WhatsApp Business API.</li><li>This number must not be linked to a personal WhatsApp account; it will be verified and registered through the API setup process on the Facebook developer platform.</li></ul>",
                        },
                        {
                            'que': 'Can I manage WhatsApp API messages on the web?',
                            'des': 'Yes, you can manage WhatsApp for sending and receiving messages using MSG91 HELLO (Web-based dashboards developed to provide real-time monitoring of conversations).',
                        },
                        {
                            'que': 'Are there free options available for WhatsApp API?',
                            'des': "<ul class='list-disc'><li>The WhatsApp API itself is not free for most business functions, as costs may be associated with sending and receiving messages.</li><li>However, Click-to-WhatsApp ads provide a budget-friendly way to initiate conversations without incurring session charges for specific interactions.</li></ul>",
                        },
                    ]}
                />
            </div>
            <TrustedBy align={'center'} />
            {pageData.pagename === 'WhatsApp' && (
                <div>
                    <div
                        className="modal fade"
                        id="whatsapp-meeting"
                        tabIndex={-1}
                        aria-labelledby="Schedule a meeting"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <InlineWidget
                                        url="https://calendly.com/msg91-whatsapp/15-min-meeting?back=1&month=2024-05"
                                        styles={{ height: '820px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChannelComponent;
