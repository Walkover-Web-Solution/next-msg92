/** Valid Indian GSTIN: 15 chars — 2 digits, 5 letters, 4 digits, 1 letter, 1 alnum, Z, 1 alnum */
export const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/;

export const GSTIN_LENGTH = 15;

export const GST_DEBOUNCE_MS = 800;

export const GST_API_TIMEOUT_MS = 15000;

export const GST_VALIDATION_MESSAGES = {
    REQUIRED_LENGTH: 'GSTIN must be 15 characters.',
    INVALID_FORMAT: 'Please enter a valid GSTIN (e.g. 29AAWCS1086R2Z2).',
    INACTIVE: 'This GST registration is inactive or cancelled. Address details will not be auto-filled.',
};
