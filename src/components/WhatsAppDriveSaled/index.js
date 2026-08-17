import Image from 'next/image';
import { MdArrowRight, MdArrowRightAlt, MdCheck } from 'react-icons/md';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import CalendlyModal from '../CalendlyModal';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function WhatsAppDriveSales({ data, pageInfo, isReports: isReportsProp }) {
    const isReports = isReportsProp || pageInfo?.page === 'reports';
    const arrowColor = isReports ? 'text-[#268080]' : 'text-green-600';

    return (
        <div className='container flex flex-col md:flex-row pb-8 cont_gap items-center justify-between'>
            <div className='w-full xl:max-w-[560px] lg:max-w-[320px] max-w-[280px] md:mx-6 mx-2 rounded'>
                {data?.img?.endsWith('.json') ? (
                    <LottiePlayer lottie={data?.img} />
                ) : data?.img ? (
                    <Image
                        src={data?.img}
                        width={560}
                        height={400}
                        alt={data?.heading || 'Drive Sales'}
                        className='w-full h-auto object-contain'
                    />
                ) : null}
            </div>
            <div className='cont gap-3'>
                <h2 className='text-2xl font-bold'>{data?.heading}</h2>
                <div>
                    <p className='font-bold text-xl'>{data?.subheading}</p>
                    <p>{data?.description}</p>
                </div>
                <div className='cont cont_gap'>
                    {data?.content?.map((feature, i) => (
                        <div key={i} className='flex gap-1'>
                            <MdArrowRightAlt className={`text-2xl ${arrowColor}`} />
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
