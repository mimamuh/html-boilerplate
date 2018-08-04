/* eslint-disable import/no-extraneous-dependencies */
const BundleBuddyWebpackPlugin = require('bundle-buddy-webpack-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	plugins: [new BundleBuddyWebpackPlugin({ sam: true })],
});
