const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// good tutorial: http://www.pro-react.com/materials/appendixA/
const getPages = require('./webpack.config.pages').getPages;

const pixijsRules = {
	// passes loaders to pixi-particles
	test: /pixi-particles/,
	use: [
		{
			loader: 'imports-loader?PIXI=pixi.js',
		},
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
	test: /\.(html|htm)$/,
	use: [
		{
			loader: 'html-loader',
			options: {
				// which tag:attribute combination should be processed
				attrs: [
					':data-src',
					'img:src',
					'img:data-src',
					'img:srcset',
					'img:data-srcset',
					'source:srcset',
					'source:data-srcset',
					'img:data-zoom-target',
				],
				removeComments: true,
				// if it interploates ES6 string syntax in our
				// html like ${require('./example.html')}
				interpolate: true,
			},
		},
	],
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
		},
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
				outputPath: 'assets/',
			},
		},
	],
};

const jsRules = {
	// babel loader - may not be used in storybook
	test: /\.(js|jsx)$/,
	use: [
		{
			loader: 'babel-loader',
		},
	],
	exclude: [/node_modules/],
};

const assetRules = {
	// load static assets (images) ...
	test: /\.(png|jpg|jpeg|gif|svg)$/,
	use: [
		{
			loader: 'file-loader',
			options: {
				name: 'img/[name]-[hash].[ext]',
				outputPath: 'assets/',
			},
		},
	],
	exclude: [path.resolve(__dirname, './src/assets/fonts')],
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

const vueRules = {
	// scss loader - uses postcss and autoprefixer
	test: /\.vue$/,
	loader: 'vue-loader',
};

function getCommonLoaders() {
	return [
		pixijsRules,
		waypointsRules,
		htmlRules,
		fontRules,
		audioRules,
		jsRules,
		assetRules,
		vueRules,
	];
}

module.exports = {
	getCommonLoaders,
};
