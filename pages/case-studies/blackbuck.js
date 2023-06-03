
import Footer from "@/components/footer";


const blackbuck = () => {
  return (
    <>
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/blackbuck.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Services (Logistics)</span>
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
              <h5 className="sub-heading py-5">Blackbuck conducts seamless operations using SMS communication via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Case Studies - Black Buck</h1>
        <span className="c-fs-3"><a target="_blank" href="https://www.blackbuck.com/">Blackbuck</a> is an online marketplace platform for freight where shippers and fleet operators can engage seamlessly. With the vision to make freight a seamless experience, and to ensure it happens efficiently, Blackbuck has been rigorously working on establishing a robust communication network for their customers’ satisfaction.</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Problem</h2>
        <span className="c-fs-3">A well-established communication channel with teachers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a huge volunteer teachers’ base without a robust and secure communication channel is a challenge. Thus to convey important information like details of vacancies, events and courses for better educational network, a communication channel targeting wide reach for mass audience (teachers) is required.</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Solution</h2>
        <span className="c-fs-3">Blackbuck is managing their operations by its website https://www.blackbuck.com/ and communication efficiently with SMS communications via MSG91 API. With MSG91 APIs and real-time robust system, SMS is delivered to the customers to build communication at different events such as:</span>
        <ul>
          <li className="c-fs-3 mt-3">The customer receives a <a href="#">Order Confirmation SMS.</a></li>
          <li className="c-fs-3 mt-1">If the <a href="#">order gets cancelled</a>, the customer receives an <a href="#">Order Cancellation SMS.</a></li>
          <li className="c-fs-3 mt-1">The customer receives a <a href="#">Shipment delivery Confirmation SMS </a> along with details upon dispatch of a shipment for delivery.</li>
          <li className="c-fs-3 mt-1"><a href="#">Payment transaction details </a> are sent via SMS.</li>
          <li className="c-fs-3 mt-1"><a href="#">Sends updates</a> and details to the truck drivers in <a href="#">Hindi using Unicode.</a></li>
          <li className="c-fs-3 mt-1">Sends <a href="#">checkpost details</a> and <a href="#">toll payment amounts</a> to the truck owners via transactional SMS.</li>
          <li className="c-fs-3 mt-1">Customer receives SMS notifications regarding all the <a href="#">Ongoing Offers and Updates.</a></li>
          <li className="c-fs-3 mt-1">Sends <a href="#">App download link</a> and call to action via promotional SMS.</li>
          <li className="c-fs-3 mt-1"><a href="#">Invites truck drivers and owners</a> to join Blackbuck via promotional SMS.</li>
          <li className="c-fs-3 mt-1">Sends <a href="#">offers to buy trucks</a> via promotional SMS.</li>
        </ul>
        <span className="c-fs-3">This way Blackbuck has been able to establish and maintain an effective communication with Customers, Truck owners and drivers via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Benefit</h2>
        <span className="c-fs-3">As a result, the customer, truck owners and drivers gets regular updates and ongoing offers via a secured channel, making the operations reliable and seamless, which results in a better rapport with the team and customers and thereby, increase in sales.</span>
      </div>
    <div className="container py-5">
<a href="/case-studies">Back</a>
</div>
</>
  );
};

export default blackbuck;
