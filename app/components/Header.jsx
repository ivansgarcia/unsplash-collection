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
            <header className="flex w-full items-center justify-between py-[0.9rem] pl-3 text-sm font-semibold dark:bg-dark sm:px-6 md:pl-8 md:pr-8">
                <Image
                    priority
                    className="h-6 w-[7.4rem]"
                    src={logo}
                    alt="UnsplashBox"
                    width={118}
                    height={24}
                />
                <div className="flex flex-wrap justify-end gap-4 tracking-tighter">
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
