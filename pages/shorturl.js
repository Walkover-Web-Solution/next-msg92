// Parent Component
import React from 'react';
import ProductComponent from "@/components/comps/productComp";
import json from "../data/content.json"; 

const ParentComponent = ({pricingPath}) => {
  const data = json.global.shorturl; 
  return (
    <>    
      <ProductComponent pageData={data} pricingPath={pricingPath} />    
    </>
  );
};

export default ParentComponent;
