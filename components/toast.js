"use client"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

const Toastify = () => {
    return (
        <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
        theme='dark'
        />
    )
}

export default Toastify;