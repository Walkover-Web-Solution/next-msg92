import { useMemo } from 'react';
import { getCountryCallingCode } from 'react-phone-number-input';
import SearchableCombobox from './SearchableCombobox';

function getDialCode(countryCode) {
    if (!countryCode || typeof countryCode !== 'string') return '';
    try {
        return getCountryCallingCode(countryCode);
    } catch {
        return '';
    }
}

function normalizeOptions(options = [], labels = {}) {
    return options
        .filter((option) => option && !option.divider && option.value)
        .map((option) => {
            const code = String(option.value);
            const name = option.label || labels[code] || code;
            return { code, name, dialCode: getDialCode(code) };
        });
}

/**
 * Searchable country selector for react-phone-number-input
 * Options are { value, label, divider? } from the library — not raw country codes.
 */
export default function PhoneCountrySearchSelect({
    value,
    onChange,
    options = [],
    labels = {},
    iconComponent: Icon,
    disabled,
    readOnly,
    className,
}) {
    const phoneOptions = useMemo(() => normalizeOptions(options, labels), [options, labels]);

    const renderOption = (opt, isTrigger) => {
        const countryCode = String(opt.code);

        if (!Icon) {
            return isTrigger ? (
                <span className='text-sm font-medium'>+{opt.dialCode}</span>
            ) : (
                <span className='flex-1 truncate'>
                    {opt.name} <span className='text-gray-400'>+{opt.dialCode}</span>
                </span>
            );
        }

        if (isTrigger) {
            return <Icon country={countryCode} countryName={opt.name} label={opt.name} />;
        }

        return (
            <>
                <Icon country={countryCode} countryName={opt.name} label={opt.name} />
                <span className='flex-1 truncate'>
                    {opt.name} <span className='text-gray-400'>+{opt.dialCode}</span>
                </span>
            </>
        );
    };

    return (
        <SearchableCombobox
            variant='compact'
            options={phoneOptions}
            valueKey={value || ''}
            onChange={(opt) => onChange(opt?.code)}
            getOptionKey={(opt) => opt.code}
            getOptionLabel={(opt) => opt.name}
            getOptionSearchText={(opt) => `${opt.name} ${opt.code} +${opt.dialCode} ${opt.dialCode}`}
            placeholder='Search country or code'
            disabled={disabled || readOnly}
            className={className}
            renderOption={renderOption}
            aria-label='Phone number country'
            emptyMessage='No country found'
        />
    );
}
