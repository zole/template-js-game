// @flow

const FRAME_DUR = 1/60;

let display;

export function init(theDisplay: Display) {
    display = theDisplay;
    // display.onResize = onResize;
    onResize();
}

let accrued = 0;
export function update(delta: number) {
    delta += accrued;
    accrued = delta % FRAME_DUR;
    
    const frames = (delta / FRAME_DUR)|0;
    for (let fr = 0; fr < frames; fr++) {
        // advanceGameState();
    }

    render();
}

function render() {
}

export function onResize() {
}

export function onTouchDown(x: number, y: number) {
}
