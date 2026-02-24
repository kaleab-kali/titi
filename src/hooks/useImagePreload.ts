import { useState, useEffect } from 'react';

interface PreloadStatus {
    loaded: number;
    total: number;
    progress: number;
    isComplete: boolean;
}

export const useImagePreload = (urls: string[]): PreloadStatus => {
    const [status, setStatus] = useState<PreloadStatus>({
        loaded: 0,
        total: urls.length,
        progress: 0,
        isComplete: false
    });

    useEffect(() => {
        if (!urls || urls.length === 0) {
            setStatus({ loaded: 0, total: 0, progress: 100, isComplete: true });
            return;
        }

        let loadedCount = 0;
        let isMounted = true;

        const updateStatus = () => {
            if (!isMounted) return;
            const progress = Math.round((loadedCount / urls.length) * 100);
            setStatus({
                loaded: loadedCount,
                total: urls.length,
                progress,
                isComplete: loadedCount === urls.length
            });
        };

        const loadAsset = (url: string): Promise<void> => {
            return new Promise((resolve) => {
                const isVideo = url.match(/\.(mp4|webm)$/i);

                if (isVideo) {
                    const video = document.createElement('video');
                    video.onloadeddata = () => {
                        loadedCount++;
                        updateStatus();
                        resolve();
                    };
                    video.onerror = () => {
                        // Continue even if fail
                        loadedCount++;
                        updateStatus();
                        resolve();
                    };
                    video.src = url;
                    video.load(); // Trigger load
                } else {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        updateStatus();
                        resolve();
                    };
                    img.onerror = () => {
                        // Continue even if fail
                        loadedCount++;
                        updateStatus();
                        resolve();
                    };
                    img.src = url;
                }
            });
        };

        Promise.all(urls.map(loadAsset));

        return () => {
            isMounted = false;
        };
    }, [urls]);

    return status;
};
