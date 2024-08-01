import { useRouter } from "next/router";
import PricingComp from "@/components/pricingComp";
import axios from "axios";

export async function getStaticPaths() {
    return {
        paths: [
            {
            params: {
                country: "",
                product: ""
            },
            }
        ],
        fallback: true,
    }    
}

export async function getStaticProps(context) {
    let whatsappPricing;
    try {
        const response = await axios.get("https://whatsapp.phone91.com/get-pricing-data/inr");
        whatsappPricing = response.data;
    } catch (error) {
        console.error("There was an error fetching the data!", error);
    }

    return {
        props: {
            whatsappPricing
        },
    };
}

const pricingmain = ({pathArray, whatsappPricing}) => {
    const router = useRouter();
   
    // const { slug } = router.query;
    let path = "";
    var browserPath = router.asPath;
    var rawPath = browserPath.split("/")[1];
    if (rawPath === "br-pt") {
        path = "br";
    } else {
        path = rawPath;
    }
    var product = browserPath.split("/")[3];
    product = product.split("?")[0];
    const getCountryCode = () => {
        var countryCode = path?.toUpperCase();
        path = path.length == 2 ? "/" + path : "";
        if (countryCode === "[COUNTRY]") {
            return getCountryCode();
        }
        return countryCode;
    };
    const data = getCountryCode();
    if (data !== "[COUNTRY]" && data.length !== 0 && product !== "product") {
        return <PricingComp countryCode={data} product={product} browserPath={browserPath} pathArray={pathArray} whatsappPricingData={whatsappPricing} />;
    } else {
        return <>LOADING</>;
    }
};
export default pricingmain;
