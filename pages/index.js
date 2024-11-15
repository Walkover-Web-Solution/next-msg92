import IndexComp from "@/components/comps/indexComponent";
import data from "@/data/content.json";

const index = ({pricingPath, pathArray})=>{
  const pageData = data?.global?.index
  return(
    <>
    <IndexComp pageData={pageData} pricingPath={pricingPath} pathArray={pathArray}/>
    </>

  );
};
export default index;