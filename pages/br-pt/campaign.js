import ProductComponent from "@/components/br-pt/pageCoponents/productComponent/productComponent.js";
import content from "@/data/pageContent/br-pt.json";
export default function campaign() {
    const pageData = content?.pages?.campaign;
    return (
        <>
            <ProductComponent pageData={pageData}/>
        </>
    );
}
