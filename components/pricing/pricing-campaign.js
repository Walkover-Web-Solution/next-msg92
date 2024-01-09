import Link from "next/link";
const pricingcampaign = () => {
  return <>
    <div className="price-card campaign rounded-2 bg-white p-4">
      <h3 className="text-start fw-bold c-fs-1 text-green">Free</h3>
      <h3 className="card-write c-fs-4 mt-2">Campaign usage is free.</h3>
      <h3 className="card-write c-fs-4 mb-3">Channel wise pricing will be applicable for sending message.</h3>
      <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="btn-sm btn btn-dark mt-2 rounded-1">
        Get Started
      </button>      
    </div>
    <a href="#"> 
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            Know more about compaign
          </a>
  </>;
};

export default pricingcampaign;
