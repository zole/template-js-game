
//#region File types

declare module '*?raw' {
    const content: string
    export default content
}

// Text

declare module '*.txt' {
    const content: string
    export default content
}

declare module '*.css' {
    const content: string
    export default content
}

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

declare module '*.png' {
    const url: string
    export default url
}

declare module '*.jpg' {
    const url: string
    export default url
}

declare module '*.svg' {
    const content: SVGElement
    export default content
}

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

//#endregion