const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// good tutorial: http://www.pro-react.com/materials/appendixA/
const getHtmlFilePlugins = require('./webpack.config.common')
    .getHtmlFilePlugins;

const pixijsRules = {
    // passes loaders to pixi-particles
    test: /pixi-particles/,
    use: [{
        loader: 'imports-loader?PIXI=pixi.js',
    }]
};

const waypointsRules = {
    // passes loaders to waypoints alias
    test: /waypoints\//,
    use: [
        // inject jquery as global
        'imports-loader?$=jquery',
        // export window.Waypoint as default
        'exports-loader?window.Waypoint',
    ],
};

const htmlRules = {
    // load html files
    test: /\.(html|hbs)$/,
    use: [{
        loader: 'handlebars-loader',
        options: {
            // Defines additional directories to be searched for helpers.
            helperDirs: '',
            // Defines additional directories to be searched for partials.
            partialDirs: [path.join(__dirname, 'src', '_partials')],
            // Defines a regex that will exclude paths from resolving.
            exclude: /node_modules/,
            // Defines a regex that identifies strings within helper/partial parameters that should be replaced by inline require statements.
            inlineRequires: '/img/',
            // Shows trace information to help debug issues (e.g. resolution of helpers).
            debug: true,
            exclude: [/node_modules/],
        },
    }],

};

const fontRules = {
    // load static assets like fonts, png, and resolve path ...
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: 'fonts/[name]-[hash].[ext]',
            outputPath: 'assets/',
        },
    }],
    include: [path.resolve(__dirname, './src/assets/fonts')],
};

const jsRules = {
    // babel loader - may not be used in storybook
    test: /\.(js|jsx)$/,
    use: [{
        loader: 'babel-loader'
    }],
    exclude: [/node_modules/],
};

const assetRules = {
    // load static assets (images) ...
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: 'img/[name]-[hash].[ext]',
            outputPath: 'assets/',
        },
    }],
    exclude: [path.resolve(__dirname, './src/assets/fonts')],
};

const scssRules = {
    // scss loader - uses postcss and autoprefixer
    test: /\.(scss|css)$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        loader: [
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
        rules: [
            pixijsRules,
            waypointsRules,
            htmlRules,
            fontRules,
            jsRules,
            assetRules,
            scssRules,
        ],
    },

    // needed for enzyme to work properly
    // see: http://airbnb.io/enzyme/docs/guides/webpack.html
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },

    plugins: [
        ...getHtmlFilePlugins({
            outputPath: '/',
            inject: false,
            baseHref: 'http://localhost:8080',
            devServer: 'http://localhost:8080',
            googleAnalytics: null,
        }),

        // It moves every require("style.css") in entry chunks into a separate css output file.
        new ExtractTextPlugin({
            filename: 'assets/css/main.css',
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
    },
};

console.log('-> run webpack dev');
