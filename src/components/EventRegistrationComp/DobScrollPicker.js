import { useEffect, useRef, useState } from 'react';
import { MdCalendarToday, MdCheck } from 'react-icons/md';

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 85 }, (_, i) => String(CURRENT_YEAR - 10 - i));

const ROW_HEIGHT = 30;
const VISIBLE_COUNT = 3;

function SimpleWheel({ items, selectedValue, onSelect }) {
    const scrollRef = useRef(null);
    const isScrollingRef = useRef(false);
    const scrollTimer = useRef(null);

    const scrollToSelected = (val, smooth = true) => {
        if (!scrollRef.current) return;
        const index = items.indexOf(val);
        if (index !== -1) {
            scrollRef.current.scrollTo({
                top: index * ROW_HEIGHT,
                behavior: smooth ? 'smooth' : 'auto',
            });
        }
    };

    useEffect(() => {
        if (selectedValue) {
            scrollToSelected(selectedValue, true);
        }
    }, [selectedValue]);

    const handleScroll = (e) => {
        isScrollingRef.current = true;
        clearTimeout(scrollTimer.current);
        const top = e.target.scrollTop;
        const index = Math.round(top / ROW_HEIGHT);
        const clamped = Math.max(0, Math.min(index, items.length - 1));
        const val = items[clamped];

        scrollTimer.current = setTimeout(() => {
            isScrollingRef.current = false;
            if (val && val !== selectedValue) {
                onSelect(val);
            }
        }, 60);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 1 : -1;
        const currentIndex = items.indexOf(selectedValue);
        const nextIndex = Math.max(0, Math.min(currentIndex + delta, items.length - 1));
        const val = items[nextIndex];
        if (val) {
            onSelect(val);
            scrollToSelected(val, true);
        }
    };

    return (
        <div
            className='relative w-full overflow-hidden select-none'
            style={{ height: `${ROW_HEIGHT * VISIBLE_COUNT}px` }}
            onWheel={handleWheel}
        >
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className='h-full snap-y snap-mandatory overflow-y-auto overscroll-contain'
                style={{
                    paddingTop: `${ROW_HEIGHT}px`,
                    paddingBottom: `${ROW_HEIGHT}px`,
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {items.map((item, idx) => {
                    const isSelected = item === selectedValue;
                    return (
                        <div
                            key={idx}
                            onClick={() => {
                                onSelect(item);
                                scrollToSelected(item, true);
                            }}
                            style={{ height: `${ROW_HEIGHT}px` }}
                            className={`flex snap-center cursor-pointer items-center justify-center text-xs font-normal transition-all duration-100 ${
                                isSelected ? 'text-accent' : 'text-slate-400 hover:text-slate-600 opacity-40'
                            }`}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function DobScrollPicker({ field, value, onChange, disabled, readOnly }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const parts = (value || '').split('/');
    const [day, setDay] = useState(parts[0] || '15');
    const [month, setMonth] = useState(parts[1] || '06');
    const [year, setYear] = useState(parts[2] || '1998');

    useEffect(() => {
        if (value) {
            const segments = value.split('/');
            if (segments[0] && segments[0].length === 2 && DAYS.includes(segments[0])) {
                setDay(segments[0]);
            }
            if (segments[1] && segments[1].length === 2 && MONTHS.includes(segments[1])) {
                setMonth(segments[1]);
            }
            if (segments[2] && segments[2].length === 4 && YEARS.includes(segments[2])) {
                setYear(segments[2]);
            }
        }
    }, [value]);

    const handleInputChange = (e) => {
        let inputVal = e.target.value;

        inputVal = inputVal.replace(/[^0-9/]/g, '').slice(0, 10);

        const prevVal = value || '';
        if (inputVal.length > prevVal.length) {
            if (/^\d{2}$/.test(inputVal)) {
                inputVal = `${inputVal}/`;
            } else if (/^\d{2}\/\d{2}$/.test(inputVal)) {
                inputVal = `${inputVal}/`;
            }
        }

        const segments = inputVal.split('/');
        if (segments[0] && segments[0].length === 2 && DAYS.includes(segments[0])) {
            setDay(segments[0]);
        }
        if (segments[1] && segments[1].length === 2 && MONTHS.includes(segments[1])) {
            setMonth(segments[1]);
        }
        if (segments[2] && segments[2].length === 4 && YEARS.includes(segments[2])) {
            setYear(segments[2]);
        }

        onChange({
            target: {
                name: field?.name,
                value: inputVal,
            },
        });
    };

    const updateDateFromWheel = (newDay, newMonth, newYear) => {
        const formatted = `${newDay}/${newMonth}/${newYear}`;
        onChange({
            target: {
                name: field?.name,
                value: formatted,
            },
        });
    };

    const handleDayChange = (d) => {
        setDay(d);
        updateDateFromWheel(d, month, year);
    };

    const handleMonthChange = (m) => {
        setMonth(m);
        updateDateFromWheel(day, m, year);
    };

    const handleYearChange = (y) => {
        setYear(y);
        updateDateFromWheel(day, month, y);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={containerRef} className='relative flex flex-col gap-1.5'>
            <label className='text-xs font-bold text-slate-700' htmlFor={field?.name}>
                {field?.label}
            </label>

            <div className='relative flex items-center'>
                <input
                    ref={inputRef}
                    id={field?.name}
                    name={field?.name}
                    type='text'
                    inputMode='numeric'
                    maxLength={10}
                    placeholder={field?.placeholder || 'DD/MM/YYYY'}
                    value={value || ''}
                    onChange={handleInputChange}
                    onClick={() => !disabled && !readOnly && setIsOpen(true)}
                    onFocus={() => !disabled && !readOnly && setIsOpen(true)}
                    disabled={disabled}
                    readOnly={readOnly}
                    required
                    className={`input input-bordered w-full bg-white pr-10 text-sm font-medium transition-all ${
                        isOpen ? 'border-accent ring-2 ring-accent/15' : ''
                    }`}
                />
                <button
                    type='button'
                    disabled={disabled || readOnly}
                    onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
                    title='Toggle date picker'
                    className={`absolute right-2.5 flex h-6 w-6 items-center justify-center rounded transition-colors ${
                        disabled || readOnly
                            ? 'cursor-not-allowed text-slate-300'
                            : 'cursor-pointer text-slate-400 hover:text-accent'
                    } ${isOpen ? 'text-accent' : ''}`}
                >
                    <MdCalendarToday size={16} aria-hidden='true' />
                </button>
            </div>

            {isOpen && !readOnly && !disabled && (
                <div className='absolute left-0 top-[calc(100%+4px)] z-50 w-56 rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-xl animate-in fade-in zoom-in-95 duration-100'>
                    <div className='grid grid-cols-3 text-center text-[10px] font-medium tracking-wider text-slate-400 pb-1'>
                        <span>DAY</span>
                        <span>MONTH</span>
                        <span>YEAR</span>
                    </div>

                    <div className='relative rounded-lg bg-slate-50/80 p-1'>
                        <div
                            className='pointer-events-none absolute inset-x-1.5 rounded-md bg-white shadow-sm border border-slate-200/60 z-0'
                            style={{
                                top: `${ROW_HEIGHT + 4}px`,
                                height: `${ROW_HEIGHT}px`,
                            }}
                        />

                        <div className='pointer-events-none absolute inset-x-0 top-0 h-6 rounded-t-lg bg-gradient-to-b from-slate-50/90 to-transparent z-10' />
                        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-6 rounded-b-lg bg-gradient-to-t from-slate-50/90 to-transparent z-10' />

                        <div className='relative z-20 grid grid-cols-3 gap-1 items-center'>
                            <SimpleWheel items={DAYS} selectedValue={day} onSelect={handleDayChange} />
                            <SimpleWheel items={MONTHS} selectedValue={month} onSelect={handleMonthChange} />
                            <SimpleWheel items={YEARS} selectedValue={year} onSelect={handleYearChange} />
                        </div>
                    </div>

                    <div className='mt-2 flex items-center justify-between px-1 pt-1 border-t border-slate-100'>
                        <span className='text-xs font-normal text-slate-600'>{value || `${day}/${month}/${year}`}</span>
                        <button
                            type='button'
                            onClick={() => {
                                if (!value) updateDateFromWheel(day, month, year);
                                setIsOpen(false);
                            }}
                            className='btn btn-accent btn-xs rounded-md px-3 text-white font-normal shadow-none'
                        >
                            <MdCheck size={13} />
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
