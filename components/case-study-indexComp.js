import React from "react";

const CaseStudyCard = ({ caseStudies }) => {
    var caseStudyData = caseStudies.caseStudies
    function tagLinkFun(tag) {
        const route = "/case-studies/tag/"
        const tagLinkVar= tag
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/^-+|-+$/g, "");
        var tagLink = route+tagLinkVar
        return tagLink;
      }
  return (
    <>
      <div className="container text-center justify-content-center p-5">
        <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
          <h1 className="heading">
            Customer Stories of businesses successfully using MSG91 APIs
          </h1>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column flex-sm-row">
          <span className="c-fs-2 mx-auto pt-3">
            Use SMS, Email, Voice APIs to trigger your communications from within your product
          </span>
        </div>
      </div>
      <div className="container d-flex flex-wrap gap-5 py-5">
        {caseStudyData.map((caseStudy, index) => (
          <div className="casestudycard mx-auto c-bg-grey d-flex gap-3 flex-column p-2">
            <div className="casestudycard-img w-100 bg-white">
              <img
                className="ms-4"
                src={caseStudy.img}
                alt={caseStudy.heading}
              />
            </div>
            <h3 className="small-heading text-truncate px-4">
              {caseStudy.heading}
            </h3>
            <p className="px-4 c-fs-4">{caseStudy.content}</p>
              <a key={index} href={caseStudy.link}><p className="px-4 lm">Learn more</p></a>
            <div className="px-4 my-4 d-flex flex-wrap gap-3 mt-auto">
              {caseStudy.tags.map((tag, index) => (
                <a href={tagLinkFun(tag)}>
                <span
                  key={index}
                  className="text-white bg-black c-fs-5 py-1 px-2"
                >
                  {tag}
                </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container py-5">
        <a href="/case-studies">Back</a>
      </div>
    </>
  );
};

export default CaseStudyCard;
