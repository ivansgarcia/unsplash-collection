import React from 'react';

const DownloadButton = ({ currentImage }) => {
    const download = async () => {
        const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY;
        const downloadLocation = currentImage?.links.download_location;

        if (!downloadLocation) {
            console.error('Download location not found');
            return;
        }

        try {
            const response = await fetch(
                `${downloadLocation}?client_id=${accessKey}`
            );
            if (!response.ok) {
                throw new Error(
                    'Network response was not ok ' + response.statusText
                );
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
            console.error(
                'There was an error with the fetch operation:',
                error
            );
        }
    };
    return (
        <button
            onClick={download}
            className="flex items-center gap-2 rounded bg-gray-light px-5 py-3 text-sm font-semibold active:scale-95 dark:bg-gray-dark/50 dark:text-gray-semi"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7.52683 10.4733C7.59023 10.534 7.665 10.5816 7.74683 10.6133C7.90914 10.68 8.09119 10.68 8.2535 10.6133C8.33533 10.5816 8.41009 10.534 8.4735 10.4733L10.4735 8.47332C10.599 8.34778 10.6696 8.17752 10.6696 7.99998C10.6696 7.82245 10.599 7.65219 10.4735 7.52665C10.348 7.40111 10.1777 7.33059 10.0002 7.33059C9.82263 7.33059 9.65237 7.40111 9.52683 7.52665L8.66683 8.39332V5.99998C8.66683 5.82317 8.59659 5.6536 8.47157 5.52858C8.34654 5.40355 8.17697 5.33332 8.00016 5.33332C7.82335 5.33332 7.65378 5.40355 7.52876 5.52858C7.40373 5.6536 7.3335 5.82317 7.3335 5.99998V8.39332L6.4735 7.52665C6.41152 7.46416 6.33779 7.41457 6.25655 7.38072C6.17531 7.34688 6.08817 7.32945 6.00016 7.32945C5.91215 7.32945 5.82502 7.34688 5.74378 7.38072C5.66254 7.41457 5.5888 7.46416 5.52683 7.52665C5.46434 7.58862 5.41475 7.66236 5.3809 7.7436C5.34706 7.82484 5.32963 7.91198 5.32963 7.99998C5.32963 8.08799 5.34706 8.17513 5.3809 8.25637C5.41475 8.33761 5.46434 8.41134 5.52683 8.47332L7.52683 10.4733ZM8.00016 14.6666C9.31871 14.6666 10.6076 14.2757 11.704 13.5431C12.8003 12.8106 13.6548 11.7694 14.1594 10.5512C14.6639 9.33303 14.796 7.99259 14.5387 6.69938C14.2815 5.40617 13.6466 4.21829 12.7142 3.28594C11.7819 2.35359 10.594 1.71865 9.30076 1.46141C8.00756 1.20418 6.66711 1.3362 5.44894 1.84079C4.23077 2.34537 3.18957 3.19985 2.45703 4.29618C1.72449 5.39251 1.3335 6.68144 1.3335 7.99998C1.3335 9.76809 2.03588 11.4638 3.28612 12.714C3.90517 13.3331 4.6401 13.8241 5.44894 14.1592C6.25778 14.4942 7.12468 14.6666 8.00016 14.6666V14.6666ZM8.00016 2.66665C9.055 2.66665 10.0861 2.97944 10.9632 3.56548C11.8403 4.15151 12.5239 4.98447 12.9275 5.959C13.3312 6.93354 13.4368 8.0059 13.231 9.04046C13.0252 10.075 12.5173 11.0253 11.7714 11.7712C11.0255 12.5171 10.0752 13.0251 9.04064 13.2308C8.00608 13.4366 6.93372 13.331 5.95918 12.9273C4.98465 12.5237 4.15169 11.8401 3.56566 10.963C2.97962 10.086 2.66683 9.05482 2.66683 7.99998C2.66683 6.58549 3.22873 5.22894 4.22893 4.22875C5.22912 3.22855 6.58567 2.66665 8.00016 2.66665V2.66665Z"
                    fill="#121826"
                    className="dark:fill-gray-semi"
                />
            </svg>
            Download
        </button>
    );
};

export default DownloadButton;
