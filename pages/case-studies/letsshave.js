import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const letsshave = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/letsshave.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">E-commerce (Shaving and Grooming Accessories Retailer) </span>
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
              <h5 className="sub-heading py-5">JLetsShave updates customers of their orders and offers with SMS via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3">LetsShave is an E-commerce <a href="https://www.letsshave.com/"> website </a> which sells shaving accessories manufactured by them. With the vision to offer their customers with quality grooming supplies at their doorsteps, LetsShave has partnered with one of the talented pioneers of razor industry, Dorco. Dorco has been manufacturing world’s finest blades since 1955. Today, they are serving over 100 million people who enjoy the comfortable shave and look their best in more than 130 countries around the world. To ensure a seamless and efficient service, LetsShave has been rigorously working on sending the order updates for their customer’s satisfaction.

</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like booking details, offers and updates for building a strong customer relationship, a communication channel targeting wide reach for mass audience (customers) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">LetsShave is managing their operations by its website http://www.letsshave.com and customer communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">Once the customer <a href="#"> makes an order </a> , the customer receives an <a href="#"> Order Confirmation SMS. </a></li>
          <li className="c-fs-3 mt-1">Once the order gets delivered, the customer receives an <a href="#"> Order Delivery SMS. </a></li>
          <li className="c-fs-3 mt-1">If the order gets cancelled, the customer receives an <a href="#"> Order Cancellation SMS. </a></li>
          <li className="c-fs-3 mt-1">Customer receives SMS notifications carrying short URLs having informations of all the <a href="#"> Ongoing Offers and Updates. </a></li>
        </ul>
        <span className="c-fs-3">This way LetsShave had been able to establish and maintain an effective communication with Customers via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the customer gets regular updates for their orders and ongoing offers via a secured channel, making the operations reliable and seamless, which results in a better rapport with the customer and increase in sales.</span>     
      </div>
      <Footer />
    </>
  );
};

export default letsshave;
