export default function FooterComp({ data }) {
    const pageData = require(`@/data/${data.country}/common.json`);
    const componentData = pageData?.footer;

    return (
        <>
            <div className='text'>{componentData?.title}</div>
        </>
    );
}
