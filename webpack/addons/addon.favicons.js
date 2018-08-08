/* eslint-disable import/no-extraneous-dependencies */
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const requireFileByPath = require('./../utils/requireFileByPath');
const constants = require('./../constants');
const commonPaths = require('./../commonPaths');

/**
 * Plugin to generate favicons.
 * It only works for production builds.
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	if (!env.production) {
		console.warn(
			'WARNING: Addon addon.critical.js only works in production mode!'
		);
	}

	// required config.favicons.js file
	const faviconsConfig = requireFileByPath(
		commonPaths.configsFilesDir,
		constants.faviconsConfig
	);

	return {
		plugins: [
			new FaviconsWebpackPlugin({
				// Your source logo
				logo: './src/assets/img/favicon/favicon.png',

				// The prefix for all image files (might be a folder or a name)
				prefix: 'assets/img/favicon/[hash]/',

				// Emit all stats of the generated icons
				emitStats: false,

				// The name of the json containing all favicon information
				statsFilename: 'iconstats-[hash].json',

				// Generate a cache file with control hashes and
				// don't rebuild the favicons until those hashes change
				persistentCache: true,

				// Inject the html into the html-webpack-plugin
				inject: true,

				// favicon background color (see https://github.com/haydenbleasel/favicons#usage)
				background: '#fff',

				// favicon app title (see https://github.com/haydenbleasel/favicons#usage)
				title: 'App',

				// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: false,
					favicons: true,
					firefox: true,
					opengraph: false,
					twitter: false,
					yandex: false,
					windows: false,
				},

				// overwrite existing config
				...faviconsConfig,
			}),
		],
	};
};
