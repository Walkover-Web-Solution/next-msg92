import { useEffect, useState } from "react";
import PricingComp from "@/components/pricingComp";
import Loading from "@/components/loadingComp";

const pricingmain = () => {
  var [code, setCode] = useState("");
  useEffect(() => {
    fetch("https://api.db-ip.com/v2/free/self")
      .then((response) => response.json())
      .then((response) => {
        setCode(response.countryCode);
      })
      .catch((error) => {
        // handle the error
        console.log("error", error);
      });
  }, []);
  console.log("ssss",code.length,"code", code);
  if ( code.length !== 0 && code !== "[COUNTRY]" ) {
    console.log("rrrrrrrr",code.length,"code", code);
    return <PricingComp countryCode={code} />;
  } else {
    return (
      <>
       <Loading/>
      </>
    );
  }
};
export default pricingmain;
