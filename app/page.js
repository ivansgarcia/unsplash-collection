'use client';
import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import defaultData from './utils/defaultData.json';
import createTestCollection from './utils/createTestCollection';
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
        <main className="flex gap-4 md:gap-8 text-sm py-20">
            <Image
                className="w-6 object-right md:w-1/6 object-cover"
                src={heroLeft}
                alt="left decoration"
                width={537}
                height={797}
            />
            <div className="flex flex-col gap-4 items-center justify-center w-full lg:p-8 text-center h-[600px]">
                <h1 className="text-4xl font-semibold">Search</h1>
                <p>Search high-resolution images from Unsplash</p>
                <input
                    onKeyDown={(e) => e.key === 'Enter' && findParams(search)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[url('../public/Search.svg')] bg-no-repeat bg-[center_right_1rem] bg-auto w-full my-2 shadow border border-gray-light p-4 rounded-lg"
                    type="text"
                    placeholder="Enter your keywords..."
                />
            </div>
            <Image
                className="w-6 md:w-1/6 object-left object-cover mt-16"
                src={heroRight}
                alt="left decoration"
                width={537}
                height={797}
            />
        </main>
    );
}
