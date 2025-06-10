export default async function Page(props) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const slug = params?.slug || [];
    const queryParams = searchParams || {};

    return <div className='container'></div>;
}
