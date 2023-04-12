import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const mahindra = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/Mahindra.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Services (Automobile) </span>
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
              <h5 className="sub-heading py-5">Mahindra & Mahindra Automotive Division keeps their customers updated with SMS via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3"><a href="https://www.withyouhamesha.com/default.aspx">Mahindra & Mahindra Automotive Division (AD)</a> is the automobile unit of the Mahindra Group. With the vision to help their customers manage their cars efficiently by their top-class car services, and to ensure it happens in time, Mahindra & Mahindra AD has been rigorously working on sending reminders and arranging best car services for their customer’s welfare.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like booking details, offers and updates for building a strong customer relationship, a communication channel targeting wide reach for mass audience (customers) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">Mahindra & Mahindra AD is managing their operations by their website withyouhamesha and customer communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">Upon the <a href="#"> Sign up </a> the customer receives an <a href="#"> Account activation code along with login credentials </a> , making it secured.</li>
          <li className="c-fs-3 mt-3">For <a href="#"> every login </a> , the customer receives an <a href="#"> OTP SMS </a> , making it a secured sign in everytime for the customer. </li>
          <li className="c-fs-3 mt-3">Everytime when a service due date is approaching, the customer gets a reminder with the <a href="#"> Service Reminder </a> SMS. </li>
        </ul>
        <span className="c-fs-3">This way Mahindra & Mahindra AD has been able to establish and maintain an effective communication with Customers via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the customer gets regular updates and reminders for every service related to their car via a secured channel, making the operations reliable and seamless. Moreover, the secured log in results in a better rapport with the customer and increase in sales.</span>
      </div>
      <Footer />
    </>
  );
};

export default mahindra;
