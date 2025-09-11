import Image from 'next/image';
import { MdCheck, MdOutlineExtension } from 'react-icons/md';

export default function WhatsAppIntegrations({ data }) {
    return (
        <div className='container cont cont_p cont_gap'>
            <div className='cont cont_w gap-1'>
                <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                <p>{data?.subheading}</p>
            </div>
            <div className='grid md:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-6'>
                {data?.content.map((item, index) => (
                    <div key={index} className='w-full cont md:p-6 p-3 gap-1 rounded border'>
                        <Image src={item?.icon} alt={item?.title} width={32} height={32} />
                        <h3 className='font-bold'>{item?.title}</h3>
                        <ul className='cont gap-1'>
                            {item?.highlights.map((hl, i) => (
                                <li key={i} className='flex gap-1'>
                                    <MdCheck className='text-green-600 text-xl mt-1' />
                                    {hl}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <a
                    href='https://msg91.com/partners-and-integrations'
                    key={''}
                    className='w-full cont p-6 gap-2 rounded border hover:bg-secondary transition-all'
                >
                    <MdOutlineExtension className='text-5xl' />
                    <h3 className='text-xl font-bold'>Explore More Integrations</h3>
                    <p>Unlock more value, automate smarter, and work better together.</p>
                </a>
            </div>
        </div>
    );
}
