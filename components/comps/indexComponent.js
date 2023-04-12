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
      <div className="container my-5 more-services-sec">
        <h2 className="sub-heading c-head">More Services</h2>
        <div className="d-flex my-5">
          <div className="col-4 p-4 d-flex flex-column gap-3 b-right-1 more-services">
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
            <div className="">
              <h4 className="mb-3 c-fs-3">Make a long story short</h4>
              <p className="c-fs-4">
                Track your success, one click at a time. Using our URL Shrtnr
                App is great way to make looong, wild links into something more
                manageable and memorable.
              </p>
            </div>
            <a href="#">
              <div className="d-flex align-items-center justify-content-between c-fs-3 c-fw-b text-dark">
                <span>Learn more</span>
                <MdKeyboardArrowRight />
              </div>
            </a>
          </div>
          <div className="col-4 p-4 d-flex flex-column gap-3 b-right-1 more-services">
            <div className="d-flex align-items-center">
              <span className="me-3">
                <Image
                  src="./img/icon/knowledgebase.svg"
                  width={36}
                  height={36}
                  alt="knowledgebase"
                />
              </span>
              <span className="c-fs-2 c-head">Knowledgebase</span>
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
            <div className="">
              <h4 className="mb-3 c-fs-3">
                Manage your help docs and articles
              </h4>
              <p className="c-fs-4">
                We also offer our easy FAQ feature where your customers aren’t
                stuck with a question ever again, providing them with instant
                answers.
              </p>
            </div>
            <a href="#">
              <div className="d-flex align-items-center justify-content-between c-fs-3 c-fw-sb text-dark">
                <span>Learn more</span>
                <MdKeyboardArrowRight />
              </div>
            </a>
          </div>
          <div className="col-4 p-4 d-flex flex-column gap-3 more-services">
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
            <div className="">
              <h4 className="mb-3 c-fs-3">More storage, More possibilities</h4>
              <p className="c-fs-4">
                Track your success, one click at a time. Using our URL Shrtnr
                App is great way to make looong, wild links into something more
                manageable and memorable.
              </p>
            </div>
            <a href="#">
              <div className="d-flex align-items-center justify-content-between c-fs-3 c-fw-sb text-dark">
                <span>Learn more</span>
                <MdKeyboardArrowRight />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <h2 className="sub-heading c-head">Our Clint Stories</h2>
        <div className="d-flex col-12 gap-4 my-4">
          <div className="col-6 c-hover ">
            <Image
              className="milkbasket-clint-img "
              src="/img/milkbasket-clint-img.png"
              width={580}
              height={314}
              alt="milkbasket-clint-img"
            />
            <div className="c-fs-3 p-3">
              <p className="pe-2">
                Milkbasket sends regular updates to their customers’ via MSG91
                multi-channel APIs.
              </p>
              <a
                className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3"
                href="/clint-stories/milkbasket"
              >
                <span className="me-3 ">Learn more</span>
                <MdKeyboardArrowRight />
              </a>
            </div>
          </div>
          <div className="col-6 d-flex flex-column gap-4">
            <div className="c-hover d-flex align-items-center">
              <Image
                className="secc-clint-img "
                src="/img/unacademy-clint-img.png"
                width={220}
                height={220}
                alt="secc-clint-img"
              />
              <div className="c-fs-3 p-3">
                <p className="pe-2">
                  Unacademy ensures seamless communication using SMS via MSG91.
                </p>
                <a
                  className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3"
                  href="/clint-stories/milkbasket"
                >
                  <span className="me-3 ">Learn more</span>
                  <MdKeyboardArrowRight />
                </a>
              </div>
            </div>
            <div className="c-hover d-flex align-items-center">
              <Image
                className="secc-clint-img "
                src="/img/ixigo-clint-img.png"
                width={220}
                height={220}
                alt="secc-clint-img"
              />
              <div className="c-fs-3 p-3">
                <p className="pe-2">
                Ixigo ensures seamless communication using SMS via MSG91.
                </p>
                <a
                  className="d-flex align-items-center justify-content-start text-dark c-fw-sb mt-3"
                  href="/clint-stories/milkbasket"
                >
                  <span className="me-3 ">Learn more</span>
                  <MdKeyboardArrowRight />
                </a>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};
export default indexComp;
