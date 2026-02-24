import { useState, useCallback, memo } from 'react';

const WISH_CATEGORIES = [
    {
        label: "This Year Brings You...",
        wishes: [
            "Endless happiness & joy",
            "New adventures awaiting",
            "Dreams coming true",
            "Love in abundance",
            "Success in everything",
            "Beautiful surprises"
        ]
    },
    {
        label: "You Deserve...",
        wishes: [
            "All the best things in life",
            "A year full of magic",
            "Moments that take your breath away",
            "People who cherish you",
            "Everything your heart desires",
            "Days filled with laughter"
        ]
    },
    {
        label: "May You Find...",
        wishes: [
            "Peace in every moment",
            "Strength in challenges",
            "Joy in little things",
            "Love everywhere you go",
            "Success in your goals",
            "Magic in everyday life"
        ]
    }
];

export const BirthdayWishMaker: React.FC = memo(() => {
    const [currentWishes, setCurrentWishes] = useState<string[]>([]);
    const [isRevealing, setIsRevealing] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const generateWishes = useCallback(() => {
        setIsRevealing(true);
        setHasGenerated(true);

        // Pick one random wish from each category
        const newWishes = WISH_CATEGORIES.map(category => {
            const randomIndex = Math.floor(Math.random() * category.wishes.length);
            return category.wishes[randomIndex];
        });

        // Reveal with delay for effect
        setTimeout(() => {
            setCurrentWishes(newWishes);
            setIsRevealing(false);
        }, 800);
    }, []);

    return (
        <section className="bg-gradient-to-b from-cream to-cream-dark py-12 md:py-16 px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-rose-gold/40"></div>
                        <span className="text-rose-gold/60 text-xs">&#10038;</span>
                        <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-rose-gold/40"></div>
                    </div>
                    <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-elegant-black mb-2">
                        Birthday Wish Generator
                    </h2>
                    <p className="font-montserrat text-soft-black/70 text-xs sm:text-sm">
                        Tap the button to reveal your special birthday wishes
                    </p>
                </div>

                {/* Wish Cards */}
                <div className="space-y-4 mb-8">
                    {WISH_CATEGORIES.map((category, index) => (
                        <div
                            key={index}
                            className="relative bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-rose-gold/10 shadow-md overflow-hidden"
                        >
                            {/* Category Label */}
                            <p className="font-montserrat text-rose-gold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2">
                                {category.label}
                            </p>

                            {/* Wish Content */}
                            <div className="min-h-[2rem] flex items-center justify-center">
                                {!hasGenerated ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-soft-black/30 text-lg">?</span>
                                        <span className="text-soft-black/30 text-lg">?</span>
                                        <span className="text-soft-black/30 text-lg">?</span>
                                    </div>
                                ) : isRevealing ? (
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-rose-gold/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-rose-gold/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-rose-gold/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                ) : (
                                    <p className="font-playfair text-elegant-black text-base sm:text-lg italic animate-[fadeIn_0.5s_ease-out]">
                                        {currentWishes[index]}
                                    </p>
                                )}
                            </div>

                            {/* Decorative corners */}
                            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-rose-gold/20"></div>
                            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-rose-gold/20"></div>
                            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-rose-gold/20"></div>
                            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-rose-gold/20"></div>
                        </div>
                    ))}
                </div>

                {/* Generate Button */}
                <button
                    onClick={generateWishes}
                    disabled={isRevealing}
                    className={`
                        relative px-8 py-3 rounded-full font-montserrat text-sm tracking-wider uppercase
                        transition-all duration-300 transform
                        ${isRevealing
                            ? 'bg-rose-gold/50 text-cream cursor-not-allowed'
                            : 'bg-rose-gold text-cream hover:bg-rose-gold-dark hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                        }
                    `}
                >
                    {!hasGenerated ? 'Reveal My Wishes' : isRevealing ? 'Revealing...' : 'Generate New Wishes'}
                </button>

                {/* Fun note */}
                {hasGenerated && !isRevealing && (
                    <p className="mt-4 font-montserrat text-soft-black/50 text-[10px] sm:text-xs animate-[fadeIn_0.5s_ease-out]">
                        ✨ These wishes are specially generated for you ✨
                    </p>
                )}
            </div>
        </section>
    );
});

BirthdayWishMaker.displayName = 'BirthdayWishMaker';
