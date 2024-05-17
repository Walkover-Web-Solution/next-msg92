import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

const ProductMenu = ({ path, compData }) => {

    return (
        <>
            <div className="bg-overlay" id="bgoverlay"></div>
            <div className="overlay-menu-cont d-flex justify-content-end" id="overlaymenucont">
                <div className="overlay-menu d-flex flex-wrap gap-5 annoucmentbar" id="productmenu">
                    <div className="menu mt-4 d-flex flex-column ">
                        <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">
                            {`${compData?.products?.applications?.heading || "Applications"}`}
                        </p>

                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/hello`}>
                            <Image src="/img/icon/hello.svg" width={40} height={40} alt="ico" />
                            <div className="">
                                <h4 className="c-fs-2">{`${
                                    compData?.products?.applications?.content[0]?.name || "Hello"
                                }`}</h4>
                                <p className="c-fs-5">
                                    {`${
                                        compData?.products?.applications?.content[0]?.description ||
                                        "Ticketing and Chat"
                                    }`}
                                </p>
                            </div>
                        </a>
                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/campaign`}>
                            <Image src="/img/icon/campaign.svg" width={40} height={40} alt="ico" />
                            <div className="">
                                <h4 className="c-fs-2">{`${
                                    compData?.products?.applications?.content[1]?.name || "Campaign"
                                }`}</h4>
                                <p className="c-fs-5">
                                    {`${
                                        compData?.products?.applications?.content[1]?.description ||
                                        "Event Based Automation"
                                    }`}
                                </p>
                            </div>
                        </a>
                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/segmento`}>
                            <Image src="/img/icon/segmento.svg" width={40} height={40} alt="ico" />
                            <div className="">
                                <h4 className="c-fs-2">{`${
                                    compData?.products?.applications?.content[2]?.name || "Segmento"
                                }`}</h4>
                                <p className="c-fs-5">
                                    {`${
                                        compData?.products?.applications?.content[2]?.description ||
                                        "Contact Management"
                                    }`}
                                </p>
                            </div>
                        </a>
                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/otp`}>
                            <Image src="/img/icon/otp.svg" width={40} height={40} alt="ico" />
                            <div className="">
                                <h4 className="c-fs-2">{`${
                                    compData?.products?.applications?.content[3]?.name || "OTP"
                                }`}</h4>
                                <p className="c-fs-5">
                                    {`${
                                        compData?.products?.applications?.content[3]?.description ||
                                        "Simplified OTP Platform"
                                    }`}
                                </p>
                            </div>
                        </a>
                    </div>

                    <div className="menu mt-4 d-flex flex-column">
                        <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">
                            {`${compData?.products?.channels?.heading || "Channels"}`}
                        </p>
                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/sms`}>
                            <Image src="/img/icon/sms.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.products?.channels?.content[0]?.name || "SMS"}`}</h4>
                        </a>

                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/email`}>
                            <Image src="/img/icon/email.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.products?.channels?.content[1]?.name || "Email"}`}</h4>
                        </a>
                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/whatsapp`}>
                            <Image src="/img/icon/whatsapp.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${
                                compData?.products?.channels?.content[2]?.name || "WhatsApp"
                            }`}</h4>
                        </a>
                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/voice`}>
                            <Image src="/img/icon/voice.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.products?.channels?.content[3]?.name || "Voice"}`}</h4>
                        </a>
                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/numbers`}>
                            <Image src="/img/icon/numbers.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${
                                compData?.products?.channels?.content[4]?.name || "Numbers"
                            }`}</h4>
                        </a>
                    </div>

                    <div className="menu mt-4 d-flex flex-column">
                        <p className="c-fs-3 c-fw-sb text-grey text-uppercase ">{`${
                            compData?.products?.utilities?.heading || "Utilities"
                        }`}</p>
                        <a className="d-flex gap-3 align-items-center product-menu-btn py-3" href={`${path}/shorturl`}>
                            <Image src="/img/icon/shorturl.svg" width={40} height={40} alt="ico" />
                            <div className="">
                                <h4 className="c-fs-2">{`${
                                    compData?.products?.utilities?.content[0]?.name || "URL Shortener"
                                }`}</h4>
                                <p className="c-fs-5">{`${
                                    compData?.products?.utilities?.content[0]?.description || "Cutomise and Track URL's"
                                }`}</p>
                            </div>
                        </a>
                        <a
                            className="d-flex gap-3 align-items-center product-menu-btn py-3"
                            href={`${path}/knowledgebase`}
                        >
                            <Image src="/img/icon/knowledgebase.svg" width={40} height={40} alt="ico" />
                            <div className="">
                                <h4 className="c-fs-2">{`${
                                    compData?.products?.utilities?.content[1]?.name || "KnowledgeBase"
                                }`}</h4>
                                <p className="c-fs-5">{`${
                                    compData?.products?.utilities?.content[1]?.description ||
                                    "Manage Help Docs and Guides"
                                }`}</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="overlay-menu d-flex flex-wrap gap-3 annoucmentbar" id="integrationsmenu">
                    <div className="menu mt-4 d-flex flex-column ">
                        <a
                            className="d-flex gap-3 align-items-center product-menu-btn py-3"
                            href="https://apps.shopify.com/msg91"
                            target="_blank"
                        >
                            <Image src="/img/integrations/shopify.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.integrations?.content[0]?.name || "Shopify"}`}</h4>
                        </a>
                        <a
                            className="d-flex gap-3 align-items-center product-menu-btn py-3"
                            href={`/partners-and-integrations/tally`}
                            target="_blank"
                        >
                            <Image src="/img/integrations/tally.jpeg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.integrations?.content[1]?.name || "Tally"}`} </h4>
                        </a>
                        <a
                            className="d-flex gap-3 align-items-center product-menu-btn py-3"
                            href={`/partners-and-integrations/zapier`}
                        >
                            <Image src="/img/integrations/zapier.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.integrations?.content[2]?.name || "Zapier"}`}</h4>
                        </a>

                        <a
                            className="d-flex gap-3 align-items-center product-menu-btn py-3"
                            href={`/partners-and-integrations/freshworks`}
                        >
                            <Image src="/img/integrations/freshworks.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.integrations?.content[3]?.name || "Freshworks"}`}</h4>
                        </a>
                        <a
                            className="d-flex gap-3 align-items-center product-menu-btn py-3"
                            href={`/partners-and-integrations/firebase`}
                        >
                            <Image src="/img/integrations/firebase-logo.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.integrations?.content[4]?.name || "Firebase"}`}</h4>
                        </a>
                        <a
                            className="d-flex gap-3 align-items-center product-menu-btn py-3"
                            href={`/partners-and-integrations/hubspot`}
                        >
                            <Image src="/img/integrations/hubspot-logo.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.integrations?.content[5]?.name || "HubSpot"}`}</h4>
                        </a>
                        <a
                            className="d-flex gap-3 align-items-center product-menu-btn py-3"
                            href="https://msg91.com/help/how-to-send-sms-and-email-from-google-spreadsheet"
                            target="_blank"
                        >
                            <Image src="/img/integrations/google-sheets.svg" width={40} height={40} alt="ico" />
                            <h4 className="c-fs-2">{`${compData?.integrations?.content[6]?.name || "Google Sheets"}`}</h4>
                        </a>

                        <a className="d-flex gap-3 align-items-center mt-4" href="/partners-and-integrations">
                            <span>{`${compData?.integrations?.morebtn || "Explore More Plugins"}`}</span>
                            <MdKeyboardArrowRight />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductMenu;
