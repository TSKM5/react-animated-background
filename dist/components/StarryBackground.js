import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Star } from '../entities/Star';
import { animateObjects, resizeCanvas } from '../utils/CanvasUtils';
export default function StarryBackground(props) {
    var numberOfStars = props.numberOfStars;
    var canvasRef = useRef(null);
    useEffect(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('2D context not supported');
        }
        var handleResize = function () { return resizeCanvas(canvas, ctx); };
        handleResize();
        window.addEventListener('resize', handleResize);
        var stars = Array.from({ length: numberOfStars }, function () { return new Star(canvas); });
        animateObjects(canvas, ctx, stars);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, [numberOfStars]);
    return _jsx("canvas", { ref: canvasRef, style: { display: 'block', width: '100%', height: '100%' } });
}
;
