'use client';
import { useState } from 'react';
import { InlineWidget } from 'react-calendly';

export function SalesModal({ url, salesButtonText }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button className='btn btn-primary btn-outline btn-md' onClick={() => setIsModalOpen(true)}>
                {salesButtonText}
            </button>
            {isModalOpen && (
                <dialog id='whatsapp_modal' className='modal' open>
                    <div className='modal-box'>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            ✕
                        </button>
                        <InlineWidget url={url} styles={{ height: '680px', width: 'auto' }} />
                    </div>
                </dialog>
            )}
        </>
    );
}
