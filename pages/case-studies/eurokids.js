import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const eurokids = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/Eurokids.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Schools Chain </span>
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
              <h5 className="sub-heading py-5">Eurokids updates parents of their children’s school activities via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3"><a href="https://play.google.com/store/apps/details?id=com.ionicframework.eurokids149799&hl=en_IN&pli=1">Euro Kids</a> is a chain of Schools and Pre-schools across different cities in India. With the vision to offer their students with quality education and ensure their safety and overall development, Euro Kids has been rigorously working on sending the students’ updates for their parent’s satisfaction.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like booking details, offers and updates for building a strong customer relationship, a communication channel targeting wide reach for mass audience (customers) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">Euro Kids is managing their operations by its Eurokids Buddy App and communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as:</span>
        <ul>
          <li className="c-fs-3 mt-3">Parents receive updates about the <a href="#">class timings</a> via SMS.</li>
          <li className="c-fs-3 mt-1">Parents receive updates about the <a href="#">assignments and assessment details</a> , via SMS.</li>
          <li className="c-fs-3 mt-1">Parents receive updates about the <a href="#">upcoming holidays</a> , via SMS.</li>
          <li className="c-fs-3 mt-1">Parents get notified of the <a href="#">conveyance</a> via SMS.</li>
          <li className="c-fs-3 mt-1">Other <a href="#">information, updates, and fees payment reminders</a></li>
        </ul>
        <span className="c-fs-3">This way Euro Kids has been able to establish and maintain an effective communication with the parents of their students via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the parents get regular updates for their children’s ongoing school activities and other information via a secured channel, making the operations reliable and seamless, which results in a better rapport with the parents ensuring the betterment of their students.</span>
      </div>
      <Footer />
    </>
  );
};

export default eurokids;
