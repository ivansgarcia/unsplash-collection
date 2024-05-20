import React, { useState } from 'react';
import resultsBg from '../../public/gradiend-bg.svg';
import Image from 'next/image';
import Link from 'next/link';

const Results = ({ results, loadResults }) => {
    const [search, setSearch] = useState('');
    return (
        <>
            <section className="flex flex-col items-center">
                <div className="relative w-full h-20 -z-10">
                    <Image
                        fill
                        src={resultsBg}
                        alt="gradient"
                        className="object-cover"
                    />
                </div>
                <input
                    onKeyDown={(e) => e.key === 'Enter' && loadResults(search)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-[600px] -mt-8 bg-[url('../public/Search.svg')] bg-no-repeat bg-right bg-contain w-full my-2 shadow border border-gray-light p-4 rounded-lg"
                    type="text"
                    placeholder="Enter your keywords..."
                />
            </section>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16">
                {results.map((result, index) => (
                    <Link
                        href={{
                            pathname: '/viewer',
                            query: { id: result.id },
                        }}
                        key={index}
                    >
                        <Image
                            src={result.urls.small}
                            alt={result.description ?? ''}
                            width={200}
                            height={400}
                            className="rounded-lg w-full"
                        />
                    </Link>
                ))}
            </ul>
        </>
    );
};

export default Results;
