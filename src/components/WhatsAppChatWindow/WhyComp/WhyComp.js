import { MdLink, MdSmartToy, MdSupportAgent, MdRadio, MdBalance } from 'react-icons/md';

const whyIcons = {
    link: <MdLink className='h-6 w-6' />,
    bot: <MdSmartToy className='h-6 w-6' />,
    agent: <MdSupportAgent className='h-6 w-6' />,
    radio: <MdRadio className='h-6 w-6' />,
    scale: <MdBalance className='h-6 w-6' />,
};

export default function WhatsAppWhyComp({ data }) {
    if (!data) return null;

    const reasons = data?.reasons || [];
    const row1 = reasons.slice(0, 3);
    const row2 = reasons.slice(3, 5);

    const renderCard = (reason, index) => (
        <div
            key={index}
            className='bg-white rounded-3xl border border-gray-200/90 shadow-sm p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between'
        >
            <div>
                <div className='w-11 h-11 rounded-2xl bg-[#529837]/10 flex items-center justify-center text-[#529837] mb-5 shadow-2xs'>
                    {whyIcons[reason?.icon] || <MdLink className='h-6 w-6' />}
                </div>
                <h3 className='font-semibold text-lg text-[#18181B] mb-2'>{reason?.title}</h3>
                <p className='text-[#4B5563] text-xs sm:text-sm leading-relaxed font-normal'>{reason?.desc}</p>
            </div>
        </div>
    );

    return (
        <section className='bg-white'>
            <div className='container cont_p'>
                <div className='text-center mb-16'>
                    <h2 className='heading text-[#18181B] tracking-tight mb-4'>
                        {data?.heading_prefix}
                        <span className='text-[#529837]'>{data?.heading_accent}</span>
                    </h2>

                    <p className='subheading text-[#4B5563] max-w-xl mx-auto font-normal'>{data?.subheading}</p>
                </div>

                <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {row1.map((reason, index) => renderCard(reason, index))}
                    </div>
                    {row2.length > 0 && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
                            {row2.map((reason, index) => renderCard(reason, index + 3))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
