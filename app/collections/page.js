'use client';
import React, { useEffect, useState } from 'react';
import CollectionPreview from '../components/CollectionPreview';
import Link from 'next/link';
import ServerError from '../components/ServerError';

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
            <main className="pb-32f flex flex-col items-center gap-4 p-8">
                <h1 className="bg-gradient-to-r from-gradient-start to-gradient-end bg-contain bg-clip-text text-4xl font-semibold text-transparent">
                    Collections
                </h1>
                <p className="max-w-[26rem] text-center dark:text-gray-semi">
                    Explore the world through collections of beautiful photos
                    free to use under the <a href="">Unsplash License.</a>
                </p>
                {collections.length === 0 ? (
                    <p className="my-16 text-xl text-center italic text-gradient-end">No collections created</p>
                ) : !error ? (
                    <ul className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row md:flex-wrap">
                        {collections.map((collection, index) => (
                            <li key={index} className="w-full md:w-96">
                                <Link
                                    href={{
                                        pathname: '/collection',
                                        query: { name: collection.title },
                                    }}
                                    className="group flex w-full flex-col gap-4 transition-transform md:w-auto"
                                >
                                    <CollectionPreview
                                        photos={collection.photos}
                                        setError={setError}
                                    />
                                    <div>
                                        <p className="font-semibold dark:text-gray-semi">
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
