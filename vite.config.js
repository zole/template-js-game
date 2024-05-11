// required by wasm plugin
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

/** @type {import('vite').UserConfig} */
export default {
    // config options
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    plugins: [mkcert(), topLevelAwait(), wasm(), react()],
    optimizeDeps: {
        exclude: ['@babylonjs/havok'],
    },
    server: {
        // hmr: true,
    },

    build: {
        sourceMap: true,
    },
}
