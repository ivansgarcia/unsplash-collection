'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import plusIcon from '../../public/Plus.svg';
import downloadIcon from '../../public/down-arrow.svg';
import CollectionsModal from '../components/CollectionsModal';
import minusIcon from '../../public/Remove.svg';

const Viewer = ({ searchParams }) => {
    const [currentImage, setCurrentImage] = useState();
    const [showModal, setShowModal] = useState(false);
    const { id } = searchParams;
    const [collections, setCollections] = useState(
        () => JSON.parse(localStorage.getItem('collections')) ?? []
    );

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

    currentImage && console.log(currentImage);

    useEffect(() => {
        const savedCollections = JSON.parse(
            localStorage.getItem('collections')
        );
        const fetchImages = async () => {
            const collectionPreviewImages = await Promise.all(
                savedCollections.map(async (col) => {
                    const result = await api.photos.get({
                        photoId: col.photos[0],
                    });
                    return result.response.urls.thumb;
                })
            );
            const expandedCollections = savedCollections.map(
                (col, i) =>
                    (col = { ...col, preview: collectionPreviewImages[i] })
            );
            fetchImages();
            setCollections(expandedCollections);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('collections', JSON.stringify(collections));
    }, [collections]);

    console.log(collections);

    const includedCollections = collections.filter((c) =>
        c.photos.includes(id)
    );

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const date = new Date(currentImage?.created_at);
    const formattedDate =
        monthNames[date.getMonth()] +
        ' ' +
        date.getDate() +
        ', ' +
        date.getFullYear();

    const removeFromCollection = (collection) => {
        collection.photos = collection.photos.filter((imgId) => imgId !== id);
        if (!collection.photos.length) {
            collection.preview = '/empty.png';
        }
        let newCollections = collections.filter(
            (col) => col.title !== collection.title
        );
        newCollections = [...newCollections, collection];
        console.log('newCollections', newCollections);
        setCollections(newCollections);
    };

    const download = async () => {
        const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY;
        const downloadLocation = currentImage?.links.download_location;
    
        if (!downloadLocation) {
            console.error('Download location not found');
            return;
        }
    
        try {
            const response = await fetch(`${downloadLocation}?client_id=${accessKey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
    
            const imageData = await response.json();
            const downloadUrl = imageData.url;
    
            const imageResponse = await fetch(downloadUrl);
            const blob = await imageResponse.blob();
    
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'unsplash_image.jpg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('There was an error with the fetch operation:', error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center p-14 gap-14">
            {currentImage && (
                <Image
                    src={currentImage?.urls.full}
                    alt="current"
                    width={800}
                    height={400}
                    className="md:w-1/2"
                />
            )}
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-4">
                    {currentImage && (
                        <Image
                            src={currentImage?.user.profile_image.medium}
                            alt="avatar"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    )}
                    <p className="font-semibold text-sm">
                        {currentImage?.user.name}
                    </p>
                </div>
                <p className="text-xs text-dark">
                    Published on {formattedDate}
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center bg-gray-light py-2 px-4 rounded gap-2 text-sm font-semibold"
                    >
                        <Image
                            src={plusIcon}
                            alt="add"
                            width={20}
                            height={20}
                        />
                        Add to Collection
                    </button>
                    <button
                        onClick={download}
                        className="flex items-center bg-gray-light py-2 px-4 rounded gap-2 text-sm font-semibold"
                    >
                        <Image
                            src={downloadIcon}
                            alt="download"
                            width={20}
                            height={20}
                        />
                        Download
                    </button>
                </div>
                {includedCollections.length > 0 && (
                    <section className="flex flex-col gap-4">
                        <h3>Collections</h3>
                        {includedCollections.map((collection, index) => (
                            <div
                                key={index}
                                className="flex gap-4 w-full items-center"
                            >
                                <Image
                                    src={collection.preview}
                                    alt={collection.title}
                                    width={40}
                                    height={40}
                                    className="object-cover w-10 h-10"
                                />
                                <div>
                                    <p>{collection.title}</p>
                                    <p>{collection.photos.length} photos</p>
                                </div>
                                <button
                                    onClick={() =>
                                        removeFromCollection(collection)
                                    }
                                    className="flex items-center gap-2 ml-auto"
                                >
                                    <Image
                                        src={minusIcon}
                                        alt="remove"
                                        width={20}
                                        height={20}
                                    />
                                    <span>Remove</span>
                                </button>
                            </div>
                        ))}
                    </section>
                )}
            </div>
            <CollectionsModal
                id={id}
                thumb={currentImage?.urls.thumb}
                showModal={showModal}
                setShowModal={setShowModal}
                collections={collections}
                setCollections={setCollections}
            />
        </div>
    );
};

export default Viewer;
