export default function WhyChooseMSG91({ data }) {
    return (
        <div className='container cont cont_p cont_gap'>
            <div className='cont_w mx-auto text-center'>
                <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                <p>{data?.subheading}</p>
            </div>
            {data?.content.map((item, index) => (
                <div
                    key={index}
                    className={`flex gap-12 items-center justify-center ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                >
                    <div className='w-full cont gap-4 max-w-[720px]'>
                        <div className='cont gap-2'>
                            <h3 className='text-2xl font-bold'>{item?.title}</h3>
                            <p className='font-bold'>{item?.subtitle}</p>
                        </div>
                        <p>{item?.description}</p>
                        <ul className='list-disc'>
                            {item?.highlights.map((hl, i) => (
                                <li key={i}>{hl}</li>
                            ))}
                        </ul>
                        <p>{item?.footer}.</p>
                    </div>
                    <div className='min-w-[460px] h-[460px] rounded bg-secondary'></div>
                </div>
            ))}
        </div>
    );
}
