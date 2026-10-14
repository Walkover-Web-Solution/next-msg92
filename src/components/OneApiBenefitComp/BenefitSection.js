import * as MdIcons from 'react-icons/md';

export default function BenefitSection({ data }) {
    if (!data) return null;

    return (
        <div className='container cont_p cont cont_gap items-center'>
            <div className='text-center mx-auto flex flex-col gap-4 max-w-4xl'>
                <h2 className='heading font-semibold my-2'>{data?.heading}</h2>

                {data?.subheading && <p className='text-lg my-2'>{data.subheading}</p>}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cont_gap w-full'>
                {data?.cards?.map((item, index) => {
                    const Icon = MdIcons[item.icon];

                    return (
                        <div key={index} className='border rounded-xl p-6 bg-base-100 min-h-[240px] flex flex-col'>
                            <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center my-2'>
                                {Icon && <Icon size={21} className='text-blue-600' />}
                            </div>

                            <h3 className='text-lg font-semibold leading-snug my-2'>{item?.heading}</h3>

                            <p className='text-base text-gray-500 leading-relaxed'>{item?.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
