import { useRouter } from "next/router";
import PricingComp from "@/components/pricingComp";

const pricingmain =()=>{
  const router = useRouter();
  // const { slug } = router.query; 
  var  brawserPath = router.asPath;
  var path = brawserPath.split("/")[1];
  var product = brawserPath.split("/")[3];
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
      <PricingComp countryCode={data} product={product} brawserPath={brawserPath}/>
  );
}
else{
  return (<>LOADING</>)
}

};
export default pricingmain;