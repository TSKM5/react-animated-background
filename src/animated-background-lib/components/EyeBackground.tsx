import * as React from 'react';
import { useEffect, useRef } from 'react';
import { animateObjects, resizeCanvas } from '../utils/CanvasUtils';
import { Eye, scatterEntitiesWithinCanvas } from '../entities/Eye';


export default function EyeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('2D context not supported');
        
        const handleResize = () => resizeCanvas(canvas, ctx);
        handleResize();
        
        const eyes: Eye[] = scatterEntitiesWithinCanvas(canvas, 110);
        
        animateObjects(canvas, ctx, eyes);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    

    return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />;
};
