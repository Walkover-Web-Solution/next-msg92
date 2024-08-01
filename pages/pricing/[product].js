import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PricingComp from "@/components/pricingComp";
import Loading from "@/components/loadingComp";

const PricingMain = () => {
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [code, setCode] = useState("");
  
  useEffect(() => {
    fetch("https://api.db-ip.com/v2/free/self")
      .then((response) => response.json())
      .then((response) => {
        // setCode(response?.countryCode);
        if(response?.countryCode){
          setCode(response.countryCode);
          setLoading(false);// Set loading to false after fetching the data
        }
        else{
          setCode('US')
          setLoading(false);// Set loading to false after fetching the data
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false); // Set loading to false in case of an error
      });

      
  }, []);

  const router = useRouter();
  var browserPath = router.asPath;
  var product = browserPath.split("/")[2];
  product = product.split("?")[0];


  if (code.length !== 0 && code !== "[COUNTRY]" && product !== "product") {
   if (loading){
    return (
      <>
        <Loading />
      </>
    );
    }
    else{
    return <PricingComp countryCode={code} product={product} browserPath={browserPath}  />;

    }
  } 
  else {
    return (
      <>
        <Loading />
      </>
    );
  }
};

export default PricingMain;
