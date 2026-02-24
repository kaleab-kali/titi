import { useState, useCallback, memo } from 'react';
import confetti from 'canvas-confetti';
import { FaGift } from 'react-icons/fa';

interface GiftData {
    id: number;
    label: string;
    title: string;
    message: string;
    emoji: string;
}

const GIFTS: GiftData[] = [
    {
        id: 1,
        label: "Sweet Treat",
        title: "A Box of Chocolates!",
        message: "Life is like a box of chocolates, and you make every moment sweeter. May your birthday be filled with all the sweetness you deserve!",
        emoji: "🍫"
    },
    {
        id: 2,
        label: "Unlimited Hugs",
        title: "Unlimited Hugs!",
        message: "This one has no expiry date. Redeemable anytime, anywhere — no limits. You've officially got a lifetime supply of the warmest hugs waiting for you.",
        emoji: "🤗"
    },
    {
        id: 3,
        label: "Royal Trip",
        title: "A Trip to the Palace!",
        message: "A princess belongs in a palace. Consider this your invitation to the National Palace of Ethiopia — because royalty should feel at home. It's only right.",
        emoji: "👑"
    },
    {
        id: 4,
        label: "Fresh Blooms",
        title: "Beautiful Flowers!",
        message: "Like these roses, you bloom with grace and beauty. May your special day be as lovely and fragrant as a garden in spring!",
        emoji: "🌹"
    },
    {
        id: 5,
        label: "Mystery Gift",
        title: "A Special Surprise!",
        message: "Some things are worth the wait... There's another surprise on its way to you. Stay tuned, beautiful — the best is yet to come.",
        emoji: "🎁"
    },
];

const CONFETTI_COLORS = ['#B76E79', '#D4AF37', '#FFF8F0', '#E8C4C4', '#FFB6C1'];

export const GiftBox: React.FC = memo(() => {
    const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set());
    const [activeModal, setActiveModal] = useState<GiftData | null>(null);

    const triggerConfetti = useCallback(() => {
        const duration = 2500;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 70,
                origin: { x: 0, y: 0.6 },
                colors: CONFETTI_COLORS
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 70,
                origin: { x: 1, y: 0.6 },
                colors: CONFETTI_COLORS
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, []);

    const handleOpenGift = useCallback((gift: GiftData) => {
        if (openedGifts.has(gift.id)) {
            setActiveModal(gift);
            return;
        }

        setOpenedGifts(prev => new Set(prev).add(gift.id));
        setActiveModal(gift);
        triggerConfetti();
    }, [openedGifts, triggerConfetti]);

    const handleClose = useCallback(() => {
        setActiveModal(null);
    }, []);

    return (
        <section className="bg-cream py-16 md:py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-rose-gold/50"></div>
                        <FaGift className="text-rose-gold text-2xl" />
                        <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-rose-gold/50"></div>
                    </div>
                    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-elegant-black mb-3">
                        Unwrap Your Gifts
                    </h2>
                    <p className="font-montserrat text-soft-black/60 text-sm">
                        Five special surprises waiting just for you
                    </p>
                </div>

                {/* Gift Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                    {GIFTS.map((gift) => {
                        const isOpened = openedGifts.has(gift.id);

                        return (
                            <button
                                key={gift.id}
                                onClick={() => handleOpenGift(gift)}
                                className="group relative focus:outline-none"
                                aria-label={`Open ${gift.label}`}
                            >
                                {/* Card */}
                                <div className={`
                                    relative overflow-hidden rounded-2xl
                                    bg-white border-2
                                    p-8 sm:p-10 md:p-12
                                    transition-all duration-300 ease-out
                                    ${isOpened
                                        ? 'border-green-400/50 shadow-lg'
                                        : 'border-rose-gold/30 shadow-xl hover:shadow-2xl hover:-translate-y-3 hover:border-rose-gold'
                                    }
                                `}>
                                    {/* Decorative ribbon bow */}
                                    {!isOpened && (
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                                            <div className="relative">
                                                <div className="w-6 h-6 bg-rose-gold rounded-full"></div>
                                                <div className="absolute -left-3 top-1 w-4 h-3 bg-rose-gold/80 rounded-full rotate-[-30deg]"></div>
                                                <div className="absolute -right-3 top-1 w-4 h-3 bg-rose-gold/80 rounded-full rotate-[30deg]"></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Vertical ribbon */}
                                    {!isOpened && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-gradient-to-b from-rose-gold/40 via-rose-gold/20 to-rose-gold/40"></div>
                                    )}

                                    {/* Gift Icon */}
                                    <div className={`
                                        relative z-10 mb-6
                                        transition-all duration-300
                                        ${isOpened ? '' : 'group-hover:scale-110 animate-bounce'}
                                    `}>
                                        {isOpened ? (
                                            <span className="text-6xl sm:text-7xl">{gift.emoji}</span>
                                        ) : (
                                            <FaGift className="text-rose-gold mx-auto" style={{ fontSize: '4.5rem' }} />
                                        )}
                                    </div>

                                    {/* Label */}
                                    <h3 className="font-playfair text-xl md:text-2xl text-elegant-black mb-2 relative z-10">
                                        {gift.label}
                                    </h3>

                                    {/* Status */}
                                    <p className={`
                                        font-montserrat text-sm relative z-10
                                        ${isOpened ? 'text-green-600' : 'text-rose-gold'}
                                    `}>
                                        {isOpened ? '✓ Opened!' : 'Tap to unwrap'}
                                    </p>

                                    {/* Opened checkmark */}
                                    {isOpened && (
                                        <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                    )}

                                    {/* Glow effect on hover */}
                                    {!isOpened && (
                                        <div className="absolute inset-0 bg-rose-gold/0 group-hover:bg-rose-gold/5 transition-colors duration-300 rounded-2xl"></div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Progress */}
                <div className="text-center mt-10">
                    <div className="flex justify-center gap-3 mb-2">
                        {GIFTS.map((gift) => (
                            <div
                                key={gift.id}
                                className={`
                                    w-3 h-3 rounded-full transition-all duration-300
                                    ${openedGifts.has(gift.id)
                                        ? 'bg-rose-gold scale-110'
                                        : 'bg-rose-gold/20'
                                    }
                                `}
                            />
                        ))}
                    </div>
                    <p className="font-montserrat text-sm text-soft-black/50">
                        {openedGifts.size} of {GIFTS.length} gifts unwrapped
                    </p>
                </div>

                {/* Modal */}
                {activeModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={handleClose}
                        />

                        <div
                            className="relative z-10 bg-cream rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10"
                            style={{ animation: 'scaleIn 0.4s ease-out' }}
                        >
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-soft-black/50 hover:text-elegant-black hover:bg-black/5 rounded-full transition-all text-xl"
                                aria-label="Close"
                            >
                                ✕
                            </button>

                            <div className="text-center">
                                <div className="text-7xl mb-6">{activeModal.emoji}</div>
                                <h3 className="font-playfair text-2xl md:text-3xl text-rose-gold mb-4">
                                    {activeModal.title}
                                </h3>
                                <p className="font-montserrat text-soft-black text-base leading-relaxed">
                                    {activeModal.message}
                                </p>
                                <div className="mt-6 pt-4 border-t border-rose-gold/20">
                                    <span className="text-rose-gold text-sm">&#10022; With love &#10022;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
});

GiftBox.displayName = 'GiftBox';
