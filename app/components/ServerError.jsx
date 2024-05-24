import Image from 'next/image';
import React from 'react';

const ServerError = () => {
    return (
        <div className="m-16 mx-4 flex h-full flex-col items-center gap-6 rounded border-2 border-gradient-start bg-gradient-start bg-opacity-50 p-8 text-center md:mx-16">
            <p className="flex items-center gap-2 text-xl">
                <Image src="/error.png" width={40} height={40} alt="error" />
                ERROR
            </p>
            <p className="text-lg">
                You have reached the maximum connections with the database
            </p>
        </div>
    );
};

export default ServerError;
