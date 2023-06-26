import { useState } from "react";

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
        <button className="btn btn-dark mt-3" onClick={handleReadMore}>
          {showInsms ? "Read Less" : "Read More"}
        </button>
        {showInsms && (
          <div className="insms-soc c-fs-3">
            <p className="my-3">
              In a world brimming with competition and countless market players,
              businesses are constantly seeking innovative ways to forge
              stronger connections with their partners and captivate their
              target audience. The art of successful communication becomes the
              secret element that distinguishes the winners in this changing
              environment. You need a game-changer to escape the ordinary and
              leave an incredible impression. Introducing MSG91, transactional
              sms service provider, the force that will transform the way you
              interact with your audience. Prepare to set off on a trip where
              connectivity takes on a whole new meaning and creativity has no
              limitations. Businesses may easily engage with clients and channel
              partners by utilizing MSG91's robust SMS API for Developers,
              revolutionizing their communication strategies.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Insms;
