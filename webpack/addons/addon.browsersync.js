/* eslint-disable import/no-extraneous-dependencies */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const commonPaths = require('./../commonPaths');

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	plugins: [
		new BrowserSyncPlugin(
			{
				// browse to http://localhost:3000/ during development
				host: commonPaths.devServer.host,
				port: commonPaths.devServer.port + 1,
				// proxy the Webpack Dev Server endpoint
				// (which should be serving on http://localhost:8080/)
				// through BrowserSync
				proxy: `${commonPaths.devServer.https ? 'https' : 'http'}://${
					commonPaths.devServer.host
				}:${commonPaths.devServer.port}/`,
			},
			// plugin options
			{
				// prevent BrowserSync from reloading the page
				// and let Webpack Dev Server take care of this
				reload: true,
			}
		),
	],
});
