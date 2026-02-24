import { useState, useRef, useCallback, useEffect, memo } from 'react';

interface ProgressiveMediaProps {
    src: string;
    placeholder?: string;
    alt?: string;
    className?: string;
    type?: 'image' | 'video';
    onLoad?: () => void;
    autoPlay?: boolean;
}

export const ProgressiveMedia: React.FC<ProgressiveMediaProps> = memo(({
    src,
    placeholder: _placeholder,
    alt = '',
    className = '',
    type = 'image',
    onLoad,
    autoPlay = true
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
        onLoad?.();
    }, [onLoad]);

    // Try to play video - handles mobile autoplay restrictions
    const tryPlayVideo = useCallback(() => {
        const video = videoRef.current;
        if (!video || !autoPlay) return;

        // Ensure video is muted (required for autoplay on mobile)
        video.muted = true;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented - this is normal on some mobile browsers
                // Video will show first frame as fallback
            });
        }
    }, [autoPlay]);

    // Use Intersection Observer to play/pause video when visible
    useEffect(() => {
        if (type !== 'video' || !autoPlay) return;

        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        tryPlayVideo();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, [type, autoPlay, tryPlayVideo]);

    // Also try to play on load
    useEffect(() => {
        if (type === 'video' && isLoaded && autoPlay) {
            tryPlayVideo();
        }
    }, [type, isLoaded, autoPlay, tryPlayVideo]);

    // Handle user interaction to enable autoplay on mobile
    useEffect(() => {
        if (type !== 'video' || !autoPlay) return;

        const handleInteraction = () => {
            tryPlayVideo();
        };

        // Try to play on any user interaction (tap, scroll, etc.)
        document.addEventListener('touchstart', handleInteraction, { once: true });
        document.addEventListener('click', handleInteraction, { once: true });
        document.addEventListener('scroll', handleInteraction, { once: true });

        return () => {
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('scroll', handleInteraction);
        };
    }, [type, autoPlay, tryPlayVideo]);

    if (type === 'video') {
        return (
            <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    loop
                    playsInline
                    autoPlay={autoPlay}
                    preload="auto"
                    onLoadedData={handleLoad}
                    onCanPlay={tryPlayVideo}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                />

                {/* Loading placeholder */}
                {!isLoaded && (
                    <div className="absolute inset-0 bg-elegant-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={src}
                alt={alt}
                onLoad={handleLoad}
                className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'blur-0 opacity-100' : 'blur-sm opacity-70'
                    }`}
            />

            {/* Shimmer effect while loading */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            )}
        </div>
    );
});

ProgressiveMedia.displayName = 'ProgressiveMedia';
