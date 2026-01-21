import { MdCheckCircle } from 'react-icons/md';
import { useState, useEffect, useMemo } from 'react';
import PhoneInputWithCountry from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

/**
 * Phone Input Component with Country Code Selector
 * Handles all phone number and country code logic internally
 * @param {string} value - Phone number value (full international format)
 * @param {Function} onChange - Change handler for phone number
 * @param {Function} onCountryChange - Optional callback when country changes
 * @param {Function} onBlur - Blur handler
 * @param {Object} defaultCountry - Default country object from parent
 * @param {boolean} verified - Whether phone is verified
 * @param {boolean} disabled - Disable input
 * @param {string} placeholder - Input placeholder
 */
export default function PhoneInput({
    value = '',
    onChange,
    onCountryChange,
    onBlur,
    defaultCountry,
    verified = false,
    disabled = false,
    placeholder = 'Enter phone number',
}) {
    const [internalCountry, setInternalCountry] = useState(defaultCountry?.shortName || 'IN');

    // Update internal country when defaultCountry changes (from parent)
    useEffect(() => {
        if (defaultCountry?.shortName && !verified) {
            setInternalCountry(defaultCountry.shortName);
        }
    }, [defaultCountry?.shortName, verified]);

    // Extract country code from phone number
    const phoneCountryCode = useMemo(() => {
        if (!value || !value.startsWith('+')) return null;
        const match = value.match(/^\+(\d{1,3})/);
        return match ? match[1] : null;
    }, [value]);

    const handlePhoneChange = (phoneValue) => {
        // phoneValue is in E.164 format (e.g., +919876543210)
        onChange(phoneValue || '');

        // Notify parent of country change if callback provided
        if (onCountryChange && phoneValue) {
            const code = phoneValue.match(/^\+(\d{1,3})/)?.[1];
            if (code) {
                onCountryChange({ countryCode: code });
            }
        }
    };

    return (
        <div className='w-full min-w-[320px] max-w-[420px] relative'>
            <PhoneInputWithCountry
                defaultCountry={internalCountry}
                value={value}
                onChange={handlePhoneChange}
                onBlur={onBlur}
                disabled={disabled || verified}
                placeholder={placeholder}
                className={`phone-input-wrapper ${verified ? 'verified' : ''}`}
            />
            {verified && (
                <MdCheckCircle
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 text-xl z-10'
                    aria-label='Phone verified'
                />
            )}
            <style jsx>{`
                :global(.phone-input-wrapper) {
                    position: relative;
                    display: flex;
                    align-items: center;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    padding-left: 0.75rem;
                    background: white;
                }
                :global(.phone-input-wrapper:focus-within) {
                    border-color: var(--accent-color, #3b82f6);
                }
                :global(.phone-input-wrapper.verified) {
                    background-color: #f9fafb;
                }
                :global(.phone-input-wrapper .PhoneInputCountry) {
                    margin-right: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                :global(.phone-input-wrapper .PhoneInputCountryIcon) {
                    width: 1.5rem;
                    height: 1.5rem;
                }
                :global(.phone-input-wrapper .PhoneInputCountryIcon--border) {
                    background-color: transparent !important;
                    box-shadow: none !important;
                }
                :global(.phone-input-wrapper .PhoneInputCountrySelectArrow) {
                    display: block;
                    opacity: 0.5;
                    width: 0.5rem;
                    height: 0.5rem;
                }
                :global(.phone-input-wrapper .PhoneInputInput) {
                    flex: 1;
                    padding: 0.75rem;
                    font-size: 1rem;
                    border: none;
                    border-radius: 0;
                    outline: none;
                    background: transparent;
                }
                :global(.phone-input-wrapper.verified .PhoneInputInput) {
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
