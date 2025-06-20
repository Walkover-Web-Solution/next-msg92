'use client';
import Image from 'next/image';
import { useState } from 'react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
export function NavbarUtils() {
    function handleMenuHover() {
        const navMain = document.getElementById('nav_main');
        const navOverlay = document.getElementById('nav_overlay');
        if (navMain && !navMain.classList.contains('show')) {
            navMain.classList.add('show');
            navOverlay.classList.add('show');
            document.body.classList.add('overflow-hidden');
        }
    }
    function handleProductHover() {
        handleMenuHover();
        const navProducts = document.getElementById('nav_products');
        const navIntegrations = document.getElementById('nav_integrations');
        navProducts.classList.remove('hidden');
        navProducts.classList.add('flex');
        navIntegrations.classList.add('hidden');
    }
    function handleIntegrationsHover() {
        handleMenuHover();
        const navProducts = document.getElementById('nav_products');
        const navIntegrations = document.getElementById('nav_integrations');
        navProducts.classList.add('hidden');
        navIntegrations.classList.remove('hidden');
        navIntegrations.classList.add('flex');
    }
    return (
        <>
            <li
                className='text-md font-medium text-link flex items-center'
                onMouseEnter={() => {
                    handleProductHover();
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
            <li
                onMouseEnter={() => {
                    handleIntegrationsHover();
                }}
                className='text-md font-medium text-link'
            >
                Integrations
            </li>
        </>
    );
}

export function MiniMenuButton() {
    const [navOpen, setNavOpen] = useState(false);
    function handleProductOpen() {
        setNavOpen(true);
        const navProducts = document.getElementById('nav_products');
        const navMain = document.getElementById('nav_main');
        const navOverlay = document.getElementById('nav_overlay');
        navMain.classList.add('show');
        document.body.classList.add('overflow-hidden');
        navProducts.classList.remove('hidden');
        navProducts.classList.add('flex');
    }
    function handleProductClose() {
        setNavOpen(false);
        const navProducts = document.getElementById('nav_products');
        const navMain = document.getElementById('nav_main');
        const navOverlay = document.getElementById('nav_overlay');
        navMain.classList.remove('show');
        document.body.classList.remove('overflow-hidden');
        navProducts.classList.add('hidden');
        navProducts.classList.remove('flex');
    }
    return (
        <>
            {navOpen ? (
                <MdMenuOpen
                    onClick={() => {
                        handleProductClose();
                    }}
                    className='text-3xl'
                />
            ) : (
                <MdMenu
                    onClick={() => {
                        handleProductOpen();
                    }}
                    className='text-3xl'
                />
            )}
        </>
    );
}
export function NavbarBlank() {
    function handleBlankHover() {
        const navMain = document.getElementById('nav_main');
        const navOverlay = document.getElementById('nav_overlay');
        const navProducts = document.getElementById('nav_products');
        const navIntegrations = document.getElementById('nav_integrations');

        if ((navMain && navMain.classList.contains('show')) || (navOverlay && navMain.classList.contains('show'))) {
            navMain.classList.remove('show');
            navOverlay.classList.remove('show');
            document.body.classList.remove('overflow-hidden');
            navProducts.classList.add('hidden');
            navIntegrations.classList.add('hidden');
        }
    }
    return (
        <div
            id='nav_bg_blank'
            className={'w-full hidden md:block '}
            onMouseEnter={() => {
                handleBlankHover();
            }}
        ></div>
    );
}
