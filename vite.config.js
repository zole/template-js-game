import day from 'dayjs'
import { defineConfig } from 'vite'

// required by wasm plugin
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import mkcert from 'vite-plugin-mkcert'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'


export default defineConfig((env) => ({
    plugins: [mkcert(), topLevelAwait(), wasm(), react(), glsl()],
    assetsInclude: ['**/*.gltf', '**/*.glb'],

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
