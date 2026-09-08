import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import handleBrawserCookies from '@/utils/setCookies';
import { useRouter } from 'next/router';
import SummitBanner from '@/components/SummitBanner/SummitBanner';

export default function App({ Component, pageProps }) {
    // Manage browser cookies to send to signup page
    handleBrawserCookies();

    return (
        <>
            <SummitBanner />
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
