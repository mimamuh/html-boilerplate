var path = require('path');
var webpack = require('webpack');
// var HTMLWebpackPlugin = require('html-webpack-plugin');
// good tutorial: http://www.pro-react.com/materials/appendixA/

const htmlRules = {
    // load html files
    test: /\.(html)$/,
    loader: 'html-loader',
};

const fontRules = {
    // load static assets like fonts, png, and resolve path ...
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: 'file-loader',
    query: {
        name: './assets/fonts/[name].[ext]',
    },
    include: [path.resolve(__dirname, '../src/assets/fonts')],
};

const assetRules = {
    // load static assets (images) ...
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    loader: 'file-loader',
    query: {
        name: './assets/img/[name].[ext]',
    },
    exclude: [path.resolve(__dirname, '../src/assets/fonts')],
};

const scssRules = {
    // scss loader - uses postcss and autoprefixer
    test: /\.(scss|css)$/,
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
};

module.exports = {
    module: {
        rules: [htmlRules, assetRules, fontRules, scssRules],
    },

    // needed for enzyme to work properly
    // see: http://airbnb.io/enzyme/docs/guides/webpack.html
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
};
