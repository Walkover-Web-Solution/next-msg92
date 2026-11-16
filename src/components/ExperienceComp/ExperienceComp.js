import { MdCheckCircle } from 'react-icons/md';
import QrWithImageCard from '../ContactUs/QrWithImageCard';

const componentRegistry = {
    QrWithImageCard,
};

export default function ExperienceComp({ data }) {
    if (!data?.heading) return null;

    const NestedComponent = componentRegistry[data?.rcs?.component];

    return (
        <section className='container cont_p'>
            <header className='flex flex-col gap-3 text-center'>
                <h2 className='text-3xl font-bold'>{data.heading}</h2>

                {data?.subheading && <h3 className='subheading'>{data.subheading}</h3>}
            </header>

            <div className='my-3'>
                <div className='flex flex-col gap-5 text-left'>
                    {data?.description && <p className='text-base md:text-lg text-gray-600'>{data.description}</p>}

                    {data?.scanLabel && <h3 className='text-xl md:text-2xl font-bold'>{data.scanLabel}</h3>}

                    {data?.features?.length > 0 && (
                        <ul className='flex flex-col gap-3'>
                            {data.features.map((feature, index) => (
                                <li key={index} className='flex items-start gap-3 text-base'>
                                    <MdCheckCircle className='my-1 shrink-0 text-xl text-accent' aria-hidden='true' />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {data?.note && <p className='text-sm text-gray-500'>{data.note}</p>}
                </div>
            </div>

            {NestedComponent && (
                <div className='my-6'>
                    <NestedComponent data={data.rcs} />
                </div>
            )}
        </section>
    );
}
