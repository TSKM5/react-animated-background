import { BaseAsset } from "./abstracts/BaseAsset";
export declare class Eye extends BaseAsset {
    private eyeSizes;
    private animationTimeSecs;
    private eyePositionX;
    private eyePositionY;
    private pupilPositionX;
    private pupilPositionY;
    private lastDirection?;
    private activeTimer;
    constructor(canvas: HTMLCanvasElement, xPosition: number, yPosition: number);
    draw(ctx: CanvasRenderingContext2D): void;
    move(canvas: HTMLCanvasElement): void;
    setPosition(x: number, y: number): void;
    private setPupilPosition;
    private setTimer;
    private processMovement;
    getPositionX(): number;
    getPositionY(): number;
    setPositionX(val: number): void;
    setPositionY(val: number): void;
    getSizeX(): number;
    getSizeY(): number;
}
export declare function scatterEntitiesWithinCanvas(canvas: HTMLCanvasElement, spacing: number): Eye[];
