var path = require('path');
var webpack = require('webpack');
// var HTMLWebpackPlugin = require('html-webpack-plugin');
// good tutorial: http://www.pro-react.com/materials/appendixA/

const htmlRules = {
// load html files
    test: /\.(html|htm)$/,
    use: [
        {
            loader: 'html-loader',
            options: {
                // which tag:attribute combination should be processed
                attrs: [':data-src', 'img:src', 'img:srcset', 'source:srcset'],
                // if it interploates ES6 string syntax in our
                // html like ${require('./example.html')}
                interpolate: true
            }
        },
    ]
};

const fontRules = {
    // load static assets like fonts, png, and resolve path ...
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: 'file-loader',
    query: {
        name: './assets/fonts/[name]-[hash].[ext]',
    },
    include: [path.resolve(__dirname, '../src/assets/fonts')],
};

const assetRules = {
    // load static assets (images) ...
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    loader: 'file-loader',
    query: {
        name: './assets/img/[name]-[hash].[ext]',
    },
    exclude: [path.resolve(__dirname, '../src/assets/fonts')],
};

const scssRules = {
    // scss loader - uses postcss and autoprefixer
    test: /\.(scss|css)$/,
    loader: [
        'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [require('autoprefixer')],
            },
        },
        'sass-loader',
    ],
};

const vueRules = {
    // scss loader - uses postcss and autoprefixer
    test: /\.vue$/,
    loader: 'vue-loader',
};

module.exports = {
    module: {
        rules: [htmlRules, assetRules, fontRules, scssRules, vueRules],
    },

    // needed for enzyme to work properly
    // see: http://airbnb.io/enzyme/docs/guides/webpack.html
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
};
