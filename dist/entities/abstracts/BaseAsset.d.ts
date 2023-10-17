export declare abstract class BaseAsset {
    protected x: number;
    protected y: number;
    protected canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract move(canvas: HTMLCanvasElement): void;
}
