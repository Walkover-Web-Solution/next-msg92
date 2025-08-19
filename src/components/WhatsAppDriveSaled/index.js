import { MdArrowRight, MdArrowRightAlt, MdCheck } from 'react-icons/md';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import CalendlyModal from '../CalendlyModal';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function WhatsAppDriveSales({ data }) {
    return (
        <div className='container flex flex-col md:flex-row pb-8 cont_gap items-center justify-between'>
            <div className='w-full xl:max-w-[560px] lg:max-w-[320px] max-w-[280px] md:mx-6 mx-2 rounded'>
                <LottiePlayer lottie={data?.img} />
            </div>
            <div className='cont gap-3'>
                <h2 className='text-2xl font-bold'>{data?.heading}</h2>
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
                {data?.schedule_meet && (
                    <CalendlyModal>
                        <LinkText customClasses={'text-link active-link'}>{data?.schedule_meet}</LinkText>
                    </CalendlyModal>
                )}
            </div>
        </div>
    );
}
