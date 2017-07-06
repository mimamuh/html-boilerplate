const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const getHtmlFilePlugins = require('./webpack.config.common')
    .getHtmlFilePlugins;
// good tutorial: http://www.pro-react.com/materials/appendixA/

const pixijsRules = {
    // passes loaders to pixi-particles
    test: /pixi-particles/,
    loader: 'imports-loader?PIXI=pixi.js',
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
    },
    exclude: [/node_modules/],
};

const fontRules = {
    // load static assets like fonts, png, and resolve path ...
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: 'file-loader',
    options: {
        name: 'fonts/[name]-[hash].[ext]',
        outputPath: 'assets/',
    },
    include: [path.resolve(__dirname, './src/assets/fonts')],
};

const jsRules = {
    // babel loader - may not be used in storybook
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: [/node_modules/],
};

const assetRules = {
    // load static assets (images) ...
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    loader: 'file-loader',
    options: {
        name: 'img/[name]-[hash].[ext]',
        outputPath: 'assets/',
    },
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

/** CONFIG YOUR FAVICON HERE **/
// see more: https://github.com/jantimon/favicons-webpack-plugin
function getFaviconPlugin() {
    return new FaviconsWebpackPlugin({
        // Your source logo
        logo: './src/assets/img/favicon/favicon.png',
        // The prefix for all image files (might be a folder or a name)
        prefix: 'assets/img/favicon/',
        // Emit all stats of the generated icons
        emitStats: false,
        // The name of the json containing all favicon information
        statsFilename: 'iconstats.json',
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
            outputPath: './dist',
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
            filename: 'assets/main.css',
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
