const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const critical = require('critical');
const { getPages } = require('./webpack.config.pages');
const { pages } = require('./webpack.config.pages');
const { getFavicons } = require('./webpack.config.favicons');
const { getCommonLoaders } = require('./webpack.config.common');
const entry = require('./webpack.config.entry');
const WebpackOnBuildPlugin = require('on-build-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
						return [autoprefixer];
					},
					sourceMap: false, // NOTE: Not shure if it generates a proper sourcemap this way
				},
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: false, // NOTE: Not shure if it generates a proper sourcemap this way
				},
			},
		],
	}),
};

module.exports = {
	devtool: 'source-map',

	entry: entry.entries,

	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: 'assets/js/[name]-[hash].bundle.js',
	},

	resolve: {
		alias: {
			waypoints: 'waypoints/lib/noframework.waypoints.min.js',
			swiper: 'swiper/dist/js/swiper.min.js',
			lazyload: 'vanilla-lazyload/dist/lazyload.min.js',
			// using the standalone build (compiler + runtime)
			// instead of the default runtime-only build
			// see: https://github.com/vuejs/vue/tree/dev/dist#explanation-of-build-files
			vue: 'vue/dist/vue.min.js',
		},
	},

	module: {
		rules: [...getCommonLoaders(), scssRules],
	},

	plugins: [
		getFavicons(),

		...entry.plugins,

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
			},
		}),

		new ExtractTextPlugin({
			filename: 'main.css',
			disable: false,
			allChunks: true,
		}),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),

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

		// stuff we wanna cleanup from our dist folder
		// before we run a new build
		new CleanWebpackPlugin(
			[
				'dist/assets/js/*.js',
				'dist/assets/js/*.js.map',
				'dist/critical/*.css',
				'dist/critical/*.css.map',
				'dist/*.css',
				'dist/*.css.map',
			],
			{
				// Write logs to console.
				verbose: true,
				// Use boolean "true" to test/emulate delete.
				// Default: false - remove files
				dry: false,
			}
		),

		// do stuff after build
		new WebpackOnBuildPlugin(() => {
			// after build, we run through all the
			// pages we configured in webpack.config.pages.js
			// and run 'critical' through them so we inline
			// the page critical css in the head section
			// and defer the loading of the rest of our big css

			// NOTE: set it to true, if you wanna have the cirtical
			// css inlined in your html file. This also the cssLoader
			// JavaScript. When you set it to false, will create files
			// for each critial css by extending the filename with .css.
			const inlineCriticalCss = true;

			pages.forEach(page => {
				critical.generate({
					base: './dist',
					src: page.filename,
					dest: inlineCriticalCss
						? page.filename
						: `./critical/${page.filename}.css`,
					inline: inlineCriticalCss,
					minify: true,
					extract: false,
					width: 1600,
					height: 1600,
					ignore: ['font-face', '@font-face'],
				});
			});
		}),
	],
};

console.log('-> run webpack prod');
