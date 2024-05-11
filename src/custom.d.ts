/// <reference types="vite/client" />

// File types

declare module '*?raw' {
    const content: string
    export default content
}

// TODO: figure out which of these is covered by vite/client

// Text

// declare module '*.txt' {
//     const content: string
//     export default content
// }

// Audio

declare module '*.mp3' {
    const url: string
    export default url
}

declare module '*.m4a' {
    const url: string
    export default url
}

declare module '*.webm' {
    const url: string
    export default url
}

// Images

// declare module '*.png' {
//     const url: string
//     export default url
// }

// declare module '*.jpg' {
//     const url: string
//     export default url
// }

// declare module '*.svg' {
//     const content: SVGElement
//     export default content
// }

// WebGL

declare module '*.gltf' {
    const url: string
    export default url
}

declare module '*.glb' {
    const url: string
    // const content: string
    export default url
}

declare module '*.vert' {
    const content: string
    export default content
}

declare module '*.frag' {
    const content: string
    export default content
}
