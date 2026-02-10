const PLAN_TYPES = {
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly',
};

const YEARLY_DISCOUNT = '20% off';

export default function PlanToggle({ tabtype, setTabtype, hasYearly }) {
    if (!hasYearly) return null;

    const isMonthly = tabtype === PLAN_TYPES.MONTHLY;
    const isYearly = tabtype === PLAN_TYPES.YEARLY;

    const getButtonClassName = (isActive) => {
        const baseClasses = 'px-4 py-2 text-sm font-medium rounded transition';
        const activeClass = isActive ? 'bg-secondary' : '';
        return `${baseClasses} ${activeClass}`;
    };

    return (
        <div className='inline-flex w-fit rounded bg-white p-1'>
            <button
                type='button'
                onClick={() => setTabtype(PLAN_TYPES.MONTHLY)}
                className={getButtonClassName(isMonthly)}
                aria-pressed={isMonthly}
            >
                {PLAN_TYPES.MONTHLY}
            </button>
            <button
                type='button'
                onClick={() => setTabtype(PLAN_TYPES.YEARLY)}
                className={getButtonClassName(isYearly)}
                aria-pressed={isYearly}
            >
                {PLAN_TYPES.YEARLY} <span className='text-xs font-semibold'>({YEARLY_DISCOUNT})</span>
            </button>
        </div>
    );
}
