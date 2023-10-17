import { ProbabilityMapping, selectValueBasedOnProbability } from "../utils/FunctionalUtils";
import { BaseAsset } from "./abstracts/BaseAsset";

type EyeSize = {
    eyeRadius: number; 
    innerEyeRadiusX: number;
    innerEyeRadiusY: number;
    pupilRadius: number; 
}

const EYE_SIZE_CONSTANTS = {
    SMALL: {
        eyeRadius: 50,
        innerEyeRadiusY: 30,
        innerEyeRadiusX: 50 - ((5/50) * 100),
        pupilRadius: 15,
    },
    MEDIUM: {
        eyeRadius: 80,
        innerEyeRadiusY: 48,
        innerEyeRadiusX: 80 - ((5/80) * 100),
        pupilRadius: 25,
    },
    LARGE: {
        eyeRadius: 100,
        innerEyeRadiusY: 60,
        innerEyeRadiusX: 100 - ((5/100) * 100),
        pupilRadius: 30,
    },
};
const EYE_ANIMATE_TIMES = {
    SLOWER: 16,
    SLOW: 10,
    NORMAL: 7,
    FAST: 5,
    FASTER: 2
};

enum PUPIL_MOVEMENT {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    UP_LEFT,
    UP_RIGHT,
    DOWN_LEFT,
    DOWN_RIGHT
}


const eyeSizeMappings: ProbabilityMapping<EyeSize>[] = [
    { value: EYE_SIZE_CONSTANTS.SMALL, probability: 50 },  
    { value: EYE_SIZE_CONSTANTS.MEDIUM, probability: 40 }, 
    { value: EYE_SIZE_CONSTANTS.LARGE, probability: 10 }   
];
const eyeAnimateTimingMappings: ProbabilityMapping<number>[] = [
    { value: EYE_ANIMATE_TIMES.SLOWER, probability: 15 },  
    { value: EYE_ANIMATE_TIMES.SLOW, probability: 25 },
    { value: EYE_ANIMATE_TIMES.NORMAL, probability: 25 },
    { value: EYE_ANIMATE_TIMES.FAST, probability: 25 },   
    { value: EYE_ANIMATE_TIMES.FASTER, probability: 10 }   
];


const pupilMovementMappings: ProbabilityMapping<PUPIL_MOVEMENT>[] = [
    { value: PUPIL_MOVEMENT.UP, probability: 12.5 },
    { value: PUPIL_MOVEMENT.DOWN, probability: 12.5 },
    { value: PUPIL_MOVEMENT.LEFT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.RIGHT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.UP_LEFT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.UP_RIGHT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.DOWN_LEFT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.DOWN_RIGHT, probability: 12.5 }
];



export class Eye extends BaseAsset {
    private eyeSizes: EyeSize; 
    private animationTimeSecs: number; 
    private eyePositionX: number; 
    private eyePositionY: number; 
    private pupilPositionX: number; 
    private pupilPositionY: number; 
    private lastDirection?: PUPIL_MOVEMENT;
    private activeTimer: boolean; 
    
    constructor(canvas: HTMLCanvasElement, xPosition:number, yPosition:number) {
        super(canvas); 
        this.eyeSizes = selectValueBasedOnProbability(eyeSizeMappings);
        this.eyePositionX = xPosition; 
        this.eyePositionY = yPosition;
        this.pupilPositionX = this.eyePositionX; 
        this.pupilPositionY = this.eyePositionY; 
        this.activeTimer = false; 
        this.animationTimeSecs = selectValueBasedOnProbability(eyeAnimateTimingMappings);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';   
        ctx.shadowBlur = 10;                      
        ctx.shadowOffsetX = 15;                   
        ctx.shadowOffsetY = 15;                    

        // Draw the outer black arc of the eye with the shadow
        ctx.beginPath();
        ctx.arc(this.eyePositionX, this.eyePositionY, this.eyeSizes.eyeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();

        // Clear the shadow properties before drawing other parts
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw inner white
        ctx.beginPath();
        ctx.ellipse(this.eyePositionX, this.eyePositionY, this.eyeSizes.innerEyeRadiusX, this.eyeSizes.innerEyeRadiusY, 0, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        // Draw pupil
        ctx.beginPath();
        ctx.arc(this.pupilPositionX, this.pupilPositionY, this.eyeSizes.pupilRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    move(canvas: HTMLCanvasElement): void {
        if (!this.activeTimer) {
            this.activeTimer = true;
            this.setTimer();
        }
    }
    

    setPosition(x: number, y: number) {
        this.eyePositionX = x;
        this.eyePositionY = y;
    }

    private setPupilPosition(direction: PUPIL_MOVEMENT) {
        const maxDistanceX = this.eyeSizes.innerEyeRadiusX - this.eyeSizes.pupilRadius;
        const maxDistanceY = this.eyeSizes.innerEyeRadiusY - this.eyeSizes.pupilRadius;
    
        switch (direction) {
            case PUPIL_MOVEMENT.UP:
                this.pupilPositionY = this.eyePositionY - maxDistanceY;
                break;
            case PUPIL_MOVEMENT.DOWN:
                this.pupilPositionY = this.eyePositionY + maxDistanceY;
                break;
            case PUPIL_MOVEMENT.LEFT:
                this.pupilPositionX = this.eyePositionX - maxDistanceX;
                break;
            case PUPIL_MOVEMENT.RIGHT:
                this.pupilPositionX = this.eyePositionX + maxDistanceX;
                break;
            case PUPIL_MOVEMENT.UP_LEFT:
                this.pupilPositionX = this.eyePositionX - maxDistanceX / Math.sqrt(2);
                this.pupilPositionY = this.eyePositionY - maxDistanceY / Math.sqrt(2);
                break;
            case PUPIL_MOVEMENT.UP_RIGHT:
                this.pupilPositionX = this.eyePositionX + maxDistanceX / Math.sqrt(2);
                this.pupilPositionY = this.eyePositionY - maxDistanceY / Math.sqrt(2);
                break;
            case PUPIL_MOVEMENT.DOWN_LEFT:
                this.pupilPositionX = this.eyePositionX - maxDistanceX / Math.sqrt(2);
                this.pupilPositionY = this.eyePositionY + maxDistanceY / Math.sqrt(2);
                break;
            case PUPIL_MOVEMENT.DOWN_RIGHT:
                this.pupilPositionX = this.eyePositionX + maxDistanceX / Math.sqrt(2);
                this.pupilPositionY = this.eyePositionY + maxDistanceY / Math.sqrt(2);
                break;
        }
        
    }

    private setTimer() {
        setTimeout(() => {
            this.processMovement(); 
            this.activeTimer = false;
        }, this.animationTimeSecs * 1000)
    }

    private processMovement() {
        if(this.lastDirection) {
            const direction = selectValueBasedOnProbability([...pupilMovementMappings.filter(e => e.value !== this.lastDirection)]);
            this.pupilPositionX = this.eyePositionX; 
            this.pupilPositionY = this.eyePositionY; 
            this.setPupilPosition(direction); 
            this.lastDirection = direction;
            this.animationTimeSecs = selectValueBasedOnProbability(eyeAnimateTimingMappings); 
        } else {
            const direction = selectValueBasedOnProbability(pupilMovementMappings);
            this.setPupilPosition(direction); 
            this.lastDirection = direction;
            this.animationTimeSecs = selectValueBasedOnProbability(eyeAnimateTimingMappings); 
        }
    }

    public getPositionX():number {
        return this.eyePositionX * 2; 
    }
    public getPositionY():number {
        return this.eyePositionY; 
    }

    public setPositionX(val:number) {
        this.eyePositionX = val; 
        this.pupilPositionX = val; 
    }
    public setPositionY(val:number) {
        this.eyePositionY = val; 
        this.pupilPositionY = val; 
    }
    public getSizeX():number {
        return this.eyeSizes.eyeRadius; 
    }
    public getSizeY():number {
        return this.eyeSizes.eyeRadius; 
    }


}

export function scatterEntitiesWithinCanvas(canvas: HTMLCanvasElement, spacing: number): Eye[] {
    const eyes: Eye[] = [];
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const eyeSize = new Eye(canvas, 0, 0).getSizeX();
    const totalSpacing = eyeSize + spacing; 

    const rows = Math.ceil(canvasHeight / totalSpacing);
    const cols = Math.ceil(canvasWidth / totalSpacing);

    const overlapX = (cols * totalSpacing - canvasWidth) / 2;
    const overlapY = (rows * totalSpacing - canvasHeight) / 2;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * totalSpacing - overlapX + eyeSize / 2;
            const y = row * totalSpacing - overlapY + eyeSize / 2;

            const eye = new Eye(canvas, x, y);
            eyes.push(eye);
        }
    }

    return eyes;
}
 

