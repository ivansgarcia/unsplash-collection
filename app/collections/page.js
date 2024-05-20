'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CollectionPreview from '../components/CollectionPreview';
import Link from 'next/link';

const Collections = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const savedCollections =
            JSON.parse(localStorage.getItem('collections')) || [];
        setCollections(savedCollections);
    }, []);

    return (
        <main className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-4xl bg-clip-text font-semibold bg-contain text-transparent bg-[url('/gradiend-bg.svg')]">
                Collections
            </h1>
            <p className="max-w-[26rem] text-center">
                Explore the world through collections of beautiful photos free
                to use under the <a href="">Unsplash License.</a>
            </p>
            {collections.length === 0 ? (
                <p>No Collections</p>
            ) : (
                <ul className="flex mt-16 flex-col gap-8 md:flex-row md:flex-wrap items-center justify-center">
                    {collections.map((collection, index) => (
                        <li key={index} className="flex flex-col gap-4">
                            <Link
                                href={{
                                    pathname: '/collection',
                                    query: { name: collection.title },
                                }}
                            >
                                <CollectionPreview photos={collection.photos} />
                            </Link>
                            <div>
                                <p className="font-semibold">
                                    {collection.title}
                                </p>
                                <p className="text-sm text-gray-dark">
                                    {collection.photos.length} photos
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default Collections;
