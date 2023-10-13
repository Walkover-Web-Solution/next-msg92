// Child Component
import React from 'react';
import PreFooter from '../preFooter';
import TrustedByOtherThanIndia from '../TrustedByOtherThanIndia';
import Seo from '../seoComp';
import { AiOutlineArrowRight } from 'react-icons/ai';


const HelloNewComponent = ({pageData, path, webhookData=null, pricingPath}) => {
  var i = 0;
  return (
    <>
      <div className="container overflow-hidden">
        <div className='row'>
          <div className="py-2 py-md-5 col-12 col-sm-6">
            <div class="intro">INTRODUCING</div>
            <div className="d-flex align-items-center flex-column flex-sm-row">
              <h1 className={`heading-plus page-title ${pageData?.pagename}-heading c-fw-b`}>
                <img src={pageData?.icon} className="product-page-logo me-2" />
                <span className="hello">Hello</span>
                <br></br>
                An <span className="ai-fueled">AI-Fueled</span>
                <br></br>
                <span>Conversational HUB</span>
              </h1>
            </div>

            <p className={`c-fs-4 text-uppercase col-otp c-ls-20 mx-auto mt-5 ${pageData?.pagename}-dark`}>
              {pageData?.tagline}
            </p>
            
            <h2 className="small-heading w-md-75 w-100 mx-auto fw-normal mt-2">
              {pageData?.subheading}
            </h2>                
            
            <a href="https://control.msg91.com/signup/" className="btn btn-dark btn-lg c-fs-2 mt-5 utm get-started-hello" >
            GET STARTED
            </a>
            <TrustedByOtherThanIndia />
          </div>
          <div className='col-12 col-md-6 col-sm-12 order-sm-0'>
            <div className='hero-img-wrp'>
              <img
                src="/images/hello/hero.svg"
                className="img-fluid mx-auto"
                alt="#"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="discover py-3 py-md-5">
        <div className="container">
          <h3 className='c-fs-1 c-fw-b'>Discover the Powerhouse Communication Solution </h3>
          <div className='c-fs-2 mt-3'>
            When it comes to revolutionizing communication, look no further than HELLO by MSG91.
          </div>
          <div className='c-fs-2 mt-3'>
            Our cutting-edge application is designed to empower businesses across every industry with a suite of features that are not only transformative but also tailored to your needs. 
          </div>          
          <div className="d-flex flex-wrap text-center text-sm-start  align-items-center">
              
            <h2 className="col-12 col-sm-6 col-lg-6 d-flex align-items-center my-4 gap-3 c-fs-2 c-fw-b">
              <img src="/images/hello/e-commerce.svg" />
              E-commerce
            </h2>
          
            <h2 className="col-12 col-sm-6 col-lg-6 d-flex align-items-center my-4 gap-3 c-fs-2 c-fw-b">
              <img src="/images/hello/fintech.svg" />
              Fintech
            </h2>                
              
            <h2 className="col-12 col-sm-6 col-lg-6 d-flex align-items-center my-4 gap-3 c-fs-2 c-fw-b">
              <img src="/images/hello/care.svg" />
              Healthcare              
            </h2>
            <h2 className="col-12 col-sm-6 col-lg-6 d-flex align-items-center my-4 gap-3 c-fs-2 c-fw-b">
              <img src="/images/hello/tech.svg" />
              Technology              
            </h2>          
          </div>
          <div className='c-fs-2 mt-3'>
            No matter if you're in ecommerce, fintech, healthcare, or any other field, HELLO is the ultimate solution to elevate your communication game.
          </div>
        </div>
      </div>

      <div className={`px-sm-0 d-flex flex-column justify-content-center justify-content-sm-start section hello-new-features`}>        
        {pageData?.features?.map((item, index) => {
          if(item?.content){
            i++;       
            return (
              <div key={`f-${index}`} className={`container hnf flex-column d-flex my-3 my-md-5 align-items-center justify-content-md-between justify-content-center  ${i%2 ? 'flex-md-row-reverse' : 'flex-md-row'}`}>
                <div className="col-12 col-md-6 d-flex justify-content-center">
                {item?.img &&
                  <img
                  src={item?.img}
                  className="feature-img "
                />
                }                
                </div>
                <div className="col-12 col-md-5 d-flex flex-column ">
                  <span className="c-fs-2 c-fw-b ">
                    {item?.heading}
                  </span>
                  <span className="c-fs-3  mt-3">
                    <span className='c-fw-b'>{item?.subheading}</span> {item?.content}
                  </span>
                </div>
              </div> 
            );            
          }
        })}
      </div>
      
      <div className="marquee-wrp py-3 py-md-5">
        {/* <marquee>This text will scroll from right to left</marquee> */}
        <div className="container">          
          <div className='c-fs-2 mt-3'>
            At MSG91, we're not just offering a communication solution; We're offering a game-changer for businesses of all sizes and industries.
          </div>
          <div className='c-fs-2 mt-3'>
            With HELLO, you're not just communicating – you're connecting, engaging, and thriving. Embrace the future of communication today.
          </div>                            
        </div>

        <div className="marquee mt-3">
          <span className="yellow">Connect</span>
          <span className="purple">Engage</span>
          <span className="blue">Thrive</span>          
          <span className="yellow">Connect</span>
          <span className="purple">Engage</span>
          <span className="blue">Thrive</span>          
          <span className="yellow">Connect</span>
          <span className="purple">Engage</span>
          <span className="blue">Thrive</span>          
        </div>

        <div className="container">          
          <div className='c-fs-2 mt-3'>
            Ready to transform the way you communicate? Say HELLO to your business's next big leap. Get started with HELLO by MSG91 now and experience the difference firsthand.
          </div>
          <div className='c-fs-2 mt-3'>
            Unlock limitless possibilities with HELLO by MSG91. Your communication revolution starts here.
          </div>
        </div>
      </div>
      
      <Seo path={path} pageData={pageData?.pagename} />
      <PreFooter pricingPath={pricingPath}/>
    </>
  );
};

export default HelloNewComponent;