import { useMemo, memo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useState } from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = memo(({ children }) => {
    const [particlesReady, setParticlesReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setParticlesReady(true);
        });
    }, []);

    const particleOptions = useMemo(() => ({
        background: {
            opacity: 0
        },
        fpsLimit: 60,
        particles: {
            color: {
                value: "#D4AF37",
            },
            links: {
                enable: false,
            },
            move: {
                enable: true,
                speed: 0.3,
                direction: "top" as const,
                random: true,
                straight: false,
                outModes: "out" as const,
            },
            number: {
                value: 20,
            },
            opacity: {
                value: 0.2,
                animation: {
                    enable: true,
                    speed: 0.3,
                    sync: false
                }
            },
            size: {
                value: { min: 1, max: 2 },
            },
        },
        detectRetina: true,
    }), []);

    return (
        <div className="min-h-screen bg-cream text-elegant-black font-montserrat overflow-x-hidden relative selection:bg-rose-gold selection:text-cream">
            {/* Background Particles - Subtle gold dust */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {particlesReady && (
                    <Particles
                        id="tsparticles"
                        options={particleOptions}
                        className="w-full h-full"
                    />
                )}
            </div>

            <main className="relative z-10 w-full">
                {children}
            </main>
        </div>
    );
});

Layout.displayName = 'Layout';
