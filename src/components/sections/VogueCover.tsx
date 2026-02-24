import { useRef, memo } from 'react';
import { ProgressiveMedia } from '../ui/ProgressiveMedia';
import { getMediaSrc, getMediaType } from '../../utils/videoPreloader';

export const VogueCover: React.FC = memo(() => {
    const containerRef = useRef<HTMLElement>(null);
    const coverSrc = getMediaSrc('media1');
    const coverType = getMediaType('media1');

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Full Bleed Background Video */}
            <div className="absolute inset-0 z-0">
                <ProgressiveMedia
                    src={coverSrc}
                    type={coverType}
                    alt="TITI Vogue Cover"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for text contrast */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* ========== DESKTOP VERSION (md and up) ========== */}
            <div className="hidden md:flex relative z-10 w-full h-full min-h-screen flex-col">

                {/* Top Bar - Date and Price */}
                <div className="flex justify-between items-center px-8 pt-6 text-white/80">
                    <span className="font-montserrat text-xs tracking-[0.3em] uppercase">
                        February 24 2026
                    </span>
                    <span className="font-montserrat text-xs tracking-wider">
                        Birthday Edition
                    </span>
                </div>

                {/* VOGUE Masthead */}
                <div className="text-center mt-4">
                    <h1 className="font-serif text-[15vw] lg:text-[180px] leading-none text-white tracking-[-0.02em] font-light"
                        style={{ fontFamily: "'Didot', 'Playfair Display', 'Times New Roman', serif" }}>
                        VOGUE
                    </h1>
                </div>

                {/* Spacer to push content down */}
                <div className="flex-1"></div>

                {/* Bottom Content Area */}
                <div className="px-8 lg:px-12 pb-12">
                    <div className="flex justify-between items-end gap-6">

                        {/* Left Side - Main Feature */}
                        <div className="text-left max-w-md">
                            <p className="font-montserrat text-rose-gold-light text-xs tracking-[0.3em] uppercase mb-2">
                                The Birthday Issue
                            </p>
                            <h2 className="font-playfair text-7xl lg:text-8xl text-white font-light tracking-tight leading-none mb-3">
                                    TITI
                            </h2>
                            <p className="font-montserrat text-white/90 text-sm tracking-wide leading-relaxed max-w-xs">
                                Celebrating elegance, beauty, and another year of being absolutely iconic
                            </p>
                        </div>

                        {/* Right Side - Headlines */}
                        <div className="text-right space-y-3">
                            <div>
                                <p className="font-playfair text-rose-gold-light text-xl lg:text-2xl italic">
                                    Inside
                                </p>
                            </div>
                            <ul className="font-montserrat text-white/80 text-xs space-y-1 tracking-wide">
                                <li>The Art of Being Extraordinary</li>
                                <li>Style Icon of the Year</li>
                                <li>A Celebration of Life</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Border Line */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-rose-gold/50 to-transparent mx-8 mb-4"></div>

                {/* Vogue Frame Border (subtle) - Desktop */}
                <div className="absolute inset-8 border border-white/10 pointer-events-none"></div>
            </div>

            {/* ========== MOBILE VERSION (below md) ========== */}
            <div className="md:hidden absolute inset-0 z-10 flex flex-col p-4">

                {/* Magazine Frame Border - Mobile */}
                <div className="absolute inset-3 border border-white/20 pointer-events-none z-30"></div>

                {/* Top Section: Date & Tagline */}
                <div className="flex justify-between items-start text-white/80 text-[8px] tracking-[0.2em] uppercase font-montserrat">
                    <span>February 24 2026</span>
                    <span>Birthday Edition</span>
                </div>

                {/* VOGUE Masthead - Mobile */}
                <div className="text-center mt-2">
                    <h1
                        className="text-white font-light tracking-[0.05em] leading-none text-[18vw]"
                        style={{ fontFamily: "'Didot', 'Playfair Display', 'Times New Roman', serif" }}
                    >
                        VOGUE
                    </h1>
                </div>

                {/* Side Headlines - Left */}
                <div className="absolute left-4 top-1/3 text-white/70 font-montserrat text-[7px] tracking-wide space-y-1">
                    <p>Beauty Redefined</p>
                    <p>Style Icon 2026</p>
                    <p>The Art of Elegance</p>
                </div>

                {/* Side Headlines - Right */}
                <div className="absolute right-4 top-1/3 text-right text-white/70 font-montserrat text-[7px] tracking-wide space-y-1">
                    <p>Exclusive Interview</p>
                    <p>Fashion Forward</p>
                    <p>A Star is Born</p>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Bottom Section: Main Feature Text - Mobile */}
                <div className="text-center pb-2">
                    <p className="font-montserrat text-rose-gold-light text-[8px] tracking-[0.3em] uppercase mb-1">
                        ★ Cover Star ★
                    </p>
                    <h2
                        className="font-playfair text-white font-light tracking-tight leading-none text-[14vw]"
                    >
                        TITI
                    </h2>
                    <p className="font-montserrat text-white/80 text-[9px] tracking-wide mt-2 max-w-[240px] mx-auto">
                        Celebrating elegance, beauty & another year of being absolutely iconic
                    </p>

                    {/* Mobile Keywords */}
                    <div className="flex justify-center gap-3 mt-3 text-white/60 font-montserrat text-[7px] tracking-wide">
                        <span>Beauty</span>
                        <span>•</span>
                        <span>Style</span>
                        <span>•</span>
                        <span>Elegance</span>
                    </div>
                </div>

                {/* Bottom Bar - Mobile */}
                <div className="flex justify-between items-end text-white/50 font-montserrat text-[7px] tracking-wider uppercase">
                    <span>www.vogue.com</span>
                    <span>$6.99</span>
                </div>
            </div>
        </section>
    );
});

VogueCover.displayName = 'VogueCover';
