/* eslint-disable import/no-extraneous-dependencies, consistent-return */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const colors = require('colors');
const commonPaths = require('./../commonPaths');
const constants = require('./../constants');

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	if (argv.mode !== 'development') {
		console.warn(
			colors.red(
				'WARNING: Addon addon.browsersync.js only works in development mode!'
			)
		);
		return;
	}

	return {
		plugins: [
			new BrowserSyncPlugin(
				{
					// browse to http://localhost:3000/ during development
					host: commonPaths.devServer.host,
					port: commonPaths.devServer.port + 10,
					// proxy the Webpack Dev Server endpoint
					// (which should be serving on http://localhost:8080/)
					// through BrowserSync
					proxy: `${commonPaths.devServer.https ? 'https' : 'http'}://${
						commonPaths.devServer.host
					}:${commonPaths.devServer.port}/${constants.tocPath}`,
				},
				// plugin options
				{
					// prevent BrowserSync from reloading the page
					// and let Webpack Dev Server take care of this
					reload: false,
				}
			),
		],
	};
};
