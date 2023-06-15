const Zapier = () => {
  return (
    <>
      <div className="d-flex flex-column w-100 align-items-start gap-2 integration-head-cont py-1 container">
        <div className="integrations-head d-flex align-items-center">
          <img
            src="/img/integrations/zaiper.png"
            className="integrations-logo"
            alt="zapier"
          />
          <div className="ms-4 d-grid gap-2">
          <h1 className="sub-heading text-dark ">Zapier Integration</h1>
          <h3 className="c-fs-3 text-dark">
            Streamline Your Engagement Workflows
          </h3>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column c-gap-1 align-items-center text-center ">
        {/* <h1 className="heading text-dark col-md-10 col-12 col-xxl-8 col-xl-8 ">
        Zapier Integration
        </h1> */}
        <h3 className="small-heading text-dark mt-3">
          Engage Effectively With Zapier
        </h3>
        <p className="c-fs-3 col-6">
          MSG91 can integrate with 5000+ apps via Zapier so you can automate
          your business workflows and customer engagement with ease, without
          embedding any code
        </p>
        <a
          href="https://control.msg91.com/signup/"
          target="_blank"
          className="btn btn-dark small-heading px-3 py-2 mt-3 c-fw-sb px-md-4 py-md-3 ls-3 "
        >
          Get The Plugin
        </a>
        {/* <TrustedBy /> */}
      </div>
      <div className="container py-5 d-grid gap-4">
        <p className="c-fs-3 col-10">
          Effortlessly integrate SMS, Email, RCS, Voice, WhatsApp with CRM,
          Project Management Tools, E-Commerce Platforms, and more.
        </p>
        <h3 className="small-heading">
          This powerful integration empowers businesses to
        </h3>
        <div className="d-grid gap-3">
          <div className="d-flex align-items-center gap-2">
            <img src="/img/check-tie.svg" className="check-int" />
            <span className="c-fs-3">Automate engagement tasks</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <img src="/img/check-tie.svg" className="check-int" />
            <span className="c-fs-3">Streamline communication processes</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <img src="/img/check-tie.svg" className="check-int" />
            <span className="c-fs-3">Enhance overall efficiency</span>
          </div>
        </div>
      </div>
      <div className="d-flex container text-center flex-column gap-3 my-md-5 my-2">
        <span className="c-fs-1 ">
          Trusted by<span className="c-fw-sb"> 30,000+ </span>businesses
        </span>
        <span className="c-fs-1 ">
          {" "}
          Customize your workflows to fit your specific requirements
        </span>
      </div>
      <div className="c-bg-grey py-5  d-flex flex-column justify-content-sm-center align-items-center">
        <div className="py-4  container text-start d-md-flex justify-content-sm-between align-items-center flex-xl-row flex-lg-column flex-sm-column flex-md-column">
          <span className="pro-heading c-head">
            Customize your workflows to fit your specific requirements
          </span>
          <div className="mt-3 mt-xxl-0 d-flex flex-wrap justify-content-center gap-3">
            <a href="/contact-us" className="btn px-4 py-3 btn-dark c-fs-4 ">
              Get The Plugin
            </a>
          </div>
        </div>
      </div>
      <div className="container py-5 d-grid gap-4">
        <h3 className="small-heading">The MSG91 Zapier Plugin offers</h3>
        <div className="d-flex gap-5">
          <div className="d-flex align-items-center gap-2">
            <img src="/img/check-tie.svg" className="check-int" />
            <span className="c-fs-3">A user-friendly interface</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <img src="/img/check-tie.svg" className="check-int" />
            <span className="c-fs-3">Intuitive setup process </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <img src="/img/check-tie.svg" className="check-int" />
            <span className="c-fs-3">Pre-built templates</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Zapier;
