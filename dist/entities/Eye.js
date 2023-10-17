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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { selectValueBasedOnProbability } from "../utils/FunctionalUtils";
import { BaseAsset } from "./abstracts/BaseAsset";
var EYE_SIZE_CONSTANTS = {
    SMALL: {
        eyeRadius: 50,
        innerEyeRadiusY: 30,
        innerEyeRadiusX: 50 - ((5 / 50) * 100),
        pupilRadius: 15,
    },
    MEDIUM: {
        eyeRadius: 80,
        innerEyeRadiusY: 48,
        innerEyeRadiusX: 80 - ((5 / 80) * 100),
        pupilRadius: 25,
    },
    LARGE: {
        eyeRadius: 100,
        innerEyeRadiusY: 60,
        innerEyeRadiusX: 100 - ((5 / 100) * 100),
        pupilRadius: 30,
    },
};
var EYE_ANIMATE_TIMES = {
    SLOWER: 16,
    SLOW: 10,
    NORMAL: 7,
    FAST: 5,
    FASTER: 2
};
var PUPIL_MOVEMENT;
(function (PUPIL_MOVEMENT) {
    PUPIL_MOVEMENT[PUPIL_MOVEMENT["UP"] = 0] = "UP";
    PUPIL_MOVEMENT[PUPIL_MOVEMENT["DOWN"] = 1] = "DOWN";
    PUPIL_MOVEMENT[PUPIL_MOVEMENT["LEFT"] = 2] = "LEFT";
    PUPIL_MOVEMENT[PUPIL_MOVEMENT["RIGHT"] = 3] = "RIGHT";
    PUPIL_MOVEMENT[PUPIL_MOVEMENT["UP_LEFT"] = 4] = "UP_LEFT";
    PUPIL_MOVEMENT[PUPIL_MOVEMENT["UP_RIGHT"] = 5] = "UP_RIGHT";
    PUPIL_MOVEMENT[PUPIL_MOVEMENT["DOWN_LEFT"] = 6] = "DOWN_LEFT";
    PUPIL_MOVEMENT[PUPIL_MOVEMENT["DOWN_RIGHT"] = 7] = "DOWN_RIGHT";
})(PUPIL_MOVEMENT || (PUPIL_MOVEMENT = {}));
var eyeSizeMappings = [
    { value: EYE_SIZE_CONSTANTS.SMALL, probability: 50 },
    { value: EYE_SIZE_CONSTANTS.MEDIUM, probability: 40 },
    { value: EYE_SIZE_CONSTANTS.LARGE, probability: 10 }
];
var eyeAnimateTimingMappings = [
    { value: EYE_ANIMATE_TIMES.SLOWER, probability: 15 },
    { value: EYE_ANIMATE_TIMES.SLOW, probability: 25 },
    { value: EYE_ANIMATE_TIMES.NORMAL, probability: 25 },
    { value: EYE_ANIMATE_TIMES.FAST, probability: 25 },
    { value: EYE_ANIMATE_TIMES.FASTER, probability: 10 }
];
var pupilMovementMappings = [
    { value: PUPIL_MOVEMENT.UP, probability: 12.5 },
    { value: PUPIL_MOVEMENT.DOWN, probability: 12.5 },
    { value: PUPIL_MOVEMENT.LEFT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.RIGHT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.UP_LEFT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.UP_RIGHT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.DOWN_LEFT, probability: 12.5 },
    { value: PUPIL_MOVEMENT.DOWN_RIGHT, probability: 12.5 }
];
var Eye = /** @class */ (function (_super) {
    __extends(Eye, _super);
    function Eye(canvas, xPosition, yPosition) {
        var _this = _super.call(this, canvas) || this;
        _this.eyeSizes = selectValueBasedOnProbability(eyeSizeMappings);
        _this.eyePositionX = xPosition;
        _this.eyePositionY = yPosition;
        _this.pupilPositionX = _this.eyePositionX;
        _this.pupilPositionY = _this.eyePositionY;
        _this.activeTimer = false;
        _this.animationTimeSecs = selectValueBasedOnProbability(eyeAnimateTimingMappings);
        return _this;
    }
    Eye.prototype.draw = function (ctx) {
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
    };
    Eye.prototype.move = function (canvas) {
        if (!this.activeTimer) {
            this.activeTimer = true;
            this.setTimer();
        }
    };
    Eye.prototype.setPosition = function (x, y) {
        this.eyePositionX = x;
        this.eyePositionY = y;
    };
    Eye.prototype.setPupilPosition = function (direction) {
        var maxDistanceX = this.eyeSizes.innerEyeRadiusX - this.eyeSizes.pupilRadius;
        var maxDistanceY = this.eyeSizes.innerEyeRadiusY - this.eyeSizes.pupilRadius;
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
    };
    Eye.prototype.setTimer = function () {
        var _this = this;
        setTimeout(function () {
            _this.processMovement();
            _this.activeTimer = false;
        }, this.animationTimeSecs * 1000);
    };
    Eye.prototype.processMovement = function () {
        var _this = this;
        if (this.lastDirection) {
            var direction = selectValueBasedOnProbability(__spreadArray([], pupilMovementMappings.filter(function (e) { return e.value !== _this.lastDirection; }), true));
            this.pupilPositionX = this.eyePositionX;
            this.pupilPositionY = this.eyePositionY;
            this.setPupilPosition(direction);
            this.lastDirection = direction;
            this.animationTimeSecs = selectValueBasedOnProbability(eyeAnimateTimingMappings);
        }
        else {
            var direction = selectValueBasedOnProbability(pupilMovementMappings);
            this.setPupilPosition(direction);
            this.lastDirection = direction;
            this.animationTimeSecs = selectValueBasedOnProbability(eyeAnimateTimingMappings);
        }
    };
    Eye.prototype.getPositionX = function () {
        return this.eyePositionX * 2;
    };
    Eye.prototype.getPositionY = function () {
        return this.eyePositionY;
    };
    Eye.prototype.setPositionX = function (val) {
        this.eyePositionX = val;
        this.pupilPositionX = val;
    };
    Eye.prototype.setPositionY = function (val) {
        this.eyePositionY = val;
        this.pupilPositionY = val;
    };
    Eye.prototype.getSizeX = function () {
        return this.eyeSizes.eyeRadius;
    };
    Eye.prototype.getSizeY = function () {
        return this.eyeSizes.eyeRadius;
    };
    return Eye;
}(BaseAsset));
export { Eye };
export function scatterEntitiesWithinCanvas(canvas, spacing) {
    var eyes = [];
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var eyeSize = new Eye(canvas, 0, 0).getSizeX();
    var totalSpacing = eyeSize + spacing;
    var rows = Math.ceil(canvasHeight / totalSpacing);
    var cols = Math.ceil(canvasWidth / totalSpacing);
    var overlapX = (cols * totalSpacing - canvasWidth) / 2;
    var overlapY = (rows * totalSpacing - canvasHeight) / 2;
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var x = col * totalSpacing - overlapX + eyeSize / 2;
            var y = row * totalSpacing - overlapY + eyeSize / 2;
            var eye = new Eye(canvas, x, y);
            eyes.push(eye);
        }
    }
    return eyes;
}
