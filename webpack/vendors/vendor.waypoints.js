/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

/**
 * Webpack rules/config to use the waypoints library
 * https://www.npmjs.com/package/waypoints
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	resolve: {
		alias: {
			waypoints:
				argv.mode === 'development'
					? 'waypoints/lib/noframework.waypoints.js'
					: 'waypoints/lib/noframework.waypoints.min.js',
		},
	},

	module: {
		rules: [
			{
				// Applies loader to all imports of waypoints.
				test: /waypoints\//,
				use: [
					// Exports window.Waypoint and export it as default of the module
					'exports-loader?window.Waypoint',
				],
			},
		],
	},

	plugins: [
		new webpack.ProvidePlugin({
			// Makes waypoints globally accessible through window.Waypoint
			Waypoint: 'waypoints',
		}),
	],
});
