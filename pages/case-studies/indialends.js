import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const indialends = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/indialends.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Fintech (Loans) </span>
            </div>
            <div className="mb-1">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Purpose</span>
            </div>
            <div className="mb-4">
              <span className="c-fs-4 mb-1 col-otp">Communication APIs, Number Verification</span>
            </div>
            <div className="mb-1">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Features in use</span>
            </div>
            <div className="mb-4">
              <span className="c-fs-4 mb-1 col-otp">Programmable SMS, Send OTP</span>
            </div>
          </div>
        </div>
        <div className="row col-md-8 col-sm-12 d-flex px-5 ms-3">
          <div className="container p-5">
            <div className="py-5">
              <h5 className="sub-heading py-5">Indialends ensures seamless operations for their customers’ using MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3"><a href="https://indialends.com/"> Indialends </a>is a personal loan providing Fintech platform. With the vision to offer their customers a seamless loan approval, and to ensure it happens efficiently, Indialends has been rigorously working on sending the updates and information for their customers security and satisfaction.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like vacancies, interview calls details and selection update to hire a strong workforce for the clients, a real-time communication channel targeting wide reach for mass audience (candidates) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">Indialends is managing their operations by its website https://indialends.com and customer communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">Sends <a href="#"> OTP on signup/registration </a> via SMS.</li>
          <li className="c-fs-3 mt-1">Sends <a href="#"> OTP for mobile number verification </a> via SMS.</li>
          <li className="c-fs-3 mt-1">Sends <a href="#"> OTP for secured login </a> via SMS.</li>
          <li className="c-fs-3 mt-1">Updates of <a href="#"> loan approval </a> and <a href="#"> further process details </a> are sent to customers via SMS.</li>
          <li className="c-fs-3 mt-1">Notifies <a href="#"> technical updates </a> to team within the internal communication, via SMS.</li>
          <li className="c-fs-3 mt-1">Alerts Customers via SMS, regarding <a href="#"> paying outstanding loan amount. </a></li>
          <li className="c-fs-3 mt-1">Sends <a href="#"> download link and details of app </a> via SMS.</li>
        </ul>
        <span className="c-fs-3">This way Indialends has been able to update and secure its Customers regularly using an effective communication via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the customer gets updates SMS via a secured channel, making the operations secure, reliable and seamless, which results in a better rapport with the customer and increase in sales.

</span>     
      </div>
      <Footer />
    </>
  );
};

export default indialends;
