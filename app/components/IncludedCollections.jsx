import Image from 'next/image';
import React from 'react';

const IncludedCollections = ({
    id,
    includedCollections,
    collections,
    setCollections,
}) => {
    const removeFromCollection = async (collection) => {
        collection.photos = collection.photos.filter((imgId) => imgId !== id);
        let newCollections = collections.filter(
            (col) => col.title !== collection.title
        );
        if (!collection.photos.length) {
            collection.preview = '/empty.png';
        } else {
            const api = createApi({
                accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
            });

            await api.photos
                .get({ photoId: collection.photos[0] })
                .then(
                    (result) =>
                        (collection.preview = result.response.urls.thumb)
                );
        }
        newCollections = [...newCollections, collection];
        setCollections(newCollections);
    };

    return (
        <section className="mt-4 flex flex-col gap-4">
            <h3 className="text-xl font-bold dark:text-gray-semi">
                Collections
            </h3>
            {includedCollections.map((collection, index) => (
                <button
                    onClick={() => removeFromCollection(collection)}
                    key={index}
                    className="flex w-full items-center gap-4 rounded p-2.5 text-left hover:bg-gray-semi dark:text-gray-semi hover:dark:bg-gray-dark/50"
                >
                    <Image
                        src={collection.preview}
                        alt={collection.title}
                        width={50}
                        height={50}
                        className="h-14 w-14 rounded object-cover"
                    />
                    <div>
                        <p>{collection.title}</p>
                        <p className="text-xs">
                            {collection.photos.length} photos
                        </p>
                    </div>
                    <div className="mx-4 ml-auto flex items-center gap-2 text-xs font-semibold transition-transform active:scale-95">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.6665 7.33331H3.33317C3.15636 7.33331 2.98679 7.40355 2.86177 7.52858C2.73674 7.6536 2.6665 7.82317 2.6665 7.99998C2.6665 8.17679 2.73674 8.34636 2.86177 8.47138C2.98679 8.59641 3.15636 8.66665 3.33317 8.66665H12.6665C12.8433 8.66665 13.0129 8.59641 13.1379 8.47138C13.2629 8.34636 13.3332 8.17679 13.3332 7.99998C13.3332 7.82317 13.2629 7.6536 13.1379 7.52858C13.0129 7.40355 12.8433 7.33331 12.6665 7.33331Z"
                                fill="#121826"
                                className="dark:fill-gray-semi"
                            />
                        </svg>

                        <span>Remove</span>
                    </div>
                </button>
            ))}
        </section>
    );
};

export default IncludedCollections;
