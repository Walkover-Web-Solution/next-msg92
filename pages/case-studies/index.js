import React from "react";
import Casestudycard from "@/components/case-study-indexComp";
import Casestudydata from "@/data/case-study.json"
const casestudycard = () => {

    return (
        <>
            <Casestudycard caseStudies={Casestudydata}/>        
        </>
    );
};
export default casestudycard;