import { BaseAsset } from "../entities/abstracts/BaseAsset";

const getDPR = (): number => window.devicePixelRatio || 1;

const clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const resizeCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void => {
    const dpr = getDPR();
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
};

export function animateObjects(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, objects: BaseAsset[],): void {
    clearCanvas(canvas, ctx);
    objects.forEach(obj => {
        obj.move(canvas);
        obj.draw(ctx);
    });

    requestAnimationFrame(() => animateObjects(canvas, ctx, objects));
};