export default function ProductStatsComp({ data }) {
    return (
        <div className='cont container cont_gap py-20'>
            <h2 className='text-3xl font-bold lg:w-1/2'>{data?.heading}</h2>
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
                {data?.content?.length > 0 &&
                    data?.content.map((stat, index) => {
                        return (
                            <div
                                key={index}
                                className=' border cont gap-1 xl:px-6 px-3 py-12 rounded items-center text-center justify-center'
                            >
                                <p className='text-3xl font-bold text-accent'>{stat?.count}</p>
                                <p className='text-sm '>{stat?.des}</p>
                            </div>
                        );
                    })}
                <div></div>
            </div>
        </div>
    );
}
