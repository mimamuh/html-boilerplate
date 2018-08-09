/* eslint-disable import/no-extraneous-dependencies, consistent-return */
const BundleBuddyWebpackPlugin = require('bundle-buddy-webpack-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	if (argv.mode !== 'production') {
		console.warn(
			'WARNING: Addon addon.bundlebuddy.js only works in production mode!'
		);
		return;
	}

	return {
		plugins: [new BundleBuddyWebpackPlugin({ sam: true })],
	};
};
