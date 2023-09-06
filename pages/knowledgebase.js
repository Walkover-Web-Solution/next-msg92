// Parent Component
import React, { useEffect, useState } from 'react';
import ProductComponent from "@/components/comps/productComp";
import json from "../data/content.json"; 

const ParentComponent = () => {
 const [responseData, setResponseData] = useState("");
 useEffect(()=>{
 const fetchData = async ()=>{
  try {
      // prompt through webhook with help of axios
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
      const response = await axios(options);
      setResponseData(response);
    } catch (error) {
      console.log("error: ", error);
      console.log("inside CATCH webhook function");
    }
}
  fetchData();
},[]);
  const data = json.global.knowledgebase; 
  const webhookData = responseData.data?.rows
  return (
    <>    
      <ProductComponent pageData={data} webhookData={webhookData} />    
    </>
  );
};

export default ParentComponent;
