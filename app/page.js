'use client';
import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import Image from 'next/image';
import heroLeft from '../public/hero-left.png';
import heroRight from '../public/hero-right.png';
import { useRouter } from 'next/navigation';

export default function Home() {
    const api = createApi({
        accessKey: 'rG-CmtIXnQdOMx_-szUWZbiGZ5d5WBzc2OlJsRfd2eA',
    });

    const [search, setSearch] = useState('');
    const router = useRouter();

    useEffect(() => {
        const savedCollections = localStorage.getItem('collections');
        !savedCollections &&
            localStorage.setItem('collections', JSON.stringify([]));
    }, []);

    const findParams = (params) => {
        router.push(`/results?show=${params}&page=1`);
    };
    return (
        <main className="flex gap-4 py-20 text-sm md:gap-8 dark:bg-dark">
            <Image
                priority
                className="w-6 object-cover object-right md:w-1/6"
                src={heroLeft}
                alt="left decoration"
                width={537}
                height={797}
            />
            <div className="flex h-[600px] w-full flex-col items-center justify-center gap-4 text-center lg:p-8 dark:text-gray-dark">
                <h1 className="text-4xl font-semibold dark:text-gray-semi">
                    Search
                </h1>
                <p>Search high-resolution images from Unsplash</p>
                <input
                    onKeyDown={(e) => e.key === 'Enter' && findParams(search)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="my-2 w-full rounded-lg border border-gray-light bg-[url('../public/Search.svg')] bg-auto bg-[center_right_1rem] bg-no-repeat p-4 shadow dark:border-gray-dark dark:bg-gray-dark/25 dark:bg-[url('../public/Search-dark.svg')] dark:text-gray-semi focus:dark:outline focus:dark:outline-gray-dark"
                    type="text"
                    placeholder="Enter your keywords..."
                />
            </div>
            <Image
                priority
                className="mt-16 w-6 object-cover object-left md:w-1/6"
                src={heroRight}
                alt="left decoration"
                width={537}
                height={797}
            />
        </main>
    );
}
