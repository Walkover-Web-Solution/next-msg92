import data from '@/data/content.json';
import IndexComp from '@/components/comps/indexComponent';
import ProductComponent from '@/components/comps/productComp';
import HelloNewComponent from '@/components/comps/helloNewComp';
import ChannelComponent from '@/components/comps/channelComp';
import HelloRestComp from '@/components/comps/helloRestComp/helloRestComp';
import availableCountries from '@/data/available-countries.json';

const mainpage = ({ pageData, params, path, pricingPath, pathArray }) => {
    var page = pageData?.pagename;
    var Dataa = pageData;
    var channels = ['SMS', 'RCS', 'Email', 'WhatsApp', 'Voice', 'Numbers'];
    var helloNewCountries = ['us', 'ae', 'es'];
    if (!pageData) {
        return (
            <div>
                <h1>404 - Page Not Found</h1>
                <p>The requested page was not found.</p>
            </div>
        );
    } else if (page === 'index') {
        return (
            <>
                <IndexComp params={params} pricingPath={pricingPath} pathArray={pathArray} />
            </>
        );
    } else {
        if (channels.includes(pageData?.pagename)) {
            return (
                <>
                    <div>
                        <ChannelComponent pageData={Dataa} path={path} pricingPath={pricingPath} pathArray={pathArray} />
                    </div>
                </>
            );
        } else {
            if (helloNewCountries.includes(params?.country) && params?.pageslug === 'hello') {
                return (
                    <>
                        <div>
                            <HelloNewComponent pageData={Dataa} path={path} pricingPath={pricingPath} pathArray={pathArray} />
                        </div>
                    </>
                );
            } else {
                
                return (
                    <>
                        <div>
                            {params?.pageslug === 'hello' ? (
                                <HelloRestComp pageData={Dataa} path={path} pricingPath={pricingPath} pathArray={pathArray}/>
                            ) : ( 
                                <ProductComponent pageData={Dataa} path={path} pricingPath={pricingPath} pathArray={pathArray} />
                            )}
                        </div>
                    </>
                );
            }
        }
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
    
    if (!Object.keys(availableCountries).includes(country)) {        
        country = "global";
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
