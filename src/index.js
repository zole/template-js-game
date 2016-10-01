import hdify from 'hd-canvas';

import * as game from './game';

function setupCanvas() {
    let body = document.body;
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.overflow = "hidden";
    body.style.background = "yellow";

    let canvas = document.createElement('canvas');
    canvas.style.background = "black";

    function resize() {
        canvas = hdify(canvas, window.innerWidth, window.innerHeight);
    }
    resize();
    window.addEventListener('resize', () => requestAnimationFrame(resize));

    body.appendChild(canvas);

    return canvas;
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

main();
