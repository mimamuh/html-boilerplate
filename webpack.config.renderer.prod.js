const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const getPages = require('./webpack.config.pages')
    .getPages;
const getFavicons = require('./webpack.config.favicons')
    .getFavicons;
// good tutorial: http://www.pro-react.com/materials/appendixA/

const pixijsRules = {
    // passes loaders to pixi-particles
    test: /pixi-particles/,
    use: [
        'imports-loader?PIXI=pixi.js',
    ],
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
            debug: false,
        },
    }],
    exclude: [/node_modules/],
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

const audioRules = {
    // load static audio assest like mp3, mav ...
    test: /\.(mp3|wav)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'audio/[name]-[hash].[ext]',
                outputPath: 'assets/'
            }
        }
    ]
};

const jsRules = {
    // babel loader - may not be used in storybook
    test: /\.(js|jsx)$/,
    use: [{
        loader: 'babel-loader',
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
            {
                loader: 'css-loader',
                options: {
                    // Path to resolve URLs, URLs starting
                    // with / will not be translated
                    minimize: false,
                    sourceMap: true,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins() {
                        return [require('autoprefixer')];
                    },
                    sourceMap: 'inline',
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    // must be enabled as resolve-url-loader need it, see:
                    // https://github.com/bholloway/resolve-url-loader#important
                    sourceMap: true,
                },
            },
        ],
    }),
};



module.exports = {
    devtool: 'cheap-module-source-map',

    entry: {
        head: './src/assets/js/head.js',
        body: './src/assets/js/body.js',
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
            audioRules,
            jsRules,
            assetRules,
            scssRules,
        ],
    },

    plugins: [
        getFavicons(),

        ...getPages({
            outputPath: './dist',
            inject: false,
            baseHref: './',
            // don't inject the dev-server script (to use it, pass: http://localhost:8080/)
            devServer: false,
            googleAnalytics: {
                // the tracking id for your site
                trackingId: 'UA-XXXX-XX',
                // Log a pageview event after the analytics code loads.
                pageViewOnLoad: true,
                // if the ip of the visitors should be anonymized
                // needed by german privacy law
                anonymizeIp: true,
            }
        }),

        new ExtractTextPlugin({
            filename: 'assets/global.css',
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
