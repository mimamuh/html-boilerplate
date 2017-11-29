const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const getPages = require('./webpack.config.pages').getPages;
const getFavicons = require('./webpack.config.favicons').getFavicons;
const getCommonLoaders = require('./webpack.config.common').getCommonLoaders;
// good tutorial: http://www.pro-react.com/materials/appendixA/

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
					sourceMap: 'inline',
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
	devtool: 'cheap-module-source-map',

	entry: {
		head: './src/assets/js/head.js',
		body: './src/assets/js/body.js',
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'assets/js/[name].bundle.js',
	},

	resolve: {
		alias: {
			waypoints: 'waypoints/lib/noframework.waypoints.min.js',
			swiper: 'swiper/dist/js/swiper.min.js',
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

		// plugin for hot-module-replacement
		// with javascript needs some extra-tweaks
		new webpack.HotModuleReplacementPlugin(),

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

		// new CommonsChunkPlugin({
		//     filename: 'commons.js',
		//     name: 'commons'
		// }),
	],
};

console.log('-> run webpack prod');
