import { getGstAuthToken } from '@/lib/gst/jwtUtils';
import { GSTIN_LENGTH, GSTIN_REGEX } from '@/components/SignupCompNew/SignupUtils/gstConstants';
import { normalizeGstin } from '@/components/SignupCompNew/SignupUtils/gstUtils';

const GST_API_TIMEOUT_MS = 15000;

/**
 * Proxy GST lookup to MSG91 API — keeps JWT secret server-side only
 */
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const gstCode = normalizeGstin(req.query?.gst_code);

    if (!gstCode) {
        return res.status(400).json({ error: 'GSTIN is required.' });
    }

    if (gstCode.length !== GSTIN_LENGTH || !GSTIN_REGEX.test(gstCode)) {
        return res.status(400).json({ error: 'Invalid GSTIN format.' });
    }

    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) {
        return res.status(500).json({ error: 'GST service is not configured.' });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GST_API_TIMEOUT_MS);

    try {
        const authToken = getGstAuthToken();
        const upstream = await fetch(`${apiBaseUrl}/api/v5/web/getGstDetails?gst_code=${encodeURIComponent(gstCode)}`, {
            method: 'GET',
            headers: {
                Authorization: authToken,
            },
            signal: controller.signal,
        });

        let body = null;
        try {
            body = await upstream.json();
        } catch {
            body = null;
        }

        if (!upstream.ok) {
            const fullErrorMessage =
                (typeof body?.error === 'string' && body.error) ||
                (typeof body?.message === 'string' && body.message) ||
                (Array.isArray(body?.errors) ? body.errors.map((error) => String(error)).join(', ') : '');

            return res.status(upstream.status).json({
                ...(body && typeof body === 'object' ? body : {}),
                error: fullErrorMessage,
            });
        }

        return res.status(200).json(body);
    } catch (error) {
        if (error?.name === 'AbortError') {
            return res.status(504).json({ error: error.message });
        }

        return res.status(500).json({ error: error?.message });
    } finally {
        clearTimeout(timeoutId);
    }
}
