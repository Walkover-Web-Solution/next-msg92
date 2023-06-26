import data from "@/data/content.json";
import IndexComp from "@/components/comps/indexComponent";
import ProductComponent from "@/components/comps/productComp";
import ChannelComponent from "@/components/comps/channelComp";

const mainpage = ({ pageData, params, path }) => {
  // console.log(pageData);
  var page = pageData?.pagename;
  var code = pageData?.code;
  var Dataa = pageData
  var channels = ['SMS','Email','WhatsApp','Voice'];
  // console.log(params)
  // console.log(Dataa);
  if (!pageData) {
    // console.log("No page data");
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The requested page was not found.</p>
      </div>
    );
  } else if (page === "index") {
    //console.log("page index");
    return (
      <>
        <IndexComp params={params}/>
      </>
    );
  } else {
    if(channels.includes(pageData.pagename)){
      return (
        <>
          <div>
            <ChannelComponent pageData={Dataa} path={path}/>
          </div>
        </>
      );
    }
    else{
      return (
        <>
          <div>
            <ProductComponent pageData={Dataa} params={params} />
          </div>
        </>
      );
    }
    //console.log("page ", pageData.pagename);    
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
  // console.log(params);
  if (country.length > 2 && pageslug == null) {
    pageslug = country;
    country = "global";
  } else if (country.length == 2 && pageslug == null) {
    pageslug = "index";
  }
  const countryData = data[country] || {};
  // console.log("countryData", country);
  // console.log("countryData", pageslug);
  const pageData = countryData[pageslug] || null; // Update variable name to 'pageslug'
  return {
    props: {
      pageData,params,
    },
  };
}
