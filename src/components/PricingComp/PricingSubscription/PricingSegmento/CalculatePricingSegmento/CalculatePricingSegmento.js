import InfoIcon from '@/components/UIComponent/InfoIcon/InfoIcon';
import contvertToLocal from '@/utils/convertToLocal';
import { useState } from 'react';

export default function CalculatePricingSegmento({ plans, currency, symbol, tabtype }) {
    const [plansToShow, setPlansToShow] = useState([]);
    const [contacts, setContacts] = useState(10000);
    const [contactsInput, setContactsInput] = useState(10000);
    const [isCalculate, setIsCalculate] = useState(false);

    const calculatePricing = () => {
        if (contactsInput > 9999) {
            setIsCalculate(true);
            setContacts(contactsInput);
            setPlansToShow(getShowPlans(plans, contactsInput));
        } else {
            alert(' Contact value required more than 10000');
        }
    };
    return (
        <>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-4 items-end'>
                        <label className='form-control w-full max-w-xs flex flex-col gap-1'>
                            <span className='font-semibold'>Contacts</span>
                            <input
                                value={contactsInput}
                                type='number'
                                placeholder='Enter No. of Contacts'
                                className='input input-bordered w-full max-w-xs'
                                onChange={(e) => setContactsInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        calculatePricing();
                                    }
                                }}
                            />
                            {contactsInput < 10000 ? (
                                <span className='text-gray-500 text-[8px]'>*Min Value 10000</span>
                            ) : (
                                <div className='text-white text-[8px]'>0 </div>
                            )}
                        </label>
                        <div className='flex flex-col gap-1'>
                            <button
                                className='btn btn-primary '
                                onClick={() => {
                                    calculatePricing();
                                }}
                            >
                                Calculate
                            </button>
                            <div className='text-white text-[8px]'>0 </div>
                        </div>
                    </div>
                </div>{' '}
                {isCalculate && (
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1 py-2'>
                            <h3 className='px-4 font-medium text-gray-500'>Included Benefits</h3>
                            <div className='grid grid-cols-4 bg-gray'>
                                <div className='p-4 border-e-2 flex flex-col gap-4'>
                                    <span>Plan</span>
                                    <span>Plan charges</span>
                                </div>
                                {plansToShow?.map((plan, index) => {
                                    return (
                                        <div key={index} className='p-4 border-e-2 flex flex-col gap-4'>
                                            <p>{plan?.name}</p>
                                            <p className='font-semibold'>
                                                {symbol}
                                                {fetchPlanAmmount(tabtype, plan?.amount)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 py-2'>
                            <h3 className='px-4 font-medium text-gray-500'>Plan details</h3>
                            <div className='grid grid-cols-4 bg-gray'>
                                <div className='p-4 border-e-2 flex flex-col gap-4'>
                                    <span>Contacts</span>
                                </div>
                                {plansToShow?.map((plan, index) => {
                                    return (
                                        <div key={index} className='p-4 border-e-2 flex flex-col gap-4'>
                                            <p>{contvertToLocal(plan?.included[0]?.amount)}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 py-2'>
                            <h3 className='px-4 font-medium text-gray-500'>Calculations</h3>
                            <div className='grid grid-cols-4 bg-gray'>
                                <div className='p-4 border-e-2 flex flex-col gap-4'>
                                    <span>Extra Contacts</span>
                                    <span>Extra Bundle</span>
                                    <span className='mb-6'>Extra Charges</span>
                                </div>
                                {plansToShow?.map((plan, index) => {
                                    const extraContact = Number(contacts) - Number(plan?.included[0]?.amount);
                                    const extraChunks = calculateChunks(extraContact, plan?.extras[0]?.chunk);
                                    return (
                                        <div key={index} className='p-4 border-e-2 flex flex-col gap-4'>
                                            <p>{contvertToLocal(extraContact > 0 ? extraContact : '0')}</p>
                                            <p className='flex gap-1 items-center'>
                                                {contvertToLocal(extraChunks > 0 ? extraChunks : '0')}{' '}
                                                {extraChunks > 0 && <InfoIcon content={'1 Bundle = 1000 Contact'} />}
                                            </p>
                                            <p>
                                                {extraContact > 0 ? (
                                                    <span className='flex flex-col'>
                                                        <span className='flex gap-1 items-center'>
                                                            {contvertToLocal(extraChunks)} X {plan?.extras[0]?.rate}
                                                        </span>
                                                        <span className='text-green-600'>
                                                            = {symbol}
                                                            {contvertToLocal(extraChunks * plan?.extras[0]?.rate)}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span className='text-green-600'>0</span>
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className='grid grid-cols-4 bg-gray'>
                            <p className='p-4 border-e-2'>Total Monthly Charges</p>
                            {plansToShow?.map((plan, index) => {
                                const extraContact = Number(contacts) - Number(plan?.included[0]?.amount);
                                const extraChunks = calculateChunks(extraContact, plan?.extras[0]?.chunk);
                                const extraContactCharge = extraChunks > 0 ? extraChunks * plan?.extras[0]?.rate : 0;
                                const totalCharge = plan?.amount[0] + extraContactCharge;
                                return (
                                    <p className='p-4 border-e-2 font-bold text-green-600 text-2xl flex flex-col break-words'>
                                        {symbol}
                                        {contvertToLocal(totalCharge)}
                                        {currency === 'INR' && (
                                            <span className='font-normal text-sm text-gray-500'>+18% GST</span>
                                        )}
                                        {currency === 'GBP' && (
                                            <span className='font-normal text-sm text-gray-500'>+VAT</span>
                                        )}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
const fetchPlanAmmount = (tabtype, ammounts) => {
    return ammounts && ammounts?.length > 0 ? (tabtype === 'Yearly' ? ammounts[1] : ammounts[0]) : null;
};

const getShowPlans = (plans, contacts) => {
    const less = ['Starter', 'Cruiser', 'Turbo'];
    const more = ['Turbo', 'Nitro', 'Supersonic'];
    const plansToShow =
        contacts < 100000
            ? plans?.filter((plan) => less.includes(plan?.name))
            : plans?.filter((plan) => more?.includes(plan.name));
    return plansToShow;
};

const calculateChunks = (value, chunkSize) => {
    let noOfChunks;
    if (value % chunkSize > 0) {
        noOfChunks = parseInt(value / chunkSize) + 1;
    } else {
        noOfChunks = parseInt(value / chunkSize);
    }
    return noOfChunks;
};
