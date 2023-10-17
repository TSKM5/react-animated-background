import { BaseAsset } from "./abstracts/BaseAsset";
export declare class ZigZag extends BaseAsset {
    private amplitude;
    private baseY;
    private borderX;
    private speedX;
    private wavelength;
    private colour;
    private size;
    private direction;
    constructor(canvas: HTMLCanvasElement);
    private initValues;
    draw(ctx: CanvasRenderingContext2D): void;
    move(canvas: HTMLCanvasElement): void;
}
