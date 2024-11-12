import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

const InRcs = () => {
    const [showInsms, setShowInsms] = useState(false);

    const handleReadMore = () => {
        setShowInsms(!showInsms);
    };

    return (
        <>
            <div className={`container my-5 d-flex flex-column gap-3 ${showInsms ? 'insms' : ''}`}>
                <div className="d-flex flex-column gap-2">
                    <h2 className="c-fs-2">What is RCS messaging?</h2>
                    <p>
                        RCS (Rich Communication Services) is an upgrade to SMS, offering features like read receipts,
                        typing indicators, multimedia sharing, and interactive buttons for a more engaging messaging
                        experience.
                    </p>
                </div>

                {showInsms && (
                    <>
                        <div className="d-flex flex-column gap-2">
                            <h2 className="c-fs-2">What is RCS messaging?</h2>
                            <p>
                                RCS (Rich Communication Services) is an upgrade to SMS, offering features like read
                                receipts, typing indicators, multimedia sharing, and interactive buttons for a more
                                engaging messaging experience.
                            </p>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <h2 className="c-fs-2">How to send RCS messages</h2>
                            <p>
                                To send RCS messages using an API, you can use MSG91's services. With MSG91, businesses
                                can integrate RCS messaging directly into their applications to reach customers more
                                interactively. Alternatively, to send RCS messages on mobile, you can use an RCS-enabled
                                app like Google Messages. Both the sender and recipient need to have RCS activated
                                through their carrier or app settings for messages to be delivered with RCS features.
                            </p>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <h2 className="c-fs-2">Is RCS available in India?</h2>
                            <p>
                                Yes, RCS messaging is available in India through major carriers and supported apps,
                                including Google Messages.
                            </p>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <h2 className="c-fs-2">How to send RCS messages on Android</h2>
                            <p>
                                Open Google Messages and go to Settings. Enable "Chat features" (RCS). Start a
                                conversation with RCS-enabled contacts.
                            </p>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <h2 className="c-fs-2">How to send RCS messages on iPhone</h2>
                            <p>
                                Currently, iPhones do not natively support RCS. However, RCS features can be accessed
                                through third-party apps on both iPhone, although they are less common.
                            </p>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <h2 className="c-fs-2">How to Send RCS Messages Using MSG91</h2>
                            <ol>
                                <li>Sign Up on MSG91: Create an account on MSG91, an RCS messaging provider.</li>
                                <li>
                                    Set Up RCS Messaging: Contact MSG91 to enable RCS for your business account. You’ll
                                    get API access for RCS messaging.
                                </li>
                                <li>
                                    Configure API Integration: Use MSG91's RCS API documentation to integrate RCS with
                                    your application or CRM for automated messaging.
                                </li>
                                <li>
                                    Compose and Send Messages: Customize your message with images, videos, carousels, or
                                    buttons, and send them directly to RCS-enabled contacts.
                                </li>
                                <li>
                                    Track Engagement: Monitor message delivery, read receipts, and customer responses to
                                    enhance engagement.
                                </li>
                            </ol>
                        </div>
                    </>
                )}
                <div>
                    <button
                        className="border border-0 bg-transparent ps-0 mt-3 ml-auto w-fit c-fs-3 fw-semibold shadow-none"
                        onClick={handleReadMore}
                    >
                        {showInsms ? 'Read Less' : 'Read More'}
                        <span className="ms-4 fs-4">
                            <MdExpandMore />
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default InRcs;
