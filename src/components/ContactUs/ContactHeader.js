export default function ContactHeader({ badge, heading, subheading }) {
    return (
        <div className='flex flex-col items-center gap-3 text-center max-w-2xl mx-auto'>
            {badge && (
                <span className='text-xs font-semibold tracking-widest text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5'>
                    {badge}
                </span>
            )}
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900'>{heading}</h1>
            {subheading && <p className='text-base sm:text-lg text-gray-500'>{subheading}</p>}
        </div>
    );
}
