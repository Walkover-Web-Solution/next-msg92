import styles from '../PricingWhatsApp.module.scss';

export default function PricingTable({ data, symbol, className, tabletype }) {
    const isMessageTable = tabletype === 'messages';

    const formatRate = (rate) => (!isNaN(parseFloat(rate)) ? `${symbol}${parseFloat(rate).toFixed(5)}` : 'N/A');

    return (
        <div className={`overflow-y-scroll max-h-[700px] scrollbar-none ${className}`}>
            <table className={`table bg-white rounded w-full ${tabletype}`}>
                <thead className='sticky top-0 bg-white z-10'>
                    <tr className='font-bold text-[16px] text-black'>
                        <th className='border-r text-left'>Market</th>
                        <th className='border-r text-left'>Prefix</th>
                        {isMessageTable && <th className='border-r text-left'>Marketing</th>}
                        {isMessageTable && <th className='border-r text-left'>Utility</th>}
                        {isMessageTable && <th className='text-left'>Authentication</th>}
                        {!isMessageTable && <th>Charges (per minute)</th>}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return (
                            <tr className={`${styles.table_row}`} key={index}>
                                <td className='border-r'>{item?.country_name}</td>
                                <td className='border-r'>{item?.prefix === 0 ? 'N/A' : item?.prefix}</td>
                                {isMessageTable && <td className='border-r'>{formatRate(item?.marketing_rate)}</td>}
                                {isMessageTable && <td className='border-r'>{formatRate(item?.utility_rate)}</td>}
                                {isMessageTable && <td>{formatRate(item?.authentication_rate)}</td>}
                                {!isMessageTable && <td>{formatRate(item?.charges)}</td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
