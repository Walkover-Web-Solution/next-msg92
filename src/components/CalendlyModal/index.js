import { Children, useState } from 'react';
import { InlineWidget } from 'react-calendly';

export default function CalendlyModal({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <span onClick={() => setIsModalOpen(true)}>{children}</span>
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
                            url='https://calendly.com/d/y3n-29s-29h?back=1'
                            styles={{ height: '680px', width: 'auto' }}
                        />
                    </div>
                </dialog>
            )}
        </>
    );
}
