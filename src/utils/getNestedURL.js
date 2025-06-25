export default function getNestedURL(type, link, pageInfo) {
    if (pageInfo.country !== 'global') {
        return process.env.BASE_URL + '/' + pageInfo.country + '/' + link;
    } else {
        return process.env.BASE_URL + '/' + link;
    }
}
