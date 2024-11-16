import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
            />
        </>
    );
}
