import { MdKeyboardArrowRight } from "react-icons/md";
import TrustedBy from "@/components/trustedby";
import Image from "next/image";
import PreFooter from "../preFooter";
import Seo from '../seoComp';

const indexComp = ({pageData, params}) => {
  const path = params ? params?.country : "";  
  return (
    <>
      <div className="container d-flex flex-column c-gap-1 align-items-center text-center mt-80">
        <h1 className="heading text-dark col-md-10 col-12 col-xxl-8 col-xl-8 ">
          {pageData?.headline}
        </h1>
        <h3 className="small-heading text-dark">
          Secure and robust APIs for SMS, Email, Voice, Authentication and more
        </h3>
        <a
          href="https://control.msg91.com/signup/"
          target="_blank"
          className="btn btn-dark small-heading px-3 py-2 mt-3 c-fw-sb px-md-4 py-md-3 ls-3 "
        >
          Get Started
        </a>
        <TrustedBy />
      </div>

      <div className="section product-sec d-flex flex-wrap my-5 my-80">
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="pro-heading c-head">Campaign</span>
            </div>
            <div className="product-head-img caimpaign-pro"></div>
          </div>
          <div className="product-content pro-alt p-4 d-flex flex-column justify-content-between gap-3">
            <p className="pro-text text-white">
              Boost audience engagement through smart Platform.
            </p>
            <a
              href="/campaign"
              className="c-fs-3 btn btn-light pro-btn justify-content-between d-flex align-items-center px-3 py-2"
            >
              <span>
                <img
                  src="./img/icon/campaign.svg"
                  className="pro-sec-ico me-3"
                />
                <span className="pro-btn-text">Campaign</span>
              </span>
              <MdKeyboardArrowRight />
            </a>
          </div>
        </div>
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="pro-heading c-head">Conversation</span>
            </div>
            <div className="product-head-img hello-pro"></div>
          </div>
          <div className="product-content  p-4 d-flex flex-column justify-content-between gap-3">
            <p className="pro-text text-white">
              Empower your employees, Support your customers.
            </p>
            <a
              href="/hello"
              className="c-fs-3 btn btn-light pro-btn justify-content-between d-flex align-items-center px-3 py-2"
            >
              <span>
                <img src="./img/icon/hello.svg" className="pro-sec-ico me-3" />
                <span className="pro-btn-text">Hello</span>
              </span>
              <MdKeyboardArrowRight />
            </a>
          </div>
        </div>
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="pro-heading c-head">Segmentation</span>
            </div>
            <div className="product-head-img segmento-pro"></div>
          </div>
          <div className="product-content pro-alt p-4 d-flex flex-column justify-content-between gap-3">
            <p className="pro-text text-white">
              Segment your customers according to their action or event.
            </p>
            <a
              href="/segmento"
              className="c-fs-3 btn btn-light pro-btn justify-content-between d-flex align-items-center px-3 py-2"
            >
              <span>
                <img
                  src="./img/icon/segmento.svg"
                  className="pro-sec-ico me-3"
                />
                <span className="pro-btn-text">Segmento</span>
              </span>
              <MdKeyboardArrowRight />
            </a>
          </div>
        </div>
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="pro-heading c-head">Authentication</span>
            </div>
            <div className="product-head-img otp-pro"></div>
          </div>
          <div className="product-content p-4 d-flex flex-column justify-content-between gap-3">
            <p className="pro-text text-white">
              Quick and reliable authentication by 2FA using multiple channels.
            </p>
            <a
              href="/otp"
              className="c-fs-3 btn btn-light pro-btn justify-content-between d-flex align-items-center px-3 py-2"
            >
              <span>
                <img src="./img/icon/otp.svg" className="pro-sec-ico me-3" />
                <span className="pro-btn-text">Authentication</span>
              </span>
              <MdKeyboardArrowRight />
            </a>
          </div>
        </div>
      </div>

      <div className="container my-5 my-80">
        <h2 className="sub-heading c-head mb-2">Communication Channels</h2>
        <p className="c-fs-2 col-12 col-md-11 col-lg-9">
        Empower conversations with best-in-class communication API
Full-featured APIs for developers and businesses to connect and engage your customers globally

        </p>
        <div className="row mt-4 row-gap-26">
          <div className="col-12 col-sm-6 col-md-3">
          <a
            href="/sms"
            className="chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <div className="d-flex align-items-center">
              <Image
                className="me-2"
                src="./img/icon/sms.svg"
                width={40}
                height={40}
                alt="cannels"
              />
              <span className="">SMS</span>
            </div>
            <MdKeyboardArrowRight />
          </a>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
          <a
            href="/email"
            className="chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <div className="d-flex align-items-center">
              <Image
                className="me-2"
                src="./img/icon/email.svg"
                width={40}
                height={40}
                alt="cannels"
              />
              <span className="">Email</span>
            </div>
            <MdKeyboardArrowRight />
          </a>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
          <a
            href="/whatsapp"
            className="chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <div className="d-flex align-items-center">
              <Image
                className="me-2"
                src="./img/icon/whatsapp.svg"
                width={40}
                height={40}
                alt="cannels"
              />
              <span className="">Whatsapp</span>
            </div>
            <MdKeyboardArrowRight />
          </a>
          </div>
          {/* <a
            href="/telegram"
            className="chn-btn col-3 d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <div className="d-flex align-items-center">
              <Image
                className="me-2"
                src="./img/icon/telegram.svg"
                width={40}
                height={40}
                alt="telegram"
              />
              <span className="">Telegram</span>
            </div>
            <MdKeyboardArrowRight />
          </a> */}
          <div className="col-12 col-sm-6 col-md-3">
          <a
            href="/voice"
            className="chn-btn w-100 h-100 d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <div className="d-flex align-items-center">
              <Image
                className="me-2"
                src="./img/icon/voice.svg"
                width={40}
                height={40}
                alt="voice"
              />
              <span className="">Voice</span>
            </div>
            <MdKeyboardArrowRight />
          </a>
          </div>
          {/* <a
            href="/rcs"
            className="chn-btn col-3 d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <div className="d-flex align-items-center">
              <Image
                className="me-2"
                src="./img/icon/rcs.svg"
                width={40}
                height={40}
                alt="rcs"
              />
              <span className="">RCS</span>
            </div>
            <MdKeyboardArrowRight />
          </a> */}
        </div>
      </div>

      <div className="section c-bg-grey stats-sec align-items-center my-80">
        <div className="container h-100 d-flex flex-wrap text-center text-sm-start  align-items-center">
          <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column  gap-2 py-3 py-sm-5">
            <h2 className="c-fs-1 c-fw-b">2.5 Billion+</h2>
            <h4 className="c-fs-3">
              API calls
              <br /> per month
            </h4>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column gap-2 py-3 py-sm-5">
            <h2 className="c-fs-1 c-fw-b">1.6 Billion+</h2>
            <h4 className="c-fs-3">
              SMS sent
              <br /> per month
            </h4>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column gap-2 py-3 py-sm-5">
            <h2 className="c-fs-1 c-fw-b">1 Billion+</h2>
            <h4 className="c-fs-3">
              OTP sent
              <br /> per month
            </h4>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column gap-2 py-3 py-sm-5">
            <h2 className="c-fs-1 c-fw-b">1 Billion+</h2>
            <h4 className="c-fs-3">
              Email sent
              <br /> per month
            </h4>
          </div>
        </div>
      </div>

      <div className="container my-5 more-services-sec my-80">
        <h2 className="sub-heading c-head">Utilities</h2>
        <div className="d-flex my-5 flex-md-row flex-column">
        <a href={`${path}/shorturl`} className=" text-dark col-12 col-md-4 p-4 d-flex flex-column flex-sm-row flex-md-column gap-3 b-right-1  more-services">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <span className="me-3">
                  <Image
                    src="./img/icon/shorturl.svg"
                    width={36}
                    height={36}
                    alt="short-url"
                  />
                </span>
                <span className="c-fs-2 c-head">ShortURL</span>
              </div>
              <div className="">
                <Image
                  className="more-services-img"
                  src="./img/short-url-img.svg"
                  width={336}
                  height={212}
                  alt="short-url-img"
                />
              </div>
            </div>
            <div className="d-flex flex-column gap-3 justify-content-between  h-100">
              <div className="">
                <h4 className="mb-3 c-fs-3">Make your long URLs short</h4>
                <p className="c-fs-4">
                Automatically shortens URL and tracks your success, one click at a time. Turn your long, messy links into short, memorable branded links
                </p>
              </div>
              
                <div className="d-flex align-items-center justify-content-between c-fs-3 c-fw-b text-dark">
                  <span>Learn more</span>
                  <MdKeyboardArrowRight />
                </div>
            </div>
          </a>
          
          <a href={`${path}/knowledgebase`} className=" text-dark col-12 col-md-4 p-4 d-flex flex-column flex-sm-row flex-md-column gap-3 b-right-1  more-services">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <span className="me-3">
                  <Image
                    src="./img/icon/knowledgebase.svg"
                    width={36}
                    height={36}
                    alt="knowledgebase"
                  />
                </span>
                <span className="c-fs-2 c-head">KnowledgeBase</span>
              </div>
              <div className="">
                <Image
                  className="more-services-img"
                  src="./img/knowledgebase-img.svg"
                  width={336}
                  height={212}
                  alt="knowledgebase-img"
                />
              </div>
            </div>
            <div className="d-flex flex-column gap-3 justify-content-between h-100">
              <div className="">
                <h4 className="mb-3 c-fs-3">
                Manage your help docs and articles
                </h4>
                <p className="c-fs-4">
                Do not let your customers wait for simple solutions. Give them instant access to the self-service library of information.
                </p>
              </div>
                <div className="d-flex align-items-center justify-content-between c-fs-3 c-fw-sb text-dark">
                  <span>Learn more</span>
                  <MdKeyboardArrowRight />
                </div>
            </div>
              </a>
              <a href="https://msg91.com/help/all-you-need-to-know-about-files-option-of-msg91" className=" text-dark col-12 col-md-4 p-4 d-flex flex-column flex-sm-row flex-md-column gap-3 b-right-1  more-services">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <span className="me-3">
                  <Image
                    src="./img/icon/filehosting.svg"
                    width={36}
                    height={36}
                    alt="File Hosting"
                  />
                </span>
                <span className="c-fs-2 c-head">File Hosting</span>
              </div>
              <div className="">
                <Image
                  className="more-services-img"
                  src="./img/file-hosting-img.svg"
                  width={336}
                  height={212}
                  alt="filehosting-img"
                />
              </div>
            </div>
            <div className="d-flex flex-column gap-3 justify-content-between h-100">
              <div className="">
                <h4 className="mb-3 c-fs-3">
                Simple and secured file storage 
                </h4>
                <p className="c-fs-4">
                A central hub for online file storage, sharing and syncing. Store all your files safely using powerful, reliable and easy-to-use cloud storage.
                </p>
              </div>
              
                <div className="d-flex align-items-center justify-content-between c-fs-3 c-fw-sb text-dark">
                  <span>Learn more</span>
                  <MdKeyboardArrowRight />
                </div>
             
            </div>
          </a>
        </div>
      </div>

      <div className="container  my-80">
        <h2 className="sub-heading c-head">Customer Success</h2>
        <h3 className="small-heading c-head">Powered by MSG91</h3>
        <div className="d-flex col-12 flex-column flex-sm-row gap-4 my-4">
          <a 
          href="/case-studies/milkbasket"
          className="col-12 col-md-8 col-sm-8 col-lg-6 c-hover c-hover-bg-grey text-dark">
            <Image
              className="milkbasket-client-img "
              src="/img/milkbasket-client-img.png"
              width={580}
              height={314}
              alt="milkbasket-client-img"
            />
            <div className="c-fs-3 p-3 d-none d-sm-block">
              <p className="pe-2 ">
              Milkbasket sends regular updates to its customers by offering proactive support and recommendations
              </p>
              <div
                className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3"
                
              >
                <span className="me-3 ">Learn more</span>
                <MdKeyboardArrowRight />
              </div>
            </div>
          </a>
          <div className="col-12 col-sm-4 col-md-4 col-lg-6 d-flex flex-sm-column flex-row gap-2 gap-sm-3 gap-md-4">
            <a 
            href="/case-studies/unacademy" 
            className="c-hover d-flex align-items-center col-6 col-sm-12 c-hover-bg-grey text-dark">
              <Image
                className="secc-client-img col-12 col-lg-4"
                src="/img/unacademy-client-img.png"
                width={220}
                height={220}
                alt="secc-client-img"
              />
              <div className=" d-none d-lg-block c-fs-3 p-3">
                <p className="pe-2">
                Unacademy using omnichannel keeps its audience engaged and nurtured with personalised campaigns
                </p>
                <div
                  className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3"
                  
                >
                  <span className="me-3 ">Learn more</span>
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </a>
            <a 
             href="/case-studies/ixigo"
             className="c-hover d-flex align-items-center col-6 col-sm-12 c-hover-bg-grey text-dark">
              <Image
                className="secc-client-img col-12 col-lg-4 "
                src="/img/ixigo-client-img.png"
                width={220}
                height={220}
                alt="secc-client-img"
              />
              <div className="d-none d-lg-block c-fs-3 p-3">
                <p className="pe-2">
                Ixigo engages and updates its audience through multichannel communication across messaging, email and WhatsApp
                </p>
                <div
                  className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3"
                 
                >
                  <span className="me-3 ">Learn more</span>
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Seo path={path} pageData={"index"} />


      <PreFooter />
    </>
  );
};
export default indexComp;
