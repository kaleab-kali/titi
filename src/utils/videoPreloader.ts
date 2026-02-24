// Global media preloader - caches blob URLs for all videos and images

import media1 from '../assets/1.jpeg';
import media2 from '../assets/2.jpeg';
import media3 from '../assets/3.jpeg';
import media5 from '../assets/5.jpeg';
import media7 from '../assets/12.jpeg';
import media8 from '../assets/2.mp4';
import media9 from '../assets/1.mp4';

// Image file extensions
const IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.avif'];

/**
 * Detect whether a source URL is an image or video based on extension
 */
const isImageSrc = (src: string): boolean => {
    const lower = src.toLowerCase();
    return IMAGE_EXTENSIONS.some(ext => lower.includes(ext));
};

// Original sources mapped by key
export const MEDIA_SOURCES = {
    media1,
    media2,
    media3,
    media5,
    media7,
    media8,
    media9,
} as const;

// Keep backward-compat alias
export const VIDEO_SOURCES = MEDIA_SOURCES;

// Cache for blob URLs after preloading
const mediaCache: Map<string, string> = new Map();

// Track if preloading is complete
let preloadComplete = false;

/**
 * Get the media type for a given key
 */
export const getMediaType = (key: keyof typeof MEDIA_SOURCES): 'image' | 'video' => {
    return isImageSrc(MEDIA_SOURCES[key]) ? 'image' : 'video';
};

/**
 * Get a media source - returns cached blob URL if available, otherwise original
 */
export const getMediaSrc = (key: keyof typeof MEDIA_SOURCES): string => {
    const cached = mediaCache.get(key);
    return cached || MEDIA_SOURCES[key];
};

// Backward-compat alias
export const getVideoSrc = getMediaSrc;

/**
 * Check if all media are preloaded
 */
export const isPreloadComplete = (): boolean => preloadComplete;

/**
 * Preload a single image and return blob URL when fully loaded
 */
const preloadSingleImage = (
    src: string,
    key: string,
    onProgress: (bytesLoaded: number, bytesTotal: number) => void
): Promise<string> => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';

        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                onProgress(event.loaded, event.total);
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const blob = xhr.response as Blob;
                const blobUrl = URL.createObjectURL(blob);

                // Verify the image can actually decode
                const testImg = new Image();

                testImg.onload = () => {
                    mediaCache.set(key, blobUrl);
                    onProgress(blob.size, blob.size);
                    resolve(blobUrl);
                };

                testImg.onerror = () => {
                    console.warn(`Image validation failed for ${key}, using blob anyway`);
                    mediaCache.set(key, blobUrl);
                    onProgress(blob.size, blob.size);
                    resolve(blobUrl);
                };

                testImg.src = blobUrl;
            } else {
                console.warn(`Failed to download image ${key}: ${xhr.status}`);
                onProgress(1, 1);
                resolve(src);
            }
        };

        xhr.onerror = () => {
            console.warn(`Network error downloading image ${key}`);
            onProgress(1, 1);
            resolve(src);
        };

        xhr.send();
    });
};

/**
 * Preload a single video and return blob URL when fully loaded
 * Uses actual video element with canplaythrough for true readiness
 */
const preloadSingleVideo = (
    src: string,
    key: string,
    onProgress: (bytesLoaded: number, bytesTotal: number) => void
): Promise<string> => {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';

        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                onProgress(event.loaded, event.total);
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const blob = xhr.response as Blob;
                const blobUrl = URL.createObjectURL(blob);

                // Now verify the video can actually play
                const testVideo = document.createElement('video');
                testVideo.preload = 'auto';
                testVideo.muted = true;
                testVideo.playsInline = true;

                const cleanup = () => {
                    testVideo.src = '';
                    testVideo.load();
                };

                testVideo.oncanplaythrough = () => {
                    mediaCache.set(key, blobUrl);
                    onProgress(blob.size, blob.size);
                    cleanup();
                    resolve(blobUrl);
                };

                testVideo.onerror = () => {
                    console.warn(`Video validation failed for ${key}, using blob anyway`);
                    mediaCache.set(key, blobUrl);
                    onProgress(blob.size, blob.size);
                    cleanup();
                    resolve(blobUrl);
                };

                testVideo.src = blobUrl;
                testVideo.load();

                // Safety timeout - if canplaythrough doesn't fire in 10s, proceed anyway
                setTimeout(() => {
                    if (!mediaCache.has(key)) {
                        console.warn(`Video ${key} canplaythrough timeout, proceeding`);
                        mediaCache.set(key, blobUrl);
                        onProgress(blob.size, blob.size);
                        cleanup();
                        resolve(blobUrl);
                    }
                }, 10000);
            } else {
                console.warn(`Failed to download video ${key}: ${xhr.status}`);
                onProgress(1, 1);
                resolve(src);
            }
        };

        xhr.onerror = () => {
            console.warn(`Network error downloading video ${key}`);
            onProgress(1, 1);
            resolve(src);
        };

        xhr.send();
    });
};

/**
 * Preload a single media item - routes to image or video preloader
 */
const preloadSingleMedia = (
    src: string,
    key: string,
    onProgress: (bytesLoaded: number, bytesTotal: number) => void
): Promise<string> => {
    if (isImageSrc(src)) {
        return preloadSingleImage(src, key, onProgress);
    }
    return preloadSingleVideo(src, key, onProgress);
};

export interface PreloadProgress {
    percent: number;
    loaded: number;
    total: number;
}

/**
 * Preload all media with unified progress tracking
 * Progress only increases, never decreases
 */
export const preloadAllMedia = (
    onProgress: (progress: PreloadProgress) => void
): Promise<void> => {
    return new Promise((resolve) => {
        const mediaKeys = Object.keys(MEDIA_SOURCES) as (keyof typeof MEDIA_SOURCES)[];

        // Track bytes for each media item
        const bytesLoaded: number[] = new Array(mediaKeys.length).fill(0);
        const bytesTotal: number[] = new Array(mediaKeys.length).fill(1);

        // Track the highest percent we've reported (never go backwards)
        let highestPercent = 0;

        const updateProgress = () => {
            const totalLoaded = bytesLoaded.reduce((a, b) => a + b, 0);
            const totalSize = bytesTotal.reduce((a, b) => a + b, 0);

            const currentPercent = totalSize > 0
                ? Math.round((totalLoaded / totalSize) * 100)
                : 0;

            // Never allow progress to go backwards
            if (currentPercent > highestPercent) {
                highestPercent = currentPercent;
            }

            // Clamp to 0-99 until all complete (100 is set explicitly at the end)
            const reportPercent = Math.min(highestPercent, 99);

            onProgress({
                percent: reportPercent,
                loaded: totalLoaded,
                total: totalSize
            });
        };

        // Start all downloads in parallel
        const promises = mediaKeys.map((key, index) => {
            const src = MEDIA_SOURCES[key];
            return preloadSingleMedia(src, key, (loaded, total) => {
                bytesLoaded[index] = loaded;
                bytesTotal[index] = total;
                updateProgress();
            });
        });

        Promise.all(promises).then(() => {
            preloadComplete = true;
            // Final 100% report
            const totalLoaded = bytesLoaded.reduce((a, b) => a + b, 0);
            const totalSize = bytesTotal.reduce((a, b) => a + b, 0);
            onProgress({
                percent: 100,
                loaded: totalLoaded,
                total: totalSize
            });
            resolve();
        });
    });
};

// Backward-compat alias
export const preloadAllVideos = preloadAllMedia;
