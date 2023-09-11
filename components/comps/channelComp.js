// Child Component
import { React, useEffect } from 'react';
import PreFooter from '../preFooter';
import TrustedBy from '../trustedby';
import Seo from '../seoComp';

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import snippetData from "@/pages/snippet.json"; 


const ChannelComponent = ({ pageData, path }) => {  
  
  var HTTPSnippet = require("httpsnippet");
  var i = 0;
  
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const snippet = new HTTPSnippet(snippetData[pageData.pagename]);

  const node = snippet.convert("node");
  const cURL = snippet.convert("shell", "curl");
  const php = snippet.convert("php");
  const python = snippet.convert("python");
  const ruby = snippet.convert("ruby");
  return (
    <div>
      <div className="container text-center overflow-hidden">
        <div className=" mx-auto text-center justify-content-center py-2 py-md-5 col-12 col-sm-8">
          <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
            <img src={pageData.icon} className="product-page-logo me-2" />
            <h1 className={`heading page-title ${pageData.pagename}-heading`}>{pageData.pagetag}</h1>
          </div>

          <p className="c-fs-4 text-uppercase col-otp c-ls-20 mx-auto">
            {pageData.tagline}
          </p>
          <div className="p-3">
              <h2 className="small-heading c-fw-b  w-md-75 w-100 mx-auto fw-normal mb-2">
                {pageData.heading}
              </h2>
              <p className="small-heading w-md-75 w-100 mx-auto fw-normal">
                {pageData.subheading}
              </p>
            </div>
          <a href="https://control.msg91.com/signup/" target="_blank" className="btn btn-dark btn-lg c-fs-2 utm" >
            Get started
          </a>
        </div>
          <TrustedBy />
        
        <div className="code-wrp">
          <ul
            className="nav nav-pills mb-3 justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active btn-sm"
                id="pills-cURL-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-cURL"
                type="button"
                role="tab"
                aria-controls="pills-cURL"
                aria-selected="true"
              >
                cURL
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-node-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-node"
                type="button"
                role="tab"
                aria-controls="pills-node"
                aria-selected="false"
              >
                Node
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-php-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-php"
                type="button"
                role="tab"
                aria-controls="pills-php"
                aria-selected="false"
              >
                PHP
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-ruby-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-ruby"
                type="button"
                role="tab"
                aria-controls="pills-ruby"
                aria-selected="false"
              >
                Ruby
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-python-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-python"
                type="button"
                role="tab"
                aria-controls="pills-python"
                aria-selected="false"
              >
                Python
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-cURL"
              role="tabpanel"
              aria-labelledby="pills-cURL-tab"
            >
              <pre>
                <code className={`language-javascript`}>{cURL}</code>
              </pre>
            </div>
            <div
              className="tab-pane fade"
              id="pills-node"
              role="tabpanel"
              aria-labelledby="pills-node-tab"
            >
              <pre>
                <code className={`language-javascript`}>{node}</code>
              </pre>
            </div>
            <div
              className="tab-pane fade"
              id="pills-php"
              role="tabpanel"
              aria-labelledby="pills-php-tab"
            >
              <pre>
                <code className={`language-javascript`}>{php}</code>
              </pre>
            </div>
            <div
              className="tab-pane fade"
              id="pills-ruby"
              role="tabpanel"
              aria-labelledby="pills-ruby-tab"
            >
              <pre>
                <code className={`language-javascript`}>{ruby}</code>
              </pre>
            </div>
            <div
              className="tab-pane fade"
              id="pills-python"
              role="tabpanel"
              aria-labelledby="pills-python-tab"
            >
              <pre>
                <code className={`language-javascript`}>{python}</code>
              </pre>
            </div>
          </div>
        </div>

      </div>

      <div className={` my-5  px-sm-0 d-flex flex-column justify-content-center justift-content-sm-start section`}>
        <span className="container c-head sub-heading  c-head pt-4 pt-md-0">Features</span>        
        {pageData?.features?.map((item, index) => {
          if(item?.content){
            i++;       
            return (
              <div key={`key-${index}`} className={`container flex-column d-flex my-3 my-md-5 align-items-center justify-content-between  ${i%2 ? 'flex-md-row-reverse' : 'flex-md-row'}`}>
                <div className="col-12 col-md-6 d-flex justify-content-center ">
                {item?.img &&
                  <img
                  src={item?.img}
                  className="feature-img"
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
      <Seo path={path} pageData={pageData.pagename} />

      {/* {path === 'in' && pageData.pagename === 'SMS' && <InIndex />} */}
      {/* <Insms /> */}
      <PreFooter />
    </div>
  );
};

export default ChannelComponent;
