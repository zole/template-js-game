/** @type {import('vite').UserConfig} */

// required by wasm plugin
import topLevelAwait from 'vite-plugin-top-level-await'
// import wasm
import wasm from 'vite-plugin-wasm'
import mkcert from 'vite-plugin-mkcert'

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

    // base: '/temp/bmx',
    build: {
        sourceMap: true,
    },
}
