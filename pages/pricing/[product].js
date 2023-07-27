import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
        console.log("error", error);
      });
  }, []);

  const router = useRouter();
  var  brawserPath = router.asPath;
  var product = brawserPath.split("/")[2];
  

  if ( code.length !== 0 && code !== "[COUNTRY]" && product!== "product" ) {
    console.log("rrrrrrrr",code.length,"code", code);
    return <PricingComp countryCode={code} product={product}  brawserPath={brawserPath}/>;
  } else {
    return (
      <>
       <Loading/>
      </>
    );
  }
};
export default pricingmain;
