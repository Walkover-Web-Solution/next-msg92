import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

export default function WhatsAppPopupComp() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const modalElement = document.getElementById('whatsapppopup');

            const timer = setTimeout(() => {
                modalElement.classList.add('show');
                modalElement.style.display = 'block';
                modalElement.setAttribute('aria-modal', 'true');
                modalElement.removeAttribute('aria-hidden');
            }, 500);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            {/* Removed the button */}

            <div
                className="modal fade"
                id="whatsapppopup"
                tabIndex="-1"
                aria-labelledby="whatsapppopupLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered "
                    style={{
                        height: '600px',
                        minWidth: '600px',
                    }}
                >
                    <div
                        className="modal-content border-3x"
                        style={{
                            backgroundImage: 'url(/images/pushnotification/pushnotification-bg.svg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '600px',
                            minWidth: '600px',
                        }}
                    >
                        <div className="d-flex flex-column p-2 h-100 ">
                            <button
                                type="button"
                                className="btn-close ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    const modalElement = document.getElementById('whatsapppopup');
                                    modalElement.classList.remove('show');
                                    modalElement.style.display = 'none';
                                    modalElement.setAttribute('aria-hidden', 'true');
                                    modalElement.removeAttribute('aria-modal');
                                }}
                            ></button>
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <div className='p-3'>
                                    <div className="c-fs-2">
                                        Boost sales & customer satisfaction with MSG91 WhatsApp:
                                        <ul>
                                            <li>Payments</li>
                                            <li>Catalog</li>
                                            <li>Chatbot</li>
                                            <li>And more!</li>
                                        </ul>
                                    </div>
                                    <p>Start WhatsApp now!</p>
                                    <a href="https://calendly.com/msg91-whatsapp">
                                        <button className="btn btn-lg btn-secondary">Schedule a Meeting!</button>
                                    </a>
                                </div>
                                <Image
                                    src={'/images/pushnotification/pushnotification-phone.svg'}
                                    width={400}
                                    height={800}
                                    style={{
                                        height: '500px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
