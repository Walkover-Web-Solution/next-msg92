'use client';
import Image from 'next/image';
import styles from '../Navbar.module.scss';
import { MdMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';
export function NavbarUtils() {
    function handleMenuHover() {
        const navMain = document.getElementById('nav_main');
        const navOverlay = document.getElementById('nav_overlay');
        if (navMain && !navMain.classList.contains('show')) {
            navMain.classList.add('show');
            navOverlay.classList.add('show');
        }
    }
    return (
        <>
            <li
                className='text-md font-medium text-link flex items-center'
                onMouseEnter={() => {
                    handleMenuHover();
                }}
            >
                <Image
                    width={120}
                    height={120}
                    src={'/assets/icons/products/hello.svg'}
                    className='h-8 w-fit mr-1'
                    alt='Hello Logo'
                />
                Hello
            </li>
            <li      onMouseEnter={() => {
                    handleMenuHover();
                }} className='text-md font-medium text-link'>Integrations</li>
        </>
    );
}

export function MiniMenuButton() {
    return (
        <>
            <MdMenu className='text-3xl' />
        </>
    );
}
export function NavbarBlank() {
    function handleBlankHover() {
        console.log('⚡️ ~ :46 ~ handleBlankHover ~ handleBlankHover');

        const navMain = document.getElementById('nav_main');
        const navOverlay = document.getElementById('nav_overlay');
        if ((navMain && navMain.classList.contains('show')) || (navOverlay && navMain.classList.contains('show'))) {
            navMain.classList.remove('show');
            navOverlay.classList.remove('show');
        }
    }
    return (
        <div
            id='nav_bg_blank'
            className={'w-full '}
            onMouseEnter={() => {
                handleBlankHover();
            }}
        ></div>
    );
}
