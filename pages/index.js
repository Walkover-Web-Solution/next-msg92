import IndexComp from "@/components/comps/indexComponent";
import data from "@/data/content.json";

const index = ({pricingPath})=>{
  const pageData = data?.global?.index
  return(
    <>
    <IndexComp pageData={pageData} pricingPath={pricingPath}/>
    </>

  );
};
export default index;