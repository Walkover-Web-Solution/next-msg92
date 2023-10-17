// Parent Component
import React from 'react';
import ChannelComponent from '@/components/comps/channelComp';
import json from "../data/content.json"; 

const ParentComponent = ({pricingPath}) => {
  console.log('json', json);
  const data = json.global.numbers;  
  return (
    <>    
      <ChannelComponent pageData={data} pricingPath={pricingPath} />    
    </>
  );
};

export default ParentComponent;
