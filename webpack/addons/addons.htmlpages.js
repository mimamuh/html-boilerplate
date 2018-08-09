/* eslint-disable import/no-extraneous-dependencies */
const HTMLWebpackPlugin = require('html-webpack-plugin');
const requireFileByPath = require('./../utils/requireFileByPath').default;
const commonPaths = require('./../commonPaths');
const constants = require('./../constants');

/**
 * Addon to generate html pages.
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	// required config.pages.js file
	const pagesConfig =
		requireFileByPath(
			commonPaths.configsFilesDir,
			constants.pagesConfig,
			true
		) || {};

	const devServerUrl = `${commonPaths.devServer.https ? 'https' : 'http'}://${
		commonPaths.devServer.host
	}:${commonPaths.devServer.port}/`;

	// based on HTMLWebpackPlugin
	const defaultConfig = {
		// where to inject the bundle files.
		// One of true | 'head' | 'body' | false
		inject: false,
		// the relative output path of the files, defaults to '/'
		outputPath: '/',
		// Adjust the URL for relative URLs in the document
		// see: https://developer.mozilla.org/en/docs/Web/HTML/Element/base
		baseHref: devServerUrl,
		// insert the webpack-dev-server hot reload script
		// at this host:port/path; e.g., http://localhost:3000.
		devServer: devServerUrl,
		// Track usage of your site via Google Analytics.
		googleAnalytics: null,
	};

	const plugins = pagesConfig.map(
		page => new HTMLWebpackPlugin(Object.assign(page, defaultConfig))
	);

	return {
		plugins,
	};
};
