import { PhoneNumberFormat, PhoneNumberType, PhoneNumberUtil } from 'google-libphonenumber';

import { countries, getCountryByCode } from './countries-data';

const phoneUtil = PhoneNumberUtil.getInstance();

/**
 * Keep numbers only.
 */
export const formatPhoneNumber = (value) => {
    if (value === null || value === undefined) {
        return '';
    }

    return String(value).replace(/\D/g, '');
};

/**
 * Clean an international number but preserve leading +.
 */
export const sanitizeInternationalNumber = (value) => {
    if (!value) {
        return '';
    }

    const trimmedValue = String(value).trim();

    const hasLeadingPlus = trimmedValue.startsWith('+');

    const digits = trimmedValue.replace(/\D/g, '');

    return hasLeadingPlus ? `+${digits}` : digits;
};

/**
 * +91 + 9876543210
 *
 * =>
 *
 * +919876543210
 */
export const buildFullPhoneNumber = (dialCode, phoneNumber) => {
    const cleanDialCode = formatPhoneNumber(dialCode);

    const cleanPhoneNumber = formatPhoneNumber(phoneNumber);

    if (!cleanDialCode && !cleanPhoneNumber) {
        return '';
    }

    return `+${cleanDialCode}${cleanPhoneNumber}`;
};

/**
 * Get dial code using country code.
 *
 * IN => +91
 */
export const getDialCodeByCountryCode = (countryCode) => {
    const country = getCountryByCode(countryCode);

    return country?.dialCode || '';
};

/**
 * Parse national number using selected country.
 */
export const parseNationalPhoneNumber = (phoneNumber, countryCode) => {
    try {
        const cleanedNumber = formatPhoneNumber(phoneNumber);

        if (!cleanedNumber || !countryCode) {
            return null;
        }

        return phoneUtil.parse(cleanedNumber, countryCode.toUpperCase());
    } catch {
        return null;
    }
};

/**
 * Parse complete international phone number.
 */
export const parseFullPhoneNumber = (value) => {
    const emptyResult = {
        country: undefined,
        countryCode: '',
        dialCode: '',
        phoneNumber: '',
        fullNumber: '',
        isValid: false,
    };

    if (!value) {
        return emptyResult;
    }

    let normalizedValue = sanitizeInternationalNumber(value);

    if (!normalizedValue) {
        return emptyResult;
    }

    if (!normalizedValue.startsWith('+')) {
        normalizedValue = `+${normalizedValue}`;
    }

    try {
        const parsedNumber = phoneUtil.parse(normalizedValue);

        const regionCode = phoneUtil.getRegionCodeForNumber(parsedNumber) || '';

        const country = getCountryByCode(regionCode);

        const callingCode = parsedNumber.getCountryCode();

        const dialCode = callingCode ? `+${callingCode}` : country?.dialCode || '';

        const nationalNumber = parsedNumber.getNationalNumber()?.toString() || '';

        const fullNumber = phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);

        return {
            country,
            countryCode: regionCode,
            dialCode,
            phoneNumber: nationalNumber,
            fullNumber,
            isValid: phoneUtil.isValidNumber(parsedNumber),
        };
    } catch {
        return parseIncompleteInternationalNumber(normalizedValue);
    }
};

/**
 * Used when user is still typing.
 *
 * Example:
 * +9
 * +91
 * +9198
 */
const parseIncompleteInternationalNumber = (value) => {
    const digits = formatPhoneNumber(value);

    if (!digits) {
        return {
            country: undefined,
            countryCode: '',
            dialCode: '',
            phoneNumber: '',
            fullNumber: '',
            isValid: false,
        };
    }

    /*
     * Longest codes first.
     *
     * This prevents +1 from matching before +1684.
     */
    const sortedCountries = [...countries].sort(
        (a, b) => formatPhoneNumber(b.dialCode).length - formatPhoneNumber(a.dialCode).length
    );

    const matchedCountry = sortedCountries.find((country) => {
        const dialCode = formatPhoneNumber(country.dialCode);

        return digits.startsWith(dialCode);
    });

    if (!matchedCountry) {
        return {
            country: undefined,
            countryCode: '',
            dialCode: '',
            phoneNumber: digits,
            fullNumber: `+${digits}`,
            isValid: false,
        };
    }

    const dialCodeDigits = formatPhoneNumber(matchedCountry.dialCode);

    const phoneNumber = digits.slice(dialCodeDigits.length);

    return {
        country: matchedCountry,
        countryCode: matchedCountry.code,
        dialCode: matchedCountry.dialCode,
        phoneNumber,
        fullNumber: buildFullPhoneNumber(matchedCountry.dialCode, phoneNumber),
        isValid: false,
    };
};

/**
 * Validate phone number using Google's
 * international phone metadata.
 */
export const validatePhoneNumber = (phoneNumber, countryCode, required = true) => {
    const cleanedNumber = formatPhoneNumber(phoneNumber);

    if (!cleanedNumber) {
        if (required) {
            return {
                isValid: false,
                error: 'Phone number is required',
            };
        }

        return {
            isValid: true,
        };
    }

    if (!countryCode) {
        return {
            isValid: false,
            error: 'Please select a country',
        };
    }

    try {
        const parsedNumber = phoneUtil.parse(cleanedNumber, countryCode.toUpperCase());

        if (!phoneUtil.isPossibleNumber(parsedNumber)) {
            return {
                isValid: false,
                error: 'Invalid phone number length',
            };
        }

        if (!phoneUtil.isValidNumberForRegion(parsedNumber, countryCode.toUpperCase())) {
            return {
                isValid: false,
                error: 'Invalid phone number',
            };
        }

        return {
            isValid: true,
        };
    } catch {
        return {
            isValid: false,
            error: 'Invalid phone number',
        };
    }
};

/**
 * Boolean validation helper.
 */
export const isValidPhoneNumber = (phoneNumber, countryCode) => {
    return validatePhoneNumber(phoneNumber, countryCode).isValid;
};

/**
 * Check whether number is mobile.
 */
export const isMobilePhoneNumber = (phoneNumber, countryCode) => {
    if (!countryCode) {
        return false;
    }

    try {
        const parsedNumber = phoneUtil.parse(formatPhoneNumber(phoneNumber), countryCode.toUpperCase());

        if (!phoneUtil.isValidNumberForRegion(parsedNumber, countryCode.toUpperCase())) {
            return false;
        }

        const numberType = phoneUtil.getNumberType(parsedNumber);

        return numberType === PhoneNumberType.MOBILE || numberType === PhoneNumberType.FIXED_LINE_OR_MOBILE;
    } catch {
        return false;
    }
};

/**
 * Format national number for display.
 */
export const formatPhoneNumberForDisplay = (phoneNumber, countryCode) => {
    const cleanedNumber = formatPhoneNumber(phoneNumber);

    if (!cleanedNumber) {
        return '';
    }

    if (!countryCode) {
        return cleanedNumber;
    }

    try {
        const parsedNumber = phoneUtil.parse(cleanedNumber, countryCode.toUpperCase());

        return phoneUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL);
    } catch {
        return cleanedNumber;
    }
};

/**
 * Convert to E.164.
 *
 * 9876543210 + IN
 *
 * =>
 *
 * +919876543210
 */
export const formatToE164 = (phoneNumber, countryCode) => {
    if (!countryCode) {
        return '';
    }

    try {
        const parsedNumber = phoneUtil.parse(formatPhoneNumber(phoneNumber), countryCode.toUpperCase());

        return phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
    } catch {
        const country = getCountryByCode(countryCode);

        if (!country) {
            return '';
        }

        return buildFullPhoneNumber(country.dialCode, phoneNumber);
    }
};

/**
 * Format full international number.
 */
export const formatInternationalPhoneNumber = (value) => {
    try {
        let normalizedValue = sanitizeInternationalNumber(value);

        if (!normalizedValue) {
            return '';
        }

        if (!normalizedValue.startsWith('+')) {
            normalizedValue = `+${normalizedValue}`;
        }

        const parsedNumber = phoneUtil.parse(normalizedValue);

        return phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL);
    } catch {
        return value || '';
    }
};

/**
 * Detect country from full number.
 */
export const detectCountryFromPhoneNumber = (value) => {
    if (!value) {
        return undefined;
    }

    try {
        let normalizedValue = sanitizeInternationalNumber(value);

        if (!normalizedValue.startsWith('+')) {
            normalizedValue = `+${normalizedValue}`;
        }

        const parsedNumber = phoneUtil.parse(normalizedValue);

        const regionCode = phoneUtil.getRegionCodeForNumber(parsedNumber);

        return regionCode ? getCountryByCode(regionCode) : undefined;
    } catch {
        return undefined;
    }
};
