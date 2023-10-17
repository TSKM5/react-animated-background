import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { animateObjects, resizeCanvas } from '../utils/CanvasUtils';
import { scatterEntitiesWithinCanvas } from '../entities/Eye';
export default function EyeBackground() {
    var canvasRef = useRef(null);
    useEffect(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx)
            throw new Error('2D context not supported');
        var handleResize = function () { return resizeCanvas(canvas, ctx); };
        handleResize();
        var eyes = scatterEntitiesWithinCanvas(canvas, 110);
        animateObjects(canvas, ctx, eyes);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return _jsx("canvas", { ref: canvasRef, style: { display: 'block', width: '100%', height: '100%' } });
}
;
