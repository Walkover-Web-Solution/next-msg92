import React from 'react';
import { HELLO_PLANS } from './constants';

export function formatHeadingWithAccent(rawText) {
    const parts = String(rawText ?? '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);
    if (parts.length < 2) return parts[0] ?? null;
    const [leadText, accentText, ...restText] = parts;
    return (
        <>
            {leadText} <span className='text-indigo-600'>{accentText}</span>
            {restText.length ? ` ${restText.join(' ')}` : null}
        </>
    );
}

export function resolveApiPlan(plan, apiPlans = []) {
    if (!Array.isArray(apiPlans) || apiPlans.length === 0) return null;

    const targetKey = plan?.key?.toLowerCase() || plan?.name?.toLowerCase() || '';

    const monthlyPlans = apiPlans.filter((p) => p?.type?.toLowerCase() === 'monthly');
    const plansPool = monthlyPlans.length > 0 ? monthlyPlans : apiPlans;

    const exactMatch =
        plansPool.find((p) => p?.name?.toLowerCase() === targetKey) ||
        apiPlans.find((p) => p?.name?.toLowerCase() === targetKey);

    if (exactMatch) {
        return exactMatch;
    }

    if (targetKey) {
        const partialMatch =
            plansPool.find((p) => p?.name?.toLowerCase().includes(targetKey)) ||
            apiPlans.find((p) => p?.name?.toLowerCase().includes(targetKey));

        if (partialMatch) {
            return partialMatch;
        }
    }

    const paidPlans = plansPool.filter((p) => Number(p?.amount) > 0);
    const planKeys = Object.keys(HELLO_PLANS);
    const slotIndex = planKeys.indexOf(plan?.key || '');

    if (slotIndex >= 0) {
        return paidPlans[slotIndex] || paidPlans[0] || plansPool[0] || null;
    }

    return plansPool[0] || null;
}

export function calculatePlatformCosts(
    plan,
    competitor,
    ticketsInput,
    agentsInput,
    aiRateInput,
    currency,
    CURRENCY_RATES,
    apiPlans = [],
    selectedCompetitorPlanName = ''
) {
    const tickets = ticketsInput === '' ? 0 : Math.max(0, Math.floor(Number(ticketsInput)));
    const agents = agentsInput === '' ? 1 : Math.max(1, Math.floor(Number(agentsInput)));
    const aiRate = aiRateInput === '' ? 0 : Math.min(100, Math.max(0, Math.floor(Number(aiRateInput))));
    const aiResolved = Math.round((tickets * aiRate) / 100);

    const currencyRate = CURRENCY_RATES[currency].rate;

    const apiPlanMatch = resolveApiPlan(plan, apiPlans);

    const service = apiPlanMatch?.services?.find((s) => s.name === 'Tickets');

    let helloBase = Number(apiPlanMatch?.amount || 0);
    if (Number.isNaN(helloBase)) helloBase = 0;
    let helloExtraRate = Number(service?.followUpRate || 0);
    if (Number.isNaN(helloExtraRate)) helloExtraRate = 0;
    let includedTickets = Number(service?.freeCredit || 0);
    if (Number.isNaN(includedTickets) || includedTickets < 0) {
        includedTickets = includedTickets < 0 ? Infinity : 0;
    }

    const extraTickets = Math.max(0, tickets - includedTickets);
    const helloOverage = extraTickets * helloExtraRate;
    const helloTotal = helloBase + helloOverage;

    let compBaseUSD = 0;
    let compAiResolutionsCostUSD = 0;
    let selectedPlanName = '';

    let compBasePlanCostUSD = 0;
    let compAgentSeatsCostUSD = 0;
    let compAiSeatCostUSD = 0;
    let compUsageCostUSD = 0;

    let planPerAgent = competitor?.perAgent || 0;
    let planPerResolution = competitor?.perResolution ?? 0;
    let includedUsers = competitor?.includedUsers || 0;
    let extraUserFee = competitor?.extraUserFee || 0;
    let includedCredits = competitor?.includedCredits || 0;
    let extraCreditFee = competitor?.extraCreditFee || 0;
    let includedSeats = competitor?.includedSeats || 0;
    let extraSeatFee = competitor?.extraSeatFee || competitor?.extraSeat || 0;
    let setupFee = competitor?.setupFee || 0;

    const resolveCompetitorPlan = () => {
        if (!Array.isArray(competitor?.plans) || competitor.plans.length === 0) return null;
        if (selectedCompetitorPlanName) {
            const found = competitor.plans.find((p) => p.name === selectedCompetitorPlanName);
            if (found) return found;
        }
        if (competitor.defaultPlan) {
            const foundDefault = competitor.plans.find((p) => p.name === competitor.defaultPlan);
            if (foundDefault) return foundDefault;
        }
        return competitor.plans[0];
    };

    switch (competitor.model) {
        case 'seat': {
            compAgentSeatsCostUSD = agents * competitor.perAgent;
            compAiSeatCostUSD = agents * (competitor.aiPerAgent || 0);
            compBaseUSD = compAgentSeatsCostUSD + compAiSeatCostUSD;
            compAiResolutionsCostUSD = (competitor.perResolution || 0) * aiResolved;
            break;
        }
        case 'seat_res': {
            compAgentSeatsCostUSD = agents * competitor.perAgent;
            compBaseUSD = compAgentSeatsCostUSD;
            compAiResolutionsCostUSD = (competitor.perResolution || 0) * aiResolved;
            break;
        }
        case 'seat_tiered': {
            const chosenPlan = resolveCompetitorPlan();
            selectedPlanName = chosenPlan?.name || '';
            planPerAgent = chosenPlan?.perAgent || 0;
            compAgentSeatsCostUSD = agents * planPerAgent;
            compBaseUSD = compAgentSeatsCostUSD;
            compAiResolutionsCostUSD = (competitor.perResolution || 0) * aiResolved;
            break;
        }
        case 'base_seat': {
            compBasePlanCostUSD = competitor.basePlan;
            const extraSeats = Math.max(0, agents - competitor.includedSeats);
            compAgentSeatsCostUSD = extraSeats * competitor.extraSeat;
            compBaseUSD = compBasePlanCostUSD + compAgentSeatsCostUSD;
            compAiResolutionsCostUSD = (competitor.perResolution || 0) * aiResolved;
            break;
        }
        case 'base_seat_tiered': {
            const chosenPlan = resolveCompetitorPlan();
            selectedPlanName = chosenPlan?.name || '';
            compBasePlanCostUSD = chosenPlan?.base || 0;
            includedSeats = chosenPlan?.includedSeats || 0;
            extraSeatFee = chosenPlan?.extraSeatFee || 0;
            const extraSeats = Math.max(0, agents - includedSeats);
            compAgentSeatsCostUSD = extraSeats * extraSeatFee;
            compBaseUSD = compBasePlanCostUSD + compAgentSeatsCostUSD;
            compAiResolutionsCostUSD = (competitor.perResolution || 0) * aiResolved;
            break;
        }
        case 'base_conv': {
            compBasePlanCostUSD = competitor.basePlan;
            compUsageCostUSD = tickets * (competitor.perConv || 0);
            compBaseUSD = compBasePlanCostUSD + compUsageCostUSD;
            compAiResolutionsCostUSD = (competitor.perResolution || 0) * aiResolved;
            break;
        }
        case 'flat': {
            compBasePlanCostUSD = competitor.basePlan || 0;
            compBaseUSD = compBasePlanCostUSD;
            compAiResolutionsCostUSD = (competitor.perResolution || 0) * aiResolved;
            break;
        }
        case 'crisp_tiered': {
            const chosenPlan = resolveCompetitorPlan();
            selectedPlanName = chosenPlan?.name || '';
            compBasePlanCostUSD = chosenPlan?.base || 0;
            const overageAIConvs = Math.max(0, aiResolved - (chosenPlan?.includedAIConvs || 0));
            compAiResolutionsCostUSD = overageAIConvs * (chosenPlan?.perResolution || 0);
            compBaseUSD = compBasePlanCostUSD + compAiResolutionsCostUSD;
            break;
        }
        case 'zenvia_tiered': {
            const chosenPlan = resolveCompetitorPlan();
            selectedPlanName = chosenPlan?.name || '';
            compBasePlanCostUSD = chosenPlan?.base || 0;
            includedUsers = chosenPlan?.includedUsers || 0;
            extraUserFee = chosenPlan?.extraUserFee || 0;
            includedCredits = chosenPlan?.includedCredits || 0;
            extraCreditFee = chosenPlan?.extraCreditFee || 0;
            setupFee = chosenPlan?.setupFee || 0;

            const extraUsers = Math.max(0, agents - includedUsers);
            const extraCredits = Math.max(0, aiResolved - includedCredits);

            compAgentSeatsCostUSD = extraUsers * extraUserFee;
            compAiResolutionsCostUSD = extraCredits * extraCreditFee;
            compBaseUSD = compBasePlanCostUSD + compAgentSeatsCostUSD + compAiResolutionsCostUSD;
            break;
        }
        default:
            break;
    }

    const compTotalUSD =
        competitor.model === 'crisp_tiered' || competitor.model === 'zenvia_tiered'
            ? compBaseUSD
            : compBaseUSD + compAiResolutionsCostUSD;

    const compBase = compBaseUSD * currencyRate;
    const compTotal = compTotalUSD * currencyRate;

    const compBasePlanCost = compBasePlanCostUSD * currencyRate;
    const compAgentSeatsCost = compAgentSeatsCostUSD * currencyRate;
    const compAiSeatCost = compAiSeatCostUSD * currencyRate;
    const compUsageCost = compUsageCostUSD * currencyRate;
    const compAiResolutionsCost = compAiResolutionsCostUSD * currencyRate;

    const saving = Math.max(0, compTotal - helloTotal);
    const percent = compTotal > 0 ? Math.round((saving / compTotal) * 100) : 0;
    const yearly = saving * 12;

    return {
        tickets,
        agents,
        aiRate,
        aiResolved,
        currency,
        hello: {
            base: helloBase,
            tickets: tickets,
            extraTickets: extraTickets,
            extraCost: helloOverage,
            total: helloTotal,
            includedTickets: includedTickets,
            extraPerTicket: helloExtraRate,
            aiResolved: aiResolved,
        },
        competitor: {
            name: competitor.name,
            model: competitor.model,
            note: competitor.note,
            selectedPlanName,
            base: compBase,
            total: compTotal,
            basePlanCost: compBasePlanCost,
            agentSeatsCost: compAgentSeatsCost,
            aiSeatCost: compAiSeatCost,
            usageCost: compUsageCost,
            aiResolutionsCost: compAiResolutionsCost,
            perAgent: planPerAgent * currencyRate,
            aiPerAgent: (competitor.aiPerAgent || 0) * currencyRate,
            perConv: (competitor.perConv || 0) * currencyRate,
            perResolution: planPerResolution * currencyRate,
            includedUsers,
            extraUserFee: extraUserFee * currencyRate,
            includedCredits,
            extraCreditFee: extraCreditFee * currencyRate,
            includedSeats,
            extraSeatFee: extraSeatFee * currencyRate,
            setupFee: setupFee * currencyRate,
            plans: competitor.plans,
            aiResolved: aiResolved,
        },
        savings: {
            saving,
            percent,
            yearly,
        },
    };
}

export function formatCurrencyAmount(amount, currencyCode, CURRENCY_RATES) {
    const currencyMeta = CURRENCY_RATES[currencyCode];
    if (!currencyMeta) return '';
    const absoluteAmount = Math.abs(amount);
    let formattingOptions;
    if (absoluteAmount === 0) {
        return `${currencyMeta.symbol}0`;
    } else if (absoluteAmount < 0.1) {
        formattingOptions = { minimumFractionDigits: 3, maximumFractionDigits: 3 };
    } else if (absoluteAmount < 10) {
        formattingOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    } else {
        formattingOptions = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
    }
    let locale;
    switch (currencyCode) {
        case 'INR':
            locale = 'en-IN';
            break;
        case 'AED':
            locale = 'en-AE';
            break;
        case 'GBP':
            locale = 'en-GB';
            break;
        default:
            locale = 'en-US';
    }
    return `${currencyMeta.symbol}${Number(amount).toLocaleString(locale, formattingOptions)}`;
}
