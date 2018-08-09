/* eslint-disable import/no-extraneous-dependencies, consistent-return */
const WebpackOnBuildPlugin = require('on-build-webpack');
const critical = require('critical');
const requireFileByPath = require('./../utils/requireFileByPath').default;
const constants = require('./../constants');
const commonPaths = require('./../commonPaths');

/**
 * Plugin to generate critical above the fold
 * css. It only works in production mode.
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	if (argv.mode !== 'production') {
		console.warn(
			'WARNING: Addon addon.critical.js only works in production mode!'
		);
		return;
	}

	// required pages.config.js file
	const pagesConfig = requireFileByPath(
		commonPaths.configsFilesDir,
		constants.pagesConfig
	);

	// optional critical.config.js file
	const criticalConfig = requireFileByPath(
		commonPaths.configsFilesDir,
		constants.pagesConfig,
		false
	);

	return {
		plugins: [
			// do stuff after build
			new WebpackOnBuildPlugin(() => {
				// after build, we run through all the
				// pages we configured in config.pages.js
				// and run 'critical' through them so we inline
				// the page critical css in the head section
				// and defer the loading of the rest of our css

				// NOTE: set it to true, if you wanna have the cirtical
				// css inlined in your html file. This also affects cssLoader
				// JavaScript. When you set it to false it will create files
				// for each critical css by extending the filename with .css.
				const inlineCriticalCss = !!(
					criticalConfig && criticalConfig.inline
				);

				pagesConfig.forEach(page => {
					critical.generate({
						minify: true,
						extract: false,
						width: 1800,
						height: 1600,
						ignore: ['font-face', '@font-face'],
						...criticalConfig,
						base: commonPaths.outputPath,
						src: page.filename,
						dest: inlineCriticalCss
							? page.filename
							: `./critical/${page.filename}.css`,
						inline: inlineCriticalCss,
					});
				});
			}),
		],
	};
};
