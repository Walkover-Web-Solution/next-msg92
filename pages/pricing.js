// import { useEffect, useState } from "react";
// import PricingComp from "@/components/pricingComp";
// import Loading from "@/components/loadingComp";

// const pricingmain = () => {
//   var [code, setCode] = useState("");

//   //for detecting ip
//   useEffect(() => {
//     fetch("https://api.db-ip.com/v2/free/selllf")
//       .then((response) => response.json())
//       .then((response) => {
//         setCode(response?.countryCode);
//         if(response.countryCode){
//           setCode(response?.countryCode);
//           console.log("inside useeffect ", response);
//           console.log("inside if", response?.countryCode);
//         }
//         else{
//           console.log("inside else for useEffect", response?.countryCode);
//           setCode('US')
//           console.log("after setting code to US", code);
//         }
//       })
//       .catch((error) => {
//         // handle the error
//         console.log("Error in getting IP Address", error.message);
//       });
//   }, []);
//   console.log("ssss",code.length,"code", code);
//   if ( code.length !== 0 && code !== "[COUNTRY]" ) {
//     console.log("for checking code",code.length,"code", code);
//     return <PricingComp countryCode={code} />;
//   } else {
//     return (
//       <>
//        <Loading/>
//       </>
//     );
//   }
// };
// export default pricingmain;
