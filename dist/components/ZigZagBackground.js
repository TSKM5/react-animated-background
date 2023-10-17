import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { animateObjects, resizeCanvas } from '../utils/CanvasUtils';
import { ZigZag } from '../entities/ZigZag';
export default function ZigZagBackground(props) {
    var numberOfCircles = props.numberOfCircles;
    var canvasRef = useRef(null);
    useEffect(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('2D context not supported');
        }
        // Setting up resize handler and initial canvas size
        var handleResize = function () { return resizeCanvas(canvas, ctx); };
        handleResize();
        window.addEventListener('resize', handleResize);
        var asset = Array.from({ length: numberOfCircles }, function () { return new ZigZag(canvas); });
        console.log(asset.length);
        // Animate stars
        animateObjects(canvas, ctx, asset);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return _jsx("canvas", { ref: canvasRef, style: { display: 'block', width: '100%', height: '100%' } });
}
;
