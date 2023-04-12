import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const zing = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/zing.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Services (HR-Tech CRM) </span>
            </div>
            <div className="mb-1">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Purpose</span>
            </div>
            <div className="mb-4">
              <span className="c-fs-4 mb-1 col-otp">Communication APIs</span>
            </div>
            <div className="mb-1">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Features in use</span>
            </div>
            <div className="mb-4">
              <span className="c-fs-4 mb-1 col-otp">Programmable SMS</span>
            </div>
          </div>
        </div>
        <div className="row col-md-8 col-sm-12 d-flex px-5 ms-3">
          <div className="container p-5">
            <div className="py-5">
              <h5 className="sub-heading py-5">ZingHR communicates with the potential candidates using SMS via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3"><a href="https://www.zinghr.com/"> ZingHR </a> provides HR CRM services to various companies, where they communicate with the potential candidates. With the vision to help their clients get seamless services in hiring, ZingHR has been rigorously working on the operations to the behest of their clients.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like vacancies, interview calls details and selection update to hire a strong workforce for the clients, a real-time communication channel targeting wide reach for mass audience (candidates) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">ZingHR is managing their operations through their <a href="https://www.zinghr.com/"> website </a> and business communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the candidates at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">Sends SMS to customers on <a href="#"> on-boarding. </a></li>
          <li className="c-fs-3 mt-1">Sends SMS with <a href="#"> app link on on-boarding </a> of new candidates.</li>
          <li className="c-fs-3 mt-1">Candidates are shared <a href="#"> interview schedule details </a> via SMS.</li>
        </ul>
        <span className="c-fs-3">This way ZingHR has been able to establish and maintain an effective communication with candidates via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the candidates gets regular updates for every interview scheduled via secured channel making the hiring operations reliable and seamless resulting in a better rapport with the customer and better hiring.

</span>     
      </div>
      <Footer />
    </>
  );
};

export default zing;
