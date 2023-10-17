var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { getRandomInt, selectValueBasedOnProbability } from "../utils/FunctionalUtils";
import { BaseAsset } from "./abstracts/BaseAsset";
var CIRCLE_SIZE_CONSTANTS = {
    SMALLEST: 5,
    SMALL: 10,
    MEDIUM: 20,
    LARGE: 30,
    LARGEST: 50,
};
var CIRCLE_SPEED_CONSTANTS = {
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
var CIRCLE_COLOUR_CONSTANTS = {
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
};
var CircleDirection;
(function (CircleDirection) {
    CircleDirection[CircleDirection["LEFT"] = 0] = "LEFT";
    CircleDirection[CircleDirection["RIGHT"] = 1] = "RIGHT";
})(CircleDirection || (CircleDirection = {}));
var circleSizeMappings = [
    { value: CIRCLE_SIZE_CONSTANTS.SMALLEST, probability: 20 },
    { value: CIRCLE_SIZE_CONSTANTS.SMALL, probability: 20 },
    { value: CIRCLE_SIZE_CONSTANTS.MEDIUM, probability: 20 },
    { value: CIRCLE_SIZE_CONSTANTS.LARGE, probability: 20 },
    { value: CIRCLE_SIZE_CONSTANTS.LARGEST, probability: 20 },
];
var circleSpeedMappings = [
    { value: CIRCLE_SPEED_CONSTANTS.SLOWEST, probability: 20 },
    { value: CIRCLE_SPEED_CONSTANTS.SLOW, probability: 20 },
    { value: CIRCLE_SPEED_CONSTANTS.NORMAL, probability: 20 },
    { value: CIRCLE_SPEED_CONSTANTS.FAST, probability: 20 },
    { value: CIRCLE_SPEED_CONSTANTS.FASTEST, probability: 20 },
];
var circleColourMappings = [
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
var circleDirectionMappings = [
    { value: CircleDirection.LEFT, probability: 50 },
    { value: CircleDirection.RIGHT, probability: 50 },
];
var ZigZag = /** @class */ (function (_super) {
    __extends(ZigZag, _super);
    function ZigZag(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.amplitude = 0;
        _this.baseY = 0;
        _this.borderX = 0;
        _this.speedX = 0;
        _this.wavelength = 0;
        _this.colour = '';
        _this.size = 0;
        _this.direction = CircleDirection.LEFT;
        _this.borderX = canvas.width;
        _this.initValues();
        return _this;
    }
    ZigZag.prototype.initValues = function () {
        var circleSpeed = selectValueBasedOnProbability(circleSpeedMappings);
        this.amplitude = circleSpeed.amplitude;
        this.speedX = circleSpeed.speed;
        this.wavelength = circleSpeed.wavelength;
        this.colour = selectValueBasedOnProbability(circleColourMappings);
        this.size = selectValueBasedOnProbability(circleSizeMappings);
        this.y = getRandomInt(0, this.canvas.height);
        this.baseY = getRandomInt(0, this.canvas.height); // New random base for sine oscillation
        this.direction = selectValueBasedOnProbability(circleDirectionMappings);
        this.x = this.direction === CircleDirection.LEFT ? this.borderX : 0;
    };
    ZigZag.prototype.draw = function (ctx) {
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
    };
    ZigZag.prototype.move = function (canvas) {
        if (this.direction === CircleDirection.LEFT) {
            this.x -= this.speedX;
            if (this.x < (0 - this.size)) {
                this.x = this.borderX;
                this.initValues();
            }
        }
        else if (this.direction === CircleDirection.RIGHT) {
            this.x += this.speedX;
            if (this.x > (this.borderX + this.size)) {
                this.x = 0;
                this.initValues();
            }
        }
        this.y = this.baseY + this.amplitude * Math.sin(this.x / this.wavelength * (2 * Math.PI));
    };
    return ZigZag;
}(BaseAsset));
export { ZigZag };
