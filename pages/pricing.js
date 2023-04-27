import { useEffect, useState } from "react";
import PricingComp from "@/components/pricingComp";

const pricingmain =()=>{
  var [code, setCode] = useState('');
  useEffect(() => {
    fetch('https://api.db-ip.com/v2/free/self')
    .then(response => response.json())
    .then(response => {      
      setCode(response.countryCode);
    })
    .catch(error => {
        // handle the error
        console.log('error', error);
    });    
  }, []);
  if(code!=='[COUNTRY]' && code.length!==0){
    return (
      <PricingComp countryCode={code}/>
  );
}
else{
  return (<>LOADING</>)
}

};
export default pricingmain;