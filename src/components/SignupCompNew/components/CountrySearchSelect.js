import { useMemo } from 'react';
import SearchableCombobox from './SearchableCombobox';

/**
 * Searchable country picker for MSG91 API countries
 */
export default function CountrySearchSelect({
    countries = [],
    value,
    onChange,
    disabled = false,
    placeholder = 'Search country...',
}) {
    const valueKey = value?.id ?? '';

    const options = useMemo(() => countries.filter(Boolean), [countries]);

    return (
        <SearchableCombobox
            options={options}
            valueKey={valueKey}
            onChange={onChange}
            getOptionKey={(c) => c.id}
            getOptionLabel={(c) => c.name}
            getOptionSearchText={(c) => `${c.name} ${c.shortName || ''}`}
            placeholder={placeholder}
            disabled={disabled}
            aria-label='Country'
            emptyMessage='No country found'
        />
    );
}
