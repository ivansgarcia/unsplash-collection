import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import plusIcon from '../../public/Plus.svg';

const CreateCollection = ({ collections, setCollections, showModal }) => {
    const [namingCollection, setNamingCollection] = useState(false);

    useEffect(() => {
        setNamingCollection(false);
    }, [showModal]);

    const createCollection = (name) => {
        if (collections.find(c => c.title === name)) {
            name = name + '_new';
        }
        const newCollections = [...collections, { title: name, photos: [], preview: '/empty.png' }];
        console.log('new collection', name);
        setCollections(newCollections);
        setNamingCollection(false);
    }
    return (
        <>
            {namingCollection ? (
                <div className="flex gap-4 items-center">
                    <p>New Collection name: </p>
                    <input className="outline-2 outline-gray-semi p-2" type="text" autoFocus
                        onKeyDown={e => e.key === 'Enter' && e.target.value && createCollection(e.target.value)}
                    />
                </div>
            ) : (
                <button className="flex gap-4 items-center" onClick={() => setNamingCollection(true)}>
                    <Image src={plusIcon} alt="create" width={20} height={20} />
                    <p>Create Collection</p>
                </button>
            )}
        </>
    );
};

export default CreateCollection;
