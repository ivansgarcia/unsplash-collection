'use client'
import Image from 'next/image';
import React from 'react';
import logo from '../../public/Logo.svg';
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
    const pathname = usePathname();
    return (
        <>
        <header className="flex justify-between pl-3 sm:px-6 md:px-8 py-4 text-sm w-full font-semibold">
            <Image className="w-32" src={logo} alt="UnsplashBox" width={118} height={24} />
            <div className="flex md:gap-6">
                <Link href="/" className={`${pathname === '/' ? 'bg-gray-light text-dark cursor-default' : 'bg-white text-gray-dark'} py-2 px-5 rounded active:scale-95 transition-transform`}>Home</Link>
                <Link href="/collections" className={`${pathname === '/collections' ? 'bg-gray-light text-dark cursor-default' : 'bg-white text-gray-dark'} py-2 px-5 rounded active:scale-95 transition-transform`}>Collections</Link>
            </div>
        </header>
        <hr className="border-gray-light"/>
        </>
    );
};

export default Header;
