import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Star } from '../entities/Star';
import { animateObjects, resizeCanvas } from '../utils/CanvasUtils';


export default function StarryBackground(props: { numberOfStars: number }) {
    const { numberOfStars } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('2D context not supported');
        }

        const handleResize = () => resizeCanvas(canvas, ctx);
        handleResize();
        window.addEventListener('resize', handleResize);

        const stars = Array.from({ length: numberOfStars }, () => new Star(canvas));

        animateObjects(canvas, ctx, stars);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [numberOfStars]);

    return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />;
};
