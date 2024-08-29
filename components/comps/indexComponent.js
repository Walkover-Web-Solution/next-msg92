import { MdKeyboardArrowRight } from 'react-icons/md';
import TrustedBy from '@/components/trustedby';
import Image from 'next/image';
import PreFooter from '../preFooter';
import Seo from '../seoComp';
import FaqSection from '../faqSection/faqSection';
import faqData from '@/data/indexfaq.json';
import { MdEast } from 'react-icons/md';

const indexComp = ({ pageData, params, pricingPath }) => {
    const path = params ? params?.country : '';
    return (
        <>
            <div className="container bg-gray-100 section-y">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-7 d-flex flex-column gap-4 align-items-start hero-left">
                        <div className="home-pre-heading c-fs-4 uc">customer solution platform</div>
                        <h1 className="heading text-dark c-fw-xb">{pageData?.headline}</h1>
                        <h2 className="small-heading text-dark">
                            Secure and robust APIs for WhatsApp, SMS, RCS, Email, Voice, Authentication and more
                        </h2>
                        <a
                            href="/signup"
                            target="_blank"
                            className="btn btn-dark px-3 py-1 mt-3 px-md-4 py-md-2 ls-3 utm rounded-1"
                        >
                            Get Started
                        </a>
                        <TrustedBy />
                    </div>
                    <div className="col-12 col-md-5 col-lg-5 col-sm-12 order-sm-0 hero-right">
                        <img src="/img/home/banner.webp" className="hero-img" alt='girl using all the channels' />
                    </div>
                </div>
            </div>

            <div className="bg-light section-y">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <a href="/hello" className="product-card hello-card flex-row text-dark mb-4">
                                <div className="row">
                                    <div className="d-flex flex-column gap-3 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 align-items-start">
                                        <img src="/img/icon/hello.svg" className="pro-sec-ico" alt='hello icon' />
                                        <div className="pre-heading c-fs-5">Contact center</div>
                                        <div className="pro-heading small-heading">Hello</div>
                                        <div className="product-content c-fs-4">
                                            Empower your employees, Support your customers.
                                        </div>
                                        <div className="justify-content-between d-flex align-items-center">
                                            <div className="pro-btn-text">Learn more</div>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    </div>
                                    <div className="product-img d-flex justify-content-end col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 align-items-start">
                                        <img src="/img/home/chats.svg" alt='hello chats' />
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <a href="/campaign" className="product-card campaign-card flex-row text-dark mb-4">
                                <div className="row">
                                    <div className="d-flex flex-column gap-3 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 align-items-start">
                                        <img src="/img/icon/campaign.svg" className="pro-sec-ico" alt='campaign icon' />
                                        <div className="pre-heading c-fs-5">Event Based Automation</div>
                                        <div className="pro-heading small-heading">Campaign</div>
                                        <div className="product-content c-fs-4">
                                            Boost audience engagement through smart Platform.
                                        </div>
                                        <div className="justify-content-between d-flex align-items-center">
                                            <div className="pro-btn-text">Learn more</div>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    </div>
                                    <div className="product-img d-flex justify-content-end col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 align-items-start">
                                        <img src="/img/home/campaign.svg" alt='campaign flow' />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <a href="/segmento" className="product-card segmento-card flex-row text-dark mb-4">
                                <div className="row">
                                    <div className="d-flex flex-column gap-3 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 align-items-start">
                                        <img src="/img/icon/segmento.svg" className="pro-sec-ico" alt='segmento icon' />
                                        <div className="pre-heading c-fs-5">Customer data platform</div>
                                        <div className="pro-heading small-heading">Segmento</div>
                                        <div className="product-content c-fs-4">
                                            Customer segmentation by their actions or events.
                                        </div>
                                        <div className="justify-content-between d-flex align-items-center">
                                            <div className="pro-btn-text">Learn more</div>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    </div>
                                    <div className="product-img col d-flex justify-content-end">
                                        <img src="/img/home/segmento.webp" alt='segmento image' />
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <a href="/otp" className="product-card otp-card flex-row text-dark mb-4">
                                <div className="row">
                                    <div className="d-flex flex-column gap-3 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 align-items-start">
                                        <img src="/img/icon/otp.svg" className="pro-sec-ico" alt='otp icon' />
                                        <div className="pre-heading c-fs-5">INSTANT SECURE VERIFICATION</div>
                                        <div className="pro-heading small-heading">OTP</div>
                                        <div className="product-content c-fs-4">
                                            Quick and reliable multichannel OTP verification
                                        </div>
                                        <div className="justify-content-between d-flex align-items-center">
                                            <div className="pro-btn-text">Learn more</div>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    </div>
                                    <div className="product-img col d-flex justify-content-end">
                                        <img src="/img/home/otp.png"  alt='opt security image'/>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5 my-80">
                <h2 className="sub-heading c-head mb-2 fw-bold">Communication Channels</h2>
                <p className="c-fs-2 col-12 col-md-11 col-lg-9">
                    Empower conversations with best-in-class communication API Full-featured APIs for developers and
                    businesses to connect and engage your customers globally
                </p>
                <div className="row mt-4 row-gap-26">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <a
                            href="/sms"
                            className="product-card chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-4 text-dark c-fs-2 bg-light"
                        >
                            <div className="d-flex flex-column gap-3">
                                <Image className="me-2" src="/img/icon/sms.svg" width={40} height={40} alt="cannels" />
                                <span className="c-fw-b">SMS</span>
                                <div className="description c-fs-3">
                                    Transform your global communication with MSG91's reliable SMS services & APIs.
                                    Engage, analyze, and connect effortlessly on a global scale
                                </div>
                                <div className="justify-content-between d-flex align-items-center c-fs-2">
                                    <div className="pro-btn-text">Learn more</div>
                                    <MdKeyboardArrowRight />
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <a
                            href="/email"
                            className="product-card chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-4 text-dark c-fs-2 bg-light"
                        >
                            <div className="d-flex flex-column gap-3">
                                <Image
                                    className="me-2"
                                    src="/img/icon/email.svg"
                                    width={40}
                                    height={40}
                                    alt="cannels"
                                />
                                <span className="c-fw-b">Email</span>
                                <div className="description c-fs-3">
                                    Enhance email outreach with templates, AMP, stats, SMTP/API, and validation for
                                    effective customer engagement
                                </div>
                                <div className="justify-content-between d-flex align-items-center c-fs-2">
                                    <div className="pro-btn-text">Learn more</div>
                                    <MdKeyboardArrowRight />
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <a
                            href="/whatsapp"
                            className="product-card chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-4 text-dark c-fs-2 bg-light"
                        >
                            <div className="d-flex flex-column gap-3">
                                <Image
                                    className="me-2"
                                    src="/img/icon/whatsapp.svg"
                                    width={40}
                                    height={40}
                                    alt="cannels"
                                />
                                <span className="c-fw-b">WhatsApp</span>
                                <div className="description c-fs-3">
                                    Improve interaction on WhatsApp with Base64 support, two-way communication, template
                                    management, analytics, and message logs
                                </div>
                                <div className="justify-content-between d-flex align-items-center c-fs-2">
                                    <div className="pro-btn-text">Learn more</div>
                                    <MdKeyboardArrowRight />
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <a
                            href="/voice"
                            className="product-card chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-4 text-dark c-fs-2 bg-light"
                        >
                            <div className="d-flex flex-column gap-3">
                                <Image
                                    className="me-2"
                                    src="/img/icon/voice.svg"
                                    width={40}
                                    height={40}
                                    alt="cannels"
                                />
                                <span className="c-fw-b">Voice</span>
                                <div className="description c-fs-3">
                                    Enhance customer engagement with real-time calls, Call Monitoring, browser calling,
                                    advanced IVR, bulk voice messaging, and real-time agent connections
                                </div>
                                <div className="justify-content-between d-flex align-items-center c-fs-2">
                                    <div className="pro-btn-text">Learn more</div>
                                    <MdKeyboardArrowRight />
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <a
                            href="/numbers"
                            className="product-card chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-4 text-dark c-fs-2 bg-light"
                        >
                            <div className="d-flex flex-column gap-3">
                                <Image
                                    className="me-2"
                                    src="/img/icon/numbers.svg"
                                    width={40}
                                    height={40}
                                    alt="cannels"
                                />
                                <span className="c-fw-b">Numbers</span>
                                <div className="description c-fs-3">
                                    Unlock global markets with cost-efficient virtual numbers. Enhance engagement with
                                    missed call services, keyword messaging, surveys, and auto responses
                                </div>
                                <div className="justify-content-between d-flex align-items-center c-fs-2">
                                    <div className="pro-btn-text">Learn more</div>
                                    <MdKeyboardArrowRight />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="section bg-light stats-sec align-items-center my-80">
                <div className="container h-100 d-flex flex-wrap text-lg-center text-start  align-items-center">
                    <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column  gap-2 py-3 py-sm-5">
                        <h2 className="c-fs-1 c-fw-b">2.5 Billion+</h2>
                        <h3 className="c-fs-3">
                            API calls
                            <br /> per month
                        </h3>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column gap-2 py-3 py-sm-5">
                        <h2 className="c-fs-1 c-fw-b">1.6 Billion+</h2>
                        <h3 className="c-fs-3">
                            SMS sent
                            <br /> per month
                        </h3>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column gap-2 py-3 py-sm-5">
                        <h2 className="c-fs-1 c-fw-b">1 Billion+</h2>
                        <h3 className="c-fs-3">
                            OTP sent
                            <br /> per month
                        </h3>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column gap-2 py-3 py-sm-5">
                        <h2 className="c-fs-1 c-fw-b">1 Billion+</h2>
                        <h3 className="c-fs-3">
                            Email sent
                            <br /> per month
                        </h3>
                    </div>
                </div>
            </div>

            <div className="container my-5 more-services-sec my-80">
                <h2 className="sub-heading c-head fw-bold">More services</h2>
                <div className="d-flex my-5 flex-lg-row flex-column gap-4">
                    <a
                        href={`/shorturl`}
                        className=" text-dark col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 p-4 d-flex flex-column flex-sm-row flex-md-row flex-lg-column gap-3 rounded-2 more-services"
                    >
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center">
                                <span className="me-3">
                                    <Image src="/img/icon/shorturl.svg" width={36} height={36} alt="short-url" />
                                </span>
                                <span className="heading c-head fw-bold">URL Shortner</span>
                            </div>
                            <div className="">
                                <Image
                                    className="more-services-img col-12"
                                    src="/img/short-url-img.svg"
                                    width={336}
                                    height={212}
                                    alt="short-url-img"
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3 justify-content-between  h-100">
                            <div className="">
                                <h2 className="mb-3 c-fs-3 fw-medium">Make your long URLs short</h2>
                                <p className="c-fs-4">
                                    Automatically shortens URL and tracks your success, one click at a time. Turn your
                                    long, messy links into short, memorable branded links
                                </p>
                            </div>

                            <div className="d-flex align-items-center c-fs-3 c-fw-b text-dark">
                                <span className="fw-semibold me-4">Learn more</span>
                                <MdKeyboardArrowRight />
                            </div>
                        </div>
                    </a>

                    <a
                        href={`/knowledgebase`}
                        className=" text-dark col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 p-4 d-flex flex-column flex-sm-row flex-md-row flex-lg-column gap-3 rounded-2 more-services"
                    >
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center">
                                <span className="me-3">
                                    <Image
                                        src="/img/icon/knowledgebase.svg"
                                        width={36}
                                        height={36}
                                        alt="knowledgebase"
                                    />
                                </span>
                                <span className="heading c-head fw-bold">KnowledgeBase App</span>
                            </div>
                            <div className="">
                                <Image
                                    className="more-service-img"
                                    src="/img/knowledgebase-img.svg"
                                    width={336}
                                    height={212}
                                    alt="knowledgebase-img"
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3 justify-content-between h-100">
                            <div className="">
                                <h2 className="mb-3 c-fs-3 fw-medium">Manage your help docs and articles</h2>
                                <p className="c-fs-4">
                                    Do not let your customers wait for simple solutions. Give them instant access to the
                                    self-service library of information.
                                </p>
                            </div>
                            <div className="d-flex align-items-center c-fs-3 c-fw-sb text-dark">
                                <span className="fw-semibold me-4">Learn more</span>
                                <MdKeyboardArrowRight />
                            </div>
                        </div>
                    </a>
                    <a
                        href="https://msg91.com/help/all-you-need-to-know-about-files-option-of-msg91"
                        className=" text-dark col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 p-4 d-flex flex-column flex-sm-row flex-md-row flex-lg-column gap-3 rounded-2 more-services"
                    >
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center">
                                <span className="me-3">
                                    <Image src="/img/icon/filehosting.svg" width={36} height={36} alt="File Hosting" />
                                </span>
                                <span className="heading c-head fw-bold">File Hosting</span>
                            </div>
                            <div className="">
                                <Image
                                    className="more-services-img col-12"
                                    src="/img/file-hosting-img.svg"
                                    width={336}
                                    height={212}
                                    alt="filehosting-img"
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3 justify-content-between h-100">
                            <div className="">
                                <h2 className="mb-3 c-fs-3 fw-medium">Simple and secured file storage</h2>
                                <p className="c-fs-4">
                                    A central hub for online file storage, sharing and syncing. Store all your files
                                    safely using powerful, reliable and easy-to-use cloud storage.
                                </p>
                            </div>

                            <div className="d-flex align-items-center c-fs-3 c-fw-sb text-dark">
                                <span className="fw-semibold me-4">Learn more</span>
                                <MdKeyboardArrowRight />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="bg-light py-5">
                <div className="container  ">
                    <h2 className="sub-heading c-head fw-bold mb-4">Customer Success Powered by MSG91</h2>

                    <div className="img-wapper d-flex flex-lg-row flex-column gap-4 m-0 p-0">
                        <a
                            href="/case-studies/milkbasket"
                            className="col-12 col-lg-6 col-md-12 c-hover c-hover d-flex flex-lg-column flex-md-row flex-column bg-white text-dark rounded-2 p-0 overflow-hidden"
                        >
                            <div className="milkbasket-client-img d-flex justify-content-center align-items-center col-12 col-lg-12 col-md-4">
                                <img src="/img/milkbasket-logo.png" className="h-25 " alt="milkbasket-client-img" />
                            </div>
                            <div className="c-fs-3 p-3 col-12 col-lg-12 col-md-8">
                                <p className="pe-2 ">
                                    Milkbasket sends regular updates to its customers by offering proactive support and
                                    recommendations
                                </p>
                                <div className="d-flex justify-content-between text-dark c-fw-sb mt-3">
                                    <span className="fw-semibold">Learn more</span>
                                    <span className="fs-4">
                                        <MdEast />
                                    </span>
                                </div>
                            </div>
                        </a>
                        <div className="col-12 col-lg-6 col-md-12 row gap-4 gap-sm-3 gap-md-4 m-0 p-0 h-100 ">
                            <a
                                href="/case-studies/unacademy"
                                className="c-hover d-flex align-items-start flex-lg-row flex-md-row flex-column c-hover bg-white text-dark rounded-2 overflow-hidden p-0 h-50"
                            >
                                <div className="secc-client-img d-flex justify-content-center align-items-center col-12 col-md-4 col-lg-4">
                                    <img className="h-50" src="/img/unacademy-logo.png" alt="secc-client-img" />
                                </div>

                                <div className="c-fs-3 p-3 col-12 col-lg-8">
                                    <p className="pe-2">
                                        Unacademy using omnichannel keeps its audience engaged and nurtured with
                                        personalised campaigns
                                    </p>
                                    <div className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3">
                                        <span className="me-3 fw-semibold">Learn more</span>
                                        <MdKeyboardArrowRight />
                                    </div>
                                </div>
                            </a>
                            <a
                                href="/case-studies/ixigo"
                                className="c-hover d-flex align-items-start flex-lg-row flex-md-row flex-column c-hover bg-white text-dark rounded-2 overflow-hidden p-0"
                            >
                                <div className="sec-client-img d-flex justify-content-center align-items-center col-12 col-md-4 col-lg-4">
                                    <img className="h-25" src="/img/ixigo-logo.png" alt="secc-client-img" />
                                </div>
                                <div className="c-fs-3 p-3 col-12 col-lg-8">
                                    <p className="pe-2">
                                        Ixigo engages and updates its audience through multichannel communication across
                                        messaging, email and WhatsApp
                                    </p>
                                    <div className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3">
                                        <span className="me-3 fw-semibold">Learn more</span>
                                        <MdKeyboardArrowRight />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <FaqSection faqData={faqData?.main} />
            </div>

            <Seo path={path} pageData={'index'} />

            <PreFooter pricingPath={pricingPath} />
        </>
    );
};
export default indexComp;
