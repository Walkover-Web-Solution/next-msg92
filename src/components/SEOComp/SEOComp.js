export default function SEOComp({data}) {
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
        </>
    );
}
