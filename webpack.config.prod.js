/**
* @Author: Matthias Gohla <Matze>
* @Date:   2016-12-19T11:04:37+01:00
* @Email:  matze_lebt@gmx.de
* @Last modified by:   mBook
* @Last modified time: 2017-02-22T17:25:33+01:00
*/


const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const getHtmlFilePlugins = require('./webpack.config.common').getHtmlFilePlugins;
// good tutorial: http://www.pro-react.com/materials/appendixA/


const pixijsRules = { // passes loaders to pixi-particles
    test: /pixi-particles/,
    loader: 'imports-loader?PIXI=pixi.js',
};


const waypointsRules = { // passes loaders to waypoints alias
    test: /waypoints\//,
    use: [
        // inject jquery as global
        'imports-loader?$=jquery',
        // export window.Waypoint as default
        'exports-loader?window.Waypoint',
    ],
};


const htmlRules = { // load html files
    test: /\.(html|hbs)$/,
    loader: 'handlebars-loader',
    options: {
        // Defines additional directories to be searched for helpers.
        helperDirs: '',
        // Defines additional directories to be searched for partials.
        partialDirs: [
            path.join(__dirname, 'src', '_partials'),
        ],
        // Defines a regex that will exclude paths from resolving.
        exclude: /node_modules/,
        // Shows trace information to help debug issues (e.g. resolution of helpers).
        debug: true,
    },
    exclude: [/node_modules/],
};


const fontRules = { // load static assets like fonts, png, and resolve path ...
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: 'file-loader',
    options: {
        name: '/assets/fonts/[name].[ext]',
    },
    include: [path.resolve(__dirname, './src/assets/fonts')],
};

const jsRules = { // babel loader - may not be used in storybook
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: [/node_modules/],
};


const assetRules = { // load static assets (images) ...
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    loader: 'file-loader',
    options: {
        name: '/assets/img/[name].[ext]',
    },
    exclude: [path.resolve(__dirname, './src/assets/fonts')],
};


const scssRules = { // scss loader - uses postcss and autoprefixer
    test: /\.(scss|css)$/,
    use: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    sourceMap: true,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [
                            require('autoprefixer'),
                        ];
                    }
                }
            },
            'sass-loader',
        ],
    }),
};


/** CONFIG YOUR FAVICON HERE **/
// see more: https://github.com/jantimon/favicons-webpack-plugin
function getFaviconPlugin() {
    return new FaviconsWebpackPlugin({
        // Your source logo
        logo: './src/assets/img/favicon/favicon.png',
        // The prefix for all image files (might be a folder or a name)
        prefix: 'assets/img/favicon/icons-[hash]/',
        // Emit all stats of the generated icons
        emitStats: false,
        // The name of the json containing all favicon information
        statsFilename: 'iconstats-[hash].json',
        // Generate a cache file with control hashes and
        // don't rebuild the favicons until those hashes change
        persistentCache: true,
        // Inject the html into the html-webpack-plugin
        inject: true,
        // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
        background: '#fff',
        // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
        title: 'Squares And Brackets',

        // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: true,
            favicons: true,
            firefox: true,
            opengraph: false,
            twitter: true,
            yandex: false,
            windows: false,
        },
    });
}


module.exports = {

    devtool: 'cheap-module-source-map',

    entry: {
        head: './src/assets/js/head.js',
        main: './src/assets/js/main.js',
    },

    output: {
        path: path.resolve(__dirname, './dist'),
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

    plugins: [
        getFaviconPlugin(),
        ...getHtmlFilePlugins({
            outputPath: './dist/pages',
            inject: false,
            baseHref: 'http://squaresandbrackets.com',
            // don't inject the dev-server script (to use it, pass: http://localhost:8080/)
            devServer: false,
            googleAnalytics: {
                trackingId: 'UA-XXXX-XX',
                pageViewOnLoad: true,
            },
        }),

        new ExtractTextPlugin({
            filename: 'assets/css/main.css',
            disable: false,
            allChunks: true,
        }),

        new webpack.DefinePlugin({
             'process.env.NODE_ENV': JSON.stringify('production'),
        }),

        // plugin for hot-module-replacement
        // with javascript needs some extra-tweaks
        new webpack.HotModuleReplacementPlugin(),

        new webpack.ProvidePlugin({
            // inject for every global $ the jquery dependency
            // needed for legacy libs like waypoints
            $: 'jquery',
            jQuery: 'jquery',
            // Waypoint: 'waypoints',
        }),

        new webpack.optimize.UglifyJsPlugin({
            // uses the sourcemap defined in the sourcemap option above in prod
            sourceMap: true,
        }),

        new webpack.LoaderOptionsPlugin({
            // minimize loaders too
            minimize: true,
        }),

        // new CommonsChunkPlugin({
        //     filename: 'commons.js',
        //     name: 'commons'
        // }),
    ],
};

console.log('-> run webpack prod');
