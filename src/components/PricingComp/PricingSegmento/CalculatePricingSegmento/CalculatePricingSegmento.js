import { useState } from 'react';

export default function CalculatePricingSegmento({ plans, currency, symbol, tabtype }) {
    console.log('⚡️ ~ CalculatePricingSegmento.js:4 ~ CalculatePricingSegmento ~ plans:', plans);
    const [inputEmails, setInputEmails] = useState('');
    const [contacts, setContacts] = useState('');
    const [inputEmailValidations, setInputEmailValidations] = useState('');
    const [isCalculate, setIsCalculate] = useState(false);
    const contvertToLocal = (number) => {
        if (currency === 'INR') {
            {
                return Number(number).toLocaleString('en-IN');
            }
        } else {
            {
                return Number(number).toLocaleString('en-US');
            }
        }
    };
    return (
        <>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-4 items-end'>
                        <label className='form-control w-full max-w-xs flex flex-col gap-1'>
                            <span className='font-semibold text-sm'>Contacts</span>
                            <input
                                value={contacts}
                                type='number'
                                placeholder='Enter No. of Contacts'
                                className='input  input-bordered w-full max-w-xs'
                                onChange={(e) => setContacts(e.target.value)}
                            />
                        </label>
                        <button
                            className='btn btn-primary '
                            onClick={() => {
                                setIsCalculate(true);
                            }}
                        >
                            Calculate
                        </button>
                    </div>
                </div>{' '}
                {isCalculate && (
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1 py-2'>
                            <h3 className='px-4 font-medium text-gray-500'>Included Benefits</h3>
                            <div className='grid grid-cols-4 bg-gray'>
                                <div className='p-4 border-e-2 flex flex-col gap-4'>
                                    <h4>Plan</h4>
                                    <h4>Plan charges</h4>
                                </div>
                                {plans?.map((plan, index) => {
                                    if (plan.name !== 'Free') {
                                        return (
                                            <div key={index} className='p-4 border-e-2 flex flex-col gap-4'>
                                                <p>{plan?.name}</p>
                                                <p className='font-semibold'>
                                                    {symbol}
                                                    {fetchPlanAmmount(tabtype, currency, plan?.plan_amounts)}
                                                </p>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        {/*
                        <div className='flex flex-col gap-1 py-2'>
                            <h3 className='px-4 font-medium text-gray-500'>Plan details</h3>
                            <div className='grid grid-cols-4 bg-gray'>
                                <div className='p-4 border-e-2 flex flex-col gap-4'>
                                    <h4>Emails</h4>
                                    <h4>Email Validations</h4>
                                </div>
                                {plans?.map((plan, index) => {
                                    if (plan.name !== 'Free') {
                                        return (
                                            <div key={index} className='p-4 border-e-2 flex flex-col gap-4'>
                                                <p>
                                                    {contvertToLocal(
                                                        plan?.plan_services[0]?.service_credit?.free_credits
                                                    )}
                                                </p>
                                                <p className=''>
                                                    {contvertToLocal(
                                                        plan?.plan_services[1]?.service_credit?.free_credits
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 py-2'>
                            <h3 className='px-4 font-medium text-gray-500'>Calculations</h3>
                            <div className='grid grid-cols-4 bg-gray'>
                                <div className='p-4 border-e-2 flex flex-col gap-4'>
                                    <h4>Extra Emails</h4>
                                    <h4 className='mb-6'>Extra Emails Charges</h4>
                                    <h4>Extra Emails Validations</h4>
                                    <h4>Extra Email Validations Charges</h4>
                                </div>
                                {plans?.map((plan, index) => {
                                    if (plan.name !== 'Free') {
                                        return (
                                            <div key={index} className='p-4 border-e-2 flex flex-col gap-4'>
                                                <p className='break-words'>
                                                    {contvertToLocal(
                                                        inputEmails >
                                                            plan?.plan_services[0]?.service_credit?.free_credits
                                                            ? inputEmails -
                                                                  plan?.plan_services[0]?.service_credit?.free_credits
                                                            : 0
                                                    )}
                                                </p>
                                                <p className=' flex flex-col break-words'>
                                                    {contvertToLocal(
                                                        inputEmails >
                                                            plan?.plan_services[0]?.service_credit?.free_credits
                                                            ? inputEmails -
                                                                  plan?.plan_services[0]?.service_credit?.free_credits
                                                            : 0
                                                    )}{' '}
                                                    x{' '}
                                                    {
                                                        plan?.plan_services[0]?.service_credit?.service_credit_rates.find(
                                                            (rate) => {
                                                                return rate?.currency?.short_name === currency;
                                                            }
                                                        )?.follow_up_rate
                                                    }{' '}
                                                    <span className='font-bold break-words'>
                                                        ={' '}
                                                        {contvertToLocal(
                                                            (inputEmails >
                                                            plan?.plan_services[0]?.service_credit?.free_credits
                                                                ? inputEmails -
                                                                  plan?.plan_services[0]?.service_credit?.free_credits
                                                                : 0) *
                                                                plan?.plan_services[0]?.service_credit?.service_credit_rates?.find(
                                                                    (rate) => {
                                                                        return rate?.currency?.short_name === currency;
                                                                    }
                                                                )?.follow_up_rate
                                                        )}
                                                    </span>
                                                </p>
                                                <p className='break-words'>
                                                    {contvertToLocal(
                                                        inputEmailValidations >
                                                            plan?.plan_services[1]?.service_credit?.free_credits
                                                            ? inputEmailValidations -
                                                                  plan?.plan_services[1]?.service_credit?.free_credits
                                                            : 0
                                                    )}
                                                </p>
                                                <p className='flex flex-col break-words'>
                                                    {contvertToLocal(
                                                        inputEmailValidations >
                                                            plan?.plan_services[1]?.service_credit?.free_credits
                                                            ? inputEmailValidations -
                                                                  plan?.plan_services[1]?.service_credit?.free_credits
                                                            : 0
                                                    )}{' '}
                                                    x{' '}
                                                    {
                                                        plan?.plan_services[1]?.service_credit?.service_credit_rates.find(
                                                            (rate) => {
                                                                return rate?.currency?.short_name === currency;
                                                            }
                                                        )?.follow_up_rate
                                                    }{' '}
                                                    <span className='font-bold break-words'>
                                                        ={' '}
                                                        {contvertToLocal(
                                                            (inputEmailValidations >
                                                            plan?.plan_services[1]?.service_credit?.free_credits
                                                                ? inputEmailValidations -
                                                                  plan?.plan_services[1]?.service_credit?.free_credits
                                                                : 0) *
                                                                plan?.plan_services[1]?.service_credit?.service_credit_rates?.find(
                                                                    (rate) => {
                                                                        return rate?.currency?.short_name === currency;
                                                                    }
                                                                )?.follow_up_rate
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <div className='grid grid-cols-4 bg-gray'>
                            <p className='p-4 border-e-2'>Total monthly recurring charges</p>
                            {plans?.map((plan, index) => {
                                if (plan?.name !== 'Free') {
                                    return (
                                        <p className='p-4 border-e-2 font-bold text-green-600 text-2xl flex flex-col break-words'>
                                            {symbol}
                                            {contvertToLocal(
                                                Number(
                                                    (inputEmailValidations >
                                                    plan?.plan_services[1]?.service_credit?.free_credits
                                                        ? inputEmailValidations -
                                                          plan?.plan_services[1]?.service_credit?.free_credits
                                                        : 0) *
                                                        plan?.plan_services[1]?.service_credit?.service_credit_rates?.find(
                                                            (rate) => {
                                                                return rate?.currency?.short_name === currency;
                                                            }
                                                        )?.follow_up_rate
                                                ) +
                                                    Number(
                                                        (inputEmails >
                                                        plan?.plan_services[0]?.service_credit?.free_credits
                                                            ? inputEmails -
                                                              plan?.plan_services[0]?.service_credit?.free_credits
                                                            : 0) *
                                                            plan?.plan_services[0]?.service_credit?.service_credit_rates?.find(
                                                                (rate) => {
                                                                    return rate?.currency?.short_name === currency;
                                                                }
                                                            )?.follow_up_rate
                                                    ) +
                                                    Number(fetchPlanAmmount(tabtype, currency, plan?.plan_amounts))
                                            )}
                                            {currency === 'INR' && (
                                                <span className='font-normal text-sm text-gray-500'>+18% GST</span>
                                            )}
                                            {currency === 'GBP' && (
                                                <span className='font-normal text-sm text-gray-500'>+VAT</span>
                                            )}
                                        </p>
                                    );
                                }
                            })}
                        </div>
                           */}{' '}
                    </div>
                )}
            </div>
        </>
    );
}
const fetchPlanAmmount = (tabtype, currency, ammounts) => {
    const amount = ammounts.find(
        (ammount) => ammount?.currency?.short_name === currency && ammount?.plan_type?.name === tabtype
    );
    return amount ? amount.plan_amount : '-';
};

const checkPlanType = ({ plans, contacts }) => {
    return;
};
