/**
* @Author: Matthias Gohla <Matze>
* @Date:   2016-12-19T11:04:37+01:00
* @Email:  matze_lebt@gmx.de
* @Last modified by:   Matze
* @Last modified time: 2017-01-18T18:34:46+01:00
*/


var path = require('path');
var webpack = require('webpack');
// var HTMLWebpackPlugin = require('html-webpack-plugin');
// good tutorial: http://www.pro-react.com/materials/appendixA/



module.exports = {

    // devtool: 'eval-source-map',

    // entry: path.join(__dirname, '/app/main.js'),
    // output: {
    //     path: path.join(__dirname, '/build'),
    //     filename: 'bundle.js'
    // },

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

    // plugins: [
    //     // new webpack.BannerPlugin("React training like a boss!"), // plugin to add strings to the head of a file
    //     // new HTMLWebpackPlugin({ // compiles my html files and bundles needed header stuff to it
    //     //     template: __dirname + '/app/index.tmpl.html'
    //     // }),
    //     // new webpack.HotModuleReplacementPlugin() // plugin for hot-module-replacement, with javascript needs some extra-tweaks
    // ],

    // devServer: {
    //     // contentBase: './public', // where files get served for the devserver
    //     // port: '8080', // port of the devserver, default 8080
    //     inline: true, // auto-load
    //     colors: true, // add colors to the terminal when the server is running
    //     historyApiFallback: true, //
    //     // hot: true // needed for hot-module-replacement-plugin
    // }
};
