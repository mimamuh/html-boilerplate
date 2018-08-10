/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */
const webpack = require('webpack');
const commonPaths = require('./commonPaths');
const constants = require('./constants');
const requireFileByPath = require('./utils/requireFileByPath');

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	// required config.entries.js file
	const entries = requireFileByPath(
		commonPaths.configsFilesDir,
		constants.entriesConfig,
		true
	);

	return {
		entry: entries,

		output: {
			path: commonPaths.outputPath,
			publicPath: '/',
			filename: 'assets/js/[name]-[hash].bundle.js',
		},

		plugins: [new webpack.ProgressPlugin()],
	};
};
