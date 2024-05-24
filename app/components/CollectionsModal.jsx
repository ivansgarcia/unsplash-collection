import Image from 'next/image';
import React, { useState } from 'react';
import CreateCollection from './CreateCollection';
import { useTheme } from 'next-themes';

const CollectionsModal = ({
    id,
    thumb,
    showModal,
    setShowModal,
    collections,
    setCollections,
}) => {
    const [filter, setFilter] = useState('');
    const { resolvedTheme } = useTheme();

    const notIncludedCollections = collections
        ? collections.filter((c) => !c.photos.includes(id))
        : [];

    const addToCollection = (collection) => {
        collection.photos.push(id);
        collection.preview = thumb;
        const newCollections = [
            ...collections.filter((col) => col.title !== collection.title),
            collection,
        ];
        setCollections(newCollections);
        setShowModal(false);
    };

    const filteredNotIncludedCollections = notIncludedCollections.filter(
        (collection) =>
            collection.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <dialog
            open={showModal}
            className={`${showModal ? 'flex' : 'hidden'} items-center justify-center`}
        >
            <div className="z-20 flex w-[90vw] flex-col gap-4 rounded bg-white p-5 md:w-[35rem] dark:bg-dark dark:text-gray-dark">
                <header className="text-xl font-bold dark:text-gray-semi">
                    Add to Collections
                </header>
                <input
                    onKeyDown={(e) => e.key === 'Enter' && null}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="my-2 w-full max-w-[600px] rounded-lg border border-gray-light bg-[url('../public/Search.svg')] bg-auto bg-[center_right_1rem] bg-no-repeat p-4 shadow dark:border-gray-dark dark:bg-gray-dark/25 dark:bg-[url('../public/Search-dark.svg')] dark:text-gray-semi focus:dark:outline focus:dark:outline-gray-dark"
                    type="text"
                    placeholder="Find Collection..."
                />
                <CreateCollection
                    showModal={showModal}
                    collections={collections}
                    setCollections={setCollections}
                />
                {filter && (
                    <p className="text-xs text-dark">
                        {filteredNotIncludedCollections.length} matches
                    </p>
                )}
                <ul className="mb-10 flex w-full flex-col gap-4">
                    {filteredNotIncludedCollections.map((collection, index) => (
                        <li key={index}>
                            <button
                                onClick={() => addToCollection(collection)}
                                className="group flex w-full items-center gap-4 rounded p-2.5 text-left hover:bg-gray-semi hover:dark:bg-gray-dark/50 hover:dark:text-gray-semi"
                            >
                                <Image
                                    className="h-16 w-16 rounded object-cover"
                                    src={
                                        collection.preview === '/empty.png'
                                            ? resolvedTheme === 'dark'
                                                ? '/empty-dark.png'
                                                : '/empty.png'
                                            : collection.preview
                                    }
                                    alt={collection.title}
                                    width={50}
                                    height={50}
                                />
                                <div>
                                    <p>{collection.title}</p>
                                    <p className="text-xs">
                                        {collection.photos.length} photos
                                    </p>
                                </div>
                                <div className="ml-auto hidden items-center gap-2 text-xs transition-transform active:scale-95 group-hover:flex">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.6665 7.33335H8.6665V3.33335C8.6665 3.15654 8.59627 2.98697 8.47124 2.86195C8.34622 2.73693 8.17665 2.66669 7.99984 2.66669C7.82303 2.66669 7.65346 2.73693 7.52843 2.86195C7.40341 2.98697 7.33317 3.15654 7.33317 3.33335V7.33335H3.33317C3.15636 7.33335 2.98679 7.40359 2.86177 7.52862C2.73674 7.65364 2.6665 7.82321 2.6665 8.00002C2.6665 8.17683 2.73674 8.3464 2.86177 8.47142C2.98679 8.59645 3.15636 8.66669 3.33317 8.66669H7.33317V12.6667C7.33317 12.8435 7.40341 13.0131 7.52843 13.1381C7.65346 13.2631 7.82303 13.3334 7.99984 13.3334C8.17665 13.3334 8.34622 13.2631 8.47124 13.1381C8.59627 13.0131 8.6665 12.8435 8.6665 12.6667V8.66669H12.6665C12.8433 8.66669 13.0129 8.59645 13.1379 8.47142C13.2629 8.3464 13.3332 8.17683 13.3332 8.00002C13.3332 7.82321 13.2629 7.65364 13.1379 7.52862C13.0129 7.40359 12.8433 7.33335 12.6665 7.33335Z"
                                            fill="#121826"
                                            className="dark:fill-gray-semi"
                                        />
                                    </svg>

                                    <span>Add to Collection</span>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                onClick={() => setShowModal(false)}
                className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-gray-dark bg-opacity-50"
            ></div>
        </dialog>
    );
};

export default CollectionsModal;
