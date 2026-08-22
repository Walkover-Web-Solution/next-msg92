import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { generateCostComparisonPdf } from './exportPdf';

function TableRow({ title, subtitle, helloClassName, helloContent, competitorValue, competitorDesc }) {
    return (
        <tr className='hover:bg-gray-50/80'>
            <td className='px-4 py-3 font-medium'>
                <div>{title}</div>
                <div className='text-xs font-normal'>{subtitle}</div>
            </td>
            <td className={`px-4 py-3 text-right align-middle ${helloClassName || ''}`}>{helloContent}</td>
            <td className='px-4 py-3 text-right align-middle'>
                <div>{competitorValue}</div>
                <div className='text-xs font-normal'>{competitorDesc}</div>
            </td>
        </tr>
    );
}

export default function CostComparisonResults({
    data,
    hello,
    competitorResult,
    savings,
    competitor,
    plan,
    agents,
    currency,
    formatCurrency,
    buttons,
    footnote,
}) {
    if (!data) return null;

    const [isExporting, setIsExporting] = useState(false);

    const { summary, table, savingBox, tableDetails } = data;
    const { primaryBtn, secondaryBtn } = buttons;

    const handleExportPdf = async () => {
        setIsExporting(true);
        try {
            await generateCostComparisonPdf({
                hello,
                competitorResult,
                savings,
                competitor,
                plan,
                agents,
                currency,
                formatCurrency,
                footnote,
            });
        } finally {
            setIsExporting(false);
        }
    };

    const getBaseSubDesc = () => {
        if (competitorResult.basePlanCost > 0) {
            if (
                competitorResult.model === 'crisp_tiered' ||
                competitorResult.model === 'zenvia_tiered' ||
                competitorResult.model === 'base_seat_tiered' ||
                competitorResult.model === 'base_conv_tiered' ||
                competitorResult.selectedPlanName
            ) {
                return tableDetails?.baseSubWithPlan?.replace('{plan}', competitorResult.selectedPlanName);
            }
            if (competitorResult.model === 'flat') return tableDetails?.flatBaseSub;
            return tableDetails?.baseSub;
        }
        return tableDetails?.noBaseSub;
    };

    const getSeatsDesc = () => {
        if (
            competitorResult.model === 'seat' ||
            competitorResult.model === 'seat_res' ||
            competitorResult.model === 'seat_tiered'
        ) {
            return tableDetails?.seatsCost
                ?.replace('{agents}', agents)
                .replace('{price}', formatCurrency(competitorResult.perAgent));
        }
        if (competitorResult.model === 'base_seat' || competitorResult.model === 'base_seat_tiered') {
            const extraSeats = Math.max(0, agents - (competitorResult.includedSeats ?? competitor.includedSeats ?? 0));
            const priceStr = formatCurrency(
                competitorResult.extraSeatFee || competitorResult.extraSeat || competitorResult.perAgent
            );
            if (extraSeats === 0) return tableDetails?.noSeatCharges;
            if (extraSeats === 1)
                return tableDetails?.extraSeatsCostSingle?.replace('{seats}', extraSeats).replace('{price}', priceStr);
            return tableDetails?.extraSeatsCostPlural?.replace('{seats}', extraSeats).replace('{price}', priceStr);
        }
        if (competitorResult.model === 'zenvia_tiered') {
            const extraUsers = Math.max(0, agents - (competitorResult.includedUsers || 0));
            const priceStr = formatCurrency(competitorResult.extraUserFee || 0);
            if (extraUsers === 0) return tableDetails?.noSeatCharges;
            if (extraUsers === 1)
                return tableDetails?.extraSeatsCostSingle?.replace('{seats}', extraUsers).replace('{price}', priceStr);
            return tableDetails?.extraSeatsCostPlural?.replace('{seats}', extraUsers).replace('{price}', priceStr);
        }
        return tableDetails?.noSeatCharges;
    };

    const getAiSeatDesc = () => {
        if (competitorResult.aiSeatCost > 0) {
            return tableDetails?.aiSeatCost
                ?.replace('{agents}', agents)
                .replace('{price}', formatCurrency(competitorResult.aiPerAgent));
        }
        return tableDetails?.fallbackDash;
    };

    const getUsageDesc = () => {
        if (competitorResult.model === 'base_conv' || competitorResult.model === 'base_conv_tiered') {
            if (competitorResult.usageCost > 0) {
                return tableDetails?.usageCost
                    ?.replace('{tickets}', hello.tickets.toLocaleString())
                    .replace('{price}', formatCurrency(competitorResult.perConv));
            }
            const incConvs = competitorResult.includedConvs ?? competitor.includedConvs;
            if (incConvs && incConvs !== Infinity) {
                if (hello.tickets > incConvs) {
                    return tableDetails?.contactSalesOverage
                        ?.replace('{tickets}', hello.tickets.toLocaleString())
                        ?.replace('{included}', incConvs.toLocaleString());
                }
                return (
                    tableDetails?.withinQuotaIncluded?.replace('{included}', incConvs.toLocaleString()) ||
                    tableDetails?.withinQuota
                );
            }
            return tableDetails?.fallbackDash;
        }
        return tableDetails?.fallbackDash;
    };

    const getAiResolutionsDesc = () => {
        if (competitorResult.aiResolutionsCost > 0) {
            if (competitorResult.model === 'crisp_tiered') {
                return tableDetails?.overageAboveAllowance;
            }
            if (competitorResult.model === 'zenvia_tiered') {
                const extraCredits = Math.max(0, hello.aiResolved - (competitorResult.includedCredits || 0));
                return tableDetails?.extraTicketsCost
                    ?.replace('{tickets}', extraCredits.toLocaleString())
                    .replace('{price}', formatCurrency(competitorResult.extraCreditFee));
            }
            if (competitorResult.perResolution > 0) {
                return tableDetails?.aiResolvedCost
                    ?.replace('{tickets}', hello.aiResolved.toLocaleString())
                    .replace('{price}', formatCurrency(competitorResult.perResolution));
            }
            return tableDetails?.fallbackDash;
        }
        if (competitorResult.perResolution === 0 || competitorResult.model === 'base_seat_tiered') {
            return tableDetails?.aiIncludedInPlan;
        }
        if (hello.aiResolved === 0) return tableDetails?.zeroAiResolved;
        return tableDetails?.fallbackDash;
    };

    const baseSubValue =
        competitorResult.basePlanCost > 0 ? formatCurrency(competitorResult.basePlanCost) : tableDetails?.fallbackDash;
    const seatsValue = ['seat', 'seat_res', 'base_seat', 'seat_tiered', 'base_seat_tiered', 'zenvia_tiered'].includes(
        competitorResult.model
    )
        ? formatCurrency(competitorResult.agentSeatsCost)
        : tableDetails?.fallbackDash;
    const aiSeatValue =
        competitorResult.aiSeatCost > 0 ? formatCurrency(competitorResult.aiSeatCost) : tableDetails?.fallbackDash;
    let usageValue = tableDetails?.fallbackDash;
    if (competitorResult.model === 'base_conv' || competitorResult.model === 'base_conv_tiered') {
        if (competitorResult.usageCost > 0) {
            usageValue = formatCurrency(competitorResult.usageCost);
        } else {
            const incConvs = competitorResult.includedConvs ?? competitor.includedConvs;
            if (incConvs && incConvs !== Infinity && hello.tickets > incConvs) {
                usageValue = tableDetails?.contactSales || 'Contact sales';
            }
        }
    }

    let aiResolutionsValue = tableDetails?.fallbackDash;
    if (competitorResult.aiResolutionsCost > 0) aiResolutionsValue = formatCurrency(competitorResult.aiResolutionsCost);
    else if (competitorResult.perResolution === 0 || competitorResult.model === 'base_seat_tiered')
        aiResolutionsValue = formatCurrency(0);
    else if (hello.aiResolved === 0) aiResolutionsValue = '—';

    return (
        <div className='cont gap-6 lg:col-span-7'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='cont justify-center rounded-xl border border-blue-300 bg-blue-50 p-8 shadow-sm'>
                    <span className='my-2 text-sm font-semibold text-blue-700'>{summary?.helloPay}</span>
                    <div className='text-4xl font-black text-blue-700'>{formatCurrency(hello.total)}</div>
                    <p className='my-1 text-sm text-blue-600'>{summary?.perMonth}</p>
                </div>

                <div className='cont justify-center rounded-xl bg-slate-900 p-8 shadow-lg'>
                    <span className='my-2 text-sm font-semibold text-white'>
                        {summary?.competitorPay?.replace('{competitor}', competitor.name)}
                    </span>
                    <div className='text-4xl font-black text-white'>{formatCurrency(competitorResult.total)}</div>
                    <p className='my-1 text-sm text-slate-300'>{summary?.perMonth}</p>
                </div>

                <div className='cont justify-center rounded-xl border border-emerald-300 bg-emerald-50 p-8 shadow-sm'>
                    <span className='my-2 text-sm font-semibold text-emerald-700'>{summary?.youSave}</span>
                    <div className='text-4xl font-black text-emerald-700'>{formatCurrency(savings.saving)}</div>
                    <p className='my-1 text-sm text-emerald-600'>
                        {summary?.savedPerYearSummary
                            ?.replace('{yearly}', formatCurrency(savings.yearly))
                            .replace('{percent}', savings.percent)}
                    </p>
                </div>
            </div>

            <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
                <h2 className='my-6 border-b border-gray-100 py-4 text-lg font-bold'>
                    {table?.heading?.replace('{currency}', currency)}
                </h2>

                <div className='overflow-x-auto'>
                    <table className='w-full border-collapse text-sm'>
                        <thead>
                            <tr className='border-b border-gray-200 bg-gray-100 text-xs uppercase'>
                                <th className='rounded-l-xl px-4 py-3 text-left'>{table?.costElement}</th>
                                <th className='px-4 py-3 text-right font-bold text-indigo-600'>
                                    {table?.hello?.replace('{plan}', plan.name)}
                                </th>
                                <th className='rounded-r-xl px-4 py-3 text-right font-bold'>{competitor.name}</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            <TableRow
                                title={table?.baseSubscription}
                                subtitle={table?.helloTicketsIncluded?.replace(
                                    '{tickets}',
                                    hello.includedTickets.toLocaleString()
                                )}
                                helloClassName='font-semibold text-indigo-600'
                                helloContent={formatCurrency(hello.base)}
                                competitorValue={baseSubValue}
                                competitorDesc={getBaseSubDesc()}
                            />

                            <TableRow
                                title={table?.seatCharges}
                                subtitle={table?.helloAgentsFree}
                                helloClassName='font-semibold text-emerald-600'
                                helloContent={
                                    <>
                                        {formatCurrency(0)}{' '}
                                        <span className='text-xs font-normal text-emerald-500'>{table?.freeBadge}</span>
                                    </>
                                }
                                competitorValue={seatsValue}
                                competitorDesc={getSeatsDesc()}
                            />

                            <TableRow
                                title={table?.aiSeatCopilot}
                                subtitle={table?.helloAiIncluded}
                                helloClassName='font-semibold text-emerald-600'
                                helloContent={
                                    <>
                                        {formatCurrency(0)}{' '}
                                        <span className='text-xs font-normal text-emerald-500'>
                                            {table?.includedBadge}
                                        </span>
                                    </>
                                }
                                competitorValue={aiSeatValue}
                                competitorDesc={getAiSeatDesc()}
                            />

                            <TableRow
                                title={table?.ticketUsage}
                                subtitle={table?.helloExtraTicket?.replace(
                                    '{price}',
                                    formatCurrency(hello.extraPerTicket)
                                )}
                                helloClassName=''
                                helloContent={
                                    <>
                                        <div>
                                            {hello.extraCost > 0
                                                ? formatCurrency(hello.extraCost)
                                                : tableDetails?.fallbackDash}
                                        </div>
                                        <div className='text-xs font-normal'>
                                            {hello.extraCost > 0
                                                ? tableDetails?.extraTicketsCost
                                                      ?.replace('{tickets}', hello.extraTickets.toLocaleString())
                                                      .replace('{price}', formatCurrency(hello.extraPerTicket))
                                                : tableDetails?.withinQuota}
                                        </div>
                                    </>
                                }
                                competitorValue={usageValue}
                                competitorDesc={getUsageDesc()}
                            />

                            <TableRow
                                title={table?.aiBotResolutions}
                                subtitle='Hello: Included in plan'
                                helloClassName='font-semibold text-emerald-600'
                                helloContent={
                                    <>
                                        {formatCurrency(0)}{' '}
                                        <span className='text-xs font-normal text-emerald-500'>(Included)</span>
                                    </>
                                }
                                competitorValue={aiResolutionsValue}
                                competitorDesc={getAiResolutionsDesc()}
                            />

                            <tr className='border-t-2 border-gray-300 bg-gray-100 text-base font-bold'>
                                <td className='px-4 py-4'>{table?.totalMonthlyCost}</td>
                                <td className='px-4 py-4 text-right text-lg text-indigo-600'>
                                    {formatCurrency(hello.total)}
                                </td>
                                <td className='px-4 py-4 text-right text-lg'>
                                    {formatCurrency(competitorResult.total)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='rounded-xl bg-emerald-500 p-4 text-white shadow-lg'>
                <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
                    <div>
                        <p className='my-2 text-sm font-semibold'>{savingBox?.monthlySavingTitle}</p>
                        <p className='text-sm text-emerald-100'>
                            {savingBox?.savingEquation
                                ?.replace('{competitorTotal}', formatCurrency(competitorResult.total))
                                ?.replace('{compTotal}', formatCurrency(competitorResult.total))
                                ?.replace('{helloTotal}', formatCurrency(hello.total))}
                        </p>
                    </div>
                    <div className='text-right'>
                        <div className='text-3xl font-black'>
                            {formatCurrency(savings.saving)}
                            <span className='text-2xl font-semibold'>{savingBox?.mo}</span>
                        </div>
                        <p className='my-2 text-sm text-emerald-100'>
                            {savingBox?.savedPerYear
                                ?.replace('{yearly}', formatCurrency(savings.yearly))
                                .replace('{percent}', savings.percent)}
                        </p>
                    </div>
                </div>
            </div>

            {primaryBtn?.text && (
                <div className='flex flex-col gap-4 sm:flex-row'>
                    <a
                        href={primaryBtn?.link}
                        className='flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700'
                    >
                        {primaryBtn?.text}
                    </a>
                    {secondaryBtn?.text && (
                        <button
                            type='button'
                            onClick={handleExportPdf}
                            disabled={isExporting}
                            className='flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50'
                        >
                            <FaFilePdf className='h-4 w-4 text-red-500' aria-hidden />
                            {isExporting ? 'Exporting...' : secondaryBtn?.text}
                        </button>
                    )}
                </div>
            )}

            {footnote && (
                <div className='text-xs'>
                    <p>{footnote}</p>
                </div>
            )}
        </div>
    );
}
