// Parent Component
import React from 'react';
import ChannelComponent from '@/components/comps/channelComp';
import json from "../data/content.json"; 

const ParentComponent = ({pricingPath}) => {
  const data = json.global.email; 
  return (
    <>    
      <ChannelComponent pageData={data} pricingPath={pricingPath} />    
    </>
  );
};

export default ParentComponent;
