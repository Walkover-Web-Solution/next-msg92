import TrustedBy from "components/trustedby";
import { MdDone } from "react-icons/md";
import React, { useRef } from 'react';

const IntPage = () => {
  const videoRef = useRef();
  // const router = useRouter();
  // var browserPath = router.asPath;
  // var intpage = browserPath.split("/")[2];
  // console.log(intpage);
  // var intData = data?.[intpage];
  // console.log(intData);

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      videoRef.current.controls = true;
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <div className="int-page-head tally d-flex py-3">
        <div className="container d-flex align-items-center gap-4">
          <img src="/img/integrations/tally_logo_white.svg" className="logo" alt="tally logo"/>
          <div>
            <h1 className="sub-heading">Tally Integration</h1>
            <h2 className="c-fs-4 mt-2">
              Send invoices and recover dues
            </h2>
          </div>
        </div>
      </div>
      <div className="product-banner-wrp">
        <div className="container text-center overflow-hidden">
          <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
            <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
              <h1 className={`heading page-title`}>
                Send Invoices on Whatsapp and Email via Tally
              </h1>
            </div>
            <div className="p-3">
              <p className="c-fs-4 w-md-75 w-100 mx-auto fw-normal">
                Automate your financial processes effortlessly with Tally. Streamline invoicing, effortlessly share ledgers, and efficiently recover outstanding amounts, all within the Tally platform.
              </p>
              <a
                href="https://msg91.com/help/MSG91/integrate-tally-with-msg91"
                className="btn btn-dark btn-lg c-fs-2 my-4"
                target="_blank"
              >
                Get The Plugin
              </a>
              <button className="btn btn-outling-dark c-fs-2 ms-3" data-bs-toggle="modal" data-bs-target="#plugin-modal">Schedule a meeting</button>
              {/* <h2 className="c-fs-4 w-md-75 w-100 mx-auto fw-normal">
              Effortlessly integrate SMS, Email, RCS, Voice, WhatsApp with Firebase / Firestore
              </h2> */}
            </div>
          </div>
          {/* <img
            src="/img/integrations/code-img-int.svg"
            className="img-fluid product-page-img mx-auto"
            alt="#"
          /> */}
        </div>
      </div>
      <div className="product-banner-wrp">
        <div className="d-flex justify-content-center tally-video my-5">
          <video
            ref={videoRef}
            onClick={handleVideoClick}
            height={600} preload="none" poster="https://storage.googleapis.com/production-file-system/293020/gkacnbuk">
            <source src="https://storage.googleapis.com/production-file-system/293020/yzeokyfz" type="video/mp4" /> 
            <track kind="captions" srclang="en" label="english_captions"/>       
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="container d-flex flex-column justify-content-center my-5 py-4 text-center">
        <h2 className="sub-heading c-head">
          Top features of this powerful integration
        </h2>
        <div className="row my-4 gap-5">
          <div className=" d-flex col flex-column align-items-center  gap-2 p-5 int-feature-box ">
            <MdDone className="sub-heading col-int tally" />
            <h3>Automatically send voucher via Whatsapp/Email/SMS</h3>
          </div>
          <div className=" d-flex col flex-column align-items-center  gap-2 p-5 int-feature-box ">
            <MdDone className="sub-heading col-int tally" />
            <h3>Update and re-share invoices</h3>
          </div>
          <div className=" d-flex col flex-column align-items-center  gap-2 p-5 int-feature-box ">
            <MdDone className="sub-heading col-int tally" />
            <h3>Share ledgers on Whatsapp and recover dues</h3>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center text-center justify-content-center">
        <TrustedBy />
      </div>
      <div className="c-bg-grey py-5  d-flex flex-column justify-content-sm-center align-items-center">
        <div className="py-4  container text-center d-md-flex justify-content-sm-between align-items-center flex-xl-row flex-lg-column flex-sm-column flex-md-column">
          <span className="pro-heading c-head">
            Customize your workflow to fit your specific requirements
          </span>
          <div className="mt-3 mt-xxl-0 d-flex flex-wrap justify-content-center gap-3">
            <a
              href="https://msg91.com/help/MSG91/integrate-tally-with-msg91"
              className="btn px-4 py-3 btn-outline-dark c-fs-4 "
              target="_blank"
            >
              Get The Plugin
            </a>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column flex-sm-row align-items-center  gap-5 my-5">
        <p className="c-fs-2">
          Supercharge your Tally Prime experience with the MSG91 Tally Prime Plugin, unlocking unparalleled communication and automation capabilities. Save time, enhance communication, and gain precise control over financial transactions for streamlined invoicing and ledger management today.
        </p>
        <img className="col-12 col-sm-6" src="/img/integrations/tally-graphics.svg" alt="tally-graphics image"/>
      </div>
      <div className="container my-5">
        <h1 className="sub-heading c-head mb-3">
        The MSG91 Tally Prime Plugin Offers
        </h1>
        <div className="d-flex align-items-center gap-2 my-3">
          <MdDone className="c-fs-1 col-int tally" />
          <p className="c-fs-2">Tailored Voucher Flows</p>
        </div>
        <div className="d-flex align-items-center gap-2 my-3">
          <MdDone className="c-fs-1 col-int tally" />
          <p className="c-fs-2">Effortless Voucher Resending via. Email or WhatsApp</p>
        </div>
        <div className="d-flex align-items-center gap-2 my-3">
          <MdDone className="c-fs-1 col-int tally" />
          <p className="c-fs-2">Send In-Depth Outstanding Balance and Ledger Details</p>
        </div>
      </div>
      
      <div className="d-flex flex-column flex-md-row container align-items-center justify-content-between my-5">
        <h2 className="c-head c-fs-1 col-12 col-md-8 text-center text-md-start">
        Enhance your communication capabilities and automate your engagement tasks
        </h2>
          <a
            href="https://msg91.com/help/MSG91/integrate-tally-with-msg91"
            className="btn btn-dark btn-lg c-fs-2 my-4"
            target="_blank"
          >
            Get the MSG91 Tally plugin
          </a>
      </div>
    </>
  );
};
export default IntPage;
