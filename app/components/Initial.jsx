import Image from "next/image";
import React, { useState } from 'react';
import heroLeft from '../../public/hero-left.png';
import heroRight from '../../public/hero-right.png';

const Initial = ({loadResults}) => {
    const [search, setSearch] = useState('');
    return (
        <section className="flex gap-8 h-screen text-sm">
            <Image
                className="hidden md:block w-1/6 object-cover"
                src={heroLeft}
                alt="left decoration"
                width={537}
                height={797}
            />
            <div className="flex flex-col gap-4 items-center justify-center w-full p-8 -mt-16">
                <h1 className="text-4xl font-semibold">Search</h1>
                <p>Search high-resolution images from Unsplash</p>
                <input
                    onKeyDown={(e) => e.key === 'Enter' && loadResults(search)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[url('../public/Search.svg')] bg-no-repeat bg-right bg-contain w-full my-2 shadow border border-gray-light p-4 rounded-lg"
                    type="text"
                    placeholder="Enter your keywords..."
                />
            </div>
            <Image
                className="w-1/6 hidden md:block object-cover"
                src={heroRight}
                alt="left decoration"
                width={537}
                height={797}
            />
        </section>
    );
};

export default Initial;
