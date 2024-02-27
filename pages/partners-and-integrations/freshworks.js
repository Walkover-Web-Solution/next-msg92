import TrustedBy from "components/trustedby";
import { MdDone } from "react-icons/md";

const IntPage = () => {
  // const router = useRouter();
  // var browserPath = router.asPath;
  // var intpage = browserPath.split("/")[2];
  // console.log(intpage);
  // var intData = data?.[intpage];
  // console.log(intData);

  return (
    <>
      <div className="int-page-head freshworks d-flex py-3">
        <div className="container d-flex align-items-center gap-4">
          <img src="/img/integrations/freshworks-logo.svg" alt="freshworks logo"/>
          <div>
            <h1 className="sub-heading">Freshworks Integration</h1>
            <h2 className="c-fs-4 mt-2">
              Streamline Your Engagement Workflows
            </h2>
          </div>
        </div>
      </div>
      <div className="product-banner-wrp">
        <div className="container text-center overflow-hidden">
          <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
            <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
              <h1 className={`heading page-title`}>
                Engage Effectively With Freshworks
              </h1>
            </div>
            <div className="p-3">
              <p className="c-fs-4 w-md-75 w-100 mx-auto fw-normal">
              The MSG91 Freshworks Plugin lets you send SMS inside Freshsales Suite / Freshdesk so you can automate your business workflows and customer engagement with ease, without embedding any code
              </p>
              <a
                href="https://www.freshworks.com/apps/freshworks_crm/msg91/"
                className="btn btn-dark btn-lg c-fs-2 my-4"
                target="_blank"
              >
                Get The Plugin
              </a>
              {/* <h2 className="c-fs-4 w-md-75 w-100 mx-auto fw-normal">
              Effortlessly integrate SMS, Email, RCS, Voice, WhatsApp with Customer Service, IT, CRM software and more. 
              </h2> */}
            </div>
          </div>
          {/* <img
            src="/img/integrations/code-img-int.svg"
            className="img-fluid product-page-img mx-auto"
            alt="#"
          /> */}
        </div>
      </div>
      <div className="container d-flex flex-column justify-content-center my-5 py-4 text-center">
        <h2 className="sub-heading c-head">
          This powerful integration empowers businesses to
        </h2>
        <div className="row my-4 gap-5">
          <div className=" d-flex col flex-column align-items-center  gap-2 p-5 int-feature-box ">
            <MdDone className="sub-heading col-int freshworks" />
            <h3>Automate engagement tasks</h3>
          </div>
          <div className=" d-flex col flex-column align-items-center  gap-2 p-5 int-feature-box ">
            <MdDone className="sub-heading col-int freshworks" />
            <h3>Streamline communication processes</h3>
          </div>
          <div className=" d-flex col flex-column align-items-center  gap-2 p-5 int-feature-box ">
            <MdDone className="sub-heading col-int freshworks" />
            <h3>Enhance Overall Efficiency</h3>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center text-center justify-content-center">
        <TrustedBy />
      </div>
      <div className="c-bg-grey py-5  d-flex flex-column justify-content-sm-center align-items-center">
        <div className="py-4  container text-center d-md-flex justify-content-sm-between align-items-center flex-xl-row flex-lg-column flex-sm-column flex-md-column">
          <span className="pro-heading c-head">
            Customize your workflow to fit your specific requirements
          </span>
          <div className="mt-3 mt-xxl-0 d-flex flex-wrap justify-content-center gap-3">
            <a
              href="https://www.freshworks.com/apps/freshworks_crm/msg91/"
              className="btn px-4 py-3 btn-outline-dark c-fs-4 "
              target="_blank"
            >
              Get The Plugin
            </a>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column flex-sm-row align-items-center  gap-5 my-5">
        <p className="c-fs-2">
          Create custom triggers and actions that initiate messaging and
          increase engagement based on specific events or conditions in
          connected applications. 
          <br/>
          <br/>
          Send order alerts and recover abandoned
          checkouts via WhatsApp / SMS Create customer journeys with
          multi-channel communication Update customers on critical events- New
          Signups, Payment Confirmation, Send Invoice PDF
        </p>
        <img className="col-12 col-sm-6" src="/img/integrations/zapeir-graphics.svg" alt="zapeir graphics image"/>
      </div>
      <div className="container my-5">
        <h1 className="sub-heading c-head mb-3">
          The MSG91 Freshworks Plugin Offers
        </h1>
        <div className="d-flex align-items-center gap-2 my-3">
          <MdDone className="c-fs-1 col-int freshworks" />
          <p className="c-fs-2">A user-friendly interface</p>
        </div>
        <div className="d-flex align-items-center gap-2 my-3">
          <MdDone className="c-fs-1 col-int freshworks" />
          <p className="c-fs-2">Intuitive setup process</p>
        </div>
        <div className="d-flex align-items-center gap-2 my-3">
          <MdDone className="c-fs-1 col-int freshworks" />
          <p className="c-fs-2">Pre-build templates</p>
        </div>
      </div>
      <div className="container mb-4">
      <zapier-zap-templates
        theme="light"
        apps="msg91"
        create-without-template="hide"
        limit="10"
        link-target="new-tab"
        presentation="row"
        use-this-zap="show"
        ></zapier-zap-templates>
        </div>
      <div className="d-flex flex-column flex-md-row container align-items-center justify-content-between my-5">
        <h2 className="c-head c-fs-1 col-12 col-md-8 text-center text-md-start">
        Enhance your communication capabilities and automate your engagement tasks
        </h2>
          <a
            href="https://www.freshworks.com/apps/freshworks_crm/msg91/"
            className="btn btn-dark btn-lg c-fs-2 my-4"
            target="_blank"
          >
            Get the MSG91 Freshworks plugin
          </a>        
      </div>
    </>
  );
};
export default IntPage;
