// Parent Component
import React from 'react';
import ChannelComponent from '@/components/comps/channelComp';
import json from "../data/content.json"; 

const ParentComponent = () => {
  const data = json.global.voice; 
  return (
    <>    
      <ChannelComponent pageData={data} />    
    </>
  );
};

export default ParentComponent;
