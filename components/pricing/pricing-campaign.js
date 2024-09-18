const pricingcampaign = () => {
  return <>
    <div className="price-card campaign rounded-2 bg-white p-4">
      <h2 className="text-start fw-bold c-fs-1 text-green">Free</h2>
      <h3 className="c-fs-3 mt-3">Campaign usage is free.</h3>
      <h3 className="c-fs-3 mb-3">Channel wise pricing will be applicable for sending message.</h3>
      <a
        href="/signup?service=campaign"
        target="_blank"
        className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3`}
      >
          Get Started
      </a>
    </div>
    <a href="/campaign">
      <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
      <span className="link">Know more about Campaign</span>
    </a>
  </>;
};

export default pricingcampaign;