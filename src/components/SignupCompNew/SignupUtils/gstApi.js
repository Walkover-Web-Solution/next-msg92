/**
 * Client-side GST lookup — calls Next.js API route only (no secrets in browser)
 */

import { extractApiErrorMessage } from './gstUtils';

export class GstApiError extends Error {
    /**
     * @param {string} message
     * @param {number} [status]
     */
    constructor(message, status) {
        super(message);
        this.name = 'GstApiError';
        this.status = status;
    }
}

/**
 * Fetch GST details via backend proxy
 * @param {string} gstCode - normalized 15-char GSTIN
 * @param {AbortSignal} [signal]
 * @returns {Promise<Object>} MSG91 API response body
 */
export async function fetchGstDetails(gstCode, signal) {
    const response = await fetch(`/api/gst-details?gst_code=${encodeURIComponent(gstCode)}`, {
        method: 'GET',
        signal,
        credentials: 'same-origin',
    });

    let body = null;
    try {
        body = await response.json();
    } catch {
        body = null;
    }

    if (!response.ok) {
        throw new GstApiError(extractApiErrorMessage(body), response.status);
    }

    return body;
}
