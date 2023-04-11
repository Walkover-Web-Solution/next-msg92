import { useRouter } from "next/router";
import { MdKeyboardArrowRight } from "react-icons/md";
import TrustedBy from "@/components/trustedby";
import Image from "next/image";
const indexComp = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <>
      <div className="container d-flex flex-column c-gap-1 align-items-center text-center mt-80">
        <h1 className="heading text-dark col-10 col-xxl-8 col-xl-8 ">
          Cloud Communication platform for all your ideas!
        </h1>
        <h3 className="small-heading text-dark">
          Secure and robust APIs for SMS, Email, Voice, Authentication and more.
        </h3>
        <a className="">
          <button className="btn btn-dark small-heading c-fw-sb ls-3 btn-lg">
            Get Started
          </button>
        </a>
        <TrustedBy />
      </div>
      <div className="section product-sec d-flex my-5">
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="small-heading c-head">Campaign</span>
            </div>
            <div className="product-head-img caimpaign-pro"></div>
          </div>
          <div className="product-content pro-alt p-4 d-flex flex-column justify-content-center gap-4">
            <p className="c-fs-3 text-white">
              Empower your employees, Support your customers.
            </p>
            <a href="/campaign" target="">
              <button className="c-fs-3 pro-btn justify-content-between d-flex align-items-center px-3 py-2">
                <span>
                  <img
                    src="./img/icon/campaign.svg"
                    className="pro-sec-ico me-3"
                  />
                  <span className="">Campaign</span>
                </span>
                <MdKeyboardArrowRight />
              </button>
            </a>
          </div>
        </div>
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="small-heading c-head">Conversation</span>
            </div>
            <div className="product-head-img hello-pro"></div>
          </div>
          <div className="product-content  p-4 d-flex flex-column justify-content-center gap-4">
            <p className="c-fs-3 text-white">
              Boost audience engagement through smart Platform.
            </p>
            <a href="/hello" target="">
              <button className="c-fs-3 pro-btn justify-content-between d-flex align-items-center px-3 py-2">
                <span>
                  <img
                    src="./img/icon/hello.svg"
                    className="pro-sec-ico me-3"
                  />
                  <span className="">Hello</span>
                </span>
                <MdKeyboardArrowRight />
              </button>
            </a>
          </div>
        </div>
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="small-heading c-head">Segmentation</span>
            </div>
            <div className="product-head-img segmento-pro"></div>
          </div>
          <div className="product-content pro-alt p-4 d-flex flex-column justify-content-center gap-4">
            <p className="c-fs-3 text-white">
              Segment your customers according to their action or event.{" "}
            </p>
            <a href="/segmento" target="">
              <button className="c-fs-3 pro-btn justify-content-between d-flex align-items-center px-3 py-2">
                <span>
                  <img
                    src="./img/icon/segmento.svg"
                    className="pro-sec-ico me-3"
                  />
                  <span className="">Segmento</span>
                </span>
                <MdKeyboardArrowRight />
              </button>
            </a>
          </div>
        </div>
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="small-heading c-head">OTP</span>
            </div>
            <div className="product-head-img otp-pro"></div>
          </div>
          <div className="product-content p-4 d-flex flex-column justify-content-center gap-4">
            <p className="c-fs-3 text-white">
              Quick and reliable authentication by 2FA using multiple channels.
            </p>
            <a href="/otp" target="">
              <button className="c-fs-3 pro-btn justify-content-between d-flex align-items-center px-3 py-2">
                <span>
                  <img src="./img/icon/otp.svg" className="pro-sec-ico me-3" />
                  <span className="">OTP</span>
                </span>
                <MdKeyboardArrowRight />
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <h2 className="sub-heading c-head mb-2">Communication Channels</h2>
        <p className="c-fs-2 w-75">
          Empower conversations with best-in-class communication API.
          Full-featured APIs for developers & businesses to connect and engage
          their customers globally.
        </p>
        <div className=" mt-4 d-flex gap-5 flex-wrap">
          <a
            href="/sms"
            className="chn-btn d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <span>
              <Image
                className="me-2"
                src="./img/icon/sms.svg"
                width={40}
                height={40}
                alt="cannels"
              />
              <span className="">SMS</span>
            </span>
            <MdKeyboardArrowRight />
          </a>
          <a
            href="/email"
            className="chn-btn d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <span>
              <Image
                className="me-2"
                src="./img/icon/email.svg"
                width={40}
                height={40}
                alt="cannels"
              />
              <span className="">Email</span>
            </span>
            <MdKeyboardArrowRight />
          </a>
          <a
            href="/whatsapp"
            className="chn-btn d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <span>
              <Image
                className="me-2"
                src="./img/icon/whatsapp.svg"
                width={40}
                height={40}
                alt="cannels"
              />
              <span className="">Whatsapp</span>
            </span>
            <MdKeyboardArrowRight />
          </a>
          <a
            href="/telegram"
            className="chn-btn d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <span>
              <Image
                className="me-2"
                src="./img/icon/telegram.svg"
                width={40}
                height={40}
                alt="telegram"
              />
              <span className="">Telegram</span>
            </span>
            <MdKeyboardArrowRight />
          </a>
          <a
            href="/voice"
            className="chn-btn d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <span>
              <Image
                className="me-2"
                src="./img/icon/voice.svg"
                width={40}
                height={40}
                alt="voice"
              />
              <span className="">Voice</span>
            </span>
            <MdKeyboardArrowRight />
          </a>
          <a
            href="/rcs"
            className="chn-btn d-flex align-items-center justify-content-between p-3 text-dark c-fs-2"
          >
            <span>
              <Image
                className="me-2"
                src="./img/icon/rcs.svg"
                width={40}
                height={40}
                alt="rcs"
              />
              <span className="">RCS</span>
            </span>
            <MdKeyboardArrowRight />
          </a>
        </div>
      </div>
      <div className="section c-bg-grey stats-sec align-items-center">
        <div className="container h-100 d-flex align-items-center">
          <div className="col-3 d-flex flex-column gap-2">
            <h2 className="c-fs-1 c-fw-b">2.5 Billion+</h2>
            <h4 className="c-fs-3">
              API calls
              <br /> per month
            </h4>
          </div>
          <div className="col-3 d-flex flex-column gap-2">
            <h2 className="c-fs-1 c-fw-b">1.6 Billion+</h2>
            <h4 className="c-fs-3">
              SMS Sent
              <br /> per month
            </h4>
          </div>
          <div className="col-3 d-flex flex-column gap-2">
            <h2 className="c-fs-1 c-fw-b">1 Billion+</h2>
            <h4 className="c-fs-3">
              OTP Sent
              <br /> per month
            </h4>
          </div>
          <div className="col-3 d-flex flex-column gap-2">
            <h2 className="c-fs-1 c-fw-b">1 Billion+</h2>
            <h4 className="c-fs-3">
              Email Sent
              <br /> per month
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default indexComp;
