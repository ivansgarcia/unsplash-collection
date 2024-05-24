import React, { useEffect, useState } from 'react';

const CreateCollection = ({ collections, setCollections, showModal }) => {
    const [namingCollection, setNamingCollection] = useState(false);

    useEffect(() => {
        setNamingCollection(false);
    }, [showModal]);

    const createCollection = (name) => {
        if (collections.find((c) => c.title === name)) {
            name = name + '_new';
        }
        const newCollections = [
            ...collections,
            { title: name, photos: [], preview: '/empty.png' },
        ];
        setCollections(newCollections);
        setNamingCollection(false);
    };
    return (
        <div className="rounded px-4 py-4 hover:bg-gray-dark hover:bg-gray-semi hover:dark:text-gray-semi">
            {namingCollection ? (
                <div className="flex items-center gap-4">
                    <p>New Collection name: </p>
                    <input
                        maxLength={16}
                        className="rounded border border-gray-light p-2 dark:border-gray-dark dark:bg-gray-dark/25 focus:dark:outline focus:dark:outline-gray-dark"
                        type="text"
                        autoFocus
                        onKeyDown={(e) =>
                            e.key === 'Enter' &&
                            e.target.value &&
                            createCollection(e.target.value)
                        }
                    />
                </div>
            ) : (
                <button
                    className="flex w-full items-center gap-4 transition-transform active:scale-95"
                    onClick={() => setNamingCollection(true)}
                >
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
                    <p>Create Collection</p>
                </button>
            )}
        </div>
    );
};

export default CreateCollection;
