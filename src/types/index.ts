export interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}

export interface SectionProps {
    id?: string;
    className?: string;
}

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';
