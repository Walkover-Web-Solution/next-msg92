import IndexComp from "@/components/comps/indexComponent";
import data from "@/data/content.json";

const index = ()=>{
  const pageData = data?.global?.index
  return(
    <>
    <IndexComp pageData={pageData}/>
    </>

  );
};
export default index;