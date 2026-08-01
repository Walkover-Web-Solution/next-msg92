import React, { useEffect, useMemo, useRef, useState } from 'react';

import { countries, getCountryByCode } from './countries-data';

import { buildFullPhoneNumber, formatPhoneNumber, parseFullPhoneNumber, validatePhoneNumber } from './phone-utils';

const MobileNumberInput = ({
    value = '',
    onChange,
    onCountryChange,

    defaultCountry = 'US',

    disabled = false,
    required = false,

    placeholder = 'Enter phone number',
    searchPlaceholder = 'Search country or code...',

    label,
    error,

    name,
    id,

    className = '',
    inputClassName = '',

    autoComplete = 'tel',
}) => {
    /*
     * Initial country
     */
    const initialCountry = getCountryByCode(defaultCountry) || getCountryByCode('US') || countries[0];

    const [selectedCountry, setSelectedCountry] = useState(initialCountry);

    const [phoneNumber, setPhoneNumber] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [validationError, setValidationError] = useState(error);

    const dropdownRef = useRef(null);

    const searchInputRef = useRef(null);

    /*
     * --------------------------------------------------------
     * Search countries
     * --------------------------------------------------------
     */

    const filteredCountries = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return countries;
        }

        return countries.filter((country) => {
            return (
                country.name.toLowerCase().includes(query) ||
                country.code.toLowerCase().includes(query) ||
                country.dialCode.toLowerCase().includes(query)
            );
        });
    }, [searchQuery]);

    /*
     * --------------------------------------------------------
     * Handle external value
     * --------------------------------------------------------
     *
     * Example:
     *
     * value="+919876543210"
     */

    useEffect(() => {
        if (!value) {
            setPhoneNumber('');
            return;
        }

        /*
         * Only treat values beginning with +
         * as complete international numbers.
         *
         * A plain national value such as 9876543210
         * should remain associated with defaultCountry.
         */
        if (String(value).trim().startsWith('+')) {
            const parsed = parseFullPhoneNumber(value);

            if (parsed.country) {
                setSelectedCountry(parsed.country);
            }

            setPhoneNumber(parsed.phoneNumber);

            return;
        }

        setPhoneNumber(formatPhoneNumber(value));
    }, [value]);

    /*
     * External error
     */
    useEffect(() => {
        setValidationError(error);
    }, [error]);

    /*
     * --------------------------------------------------------
     * Close dropdown when clicking outside
     * --------------------------------------------------------
     */

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    /*
     * Focus search after opening.
     */
    useEffect(() => {
        if (!isDropdownOpen) {
            return;
        }

        const timer = setTimeout(() => {
            searchInputRef.current?.focus();
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [isDropdownOpen]);

    /*
     * --------------------------------------------------------
     * Emit value
     * --------------------------------------------------------
     */

    const emitValue = (country, number) => {
        const validation = validatePhoneNumber(number, country.code, required);

        const fullNumber = number ? buildFullPhoneNumber(country.dialCode, number) : '';

        setValidationError(validation.isValid ? undefined : validation.error);

        onChange?.({
            countryCode: country.code,

            dialCode: country.dialCode,

            phoneNumber: number,

            fullNumber,

            isValid: validation.isValid,
        });
    };

    /*
     * --------------------------------------------------------
     * Phone number input
     * --------------------------------------------------------
     */

    const handlePhoneNumberChange = (event) => {
        const rawValue = event.target.value;

        /*
         * User pasted an international number.
         *
         * Example:
         *
         * +919876543210
         */
        if (rawValue.trim().startsWith('+')) {
            const parsed = parseFullPhoneNumber(rawValue);

            if (parsed.country) {
                setSelectedCountry(parsed.country);

                setPhoneNumber(parsed.phoneNumber);

                emitValue(parsed.country, parsed.phoneNumber);

                return;
            }
        }

        /*
         * Normal national number.
         */
        const cleanedNumber = formatPhoneNumber(rawValue);

        setPhoneNumber(cleanedNumber);

        emitValue(selectedCountry, cleanedNumber);
    };

    /*
     * --------------------------------------------------------
     * Country selection
     * --------------------------------------------------------
     */

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);

        setIsDropdownOpen(false);
        setSearchQuery('');

        emitValue(country, phoneNumber);

        onCountryChange?.(country);
    };

    /*
     * --------------------------------------------------------
     * Dropdown
     * --------------------------------------------------------
     */

    const toggleDropdown = () => {
        if (disabled) {
            return;
        }

        setIsDropdownOpen((current) => !current);
    };

    /*
     * --------------------------------------------------------
     * Phone keyboard handling
     * --------------------------------------------------------
     */

    const handlePhoneKeyDown = (event) => {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End',
            'Tab',
            'Enter',
        ];

        /*
         * Allow copy / paste / select all.
         */
        if (event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }

        if (allowedKeys.includes(event.key)) {
            return;
        }

        /*
         * Allow numbers.
         */
        if (/^\d$/.test(event.key)) {
            return;
        }

        /*
         * Allow + only at beginning.
         */
        if (event.key === '+' && event.currentTarget.selectionStart === 0) {
            return;
        }

        event.preventDefault();
    };

    /*
     * --------------------------------------------------------
     * Render
     * --------------------------------------------------------
     */

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className='mb-1.5 block text-sm font-medium text-gray-700'>
                    {label}

                    {required && (
                        <span className='ml-1 text-red-500' aria-hidden='true'>
                            *
                        </span>
                    )}
                </label>
            )}

            <div ref={dropdownRef} className='relative flex w-full'>
                {/* Country selector */}

                <button
                    type='button'
                    disabled={disabled}
                    onClick={toggleDropdown}
                    aria-haspopup='listbox'
                    aria-expanded={isDropdownOpen}
                    aria-label={`Selected country ${selectedCountry.name}, ${selectedCountry.dialCode}`}
                    className={`
                        flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-l-md
                        border
                        border-r-0
                        px-3
                        py-2
                        transition-colors
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        disabled:cursor-not-allowed
                        disabled:opacity-50

                        ${validationError ? 'border-red-500' : 'border-gray-300'}
                    `}
                >
                    {/* Flag */}

                    <span className='text-xl leading-none' aria-hidden='true'>
                        {selectedCountry.flag}
                    </span>

                    {/* Dial code */}

                    <span className='text-sm text-gray-700'>{selectedCountry.dialCode}</span>

                    {/* Arrow */}

                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                        className={`
                            text-gray-500
                            transition-transform

                            ${isDropdownOpen ? 'rotate-180' : ''}
                        `}
                    >
                        <path d='m6 9 6 6 6-6' />
                    </svg>
                </button>

                {/* Phone number */}

                <input
                    type='tel'
                    inputMode='tel'
                    id={id}
                    name={name}
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onKeyDown={handlePhoneKeyDown}
                    disabled={disabled}
                    required={required}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={Boolean(validationError)}
                    className={`
                        min-w-0
                        flex-1
                        rounded-r-md
                        border
                        px-3
                        py-2
                        text-sm
                        outline-none
                        transition
                        focus:ring-2
                        disabled:cursor-not-allowed
                        disabled:bg-gray-100
                        disabled:opacity-50

                        ${
                            validationError
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                        }

                        ${inputClassName}
                    `}
                />

                {/* Country dropdown */}

                {isDropdownOpen && (
                    <div
                        className='
                            absolute
                            left-0
                            top-full
                            z-50
                            mt-1
                            w-full
                            min-w-[280px]
                            max-w-[360px]
                            overflow-hidden
                            rounded-md
                            border
                            border-gray-200
                            bg-white
                            shadow-lg
                        '
                    >
                        {/* Search */}

                        <div className='border-b border-gray-100 p-2'>
                            <input
                                ref={searchInputRef}
                                type='search'
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Escape') {
                                        setIsDropdownOpen(false);

                                        setSearchQuery('');
                                    }
                                }}
                                placeholder={searchPlaceholder}
                                autoComplete='off'
                                className='
                                    w-full
                                    rounded-md
                                    border
                                    border-gray-300
                                    px-3
                                    py-2
                                    text-sm
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                '
                            />
                        </div>

                        {/* Country list */}

                        <div
                            role='listbox'
                            aria-label='Countries'
                            className='
                                max-h-64
                                overflow-y-auto
                                overscroll-contain
                            '
                        >
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => {
                                    const isSelected = country.code === selectedCountry.code;

                                    return (
                                        <button
                                            key={country.code}
                                            type='button'
                                            role='option'
                                            aria-selected={isSelected}
                                            onClick={() => handleCountrySelect(country)}
                                            className={`
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    transition-colors
                                                    hover:bg-gray-50
                                                    focus:bg-gray-50
                                                    focus:outline-none

                                                    ${isSelected ? 'bg-gray-50' : ''}
                                                `}
                                        >
                                            <span className='shrink-0 text-xl leading-none' aria-hidden='true'>
                                                {country.flag}
                                            </span>

                                            <span
                                                className='
                                                        min-w-0
                                                        flex-1
                                                        truncate
                                                        text-sm
                                                        text-gray-700
                                                    '
                                            >
                                                {country.name}
                                            </span>

                                            <span
                                                className='
                                                        shrink-0
                                                        text-sm
                                                        text-gray-500
                                                    '
                                            >
                                                {country.dialCode}
                                            </span>
                                        </button>
                                    );
                                })
                            ) : (
                                <div
                                    className='
                                        px-3
                                        py-6
                                        text-center
                                        text-sm
                                        text-gray-500
                                    '
                                >
                                    No countries found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Error */}

            {validationError && (
                <p role='alert' className='mt-1.5 text-sm text-red-600'>
                    {validationError}
                </p>
            )}
        </div>
    );
};

export default MobileNumberInput;
