import React, { useMemo, useState, useEffect, useCallback } from 'react';
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
import { calculatePlatformCosts, formatCurrencyAmount } from './helpers';
export default function CostComparisionComp({ data, pageInfo }) {
    if (!data) return null;

    const [tickets, setTickets] = useState(data.defaults?.tickets !== undefined ? Number(data.defaults.tickets) : 3000);
    const [agents, setAgents] = useState(data.defaults?.agents !== undefined ? Number(data.defaults.agents) : 12);
    const [aiRate, setAiRate] = useState(data.defaults?.aiRate !== undefined ? Number(data.defaults.aiRate) : 50);
    const [planKey, setPlanKey] = useState(HELLO_PLANS[data.defaults?.plan] ? data.defaults.plan : 'basic');
    const [competitorKey, setCompetitorKey] = useState(
        ALL_COMPETITORS[data.defaults?.competitor] ? data.defaults.competitor : 'zendesk'
    );
    const [currency, setCurrency] = useState(CURRENCY_RATES[data.defaultCurrency] ? data.defaultCurrency : 'USD');

    const [apiPlans, setApiPlans] = useState([]);
    const [loadingApi, setLoadingApi] = useState(false);

    const apiCurrency = currency === 'BRL' || currency === 'EUR' ? 'USD' : currency;

    const fetchPlans = useCallback(async () => {
        setLoadingApi(true);
        try {
            const raw = await getSubscriptions(apiCurrency, HELLO_MS_ID);
            if (raw) {
                setApiPlans(handlePlanStructure(raw, apiCurrency));
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

    const calculation = useMemo(() => {
        return calculatePlatformCosts(plan, competitor, tickets, agents, aiRate, currency, CURRENCY_RATES, apiPlans);
    }, [plan, competitor, tickets, agents, aiRate, currency, apiPlans]);

    const { hello, competitor: competitorResult, savings } = calculation;

    const formatCurrency = (value) => formatCurrencyAmount(value, currency, CURRENCY_RATES);

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
                        currency={currency}
                        setCurrency={setCurrency}
                        planKey={planKey}
                        setPlanKey={setPlanKey}
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
