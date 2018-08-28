/* eslint-disable import/no-extraneous-dependencies */
const commonPaths = require('./../commonPaths');

/**
 * Webpack rules to load audio assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	module: {
		rules: [
			{
				test: /\.(mp3|wav)$/,
				include: [commonPaths.audiosSrcPath],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'audio/[name]-[hash].[ext]',
							outputPath: 'assets/',
						},
					},
				],
			},
		],
	},
});
