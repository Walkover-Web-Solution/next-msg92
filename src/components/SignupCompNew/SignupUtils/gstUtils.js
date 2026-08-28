import { GSTIN_LENGTH, GSTIN_REGEX, GST_VALIDATION_MESSAGES } from './gstConstants';

export const GST_STATE_CODE_MAP = {
    '01': 'Jammu and Kashmir',
    '02': 'Himachal Pradesh',
    '03': 'Punjab',
    '04': 'Chandigarh',
    '05': 'Uttarakhand',
    '06': 'Haryana',
    '07': 'Delhi',
    '08': 'Rajasthan',
    '09': 'Uttar Pradesh',
    '10': 'Bihar',
    '11': 'Sikkim',
    '12': 'Arunachal Pradesh',
    '13': 'Nagaland',
    '14': 'Manipur',
    '15': 'Mizoram',
    '16': 'Tripura',
    '17': 'Meghalaya',
    '18': 'Assam',
    '19': 'West Bengal',
    '20': 'Jharkhand',
    '21': 'Odisha',
    '22': 'Chhattisgarh',
    '23': 'Madhya Pradesh',
    '24': 'Gujarat',
    '25': 'Daman and Diu',
    '26': 'Dadra and Nagar Haveli',
    '27': 'Maharashtra',
    '28': 'Andhra Pradesh',
    '29': 'Karnataka',
    '30': 'Goa',
    '31': 'Lakshadweep',
    '32': 'Kerala',
    '33': 'Tamil Nadu',
    '34': 'Pondicherry',
    '35': 'Andaman and Nicobar Islands',
    '36': 'Telangana',
    '37': 'Andhra Pradesh',
    '38': 'Ladakh',
};

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
 * @property {string} [companyName] - legal name (lgnm) from GST API
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
    const companyName = gstData.lgnm ? String(gstData.lgnm).trim() : '';

    return {
        type: 'success',
        data: {
            gstNo: gstin,
            address: formatAddressFromGstAddr(addr),
            postalCode: addr?.pncd ? String(addr.pncd).trim() : '',
            stateName,
            cityName,
            ...(companyName ? { companyName } : {}),
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
