import link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  return (
    <>
      <div className="px-2 footer pt-5">
        <div className="footer_Main_Content mt-4 mb-4 container">
          <div className="row justify-content-sm-between">
            <div className="col-6 col-lg-2 mb-4">
              <h4 className="c-fs-5 d-flex flex-column">Our Products</h4>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Hello
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Segmento
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  campaign
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  OTP
                </a>
              </div>
            </div>

            <div className="col-6 col-lg-2 mb-4">
              <h4 className=" c-fs-5 d-flex flex-column">Channels</h4>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  SMS
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Email
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Voice
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  RCS
                </a>
                {/* <a href={`${path}/virtual-number`} className="c-fs-5 mt-2 c-fw-t">
                  Virtual Number
                </a> */}
                {/* <a href="#" className="c-fs-5 mt-2 c-fw-t">
                                    WhatsApp
                                </a>
                                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                                    Telegram
                                </a>
                                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                                    Push Notification
                                </a> */}
                {/* <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  View All Channels
                </a> */}
              </div>
            </div>

            <div className="col-6 col-lg-2 mb-4">
              <h4 className="c-fs-5 d-flex flex-column">Resources</h4>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                {/* <a href="/industries" target="_blank" className="c-fs-5 mt-2 c-fw-t">
                  Industries
                </a> */}
                <a
                  href="https://msg91.com/guide/"
                  target="_blank"
                  className="c-fs-5 mt-2 c-fw-t"
                >
                  Guide
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Case Studies
                </a>
                <a
                  href="https://msg91.com/help"
                  target="_blank"
                  className="c-fs-5 mt-2 c-fw-t"
                >
                  FAQ
                </a>
                <a
                  href="https://docs.msg91.com/reference/send-sms"
                  target="_blank"
                  className="c-fs-5 mt-2 c-fw-t"
                >
                  API Documentation
                </a>
                <a
                  href="https://features.msg91.com/feature-requests"
                  target="_blank"
                  className="c-fs-5 mt-2 c-fw-t"
                >
                  Request a Feature
                </a>
              </div>
            </div>

            <div className="col-6 col-lg-2 mb-4">
              <h4 className=" c-fs-5 d-flex flex-column">Discover</h4>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                <a
                  href="/comps/aboutUsComponent"
                  className="c-fs-5 mt-2 c-fw-t"
                >
                  About Us
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Pricing
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Contact Us
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Developers
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  MSG91 For Startups
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Partners and Integrations
                </a>
                <a href="#" className="c-fs-5 mt-2 c-fw-t">
                  Become a Partner
                </a>
                <a
                  href="https://apply.workable.com/walkover/"
                  target="_blank"
                  className="c-fs-5 mt-2 c-fw-t"
                >
                  Career
                </a>
              </div>
            </div>

            <div className="d-flex d-lg-block col-12 col-lg-2 f-social-a-cont mb-4 text-start text-lg-end order-first order-lg-last">
              <div className="footer-social-a-content col-6 col-lg-12">
                <span className="footer-social-a-text  c-fs-5 d-flex flex-column">
                  Download Apps
                </span>
                <div className="footer-social-a d-flex mt-3 justify-content-start justify-content-lg-end">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hellornapp"
                    target="_blank"
                    className="me-4"
                  >
                    <img
                      src="../img/android.svg"
                      width={20}
                      height={23}
                      alt="#"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/hello-by-msg91/id1635375551"
                    target="_blank"
                  >
                    <img
                      src="../img/apple.svg"
                      width={20}
                      height={24}
                      alt="#"
                    />
                  </a>
                </div>
              </div>
              <div className="footer-social-a-content col-6 col-lg-12 mt-lg-5">
                <span className="footer-social-a-text c-fs-5 d-flex flex-column">
                  Follow Us
                </span>
                <div className="footer-social-a d-flex mt-3 align-items-center justify-content-start justify-content-lg-end">
                  <a
                    href="https://www.facebook.com/msg91"
                    target="_blank"
                    className="me-4"
                  >
                    <img
                      src="../img/facebook.svg"
                      width={24}
                      height={24}
                      alt="#"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/msg91/"
                    target="_blank"
                    className="me-4"
                  >
                    <img
                      src="../img/linkedin.svg"
                      width={24}
                      height={24}
                      alt="#"
                    />
                  </a>
                  <a
                    href="https://twitter.com/msg91"
                    target="_blank"
                    className="me-4"
                  >
                    <img
                      src="../img/twitter.svg"
                      width={24}
                      height={24}
                      alt="#"
                    />
                  </a>
                  <a href="https://www.youtube.com/@WalkoverWS" target="_blank">
                    <img
                      src="../img/youtube.svg"
                      width={24}
                      height={24}
                      alt="#"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-5 footer2 w-100">
          <div className="container">
            <div className="d-flex justify-content-sm-between flex-column flex-lg-row">
              <div className="mt-4 mt-lg-0 gap-3">
                <a href="#" className="c-fs-5 ">
                  Terms of use
                </a>
                <span className="f2-spacer"> | </span>
                <a href="#" className="c-fs-5 ">
                  Privacy Policy
                </a>
                <span className="f2-spacer"> | </span>
                <a href="#" className="c-fs-5 ">
                  GDPR
                </a>
                <span className="f2-spacer"> | </span>
                <a href="#" className="c-fs-5 ">
                  Refund-Policy
                </a>
                <span className="f2-spacer"> | </span>
                <a href="#" className="c-fs-5 ">
                  No Spam
                </a>
                <span className="f2-spacer"> | </span>
                <a href="#" className="c-fs-5 ">
                  Startup Policy
                </a>
                <span className="f2-spacer"> | </span>
                <a href="#" className="c-fs-5 ">
                  Developer Policy
                </a>
                <span className="f2-spacer"> | </span>
                <a href="#" className="c-fs-5 ">
                  Cookie Policy
                </a>
              </div>
              <div className="mt-4 mt-lg-0">
                <span>
                  A Product of{" "}
                  <img
                    src="../img/walkover.svg"
                    width={20}
                    height={20}
                    alt="#"
                  />{" "}
                  <a href="https://walkover.in" target="_blank">
                    Walkover
                  </a>
                </span>
              </div>
            </div>
            <div className="c-fs-7 copyright mt-3">
              Copyright 2008-2020 MSG91 | All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
