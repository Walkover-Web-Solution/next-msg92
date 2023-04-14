import { useRouter } from "next/router";
import Campaign from "@/components/pricingComp";

const pricingmain =()=>{
  const router = useRouter();
  // const { slug } = router.query; 
  var  brawserPath = router.asPath;
  var path = brawserPath.split("/")[1];

  const getCountryCode = (a) => {
    // console.log(a,87654);
    var countryCode = path?.toUpperCase();
    path = path.length == 2 ? "/" + path : "";
    if(countryCode ==='[COUNTRY]'){
      return getCountryCode(a+1);
    }
    return countryCode;
  } 
  const data=getCountryCode(1);
  // console.log(678, data);
  if(data!=='[COUNTRY]' && data.length!==0){
    return (
      <Campaign countryCode={data}/>
  );
}
else{
  return (<>LOADING</>)
}

};
export default pricingmain;