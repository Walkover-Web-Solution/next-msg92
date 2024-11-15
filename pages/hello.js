// Parent Component
import React from 'react';
import ProductComponent from "@/components/comps/productComp";
import json from "../data/content.json"; 
import HelloRestComp from '@/components/comps/helloRestComp/helloRestComp';

const ParentComponent = ({pricingPath, pathArray}) => {
  const data = json.global.hello; 
  return (
    <>    
      {/* <ProductComponent pageData={data} pricingPath={pricingPath}/>     */}
      <HelloRestComp pageData={data} pricingPath={pricingPath} pathArray={pathArray}/>
    </>
  );
};

export default ParentComponent;
