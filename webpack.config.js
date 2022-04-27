// TODO: https://webpack.js.org/configuration/configuration-languages/#typescript

const {
    main: packageName,
    description: packageDescription,
} = require('./package.json')

const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackFavicons = require('webpack-favicons')

const os = require('os')
const path = require('path')

const config = {
    mode: 'development', // TODO

    entry: packageName,

    output: {
        // why is this necessary? it's the default, but some plugins complain when it's not set
        path: path.join(__dirname, 'dist'),
        // publicPath: '/~media/'
    },

    devServer: {
        hot: true,
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    plugins: [
        // File loader configuration for .woff and .woff2 files
        // File loader configuration for .gif .jpg .jpeg .png and .svg files
        // https://github.com/merkle-open/webpack-config-plugins/tree/master/packages/asset-config-webpack-plugin
        new AssetConfigWebpackPlugin(),
        // Cleans the dist folder before the build starts
        new CleanWebpackPlugin(),
        // Generate a base html file and injects all generated css and js files
        new HtmlWebpackPlugin({
            title: packageDescription,
            meta: {
                viewport:
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
            },
        }),
        new WebpackFavicons({
            src: './favicon.svg',
            path: '',
            background: '#fff',
            theme_color: '#fff',
            icons: {
                favicons: true,
            },
        }),
    ],
}

config.module = {
    rules: [
        {
            test: /\.aseprite$/,
            use: [
                {
                    loader: require.resolve('./lib/level_loader.js'),
                },
            ],
        },
        {
            test: /\.(glb|gltf)$/,
            type: 'asset',
        },
        {
            // .ts, .tsx, .d.ts
            test: /\.(tsx?|d\.ts)$/,
            use: [
                {
                    // main typescript compilation loader
                    loader: require.resolve('ts-loader'),
                    options: {
                        happyPackMode: true,
                        // Set the tsconfig.json path
                        // configFile: options.configFile,
                    },
                },
            ],
        },
    ],
}

module.exports = config
