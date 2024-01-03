// Parent Component
import React, { useEffect, useState } from 'react';
import ProductComponent from "@/components/comps/productComp";
import json from "../data/content.json"; 

export async function getStaticProps() {
  
  try {
      /* // prompt through webhook with help of axios
      const axios = require("axios");
      const options = {
          //url of webhook
          url: "https://flow.sokt.io/func/8BCaBdmk150G",
          headers: {
              "Content-Type": "application/json",
              "auth-key":"key2zQoVDAbhH7G",
          },
          method: "GET",

          //data to be posted curl_command and api_description
      };

      //response of axios taking through webhook
      const data = await axios(options);
      var webhookData = data.data.rows; */
      var webhookData = null;
    } catch (error) {
      console.log("inside CATCH webhook function");
      console.log("error: ", error);
    }    
  //console.log('webhookData', webhookData);
  return {
    props: {
      webhookData   
    },
  };
}

const ParentComponent = ({webhookData, pricingPath}) => {  
  const data = json.global.knowledgebase;   
  return (
    <>    
      <ProductComponent pageData={data} webhookData={webhookData} pricingPath={pricingPath} />    
    </>
  );
};

export default ParentComponent;