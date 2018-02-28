const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getPages } = require('./webpack.config.pages');
const { getCommonLoaders } = require('./webpack.config.common');
const entry = require('./webpack.config.entry');
const autoprefixer = require('autoprefixer');

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
					plugins: () => [autoprefixer],
				},
			},
			'sass-loader',
		],
	}),
};

module.exports = {
	devtool: 'eval-source-map',

	entry: entry.entries,

	output: {
		path: path.join(__dirname, '/'),
		publicPath: '/',
		filename: 'assets/js/[name]-[hash].bundle.js',
	},

	resolve: {
		alias: {
			waypoints: 'waypoints/lib/noframework.waypoints.js',
			swiper: 'swiper/dist/js/swiper.js',
			lazyload: 'vanilla-lazyload/dist/lazyload.js',
			// using the standalone build (compiler + runtime)
			// instead of the default runtime-only build
			// see: https://github.com/vuejs/vue/tree/dev/dist#explanation-of-build-files
			vue: 'vue/dist/vue.js',
		},
	},

	module: {
		rules: [...getCommonLoaders(), scssRules],
	},

	// needed for enzyme to work properly
	// see: http://airbnb.io/enzyme/docs/guides/webpack.html
	externals: {
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true,
	},

	plugins: [
		...entry.plugins,

		...getPages({
			outputPath: '/',
			inject: false,
			baseHref: 'http://localhost:8080',
			devServer: 'http://localhost:8080',
			googleAnalytics: null,
		}),

		// It moves every require("style.css") in entry chunks into a separate css output file.
		new ExtractTextPlugin({
			filename: 'main.css',
			allChunks: true,
		}),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),

		// plugin for hot-module-replacement, with javascript needs some extra-tweaks
		new webpack.HotModuleReplacementPlugin(),

		// inject for every global $ the jquery dependency
		// needed for legacy libs like waypoints
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			// Waypoint: 'waypoints',
		}),

		new BundleAnalyzerPlugin({
			// Can be `server`, `static` or `disabled`.
			// In `server` mode analyzer will start HTTP server to show bundle report.
			// In `static` mode single HTML file with bundle report will be generated.
			// In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
			analyzerMode: 'server',
			// Host that will be used in `server` mode to start HTTP server.
			analyzerHost: '0.0.0.0',
			// Port that will be used in `server` mode to start HTTP server.
			analyzerPort: 8888,
			// Path to bundle report file that will be generated in `static` mode.
			// Relative to bundles output directory.
			reportFilename: 'report.html',
			// Module sizes to show in report by default.
			// Should be one of `stat`, `parsed` or `gzip`.
			// See "Definitions" section for more information.
			defaultSizes: 'parsed',
			// Automatically open report in default browser
			openAnalyzer: true,
			// If `true`, Webpack Stats JSON file will be generated in bundles output directory
			generateStatsFile: false,
			// Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
			// Relative to bundles output directory.
			statsFilename: 'stats.json',
			// Options for `stats.toJson()` method.
			// For example you can exclude sources of your modules from stats file with `source: false` option.
			// See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
			statsOptions: null,
			// Log level. Can be 'info', 'warn', 'error' or 'silent'.
			logLevel: 'info',
		}),

		new BrowserSyncPlugin(
			// BrowserSync options
			{
				// browse to http://localhost:3000/ during development
				host: 'localhost',
				port: 3000,
				// proxy the Webpack Dev Server endpoint
				// (which should be serving on http://localhost:8080/)
				// through BrowserSync
				proxy: 'http://localhost:8080/',
			},
			// plugin options
			{
				// prevent BrowserSync from reloading the page
				// and let Webpack Dev Server take care of this
				reload: false,
			}
		),
	],

	devServer: {
		// where files get served for the devserver
		contentBase: './',
		// port of the devserver, default 8080
		port: '8080',
		// serve === localhost
		host: '0.0.0.0',
		// auto-load
		inline: true,
		// dont show all bundle infos ...
		stats: 'errors-only',
		// Set this as true if you want to access dev server from
		// arbitrary url. This is handy if you are using a html5 router.
		historyApiFallback: true,
		// needed for hot-module-replacement-plugin
		hot: true,
		// set to true to be able to call the server from other devices
		disableHostCheck: false,
		// headers to prevent CORS issues
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods':
				'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers':
				'X-Requested-With, content-type, Authorization',
		},
	},
};

console.log('-> run webpack dev');
