// Parent Component
import React from 'react';
import ProductComponent from "@/components/comps/productComp";
import json from "../data/content.json"; 

const ParentComponent = ({pricingPath, pathArray}) => {
  const data = json.global.otp; 
  return (
    <>    
      <ProductComponent pageData={data} pricingPath={pricingPath} pathArray={pathArray} />    
    </>
  );
};

export default ParentComponent;
