import { useRef, useState, useEffect, memo } from 'react';

const LETTER_LINES = [
    "Dear Tigist,",
    "",
    "Talking to you is the easiest thing in the world.",
    "No awkward silences, no trying too hard —",
    "just you being you, and that's more than enough.",
    "",
    "And your responses... I swear",
    "half the time you text like you're three drinks in,",
    "and it's the funniest thing ever.",
    "You don't even try to be funny — you just are.",
    "",
    "You're beautiful, you're fun to be around,",
    "and you have this energy",
    "that makes people never want the conversation to end.",
    "",
    "You don't just exist in a moment,",
    "you make every moment better.",
    "",
    "Today is yours.",
    "Not because the calendar says so,",
    "but because someone like you",
    "deserves to be celebrated — always.",
    "",
    "Happy Birthday, beautiful.",
    "",
    "Yours,",
    "K.G"
];

const SIGNOFF_LINES = ["Yours,", "K.G", "Happy Birthday, beautiful."];

export const LetterToYou: React.FC = memo(() => {
    const sectionRef = useRef<HTMLElement>(null);
    const [visibleCount, setVisibleCount] = useState(0);
    const hasStarted = useRef(false);
    const done = visibleCount >= LETTER_LINES.length;

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let intervalId: ReturnType<typeof setInterval> | null = null;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasStarted.current) {
                        hasStarted.current = true;
                        let idx = 0;
                        intervalId = setInterval(() => {
                            idx++;
                            // Skip empty lines so blank gaps don't waste a tick
                            while (idx < LETTER_LINES.length && LETTER_LINES[idx] === "") {
                                idx++;
                            }
                            setVisibleCount(idx);
                            if (idx >= LETTER_LINES.length) {
                                setVisibleCount(LETTER_LINES.length);
                                if (intervalId) clearInterval(intervalId);
                            }
                        }, 260);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(section);
        return () => {
            observer.disconnect();
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    // Only render lines up to visibleCount — card grows as lines appear
    const linesToRender = LETTER_LINES.slice(0, visibleCount);

    return (
        <section ref={sectionRef} className="relative bg-cream pt-10 md:pt-16 pb-20 md:pb-32 px-4">
            {/* Subtle paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="max-w-2xl mx-auto relative">
                {/* Big title */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-rose-gold/50"></div>
                        <span className="text-rose-gold text-xs">&#10022;</span>
                        <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-rose-gold/50"></div>
                    </div>
                    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-elegant-black mb-3 tracking-tight">
                        A Letter For You
                    </h2>
                    <p className="font-montserrat text-rose-gold uppercase tracking-[0.3em] text-[9px] sm:text-xs">
                        From The Heart
                    </p>
                </div>

                {/* The letter */}
                <div className="relative bg-white/60 backdrop-blur-sm rounded-sm p-8 sm:p-12 md:p-16 shadow-lg border border-rose-gold/10">
                    {/* Decorative corner flourishes */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-rose-gold/25"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-rose-gold/25"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-rose-gold/25"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-rose-gold/25"></div>

                    {/* Letter lines — only rendered up to current count */}
                    <div className="space-y-1.5 min-h-[60px]">
                        {linesToRender.map((line, idx) => {
                            const isGreeting = idx === 0;
                            const isSignoff = SIGNOFF_LINES.includes(line);
                            const isEmpty = line === "";

                            if (isEmpty) {
                                return <div key={idx} className="h-6" />;
                            }

                            return (
                                <p
                                    key={idx}
                                    className={`
                                        animate-[fadeInUp_0.5s_ease-out_both]
                                        ${isGreeting
                                            ? 'font-playfair text-2xl sm:text-3xl text-elegant-black italic mb-2'
                                            : isSignoff
                                                ? 'font-playfair text-lg sm:text-xl text-rose-gold/80 italic'
                                                : 'font-playfair text-lg sm:text-xl text-elegant-black/80 italic leading-relaxed'
                                        }
                                    `}
                                >
                                    {line}
                                </p>
                            );
                        })}
                    </div>

                    {/* Wax seal with initials — appears when letter is complete */}
                    {done && (
                        <div className="flex justify-center mt-10 animate-[fadeIn_1s_ease-out]">
                            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-rose-gold/30 to-rose-gold/10 flex items-center justify-center shadow-inner">
                                <span className="font-playfair text-rose-gold text-sm font-bold tracking-wide">K.G</span>
                                <div className="absolute inset-1 rounded-full border border-rose-gold/20"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom ornament */}
                <div className="flex items-center justify-center gap-3 mt-10">
                    <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-rose-gold/30"></div>
                    <span className="text-rose-gold/30 text-xs">&#10045;</span>
                    <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-rose-gold/30"></div>
                </div>
            </div>
        </section>
    );
});

LetterToYou.displayName = 'LetterToYou';
