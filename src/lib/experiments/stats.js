// Experiment evaluation with established, conservative methods:
// - fixed-horizon two-proportion z-tests against the baseline, sample size planned before launch;
// - Bonferroni correction across challengers (at most two);
// - Haybittle–Peto interim boundary (|z| ≥ interimZ, default 3.29 ≈ p < 0.001) so repeated
//   looks before the planned sample cannot produce a decision at the nominal alpha;
// - a chi-square sample-ratio-mismatch (SRM) check that blocks interpretation when allocation
//   does not match the configured weights.
// Results below the planned sample are reported as "collecting", never as wins.

// Standard normal CDF (Abramowitz & Stegun 7.1.26 erf approximation, |error| < 1.5e-7).
export function normalCdf(z) {
    const x = Math.abs(z) / Math.SQRT2;
    const t = 1 / (1 + 0.3275911 * x);
    const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
    const erf = 1 - poly * Math.exp(-x * x);
    return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
}

// Inverse standard normal CDF (Acklam's rational approximation).
export function normalQuantile(p) {
    if (p <= 0 || p >= 1) throw new Error('p must be in (0, 1)');
    const a = [
        -39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716,
        2.506628277459239,
    ];
    const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
    const c = [
        -0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968,
        2.938163982698783,
    ];
    const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
    const low = 0.02425;
    if (p < low) {
        const q = Math.sqrt(-2 * Math.log(p));
        return (
            (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
            ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
        );
    }
    if (p > 1 - low) return -normalQuantile(1 - p);
    const q = p - 0.5;
    const r = q * q;
    return (
        ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
}

// Visitors needed per arm to detect a relative lift `mdeRelative` over `baselineRate`.
export function sampleSizePerArm({ baselineRate, mdeRelative, alpha, power }) {
    const p1 = baselineRate;
    const p2 = Math.min(0.9999, baselineRate * (1 + mdeRelative));
    if (!(p1 > 0 && p1 < 1) || p2 === p1) return null;
    const zAlpha = normalQuantile(1 - alpha / 2);
    const zBeta = normalQuantile(power);
    const pBar = (p1 + p2) / 2;
    const numerator = zAlpha * Math.sqrt(2 * pBar * (1 - pBar)) + zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
    return Math.ceil((numerator * numerator) / ((p2 - p1) * (p2 - p1)));
}

export function twoProportion(x1, n1, x2, n2, alpha) {
    if (!n1 || !n2) return null;
    const p1 = x1 / n1;
    const p2 = x2 / n2;
    const pooled = (x1 + x2) / (n1 + n2);
    const sePooled = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
    const z = sePooled ? (p2 - p1) / sePooled : 0;
    const seDiff = Math.sqrt((p1 * (1 - p1)) / n1 + (p2 * (1 - p2)) / n2);
    const zCrit = normalQuantile(1 - alpha / 2);
    return {
        diff: p2 - p1,
        relativeLift: p1 ? (p2 - p1) / p1 : null,
        z,
        pValue: 2 * (1 - normalCdf(Math.abs(z))),
        ci: [p2 - p1 - zCrit * seDiff, p2 - p1 + zCrit * seDiff],
    };
}

// Chi-square goodness of fit of observed arm counts against weights (df = arms - 1, ≤ 2).
export function sampleRatioMismatch(counts, weights) {
    const total = counts.reduce((s, c) => s + c, 0);
    const weightSum = weights.reduce((s, w) => s + w, 0);
    if (total < 100 || !weightSum) return { checked: false, total };
    const chi = counts.reduce((sum, observed, i) => {
        const expected = (total * weights[i]) / weightSum;
        return expected ? sum + (observed - expected) ** 2 / expected : sum;
    }, 0);
    const df = counts.length - 1;
    const pValue = df === 1 ? 2 * (1 - normalCdf(Math.sqrt(chi))) : Math.exp(-chi / 2);
    return { checked: true, total, chi, pValue, mismatch: pValue < 0.001 };
}

// arms: [{ key, baseline, weight, n, x }] using customer traffic only.
export function evaluate(arms, { alpha, power, mdeRelative, baselineRate, interimZ }) {
    const baseline = arms.find((a) => a.baseline);
    const challengers = arms.filter((a) => !a.baseline);
    const adjustedAlpha = alpha / Math.max(1, challengers.length);
    const plannedPerArm = baselineRate
        ? sampleSizePerArm({ baselineRate, mdeRelative, alpha: adjustedAlpha, power })
        : null;
    const srm = sampleRatioMismatch(
        arms.map((a) => a.n),
        arms.map((a) => a.weight)
    );
    const reachedPlan = plannedPerArm ? arms.every((a) => a.n >= plannedPerArm) : false;

    const comparisons = challengers.map((arm) => {
        const test = baseline ? twoProportion(baseline.x, baseline.n, arm.x, arm.n, adjustedAlpha) : null;
        let verdict = 'collecting';
        let explanation = plannedPerArm
            ? `Planned sample is ${plannedPerArm} visitors per arm; interim looks are not decisions.`
            : 'Set a baseline conversion rate to plan the sample size.';
        if (srm.mismatch) {
            verdict = 'invalid';
            explanation =
                'Allocation does not match the configured weights (sample ratio mismatch). Fix tracking before reading results.';
        } else if (!test || baseline.n < 30 || arm.n < 30) {
            verdict = 'insufficient_data';
            explanation = 'Fewer than 30 customer visitors in an arm.';
        } else if (Math.abs(test.z) >= interimZ) {
            verdict = test.z < 0 ? 'harmful' : 'better';
            explanation = `Crossed the interim boundary (|z| ≥ ${interimZ}).`;
        } else if (reachedPlan) {
            if (test.pValue < adjustedAlpha) verdict = test.diff > 0 ? 'better' : 'worse';
            else verdict = 'inconclusive';
            explanation = `Planned sample reached; Bonferroni-adjusted alpha ${adjustedAlpha.toFixed(4)}.`;
        }
        return { key: arm.key, test, verdict, explanation };
    });

    return { adjustedAlpha, plannedPerArm, reachedPlan, srm, comparisons };
}
