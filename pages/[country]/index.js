import data from "@/data/content.json";
import BRContent from "@/data/content/br.json";
import IndexComp from "@/components/comps/indexComponent";
import IndexDynamicComp from "@/components/comps/indexDynamicComponent";

const mainpage = ({ pageData, params }) => {
    console.log("🚀 ~ mainpage ~ params:", params);
    var page = pageData?.pagename;
    console.log("🚀 ~ mainpage ~ pageData:", pageData);
    if (!pageData) {
        return (
            <div>
                <h1>404 - Page Not Found</h1>
                <p>The requested page was not found.</p>
            </div>
        );
    } else if (page === "index") {
        if (params?.country === "br") {
            return (
                <>
                    <IndexDynamicComp params={params} pageData={BRContent.index} />
                </>
            );
        } else {
            return (
                <>
                    <IndexComp params={params} pageData={pageData} />
                </>
            );
        }
    } else {
        return (
            <>
                <h1>{pageData.head}</h1>
            </>
        );
    }
};

export default mainpage;

export async function getStaticPaths() {
    const paths = [];
    const countries = Object.keys(data);
    countries.forEach((country) => {
        const countryData = data[country] || {};
        const pages = Object.keys(countryData);
        pages.forEach((page) => {
            paths.push({
                params: {
                    pageslug: page, // Use 'pageslug' as the slug name
                    country: country,
                },
            });
        });
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    let { pageslug, country } = params; // Update variable name to 'pageslug'
    if (country.length > 2 && pageslug == null) {
        pageslug = country;
        country = "global";
    } else if (country.length == 2 && pageslug == null) {
        pageslug = "index";
    }
    const countryData = data[country] || {};
    const pageData = countryData[pageslug] || null; // Update variable name to 'pageslug'
    return {
        props: {
            pageData,
            params,
        },
    };
}
