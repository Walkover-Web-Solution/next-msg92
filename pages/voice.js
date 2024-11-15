// Parent Component
import React from 'react';
import ChannelComponent from '@/components/comps/channelComp';
import json from "../data/content.json"; 

const ParentComponent = ({pricingPath, pathArray}) => {
  const data = json.global.voice;  
  return (
    <>    
      <ChannelComponent pageData={data} pricingPath={pricingPath} pathArray={pathArray}/>    
    </>
  );
};

export default ParentComponent;
