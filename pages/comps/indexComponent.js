import { useRouter } from "next/router";
import {MdKeyboardArrowRight} from "react-icons/md"
import TrustedBy from "@/components/trustedby";
const indexComp = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <>
      <div className="container d-flex flex-column gap-4 align-items-center text-center mt-60">
        <h1 className="heading text-dark col-10 col-xxl-8 col-xl-8 ">
          Cloud Communication platform for all your ideas!
        </h1>
        <h3 className="small-heading text-dark">
          Secure and robust APIs for SMS, Email, Voice, Authentication and more.
        </h3>
        <a className="">
          <button className="btn btn-dark small-heading c-fw-sb ls-3 btn-lg">
            Get Started
          </button>
        </a>
        <TrustedBy />
      </div>
      <div className="section product-sec d-flex my-5">
        <div className="product-card">
          <div className="product-head">
            <div className="product-head-text">
              <span className="small-heading">Conversion</span>
            </div>
            <div className="product-head-img hello-pro"></div>
          </div>
          <div className="product-content pro-alt p-3 d-flex flex-column justify-content-center gap-2">
            <p className="c-fs-3 text-white">
              Boost audience engagement through smart Platform.
            </p>
            <a href="/hello" target="">
              <button className="c-fs-3 pro-btn justify-content-between d-flex align-items-center px-3 py-2">
                <span>
                <img src="./img/icon/hello-ico.svg" className="pro-sec-ico me-3"/>
                <span className="">Hello</span>
                </span>
                <MdKeyboardArrowRight/>

              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default indexComp;
