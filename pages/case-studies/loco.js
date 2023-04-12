import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const loco = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/loco.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Online Trivia Game </span>
            </div>
            <div className="mb-1">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Purpose</span>
            </div>
            <div className="mb-4">
              <span className="c-fs-4 mb-1 col-otp">Number Verification</span>
            </div>
            <div className="mb-1">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Features in use</span>
            </div>
            <div className="mb-4">
              <span className="c-fs-4 mb-1 col-otp">Send OTP</span>
            </div>
          </div>
        </div>
        <div className="row col-md-8 col-sm-12 d-flex px-5 ms-3">
          <div className="container p-5">
            <div className="py-5">
              <h5 className="sub-heading py-5">Loco safeguards their customers’ accounts with OTP SMS via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3"><a href="https://play.google.com/store/apps/details?id=com.showtimeapp&hl=en">Loco</a>  is a live trivia game linked to Paytm account, where the users play a live quiz and receives the prize money into their Paytm accounts upon winning . With the vision to offer their customers with the best experience of live trivia game, and to ensure it happens securely, Loco has been working on it by sending the OTP upon login and Paytm account change for their customer’s satisfaction.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like booking details, offers and updates for building a strong customer relationship, a communication channel targeting wide reach for mass audience (customers) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">Loco is managing their operations by its app efficiently which is safeguarded with OTP SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as:</span>
        <ul>
          <li className="c-fs-3 mt-3">Customer receives an OTP for verification during every <a href="#"> Login </a> making it secure.</li>
          <li className="c-fs-3 mt-3">Customer receives <a href="#"> Verification OTP SMS </a> when they request to change their <a href="#"> Paytm account. </a></li>
        </ul>
        <span className="c-fs-3">This way Loco has been able to establish and maintain secure operations for their Customers via SMS using MSG91 OTP API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the customer gets OTPs on every login and also for changing the Paytm account making it secure via a secured channel, making the operations reliable and seamless, which results in a better rapport with the customer and increase in the number of users.</span>
      </div>
      <Footer />
    </>
  );
};

export default loco;
