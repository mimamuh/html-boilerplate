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



module.exports = {
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass',
            },
            { // load static assets like fonts, png, and resolve path ...
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?name=assets/fonts/[name].[ext]', // ?name=css/[name].[ext]
                include: [path.resolve(__dirname, '../src/assets/fonts')],
            },
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
