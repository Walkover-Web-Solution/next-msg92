import { useState } from 'react';
import { InlineWidget } from 'react-calendly';

export default function CTAMFTL() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div className='bg-accent'>
                <div className='container cont_p cont cont_gap items-center'>
                    <h2 className='text-white text-3xl font-bold text-center'>
                        Why wait? Book your slot today and get started!
                    </h2>
                    <button onClick={() => setIsModalOpen(true)} className='btn btn-white w-fit'>
                        Schedule a Meeting Now
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <dialog id='whatsapp_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget
                            url={'https://calendly.com/sales-msg91/pre-sales'}
                            styles={{ height: '680px', width: 'auto' }}
                        />
                    </div>
                </dialog>
            )}
        </>
    );
}
