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
          MSG91: Empowering Seamless Transactional Email Delivery in India
        
          <p className=" mt-3">Unlock the Power of Transactional Email with Our Bulk Transactional
          Email API</p>
        </h1>
        <p className="c-fs-3 mt-3">
          Welcome to MSG91, the leading best email API service provider for
          developers in India. With our state-of-the-art transactional email
          delivery solutions, we empower businesses to effortlessly send
          important, personalized emails to their customers at scale.
        </p>

        {showInsms && (
          <div className="insms-soc c-fs-3">
            
              <p className="my-3">
                <span>
                  <span>
                    <span className="mt-4">
                      Whether you need to send order confirmations, shipping
                      notifications, account verifications, or any other
                      transactional email, our robust API gateway ensures
                      reliable and efficient delivery, enabling you to focus on
                      building{" "}
                    </span>
                  </span>
                </span>
                <span>
                  <span>
                    <span style={{ color: "#000000" }}>
                      transactional email api service for developers
                    </span>
                  </span>
                </span>
                <span>
                  <span>
                    <span className="mt-4">.</span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 className="c-head c-fs-1 mt-2">
              Why Choose Our Transactional Email API Service?
                </h2>
              <div className="my-3">
                  
                <h3 className="c-fs-3 c-head my-2">Seamless Integration:</h3>
                <p className="c-fs-4">
                transactional email api service for developers is designed with developers in mind, offering easy
                      integration with your existing systems and applications.
                      Whether using PHP, Python, Ruby, or any other programming
                      language, our API documentation provides clear
                      instructions to get you up and running quickly.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Reliable Delivery:</h3>
                <p className="c-fs-4">
                We understand the importance of reliable email delivery
                      for your business operations. Our bulk transactional email
                      API services utilize advanced infrastructure and industry
                      best practices to ensure your emails promptly reach their
                      intended recipients' inboxes.
                </p>
              </div>

              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Personalization and Customization:</h3>
                <p className="c-fs-4">
                Tailor your transactional email API gateway to meet your
                      brand's unique requirements. Our API lets you dynamically
                      generate content, personalize messages, and include
                      attachments, giving you complete control over email
                      communication.
                </p>
              </div>

              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Robust Tracking and Analytics:</h3>
                <p className="c-fs-4">
                Gain valuable insights into the performance of your
                      transactional emails with our comprehensive tracking and
                      analytics features. Monitor delivery status, open rates,
                      click-through rates, and more, enabling you to refine your
                      email campaigns and optimize customer engagement.
                </p>
              </div>

              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Scalable and Cost-effective:</h3>
                <p className="c-fs-4">
                As your business grows, so does the volume of
                      transactional emails you send. Our scalable infrastructure
                      ensures you can handle high email volumes without
                      compromising performance. Plus, our cost-effective pricing
                      plans ensure that you only pay for what you use, making it
                      an ideal choice for businesses of all sizes. We provide
                      you with a transactional email API gateway to scale your
                      business.
                </p>
              </div>
              <h2>
                <span style={{ fontSize: "17pt" }}>
                  <span>
                    <span className="mt-4">
                      <h2 className="c-head c-fs-2 mt-5">
                        Unlock the Potential of Seamless Transactional Email
                        Delivery in India
                      </h2>
                    </span>
                  </span>
                </span>
              </h2>
              <p>
                <span>
                  <span>
                    <span className="mt-5">As India's </span>
                  </span>
                </span>
                <a
                  href="https://msg91.com/in/otp"
                  style={{ textDecoration: "none" }}
                >
                  <span>
                    <span>
                      <span style={{ color: "#1155cc" }}>
                        <strong>
                          <u>best OTP API service provider</u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </a>
                <span>
                  <span>
                    <span className="mt-4">
                      , we deliver exceptional transactional email solutions to
                      businesses across various industries. Our secure and
                      reliable transactional email API platform in India ensures
                      that sensitive transactional emails are delivered with
                      utmost precision and efficiency, giving you the confidence
                      to provide exceptional customer experiences.
                    </span>
                  </span>
                </span>
              </p>
              <p>
                <span>
                  <span>
                    <span className="mt-4">
                      Ready to take your transactional email delivery to the
                      next level?
                    </span>
                  </span>
                </span>
              </p>
              <p>
                <a
                  href="https://msg91.com/in"
                  style={{ textDecoration: "none" }}
                >
                  <span>
                    <span>
                      <span style={{ color: "#1155cc" }}>
                        <u>Visit our website</u>
                      </span>
                    </span>
                  </span>
                </a>
                <span>
                  <span>
                    <span className="mt-4"> to explore the best </span>
                  </span>
                </span>
                <a
                  href="https://msg91.com/in/sms"
                  style={{ textDecoration: "none" }}
                >
                  <span>
                    <span>
                      <span style={{ color: "#1155cc" }}>
                        <strong>
                          <u>transactional SMS API India</u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </a>
                <span>
                  <span>
                    <span className="mt-4">
                      , access our API documentation, and get started today.
                      Harness the power of our&nbsp;
                    </span>
                  </span>
                </span>
              </p>
              <p>
                <span>
                  <span>
                    <span className="mt-4">
                      &nbsp;and unlock endless possibilities for seamless
                      communication with your customers.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
          </div>
        )}
        <button className="btn btn-dark mt-3" onClick={handleReadMore}>
          {showInsms ? "Read Less" : "Read More"}
        </button>

        <div>
              <h2 className="c-head c-fs-1 mt-5">FAQs</h2>

              <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingOne">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseOne"
        aria-expanded="false"
        aria-controls="flush-collapseOne"
      >
        What is a transactional email API?
      </button>
    </h2>
    <div
      id="flush-collapseOne"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingOne"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        Transactional email API platform in India allows developers to integrate
        and automate sending transactional emails from their applications or
        systems. It provides a convenient and efficient way to deliver
        meaningful, personalized emails such as order confirmations, account
        notifications, password resets, and more.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingTwo">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseTwo"
        aria-expanded="false"
        aria-controls="flush-collapseTwo"
      >
        How does a transactional email API service benefit developers?
      </button>
    </h2>
    <div
      id="flush-collapseTwo"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingTwo"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        Transactional email API services offer several benefits for developers,
        including:
        <ul>
          <li>
            Simplified integration: Developers can easily integrate the API into
            their existing applications or systems using comprehensive API
            documentation and sample code.
          </li>
          <li>
            Streamlined email delivery: The API handles the complex email
            delivery process, ensuring reliable and efficient transmission to
            recipients' inboxes.
          </li>
          <li>
            Customization and personalization: Developers can dynamically
            generate email content, personalize messages, and include
            attachments as needed, providing a tailored user experience.
          </li>
          <li>
            Real-time tracking and analytics: The API enables developers to
            track email delivery and monitor open rates, click-through rates,
            and other metrics, empowering them to optimize email campaigns.
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingThree">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseThree"
        aria-expanded="false"
        aria-controls="flush-collapseThree"
      >
        Why should I choose a transactional email API service for my business?
      </button>
    </h2>
    <div
      id="flush-collapseThree"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingThree"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        Using a transactional email API service offers several advantages,
        including:
        <ul>
          <li>
            Reliable delivery : API services employ robust infrastructure and
            industry best practices to ensure that your transactional emails
            reach their intended recipients promptly and reliably.
          </li>
          <li>
            Scalability: As your business grows, API services can handle high
            email volumes without compromising performance, ensuring a seamless
            experience for your customers.
          </li>
          <li>
            Cost-effectiveness: Transactional email API services often offer
            flexible pricing plans that allow you to pay only for the emails you
            send, making it a cost-effective solution for businesses of all
            sizes.
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingFour">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseFour"
        aria-expanded="false"
        aria-controls="flush-collapseFour"
      >
        Is transactional email API delivery available in India?
      </button>
    </h2>
    <div
      id="flush-collapseFour"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingFour"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        Yes, transactional email API delivery is available in India. At MSG91,
        we specialize in providing a{"{"}" "{"}"}designed specifically for
        businesses in India. Our robust infrastructure ensures efficient and
        reliable delivery to Indian recipients, helping you effectively engage
        with your customers.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingFive">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseFive"
        aria-expanded="false"
        aria-controls="flush-collapseFive"
      >
        How secure is the transactional email API service?
      </button>
    </h2>
    <div
      id="flush-collapseFive"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingFive"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        At MSG91, we prioritize the security of your transactional email
        communications. Our API service utilizes industry-standard security
        protocols, encryption, and authentication mechanisms to safeguard your
        data. Additionally, we adhere to strict data privacy regulations,
        ensuring that your sensitive information remains protected.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingSix">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapseSix"
        aria-expanded="false"
        aria-controls="flush-collapseSix"
      >
        Can I track the performance of my transactional emails?
      </button>
    </h2>
    <div
      id="flush-collapseSix"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingSix"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
        Sure! Our transactional email API gateway provides comprehensive
        tracking and analytics features. You can monitor your emails' delivery
        status and track real-time open rates, click-through rates, and other
        key metrics. These insights help you evaluate the effectiveness of your
        email campaigns and make data-driven decisions to improve customer
        engagement.
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
