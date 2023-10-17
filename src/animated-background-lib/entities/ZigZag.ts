import { ProbabilityMapping, getRandomInt, selectValueBasedOnProbability } from "../utils/FunctionalUtils";
import { BaseAsset } from "./abstracts/BaseAsset";

const CIRCLE_SIZE_CONSTANTS = {
    SMALLEST: 5,
    SMALL: 10,
    MEDIUM: 20,
    LARGE: 30,
    LARGEST: 50, 
};
const CIRCLE_SPEED_CONSTANTS = {
    SLOWEST: {
        amplitude: getRandomInt(15, 25),
        speed: getRandomInt(1, 3),
        wavelength: 120,
    }, 
    SLOW: {
        amplitude: getRandomInt(25, 40),
        speed: getRandomInt(3, 6),
        wavelength: 200,
    },
    NORMAL: {
        amplitude: getRandomInt(40, 80),
        speed: getRandomInt(6, 9),
        wavelength: 400,
    },
    FAST: {
        amplitude: getRandomInt(80, 160),
        speed: getRandomInt(9, 12),
        wavelength: 800,
    },
    FASTEST: {
        amplitude: getRandomInt(160, 320),
        speed: getRandomInt(12, 15),
        wavelength: 1100,
    },
};
const CIRCLE_COLOUR_CONSTANTS = {
    YELLOW: 'rgb(252, 186, 3)',
    ORANGE: 'rgb(252, 111, 3)',
    RED: 'rgb(252, 44, 3)',
    GREEN: 'rgb(3, 252, 40)',
    DARK_GREEN: 'rgb(6, 112, 20)',
    BLUE: 'rgb(3, 198, 252)',
    DARK_BLUE: 'rgb(36, 3, 252)',
    PURPLE: 'rgb(140, 3, 252)',
    PINK: 'rgb(252, 3, 231)',
    BLACK: 'rgb(0, 0, 0)',

}
type CircleSpeed = {
    amplitude: number;
    speed: number;
    wavelength: number;
};

enum CircleDirection {
    LEFT,
    RIGHT,
}

const circleSizeMappings: ProbabilityMapping<number>[] = [
    { value: CIRCLE_SIZE_CONSTANTS.SMALLEST, probability: 20 },  
    { value: CIRCLE_SIZE_CONSTANTS.SMALL, probability: 20 },  
    { value: CIRCLE_SIZE_CONSTANTS.MEDIUM, probability: 20 }, 
    { value: CIRCLE_SIZE_CONSTANTS.LARGE, probability: 20 },   
    { value: CIRCLE_SIZE_CONSTANTS.LARGEST, probability: 20 },   
];
const circleSpeedMappings: ProbabilityMapping<CircleSpeed>[] = [
    { value: CIRCLE_SPEED_CONSTANTS.SLOWEST, probability: 20 },  
    { value: CIRCLE_SPEED_CONSTANTS.SLOW, probability: 20 },  
    { value: CIRCLE_SPEED_CONSTANTS.NORMAL, probability: 20 },
    { value: CIRCLE_SPEED_CONSTANTS.FAST, probability: 20 },
    { value: CIRCLE_SPEED_CONSTANTS.FASTEST, probability: 20 },
];
const circleColourMappings: ProbabilityMapping<string>[] = [
    { value: CIRCLE_COLOUR_CONSTANTS.BLACK, probability: 10 },  
    { value: CIRCLE_COLOUR_CONSTANTS.BLUE, probability: 10 },  
    { value: CIRCLE_COLOUR_CONSTANTS.DARK_BLUE, probability: 10 },
    { value: CIRCLE_COLOUR_CONSTANTS.DARK_GREEN, probability: 10 },
    { value: CIRCLE_COLOUR_CONSTANTS.GREEN, probability: 10 },
    { value: CIRCLE_COLOUR_CONSTANTS.ORANGE, probability: 10 },
    { value: CIRCLE_COLOUR_CONSTANTS.PINK, probability: 10 },
    { value: CIRCLE_COLOUR_CONSTANTS.PURPLE, probability: 10 },
    { value: CIRCLE_COLOUR_CONSTANTS.RED, probability: 10 },
    { value: CIRCLE_COLOUR_CONSTANTS.YELLOW, probability: 10 },
];

const circleDirectionMappings: ProbabilityMapping<CircleDirection>[] = [
    { value: CircleDirection.LEFT, probability: 50 },
    { value: CircleDirection.RIGHT, probability: 50 },
];


export class ZigZag extends BaseAsset {
    private amplitude: number = 0;
    private baseY: number = 0;
    private borderX: number = 0;
    private speedX: number = 0;
    private wavelength: number = 0;
    private colour: string = '';
    private size: number = 0;
    private direction: CircleDirection = CircleDirection.LEFT;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.borderX = canvas.width;
        this.initValues();
    }

    private initValues(): void {
        const circleSpeed = selectValueBasedOnProbability(circleSpeedMappings);
        this.amplitude = circleSpeed.amplitude;
        this.speedX = circleSpeed.speed;
        this.wavelength = circleSpeed.wavelength;
        this.colour = selectValueBasedOnProbability(circleColourMappings);
        this.size = selectValueBasedOnProbability(circleSizeMappings);
        this.y = getRandomInt(0, this.canvas.height);
        this.baseY = getRandomInt(0, this.canvas.height); // New random base for sine oscillation
        this.direction = selectValueBasedOnProbability(circleDirectionMappings);
        this.x = this.direction === CircleDirection.LEFT ? this.borderX : 0;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';  
        ctx.shadowBlur = 5;  
        ctx.shadowOffsetX = 0;  
        ctx.shadowOffsetY = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    public move(canvas: HTMLCanvasElement): void {
        if (this.direction === CircleDirection.LEFT) {
            this.x -= this.speedX;
            
            if (this.x < (0 - this.size)) {
                this.x = this.borderX;
                this.initValues(); 
            }
        } else if (this.direction === CircleDirection.RIGHT) {
            this.x += this.speedX;
            
            if (this.x > (this.borderX + this.size)) {
                this.x = 0;
                this.initValues();
            }
        }
    
        this.y = this.baseY + this.amplitude * Math.sin(this.x / this.wavelength * (2 * Math.PI));
    }
}