export default function PlanToggle({ tabtype, setTabtype, hasYearly }) {
    if (!hasYearly) return null;

    return (
        <div className='inline-flex w-fit rounded-lg bg-gray-200 p-1'>
            <button
                type='button'
                onClick={() => setTabtype('Monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition
            ${tabtype === 'Monthly' ? 'bg-accent text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
                Monthly
            </button>
            <button
                type='button'
                onClick={() => setTabtype('Yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition
            ${tabtype === 'Yearly' ? 'bg-accent text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
                Yearly <span className='text-xs font-semibold'>(20% off)</span>
            </button>
        </div>
    );
}
