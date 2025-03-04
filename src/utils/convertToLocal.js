export default function contvertToLocal(number, currency) {
    if (currency === 'INR') {
        {
            return Number(number).toLocaleString('en-IN');
        }
    } else {
        {
            return Number(number).toLocaleString('en-US');
        }
    }
}
