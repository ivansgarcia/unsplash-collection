'use client';
import React, { useEffect, useState } from 'react';
import resultsBg from '../../public/gradiend-bg.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createApi } from 'unsplash-js';
import { useRouter } from 'next/navigation';
import ServerError from '../components/ServerError';

const Results = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page'));
    const [search, setSearch] = useState('');
    const [results, setResults] = useState();
    const [totalPages, setTotalPages] = useState();
    const [error, setError] = useState(false);
    useEffect(() => {
        const api = createApi({
            accessKey: 'rG-CmtIXnQdOMx_-szUWZbiGZ5d5WBzc2OlJsRfd2eA',
        });
        const getImages = async (params, page) => {
            await api.search
                .getPhotos({ query: params, page: page, per_page: 20 })
                .then((result) => {
                    setResults(result.response.results);
                    (page === 1 || !totalPages) &&
                        setTotalPages(Number(result.response.total_pages));
                })
                .catch((e) => {
                    setError(true);
                });
        };
        getImages(searchParams.get('show'), page);
    }, [searchParams, page, totalPages]);

    const findParams = (params, page) => {
        setError(false);
        setResults();
        router.push(`/results?show=${params}&page=${page}`);
    };

    return (
        <>
            <section className="flex flex-col items-center">
                <div className="relative -z-10 h-20 w-full">
                    <Image
                        fill
                        src={resultsBg}
                        alt="gradient"
                        className="object-cover"
                    />
                </div>
                <div className="my-2 -mt-8 w-[90%] max-w-[600px] rounded-lg bg-dark">
                    <input
                        onKeyDown={(e) =>
                            e.key === 'Enter' && findParams(search, 1)
                        }
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-light bg-[url('../public/Search.svg')] bg-auto bg-[center_right_1rem] bg-no-repeat p-4 shadow dark:border-gray-dark dark:bg-gray-dark/25 dark:bg-[url('../public/Search-dark.svg')] dark:text-gray-semi focus:dark:outline focus:dark:outline-gray-dark"
                        type="text"
                        placeholder="Enter your keywords..."
                    />
                </div>
            </section>
            {results &&
                (!results.length ? (
                    <p className="m-12 text-center">No results</p>
                ) : (
                    <>
                        <ul className="columns-1 gap-6 px-8 pt-16 sm:px-16 md:columns-3 xl:columns-4">
                            {results.map((result, index) => (
                                <li key={index}>
                                    <Link
                                        href={{
                                            pathname: '/viewer',
                                            query: { id: result.id },
                                        }}
                                        aria-label={
                                            result.description ?? 'preview'
                                        }
                                    >
                                        <Image
                                            placeholder="empty"
                                            src={result.urls.small}
                                            alt={result.description ?? ''}
                                            width={result.width}
                                            height={result.height}
                                            className="mb-6 h-auto w-full rounded bg-gradient-to-br from-gray-dark to-gray-light transition-transform hover:scale-105 active:scale-95 md:active:scale-100 dark:from-dark dark:to-gray-dark"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center gap-4 p-16">
                            {page > 1 && (
                                <button
                                    onClick={() =>
                                        findParams(
                                            searchParams.get('show'),
                                            page - 1
                                        )
                                    }
                                    className="rounded bg-gray-semi px-6 py-2 active:scale-105 dark:bg-gray-dark/50 dark:text-gray-semi"
                                >
                                    &lt; Prev
                                </button>
                            )}
                            {page < totalPages && (
                                <button
                                    onClick={() =>
                                        findParams(
                                            searchParams.get('show'),
                                            page + 1
                                        )
                                    }
                                    className="rounded bg-gray-semi px-6 py-2 active:scale-105 dark:bg-gray-dark/50 dark:text-gray-semi"
                                >
                                    Next &gt;
                                </button>
                            )}
                        </div>
                    </>
                ))}
            {error && <ServerError />}
        </>
    );
};

export default Results;
