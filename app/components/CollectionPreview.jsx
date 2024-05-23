import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';

const CollectionPreview = ({ photos, setError }) => {
    const [previewImages, setPreviewImages] = useState([]);

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
            ).catch((e) => setError(true));
            images.length
                ? setPreviewImages(images)
                : setPreviewImages(['/empty.png']);
        };

        fetchImages();
    }, [photos, setError]);

    const size = previewImages.length;

    return (
        <div
            className={`rounded w-full group-hover:scale-105 group-active:scale-100 transition-transform overflow-hidden max-w-96 h-64 grid ${
                size === 1 && 'grid-cols-1 grid-rows-1'
            } ${size === 2 && 'grid-cols-2 grid-rows-1'} ${
                size > 2 && 'grid-cols-3 grid-rows-2'
            } ${size > 0 && 'gap-1'}`}
        >
            {previewImages
                .map((image, index) => (
                    <Image
                        key={index}
                        className={`${index === 0 && 'row-span-2'} ${
                            size === 2 && 'row-span-2'
                        } ${size > 2 && index === 0 && 'col-span-2'} ${
                            size > 2 && index > 0 && 'col-span-1 row-span-1'
                        } ${
                            !photos.length
                                ? 'object-scale-down'
                                : 'object-cover bg-gradient-to-br from-gray-dark to-gray-light'
                        } w-full h-full`}
                        src={image}
                        alt="preview"
                        width={300}
                        height={200}
                        placeholder="empty"
                    />
                ))
                .slice(0, 3)}
        </div>
    );
};

export default CollectionPreview;
