'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import ServerError from '../components/ServerError';

const Collection = ({ searchParams }) => {
    const router = useRouter();

    const [collection, setCollection] = useState();
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);

    const { name } = searchParams;

    useEffect(() => {
        const savedCollection = JSON.parse(
            localStorage.getItem('collections')
        ).filter((c) => c.title === name)[0];
        setCollection(savedCollection);
    }, [name]);

    const api = createApi({
        accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
    });

    const fetchImages = async () => {
        const images = await Promise.all(
            collection.photos.map(async (id) => {
                const result = await api.photos.get({ photoId: id });
                return result.response.urls.small;
            })
        ).catch((e) => setError(true));
        setImages(images);
    };

    collection && fetchImages();

    const removeCollection = () => {
        const savedCollections = JSON.parse(
            localStorage.getItem('collections')
        );
        const newCollections = savedCollections.filter(
            (col) => col.title !== name
        );
        localStorage.setItem('collections', JSON.stringify(newCollections));
        router.replace('/collections');
    };

    return (
        collection && (
            <main className="flex flex-col items-center gap-4 p-8">
                <h1 className="bg-gradient-to-r from-gradient-start to-gradient-end bg-contain bg-clip-text text-4xl font-semibold text-transparent">
                    {name}
                </h1>
                <p className="dark:text-gray-semi">{collection?.photos.length} photos</p>
                <button
                    onClick={removeCollection}
                    className="right-16 top-32 rounded bg-gray-semi dark:bg-gray-dark/25 dark:text-gray-light px-6 py-2 active:scale-95 md:absolute"
                >
                    Delete Collection
                </button>
                {!error ? (
                    <ul className={`columns-1 gap-6 px-8 pt-16 sm:px-16 ${images.length > 2 ? 'xl:columns-4 md:columns-3' : images.length === 1 ? '' : 'xl:columns-2 md:columns-2'}`}>
                        {images.map((image, index) => (
                            <li
                                key={index}
                                className="mb-6 h-auto w-full overflow-hidden rounded bg-gradient-to-br from-gray-dark to-gray-light transition-transform hover:scale-105 active:scale-100"
                            >
                                <Link
                                    href={{
                                        pathname: '/viewer',
                                        query: {
                                            id: collection?.photos[index],
                                        },
                                    }}
                                >
                                    <Image
                                        src={image}
                                        alt="image"
                                        width={300}
                                        height={200}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ServerError />
                )}
            </main>
        )
    );
};

export default Collection;
