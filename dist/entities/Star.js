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
import { selectValueBasedOnProbability } from "../utils/FunctionalUtils";
import { BaseAsset } from "./abstracts/BaseAsset";
var STAR_SIZE_CONSTANTS = {
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
};
var STAR_SPEED_CONSTANTS = {
    SLOW: 0.25,
    NORMAL: 0.5,
    FAST: 0.75,
};
var starSizeMappings = [
    { value: STAR_SIZE_CONSTANTS.SMALL, probability: 50 },
    { value: STAR_SIZE_CONSTANTS.MEDIUM, probability: 30 },
    { value: STAR_SIZE_CONSTANTS.LARGE, probability: 20 }
];
var starSpeedMappings = [
    { value: STAR_SPEED_CONSTANTS.SLOW, probability: 50 },
    { value: STAR_SPEED_CONSTANTS.NORMAL, probability: 30 },
    { value: STAR_SPEED_CONSTANTS.FAST, probability: 20 }
];
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.size = selectValueBasedOnProbability(starSizeMappings);
        _this.speed = selectValueBasedOnProbability(starSpeedMappings);
        return _this;
    }
    Star.prototype.draw = function (ctx) {
        var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
        gradient.addColorStop(0.15, 'purple');
        gradient.addColorStop(0.5, 'rgba(255, 248, 212, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 248, 212, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
    Star.prototype.move = function (canvas) {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    };
    return Star;
}(BaseAsset));
export { Star };
