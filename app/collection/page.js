'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import ServerError from "../components/ServerError";

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
                <h1 className="text-4xl bg-clip-text font-semibold bg-contain text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
                    {name}
                </h1>
                <p>{collection?.photos.length} photos</p>
                <button
                    onClick={removeCollection}
                    className="md:absolute right-16 top-32 py-2 px-6 rounded bg-gray-semi active:scale-95"
                >
                    Delete Collection
                </button>
                {!error ? (
                    <ul className="columns-1 md:columns-3 xl:columns-4 gap-6 pt-16 px-8 sm:px-16">
                        {images.map((image, index) => (
                            <li
                                key={index}
                                className="rounded overflow-hidden bg-gradient-to-br from-gray-dark to-gray-light h-auto w-full mb-6 hover:scale-105 active:scale-100 transition-transform"
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
