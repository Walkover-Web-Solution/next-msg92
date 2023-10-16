import { useState } from "react";
import { MdCircle } from "react-icons/md";

const Insms = () => {
  const [showInsms, setShowInsms] = useState(false);

  const handleReadMore = () => {
    setShowInsms(!showInsms);
  };

  return (
    <>
      <div className={`container my-5 ${showInsms ? "insms" : ""}`}>
        <h1 className="pro-heading c-head">
          Supercharge Your Business with Reliable OTP SMS Services from MSG91
        </h1>
        <p className="c-fs-3 mt-3">
          Trusted OTP SMS Service Provider At MSG91, we understand the
          criticality of OTP (One-Time Password) authentication for your
          business. As a leading OTP SMS service provider, we offer seamless
          integration and secure delivery of OTPs to ensure enhanced security
          and user experience.
        </p>

        {showInsms && (
          <div className="insms-soc c-fs-3">
            <>
  <h2  >
    <span style={{ fontSize: "16pt" }}>
      <span  >
        <span  className="mt-4">
          <strong>Robust OTP Authentication API</strong>
        </span>
      </span>
    </span>
  </h2>
  <p  >
    <span  >
      <span  >
        <span  className="mt-4">
          Our OTP authentication API empowers businesses to easily implement
          two-factor authentication (2FA) and secure their applications. With
          our user-friendly API, you can effortlessly generate and send OTPs,
          enabling a layered security approach to protect your users' accounts.
        </span>
      </span>
    </span>
  </p>
  <p>&nbsp;</p>
  <h2  >
    <span style={{ fontSize: "16pt" }}>
      <span  >
        <span  className="mt-4">
          <strong>Seamless OTP SMS Gateway</strong>
        </span>
      </span>
    </span>
  </h2>
  <p>&nbsp;</p>
  <p  >
    <span  >
      <span  >
        <span  className="mt-4">With our advanced </span>
      </span>
    </span>
    <span  >
      <span  >
        <span  className="mt-4">
          <strong>OTP SMS gateway and </strong>
        </span>
      </span>
    </span>
    <a href="https://msg91.com/in/voice" style={{ textDecoration: "none" }}>
      <span style={{ fontSize: "11pt" }}>
        <span style={{ fontFamily: "Arial" }}>
          <span style={{ color: "#1155cc" }}>
            <strong>
              <u>voice call api</u>
            </strong>
          </span>
        </span>
      </span>
    </a>
    <span  >
      <span  >
        <span  className="mt-4">
          , you can rest assured that your OTPs will be delivered instantly and
          reliably. Our high-throughput infrastructure ensures that your OTPs
          reach their intended recipients without delays, providing a smooth and
          efficient user experience.
        </span>
      </span>
    </span>
  </p>
  <p>&nbsp;</p>
  <h2  >
    <span style={{ fontSize: "16pt" }}>
      <span  >
        <span  className="mt-4">
          <strong>API for OTP Verification</strong>
        </span>
      </span>
    </span>
  </h2>
  <p  >
    <span  >
      <span  >
        <span  className="mt-4">
          Streamline your OTP verification process with our powerful API. Our
          API enables quick and hassle-free OTP verification, allowing you to
          validate user identities, authorize transactions, and protect
          sensitive information with ease.
        </span>
      </span>
    </span>
  </p>
  <p>&nbsp;</p>
  <h2  >
    <span style={{ fontSize: "16pt" }}>
      <span  >
        <span  className="mt-4">
          <strong>Best OTP SMS Service Provider in India</strong>
        </span>
      </span>
    </span>
  </h2>
  <p  >
    <span  >
      <span  >
        <span  className="mt-4">
          As the trusted choice of businesses across India,{" "}
        </span>
      </span>
    </span>
    <a href="https://msg91.com/in" style={{ textDecoration: "none" }}>
      <span  >
        <span  >
          <span style={{ color: "#1155cc" }}>
            <u>MSG91</u>
          </span>
        </span>
      </span>
    </a>
    <span  >
      <span  >
        <span  className="mt-4">
          {" "}
          is renowned for delivering the best OTP SMS services. Our robust
          platform, comprehensive features, and exceptional customer support
          make us the preferred OTP SMS service provider for businesses of all
          sizes.
        </span>
      </span>
    </span>
  </p>
  <p>&nbsp;</p>
  <h2  >
    <span style={{ fontSize: "16pt" }}>
      <span  >
        <span  className="mt-4">
          <strong>SMS Gateway for OTP in India</strong>
        </span>
      </span>
    </span>
  </h2>
  <p  >
    <span  >
      <span  >
        <span  className="mt-4">
          Secure your transactions and user accounts with our reliable SMS
          gateway for OTP in India. Whether you operate in the banking,
          e-commerce, or any other industry, our OTP SMS services ensure that
          your customers can authenticate their accounts and access services
          seamlessly.
        </span>
      </span>
    </span>
  </p>
  <p>&nbsp;</p>
  <h2  >
    <span style={{ fontSize: "16pt" }}>
      <span  >
        <span  className="mt-4">
          <strong>Choose MSG91 as Your Trusted OTP SMS Service Provider</strong>
        </span>
      </span>
    </span>
  </h2>
  <p  >
    <span  >
      <span  >
        <span  className="mt-4">
          When it comes to OTP SMS services or{" "}
        </span>
      </span>
    </span>
    <a href="https://msg91.com/in/email" style={{ textDecoration: "none" }}>
      <span style={{ fontSize: "11pt" }}>
        <span style={{ fontFamily: "Arial" }}>
          <span style={{ color: "#1155cc" }}>
            <strong>
              <u>email api service</u>
            </strong>
          </span>
        </span>
      </span>
    </a>
    <span  >
      <span  >
        <span  className="mt-4">
          , MSG91 stands out as the partner of choice. Our secure, scalable, and
          reliable solutions ensure that your OTPs are delivered on time, every
          time. Experience the difference with our advanced OTP SMS services and
          take your business to new heights of security and user satisfaction.
        </span>
      </span>
    </span>
  </p>
  <p>&nbsp;</p>
  <p  >
    <span  >
      <span  >
        <span  className="mt-4">
          Contact us today to learn more about our OTP SMS services and how we
          can empower your business with seamless OTP authentication.
        </span>
      </span>
    </span>
  </p>
</>

          </div>
        )}
        <button className="btn btn-dark mt-3" onClick={handleReadMore}>
          {showInsms ? "Read Less" : "Read More"}
        </button>


        <div>
              <h2 className="c-head c-fs-1 mt-5">FAQs</h2>

              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      What is an OTP SMS service provider?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                    An OTP SMS service provider, like MSG91, offers a platform and infrastructure to send One-Time Passwords (OTPs) via SMS for authentication, verification, and secure access to user accounts or transactions.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      What is an OTP authentication API?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                    An OTP authentication API is a software interface provided by MSG91 that allows businesses to integrate OTP-based authentication into their applications or systems. It enables the generation, delivery, and verification of OTPs seamlessly.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      How does an OTP SMS gateway work?

                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                    An OTP SMS gateway, such as the one provided by MSG91, acts as a bridge between the application generating the OTP and the mobile network operators. It ensures the reliable and timely delivery of OTP messages to users' mobile devices.


                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingFour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFour"
                      aria-expanded="false"
                      aria-controls="flush-collapseFour"
                    >
                      Can I use MSG91's API for OTP verification?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                    Yes, MSG91 provides a powerful API for OTP verification. With our API, you can easily validate OTPs received from users, ensuring secure access, authorization, and authentication for various services and transactions.

 
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFive"
                      aria-expanded="false"
                      aria-controls="flush-collapseFive"
                    >
                      Why is MSG91 considered the best OTP SMS service provider in India?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingFive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                    MSG91 is regarded as the best OTP SMS service provider in India due to its robust platform, high message deliverability, comprehensive features, excellent customer support, and a proven track record of serving businesses of all sizes across various industries.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingSix">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseSix"
                      aria-expanded="false"
                      aria-controls="flush-collapseSix"
                    >
                      Does MSG91 offer an SMS gateway for OTP in India?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseSix"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingSix"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                    Yes, MSG91 offers a reliable SMS gateway specifically designed for OTP delivery in India. Our SMS gateway ensures fast and secure delivery of OTP messages, helping businesses in banking, e-commerce, and other sectors strengthen their security measures.
                    </div>
                  </div>
                </div>


                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingSeven">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseSeven"
                      aria-expanded="false"
                      aria-controls="flush-collapseSeven"
                    >
                     How can I get started with MSG91's OTP SMS services?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseSeven"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingSeven"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                    Getting started with MSG91's OTP SMS services is easy. Simply reach out to our team or visit our website to explore our offerings. We provide seamless integration, extensive documentation, and dedicated support to help you implement OTP authentication effectively.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingEight">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseEight"
                      aria-expanded="false"
                      aria-controls="flush-collapseEight"
                    >
                      Is MSG91's OTP SMS service scalable?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseEight"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingEight"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                    Yes, MSG91's OTP SMS service is highly scalable. Whether you have a small business or an enterprise-level operation, our infrastructure can handle high message volumes, ensuring that your OTPs are delivered swiftly and reliably to your users.
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </>
  );
};

export default Insms;
