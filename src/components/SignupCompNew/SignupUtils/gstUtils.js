import { GSTIN_LENGTH, GSTIN_REGEX, GST_VALIDATION_MESSAGES } from './gstConstants';

/**
 * @typedef {Object} GstinValidationResult
 * @property {boolean} valid
 * @property {string} message
 * @property {boolean} readyForLookup - true when 15 chars and valid format
 */

/**
 * Normalize GSTIN: trim, uppercase, remove spaces
 * @param {string} value
 * @returns {string}
 */
export function normalizeGstin(value) {
    return (value || '').trim().toUpperCase().replace(/\s/g, '');
}

/**
 * Validate GSTIN format (client-side, before API call)
 * @param {string} gstin - normalized GSTIN
 * @returns {GstinValidationResult}
 */
export function validateGstinFormat(gstin) {
    if (!gstin) {
        return { valid: false, message: '', readyForLookup: false };
    }

    if (gstin.length < GSTIN_LENGTH) {
        return {
            valid: false,
            message: gstin.length > 0 ? GST_VALIDATION_MESSAGES.REQUIRED_LENGTH : '',
            readyForLookup: false,
        };
    }

    if (gstin.length > GSTIN_LENGTH) {
        return {
            valid: false,
            message: GST_VALIDATION_MESSAGES.INVALID_FORMAT,
            readyForLookup: false,
        };
    }

    if (!GSTIN_REGEX.test(gstin)) {
        return {
            valid: false,
            message: GST_VALIDATION_MESSAGES.INVALID_FORMAT,
            readyForLookup: false,
        };
    }

    return { valid: true, message: '', readyForLookup: true };
}

/**
 * Build a single-line address from GST API addr object
 * @param {Object} [addr]
 * @returns {string}
 */
export function formatAddressFromGstAddr(addr) {
    if (!addr || typeof addr !== 'object') return '';
    return [addr.flno, addr.bno, addr.bnm, addr.st, addr.loc, addr.locality]
        .filter((part) => part != null && String(part).trim() !== '')
        .join(', ');
}

/**
 * @typedef {Object} GstAutofillData
 * @property {string} gstNo
 * @property {string} address
 * @property {string} postalCode
 * @property {string} stateName
 * @property {string} cityName
 */

/**
 * @typedef {Object} GstLookupSuccess
 * @property {'success'} type
 * @property {GstAutofillData} data
 */

/**
 * @typedef {Object} GstLookupInactive
 * @property {'inactive'} type
 * @property {string} message
 */

/**
 * @typedef {Object} GstLookupApiError
 * @property {'api_error'} type
 * @property {string} message
 */

/**
 * @typedef {GstLookupSuccess|GstLookupInactive|GstLookupApiError} GstLookupResult
 */

/**
 * Parse successful GST API JSON into autofill payload or user-facing errors
 * @param {Object} apiBody - raw API response body
 * @param {string} gstin - normalized GSTIN
 * @returns {GstLookupResult}
 */
export function parseGstLookupResponse(apiBody, gstin) {
    if (!apiBody || typeof apiBody !== 'object') {
        return {
            type: 'api_error',
            message: extractApiErrorMessage(apiBody),
        };
    }

    if (apiBody.status !== 'success' || apiBody.hasError) {
        return {
            type: 'api_error',
            message: extractApiErrorMessage(apiBody),
        };
    }

    const gstData = apiBody.data;
    if (!gstData || typeof gstData !== 'object') {
        return {
            type: 'api_error',
            message: extractApiErrorMessage(apiBody),
        };
    }

    if (gstData.sts !== 'Active') {
        return {
            type: 'inactive',
            message: GST_VALIDATION_MESSAGES.INACTIVE,
        };
    }

    const addr = gstData.pradr?.addr;
    const stateName = addr?.stcd ? String(addr.stcd).trim() : '';
    const cityName = addr?.loc || addr?.dst ? String(addr.loc || addr.dst).trim() : '';

    return {
        type: 'success',
        data: {
            gstNo: gstin,
            address: formatAddressFromGstAddr(addr),
            postalCode: addr?.pncd ? String(addr.pncd).trim() : '',
            stateName,
            cityName,
        },
    };
}

/**
 * Extract first error string from MSG91 API body
 * @param {Object} apiBody
 * @returns {string}
 */
export function extractApiErrorMessage(apiBody) {
    if (!apiBody) return '';
    if (typeof apiBody.error === 'string' && apiBody.error) return apiBody.error;
    if (Array.isArray(apiBody.errors) && apiBody.errors.length > 0) {
        const first = apiBody.errors[0];
        return typeof first === 'string' ? first : first?.message || String(first);
    }
    if (typeof apiBody.message === 'string' && apiBody.message) return apiBody.message;
    return '';
}
