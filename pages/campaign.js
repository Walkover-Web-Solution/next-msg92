// Parent Component
import React from 'react';
import ProductComponent from "@/components/comps/productComp";
import json from "../data/content.json"; 

const ParentComponent = ({pricingPath}) => {
  const data = json.global.campaign; 
  return (
    <>    
      <ProductComponent pageData={data} pricingPath={pricingPath} />    
    </>
  );
};

export default ParentComponent;
