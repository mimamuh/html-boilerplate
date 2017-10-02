const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// good tutorial: http://www.pro-react.com/materials/appendixA/
const getPages = require('./webpack.config.pages').getPages;

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
            debug: false,
            exclude: [/node_modules/]
        }
    }]
};

const fontRules = {
    // load static assets like fonts, png, and resolve path ...
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'fonts/[name]-[hash].[ext]',
                outputPath: 'assets/',
            },
        }
    ],
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
    use: [
        {
            loader: 'babel-loader'
        }
    ],
    exclude: [/node_modules/]
};

const assetRules = {
    // load static assets (images) ...
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'img/[name]-[hash].[ext]',
                outputPath: 'assets/'
            }
        }
    ],
    exclude: [path.resolve(__dirname, './src/assets/fonts')]
};

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

function getCommonLoaders() {
    return [
        pixijsRules,
        waypointsRules,
        htmlRules,
        fontRules,
        audioRules,
        jsRules,
        assetRules
    ];
}

module.exports = {
    getCommonLoaders
};
