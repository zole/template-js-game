import day from 'dayjs'
import { defineConfig } from 'vite'

import glsl from 'vite-plugin-glsl'
import mkcert from 'vite-plugin-mkcert'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

export default defineConfig((env) => ({
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    plugins: [
        // serve over https, enabling various browser APIs
        mkcert(),
        // required by wasm plugin
        topLevelAwait(),
        // import wasm files
        wasm(),
        // import GLSL shaders
        glsl(),
    ],

    define: {
        IS_PRODUCTION: env.mode === 'production',
        IS_DISTRIBUTION: false, // TODO
        __BUILD__: JSON.stringify(
            day().format('YYYY.MM.DD.HHmm') + env.mode === 'production'
                ? ''
                : '-dev',
        ),
    },

    optimizeDeps: {
        exclude: ['@babylonjs/havok'],
    },

    server: {
        // Enable cross-origin isolation, which improves security,
        // increases the precision of performance.now(), and enables
        // SharedArrayBuffer. These will also need to be sent from your
        // production server if you use those features. See:
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
    },

    build: {
        sourceMap: true,
    },
}))
