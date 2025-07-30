import { MdArrowRight, MdArrowRightAlt, MdCheck } from 'react-icons/md';

export default function WhatsAppDriveSaled({ data }) {
    console.log('⚡️ ~ :2 ~ WhatsAppDriveSaled ~ data:', data);
    return (
        <div className='container cont cont_p cont_gap'>
            <h2 className='text-3xl font-bold'>{data?.heading}</h2>
            <div>
                <p className='font-bold text-xl'>{data?.subheading}</p>
                <p>{data?.description}</p>
            </div>
            <div className='cont cont_gap'>
                {data?.content.map((feature) => (
                    <div className='flex gap-1'>
                        <MdArrowRightAlt className='text-2xl  text-green-600' />
                        <div className=''>
                            <h3 className='font-bold'>{feature?.title}</h3>
                            <p>{feature?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
