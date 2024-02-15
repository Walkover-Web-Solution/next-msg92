import Link from "next/link";
const pricingcampaign = () => {
  return <>
    <div className="price-card campaign rounded-2 bg-white p-4">
      <h3 className="text-start fw-bold c-fs-1 text-green">Free</h3>
      <h3 className="card-write c-fs-3 mt-3">Campaign usage is free.</h3>
      <h3 className="card-write c-fs-3 mb-3">Channel wise pricing will be applicable for sending message.</h3>
      <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="fw-semibold btn btn-dark rounded-1 py-2 px-3 mt-2">
        Get Started
      </button>      
    </div>
    <span className="more-about" href="#"> 
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            <span>Know more about Campaign</span>
          </span>
  </>;
};

export default pricingcampaign;