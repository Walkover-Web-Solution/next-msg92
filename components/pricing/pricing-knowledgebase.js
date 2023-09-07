import Link from "next/link";
import { useEffect, useState } from "react";
import { setUtm } from "../pricingComp";
const pricingknowledgebase = () => {
useEffect(() => {    
  setUtm();
}, []);  
return (
  <>
    <div className="d-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-end">      
      <div className="mx-3">
        <div className="card kb price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div className="card-body">
            <h3 className="c-fs-3">Free</h3>
            <h5 className="mt-2 c-fs-2">$0/Month</h5>            
            <div className="c-fs-5 mt-2">
                This plan is free of cost and offers limited but <a href="/knowledgebase" target="_blank">all necessary features</a> to make your customer KnowledgeBase live. 
            </div>
            <Link
              href="https://control.msg91.com/signup/"
              target="_blank"
              className="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2 utm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-3">
        <div className="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ">      
          {/* <div className="popular-chip c-fs-6">POPULAR</div> */}    
          <div className="price-card email card kb text-center mb-4 mb-sm-0 c-bg-grey border-0">
            <div className="card-body">
              <h3 className="c-fs-3">Alpha</h3>
              <h5 className="mt-2 c-fs-2">$50/Month</h5>
              <div className="c-fs-3">+</div>
              <div className="c-fs-4">0.00275 USD per read count</div>
              
              <div className="c-fs-5 mt-2" >
                Unlock all premium/nice to have/ luxury features, Explore all features <Link href="/knowledgebase" target="_blank">here</Link>
                </div>
              <Link
                href="https://control.msg91.com/signup/"
                target="_blank"
                className="c-fs-5 btn btn-sm w-100 btn-dark mt-2 utm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </>
);
};

export default pricingknowledgebase;
