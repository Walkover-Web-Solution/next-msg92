import { MdArrowRight, MdArrowRightAlt, MdCheck } from 'react-icons/md';
import LottiePlayer from '../LottiePlayer/LottiePlayer';

export default function WhatsAppDriveSaled({ data }) {
    return (
        <div className='container flex flex-col md:flex-row cont_p cont_gap items-center justify-between'>
            <div className='w-full xl:max-w-[560px] lg:max-w-[320px] max-w-[280px] md:mx-6 mx-2 rounded'>
                <LottiePlayer lottie={data?.img} />
            </div>
            <div className='cont gap-2'>
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
        </div>
    );
}
