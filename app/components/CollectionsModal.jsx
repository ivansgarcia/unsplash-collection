import Image from "next/image";
import React, { useState } from 'react';
import plusIcon from '../../public/Plus.svg';
import CreateCollection from "./CreateCollection";

const CollectionsModal = ({ id, thumb, showModal, setShowModal, collections, setCollections }) => {

    console.log(collections);
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
        <dialog open={showModal} className={`${showModal ? 'flex' : 'hidden'} justify-center items-center`}>
                <div className="w-[90vw] flex flex-col md:w-[35rem] bg-white rounded p-5 gap-4 z-20">
                    <header className="font-bold text-xl">Add to Collections</header>
                    <input
                        onKeyDown={(e) => e.key === 'Enter' && null}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="max-w-[600px] bg-[url('../public/Search.svg')] bg-no-repeat bg-[center_right_1rem] bg-auto w-full my-2 shadow border border-gray-light p-4 rounded-lg"
                        type="text"
                        placeholder="Find Collection..."
                    />
                    <CreateCollection showModal={showModal} collections={collections} setCollections={setCollections} />
                    {filter && <p className="text-xs text-dark">{filteredNotIncludedCollections.length} matches</p>}
                    <ul className="flex flex-col gap-4 w-full mb-10">
                        {filteredNotIncludedCollections.map((collection, index) => (
                            <li key={index} className="group flex gap-4 w-full items-center hover:bg-gray-semi p-2.5 rounded">
                                <Image className="object-cover w-16 h-16 rounded" src={collection.preview} alt={collection.title} width={50} height={50}/>
                                <div>
                                    <p>{collection.title}</p>
                                    <p>{collection.photos.length} photos</p>
                                </div>
                                <button onClick={() => addToCollection(collection)} className="hidden group-hover:flex items-center gap-2 ml-auto text-xs active:scale-95 transition-transform">
                                    <Image
                                        src={plusIcon}
                                        alt="add"
                                        width={15}
                                        height={15}
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
