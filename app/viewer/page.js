'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import ImageOptions from '../components/ImageOptions';

const Viewer = ({ searchParams }) => {
    const { id } = searchParams;
    const [currentImage, setCurrentImage] = useState();

    useEffect(() => {
        const api = createApi({
            accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
        });

        const getImageInfo = async () => {
            await api.photos
                .get({ photoId: id })
                .then((result) => setCurrentImage(result.response));
        };
        getImageInfo();
    }, [id]);

    return (
        <div className="flex w-full flex-col items-center justify-center gap-14 p-4 py-12 md:px-20 lg:flex-row lg:items-start">
            {currentImage && (
                <>
                    <Image
                        priority
                        placeholder="empty"
                        src={currentImage?.urls.regular}
                        alt="current"
                        width={currentImage.width}
                        height={currentImage.height}
                        className="w-full max-w-[400px] rounded bg-gradient-to-br from-gray-dark to-gray-light transition-transform lg:max-w-[50%]"
                    />
                    <ImageOptions currentImage={currentImage} id={id} />
                </>
            )}
        </div>
    );
};

export default Viewer;
