// @flow

const FRAME_DUR = 1/60;

let game;

export function init(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error("Couldn't get rendering context");
    }

    game = {
        ctx: ctx,
    };
}

let accrued = 0;
export function update(delta: number) {
    delta += accrued;
    accrued = delta % FRAME_DUR;
    
    const frames = (delta / FRAME_DUR)|0;
    for (let fr = 0; fr < frames; fr++) {
        // advanceGameState();
    }

    // render();
}