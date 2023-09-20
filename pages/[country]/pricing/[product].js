import { useRouter } from "next/router";
import PricingComp from "@/components/pricingComp";

const pricingmain =()=>{
  const router = useRouter();
  // const { slug } = router.query; 
  var  browserPath = router.asPath;
  var path = browserPath.split("/")[1];
  var product = browserPath.split("/")[3];
  product = product.split("?")[0];
  const getCountryCode = () => {
    var countryCode = path?.toUpperCase();
    path = path.length == 2 ? "/" + path : "";
    if(countryCode ==='[COUNTRY]'){
      return getCountryCode();
    }
    return countryCode;
  } 
  const data=getCountryCode();
  if(data!=='[COUNTRY]' && data.length!==0 && product!== "product"){
    return (
      <PricingComp countryCode={data} product={product} browserPath={browserPath}/>
  );
}
else{
  return (<>LOADING</>)
}

};
export default pricingmain;