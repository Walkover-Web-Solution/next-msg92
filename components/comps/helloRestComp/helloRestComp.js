import ProductFeatures from "@/components/productFeatures/productFeature";
import style from "./helloRestComp.module.scss";
const HelloRestComp = () => {
  return (
    <>
      {
        <div className={` ${style.hello}`}>
          <div className={`${style.hero} container d-flex  my-5 `}>
            <div
              className={`${style.hero__content} d-flex flex-column justify-content-center gap-4 col-12 col-md-6`}
            >
              <div className="d-flex flex-column gap-1">
                <div
                  className={`${style.heroCont__product} d-flex align-items-center gap-2 c-fs-2`}
                >
                  <img
                    className="product-icon"
                    src="./img/icon/hello.svg"
                    alt="hello"
                  />
                  <span className="product-name">Hello</span>
                </div>
                <span className={`${style.heroCont__tagline} c-fs-3`}>
                  Customer support software
                </span>
                <p className={`${style.heroCont__heading} c-fw-b`}>
                  AI-powered Contact center
                </p>
                <p className={`${style.heroCont__subheading} c-fs-2 c-fw-m`}>
                  Never lose sight of what’s important. Don’t just solve
                  tickets, build customer relationships
                </p>
              </div>
              <button className="btn btn-ft btn-dark rounded-1 c-fs-4">
                Get Started
              </button>
              <div className="d-flex flex-column gap-4">
                <p className="c-fs-4">Support 15+ channels & platforms</p>
                <div className="d-flex flex-wrap gap-4 w-100">
                  <img src="./img/platforms/gmail.svg" />
                  <img src="./img/platforms/facebook.svg" />
                  <img src="./img/platforms/whatsapp.svg" />
                  <img src="./img/platforms/instagram.svg" />
                  <img src="./img/platforms/telegram.svg" />
                  <img src="./img/platforms/twitter.svg" />
                  <img src="./img/platforms/googlechat.svg" />
                  <img src="./img/platforms/zoho.svg" />
                  <img src="./img/platforms/outlook.svg" />
                  <img src="./img/platforms/sms.svg" />
                  <img src="./img/platforms/voice.svg" />
                  <span>and more..</span>
                </div>
              </div>
            </div>
            <div className={`${style.heroimg} d-none d-md-block`}>
              <img src="./img/hello-hero-img.svg" />
            </div>
          </div>
          <ProductFeatures />
          
        </div>
      }
    </>
  );
};
export default HelloRestComp;
