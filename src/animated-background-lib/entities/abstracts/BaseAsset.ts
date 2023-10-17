export abstract class BaseAsset {
    protected x: number;
    protected y: number;
    protected canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.canvas = canvas;
    }
    public abstract draw(ctx: CanvasRenderingContext2D): void;
    public abstract move(canvas: HTMLCanvasElement): void;
}