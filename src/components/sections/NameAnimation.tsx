import { useState, useEffect, useRef, useMemo, memo } from 'react';
import gsap from 'gsap';

interface LetterData {
    letter: string;
    meaning: string;
    compliment: string;
}

const TIGIST_LETTERS: LetterData[] = [
    { letter: 'T', meaning: 'Timeless', compliment: 'A beauty that never fades' },
    { letter: 'I', meaning: 'Iconic', compliment: 'One of a kind, always' },
    { letter: 'G', meaning: 'Graceful', compliment: 'Elegance in every step' },
    { letter: 'I', meaning: 'Inspiring', compliment: 'Your strength shines through' },
    { letter: 'S', meaning: 'Stunning', compliment: 'Natural glow that captivates' },
    { letter: 'T', meaning: 'Treasured', compliment: 'Precious beyond measure' },
];

export const NameAnimation: React.FC = memo(() => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showFinal, setShowFinal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const letterRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const animationKey = useRef(0);
    const letters = useMemo(() => TIGIST_LETTERS, []);

    // Intersection Observer - resets animation when scrolling back
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Reset and start animation when entering view
                        animationKey.current += 1;
                        setCurrentIndex(0);
                        setShowFinal(false);
                        setIsVisible(true);
                    } else {
                        // Stop animation when leaving view
                        setIsVisible(false);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Letter animation effect
    useEffect(() => {
        if (!isVisible) return;

        if (currentIndex >= letters.length) {
            setShowFinal(true);
            return;
        }

        const currentKey = animationKey.current;

        if (letterRef.current) {
            gsap.fromTo(letterRef.current,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
            );
        }

        const timer = setTimeout(() => {
            // Only proceed if still the same animation cycle
            if (animationKey.current !== currentKey) return;

            if (letterRef.current) {
                gsap.to(letterRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power2.in',
                    onComplete: () => {
                        if (animationKey.current === currentKey) {
                            setCurrentIndex(prev => prev + 1);
                        }
                    }
                });
            }
        }, 1800);

        return () => clearTimeout(timer);
    }, [currentIndex, letters.length, isVisible]);

    const currentLetter = letters[currentIndex];

    return (
        <section ref={sectionRef} className="relative">
            {/* Dark top section - seamless from VogueCover */}
            <div className="bg-black pt-16 pb-20 md:pt-20 md:pb-28 px-4">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Section Title */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-rose-gold/40"></div>
                        <span className="text-rose-gold/60 text-xs">&#10022;</span>
                        <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-rose-gold/40"></div>
                    </div>
                    <span className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cream/60 block">
                        The Meaning Behind The Name
                    </span>

                    {/* Animation Area */}
                    {!showFinal ? (
                        <div className="min-h-[220px] sm:min-h-[260px] flex items-center justify-center mt-8">
                            <div ref={letterRef} className="text-center">
                                {currentLetter && (
                                    <>
                                        {/* Big Letter */}
                                        <div
                                            className="font-playfair text-rose-gold font-bold leading-none mb-4"
                                            style={{
                                                fontSize: 'clamp(5rem, 20vw, 9rem)',
                                                textShadow: '0 0 60px rgba(183, 110, 121, 0.3)'
                                            }}
                                        >
                                            {currentLetter.letter}
                                        </div>

                                        {/* Meaning */}
                                        <p className="font-playfair text-cream text-xl sm:text-2xl md:text-3xl italic mb-2">
                                            {currentLetter.meaning}
                                        </p>

                                        {/* Compliment */}
                                        <p className="font-montserrat text-cream/60 text-xs sm:text-sm max-w-xs mx-auto">
                                            {currentLetter.compliment}
                                        </p>

                                        {/* Progress dots */}
                                        <div className="flex justify-center gap-2 mt-6">
                                            {letters.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                        idx <= currentIndex
                                                            ? 'bg-rose-gold shadow-lg shadow-rose-gold/50'
                                                            : 'bg-cream/20'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Final State - All letters with meanings */
                        <div className="animate-[fadeIn_0.8s_ease-out] mt-8">
                            {/* TITI spelled out */}
                            <div className="flex justify-center gap-1 sm:gap-2 md:gap-3 mb-10">
                                {letters.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="font-playfair text-rose-gold font-bold"
                                        style={{
                                            fontSize: 'clamp(2.5rem, 10vw, 5rem)',
                                            textShadow: '0 0 40px rgba(183, 110, 121, 0.3)'
                                        }}
                                    >
                                        {item.letter}
                                    </span>
                                ))}
                            </div>

                            {/* All meanings grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
                                {letters.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-rose-gold/20"
                                    >
                                        <span className="font-playfair text-rose-gold text-2xl sm:text-3xl font-bold">
                                            {item.letter}
                                        </span>
                                        <p className="font-montserrat text-cream text-sm font-medium mt-2">
                                            {item.meaning}
                                        </p>
                                        <p className="font-montserrat text-cream/50 text-[10px] sm:text-xs mt-1 leading-relaxed">
                                            {item.compliment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
});

NameAnimation.displayName = 'NameAnimation';
