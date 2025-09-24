export default async function getCountyFromIP() {
    try {
        const res = await fetch('https://api.db-ip.com/v2/free/self');
        const data = await res.json();
        return data?.countryCode?.toLowerCase() || 'us';
    } catch {
        return 'us';
    }
}
