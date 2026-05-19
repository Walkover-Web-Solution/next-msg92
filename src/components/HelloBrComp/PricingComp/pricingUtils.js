export const SYMBOL = { USD: '$', BRL: 'R$' };
export const LOCALE = { USD: 'en-US', BRL: 'pt-BR' };

export function serviceHasDialPlan(s) {
    return s?.dialPlan != null && s.dialPlan?.data?.length > 0;
}

export function isUnlimitedFreeCreditValue(fc) {
    return fc === -1 || fc === '-1';
}

export function computeDiscountedAmount(amount, discounts) {
    if (!amount || !discounts || discounts.length === 0) return null;
    const discount = discounts[0];
    const typeId = discount?.discount_type_id ?? discount?.type_id;
    const value = Number(discount?.value ?? 0);
    const numAmount = Number(amount);
    if (typeId === 1) return Math.max(0, numAmount - value);
    if (typeId === 2) return value >= 100 ? 0 : Math.max(0, numAmount * (1 - value / 100));
    return null;
}

export function resolveFeaturedPlanKey(product) {
    if (product === 'hello') return 'basic';
    return null;
}

export function hasComparablePlanFeatures(pricingData, tabtype) {
    if (!Array.isArray(pricingData) || pricingData.length === 0) return false;
    const plans = pricingData.filter((p) => p?.type === tabtype);
    if (plans.length === 0) return false;
    const seen = new Set();
    plans.forEach((plan) => {
        (plan?.features ?? []).forEach((f) => {
            if (f?.name && !seen.has(f.name)) seen.add(f.name);
        });
    });
    return seen.size > 0;
}

export function setCompareModalBillingPanels(dialogEl, billing) {
    if (!dialogEl) return;
    const monthly = dialogEl.querySelector('[data-tabpanel="Monthly"]');
    const yearly = dialogEl.querySelector('[data-tabpanel="Yearly"]');
    if (!monthly || !yearly) return;
    const isMonthly = billing === 'Monthly';
    monthly.classList.toggle('hidden', !isMonthly);
    yearly.classList.toggle('hidden', isMonthly);
}
