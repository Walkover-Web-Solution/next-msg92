import { MdSecurity, MdTune, MdPower, MdLogin, MdPeople, MdNotificationsActive } from 'react-icons/md';

const iconMap = {
    MdSecurity,
    MdTune,
    MdPower,
    MdLogin,
    MdPeople,
    MdNotificationsActive,
};

export default function BenefitSection({ data }) {
    return (
        <div className='container cont_p cont cont_gap items-center'>
            {/* Heading */}
            <div className='cont justify-center items-center cont_w text-center'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>{data?.heading}</h2>

                <p className='text-lg mb-2'>{data?.subheading}</p>
            </div>

            {/* Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cont_gap w-full'>
                {data?.cards?.map((item, index) => {
                    const Icon = iconMap[item?.icon];

                    return (
                        <div key={index} className='border rounded-xl p-6 bg-base-100 min-h-[240px] flex flex-col'>
                            {/* Icon */}
                            <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-6'>
                                {Icon && <Icon size={21} className='text-blue-600' />}
                            </div>

                            {/* Card content */}
                            <h3 className='text-lg font-semibold leading-snug mb-2'>{item?.heading}</h3>

                            <p className='text-base text-gray-500 leading-relaxed'>{item?.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
