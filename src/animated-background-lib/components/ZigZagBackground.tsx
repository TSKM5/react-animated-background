import { useEffect, useRef } from 'react';
import { animateObjects, resizeCanvas } from '../utils/CanvasUtils';
import { ZigZag } from '../entities/ZigZag';


export default function ZigZagBackground(props: { numberOfCircles: number }) {
    const { numberOfCircles } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('2D context not supported');
        }

        // Setting up resize handler and initial canvas size
        const handleResize = () => resizeCanvas(canvas, ctx);
        handleResize();
        window.addEventListener('resize', handleResize);

        const asset = Array.from({length: numberOfCircles}, () => new ZigZag(canvas));
        console.log(asset.length);
        // Animate stars
        animateObjects(canvas, ctx, asset);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />;
};
