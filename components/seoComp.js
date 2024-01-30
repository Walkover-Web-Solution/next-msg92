import IndexSeoComp from "./seo/inIndex";
import SmsSeoComp from "./seo/inSms";
import VoiceSeoComp from "./seo/inVoice";
import CampaignSeoComp from "./seo/inCampaign";
import EmailSeoComp from "./seo/inEmail";
import HelloSeoComp from "./seo/inHello";
import OtpSeoComp from "./seo/inOtp";

const Seo = ({ path, pageData }) => {

  let seoComponent = null;

  if (path === "in") {
    switch (pageData) {
      case "index":
        seoComponent = <IndexSeoComp />;
        break;
      case "0":
        seoComponent = <IndexSeoComp />;
        break;
      case "SMS":
        seoComponent = <SmsSeoComp />;
        break;
      case "voice":
        seoComponent = <VoiceSeoComp />;
        break;
      case "campaign":
        seoComponent = <CampaignSeoComp />;
        break;
      case "Email":
        seoComponent = <EmailSeoComp />;
        break;
      case "hello":
        seoComponent = <HelloSeoComp />;
        break;
      case "otp":
        seoComponent = <OtpSeoComp />;
        break;
      default:
        <></>
        break;
    }
  }

  return (
  <>
  
  {seoComponent}
  </>
  );
};

export default Seo;
