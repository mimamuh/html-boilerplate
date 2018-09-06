/* eslint-disable import/no-extraneous-dependencies, consistent-return */
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const colors = require('colors');

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	if (argv.mode !== 'development') {
		console.warn(
			colors.red(
				'WARNING: Addon addon.reacterroroverlay.js only works in development mode!'
			)
		);
		return;
	}

	return {
		plugins: [new ErrorOverlayPlugin()],
	};
};
