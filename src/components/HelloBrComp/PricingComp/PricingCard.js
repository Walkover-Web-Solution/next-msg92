import React from 'react';
import { MdArrowForward, MdCheck, MdClose, MdStar } from 'react-icons/md';
import { computeDiscountedAmount, isUnlimitedFreeCreditValue, serviceHasDialPlan } from './pricingUtils';

export default function PricingCard({ plan, billing, symbol, locale, signupHref, meta, featured }) {
    const services = plan?.services ?? [];
    const features = plan?.features ?? [];

    const includedServices = services.filter(
        (s) => s?.freeCredit != null && s?.freeCredit !== 0 && !serviceHasDialPlan(s)
    );
    const dialPlanServicesWithCredit = services.filter(
        (s) =>
            serviceHasDialPlan(s) &&
            s?.freeCredit != null &&
            (Number(s?.freeCredit) > 0 || isUnlimitedFreeCreditValue(s?.freeCredit))
    );
    const dialPlanServicesNoCredit = services.filter(
        (s) =>
            serviceHasDialPlan(s) &&
            !(s?.freeCredit != null && (Number(s?.freeCredit) > 0 || isUnlimitedFreeCreditValue(s?.freeCredit)))
    );
    const extraServices = services.filter(
        (s) => !serviceHasDialPlan(s) && !(s?.freeCredit === -1 || s?.freeCredit === '-1')
    );

    const hasIncluded = includedServices.length > 0 || dialPlanServicesWithCredit.length > 0;
    const hasOverage =
        extraServices.length > 0 || dialPlanServicesNoCredit.length > 0 || dialPlanServicesWithCredit.length > 0;

    const amount = plan?.amount;
    const discounted = computeDiscountedAmount(amount, plan?.discount);
    const effective = discounted != null ? discounted : amount;
    const isFree = !effective || Number(effective) === 0;
    const discountDuration = plan?.discount?.[0]?.duration ?? 0;
    const suffix =
        discountDuration > 0 ? `/ mo for ${discountDuration}mo` : billing === 'Monthly' ? '/ month' : '/ year';

    const bigPrice = isFree ? (
        <>
            <span className='text-xl font-bold text-gray-900'>{symbol}</span>
            <span className='text-4xl font-extrabold tracking-tight text-gray-900'>0</span>
        </>
    ) : (
        <>
            <span className='text-xl font-bold text-gray-900'>{symbol}</span>
            <span className='text-4xl font-extrabold tracking-tight text-gray-900'>
                {Number(effective).toLocaleString(locale)}
            </span>
        </>
    );

    const description = meta.description || '';
    const ctaLabel = meta.cta || 'Get started';
    const ctaVariant = meta.ctaVariant || (featured ? 'indigo' : 'dark');

    const btnClass =
        ctaVariant === 'indigo'
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500'
            : 'bg-gray-900 text-white hover:bg-gray-800';

    return (
        <div
            className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 pt-8 shadow-sm transition ${
                featured
                    ? 'border-indigo-200 shadow-lg shadow-indigo-100 ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
        >
            {featured && (
                <div className='absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white'>
                    <MdStar className='h-3.5 w-3.5' aria-hidden />
                    {meta.badge || 'Most popular'}
                </div>
            )}
            <div className='min-h-[122px]'>
                <h3 className='mb-2 text-lg font-bold text-gray-900'>{plan?.name}</h3>
                <div className='mb-1 flex flex-wrap items-baseline gap-1'>
                    {bigPrice}
                    <span className='text-sm font-medium text-gray-500'>{suffix}</span>
                </div>
                {discounted != null && !isFree && (
                    <p className='mb-3 text-xs text-gray-500'>
                        Then {symbol}
                        {Number(amount).toLocaleString(locale)}/month
                    </p>
                )}
                {description && <p className='min-h-[48px] text-sm text-gray-600'>{description}</p>}
                {!description && <div className='min-h-[48px]' />}
            </div>

            <a
                href={signupHref}
                target='_blank'
                rel='noopener noreferrer'
                className={`mb-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${btnClass}`}
            >
                {ctaLabel}
                <MdArrowForward className='h-4 w-4' aria-hidden />
            </a>

            <div className='mb-4 h-px w-full bg-gray-100' />

            <div className='flex flex-1 flex-col gap-4'>
                {hasIncluded && (
                    <div className='min-h-[106px]'>
                        <p className='mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500'>
                            Included
                        </p>
                        <ul className='flex flex-col gap-2'>
                            {includedServices.map((service, i) => {
                                const qty = service?.freeCredit;
                                const isUnlimited = isUnlimitedFreeCreditValue(qty);
                                const displayQty = isUnlimited
                                    ? 'Unlimited'
                                    : qty != null
                                      ? `${Number(qty).toLocaleString(locale)} / month`
                                      : null;
                                return (
                                    <li key={i} className='flex items-start gap-2 text-sm text-gray-700'>
                                        <MdCheck className='mt-0.5 h-4 w-4 shrink-0 text-emerald-600' aria-hidden />
                                        <span>{displayQty ? `${displayQty} ${service?.name}` : service?.name}</span>
                                    </li>
                                );
                            })}
                            {dialPlanServicesWithCredit.map((service, i) => {
                                const walletCredit = service?.freeCredit;
                                const isUnlimited = isUnlimitedFreeCreditValue(walletCredit);
                                return (
                                    <li key={`dp-inc-${i}`} className='flex items-start gap-2 text-sm text-gray-700'>
                                        <MdCheck className='mt-0.5 h-4 w-4 shrink-0 text-emerald-600' aria-hidden />
                                        <span>
                                            {isUnlimited
                                                ? `Unlimited ${service?.name}`
                                                : `${symbol}${Number(walletCredit).toLocaleString(locale)} ${service?.name} wallet`}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {hasOverage && (
                    <div className='min-h-[106px]'>
                        <p className='mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500'>
                            Extra charges
                        </p>
                        <ul className='flex flex-col gap-2'>
                            {extraServices.map((service, i) => {
                                const rate = service?.followUpRate;
                                const chunkSize = service?.chunkSize ?? 1;
                                const hasRate = rate != null && Number(rate) > 0;
                                const isNotAllowed = !service?.postPaidAllowed || !hasRate;
                                const unitLabel = chunkSize > 1 ? `${chunkSize} units` : 'unit';
                                return (
                                    <li key={i} className='flex items-start gap-2 text-sm text-gray-700'>
                                        <MdCheck className='mt-0.5 h-4 w-4 shrink-0 text-emerald-600' aria-hidden />
                                        <span>
                                            {isNotAllowed
                                                ? `${service?.name}: Not allowed`
                                                : `${service?.name}: ${symbol}${Number(rate)} / ${unitLabel} / month`}
                                        </span>
                                    </li>
                                );
                            })}
                            {[...dialPlanServicesWithCredit, ...dialPlanServicesNoCredit].map((service, i) => {
                                const hasWalletCredit = service?.freeCredit != null && Number(service.freeCredit) > 0;
                                const isDemoOnly = hasWalletCredit && !service?.postPaidAllowed;
                                return (
                                    <li key={`dp-extra-${i}`} className='flex items-start gap-2 text-sm text-gray-700'>
                                        <MdCheck className='mt-0.5 h-4 w-4 shrink-0 text-emerald-600' aria-hidden />
                                        <span>
                                            {service?.name}: {isDemoOnly ? 'Demo only' : 'As per rate card'}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {features.length > 0 && (
                    <div className='min-h-[178px]'>
                        <p className='mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500'>
                            Features
                        </p>
                        <ul className='flex flex-col gap-2'>
                            {features.slice(0, 5).map((feature, i) => (
                                <li key={i} className='flex items-start gap-2 text-sm text-gray-700'>
                                    {feature?.included ? (
                                        <MdCheck className='mt-0.5 h-4 w-4 shrink-0 text-emerald-600' aria-hidden />
                                    ) : (
                                        <MdClose className='mt-0.5 h-4 w-4 shrink-0 text-gray-300' aria-hidden />
                                    )}
                                    <span>{feature?.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
