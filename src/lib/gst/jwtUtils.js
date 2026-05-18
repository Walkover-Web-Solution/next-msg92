import crypto from 'crypto';

/**
 * Create HS256 JWT for MSG91 web API authorization (server-side only)
 * @param {Object} payload - JWT payload
 * @param {string} secret - Signing secret
 * @returns {string} JWT token
 */
export function createHs256Jwt(payload, secret) {
    const encodedHeader = Buffer.from(JSON.stringify({ typ: 'JWT', alg: 'HS256' })).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url');
    return `${data}.${signature}`;
}

/**
 * Authorization token for GST lookup (server-side only)
 * @returns {string} JWT token
 */
export function getGstAuthToken() {
    const companyId = process.env.GST_JWT_COMPANY_ID || '125';
    const secret = process.env.GST_JWT_SECRET || 'secret';
    return createHs256Jwt({ company_id: companyId }, secret);
}
