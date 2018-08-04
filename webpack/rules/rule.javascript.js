/* eslint-disable import/no-extraneous-dependencies */

/**
 * Webpack rules to load javascript assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
				exclude: [/node_modules/],
			},
		],
	},
});
