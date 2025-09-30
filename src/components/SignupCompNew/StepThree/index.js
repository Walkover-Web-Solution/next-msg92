import getServices from '@/utils/getServices';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { setDetails, useSignup } from '../SignupUtils';

export default function StepThree({ data }) {
    const { state, dispatch } = useSignup();
    console.log('⚡️ ~ :9 ~ StepThree ~ state:', state);
    const [services, setServices] = useState({});
    const [slectedServices, setSlectedServices] = useState([]);
    const [source, setSource] = useState('');

    useEffect(() => {
        const servicesData = getServices();
        servicesData.then((response) => {
            setServices(response.data.data);
        });
    }, []);

    useEffect(() => {
        setDetails('services', dispatch, slectedServices);
    }, [slectedServices]);

    useEffect(() => {
        setDetails('source', dispatch, source);
    }, [source]);

    function handleServiceClick(key) {
        if (slectedServices.includes(key)) {
            setSlectedServices(slectedServices.filter((item) => item !== key));
        } else {
            setSlectedServices([...slectedServices, key]);
        }
    }

    function handleSourceChange(value) {
        setSource(value);
    }

    return (
        <div className='cont cont_gap'>
            <Image width={160} height={80} className='w-fit h-12' src={'/assets/brand/msg91.svg'} alt='MSG91 Logo' />
            <div className='cont gap-2'>
                <span className='text-green-600'>Account Created Successfully!</span>
                <h1 className='text-2xl text-primary'>Welcome to MSG91</h1>
            </div>
            <div className='cont gap-6'>
                <p>Tell us a bit more about yourself to personalize your journey.</p>
                <div className='cont gap-3'>
                    <div className='cont gap-1'>
                        <h2 className='text-lg font-medium text-gray-600'>Which service are you interested in?</h2>
                        <div className='flex flex-wrap gap-2'>
                            {Object.entries(services).length > 0 &&
                                Object.entries(services).map(([key, value]) => (
                                    <div
                                        onClick={() => handleServiceClick(key)}
                                        key={key}
                                        className={`border w-fit ps-2 pe-1 py-1 rounded text-sm flex items-center gap-1 cursor-pointer ${
                                            slectedServices.includes(key)
                                                ? 'bg-green-50 hover:bg-green-100'
                                                : 'hover:bg-green-50'
                                        }`}
                                    >
                                        <span className='text-gray-600'>{value}</span>
                                        {slectedServices.includes(key) && (
                                            <button>
                                                <MdClose />
                                            </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className='cont gap-1'>
                        <h2 className='text-lg font-medium text-gray-600'>Where did you hear about us?</h2>
                        <select
                            className='select select-bordered w-full min-w-[320px] max-w-[420px]'
                            onChange={(e) => handleSourceChange(e.target.value)}
                        >
                            <option value=''>Select</option>
                            {Object.entries(data?.source).map(([key, value]) => (
                                <option value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
