import React from "react";
import {MdKeyboardArrowLeft} from "react-icons/md"

const CaseStudyCard = ({ caseStudies }) => {
    var caseStudyData = caseStudies.caseStudies
    function tagLinkFun(tag) {
        const route = "/case-studies/tag/"
        const tagLinkVar= tag
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
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
          <div className="casestudycard  mx-auto  p-3 d-flex gap-3 flex-column">
            <div className="casestudycard-img w-100 bg-white">
              <img
                className=""
                src={caseStudy.img}
                alt={caseStudy.heading}
              />
            </div>
            <h3 className="small-heading text-truncate ">
              {caseStudy.heading}
            </h3>
            <p className=" c-fs-4">{caseStudy.content}</p>
              <a key={index} href={caseStudy.link}><p className="btn btn-outline-dark py-1 px-2 c-fs-5 mb-3">Learn more</p></a>
            <div className=" d-flex flex-wrap gap-3 mt-auto">
              {caseStudy.tags.map((tag, index) => (
                <a href={tagLinkFun(tag)}>
                <span
                  key={index}
                  className="btn btn-sm btn-dark c-fs-5"
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
        <a href="/case-studies" className="c-fs-4 btn btn-dark align-items-center d-inline-flex content-fill py-2 px-3"><MdKeyboardArrowLeft/> Back</a>
      </div>
    </>
  );
};

export default CaseStudyCard;
