// Parent Component
import React from 'react';
import ProductComponent from "@/components/comps/productComp";
import data from "./content.json"; 
const ParentComponent = () => {
  const helloData = data.global.hello; 
  console.log(helloData);

  return (
    <>    
      <ProductComponent pageData={helloData} />    
    </>
  );
};

export default ParentComponent;
