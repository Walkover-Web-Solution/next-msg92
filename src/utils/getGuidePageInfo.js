export default function getGuidePageInfo(params) {
    let pageNo = params.query?.page || 1;
    let country = 'global';
    return { pageNo, country };
}
