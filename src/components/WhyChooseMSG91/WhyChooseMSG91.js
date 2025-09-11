import CalendlyModal from '../CalendlyModal';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import { LinkButton, LinkText } from '../UIComponent/Buttons/LinkButton';
import WhatsAppDriveSales from '../WhatsAppDriveSaled';

export default function WhyChooseMSG91({ data }) {
    return (
        <div className='bg-[#f4fcf4]'>
            <div className='container cont cont_p cont_gap'>
                <div className='cont cont_w gap-2 '>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                    <p>{data?.subheading}</p>
                </div>
                {data?.content.map((item, index) => (
                    <div
                        key={index}
                        className={`flex gap-12 items-center justify-center ${
                            index % 2 === 0 ? 'md:flex-row flex-col' : 'md:flex-row-reverse flex-col'
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
                            {item?.footer && <p>{item?.footer}.</p>}
                            {item?.cta && (
                                <LinkButton
                                    href={item?.cta?.link}
                                    target='_blank'
                                    customClasses={'text-link active-link'}
                                    content={item?.cta?.text}
                                />
                            )}
                            {item?.schedule_meet && (
                                <CalendlyModal>
                                    <LinkText customClasses={'text-link active-link'}>{item?.schedule_meet}</LinkText>
                                </CalendlyModal>
                            )}
                        </div>
                        <div className='w-full xl:max-w-[700px] lg:max-w-[320px] max-w-[280px] md:mx-6 mx-2 rounded-lg overflow-hidden'>
                            <LottiePlayer lottie={item?.img} />
                        </div>
                    </div>
                ))}
            </div>
            <WhatsAppDriveSales data={data?.WhatsAppDriveSales} />
        </div>
    );
}
