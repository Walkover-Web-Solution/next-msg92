import Header from "@/components/header";
import Notification from "@/components/notification";
import HeadTag from "../head";
import TrustedSec from "@/components/trusted_by";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";

const talkcharge = () => {
  return (
    <>
      <HeadTag />
      <Notification />
      <Header />
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/talkcharge_1.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">E-commerce </span>
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
              <h5 className="sub-heading py-5">TalkCharge updates their customers’ regularly via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">About</h1>
        <span className="c-fs-3"><a href="https://milkbasket.com/">TalkCharge</a> is a recharge wallet and E-commerce platform. With the vision to offer their customers secured wallet, and to ensure it happens efficiently, TalkCharge has been rigorously working on sending the updates and information for their customers security and satisfaction.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Problem</h1>
        <span className="c-fs-3">A well-established communication channel with customers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a wide range of customer base without a robust and secure communication channel is a challenge. Thus to convey important information like booking details, offers and updates for building a strong customer relationship, a communication channel targeting wide reach for mass audience (customers) is required.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Solution</h1>
        <span className="c-fs-3">TalkCharge is managing their operations by its website https://talkcharge.com and customer communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">Sends updates regarding <a href="#">amount added into wallet.</a></li>
          <li className="c-fs-3 mt-1">Sends <a href="#">Voucher codes</a> to customers via SMS.</li>
          <li className="c-fs-3 mt-1">Updates of <a href="#">cashback credits</a> and <a href="#">refunds credit </a>are sent via SMS.</li>
          <li className="c-fs-3 mt-1">Updates of <a href="#">unsuccessful orders and their refund</a> is sent via SMS.</li>
          <li className="c-fs-3 mt-1">Customers receive <a href="#">offers and updates </a> via SMS.</li>
        </ul>
        <span className="c-fs-3">This way TalkCharge has been able to update its Customers regularly using an effective communication via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Benefit</h1>
        <span className="c-fs-3">As a result, the customer gets updates SMS via a secured channel, making the operations secure, reliable and seamless, which results in a better rapport with the customer and increase in sales.</span>
      </div>
      <Footer />
    </>
  );
};

export default talkcharge;
