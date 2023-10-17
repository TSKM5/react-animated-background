import { ProbabilityMapping, selectValueBasedOnProbability } from "../utils/FunctionalUtils";
import { BaseAsset } from "./abstracts/BaseAsset";



const STAR_SIZE_CONSTANTS = {
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
};
const STAR_SPEED_CONSTANTS = {
    SLOW: 0.25,
    NORMAL: 0.5,
    FAST: 0.75,
};

const starSizeMappings: ProbabilityMapping<number>[] = [
    { value: STAR_SIZE_CONSTANTS.SMALL, probability: 50 },  
    { value: STAR_SIZE_CONSTANTS.MEDIUM, probability: 30 }, 
    { value: STAR_SIZE_CONSTANTS.LARGE, probability: 20 }   
];
const starSpeedMappings: ProbabilityMapping<number>[] = [
    { value: STAR_SPEED_CONSTANTS.SLOW, probability: 50 },  
    { value: STAR_SPEED_CONSTANTS.NORMAL, probability: 30 },
    { value: STAR_SPEED_CONSTANTS.FAST, probability: 20 }   
];


export class Star extends BaseAsset{
    private size: number;
    private speed: number;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas); 
        this.size = selectValueBasedOnProbability(starSizeMappings);
        this.speed = selectValueBasedOnProbability(starSpeedMappings);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5); 
        
        gradient.addColorStop(0.15, 'purple');
        gradient.addColorStop(0.5, 'rgba(255, 248, 212, 0.25)'); 
        gradient.addColorStop(1, 'rgba(255, 248, 212, 0)'); 
        
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2); 
        ctx.closePath();
        ctx.fill();
    }

    public move(canvas: HTMLCanvasElement) {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
}

