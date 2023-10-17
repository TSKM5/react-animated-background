import { BaseAsset } from "./abstracts/BaseAsset";
export declare class Star extends BaseAsset {
    private size;
    private speed;
    constructor(canvas: HTMLCanvasElement);
    draw(ctx: CanvasRenderingContext2D): void;
    move(canvas: HTMLCanvasElement): void;
}
