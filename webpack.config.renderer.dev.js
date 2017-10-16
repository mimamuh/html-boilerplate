const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// good tutorial: http://www.pro-react.com/materials/appendixA/
const getPages = require('./webpack.config.pages').getPages;
const getCommonLoaders = require('./webpack.config.common').getCommonLoaders;

const scssRules = {
    // scss loader - uses postcss and autoprefixer
    test: /\.(scss|css)$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [require('autoprefixer')],
                },
            },
            'sass-loader',
        ],
    }),
};

module.exports = {
    devtool: 'eval-source-map',

    entry: {
        head: './src/assets/js/head.js',
        body: './src/assets/js/body.js',
    },

    output: {
        path: path.join(__dirname, '/'),
        filename: 'assets/js/[name].bundle.js',
    },

    resolve: {
        alias: {
            waypoints: 'waypoints/lib/noframework.waypoints.js',
        },
    },

    module: {
        rules: [...getCommonLoaders(), scssRules],
    },

    // needed for enzyme to work properly
    // see: http://airbnb.io/enzyme/docs/guides/webpack.html
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },

    plugins: [
        ...getPages({
            outputPath: '/',
            inject: false,
            baseHref: 'http://localhost:8080',
            devServer: 'http://localhost:8080',
            googleAnalytics: null,
        }),

        // It moves every require("style.css") in entry chunks into a separate css output file.
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true,
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),

        // plugin for hot-module-replacement, with javascript needs some extra-tweaks
        new webpack.HotModuleReplacementPlugin(),

        // inject for every global $ the jquery dependency
        // needed for legacy libs like waypoints
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            // Waypoint: 'waypoints',
        }),

        // new CommonsChunkPlugin({
        //     filename: 'commons.js',
        //     name: 'commons'
        // }),
    ],

    devServer: {
        // where files get served for the devserver
        contentBase: './',
        // port of the devserver, default 8080
        port: '8080',
        // serve === localhost
        host: '0.0.0.0',
        // auto-load
        inline: true,
        // dont show all bundle infos ...
        stats: 'errors-only',
        // Set this as true if you want to access dev server from
        // arbitrary url. This is handy if you are using a html5 router.
        historyApiFallback: true,
        // needed for hot-module-replacement-plugin
        hot: true,
        // set to true to be able to call the server from other devices
        disableHostCheck: false,
        // headers to prevent CORS issues
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
    },
};

console.log('-> run webpack dev');
