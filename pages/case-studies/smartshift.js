import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const smartshift = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/Smartshift.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Logistics Services </span>
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
              <h5 className="sub-heading py-5">Smart Shift ensures a hassle-free shift via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3"> <a href="https://smartshift.in/">Smart Shift</a> is the logistics service unit of the Mahindra Group where the logistics are transferred across different locations in a hassle-free manner. With the vision to help the customers shift or send logistics across different locations efficiently, Smart Shift has been rigorously working on the logistics services for the customer’s welfare.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like booking details, offers and updates for building a strong customer relationship, a communication channel targeting wide reach for mass audience (customers) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">Smart Shift is managing their operations and customer communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to built communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">As soon as the customer signs up, they receive the <a href="#">Verification code OTP </a> via SMS.</li>
          <li className="c-fs-3 mt-3">Every time the customer <a href="#"> makes a new shift </a> , they receives an OTP along with the billing details via SMS. This OTP has to be shared with the logistics operator in order to start the shift.</li>
        </ul>
        <span className="c-fs-3">This way Smart Shift has been able to establish and maintain an effective communication with Customers via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the customer gets regular updates for every event related to their shift via secured channel making the operations reliable and seamless. Moreover, the secured sign up strengthens bond with customers resulting in a better rapport with the customer and increase in sales.</span>
      </div>
      <Footer />
    </>
  );
};

export default smartshift;
