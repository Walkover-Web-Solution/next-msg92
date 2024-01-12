import ProductFeatures from '@/components/productFeatures/productFeature';
import style from './helloRestComp.module.scss';
import productData from './hello.json';
import TrusedSection from '@/components/trustedSection/trustedSection';
import FaqSection from '@/components/faqSection/faqSection';
import Seo from '@/components/seoComp';
import GetStartedSection from '@/components/getStartedSection/getStartedSection';
const HelloRestComp = ({ pageData, path, webhookData = null, pricingPath, page }) => {
    if (page === 'global') {
        path = page;
    }

    return (
        <>
            {
                <div className={` ${style.hello}`}>
                    <div className={`${style.hero} container d-flex flex-column flex-lg-row gap-4 my-5 `}>
                        <div
                            className={`${style.hero__content} d-flex flex-column justify-content-center gap-3 gap-lg-5 col-12 col-lg-6`}
                        >
                            <div className="d-flex flex-column gap-2">
                                <div className={`${style.heroCont__product} d-flex align-items-center gap-2 c-fs-2`}>
                                    <img className="product-icon" src="/img/icon/hello.svg" alt="hello" />
                                    <span className="product-name text-capitalize">{productData?.product}</span>
                                </div>
                                <span className={`${style.heroCont__tagline} c-fs-3`}>
                                    {productData?.heroData[path]?.tagline}
                                </span>
                                <p className={`${style.heroCont__heading} c-fw-b`}>
                                    {productData?.heroData[path]?.heading}
                                </p>
                                <p className={`${style.heroCont__subheading} c-fs-2 c-fw-m`}>
                                    {productData?.heroData[path]?.sub}
                                </p>
                            </div>
                            <button className="btn btn-ft btn-dark rounded-1 c-fs-4">Get Started</button>
                            {productData?.trustedData && <TrusedSection trustedData={productData?.trustedData} />}
                        </div>
                        <div className={`${style.heroimg} d-none d-sm-block`}>
                            <img src="/img/pages/hello/heroimg.svg" />
                        </div>
                    </div>
                    <ProductFeatures featureData={productData?.features} />
                    <FaqSection faqData={productData?.faq} />
                    <Seo path={path} pageData={productData?.product} />

                    <GetStartedSection pricingPath={pricingPath} />
                </div>
            }
        </>
    );
};
export default HelloRestComp;
