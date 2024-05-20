import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { createApi } from "unsplash-js";

const CollectionPreview = ({ photos }) => {
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        const api = createApi({
            accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
        });

        const fetchImages = async () => {
            const images = await Promise.all(photos.map(async (id) => {
                const result = await api.photos.get({ photoId: id });
                return result.response.urls.small;
            }));
            images.length ? setPreviewImages(images) : setPreviewImages(['/empty.png']);
        };

        fetchImages();
    }, [photos]);

    const size = previewImages.length;

    return (
        <div className={`rounded overflow-hidden w-96 h-64 grid ${size === 1 && 'grid-cols-1 grid-rows-1'} ${size === 2 && 'grid-cols-2 grid-rows-1'} ${size > 2 && 'grid-cols-3 grid-rows-2'} ${size > 0 && 'gap-1'}`}>
            {previewImages.map((image, index) => (
                <Image key={index} className={`${index === 0 && 'row-span-2'} ${size > 2 && index === 0 && 'col-span-2'} ${size > 2 && index > 0 && 'col-span-1 row-span-1'} ${!photos.length ? 'object-scale-down' : 'object-cover'} w-full h-full`} src={image} alt="preview" width={300} height={200}/>

            )).slice(0,3)}
        </div>
    );
};

export default CollectionPreview;
