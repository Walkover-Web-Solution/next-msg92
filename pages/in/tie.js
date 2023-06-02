import React, { useState } from "react";

const Tie = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerify = () => {
    // Do something with the verificationCode
    console.log(verificationCode);
  };
  

  return (
    <>
      <div className="container text-center overflow-hidden">
        <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12">
          <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
            <h1 className="heading page-title">MSG91 x TiE</h1>
          </div>

          <div className="p-3">
            <h2 className="small-heading w-md-75 w-100 mx-auto fw-normal mt-4">
              Exclusively offered to TiE members only
            </h2>

            <div className="d-flex justify-content-center flex-wrap mt-5" style={{'gap':'32px'}}>
              
              <div>
                <div className="card tie-banner-card">
                  <div className="card-body">
                    <img src="/img/logo.svg" />
                    <div className="my-3 c-fs-2">
                      <strong>₹20,000</strong> wallet balance 
                    </div>
                    <button
                      data-bs-toggle="modal" data-bs-target="#msg91TieVerification"              
                        className="btn btn-dark c-fs-4 "
                      >
                        Apply
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="card tie-banner-card" >
                  <div className="card-body">
                    <img src="/img/tie/giddh-logo.svg" style={{'margin-top':'15px'}}/>
                    <div className="my-3 c-fs-2">
                      <strong>₹4,000</strong> Giddh app subscription
                    </div>
                    <button
                      data-bs-toggle="modal" data-bs-target="#msg91TieVerification"                  
                      className="btn btn-dark c-fs-4 "
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>          
        </div>
      </div>

      <div className="d-flex gap-5 flex-lg-row flex-column-reverse justify-content-between align-items-center  container my-5 py-5">
        <div className="d-flex flex-column gap-4 ">
          <h2 className="c-fs-1">Engage your audience</h2>

          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Developer-friendly APIs to seamlessly integrate SMS, Email, Voice,
              WhatsApp and other channels
            </h4>
          </div>
          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Connect, engage and interact with your customers through
              omnichannel messaging.
            </h4>
          </div>
          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Automate your workflows for streamlined operations.
            </h4>
          </div>
          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Measure your campaign performance with real-time tracking and
              analytics
            </h4>
          </div>
          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Explore our comprehensive range of communication tools to cater to
              your business-specific needs
            </h4>
          </div>
        </div>
        <img
          className="tei-feture-img"
          src="/img/tie/tie-engage-your-audience.svg"
        />
      </div>
      <div className="d-flex gap-5 flex-lg-row-reverse flex-column-reverse justify-content-between align-items-center container my-5 py-5">
        <div className="d-flex flex-column gap-4 ">
          <h2 className="c-fs-1">Revolutionize your accounting</h2>

          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Complimentary subscription to the revolutionary accounting app
              Giddh.
            </h4>
          </div>
          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Invoicing, expense tracking and bank reconciliation made easy.
            </h4>
          </div>
          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Take informed decisions based on real-time insights and financial
              reporting.
            </h4>
          </div>
          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Integrates seamlessly with existing systems for efficient
              financial management.
            </h4>
          </div>
          <div className="d-flex gap-2 ">
            <img src="/img/check-tie.svg" className="check-tie" />
            <h4 className="c-fs-3">
              Simplify bookkeeping and gain complete control over your company's
              finances.
            </h4>
          </div>
        </div>
        <img
          className="tei-feture-img"
          src="/img/tie/giddh.svg"
        />
      </div>
      
      <div className="d-flex gap-5 flex-lg-row-reverse flex-column-reverse justify-content-between align-items-center container my-5 py-5">
        <div className="d-flex flex-column gap-4 ">
          <h2 className="c-fs-1">Take your business to extraordinary heights with MSG91 x TiE</h2>

          <div className="d-flex gap-2 ">            
            <h4 className="c-fs-3">
              Unlock the ₹20,000 wallet balance and the ₹4,000 Giddh app subscription exclusively offered to dTiE members. Take charge of your finances with real-time insights. Choose from SMS campaigns, email marketing, voice calls, WhatsApp messaging and more to amplify customer engagement and drive conversions with targeted messaging.
            </h4>
          </div>
                    
        </div>        
      </div>
      
      <div className="c-bg-grey py-5  d-flex flex-column justify-content-sm-center align-items-center">
        <div className="py-4  container text-center d-md-flex justify-content-sm-between align-items-center flex-xl-row flex-lg-column flex-sm-column flex-md-column">
          <span className="pro-heading c-head">
            Unleash your potential with MSG91 x TiE
          </span>
          <div className="mt-3 mt-xxl-0 d-flex flex-wrap justify-content-center gap-3">
            <a
              href="https://control.msg91.com/signup/"
              className="btn px-4 py-3 btn-dark c-fs-4 "
              data-bs-toggle="modal" data-bs-target="#msg91TieVerification"
            >
              Apply now for MSG91
            </a>
            <a
              href="https://giddh.com/signup/"
              className="btn px-4 py-3 btn-dark c-fs-4 "
              data-bs-toggle="modal" data-bs-target="#msg91TieVerification"
            >
              Apply now for Giddh
            </a>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="msg91TieVerification"
        tabIndex="99"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Verify your TiE ID:
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label for="tie-id" className="form-label">Enter TiE ID</label>
              <input
                type="text"
                className="form-control"
                value={verificationCode}
                id="tie-id"
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleVerify}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
export default Tie;
