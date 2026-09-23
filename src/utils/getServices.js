import axios from 'axios';

export default async function getServices() {
    const response = await axios.get(`${process.env.API_BASE_URL}/api/v5/web/getAllServices`);
    return response;
}
