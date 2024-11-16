export default function getNestedURL(type, link, pageInfo) {
    if (pageInfo.country === 'in') {
        return process.env.BASE_URL + '/in/' + link;
    } else {
        return process.env.BASE_URL + '/' + link;
    }
}
