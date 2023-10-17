var BaseAsset = /** @class */ (function () {
    function BaseAsset(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.canvas = canvas;
    }
    return BaseAsset;
}());
export { BaseAsset };
