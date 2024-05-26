import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CollectionsModal from './CollectionsModal';
import IncludedCollections from './IncludedCollections';
import AddCollectionButton from './AddCollectionButton';
import DownloadButton from './DownloadButton';

const ImageOptions = ({ currentImage, id }) => {
    const [collections, setCollections] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const savedCollections =
            JSON.parse(localStorage.getItem('collections')) || [];
        setCollections(savedCollections);
    }, []);

    useEffect(() => {
        collections.length &&
            localStorage.setItem('collections', JSON.stringify(collections));
        const fetchImages = async () => {
            const collectionPreviewImages = await Promise.all(
                collections.map(async (col) => {
                    const result = await api.photos.get({
                        photoId: col.photos[0],
                    });
                    return result.response.urls.thumb;
                })
            );
            const expandedCollections = collections.map(
                (col, i) =>
                    (col = { ...col, preview: collectionPreviewImages[i] })
            );
            fetchImages();
            setCollections(expandedCollections);
        };
    }, [collections]);

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

    return (
        <>
            <div className="flex-start flex w-full flex-col gap-4">
                <div className="flex items-center gap-4">
                    {currentImage && (
                        <Image
                            src={currentImage?.user.profile_image.medium}
                            alt="avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    )}
                    <p className="text-sm font-semibold dark:text-gray-light">
                        {currentImage?.user.name}
                    </p>
                </div>
                <p className="text-xs text-dark dark:text-gray-dark">
                    Published on {formattedDate}
                </p>
                <div className="flex gap-4">
                    <AddCollectionButton setShowModal={setShowModal} />
                    <DownloadButton currentImage={currentImage} />
                </div>
                {includedCollections.length > 0 && (
                    <IncludedCollections
                        id={id}
                        includedCollections={includedCollections}
                        collections={collections}
                        setCollections={setCollections}
                    />
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
        </>
    );
};

export default ImageOptions;
