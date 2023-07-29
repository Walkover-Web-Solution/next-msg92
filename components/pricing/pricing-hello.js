import {MdDoneOutline} from "react-icons/md"
import Link from "next/link";
const pricinghello = ({ countryCode }) => {
  const notavailable = "/img/not-available-red.svg";
  const available = "/img/available-green.svg";
  let basicprice = "0";
  let basicRate = "0";
  let premiumprice = "0";
  let premiumRate = "0";
  if (countryCode == "IN") {
    basicprice = "₹500";
    basicRate = "₹0.50";
    premiumprice = "₹1000";
    premiumRate = "₹0.75";
  } else {
    basicprice = "$10";
    basicRate = "$0.0061";
    premiumprice = "$20";
    premiumRate = "$0.0091";
  }
  // console.log(basicRate,countryCode)
  return (
    <>

<div className="price-card hello d-flex col-10 col-lg-11 flex-md-row flex-column mx-auto border">
    <div className="col-12 col-md-8 col-xl-9 text-start p-4 bg-white">
      <h3>Customer support Platform</h3>
      <div className="d-flex"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">Integrate multiple channels on a single platform - Email, RCS, social media, call & more</p></div>
      <div className="d-flex mt-2"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">Track, monitor, analyze agent performance</p></div>
      <div className="d-flex mt-2"><div className="c-fs-4 text-primary pe-2"><MdDoneOutline/></div><p className="c-fs-4">18*7 free customer support</p></div>
    </div>
    <div className="c-bg-grey col-12 col-md-4 col-xl-3  p-4 text-start">
      <h3 className="c-fs-3">Access platform for FREE</h3>
      <p className="c-fs-4 mt-2">Pay only for the channels you use</p>
      <Link href="https://control.msg91.com/signup/" target="_blank" className="btn btn-outline-dark mt-3 px-5">Get Started</Link>
    </div>
    </div>


      {/* <div className="container border">
        <div className="column text-start">
          <div className="row c-head c-fs-3 py-2  border-bottom">
            <div className="col-4"></div>
            <div className="col">Free</div>
            <div className="col">Basic</div>
            <div className="col">Premium</div>
          </div>
          <div className="row py-2  border-bottom">
            <div className="col-4"></div>
            <div className="col d-flex flex-column">
              <span className="c-fs-1 c-head text-green">Free</span>
              <span className="c-fs-4 c-head">(14 Days Trial)</span>
            </div>
            <div className="col d-flex flex-column gap-2">
              <span className="c-fs-1 c-head text-green">{basicprice}</span>
              <span className="c-fs-4 ">Per Inbox/Month</span>
              <span className="c-fs-5 ">
                Extra UAT Charge
                <br />
                {basicRate}/Ticket
              </span>
            </div>
            <div className="col d-flex flex-column gap-2">
              <span className="c-fs-1 c-head text-green">{premiumprice}</span>
              <span className="c-fs-4 ">Per Inbox/Month</span>
              <span className="c-fs-5 ">
                Extra UAT Charge
                <br />
                {premiumRate}/Ticket
              </span>
            </div>
          </div>
          <div className="row  c-fs-5 py-2  border-bottom">
            <div className="col-4"></div>
            <div className="col">
              The Trial plan includes standard features, standard support.
            </div>
            <div className="col">
              The Basic plan includes additional features such as priority
              support .
            </div>
            <div className="col">
              The standard plan includes priority support with a dedicated
              account manager.
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Free 3 Inbox/Month</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">500 Tickets/month</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Multi Channel SUpport</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Unlimited Agents</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Unlimited Teams</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Analytics</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Saved Replies</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Chat Bot</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Chat Widget Customization</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Email ticketing System</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Integration options</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Chat Summarization</div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">UAT</div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Unlimited Integration options</div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Offline Experience - Chat Widget </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Workflow </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Video Call </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Screen Sharing </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Screen Control </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Priority Support </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
          <div className="row align-items-center c-fs-4 py-2  border-bottom">
            <div className="col-4">Dedicated Account Manager </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={notavailable} />
            </div>
            <div className="col d-flex justify-content-center">
              <img src={available} />
            </div>
          </div>
        </div>
      </div>
        <div className="text-start my-4 c-fs-5">
          <p>
            *inbox is considered for every channel such as Email inbox, whatsapp
            inbox, chat inbox etc. <br/>*UAT : Unique Active Ticket per month, Those
            tickets count will include all the inboxes, tickets.<br/> *Inboxes will be
            prepaid and prorated. He has to pay for the inbox whenever he wants
            to create or enable an inbox
          </p>
        </div> */}
    </>
  );
};

export default pricinghello;
