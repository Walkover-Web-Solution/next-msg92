import { MdCheck } from 'react-icons/md';

export default function FeaturesModalComp({ features }) {
    return (
        <>
            <div className='flex gap-8 flex-col h-fit'>
                {features?.map((category) => {
                    return (
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-xl  font-bold'>{category?.category}</h3>
                            <div className='flex flex-col gap-3'>
                                {category?.items?.length > 0 &&
                                    category?.items?.map((feature, index) => {
                                        return (
                                            <p className='flex items-center gap-1' key={index}>
                                                <MdCheck fontSize={18} color='#16A34A' />
                                                {feature?.name}
                                            </p>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
