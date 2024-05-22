import Image from 'next/image';
import React from 'react';

const ServerError = () => {
    return (
        <div className="flex m-16 mx-4 md:mx-16 h-full flex-col items-center gap-6 text-center border-2 border-gradient-start bg-gradient-start bg-opacity-50 rounded p-8">
            <p className="text-xl flex items-center gap-2">
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
