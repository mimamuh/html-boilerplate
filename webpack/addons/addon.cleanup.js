/* eslint-disable import/no-extraneous-dependencies */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const requireFileByPath = require('./../utils/requireFileByPath');
const commonPaths = require('./../commonPaths');
const constants = require('./../constants');

/**
 * Addon to cleanup old bundle files in the dist folder.
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	// optional webpack.config.cleanOutput.js file
	const cleanOutputConfig =
		requireFileByPath(
			commonPaths.configsFilesDir,
			constants.cleanOutputConfig,
			false
		) || {};

	const files = Array.isArray(cleanOutputConfig.filesToClean)
		? cleanOutputConfig.filesToClean
		: [
				'./assets/js/*.js',
				'./assets/js/*.js.map',
				'./critical/*.css',
				'./critical/*.css.map',
				'./*.css',
				'./*.css.map',
		  ];

	return {
		plugins: [
			// stuff we wanna cleanup from our dist folder
			// before we run a new build
			new CleanWebpackPlugin(files, {
				// Write logs to console.
				verbose: true,
				// Use boolean "true" to test/emulate delete.
				// Default: false - remove files
				dry: false,
				// Instead of removing whole path recursively,
				// remove all path's content with exclusion of provided immediate children.
				// Good for not removing shared files from build directories.
				exclude: [
					/* 'files', 'to', 'ignore' */
				],
				...cleanOutputConfig,
				// Absolute path to your webpack root folder (paths appended to this)
				// Default: root of your package
				root: commonPaths.outputPath,
			}),
		],
	};
};
