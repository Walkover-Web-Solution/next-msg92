export default function CaseStudiesComp({data}) {
    return (
        <>
        <div>{data.heading}</div>
        {data.casestudies.map((caseStudy, index) => (
            <div key={index} className="case-study-item">
                <img src={caseStudy.img} alt={`Case study ${index + 1}`} />
                <img src={caseStudy.logo} alt={`Logo of ${caseStudy.description}`} />
                <p>{caseStudy.description}</p>
                <a href={caseStudy.link}>{caseStudy.linkText}</a>
            </div>
        ))}
        </>
    );
}
