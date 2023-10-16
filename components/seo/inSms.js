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
          Revolutionizing Business Communication: Empower Your Connectivity with
          MSG91's SMS Services and API Solutions
        </h1>
        <p className="c-fs-3 mt-3">
          MSG91 is an SMS service provider that helps businesses improve their
          communication. They offer transactional SMS services and a robust SMS
          API for developers. With their services, businesses can engage with
          clients and partners, send customizable messages globally, and benefit
          from features like real-time campaign monitoring and multilingual
          support. MSG91 also provides comprehensive support and cost-effective
          solutions. They aim to transform business communication by enhancing
          connectivity and engagement with customers.
        </p>

        {showInsms && (
          <div className="insms-soc c-fs-3">
            <p className="my-3">
              In a world brimming with competition and countless market players,
              businesses are constantly seeking innovative ways to forge
              stronger connections with their partners and captivate their
              target audience. The art of successful communication becomes the
              secret element that distinguishes the winners in this changing
              environment. You need a game-changer to escape the ordinary and
              leave an incredible impression. Introducing <a href="https://msg91.com/" target="_blank">MSG91</a>, transactional
              sms service provider, the force that will transform the way you
              interact with your audience. Prepare to set off on a trip where
              connectivity takes on a whole new meaning and creativity has no
              limitations. Businesses may easily engage with clients and channel
              partners by utilizing MSG91's robust SMS API for Developers,
              revolutionizing their communication strategies.
            </p>
            <div>
              <div className="my-3 pt-3">
                <div className="d-flex align-items-center gap-2 my-2">
                  <MdCircle className="c-fs-5" />
                  <h3 className="c-head c-fs-3 ">
                    Engage Your Customers Globally With Quick, Scalable, and
                    Customizable Messages
                  </h3>
                </div>
                <p className="c-fs-4">
                  At MSG91, we understand the importance of reaching your
                  customers effectively, no matter where they are. Our powerful
                  transactional SMS API India services enable you to engage with
                  your audience globally, ensuring your messages are delivered
                  quickly and efficiently.
                </p>
              </div>
              <div className="my-3 ">
                <div className="d-flex align-items-center gap-2 my-2">
                  <MdCircle className="c-fs-5" />
                  <h3 className="c-head c-fs-3 ">
                    Integrate Our Developer-Friendly Apis To Send And Receive
                    Text Messages
                  </h3>
                </div>
                <p className="c-fs-4">
                  With our developer-friendly APIs, integrating SMS capabilities
                  into your existing systems and applications is a breeze. Our
                  robust transactional SMS API India provides seamless
                  integration, allowing you to send and receive text messages
                  effortlessly.
                </p>
              </div>
              <div className="my-3 ">
                <div className="d-flex align-items-center gap-2 my-2">
                  <MdCircle className="c-fs-5" />
                  <h3 className="c-head c-fs-3 ">
                    Distributed Carrier Network & Intelligent Routing For
                    Highest Delivery and Lowest Latency
                  </h3>
                </div>
                <p className="c-fs-4">
                  Being a transactional sms provider in India, we take pride in
                  our extensive distributed carrier network and intelligent
                  routing system, ensuring the highest message delivery level
                  and the lowest latency possible. With a transactional SMS
                  provider in India, you can trust that your messages will reach
                  their intended recipients promptly and reliably.
                </p>
              </div>
            </div>
            <div>
              <h2 className="c-head c-fs-1 mt-5">Our Dynamic SMS Solutions</h2>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">
                  Seamless Information Dissemination:
                </h3>
                <p className="c-fs-4">
                  With MSG91', a transactional SMS service provider, businesses
                  can efficiently disseminate information to their target
                  audience. We ensure swift delivery using your network operator
                  and, if needed, seamlessly switch to alternate operators for
                  successful transmission. This comprehensive approach enables
                  businesses to involve borrowers, stakeholders, and customers
                  worldwide, creating a full-circle communication experience.
                  Notably, MSG91, an SMS API service provider online, transcends
                  geographical boundaries, allowing businesses to connect with
                  customers across countries effortlessly.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Multimedia Capabilities:</h3>
                <p className="c-fs-4">
                  To enhance communication experiences, SMS API service
                  providers online enable businesses to send text, videos,
                  pictures, and GIFs via SMS. This comprehensive multimedia
                  support ensures businesses effectively convey their message,
                  incorporating visual elements that capture attention and
                  enhance engagemen
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">
                  Real-time Campaign Monitoring:
                </h3>
                <p className="c-fs-4">
                  MSG91's intuitive dashboard empowers businesses to monitor SMS
                  campaigns in real time. Through the dashboard, businesses can
                  track campaign performance, analyze message delivery, and
                  measure the effectiveness of call-to-action (CTA) links. This
                  real-time monitoring capability enables businesses to make
                  data-driven decisions and optimize communication strategies
                  for better results.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Opt-in Flexibility:</h3>
                <p className="c-fs-4">
                  Respecting customers' preferences, MSG91 allows recipients to
                  choose whether they wish to receive messages through our
                  transactional SMS API India service or not. This approach
                  ensures that customers are not inundated with irrelevant
                  information, fostering a more personalized and engaging
                  communication experience. Administrators can easily manage
                  user-level preferences, ensuring compliance and enhancing
                  customer satisfaction.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">
                  Multilingual Support for Global Reach:
                </h3>
                <p className="c-fs-4">
                  To facilitate global communication, MSG91 offers multilingual
                  support, allowing businesses to reach customers in their
                  preferred language. This feature promotes an inclusive and
                  interactive interaction, breaking language barriers and
                  fostering stronger connections with diverse audiences.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Dedicated 24/7 Support:</h3>
                <p className="c-fs-4">
                  MSG91, being among the best transactional SMS providers in
                  India understands the importance of reliable support, so we
                  provide all clients and partners with round-the-clock
                  assistance. Our dedicated support teams are always ready to
                  promptly address queries or concerns, ensuring a seamless
                  business experience.
                </p>
              </div>
            </div>
            <div>
              <h2 className="c-head c-fs-1 mt-5">
                Benefits of Online SMS API Service Provider
              </h2>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Ease of Access:</h3>
                <p className="c-fs-4">
                  As a transactional SMS provider in India, we offer a
                  user-friendly platform that allows you to access and manage
                  your SMS services conveniently from anywhere with an internet
                  connection.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Scalability:</h3>
                <p className="c-fs-4">
                  With SMS API service provider online, you can easily scale
                  your messaging capabilities based on your business needs.
                  Whether you're sending a few messages or running large-scale
                  campaigns, our platform can handle it.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Comprehensive Features:</h3>
                <p className="c-fs-4">
                  Enjoy a range of features and functionalities, including
                  message scheduling, personalized messaging, delivery tracking,
                  and reporting, empowering you to optimize your SMS campaigns.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Cost-Effectiveness:</h3>
                <p className="c-fs-4">
                  By choosing an online SMS or <a href="https://msg91.com/in/voice" target="_blank">voice API for business</a>, you can
                  benefit from cost savings compared to traditional
                  communication channels. Pay only for the SMS credits you use
                  without needing additional hardware or infrastructure.
                </p>
              </div>
              <div className="my-3">
                <h3 className="c-fs-3 c-head my-2">Enhanced Security:</h3>
                <p className="c-fs-4">
                  SMS-based authentication through SMS authentication API adds
                  an extra layer of security by requiring users to have physical
                  access to their registered mobile phones to receive the OTP.
                </p>
              </div>
            </div>
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
                      How does an SMS API work?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      An SMS API for developers provides functions, methods, and
                      endpoints to interact with an SMS gateway. Developers can
                      request the API to send messages, retrieve delivery
                      reports, manage contacts, and perform other SMS-related
                      operations. The API handles the processing and delivery of
                      the messages, ensuring seamless communication between the
                      application and the recipients.
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
                      How can an SMS API be used for transactional messages?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      An SMS API can send transactional messages, such as order
                      confirmations, appointment reminders, and account
                      notifications. Developers can integrate the API into their
                      systems to trigger automated messages based on specific
                      events or conditions, ensuring timely and relevant
                      customer communication.
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
                      How does an SMS authentication API work?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      When a user initiates the authentication process the
                      application or system generates a unique OTP or
                      verification code. The API then sends this code to the
                      user's generated mobile number via SMS. The user receives
                      the SMS and enters the code into the application or
                      system, which verifies its correctness. If the code
                      matches, the user is granted access or completes the
                      authentication process successfully. This is how SMS
                      authentication API works.
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
