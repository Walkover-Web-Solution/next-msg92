export default function getGuidePageInfo(params) {
    let pageNo = params.query?.page || 1;
    return { pageNo };
}
