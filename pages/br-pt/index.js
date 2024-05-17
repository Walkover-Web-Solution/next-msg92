import IndexComponent from "@/components/br-pt/pageCoponents/indexComponent/indexComponent";
import content from "@/data/pageContent/br-pt.json";
export default function index() {
    const pageData = content?.pages?.index;
    return (
        <>
            <IndexComponent pageData={pageData} />
        </>
    );
}
