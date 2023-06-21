import data from "@/data/int.json";
import { useRouter } from "next/router";
import TrustedBy from "components/trustedby";

const Zapier = () => {
  // const router = useRouter();
  // var browserPath = router.asPath;
  // var intpage = browserPath.split("/")[2];
  // console.log(intpage);
  // var intData = data?.[intpage];
  // console.log(intData);

  return (
    <>
      <div className="int-page-head d-flex py-3">
        <div className="container d-flex align-items-center gap-4">
          <img src="\img\integrations\zapeir-logo.svg" />
          <div>
            <h1 className="sub-heading">Zapier Integration</h1>
            <h4 className="c-fs-4 mt-2">
              Streamline Your Engagement Workflows
            </h4>
          </div>
        </div>
      </div>
      <div className="product-banner-wrp">
        <div className="container text-center overflow-hidden">
          <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
            <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
              <h1 className={`heading page-title`}>
                Engage Effectively With Zapier
              </h1>
            </div>
            <div className="p-3">
              <p className="c-fs-4 w-md-75 w-100 mx-auto fw-normal">
                MSG91 can integrate with 5000+ apps via Zapier so you can
                automate your business workflows and customer engagement with
                ease, without embedding any code.
              </p>
              <a
                href="https://control.msg91.com/signup/"
                className="btn btn-dark btn-lg c-fs-2 my-4"
              >
                Get The Plugin
              </a>
              <h2 className="c-fs-4 w-md-75 w-100 mx-auto fw-normal">
                Effortlessly integrate SMS, Email, RCS, Voice, WhatsApp with
                CRM, Project Management Tools, E-Commerce Platforms, and more.
              </h2>
            </div>
          </div>
          {/* <TrustedBy /> */}
          <img src="\img\integrations\code-img-int.svg" className="img-fluid product-page-img mx-auto" alt="#" />
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
};
export default Zapier;
