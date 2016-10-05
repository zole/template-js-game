import * as game from './game';
import Display from './display';

let display = new Display();

function setupBody() {
    let body = document.body;
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.overflow = "hidden";
    body.style.background = "yellow";

    if (game.onTouchDown) {
        display.element.addEventListener('mousedown', mousedown,  false);
        display.element.addEventListener('touchstart', touchstart, false);

    }
    // canvas.addEventListener('mousemove'   onmousemove,  false);
    // canvas.addEventListener('touchmove',  ontouchmove,  false);

    body.appendChild(display.element);
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
    setupBody();

    game.init(display);

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
