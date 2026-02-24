import { useMemo } from 'react';
import { FaGift, FaStar, FaHeart } from 'react-icons/fa';

const BIRTHDAY_COMPLIMENTS = [
    {
        id: 1,
        text: "You're not getting older, you're getting more fabulous! ✨",
        icon: FaStar,
    },
    {
        id: 2,
        text: "Another year of being absolutely iconic 👑",
        icon: FaHeart,
    },
    {
        id: 3,
        text: "Age is just a number, but your awesomeness is infinite 🌟",
        icon: FaStar,
    },
    {
        id: 4,
        text: "May your birthday be as amazing as your selfies 📸",
        icon: FaGift,
    },
    {
        id: 5,
        text: "You're basically a limited edition human 💎",
        icon: FaHeart,
    },
    {
        id: 6,
        text: "Keep slaying, birthday queen! 🎂",
        icon: FaStar,
    },
];

export const BirthdayCompliments: React.FC = () => {
    const compliments = useMemo(() => BIRTHDAY_COMPLIMENTS, []);

    return (
        <section className="min-h-screen bg-gradient-to-b from-cream to-rose-gold-light/30 py-16 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-elegant-black mb-4">
                        Birthday Vibes Only
                    </h2>
                    <p className="font-montserrat text-soft-black text-sm md:text-base uppercase tracking-[0.2em]">
                        Some truths about you
                    </p>
                </div>

                {/* Compliments Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {compliments.map((compliment, index) => {
                        const Icon = compliment.icon;
                        const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1', '-rotate-2'];

                        return (
                            <div
                                key={compliment.id}
                                className={`
                  bg-white p-6 md:p-8 rounded-lg shadow-lg
                  transform ${rotations[index]} 
                  transition-all duration-300 
                  hover:rotate-0 hover:scale-105 hover:shadow-xl
                  border border-rose-gold/10
                `}
                            >
                                <Icon className="text-rose-gold text-2xl md:text-3xl mb-4" />
                                <p className="font-montserrat text-elegant-black text-base md:text-lg leading-relaxed">
                                    {compliment.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
