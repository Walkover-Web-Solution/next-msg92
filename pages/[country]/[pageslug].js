import data from "@/data/content.json";
import IndexComp from "@/components/comps/indexComponent";
import ProductComponent from "@/components/comps/productComp";
import ChannelComponent from "@/components/comps/channelComp";

const mainpage = ({ pageData, params, path, pricingPath }) => {  
  var page = pageData?.pagename;
  var code = pageData?.code;
  var Dataa = pageData;
  var channels = ['SMS','Email','WhatsApp','Voice'];
  
  if (!pageData) {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The requested page was not found.</p>
      </div>
    );
  } else if (page === "index") {
    return (
      <>
        <IndexComp params={params}/>
      </>
    );
  } else {
    if(channels.includes(pageData?.pagename)){      
      return (
        <>
          <div>            
            <ChannelComponent pageData={Dataa} path={path} pricingPath={pricingPath} />
          </div>
        </>
      );
    }
    else{
      return (
        <>
          <div>
            <ProductComponent pageData={Dataa} path={path} pricingPath={pricingPath} />
          </div>
        </>
      );
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
  if (country.length > 2 && pageslug == null) {
    pageslug = country;
    country = "global";
  } else if (country.length == 2 && pageslug == null) {
    pageslug = "index";
  }
  const countryData = data[country] || {};
  const pageData = countryData[pageslug] || null; // Update variable name to 'pageslug'

  /* try {
    // prompt through webhook with help of axios
    const axios = require("axios");
    const options = {
        //url of webhook
        url: "https://flow.sokt.io/func/8BCaBdmk150G",
        headers: {
            "Content-Type": "application/json",
            "auth-key":"key2zQoVDAbhH7G",
        },
        method: "GET",

        //data to be posted curl_command and api_description
    };

    //response of axios taking through webhook
    const data = await axios(options);
    var webhookData = data.data.rows;
  } catch (error) {
    console.log("inside CATCH webhook function");
    console.log("error: ", error);
  } */
  return {
    props: {
      pageData,
      params      
    },
  };
}
