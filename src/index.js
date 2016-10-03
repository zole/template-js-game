import * as game from './game';

function setupCanvas() {
    let body = document.body;
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.overflow = "hidden";
    body.style.background = "yellow";

    let canvas = document.createElement('canvas'),
        canvasPixelRatio = pixelRatio(canvas);
    canvas.style.background = "black";

    // Handle window resize
    function resize() {
        let width = window.innerWidth, height = window.innerHeight;

        canvas.width  = width  * canvasPixelRatio;
        canvas.height = height * canvasPixelRatio;
        canvas.style.width  = width + "px";
        canvas.style.height = height + "px";

        game.onResize(canvas, width, height, canvasPixelRatio);
        window.scroll(0, 0); // in case we've rotated the screen on iOS or something
    }
    window.addEventListener('resize', () => requestAnimationFrame(resize));


    if (game.onTouchDown) {
        canvas.addEventListener('mousedown', mousedown,  false);
        canvas.addEventListener('touchstart', touchstart, false);

    }
    // canvas.addEventListener('mousemove'   onmousemove,  false);
    // canvas.addEventListener('touchmove',  ontouchmove,  false);

    body.appendChild(canvas);
    resize();

    return canvas;
}

function mousedown(ev: MouseEvent) {
    // FIXME: Jake cautions about relying on clientX/Y
    // http://codeincomplete.com/posts/javascript-game-foundations-player-input/
    game.onTouchDown(ev.clientX, ev.clientY);
    ev.preventDefault();
}

function touchstart(ev: TouchEvent) {
    // TODO: handle touches for real
    let t = ev.touches[0];
    game.onTouchDown(t.clientX, t.clientY);
    ev.preventDefault();
}

function main() {
    const canvas = setupCanvas();

    game.init(canvas);

    let lastTime;
    function frame(time) {
        let deltaTime = Math.min(lastTime ? (time - lastTime) / 1000 : 0, 0.25);
        game.update(deltaTime);
        lastTime = time;

        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function pixelRatio(canvas) {
    let ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio    ||
                ctx.msBackingStorePixelRatio     ||
                ctx.oBackingStorePixelRatio      ||
                ctx.backingStorePixelRatio       ||
                1;

    return dpr / bsr;
}

main();
