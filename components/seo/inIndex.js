import { useState } from "react";
import { MdCircle } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";

const Insms = () => {
  const [showInsms, setShowInsms] = useState(false);

  const handleReadMore = () => {
    setShowInsms(!showInsms);
  };

  return (
    <>
      <div className={`container my-5 ${showInsms ? "insms" : ""}`}>
        <h3 className="pro-heading c-head">
          Welcome to MSG91: Your Trusted Cloud Communication Platform as a Service
        </h3>
        <p className="c-fs-3 mt-3">
          Are you searching for a reliable and versatile cloud communication platform as a service? Look no further! At MSG91, we specialize in providing top-notch mobile cloud communication platforms in India. Whether you're a startup, small business, or a large enterprise, we have the perfect solution to enhance your business communication.
        </p>

        {showInsms && (
          <div className="insms-soc c-fs-3">
            <>
              <p>&nbsp;</p>

              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      Our cloud based communication platform in India is designed to address
                      the unique needs of Indian businesses. With multiple communication
                      channels like SMS, voice, email, and instant messaging, shorturl and
                      many more so that you can reach your audience through their preferred
                      mode of communication. Our features include two-factor authentication,
                      personalized messaging, and scheduled campaigns in cloud communication
                      software for enhanced security and automation.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      We understand that businesses come in different sizes, so our scalable
                      and customizable solutions can adapt to your evolving needs. Plus, our
                      dedicated support team is available to assist you every step of the
                      way.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      Experience the difference with{" "}
                    </span>
                  </span>
                </span>
                <a href="https://msg91.com/in" style={{ textDecoration: "none" }}>
                  <span  >
                    <span >
                      <span style={{ color: "#1155cc" }}>
                        <strong>
                          <u>MSG91</u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </a>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      . Join us today and unlock the full potential with our best business
                      communication platforms for your business in India.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "16pt" }}>
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Cloud Communication- All You need to Know</strong>
                    </span>
                  </span>
                </span>
              </h2>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      Cloud communication refers to using cloud-based technologies such as
                      cloud communication software to facilitate communication processes and
                      services. Instead of relying on traditional on-premises hardware and
                      infrastructure, cloud communication leverages the internet and cloud
                      computing's power to enable seamless and flexible communication.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      In cloud based communication platform in India, various channels, such
                      as voice, messaging, video, and email, are delivered through
                      cloud-based platforms and services. These platforms allow businesses
                      to engage with customers, employees, and stakeholders using multiple
                      communication channels, all managed and accessed through a centralized
                      cloud interface.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "16pt" }}>
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>What MSG91 Offers to the World?</strong>
                    </span>
                  </span>
                </span>
              </h2>
              <p>&nbsp;</p>
              <h3 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "13.999999999999998pt" }}>
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Cloud Communication Platform as a Service</strong>
                    </span>
                  </span>
                </span>
              </h3>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      We offer a comprehensive cloud communication platform as a service
                      (CPaaS) that empowers businesses to seamlessly integrate communication
                      functionalities into their applications, systems, or processes. With
                      our CPaaS, you can leverage the power of cloud-based communication
                      technologies to enhance customer engagement, improve team
                      collaboration, and streamline your communication workflows.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h3 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "13.999999999999998pt" }}>
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Mobile Cloud Communication Platforms in India</strong>
                    </span>
                  </span>
                </span>
              </h3>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      As a leading provider of mobile cloud communication platforms in
                      India, we understand the unique needs and challenges faced by
                      businesses in the region. Our platform is designed to cater to the
                      diverse communication requirements of Indian businesses, offering
                      reliable and scalable solutions that can adapt to your evolving needs.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h3 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "13.999999999999998pt" }}>
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Best Business Communication Platforms</strong>
                    </span>
                  </span>
                </span>
              </h3>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      We take pride in offering one of the{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>best business communication platforms </strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      available in the market. Our platform provides a wide range of
                      communication channels, including{" "}
                    </span>
                  </span>
                </span>
                <a href="https://msg91.com/in/campaign" style={{ textDecoration: "none" }}>
                  <span  >
                    <span >
                      <span style={{ color: "#1155cc" }}>
                        <strong>
                          <u>campaign software</u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </a>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      , voice, email, instant messaging, and more, enabling you to engage
                      with your customers through their preferred channels. With advanced
                      features like two-factor authentication, OTP verification, and
                      personalized messaging, you can enhance the security and
                      personalization of your cloud communication software.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h3 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "13.999999999999998pt" }}>
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Enterprise Cloud Communications Platform</strong>
                    </span>
                  </span>
                </span>
              </h3>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      For enterprises looking for a robust and secure cloud communication
                      platform as a service, MSG91 is the ideal choice. Our cloud based
                      communication platform in India offers scalable solutions that can
                      handle high volumes of communication, ensuring uninterrupted service
                      even during peak times. With comprehensive reporting and analytics,
                      you can gain valuable insights into your communication performance and
                      make data-driven decisions to optimize your business operations.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 style={{ textAlign: "justify" }}>
                <span style={{ fontSize: "16pt" }}>
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Experience the Difference with MSG91</strong>
                    </span>
                  </span>
                </span>
              </h2>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Reliability</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      : We understand the importance of reliable communication for your
                      business. Our best business communication platforms are built on
                      robust infrastructure, ensuring high availability and reliability. You
                      can trust that your communication channels will remain operational,
                      allowing you to connect with your customers and stakeholders without
                      interruptions. We prioritize the stability and performance of our
                      platform so that you can focus on your core business activities.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Scalability:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      {" "}
                      Our platform grows with you as your business grows and evolves. We
                      understand that your communication needs may increase over time, and
                      our scalable cloud communication software can seamlessly accommodate
                      your expanding requirements. Whether you experience a surge in
                      communication volume or need to add new features, MSG91 can easily
                      scale up to meet your demands. Knowing that our mobile cloud
                      communication platforms in India can handle your growing business
                      communication needs, you can have peace of mind.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Developer-Friendly APIs:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      {" "}
                      We believe in empowering businesses to integrate our communication
                      functionalities into their applications or systems effortlessly. Our
                      developer-friendly APIs (Application Programming Interfaces) are
                      designed to be user-friendly and well-documented, making it easier for
                      developers to integrate our communication capabilities into their
                      existing infrastructure. With our APIs, you can unlock the full
                      potential of our enterprise cloud communications platform and create
                      customized communication solutions that align with your unique
                      business requirements.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Excellent Support:</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      {" "}
                      At MSG91, we value the success of our clients, and that's why we
                      provide excellent support. Our dedicated support team is available
                      round the clock to assist you with any queries, concerns, or technical
                      issues you may encounter. We are committed to ensuring that you have a
                      smooth experience with our platform and that your communication needs
                      are met. Whether you need guidance on{" "}
                    </span>
                  </span>
                </span>
                <a href="https://msg91.com/in/hello" style={{ textDecoration: "none" }}>
                  <span  >
                    <span >
                      <span style={{ color: "#1155cc" }}>
                        <strong>
                          <u>best customer support software</u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </a>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      {" "}
                      , platform integration, or troubleshooting support, our knowledgeable
                      and responsive support team is here to help you at every step.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      Don't let communication barriers hinder your business success. Choose
                      MSG91 as your trusted{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>cloud communication software</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      {" "}
                      and unlock the true potential of seamless and efficient communication.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      Get started with MSG91 today and experience the power of a
                      comprehensive cloud communication platform designed to drive your
                      business forward.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <h2 style={{ marginRight: 6, textAlign: "justify" }}>
                <span style={{ fontSize: "16pt" }}>
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>Our Vision Statement</strong>
                    </span>
                  </span>
                </span>
              </h2>
              <p style={{ marginRight: 6, textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      At MSG91, our vision is to revolutionize business communication by
                      seamlessly connecting organizations with their customers, employees,
                      and stakeholders. We aim to be the global leader in{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>cloud communication platform as a service</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      {" "}
                      provider to empower businesses of all sizes to drive exceptional
                      customer experiences and unlock their full potential.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ marginRight: 6, textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      We are committed to continuous innovation, pushing boundaries to
                      deliver cutting-edge{" "}
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      <strong>cloud communication software</strong>
                    </span>
                  </span>
                </span>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      {" "}
                      that cater to the evolving needs of businesses. Our comprehensive
                      platform integrates various communication channels and advanced
                      features, enabling businesses to create meaningful connections and
                      enhance operational efficiency.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ marginRight: 6, textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      With scalability and reliability at the core of our vision, we strive
                      to provide businesses worldwide with the tools to achieve seamless
                      growth, improved customer engagement, and streamlined communication
                      processes. We foster a culture of excellence, delivering outstanding
                      customer support and driving technological advancements.
                    </span>
                  </span>
                </span>
              </p>
              <p>&nbsp;</p>
              <p style={{ marginRight: 6, textAlign: "justify" }}>
                <span  >
                  <span >
                    <span style={{ color: "#000000" }}>
                      As we work towards our vision, we aim to be recognized as the trusted
                      partner for businesses seeking transformative communication
                      experiences. By leveraging cloud-based technologies, we empower
                      businesses to thrive in the digital era and make a lasting impact on
                      how they connect and engage with their audiences.
                    </span>
                  </span>
                </span>
              </p>
            </>

          </div>
        )}
        <button className="border border-0 bg-transparent ps-0 mt-3 c-fs-3 fw-semibold shadow-none" onClick={handleReadMore}>
          {showInsms ? "Read Less" : "Read More"}
          <span className="ms-4 fs-4">
            <MdExpandMore />
          </span>
        </button>
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
        How can MSG91 benefit my business?
      </button>
    </h2>
    <div
      id="flush-collapseOne"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingOne"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
      MSG91 offers numerous benefits for businesses, including improved
          customer engagement, streamlined communication workflows, increased
          operational efficiency, and enhanced brand reputation. Our platform
          enables businesses to automate communication, personalize
          interactions, and reach their target audience through their preferred
          channels.
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
        What makes MSG91 different from other communication platforms?
      </button>
    </h2>
    <div
      id="flush-collapseTwo"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingTwo"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
      MSG91 stands out due to its reliability, scalability, and versatility.
          We specialize in providing mobile cloud communication platforms in India , addressing the unique needs of businesses in this market. Our
          platform offers advanced features, customizable solutions, and
          exceptional customer support to help businesses achieve their
          communication goals.
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
        Is MSG91 suitable for businesses of all sizes?
      </button>
    </h2>
    <div
      id="flush-collapseThree"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingThree"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
      Yes, MSG91 caters to businesses of all sizes. Whether you're a
          startup, small business, or large enterprise, our platform can be
          tailored to meet your specific requirements. We offer scalable
          solutions that can accommodate the communication needs of businesses
          as they grow and expand.
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
        Is MSG91 secure?
      </button>
    </h2>
    <div
      id="flush-collapseFour"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingFour"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
      Security is a top priority at MSG91. We implement industry-standard
          protocols and encryption techniques to ensure the confidentiality and
          integrity of your data. Our enterprise cloud communications platform offers features like two-factor authentication and OTP verification to
          enhance security and protect sensitive information.
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
        Can I integrate MSG91 with my existing systems or applications?
      </button>
    </h2>
    <div
      id="flush-collapseFive"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingFive"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
      Absolutely! MSG91 provides developer-friendly APIs and documentation,
          making it easy to integrate our platform with your existing systems or
          applications. Our APIs allow you to incorporate our communication
          functionalities seamlessly, enabling you to automate communication and
          streamline your workflows.
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
        What level of support can I expect from MSG91?
      </button>
    </h2>
    <div
      id="flush-collapseSix"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingSix"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
      At MSG91, we pride ourselves on offering excellent customer support.
          Our dedicated support team is available 24/7 to assist you with any
          queries, technical issues, or guidance you may need. We strive to
          ensure a smooth experience and help you make the most out of our
          platform.
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
        How do I get started with MSG91?
      </button>
    </h2>
    <div
      id="flush-collapseSeven"
      className="accordion-collapse collapse"
      aria-labelledby="flush-headingSeven"
      data-bs-parent="#accordionFlushExample"
    >
      <div className="accordion-body">
      Getting started with MSG91 is simple. You can visit our website and
          sign up for an account. Once you have an account, you can explore our cloud-based communication platform in India , access the documentation and APIs, and start integrating our
          communication solutions into your business processes.
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