import Image from "next/image";
import React, { useState } from 'react';
import plusIcon from '../../public/Plus.svg';
import CreateCollection from "./CreateCollection";

const CollectionsModal = ({ id, thumb, showModal, setShowModal, collections, setCollections }) => {

    const [filter, setFilter] = useState('');

    const notIncludedCollections = collections ? collections.filter(c => !c.photos.includes(id)) : [];

    const addToCollection  = (collection) => {
        collection.photos.push(id);
        collection.preview = thumb;
        const newCollections = [...collections.filter(col => col.title !== collection.title), collection]
        setCollections(newCollections);
        setShowModal(false);
    }

    const filteredNotIncludedCollections = notIncludedCollections.filter(collection => collection.title.toLowerCase().includes(filter.toLowerCase()));

    return (
        <dialog open={showModal}>
                <div className="flex flex-col w-[35rem] bg-white rounded p-4 gap-4  z-20 relative">
                    <header className="font-bold text-lg">Add to Collections</header>
                    <input
                        onKeyDown={(e) => e.key === 'Enter' && null}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="max-w-[600px] bg-[url('../public/Search.svg')] bg-no-repeat bg-right bg-contain w-full my-2 shadow border border-gray-light p-4 rounded-lg"
                        type="text"
                        placeholder="Enter your keywords..."
                    />
                    <CreateCollection showModal={showModal} collections={collections} setCollections={setCollections} />
                    <p className="text-xs text-dark">{filteredNotIncludedCollections.length} matches</p>
                    <ul className="flex flex-col gap-8 w-full">
                        {filteredNotIncludedCollections.map((collection, index) => (
                            <li key={index} className="flex gap-4 w-full items-center">
                                <Image className="object-cover w-10 h-10" src={collection.preview} alt={collection.title} width={40} height={40}/>
                                <div>
                                    <p>{collection.title}</p>
                                    <p>{collection.photos.length} photos</p>
                                </div>
                                <button onClick={() => addToCollection(collection)} className="flex items-center gap-2 ml-auto">
                                    <Image
                                        src={plusIcon}
                                        alt="add"
                                        width={20}
                                        height={20}
                                    />
                                    <span>Add to Collection</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            <div onClick={() => setShowModal(false)} className="w-screen h-screen bg-gray-dark fixed top-0 left-0 bg-opacity-50 flex justify-center items-center">
            </div>
        </dialog>
    );
};

export default CollectionsModal;
