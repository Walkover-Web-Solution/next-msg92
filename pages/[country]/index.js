import data from "../content.json";
import IndexComp from "@/components/comps/indexComponent";

const mainpage = ({ pageData }) => {
  var page = pageData?.pagename;
  if (!pageData) {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The requested page was not found.</p>
      </div>
    );
  } else if (page === "index") {
    // console.log("page index");
    return (
      <>
        <IndexComp />
      </>
    );
  } else {
    // console.log("page ", pageData.pagename);
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
      pageData,
    },
  };
}
