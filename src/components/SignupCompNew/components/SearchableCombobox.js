import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

/**
 * Searchable dropdown combobox
 */
export default function SearchableCombobox({
    options = [],
    valueKey = '',
    onChange,
    getOptionKey,
    getOptionLabel,
    getOptionSearchText,
    placeholder = 'Search...',
    disabled = false,
    className = '',
    renderOption,
    emptyMessage = 'No results found',
    'aria-label': ariaLabel,
    variant = 'default',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [highlightIndex, setHighlightIndex] = useState(0);
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    const selectedOption = useMemo(
        () => options.find((opt) => String(getOptionKey(opt)) === String(valueKey)),
        [options, valueKey, getOptionKey]
    );

    const filteredOptions = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options;
        return options.filter((opt) => {
            const raw = getOptionSearchText?.(opt) ?? getOptionLabel(opt);
            const text = String(raw ?? '').toLowerCase();
            return text.includes(q);
        });
    }, [options, query, getOptionLabel, getOptionSearchText]);

    const close = useCallback(() => {
        setIsOpen(false);
        setQuery('');
        setHighlightIndex(0);
    }, []);

    const open = useCallback(() => {
        if (disabled) return;
        setIsOpen(true);
        setQuery('');
        setHighlightIndex(0);
        setTimeout(() => inputRef.current?.focus(), 0);
    }, [disabled]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                close();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [close]);

    useEffect(() => {
        if (highlightIndex >= filteredOptions.length) {
            setHighlightIndex(Math.max(0, filteredOptions.length - 1));
        }
    }, [filteredOptions.length, highlightIndex]);

    const selectOption = (opt) => {
        onChange?.(opt);
        close();
    };

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                open();
            }
            return;
        }

        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                close();
                break;
            case 'ArrowDown':
                e.preventDefault();
                setHighlightIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightIndex((i) => Math.max(i - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredOptions[highlightIndex]) {
                    selectOption(filteredOptions[highlightIndex]);
                }
                break;
            default:
                break;
        }
    };

    const isCompact = variant === 'compact';

    return (
        <div
            ref={containerRef}
            className={`relative ${isCompact ? 'shrink-0' : 'w-full max-w-[420px]'} ${className}`}
            onKeyDown={handleKeyDown}
        >
            {isCompact ? (
                <button
                    type='button'
                    className='flex items-center gap-1 px-1 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => (isOpen ? close() : open())}
                    disabled={disabled}
                    aria-label={ariaLabel || 'Select country code'}
                    aria-expanded={isOpen}
                    aria-haspopup='listbox'
                >
                    {selectedOption && renderOption ? (
                        renderOption(selectedOption, true)
                    ) : (
                        <span className='text-sm text-gray-500'>—</span>
                    )}
                    <MdKeyboardArrowDown
                        className={`text-gray-500 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            ) : (
                <input
                    ref={inputRef}
                    type='text'
                    className='input input-bordered text-base p-3 h-fit w-full outline-none focus-within:outline-none pr-10'
                    placeholder={placeholder}
                    value={isOpen ? query : selectedOption ? getOptionLabel(selectedOption) : ''}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (!isOpen) setIsOpen(true);
                    }}
                    onFocus={open}
                    disabled={disabled}
                    aria-label={ariaLabel}
                    aria-expanded={isOpen}
                    aria-autocomplete='list'
                    aria-controls='searchable-combobox-list'
                />
            )}

            {!isCompact && (
                <MdKeyboardArrowDown
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            )}

            {isOpen && (
                <div
                    className={`absolute z-[1000] mt-1 bg-white border border-gray-300 rounded shadow-lg flex flex-col ${
                        isCompact ? 'left-0 w-[min(320px,calc(100vw-2rem))]' : 'left-0 right-0 w-full'
                    }`}
                >
                    {isCompact && (
                        <div className='p-2 border-b border-gray-200'>
                            <input
                                ref={inputRef}
                                type='text'
                                className='input input-bordered input-sm w-full text-sm'
                                placeholder={placeholder}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label='Search country'
                                autoComplete='off'
                            />
                        </div>
                    )}
                    <ul
                        id='searchable-combobox-list'
                        ref={listRef}
                        role='listbox'
                        className='max-h-52 overflow-y-auto py-1'
                    >
                        {filteredOptions.length === 0 ? (
                            <li className='px-3 py-2 text-sm text-gray-500'>{emptyMessage}</li>
                        ) : (
                            filteredOptions.map((opt, index) => {
                                const key = getOptionKey(opt);
                                const isSelected = String(key) === String(valueKey);
                                const isHighlighted = index === highlightIndex;
                                return (
                                    <li
                                        key={key}
                                        role='option'
                                        aria-selected={isSelected}
                                        className={`px-3 py-2 text-sm cursor-pointer flex items-center gap-2 ${
                                            isHighlighted ? 'bg-accent/10' : ''
                                        } ${isSelected ? 'font-medium' : 'hover:bg-gray-50'}`}
                                        onMouseEnter={() => setHighlightIndex(index)}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            selectOption(opt);
                                        }}
                                    >
                                        {renderOption ? renderOption(opt, false) : getOptionLabel(opt)}
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
