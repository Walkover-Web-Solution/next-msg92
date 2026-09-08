import axios from 'axios';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { businessId, intentId, groupId, preFilledMessage } = req.body;

        // Validate required fields
        if (!businessId || !businessId.trim()) {
            return res.status(400).json({ success: false, message: 'Business ID is required' });
        }

        // Make request to MSG91 API
        const response = await axios.post(
            process.env.IMESSAGE_URL,
            {
                businessId: businessId.trim(),
                'biz-intent-id': intentId?.trim() || '',
                'biz-group-id': groupId?.trim() || '',
                body: preFilledMessage?.trim() || '',
            },
            {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Return the API response
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Apple Messages API Error:', error);

        let message = 'An unexpected error occurred. Please try again.';

        // Handle different error types with user-friendly messages
        if (error.code === 'ECONNABORTED') {
            message = 'Request timed out. Please check your connection and try again.';
        } else if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const apiMessage = error.response.data?.message;

            if (status === 400) {
                message = apiMessage || 'Invalid request. Please check your input and try again.';
            } else if (status === 401) {
                message = 'Authentication failed. Please contact support.';
            } else if (status === 403) {
                message = 'Access denied. Please contact support.';
            } else if (status === 404) {
                message = 'Service not found. Please contact support.';
            } else if (status === 429) {
                message = 'Too many requests. Please wait and try again later.';
            } else if (status >= 500) {
                message = apiMessage || 'Server error. Please try again later.';
            } else {
                message = apiMessage || `Error ${status}: Please try again.`;
            }
        } else if (error.request) {
            // Request made but no response received
            message = 'Network error. Please check your internet connection.';
        }

        return res.status(200).json({
            success: false,
            message: message,
        });
    }
}
