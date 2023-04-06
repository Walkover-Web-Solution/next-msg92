import React from "react";
import { useRouter } from "next/router";
import data from "../content.json";

const PageNo = ({ pageData }) => {
  if (!pageData) {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The requested page was not found.</p>
      </div>
    );
  }
  return (
    <>
      <h1>{pageData.head}</h1>
    </>
  );
};

export default PageNo;

export async function getStaticPaths() {
  // Generate the static paths for each country and pageNo combination
  const paths = [];
  const countries = Object.keys(data);
  countries.forEach((country) => {
    const countryData = data[country] || {};
    const pageNos = Object.keys(countryData);
    pageNos.forEach((pageNo) => {
      paths.push({
        params: {
          country,
          pageNo,
        },
      });
    });
  });
  return {
    paths,
    fallback: false, // or 'blocking' if you want to use fallback pages
  };
}

export async function getStaticProps({ params }) {
  // Fetch the data for the page during build time
  const { country, pageNo } = params;
  const countryData = data[country] || {};
  const pageData = countryData[pageNo] || null;

  return {
    props: {
      pageData,
    },
  };
}
