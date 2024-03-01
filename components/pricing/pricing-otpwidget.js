import faqData from '@/data/faq.json';

import FaqSection from '../faqSection/faqSection';

const pricingOtpWidget = () => {
  return <>
    <div className="price-card rcs bg-white p-4 rounded-2">
    <h3 className="text-start fw-bold c-fs-1 text-green">Free</h3>
      <h3 className="card-write c-fs-3 mt-3">OTP widget/SDK usage is free. </h3>
      <h3 className="card-write c-fs-3 mb-3">Channel wise pricing will be applicable for sending message.</h3>
      <a
        href="/signup?service=otpwidget"
        target="_blank"
        className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3`}
      >
          Get Started
      </a>      
    </div>
    <a className="more-about" href="/otp"> 
      <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
      <span>Know more about OTP</span>
    </a>
          <FaqSection faqData={faqData?.otp}/>
  </>;
};

export default pricingOtpWidget;