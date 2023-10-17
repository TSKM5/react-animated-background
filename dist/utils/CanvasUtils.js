var getDPR = function () { return window.devicePixelRatio || 1; };
var clearCanvas = function (canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
export var resizeCanvas = function (canvas, ctx) {
    var dpr = getDPR();
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
};
export function animateObjects(canvas, ctx, objects) {
    clearCanvas(canvas, ctx);
    objects.forEach(function (obj) {
        obj.move(canvas);
        obj.draw(ctx);
    });
    requestAnimationFrame(function () { return animateObjects(canvas, ctx, objects); });
}
;
