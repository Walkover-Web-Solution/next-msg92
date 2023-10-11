import { useRouter } from "next/router";
import PricingComp from "@/components/pricingComp";

const pricingmain =()=>{
  const router = useRouter();
  // const { slug } = router.query; 
  var  browserPath = router.asPath;
  var path = browserPath.split("/")[1];

  const getCountryCode = () => {
    var countryCode = path?.toUpperCase();
    path = path.length == 2 ? "/" + path : "";
    if(countryCode ==='[COUNTRY]'){
      return getCountryCode();
    }
    return countryCode;
  } 
  const data=getCountryCode();
  if(data!=='[COUNTRY]' && data.length!==0){
    return (
      <PricingComp countryCode={data}/>
  );
}
else{
  return (<>LOADING</>)
}

};
export default pricingmain;