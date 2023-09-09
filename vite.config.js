/** @type {import('vite').UserConfig} */

// required by wasm plugin
import topLevelAwait from "vite-plugin-top-level-await";
// import wasm
import wasm from "vite-plugin-wasm";

export default {
  // config options
  assetsInclude: ["**/*.gltf", "**/*.glb"],
  plugins: [topLevelAwait(), wasm()],
};
