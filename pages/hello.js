// Parent Component
import React from 'react';
import ProductPageComp from "@/components/comps/productPageComponent";
import data from "./content.json"; 
const ParentComponent = () => {
  const helloData = data.global.hello; 
  console.log(helloData);

  return (
    <>
    <div>
      <h1>Parent Component</h1>
      <ProductPageComp pageData={helloData} />
    </div>
    </>
  );
};

export default ParentComponent;
