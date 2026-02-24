import { useMemo, memo, useRef, useState, useEffect } from 'react';
import { ProgressiveMedia } from '../ui/ProgressiveMedia';
import { getMediaSrc, getMediaType } from '../../utils/videoPreloader';

interface MediaItemData {
    id: number;
    mediaKey: 'media1' | 'media2' | 'media3' | 'media5' | 'media7' | 'media8' | 'media9';
    alt: string;
    poem: string[];
}

const MEDIA_ITEMS_DATA: MediaItemData[] = [
    {
        id: 1,
        mediaKey: 'media7',
        alt: 'Moment 1',
        poem: [
            "Some people walk in with that vibe so real,",
            "A confidence that's part of the deal,",
            "No need to try, it's just your way,",
            "You bring that energy every day."
        ]
    },
    {
        id: 2,
        mediaKey: 'media2',
        alt: 'Moment 2',
        poem: [
            "There's something different in the air,",
            "When you show up and you're standing there,",
            "A presence that you cannot fake,",
            "The kind of mark that legends make."
        ]
    },
    {
        id: 3,
        mediaKey: 'media8',
        alt: 'Moment 3',
        poem: [
            "Your smile hits different, that's a fact,",
            "Good vibes only, nothing that you lack,",
            "People notice when you're around,",
            "That kind of glow is rarely found."
        ]
    },
    {
        id: 4,
        mediaKey: 'media9',
        alt: 'Nails on Point',
        poem: [
            "Those nails done right, a work of art,",
            "Every detail chosen from the heart,",
            "A little flex, a little flair,",
            "She stays polished beyond compare."
        ]
    },
    {
        id: 5,
        mediaKey: 'media5',
        alt: 'Moment 5',
        poem: [
            "The way you move, the way you shine,",
            "That effortless style is one of a kind,",
            "Not everybody's got what you bring,",
            "You make the ordinary feel like a thing."
        ]
    },
    {
        id: 6,
        mediaKey: 'media3',
        alt: 'Moment 6',
        poem: [
            "Another year, another chapter new,",
            "Birthday wishes coming through,",
            "May this year bring you nothing but the best,",
            "You deserve it more than all the rest."
        ]
    },
];

interface MediaItem {
    id: number;
    src: string;
    alt: string;
    type: 'image' | 'video';
    poem: string[];
}

// Build media items with cached sources - auto-detects image vs video
const getMediaItems = (): MediaItem[] => {
    return MEDIA_ITEMS_DATA.map(item => ({
        id: item.id,
        src: getMediaSrc(item.mediaKey),
        alt: item.alt,
        type: getMediaType(item.mediaKey),
        poem: item.poem
    }));
};

// Hook for individual item animations - resets when scrolling back
const useItemAnimation = (threshold = 0.2) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Animate in when visible, reset when not visible
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
};

// Individual gallery item component with animation
const GalleryItem: React.FC<{ item: MediaItem; index: number }> = memo(({ item, index }) => {
    const { ref, isVisible } = useItemAnimation(0.15);

    return (
        <div
            ref={ref}
            className={`
                flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
                gap-6 md:gap-10 items-center
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
        >
            {/* Media Card - Luxurious Frame */}
            <div className={`w-full md:w-1/2 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : index % 2 === 0 ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'}`}>
                <div className="relative group">
                    {/* Outer decorative border */}
                    <div className="absolute -inset-3 md:-inset-4 border border-rose-gold/20 rounded-sm"></div>

                    {/* Corner accents */}
                    <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-rose-gold/40"></div>
                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-rose-gold/40"></div>
                    <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-rose-gold/40"></div>
                    <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-rose-gold/40"></div>

                    {/* Inner shadow frame */}
                    <div className="relative bg-elegant-black p-1.5 md:p-2 rounded-sm shadow-2xl">
                        {/* Video container */}
                        <div className="relative overflow-hidden aspect-[4/5] rounded-sm">
                            <ProgressiveMedia
                                src={item.src}
                                type={item.type}
                                alt={item.alt}
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle vignette overlay */}
                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Moment number badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-elegant-black px-4 py-1 rounded-full">
                        <span className="font-montserrat text-rose-gold text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
                            Moment {item.id}
                        </span>
                    </div>
                </div>
            </div>

            {/* Poem Card - Elegant Parchment Style */}
            <div className={`w-full md:w-1/2 mt-6 md:mt-0 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : index % 2 === 0 ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'}`}>
                <div className="relative">
                    {/* Background glow */}
                    <div className="absolute -inset-4 bg-rose-gold/5 blur-2xl rounded-3xl"></div>

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-white via-cream to-cream-dark rounded-lg p-6 sm:p-8 md:p-10 shadow-xl border border-rose-gold/10 overflow-hidden">
                        {/* Watermark */}
                        <div className="absolute top-4 right-4 text-rose-gold/5 text-6xl md:text-8xl font-playfair pointer-events-none select-none">
                            "
                        </div>

                        {/* Subtle poem label */}
                        <p className="text-center font-montserrat text-rose-gold/40 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] mb-4">
                            Poem
                        </p>

                        {/* Top ornament */}
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-rose-gold/60"></div>
                            <div className="relative">
                                <div className="w-3 h-3 border border-rose-gold/50 rotate-45"></div>
                                <div className="absolute inset-0.5 bg-rose-gold/20 rotate-45"></div>
                            </div>
                            <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent via-rose-gold/40 to-rose-gold/60"></div>
                        </div>

                        {/* Poem lines */}
                        <div className="space-y-3 text-center relative z-10">
                            {item.poem.map((line, lineIdx) => (
                                <p
                                    key={lineIdx}
                                    className="font-playfair text-elegant-black text-sm sm:text-base md:text-lg italic leading-relaxed tracking-wide"
                                    style={{
                                        textShadow: '0 1px 2px rgba(183, 110, 121, 0.05)'
                                    }}
                                >
                                    {line}
                                </p>
                            ))}
                        </div>

                        {/* Bottom ornament */}
                        <div className="flex items-center justify-center gap-3 mt-6">
                            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-rose-gold/60"></div>
                            <span className="text-rose-gold/60 text-sm">&#10045;</span>
                            <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent via-rose-gold/40 to-rose-gold/60"></div>
                        </div>

                        {/* Decorative corner flourishes */}
                        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-rose-gold/20"></div>
                        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-rose-gold/20"></div>
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-rose-gold/20"></div>
                        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-rose-gold/20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

GalleryItem.displayName = 'GalleryItem';

export const PhotoGallery: React.FC = memo(() => {
    const mediaItems = useMemo(() => getMediaItems(), []);

    return (
        <section className="relative">
            {/* Header section with dark background matching NameAnimation */}
            <div className="bg-black pt-16 pb-20 md:pt-20 md:pb-24 px-4 sm:px-6">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-rose-gold/50"></div>
                        <span className="text-rose-gold text-xs">&#10022;</span>
                        <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-rose-gold/50"></div>
                    </div>
                    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-cream mb-3 tracking-tight">
                        Captured Moments
                    </h2>
                    <p className="font-montserrat text-rose-gold uppercase tracking-[0.3em] text-[9px] sm:text-xs">
                        Timeless Memories
                    </p>
                </div>
            </div>

            {/* Gallery content on cream */}
            <div className="bg-cream py-16 md:py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Gallery - Luxury Cards with scroll animations */}
                <div className="space-y-16 md:space-y-24">
                    {mediaItems.map((item, index) => (
                        <GalleryItem key={item.id} item={item} index={index} />
                    ))}
                </div>

                {/* Bottom flourish */}
                <div className="flex items-center justify-center gap-4 mt-16 md:mt-24">
                    <div className="w-16 md:w-28 h-px bg-gradient-to-r from-transparent to-rose-gold/30"></div>
                    <span className="text-rose-gold/40 text-xs">&#9830; &#9830; &#9830;</span>
                    <div className="w-16 md:w-28 h-px bg-gradient-to-l from-transparent to-rose-gold/30"></div>
                </div>
            </div>
            </div>
        </section>
    );
});

PhotoGallery.displayName = 'PhotoGallery';
