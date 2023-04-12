import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const saboro = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/Saboro.jpg"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">E-commerce (Milk Retailer) </span>
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
              <h5 className="sub-heading py-5">Mahindra Saboro sends order updates to its customers with SMS via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3">Mahindra <a href="http://www.saboromilk.in/"> Saboro </a>, is the milk retailing unit of the Mahindra Agri, which is the farm and agricultural unit of the Mahindra Group. With the vision to help the farmers improve their financials using modern technology and selling their higher quality produce at better markets, Saboro has been rigorously working in the agri-business for farmer’s welfare.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like booking details, offers and updates for building a strong customer relationship, a communication channel targeting wide reach for mass audience (customers) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">Mahindra Saboro is managing their operations and customer communication, efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to built communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">Upon the Sign up the customer receives an <a href="#"> OTP for the verification </a> , making it secured.</li>
          <li className="c-fs-3 mt-1">Once the customer makes an order, he/she receives an SMS for the  <a href="#"> Order Confirmation. </a></li>
          <li className="c-fs-3 mt-1">Upon the confirmation when the order is delivered, the customer gets notified with the  <a href="#"> Order Delivery SMS. </a></li>
          <li className="c-fs-3 mt-1">If the order is cancelled, then the customer gets notified for the  <a href="#"> Order Cancellation SMS. </a></li>
          <li className="c-fs-3 mt-1">Apart from the notifications regarding Orders, clients also receive  <a href="#"> Offers, Alerts and other information via SMS. </a></li>
        </ul>
        <span className="c-fs-3">This way Mahindra Saboro had been able to establish and maintain an effective communication with Customers via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the customer gets regular updates for every event related to their order via secured channel, making the operations reliable and seamless. Moreover, the offers and updates sent to customer results in a better rapport with the customer and increase in sales.</span>     
      </div>
      <Footer />
    </>
  );
};

export default saboro;
