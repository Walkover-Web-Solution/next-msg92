// Child Component
import React from 'react';
import PreFooter from '../preFooter';
import TrustedBy from '../trustedby';
import Seo from '../seoComp';
import { AiOutlineArrowRight } from 'react-icons/ai';


const ProductComponent = ({pageData, path, webhookData=null, pricingPath }) => {
  var i = 0;  
  return (
    <div>
      <div className="product-banner-wrp">
        <div className="container text-center overflow-hidden">
          <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">            
            <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
              <img src={pageData?.icon} className="product-page-logo me-2" alt='product page logo'/>
              <h1 className={`heading page-title ${pageData?.pagename}-heading`}>{pageData?.pagetag}</h1>
            </div>

            <p className={`text-uppercase col-otp c-ls-20 mx-auto mt-3 ${pageData?.pagename}-dark`}>
              {pageData?.tagline}
            </p>
            <div className="p-3">
              <h2 className="heading w-md-75 w-100 mx-auto mb-2 c-fw-xb">
                {pageData?.heading}
              </h2>
              <p className="c-fs-2 w-md-75 w-100 mx-auto fw-normal">
                {pageData?.subheading}
              </p>
            </div>
            <a href={`/signup?service=${pageData.pagename}`} className="btn btn-dark btn-lg c-fs-2 mt-3 utm" >
              {pageData.pagename === 'KnowledgeBase' && <span className='d-flex'>Get started <mark className='highlight ms-2'>FREE forever</mark></span>}
              {pageData.pagename !== 'KnowledgeBase' && <span>Get started for FREE</span>}
            </a>
          </div>
            <TrustedBy />
          <img
            src={pageData?.pageimg}
            className="img-fluid product-page-img mx-auto"
            alt="product image"
          />
        </div>
      </div>

      <div className={`px-sm-0 d-flex flex-column justify-content-center justify-content-sm-start section mt-5`}>
        <span className="container sub-heading c-head   pt-4 pt-md-0 c-fw-b">Features</span>
        {pageData?.features?.map((item, index) => {
          if(item?.content){
            i++;       
            return (
              <div key={`f-${index}`} className={`container flex-column d-flex my-3 my-md-5 align-items-center justify-content-md-between justify-content-center  ${i%2 ? 'flex-md-row-reverse' : 'flex-md-row'}`}>
                <div className="col-12 col-md-6 d-flex justify-content-center">
                {item?.img &&
                  <img
                  src={item?.img}
                  className="feature-img "
                  alt='feature image'
                />
                }                
                </div>
                <div className="col-12 col-md-5 d-flex flex-column ">
                  <span className="c-fs-2 c-fw-b ">
                    {item?.heading}
                  </span>
                  <span className="c-fs-3  mt-3">
                    <span className='c-fw-b'>{item?.subheading}</span> 
                    <span dangerouslySetInnerHTML={{ __html: item?.content }}></span>                    
                  </span>
                </div>
              </div> 
            );            
          }
        })}
      </div>
      {pageData?.pagename === 'KnowledgeBase' &&        
        <div className="container mb-5">
          <div className="mb-5">
            <h2 className='more-feature mb-3'>More Features</h2>
            {webhookData?.map((data,index)=>{      
              if(data?.service === "Knowledgebase" && data?.availability === "Available"){
                return (
                  <div key={index} className='mb-1'>
                    - {data?.feature}
                  </div>
                )
              }
            })}
          </div>
          
          <div className='col-6 '>
            <div className='d-flex gap-3 p-4 req-feature-cont justify-content-between align-items-center'>
            <h2 className='c-fs-3 c-head me-text'>Looking for more ?</h2>
            <button className='w-90 p-2 btn'>Request a Feature <AiOutlineArrowRight /></button>
            </div>
          </div>
          
        </div>
      }
      <Seo path={path} pageData={pageData?.pagename} />
      <PreFooter pricingPath={pricingPath} pageName={pageData?.pagename}/>
    </div>
  );
};

export default ProductComponent;

