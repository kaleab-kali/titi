import { memo } from 'react';

export const FinalWish: React.FC = memo(() => {
    return (
        <section className="min-h-screen bg-elegant-black relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0">
                {/* Subtle radial gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(183,110,121,0.15)_0%,_transparent_70%)]"></div>
                {/* Decorative lines */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-rose-gold/30 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
                {/* Decorative top flourish */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-rose-gold/50"></div>
                    <span className="text-rose-gold text-lg">&#10045;</span>
                    <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-rose-gold/50"></div>
                </div>

                {/* Main Heading */}
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-cream text-center mb-6 tracking-tight">
                    Here's to You
                </h2>

                {/* Elegant divider */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-px bg-rose-gold/40"></div>
                    <div className="w-2 h-2 border border-rose-gold/60 rotate-45"></div>
                    <div className="w-8 h-px bg-rose-gold/40"></div>
                </div>

                {/* Message */}
                <p className="font-montserrat text-cream/70 text-base md:text-lg leading-relaxed text-center max-w-md mx-auto mb-12">
                    May your day be filled with laughter, love, and all the beautiful things you deserve.
                </p>

                {/* Birthday Wish Card */}
                <div className="relative mb-16">
                    {/* Outer glow */}
                    <div className="absolute -inset-4 bg-rose-gold/10 blur-2xl rounded-full"></div>

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-rose-gold/20 to-rose-gold/5 backdrop-blur-sm border border-rose-gold/30 rounded-2xl px-8 py-6 md:px-12 md:py-8">
                        <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-rose-gold-light font-light tracking-wide text-center">
                            Happy Birthday, Titi!
                        </h3>
                        {/* Decorative sparkles */}
                        <div className="absolute -top-2 -right-2 text-rose-gold/60 text-sm animate-pulse">&#10022;</div>
                        <div className="absolute -bottom-2 -left-2 text-rose-gold/60 text-sm animate-pulse delay-300">&#10022;</div>
                    </div>
                </div>

                {/* Decorative bottom flourish */}
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-rose-gold/30"></div>
                    <span className="text-rose-gold/60 text-xs">&#9830;</span>
                    <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-rose-gold/30"></div>
                </div>
pl
                {/* Footer */}
                <footer className="text-center">
                    <p className="font-montserrat text-cream/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3">
                        Crafted with Love
                    </p>
                    <div className="flex items-center justify-center gap-2 text-rose-gold/50">
                        <span className="w-6 h-px bg-rose-gold/30"></span>
                        <span className="font-playfair text-sm italic text-cream/50">For Tigist Eyob</span>
                        <span className="w-6 h-px bg-rose-gold/30"></span>
                    </div>
                    <p className="font-montserrat text-cream/30 text-[9px] tracking-wider mt-4">
                        2026
                    </p>
                </footer>
            </div>

            {/* Bottom decorative border */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="h-px bg-gradient-to-r from-transparent via-rose-gold/20 to-transparent"></div>
                <div className="h-8 bg-gradient-to-t from-rose-gold/5 to-transparent"></div>
            </div>
        </section>
    );
});

FinalWish.displayName = 'FinalWish';
