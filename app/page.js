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
        <main className="flex justify-between gap-4 py-[4rem] text-sm dark:bg-dark ">
            <Image
                priority
                className="w-[8%] object-cover object-left sm:w-[15%] md:-ml-4 lg:w-[28%]"
                src={heroLeft}
                alt="left decoration"
                width={537}
                height={797}
            />
            <div className="flex h-[360px] flex-col items-center justify-center gap-3 pt-5 text-center tracking-[-0.1em] dark:text-gray-dark md:w-1/2">
                <h1 className="md:-ml-4 text-4xl font-semibold dark:text-gray-semi">
                    Search
                </h1>
                <p className="md:-ml-4 tracking-tighter">
                    Search high-resolution images from Unsplash
                </p>
                <input
                    onKeyDown={(e) => e.key === 'Enter' && findParams(search)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="m-2 w-full max-w-[94%] rounded-lg border border-gray-light bg-[url('../public/Search.svg')] bg-auto bg-[center_right_1rem] bg-no-repeat p-4 tracking-tight shadow dark:border-gray-dark dark:bg-gray-dark/25 dark:bg-[url('../public/Search-dark.svg')] dark:text-gray-semi focus:dark:outline focus:dark:outline-gray-dark"
                    type="text"
                    placeholder="Enter your keywords..."
                />
            </div>
            <Image
                priority
                className="-mr-4 w-[8%] object-cover object-right sm:w-[15%] lg:w-[28%]"
                src={heroRight}
                alt="right decoration"
                width={537}
                height={797}
            />
        </main>
    );
}
