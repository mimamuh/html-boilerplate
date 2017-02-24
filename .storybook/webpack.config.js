/**
* @Author: Matthias Gohla <Matze>
* @Date:   2016-12-19T11:04:37+01:00
* @Email:  matze_lebt@gmx.de
* @Last modified by:   mBook
* @Last modified time: 2017-01-20T10:10:35+01:00
*/


var path = require('path');
var webpack = require('webpack');
// var HTMLWebpackPlugin = require('html-webpack-plugin');
// good tutorial: http://www.pro-react.com/materials/appendixA/


const htmlRules = { // load html files
    test: /\.(html)$/,
    loader: 'html-loader',
};


const fontRules = { // load static assets like fonts, png, and resolve path ...
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: 'file-loader',
    query: {
        name: '/assets/fonts/[name].[ext]',
    },
    include: [path.resolve(__dirname, '../src/assets/fonts')],
};


const assetRules = { // load static assets (images) ...
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    loader: 'file-loader',
    query: {
        name: '/assets/img/[name].[ext]',
    },
    exclude: [path.resolve(__dirname, '../src/assets/fonts')],
};


const scssRules = { // scss loader - uses postcss and autoprefixer
    test: /\.(css|scss)$/,
    loader: 'style!css!postcss!sass',
};


module.exports = {
    module: {
        loaders: [
            htmlRules,
            assetRules,
            fontRules,
            scssRules,
        ],
    },

    postcss: [
        require('autoprefixer'),
    ],

    // needed for enzyme to work properly
    // see: http://airbnb.io/enzyme/docs/guides/webpack.html
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
};
