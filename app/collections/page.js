'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CollectionPreview from '../components/CollectionPreview';
import Link from 'next/link';
import ServerError from "../components/ServerError";

const Collections = () => {
    const [collections, setCollections] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        const savedCollections =
            JSON.parse(localStorage.getItem('collections')) || [];
        setCollections(savedCollections);
    }, []);

    return (
        collections && (
            <main className="flex flex-col items-center gap-4 p-8 pb-32f">
                <h1 className="text-4xl bg-clip-text font-semibold bg-contain text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
                    Collections
                </h1>
                <p className="max-w-[26rem] text-center">
                    Explore the world through collections of beautiful photos
                    free to use under the <a href="">Unsplash License.</a>
                </p>
                {collections.length === 0 ? (
                    <p className="p-16 text-xl italic">No saved Collections</p>
                ) : !error ? (
                    <ul className="flex mt-16 flex-col gap-8 md:flex-row md:flex-wrap items-center justify-center">
                        {collections.map((collection, index) => (
                            <li key={index} className="w-full md:w-96">
                                <Link
                                    href={{
                                        pathname: '/collection',
                                        query: { name: collection.title },
                                    }}
                                    replace
                                    className="transition-transform group w-full md:w-auto flex flex-col gap-4"
                                >
                                    <CollectionPreview
                                        photos={collection.photos}
                                        setError={setError}
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {collection.title}
                                        </p>
                                        <p className="text-sm text-gray-dark">
                                            {collection.photos.length} photos
                                        </p>
                                    </div>
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

export default Collections;
