import { useState } from "react";
import { MdCircle } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import FaqSection from '@/components/faqSection/faqSection';
import productData from '../../data/product-comp.json';
const Insms = () => {
  const [showInsms, setShowInsms] = useState(false);

  const handleReadMore = () => {
    setShowInsms(!showInsms);
  };

  return (
    <>
      <div className={`container my-5 ${showInsms ? "insms" : ""}`}>
        <h1 className="pro-heading c-head">
          Boost Your Marketing with the Best Campaign Software!
        </h1>
        <p className="c-fs-3 mt-3">
          Why choose SMS campaigns? It's simple – they deliver exceptional
          engagement! With an astounding open rate of over 98%, your messages
          are guaranteed to be seen and read by your target audience. Whether
          you want to promote exclusive offers, announce exciting updates, or
          simply connect with your customers, promotional text messages in India
          are the secret to success.
        </p>

        {showInsms && (
          <div className="insms-soc c-fs-3">
            <>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <h1 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "20pt" }}>
                  <span  >
                    <span  className="mt-4">
                      <strong>
                        Ignite Engagement and Drive Results with SMS Campaigns
                        by MSG91!
                      </strong>
                    </span>
                  </span>
                </span>
              </h1>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      Curious about the marketing strategy that can skyrocket
                      your business? Look no further than marketing SMS software
                      powered by MSG91! An SMS campaign is a dynamic and
                      personalized marketing approach that harnesses the power
                      of text messages to captivate your audience and achieve
                      remarkable results.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>&nbsp;</p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      At MSG91, we provide you with the best campaign software
                      with our cutting-edge platform. Our feature-rich campaign
                      automation tools empower you to craft captivating
                      messages, tailor them to individual recipients, and
                      schedule them for maximum impact. With our intuitive
                      interface, you can effortlessly manage contact lists,
                      track campaign performance, and gain invaluable insights
                      to refine your strategies and also provide you{" "}
                    </span>
                  </span>
                </span>
                <a
                  href="https://msg91.com/in/sms"
                  style={{ textDecoration: "none" }}
                >
                  <span  >
                    <span  >
                      <span style={{ color: "#1155cc" }}>
                        <strong>
                          <u>transactional SMS API India</u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </a>
                <span  >
                  <span  >
                    <span  className="mt-4">.</span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "16pt" }}>
                  <span  >
                    <span  className="mt-4">
                      <strong>Ways To Send Automated Text Messages</strong>
                    </span>
                  </span>
                </span>
              </h2>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Welcome Messages:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      Make a lasting first impression by automatically sending
                      personalized welcome messages to new subscribers or
                      customers. Set up automated responses that greet them,
                      provide essential information, and create a warm
                      connection from the start. Our{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      marketing SMS software provides you ease to share welcome
                      messages to the potential customers.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Transactional Notifications:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      Keep your customers informed every step of the way with
                      automated text messages for transactional notifications.
                      From order confirmations and shipping updates to
                      appointment reminders and payment receipts, deliver timely
                      and relevant information effortlessly with our{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      campaign automation tools.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Event Reminders</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      : Increase attendance and engagement at your events by
                      choosing{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      marketing sms software for{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      sending automated text message reminders. Schedule
                      reminders prior to the event to ensure your audience
                      doesn't miss out on important dates, times, and details.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Feedback and Surveys:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      Gather valuable insights and feedback from your customers
                      by sending automated text messages containing surveys or
                      feedback forms. This helps you understand their
                      preferences, improve your offerings, and enhance overall
                      customer satisfaction.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Drip Campaigns:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      Nurture leads and guide them through the customer journey
                      with{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      texting campaign software in India
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      . Send a series of well-timed text messages to provide
                      valuable information, share product updates, and encourage
                      conversions.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "16pt" }}>
                  <span  >
                    <span  className="mt-4">
                      <strong>Reasons to Use Marketing SMS Software</strong>
                    </span>
                  </span>
                </span>
              </h2>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "15pt" }}>
                  <span  >
                    <span  className="mt-4">
                      Unlock Success with SMS Automation: Here's Why You Need
                      It!
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Time Efficiency:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      SMS automation saves you precious time by eliminating
                      manual tasks. With automation, you can schedule messages
                      in advance, set up triggers based on customer actions, and
                      let the system do the work for you. Focus on other
                      important aspects of your business while your SMS
                      campaigns run seamlessly in the background.
                    </span>
                  </span>
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Personalization at Scale:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      Automation doesn't mean sacrificing personalization. With
                      SMS automation, you can tailor messages to individual
                      recipients based on their preferences, behavior, or
                      demographics. Delivering personalized content at scale
                      boosts engagement, strengthens customer relationships, and
                      drives better results.
                    </span>
                  </span>
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Enhanced Customer Experience:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      Timely and relevant communication is key to providing an
                      exceptional customer experience. SMS automation allows you
                      to send important updates, notifications, and reminders
                      promptly, keeping your customers informed and engaged
                      throughout their journey with your brand.
                    </span>
                  </span>
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Increased Engagement and Response Rates:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      Automated SMS campaigns have higher open and response
                      rates compared to traditional marketing channels. By
                      delivering targeted messages to the right audience at the
                      right time, you capture their attention and encourage
                      immediate action, resulting in increased engagement and
                      higher conversions.
                    </span>
                  </span>
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Improved Conversion Rates:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      SMS automation is a powerful tool for driving conversions.
                      Whether it's sending abandoned cart reminders,
                      personalized offers, or time-sensitive promotions,
                      automated messages have proven to be highly effective in
                      nudging customers towards making a purchase, thus boosting
                      your conversion rates.
                    </span>
                  </span>
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Data-Driven Insights:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      SMS automation platforms provide valuable analytics and
                      reporting features that offer insights into campaign
                      performance. Track open rates, click-through rates,
                      conversion rates, and more, enabling you to measure the
                      success of your campaigns, identify areas for improvement,
                      and refine your strategies accordingly.
                    </span>
                  </span>
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Scalability and Consistency:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      As your business grows, SMS automation allows you to scale
                      your campaigns effortlessly. Whether you have hundreds or
                      thousands of contacts, automation ensures that every
                      customer receives consistent, timely, and relevant
                      messages, maintaining a seamless brand experience.
                    </span>
                  </span>
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      <strong>Cost-Effectiveness:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span  >
                    <span style={{ color: "#0e101a" }}>
                      {" "}
                      SMS automation offers a cost-effective marketing solution
                      compared to other channels. It eliminates the need for
                      manual labor, reduces printing and postage costs, and
                      delivers immediate results, making it an efficient and
                      budget-friendly option for businesses of all sizes.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "16pt" }}>
                  <span  >
                    <span  className="mt-4">
                      <strong>
                        Elevate Your Automated Texting with MSG91!
                      </strong>
                    </span>
                  </span>
                </span>
              </h2>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      Choose MSG91 for powerful campaign automation tools that
                      make managing promotional text messages in India campaigns
                      seamless and reliable. Easily integrate with your existing
                      systems and applications for a smooth experience with{" "}
                    </span>
                  </span>
                </span>
                <a
                  href="https://msg91.com/in/otp"
                  style={{ textDecoration: "none" }}
                >
                  <span  >
                    <span  >
                      <span style={{ color: "#1155cc" }}>
                        <strong>
                          <u>API for OTP verification</u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </a>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      . We provide you Personalized messages based on customer
                      data and behavior, ensuring relevance. We enable you to
                      gain valuable insights with comprehensive analytics and
                      reporting which make it feasible for you to count on
                      dedicated customer support at every step.
                    </span>
                  </span>
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      Surprisingly, all of this comes at a competitive price
                      point. Elevate your automated texting service with MSG91's
                      platform, integration, personalization, reliability,
                      analytics, support, compliance, security, and pricing.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      Visit our website today and experience the difference{" "}
                    </span>
                  </span>
                </span>
                <a
                  href="https://msg91.com/in"
                  style={{ textDecoration: "none" }}
                >
                  <span  >
                    <span  >
                      <span style={{ color: "#1155cc" }}>
                        <strong>
                          <u>MSG91</u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </a>
                <span  >
                  <span  >
                    <span  className="mt-4">
                      {" "}
                      can make for your business. Choose MSG91 and elevate your
                      marketing SMS software to new heights!
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "16pt" }}>
                  <span  >
                    <span  className="mt-4">
                      <strong>Our USPs</strong>
                    </span>
                  </span>
                </span>
              </h2>
              <p>&nbsp;</p>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  <span  >
                    <span  >
                      <span  className="mt-4">
                        Powerful automation tools for streamlined communication
                        and effortless engagement
                      </span>
                    </span>
                  </span>
                </li>
                <li style={{ listStyleType: "disc" }}>
                  <span  >
                    <span  >
                      <span  className="mt-4">
                        Advanced personalization capabilities for highly
                        targeted and relevant messages
                      </span>
                    </span>
                  </span>
                </li>
                <li style={{ listStyleType: "disc" }}>
                  <span  >
                    <span  >
                      <span  className="mt-4">
                        Reliable and scalable SMS campaign delivery, regardless
                        of recipient count
                      </span>
                    </span>
                  </span>
                </li>
                <li style={{ listStyleType: "disc" }}>
                  <span  >
                    <span  >
                      <span  className="mt-4">
                        Comprehensive analytics and reporting features for
                        measuring campaign performance
                      </span>
                    </span>
                  </span>
                </li>
                <li style={{ listStyleType: "disc" }}>
                  <span  >
                    <span  >
                      <span  className="mt-4">
                        Customer satisfaction focus and cutting-edge technology
                        make MSG91 a preferred choice for SMS campaigns.
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
            </>
          </div>
        )}
       <button className="border border-0 bg-transparent ps-0 mt-3 c-fs-3 fw-semibold shadow-none" onClick={handleReadMore}>
          {showInsms ? "Read Less" : "Read More"}
          <span className="ms-4 fs-4">
            <MdExpandMore />
          </span>
        </button>
        <FaqSection faqData={productData?.camp} />
        {/* <div>
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
          What is an SMS campaign?
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          An SMS campaign is a targeted marketing strategy that utilizes text
          messages to reach and engage with a specific audience. It involves
          sending promotional messages, updates, offers, reminders, and other
          relevant content directly to recipients' mobile devices.
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
          How does an SMS campaign work?
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingTwo"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          To run an SMS campaign, you create compelling messages, define your
          target audience, and leverage the best campaign software platform like
          MSG91. The marketing SMS software helps you manage contacts, schedule
          message delivery, track campaign performance, and analyze valuable
          insights for better results.
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
          What are the benefits of using SMS campaigns?
        </button>
      </h2>
      <div
        id="flush-collapseThree"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingThree"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          Having campaign automation tools for SMS campaigns offer numerous
          benefits, such as high open rates, instant message delivery, wide
          reach, cost-effectiveness, personalization opportunities, increased
          engagement, improved customer relationships, and the ability to drive
          conversions.
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
          How can MSG91 help with my SMS campaigns?
        </button>
      </h2>
      <div
        id="flush-collapseFour"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingFour"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          MSG91 provides a comprehensive platform with powerful features for
          best text campaigns. It offers automation tools, personalized
          messaging capabilities, seamless integration options, reliable
          delivery, detailed analytics, and dedicated customer support to
          enhance your campaign effectiveness.
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
          Can I personalize my SMS campaigns with MSG91?
        </button>
      </h2>
      <div
        id="flush-collapseFive"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingFive"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          Absolutely! MSG91 enables you to personalize your promotional text
          messages in India by incorporating recipient names, customizing
          message content, segmenting your audience based on demographics or
          preferences, and delivering targeted messages that resonate with
          individual recipients.
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
          Are there any restrictions on sending SMS campaigns?
        </button>
      </h2>
      <div
        id="flush-collapseSix"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingSix"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          Yes, there are certain restrictions and compliance requirements that
          vary by country and region. These include obtaining proper consent
          from recipients, adhering to opt-out options, and complying with local
          regulations for messaging frequency, content, and sender
          identification.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingSeven">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseSeven"
          aria-expanded="false"
          aria-controls="flush-collapseSeven"
        >
          How can I measure the success of my SMS campaigns?
        </button>
      </h2>
      <div
        id="flush-collapseSeven"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingSeven"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          With MSG91's analytics and reporting features, you can track key
          metrics like open rates, click-through rates, conversion rates, and
          overall campaign performance. These insights allow you to assess the
          effectiveness of your campaigns, make data-driven decisions, and
          optimize future strategies.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingEight">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseEight"
          aria-expanded="false"
          aria-controls="flush-collapseEight"
        >
          Is MSG91 secure and reliable for sending SMS campaigns?
        </button>
      </h2>
      <div
        id="flush-collapseEight"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingEight"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          Yes, MSG91 prioritizes data security and reliability. We employ robust
          measures to safeguard your information and ensure secure message
          delivery. Additionally, our partnerships with leading telecom
          operators ensure reliable SMS delivery to recipients.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingNine">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseNine"
          aria-expanded="false"
          aria-controls="flush-collapseNine"
        >
          Can I integrate MSG91 with my existing systems?
        </button>
      </h2>
      <div
        id="flush-collapseNine"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingNine"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          Absolutely! MSG91 offers seamless integration options with various
          CRM, e-commerce, and marketing tools. This allows you to leverage your
          existing systems and data, enhancing the efficiency and effectiveness
          of your SMS campaigns.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingTen">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTen"
          aria-expanded="false"
          aria-controls="flush-collapseTen"
        >
          How can I get started with SMS campaigns using MSG91?
        </button>
      </h2>
      <div
        id="flush-collapseTen"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingTen"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          To get started, visit the MSG91 website and explore our marketing SMS
          software. Sign up for an account, familiarize yourself with the
          platform's features, create compelling messages, define your target
          audience, and launch your SMS campaigns to connect with your customers
          and drive success.
        </div>
      </div>
    </div>
  </div>
       </div> */}

      </div>
    </>
  );
};

export default Insms;
