import HelloRestComp from "@/components/br-pt/pageCoponents/helloRestComp/helloRestComp";
import data from "@/data/pageContent/br-pt.json";
export default function hello({pricingPath}){
    return(
        <>
        <HelloRestComp pageData={data?.pages?.hello} pricingPath={pricingPath}/>
        </>
    )
}