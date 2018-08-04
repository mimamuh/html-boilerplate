/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

/**
 * Webpack rules/config to use the jquery library
 * NOTE: Only needed, when external vendor libraries
 * need the $ or jQuery in the global scope
 * https://www.npmjs.com/package/waypoints
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	plugins: [
		new webpack.ProvidePlugin({
			// inject for every global $ the jquery dependency
			// needed for legacy libs like waypoints
			$: 'jquery',
			jQuery: 'jquery',
		}),
	],
});
