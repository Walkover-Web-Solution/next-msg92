import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const sankalp = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/sankalp.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">NGO (Blood Donation) </span>
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
              <h5 className="sub-heading py-5">Sankalp India Foundation informs blood donors and recipients with SMS via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3"><a href="https://www.sankalpindia.net/">Sankalp India Foundation</a> is a Bengaluru based NGO which works in the fields of Blood Donation, Thalassemia cure and management . With the vision to help people requiring blood units with proper supply of blood by conducting blood donation camps and creating awareness, Sankalp India Foundation has been rigorously working on coordinating with the donors and patients for the their welfare.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like booking details, offers and updates for building a strong customer relationship, a communication channel targeting wide reach for mass audience (customers) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">Sankalp India Foundation is managing their operations and communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the volunteers and patients to build communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">Volunteers are <a href="#"> informed about the blood donation camps and drives </a> via SMS containing details of the drive.</li>
          <li className="c-fs-3 mt-1">Kin of the patients are sent <a href="#"> details of the Blood Banks which have the required blood group units </a> via SMS.</li>
          <li className="c-fs-3 mt-1">SMS regarding <a href="#"> blood units requirements in emergency and the details </a> are sent to volunteers having the required blood group.</li>
          <li className="c-fs-3 mt-1"><a href="#"> Blood donation requests for Bombay Blood Group along with details</a> are sent to the registered Bombay blood Group donors via SMS.</li>
        </ul>
        <span className="c-fs-3">This way Sankalp India Foundation has been able to establish and maintain an effective coordination with donors and patients via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the patient gets details of blood banks or donors via secured channel, making the operations reliable and seamless. Moreover, the updates of camps and emergencies sent to donors results in a better coordination and resulting in timely procurement of required blood units saving lives.</span>
      </div>
      <Footer />
    </>
  );
};

export default sankalp;
