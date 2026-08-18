import React from 'react';
import { FaComments, FaUsers, FaRobot, FaGlobe, FaChevronDown, FaCheck } from 'react-icons/fa';
import { INPUT_MIN, INPUT_MAX, CURRENCY_ORDER, COMPETITORS, HELLO_PLANS, ALL_COMPETITORS } from './constants';
import { resolveApiPlan } from './helpers';

function NumberInput({ id, label, icon: Icon, iconColor, min, max, step = '1', value, onChange, placeholder }) {
    return (
        <div className='cont gap-3'>
            <label htmlFor={id} className='flex items-center gap-2 text-sm font-semibold'>
                <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden />
                {label}
            </label>
            <input
                type='number'
                id={id}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') return onChange('');
                    const number = Number(val);
                    if (!Number.isNaN(number)) {
                        onChange(Math.min(max, Math.max(min, Math.floor(number))));
                    }
                }}
                onKeyDown={(e) => {
                    if (/^[.\-eE]$/.test(e.key)) e.preventDefault();
                }}
                className='w-full py-2.5 px-4 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-normal'
                placeholder={placeholder}
            />
        </div>
    );
}

function selectCompetitor(setCompetitorKey, key) {
    setCompetitorKey(key);
    document.activeElement?.blur();
}

function CompetitorDropdown({ id, competitorKey, setCompetitorKey, labels }) {
    const selectedName = ALL_COMPETITORS[competitorKey]?.name;

    return (
        <div className='dropdown w-full'>
            <div
                id={id}
                tabIndex={0}
                role='button'
                className='flex w-full justify-between py-2.5 px-4 rounded-xl border border-gray-300 bg-white text-base font-normal text-gray-900'
            >
                <span>{selectedName}</span>
                <FaChevronDown className='h-3 w-3 text-gray-400' aria-hidden />
            </div>

            <div
                tabIndex={0}
                className='dropdown-content z-20 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg'
            >
                <ul role='listbox'>
                    <li className='px-4 pt-2 pb-1 text-xs font-bold uppercase text-gray-400'>
                        {labels?.globalProviders}
                    </li>
                    {COMPETITORS.global?.map((competitor) => (
                        <li
                            key={competitor.key}
                            role='option'
                            aria-selected={competitorKey === competitor.key}
                            onClick={() => selectCompetitor(setCompetitorKey, competitor.key)}
                            className='flex justify-between px-4 py-2 text-sm text-gray-900 hover:bg-indigo-50'
                        >
                            {competitor.name}
                            {competitorKey === competitor.key && (
                                <FaCheck className='h-3 w-3 text-indigo-600' aria-hidden />
                            )}
                        </li>
                    ))}
                    <li className='px-4 pt-2 pb-1 text-xs font-bold uppercase text-gray-400'>
                        {labels?.brazilProviders}
                    </li>
                    {COMPETITORS.brazil?.map((competitor) => (
                        <li
                            key={competitor.key}
                            role='option'
                            aria-selected={competitorKey === competitor.key}
                            onClick={() => selectCompetitor(setCompetitorKey, competitor.key)}
                            className='flex justify-between px-4 py-2 text-sm text-gray-900 hover:bg-indigo-50'
                        >
                            {competitor.name}
                            {competitorKey === competitor.key && (
                                <FaCheck className='h-3 w-3 text-indigo-600' aria-hidden />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function CostComparisonInputs({
    data,
    tickets,
    setTickets,
    agents,
    setAgents,
    aiRate,
    setAiRate,
    competitorKey,
    setCompetitorKey,
    competitorPlanName,
    setCompetitorPlanName,
    currency,
    setCurrency,
    planKey,
    setPlanKey,
    apiPlans,
}) {
    if (!data) return null;

    const selectedCompetitor = ALL_COMPETITORS[competitorKey];

    return (
        <div className='cont gap-7 rounded-xl border border-gray-200 bg-white p-8 shadow-sm lg:col-span-5'>
            <h2 className='subheading font-semibold'>{data?.heading}</h2>

            <NumberInput
                id='tickets'
                label={data?.labels?.tickets}
                icon={FaComments}
                iconColor='text-[var(--accent-color)]'
                min={INPUT_MIN}
                max={INPUT_MAX}
                value={tickets}
                onChange={setTickets}
                placeholder={data?.labels?.ticketsPlaceholder}
            />

            <NumberInput
                id='agents'
                label={data?.labels?.agents}
                icon={FaUsers}
                iconColor='text-[var(--hello-color)]'
                min={1}
                max={INPUT_MAX}
                value={agents}
                onChange={setAgents}
                placeholder={data?.labels?.agentsPlaceholder}
            />

            <NumberInput
                id='aiRate'
                label={data?.labels?.aiRate}
                icon={FaRobot}
                iconColor='text-indigo-600'
                min={0}
                max={100}
                step='5'
                value={aiRate}
                onChange={setAiRate}
                placeholder={data?.labels?.aiRatePlaceholder}
            />

            <div className='cont gap-3 border-t border-gray-100 py-5'>
                <label htmlFor='competitor' className='flex items-center gap-2 text-sm font-semibold'>
                    <FaGlobe className='h-4 w-4 text-indigo-600' aria-hidden />
                    {data?.labels?.competitor}
                </label>
                <CompetitorDropdown
                    id='competitor'
                    competitorKey={competitorKey}
                    setCompetitorKey={setCompetitorKey}
                    labels={data?.labels}
                />
                {selectedCompetitor?.plans?.length > 0 && (
                    <div className='cont gap-2 pt-2'>
                        <span className='text-xs font-bold uppercase text-gray-500'>
                            {data?.labels?.competitorPlan || `${selectedCompetitor?.name} Plan`}
                        </span>
                        <div
                            className={`grid gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1 ${
                                selectedCompetitor.plans.length === 2
                                    ? 'grid-cols-2'
                                    : selectedCompetitor.plans.length === 3
                                      ? 'grid-cols-3'
                                      : 'grid-cols-2 sm:grid-cols-4'
                            }`}
                        >
                            {selectedCompetitor.plans.map((planItem) => (
                                <button
                                    key={planItem.name}
                                    type='button'
                                    aria-pressed={competitorPlanName === planItem.name}
                                    onClick={() => setCompetitorPlanName(planItem.name)}
                                    className={`rounded-xl py-1.5 px-2 text-center text-xs font-bold transition-all ${
                                        competitorPlanName === planItem.name
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'text-gray-700 hover:text-gray-900'
                                    }`}
                                >
                                    {planItem.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className='cont gap-2 border-t border-gray-100 py-5'>
                <span className='text-xs font-bold uppercase'>{data?.labels?.currency}</span>
                <div className='grid grid-cols-5 gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1'>
                    {CURRENCY_ORDER.map((currency_option) => (
                        <button
                            key={currency_option}
                            type='button'
                            aria-pressed={currency === currency_option}
                            onClick={() => setCurrency(currency_option)}
                            className={`rounded-xl py-1.5 text-xs font-bold ${
                                currency === currency_option
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'hover:text-gray-900'
                            }`}
                        >
                            {currency_option}
                        </button>
                    ))}
                </div>
            </div>

            <div className='cont gap-2 border-t border-gray-100 py-5'>
                <span className='text-xs font-bold uppercase'>{data?.labels?.helloPlan}</span>
                <div className='grid grid-cols-2 gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1'>
                    {Object.entries(HELLO_PLANS).map(([key, plan]) => {
                        const apiPlanMatch = resolveApiPlan(plan, apiPlans);
                        const displayName = apiPlanMatch?.name || plan.name;
                        return (
                            <button
                                key={key}
                                type='button'
                                aria-pressed={planKey === key}
                                onClick={() => setPlanKey(key)}
                                className={`rounded-xl py-1.5 text-xs font-bold ${
                                    planKey === key ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-gray-900'
                                }`}
                            >
                                {displayName}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
