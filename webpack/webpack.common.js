/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getPages } = require('./webpack.config.pages');
const { getCommonLoaders } = require('./webpack.config.common');
const entry = require('./webpack.config.entry');
const autoprefixer = require('autoprefixer');
const commonPaths = require('./common-paths');

module.exports = env => ({
	entry: entry.entries,

	output: {
		path: commonPaths.outputPath, // path.join(__dirname, '/'),
		publicPath: '/',
		filename: 'assets/js/[name]-[hash].bundle.js',
	},

	plugins: [new webpack.ProgressPlugin()],
});
