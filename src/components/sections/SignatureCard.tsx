import React from 'react';

export const SignatureCard: React.FC = () => {
    return (
        <section className="min-h-[50vh] bg-rose-gold-light/20 py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-playfair text-3xl md:text-5xl text-elegant-black mb-12">
                    With Love
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-handwriting">
                    {/* Static messages for now, could be dynamic later */}
                    <div className="bg-white p-6 shadow-md rotate-2 transition-transform hover:rotate-0">
                        <p className="font-playfair italic text-lg text-soft-black mb-4">"Wishing you the happiest of birthdays! Keep shining!"</p>
                        <p className="text-rose-gold font-bold text-right">- Sarah</p>
                    </div>
                    <div className="bg-white p-6 shadow-md -rotate-1 transition-transform hover:rotate-0">
                        <p className="font-playfair italic text-lg text-soft-black mb-4">"To another year of elegance and success. HBD!"</p>
                        <p className="text-rose-gold font-bold text-right">- Michael</p>
                    </div>
                    <div className="bg-white p-6 shadow-md rotate-1 transition-transform hover:rotate-0">
                        <p className="font-playfair italic text-lg text-soft-black mb-4">"Enjoy your special day TITI!"</p>
                        <p className="text-rose-gold font-bold text-right">- Jessica</p>
                    </div>
                    <div className="bg-white p-6 shadow-md -rotate-2 transition-transform hover:rotate-0">
                        <p className="font-playfair italic text-lg text-soft-black mb-4">"Cheers to you and everything you've achieved."</p>
                        <p className="text-rose-gold font-bold text-right">- David</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
