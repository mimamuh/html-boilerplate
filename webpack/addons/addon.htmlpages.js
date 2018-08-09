/* eslint-disable import/no-extraneous-dependencies */
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const requireFileByPath = require('./../utils/requireFileByPath');
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

	// default page config based on HTMLWebpackPlugin
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
	};

	// merge page config with default config
	const plugins = pagesConfig.map(
		page => new HTMLWebpackPlugin(Object.assign(page, defaultConfig))
	);

	// in development we also add a table of content page
	// as a start page for the dev-server
	if (argv.mode === 'development') {
		plugins.push(
			new HTMLWebpackPlugin(
				Object.assign(
					{
						// path of the html template in src
						template: path.resolve(
							__dirname,
							'./../templates/toc.page'
						),
						// filename after build
						filename: constants.tocPath,
						// pages config file to be used in toc
						pages: pagesConfig,
					},
					defaultConfig
				)
			)
		);
	}

	return {
		plugins,
	};
};
