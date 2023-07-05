import React from "react";
import Casestudycard from "@/components/case-study-indexComp";
import CasestudydataAll from "@/data/case-study.json";
const casestudycard = ({ browserPath }) => {
  var path = browserPath.split("/")[3];

  if (path !== "[tag]") {
    var tagGroup = path;
  } else {
    var tagGroup = "nodata";
  }
  const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  };
  const filteredCaseStudies = CasestudydataAll.caseStudies.filter(
    (caseStudy) => {
      const tagSlugs = caseStudy.tags.map((tag) => slugify(tag));
      return tagSlugs.includes(slugify(tagGroup));
    }
  );
  const Casestudydata = {
    caseStudies: filteredCaseStudies,
  };

  return (
    <>
      <Casestudycard caseStudies={Casestudydata} />
    </>
  );
};
export default casestudycard;
