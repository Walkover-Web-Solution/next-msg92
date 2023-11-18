import Link from "next/link";
const pricingcampaign = () => {
  return <>
    <div className="price-card campaign d-flex col-11 col-lg-10 flex-column mx-auto c-bg-grey p-4 gap-4 align-items-center">
      <h3 className="c-fs=3">Connect to our team for the customized pricing</h3>
      <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="c-fs-4 btn btn-outline-dark mt-2">
        Talk to an Expert
      </button>      
    </div>
  </>;
};

export default pricingcampaign;
