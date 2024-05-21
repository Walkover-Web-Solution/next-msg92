import ProductComponent from "@/components/br-pt/pageCoponents/productComponent/productComponent.js";
import content from "@/data/pageContent/br-pt.json";
export default function campaign({ pathArray}) {
    if (pathArray[2]) {
        const pageData = content?.pages[pathArray[2]];
        return (
            <>
                <ProductComponent pageData={pageData} pathArray={pathArray} />
            </>
        );
    }
}
