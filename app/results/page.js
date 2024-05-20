'use client';
import React, { useEffect, useState } from 'react';
import resultsBg from '../../public/gradiend-bg.svg';
import Image from 'next/image';
import Link from 'next/link';
import defaultData from '../utils/defaultData.json';
import { useParams, useSearchParams } from 'next/navigation';
import { createApi } from 'unsplash-js';
import { useRouter } from 'next/navigation';

const Results = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page'));
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState();
    useEffect(() => {
        const api = createApi({
            accessKey: 'rG-CmtIXnQdOMx_-szUWZbiGZ5d5WBzc2OlJsRfd2eA',
        });
        const getImages = async (params, page) => {
            await api.search
                .getPhotos({ query: params, page: page })
                .then((result) => {
                    console.log(result.response);
                    console.log(totalPages);
                    setResults(result.response.results);
                    (page === 1 || !totalPages) && setTotalPages(Number(result.response.total_pages))
                    console.log(page + '/' + totalPages);
                });
        };
        getImages(searchParams.get('show'), page);
    }, [searchParams, page, totalPages]);

    const findParams = (params, page) => {
        router.push(`/results?show=${params}&page=${page}`);
    };

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
                    onKeyDown={(e) => e.key === 'Enter' && findParams(search, 1)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-[600px] -mt-8 bg-[url('../public/Search.svg')] bg-no-repeat bg-[center_right_1rem] bg-auto w-full my-2 shadow border border-gray-light p-4 rounded-lg"
                    type="text"
                    placeholder="Enter your keywords..."
                />
            </section>
            {!results.length ? (
                <p className="text-center m-12">No results</p>
            ) : (
                <>
                    <ul className="columns-1 md:columns-3 xl:columns-4 gap-6 p-16">
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
                                    className="rounded h-auto w-full mb-6"
                                />
                            </Link>
                        ))}
                    </ul>
                    <div className="flex justify-center">
                        {page > 1 && <button className="py-2 px-6 rounded">Prev</button>}
                        {page < totalPages && <button onClick={() => findParams(searchParams.get('show'), page + 1)} className="py-2 px-6 rounded">Next</button>}
                    </div>
                </>
            )}
        </>
    );
};

export default Results;
