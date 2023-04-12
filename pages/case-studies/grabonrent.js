import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const grabonrent = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/Grabonrent.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Services (Online Rental Services) </span>
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
              <h5 className="sub-heading py-5">GrabOnRent updates customers of their orders and offers with SMS via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3">GrabOnRent is an online rental services <a href="https://www.grabonrent.com/"> website </a> which rents different lifestyle products such as furniture, bike and other accessories across Mumbai, Bengaluru, Hyderabad and Gurugram. To ensure a seamless and efficient service on time, GrabOnRent has been rigorously working in sending the order updates and other important information for their customer’s satisfaction.

</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">GrabOnRent is managing their operations by its app and website http://www.grabonrent.com, while the customer communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">LeadSquared is managing their operations by its website https://www.leadsquared.com/ and customer communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">For the  <a href="#"> Verification of GrabOnRent Account </a> , the customer receives a <a href="#"> Verification OTP SMS.</a></li>
          <li className="c-fs-3 mt-1">Once the customer <a href="#"> makes an order </a> , the customer receives an <a href="#"> Order Confirmation SMS. </a></li>
          <li className="c-fs-3 mt-1">Once the order gets delivered, the customer receives an <a href="#"> Order Delivery SMS. </a></li>
          <li className="c-fs-3 mt-1">If the <a href="#"> Order gets cancelled </a> , the customer receives an <a href="#"> Order Cancellation SMS. </a></li>
          <li className="c-fs-3 mt-1">Customer receives SMS notifications carrying short URLs having informations of all the <a href="#"> Ongoing Offers and Updates. </a></li>
          <li className="c-fs-3 mt-1">When the <a href="#"> customer’s call gets missed </a> , they get an SMS stating how could they contact back and they might get a call back sometime soon.</li>
          <li className="c-fs-3 mt-1">Customers receive SMS regarding  <a href="#"> Referral Program </a> , where they can refer GrabOnRent to their peers using the URL in the SMS and earn loyalty benefits.</li>
        </ul>
        <span className="c-fs-3">This way GrabOnRent has been able to establish and maintain an effective communication with Customers via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the customer gets regular updates for their orders and ongoing offers via a secured channel, making the operations reliable and seamless, which results in a better rapport with the customer and increase in sales.</span>     
      </div>
      <Footer />
    </>
  );
};

export default grabonrent;
