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
                : '-dev'
        ),
    },

    optimizeDeps: {
        exclude: ['@babylonjs/havok'],
    },

    server: {
        // hmr: true,
    },

    build: {
        sourceMap: true,
    },
}))
