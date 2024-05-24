'use client';
import Image from 'next/image';
import React from 'react';
import logo from '../../public/Logo.svg';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
    const pathname = usePathname();
    return (
        <>
            <header className="flex w-full justify-between py-4 pl-3 text-sm font-semibold sm:px-6 md:px-8 dark:bg-dark">
                <Image
                    className="w-32"
                    src={logo}
                    alt="UnsplashBox"
                    width={118}
                    height={24}
                />
                <div className="flex flex-wrap justify-end px-2 md:gap-6">
                    <Link
                        href="/"
                        className={`${pathname === '/' ? 'cursor-default bg-gray-light text-dark dark:bg-gray-semi/25 dark:text-gray-light' : 'bg-white text-gray-dark dark:bg-dark dark:text-gray-dark'} rounded px-5 py-2 transition-transform active:scale-95`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/collections"
                        className={`${pathname === '/collections' ? 'cursor-default bg-gray-light text-dark dark:bg-gray-semi/25 dark:text-gray-light' : 'bg-white text-gray-dark dark:bg-dark dark:text-gray-dark'} rounded px-5 py-2 transition-transform active:scale-95`}
                    >
                        Collections
                    </Link>
                </div>
            </header>
            <hr className="border-gray-light dark:border-gray-dark" />
        </>
    );
};

export default Header;
