import { useEffect, useRef, useCallback, memo, useState } from 'react';
import gsap from 'gsap';
import { preloadAllVideos } from '../../utils/videoPreloader';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = memo(({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const hasCompleted = useRef(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('Preparing your experience...');

    const animateOut = useCallback(() => {
        if (hasCompleted.current || !containerRef.current) return;
        hasCompleted.current = true;

        setStatusText('Ready!');
        setProgress(100);

        setTimeout(() => {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: onComplete
            });
        }, 500);
    }, [onComplete]);

    useEffect(() => {
        const startLoading = async () => {
            setStatusText('Loading...');

            await preloadAllVideos(({ percent }) => {
                // Progress only increases, handled by preloader
                setProgress(percent);
                if (progressRef.current) {
                    progressRef.current.style.width = `${percent}%`;
                }
            });

            // All videos fully preloaded and ready to play
            animateOut();
        };

        startLoading();

        // Safety fallback: max 90 seconds for slow connections
        const fallback = setTimeout(() => {
            if (!hasCompleted.current) {
                console.warn('Loading timeout reached - proceeding anyway');
                animateOut();
            }
        }, 90000);

        return () => clearTimeout(fallback);
    }, [animateOut]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
        >
            <div className="text-center px-4">
                {/* TITI Logo */}
                <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-rose-gold mb-8 md:mb-12 tracking-[0.1em]">
                    TITI
                </h1>

                {/* Progress Bar */}
                <div className="w-48 md:w-64 h-[3px] bg-rose-gold/20 rounded-full overflow-hidden mx-auto">
                    <div
                        ref={progressRef}
                        className="h-full bg-rose-gold rounded-full transition-all duration-150 ease-out"
                        style={{ width: '0%' }}
                    />
                </div>

                {/* Percentage */}
                <p className="mt-4 font-montserrat text-rose-gold text-2xl md:text-3xl font-semibold">
                    {progress}%
                </p>

                {/* Status Text */}
                <p className="mt-2 font-montserrat text-soft-black/70 text-xs md:text-sm tracking-[0.15em] uppercase">
                    {statusText}
                </p>
            </div>
        </div>
    );
});

LoadingScreen.displayName = 'LoadingScreen';
