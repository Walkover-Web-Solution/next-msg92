export async function GetSmsOtpPricing(amountArray, currency, origin, destination) {
    try {
        const fetchRequests = amountArray.map(async (amount) => {
            const response = await axios.get(
                `${process.env.PRICING_URL}/api/v5/web/fetchPricingDetails?amount=${amount}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
            );
            return response.data.data;
        });

        const newData = await Promise.all(fetchRequests);
        return newData;
    } catch (error) {
        console.error('Error fetching pricing details:', error);
        return null;
    }
}
