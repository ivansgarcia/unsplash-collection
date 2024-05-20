'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';

const Collection = ({ searchParams }) => {
    const { name } = searchParams;
    const [collection, setCollection] = useState(
        () =>
            JSON.parse(localStorage.getItem('collections')).filter(
                (c) => c.title === name
            )[0]
    );
    const [images, setImages] = useState([]);
    const photos = collection.photos;

    useEffect(() => {
        const api = createApi({
            accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
        });

        const fetchImages = async () => {
            const images = await Promise.all(
                photos.map(async (id) => {
                    const result = await api.photos.get({ photoId: id });
                    return result.response.urls.small;
                })
            );
            setImages(images);
        };

        fetchImages();
    }, [photos]);
    console.log(images);
    return (
        <main className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-4xl bg-clip-text font-semibold bg-contain text-transparent bg-[url('/gradiend-bg.svg')]">
                {name}
            </h1>
            <p>{photos.length} photos</p>
            <ul className="flex flex-wrap items-center justify-center gap-8 p-8">
                {images.map((image, index) => (
                    <li key={index} className="rounded-lg overflow-hidden">
                        <Link
                            href={{
                                pathname: '/viewer',
                                query: { id: photos[index] },
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
        </main>
    );
};

export default Collection;
