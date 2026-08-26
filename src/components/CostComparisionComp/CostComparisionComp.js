import React, { useMemo, useState, useEffect, useCallback } from 'react';
import NotFoundComp from '@/components/NotFoundComp/NotFoundComp';
import CostComparisonInputs from './CostComparisonInputs';
import CostComparisonResults from './CostComparisonResults';
import CostComparisonHeader from './CostComparisonHeader';
import CostSavingBenefits from './CostSavingBenefits';
import PlatformComparisonCards from './PlatformComparisonCards';
import CostComparisonBanner from './CostComparisonBanner';
import FaqsComp from '@/components/FaqsComp/FaqsComp';
import getSubscriptions from '@/utils/pricing/getSubscription';
import handlePlanStructure from '@/utils/pricing/handlePlanStructure';
import { HELLO_PLANS, ALL_COMPETITORS, CURRENCY_RATES, HELLO_MS_ID } from './constants';
import { calculatePlatformCosts, formatCurrencyAmount, resolveApiPlan } from './helpers';
export default function CostComparisionComp({ data, pageInfo }) {
    const [tickets, setTickets] = useState(
        data?.defaults?.tickets !== undefined ? Number(data.defaults.tickets) : 3000
    );
    const [agents, setAgents] = useState(data?.defaults?.agents !== undefined ? Number(data.defaults.agents) : 12);
    const [aiRate, setAiRate] = useState(data?.defaults?.aiRate !== undefined ? Number(data.defaults.aiRate) : 50);
    const [planKey, setPlanKey] = useState(HELLO_PLANS[data?.defaults?.plan] ? data.defaults.plan : 'basic');
    const [competitorKey, setCompetitorKey] = useState(
        ALL_COMPETITORS[data?.defaults?.competitor] ? data.defaults.competitor : 'zendesk'
    );
    const initialCompetitor = ALL_COMPETITORS[data?.defaults?.competitor] || ALL_COMPETITORS.zendesk;
    const [competitorPlanName, setCompetitorPlanName] = useState(
        initialCompetitor?.defaultPlan || initialCompetitor?.plans?.[0]?.name || ''
    );
    const [currency, setCurrency] = useState(CURRENCY_RATES[data?.defaultCurrency] ? data.defaultCurrency : 'USD');

    const [apiPlans, setApiPlans] = useState([]);
    const [loadingApi, setLoadingApi] = useState(true);

    const apiCurrency = currency;

    const fetchPlans = useCallback(async () => {
        setLoadingApi(true);
        try {
            const raw = await getSubscriptions(apiCurrency, HELLO_MS_ID);
            if (raw) {
                const structured = handlePlanStructure(raw, apiCurrency);
                setApiPlans(structured || []);
            } else {
                setApiPlans([]);
            }
        } catch {
            setApiPlans([]);
        } finally {
            setLoadingApi(false);
        }
    }, [apiCurrency]);

    useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);

    const plan = HELLO_PLANS[planKey];
    const competitor = ALL_COMPETITORS[competitorKey];

    useEffect(() => {
        if (competitor?.plans?.length) {
            const found = competitor.plans.find((p) => p.name === competitorPlanName);
            if (!found) {
                setCompetitorPlanName(competitor.defaultPlan || competitor.plans[0].name);
            }
        } else {
            setCompetitorPlanName('');
        }
    }, [competitorKey, competitor]);

    const calculation = useMemo(() => {
        return calculatePlatformCosts(
            plan,
            competitor,
            tickets,
            agents,
            aiRate,
            currency,
            CURRENCY_RATES,
            apiPlans,
            competitorPlanName
        );
    }, [plan, competitor, tickets, agents, aiRate, currency, apiPlans, competitorPlanName]);

    if (!data) return null;

    const { hello, competitor: competitorResult, savings } = calculation;

    const formatCurrency = (value) => formatCurrencyAmount(value, currency, CURRENCY_RATES);

    const apiPlanMatch = resolveApiPlan(plan, apiPlans);

    if (!loadingApi && (!apiPlans || apiPlans.length === 0)) {
        return <NotFoundComp pageInfo={pageInfo} />;
    }

    return (
        <section className='bg-gray-50 text-gray-900'>
            <div className='container cont_p cont gap-12'>
                <CostComparisonHeader data={data} />

                <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-12'>
                    <CostComparisonInputs
                        data={data?.inputsData}
                        tickets={tickets}
                        setTickets={setTickets}
                        agents={agents}
                        setAgents={setAgents}
                        aiRate={aiRate}
                        setAiRate={setAiRate}
                        competitorKey={competitorKey}
                        setCompetitorKey={setCompetitorKey}
                        competitorPlanName={competitorPlanName}
                        setCompetitorPlanName={setCompetitorPlanName}
                        currency={currency}
                        setCurrency={setCurrency}
                        planKey={planKey}
                        setPlanKey={setPlanKey}
                        apiPlans={apiPlans}
                    />

                    <CostComparisonResults
                        data={data?.resultsData}
                        hello={hello}
                        competitorResult={competitorResult}
                        savings={savings}
                        competitor={competitor}
                        plan={plan}
                        agents={agents}
                        currency={currency}
                        formatCurrency={formatCurrency}
                        buttons={data?.buttons}
                        footnote={data?.footnote}
                    />
                </div>
            </div>
            <CostSavingBenefits data={data?.CostSavingBenefits} />
            <PlatformComparisonCards data={data?.PlatformComparisonCards} />
            <FaqsComp data={data?.FaqsComp} notCont={false} />
            <CostComparisonBanner data={data?.CostComparisonBanner} />
        </section>
    );
}
