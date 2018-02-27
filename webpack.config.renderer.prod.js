const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const critical = require('critical');
const getPages = require('./webpack.config.pages').getPages;
const pages = require('./webpack.config.pages').pages;
const getFavicons = require('./webpack.config.favicons').getFavicons;
const getCommonLoaders = require('./webpack.config.common').getCommonLoaders;
const entry = require('./webpack.config.entry');

console.log(getCommonLoaders());
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
					sourceMap: true,
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

		getFavicons(),

		// do stuff after build
		new WebpackOnBuildPlugin(() => {
			// after build, we run through all the
			// pages we configured in webpack.config.pages.js
			// and run 'critical' through them so we inline
			// the page critical css in the head section
			// and defer the loading of the rest of our big css
			pages.forEach(page => {
				critical.generate({
					base: './dist',
					src: page.filename,
					dest: page.filename,
					inline: true,
					minify: true,
					extract: false,
					width: 1300,
					height: 1200,
					ignore: ['font-face', '@font-face'],
				});
			});
		}),
	],
};

console.log('-> run webpack prod');
