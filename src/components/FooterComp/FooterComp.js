export default function FooterComp({data}) {
    const pageData = require(`@/data/${data.country}/footer.json`);    
    return (
        <>
            <div className="text">{pageData.title}</div>
        </>
    );
}
