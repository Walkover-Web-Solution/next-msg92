import { MdCheckCircle } from 'react-icons/md';

/**
 * Phone Input Component with Country Code
 * @param {Object} selectedCountry - Selected country object
 * @param {string} value - Phone number value
 * @param {Function} onChange - Change handler
 * @param {Function} onBlur - Blur handler
 * @param {boolean} verified - Whether phone is verified
 * @param {boolean} disabled - Disable input
 * @param {string} placeholder - Input placeholder
 */
export default function PhoneInput({
    selectedCountry,
    value = '',
    onChange,
    onBlur,
    verified = false,
    disabled = false,
    placeholder = '9876543210',
}) {
    const handleChange = (e) => {
        const numericValue = e.target.value.replace(/\D/g, '');
        onChange(numericValue);
    };

    return (
        <div className='w-full min-w-[320px] max-w-[420px] relative flex'>
            <div className='flex items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3'>
                <span className='text-sm font-medium'>+{selectedCountry?.countryCode || '91'}</span>
            </div>
            <input
                className={`input input-bordered text-base p-3 h-fit w-full outline-none focus-within:outline-none rounded-l-none border-l-0 ${
                    verified || disabled ? 'pointer-events-none' : ''
                }`}
                name='phone'
                type='tel'
                required
                placeholder={placeholder}
                value={value || ''}
                onChange={handleChange}
                onBlur={onBlur}
                disabled={disabled}
                aria-label='Phone number'
            />
            {verified && (
                <MdCheckCircle
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 text-xl z-10'
                    aria-label='Phone verified'
                />
            )}
        </div>
    );
}
