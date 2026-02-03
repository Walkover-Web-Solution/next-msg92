export default function PlanToggle({ tabtype, setTabtype, hasYearly }) {
    if (!hasYearly) return null;

    return (
        <div className='inline-flex w-fit rounded bg-white p-1'>
            <button
                type='button'
                onClick={() => setTabtype('Monthly')}
                className={`px-4 py-2 text-sm font-medium rounded transition
            ${tabtype === 'Monthly' ? ' bg-secondary' : ''}`}
            >
                Monthly
            </button>
            <button
                type='button'
                onClick={() => setTabtype('Yearly')}
                className={`px-4 py-2 text-sm font-medium rounded transition
            ${tabtype === 'Yearly' ? 'bg-secondary' : ''}`}
            >
                Yearly <span className='text-xs font-semibold'>(20% off)</span>
            </button>
        </div>
    );
}
