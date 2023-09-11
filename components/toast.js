"use client"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Toastify = () => {
    return (
        <ToastContainer
        position="top-right"
        autoClose={8000}
        // transition={Slide}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
        />
    )
}

export default Toastify;