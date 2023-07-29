import Link from "next/link";
const pricingcampaign = () => {
  return <>
    <div className="price-card campaign d-flex col-11 col-lg-10 flex-column mx-auto c-bg-grey p-4">
      <h3 className="c-fs=3">Connect to our team for the customized pricing</h3>
      <Link href="/contact-us" className="btn btn-outline-dark col-6 col-sm-5 col-md-3 mx-auto mt-3">Talk to an Expert</Link>
    </div>
  </>;
};

export default pricingcampaign;
