/**
 * Reusable Form Input Component
 * @param {string} label - Input label
 * @param {string} type - Input type
 * @param {string} name - Input name
 * @param {string} value - Input value
 * @param {Function} onChange - Change handler
 * @param {Function} onBlur - Blur handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {number} maxLength - Max length
 * @param {string} className - Additional classes
 */
export default function FormInput({
    label,
    type = 'text',
    name,
    value = '',
    onChange,
    onBlur,
    placeholder,
    required = false,
    maxLength = 244,
    className = '',
}) {
    return (
        <div className='cont gap-1'>
            {label && <p className='text-gray-500'>{label}</p>}
            <input
                maxLength={maxLength}
                className={`input input-bordered text-base p-3 h-fit w-full min-w-[320px] max-w-[420px] outline-none focus-within:outline-none ${className}`}
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                aria-label={label || name}
            />
        </div>
    );
}
