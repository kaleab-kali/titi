import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: string | Element, delay: number = 0) => {
    return gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay,
        ease: 'power3.out'
    });
};

export const fadeIn = (element: string | Element, delay: number = 0) => {
    return gsap.from(element, {
        opacity: 0,
        duration: 1.5,
        delay,
        ease: 'power2.out'
    });
};

export const staggerFadeIn = (elements: string | Element[], stagger: number = 0.2) => {
    return gsap.from(elements, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger,
        ease: 'power3.out'
    });
};

export const parallaxY = (element: string | Element, y: number = 50) => {
    return gsap.to(element, {
        y: -y,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
};
