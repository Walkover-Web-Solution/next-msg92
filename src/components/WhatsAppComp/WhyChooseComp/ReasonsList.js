// One white panel ruled into cells by hairlines (not separate floating boxes).
// Each cell has a short green bar above the title; on hover the bar grows and
// the cell gets a faint green tint. Single accent colour, no icons or watermarks.
// 2 columns on md+ (so 8 items = 4 even rows), 1 column on mobile.

export default function ReasonsList({ data }) {
    if (!data?.heading) return null;

    const reasons = data?.reasons || [];
    const isOdd = reasons.length % 2 === 1;

    return (
        <section className='whatsapp_lite_bg'>
            <div className='container cont cont_p cont_gap'>
                <header className='cont cont_gap'>
                    <h2 className='text-3xl md:text-4xl font-bold'>{data?.heading}</h2>
                    {data?.tagline && <p className='subheading'>{data?.tagline}</p>}
                    {data?.description && <p className='text-base md:text-lg text-gray-600'>{data?.description}</p>}
                </header>

                <ul className='grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#CFE5D6] bg-[#CFE5D6]'>
                    {reasons.map((reason, index) => (
                        <li
                            key={index}
                            className='group flex flex-col gap-3 bg-white p-6 md:p-8 transition-colors duration-200 hover:bg-[#F3FAF5]'
                        >
                            <span
                                aria-hidden='true'
                                className='h-[3px] w-8 rounded-full bg-[#1F9D55] transition-all duration-300 group-hover:w-14'
                            />
                            {reason?.title && (
                                <h3 className='text-lg md:text-xl font-bold leading-snug text-gray-900'>
                                    {reason?.title}
                                </h3>
                            )}
                            {reason?.description && (
                                <p className='text-[15px] md:text-base leading-relaxed text-gray-600'>
                                    {reason?.description}
                                </p>
                            )}
                        </li>
                    ))}

                    {/* keeps the last row clean when the item count is odd */}
                    {isOdd && <li aria-hidden='true' className='hidden md:block bg-white' />}
                </ul>
            </div>
        </section>
    );
}
