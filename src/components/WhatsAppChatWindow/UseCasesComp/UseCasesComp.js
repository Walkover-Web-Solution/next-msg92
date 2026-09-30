import {
    MdLocalShipping,
    MdTrendingUp,
    MdPayment,
    MdHeadsetMic,
    MdOutlinePersonAdd,
    MdSearch,
    MdCheckCircle,
} from 'react-icons/md';

const useCaseIcons = {
    package: <MdLocalShipping className='h-6 w-6' />,
    target: <MdTrendingUp className='h-6 w-6' />,
    card: <MdPayment className='h-6 w-6' />,
    headphones: <MdHeadsetMic className='h-6 w-6' />,
    userPlus: <MdOutlinePersonAdd className='h-6 w-6' />,
    search: <MdSearch className='h-6 w-6' />,
};

const ucGradients = [
    'from-emerald-50 to-teal-50',
    'from-blue-50 to-indigo-50',
    'from-cyan-50 to-blue-50',
    'from-purple-50 to-fuchsia-50',
    'from-teal-50 to-emerald-50',
    'from-rose-50 to-orange-50',
];

export default function WhatsAppUseCasesComp({ data }) {
    if (!data) return null;

    return (
        <section id='use-cases' className='bg-slate-50/70 border-y border-gray-100'>
            <div className='container cont_p'>
                <div className='text-center mb-16'>
                    <h2 className='heading text-[#18181B] tracking-tight mb-4'>
                        {data?.heading_prefix}
                        <span className='text-[#1E75BA]'>{data?.heading_accent}</span>
                    </h2>

                    <p className='subheading text-[#4B5563] max-w-2xl mx-auto font-normal'>{data?.subheading}</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7'>
                    {data?.useCases?.map((useCase, index) => (
                        <div
                            key={index}
                            className='group bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between'
                        >
                            <div
                                className={`h-32 w-full bg-gradient-to-br ${
                                    ucGradients[index % ucGradients.length]
                                } p-4 flex items-center justify-between relative border-b border-gray-100`}
                            >
                                <div className='w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#1E75BA]'>
                                    {useCaseIcons[useCase?.icon] || <MdCheckCircle className='h-6 w-6' />}
                                </div>
                                {useCase?.tag && (
                                    <span
                                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-2xs backdrop-blur-md ${
                                            useCase?.chipColor || 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        }`}
                                    >
                                        {useCase.tag}
                                    </span>
                                )}
                            </div>

                            <div className='p-6 flex-1 flex flex-col justify-between'>
                                <div>
                                    <h3 className='font-semibold text-base sm:text-lg text-[#18181B] mb-2'>
                                        {useCase?.title}
                                    </h3>
                                    <p className='text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal mb-5'>
                                        {useCase?.desc}
                                    </p>
                                </div>

                                {useCase?.stat && (
                                    <div className='pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#529837] font-medium'>
                                        <span className='flex items-center gap-1.5'>
                                            <MdCheckCircle className='w-3.5 h-3.5' />
                                            {useCase.stat}
                                        </span>
                                        <span className='text-gray-400 group-hover:text-[#1E75BA] group-hover:translate-x-0.5 transition-all'>
                                            →
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
