import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout, { Badge, Card, ErrorNote, adminFetch, formatDate, useAction } from '@/components/Admin/AdminLayout';
import { withAdminPage, can } from '@/lib/admin/auth';

const pct = (v) => (v === null || v === undefined || Number.isNaN(v) ? '—' : `${(v * 100).toFixed(2)}%`);

function Field({ label, id, children, hint }) {
    return (
        <div>
            <label htmlFor={id} className='mb-1 block text-sm font-medium'>
                {label}
            </label>
            {children}
            {hint && <p className='mt-1 text-xs text-gray-500'>{hint}</p>}
        </div>
    );
}

function ResultsTable({ metric, evaluation, metrics }) {
    const baseline = evaluation.arms.find((a) => a.baseline);
    return (
        <div className='mb-4'>
            <h3 className='mb-1 font-medium'>{metrics[metric]?.label || metric}</h3>
            <div className='overflow-x-auto'>
                <table className='w-full text-left text-sm'>
                    <thead className='text-gray-500'>
                        <tr>
                            <th className='py-1 pr-3 font-medium'>Arm</th>
                            <th className='py-1 pr-3 font-medium'>Visitors</th>
                            <th className='py-1 pr-3 font-medium'>Conversions</th>
                            <th className='py-1 pr-3 font-medium'>Rate</th>
                            <th className='py-1 pr-3 font-medium'>Lift vs A</th>
                            <th className='py-1 pr-3 font-medium'>CI of difference</th>
                            <th className='py-1 font-medium'>Verdict</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {evaluation.arms.map((arm) => {
                            const comparison = evaluation.comparisons.find((c) => c.key === arm.key);
                            return (
                                <tr key={arm.key}>
                                    <td className='py-1 pr-3'>
                                        {arm.key}
                                        {arm.baseline ? ' (baseline)' : ''}
                                    </td>
                                    <td className='py-1 pr-3'>{arm.n}</td>
                                    <td className='py-1 pr-3'>{arm.x}</td>
                                    <td className='py-1 pr-3'>{arm.n ? pct(arm.x / arm.n) : '—'}</td>
                                    <td className='py-1 pr-3'>
                                        {comparison?.test ? pct(comparison.test.relativeLift) : '—'}
                                    </td>
                                    <td className='py-1 pr-3'>
                                        {comparison?.test
                                            ? `${pct(comparison.test.ci[0])} … ${pct(comparison.test.ci[1])}`
                                            : '—'}
                                    </td>
                                    <td className='py-1'>
                                        {comparison ? (
                                            <span title={comparison.explanation}>
                                                <Badge status={comparison.verdict} />
                                            </span>
                                        ) : arm.baseline ? (
                                            '—'
                                        ) : null}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <p className='mt-1 text-xs text-gray-600'>
                Planned sample:{' '}
                {evaluation.plannedPerArm
                    ? `${evaluation.plannedPerArm} per arm`
                    : 'not planned (enter a baseline rate)'}{' '}
                · adjusted alpha {evaluation.adjustedAlpha.toFixed(4)} ·{' '}
                {evaluation.srm.checked
                    ? `allocation check p=${evaluation.srm.pValue.toFixed(4)}${evaluation.srm.mismatch ? ' — MISMATCH' : ''}`
                    : 'allocation check needs 100+ visitors'}
                {baseline && baseline.n === 0 && ' · no customer data yet'}
            </p>
            {evaluation.comparisons.map((c) => (
                <p key={c.key} className='text-xs text-gray-600'>
                    Arm {c.key}: {c.explanation}
                </p>
            ))}
        </div>
    );
}

export default function ExperimentPage({
    adminState,
    session,
    exp,
    checklist,
    resultsByVersion,
    metrics,
    perms,
    policy,
}) {
    const router = useRouter();
    const action = useAction();
    const reload = () => router.replace(router.asPath);
    const [plan, setPlan] = useState(() =>
        exp
            ? {
                  hypothesis: exp.hypothesis,
                  audience: exp.audience,
                  exposureDefinition: exp.exposureDefinition,
                  primaryMetric: exp.primaryMetric,
                  guardrails: exp.guardrails,
                  baselineRate: exp.baselineRate ?? '',
                  mdeRelative: exp.mdeRelative,
                  reviewBy: exp.reviewBy || '',
                  maxDays: exp.maxDays,
                  approver: exp.approver,
                  rollbackPlan: exp.rollbackPlan,
                  notes: exp.notes,
              }
            : {}
    );
    const [arms, setArms] = useState(() =>
        exp ? exp.arms.map((a) => ({ ...a, overridesText: JSON.stringify(a.overrides || {}, null, 2) })) : []
    );
    const [challenger, setChallenger] = useState({ name: '', description: '', overridesText: '{}' });
    const [version, setVersion] = useState(exp?.version);
    const [brief, setBrief] = useState(null);
    const [validation, setValidation] = useState(null);
    const [note, setNote] = useState('');

    if (adminState !== 'ok') return <AdminLayout title='Experiment' session={session} adminState={adminState} />;
    const editable = perms.edit && ['draft', 'paused'].includes(exp.status);

    const patch = async (body) => {
        try {
            return await adminFetch(`/api/admin/experiments/${exp.id}`, { method: 'PATCH', body });
        } catch (error) {
            if (
                error.code === 'needs_new_version' &&
                window.confirm(`${error.message}\n\nStart version ${exp.version + 1}?`)
            ) {
                return adminFetch(`/api/admin/experiments/${exp.id}`, {
                    method: 'PATCH',
                    body: { ...body, newVersion: true, versionReason: note || undefined },
                });
            }
            throw error;
        }
    };
    const savePlan = () =>
        action.run(
            () =>
                patch({
                    ...plan,
                    baselineRate: plan.baselineRate === '' ? null : Number(plan.baselineRate),
                    mdeRelative: Number(plan.mdeRelative),
                    maxDays: Number(plan.maxDays),
                }),
            reload
        );
    const saveArms = () =>
        action.run(() => {
            const parsed = arms.map((a, i) => {
                let overrides = {};
                if (i > 0) {
                    try {
                        overrides = JSON.parse(a.overridesText || '{}');
                    } catch {
                        throw new Error(`Arm ${a.key}: treatment is not valid JSON.`);
                    }
                }
                return { name: a.name, weight: Number(a.weight), description: a.description, overrides };
            });
            return patch({ arms: parsed });
        }, reload);
    const lifecycle = (name, extra = {}) =>
        action.run(
            () => adminFetch(`/api/admin/experiments/${exp.id}`, { body: { action: name, note, ...extra } }),
            reload
        );
    const addChallenger = () =>
        action.run(() => {
            let overrides;
            try {
                overrides = JSON.parse(challenger.overridesText || '{}');
            } catch {
                throw new Error('Challenger treatment is not valid JSON.');
            }
            return adminFetch(`/api/admin/experiments/${exp.id}`, {
                body: {
                    action: 'challenger',
                    challenger: { name: challenger.name, description: challenger.description, overrides },
                },
            });
        }, reload);
    const validate = () =>
        action.run(
            () => adminFetch(`/api/admin/experiments/${exp.id}`, { body: { action: 'validate-tracking' } }),
            (result) => {
                setValidation(result);
                reload();
            }
        );
    const loadBrief = (arm) =>
        action.run(
            () => adminFetch(`/api/admin/experiments/${exp.id}?brief=${arm}`, { method: 'GET' }),
            (r) => setBrief(r.brief)
        );
    const results = resultsByVersion[version];
    const set = (key) => (e) => setPlan({ ...plan, [key]: e.target.value });

    return (
        <AdminLayout title={exp.name} session={session} adminState={adminState}>
            <div className='mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-700'>
                <Badge status={exp.status} /> <span>v{exp.version}</span> · <code>{exp.surface}</code> ·{' '}
                <code className='text-xs'>{exp.dataFile}</code>
                {exp.synthetic && <Badge tone='warn'>synthetic fixture — cannot launch</Badge>}
            </div>
            <ErrorNote error={action.error} />

            <div className='grid gap-4 lg:grid-cols-3'>
                <Card title='Controls' className='lg:col-span-3'>
                    <div className='mb-3'>
                        <label htmlFor='note' className='mb-1 block text-sm font-medium'>
                            Decision note (recorded with the action)
                        </label>
                        <input
                            id='note'
                            className='input input-bordered input-sm w-full'
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {perms.edit && ['draft', 'paused'].includes(exp.status) && (
                            <button
                                type='button'
                                className='btn btn-outline btn-sm'
                                disabled={action.busy}
                                onClick={validate}
                            >
                                Validate tracking
                            </button>
                        )}
                        {perms.launch && ['draft', 'paused'].includes(exp.status) && (
                            <button
                                type='button'
                                className='btn btn-primary btn-sm'
                                disabled={action.busy || !policy.allowLaunch}
                                onClick={() => lifecycle(exp.status === 'draft' ? 'launch' : 'resume')}
                                title={policy.allowLaunch ? '' : 'Launching is off in Settings'}
                            >
                                {exp.status === 'draft' ? 'Launch' : 'Resume'}
                            </button>
                        )}
                        {perms.edit && exp.status === 'running' && (
                            <button
                                type='button'
                                className='btn btn-outline btn-sm'
                                disabled={action.busy}
                                onClick={() => lifecycle('pause')}
                            >
                                Pause (everyone gets baseline)
                            </button>
                        )}
                        {perms.decide && ['running', 'paused'].includes(exp.status) && (
                            <>
                                <button
                                    type='button'
                                    className='btn btn-outline btn-sm'
                                    disabled={action.busy}
                                    onClick={() => lifecycle('stop')}
                                >
                                    Stop & keep baseline
                                </button>
                                {exp.arms
                                    .filter((a) => !a.baseline)
                                    .map((a) => (
                                        <button
                                            key={a.key}
                                            type='button'
                                            className='btn btn-outline btn-sm'
                                            disabled={action.busy}
                                            onClick={() =>
                                                window.confirm(
                                                    `Promote arm ${a.key}? All traffic goes to it and a page JSON change is proposed.`
                                                ) && lifecycle('promote', { arm: a.key })
                                            }
                                        >
                                            Promote {a.key}
                                        </button>
                                    ))}
                            </>
                        )}
                        {perms.edit && exp.status === 'rolling_out' && (
                            <button
                                type='button'
                                className='btn btn-outline btn-sm'
                                disabled={action.busy}
                                onClick={() => lifecycle('rollback')}
                            >
                                Roll back to baseline
                            </button>
                        )}
                        {perms.decide && ['completed', 'rolling_out', 'draft', 'paused'].includes(exp.status) && (
                            <button
                                type='button'
                                className='btn btn-ghost btn-sm'
                                disabled={action.busy}
                                onClick={() =>
                                    window.confirm('Retire this experiment? Routing stops; history is kept.') &&
                                    lifecycle('retire')
                                }
                            >
                                Retire
                            </button>
                        )}
                    </div>
                    {!policy.allowLaunch && (
                        <p className='mt-2 text-xs text-gray-500'>
                            Release switch is off: experiments can be prepared, previewed and validated but not
                            launched.
                        </p>
                    )}
                    {exp.promotion && (
                        <p className='mt-2 text-sm'>
                            Promotion: <Badge status={exp.promotion.status} />{' '}
                            {exp.promotion.prUrl && (
                                <a
                                    className='text-accent underline'
                                    href={exp.promotion.prUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    PR #{exp.promotion.prNumber}
                                </a>
                            )}{' '}
                            {exp.promotion.note || exp.promotion.error || ''} — retire after the change is deployed.
                        </p>
                    )}
                    {validation && (
                        <div className='mt-3 text-sm'>
                            <p>
                                Tracking validation:{' '}
                                <Badge status={validation.ok ? 'ok' : 'failed'}>
                                    {validation.ok ? 'passed' : 'failed'}
                                </Badge>{' '}
                                · customer data untouched: {String(validation.customerUnchanged)}
                            </p>
                            <ul className='text-xs text-gray-600'>
                                {validation.steps.map((s) => (
                                    <li key={s.arm}>
                                        Arm {s.arm}: {s.detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Card>

                <Card title='Preview'>
                    <ul className='space-y-1 text-sm'>
                        {exp.arms.map((a) => (
                            <li key={a.key}>
                                <a
                                    className='text-accent underline'
                                    href={`${exp.surface}?exp_preview=${exp.id}:${a.key}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {a.key}: {a.name}
                                </a>{' '}
                                <span className='text-xs text-gray-500'>{a.weight}%</span>
                            </li>
                        ))}
                    </ul>
                    <p className='mt-2 text-xs text-gray-500'>
                        Previews need your admin session, are never tracked and are served with noindex.
                    </p>
                </Card>

                <Card title='Launch checklist' className='lg:col-span-2'>
                    <ul className='grid gap-1 text-sm md:grid-cols-2'>
                        {checklist.map((item) => (
                            <li key={item.label} className='flex gap-2'>
                                <span aria-hidden='true'>{item.ok ? '✓' : '○'}</span>
                                <span className={item.ok ? '' : 'text-amber-800'}>
                                    {item.label}
                                    {item.detail && <span className='block text-xs text-gray-500'>{item.detail}</span>}
                                </span>
                            </li>
                        ))}
                    </ul>
                    {exp.instrumentation && (
                        <p className='mt-2 text-xs text-gray-500'>
                            Tracking last validated {formatDate(exp.instrumentation.validatedAt)} for v
                            {exp.instrumentation.version}: {exp.instrumentation.ok ? 'passed' : 'failed'}.
                        </p>
                    )}
                </Card>

                <Card
                    title={`Results (customer traffic)`}
                    className='lg:col-span-3'
                    actions={
                        exp.versions.length > 1 && (
                            <select
                                aria-label='Version'
                                className='select select-bordered select-xs'
                                value={version}
                                onChange={(e) => setVersion(Number(e.target.value))}
                            >
                                {exp.versions.map((v) => (
                                    <option key={v.version} value={v.version}>
                                        v{v.version}
                                    </option>
                                ))}
                            </select>
                        )
                    }
                >
                    {results ? (
                        <>
                            {Object.entries(results.evaluations).map(([metric, evaluation]) => (
                                <ResultsTable key={metric} metric={metric} evaluation={evaluation} metrics={metrics} />
                            ))}
                            <p className='text-xs text-gray-600'>
                                Excluded from evaluation:{' '}
                                {Object.keys(results.excluded).length
                                    ? Object.entries(results.excluded)
                                          .map(([k, v]) => `${k} ${v}`)
                                          .join(', ')
                                    : 'none'}{' '}
                                · visitors in more than one arm: {results.conflicts} · last event{' '}
                                {formatDate(results.lastEventAt)}
                            </p>
                        </>
                    ) : (
                        <p className='text-sm text-gray-600'>No results for this version.</p>
                    )}
                </Card>

                <Card
                    title='Plan'
                    className='lg:col-span-2'
                    actions={
                        perms.edit && (
                            <button
                                type='button'
                                className='btn btn-outline btn-sm'
                                disabled={action.busy}
                                onClick={savePlan}
                            >
                                Save plan
                            </button>
                        )
                    }
                >
                    <div className='grid gap-3 md:grid-cols-2'>
                        <div className='md:col-span-2'>
                            <Field
                                label='Hypothesis'
                                id='hyp'
                                hint='Because [evidence], changing [what] for [audience] will increase [primary outcome].'
                            >
                                <textarea
                                    id='hyp'
                                    className='textarea textarea-bordered w-full text-sm'
                                    rows={3}
                                    value={plan.hypothesis}
                                    onChange={set('hypothesis')}
                                />
                            </Field>
                        </div>
                        <Field label='Audience' id='aud'>
                            <input
                                id='aud'
                                className='input input-bordered input-sm w-full'
                                value={plan.audience}
                                onChange={set('audience')}
                            />
                        </Field>
                        <Field label='Exposure definition' id='expo'>
                            <input
                                id='expo'
                                className='input input-bordered input-sm w-full'
                                value={plan.exposureDefinition}
                                onChange={set('exposureDefinition')}
                            />
                        </Field>
                        <Field label='Primary outcome' id='pm'>
                            <select
                                id='pm'
                                className='select select-bordered select-sm w-full'
                                value={plan.primaryMetric}
                                onChange={set('primaryMetric')}
                            >
                                {Object.entries(metrics)
                                    .filter(([, m]) => m.primaryEligible)
                                    .map(([key, m]) => (
                                        <option key={key} value={key}>
                                            {m.label}
                                        </option>
                                    ))}
                            </select>
                        </Field>
                        <fieldset>
                            <legend className='mb-1 text-sm font-medium'>Guardrails</legend>
                            {Object.entries(metrics).map(([key, m]) => (
                                <label key={key} className='mr-3 inline-flex items-center gap-1 text-sm'>
                                    <input
                                        type='checkbox'
                                        checked={plan.guardrails?.includes(key)}
                                        onChange={(e) =>
                                            setPlan({
                                                ...plan,
                                                guardrails: e.target.checked
                                                    ? [...plan.guardrails, key]
                                                    : plan.guardrails.filter((g) => g !== key),
                                            })
                                        }
                                    />
                                    {m.label}
                                </label>
                            ))}
                        </fieldset>
                        <Field
                            label='Baseline conversion rate (0–1)'
                            id='br'
                            hint='From historical data; plans the sample size.'
                        >
                            <input
                                id='br'
                                type='number'
                                step='0.001'
                                min='0'
                                max='1'
                                className='input input-bordered input-sm w-full'
                                value={plan.baselineRate}
                                onChange={set('baselineRate')}
                            />
                        </Field>
                        <Field
                            label='Minimum detectable effect (relative)'
                            id='mde'
                            hint='0.2 = detect a 20% relative lift.'
                        >
                            <input
                                id='mde'
                                type='number'
                                step='0.01'
                                min='0.01'
                                className='input input-bordered input-sm w-full'
                                value={plan.mdeRelative}
                                onChange={set('mdeRelative')}
                            />
                        </Field>
                        <Field label='Review by' id='rb'>
                            <input
                                id='rb'
                                type='date'
                                className='input input-bordered input-sm w-full'
                                value={plan.reviewBy}
                                onChange={set('reviewBy')}
                            />
                        </Field>
                        <Field label='Maximum days' id='md'>
                            <input
                                id='md'
                                type='number'
                                min='1'
                                max='90'
                                className='input input-bordered input-sm w-full'
                                value={plan.maxDays}
                                onChange={set('maxDays')}
                            />
                        </Field>
                        <Field label='Approver' id='ap'>
                            <input
                                id='ap'
                                className='input input-bordered input-sm w-full'
                                value={plan.approver}
                                onChange={set('approver')}
                            />
                        </Field>
                        <Field label='Rollback plan' id='rp'>
                            <input
                                id='rp'
                                className='input input-bordered input-sm w-full'
                                value={plan.rollbackPlan}
                                onChange={set('rollbackPlan')}
                            />
                        </Field>
                        <div className='md:col-span-2'>
                            <Field label='Notes' id='nt'>
                                <textarea
                                    id='nt'
                                    className='textarea textarea-bordered w-full text-sm'
                                    rows={2}
                                    value={plan.notes}
                                    onChange={set('notes')}
                                />
                            </Field>
                        </div>
                    </div>
                </Card>

                <Card title='History'>
                    <h3 className='text-sm font-medium'>Versions</h3>
                    <ul className='mb-3 text-xs text-gray-600'>
                        {exp.versions.map((v) => (
                            <li key={v.version}>
                                v{v.version}: {v.reason} · started {formatDate(v.startedAt)} · ended{' '}
                                {formatDate(v.endedAt)}
                            </li>
                        ))}
                    </ul>
                    <h3 className='text-sm font-medium'>Decisions</h3>
                    <ul className='text-xs text-gray-600'>
                        {[...exp.decisions].reverse().map((d, i) => (
                            <li key={i}>
                                {formatDate(d.at)} · {d.action} · {d.by} {d.note && `— ${d.note}`}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card
                    title='Arms & treatments'
                    className='lg:col-span-3'
                    actions={
                        editable && (
                            <button
                                type='button'
                                className='btn btn-outline btn-sm'
                                disabled={action.busy}
                                onClick={saveArms}
                            >
                                Save arms
                            </button>
                        )
                    }
                >
                    <p className='mb-3 text-xs text-gray-500'>
                        A treatment overrides page sections by registry key:{' '}
                        <code>{'{ "BannerComp": { "mode": "merge", "data": { "heading": "…" } } }'}</code>. Modes:
                        merge, replace, remove.
                        {!editable && ' Pause the experiment to change arms (a new version starts once it has run).'}
                    </p>
                    <div className='grid gap-3 md:grid-cols-3'>
                        {arms.map((arm, i) => (
                            <div key={arm.key} className='rounded border border-gray-200 p-3'>
                                <div className='mb-2 flex items-center justify-between'>
                                    <strong>
                                        {arm.key} {arm.baseline && '(baseline)'}
                                    </strong>
                                    {perms.edit && (
                                        <button
                                            type='button'
                                            className='btn btn-ghost btn-xs'
                                            onClick={() => loadBrief(arm.key)}
                                            disabled={arm.baseline}
                                        >
                                            Change brief
                                        </button>
                                    )}
                                </div>
                                <input
                                    aria-label={`Arm ${arm.key} name`}
                                    className='input input-bordered input-sm mb-2 w-full'
                                    value={arm.name}
                                    disabled={!editable}
                                    onChange={(e) =>
                                        setArms(arms.map((a, j) => (j === i ? { ...a, name: e.target.value } : a)))
                                    }
                                />
                                <label className='mb-2 flex items-center gap-2 text-sm'>
                                    Weight
                                    <input
                                        type='number'
                                        min='1'
                                        max='100'
                                        className='input input-bordered input-xs w-20'
                                        value={arm.weight}
                                        disabled={!editable}
                                        onChange={(e) =>
                                            setArms(
                                                arms.map((a, j) => (j === i ? { ...a, weight: e.target.value } : a))
                                            )
                                        }
                                    />
                                </label>
                                <textarea
                                    aria-label={`Arm ${arm.key} description`}
                                    className='textarea textarea-bordered mb-2 w-full text-xs'
                                    rows={2}
                                    placeholder='What this arm changes and why'
                                    value={arm.description}
                                    disabled={!editable}
                                    onChange={(e) =>
                                        setArms(
                                            arms.map((a, j) => (j === i ? { ...a, description: e.target.value } : a))
                                        )
                                    }
                                />
                                {!arm.baseline && (
                                    <textarea
                                        aria-label={`Arm ${arm.key} treatment JSON`}
                                        className='textarea textarea-bordered w-full font-mono text-xs'
                                        rows={8}
                                        value={arm.overridesText}
                                        disabled={!editable}
                                        onChange={(e) =>
                                            setArms(
                                                arms.map((a, j) =>
                                                    j === i ? { ...a, overridesText: e.target.value } : a
                                                )
                                            )
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    {brief && (
                        <div className='mt-3'>
                            <p className='mb-1 text-sm'>
                                <Badge tone='warn'>Generation not connected</Badge> No coding-agent integration is
                                configured; hand this brief to a developer or agent.
                            </p>
                            <pre className='max-h-80 overflow-auto rounded bg-gray-50 p-3 text-xs'>{brief}</pre>
                        </div>
                    )}
                    {perms.edit && (
                        <div className='mt-4 border-t border-gray-100 pt-3'>
                            <h3 className='mb-2 text-sm font-medium'>Propose a challenger</h3>
                            <p className='mb-2 text-xs text-gray-500'>
                                Added as an arm while a slot is free and the experiment has not started; otherwise
                                queued ({exp.queuedChallengers?.length || 0} queued) for a later version.
                            </p>
                            <div className='grid gap-2 md:grid-cols-3'>
                                <input
                                    aria-label='Challenger name'
                                    className='input input-bordered input-sm'
                                    placeholder='Name'
                                    value={challenger.name}
                                    onChange={(e) => setChallenger({ ...challenger, name: e.target.value })}
                                />
                                <input
                                    aria-label='Challenger description'
                                    className='input input-bordered input-sm md:col-span-2'
                                    placeholder='Description'
                                    value={challenger.description}
                                    onChange={(e) => setChallenger({ ...challenger, description: e.target.value })}
                                />
                                <textarea
                                    aria-label='Challenger treatment JSON'
                                    className='textarea textarea-bordered font-mono text-xs md:col-span-3'
                                    rows={4}
                                    value={challenger.overridesText}
                                    onChange={(e) => setChallenger({ ...challenger, overridesText: e.target.value })}
                                />
                            </div>
                            <button
                                type='button'
                                className='btn btn-outline btn-sm mt-2'
                                disabled={action.busy}
                                onClick={addChallenger}
                            >
                                Propose challenger
                            </button>
                            {exp.queuedChallengers?.length > 0 && (
                                <ul className='mt-2 text-xs text-gray-600'>
                                    {exp.queuedChallengers.map((q, i) => (
                                        <li key={i}>
                                            Queued: {q.name} — {q.description} ({q.proposedBy},{' '}
                                            {formatDate(q.proposedAt)})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminPage('view', async (context, session) => {
    const [service, { METRICS }, { getSettings }] = await Promise.all([
        import('@/lib/admin/experiments/service'),
        import('@/lib/experiments/events'),
        import('@/lib/admin/settings'),
    ]);
    let exp;
    try {
        exp = await service.getExperimentOrThrow(context.params.id);
    } catch (error) {
        if (error.status === 404) return { notFound: true };
        throw error;
    }
    const settings = await getSettings();
    const resultsByVersion = {};
    for (const v of exp.versions) resultsByVersion[v.version] = await service.results(exp, v.version);
    return {
        props: {
            exp,
            checklist: await service.getChecklist(exp),
            resultsByVersion,
            metrics: METRICS,
            perms: {
                edit: can(session.role, 'experiments.edit'),
                launch: can(session.role, 'experiments.launch'),
                decide: can(session.role, 'experiments.decide'),
            },
            policy: { allowLaunch: settings.experiments.allowLaunch },
        },
    };
});
