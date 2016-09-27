import hdify from 'hd-canvas';

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
    let canvas = setupCanvas();
    let ctx = canvas.getContext('2d');

    function frame() {
        ctx.clearRect(0, 0, 1, 1);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

main();
