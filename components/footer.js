import link from "next/link";
import { useRouter } from "next/router";
import { InlineWidget, PopupButton } from "react-calendly";
const Footer = ({path, year}) => {  
  path = (path?.length == 2)? '/'+path : '';
  return (
    <>
      <div className="px-2 footer pt-5">
        <div className="footer_Main_Content mt-4 mb-4 container">
          <div className="row justify-content-sm-between">
            <div className="col-6 col-lg-4 mb-4">
              <h1 className="c-fs-5 d-flex flex-column">Our products</h1>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                <a href={`${path}/hello`} className="c-link-underline c-fs-5 mt-2 c-fw-t">
                  Hello
                </a>
                <a href={`${path}/segmento`} className=" c-link-underline c-fs-5 mt-2 c-fw-t">
                  Segmento
                </a>
                <a href={`${path}/campaign`} className=" c-link-underline c-fs-5 mt-2 c-fw-t">
                  Campaign
                </a>
                <a href={`${path}/otp`} className=" c-link-underline c-fs-5 mt-2 c-fw-t">
                  OTP
                </a>
              </div>

              <h1 className="c-fs-5 d-flex flex-column mt-5">Utilities</h1>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                <a href={`${path}/shorturl`} className="c-link-underline c-fs-5 mt-2 c-fw-t">
                  URL Shortener
                </a>
                <a href={`${path}/knowledgebase`} className=" c-link-underline c-fs-5 mt-2 c-fw-t">
                  KnowledgeBase
                </a>
                <a href={`${path}/free-whatsapp-link-generator`} className=" c-link-underline c-fs-5 mt-2 c-fw-t">
                  Free WhatsApp link generator
                </a>
              </div>
            </div>

            <div className="col-6 col-lg-3 mb-4">
              <h1 className=" c-fs-5 d-flex flex-column">Channels</h1>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                <a href={`${path}/sms`} className=" c-link-underline c-fs-5 mt-2 c-fw-t">
                  SMS
                </a>
                <a href={`${path}/email`} className=" c-link-underline c-fs-5 mt-2 c-fw-t">
                  Email
                </a>
                <a href={`${path}/whatsapp`} className=" c-link-underline c-fs-5 mt-2 c-fw-t">
                  WhatsApp
                </a>
                <a href={`${path}/voice`} className="c-link-underline c-fs-5 mt-2 c-fw-t">
                  Voice
                </a>                
                <a href={`${path}/numbers`} className="c-link-underline c-fs-5 mt-2 c-fw-t">
                  Numbers
                </a>                
              </div>

              <h1 className="c-fs-5 d-flex flex-column mt-5">Resources</h1>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                <a
                  href="/guide"
                  target="_blank"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Guide
                </a>
                <a
                  href="/case-studies"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Case Studies
                </a>
                <a
                  href="https://msg91.com/help"
                  target="_blank"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  FAQ
                </a>
                <a
                  href="https://docs.msg91.com/reference/send-sms"
                  target="_blank"
                  className=" c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  API Documentation
                </a>
                <a
                  href="https://features.msg91.com/feature-requests"
                  target="_blank"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Request a Feature
                </a>
              </div>

            </div>            

            <div className="col-6 col-lg-3 mb-4">
              <h1 className=" c-fs-5 d-flex flex-column">Discover</h1>
              <div className="a-nav-link-cont d-flex flex-column mt-2 align-items-start">
                <a
                  href="/about-us"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  About us
                </a>
                <a
                  href="/pricing/sms"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Pricing
                </a>
                <a
                  href="/contact-us"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Contact us
                </a>
                <a
                  href="/developers"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Developers
                </a>
                <a
                  href="/startups"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  MSG91 for startups
                </a>
                <a
                  href="/partners-and-integrations"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Partners and integrations
                </a>
                <a
                  href="/become-a-partner"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Become a partner
                </a>
                <a
                  href="https://apply.workable.com/walkover/"
                  target="_blank"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Career
                </a>
                <a
                  href="/certificates"
                  target="_blank"
                  className="c-link-underline c-fs-5 mt-2 c-fw-t"
                >
                  Certificates
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
                      src="/img/icon/android.svg"
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
                      src="/img/icon/apple.svg"
                      width={20}
                      height={24}
                      alt="#"
                    />
                  </a>
                </div>
              </div>
              <div className="footer-social-a-content col-6 col-lg-12 mt-lg-5">
                <span className="footer-social-a-text c-fs-5 d-flex flex-column">
                  Follow us
                </span>
                <div className="footer-social-a d-flex mt-3 align-items-start justify-content-between justify-content-lg-end">
                  <a
                    href="https://www.facebook.com/msg91"
                    target="_blank"
                    className="me-3"
                  >
                    <img
                      src="/img/icon/facebook.svg"
                      width={24}
                      height={24}
                      alt="#"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/msg91/"
                    target="_blank"
                    className="me-3"
                  >
                    <img
                      src="/img/icon/linkedin.svg"
                      width={24}
                      height={24}
                      alt="#"
                    />
                  </a>
                  <a
                    href="https://twitter.com/msg91"
                    target="_blank"
                    className="me-3"
                  >
                    <img
                      src="/img/icon/twitter.svg"
                      width={24}
                      height={24}
                      alt="#"
                    />
                  </a>
                  <a href="https://www.youtube.com/@WalkoverWS" target="_blank">
                    <img
                      src="/img/icon/youtube.svg"
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
                <a href="/terms-of-use" className="c-link-underline c-fs-5 ">
                  Terms of use
                </a>
                <span className="f2-spacer"> | </span>
                <a href="/privacy-policy" className="c-link-underline c-fs-5 ">
                  Privacy policy
                </a>
                <span className="f2-spacer"> | </span>
                <a href="/gdpr" className="c-link-underline c-fs-5 ">
                  GDPR
                </a>
                <span className="f2-spacer"> | </span>
                <a href="/refund-policy" className="c-link-underline c-fs-5 ">
                  Refund policy
                </a>
                <span className="f2-spacer"> | </span>
                <a href="/no-spam" className="c-link-underline c-fs-5 ">
                  No spam
                </a>
                <span className="f2-spacer"> | </span>
                <a href="/startup-policy" className="c-link-underline c-fs-5 ">
                  Startup policy
                </a>
                <span className="f2-spacer"> | </span>
                <a
                  href="/fair-pricing-policy"
                  className="c-link-underline c-fs-5 "
                >
                  Fair pricing policy
                </a>
                <span className="f2-spacer"> | </span>
                <a href="/cookie-policy" className="c-link-underline c-fs-5 ">
                  Cookie policy
                </a>
              </div>
              <div className="mt-4 mt-lg-0">
                <span className="c-fs-5">
                  A product of{" "}
                  <img
                    src="/img/walkover.svg"
                    width={20}
                    height={20}
                    alt="#"
                  />{" "}
                  <a
                    href="https://walkover.in"
                    target="_blank"
                    className="c-link-underline c-fs-5"
                  >
                    Walkover
                  </a>
                </span>
              </div>
            </div>
            <div className="c-fs-7 copyright mt-3 text-white">
              Copyright 2008-{year} MSG91 | All rights reserved.
            </div>
          </div>
        </div>
      </div>

      <div
                className="modal fade"
                id="sales-modal"
                tabIndex={-1}
                aria-labelledby="Schedule a meeting"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">                        
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
        
                        <div className="modal-body">
                            <InlineWidget url="https://calendly.com/sales-msg91/pre-sales" styles={{height: '660px'}} />
                        </div>                    
                    </div>
                </div>
            </div>
            
            <div
                className="modal fade"
                id="support-modal"
                tabIndex={-1}
                aria-labelledby="Schedule a meeting"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">                        
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>          
                        <div className="modal-body">
                            {/* <InlineWidget url="https://calendly.com/support--msg91" styles={{height: '820px'}} /> */}
                            <InlineWidget url="https://calendly.com/d/y3n-29s-29h?hide_gdpr_banner=1" styles={{height: '820px'}} />
                        </div>                    
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="plugin-modal"
                tabIndex={-1}
                aria-labelledby="Schedule a meeting"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">                        
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>          
                        <div className="modal-body">                            
                            <InlineWidget url="https://calendly.com/tigermsg91/msg91-for-tally?utm_campaign=tigerplugin&utm_source=tally&utm_medium=website" styles={{height: '820px'}} />
                        </div>                    
                    </div>
                </div>
            </div>
    </>
  );
};

export default Footer;

