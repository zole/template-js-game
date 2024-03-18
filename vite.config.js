// required by wasm plugin
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import mkcert from 'vite-plugin-mkcert'

/** @type {import('vite').UserConfig} */
export default {
    // config options
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    plugins: [mkcert(), topLevelAwait(), wasm()],
    optimizeDeps: {
        exclude: ['@babylonjs/havok'],
    },
    server: {
        hmr: false,
    },
    hmr: false,

    build: {
        sourceMap: true,
    },
}
