import { useRef, useState } from 'react';
import { MdArrowForward, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import MobileOtpField from './MobileOtpField';

const MOBILE_REGEX = /^[+]?[0-9]{7,15}$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function RegistrationForm({ data }) {
    const defaultTravelMode = data?.travel?.options?.[0] || '';
    const [formValues, setFormValues] = useState({ travelMode: defaultTravelMode });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isMobileVerified, setIsMobileVerified] = useState(false);
    const isSubmittingRef = useRef(false);
    const mobileFieldIndex = (data?.fields || []).findIndex((field) => field?.type === 'tel');

    const handleChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmittingRef.current) return;

        const fields = data?.fields || [];

        const mobileField = fields.find((field) => field?.type === 'tel');
        if (mobileField && !MOBILE_REGEX.test(formValues?.[mobileField?.name]?.replace(/\s/g, '') || '')) {
            toast.error(data?.errors?.mobile);
            return;
        }
        if (mobileField && !isMobileVerified) {
            return;
        }
        if (fields.some((field) => !formValues?.[field?.name]?.trim())) {
            toast.error(data?.errors?.required);
            return;
        }
        const emailField = fields.find((field) => field?.type === 'email');
        if (emailField && !EMAIL_REGEX.test(formValues?.[emailField?.name]?.trim())) {
            toast.error(data?.errors?.email);
            return;
        }

        if (!data?.submit_url) {
            setFormValues({ travelMode: defaultTravelMode });
            setIsMobileVerified(false);
            setIsSubmitted(true);
            return;
        }

        isSubmittingRef.current = true;
        setIsLoading(true);
        try {
            const response = await fetch(data.submit_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formValues?.fullName,
                    phone: formValues?.phoneNumber,
                    email: formValues?.email,
                    dob: formValues?.dob,
                    website: formValues?.website,
                    transport: formValues?.travelMode,
                }),
            });
            if (!response?.ok) throw new Error('Sheet submission failed');

            try {
                await fetch('/api/send-summit-whatsapp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formValues?.fullName,
                        phone: formValues?.phoneNumber,
                    }),
                });
            } catch (waError) {
                console.error('[WhatsApp Trigger Error]:', waError);
            }

            setFormValues({ travelMode: defaultTravelMode });
            setIsMobileVerified(false);
            setIsSubmitted(true);
        } catch (error) {
            toast.error(data?.errors?.submit);
        } finally {
            isSubmittingRef.current = false;
            setIsLoading(false);
        }
    };

    return (
        <div className='flex w-full flex-col justify-center p-6 sm:p-10 md:w-7/12 lg:p-14'>
            {isSubmitted ? (
                <div className='my-auto flex flex-col items-center justify-center gap-4 py-8 text-center'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner'>
                        <MdCheckCircle size={40} aria-hidden />
                    </div>
                    <h3 className='text-2xl font-bold text-slate-800'>{data?.success_message}</h3>
                    <p className='max-w-sm text-sm text-slate-600'>{data?.success_description}</p>
                </div>
            ) : (
                <>
                    <h2 className='mb-8 text-center text-xl font-bold uppercase tracking-wider text-slate-800 sm:text-2xl'>
                        {data?.heading}
                    </h2>

                    <form className='mx-auto flex w-full max-w-md flex-col gap-5' onSubmit={handleSubmit}>
                        {(data?.fields || []).map((field, index) => {
                            const isLockedByOtp =
                                mobileFieldIndex > -1 && index > mobileFieldIndex && !isMobileVerified;

                            if (field?.type === 'tel') {
                                return (
                                    <MobileOtpField
                                        key={index}
                                        field={field}
                                        value={formValues?.[field?.name]}
                                        onChange={handleChange}
                                        data={data?.otp}
                                        disabled={isLoading}
                                        onVerifiedChange={setIsMobileVerified}
                                    />
                                );
                            }
                            return (
                                <div key={index} className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-bold text-slate-700' htmlFor={field?.name}>
                                        {field?.label}
                                    </label>
                                    <input
                                        className='input input-bordered w-full bg-white text-sm'
                                        id={field?.name}
                                        name={field?.name}
                                        type={field?.type}
                                        placeholder={field?.placeholder}
                                        value={formValues?.[field?.name] || ''}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        readOnly={isLockedByOtp}
                                    />
                                </div>
                            );
                        })}

                        {data?.travel?.options?.length > 0 && (
                            <div className='flex flex-col gap-2'>
                                <span className='text-xs font-bold text-slate-700'>{data?.travel?.label}</span>
                                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                                    {data?.travel?.options?.map((option, index) => {
                                        return (
                                            <label
                                                key={index}
                                                className='flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 hover:border-accent'
                                            >
                                                <input
                                                    className='radio radio-sm'
                                                    type='radio'
                                                    name='travelMode'
                                                    value={option}
                                                    checked={formValues?.travelMode === option}
                                                    onChange={handleChange}
                                                    disabled={isLoading}
                                                />
                                                <span className='text-sm font-medium text-slate-700'>{option}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='btn btn-accent mt-2 w-full gap-2 rounded-full'
                        >
                            {isLoading ? data?.submitting_btn : data?.submit_btn}
                            <MdArrowForward size={16} aria-hidden />
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
