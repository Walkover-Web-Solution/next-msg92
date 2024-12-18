import axios from 'axios';

export default async function getBotTemplates(page) {
    try {
        const response = await axios.get(
            `${process.env.HELLO_API_URL}/public/bot/template?with_widget=true&page=${page}`
        );
        if (response?.data?.success) {
            return response.data.data;
        } else {
            console.log('Failed to fetch templates');
        }
    } catch (error) {
        console.log('Error fetching templates');
    }
}
