// Child Component
import React from 'react';

const ChannelComponent = ({ pageData }) => {  
  console.log('pageData', pageData); //);
  return (
    <div>
      <div className="container text-center  overflow-hidden ">
        <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
          <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
            <img src={pageData.icon} className="product-page-logo me-2" />
            <h1 className="heading text-capitalize">{pageData.pagename}</h1>
          </div>

          <p className="c-fs-4 text-uppercase col-otp c-ls-20 mx-auto">
            {pageData.tagline}
          </p>
          <h2 className="small-heading p-3 w-md-75 w-100 mx-auto">
            {pageData.heading}
          </h2>
          <a href="https://control.msg91.com/signup/" className="btn btn-primary btn-lg c-fs-2" >
            Get started for Free
          </a>
        </div>
          <TrustedSec />
        <img
          src={pageData.pageimg}
          className="img-fluid product-page-img mx-auto"
          alt="#"
        />
      </div>
    </div>
  );
};

export default ChannelComponent;
