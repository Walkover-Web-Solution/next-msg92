import IndexComp from "@/components/comps/indexComponent";
import json from "../data/content.json"; 
const data = json.global.index;
const index = ()=>{
  return(
    <>
    <IndexComp pageData={data} />
    </>

  );
};
export default index;