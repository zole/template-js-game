// @flow

type ImageSlice = string;

export default class Display {
    element: HTMLElement;
    onResize: (c: HTMLCanvasElement, width: number, height: number) => void;
    pixelRatio: number;
    width: number;
    height: number;

    constructor() {
        this.onResize = () => {};

        let canvas = this.element = document.createElement('canvas');
        canvas.style.background = "black";

        let ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Couldn't get rendering context");
        }
        this._ctx = ctx;

        // TODO: can pixelRatio change?
        this.pixelRatio = pixelRatio(this._ctx);

        const resize = () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            canvas.width  = this.width  * this.pixelRatio;
            canvas.height = this.height * this.pixelRatio;
            canvas.style.width  = this.width + "px";
            canvas.style.height = this.height + "px";

            // Continue to use logical pixel coordinates
            // TODO: has to be called after resize, not sure why
            if (this.pixelRatio != 1) {
                this._ctx.scale(this.pixelRatio, this.pixelRatio);
            }

            this.onResize(canvas, this.width, this.height);

            window.scroll(0, 0); // in case we've rotated the screen on iOS or something
        };
        window.addEventListener('resize', () => requestAnimationFrame(resize));
        resize();

        this._images = new Map();
    }

    loadPNG(name: string, base64png: string): ImageSlice {
        let img = new Image();
        img.src = base64png; // assumes data URL
        this._images.set(name, img);
        return name;
    }

    bulkLoadPNG(stuff: {string:string}) {
        Object.keys(stuff).forEach(k => this.loadPNG(k, stuff[k]));
    }

    clear(color: ?string) {
        // this._ctx.save();
        if (color) {
            this._ctx.fillStyle = color;
            this._ctx.fillRect(0, 0, this.width, this.height);
        } else {
            this._ctx.clearRect(0, 0, this.width, this.height);
        }
        // this._ctx.restore();
    }


    drawSlice(handle: ImageSlice, x: number, y: number, scaleX: ?number, scaleY: ?number) {
        let img = this._images.get(handle);
        if (!img) { throw new Error("Invalid frame handle"); }

        let { width, height } = img;

        if (typeof scaleX === "number") {
            if (typeof scaleY === "number") {
                width *= scaleX;
                height *= scaleY;
            } else {
                width *= scaleX;
                height *= scaleX;
            }
        }
        let dx = x - (width >> 1);
        let dy = y - (height >> 1);
        this._ctx.drawImage(img, dx, dy, width, height);
    }

    _ctx: CanvasRenderingContext2D;
    _images: Map<string, Image>;
}


function pixelRatio(ctx) {
    let dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio    ||
                ctx.msBackingStorePixelRatio     ||
                ctx.oBackingStorePixelRatio      ||
                ctx.backingStorePixelRatio       ||
                1;

    return dpr / bsr;
}
